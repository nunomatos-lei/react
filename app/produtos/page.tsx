'use client'; // Para utilizar hooks no lado do cliente
import React from 'react';
import useSWR from 'swr';
import { Product } from '../models/interfaces';
import Card from '../components/Card';

export default function ProdutosPage() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: products, error, isLoading } = useSWR<Product[], Error>('/api/products', fetcher);

  if (error) return <div>Erro ao carregar os produtos.</div>;
  if (isLoading) return <div>A carregar os produtos...</div>;
  if (!products || products.length === 0) return <div>Não há produtos disponíveis.</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-8">Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
