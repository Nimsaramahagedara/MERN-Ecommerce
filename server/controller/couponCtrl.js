import coupenModel from '../models/coupenModel.js';
import AsyncHandler from 'express-async-handler';
import validateMongoDbId from '../utils/validateMongodbId.js';

//CREATE COUPON
export const createCoupon = AsyncHandler(async(req,res)=>{
    try {
        const coupon = await coupenModel.create(req.body);
        res.json(coupon);
    } catch (error) {
        throw new Error(error);
    }
    
});
//GET ALL COUPON
export const getAllCoupon = AsyncHandler(async(req,res)=>{
    try {
        const coupon = await coupenModel.find();
        res.json(coupon);
    } catch (error) {
        throw new Error(error);
    }
    
});
//GET A COUPON
export const getCoupon = AsyncHandler(async(req,res)=>{
    try {
        const coupon = await coupenModel.findById(req.params);
        res.json(coupon);
    } catch (error) {
        throw new Error(error);
    }
    
});

//Update COUPON
export const updateCoupon = AsyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const coupon = await coupenModel.findByIdAndUpdate(id,req.body,{new: true});
        res.json(coupon);
    } catch (error) {
        throw new Error(error);
    }
    
});

//DELETE COUPON
export const deleteCoupon = AsyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const coupon = await coupenModel.findByIdAndDelete(id);
        res.json(coupon);
    } catch (error) {
        throw new Error(error);
    }
    
});

