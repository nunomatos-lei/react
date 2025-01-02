// components/Card.tsx
import React from 'react';
import Image from 'next/image';
import { Tecnologia } from '../models/interfaces'; // Certifique-se de ajustar o caminho de acordo com sua estrutura

interface CardProps {
  tecnologia: Tecnologia;
}

export default function TecCard({ tecnologia }: CardProps) {
  return (
    <div className="border rounded-lg shadow-lg p-4 hover:shadow-2xl transition-shadow bg-white">
      <Image
        src={tecnologia.image}
        alt={tecnologia.title}
        width={300}
        height={200}
        className="rounded-t-md object-cover w-full h-48"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{tecnologia.title}</h2>
        <p className="text-gray-700 mb-4">{tecnologia.description}</p>
        <div className="text-yellow-500">
          {'⭐'.repeat(tecnologia.rating)} {/* Exibe as estrelas conforme o rating */}
        </div>
      </div>
    </div>
  );
}
