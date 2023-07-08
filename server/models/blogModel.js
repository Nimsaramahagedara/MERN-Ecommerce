import mongoose from "mongoose";


var blogSchema = new mongoose.Schema(
    {
    title:{
        type:String,
        required:true,
    },
   description:{
        type:String,
        required:true,
    },
    numViews:{
        type:String,
        default: 0,
    },
    isLiked:{
        type:Boolean,
        required:false,
    },
    isDislike:{
        type:Boolean,
        required:false,
    },
    likes:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        },
    ],
    dislikes:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        },
    ],

image:{
    type:String,
    default:
        "https://neilpatel.com/wp-content/uploads/2018/10/blog.jpg",
},
author:{
    type: String,
    defalt:"Admin",
},
},
{
    toJSON:{
        virtuals: true,
    },
    toObject:{
        virtuals:true,
    },
    timestamps:true,
}
);

//Export the model
module.exports = mongoose.model('Blog', blogSchemaSchema);