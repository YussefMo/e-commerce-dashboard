'use server';

import { db } from '@/firebase/admin';
import { getCurrentUser } from './auth.action';

export async function addProduct(data: AddProductProp) {
  const user = await getCurrentUser();
  if (user?.role === 'admin') {
    try {
      await db.collection('products').add(data);
      return {
        success: true,
        message: 'product added successfully'
      };
    } catch (err: any) {
      return {
        success: false,
        message: 'there was an error',
        err
      };
    }
  } else {
    return {
      success: false,
      message: 'you are not an admin'
    }
  }
}
