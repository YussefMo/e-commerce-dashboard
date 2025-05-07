'use server';

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

export async function getAllProducts(): Promise<Products[] | null> {
  const products = await db.collection('products').get();

  return products.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Products[];
}
