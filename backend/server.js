import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import pkg from "mongodb";
import jwt from "jsonwebtoken";
import router from "./routes/auth.js";

const { MongoClient: mongoClient } = pkg;
const app=express();
dotenv.config();
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));
app.use(express.json());
app.use("/auth",router);
//mongodb connection
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("MongoDB connected"))
app.use(session({
    secret:process.env.SESSION_SECRET || "supersecret",
    resave:false,
    saveUninitialized:false,
    
}))

async function getAllUsers(){
    const client = new mongoClient(process.env.MONGO_URI);
    try{
        await client.connect();
        const db= client.db("mytheatre_db");
        const user=await db.collection("Users").find({}).toArray();
        console.log("Connected to MongoDB");
        return user;
    } finally {
    await client.close();
  }
}

app.get("/Users", async(req,res)=>{
    try{
    const users=await getAllUsers();
    res.json(users);
    } catch(error){
        console.error("Error fetching users:", error);
        res.status(500).json({message:"Server error"});
    }
    
});
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});