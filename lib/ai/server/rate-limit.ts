import { LIMITS } from './config';
import { MinoError } from './errors';

/**
 * Per-student request limits. In-memory, so it is per server instance and
 * resets on cold start: a cost guard, not a hard quota. Move to a shared store
 * (e.g. Firestore counter or Redis) when traffic grows.
 */
const minute = new Map<string, number[]>();
const day = new Map<string, { date: string; count: number }>();

export function checkRateLimit(uid: string, now = Date.now()) {
  const recent = (minute.get(uid) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= LIMITS.perMinute) throw new MinoError('rate_limited', 'per-minute');
  const today = new Date(now).toISOString().slice(0, 10);
  const d = day.get(uid);
  const count = d?.date === today ? d.count : 0;
  if (count >= LIMITS.perDay) throw new MinoError('rate_limited', 'per-day');
  minute.set(uid, [...recent, now]);
  day.set(uid, { date: today, count: count + 1 });
}

/**
 * Word lookups in a reading passage are small and frequent, so they have their
 * own, higher limit and never use up the student's Mino chat allowance.
 */
const wordMinute = new Map<string, number[]>();
const wordDay = new Map<string, { date: string; count: number }>();
export const WORD_LIMITS = { perMinute: 30, perDay: 400 } as const;

export function checkWordLookupLimit(uid: string, now = Date.now()) {
  const recent = (wordMinute.get(uid) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= WORD_LIMITS.perMinute) throw new MinoError('rate_limited', 'word per-minute');
  const today = new Date(now).toISOString().slice(0, 10);
  const d = wordDay.get(uid);
  const count = d?.date === today ? d.count : 0;
  if (count >= WORD_LIMITS.perDay) throw new MinoError('rate_limited', 'word per-day');
  wordMinute.set(uid, [...recent, now]);
  wordDay.set(uid, { date: today, count: count + 1 });
}
