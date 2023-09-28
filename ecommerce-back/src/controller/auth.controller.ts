import { Request, Response } from "express";
import UserData from "../model/user.model";
import { User } from "../types";
import { RegisterValidation } from "../validation/user.validation";
import bcryptjs from "bcryptjs"
import {sign} from "jsonwebtoken"
require('dotenv').config()
export const Register = async (req: Request, res: Response) => {
    const data:User={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        tel_number:req.body.tel_number,
        password:await bcryptjs.hash(req.body.password,10),
        passwordConfirm:req.body.passwordConfirm,
        role:req.body.role
    
      }
      try {
        const {error}=RegisterValidation.validate(req.body)
        if (error) {
            return res.status(400).send(error.details)
        }
        const newUser = new UserData(data);
        newUser.save();
        res.status(200).send({ message: `User Successfully added ${newUser}` });
        }
    
    
       catch (error: any) {
        res.status(400).send({ message: `Error Creating Country Pricing ${error}` });
      }
  };
  export const Login = async (req: Request, res: Response) => {
    const {email,password}=req.body;
    const user=await UserData.findOne({email:email})
    if(!user){
        res.status(400).send({message:'User Not Found'})
        return;
    }
    else{
    if(!await bcryptjs.compare(password,user.password)){
        res.status(400).send({message:'Invalid Credentials'})
        return
    }
    const payload={id:user._id}
    const token=sign(payload,`${process.env.SECRET}`)
  /*  res.cookie('jwt',token,{
        httpOnly:true,
        maxAge:24*60*60*1000
    })*/
    res.status(200).send({message:'User Successfully Logged In',token:token})
  }
}
export const Logout=async(req:Request,res:Response)=>{
    res.cookie('jwt','',{maxAge:0})
    res.status(200).send({message:'User Successfully Logged Out'})

}
    