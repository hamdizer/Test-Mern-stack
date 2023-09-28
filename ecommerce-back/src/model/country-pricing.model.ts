import mongoose, { Schema, model } from "mongoose"
import { CountryPrice } from "../types";


const CountryPriceSchema=new Schema<CountryPrice>({
    price:{type:Number,required:true},
    currency:{type:String,required:true},
    product:[{type:mongoose.Types.ObjectId,ref:"Product"}]
})
const CountryPrice=model('CountryPrice',CountryPriceSchema)
export default CountryPrice