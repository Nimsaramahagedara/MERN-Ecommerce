import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT ||  4000;
import dbConnect from './config/dbConnect.js';
dbConnect();
import authRoutes from './routes/authRoutes.js';
import bodyParser from 'body-parser';
import {errorHandler} from './middlewares/errorHandler.js';
import {notFound} from './middlewares/errorHandler.js';

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/api/user",authRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`);
});
