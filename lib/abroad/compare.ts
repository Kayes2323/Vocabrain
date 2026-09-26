import type { Country, CountrySectionId } from '@/lib/models';
import { countrySections, type ResolvedSection } from './sections';

/** What the comparison lines up, in order. Each row is a hub section, so facts come from one place. */
export const COMPARE_ROWS: CountrySectionId[] = ['work', 'post-study', 'living', 'tuition', 'scholarships', 'visa', 'deadlines', 'education'];

export const MAX_COMPARE = 3;

/** Parses ?c=de,gb,ca into up to three known, distinct country codes. */
export function parseCompare(raw: string | null, known: (code: string) => Country | undefined): string[] {
  const out: string[] = [];
  for (const part of (raw ?? '').split(',')) {
    const c = known(part.trim())?.code;
    if (c && !out.includes(c)) out.push(c);
  }
  return out.slice(0, MAX_COMPARE);
}

/** Row × country cells: the section with its facts, or its "not verified" status. */
export function compareTable(countries: Country[], now = new Date()) {
  const sections = countries.map((c) => countrySections(c, now));
  return COMPARE_ROWS.map((id) => ({ id, cells: sections.map((list) => list.find((s) => s.id === id) as ResolvedSection) }));
}
