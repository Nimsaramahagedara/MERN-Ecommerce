import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler';
import bcrypt from "bcrypt";
import { genToken } from '../config/jwtToken.js';


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
        console.log("delete id : " + id);
        const user =await User.findByIdAndDelete(id);
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});
//UPDATE USER
export const updateUser = asyncHandler(async(req,res) =>{
    try {
        const {_id} = req.user;
        console.log("update id : " + id);
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

export default  { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser };