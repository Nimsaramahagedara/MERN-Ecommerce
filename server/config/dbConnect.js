import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = ()=>{
    try {
        const conn = mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology : true,
        }).then(()=>{
            console.log("MONGODB Connected!!");
        })
    } catch (error) {
        console.log(error);
    }
}
export default dbConnect;