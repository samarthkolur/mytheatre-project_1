import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

const app=express();
dotenv.config();
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});