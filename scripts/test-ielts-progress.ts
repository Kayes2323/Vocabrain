// Unit tests: IELTS Progress — every number comes from stored activity.
import assert from 'node:assert/strict';
import { ieltsProgress, skillLessonIds, type ProgressLookups } from '../lib/engine/ielts-progress';
import { getStage, stageLessons } from '../lib/foundation/curriculum';
import { BOOKS, getTest, testSkills } from '../lib/ielts/content';
import type { TestSession } from '../lib/ielts';
import { LIBRARY, getLibraryPassage } from '../lib/content/reading-library';
import { emptyProfile, type UserProfile } from '../lib/models';

let passed = 0;
const test = (name: string, fn: () => void) => {
  try {
    fn();
    passed++;
    console.log('PASS', name);
  } catch (e) {
    console.error('FAIL', name);
    throw e;
  }
};

const lookups: ProgressLookups = { test: getTest, passage: getLibraryPassage, testSkills, librarySize: LIBRARY.length };
const TEST = BOOKS[0].tests[0];
const at = (d: string) => new Date(`${d}T10:00:00`).toISOString();
const section = (skill: TestSession['skill'], day: string, extra: Partial<TestSession> = {}): TestSession =>
  ({ id: `${TEST.id}-${skill}-${day}`, testId: TEST.id, bookId: TEST.bookId, skill, status: 'submitted', startedAt: at(day), updatedAt: at(day), submittedAt: at(day), timeLimitSeconds: 3600, elapsedSeconds: 1200, answers: {}, flagged: [], currentNumber: 1, ...extra }) as TestSession;
const objective = (skill: 'listening' | 'reading', day: string, correct: number, total = 40, band?: number) =>
  section(skill, day, { result: { skill, correct, total, ...(band !== undefined ? { estimatedBand: band } : {}), byPart: [], byType: [], questions: [] } });
const lesson = (day: string, score = 80) => ({ completedAt: at(day), score, best: score, attempts: 1 });
const run = (p: UserProfile, s: TestSession[] = []) => ieltsProgress(p, s, lookups);

test('a new student: nothing done, no scores, no percentages made up', () => {
  const p = run(emptyProfile('u'));
  assert.equal(p.started, false);
  assert.equal(p.foundation.done, 0);
  assert.ok(p.foundation.total > 100, `English Foundation lessons: ${p.foundation.total}`);
  assert.equal(p.foundation.percent, 0);
  for (const s of p.skills) {
    assert.equal(s.lessons.done, 0);
    assert.equal(s.latest, undefined);
    assert.equal(s.average, undefined);
    assert.deepEqual(s.weak, []);
  }
  assert.equal(p.mock.sections, 0);
  assert.equal(p.mock.latest, undefined);
  assert.deepEqual(p.mock.best, []);
  assert.deepEqual(p.history, []);
});

test('Foundation: lessons completed / remaining / percent from lesson records', () => {
  const ids = stageLessons(getStage('english-foundation'));
  const base = emptyProfile('u');
  const p = run({ ...base, foundation: { ...base.foundation!, lessons: Object.fromEntries(ids.slice(0, 12).map((id) => [id, lesson('2026-09-20')])) } });
  assert.equal(p.foundation.done, 12);
  assert.equal(p.foundation.total, ids.length);
  assert.equal(p.foundation.percent, Math.round((12 / ids.length) * 100));
  assert.equal(p.foundation.topics.done, 3, 'Sentence Basics (5) + Parts of Speech (1) + Noun (4) complete; Pronoun half-way');
  assert.ok(p.started);
});

test('skills: lessons, sections, latest and average only from real results', () => {
  const base = emptyProfile('u');
  const lessons = Object.fromEntries(skillLessonIds('listening').slice(0, 3).map((id) => [id, lesson('2026-09-21')]));
  const prof: UserProfile = {
    ...base,
    foundation: { ...base.foundation!, lessons },
    study: { ...base.study, readingLibrary: { [LIBRARY[0].id]: { answers: {}, checked: true, score: { correct: 9, total: 13 }, updatedAt: at('2026-09-22') } } },
  };
  const p = run(prof, [objective('listening', '2026-09-23', 24, 40, 6), objective('listening', '2026-09-25', 30, 40, 7)]);
  const L = p.skills.find((s) => s.skill === 'listening')!;
  assert.deepEqual([L.lessons.done, L.lessons.total], [3, 9]);
  assert.equal(L.sections, 2);
  assert.equal(L.latest!.correct, 30);
  assert.deepEqual(L.average, { n: 2, accuracy: 68, band: 6.5 });
  const R = p.skills.find((s) => s.skill === 'reading')!;
  assert.equal(R.passages!.done, 1);
  assert.equal(R.passages!.total, LIBRARY.length);
  assert.equal(R.latest!.source, 'library');
  assert.equal(R.average!.band, undefined, 'a 13-question passage gives no band');
  const W = p.skills.find((s) => s.skill === 'writing')!;
  assert.equal(W.latest, undefined);
});

