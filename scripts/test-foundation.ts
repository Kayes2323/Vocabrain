import assert from 'node:assert/strict';
import {
  DIAGNOSTIC_ITEMS, MODULES, gradeExercise, levelProgress, lessonOutcome, moduleProgress, nextLesson, recommendedModule,
  recordLesson, scoreDiagnostic, shuffledWords, skillProgress, testedOutOfFoundation, topErrors, validateFoundation,
  type Exercise,
} from '../lib/foundation';
import type { FoundationProgress } from '../lib/models';

let passed = 0;
const test = (name: string, fn: () => void) => {
  try { fn(); passed++; console.log('PASS', name); } catch (e) { console.error('FAIL', name); throw e; }
};
const empty = (): FoundationProgress => ({ lessons: {}, errors: {} });
const right = Object.fromEntries(DIAGNOSTIC_ITEMS.map((i) => [i.id, i.type === 'choice' || i.type === 'order' ? i.answer : i.accepted[0]]));

test('all Foundation content validates', () => assert.deepEqual(validateFoundation(), []));

test('grading: case, spaces, final punctuation and curly quotes', () => {
  const gap: Exercise = { id: 'x', type: 'gap', prompt: { en: 'a', bn: 'a' }, sentence: '___', accepted: ['It'], explanation: { en: '', bn: '' }, tag: 'subject' };
  assert.equal(gradeExercise(gap, ' it '), true);
  assert.equal(gradeExercise(gap, 'There'), false);
  assert.equal(gradeExercise(gap, ''), false);
  const corr: Exercise = { id: 'y', type: 'correct', prompt: { en: 'a', bn: 'a' }, accepted: ['It is important to learn English.'], explanation: { en: '', bn: '' }, tag: 'subject' };
  assert.equal(gradeExercise(corr, 'it is important to learn english'), true);
  assert.equal(gradeExercise(corr, 'It is important to learn English .'), true);
  const ord: Exercise = { id: 'z', type: 'order', prompt: { en: 'a', bn: 'a' }, answer: 'Many people visit Cox’s Bazar in winter.', explanation: { en: '', bn: '' }, tag: 'sentence-structure' };
  assert.equal(gradeExercise(ord, "Many people visit Cox's Bazar in winter."), true);
  const write: Exercise = { id: 'w', type: 'write', prompt: { en: 'a', bn: 'a' }, model: 'x', checklist: [{ en: 'a', bn: 'a' }], explanation: { en: '', bn: '' }, tag: 'verb' };
  assert.equal(gradeExercise(write, 'anything'), null);
});

test('word shuffle is stable and never the answer order', () => {
  const s = 'Technology has changed our lives.';
  assert.deepEqual(shuffledWords('a', s), shuffledWords('a', s));
  for (const id of ['a', 'b', 'c', 'd', 'e']) assert.notEqual(shuffledWords(id, s).join(' '), s);
  assert.deepEqual([...shuffledWords('a', s)].sort(), s.split(' ').sort());
});

test('diagnostic: all right → strong, no focus; all wrong → needs, starts at Sentence Basics', () => {
  const r = scoreDiagnostic(right);
  assert.equal(r.level, 'strong');
  assert.equal(r.percent, 100);
  assert.deepEqual(r.focusModules, []);
  const w = scoreDiagnostic({});
  assert.equal(w.level, 'needs');
  assert.equal(w.percent, 0);
  assert.equal(recommendedModule({ ...empty(), diagnostic: w })?.id, 'sentence-basics');
});

test('diagnostic: developing student gets focus modules from their mistakes', () => {
  const answers = { ...right, 'd-g1': 'hires', 'd-g6': 'live', 'd-g2': 'an', 'd-l1': 'Colins', 'd-r3': 'TRUE', 'd-v3': 'do', 'd-s4': 'a subject' };
  const r = scoreDiagnostic(answers);
  assert.equal(r.level, 'developing', `percent ${r.percent}`);
  assert.equal(r.focusModules[0], 'tenses', 'two tense errors come first');
  assert.ok(r.focusModules.includes('articles'));
  assert.equal(r.areas.grammar, 50);
  // Tenses has no lessons yet → first focus module that exists (Sentence Basics via "verb")
  assert.equal(recommendedModule({ ...empty(), diagnostic: r })?.id, 'sentence-basics');
});

test('progress: lessons, modules, levels, skills', () => {
  let fp = empty();
  assert.equal(nextLesson(fp)?.lesson.id, 'sb-1');
  fp = recordLesson(fp, 'sb-1', 100, []);
  fp = recordLesson(fp, 'sb-2', 40, ['subject', 'subject', 'agreement']);
  const sb = MODULES[0];
  assert.equal(moduleProgress(sb, fp), Math.round((2 / 9) * 100));
  assert.equal(nextLesson(fp)?.lesson.id, 'sb-3');
  assert.ok(levelProgress(1, fp) > 0 && levelProgress(1, fp) < 10, 'level 1 counts planned lessons too');
  const grammar = skillProgress(fp).find((s) => s.skill === 'grammar')!;
  assert.equal(grammar.done, 2);
  assert.equal(skillProgress(fp).find((s) => s.skill === 'listening')!.percent, null, 'no listening lessons yet');
  assert.deepEqual(topErrors(fp)[0], { tag: 'subject', count: 2 });
  fp = recordLesson(fp, 'sb-2', 90, []);
  assert.equal(fp.lessons['sb-2'].attempts, 2);
  assert.equal(fp.lessons['sb-2'].best, 90);
});

test('strong students test out of Level 1 but can still review', () => {
  const fp = { ...empty(), diagnostic: scoreDiagnostic(right) };
  assert.equal(testedOutOfFoundation(fp), true);
  assert.equal(nextLesson(fp), undefined, 'no Level 2 lessons written yet');
});

test('friendly outcomes', () => {
  assert.equal(lessonOutcome(85), 'strong');
  assert.equal(lessonOutcome(70), 'good');
  assert.equal(lessonOutcome(40), 'practice');
});

console.log(`\n${passed} passed`);
