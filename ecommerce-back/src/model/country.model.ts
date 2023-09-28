import { Schema, model } from "mongoose"
import { Country } from "../types";


const CountrySchema=new Schema<Country>({
    code:{type:String,required:true},
    description:{type:String,required:true},
})
const Country=model('Country',CountrySchema)
export default Country;