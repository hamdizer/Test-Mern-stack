import axios from "axios";
import { AddProductData, Product } from "../types";
const token=localStorage.getItem("jwt")
export const getAllProducts = async () => {
  return await axios.get("http://localhost:8000/api/products");
};
export const addProduct = async (product: AddProductData) => {
  return await axios.post("http://localhost:8000/api/products", product ,{headers:{
    Authorization:`Bearer ${token}`
  }});
};
export const updateProduct = async (idProduct:number,product: Product) => {
    return await axios.put(`http://localhost:8000/api/products/${idProduct}`, product,{headers:{
      Authorization:`Bearer ${token}`
    }});
  };
export const deleteProduct = async (idProduct: number) => {
    return await axios.delete(`http://localhost:8000/api/products/${idProduct}`,{headers:{
      Authorization:`Bearer ${token}`
    }});
  };
  export const getProduct = async (id: string) => {
    return await axios.get(`http://localhost:8000/api/products/${id}`);
  };