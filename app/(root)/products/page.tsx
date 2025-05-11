import ProductContextPass from '@/components/products/ProductContextPass';
import ProductsTableSkeleton from '@/components/products/products-table-skeleton';
import ProductsTable from '@/components/products/ProductsTable';
import SearchInput from '@/components/products/SearchInput';
import { Suspense } from 'react';

async function Page({ searchParams }: searchParamsPagination) {
  const { page, search } = await searchParams;
  const currentPage = Number(page ?? '1');

  return (
    <>
      <SearchInput />
      <Suspense fallback={<ProductsTableSkeleton />} key={search}>
        <ProductsTable currentPage={currentPage} search={search}>
          <ProductContextPass />
        </ProductsTable>
      </Suspense>
    </>
  );
}

export default Page;
