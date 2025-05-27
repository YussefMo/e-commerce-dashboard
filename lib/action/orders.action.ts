'use server';

import { db } from '@/firebase/admin';
import { PAGINATION_PER_PAGE } from '../utils';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './auth.action';

export async function getAllOrdersWithAction(
  page: number = 1,
  status?: string
): Promise<{ orders: Orders[]; totalPages: number } | null> {
  let ordersRef = db.collection('orders');

  if (status && status !== 'all') {
    // @ts-ignore
    ordersRef = ordersRef.where('status', '==', status);
  }

  const snapshot = await ordersRef.count().get();
  const totalOrders = snapshot.data().count;
  const totalPages = Math.ceil(totalOrders / PAGINATION_PER_PAGE);

  const offset = (page - 1) * PAGINATION_PER_PAGE;

  const ordersQuery = await ordersRef
    .orderBy('createdAt', 'desc')
    .limit(PAGINATION_PER_PAGE)
    .offset(offset)
    .get();

  const orders = ordersQuery.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate().toISOString(),
      updatedAt: data.updatedAt?.toDate().toISOString(),
      shippedAt: data.shippedAt?.toDate().toISOString(),
      deliveredAt: data.deliveredAt?.toDate().toISOString()
    };
  }) as Orders[];

  return {
    orders,
    totalPages
  };
}

export async function getOrderById(orderId: string): Promise<Orders | null> {
  const order = await db.collection('orders').doc(orderId).get();

  if (!order.exists) {
    return null;
  }

  return {
    id: order.id,
    ...order.data(),
    createdAt: order.data()?.createdAt?.toDate().toISOString(),
    updatedAt: order.data()?.updatedAt?.toDate().toISOString(),
    shippedAt: order.data()?.shippedAt?.toDate().toISOString(),
    deliveredAt: order.data()?.deliveredAt?.toDate().toISOString()
  } as Orders;
}

export async function getAllOrders(last?: string): Promise<Orders[] | null> {
  let ordersRef: FirebaseFirestore.Query = db.collection('orders');

  if (last && last !== 'all') {
    const days = parseInt(last);
    const date = new Date();
    date.setDate(date.getDate() - days);
    ordersRef = ordersRef.where('createdAt', '>=', date);
  }

  const orders = await ordersRef.get();

  const fullData = orders.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: doc.data().createdAt.toDate().toISOString(),
      updatedAt: doc.data().updatedAt?.toDate().toISOString(),
      shippedAt: doc.data().shippedAt?.toDate().toISOString(),
      deliveredAt: doc.data().deliveredAt?.toDate().toISOString()
    };
  }) as Orders[];

  return fullData;
}

export async function updateOrderStatus({
  id,
  status,
  updatedAt,
  shippedAt,
  deliveredAt
}: updateOrderStatusProps) {
  const user = await getCurrentUser();
  const isAdmin = user?.role === 'admin';
  if (isAdmin) {
    try {
      await db.collection('orders').doc(id).update({
        status: status,
        updatedAt,
        shippedAt,
        deliveredAt
      });
      revalidatePath('/orders');
      revalidatePath(`/orders/${id}`);
      return {
        success: true,
        message: 'Product status updated successfully'
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'some thing went wrong'
      };
    }
  } else {
    return {
      success: false,
      message: 'your not an admin or allowed to do this action'
    };
  }
}
