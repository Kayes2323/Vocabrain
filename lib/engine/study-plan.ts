// Multi-day study plan (7–90 days or until the test). The structure is
// computed here from the student's real data; Mino explains it in words.
// Tasks only link to features that exist; anything else is marked as
// practice outside the app. The plan never promises a band score.
import { IELTS_SKILLS, type IELTSSkill } from '@/lib/constants';
import { msg, type Message } from '@/lib/i18n/message';
import type { UserProfile } from '@/lib/models';
import { localDateKey } from './dates';
import { daysUntil, formatBand } from './ielts';

export type PlanBlockKind = IELTSSkill | 'vocabulary' | 'test' | 'review-mistakes';
export const PLAN_HORIZONS = [7, 14, 30, 60, 90] as const;

export interface PlanBlock {
  kind: PlanBlockKind;
  minutes: number;
  title: Message;
  /** In-app destination, or undefined when the activity isn't in the app yet. */
  href?: string;
}

export interface PlanDay {
  date: string;
  day: number;
  rest: boolean;
  blocks: PlanBlock[];
}

export interface PlanPhase {
  id: 'foundation' | 'skill-building' | 'timed-practice' | 'final-review';
  fromDay: number;
  toDay: number;
}

export interface PlanFocus {
  kind: IELTSSkill | 'vocabulary';
  weight: number;
  /** Why this area gets time, from data. */
  reason: Message[];
}

export interface StudyPlan {
  horizonDays: number;
  startDate: string;
  endDate: string;
  testDate?: string;
  minutesPerDay: number;
  studyDaysPerWeek: number;
  target?: number;
  focus: PlanFocus[];
  phases: PlanPhase[];
  /** Minutes per area per week, for the overview. */
  weeklyMinutes: Record<IELTSSkill | 'vocabulary', number>;
  days: PlanDay[];
  /** What the plan assumed because data was missing. Shown to the student. */
  assumptions: Message[];
}

export interface PlanInputs {
  /** Weakest question type/part per skill from test analysis, most important first. */
  weakAreas?: { skill: IELTSSkill; label: string; accuracy: number; guideTopic?: string }[];
  /** Words due now / saved, from the Brain. */
  brain?: { total: number; due: number };
  /** Skills with at least one practice test in the app. */
  testedSkills?: IELTSSkill[];
}

const DEFAULT_MINUTES = 60;
/** Bangladesh default: Friday off. 0 = Sunday … 6 = Saturday. */
const DEFAULT_REST_DAYS = [5];

const HREF: Partial<Record<PlanBlockKind, string>> = {
  vocabulary: '/review',
  reading: '/ielts/reading',
  writing: '/practice/writing',
  speaking: '/practice/speaking',
  test: '/ielts/tests',
  'review-mistakes': '/ielts/tests',
};

function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function planHorizon(profile: UserProfile, requested: number | 'test', now = new Date()): number {
  const toTest = profile.ielts.testDate ? daysUntil(profile.ielts.testDate, now) : undefined;
  const wanted = requested === 'test' ? (toTest ?? 30) : requested;
  const capped = toTest !== undefined && toTest > 0 ? Math.min(wanted, toTest) : wanted;
  return Math.max(3, Math.min(90, capped));
}

