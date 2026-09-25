const DAY_MS = 24 * 60 * 60 * 1000;

/** Local calendar date as YYYY-MM-DD. */
export function localDateKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Whole calendar days from `from` (YYYY-MM-DD) to today. */
export function daysSince(from: string, now = new Date()): number {
  const start = new Date(`${from}T00:00`);
  const today = new Date(`${localDateKey(now)}T00:00`);
  return Math.round((today.getTime() - start.getTime()) / DAY_MS);
}
