// Deterministic performance analysis across a student's submitted tests.
// Everything here is counted from real answers; Mino explains the numbers but
// never invents a cause the data doesn't show. Each pattern carries evidence.
import type { ObjectiveSkill, PracticeTest, Question, QuestionType } from './model';
import { QUESTION_TYPE_LABELS, QUESTION_TYPES } from './question-types';
import type { QuestionResult, SectionResult } from './scoring';
import type { TestSession } from './session';

export interface AccuracyTally {
  correct: number;
  total: number;
  /** 0–100. */
  accuracy: number;
}

export type Confidence = 'low' | 'medium' | 'high';

export interface TypeStat extends AccuracyTally {
  skill: ObjectiveSkill;
  /** Questions actually answered (blanks are a separate pattern, not a skill weakness). */
  attempted: number;
  attemptedCorrect: number;
  type: QuestionType;
  label: string;
  /** Number of tests that included this type. */
  tests: number;
  latest: AccuracyTally;
}

export interface PartStat extends AccuracyTally {
  skill: ObjectiveSkill;
  part: number;
  tests: number;
}

export type PatternId =
  | 'spelling'
  | 'word-limit'
  | 'unanswered'
  | 'ran-out-of-time'
  | 'distractor'
  | 'not-given-confusion'
  | 'false-vs-not-given';

export interface Pattern {
  id: PatternId;
  count: number;
  /** Out of how many relevant questions. */
  of: number;
  /** Up to three concrete examples, e.g. "Practice Test 1 Reading Q10: wrote "rainwatter" (answer: rainwater)". */
  evidence: string[];
}

export interface WeakArea extends AccuracyTally {
  skill: ObjectiveSkill;
  kind: 'question-type' | 'part';
  type?: QuestionType;
  part?: number;
  label: string;
  confidence: Confidence;
  /** Patterns seen inside this area. */
  patterns: PatternId[];
  /** Knowledge card to explain the strategy (getIELTSGuide topic). */
  guideTopic: string;
}

export interface Attempt {
  sessionId: string;
  testId: string;
  testTitle: string;
  skill: ObjectiveSkill;
  submittedAt: string;
  correct: number;
  total: number;
  accuracy: number;
  estimatedBand?: number;
  timeUsedSeconds: number;
  timedOut: boolean;
}

export interface TestAnalysis {
  attempts: Attempt[];
  byType: TypeStat[];
  byPart: PartStat[];
  patterns: Pattern[];
  weakAreas: WeakArea[];
  /** Plain statement of how much evidence there is. */
  dataNote: string;
}

type Lookup = (testId: string) => PracticeTest | undefined;

const tally = (correct: number, total: number): AccuracyTally => ({ correct, total, accuracy: total ? Math.round((correct / total) * 100) : 0 });

export const confidenceFor = (total: number): Confidence => (total >= 12 ? 'high' : total >= 5 ? 'medium' : 'low');

const GUIDE_FOR_TYPE: Partial<Record<QuestionType, string>> = {
  'matching-headings': 'matching-headings',
  'true-false-not-given': 'tfng',
  'yes-no-not-given': 'tfng',
  'multiple-choice': 'multiple-choice',
  'multiple-choice-multi': 'multiple-choice',
  'matching-information': 'matching',
  'matching-features': 'matching',
  'matching-sentence-endings': 'matching',
  matching: 'matching',
};
export const guideForType = (type: QuestionType) => GUIDE_FOR_TYPE[type] ?? 'completion';

function submittedOnly(sessions: TestSession[]): (TestSession & { result: SectionResult })[] {
  return sessions
    .filter((s): s is TestSession & { result: SectionResult } => s.status === 'submitted' && Boolean(s.result))
    .sort((a, b) => (a.submittedAt ?? '').localeCompare(b.submittedAt ?? '') || a.startedAt.localeCompare(b.startedAt));
}

function questionMap(test: PracticeTest | undefined, skill: ObjectiveSkill): Map<string, Question> {
  const map = new Map<string, Question>();
  test?.sections[skill]?.parts.forEach((p) => p.groups.forEach((g) => g.questions.forEach((q) => map.set(q.id, q))));
  return map;
}

function partNumber(test: PracticeTest | undefined, skill: ObjectiveSkill, partId: string): number {
  return test?.sections[skill]?.parts.find((p) => p.id === partId)?.number ?? 0;
}

