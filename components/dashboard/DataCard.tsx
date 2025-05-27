import { getAllOrders } from '@/lib/action/orders.action';
import { formatCurrency } from '@/lib/utils';
import { Check, DollarSign, ReceiptText } from 'lucide-react';

async function DataCard({ searchParams }: { searchParams: string }) {
  const last = searchParams ?? '7';

  const orders = await getAllOrders(last);

  const ordersCount = orders?.length;
  const totalSales = orders!.reduce(
    (total, stay) => total + stay.totalAmount,
    0
  );
  const confirmedOrders = orders?.filter(
    (stay) => stay.status === 'shipped' || stay.status === 'delivered'
  );
  const confirmedOrdersCount = confirmedOrders?.length;

  return (
    <>
      <StatsCard
        icon={<ReceiptText />}
        title="Total Orders"
        value={ordersCount}
      />
      <StatsCard
        icon={<DollarSign />}
        title="Total Sales"
        value={formatCurrency(totalSales)}
      />
      <StatsCard
        icon={<Check />}
        title="Confirmed Orders"
        value={confirmedOrdersCount}
      />
    </>
  );
}

function StatsCard({
  icon,
  title,
  value
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number | undefined;
}) {
  return (
    <div className="bg-card border-icon w-[48%] rounded-lg border p-2 text-center shadow-md max-sm:w-full">
      <div className="text-icon mx-auto mb-2 w-fit">{icon}</div>
      <h2 className="text-card-foreground mb-1 text-lg font-semibold">
        {title}
      </h2>
      <p className="text-card-foreground text-2xl font-bold">{value}</p>
    </div>
  );
}

export default DataCard;
