'use client';
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Product } from '../models/interfaces';
import Card from '../components/Card';

export default function ProdutosPage() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: products, error, isLoading } = useSWR<Product[], Error>('/api/products', fetcher);

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (products) {
      if (!search.trim()) {
        setFilteredData(products);
      } else {
        const newFilteredData = products.filter(
          (product) =>
            product.title &&
            product.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(newFilteredData);
      }
    }
  }, [search, products]);

  const handlePurchase = async () => {
    try {
      const response = await fetch('/api/buy', {
        method: 'POST',
        body: JSON.stringify({
          products : cart.map(product => product.id),
          name: "",
          student: false,
          coupon: ""
        }),

        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Compra realizada com sucesso!');
        setCart([]);
        localStorage.removeItem('cart');
      } else {
        alert('Erro ao realizar a compra1.');
      }
    } catch (error) {
      console.error('Erro ao realizar a compra3:', error);
      alert('Erro ao realizar a compra2.');
    }
  };

  if (error) return <div className="text-red-500">Erro ao carregar os produtos.</div>;
  if (isLoading) return <div className="text-gray-500">A carregar os produtos...</div>;
  if (!products || products.length === 0) return <div className="text-gray-500">Não há produtos disponíveis.</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-8">Produtos</h1>
      
      <input
        type="text"
        placeholder="Pesquisar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.map((product) => (
          <Card key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Carrinho</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">O carrinho está vazio.</p>
        ) : (
          <>
            <ul className="list-disc pl-5">
              {cart.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.title} - €{item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <button
              onClick={handlePurchase}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              Comprar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
