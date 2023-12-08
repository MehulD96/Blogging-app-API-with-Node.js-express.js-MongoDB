import express from 'express';
import {getAllBlogs, addBlog, updateBlog, getBlogById, getByUserId, deleteBlog} from '../controller/blog-controller.js'
import upload from '../middleware/imageUpload.js';


const blogRouter = express.Router();



blogRouter.get("/",getAllBlogs);
blogRouter.post("/add", upload.single('image'), addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.get("/users/:id", getByUserId);
blogRouter.delete("/delete/:id", deleteBlog);


export default blogRouter;