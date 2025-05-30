'use server';

import { db } from '@/firebase/admin';
import { PAGINATION_PER_PAGE } from '../utils';
import { getCurrentUser } from './auth.action';
import { revalidatePath } from 'next/cache';

export async function getAllCouponsWithAction(
  page: number = 1
): Promise<{ coupons: Coupons[]; totalPages: number } | null> {
  let couponsRef = db.collection('coupons');

  const snapshot = await couponsRef.count().get();
  const totalCoupons = snapshot.data().count;
  const totalPages = Math.ceil(totalCoupons / PAGINATION_PER_PAGE);

  const offset = (page - 1) * PAGINATION_PER_PAGE;

  const couponsQuery = await couponsRef
    .orderBy('createdAt', 'desc')
    .limit(PAGINATION_PER_PAGE)
    .offset(offset)
    .get();

  const fullData = couponsQuery.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate().toISOString(),
      StartDate: data.StartDate?.toDate().toISOString(),
      ExpireDate: data.ExpireDate?.toDate().toISOString()
    };
  }) as Coupons[];

  return { coupons: fullData, totalPages };
}

export async function addCoupon(data: AddCouponProp) {
  const user = await getCurrentUser();
  if (user?.role === 'admin') {
    try {
      await db.collection('coupons').add({
        ...data,
        createdAt: new Date()
      });
      revalidatePath('/coupons');
      return {
        success: true,
        message: 'coupon added successfully'
      };
    } catch (err: any) {
      return {
        success: false,
        message:
          err.message ||
          'An unexpected error occurred while adding the coupon.'
      };
    }
  } else {
    return {
      success: false,
      message: 'You are not an admin or not authorized to add coupon.'
    };
  }
}

export async function getCouponById(
  couponId: string
): Promise<Coupons | null> {
  const coupon = await db.collection('coupons').doc(couponId).get();

  if (!coupon.exists) {
    return null;
  }

  return {
    id: coupon.id,
    ...coupon.data(),
    createdAt: coupon.data()?.createdAt?.toDate().toISOString(),
    StartDate: coupon.data()?.StartDate?.toDate().toISOString(),
    ExpireDate: coupon.data()?.ExpireDate?.toDate().toISOString()
  } as Coupons;
}

export async function updateCoupon(
  couponId: string,
  data: Partial<AddCouponProp> // Allow partial updates
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
      }, {} as Partial<AddCouponProp>);

      await db
        .collection('coupons')
        .doc(couponId)
        .update({
          ...updateData
        });
      revalidatePath('/coupons');
      return {
        success: true,
        message: 'coupon updated successfully'
      };
    } catch (err: any) {
      return {
        success: false,
        message:
          err.message ||
          'An unexpected error occurred while updating the coupon.'
      };
    }
  } else {
    return {
      success: false,
      message: 'You are not an admin or not authorized to update coupon.'
    };
  }
}
