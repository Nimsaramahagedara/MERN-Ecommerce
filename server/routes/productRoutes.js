import express from "express";
import  {createProduct, deleteProduct, getAllProducts, getProduct, updateProduct} from "../controller/productCtrl.js";
const router = express.Router();
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware.js";

router.post('/', authMiddleware, isAdmin, createProduct);
router.get('/:id', getProduct);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);
router.get('/', getAllProducts);

export default router;