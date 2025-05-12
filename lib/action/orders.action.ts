'use server';

import { db } from '@/firebase/admin';
import { PAGINATION_PER_PAGE } from '../utils';

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

export async function getAllOrders(): Promise<Orders[] | null> {
  const orders = await db.collection('orders').get();

  return orders.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Orders[];
}
