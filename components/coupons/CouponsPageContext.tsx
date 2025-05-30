'use client';

import { usePageContext } from '@/lib/PageContextProvider';
import { useEffect } from 'react';

interface ContextProps {
  currentPage?: number;
  coupons?: Coupons[];
  totalPages?: number;
}

function CouponsPageContext({
  currentPage,
  coupons,
  totalPages
}: ContextProps) {
  const { setPageContextData } = usePageContext();
  useEffect(() => {
    setPageContextData({
      pageName: 'Orders',
      couponsData: coupons,
      currentPageOfPagination: currentPage,
      totalPages,
      description:
        'this page is responsible for visualize the store coupons and have an edit action to edit coupon and add new one'
    });
  }, [coupons, currentPage, setPageContextData, totalPages]);

  return null;
}

export default CouponsPageContext;
