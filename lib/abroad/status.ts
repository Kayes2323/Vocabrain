import type { ISODate, Scholarship } from '@/lib/models';

/**
 * Statuses that depend on today's date. They are computed every time from the
 * sourced dates, so updating a date updates every screen and nothing goes stale.
 */
const DAY = 86_400_000;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
/** Whole days from today to a date (negative = in the past). Date-only strings count as local dates. */
export function daysUntil(date: ISODate, now = new Date()): number {
  const target = /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00`) : new Date(date);
  return Math.round((startOfDay(target) - startOfDay(now)) / DAY);
}

export type ScholarshipStatus = 'open' | 'opening-soon' | 'closed' | 'deadline-passed' | 'unknown';

/** Opening soon = opens within this many days. */
export const OPENING_SOON_DAYS = 90;

export function scholarshipStatus(s: Pick<Scholarship, 'opensAt' | 'deadline'>, now = new Date()): ScholarshipStatus {
  const opens = s.opensAt ? daysUntil(s.opensAt.value, now) : undefined;
  const closes = s.deadline ? daysUntil(s.deadline.value, now) : undefined;
  if (closes !== undefined && closes < 0) return 'deadline-passed';
  if (opens !== undefined && opens > 0) return opens <= OPENING_SOON_DAYS ? 'opening-soon' : 'closed';
  if (closes !== undefined) return 'open';
  return 'unknown';
}

export type DeadlineBucket = 'completed' | 'missed' | 'this-week' | 'this-month' | 'upcoming';

export function deadlineBucket(date: ISODate, now = new Date(), completed = false): DeadlineBucket {
  if (completed) return 'completed';
  const days = daysUntil(date, now);
  if (days < 0) return 'missed';
  if (days <= 7) return 'this-week';
  if (days <= 31) return 'this-month';
  return 'upcoming';
}
