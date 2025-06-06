import DashboardContextPass from '@/components/dashboard/DashboardContextPass';
import DataCard from '@/components/dashboard/DataCard';
import Filter from '@/components/dashboard/Filter';
import Latest3Products from '@/components/dashboard/Latest3Products';
import LineChartContainer from '@/components/dashboard/LineChartContainer';
import PiChartContainer from '@/components/dashboard/PiChartContainer';
import Spinner from '@/components/Spinner';
import { Suspense } from 'react';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function Page({ searchParams }: PageProps) {
  const { last } = await searchParams;

  return (
    <>
      <DashboardContextPass last={last as string} />
      <Filter />
      <div className="mt-20 grid grid-cols-12 grid-rows-14 gap-4 max-xl:flex max-xl:flex-col max-xl:gap-4">
        <div className="col-span-4 row-span-4 rounded-md bg-gradient-to-r from-[#ADCDFC] to-[#CBACFE] p-3 max-xl:col-span-full dark:bg-gradient-to-tr dark:from-[#92FFC0] dark:to-[#0064FF]">
          <h1>store visits</h1>
          <p>not available until finishing the store</p>
        </div>

        <div className="bg-card col-span-8 col-start-5 row-span-4 flex flex-wrap items-center justify-center gap-2 rounded-md">
          <Suspense key={last as string} fallback={<Spinner />}>
            <DataCard searchParams={last as string} />
          </Suspense>
        </div>

        <div className="bg-card col-span-9 row-span-5 row-start-5 rounded-md p-3">
          <Suspense fallback={<Spinner />}>
            <Latest3Products />
          </Suspense>
        </div>

        <div className="bg-card col-span-12 row-span-5 row-start-10 rounded-md p-3">
          <Suspense key={last as string} fallback={<Spinner />}>
            <LineChartContainer last={last as string} />
          </Suspense>
        </div>

        <div className="bg-card col-span-3 col-start-10 row-span-5 row-start-5 rounded-md p-3">
          <Suspense key={last as string} fallback={<Spinner />}>
            <PiChartContainer last={last as string} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default Page;
