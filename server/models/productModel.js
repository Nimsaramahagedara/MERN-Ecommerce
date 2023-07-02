import mongoose from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
    decription:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
    price:{
        type: Number,
        required:true,
    },
    category:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required:true
    },
    sold:{
        type: Number,
        default: 0,
    },
    images:{
        type: Array,
    },
    color:{
        type: String,
        required: true,
    },
    ratings:[{
     star: Number,
     postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}  
    }],

},{timestamps : true});

//Export the model
export default mongoose.model('Product', productSchema);