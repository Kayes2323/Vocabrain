// IELTS Progress: every number here is counted from what the student actually
// did — lessons completed, test sections submitted, passages checked, practice
// days, Mino's feedback on their own writing and speaking. Nothing is estimated
// or predicted; where there is no data the value is simply absent.
import { IELTS_SKILLS, type IELTSSkill } from '@/lib/constants';
import { CURRICULUM, getStage, stageLessons } from '@/lib/foundation/curriculum';
import { analyseTests, type PracticeTest, type TestSession } from '@/lib/ielts';
import type { UserProfile } from '@/lib/models';
import { localDateKey } from './dates';
import { ieltsJourney } from './journey';

const round1 = (n: number) => Math.round(n * 10) / 10;
const pct = (done: number, total: number) => (total ? Math.round((done / total) * 100) : 0);

/** Lesson prefix of each skill's "Understanding IELTS …" module. */
const SKILL_PREFIX: Record<IELTSSkill, string> = { listening: 'ls', reading: 'rd', writing: 'wr', speaking: 'sp' };
const ALL_LESSONS = [...new Set(CURRICULUM.flatMap((st) => st.steps.flatMap((s) => s.lessons ?? [])))];
export const skillLessonIds = (skill: IELTSSkill) => ALL_LESSONS.filter((id) => id.startsWith(`${SKILL_PREFIX[skill]}-`));

export interface Count {
  done: number;
  total: number;
  percent: number;
}
const count = (done: number, total: number): Count => ({ done, total, percent: pct(done, total) });

/** One scored piece of work. `band` only when the source gives one (a full section, or Mino's feedback). */
export interface ScoredResult {
  at: string;
  source: 'test' | 'library';
  title: string;
  correct?: number;
  total?: number;
  accuracy?: number;
  band?: number;
}

export interface SkillProgressView {
  skill: IELTSSkill;
  lessons: Count;
  /** Practice-test sections submitted. */
  sections: number;
  /** Reading Library passages with checked answers (Reading only). */
  passages?: Count;
  /** Days with this skill's practice done (Reading, Writing, Speaking practice pages). */
  practiceDays: number;
  latest?: ScoredResult;
  /** Mean over scored work; `n` is how many results it is based on. */
  average?: { n: number; accuracy?: number; band?: number };
  /** Weak areas, only where there is enough evidence (medium or high confidence). */
  weak: string[];
}

export interface HistoryItem {
  /** Local date key. */
  date: string;
  /** For ordering within a day; empty when only the day is known. */
  at: string;
  kind: 'lesson' | 'test' | 'passage' | 'grammar' | 'practice' | 'vocabulary';
  skill?: IELTSSkill;
  /** Lesson id, test id or passage id. */
  ref?: string;
  title?: string;
  /** "7/13" or a band, when the work was scored. */
  score?: string;
  /** Grammar reviews + quizzes that day. */
  n?: number;
}

export interface MockTestProgress {
  /** Practice tests with every section submitted. */
  fullTests: number;
  /** Tests started (at least one section submitted). */
  testsTried: number;
  sections: number;
  latest?: ScoredResult & { skill: IELTSSkill };
  /** Best result per skill that has one (band where known, else accuracy). */
  best: { skill: IELTSSkill; result: ScoredResult }[];
  /** Accuracy of the latest objective sections, oldest first (at most 5). */
  trend: { skill: IELTSSkill; accuracy: number }[];
  direction?: 'up' | 'down' | 'same';
}

export interface PracticeProgress {
  /** The curriculum's Practice stage (rule: 5 sessions of each kind). */
  stage: Count;
  grammar: number;
  vocabularyDays: number;
  reading: number;
  listening: number;
  writing: number;
  speaking: number;
}

export interface IELTSProgress {
  /** The IELTS path (seven stages, each with explicit completion rules). */
  overall: number;
  foundation: Count & { topics: Count };
  skills: SkillProgressView[];
  practice: PracticeProgress;
  mock: MockTestProgress;
  history: HistoryItem[];
  /** Anything done at all (else the page explains how progress starts). */
  started: boolean;
}

export interface ProgressLookups {
  test: (id: string) => PracticeTest | undefined;
  passage: (id: string) => { title: string } | undefined;
  /** Sections a practice test has. */
  testSkills: (test: PracticeTest) => IELTSSkill[];
  /** Passages in the Reading Library. */
  librarySize: number;
}

const submitted = (sessions: TestSession[]) =>
  sessions.filter((s) => s.status === 'submitted' && s.submittedAt).sort((a, b) => a.submittedAt!.localeCompare(b.submittedAt!));

