'use client';

import DataCard from '@/components/dashboard/DataCard';
import Filter from '@/components/dashboard/Filter';
import Latest3Products from '@/components/dashboard/Latest3Products';
import Spinner from '@/components/Spinner';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function Page() {
  const searchParams = useSearchParams();
  const last = searchParams.get('last') ?? '7';

  return (
    <>
      <Filter />
      <div className="mt-20 grid grid-cols-12 grid-rows-14 gap-4 max-xl:flex max-xl:flex-col max-xl:gap-4">
        <div className="col-span-4 row-span-4 rounded-md bg-gradient-to-r from-[#ADCDFC] to-[#CBACFE] p-2 max-xl:col-span-full dark:bg-gradient-to-tr dark:from-[#92FFC0] dark:to-[#0064FF]">
          <h1>store visits</h1>
          <p>not available until finishing the store</p>
        </div>
        <div className="col-span-4 col-start-5 row-span-4 flex flex-wrap items-center justify-center gap-2 rounded-md">
          <Suspense key={last} fallback={<Spinner />}>
            <DataCard last={last} />
          </Suspense>
        </div>
        <div className="bg-card col-span-4 col-start-9 row-span-9 row-start-1 rounded-md p-2">
          4
        </div>
        <div className="bg-card col-span-8 row-span-5 row-start-5 rounded-md p-2">
          <Suspense fallback={<Spinner />}>
            <Latest3Products />
          </Suspense>
        </div>
        <div className="bg-card col-span-9 row-span-5 row-start-10 rounded-md p-2">
          6
        </div>
        <div className="bg-card col-span-3 col-start-10 row-span-5 row-start-10 rounded-md p-2">
          7
        </div>
      </div>
    </>
  );
}

export default Page;
