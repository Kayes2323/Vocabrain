import type { UserProfile, WordStats } from '@/lib/models';

/** Stable key for a topic-lesson word (lessons have no word ids). */
export function lessonWordKey(lessonId: number, word: string): string {
  return `lesson:${lessonId}:${word.toLowerCase()}`;
}

export type RecallResult = 'recalled' | 'missed';

/** Records one recall attempt: the student tried to remember before revealing. */
export function recordRecall(profile: UserProfile, key: string, result: RecallResult, now = new Date()): UserProfile {
  const prev: WordStats = profile.vocabulary.words[key] ?? { seen: 0, recalled: 0, missed: 0, lastSeenAt: now.toISOString() };
  const next: WordStats = {
    seen: prev.seen + 1,
    recalled: prev.recalled + (result === 'recalled' ? 1 : 0),
    missed: prev.missed + (result === 'missed' ? 1 : 0),
    lastSeenAt: now.toISOString(),
  };
  return { ...profile, vocabulary: { ...profile.vocabulary, words: { ...profile.vocabulary.words, [key]: next } } };
}

/**
 * A word is active when the student recalls it more often than not. This
 * separates "words I have seen" from "words I can actually retrieve".
 */
export function isActive(stats: WordStats): boolean {
  return stats.recalled > 0 && stats.recalled >= stats.missed;
}

export interface VocabularySummary {
  seen: number;
  active: number;
  saved: number;
}

export function vocabularySummary(profile: UserProfile): VocabularySummary {
  const all = Object.values(profile.vocabulary.words);
  return {
    seen: all.filter((s) => s.seen > 0).length,
    active: all.filter(isActive).length,
    saved: profile.vocabulary.savedWordIds.length,
  };
}
