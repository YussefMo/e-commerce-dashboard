import CouponsPageContext from '@/components/coupons/CouponsPageContext';
import CouponsTable from '@/components/coupons/CouponsTable';
import ProductsTableSkeleton from '@/components/products/products-table-skeleton';
import { Suspense } from 'react';

interface PageProps {
  searchParams: { page?: number  };
}

async function Page({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page ?? '1');

  return (
    <Suspense fallback={<ProductsTableSkeleton />}>
      <CouponsTable currentPage={currentPage}>
        <CouponsPageContext />
      </CouponsTable>
    </Suspense>
  );
}

export default Page;
