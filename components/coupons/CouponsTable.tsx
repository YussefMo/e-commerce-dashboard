import { getAllCouponsWithAction } from '@/lib/action/coupons.action';
import { Percent } from 'lucide-react';
import React from 'react';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import Link from 'next/link';

async function CouponsTable({ currentPage, children }: CouponsTableProps) {
  let coupons: Coupons[] = [];
  let totalPages = 1;

  const response = await getAllCouponsWithAction(currentPage);
  coupons = response?.coupons || [];
  totalPages = response?.totalPages || 1;

  return (
    <div className="bg-card text-foreground mt-20 rounded-lg p-4 shadow-md sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Percent /> Coupons List
        </h2>
        {/* @ts-ignore */}
        {React.cloneElement(children, {
          currentPage: currentPage,
          coupons: coupons,
          totalPages: totalPages
        })}
      </div>

      <div className="border-border overflow-y-auto rounded-md border">
        <table className="divide-border min-w-full divide-y">
          <TableBody coupons={coupons} />
        </table>
      </div>

      <TableFooter currentPage={currentPage} totalPages={totalPages} />
      <div>
        <Link
          href="/add-coupon"
          className="bg-icon text-primary rounded-md p-2"
        >
          Add New Coupon
        </Link>
      </div>
    </div>
  );
}

export default CouponsTable;
