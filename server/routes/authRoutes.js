import  express from "express";
const router = express.Router();
import createUser, { getAllUsers, getUser } from '../controller/userCtrl.js';
import { loginUser } from "../controller/userCtrl.js";

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/get-users", getAllUsers);
router.get('/:id', getUser);
export default router;