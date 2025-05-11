'use client';

import OrdersItemTable from '@/components/orders/OrdersItemTable';
import { getUserById } from '@/lib/action/auth.action';
import { getOrderById } from '@/lib/action/orders.action';
import { usePageContext } from '@/lib/PageContextProvider';
import { formatDate } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function Page() {
  const params = useParams();
  const orderId = params?.id as string;
  const { setPageContextData } = usePageContext();

  const [data, setData] = useState<Orders>({
    id: '',
    userId: '',
    items: [],
    subtotal: 0,
    taxAmount: 0,
    shippingCost: 0,
    totalAmount: 0,
    status: '',
    shippingAddress: {
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: ''
    },
    paymentMethod: '',
    createdAt: null,
    updatedAt: null,
    shippedAt: null,
    deliveredAt: null,
    trackingNumber: '',
    notes: null
  });
  const [user, setUser] = useState<User | null>({
    name: '',
    email: '',
    role: '',
    id: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderId) {
      async function getOrderData() {
        try {
          setLoading(true);
          const data = await getOrderById(orderId);
          if (data) {
            const user = await getUserById(data.userId);
            setData(data);
            setUser(user);
          } else {
            toast.error('order not found');
          }
        } catch {
          toast.error('something wrong went');
        } finally {
          setLoading(false);
        }
      }
      getOrderData();
    }
  }, [orderId]);

  useEffect(() => {
    if (data) {
      setPageContextData({
        page: `Order #${data.id} Details`,
        data: data,
        description:
          'this page used to view the order details based on order id so the user know what to do and take actions based on status like mark as processing or as shipped or as delivered'
      });
    }
  }, [data, setPageContextData]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading order details...
      </div>
    );
  }

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-lg">
      <div className="rounded-t-lg bg-linear-to-br from-[#7927FF] to-[#440398] p-6 text-white dark:from-[#344257] dark:to-[#15191E]">
        <h1 className="mb-4 w-full text-center text-2xl font-bold">
          Order #{data.id} Details
        </h1>
      </div>
      <div className="p-6 sm:p-8 lg:p-10">
        <div>
          <h2 className="text-lg font-semibold">Order Related Dates</h2>
          <p>
            <span className="font-semibold">Order Placed At:</span>{' '}
            {formatDate(data.createdAt)}
          </p>
          <p>
            <span className="font-semibold">Order Updated At:</span>{' '}
            {formatDate(data.updatedAt)}
          </p>
          <p>
            <span className="font-semibold">Order Shipped At:</span>{' '}
            {formatDate(data.shippedAt)}
          </p>
          <p>
            <span className="font-semibold">Order Delivered At:</span>{' '}
            {formatDate(data.deliveredAt)}
          </p>
        </div>
        <hr className="mt-5" />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">User Information</h2>
            <p>
              <span className="font-semibold">Name:</span>{' '}
              {data.shippingAddress.name}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{' '}
              {data.shippingAddress.phone}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Shipping Address</h2>
            <p>{data.shippingAddress.street}</p>
            <p>
              {data.shippingAddress.city}, {data.shippingAddress.state}{' '}
              {data.shippingAddress.zipCode}
            </p>
            <p>{data.shippingAddress.country}</p>
          </div>
        </div>
        <hr className="mt-5" />
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Order Items</h2>
          <OrdersItemTable orderItems={data.items} />
        </div>
        <hr className="mt-5" />
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Payment Details</h2>
          <p>
            <span className="font-semibold">Subtotal:</span> ${data.subtotal}
          </p>
          <p>
            <span className="font-semibold">Tax:</span> ${data.taxAmount}
          </p>
          <p>
            <span className="font-semibold">Shipping:</span> $
            {data.shippingCost}
          </p>
          <p>
            <span className="font-semibold">Total:</span> ${data.totalAmount}
          </p>
          <p>
            <span className="font-semibold">Payment Method:</span>{' '}
            {data.paymentMethod}
          </p>
        </div>
        <hr className="mt-5" />
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Order Status</h2>
          <p>
            <span className="font-semibold">Status:</span>{' '}
            <span
              className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${data.status === 'pending' ? 'bg-red-100 text-red-800' : data.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
            >
              {data.status}
            </span>
          </p>
          <p><span className="font-semibold">Tracking Number:</span> {data.trackingNumber}</p>
          <p><span className="font-semibold">Notes:</span> {data.notes}</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
