import { initializeApp, getApps } from "firebase/app";
import { getMessaging, isSupported, onMessage, MessagePayload } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

/**
 * Returns the Firebase Messaging instance if the browser supports it.
 * Safely returns null on the server or in unsupported browsers.
 */
export const getFirebaseMessaging = async () => {
  if (typeof window === "undefined") return null;
  if (await isSupported()) {
    return getMessaging(app);
  }
  return null;
};

/**
 * Subscribe to foreground FCM messages.
 * Returns an unsubscribe function, or null if messaging is not supported.
 */
export const onForegroundMessage = async (
  callback: (payload: MessagePayload) => void,
): Promise<(() => void) | null> => {
  const messaging = await getFirebaseMessaging();
  if (!messaging) return null;
  return onMessage(messaging, callback);
};

export { app };