test('an unfinished section never counts', () => {
  const p = run(emptyProfile('u'), [section('reading', '2026-09-24', { status: 'in-progress', submittedAt: undefined })]);
  assert.equal(p.mock.sections, 0);
  assert.equal(p.skills.find((s) => s.skill === 'reading')!.sections, 0);
});

test('mock tests: full tests, latest, best and trend (no prediction)', () => {
  const sessions = [
    objective('listening', '2026-09-20', 20, 40, 5.5),
    objective('reading', '2026-09-21', 28, 40, 6.5),
    section('writing', '2026-09-22', { feedback: { skill: 'writing', generatedAt: at('2026-09-22'), model: 'x', overall: 6, tasks: [], notes: [] } }),
    section('speaking', '2026-09-23'),
    objective('listening', '2026-09-26', 31, 40, 7),
  ];
  const needed = testSkills(TEST);
  const m = run(emptyProfile('u'), sessions).mock;
  assert.equal(m.sections, 5);
  assert.equal(m.testsTried, 1);
  assert.equal(m.fullTests, needed.every((s) => sessions.some((x) => x.skill === s)) ? 1 : 0);
  assert.equal(m.latest!.skill, 'listening');
  assert.equal(m.latest!.band, 7);
  assert.equal(m.best.find((b) => b.skill === 'listening')!.result.band, 7);
  assert.equal(m.best.find((b) => b.skill === 'writing')!.result.band, 6);
  assert.equal(m.best.some((b) => b.skill === 'speaking'), false, 'speaking without feedback has no result');
  assert.deepEqual(m.trend.map((t) => t.accuracy), [50, 70, 78]);
  assert.equal(m.direction, 'up');
});

test('practice counts and history, newest first, one entry per real activity', () => {
  const base = emptyProfile('u');
  const prof: UserProfile = {
    ...base,
    foundation: { ...base.foundation!, lessons: { 'sb-1': lesson('2026-09-24') }, days: { '2026-09-25': { lessons: 0, questions: 0, correct: 0, reviews: 1, quizzes: 1 } } },
    study: {
      ...base.study,
      completedTasks: { vocabulary: 1, writing: 1, reading: 1 },
      days: { '2026-09-26': { mode: 'normal', done: ['vocabulary', 'writing', 'reading'] } },
      readingLibrary: { [LIBRARY[1].id]: { answers: {}, checked: true, score: { correct: 5, total: 10 }, updatedAt: at('2026-09-26') } },
    },
  };
  const p = run(prof, [objective('listening', '2026-09-27', 25)]);
  assert.equal(p.practice.grammar, 2);
  assert.equal(p.practice.vocabularyDays, 1);
  assert.equal(p.practice.reading, 1, 'the library passage (the day flag is the same work)');
  assert.equal(p.practice.writing, 1);
  assert.equal(p.practice.listening, 1);
  const kinds = p.history.map((h) => `${h.date}:${h.kind}${h.skill ? `:${h.skill}` : ''}`);
  assert.deepEqual(kinds.slice(0, 2), ['2026-09-27:test:listening', '2026-09-26:passage:reading']);
  assert.deepEqual(new Set(kinds.slice(2, 4)), new Set(['2026-09-26:vocabulary', '2026-09-26:practice:writing']));
  assert.deepEqual(kinds.slice(4), ['2026-09-25:grammar', '2026-09-24:lesson']);
  assert.equal(kinds[0], '2026-09-27:test:listening');
  assert.equal(kinds.filter((k) => k.includes('reading')).length, 1, 'reading counted once');
  assert.equal(kinds.at(-1), '2026-09-24:lesson');
  assert.equal(p.history[0].score, '25/40');
});

test('writing weak area from Mino feedback needs two attempts', () => {
  const fb = (a: number, b: number) => ({ skill: 'writing' as const, generatedAt: at('2026-09-22'), model: 'x', overall: 6, notes: [], tasks: [{ taskId: 't2', number: 2, overall: 6, criteria: [{ criterion: 'Task Response', band: a, comment: '' }, { criterion: 'Lexical Resource', band: b, comment: '' }] }] });
  const one = run(emptyProfile('u'), [section('writing', '2026-09-22', { feedback: fb(5, 7) as never })]);
  assert.deepEqual(one.skills.find((s) => s.skill === 'writing')!.weak, []);
  const two = run(emptyProfile('u'), [section('writing', '2026-09-22', { feedback: fb(5, 7) as never }), section('writing', '2026-09-24', { feedback: fb(5.5, 7) as never })]);
  assert.deepEqual(two.skills.find((s) => s.skill === 'writing')!.weak, ['Task Response']);
});

console.log(`\n${passed} passed`);
