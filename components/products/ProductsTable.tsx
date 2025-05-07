import { getAllProducts } from '@/lib/action/product.action';
import { Search } from 'lucide-react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

async function ProductsTable() {
  const products: Product[] | null = await getAllProducts();

  if (!products || products.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No products found.</div>
    );
  }

  return (
    <div className="bg-card text-foreground rounded-lg p-4 shadow-md sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Product List</h2>
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search..."
            className="border-input bg-background focus:ring-primary focus:border-primary w-full rounded-lg border py-2 pr-4 pl-10"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="divide-border min-w-full divide-y">
          <TableBody products={products} />
        </table>
      </div>

      {/* Pagination */}
      <TableFooter />
    </div>
  );
}

export default ProductsTable;
