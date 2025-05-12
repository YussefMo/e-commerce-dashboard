import { getAllProductsWithAction } from '@/lib/action/product.action';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import React from 'react';
import { ShoppingBasket } from 'lucide-react';

async function ProductsTable({
  currentPage,
  children,
  search
}: ProductsTableProps) {
  const response = await getAllProductsWithAction(currentPage, search);
  const products = response?.products || [];
  const totalPages = response?.totalPages || 1;

  return (
    <div className="bg-card text-foreground mt-20 rounded-lg p-4 shadow-md sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <ShoppingBasket /> Products List
        </h2>
        {/* @ts-ignore */}
        {React.cloneElement(children, {
          currentPage: currentPage,
          products: products
        })}
      </div>

      <div className="border-border overflow-y-auto rounded-md border">
        <table className="divide-border min-w-full divide-y">
          <TableBody products={products} />
        </table>
      </div>

      <TableFooter currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export default ProductsTable;
