'use client';

import { usePageContext } from '@/lib/PageContextProvider';
import { useEffect } from 'react';

function OrderContextPass({ currentPage, orders, status, totalPages }: FilterProps) {
  const { setPageContextData } = usePageContext();
  useEffect(() => {
    setPageContextData({
      pageName: 'Orders',
      ordersData: orders,
      currentPageOfPagination: currentPage,
      filteredBasedOnStatus: status,
      totalPages,
      description:
        'this page is about the orders the customers has placed use the provided data to answer the user questions and for the filteredBasedOnStatus if its undefined that mean there is no filter appalled and for the used data in the table is customers names and the length of the ordered items order status totalAmount createdAt date and an action for viewing more information of the order'
    });
  }, [currentPage, orders, setPageContextData, status, totalPages]);
  return null;
}

export default OrderContextPass;
