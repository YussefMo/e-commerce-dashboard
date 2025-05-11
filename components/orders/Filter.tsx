'use client';

import { usePageContext } from '@/lib/PageContextProvider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

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

function Filter({ currentPage, orders, status }: FilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  // const [isOpen, setIsOpen] = useState(false);
  const { setPageContextData } = usePageContext();

  const activeFilter = searchParams.get('status') ?? 'all';

  function filterHandler(filter: string) {
    const params = new URLSearchParams();
    params.set('status', filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    // setIsOpen(false);
  }

  useEffect(() => {
    setPageContextData({
      pageName: 'Orders',
      ordersData: orders,
      currentPageOfPagination: currentPage,
      filteredBasedOnStatus: status,
      description:
        'this page is about the orders the customers has placed use the provided data to answer the user questions and for the filteredBasedOnStatus if its undefined that mean there is no filter appalled and for the used data in the table is customers names and the length of the ordered items order status totalAmount createdAt date and an action for viewing more information of the order'
    });
  }, [currentPage, orders, setPageContextData, status]);

  return (
    <div className="relative">
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

      {/* small screens - filter icon with dropdown
      <div className="w-full lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white transition-all hover:opacity-90"
          aria-label="Filter projects"
        >
          <FiFilter className="h-5 w-5" />
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
      </div> */}
    </div>
  );
}

export default Filter;
