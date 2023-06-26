import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT ||  4000;
import dbConnect from './config/dbConnect.js';
dbConnect();
import authRoutes from './routes/authRoutes.js';

app.use('/', (req,res)=>{
    res.send("Hello from server");
})

app.use('api/user',authRoutes);
app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`);
});
