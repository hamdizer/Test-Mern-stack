import { Request, Response } from "express";
import {
  deleteDocument,
  getAllDocuments,
  insertDocument,
  updateDocument,
} from "../utils/db-utils";
import Country from "../model/country.model";
import { CountryValidation } from "../validation/country.validation";

export const countryList = async (req: Request, res: Response) => {
  const countries = await getAllDocuments(Country);
  res.status(200).send(countries);
};
export const insertCountry = async (req: Request, res: Response) => {
  try {
    const {error}=CountryValidation.validate(req.body)
    if (error) {
        return res.status(400).send(error.details)
    }
    const newCountry = new Country(req.body);
    newCountry.save();
    res.status(200).send({ message: `Country Successfully added ${newCountry}` });
  } catch (error: any) {
    res.status(400).send({ message: `Error Creating Country  ${error}` });
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  const countryId = req.params.id;
  await deleteDocument(Country, countryId);
  res.status(200).send({ message: `Country Number ${countryId} is Deleted` });
};
export const updateCountry = async (req: Request, res: Response) => {
    const {error}=CountryValidation.validate(req.body)
    if (error) {
        return res.status(400).send(error.details)
    }
  const countryId = req.params.id;
  await updateDocument(Country, req.body, countryId);
  res.status(200).send({ message: `country Successfully updated ` });
};
