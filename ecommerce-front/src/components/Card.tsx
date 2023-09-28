// src/components/Card.tsx
import React from 'react';

interface CardProps {
  sku:string  
  title: string;
  description: string;
  price:number;
  currency:string

}

const Card = ({sku, title, description ,price,currency}:CardProps) => {
  console.log({sku, title, description ,price,currency})
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4 p-4 ">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 p-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Learn More
        </button>
        {`${price}-${currency}`}
      </div>
      </div>
  );
};

export default Card;
