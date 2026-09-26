import { doc, getDoc, getDocFromCache, serverTimestamp, setDoc, type Firestore } from 'firebase/firestore';
import type { UserProfile } from '@/lib/models';
import { withProfileDefaults, type ProfileRepository } from './profile-repository';
import { summaryFields } from './user-document';

/**
 * Stores the app profile in users/{uid}. Every change is written straight
 * away (Firestore's offline cache keeps it across refreshes); writes are
 * serialised so a slow write never overwrites a newer one.
 */
export function createFirestoreProfileRepository(db: Firestore): ProfileRepository {
  let latest: UserProfile | null = null;
  let writing = false;

  const pump = async () => {
    if (writing) return;
    writing = true;
    while (latest) {
      const profile = latest;
      latest = null;
      const { userId, ...app } = profile;
      try {
        const data = { ...summaryFields(profile), app: JSON.parse(JSON.stringify(app)), updatedAt: serverTimestamp() };
        // mergeFields replaces `app` as a whole (so fields removed from the profile, like a
        // finished lesson's resume point, are really removed) and leaves other fields
        // (uid, name, email, createdAt) untouched. A plain `merge: true` would keep
        // deleted nested keys forever.
        await setDoc(doc(db, 'users', userId), data, { mergeFields: Object.keys(data) });
      } catch (error) {
        console.error('[profile] Save failed', error);
      }
    }
    writing = false;
  };

  return {
    async load(userId) {
      const ref = doc(db, 'users', userId);
      // Offline or flaky network: fall back to the device cache before giving up.
      const snap = await getDoc(ref).catch((error) => getDocFromCache(ref).catch(() => Promise.reject(error)));
      const data = snap.data() as { app?: Partial<UserProfile>; name?: string; preferredLanguage?: UserProfile['language'] } | undefined;
      const profile = withProfileDefaults(userId, data?.app);
      return {
        ...profile,
        displayName: profile.displayName ?? (data?.name || undefined),
        language: profile.language ?? data?.preferredLanguage,
      };
    },
    async save(profile) {
      latest = profile;
      void pump();
    },
  };
}
