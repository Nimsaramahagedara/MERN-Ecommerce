import express from "express";
import { createCategory, deleteCategory, getACategory, getAllCategory, updateCategory } from "../controller/blogCatCtrl.js";
import {authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/',authMiddleware, isAdmin, createCategory);
router.put('/:id',authMiddleware, isAdmin, updateCategory);
router.delete('/:id',authMiddleware, isAdmin, deleteCategory);
router.get('/:id',authMiddleware, getACategory);
router.get('/',authMiddleware, getAllCategory);


export default router;