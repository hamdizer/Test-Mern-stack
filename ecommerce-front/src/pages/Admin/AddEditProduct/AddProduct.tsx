import React, { useState } from "react";
import { Product } from "../../../types";
import { addProduct } from "../../../services/product";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const currencies: string[] = ["TND", "EUR", "USD", "TRY", "GBP"];
const navigate=useNavigate()
  const [product, setProduct] = useState<any>({
    sku: "",
    title: "",
    description: "",
    pricetn:"",
    priceeur:"",
    priceusd:"",
    pricetry:"",
    pricegbp:""
    
  });
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct:any) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    const productData={
      product:{
      sku:product?.sku,
      title:product?.title,
      description:product?.description,
      },
      countryPrice:[{
        currency:"TND",
        price:product?.pricetn,
      },
      {
        currency:"EUR",
        price:product?.priceeur,

      },
      {
        currency:"USD",
        price:product?.priceusd,

      },
      {
        currency:"TRY",
        price:product?.pricetry,

      },
      {
        currency:"GBP",
        price:product?.pricegbp,

      }
    ]
    }
    console.log(productData)
    // Handle form submission, e.g., send data to an API

    addProduct(productData)
      .then((response) => {
        console.log(response);
        navigate(-1)
      })
      .catch((err) => {
        console.log(err);
      });
  };
 /* const handleChangePrice=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
     var i=0;
     product?.countryPricing&& product?.countryPricing.push({[`price ${i++}`]:event.target.value})
     setProduct(product)

  }*/
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Create a New Product</h2>
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
              value={product?.sku}
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
              value={product?.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 "
              required
            ></input>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-2 text-center">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product?.description}
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
            {/*currencies?.map((currency,index) => (
              <div>
                <label className="block text-sm font-medium text-gray-700 text-center">
                  {currency}
                </label>
                <input
                  type="text"
                  id={`price ${index }`}
                  value={product.countryPricing[`price${index}`]}
                  onChange={handleChangePrice}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            ))*/}
             <div>
                <label className="block text-sm font-medium text-gray-700 text-center">
                  TND
                </label>
                <input
                  type="text"
                  id={"pricetn"}
                  name="pricetn"
                  value={product?.pricetn}
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
                  value={product?.priceeur}
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
                  value={product?.priceusb}
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
                  value={product?.pricetry}
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
                  value={product?.pricegbp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
