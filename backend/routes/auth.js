import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/User.js";
const router=express.Router();

const JWT_SECRET=process.env.JWT_SECRET ||"supersecret";

//signup

router.post("/signup",async(req,res)=>{
   try {
     const {name,email,password}=req.body;
     const existingUser=await Users.findOne({email});
     if(existingUser){
        return res.status(400).json({message:"User already exists"});
     }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser = await Users.create({name, email, password: hashedPassword});
        const token=jwt.sign({id:newUser._id,email:newUser.email},JWT_SECRET,{expiresIn:"1h"});
   

   res.status(201).json({token,user:{id:newUser._id,name:newUser.name,email:newUser.email}});
    } catch (error) {
      res.status(500).json({message:"Server error"});
   }

});

router.post("/signin",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await Users.findOne({email});
        if(!user){
            return res.status(400).json({message:"No user found"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:user._id,email:user.email},JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({token,user:{id:user._id,name:user.name,email:user.email}});
    }catch(error){
        res.status(500).json({message:"Server error"});
    }
});

export default router;