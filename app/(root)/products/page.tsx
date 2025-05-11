import ProductsTableSkeleton from '@/components/products/products-table-skeleton';
import ProductsTable from '@/components/products/ProductsTable';
import SearchInput from '@/components/products/SearchInput';
import { Suspense } from 'react';

async function Page({ searchParams }: searchParamsPagination) {
  const { page, search } = await searchParams;
  const currentPage = Number(page ?? '1');

  return (
    <Suspense fallback={<ProductsTableSkeleton />} key={search}>
      <ProductsTable currentPage={currentPage} search={search}>
        <SearchInput
          defaultValue={search}
          currentPage={currentPage}
          products={[]}
        />
      </ProductsTable>
    </Suspense>
  );
}

export default Page;
