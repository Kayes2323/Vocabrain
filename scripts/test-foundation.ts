import assert from 'node:assert/strict';
import {
  CONCEPTS, DIAGNOSTIC_ITEMS, MODULES, adaptiveStart, completeLesson, dailyGoal, diagnosticAreas, findLesson, foundationDailyPlan,
  foundationJourney, foundationSummaryLines, gradeExercise, lessonOutcome, lessonState, levelProgress, moduleProgress, nextAction,
  nextLesson, quizQuestions, recordAnswer, recordReview, reviewDue, reviewQuestions, saveInProgress, scoreDiagnostic, shuffledWords,
  skillProgress, topicSummary, validateFoundation, MAX_MISTAKES, type Exercise,
} from '../lib/foundation';
import type { FoundationProgress, UserProfile } from '../lib/models';
import { emptyProfile } from '../lib/models';
import { withProfileDefaults } from '../lib/services/profile-repository';

let passed = 0;
const test = (name: string, fn: () => void) => {
  try { fn(); passed++; console.log('PASS', name); } catch (e) { console.error('FAIL', name); throw e; }
};
const empty = (): FoundationProgress => ({ lessons: {}, errors: {}, concepts: {}, mistakes: [], days: {} });
const right = Object.fromEntries(DIAGNOSTIC_ITEMS.map((i) => [i.id, i.type === 'choice' || i.type === 'order' ? i.answer : i.accepted[0]]));
const ex = (id: string): Exercise => {
  for (const m of MODULES) for (const l of m.lessons) for (const s of l.steps) if (s.kind === 'practice') { const e = s.exercises.find((x) => x.id === id); if (e) return e; }
  throw new Error(id);
};
const tenses = MODULES.find((m) => m.id === 'tenses')!;
const NOW = new Date('2026-09-26T10:00:00');

test('all Foundation content validates (incl. 12 Tenses lessons)', () => {
  assert.deepEqual(validateFoundation(), []);
  assert.equal(tenses.lessons.length, 12);
  assert.equal(tenses.lessons.at(-1)!.kind, 'test');
  assert.equal(CONCEPTS.length, 7);
});

test('grading: tolerant of case, spaces, final full stop, curly quotes', () => {
  assert.equal(gradeExercise(ex('t-2-e2'), 'my brother works in a bank'), true);
  assert.equal(gradeExercise(ex('t-2-e5'), 'He doesn’t like crowded places.'), true);
  assert.equal(gradeExercise(ex('t-2-e1'), 'go'), false);
  assert.equal(gradeExercise(ex('t-2-e6'), 'anything'), null);
});

test('word shuffle is stable and never the answer order', () => {
  const s = 'Technology has changed our lives.';
  assert.deepEqual(shuffledWords('a', s), shuffledWords('a', s));
  for (const id of ['a', 'b', 'c', 'd', 'e']) assert.notEqual(shuffledWords(id, s).join(' '), s);
});

test('diagnostic: all wrong → needs, start at the very first lesson, nothing skipped', () => {
  const w = scoreDiagnostic({});
  assert.equal(w.level, 'needs');
  assert.equal(w.startLessonId, 'sb-1');
  assert.deepEqual(w.skippedLessons, []);
});

test('diagnostic: all right → strong, basics and proven tenses skipped, start at an unproven tense', () => {
  const r = scoreDiagnostic(right);
  assert.equal(r.level, 'strong');
  assert.ok(r.skippedLessons!.includes('sb-1') && r.skippedLessons!.includes('sb-9'));
  for (const id of ['t-1', 't-2', 't-4', 't-6']) assert.ok(r.skippedLessons!.includes(id), id);
  assert.equal(r.startLessonId, 't-3');
  assert.deepEqual(diagnosticAreas(r).weak, []);
});

test('diagnostic: developing student with tense errors starts at Tenses, weak areas reported', () => {
  const answers = { ...right, 'd-g1': 'hires', 'd-g6': 'live', 'd-g2': 'an', 'd-l1': 'Colins', 'd-r3': 'TRUE', 'd-v3': 'do' };
  const r = scoreDiagnostic(answers);
  assert.equal(r.level, 'developing', `percent ${r.percent}`);
  assert.equal(r.focusModules[0], 'tenses');
  assert.deepEqual(r.concepts, { 'past-simple': false, 'present-simple': true, 'present-perfect': false });
  assert.equal(r.startLessonId, 't-1', 'sentence basics skipped (sentence 100%), tenses start at lesson 1');
  assert.ok(!r.skippedLessons!.includes('t-4') && !r.skippedLessons!.includes('t-6'), 'missed tenses are not skipped');
  const { strong, weak } = diagnosticAreas(r);
  assert.ok(strong.includes('sentence'));
  assert.ok(!weak.includes('sentence'));
});

