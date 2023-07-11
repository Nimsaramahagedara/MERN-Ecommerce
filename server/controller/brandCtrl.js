import brand from "../models/brandModel.js"
import AsyncHandler from "express-async-handler"
import validateMongoDbId from "../utils/validateMongodbId.js"

export const createBrand = AsyncHandler(async(req,res)=>{
    try {
        const newCat = await brand.create(req.body);
        res.json(newCat);
    } catch (error) {
        throw new Error(error);
    }

});

//UPDATE Brand
export const updateBrand = AsyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const findCat = await brand.findByIdAndUpdate(id, req.body,{new:true});
        res.json(findCat);
    } catch (error) {
        throw new Error(error);
    }

});
//DELETE Brand
export const deleteBrand = AsyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const delCat = await brand.findByIdAndDelete(id);
        res.json(delCat);
    } catch (error) {
        throw new Error(error);
    }

});
//GET A Brand
export const getABrand = AsyncHandler(async(req,res)=>{
    const {id} = req.params;
    console.log(id);
    try {
        const findCat = await brand.findById(id);
        res.json(findCat);
    } catch (error) {
        throw new Error(error);
    }

})

//GET ALL Brand
export const getAllBrand = AsyncHandler(async(req,res)=>{
    try {
        const findCat = await brand.find();
        res.json(findCat);
    } catch (error) {
        throw new Error(error);
    }

});