import { roadmapDefs } from '@/lib/abroad/roadmap';
import { deadlineBucket, type DeadlineBucket } from '@/lib/abroad/status';
import { getCountry } from '@/lib/content/countries';
import { DEADLINES } from '@/lib/content/deadlines';
import type {
  Bilingual,
  DocumentKind,
  DocumentStatus,
  PersonalDeadline,
  SavedUniversity,
  SourceRef,
  StudyAbroadProfile,
  UserProfile,
} from '@/lib/models';
import { stepMarks } from './abroad-journey';

/**
 * The student's own Study Abroad lists: universities they consider, dates
 * they added, how far each document is. Pure functions; the UI saves the
 * returned profile. Nothing here adds facts about a country.
 */

const newId = (prefix: string, now: Date) => `${prefix}-${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

// ------------------------------------------------------------------ universities

export function addUniversity(
  abroad: StudyAbroadProfile,
  input: Pick<SavedUniversity, 'name' | 'countryCode' | 'fit'> & Partial<Pick<SavedUniversity, 'program' | 'officialUrl' | 'universityId'>>,
  now = new Date(),
): StudyAbroadProfile {
  const name = input.name.trim();
  if (!name) return abroad;
  const url = input.officialUrl?.trim();
  const item: SavedUniversity = {
    id: newId('uni', now),
    name,
    countryCode: input.countryCode.toUpperCase(),
    fit: input.fit,
    status: 'researching',
    addedAt: now.toISOString(),
    ...(input.program?.trim() ? { program: input.program.trim() } : {}),
    // Only web links; anything else is dropped rather than rendered as a link.
    ...(url && /^https?:\/\/\S+\.\S+/.test(url) ? { officialUrl: url } : {}),
    ...(input.universityId ? { universityId: input.universityId } : {}),
  };
  return { ...abroad, universities: [...(abroad.universities ?? []), item] };
}

export function updateUniversity(abroad: StudyAbroadProfile, id: string, patch: Partial<Pick<SavedUniversity, 'fit' | 'status' | 'program'>>, now = new Date()): StudyAbroadProfile {
  return { ...abroad, universities: (abroad.universities ?? []).map((u) => (u.id === id ? { ...u, ...patch, updatedAt: now.toISOString() } : u)) };
}

export function removeUniversity(abroad: StudyAbroadProfile, id: string): StudyAbroadProfile {
  return { ...abroad, universities: (abroad.universities ?? []).filter((u) => u.id !== id) };
}

/** How balanced a list is. General advice: at least one safer choice among the universities still in play. */
export function shortlistBalance(list: SavedUniversity[]) {
  const live = list.filter((u) => u.status !== 'rejected');
  const count = { ambitious: 0, match: 0, safer: 0 };
  for (const u of live) count[u.fit]++;
  return { ...count, total: live.length, needsSafer: live.length >= 2 && count.safer === 0 };
}

// ------------------------------------------------------------------ scholarships

export function toggleSavedScholarship(abroad: StudyAbroadProfile, id: string): StudyAbroadProfile {
  const saved = abroad.savedScholarships ?? [];
  return { ...abroad, savedScholarships: saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id] };
}

// ------------------------------------------------------------------ deadlines

export function addDeadline(abroad: StudyAbroadProfile, input: Pick<PersonalDeadline, 'title' | 'date' | 'kind'> & { countryCode?: string }, now = new Date()): StudyAbroadProfile {
  const title = input.title.trim();
  if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) return abroad;
  const item: PersonalDeadline = {
    id: newId('dl', now),
    title,
    date: input.date,
    kind: input.kind,
    createdAt: now.toISOString(),
    ...(input.countryCode ? { countryCode: input.countryCode.toUpperCase() } : {}),
  };
  return { ...abroad, deadlines: [...(abroad.deadlines ?? []), item] };
}

export function toggleDeadlineDone(abroad: StudyAbroadProfile, id: string): StudyAbroadProfile {
  return { ...abroad, deadlines: (abroad.deadlines ?? []).map((d) => (d.id === id ? { ...d, done: !d.done } : d)) };
}

export function removeDeadline(abroad: StudyAbroadProfile, id: string): StudyAbroadProfile {
  return { ...abroad, deadlines: (abroad.deadlines ?? []).filter((d) => d.id !== id) };
}

export type DeadlineOrigin = 'personal' | 'roadmap' | 'official' | 'ielts';

/** One row of the deadline centre, whatever it came from. */
export interface DeadlineItem {
  id: string;
  origin: DeadlineOrigin;
  /** Plain text (the student's own) or bilingual (from content). */
  title: string | Bilingual;
  date: string;
  kind: string;
  countryCode?: string;
  done: boolean;
  bucket: DeadlineBucket;
  /** Where to act on it. */
  href?: string;
  source?: SourceRef;
}

/**
 * Every date that matters to the student, in date order: their own dates,
 * roadmap target dates (dream country), the IELTS test date, and verified
 * official dates for their dream and shortlisted countries.
 */
export function allDeadlines(profile: UserProfile, now = new Date()): DeadlineItem[] {
  const a = profile.abroad;
  const items: DeadlineItem[] = [];
  for (const d of a.deadlines ?? []) {
    items.push({ id: d.id, origin: 'personal', title: d.title, date: d.date, kind: d.kind, countryCode: d.countryCode, done: Boolean(d.done), bucket: deadlineBucket(d.date, now, d.done) });
  }
  const dream = a.dreamCountryCode;
  if (dream) {
    const marks = stepMarks(a, dream);
    for (const def of roadmapDefs(getCountry(dream))) {
      const m = marks[def.id];
      if (!m?.dueAt) continue;
      const done = m.status === 'done';
      items.push({
        id: `roadmap-${def.id}`,
        origin: 'roadmap',
        title: def.title,
        date: m.dueAt.slice(0, 10),
        kind: 'roadmap',
        countryCode: dream,
        done,
        bucket: deadlineBucket(m.dueAt.slice(0, 10), now, done),
        href: `/abroad/countries/${dream.toLowerCase()}/roadmap`,
      });
    }
  }
  if (profile.ielts.testDate) {
    const date = profile.ielts.testDate.slice(0, 10);
    items.push({ id: 'ielts-test', origin: 'ielts', title: { en: 'IELTS test', bn: 'IELTS test' }, date, kind: 'test', done: false, bucket: deadlineBucket(date, now), href: '/ielts' });
  }
  const countries = new Set([...(a.preferredCountryCodes ?? []), ...(dream ? [dream] : [])]);
  for (const d of DEADLINES) {
    if (d.countryCode && !countries.has(d.countryCode)) continue;
    if (d.degreeLevel && a.degreeLevel && d.degreeLevel !== a.degreeLevel) continue;
    items.push({ id: d.id, origin: 'official', title: d.title, date: d.date.value, kind: d.kind, countryCode: d.countryCode, done: false, bucket: deadlineBucket(d.date.value, now), source: d.date.source });
  }
  return items.sort((x, y) => x.date.localeCompare(y.date));
}

// ------------------------------------------------------------------ documents

export function setDocumentStatus(abroad: StudyAbroadProfile, kind: DocumentKind, status: DocumentStatus, now = new Date()): StudyAbroadProfile {
  return { ...abroad, documents: { ...abroad.documents, [kind]: { status, updatedAt: now.toISOString() } } };
}

export const documentStatus = (abroad: StudyAbroadProfile, kind: DocumentKind): DocumentStatus => abroad.documents?.[kind]?.status ?? 'not-started';

/** The documents the dream country's roadmap asks for, in roadmap order (general set when no dream country). */
export function requiredDocuments(abroad: StudyAbroadProfile): DocumentKind[] {
  const defs = roadmapDefs(abroad.dreamCountryCode ? getCountry(abroad.dreamCountryCode) : undefined);
  const kinds: DocumentKind[] = [];
  for (const d of defs) for (const k of d.documents ?? []) if (!kinds.includes(k)) kinds.push(k);
  return kinds;
}
