import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { browserLocalPersistence, connectAuthEmulator, getAuth, setPersistence, type Auth } from 'firebase/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from 'firebase/firestore';

/**
 * Firebase Web SDK configuration. These values identify the project and are
 * public by design (security comes from Firebase Security Rules). Never put
 * Admin SDK credentials or service-account keys in NEXT_PUBLIC_ variables.
 * See docs/FIREBASE_SETUP.md.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True when enough config is present to use Firebase. Same value on server and client. */
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.authDomain);

/** Local development against `firebase emulators:start`. */
const useEmulator = process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true';

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

// Firebase runs in the browser only; server renders show the loading state.
if (isFirebaseConfigured && typeof window !== 'undefined') {
  try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    try {
      // Offline cache: saves survive refreshes and poor connections, then sync.
      db = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) });
    } catch {
      db = getFirestore(app); // Already initialised (hot reload) or IndexedDB unavailable.
    }
    if (useEmulator && !(auth as Auth & { emulatorConfig?: unknown }).emulatorConfig) {
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
      connectFirestoreEmulator(db, '127.0.0.1', 8080);
    }
    // Keep students signed in across refreshes and browser restarts.
    void setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    console.error('[firebase] Initialization failed. Check the NEXT_PUBLIC_FIREBASE_* variables.', error);
    app = auth = db = undefined;
  }
}

export { app, auth, db };
