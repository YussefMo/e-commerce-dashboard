import { formatDate } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface TableBodyProps {
  orders: Orders[] | null;
}

function TableBody({ orders }: TableBodyProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No orders found.</div>
    );
  }

  return (
    <tbody className="bg-card divide-border divide-y">
      {orders.map((order) => (
        <tr key={order.id}>
          <td className="px-6 py-4 whitespace-nowrap">
            {order.shippingAddress.name}
          </td>
          <td className="text-foreground px-6 py-4 text-sm font-medium whitespace-nowrap">
            {order.items?.length} {order.items?.length === 1 ? 'item' : 'items'}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span
              className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${order.status === 'pending' ? 'bg-red-100 text-red-800' : order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
            >
              {order.status}
            </span>
          </td>
          <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
            ${order.totalAmount.toFixed(2)}
          </td>
          <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
            {formatDate(order.createdAt)}
          </td>
          <td className="flex items-center px-6 py-6 text-sm font-medium whitespace-nowrap">
            <Link
              href={`/orders/${order.id}`}
              className="bg-icon text-primary flex cursor-pointer items-center rounded-lg p-2"
              title="Edit"
            >
              more info <ChevronRight />
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
