'use server';

import { db } from '@/firebase/admin';
import { getCurrentUser } from './auth.action';
import { revalidatePath } from 'next/cache';

export async function getAllMessages() {
  const messages = await db.collection('messages').get();

  const fullData = messages.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate().toISOString()
    };
  }) as Messages[];

  return fullData.sort((a, b) => {
    if (a.resolve === false && b.resolve === true) return -1;
    if (a.resolve === true && b.resolve === false) return 1;
    return 0;
  });
}

export async function getMessagesById(id: string) {
  if (id === 'all') return;
  const messages = await db.collection('messages').doc(id).get();

  return {
    id: messages.id,
    ...messages.data(),
    createdAt: messages.data()?.createdAt?.toDate().toISOString()
  } as Messages;
}

export async function updateMessageStatus(id: string) {
  const user = await getCurrentUser();
  const isAdmin = user?.role === 'admin';
  if (isAdmin) {
    try {
      await db.collection('messages').doc(id).update({
        resolve: true
      });
      revalidatePath('/messages');
      revalidatePath(`/messages?id=${id}`);
      return {
        success: true,
        message: 'message have been resolved'
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
