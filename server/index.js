import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT ||  4000;
import dbConnect from './config/dbConnect.js';
dbConnect();
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import bodyParser from 'body-parser';
import {errorHandler} from './middlewares/errorHandler.js';
import {notFound} from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import blogRoutes from './routes/blogRoute.js';
import categoryRoutes from './routes/prodCategoryRoutes.js';
import blogCatRoutes from './routes/blogCatRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import couponRoutes from './routes/couponRoutes.js';

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user",authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/blogcategory",blogCatRoutes);
app.use("/api/brand",brandRoutes);
app.use("/api/coupon", couponRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`);
});
