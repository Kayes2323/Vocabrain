/** Local Writing Studio feedback checks: deriveScope() and checkEssay(), especially the
 * new 'introduction-only' scope added for Lesson 01's paraphrase-only final task.
 * Run: npx tsx scripts/test-writing-studio-feedback.ts */
import assert from 'node:assert/strict';
import { checkEssay, deriveScope } from '../lib/writing-studio/feedback';

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

console.log(`\n${passed} passed`);
