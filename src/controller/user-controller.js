import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import {genrateToken, verifyToken} from '../services/user-services.js';
import { setUser, getUser } from '../middleware/cookie.js';
import {v4} from 'uuid';






export const getAllUser = async(req,res) =>{
    let users;
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 2;
    let skip = (page - 1) * limit;
    let data;
    try{
        users = await User.find().skip(skip).limit(limit);
        if(users){
            
            console.log(users);
            console.log("users found");
            return res.status(200).json({users});
        }else{
            return res.status(400).json({message:"No users found"});
        }
    } catch (err) {
        console.log(err);
    }
}




export const createUser = async(req,res)=>{
    try{
        const{name, email, password, address, Phone} = req.body;
        let user;
        user = await User.findOne({email});
        const hashedPasswd = bcrypt.hashSync(password);
        const sessionId = v4();
        console.log(`sessionid: ${sessionId}`);
        setUser(sessionId, user);
        res.cookie("uid", sessionId);
        if(!user){
            user = new User({
                name, email, password: hashedPasswd, address, Phone, blogs:[]
            });
           
            console.log(user);
            try{
            await user.save();
            }catch(err){
                console.log(err)
            }
            return res.status(201).json({user});
            
        }else{

            return res.status(400).json({message:"user credentials already exists"});
        }
    }catch(err){
        console.log(err);
    }
}




export const loginUser = async(req,res)=>{
    const {email, password} = req.body;
    let correctEmail;
    try{
        correctEmail = await User.findOne({email})
        
    }catch(err){
        console.log(err);
    }
    if(!correctEmail){
        console.log(" Please enter correct details");
        return res.status(404).json({message:"wrong email, Please enter correct details"});
    }

    const passwd = await bcrypt.compareSync(password, correctEmail.password);
    
    if(passwd){
        const sessionId = v4();
        console.log(`sessionid: ${sessionId}`);
        setUser(sessionId, correctEmail);
        res.cookie("uid", sessionId);
        /*let token;
        if (token){
            verifyToken(token);
            }else{
        const payload = {
            user: {
               id: correctEmail._id,
            },
         };
          token = await genrateToken({
            payload,
            ExpiratioTime: "60d",
            
         });
         console.log(token);
        }*/
        

         console.log("password Matched");
        return res.status(200).json({message:"You are logged in..."});
        
    }else{
        return res.status(400).json({message:"Please enter correct credentials"});
    }
}




export const deleteUser = async(req,res) =>{
    const {id, isDeleted} = req.body;
    const userId = req.params.id;
    try{        
        //findByIdAndDelete(userId)
        const user = await User.findOneAndUpdate(       
            { _id: userId },
            { $set: { isDeleted: true } },
            { new: true });

        console.log("user deleted");
        return res.status(200).json({message:"user deleted"});

    }catch(err){
        console.log(err);
    }
}

export const upadateUser = async(req,res) =>{
    const {name,email,address,phone } = req.body;
    console.log(`requested parameters: /n${name} /n${email} /n${address} /n${phone}`)
    const userId = req.params.id;
    let user;
    //console.log("helo update");
    try{
        //console.log(user,"hello update");
        user = await User.findOneAndUpdate({userId},{$set:{email,password}});
        

    }catch(err){
        console.log(err);
    }
    if(!user){
        return res.status(500).json({message:"unable to update"});
    }else{
        console.log("user credentials updated");
        return res.status(200).json(user);
    }
}
