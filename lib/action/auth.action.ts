'use server';

import { auth, db } from '@/firebase/admin';
import { cookies } from 'next/headers';

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  // Create session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000 // milliseconds
  });

  // Set cookie in the browser
  cookieStore.set('session', sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax'
  });
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    // Check if user exists in Firebase Authentication
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: 'User does not exist. Create an account.'
      };
    }

    // Set session cookie after successful authentication
    await setSessionCookie(idToken);

    return {
      success: true,
      message: 'Signed in successfully.'
    };
  } catch (error: any) {
    console.log('Error during sign-in:', error);
    return {
      success: false,
      message: 'Failed to log into account. Please try again.'
    };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection('users')
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) {
      return null;
    }

    return {
      ...userRecord.data(),
      id: userRecord.id
    } as User;
  } catch (err: any) {
    console.error(err);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();

  return !!user;
}