test('adaptive start never skips for weak students', () => {
  assert.deepEqual(adaptiveStart({ level: 'needs', areas: { grammar: 100, vocabulary: 0, sentence: 100, reading: 0, listening: 0 }, concepts: { 'past-simple': true } }).skippedLessons, []);
});

test('locking: lessons open in order; skipped and done stay open', () => {
  let fp = empty();
  const [t1, t2, t3] = tenses.lessons;
  assert.equal(lessonState(tenses, t1, fp), 'available');
  assert.equal(lessonState(tenses, t2, fp), 'locked');
  fp = completeLesson(fp, 't-1', 100, NOW);
  assert.equal(lessonState(tenses, t2, fp), 'available');
  fp = { ...fp, diagnostic: { ...scoreDiagnostic({}), skippedLessons: ['t-2'] } };
  assert.equal(lessonState(tenses, t2, fp), 'skipped');
  assert.equal(lessonState(tenses, t3, fp), 'available');
});

test('answers: counters, concept stats and full mistake records', () => {
  let fp = empty();
  fp = recordAnswer(fp, { source: 't-2', exercise: ex('t-2-e1'), answer: 'go', correct: false, attempt: 1, now: NOW });
  fp = recordAnswer(fp, { source: 't-2', exercise: ex('t-2-e3'), answer: 'shows', correct: true, attempt: 1, now: NOW });
  fp = recordAnswer(fp, { source: 't-2', exercise: ex('t-2-e6'), answer: 'I play', correct: null, attempt: 1, now: NOW });
  const day = fp.days['2026-09-26'];
  assert.deepEqual([day.questions, day.correct], [3, 1]);
  assert.deepEqual([fp.concepts['present-simple'].attempts, fp.concepts['present-simple'].correct], [2, 1], 'writing is not graded');
  const m = fp.mistakes[0];
  assert.equal(fp.mistakes.length, 1);
  assert.deepEqual([m.source, m.questionId, m.questionType, m.answer, m.correctAnswer, m.tag, m.concept, m.attempt], ['t-2', 't-2-e1', 'choice', 'go', 'goes', 'agreement', 'present-simple', 1]);
  assert.equal(fp.errors.agreement.count, 1);
});

test('mistake log is capped', () => {
  let fp = empty();
  for (let i = 0; i < MAX_MISTAKES + 10; i++) fp = recordAnswer(fp, { source: 't-2', exercise: ex('t-2-e1'), answer: 'go', correct: false, attempt: 1, now: NOW });
  assert.equal(fp.mistakes.length, MAX_MISTAKES);
});

test('repeated mistakes → review due → passed review clears it', () => {
  let fp = empty();
  for (const id of ['t-6-e1', 't-6-e2', 't-6-e4']) fp = recordAnswer(fp, { source: 't-6', exercise: ex(id), answer: 'x', correct: false, attempt: 1, now: NOW });
  fp = recordAnswer(fp, { source: 't-4', exercise: ex('t-4-e1'), answer: 'x', correct: false, attempt: 1, now: NOW });
  assert.deepEqual(reviewDue(fp, NOW), [{ concept: 'present-perfect', count: 3 }]);
  assert.equal(nextAction(fp, NOW).kind, 'review');
  const qs = reviewQuestions(fp, 'present-perfect', NOW);
  assert.equal(qs.length, 5);
  assert.ok(qs.every((q) => q.concept === 'present-perfect' && q.type !== 'write'));
  assert.ok(qs.filter((q) => ['t-6-e1', 't-6-e2', 't-6-e4'].includes(q.id)).length >= 2, 'retests missed questions');
  assert.equal(topicSummary(fp, NOW).find((x) => x.concept === 'present-perfect')!.status, 'review');
  const failed = recordReview(fp, 'present-perfect', 60, new Date('2026-09-26T11:00:00'));
  assert.equal(reviewDue(failed, new Date('2026-09-26T11:00:01')).length, 1, 'a failed review keeps it due');
  const passedReview = recordReview(fp, 'present-perfect', 100, new Date('2026-09-26T11:00:00'));
  assert.deepEqual(reviewDue(passedReview, new Date('2026-09-26T11:00:01')), []);
  assert.equal(passedReview.days['2026-09-26'].reviews, 1);
  // Old mistakes fall out of the window
  assert.deepEqual(reviewDue(fp, new Date('2026-10-15T10:00:00')), []);
});

