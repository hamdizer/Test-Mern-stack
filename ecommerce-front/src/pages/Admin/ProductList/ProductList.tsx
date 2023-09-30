import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { deleteProduct, getAllProducts } from "../../../services/product";
import { useNavigate } from "react-router-dom";

const ProductListAdmin = () => {
  const [products, setProducts] = useState<any>();
  const currencies: string[] = ["TND", "EUR", "USD", "TRY", "GBP"];
  const navigate = useNavigate();
  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id: number) => {
    deleteProduct(id)
      .then((reponse) => {
        console.log(reponse);
        getAllProducts()
          .then((response) => {
            setProducts(response.data.products);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <button
        onClick={() => navigate("/admin/products/add")}
        className="bg-green-500 text-white px-4 py-2 mb-4"
      >
        <FontAwesomeIcon icon={faPlus} /> Add
      </button>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Sku</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            {currencies.map((currency:string,index:number)=><th key={index} className="px-4 py-2">{`price ${currency}`}</th>
)}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((row: any) => (
            <tr key={row.id}>
              <td className="border px-4 py-2">{row.sku}</td>
              <td className="border px-4 py-2">{row.title}</td>
              <td className="border px-4 py-2">{row.description}</td>
              {currencies.map((currency:string,index:number)=><td key={index} className="border px-4 py-2">{row.countryPrice[index].price}</td>)}

              <td className="border px-4 py-2">
                <button
                  onClick={() => navigate("/admin/products/edit", {state:row._id})}
                  className="text-blue-500"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="text-red-500 ml-2"
                  onClick={() => {
                    console.log(row);
                    handleDelete(row._id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListAdmin;
