import { Request, Response } from "express"
import { deleteDocument, getAllDocuments, getDocument, insertDocument, updateDocument } from "../utils/db-utils"
import CountryPricing from "../model/country-pricing.model"
import { CountryPricingValidation } from "../validation/country-pricing.validation"

export const countryPricingList=async(req:Request,res:Response)=>{
    const countryPricings=await getAllDocuments(CountryPricing)
    res.status(200).send({countryPricings:countryPricings})
}
export const insertCountryPricing=async(req:Request,res:Response)=>{
    try{
        const {error}=CountryPricingValidation.validate(req.body)
        if (error) {
            return res.status(400).send(error.details)
        }
    const newCountryPricing=new CountryPricing(req.body)
     newCountryPricing.save()
    res.status(200).send({message:`Country Pricing Successfully added ${newCountryPricing}`})
    }catch(error:any){
        res.status(400).send({message:`Error Creating Country Pricing ${error}`})}

    }

export const deleteCountryPricing=async(req:Request,res:Response)=>{
    const countryPricingId=req.params.id
    await deleteDocument(CountryPricing,countryPricingId)
    res.status(200).send({message:`Country pricing Number ${countryPricingId} is Deleted`})
}
export const updateCountryPricing=async(req:Request,res:Response)=>{
    const {error}=CountryPricingValidation.validate(req.body)
    if (error) {
        return res.status(400).send(error.details)
    }
    const countryPricingId=req.params.id;
    await updateDocument(CountryPricing,req.body,countryPricingId)
      res.status(200).send({message:` country Pricing Successfully updated `})
}
export const getCountryPricing=async (req:Request,res:Response)=>{
    const id=req.params.id
    const countryPricing=await getDocument(CountryPricing,{_id:id})
    res.status(200).send({ countryPricing: countryPricing[0]});
  
  }