function sessionResult(s: TestSession, title: string): ScoredResult | undefined {
  if (s.result) {
    return {
      at: s.submittedAt!,
      source: 'test',
      title,
      correct: s.result.correct,
      total: s.result.total,
      accuracy: pct(s.result.correct, s.result.total),
      ...(s.result.estimatedBand !== undefined ? { band: s.result.estimatedBand } : {}),
    };
  }
  if (s.feedback?.overall != null) return { at: s.submittedAt!, source: 'test', title, band: s.feedback.overall };
  return undefined;
}

export function ieltsProgress(profile: UserProfile, sessions: TestSession[], lookups: ProgressLookups): IELTSProgress {
  const fp = profile.foundation;
  const lessonDone = (id: string) => Boolean(fp?.lessons[id]);
  const done = submitted(sessions);
  const testTitle = (id: string) => lookups.test(id)?.title ?? id;

  // ---------------------------------------------------------------- Foundation
  const foundationStage = getStage('english-foundation');
  const fLessons = stageLessons(foundationStage);
  const topics = foundationStage.steps.filter((s) => !s.parallel && s.lessons?.length);
  const foundation = {
    ...count(fLessons.filter(lessonDone).length, fLessons.length),
    topics: count(topics.filter((s) => s.lessons!.every(lessonDone)).length, topics.length),
  };

  // ---------------------------------------------------------------- skills
  const library = profile.study.readingLibrary ?? {};
  const checkedPassages = Object.entries(library).filter(([, p]) => p.checked && p.score);
  const analysis = analyseTests(done, lookups.test);
  const skills: SkillProgressView[] = IELTS_SKILLS.map((skill) => {
    const lessons = skillLessonIds(skill);
    const mine = done.filter((s) => s.skill === skill);
    const scored: ScoredResult[] = mine.map((s) => sessionResult(s, testTitle(s.testId))).filter((r): r is ScoredResult => Boolean(r));
    if (skill === 'reading') {
      for (const [id, p] of checkedPassages) {
        scored.push({ at: p.updatedAt, source: 'library', title: lookups.passage(id)?.title ?? id, correct: p.score!.correct, total: p.score!.total, accuracy: pct(p.score!.correct, p.score!.total) });
      }
    }
    scored.sort((a, b) => a.at.localeCompare(b.at));
    const acc = scored.filter((r) => r.accuracy !== undefined);
    const bands = scored.filter((r) => r.band !== undefined);
    const average =
      scored.length > 0
        ? {
            n: scored.length,
            ...(acc.length ? { accuracy: Math.round(acc.reduce((s, r) => s + r.accuracy!, 0) / acc.length) } : {}),
            ...(bands.length ? { band: round1(bands.reduce((s, r) => s + r.band!, 0) / bands.length) } : {}),
          }
        : undefined;
    const weak = analysis.weakAreas.filter((w) => w.skill === skill && w.confidence !== 'low').map((w) => w.label);
    // Writing/Speaking: the lowest criterion across Mino's feedback, once there are two attempts.
    const productive = analysis.productive.filter((p) => p.skill === skill);
    if (productive.length >= 2) {
      const byCriterion = new Map<string, number[]>();
      productive.forEach((p) => p.criteria.forEach((c) => byCriterion.set(c.criterion, [...(byCriterion.get(c.criterion) ?? []), c.band])));
      const means = [...byCriterion].map(([c, b]) => [c, b.reduce((s, x) => s + x, 0) / b.length] as const).sort((a, b) => a[1] - b[1]);
      if (means.length > 1 && means[0][1] < means[means.length - 1][1]) weak.push(means[0][0]);
    }
    return {
      skill,
      lessons: count(lessons.filter(lessonDone).length, lessons.length),
      sections: mine.length,
      ...(skill === 'reading' ? { passages: count(checkedPassages.length, Math.max(checkedPassages.length, lookups.librarySize)) } : {}),
      practiceDays: skill === 'listening' ? 0 : (profile.study.completedTasks[skill] ?? 0),
      latest: scored.at(-1),
      average,
      weak: weak.slice(0, 3),
    };
  });

  // ---------------------------------------------------------------- practice
  const journey = ieltsJourney(profile);
  const practiceStage = journey.stages.find((s) => s.id === 'practice');
  const grammar = Object.values(fp?.days ?? {}).reduce((s, d) => s + (d.reviews ?? 0) + (d.quizzes ?? 0), 0);
  const skill = (id: IELTSSkill) => skills.find((s) => s.skill === id)!;
  const practice: PracticeProgress = {
    stage: count(Math.round((practiceStage?.progress ?? 0) * 100), 100),
    grammar,
    vocabularyDays: profile.study.completedTasks.vocabulary ?? 0,
    reading: skill('reading').sections + checkedPassages.length,
    listening: skill('listening').sections,
    writing: skill('writing').sections + skill('writing').practiceDays,
    speaking: skill('speaking').sections + skill('speaking').practiceDays,
  };

  // ---------------------------------------------------------------- mock tests
  const byTest = new Map<string, Set<IELTSSkill>>();
  done.forEach((s) => byTest.set(s.testId, (byTest.get(s.testId) ?? new Set()).add(s.skill as IELTSSkill)));
  const fullTests = [...byTest].filter(([id, got]) => {
    const test = lookups.test(id);
    return test ? lookups.testSkills(test).every((sk) => got.has(sk)) : false;
  }).length;
  const results = done
    .map((s) => ({ s, r: sessionResult(s, testTitle(s.testId)) }))
    .filter((x): x is { s: TestSession; r: ScoredResult } => Boolean(x.r));
  const last = results.at(-1);
  const best = IELTS_SKILLS.flatMap((skill) => {
    const rs = results.filter((x) => x.s.skill === skill).map((x) => x.r);
    if (!rs.length) return [];
    const withBand = rs.filter((r) => r.band !== undefined);
    const top = withBand.length
      ? withBand.reduce((a, b) => (b.band! > a.band! ? b : a))
      : rs.reduce((a, b) => ((b.accuracy ?? 0) > (a.accuracy ?? 0) ? b : a));
    return [{ skill, result: top }];
  });
  const objective = results.filter((x) => x.r.accuracy !== undefined).slice(-5);
  const trend = objective.map((x) => ({ skill: x.s.skill as IELTSSkill, accuracy: x.r.accuracy! }));
  let direction: MockTestProgress['direction'];
  if (trend.length >= 2) {
    const a = trend.at(-2)!.accuracy;
    const b = trend.at(-1)!.accuracy;
    direction = b > a ? 'up' : b < a ? 'down' : 'same';
  }
  const mock: MockTestProgress = {
    fullTests,
    testsTried: byTest.size,
    sections: done.length,
    ...(last ? { latest: { ...last.r, skill: last.s.skill as IELTSSkill } } : {}),
    best,
    trend,
    ...(direction ? { direction } : {}),
  };

  // ---------------------------------------------------------------- history
  const history: HistoryItem[] = [];
  for (const [id, rec] of Object.entries(fp?.lessons ?? {})) {
    if (rec.completedAt) history.push({ date: localDateKey(new Date(rec.completedAt)), at: rec.completedAt, kind: 'lesson', ref: id, score: rec.score !== undefined ? `${rec.score}%` : undefined });
  }
  for (const s of done) {
    const r = sessionResult(s, testTitle(s.testId));
    history.push({
      date: localDateKey(new Date(s.submittedAt!)),
      at: s.submittedAt!,
      kind: 'test',
      skill: s.skill as IELTSSkill,
      ref: s.testId,
      title: testTitle(s.testId),
      score: r?.correct !== undefined ? `${r.correct}/${r.total}` : r?.band !== undefined ? r.band.toFixed(1) : undefined,
    });
  }
  const libraryDays = new Set<string>();
  for (const [id, p] of checkedPassages) {
    const date = localDateKey(new Date(p.updatedAt));
    libraryDays.add(date);
    history.push({ date, at: p.updatedAt, kind: 'passage', skill: 'reading', ref: id, title: lookups.passage(id)?.title ?? id, score: `${p.score!.correct}/${p.score!.total}` });
  }
  for (const [date, d] of Object.entries(fp?.days ?? {})) {
    const n = (d.reviews ?? 0) + (d.quizzes ?? 0);
    if (n > 0) history.push({ date, at: '', kind: 'grammar', n });
  }
  for (const [date, log] of Object.entries(profile.study.days)) {
    for (const kind of log.done) {
      if (kind === 'vocabulary') history.push({ date, at: '', kind: 'vocabulary' });
      else if (kind === 'reading' && libraryDays.has(date)) continue;
      else history.push({ date, at: '', kind: 'practice', skill: kind });
    }
  }
  history.sort((a, b) => b.date.localeCompare(a.date) || b.at.localeCompare(a.at));

  const started =
    foundation.done > 0 || done.length > 0 || checkedPassages.length > 0 || grammar > 0 || Object.keys(profile.study.days).length > 0 || skills.some((s) => s.lessons.done > 0);

  return { overall: journey.percent, foundation, skills, practice, mock, history, started };
}
