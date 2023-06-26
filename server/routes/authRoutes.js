import  express from "express";
const router = express.Router();
import createUser from '../controller/userCtrl.js';

router.post("/register", createUser);

export default router;