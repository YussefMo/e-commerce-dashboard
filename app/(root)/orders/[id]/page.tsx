'use client';

import OrdersItemTable from '@/components/orders/OrdersItemTable';
import { getUserById } from '@/lib/action/auth.action';
import { getOrderById, updateOrderStatus } from '@/lib/action/orders.action';
import { usePageContext } from '@/lib/PageContextProvider';
import { formatDate } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Package,
  CreditCard,
  UserCircle,
  MapPin,
  CalendarDays,
  Truck,
  Info,
  CheckCircle,
  XCircle,
  Hash,
  FileText,
  DollarSign,
  Receipt,
  Phone,
  Mail
} from 'lucide-react'; // Added icons for better UI
import { Button } from '@/components/UI/button';
import { useForm } from 'react-hook-form';

// Helper function to get status styles and icons
const getStatusStyles = (status: string | null) => {
  const s = status?.toLowerCase() || 'unknown';
  switch (s) {
    case 'pending':
      return {
        bgColor: 'bg-red-100 dark:bg-red-900/30',
        textColor: 'text-red-700 dark:text-red-300',
        borderColor: 'border-red-500/50',
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        text: 'Pending'
      };
    case 'delivered':
      return {
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-700 dark:text-green-300',
        borderColor: 'border-green-500/50',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        text: 'Delivered'
      };
    case 'processing':
      return {
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
        textColor: 'text-yellow-700 dark:text-yellow-400',
        borderColor: 'border-yellow-500/50',
        icon: <Info className="h-5 w-5 text-yellow-500" />,
        text: 'Processing'
      };
    case 'shipped':
      return {
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-700 dark:text-blue-300',
        borderColor: 'border-blue-500/50',
        icon: <Truck className="h-5 w-5 text-blue-500" />,
        text: 'Shipped'
      };
    default:
      return {
        bgColor: 'bg-gray-100 dark:bg-gray-700/30',
        textColor: 'text-gray-700 dark:text-gray-300',
        borderColor: 'border-gray-500/50',
        icon: <Info className="h-5 w-5 text-gray-500" />,
        text: s.charAt(0).toUpperCase() + s.slice(1)
      };
  }
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number | null | undefined;
  isCurrency?: boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({
  icon,
  label,
  value,
  isCurrency
}) => (
  <div className="flex items-center space-x-3 py-2">
    <span className="text-muted-foreground">{icon}</span>
    <span className="text-sm font-medium">{label}:</span>
    <span className="text-foreground/90 text-sm">
      {isCurrency && typeof value === 'number'
        ? `$${value.toFixed(2)}`
        : value || 'N/A'}
    </span>
  </div>
);

function Page() {
  const form = useForm();
  const params = useParams();
  const orderId = params?.id as string;
  const { setPageContextData } = usePageContext();
  const [isChecked, setIsChecked] = useState(false); // Add new state for checkbox

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
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(false);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    if (orderId) {
      async function getOrderData() {
        try {
          setLoading(true);
          const orderData = await getOrderById(orderId);
          if (orderData) {
            const userData = await getUserById(orderData.userId);
            setData(orderData);
            setUser(userData);
          } else {
            toast.error('Order not found');
          }
        } catch (error) {
          console.error('Failed to fetch order data:', error);
          toast.error('Something went wrong while fetching order details.');
        } finally {
          setLoading(false);
        }
      }
      getOrderData();
    }
  }, [orderId, trigger]);

  useEffect(() => {
    if (data && data.id) {
      setPageContextData({
        page: `Order #${data.id} Details`,
        data: data,
        description:
          'this page used to view the order details based on order id so the user know what to do and take actions based on status like mark as processing or as shipped or as delivered'
      });
    }
  }, [data, setPageContextData]);

  const onSubmit = async () => {
    try {
      setDisable(true);
      if (data.status === 'pending') {
        toast.info('updating status');
        const res = await updateOrderStatus({
          id: data.id,
          status: 'processing',
          updatedAt: new Date()
        });
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } else if (data.status === 'processing') {
        toast.info('updating status');
        const res = await updateOrderStatus({
          id: data.id,
          status: 'shipped',
          updatedAt: new Date(),
          shippedAt: new Date()
        });
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } else {
        toast.info('updating status');
        const res = await updateOrderStatus({
          id: data.id,
          status: 'delivered',
          updatedAt: new Date(),
          deliveredAt: new Date()
        });
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      }
    } catch {
      toast.error('some thing went wrong');
    } finally {
      setDisable(false);
      setTrigger(Date.now());
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
        <div className="flex flex-col items-center">
          <Package className="mb-4 h-12 w-12 animate-pulse" />
          <p className="text-muted-foreground text-lg font-semibold">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  if (!data.id) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <XCircle className="text-destructive mb-4 h-12 w-12" />
          <p className="text-xl font-semibold">Order Not Found</p>
          <p className="text-muted-foreground">
            The requested order could not be found or loaded.
          </p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusStyles(data.status);

  return (
    <div className="bg-muted/30 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 rounded-xl bg-gradient-to-br from-[#7927FF] to-[#440398] p-6 text-white shadow-xl dark:from-[#344257] dark:to-[#15191E]">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <div>
              <h1 className="text-3xl font-bold">Order Details</h1>
              <p className="text-lg opacity-90">Order ID: #{data.id}</p>
            </div>
            <div
              className={`mt-4 flex items-center rounded-lg border-2 px-4 py-2 sm:mt-0 ${statusInfo.borderColor} ${statusInfo.bgColor} ${statusInfo.textColor}`}
            >
              {statusInfo.icon}
              <span className="text-lg font-semibold">{statusInfo.text}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content Column (Order Items & Status/Tracking) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Order Items Card */}
            <div className="bg-card text-card-foreground rounded-xl shadow-lg">
              <div className="border-border border-b p-6">
                <h2 className="flex items-center text-xl font-semibold">
                  <Package className="mr-3 h-6 w-6" /> Order Items
                </h2>
              </div>
              <div className="p-6">
                {data.items && data.items.length > 0 ? (
                  <OrdersItemTable orderItems={data.items} />
                ) : (
                  <p className="text-muted-foreground">
                    No items in this order.
                  </p>
                )}
              </div>
            </div>

            {/* Order Status & Notes Card */}
            {(data.trackingNumber || data.notes) && (
              <div className="bg-card text-card-foreground rounded-xl p-6 shadow-lg">
                <h2 className="border-border mb-4 flex items-center border-b pb-3 text-xl font-semibold">
                  <Truck className="mr-3 h-6 w-6" /> Tracking & Notes
                </h2>
                <div className="space-y-3">
                  {data.trackingNumber && (
                    <DetailItem
                      icon={<Hash className="h-5 w-5" />}
                      label="Tracking Number"
                      value={data.trackingNumber}
                    />
                  )}
                  {data.notes && (
                    <DetailItem
                      icon={<FileText className="h-5 w-5" />}
                      label="Notes"
                      value={data.notes}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column (Customer, Shipping, Payment, Dates) */}
          <div className="space-y-6 lg:col-span-1">
            {/* Customer Information Card */}
            <div className="bg-card text-card-foreground rounded-xl p-6 shadow-lg">
              <h2 className="border-border mb-4 flex items-center border-b pb-3 text-xl font-semibold">
                <UserCircle className="mr-3 h-6 w-6" /> Customer Information
              </h2>
              <div className="space-y-2">
                <DetailItem
                  icon={<UserCircle className="h-5 w-5" />}
                  label="Name"
                  value={data.shippingAddress.name}
                />
                <DetailItem
                  icon={<Phone className="h-5 w-5" />}
                  label="Phone"
                  value={data.shippingAddress.phone}
                />
                <DetailItem
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  value={user?.email}
                />
              </div>
            </div>

            {/* Shipping Address Card */}
            <div className="bg-card text-card-foreground rounded-xl p-6 shadow-lg">
              <h2 className="border-border mb-4 flex items-center border-b pb-3 text-xl font-semibold">
                <MapPin className="mr-3 h-6 w-6" /> Shipping Address
              </h2>
              <div className="text-foreground/90 space-y-1 text-sm">
                <p>{data.shippingAddress.street}</p>
                <p>
                  {data.shippingAddress.city}, {data.shippingAddress.state}{' '}
                  {data.shippingAddress.zipCode}
                </p>
                <p>{data.shippingAddress.country}</p>
              </div>
            </div>

            {/* Payment Details Card */}
            <div className="bg-card text-card-foreground rounded-xl p-6 shadow-lg">
              <h2 className="border-border mb-4 flex items-center border-b pb-3 text-xl font-semibold">
                <CreditCard className="mr-3 h-6 w-6" /> Payment Details
              </h2>
              <div className="space-y-2">
                <DetailItem
                  icon={<DollarSign className="h-5 w-5" />}
                  label="Subtotal"
                  value={data.subtotal}
                  isCurrency
                />
                <DetailItem
                  icon={<DollarSign className="h-5 w-5" />}
                  label="Tax"
                  value={data.taxAmount}
                  isCurrency
                />
                <DetailItem
                  icon={<DollarSign className="h-5 w-5" />}
                  label="Shipping"
                  value={data.shippingCost}
                  isCurrency
                />
                <DetailItem
                  icon={<DollarSign className="h-5 w-5 font-bold" />}
                  label="Total Amount"
                  value={data.totalAmount}
                  isCurrency
                />
                <DetailItem
                  icon={<Receipt className="h-5 w-5" />}
                  label="Payment Method"
                  value={data.paymentMethod}
                />
              </div>
            </div>

            {/* Order Dates Card */}
            <div className="bg-card text-card-foreground rounded-xl p-6 shadow-lg">
              <h2 className="border-border mb-4 flex items-center border-b pb-3 text-xl font-semibold">
                <CalendarDays className="mr-3 h-6 w-6" /> Order Timeline
              </h2>
              <div className="space-y-2">
                <DetailItem
                  icon={<CalendarDays className="h-5 w-5" />}
                  label="Placed At"
                  value={formatDate(data.createdAt)}
                />
                <DetailItem
                  icon={<CalendarDays className="h-5 w-5" />}
                  label="Updated At"
                  value={formatDate(data.updatedAt)}
                />
                <DetailItem
                  icon={<Truck className="h-5 w-5" />}
                  label="Shipped At"
                  value={formatDate(data.shippedAt)}
                />
                <DetailItem
                  icon={<CheckCircle className="h-5 w-5" />}
                  label="Delivered At"
                  value={formatDate(data.deliveredAt)}
                />
              </div>
            </div>
          </div>
          {data.status !== 'delivered' && (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-card text-card-foreground rounded-xl p-6 shadow-lg lg:col-span-3 lg:col-start-1"
            >
              <div className="mb-2">
                <input
                  id="check-status"
                  type="checkbox"
                  checked={isChecked} // Bind checked state
                  onChange={(e) => setIsChecked(e.target.checked)} // Update state on change
                  className="accent-icon focus:ring-icon mr-2 h-4 w-4 cursor-pointer rounded-sm focus:ring-2"
                />
                <label
                  htmlFor="check-status"
                  className="cursor-pointer text-lg"
                >
                  {data.status === 'pending'
                    ? 'I confirm that the order is now getting prepared and it under processing'
                    : data.status === 'processing'
                      ? 'I confirm that the order is now getting shipped to the correct address'
                      : data.status === 'shipped' &&
                        'I confirm that the order is now delivered to the costumer'}
                </label>
              </div>
              <div className="flex items-end justify-end">
                {data.status !== 'delivered' && (
                  <Button
                    disabled={!isChecked || disable}
                    className="disabled:cursor-not-allowed"
                  >
                    {data.status === 'pending'
                      ? 'Mark As Processing'
                      : data.status === 'processing'
                        ? 'Mark As Shipped'
                        : data.status === 'shipped' && 'Mark As Delivered'}
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
