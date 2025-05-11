'use client';

import { usePageContext } from '@/lib/PageContextProvider';
import { useEffect } from 'react';

function ProductContextPass({
  defaultValue,
  currentPage,
  products,
  totalPages
}: SearchInputProps) {
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
      totalPages: totalPages,
      description:
        'the dataResults is the whole object from th db but not all the data in it is used only the theUsedDataInThePage is really used and mapped in the ui and for the stock it says if the product is in-stock or not it dosnt display the number directly and the theActionsInThePage is the action the admin can take for each product'
    });
  }, [currentPage, defaultValue, products, setPageContextData, totalPages]);
  return null;
}

export default ProductContextPass;
