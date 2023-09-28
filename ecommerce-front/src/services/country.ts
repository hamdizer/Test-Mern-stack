import axios from "axios";
import { Country } from "../types";
export const getAllCountries = async () => {
  return await axios.get("http://localhost:8000/api/countries");
};
export const addCountry = async (country: Country) => {
  return await axios.post("http://localhost:8000/api/countries", country);
};
export const updateCountry = async (idCountry:number,country: Country) => {
    return await axios.post(`http://localhost:8000/api/countries/${idCountry}`, country);
  };
export const deleteCountry = async (idCountry: number) => {
    return await axios.delete(`http://localhost:8000/api/countries/${idCountry}`);
  };