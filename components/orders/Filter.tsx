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

  const activeFilter = searchParams.get('status') ?? 'all';

  function filterHandler(filter: string) {
    const params = new URLSearchParams();
    params.set('status', filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  }

  return (
    <div className="bg-card absolute right-5 w-fit rounded-lg">
      {/* large screens - regular filter */}
      <div className="hidden w-full flex-wrap justify-center gap-2 rounded-md p-2 lg:flex">
        <Button
          filter="all"
          activeFilter={activeFilter}
          filterHandler={filterHandler}
        >
          All
        </Button>
        <Button
          filter="pending"
          activeFilter={activeFilter}
          filterHandler={filterHandler}
        >
          Pending
        </Button>
        <Button
          filter="processing"
          activeFilter={activeFilter}
          filterHandler={filterHandler}
        >
          Processing
        </Button>
        <Button
          filter="shipped"
          activeFilter={activeFilter}
          filterHandler={filterHandler}
        >
          Shipped
        </Button>
        <Button
          filter="delivered"
          activeFilter={activeFilter}
          filterHandler={filterHandler}
        >
          Delivered
        </Button>
      </div>

      {/* small screens - filter icon with dropdown */}
      <div className="w-full lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full bg-icon p-3 text-white transition-all hover:opacity-90"
          aria-label="Filter projects"
        >
          <FilterIcon className="h-5 w-5" />
        </button>

        {isOpen && (
          <div className="flex flex-col gap-2">
            <Button
              filter="all"
              activeFilter={activeFilter}
              filterHandler={filterHandler}
            >
              All projects
            </Button>
            <Button
              filter="vanilla"
              activeFilter={activeFilter}
              filterHandler={filterHandler}
            >
              Vanilla Projects
            </Button>
            <Button
              filter="react"
              activeFilter={activeFilter}
              filterHandler={filterHandler}
            >
              React Projects
            </Button>
            <Button
              filter="next"
              activeFilter={activeFilter}
              filterHandler={filterHandler}
            >
              next Projects
            </Button>
            <Button
              filter="full-system"
              activeFilter={activeFilter}
              filterHandler={filterHandler}
            >
              Full system Projects
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;
