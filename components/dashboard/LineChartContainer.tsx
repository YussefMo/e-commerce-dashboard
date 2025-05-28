import { getAllOrders } from '@/lib/action/orders.action';
import { format } from 'date-fns';
import LineChart from './LineChart';

interface ChartData {
  name: string;
  Sells: number;
  Order: number;
}

interface LineChartProps {
  last: string;
}

async function processOrdersForChart(orders: Orders[]): Promise<ChartData[]> {
  const dailyData: { [key: string]: { sells: number; orders: number } } = {};

  orders.forEach((order) => {
    const date = format(new Date(order.createdAt as string), 'MMM d');
    if (!dailyData[date]) {
      dailyData[date] = { sells: 0, orders: 0 };
    }
    dailyData[date].sells += order.totalAmount;
    dailyData[date].orders += 1;
  });

  const sortedDates = Object.keys(dailyData).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  return sortedDates.map((date) => ({
    name: date,
    Sells: parseFloat(dailyData[date].sells.toFixed(2)),
    Order: dailyData[date].orders
  }));
}

async function LineChartContainer({ last = '7' }: LineChartProps) {
  const orders = await getAllOrders(last);

  let processedData: ChartData[] = [];
  let currentPeriodSales: number = 0;
  let salesChange: number = 0;

  if (orders) {
    processedData = await processOrdersForChart(orders);

    currentPeriodSales = processedData.reduce(
      (sum, data) => sum + data.Sells,
      0
    );

    // Simple change calculation (e.g., last two data points)
    if (processedData.length >= 2) {
      const lastSales = processedData[processedData.length - 1].Sells;
      const secondLastSales = processedData[processedData.length - 2].Sells;
      if (secondLastSales > 0) {
        salesChange = ((lastSales - secondLastSales) / secondLastSales) * 100;
      }
    }
  }

  return (
    <LineChart
      chartData={processedData}
      totalSales={currentPeriodSales}
      salesChange={salesChange}
    />
  );
}

export default LineChartContainer;
