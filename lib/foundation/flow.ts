import type { Exercise, L, Lesson, LessonStep } from './model';

/**
 * How a lesson is taught, whatever order its steps were written in:
 *
 *   Intro (what you'll learn) → LEARN (the rule, one small screen at a time)
 *   → EXAMPLES (examples, common mistakes, IELTS use) → TRY (one guided question)
 *   → PRACTICE (easy → harder, then recall, then personal use) → REVIEW (what you learned)
 *
 * Nothing is asked before the rule is taught. Review tests keep their own
 * order (instructions → questions → summary) and have no intro.
 */

export type LessonPhase = 'learn' | 'examples' | 'try' | 'practice' | 'review';
export const LESSON_PHASES: LessonPhase[] = ['learn', 'examples', 'try', 'practice', 'review'];

type Concept = Extract<LessonStep, { kind: 'concept' }>;

/** A screen that is not a content step of its own. */
export type FlowStep =
  | LessonStep
  /** "In this lesson": why it matters + the short list of what comes. */
  | { kind: 'intro'; title: L; why: L; topics: L[] }
  /** One screen of the rule: a part of a concept step. */
  | { kind: 'rule'; title: L; body?: L; points?: L[]; timeline?: Concept['timeline']; part: number; parts: number };

export interface FlowPage {
  phase: LessonPhase | 'intro';
  step: FlowStep;
  exercise?: Exercise;
  exerciseIndex?: number;
  exerciseCount?: number;
}

/** Order of the step kinds in a taught lesson. */
const RANK: Record<LessonStep['kind'], number> = {
  concept: 1,
  discover: 2,
  examples: 3,
  mistakes: 4,
  ielts: 5,
  hook: 6,
  identify: 7,
  practice: 8,
  recall: 9,
};

const PHASE: Record<LessonStep['kind'], LessonPhase> = {
  concept: 'learn',
  discover: 'examples',
  examples: 'examples',
  mistakes: 'examples',
  ielts: 'examples',
  hook: 'try',
  identify: 'try',
  practice: 'practice',
  recall: 'review',
};

/** Longest a single rule screen may be (characters of English) before it is split. */
export const RULE_SCREEN_MAX = 320;
/** An explanation paragraph longer than this is split into sentence groups. */
export const RULE_BODY_MAX = 260;
/** At most this many rule points on one screen. */
export const RULE_POINTS_PER_SCREEN = 2;

const len = (x?: L) => (x ? x.en.length : 0);

const sentencesEn = (t: string) => t.match(/[^.!?]+(?:[.!?]+["”’)]?|$)\s*/g)?.map((x) => x.trim()).filter(Boolean) ?? [t];
const sentencesBn = (t: string) => t.match(/[^।!?]+(?:[।!?]+["”’)]?|$)\s*/g)?.map((x) => x.trim()).filter(Boolean) ?? [t];

/**
 * A long explanation split into short paragraphs, sentence by sentence. Split
 * only when English and Bangla have the same number of sentences, so the two
 * languages always show the same content on the same screen.
 */
export function splitBody(body: L): L[] {
  if (body.en.length <= RULE_BODY_MAX) return [body];
  const en = sentencesEn(body.en);
  const bn = sentencesBn(body.bn);
  if (en.length < 2 || en.length !== bn.length) return [body];
  const out: L[] = [];
  let cur: L | null = null;
  en.forEach((s, i) => {
    if (cur && cur.en.length + 1 + s.length > RULE_BODY_MAX) {
      out.push(cur);
      cur = null;
    }
    cur = cur ? { en: `${cur.en} ${s}`, bn: `${cur.bn} ${bn[i]}` } : { en: s, bn: bn[i] };
  });
  if (cur) out.push(cur);
  return out;
}

/** A concept becomes one screen, or short screens: its explanation (in parts if long), then its points two at a time. */
export function ruleScreens(step: Concept): Extract<FlowStep, { kind: 'rule' }>[] {
  const points = step.points ?? [];
  const whole = len(step.body) + points.reduce((n, p) => n + len(p), 0);
  if (whole <= RULE_SCREEN_MAX && points.length <= RULE_POINTS_PER_SCREEN) {
    return [{ kind: 'rule', title: step.title, body: step.body, points: points.length ? points : undefined, timeline: step.timeline, part: 1, parts: 1 }];
  }
  const bodies = splitBody(step.body);
  const chunks: L[][] = [];
  for (let i = 0; i < points.length; i += RULE_POINTS_PER_SCREEN) chunks.push(points.slice(i, i + RULE_POINTS_PER_SCREEN));
  const parts = bodies.length + chunks.length;
  return [
    ...bodies.map((body, i) => ({ kind: 'rule' as const, title: step.title, body, timeline: i === 0 ? step.timeline : undefined, part: i + 1, parts })),
    ...chunks.map((c, i) => ({ kind: 'rule' as const, title: step.title, points: c, part: bodies.length + i + 1, parts })),
  ];
}

/** Steps in teaching order: the rule first, then examples, then a guided try, then practice. Stable within a kind. */
export function teachingOrder(lesson: Lesson): LessonStep[] {
  if (lesson.kind === 'test') return lesson.steps;
  return lesson.steps
    .map((s, i) => ({ s, i }))
    .sort((a, b) => RANK[a.s.kind] - RANK[b.s.kind] || a.i - b.i)
    .map((x) => x.s);
}

/**
 * The short "In this lesson" list. The lesson's own takeaways (its "Remember"
 * points) when it has them — so the intro and the closing summary mirror each
 * other — otherwise the headings of what will be taught.
 */
export function lessonTopics(lesson: Lesson): L[] {
  const takeaways = lesson.steps.flatMap((s) => (s.kind === 'recall' ? s.points : []));
  if (takeaways.length) return takeaways.slice(0, 4);
  const seen = new Set<string>();
  const topics: L[] = [];
  for (const s of teachingOrder(lesson)) {
    if (s.kind === 'practice' || s.kind === 'recall' || s.kind === 'hook' || s.kind === 'identify') continue;
    if (seen.has(s.title.en)) continue;
    seen.add(s.title.en);
    topics.push(s.title);
  }
  return topics.slice(0, 5);
}

/** Every screen of a lesson, in teaching order. Practice steps become one screen per question. */
export function lessonPages(lesson: Lesson): FlowPage[] {
  const test = lesson.kind === 'test';
  const intro: FlowPage[] = test ? [] : [{ phase: 'intro', step: { kind: 'intro', title: lesson.title, why: lesson.why, topics: lessonTopics(lesson) } }];
  return [
    ...intro,
    ...teachingOrder(lesson).flatMap((step): FlowPage[] => {
      const phase = PHASE[step.kind];
      if (step.kind === 'practice') return step.exercises.map((exercise, i) => ({ phase, step, exercise, exerciseIndex: i, exerciseCount: step.exercises.length }));
      if (step.kind === 'concept') return ruleScreens(step).map((r) => ({ phase, step: r }));
      return [{ phase, step }];
    }),
  ];
}

/** The phases a lesson actually has, in order (for the progress indicator). */
export const lessonPhases = (pages: FlowPage[]): LessonPhase[] => LESSON_PHASES.filter((p) => pages.some((x) => x.phase === p));
