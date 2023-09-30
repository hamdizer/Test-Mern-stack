import React, { useEffect, useState } from "react";
import { CountryPricing, Product } from "../../../types";
import {
  addProduct,
  getProduct,
  updateProduct,
} from "../../../services/product";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const currencies: string[] = ["TND", "EUR", "USD", "TRY", "GBP"];
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    sku: "",
    countryPrice: [],
  });

  useEffect(() => {
    getProduct(`${location.state}`)
      .then((response) => {
        delete response.data.product._id;
        delete response.data.product.__v;
    setProduct(response.data.product)
      
       

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChangePrice=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,index:number)=>{
    if(product.countryPrice){
      product.countryPrice[index].price=parseInt(event.target.value)
      const NewCountryPrice=product.countryPrice
    setProduct({...product,countryPrice:NewCountryPrice})
  }
}
  useEffect(()=>{
    console.log(product)
  },[product])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct: any) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(product);
    const productData={
      product:{
        sku:product?.sku,
        title:product?.title,
        description:product?.description,
      },
      countryPrice:product?.countryPrice

    }
    // Handle form submission, e.g., send data to an API
    updateProduct(location.state, productData)
      .then((response) => {
        console.log(response);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="sku"
              className="block text-sm font-medium text-gray-700 text-center"
            >
              Stock Keeping Unit
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              defaultValue={product?.sku}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 "
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 text-center"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              defaultValue={product?.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 "
              required
            ></input>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block font-medium mb-2 text-center"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={product?.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-center"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 text-center"
            >
              Prices
            </label>
            {currencies?.map((currency, index) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 text-center">
                  {currency}
                </label>
                <input
                  type="text"
                  defaultValue={product.countryPrice&&product?.countryPrice[index]?.price}
                  value={product.countryPrice&&product?.countryPrice[index]?.price}
                  onChange={(e)=>handleChangePrice(e,index)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            ))}
            {/*<div>
                <label className="block text-sm font-medium text-gray-700 text-center">
                  TND
                </label>
                <input
                  type="text"
                  id={"pricetn"}
                  name="pricetn"
                  value={product?.countryPrice?.filter((countryPrice:CountryPricing)=>countryPrice?.currency==="TND")[0]?.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 text-center">
                  EUR
                </label>
                <input
                  type="text"
                  id={"priceeur"}
                  name="priceeur"
                  value={product?.countryPrice?.filter((countryPrice:CountryPricing)=>countryPrice?.currency==="EUR")[0]?.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 text-center">
                 USD
                </label>
                <input
                  type="text"
                  id={"priceusd"}
                  name="priceusd"
                  value={product?.countryPrice?.filter((countryPrice:CountryPricing)=>countryPrice?.currency==="USD")[0]?.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 text-center">
                 TRY
                </label>
                <input
                  type="text"
                  id={"pricetry"}
                  name="pricetry"
                  value={product?.countryPrice?.filter((countryPrice:CountryPricing)=>countryPrice?.currency==="TRY")[0]?.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 text-center">
                 GBP
                </label>
                <input
                  type="text"
                  id={"pricegbp"}
                  name="pricegbp"
                  value={product?.countryPrice?.filter((countryPrice:CountryPricing)=>countryPrice?.currency==="GBP")[0]?.price}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
          </div>*/}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Edit Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
