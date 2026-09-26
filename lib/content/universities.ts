import type { Program, University } from '@/lib/models';

/**
 * Reviewed university and program records. Empty on purpose: a record is added
 * only with its official website, and every changeable value (tuition, English
 * score, admission rule) as a SourcedValue checked on that website. Until then
 * the Universities centre shows the student's own list and says so plainly.
 * Shape is API/CMS-ready: the same objects can later come from a server.
 */
export const UNIVERSITIES: University[] = [];
export const PROGRAMS: Program[] = [];

export const universitiesIn = (code: string | undefined) => (code ? UNIVERSITIES.filter((u) => u.countryCode === code.toUpperCase()) : UNIVERSITIES);
