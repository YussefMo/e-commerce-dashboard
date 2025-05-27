'use server';

import { PAGINATION_PER_PAGE } from '../utils';
import { db } from '@/firebase/admin';
import { getCurrentUser } from './auth.action';
import { deleteImagesByUrls } from '@/cloudinary/cloudinary';
import { revalidatePath } from 'next/cache';

export async function addProduct(data: AddProductProp) {
  const user = await getCurrentUser();
  if (user?.role === 'admin') {
    try {
      await db.collection('products').add({
        ...data,
        createdAt: new Date()
      });
      revalidatePath('/products');
      revalidatePath('/');
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
      message: 'You are not an admin or not authorized to add products.'
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
  const totalPages = Math.ceil(totalProducts / PAGINATION_PER_PAGE);

  const offset = (page - 1) * PAGINATION_PER_PAGE;

  const productsQuery = await productsRef
    .orderBy('createdAt', 'desc')
    .limit(PAGINATION_PER_PAGE)
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
  const products = await db
    .collection('products')
    .orderBy('createdAt', 'desc')
    .get();

  const fullData = products.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate().toISOString()
    };
  }) as Products[];

  return fullData;
}

export async function getProductById(
  productId: string
): Promise<Products | null> {
  const product = await db.collection('products').doc(productId).get();

  if (!product.exists) {
    return null;
  }

  return {
    id: product.id,
    ...product.data(),
    createdAt: product.data()?.createdAt?.toDate().toISOString()
  } as Products;
}

export async function updateProduct(
  productId: string,
  data: Partial<AddProductProp> // Allow partial updates
): Promise<{ success: boolean; message: string }> {
  const user = await getCurrentUser();
  if (user?.role === 'admin') {
    try {
      // Remove undefined fields from data to avoid overwriting with undefined in Firestore
      const updateData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          // @ts-ignore
          acc[key] = value;
        }
        return acc;
      }, {} as Partial<AddProductProp>);

      await db
        .collection('products')
        .doc(productId)
        .update({
          ...updateData
        });
      revalidatePath('/products');
      return {
        success: true,
        message: 'Product updated successfully'
      };
    } catch (err: any) {
      return {
        success: false,
        message:
          err.message ||
          'An unexpected error occurred while updating the product.'
      };
    }
  } else {
    return {
      success: false,
      message: 'You are not an admin or not authorized to update products.'
    };
  }
}

export async function deleteProduct(
  productId: string,
  imageUrls: string[]
): Promise<{ success: boolean; message: string }> {
  const user = await getCurrentUser();
  if (user?.role === 'admin') {
    try {
      // Step 1: Delete images from Cloudinary
      if (imageUrls && imageUrls.length > 0) {
        await deleteImagesByUrls(imageUrls); // Uncomment and use actual implementation
      }

      // Step 2: Delete the product from Firestore
      await db.collection('products').doc(productId).delete();
      revalidatePath('/products');

      return {
        success: true,
        message: 'Product deleted successfully'
      };
    } catch (err: any) {
      console.error('Error deleting product:', err); // Log the error for debugging
      return {
        success: false,
        message: 'An unexpected error occurred while deleting the product.'
      };
    }
  } else {
    return {
      success: false,
      message: 'You are not an admin or not authorized to delete products.'
    };
  }
}
