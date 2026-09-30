// My IELTS Plan: a personalised preparation plan built from the student's own
// answers (test date, target band, level, time, weak skills, preference).
// Rule-based on purpose: every number comes from a visible rule, so the plan is
// predictable and easy to adapt later (AI or adaptive planning can replace
// generateMyPlan behind the same MyPlan shape). It is a preparation schedule,
// never a band-score prediction.
import { IELTS_SKILLS, type IELTSSkill } from '@/lib/constants';
import type { MyPlan, MyPlanPhase, MyPlanPhaseId, PlanAnswers, PlanLevel, PlanPreference, UserProfile } from '@/lib/models';
import { localDateKey } from './dates';

export const PLAN_BANDS = [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9] as const;
export const PLAN_LEVELS: PlanLevel[] = ['beginner', 'elementary', 'intermediate', 'upper-intermediate', 'advanced'];
export const PLAN_DAILY_MINUTES = [30, 60, 90, 120, 180, 240] as const;
export const PLAN_DAYS_PER_WEEK = [3, 4, 5, 6, 7] as const;
export const PLAN_PREFERENCES: PlanPreference[] = ['short', 'long', 'mixed'];
export const PLAN_PHASE_IDS: MyPlanPhaseId[] = ['foundation', 'skill-building', 'practice', 'mock-tests', 'final-review'];
/** Latest test date the planner accepts (about two years ahead). */
export const PLAN_MAX_DAYS_AHEAD = 730;

const DAY = 86_400_000;
const parseDay = (key: string) => new Date(`${key}T00:00`);
const addDays = (key: string, n: number) => localDateKey(new Date(parseDay(key).getTime() + n * DAY));
const diffDays = (from: string, to: string) => Math.round((parseDay(to).getTime() - parseDay(from).getTime()) / DAY);

// ---------------------------------------------------------------- validation

export type PlanField = keyof PlanAnswers;
/** Error keys (under myPlan.errors) per field; empty when the answers can be saved. */
export function validatePlanAnswers(a: Partial<PlanAnswers>, now = new Date()): Partial<Record<PlanField, string>> {
  const errors: Partial<Record<PlanField, string>> = {};
  const today = localDateKey(now);
  if (!a.targetDate || !/^\d{4}-\d{2}-\d{2}$/.test(a.targetDate) || Number.isNaN(parseDay(a.targetDate).getTime())) errors.targetDate = 'dateMissing';
  else if (diffDays(today, a.targetDate) < 1) errors.targetDate = 'datePast';
  else if (diffDays(today, a.targetDate) > PLAN_MAX_DAYS_AHEAD) errors.targetDate = 'dateFar';
  if (a.targetBand === undefined || !(PLAN_BANDS as readonly number[]).includes(a.targetBand)) errors.targetBand = 'band';
  if (!a.currentLevel || !PLAN_LEVELS.includes(a.currentLevel)) errors.currentLevel = 'level';
  if (a.dailyStudyMinutes === undefined || !(PLAN_DAILY_MINUTES as readonly number[]).includes(a.dailyStudyMinutes)) errors.dailyStudyMinutes = 'minutes';
  if (a.studyDaysPerWeek === undefined || !(PLAN_DAYS_PER_WEEK as readonly number[]).includes(a.studyDaysPerWeek)) errors.studyDaysPerWeek = 'days';
  if (!Array.isArray(a.weakSkills) || a.weakSkills.some((s) => !IELTS_SKILLS.includes(s))) errors.weakSkills = 'skills';
  if (!a.studyPreference || !PLAN_PREFERENCES.includes(a.studyPreference)) errors.studyPreference = 'preference';
  return errors;
}

export const isCompletePlan = (a: Partial<PlanAnswers>, now = new Date()): a is PlanAnswers => Object.keys(validatePlanAnswers(a, now)).length === 0;

// ---------------------------------------------------------------- generation

/** Rough band a level usually sits at — only used to size the Foundation phase. */
const LEVEL_BAND: Record<PlanLevel, number> = { beginner: 4, elementary: 4.5, intermediate: 5.5, 'upper-intermediate': 6.5, advanced: 7.5 };
/** Share of the time for Foundation by level (English grammar and vocabulary first). */
const FOUNDATION_SHARE: Record<PlanLevel, number> = { beginner: 0.3, elementary: 0.22, intermediate: 0.12, 'upper-intermediate': 0.06, advanced: 0 };

