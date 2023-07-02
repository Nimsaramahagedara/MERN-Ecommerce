import  express from "express";
const router = express.Router();
import { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser, blockUser, unblockUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken } from '../controller/userCtrl.js';
import {authMiddleware, isAdmin} from '../middlewares/authMiddleware.js';

router.post("/register", createUser);
router.post(".forgot-password-token", forgotPasswordToken);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/get-users", getAllUsers);
router.get('/:id', authMiddleware, isAdmin, getUser);
router.delete('/:id', deleteUser);
router.put('/edit-user', authMiddleware, updateUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);
router.put('/refresh', handleRefreshToken);

export default router;