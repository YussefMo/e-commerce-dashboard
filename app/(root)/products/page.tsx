import { Suspense } from 'react';
import ProductsTableSkeleton from '@/components/products/products-table-skeleton';
import ProductsTable from '@/components/products/ProductsTable';

function Page() {
  return (
    <>
      <h1>Products</h1>
      <Suspense fallback={<ProductsTableSkeleton />}>
        <ProductsTable />
      </Suspense>
    </>
  );
}

export default Page;
