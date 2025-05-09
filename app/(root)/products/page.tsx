import ProductsTableSkeleton from '@/components/products/products-table-skeleton';
import ProductsTable from '@/components/products/ProductsTable';
import { Suspense } from 'react';

async function Page({ searchParams }: searchParamsPagination) {
  const { page } = await searchParams;
  const currentPage = Number(page ?? '1');

  return (
    <Suspense fallback={<ProductsTableSkeleton />}>
      <ProductsTable currentPage={currentPage} />
    </Suspense>
  );
}

export default Page;
