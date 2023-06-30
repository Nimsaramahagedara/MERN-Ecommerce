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
    const queryObj = req.query;
    const excludeFields = ["page", "sort","limit","fields"]
    //TODO
    try {
        const allProducts = await productModel.where("category").equals(
            req.query.category,
        );
        res.json(allProducts);
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