export function analyseTests(sessions: TestSession[], lookup: Lookup): TestAnalysis {
  const done = submittedOnly(sessions);
  const attempts: Attempt[] = done.map((s) => ({
    sessionId: s.id,
    testId: s.testId,
    testTitle: lookup(s.testId)?.title ?? s.testId,
    skill: s.skill,
    submittedAt: s.submittedAt ?? s.updatedAt,
    correct: s.result.correct,
    total: s.result.total,
    accuracy: tally(s.result.correct, s.result.total).accuracy,
    ...(s.result.estimatedBand !== undefined ? { estimatedBand: s.result.estimatedBand } : {}),
    timeUsedSeconds: s.elapsedSeconds,
    timedOut: Boolean(s.timedOut),
  }));

  const typeAcc = new Map<string, { skill: ObjectiveSkill; type: QuestionType; c: number; t: number; a: number; tests: Set<string>; latest: AccuracyTally }>();
  const partAcc = new Map<string, { skill: ObjectiveSkill; part: number; c: number; t: number; tests: Set<string> }>();
  const hits: Record<PatternId, { count: number; of: number; evidence: string[] }> = {
    spelling: { count: 0, of: 0, evidence: [] },
    'word-limit': { count: 0, of: 0, evidence: [] },
    unanswered: { count: 0, of: 0, evidence: [] },
    'ran-out-of-time': { count: 0, of: 0, evidence: [] },
    distractor: { count: 0, of: 0, evidence: [] },
    'not-given-confusion': { count: 0, of: 0, evidence: [] },
    'false-vs-not-given': { count: 0, of: 0, evidence: [] },
  };
  const areaPatterns = new Map<string, Set<PatternId>>();
  const note = (id: PatternId, q: QuestionResult, skill: ObjectiveSkill, example: string, areaKey: string) => {
    hits[id].count++;
    if (hits[id].evidence.length < 3) hits[id].evidence.push(example);
    areaPatterns.set(areaKey, (areaPatterns.get(areaKey) ?? new Set()).add(id));
  };

  for (const s of done) {
    const test = lookup(s.testId);
    const questions = questionMap(test, s.skill);
    const title = `${test?.title ?? s.testId} ${s.skill[0].toUpperCase()}${s.skill.slice(1)}`;
    const typesHere = new Map<QuestionType, { c: number; t: number }>();

    for (const q of s.result.questions ?? []) {
      const typeKey = `${s.skill}:${q.type}`;
      const partNo = partNumber(test, s.skill, q.partId);
      const partKey = `${s.skill}:part${partNo}`;

      const ta = typeAcc.get(typeKey) ?? { skill: s.skill, type: q.type, c: 0, t: 0, a: 0, tests: new Set<string>(), latest: tally(0, 0) };
      ta.c += q.correct ? 1 : 0;
      ta.t += 1;
      ta.a += q.unanswered ? 0 : 1;
      ta.tests.add(s.id);
      typeAcc.set(typeKey, ta);
      const th = typesHere.get(q.type) ?? { c: 0, t: 0 };
      th.c += q.correct ? 1 : 0;
      th.t += 1;
      typesHere.set(q.type, th);

      const pa = partAcc.get(partKey) ?? { skill: s.skill, part: partNo, c: 0, t: 0, tests: new Set<string>() };
      pa.c += q.correct ? 1 : 0;
      pa.t += 1;
      pa.tests.add(s.id);
      partAcc.set(partKey, pa);

      const ref = `${title} Q${q.number}`;
      const expected = q.expected[0]?.replace(/[()]/g, '') ?? '';
      if (QUESTION_TYPES[q.type].mode === 'text') {
        hits.spelling.of++;
        hits['word-limit'].of++;
      }
      hits.unanswered.of++;
      if (s.timedOut) hits['ran-out-of-time'].of++;

      if (q.correct) continue;
      if (q.unanswered) {
        note(s.timedOut ? 'ran-out-of-time' : 'unanswered', q, s.skill, `${ref}: left blank${s.timedOut ? ' when time ran out' : ''}`, typeKey);
        continue;
      }
      if (q.nearMiss) note('spelling', q, s.skill, `${ref}: wrote "${q.given}" (answer: ${expected})`, typeKey);
      if (q.overLimit) note('word-limit', q, s.skill, `${ref}: "${q.given}" is over the word limit`, typeKey);

      if (q.type === 'true-false-not-given' || q.type === 'yes-no-not-given') {
        hits['not-given-confusion'].of++;
        hits['false-vs-not-given'].of++;
        const exp = (q.expected[0] ?? '').toUpperCase();
        const given = q.given.toUpperCase();
        if (exp === 'NOT GIVEN') note('not-given-confusion', q, s.skill, `${ref}: answered ${given}, the passage doesn't say (NOT GIVEN)`, typeKey);
        else if (given === 'NOT GIVEN' && (exp === 'FALSE' || exp === 'NO')) note('false-vs-not-given', q, s.skill, `${ref}: answered NOT GIVEN, the passage contradicts it (${exp})`, typeKey);
      }

      const trap = questions.get(q.questionId)?.explanation?.distractors?.[q.given];
      if (trap) {
        hits.distractor.of++;
        note('distractor', q, s.skill, `${ref}: chose ${q.given}, a known trap (${trap})`, typeKey);
      }
    }
    for (const [type, v] of typesHere) {
      const ta = typeAcc.get(`${s.skill}:${type}`)!;
      ta.latest = tally(v.c, v.t);
    }
  }

  const byType: TypeStat[] = [...typeAcc.values()]
    .map((a) => ({ skill: a.skill, type: a.type, label: QUESTION_TYPE_LABELS[a.type], ...tally(a.c, a.t), attempted: a.a, attemptedCorrect: a.c, tests: a.tests.size, latest: a.latest }))
    .sort((a, b) => a.accuracy - b.accuracy || b.total - a.total);
  const byPart: PartStat[] = [...partAcc.values()]
    .map((a) => ({ skill: a.skill, part: a.part, ...tally(a.c, a.t), tests: a.tests.size }))
    .sort((a, b) => a.skill.localeCompare(b.skill) || a.part - b.part);

  const patterns: Pattern[] = (Object.keys(hits) as PatternId[])
    .filter((id) => hits[id].count > 0)
    .map((id) => ({ id, count: hits[id].count, of: Math.max(hits[id].of, hits[id].count), evidence: hits[id].evidence }))
    .sort((a, b) => b.count - a.count);

  // Weak areas: question types below 70% on the questions actually answered
  // (at least 2), plus a part that trails the student's other parts by 20+
  // points. Blank answers show up as the unanswered / ran-out-of-time pattern.
  const weakTypes: WeakArea[] = byType
    .map((x) => ({ x, acc: tally(x.attemptedCorrect, x.attempted) }))
    .filter(({ x, acc }) => x.attempted >= 2 && acc.accuracy < 70)
    .map(({ x, acc }) => ({
      skill: x.skill,
      kind: 'question-type' as const,
      type: x.type,
      label: x.label,
      ...acc,
      confidence: confidenceFor(x.attempted),
      patterns: [...(areaPatterns.get(`${x.skill}:${x.type}`) ?? [])],
      guideTopic: guideForType(x.type),
    }));
  const weakParts: WeakArea[] = byPart
    .filter((p) => {
      const others = byPart.filter((o) => o.skill === p.skill && o.part !== p.part);
      const rest = others.reduce((acc, o) => ({ c: acc.c + o.correct, t: acc.t + o.total }), { c: 0, t: 0 });
      return p.total >= 4 && rest.t >= 4 && p.accuracy <= tally(rest.c, rest.t).accuracy - 20;
    })
    .map((p) => ({
      skill: p.skill,
      kind: 'part' as const,
      part: p.part,
      label: `${p.skill === 'reading' ? 'Passage' : 'Part'} ${p.part}`,
      correct: p.correct,
      total: p.total,
      accuracy: p.accuracy,
      confidence: confidenceFor(p.total),
      patterns: [],
      guideTopic: p.skill,
    }));
  const weakAreas = [...weakTypes, ...weakParts].sort((a, b) => a.accuracy - b.accuracy || b.total - a.total).slice(0, 4);

  const questionsSeen = byType.reduce((n, x) => n + x.total, 0);
  const dataNote =
    attempts.length === 0
      ? 'No submitted practice tests yet, so there is no performance data.'
      : `${attempts.length} submitted test${attempts.length > 1 ? 's' : ''}, ${questionsSeen} questions. ` +
        (questionsSeen < 20 ? 'This is a small sample: treat patterns as early signals, not conclusions.' : 'Enough data for early patterns; more tests make them more reliable.');

  return { attempts: attempts.reverse(), byType, byPart, patterns, weakAreas, dataNote };
}
