import * as admin from 'firebase-admin';
import { App, cert, getApp, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let app: App | undefined; // Keep track of the app instance

function initializeAdminApp() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.error('Firebase Admin SDK environment variables missing!');
    throw new Error(
      'Missing Firebase Admin SDK configuration in environment variables.'
    );
  }

  try {
    app = initializeApp({
      credential: cert({
        projectId: projectId, // Use variable directly
        clientEmail: clientEmail, // Use variable directly
        privateKey: privateKey.replace(/\\n/g, '\n')
      })
    });
    admin.firestore().settings({ ignoreUndefinedProperties: true });
  } catch (initError) {
    console.error('Error initializing Firebase Admin SDK:', initError);
    throw initError; // Re-throw initialization errors
  }
}

function getFirebaseAdminServices() {
  // Try to get the existing default app instance
  try {
    app = getApp();
  } catch (error) {
    // If no default app exists, initialize one
    if (
      (error as Error).message.includes(
        'The default Firebase app does not exist'
      )
    ) {
      console.log('Default Firebase app not found, initializing...');
      initializeAdminApp();
      app = getApp(); // Get the newly initialized app
    } else {
      // Re-throw other errors during getApp()
      console.error('Error getting Firebase app:', error);
      throw error;
    }
  }

  // Ensure we have a valid app instance
  if (!app || !app.options) {
    console.error(
      'Firebase Admin App instance is invalid after initialization attempt.'
    );
    console.log('App instance details:', app);
    console.log('-----------------------------------------');
    throw new Error('Invalid Firebase Admin App instance.');
  }

  try {
    console.log('Attempting to get Auth and Firestore instances...');
    const authInstance = getAuth(app); // Explicitly pass the app instance
    console.log('Auth instance obtained:', !!authInstance);
    const dbInstance = getFirestore(app); // Explicitly pass the app instance
    console.log('Firestore instance obtained:', !!dbInstance);
    console.log('-----------------------------------------');
    return {
      auth: authInstance,
      db: dbInstance
      // app: app // Optionally return the app instance itself
    };
  } catch (error) {
    console.error('Error getting Auth/Firestore instances:', error);
    console.log('App instance details during service retrieval error:', app);
    console.log('-----------------------------------------');
    throw error; // Re-throw
  }
}

// Export the services by calling the getter function
// This ensures initialization happens only when services are first imported/used
const services = getFirebaseAdminServices();
export const auth = services.auth;
export const db = services.db;
