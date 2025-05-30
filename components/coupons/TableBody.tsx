import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface TableBodyProps {
  coupons: Coupons[] | null;
}

function TableBody({ coupons }: TableBodyProps) {
  if (!coupons || coupons.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No orders found.</div>
    );
  }

  return (
    <tbody className="bg-card divide-border divide-y">
      {coupons.map((coupon) => {
        // @ts-ignore
        const isExpired = new Date(coupon.ExpireDate) < new Date();
        return (
          <tr key={coupon.id} className="border-b last:border-b-0">
            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">
              {coupon.couponCode}
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
              {formatDate(coupon.StartDate)}
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
              {formatDate(coupon.ExpireDate)}
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
              {coupon.discount}%
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  isExpired
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {isExpired ? 'Expired' : 'Active'}
              </span>
            </td>
            <td>
              <Link
                href={`/coupons/${coupon.id}`}
                className="bg-icon text-primary cursor-pointer items-center rounded-lg p-2 px-4"
                title="Edit"
              >
                Edit
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
