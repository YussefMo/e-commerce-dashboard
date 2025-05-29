'use client';

import { usePageContext } from '@/lib/PageContextProvider';
import { ordersCount, totalSales, confirmedOrdersCount } from './DataCard';
import { latestProducts } from './Latest3Products';
import {
  processedData,
  currentPeriodSales,
  salesChange
} from './LineChartContainer';
import { topProducts } from './PiChartContainer';
import { useEffect } from 'react';

function DashboardContextPass({ last }: { last: string }) {
  const { setPageContextData } = usePageContext();

  useEffect(() => {
    setPageContextData({
      pageName: 'main dashboard',
      ordersCount,
      totalSales,
      confirmedOrdersCount,
      latestProducts,
      processedData,
      currentPeriodSales,
      salesChange,
      topProducts,
      ShowingTimePeriod: last,
      description:
        'this page is responsible for visualizing data to the user with line and pie chart and viewing some relative data like the count of orders and total sales and confirmed orders all of the data are set to a period of time for this options (last 7, last 30, last90 days and last year and all the time filter) make suer to use this data for analyzing the store performance and sets for improvement etc for the processedData section is the data used or the line chart and dont reference the processedData part to the user its an variable name in the code'
    });
  }, [last, setPageContextData]);

  return null;
}

export default DashboardContextPass;
