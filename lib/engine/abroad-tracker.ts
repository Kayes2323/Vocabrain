import { documentsFor, stepDocuments, type DocumentContext, type DocumentNeed } from '@/lib/abroad/documents';
import { countrySections, factStatus } from '@/lib/abroad/sections';
import { SCHOLARSHIPS } from '@/lib/content/scholarships';
import { roadmapDefs } from '@/lib/abroad/roadmap';
import { daysUntil, deadlineBucket, type DeadlineBucket } from '@/lib/abroad/status';
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
import { abroadJourney, countryRoadmap, roadmapContext, stepMarks } from './abroad-journey';

/**
 * The student's own Study Abroad lists: universities they consider, dates
 * they added, how far each document is. Pure functions; the UI saves the
 * returned profile. Nothing here adds facts about a country.
 */

const newId = (prefix: string, now: Date) => `${prefix}-${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

// ------------------------------------------------------------------ universities

const norm = (s: string | undefined) => (s ?? '').trim().toLowerCase().replace(/\s+/g, ' ');

/** One entry per university + program: same registry ids, or the same name/country/program text. */
export function isSameShortlistEntry(a: Pick<SavedUniversity, 'name' | 'countryCode' | 'universityId' | 'program' | 'programId'>, b: typeof a): boolean {
  const sameUni = a.universityId && b.universityId ? a.universityId === b.universityId : norm(a.name) === norm(b.name) && a.countryCode.toUpperCase() === b.countryCode.toUpperCase();
  const sameProgram = a.programId || b.programId ? a.programId === b.programId : norm(a.program) === norm(b.program);
  return Boolean(sameUni && sameProgram);
}

export function addUniversity(
  abroad: StudyAbroadProfile,
  input: Pick<SavedUniversity, 'name' | 'countryCode' | 'fit'> & Partial<Pick<SavedUniversity, 'program' | 'programId' | 'officialUrl' | 'universityId' | 'status'>>,
  now = new Date(),
): StudyAbroadProfile {
  const name = input.name.trim();
  if (!name) return abroad;
  if ((abroad.universities ?? []).some((u) => isSameShortlistEntry(u, { ...input, name }))) return abroad; // never a duplicate
  const url = input.officialUrl?.trim();
  const item: SavedUniversity = {
    id: newId('uni', now),
    name,
    countryCode: input.countryCode.toUpperCase(),
    fit: input.fit,
    status: input.status ?? 'researching',
    addedAt: now.toISOString(),
    ...(input.program?.trim() ? { program: input.program.trim() } : {}),
    // Only web links; anything else is dropped rather than rendered as a link.
    ...(url && /^https?:\/\/\S+\.\S+/.test(url) ? { officialUrl: url } : {}),
    ...(input.universityId ? { universityId: input.universityId } : {}),
    ...(input.programId ? { programId: input.programId } : {}),
  };
  return { ...abroad, universities: [...(abroad.universities ?? []), item] };
}

export function updateUniversity(abroad: StudyAbroadProfile, id: string, patch: Partial<Pick<SavedUniversity, 'fit' | 'status' | 'program' | 'programId'>>, now = new Date()): StudyAbroadProfile {
  const list = abroad.universities ?? [];
  const current = list.find((u) => u.id === id);
  if (!current) return abroad;
  const clean = { ...patch, ...(patch.program !== undefined ? { program: patch.program.trim() || undefined } : {}) };
  const next = { ...current, ...clean, updatedAt: now.toISOString() };
  if (!next.program) delete next.program;
  // Changing the program must not turn this entry into a copy of another one.
  if (list.some((u) => u.id !== id && isSameShortlistEntry(u, next))) return abroad;
  return { ...abroad, universities: list.map((u) => (u.id === id ? next : u)) };
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
    for (const def of roadmapDefs(getCountry(dream), roadmapContext(a, dream))) {
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
  // Keep the student's valid-until date when the status changes.
  return { ...abroad, documents: { ...abroad.documents, [kind]: { ...abroad.documents?.[kind], status, updatedAt: now.toISOString() } } };
}

export const documentStatus = (abroad: StudyAbroadProfile, kind: DocumentKind): DocumentStatus => abroad.documents?.[kind]?.status ?? 'not-started';

/** What the student sees: their status, or "needs update" once their own valid-until date has passed. */
export type DocumentViewStatus = DocumentStatus | 'needs-update';

export function documentViewStatus(abroad: StudyAbroadProfile, kind: DocumentKind, now = new Date()): DocumentViewStatus {
  const p = abroad.documents?.[kind];
  if (p?.validUntil && deadlineBucket(p.validUntil, now) === 'missed') return 'needs-update';
  return p?.status ?? 'not-started';
}

/** Sets (or clears) the student's own "valid until" date for a document. Status is kept. */
export function setDocumentValidUntil(abroad: StudyAbroadProfile, kind: DocumentKind, date: string | undefined, now = new Date()): StudyAbroadProfile {
  const prev = abroad.documents?.[kind] ?? { status: 'not-started' as const, updatedAt: now.toISOString() };
  const next = { ...prev, updatedAt: now.toISOString() };
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) next.validUntil = date;
  else delete next.validUntil;
  return { ...abroad, documents: { ...abroad.documents, [kind]: next } };
}

/**
 * The documents the student's route needs, in roadmap order: the dream
 * country's roadmap, plus its chosen pathway's and visa category's
 * documents (general set when no dream country).
 */
export function requiredDocuments(abroad: StudyAbroadProfile): DocumentKind[] {
  return requiredDocumentNeeds(abroad).map((n) => n.kind);
}

/**
 * The student's route for one country, for documents and official costs:
 * pathway, degree, and the reviewed universities / programs / scholarships
 * they chose (entries they typed themselves carry no requirements).
 */
export function studentRouteContext(abroad: StudyAbroadProfile, code: string | undefined): DocumentContext {
  if (!code) return abroad.degreeLevel ? { degreeLevel: abroad.degreeLevel } : {};
  const upper = code.toUpperCase();
  const mine = (abroad.universities ?? []).filter((u) => u.countryCode === upper && u.status !== 'not-proceeding' && u.status !== 'rejected');
  const ids = <T,>(list: (T | undefined)[]) => [...new Set(list.filter((x): x is T => Boolean(x)))];
  const universityIds = ids(mine.map((u) => u.universityId));
  const programIds = ids(mine.map((u) => u.programId));
  const scholarshipIds = abroad.savedScholarships ?? [];
  return {
    ...roadmapContext(abroad, upper),
    ...(abroad.degreeLevel ? { degreeLevel: abroad.degreeLevel } : {}),
    ...(universityIds.length ? { universityIds } : {}),
    ...(programIds.length ? { programIds } : {}),
    ...(scholarshipIds.length ? { scholarshipIds } : {}),
  };
}

export function requiredDocumentNeeds(abroad: StudyAbroadProfile): DocumentNeed[] {
  const code = abroad.dreamCountryCode;
  return documentsFor(code ? getCountry(code) : undefined, studentRouteContext(abroad, code));
}

// ------------------------------------------------------------------ next action

export type AbroadNextAction =
  | { kind: 'date'; title: string | Bilingual; date: string; bucket: DeadlineBucket; href: string }
  | { kind: 'step'; title: Bilingual; stepId: string; href: string }
  | { kind: 'stage'; stageId: string; href: string };

/**
 * The single most useful thing to do next, used by Study Abroad home and Mino:
 * a date that is missed or due this week first, then the current roadmap step
 * of the dream country, else the current journey stage.
 */
export function abroadNextAction(profile: UserProfile, now = new Date()): AbroadNextAction {
  const urgent = allDeadlines(profile, now).find((d) => !d.done && (d.bucket === 'missed' || d.bucket === 'this-week'));
  if (urgent) return { kind: 'date', title: urgent.title, date: urgent.date, bucket: urgent.bucket, href: urgent.href ?? '/abroad/deadlines' };
  const dream = profile.abroad.dreamCountryCode;
  if (dream) {
    const step = countryRoadmap(profile, dream, now).current;
    if (step) return { kind: 'step', title: step.title, stepId: step.id, href: `/abroad/countries/${dream.toLowerCase()}/roadmap` };
  }
  const journey = abroadJourney(profile, now);
  return { kind: 'stage', stageId: journey.current.id, href: journey.current.href };
}

// ------------------------------------------------------------------ alerts

export type AbroadAlert =
  | { id: string; kind: 'deadline'; title: string | Bilingual; date: string; bucket: DeadlineBucket; href: string }
  | { id: string; kind: 'document-update'; document: DocumentKind; href: string }
  | { id: string; kind: 'document-missing'; document: DocumentKind; step: Bilingual; href: string }
  | { id: string; kind: 'scholarship'; name: string; date: string; href: string }
  | { id: string; kind: 'needs-review'; section: string; href: string };

const ALERT_ORDER: AbroadAlert['kind'][] = ['deadline', 'document-update', 'scholarship', 'document-missing', 'needs-review'];

/**
 * What needs the student's attention now — computed from the same state as
 * every screen (deadlines, document progress, roadmap, saved scholarships,
 * fact review dates). One alert per thing (stable ids), only when something
 * is actually due, and each one points to where it is fixed.
 */
export function abroadAlerts(profile: UserProfile, now = new Date(), limit = 3): AbroadAlert[] {
  const a = profile.abroad;
  const out = new Map<string, AbroadAlert>();
  const put = (alert: AbroadAlert) => out.has(alert.id) || out.set(alert.id, alert);

  // Missed and this-week dates (student's, roadmap targets, IELTS, official).
  for (const d of allDeadlines(profile, now)) {
    if (d.done || (d.bucket !== 'missed' && d.bucket !== 'this-week')) continue;
    put({ id: `deadline:${d.id}`, kind: 'deadline', title: d.title, date: d.date, bucket: d.bucket, href: d.href ?? '/abroad/deadlines' });
  }
  // Documents past the student's own valid-until date.
  for (const [kind, p] of Object.entries(a.documents ?? {})) {
    if (p && documentViewStatus(a, kind as DocumentKind, now) === 'needs-update') {
      put({ id: `document-update:${kind}`, kind: 'document-update', document: kind as DocumentKind, href: `/abroad/documents?open=${kind}` });
    }
  }
  // Saved scholarships closing within two weeks (verified deadlines only).
  for (const s of SCHOLARSHIPS.filter((x) => (a.savedScholarships ?? []).includes(x.id))) {
    const date = s.deadline && factStatus(s.deadline, 'scholarships', now) !== 'not-verified' ? s.deadline.value : undefined;
    const days = date ? daysUntil(date, now) : undefined;
    if (date && days !== undefined && days >= 0 && days <= 14) put({ id: `scholarship:${s.id}`, kind: 'scholarship', name: s.name, date, href: '/abroad/scholarships' });
  }
  const code = a.dreamCountryCode;
  const country = code ? getCountry(code) : undefined;
  if (country) {
    // Documents for the step the student is on now, still not started.
    const roadmap = countryRoadmap(profile, country.code, now);
    const step = roadmap.current;
    if (step) {
      const docs = stepDocuments(roadmap.steps, documentsFor(country, studentRouteContext(a, country.code)))[step.id] ?? [];
      for (const kind of docs) {
        if (documentViewStatus(a, kind, now) === 'not-started') put({ id: `document-missing:${kind}`, kind: 'document-missing', document: kind, step: step.title, href: `/abroad/documents?open=${kind}` });
      }
    }
    // Official facts for the dream country that are past their review date.
    for (const sec of countrySections(country, now, studentRouteContext(a, country.code))) {
      if (sec.status === 'needs-review') put({ id: `needs-review:${sec.id}`, kind: 'needs-review', section: sec.id, href: `/abroad/countries/${country.code.toLowerCase()}?tab=${sec.tab}` });
    }
  }
  return [...out.values()].sort((x, y) => ALERT_ORDER.indexOf(x.kind) - ALERT_ORDER.indexOf(y.kind)).slice(0, limit);
}
