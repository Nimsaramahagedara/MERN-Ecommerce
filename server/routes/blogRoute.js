import  express from "express";
import  {isAdmin}  from "../middlewares/authMiddleware.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import { createBlog, getAllBlogs, updateBlog,deleteBlog, likeBlog, dislikeBlog, getBlog } from "../controller/blogCtrl.js";
const router = express.Router();

router.post ("/", authMiddleware,isAdmin,createBlog);
router.put ("/:id", authMiddleware,isAdmin,updateBlog);
router.get ("/:id", getBlog);
router.get ("/", getAllBlogs);
router.delete ("/", authMiddleware, isAdmin,deleteBlog);
router.put ("/likes", authMiddleware, likeBlog);
router.put ("/dislikes", authMiddleware, dislikeBlog);

export default router;