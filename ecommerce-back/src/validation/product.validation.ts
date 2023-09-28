import { Joi } from "express-validation";
export const ProductValidation = Joi.object({
  sku:Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  countryPrice:Joi.array().optional()
});
