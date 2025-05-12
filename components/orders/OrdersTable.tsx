import { getAllOrdersWithAction } from '@/lib/action/orders.action';
import React from 'react';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import { ReceiptText } from 'lucide-react';

async function OrdersTable({
  currentPage,
  children,
  status
}: OrdersTableProps) {
  const response = await getAllOrdersWithAction(currentPage, status);
  const orders = response?.orders || [];
  const totalPages = response?.totalPages || 1;

  return (
    <div className="bg-card text-foreground mt-20 rounded-lg p-4 shadow-md sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <ReceiptText /> Orders List
        </h2>
        {/* @ts-ignore */}
        {React.cloneElement(children, {
          currentPage: currentPage,
          orders: orders,
          status: status,
          totalPages: totalPages
        })}
      </div>

      <div className="border-border overflow-y-auto rounded-md border">
        <table className="divide-border min-w-full divide-y">
          <TableBody orders={orders} />
        </table>
      </div>

      <TableFooter currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export default OrdersTable;
