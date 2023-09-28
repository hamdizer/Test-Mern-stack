import { Request, Response } from "express";
import {
  deleteDocument,
  getAllDocuments,
  getDocument,
  insertDocument,
  updateDocument,
} from "../utils/db-utils";
import Product from "../model/product.model";
import { ProductValidation } from "../validation/product.validation";
import CountryPrice from "../model/country-pricing.model";

export const productList = async (req: Request, res: Response) => {
  const products: Product[] = await getAllDocuments(Product,"countryPrice");
  res.status(200).send({ products: products });
};
export const insertProduct = async (req: Request, res: Response) => {
  try {
    const productData={sku:req.body.product.sku,title:req.body.product.title,description:req.body.product.description}
    const {error}=ProductValidation.validate(productData)
    if (error) {
        return res.status(400).send(error.details)
    }
    const newProduct =  new Product(productData);
    const countryPricesArray=req.body.countryPrice
    for(var i=0;i<countryPricesArray.length;i++){
    const countryPricing=await new CountryPrice({currency:countryPricesArray[i].currency,price:countryPricesArray[i].price})
    await countryPricing.save();
    newProduct.countryPrice?.push(countryPricing.id)
    await newProduct.save();
    countryPricing.product=newProduct;
    await countryPricing.save()
    }
    
    
    res.status(200).send({ message: `Product Successfully added ${newProduct.populate('countryPrice')}` });
  } catch (error: any) {
    res.status(400).send({ message: `Error Creating Product ${error}` });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  await deleteDocument(Product, productId);
  res.status(200).send({ message: `Product Number ${productId} is Deleted` });
};
export const updateProduct = async (req: Request, res: Response) => {
    const {error}=ProductValidation.validate(req.body)
    if (error) {
        return res.status(400).send(error.details)
    }
  const productId = req.params.id;
  await updateDocument(Product, req.body, productId);
  res.status(200).send({ message: `Product Successfully updated ` });
};
export const getProduct=async (req:Request,res:Response)=>{
  const id=req.params.id
  const product=await getDocument(Product,{_id:id},"countryPrice")
  res.status(200).send({ product: product[0]});

}
