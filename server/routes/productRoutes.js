import express from "express";
import  {addToWishlist, createProduct, deleteProduct, getAllProducts, getProduct, rating, updateProduct} from "../controller/productCtrl.js";
const router = express.Router();
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware.js";


router.post('/', authMiddleware, isAdmin, createProduct);
router.put('/rate', authMiddleware, rating);
router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.put('/wishlist', authMiddleware, addToWishlist);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);




export default router;