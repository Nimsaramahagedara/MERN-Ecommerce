import productModel from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import slugify from 'slugify';

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