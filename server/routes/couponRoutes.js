import { createCoupon, deleteCoupon, getAllCoupon, getCoupon, updateCoupon } from "../controller/couponCtrl.js";
import  express from "express";
import {authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/',authMiddleware, isAdmin ,createCoupon);
router.get('/:id',authMiddleware,isAdmin,getCoupon);
router.get('/',authMiddleware,isAdmin,getAllCoupon);
router.put('/:id',authMiddleware, isAdmin ,updateCoupon);
router.delete('/:id',authMiddleware, isAdmin ,deleteCoupon);


export default router;