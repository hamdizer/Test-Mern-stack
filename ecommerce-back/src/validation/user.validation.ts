import {Joi} from "express-validation"
import { Role } from "../types"
export const RegisterValidation=Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    passwordConfirm:Joi.string().required(),
    tel_number:Joi.number().required(),
    role:Joi.string().valid("user","admin")
    //country:Joi.string().required()



})