test('resume: in-progress lesson is the next action and survives a reload shape', () => {
  let fp = empty();
  fp = saveInProgress(fp, 't-1', 3, { 't-1-e1': { answer: 'had', correct: true } }, 1, NOW);
  assert.deepEqual(nextAction(fp, NOW), { kind: 'resume', lessonId: 't-1' });
  const reloaded = withProfileDefaults('u', JSON.parse(JSON.stringify({ ...emptyProfile('u'), foundation: fp })) as Partial<UserProfile>).foundation;
  assert.equal(reloaded.inProgress?.page, 3);
  fp = completeLesson(fp, 't-1', 100, NOW);
  assert.equal(fp.inProgress, undefined);
  assert.equal(fp.days['2026-09-26'].lessons, 1);
});

test('old profiles (before v2) load with defaults', () => {
  const old = withProfileDefaults('u', { foundation: { lessons: { 'sb-1': { completedAt: 'x', score: 80, best: 80, attempts: 1 } }, errors: {} } } as never);
  assert.deepEqual([old.foundation.mistakes, old.foundation.concepts, old.foundation.days], [[], {}, {}]);
  assert.equal(nextLesson(old.foundation)?.lesson.id, 'sb-2');
});

test('progress numbers come from real data', () => {
  let fp = empty();
  assert.equal(moduleProgress(tenses, fp), 0);
  fp = completeLesson(fp, 't-1', 100, NOW);
  fp = completeLesson(fp, 't-2', 75, NOW);
  assert.equal(moduleProgress(tenses, fp), Math.round((2 / 12) * 100));
  assert.ok(levelProgress(1, fp) > 0);
  assert.equal(skillProgress(fp).find((s) => s.skill === 'grammar')!.done, 2);
  assert.equal(lessonOutcome(75), 'good');
});

test('journey: check → grammar current, later stages locked', () => {
  const fp = { ...empty(), diagnostic: scoreDiagnostic({}) };
  const j = foundationJourney(fp);
  assert.equal(j[0].state, 'done');
  assert.equal(j[1].state, 'current');
  assert.ok(j.slice(2).every((s) => s.state === 'locked'));
  assert.equal(foundationJourney(empty())[0].state, 'current');
});

test('daily goal and plan: achievable, from real data', () => {
  const profile = emptyProfile('u');
  profile.ielts.weeklyStudyHours = 3;
  profile.foundation = completeLesson(completeLesson(empty(), 't-1', 100, NOW), 't-2', 100, NOW);
  const goal = dailyGoal(profile, NOW);
  assert.deepEqual(goal, { lessons: 1, questions: 10, doneLessons: 2, doneQuestions: 0 });
  const plan = foundationDailyPlan(profile, { total: 10, due: 4 }, NOW);
  const minutes = plan.reduce((s, p) => s + p.minutes, 0);
  assert.ok(minutes <= 30, `plan ${minutes} min`);
  assert.equal(plan[0].kind, 'lesson');
  assert.ok(plan.some((p) => p.kind === 'quiz'), 'quiz once lessons are done');
  assert.equal(quizQuestions(profile.foundation, tenses, NOW).every((q) => ['t-1', 't-2'].includes(findLesson(q.id.split('-e')[0])!.lesson.id)), true);
});

test('Mino summary: only stored numbers', () => {
  let fp: FoundationProgress = { ...empty(), diagnostic: scoreDiagnostic({}) };
  for (let i = 0; i < 3; i++) fp = recordAnswer(fp, { source: 't-6', exercise: ex('t-6-e1'), answer: 'lived', correct: false, attempt: 1, now: NOW });
  const text = foundationSummaryLines(fp, NOW).join('\n');
  assert.match(text, /present-perfect 0% of 3/);
  assert.match(text, /Review due: present-perfect \(3 mistakes/);
  assert.match(text, /answered "lived", correct "have lived"/);
  assert.match(foundationSummaryLines(empty(), NOW)[0], /not started/);
});

console.log(`\n${passed} passed`);
