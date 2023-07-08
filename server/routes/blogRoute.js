import  express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { createBlog, deleteBlog, getAllBlogs, updateBlog,getAllBlogs,deleteBlog, likeBlog, dislikeBlog } from "../controller/blogCtrl";
const router = express.Router();

router.post ("/", authMiddleware,isAdmin,createBlog);
router.put ("/:id", authMiddleware,isAdmin,updateBlog);
router.get ("/:id", getBlog);
router.get ("/", getAllBlogs);
router.delete ("/", authMiddleware, isAdmin,deleteBlog);
router.put ("/likes", authMiddleware, likeBlog);
router.put ("/dislikes", authMiddleware, dislikeBlog);
module.exports = router;