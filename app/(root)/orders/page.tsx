import Filter from '@/components/orders/Filter';
import OrderContextPass from '@/components/orders/OrderContextPass';
import OrdersTable from '@/components/orders/OrdersTable';
import ProductsTableSkeleton from '@/components/products/products-table-skeleton';
import { Suspense } from 'react';

async function Page({ searchParams }: searchParamsOrders) {
  const { page, status, id } = await searchParams;
  const currentPage = Number(page ?? '1');

  return (
    <>
      <Filter />
      <Suspense fallback={<ProductsTableSkeleton />} key={status}>
        <OrdersTable currentPage={currentPage} status={status} id={id}>
          <OrderContextPass />
        </OrdersTable>
      </Suspense>
    </>
  );
}

export default Page;
