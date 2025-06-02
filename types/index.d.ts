/* eslint-disable no-unused-vars */
interface User {
  name: string;
  email: string;
  role: string;
  id: string;
}

interface SignInParams {
  email: string;
  idToken: string;
}

interface AddProductProp {
  productName: string;
  category: string;
  price: number;
  stock: number;
  discount?: number;
  description: string;
  tags: string[];
  imageUrls: string[];
  variety: Array<{
    type: string;
    options: string[];
  }>;
  imageFiles?: File[];
}

interface Products {
  id: string;
  productName: string;
  category: string;
  price: number;
  stock: number;
  discount?: number;
  description: string;
  tags: string[];
  imageUrls: string[];
  variety: Array<{
    type: string;
    options: string[];
  }>;
  createdAt: string | { seconds: number; nanoseconds: number } | null;
  map(arg0: (product: any) => React.JSX.Element): React.ReactNode;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool';
  content: string;
}

interface PageContextProps {
  pageContextData: any;
  setPageContextData: (data: any) => void;
}

interface Product {
  map(arg0: (product: any) => React.JSX.Element): React.ReactNode;
  id: string;
  productName: string;
  imageUrls: string[];
  price: number;
  stock: number;
  createdAt: string | { seconds: number; nanoseconds: number };
}

interface searchParamsPagination {
  searchParams: {
    page?: string;
    search?: string;
  };
}

interface ProductsTableProps {
  currentPage: number;
  children: React.ReactNode;
  search: string | undefined;
}

interface TableBodyProps {
  products: Products[] | null;
}

interface SearchInputProps {
  defaultValue?: string | undefined;
  currentPage?: number;
  products?: Product[];
  totalPages?: number;
}

interface OrdersTableProps {
  currentPage: number;
  children: React.ReactNode;
  status: string | undefined;
  id: string | undefined;
}

interface Orders {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    subtotal: number;
    imageUrl: string;
    map(arg0: (item: any) => React.JSX.Element): React.ReactNode;
  }>;
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  totalAmount: number;
  status: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  createdAt: string | { seconds: number; nanoseconds: number } | null;
  updatedAt: string | { seconds: number; nanoseconds: number } | null;
  shippedAt: string | { seconds: number; nanoseconds: number } | null;
  deliveredAt: string | { seconds: number; nanoseconds: number } | null;
  trackingNumber: string;
  notes: string | null;
}

interface searchParamsOrders {
  searchParams: {
    page?: string;
    status?: string;
    id?: string;
  };
}

interface FilterProps {
  status?: string | undefined;
  currentPage?: number;
  orders?: Orders[];
  totalPages?: number;
}

interface OrderItems {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
  imageUrl: string;
  map(arg0: (item: any) => React.JSX.Element): React.ReactNode;
}

interface updateOrderStatusProps {
  id: string;
  status: string;
  updatedAt: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
}

interface Messages {
  id: string;
  userId: string;
  userName: string;
  email: string;
  title: string;
  message: string;
  resolve: boolean;
  createdAt: string | { seconds: number; nanoseconds: number } | null;
}

interface Coupons {
  id: string;
  couponCode: string;
  createdAt: string | { seconds: number; nanoseconds: number } | null;
  StartDate: string | { seconds: number; nanoseconds: number } | null;
  ExpireDate: string | { seconds: number; nanoseconds: number } | null;
  discount: number;
  map(arg0: (item: any) => React.JSX.Element): React.ReactNode;
}

interface CouponsTableProps {
  currentPage: number;
  children: React.ReactNode;
}

interface AddCouponProp {
  couponCode: string;
  StartDate: Date;
  ExpireDate: Date;
  discount: number;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  role: string;
}
