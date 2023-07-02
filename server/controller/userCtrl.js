import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler';
import bcrypt from "bcrypt";
import { genToken } from '../config/jwtToken.js';
import validateMongoDbId from "../utils/validateMongodbId.js";
import { generateRefreshToken } from "../config/refreshToken.js";
import jwt from 'jsonwebtoken';

//Create User
export const createUser = asyncHandler(async (req,res)=>{
    const email = req.body.email;
    const mobile = req.body.mobile;
    const findbyEmail = await User.find({email : email})
    const findbyMobile = await User.find({mobile : mobile})
    
    if(findbyEmail == "" && findbyMobile == ""){
        //CREATE NEW USER
        const newUser = await User.create(req.body);
        res.json(newUser);
    }else{
        //USER ALREADY EXIST
        throw new Error('User Already Exist');
    }
});
//USER LOGIN
export const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const findbyEmail = await User.findOne({email : email});
    if(findbyEmail !== "" && await findbyEmail.isPasswordMatched(password) == true){
        const  refreshToken = await generateRefreshToken(findbyEmail?._id);
        const updateUser = await User.findByIdAndUpdate(findbyEmail._id, {
            refreshToken : refreshToken
        }, {new : true});

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72*60*60*1000,
        })
        res.status(200);
        res.json({
            _id : findbyEmail._id,
            firstname : findbyEmail.firstname,
            lastname : findbyEmail.lastname,
            email : findbyEmail.email,
            mobile : findbyEmail.mobile,
            token: genToken(findbyEmail._id),
            success: true,
        });
    }else{
        throw new Error('Invalid Credential!');
    }
});
//LOG OUT

export const logout = asyncHandler(async(req,res)=>{
    console.log("LOGOUT FUNCTION");
    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error('No refresh token in cookies');
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if(!user){
        res.clearCookie('refreshToken',{
            httpOnly: true,
            secure: true
        });
        return res.sendStatus(204); //forbidden
    }
    await User.findOneAndUpdate({refreshToken},{
        refreshToken : ""
    })
    res.clearCookie('refreshToken',{
        httpOnly: true,
        secure: true
    });
    res.sendStatus(204); 
})
//Handle Refresh Token
export const handleRefreshToken = asyncHandler(async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie?.refreshToken) throw new Error('No refresh token in cookies');
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if(!user) throw new Error('No refresh token in DB please log in again');
    jwt.verify(refreshToken, process.env.SECRET_KEY,(err,decoded)=>{
        if(err || user.id !== decoded.id){
            throw new Error('There is something wrong with refreshToken');
        }
        const accessToken = genToken(user.id);
        res.json({accessToken});
    });
})

//GET ALL USERS
export const getAllUsers = asyncHandler (async(req,res) =>{
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        throw new Error(error);
    }

});

//GET A SPECIFIC USER
export const getUser = asyncHandler(async(req,res) =>{
    try {
        const {id} = req.params;
        validateMongoDbId(id);
        console.log("Email : " + id);
        const user =await User.findById(id);
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});
//DELETE USER
export const deleteUser = asyncHandler(async(req,res) =>{
    try {
        const {id} = req.params;
        validateMongoDbId(id);
        console.log("delete id : " + id);
        const user =await User.findByIdAndDelete(id);
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});
//UPDATE USER
export const updateUser = asyncHandler(async(req,res) =>{

    const {_id} = req.user;
    validateMongoDbId(_id);
    try {
       
        console.log("update id : " + _id);
        const user =await User.findByIdAndUpdate(
            _id,
            {
                firstname: req.body.firstname,
                lastname : req.body.lastname,
                mobile : req.body.mobile,
                email:req.body.email
            },
            {
                new:true
            }
        );
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});

//Block User
export const blockUser = asyncHandler( async(req, res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try{
       const block = await User.findByIdAndUpdate(
        id,
        {
            isBlocked: true,
        },
        {
            new: true,
        }
       );
       res.json({
        message: "User Blocked"
       });
    }catch(err){
        throw new Error(err);
    }
});

//Unblock User
export const unblockUser = asyncHandler( async(req, res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try{
       const unblock = await User.findByIdAndUpdate(
        id,
        {
            isBlocked: false,
        },
        {
            new: true,
        }
       );
       res.json({
        message: "User Unblocked"
       });
    }catch(err){
        throw new Error(err);
    }
});

export const updatePassword = asyncHandler(async (req, res) => {
    const { _id} = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if(password){
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    }else{
        res.json(user);
    }
});

export const forgotPasswordToken = asyncHandler(async(req, res) => {
     const { email } = req.body;
     const user = await User.findOne({email});
     if(!user) throw new Error("User not found with this email");

     try{
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset Your password. This link is valid till 10mins from now. <a http="http://localhost:5000/api/user/reset-password/${token}">Click Here</>`;
        //TOdo
     }catch(err){
        throw new Error(err);
     }
})

export default  { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser, blockUser, unblockUser, updatePassword, forgotPasswordToken };