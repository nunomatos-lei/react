
'use client'; 
import React from 'react';
import tecnologias from '@/app/data/tecnologias.json';
import Card from '../components/Card'; // Ajuste o caminho conforme necessário
import TecCard from '../components/TecCard';

export default function TecnologiasPage() {
  if (!tecnologias || tecnologias.length === 0) {
    return <div>Não há tecnologias disponíveis.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-8">Tecnologias</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tecnologias.map((tecnologia) => (
          <TecCard key={tecnologia.title} tecnologia={tecnologia} />
        ))}
      </div>
    </div>
  );
}
