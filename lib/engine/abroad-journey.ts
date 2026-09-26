import { MONTHS } from '@/lib/constants';
import type { JourneyMark, StudyAbroadProfile, UserProfile } from '@/lib/models';
import { countryHref } from '@/lib/abroad/countries';
import { roadmapDefs, type ResolvedStepDef } from '@/lib/abroad/roadmap';
import { getCountry } from '@/lib/content/countries';
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

/** Attention for a personal due date that is close (≤ 14 days) or missed. */
function dueAttention(dueAt: string | undefined, now: Date): AbroadStage['attention'] {
  if (!dueAt) return undefined;
  const days = Math.ceil((Date.parse(dueAt) - now.getTime()) / DAY);
  if (days < 0) return { key: 'sa.attention.missed', params: { n: -days } };
  if (days <= 14) return { key: 'sa.attention.dueSoon', params: { n: days } };
  return undefined;
}

/** The student's roadmap marks for one country. */
export const stepMarks = (abroad: StudyAbroadProfile, code: string): Record<string, JourneyMark> => abroad.journey?.steps?.[code] ?? {};

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
    // Until the applications and pre-departure centres exist, these stages continue on the country roadmap.
    apply: dream ? `${countryHref(dream)}/roadmap` : '/abroad/applications',
    offer: dream ? `${countryHref(dream)}/roadmap` : '/abroad/applications',
    visa: dream ? `/abroad/visa/${dream.toLowerCase()}` : '/abroad/visa',
    travel: dream ? `${countryHref(dream)}/roadmap` : '/abroad/pre-departure',
  };

  const stageSteps = dream ? roadmapDefs(getCountry(dream)) : [];
  const marks = dream ? stepMarks(a, dream) : {};

  const stages: AbroadStage[] = ABROAD_STAGE_IDS.map((id) => {
    const mark = journeyMark(a, id);
    let computed = auto[id];
    // A country-bound stage also follows its roadmap steps: all done → done, any started → in progress.
    const steps = dream && COUNTRY_BOUND.has(id) ? stageSteps.filter((d) => d.stage === id) : [];
    const stepDone = (d: ResolvedStepDef) => marks[d.id]?.status === 'done';
    if (steps.length && mark?.status !== 'done') {
      if (steps.every(stepDone)) computed = 'done';
      else if (steps.some((d) => marks[d.id])) computed = 'in-progress';
    }
    let status: AbroadStageStatus = computed === 'done' || mark?.status === 'done' ? 'done' : computed ?? mark?.status ?? 'upcoming';
    // A personal due date (on the stage or one of its open steps) that is close or missed needs attention.
    let attention: AbroadStage['attention'];
    if (status !== 'done') {
      attention = dueAttention(mark?.dueAt, now);
      for (const d of steps) if (!attention && !stepDone(d)) attention = dueAttention(marks[d.id]?.dueAt, now);
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

// ------------------------------------------------------------------ country roadmap

export type RoadmapStepStatus = AbroadStageStatus;

export interface RoadmapStep extends ResolvedStepDef {
  status: RoadmapStepStatus;
  /** Decided by the student's data (goal, country, IELTS), not by a tick. */
  auto: boolean;
  mark?: JourneyMark;
  attention?: AbroadStage['attention'];
  /** The first step that is not done. */
  current: boolean;
}

export interface CountryRoadmap {
  code: string;
  /** Only the dream country's roadmap can be ticked off (one active journey). */
  active: boolean;
  steps: RoadmapStep[];
  current?: RoadmapStep;
  done: number;
  total: number;
  percent: number;
}

/** Steps whose status follows the student's data instead of a tick. */
const AUTO_STEP_STAGES = new Set(['discover', 'choose-country', 'english']);

export function countryRoadmap(profile: UserProfile, code: string, now = new Date()): CountryRoadmap {
  const a = profile.abroad;
  const upper = code.toUpperCase();
  const active = a.dreamCountryCode === upper;
  const journey = abroadJourney(profile, now);
  const stageOf = (id: string) => journey.stages.find((s) => s.id === id);
  const marks = stepMarks(a, upper);
  let seenCurrent = false;
  const steps = roadmapDefs(getCountry(upper)).map((def): RoadmapStep => {
    const auto = AUTO_STEP_STAGES.has(def.stage);
    const mark = auto ? undefined : marks[def.id];
    let status: RoadmapStepStatus;
    if (def.stage === 'choose-country') status = active ? 'done' : 'upcoming';
    else if (auto) status = stageOf(def.stage)?.status === 'done' ? 'done' : stageOf(def.stage)?.status === 'upcoming' ? 'upcoming' : 'in-progress';
    else if (mark?.status === 'done') status = 'done';
    // A stage the student marked done (e.g. on the home screen) counts for its steps without their own mark.
    else if (!mark && active && journeyMark(a, def.stage as AbroadStageId)?.status === 'done') status = 'done';
    else status = mark ? 'in-progress' : 'upcoming';
    const attention = status !== 'done' ? dueAttention(mark?.dueAt, now) : undefined;
    const current = active && !seenCurrent && status !== 'done';
    if (current) {
      seenCurrent = true;
      if (status === 'upcoming') status = 'in-progress';
    }
    if (attention) status = 'attention';
    return { ...def, status, auto, current, ...(mark ? { mark } : {}), ...(attention ? { attention } : {}) };
  });
  const done = steps.filter((s) => s.status === 'done').length;
  return { code: upper, active, steps, current: steps.find((s) => s.current), done, total: steps.length, percent: Math.round((done / steps.length) * 100) };
}

function withStepMarks(abroad: StudyAbroadProfile, code: string, next: Record<string, JourneyMark>, at: string): StudyAbroadProfile {
  const journey = abroad.journey ?? { marks: {} };
  return { ...abroad, journey: { ...journey, steps: { ...journey.steps, [code]: next }, updatedAt: at } };
}

/**
 * Ticks a roadmap step (or un-ticks it). Un-ticking a step inside a stage the
 * student had marked done keeps the other steps done and re-opens only the stage.
 */
export function markStep(abroad: StudyAbroadProfile, code: string, stepId: string, done: boolean, now = new Date()): StudyAbroadProfile {
  const upper = code.toUpperCase();
  const at = now.toISOString();
  const defs = roadmapDefs(getCountry(upper));
  const def = defs.find((d) => d.id === stepId);
  if (!def || AUTO_STEP_STAGES.has(def.stage)) return abroad;
  const marks = { ...stepMarks(abroad, upper) };
  let result = abroad;
  if (done) marks[stepId] = { ...marks[stepId], status: 'done', updatedAt: at };
  else {
    const stageMark = abroad.dreamCountryCode === upper ? journeyMark(abroad, def.stage as AbroadStageId) : undefined;
    if (stageMark?.status === 'done') {
      for (const d of defs) if (d.stage === def.stage && d.id !== stepId && !marks[d.id]) marks[d.id] = { status: 'done', updatedAt: at };
      result = markStage(abroad, def.stage as AbroadStageId, false, now);
    }
    marks[stepId] = { ...marks[stepId], status: 'in-progress', updatedAt: at };
  }
  return withStepMarks(result, upper, marks, at);
}

/** Sets (or clears) the student's own target date for a step. */
export function setStepDue(abroad: StudyAbroadProfile, code: string, stepId: string, dueAt: string | undefined, now = new Date()): StudyAbroadProfile {
  const upper = code.toUpperCase();
  const at = now.toISOString();
  const marks = { ...stepMarks(abroad, upper) };
  const prev = marks[stepId];
  if (dueAt) marks[stepId] = { ...prev, status: prev?.status ?? 'in-progress', dueAt, updatedAt: at };
  else if (prev) {
    const { dueAt: _drop, ...rest } = prev;
    void _drop;
    marks[stepId] = { ...rest, updatedAt: at };
  }
  return withStepMarks(abroad, upper, marks, at);
}
