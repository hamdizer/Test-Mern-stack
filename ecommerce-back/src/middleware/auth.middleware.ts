import { Request, Response } from "express";
import {  verify } from "jsonwebtoken";
import UserData from "../model/user.model";
import { User } from "../types";
require('dotenv').config()
import mongoose, { Document } from "mongoose";
interface CustomRequest extends Request{
    user:  (Document<unknown, {}, User> & User & { _id: mongoose.Types.ObjectId; }) | null
}

export const AuthMiddleware=async(req:Request,res:Response,next:Function)=>{
    try{
    const token=req.headers.authorization?.split(' ')[1]
    console.log(token)
    if(!token){
       return res.status(401).send({message:'Unauthenticated'})
    }
    const payload=  verify(token,`${process.env.SECRET}`) as { [key: string]: any };
    
   const user= await UserData.findOne({_id:payload.id});
   (req as CustomRequest).user=user
    next()
}catch(error){
    return res.status(401).send({message:'Unauthenticated'})

}
}