export function buildStudyPlan(profile: UserProfile, requested: number | 'test', inputs: PlanInputs = {}, now = new Date()): StudyPlan {
  const { ielts } = profile;
  const assumptions: Message[] = [];
  const horizonDays = planHorizon(profile, requested, now);

  // Time available
  const restDays = DEFAULT_REST_DAYS;
  const studyDaysPerWeek = 7 - restDays.length;
  let minutesPerDay = DEFAULT_MINUTES;
  if (ielts.weeklyStudyHours) minutesPerDay = Math.round((ielts.weeklyStudyHours * 60) / studyDaysPerWeek / 5) * 5;
  else assumptions.push(msg('studyPlan.assume.time', { minutes: DEFAULT_MINUTES }));
  minutesPerDay = Math.max(15, Math.min(240, minutesPerDay));
  assumptions.push(msg('studyPlan.assume.rest'));

  // Where time goes: bigger gap to target → more time; weak test areas get a boost.
  const target = ielts.targetBand;
  if (target === undefined) assumptions.push(msg('studyPlan.assume.target'));
  const weights = {} as Record<IELTSSkill | 'vocabulary', number>;
  const reasons = {} as Record<IELTSSkill | 'vocabulary', Message[]>;
  for (const skill of IELTS_SKILLS) {
    const band = ielts.currentBands[skill];
    if (band === undefined) {
      weights[skill] = 1.2;
      reasons[skill] = [msg('studyPlan.reason.noData')];
      continue;
    }
    const gap = target !== undefined ? Math.max(0.25, target - band) : 0.75;
    weights[skill] = 0.6 + gap;
    reasons[skill] = [
      target === undefined
        ? msg('studyPlan.reason.band', { band: formatBand(band) })
        : band >= target
          ? msg('studyPlan.reason.atTarget', { band: formatBand(band), target: formatBand(target) })
          : msg('studyPlan.reason.gap', { band: formatBand(band), target: formatBand(target) }),
    ];
  }
  for (const w of inputs.weakAreas ?? []) {
    if (weights[w.skill] === undefined) continue;
    weights[w.skill] += 0.5;
    reasons[w.skill].push(msg('studyPlan.reason.weak', { label: w.label, accuracy: w.accuracy }));
  }
  const due = inputs.brain?.due ?? 0;
  weights.vocabulary = 0.9 + Math.min(0.6, due / 40);
  reasons.vocabulary = [
    inputs.brain?.total ? msg('studyPlan.reason.vocab', { total: inputs.brain.total, due }) : msg('studyPlan.reason.vocabNew'),
  ];

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const focus: PlanFocus[] = (Object.keys(weights) as (IELTSSkill | 'vocabulary')[])
    .map((kind) => ({ kind, weight: Math.round((weights[kind] / totalWeight) * 100), reason: reasons[kind] }))
    .sort((a, b) => b.weight - a.weight);

  // Phases
  const phases: PlanPhase[] = [];
  const cut = (fractions: [PlanPhase['id'], number][]) => {
    let from = 1;
    fractions.forEach(([id, f], i) => {
      const to = i === fractions.length - 1 ? horizonDays : Math.max(from, from + Math.round(horizonDays * f) - 1);
      phases.push({ id, fromDay: from, toDay: to });
      from = to + 1;
    });
  };
  if (horizonDays <= 14) cut([['skill-building', 0.6], ['timed-practice', 0.3], ['final-review', 0.1]]);
  else cut([['foundation', 0.25], ['skill-building', 0.4], ['timed-practice', 0.25], ['final-review', 0.1]]);
  const phaseOf = (day: number) => phases.find((p) => day >= p.fromDay && day <= p.toDay)!.id;

  // Days: vocabulary every study day, then the two highest-need skills for the
  // day, rotating by weight so every skill appears each week.
  const skillOrder = focus.filter((f) => f.kind !== 'vocabulary').map((f) => f.kind as IELTSSkill);
  const credit = Object.fromEntries(skillOrder.map((s) => [s, 0])) as Record<IELTSSkill, number>;
  const weeklyMinutes = { vocabulary: 0, listening: 0, reading: 0, writing: 0, speaking: 0 };
  const days: PlanDay[] = [];
  let studyDay = 0;

  for (let d = 1; d <= horizonDays; d++) {
    const date = addDays(now, d - 1);
    const rest = restDays.includes(date.getDay());
    const blocks: PlanBlock[] = [];
    if (!rest) {
      studyDay++;
      const phase = phaseOf(d);
      const vocabMinutes = Math.max(10, Math.round((minutesPerDay * weights.vocabulary) / totalWeight / 5) * 5);
      blocks.push({ kind: 'vocabulary', minutes: vocabMinutes, title: msg('studyPlan.block.vocabulary'), href: HREF.vocabulary });
      let left = minutesPerDay - vocabMinutes;

      const testDay = phase !== 'foundation' && studyDay % 6 === 0 && left >= 40;
      if (testDay) {
        blocks.push({ kind: 'test', minutes: Math.min(60, left - 10), title: msg('studyPlan.block.test'), href: HREF.test });
        left -= Math.min(60, left - 10);
        blocks.push({ kind: 'review-mistakes', minutes: left, title: msg('studyPlan.block.reviewMistakes'), href: HREF['review-mistakes'] });
      } else {
        for (const s of skillOrder) credit[s] += weights[s];
        const picks = [...skillOrder].sort((a, b) => credit[b] - credit[a]).slice(0, left >= 40 ? 2 : 1);
        picks.forEach((skill, i) => {
          credit[skill] -= totalWeight / 2;
          const minutes = i === picks.length - 1 ? left : Math.round(left / picks.length / 5) * 5;
          left -= minutes;
          const weak = inputs.weakAreas?.find((w) => w.skill === skill);
          const early = phase === 'foundation';
          const title =
            skill === 'reading' && weak
              ? msg('studyPlan.block.readingWeak', { label: weak.label })
              : msg(`studyPlan.block.${skill}${(skill === 'writing' || skill === 'speaking') && early ? 'Early' : ''}`);
          blocks.push({ kind: skill, minutes, title, href: HREF[skill] });
        });
      }
      for (const b of blocks) {
        const k = b.kind === 'test' || b.kind === 'review-mistakes' ? 'reading' : b.kind;
        if (d <= 7) weeklyMinutes[k as keyof typeof weeklyMinutes] += b.minutes;
      }
    }
    days.push({ date: localDateKey(date), day: d, rest, blocks });
  }

  if (!inputs.testedSkills?.length) assumptions.push(msg('studyPlan.assume.tests'));

  return {
    horizonDays,
    startDate: localDateKey(now),
    endDate: localDateKey(addDays(now, horizonDays - 1)),
    ...(ielts.testDate ? { testDate: ielts.testDate.slice(0, 10) } : {}),
    minutesPerDay,
    studyDaysPerWeek,
    ...(target !== undefined ? { target } : {}),
    focus,
    phases,
    weeklyMinutes,
    days,
    assumptions,
  };
}
