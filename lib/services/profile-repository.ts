import { emptyProfile, type UserProfile } from '@/lib/models';
import { readJSON, writeJSON } from './local-store';

/**
 * Persistence boundary for the student profile. The app depends on this
 * interface only; the local implementation will be swapped for a Firestore one
 * (users/{uid}/profile) without touching screens.
 */
export interface ProfileRepository {
  load(userId: string): Promise<UserProfile>;
  save(profile: UserProfile): Promise<void>;
}

const KEY_PREFIX = 'vocabbrain:profile:';

function withDefaults(userId: string, stored: Partial<UserProfile> | undefined): UserProfile {
  const base = emptyProfile(userId);
  if (!stored) return base;
  return {
    ...base,
    ...stored,
    userId,
    ielts: { ...base.ielts, ...stored.ielts, currentBands: { ...stored.ielts?.currentBands } },
    abroad: { ...base.abroad, ...stored.abroad },
    vocabulary: { ...base.vocabulary, ...stored.vocabulary },
  };
}

export const localProfileRepository: ProfileRepository = {
  async load(userId) {
    return withDefaults(userId, readJSON<Partial<UserProfile>>(KEY_PREFIX + userId));
  },
  async save(profile) {
    writeJSON(KEY_PREFIX + profile.userId, profile);
  },
};
