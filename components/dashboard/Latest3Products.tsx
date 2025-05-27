'use client';

import { getAllProducts } from '@/lib/action/product.action';
import TableBody from '../products/TableBody';
import { useEffect, useState } from 'react';

function Latest3Products() {
  const [products, setProducts] = useState<Product[] | null>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts as Product[]);
    };
    fetchProducts();
  }, []);

  const latestProducts = products ? products.slice(0, 3) : [];

  return (
    <>
      <h2 className="text-card-foreground mb-4 text-xl font-semibold">
        Latest Products
      </h2>
      {latestProducts.length > 0 ? (
        <table className="bg-card w-full rounded-lg p-4 shadow-md">
          <TableBody products={latestProducts as Products[]} />
        </table>
      ) : (
        <p className="text-muted-foreground bg-card h-full w-full rounded-lg p-4 shadow-md">
          No products found.
        </p>
      )}
    </>
  );
}

export default Latest3Products;
