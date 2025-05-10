'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface TableFooterProps {
  currentPage: number;
  totalPages: number;
}

function TableFooter({ currentPage, totalPages }: TableFooterProps) {
  const router = useRouter();

  // Prefetch the next page when component mounts or currentPage changes
  useEffect(() => {
    if (currentPage < totalPages) {
      router.prefetch(`?page=${currentPage + 1}`);
    }
  }, [currentPage, totalPages, router]);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [1];

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const linkClass = (active: boolean) =>
    clsx(
      'px-3 py-1 rounded-md border text-sm',
      active
        ? 'bg-icon text-white border-primary'
        : 'hover:bg-muted border-input text-muted-foreground'
    );

  return (
    <div className="mt-6 flex justify-center border-t pt-4">
      <nav className="flex items-center gap-3">
        <Link
          href={currentPage > 1 ? `?page=${currentPage - 1}` : '#'}
          className={`${linkClass(currentPage !== 1)} ${currentPage === 1 && 'cursor-not-allowed'}`}
          aria-disabled={currentPage === 1}
        >
          Previous
        </Link>

        <div className="flex gap-1">
          {getPageNumbers().map((page, index) => (
            <span key={index}>
              {page === '...' ? (
                <span className="text-muted-foreground px-2">...</span>
              ) : (
                <Link
                  href={`?page=${page}`}
                  className={linkClass(currentPage === page)}
                >
                  {page}
                </Link>
              )}
            </span>
          ))}
        </div>

        <Link
          href={currentPage < totalPages ? `?page=${currentPage + 1}` : '#'}
          className={`${linkClass(currentPage !== totalPages)} ${currentPage === totalPages && 'cursor-not-allowed'}`}
          aria-disabled={currentPage === totalPages}
        >
          Next
        </Link>
      </nav>
    </div>
  );
}

export default TableFooter;
