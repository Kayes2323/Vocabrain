import { doc, getDoc, serverTimestamp, setDoc, type Firestore } from 'firebase/firestore';
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
        await setDoc(
          doc(db, 'users', userId),
          { ...summaryFields(profile), app: JSON.parse(JSON.stringify(app)), updatedAt: serverTimestamp() },
          { merge: true },
        );
      } catch (error) {
        console.error('[profile] Save failed', error);
      }
    }
    writing = false;
  };

  return {
    async load(userId) {
      const snap = await getDoc(doc(db, 'users', userId));
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
