import axios from "axios";
import { CountryPricing } from "../types";
export const getAllCountryPrices = async () => {
  return await axios.get("http://localhost:8000/api/countryPrices");
};
export const addCountryPrice = async (countryPrice: CountryPricing) => {
  return await axios.post("http://localhost:8000/api/countryPrices", countryPrice);
};
export const updateCountryPrice = async (idCountryPrice:number,countryPrice: CountryPricing) => {
    return await axios.post(`http://localhost:8000/api/countryPrices/${idCountryPrice}`, countryPrice);
  };
export const deleteCountryPrice = async (idCountryPrice: number) => {
    return await axios.delete(`http://localhost:8000/api/countryPrices/${idCountryPrice}`);
  };