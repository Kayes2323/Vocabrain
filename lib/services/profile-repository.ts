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

export function withProfileDefaults(userId: string, stored: Partial<UserProfile> | undefined): UserProfile {
  const base = emptyProfile(userId);
  if (!stored) return base;
  // Profiles from before onboarding existed: a set target means they already told us their goal.
  const migrated =
    !stored.onboardedAt && stored.ielts?.targetBand !== undefined
      ? { onboardedAt: stored.updatedAt ?? new Date().toISOString(), goal: stored.goal ?? ('ielts' as const) }
      : {};
  return {
    ...base,
    ...stored,
    ...migrated,
    userId,
    ielts: { ...base.ielts, ...stored.ielts, currentBands: { ...stored.ielts?.currentBands } },
    abroad: { ...base.abroad, ...stored.abroad },
    vocabulary: { ...base.vocabulary, ...stored.vocabulary, words: { ...stored.vocabulary?.words } },
    study: {
      ...base.study,
      ...stored.study,
      completedTasks: { ...stored.study?.completedTasks },
      days: { ...stored.study?.days },
    },
    foundation: {
      ...base.foundation,
      ...stored.foundation,
      lessons: { ...stored.foundation?.lessons },
      errors: { ...stored.foundation?.errors },
    },
  };
}

export const localProfileRepository: ProfileRepository = {
  async load(userId) {
    return withProfileDefaults(userId, readJSON<Partial<UserProfile>>(KEY_PREFIX + userId));
  },
  async save(profile) {
    writeJSON(KEY_PREFIX + profile.userId, profile);
  },
};
