import mongoose, { Mongoose, Schema, model } from "mongoose"
import { User } from "../types";


const UserSchema=new Schema<User>({
    email:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    tel_number:{type:Number,required:true},
    password:{type:String,required:true},
    country:{type:mongoose.Types.ObjectId,ref:'Country'},
    role:{type:String,required:true}



})
const UserData=model('User',UserSchema)
export default UserData;