import React from 'react';
import Image from 'next/image';
import { Product } from '../models/interfaces';

interface CardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function Card({ product, onAddToCart }: CardProps) {
  return (
    <div className="border rounded-lg shadow-lg p-4 hover:shadow-2xl transition-shadow bg-white">
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={200}
        className="rounded-t-md object-cover w-full h-48"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{product.title || 'Produto sem nome'}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-blue-500 font-bold">€{product.price.toFixed(2)}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