/** Split `total` into whole numbers by weights, summing exactly to `total`. */
function apportion(total: number, weights: number[]): number[] {
  const sum = weights.reduce((a, b) => a + b, 0) || 1;
  const raw = weights.map((w) => (w / sum) * total);
  const out = raw.map(Math.floor);
  let left = total - out.reduce((a, b) => a + b, 0);
  const order = raw.map((r, i) => [r - Math.floor(r), i] as const).sort((a, b) => b[0] - a[0]);
  for (const [, i] of order) {
    if (left <= 0) break;
    if (weights[i] > 0) {
      out[i]++;
      left--;
    }
  }
  return out;
}

/** Time per skill: weak skills get 60% of skill time between them, the rest 40%. */
export function skillShare(weakSkills: IELTSSkill[]): Record<IELTSSkill, number> {
  const weak = IELTS_SKILLS.filter((s) => weakSkills.includes(s));
  const weights = weak.length === 0 || weak.length === IELTS_SKILLS.length ? IELTS_SKILLS.map(() => 1) : IELTS_SKILLS.map((s) => (weak.includes(s) ? 60 / weak.length : 40 / (IELTS_SKILLS.length - weak.length)));
  const pct = apportion(100, weights);
  return Object.fromEntries(IELTS_SKILLS.map((s, i) => [s, pct[i]])) as Record<IELTSSkill, number>;
}

/** Sessions per day from the student's preference. */
export function sessionPattern(daily: number, pref: PlanPreference): { sessionMinutes: number; sessionsPerDay: number } {
  const size = pref === 'short' ? 30 : pref === 'mixed' ? 45 : daily;
  const sessionsPerDay = Math.max(1, Math.ceil(daily / Math.min(size, daily)));
  return { sessionMinutes: Math.round(daily / sessionsPerDay), sessionsPerDay };
}

/**
 * The plan structure: phases in order (Foundation → Skill Building → Practice
 * → Mock Tests → Final Review) sized from the days left, level and target.
 */
export function generateMyPlan(a: PlanAnswers, now = new Date(), previous?: MyPlan): MyPlan {
  const today = localDateKey(now);
  const lastDay = addDays(a.targetDate, -1);
  const totalDays = Math.max(1, diffDays(today, a.targetDate));
  const gap = a.targetBand - LEVEL_BAND[a.currentLevel];
  const short = totalDays < 28;

  // Phase weights. A big gap between level and target adds Foundation time; a short
  // timeline keeps only what matters most (practice, mock tests, a short review).
  let foundation = FOUNDATION_SHARE[a.currentLevel] + (gap >= 2 && a.currentLevel !== 'advanced' ? 0.05 : 0);
  if (short) foundation = a.currentLevel === 'beginner' || a.currentLevel === 'elementary' ? foundation / 2 : 0;
  const mock = short ? 0.25 : 0.15;
  const review = totalDays >= 14 ? (short ? 0.12 : 0.08) : 0;
  const skill = short ? 0.2 : 0.32;
  const practice = Math.max(0, 1 - foundation - mock - review - skill);
  const weights = [foundation, skill, practice, mock, review];
  const days = apportion(totalDays, weights);

  const phases: MyPlanPhase[] = [];
  let cursor = today;
  PLAN_PHASE_IDS.forEach((id, i) => {
    if (days[i] <= 0) return;
    const end = addDays(cursor, days[i] - 1);
    const studyDays = Math.max(1, Math.round((days[i] * a.studyDaysPerWeek) / 7));
    phases.push({ id, startDate: cursor, endDate: end > lastDay ? lastDay : end, days: days[i], studyDays, minutes: studyDays * a.dailyStudyMinutes });
    cursor = addDays(end, 1);
  });

  const studyDays = phases.reduce((s, p) => s + p.studyDays, 0);
  const hours = Math.round((studyDays * a.dailyStudyMinutes) / 60);
  const notes: string[] = [];
  if (short) notes.push('short');
  if (hours < 30) notes.push('fewHours');
  if (gap >= 2.5 && totalDays < 120) notes.push('bigGap');
  const nowIso = now.toISOString();

  return {
    ...a,
    weakSkills: IELTS_SKILLS.filter((s) => a.weakSkills.includes(s)),
    version: 1,
    status: 'active',
    createdAt: previous?.createdAt ?? nowIso,
    generatedAt: nowIso,
    revisions: previous ? previous.revisions + 1 : 0,
    phases,
    skillShare: skillShare(a.weakSkills),
    ...sessionPattern(a.dailyStudyMinutes, a.studyPreference),
    totals: { days: totalDays, studyDays, hours },
    notes,
  };
}

