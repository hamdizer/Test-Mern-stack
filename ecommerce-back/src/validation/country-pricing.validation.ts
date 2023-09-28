import { Joi } from "express-validation";
export const CountryPricingValidation = Joi.object({
  country: Joi.string().required(),
  price: Joi.number().required(),
  currency: Joi.string().required(),

});