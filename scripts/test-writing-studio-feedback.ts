/** Local Writing Studio feedback checks: deriveScope() and checkEssay(), especially the
 * new 'introduction-only' scope added for Lesson 01's paraphrase-only final task.
 * Run: npx tsx scripts/test-writing-studio-feedback.ts */
import assert from 'node:assert/strict';
import { checkEssay, deriveScope } from '../lib/writing-studio/feedback';
import { task1UnderstandingLesson } from '../lib/writing-studio/lessons/task1-understanding';
import { recordLesson } from '../lib/writing-studio/progress';
import type { WritingStudioProgress } from '../lib/models';

let passed = 0;
const test = (name: string, fn: () => void) => {
  try {
    fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (e) {
    console.log(`FAIL ${name}\n  ${(e as Error).message}`);
    process.exitCode = 1;
  }
};

test('deriveScope: task1 short final task still infers overview-only (unchanged heuristic)', () => {
  assert.equal(deriveScope({ task: 'task1', finalPrompt: { minWords: 40 } }), 'overview-only');
});
test('deriveScope: task1 long final task still infers full (unchanged heuristic)', () => {
  assert.equal(deriveScope({ task: 'task1', finalPrompt: { minWords: 150 } }), 'full');
});
test('deriveScope: task2 short final task still infers paragraph-only (unchanged heuristic)', () => {
  assert.equal(deriveScope({ task: 'task2', finalPrompt: { minWords: 90 } }), 'paragraph-only');
});
test('deriveScope: checkScope overrides the word-count guess', () => {
  assert.equal(deriveScope({ task: 'task1', finalPrompt: { minWords: 35, checkScope: 'introduction-only' } }), 'introduction-only');
});

const INTRO_GOOD =
  'The two line graphs illustrate the mean monthly temperature and the amount of rainfall recorded in two cities across a twelve-month period.';
const INTRO_WITH_NUMBER =
  'The two line graphs illustrate the mean monthly temperature of 25 degrees and the amount of rainfall recorded in two cities over a year.';

test('introduction-only: a clean paraphrase with no overview phrase is NOT flagged for missing an overview', () => {
  const r = checkEssay(INTRO_GOOD, 20, 'task1', 'introduction-only');
  assert.ok(!r.mistakes.some((m) => /dedicated overview/.test(m.why)), JSON.stringify(r.mistakes));
});
test('introduction-only: a clean paraphrase with no figures is NOT flagged for missing data', () => {
  const r = checkEssay(INTRO_GOOD, 20, 'task1', 'introduction-only');
  assert.ok(!r.mistakes.some((m) => /should support the overview with specific data/.test(m.why)), JSON.stringify(r.mistakes));
});
test('introduction-only: a figure in the introduction IS flagged (figures belong in the body)', () => {
  const r = checkEssay(INTRO_WITH_NUMBER, 20, 'task1', 'introduction-only');
  assert.ok(r.mistakes.some((m) => /figures belong in the body paragraphs/.test(m.why)), JSON.stringify(r.mistakes));
});

test('overview-only (unchanged): still requires an overview phrase', () => {
  const r = checkEssay('The chart shows travel methods in a city.', 10, 'task1', 'overview-only');
  assert.ok(r.mistakes.some((m) => /dedicated overview/.test(m.why)));
});
test('full (unchanged): still wants at least one figure in the body', () => {
  const r = checkEssay('Overall, car use fell while cycling rose.', 10, 'task1', 'full');
  assert.ok(r.mistakes.some((m) => /should support the overview with specific data/.test(m.why)));
});

// ---------------------------------------------------------------- Issue 3: introduction-only must not require linkers

test('introduction-only: a clean introduction with no linking words is NOT flagged for missing linkers', () => {
  const r = checkEssay(INTRO_GOOD, 20, 'task1', 'introduction-only');
  assert.ok(!r.mistakes.some((m) => /linking words/.test(m.why)), JSON.stringify(r.mistakes));
});
test('overview-only (unchanged): still requires linking words', () => {
  const r = checkEssay('The chart shows travel methods in a city over two years.', 10, 'task1', 'overview-only');
  assert.ok(r.mistakes.some((m) => /linking words/.test(m.why)));
});
test('task2 paragraph-only (unchanged): still requires (at least two) linking words', () => {
  const r = checkEssay(
    'Some people enjoy city life. For example, cities offer more jobs and services. As a result, many people move there every year.',
    10,
    'task2',
    'paragraph-only',
  );
  assert.ok(!r.mistakes.some((m) => /linking words/.test(m.why)), 'two linkers present, so it should NOT be flagged');
  const withoutLinker = checkEssay('Some people enjoy city life. Cities offer more jobs and services, which is why many people move there every year.', 10, 'task2', 'paragraph-only');
  assert.ok(withoutLinker.mistakes.some((m) => /linking words/.test(m.why)), 'no linker at all should still be flagged for a full task2 paragraph');
});
test('task2 full (unchanged): still requires linking words', () => {
  const r = checkEssay('I believe cities are better places to live. Rural areas lack services.', 10, 'task2', 'full');
  assert.ok(r.mistakes.some((m) => /linking words/.test(m.why)));
});

// ---------------------------------------------------------------- Issue 2: Lesson 01's real minWords accepts a clean short introduction

test("Lesson 01's own minWords (not a hardcoded 35) accepts a clean ~21-word introduction", () => {
  const minWords = task1UnderstandingLesson.finalPrompt.minWords;
  assert.ok(minWords <= 25, `expected a pedagogically appropriate minimum for a 1-2 sentence introduction, got ${minWords}`);
  const r = checkEssay(INTRO_GOOD, minWords, 'task1', 'introduction-only');
  assert.equal(r.meetsLength, true, `a ${r.wordCount}-word clean introduction should meet a ${minWords}-word minimum`);
  assert.ok(!r.mistakes.some((m) => /underdeveloped/.test(m.why)), 'should not be penalised for being short');
});

// ---------------------------------------------------------------- Issue 1: skill-check attempts must never store an IELTS band

test('recordLesson: a skill-check attempt (band=null) does not create a new bestBand', () => {
  const empty: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };
  const after = recordLesson(empty, 'task1-understanding', 1, null);
  assert.equal(after.lessons['task1-understanding'].lastBand, null);
  assert.equal(after.lessons['task1-understanding'].bestBand, null);
  assert.equal(after.lessons['task1-understanding'].attempts, 1, 'attempt is still counted');
  assert.ok(after.lessons['task1-understanding'].completedAt, 'completion is still recorded');
});
test('recordLesson: historical band records remain intact after a later skill-check (null) attempt', () => {
  const empty: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };
  const scored = recordLesson(empty, 'task1-full', 1, 6.5);
  assert.equal(scored.lessons['task1-full'].bestBand, 6.5);
  const thenSkillCheck = recordLesson(scored, 'task1-full', 1, null);
  assert.equal(thenSkillCheck.lessons['task1-full'].bestBand, 6.5, 'the earlier real band must not be erased or lowered');
  assert.equal(thenSkillCheck.lessons['task1-full'].lastBand, null, 'the most recent attempt honestly had no band');
  assert.equal(thenSkillCheck.lessons['task1-full'].attempts, 2);
});
test('recordLesson: a real band after a skill-check still raises bestBand normally (unaffected path)', () => {
  const empty: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };
  const skillCheck = recordLesson(empty, 'task1-full', 1, null);
  assert.equal(skillCheck.lessons['task1-full'].bestBand, null);
  const scored = recordLesson(skillCheck, 'task1-full', 1, 7);
  assert.equal(scored.lessons['task1-full'].bestBand, 7);
  assert.equal(scored.lessons['task1-full'].lastBand, 7);
});

