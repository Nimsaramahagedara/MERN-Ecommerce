import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import express  from "express";


const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split('')[1];
        try{
           if(token){
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findById(decoded?.id);
            req.user = user;
            next();
           }
        }catch(err){
            throw new Error("Not authorized token expired. Please login again.");
        }
    }else{
        throw new Error("There is no token attached to header");
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    //IS ADMIN S
})

export  { authMiddleware };