import categoryModel from "../models/prodcategoryModel.js"
import AsyncHandler from "express-async-handler"
import validateMongoDbId from "../utils/validateMongodbId.js"

export const createCategory = AsyncHandler(async(req,res)=>{
    try {
        const newCat = await categoryModel.create(req.body);
        res.json(newCat);
    } catch (error) {
        throw new Error(error);
    }

});

//UPDATE CATEGORY
export const updateCategory = AsyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const findCat = await categoryModel.findByIdAndUpdate(id, req.body,{new:true});
        res.json(findCat);
    } catch (error) {
        throw new Error(error);
    }

});
//DELETE CATEGORY
export const deleteCategory = AsyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const delCat = await categoryModel.findByIdAndDelete(id);
        res.json(delCat);
    } catch (error) {
        throw new Error(error);
    }

});
//GET A CATEGORY
export const getACategory = AsyncHandler(async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    try {
        const findCat = await categoryModel.findById(id);
        res.json(findCat);
    } catch (error) {
        throw new Error(error);
    }

})

//GET ALL CATEGORY
export const getAllCategory = AsyncHandler(async(req,res)=>{
    try {
        const findCat = await categoryModel.find();
        res.json(findCat);
    } catch (error) {
        throw new Error(error);
    }

});