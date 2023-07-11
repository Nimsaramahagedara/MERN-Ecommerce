import express from "express";
import {authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
import { createBrand, deleteBrand, getABrand, getAllBrand, updateBrand } from "../controller/brandCtrl.js";
const router = express.Router();

router.post('/',authMiddleware, isAdmin, createBrand);
router.put('/:id',authMiddleware, isAdmin, updateBrand);
router.delete('/:id',authMiddleware, isAdmin, deleteBrand);
router.get('/:id',authMiddleware, getABrand);
router.get('/',authMiddleware, getAllBrand);


export default router;