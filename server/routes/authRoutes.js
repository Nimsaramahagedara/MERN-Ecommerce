import  express from "express";
const router = express.Router();
import { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser } from '../controller/userCtrl.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/get-users", getAllUsers);
router.get('/:id', authMiddleware, getUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

export default router;