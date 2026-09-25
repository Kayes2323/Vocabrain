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
