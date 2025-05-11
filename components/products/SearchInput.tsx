'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchInput({ defaultValue }: SearchInputProps) {
  const router = useRouter();

  const debounce = (fn: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

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
    <div className="bg-card absolute w-full max-w-xs rounded-lg right-5">
      <input
        type="text"
        placeholder="Search..."
        defaultValue={defaultValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="border-input bg-card focus:ring-primary focus:border-primary w-full rounded-lg border py-2 pr-4 pl-10"
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search />
      </div>
    </div>
  );
}
