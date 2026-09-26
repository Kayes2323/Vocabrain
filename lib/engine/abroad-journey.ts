import { MONTHS } from '@/lib/constants';
import type { JourneyMark, StudyAbroadProfile, UserProfile } from '@/lib/models';
import { countryHref } from '@/lib/abroad/countries';
import { ieltsJourney } from './journey';

/**
 * Study Abroad journey: 10 stages for ONE active dream country.
 *
 * A stage is done when its rule is met by the student's data (e.g. a dream
 * country is chosen, the IELTS journey is target-ready) or when the student
 * marks it done. Only those manual marks are stored (abroad.journey.marks);
 * everything else is computed, so there is nothing to migrate or go stale.
 *
 * Migration from the earlier 8 stages (goal, destination, ielts, university,
 * scholarship, application, visa, departure): those were computed from the
 * same profile fields, so no stored progress existed. Their rules live on:
 * goal → discover, destination → choose-country (a shortlist without a dream
 * country is "in progress"), ielts → english. Nothing is lost.
 */
export const ABROAD_STAGE_IDS = [
  'discover',
  'choose-country',
  'eligibility',
  'program',
  'english',
  'documents',
  'apply',
  'offer',
  'visa',
  'travel',
] as const;
export type AbroadStageId = (typeof ABROAD_STAGE_IDS)[number];

export type AbroadStageStatus = 'done' | 'in-progress' | 'upcoming' | 'attention';

export interface AbroadStage {
  id: AbroadStageId;
  status: AbroadStageStatus;
  /** Where the student finishes this stage. */
  href: string;
  /** The student can mark this stage done themselves (no data rule decides it). */
  manual: boolean;
  /** Why the stage needs attention (i18n key + params), when it does. */
  attention?: { key: string; params?: Record<string, string | number> };
}

export interface AbroadJourney {
  stages: AbroadStage[];
  /** First stage that is not done (the last one when everything is done). */
  current: AbroadStage;
  /** The stage after the current one that is not done, if any. */
  next?: AbroadStage;
  /** Stages that need attention now. */
  attention: AbroadStage[];
  currentIndex: number;
  /** Completed stages out of 10, as a percentage. */
  percent: number;
  complete: boolean;
}

export function hasAbroadGoal(abroad: StudyAbroadProfile): boolean {
  return Boolean(abroad.degreeLevel || abroad.targetIntake);
}

export function formatIntake(abroad: StudyAbroadProfile): string | undefined {
  const intake = abroad.targetIntake;
  if (!intake?.month || !intake.year) return undefined;
  return `${MONTHS[intake.month - 1]} ${intake.year}`;
}

/** Stages whose marks belong to one dream country (switching country starts them fresh). */
const COUNTRY_BOUND = new Set<AbroadStageId>(['eligibility', 'program', 'documents', 'apply', 'offer', 'visa', 'travel']);

/** The student's own mark for a stage, if it applies to the current journey. */
export function journeyMark(abroad: StudyAbroadProfile, id: AbroadStageId): JourneyMark | undefined {
  const mark = abroad.journey?.marks[id];
  if (!mark) return undefined;
  if (COUNTRY_BOUND.has(id) && mark.countryCode && mark.countryCode !== abroad.dreamCountryCode) return undefined;
  return mark;
}

const DAY = 86_400_000;

