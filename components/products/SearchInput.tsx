'use client';

import { usePageContext } from '@/lib/PageContextProvider';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SearchInput({
  defaultValue,
  currentPage,
  products
}: SearchInputProps) {
  const router = useRouter();

  const debounce = (fn: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const { setPageContextData } = usePageContext();

  useEffect(() => {
    setPageContextData({
      pageName: 'products',
      searchedProduct: defaultValue,
      currentPageOfPagination: currentPage,
      dataResults: products,
      theUsedDataInThePage: [
        'imageUrls',
        'productName',
        'stock',
        'price',
        'createdAt'
      ],
      theActionsInThePage: ['Edit', 'Delete'],
      description:
        'the dataResults is the whole object from th db but not all the data in it is used only the theUsedDataInThePage is really used and mapped in the ui and for the stock it says if the product is in-stock or not it dosnt display the number directly and the theActionsInThePage is the action the admin can take for each product'
    });
  }, [currentPage, defaultValue, products, setPageContextData]);

  const handleSearch = debounce((term: string) => {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.replace(`?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Search..."
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="border-input bg-background focus:ring-primary focus:border-primary w-full rounded-lg border py-2 pr-4 pl-10"
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search />
      </div>
    </div>
  );
}
