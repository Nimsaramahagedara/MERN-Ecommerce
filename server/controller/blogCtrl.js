import Blog from '../models/blogModel.js';
import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler';
import validateMongoDbId from "../utils/validateMongodbId.js";

export const createBlog = asyncHandler(async (req,res)=>{

    try{
        const newBlog = await Blog.Create(req.body);
        res.jason (newBlog,);
    } catch(err){
        throw new Error(err);
    }
    });

 export const updateBlog = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id);
        try {
            const updateBlog = await Blog.findByIdAndUpdate(id,req.body,{
             new: true,
            });
            res.jason (newBlog,);
        } catch(err){
          throw new Error(err);
        }
     });

 export const getBlog = asyncHandler(async (req,res)=>{
         const {id} = req.params;
         validateMongoDbId(id);
              try {
                  const getBlog = await Blog.findById(id). populate("likes").populate("dislikes");
                  const updateViews = await Blog.findByIdAndUpdate(
                    id,
               {
                $inc: {numViews: 1},
               },
               {new: true}
                  );
                res.jason (getBlog);
             } catch(err){
                throw new Error(err);
            }
    });

export const getAllBlogs = asyncHandler(async (req, res) =>{
    try {
        const getBlogs = await Blog.find();
        res.json(getBlogs);
    } catch(err){
      throw new Error(err);
    }
});

export const deleteBlog = asyncHandler(async (req,res)=>{
 const {id} = req.params;
 validateMongoDbId(id);
    try{
        const deletedBlog = await Blog.findByIdAndDelet(req);
        res.jason (deletedBlog,);
    } catch(err){
        throw new Error(err);
    }
    });
export const likeBlog =asyncHandler(async (req,res) => {
    const{blogId}=req.body;
    validateMongoDbId(blogId);

//Find the blog which you wwant to be liked
const blog = await Blog.findById(blogId);
//find the login user
const loginUserId = req?.user?._id;
//find if the user has liked the blog
const isLiked = blog?.isLiked;
//find if the user has diliked the blog
const alreadyDisLiked = blog?.dislikes?.find(
    (userId) => userId?.toSting()=== loginUserId?.toSting()
);
if(alreadyDisliked){
    const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
            $pull:{dislikes:loginUserId},
            isDisliked:false,
        },
        {new:true}
    );
    res.json(blog);
}
if (isLiked){
    const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
            $pull:{likes:loginUserId},
            isLiked:false,
        },
        {new:true}
    );
    res.json(blog);
} else{
    const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
            $push:{likes:loginUserId},
            isLiked:true,
        },
        {new:true}
    );
    res.json(blog);
}
});
export const dislikeBlog =asyncHandler(async (req,res) => {
    const{blogId}=req.body;
    validateMongoDbId(blogId);

//Find the blog which you wwant to be liked
const blog = await Blog.findById(blogId);
//find the login user
const loginUserId = req?.user?._id;
//find if the user has liked the blog
const isDisLiked = blog?.isDisliked;
//find if the user has diliked the blog
const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toSting()=== loginUserId?.toSting()
);
if(alreadyliked){
    const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
            $pull:{likes:loginUserId},
            isLiked:false,
        },
        {new:true}
    );
    res.json(blog);
}
if (isDisLiked){
    const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
            $pull:{dislikes:loginUserId},
            isDisliked:false,
        },
        {new:true}
    );
    res.json(blog);
} else{
    const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
            $push:{disikes:loginUserId},
            isDisliked:true,
        },
        {new:true}
    );
    res.json(blog);
}
});
module.exports ={createBlog,updateBlog, getBlog,getAllBlogs,deleteBlog,likeBlog,dislikeBlog};