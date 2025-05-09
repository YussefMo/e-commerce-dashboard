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

export async function getAllProductsWithAction(
  page: number = 1,
  search?: string
): Promise<{ products: Products[]; totalPages: number } | null> {
  let productsRef = db.collection('products');

  if (search) {
    // @ts-ignore
    productsRef = productsRef
      .where('productName', '>=', search)
      .where('productName', '<=', search + '\uf8ff');
  }

  const snapshot = await productsRef.count().get();
  const totalProducts = snapshot.data().count;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const offset = (page - 1) * PRODUCTS_PER_PAGE;

  const productsQuery = await productsRef
    .orderBy('createdAt', 'desc')
    .limit(PRODUCTS_PER_PAGE)
    .offset(offset)
    .get();

  const products = productsQuery.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate().toISOString()
    };
  }) as Products[];

  return {
    products,
    totalPages
  };
}

export async function getAllProducts(): Promise<Products[] | null> {
  const products = await db.collection('products').get();

  return products.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Products[];
}
