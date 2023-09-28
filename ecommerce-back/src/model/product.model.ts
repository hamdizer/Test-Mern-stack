import mongoose, { Schema, model } from "mongoose"
import { Product } from "../types";


const ProductSchema=new Schema<Product>({
    sku:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    countryPrice:[{type:Schema.Types.ObjectId,ref:"CountryPrice"}]
})
const Product=model('Product',ProductSchema)
export default Product;