import { Request, Response } from "express";
import {
  deleteDocument,
  getAllDocuments,
  getDocument,
  insertDocument,
  updateDocument,
} from "../utils/db-utils";
import UserData from "../model/user.model";
import { User } from "../types";
import { RegisterValidation } from "../validation/user.validation";
import bcryptjs from "bcryptjs"
export const userList = async (req: Request, res: Response) => {
  const users: User[] = await getAllDocuments(UserData);
  res.status(200).send(users);
};
export const insertUser = async (req: Request, res: Response) => {
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

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  await deleteDocument(UserData, userId);
  res.status(200).send({ message: `User Number ${userId} is Deleted` });
};
export const updateUser = async (req: Request, res: Response) => {
    const {error}=RegisterValidation.validate(req.body)
    if (error) {
        return res.status(400).send(error.details)
    }
  const userId = req.params.id;
  await updateDocument(UserData, req.body, userId);
  res.status(200).send({ message: `User Successfully updated ` });
};
export const getUser=async (req:Request,res:Response)=>{
  const email=req.params.email;
  const user=await getDocument(UserData,{email:email})
  res.status(200).send({ user: user[0]});

}
