import React from 'react';
import Image from 'next/image';
import { Product } from '../models/interfaces';

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  return (
    <div className="border rounded-lg shadow-lg p-4 hover:shadow-2xl transition-shadow bg-white">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        className="rounded-t-md object-cover w-full h-48"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-blue-500 font-bold">€{product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
