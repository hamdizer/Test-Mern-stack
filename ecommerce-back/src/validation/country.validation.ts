import { Joi } from "express-validation";
export const CountryValidation = Joi.object({
  code: Joi.string().required(),
  description: Joi.string().required(),
});
