'use client';

import { FilterIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useState } from 'react';

interface ButtonProps {
  filter: string;
  children: ReactNode;
  activeFilter: string;
  // eslint-disable-next-line no-unused-vars
  filterHandler: (filter: string) => void;
}

function Button({
  filter,
  children,
  activeFilter,
  filterHandler
}: ButtonProps) {
  const isActive = filter === activeFilter;

  return (
    <button
      onClick={() => filterHandler(filter)}
      className={`hover:bg-icon cursor-pointer rounded-md px-5 py-2 hover:text-white ${
        isActive ? 'bg-icon text-white' : ''
      }`}
    >
      {children}
    </button>
  );
}

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const activeFilter = searchParams.get('last') ?? '7';

  function filterHandler(filter: string) {
    const params = new URLSearchParams();
    params.set('last', filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  }

  return (
    <div className="bg-card absolute right-5 w-fit rounded-lg">
      {/* large screens - regular filter */}
      <div className="hidden w-full flex-wrap justify-center gap-2 rounded-md p-2 lg:flex">
        <Button
          filter="7"
          activeFilter={activeFilter}
          filterHandler={filterHandler}
        >
          7 Days
        </Button>
        <Button
          filter="30"
          activeFilter={activeFilter}
          filterHandler={filterHandler}
        >
          30 Days
        </Button>
        <Button
          filter="90"
          activeFilter={activeFilter}
          filterHandler={filterHandler}
        >
          90 Days
        </Button>
        <Button
          filter="360"
          activeFilter={activeFilter}
          filterHandler={filterHandler}
        >
          1 Year
        </Button>
        <Button
          filter="all"
          activeFilter={activeFilter}
          filterHandler={filterHandler}
        >
          all time
        </Button>
      </div>

      {/* small screens - filter icon with dropdown */}
      <div className="w-full lg:hidden">
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-icon rounded-full p-3 text-right text-white transition-all hover:opacity-90"
            aria-label="Filter projects"
          >
            <FilterIcon className="h-5 w-5" />
          </button>
        </div>

        {isOpen && (
          <div className="flex flex-col gap-2">
            <Button
              filter="7"
              activeFilter={activeFilter}
              filterHandler={filterHandler}
            >
              7 Days
            </Button>
            <Button
              filter="30"
              activeFilter={activeFilter}
              filterHandler={filterHandler}
            >
              30 Days
            </Button>
            <Button
              filter="90"
              activeFilter={activeFilter}
              filterHandler={filterHandler}
            >
              90 Days
            </Button>
            <Button
              filter="365"
              activeFilter={activeFilter}
              filterHandler={filterHandler}
            >
              1 Year
            </Button>
            <Button
              filter="all"
              activeFilter={activeFilter}
              filterHandler={filterHandler}
            >
              all time
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;
