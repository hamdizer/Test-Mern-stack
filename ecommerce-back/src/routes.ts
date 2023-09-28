import { Router } from "express";
import {
  productList,
  deleteProduct,
  insertProduct,
  updateProduct,
  getProduct,
} from "./controller/product.controller";
import {
  countryPricingList,
  deleteCountryPricing,
  getCountryPricing,
  insertCountryPricing,
  updateCountryPricing,
} from "./controller/country-pricing.controller";
import {
  userList,
  deleteUser,
  insertUser,
  updateUser,
  getUser,
} from "./controller/user.controller";
import { Login, Logout, Register } from "./controller/auth.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { countryList, deleteCountry, insertCountry, updateCountry } from "./controller/country.controller";

export const routes = (router: Router) => {
  //products
  router.get("/api/products", productList);
  router.post("/api/products",AuthMiddleware, insertProduct);
  router.put("/api/products/:id",AuthMiddleware, updateProduct);
  router.delete("/api/products/:id",AuthMiddleware, deleteProduct);
  router.get("/api/products/:id", getProduct);

  //country Prices
  router.get("/api/countryPrices", countryPricingList);
  router.post("/api/countryPrices", insertCountryPricing);
  router.put("/api/countryPrices/:id", updateCountryPricing);
  router.delete("/api/countryPrices/:id", deleteCountryPricing);
  router.get("/api/countryPrices/:id", getCountryPricing);

  //users
  router.get("/api/users", userList);
  router.post("/api/users", insertUser);
  router.put("/api/users/:id", updateUser);
  router.delete("/api/users/:id", deleteUser);
  router.get("/api/users/:email", getUser);

  //auth
  router.post("/api/auth/register", Register);
  router.post("/api/auth/login", Login);
  router.post("/api/auth/logout", Logout);
  //countries
  router.get("/api/countries", countryList);
  router.post("/api/countries", insertCountry);
  router.put("/api/countries/:id", updateCountry);
  router.delete("/api/countries/:id", deleteCountry);

};
