import express from 'express';
import mongoose from 'mongoose';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import path from 'path';




export const getAllBlogs = async(req,res) =>{
    let blogs;
    try{
        blogs = await Blog.find();
    }catch(err){
        return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message:"No Blogs Found"});
    }
    return res.status(200).json({blogs})
}


export const addBlog = async(req,res) =>{
    //const {title, description, user} = req.body;
    //const image = req.file;

    let details = new Blog({
        title: req.body.title,
        description: req.body.description,
        //user: req.body.user
    })
    details.image = req.file.path
    details.user = req.body.user
    //console.log(details.image);
    //console.log(details);
    

    let existingUser;
    try{
        existingUser = await User.findById(details.user);
    }catch(err){
        return console.log(err);
    }
    if (!existingUser){
        return res.status(400).json({message:"unable to find user by this id.."})
    }

    
    //const blog = new Blog({title, description, image, user});
    //console.log(blog);
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await details.save({session});
        existingUser.blogs.push(details);
        await existingUser.save({session});
        await session.commitTransaction();
        
    }catch(err){
        console.log(err);
        return res.status(500).json({message:err})
    }
    return res.status(200).json({details})
}



export const updateBlog = async(req,res) =>{
    const {title, description} = req.body;
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogId,{
            title, description});
    }catch(err){
        console.log(err);
    }
    if (!blog){
        return res.status(500).json({message: "unable to update"});
    }else {
    console.log("Blog updated");
    return res.status(200).json({blog});
    }
    
}


export const getBlogById = async(req,res) =>{
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id);
    }catch(err){
        console.log(err);
    }
    if (!blog){
        return res.status(400).json({message:"no block Found"});
    }
    return res.status(200).json({blog});
}

export const deleteBlog = async(req,res) =>{
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save()
    }catch(err){
        console.log(err);
    }
    if (!blog){
        return res.status(500).json({message:"unable to delete"});
    }else{
        console.log("Blog deleted successfully");
    return res.status(200).json({message:"blog deleted successfully"});
    }
}

export const getByUserId = async(req,res) =>{
    const userID = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
    }catch(err){
        return console.log(err);
    }
    if (!userBlogs){
        return res.status(404).json({message:"no blog found"})
    }
    return res.status(200).json({blogs:userBlogs})
}
