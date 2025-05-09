'use server';

import { PRODUCTS_PER_PAGE } from '../utils';
import { db } from '@/firebase/admin';
import { getCurrentUser } from './auth.action';

export async function addProduct(data: AddProductProp) {
  const user = await getCurrentUser();
  if (user?.role === 'admin') {
    try {
      await db.collection('products').add({
        ...data,
        createdAt: new Date().toISOString()
      });
      return {
        success: true,
        message: 'product added successfully'
      };
    } catch (err: any) {
      return {
        success: false,
        message:
          err.message ||
          'An unexpected error occurred while adding the product.'
      };
    }
  } else {
    return {
      success: false,
      message: 'you are not an admin'
    };
  }
}

export async function getAllProducts(
  page: number = 1
): Promise<{ products: Products[]; totalPages: number } | null> {
  const productsRef = db.collection('products');
  const snapshot = await productsRef.count().get();
  const totalProducts = snapshot.data().count;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const offset = (page - 1) * PRODUCTS_PER_PAGE;

  const productsQuery = await productsRef
    .orderBy('createdAt', 'desc') // Assuming you want to order by creation date
    .limit(PRODUCTS_PER_PAGE)
    .offset(offset)
    .get();

  const products = productsQuery.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Products[];

  return {
    products,
    totalPages
  };
}