export function abroadJourney(profile: UserProfile, now = new Date()): AbroadJourney {
  const a = profile.abroad;
  const dream = a.dreamCountryCode;
  const ielts = ieltsJourney(profile);
  const ieltsReady = ielts.current === 'target-ready' && ielts.percent === 100;
  const ieltsStarted = profile.ielts.targetBand !== undefined || Object.keys(profile.ielts.currentBands ?? {}).length > 0;
  const shortlist = a.preferredCountryCodes ?? [];

  const auto: Partial<Record<AbroadStageId, AbroadStageStatus | undefined>> = {
    discover: hasAbroadGoal(a) ? 'done' : profile.goal === 'abroad' ? 'in-progress' : undefined,
    'choose-country': dream ? 'done' : shortlist.length > 0 ? 'in-progress' : undefined,
    english: ieltsReady ? 'done' : ieltsStarted ? 'in-progress' : undefined,
  };
  const manual = (id: AbroadStageId) => auto[id] === undefined || id === 'english' || id === 'eligibility';

  const href: Record<AbroadStageId, string> = {
    discover: '/setup/abroad',
    'choose-country': '/abroad/countries',
    eligibility: dream ? countryHref(dream, 'apply') : '/abroad/countries',
    program: '/abroad/universities',
    english: '/ielts',
    documents: '/abroad/documents',
    apply: '/abroad/applications',
    offer: '/abroad/applications',
    visa: dream ? `/abroad/visa/${dream.toLowerCase()}` : '/abroad/visa',
    travel: '/abroad/pre-departure',
  };

  const stages: AbroadStage[] = ABROAD_STAGE_IDS.map((id) => {
    const mark = journeyMark(a, id);
    const computed = auto[id];
    let status: AbroadStageStatus = computed === 'done' || mark?.status === 'done' ? 'done' : computed ?? mark?.status ?? 'upcoming';
    let attention: AbroadStage['attention'];
    // A personal due date that is close or missed needs attention.
    if (status !== 'done' && mark?.dueAt) {
      const days = Math.ceil((Date.parse(mark.dueAt) - now.getTime()) / DAY);
      if (days < 0) attention = { key: 'sa.attention.missed', params: { n: -days } };
      else if (days <= 14) attention = { key: 'sa.attention.dueSoon', params: { n: days } };
    }
    // An IELTS test that is close while the target isn't reached yet.
    if (id === 'english' && status !== 'done' && profile.ielts.testDate) {
      const days = Math.ceil((Date.parse(profile.ielts.testDate) - now.getTime()) / DAY);
      if (days >= 0 && days <= 14) attention = { key: 'sa.attention.ieltsSoon', params: { n: days } };
    }
    if (attention) status = 'attention';
    return { id, status, href: href[id], manual: manual(id), ...(attention ? { attention } : {}) };
  });

  const doneCount = stages.filter((s) => s.status === 'done').length;
  const currentIndex = Math.max(0, stages.findIndex((s) => s.status !== 'done'));
  const complete = doneCount === stages.length;
  const current = complete ? stages[stages.length - 1] : stages[currentIndex];
  const next = complete ? undefined : stages.slice(currentIndex + 1).find((s) => s.status !== 'done');
  return {
    stages,
    current,
    next,
    attention: stages.filter((s) => s.status === 'attention'),
    currentIndex: complete ? stages.length - 1 : currentIndex,
    percent: Math.round((doneCount / stages.length) * 100),
    complete,
  };
}

/** Marks a stage done (or undoes it) for the current dream country. Never deletes other marks. */
export function markStage(abroad: StudyAbroadProfile, id: AbroadStageId, done: boolean, now = new Date()): StudyAbroadProfile {
  const marks = { ...(abroad.journey?.marks ?? {}) };
  const at = now.toISOString();
  if (done) marks[id] = { ...marks[id], status: 'done', updatedAt: at, ...(COUNTRY_BOUND.has(id) && abroad.dreamCountryCode ? { countryCode: abroad.dreamCountryCode } : {}) };
  else if (marks[id]) marks[id] = { ...marks[id], status: 'in-progress', updatedAt: at };
  return { ...abroad, journey: { ...abroad.journey, marks, updatedAt: at } };
}

/** Sets the dream country; it also joins the shortlist. Earlier marks stay stored. */
export function setDreamCountry(abroad: StudyAbroadProfile, code: string | undefined): StudyAbroadProfile {
  if (!code) return { ...abroad, dreamCountryCode: undefined };
  const shortlist = abroad.preferredCountryCodes ?? [];
  return { ...abroad, dreamCountryCode: code, preferredCountryCodes: shortlist.includes(code) ? shortlist : [...shortlist, code] };
}

/** Adds or removes a country from the shortlist (the dream country stays unless removed explicitly). */
export function toggleShortlist(abroad: StudyAbroadProfile, code: string): StudyAbroadProfile {
  const shortlist = abroad.preferredCountryCodes ?? [];
  if (shortlist.includes(code)) {
    return { ...abroad, preferredCountryCodes: shortlist.filter((c) => c !== code), ...(abroad.dreamCountryCode === code ? { dreamCountryCode: undefined } : {}) };
  }
  return { ...abroad, preferredCountryCodes: [...shortlist, code] };
}
