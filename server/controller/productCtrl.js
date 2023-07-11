import productModel from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import slugify from 'slugify';
import User from "../models/userModel.js";


//Create Product
export const createProduct = asyncHandler(async(req,res)=>{
    if(req.body.title){
        req.body.slug = slugify(req.body.title);
    }
    try {
        const newProduct = await productModel.create(req.body);
        res.json(newProduct);
    } catch (error) {
        console.log(error);
        throw new Error('Product not created!');
    }
});
//UPDATE A PRODUCT
export const updateProduct = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    if(req.body.title){
        req.body.slug = slugify(req.body.title);
    }
    try {
        const product = await productModel.findByIdAndUpdate(id,req.body,{new:true});
        res.json(product);
    } catch (error) {
        console.log(error);
        throw new Error("Product not Updated Please check again");
    }
});
//GET A PRODUCT
export const getProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await productModel.findById(id);
        res.json(product);
    } catch (error) {
        throw new Error('Product not Found');
    }
});

//GET ALL PRODUCTS
export const getAllProducts = asyncHandler(async(req,res)=>{
    
    
    try {

        //Filtering
        const queryObj = {...req.query};
        const excludeFields = ["page", "sort","limit","fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let query = productModel.find(JSON.parse(queryStr));

        //Sorting
        if (req.query.sort){
           const sortBy = req.query.sort.split(',').join(" ");
           query = query.sort(sortBy);
        }else{
           query = query.sort("-createdAt");
        }

        //Limiting the fields
        if(req.query.fields){
            const fields = req.query.sort.fields(',').join(" ");
            query = query.sort(fields);
        }else{
            query = query.select("-__v");
        }

        //Pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1)*limit;
        query = query.skip(skip).limit(limit);

        if(req.query.page){
            const productCount = await productModel.countDocuments();
            if(skip >= productCount) throw new Error("This page does not exists");
        }

        const product = await query;
        res.json(product);
    } catch (error) {
        throw new Error('Error occures when fetching all products');
    }
})

//DELETE A PROCUT
export const deleteProduct = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    try {
        const product = await productModel.findByIdAndDelete(id);
        res.json(product);
    } catch (error) {
        throw new Error('Product not Found');
    }
});

//ADD TO WISHLIST
export const addToWishlist = asyncHandler(async(req,res)=>{
    //GET LOGGED User
    const {_id} = req.user;
    console.log("ID IS : ", _id);
    //GET ProductID
    const {prodId} = req.body;
    try {
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find((id)=> id.toString() === prodId)
        if(alreadyAdded){
            let user = await User.findByIdAndUpdate(_id,{
                $pull: {wishlist : prodId}
            },{new:true})
            res.json(user);
        }else{
            let user = await User.findByIdAndUpdate(_id,{
                $push: {wishlist : prodId}
            },{new:true})
            res.json(user);
        } 
    } catch (error) {
        throw new Error(error);
    }
})

//RATING
export const rating = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {star, prodId, comment} = req.body;
    try {
        const product = await productModel.findById(prodId);
        let alreadyRated = product.ratings.find((userId)=> userId.postedBy.toString() === _id.toString() );

        if(alreadyRated){
            const updateRate = await productModel.updateOne(
            {
                ratings: {$elemMatch : alreadyRated}
            },
            {
                $set : {"ratings.$.star": star, "ratings.$.comment": comment} 
            },
            {
                new: true
            }
            )     
        }else{
            const rateProduct = await productModel.findByIdAndUpdate(prodId,{
                $push: {
                    ratings: {
                        star: star,
                        comment: comment,
                        postedBy: _id
                    }
                }
            },{
                new: true
            })
        }
        const getAllRatings = await productModel.findById(prodId);
        let totalRatings = getAllRatings.ratings.length;
        let ratingSum = getAllRatings.ratings.map((item)=> item.star ).reduce((prev,curr)=> prev + curr, 0)
        let actualRate = Math.round(ratingSum/ totalRatings)
        let finalProduct = await productModel.findByIdAndUpdate(prodId,{
            totalratings: actualRate
        },{new: true})
        res.json(finalProduct);
    } catch (error) {
        throw new Error(error);
    }
})