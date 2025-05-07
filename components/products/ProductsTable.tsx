import { Search } from 'lucide-react';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import { Suspense } from 'react';
import ProductsTableSkeleton from './products-table-skeleton';

async function ProductsTable() {
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

      <Suspense fallback={<ProductsTableSkeleton />}>
        <div className="overflow-x-auto">
          <table className="divide-border min-w-full divide-y">
            <TableBody />
          </table>
        </div>
      </Suspense>

      <TableFooter />
    </div>
  );
}

export default ProductsTable;