/** Where each phase stands today (by date). */
export function phaseStatus(p: MyPlanPhase, now = new Date()): 'done' | 'current' | 'upcoming' {
  const today = localDateKey(now);
  return p.endDate < today ? 'done' : p.startDate <= today ? 'current' : 'upcoming';
}

/** The answers the plan was made from (to edit them). */
export const planAnswers = (p: MyPlan): PlanAnswers => ({
  targetDate: p.targetDate,
  targetBand: p.targetBand,
  currentLevel: p.currentLevel,
  dailyStudyMinutes: p.dailyStudyMinutes,
  studyDaysPerWeek: p.studyDaysPerWeek,
  weakSkills: [...p.weakSkills],
  studyPreference: p.studyPreference,
});

/** Fields that differ between the saved plan and new answers. */
const ANSWER_FIELDS: PlanField[] = ['targetDate', 'targetBand', 'currentLevel', 'dailyStudyMinutes', 'studyDaysPerWeek', 'weakSkills', 'studyPreference'];
export function changedFields(before: PlanAnswers, after: PlanAnswers): PlanField[] {
  return ANSWER_FIELDS.filter((k) => JSON.stringify(k === 'weakSkills' ? [...before[k]].sort() : before[k]) !== JSON.stringify(k === 'weakSkills' ? [...after[k]].sort() : after[k]));
}

/** Weekday order for a default study week (Saturday first, Friday rest last). */
const WEEK_ORDER = [6, 0, 1, 2, 3, 4, 5];

/**
 * Saves the plan on the profile. The target, test date and weekly time are the
 * same facts the rest of the app uses, so they are kept in step with the plan.
 * Nothing else (lessons, practice, test history) is touched.
 */
export function applyMyPlan(profile: UserProfile, plan: MyPlan): UserProfile {
  const keepDays = profile.ielts.studyDays?.length === plan.studyDaysPerWeek;
  return {
    ...profile,
    ielts: {
      ...profile.ielts,
      plan,
      targetBand: plan.targetBand,
      targetUnsure: false,
      testDate: plan.targetDate,
      testDateUnknown: false,
      weeklyStudyHours: Math.round(((plan.dailyStudyMinutes * plan.studyDaysPerWeek) / 60) * 10) / 10,
      studyDays: keepDays ? profile.ielts.studyDays : WEEK_ORDER.slice(0, plan.studyDaysPerWeek).sort(),
    },
  };
}

/**
 * Starting answers for the setup: what the student already told the app
 * (target, test date, weekly time) and the English check result, if any.
 */
export function suggestedAnswers(profile: UserProfile, now = new Date()): Partial<PlanAnswers> {
  const { ielts } = profile;
  const out: Partial<PlanAnswers> = {};
  if (ielts.testDate && validatePlanAnswers({ targetDate: ielts.testDate.slice(0, 10) }, now).targetDate === undefined) out.targetDate = ielts.testDate.slice(0, 10);
  if (ielts.targetBand !== undefined && (PLAN_BANDS as readonly number[]).includes(ielts.targetBand)) out.targetBand = ielts.targetBand;
  const level = suggestedLevel(profile);
  if (level) out.currentLevel = level;
  if (ielts.studyDays?.length && (PLAN_DAYS_PER_WEEK as readonly number[]).includes(ielts.studyDays.length)) out.studyDaysPerWeek = ielts.studyDays.length;
  if (ielts.weeklyStudyHours && out.studyDaysPerWeek) {
    const perDay = (ielts.weeklyStudyHours * 60) / out.studyDaysPerWeek;
    out.dailyStudyMinutes = PLAN_DAILY_MINUTES.reduce((best, m) => (Math.abs(m - perDay) < Math.abs(best - perDay) ? m : best), PLAN_DAILY_MINUTES[0]);
  }
  return out;
}

/** The level suggested by the English check (Foundation diagnostic), if it was taken. */
export function suggestedLevel(profile: UserProfile): PlanLevel | undefined {
  const d = profile.foundation?.diagnostic;
  if (!d) return undefined;
  return d.level === 'strong' ? 'upper-intermediate' : d.level === 'developing' ? 'intermediate' : 'elementary';
}
