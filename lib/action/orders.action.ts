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
