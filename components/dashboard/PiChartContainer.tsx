import { getAllOrders } from '@/lib/action/orders.action';
import PiChart from './PiChart';

interface TopProductData {
  name: string;
  sales: number;
}

async function PiChartContainer({ last }: { last: string }) {
  const orders = await getAllOrders(last);

  let topProducts: TopProductData[] = [];

  if (orders) {
    const productSales: { [key: string]: number } = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const productName = item.productName;
        const itemTotal = item.quantity * item.price;
        if (productSales[productName]) {
          productSales[productName] += itemTotal;
        } else {
          productSales[productName] = itemTotal;
        }
      });
    });

    topProducts = Object.keys(productSales)
      .map((name) => ({ name, sales: productSales[name] }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 3);
  }

  return <PiChart topProducts={topProducts} />;
}

export default PiChartContainer;