// ---------------------------------------------------------------- Round C: a short but
// accurate introduction-only answer must not be treated as a wrong/failing word count

const INTRO_SHORT_CLEAN = 'The two line graphs show the mean monthly temperature and rainfall levels in two cities over a year.';

test('introduction-only: a clean 17-19 word introduction gets NO word-count mistake (guideline, not a hard minimum)', () => {
  const words = INTRO_SHORT_CLEAN.trim().split(/\s+/).length;
  assert.ok(words >= 17 && words <= 19, `fixture is ${words} words, expected 17-19`);
  const r = checkEssay(INTRO_SHORT_CLEAN, 20, 'task1', 'introduction-only');
  assert.equal(r.meetsLength, false, 'genuinely under the suggested length');
  assert.ok(!r.mistakes.some((m) => m.category === 'Task response' && /underdeveloped/.test(m.why)), JSON.stringify(r.mistakes));
  assert.ok(r.suggestions.some((s) => /Suggested length/.test(s)), 'a neutral suggestion is fine, a "mistake" implying it is wrong is not');
});
test('introduction-only: a 20+ word introduction still passes cleanly (no mistake, no suggestion needed)', () => {
  const r = checkEssay(INTRO_GOOD, 20, 'task1', 'introduction-only');
  assert.equal(r.meetsLength, true);
  assert.ok(!r.mistakes.some((m) => m.category === 'Task response' && /underdeveloped/.test(m.why)));
  assert.ok(!r.suggestions.some((s) => /Suggested length/.test(s)), 'already meets the suggested length, so no nudge is needed');
});

test('overview-only (unchanged): a genuinely under-length answer is still flagged as a Task response mistake', () => {
  const r = checkEssay('Short.', 10, 'task1', 'overview-only');
  assert.ok(r.mistakes.some((m) => m.category === 'Task response' && /underdeveloped/.test(m.why)));
});
test('full task1 (unchanged): a genuinely under-length answer is still flagged as a Task response mistake', () => {
  const r = checkEssay('Short.', 10, 'task1', 'full');
  assert.ok(r.mistakes.some((m) => m.category === 'Task response' && /underdeveloped/.test(m.why)));
});
test('task2 paragraph-only (unchanged): a genuinely under-length answer is still flagged as a Task response mistake', () => {
  const r = checkEssay('Short.', 10, 'task2', 'paragraph-only');
  assert.ok(r.mistakes.some((m) => m.category === 'Task response' && /underdeveloped/.test(m.why)));
});
test('task2 full (unchanged): a genuinely under-length answer is still flagged as a Task response mistake', () => {
  const r = checkEssay('Short.', 10, 'task2', 'full');
  assert.ok(r.mistakes.some((m) => m.category === 'Task response' && /underdeveloped/.test(m.why)));
});

console.log(`\n${passed} passed`);
