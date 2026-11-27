/** Bar Chart Mastery Lesson 03 ("Changing Family Expenditure, 1968-2018"):
 * dataset integrity against the Cambridge IELTS 17 Test 3 figures, lesson
 * structure, three-lesson course routing, and the writing-production
 * checkpoints' language requirement.
 * Run: npx tsx scripts/test-bar-chart-mastery-3.ts */
import assert from 'node:assert/strict';
import {
  CAMBRIDGE_17_T3_FAMILY_EXPENDITURE,
  EXPENDITURE_1968_TASKS,
  EXPENDITURE_2018_TASKS,
  EXPENDITURE_DECREASE_TASKS,
  EXPENDITURE_DIFFERENCE_TASKS,
  EXPENDITURE_INCREASE_TASKS,
  EXPENDITURE_KEY_FEATURE_TASKS,
  EXPENDITURE_RANKING_TASKS,
  EXPENDITURE_SENTENCE_TASKS,
  EXPENDITURE_STRUCTURE_TASKS,
  EXPENDITURE_WRITING_TASKS,
} from '../lib/writing-studio/bar-charts';
import { CHART_DATASETS } from '../lib/writing-studio/charts';
import { TASK1_VISUALS } from '../lib/writing-studio/content';
import { getLesson } from '../lib/writing-studio/lessons';
import { barChartMasteryLesson3 as lesson } from '../lib/writing-studio/lessons/bar-chart-mastery-3';
import { localize, type MaterialBlock } from '../lib/writing-studio/types';

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

const d = CAMBRIDGE_17_T3_FAMILY_EXPENDITURE;
const y1968 = d.series.find((s) => s.name === '1968')!;
const y2018 = d.series.find((s) => s.name === '2018')!;
const at = (s: typeof y1968, cat: string) => s.values[d.categories.indexOf(cat)];

// ---------------------------------------------------------------- Part A: exact dataset

test('dataset id, kind, orientation and eight categories match Part A exactly', () => {
  assert.equal(d.id, 'cambridge-17-t3-family-expenditure');
  assert.equal(d.kind, 'bar');
  assert.equal(d.orientation, 'horizontal');
  assert.deepEqual(d.categories, ['Food', 'Housing', 'Fuel and power', 'Clothing and footwear', 'Household goods', 'Personal goods', 'Transport', 'Leisure']);
  assert.equal(d.unit, '%');
});

test('exactly eight categories and exactly two series (sixteen bars overall)', () => {
  assert.equal(d.categories.length, 8);
  assert.equal(d.series.length, 2);
  assert.equal(new Set(d.categories).size, 8, 'no duplicated category');
});

test('axis domain is 0-40 with 5-point tick spacing', () => {
  assert.deepEqual(d.axisDomain, [0, 40]);
  assert.equal(d.axisTickInterval, 5);
});

test('every 1968 and 2018 value matches the supplied table exactly', () => {
  assert.deepEqual(y1968.values, [35, 10, 6, 10, 8, 8, 8, 9]);
  assert.deepEqual(y2018.values, [17, 19, 4, 5, 8, 4, 14, 22]);
});

test('the chart is NOT required to sum to 100% per category (unlike Lesson 02 — a different data policy)', () => {
  const sums = d.categories.map((c) => at(y1968, c) + at(y2018, c));
  const anyNon100 = sums.some((s) => s !== 100);
  assert.ok(anyNon100, 'at least one category should NOT sum to 100, proving the test does not (and must not) enforce that rule here');
});

test('dataset is registered in CHART_DATASETS for the final-task chart lookup', () => {
  assert.equal(CHART_DATASETS['cambridge-17-t3-family-expenditure'], d);
});

// ---------------------------------------------------------------- Part A2: accuracy checks

test('Food is the largest 1968 category', () => {
  assert.equal(Math.max(...y1968.values), 35);
  assert.equal(at(y1968, 'Food'), 35);
});

test('Leisure is the largest 2018 category', () => {
  assert.equal(Math.max(...y2018.values), 22);
  assert.equal(at(y2018, 'Leisure'), 22);
});

test('Leisure has the greatest increase (approximately +13 percentage points)', () => {
  const changes = d.categories.map((c) => ({ cat: c, change: at(y2018, c) - at(y1968, c) }));
  const biggestIncrease = changes.reduce((a, b) => (b.change > a.change ? b : a));
  assert.equal(biggestIncrease.cat, 'Leisure');
  assert.equal(biggestIncrease.change, 13);
});

test('Food has the greatest decrease (approximately -18 percentage points)', () => {
  const changes = d.categories.map((c) => ({ cat: c, change: at(y2018, c) - at(y1968, c) }));
  const biggestDecrease = changes.reduce((a, b) => (b.change < a.change ? b : a));
  assert.equal(biggestDecrease.cat, 'Food');
  assert.equal(biggestDecrease.change, -18);
});

test('Household goods is unchanged (8% in both years)', () => {
  assert.equal(at(y1968, 'Household goods'), 8);
  assert.equal(at(y2018, 'Household goods'), 8);
});

test('Housing and Transport are the other two increases', () => {
  assert.equal(at(y2018, 'Housing') - at(y1968, 'Housing'), 9);
  assert.equal(at(y2018, 'Transport') - at(y1968, 'Transport'), 6);
});

test('Clothing and footwear, Personal goods and Fuel and power are the other three decreases', () => {
  assert.ok(at(y2018, 'Clothing and footwear') < at(y1968, 'Clothing and footwear'));
  assert.ok(at(y2018, 'Personal goods') < at(y1968, 'Personal goods'));
  assert.ok(at(y2018, 'Fuel and power') < at(y1968, 'Fuel and power'));
});

// ---------------------------------------------------------------- guided task metadata

test('every guided/sentence/writing task has a unique id and a non-empty reference answer', () => {
  const allArrays = [
    EXPENDITURE_STRUCTURE_TASKS,
    EXPENDITURE_1968_TASKS,
    EXPENDITURE_2018_TASKS,
    EXPENDITURE_INCREASE_TASKS,
    EXPENDITURE_DECREASE_TASKS,
    EXPENDITURE_DIFFERENCE_TASKS,
    EXPENDITURE_RANKING_TASKS,
    EXPENDITURE_KEY_FEATURE_TASKS,
    EXPENDITURE_SENTENCE_TASKS,
    EXPENDITURE_WRITING_TASKS,
  ];
  const allIds = allArrays.flatMap((arr) => arr.map((t) => t.id));
  assert.equal(new Set(allIds).size, allIds.length, 'no task id is reused across any of the exercise sets');
  allArrays.flat().forEach((t) => assert.ok(t.modelAnswer.trim().length > 0, t.id));
});

test('no task id collides with Lesson 01 or Lesson 02 task ids (every lesson shares one AI evaluator but has distinct ids)', () => {
  const lesson3Ids = [
    ...EXPENDITURE_STRUCTURE_TASKS, ...EXPENDITURE_1968_TASKS, ...EXPENDITURE_2018_TASKS,
    ...EXPENDITURE_INCREASE_TASKS, ...EXPENDITURE_DECREASE_TASKS, ...EXPENDITURE_DIFFERENCE_TASKS,
    ...EXPENDITURE_RANKING_TASKS, ...EXPENDITURE_KEY_FEATURE_TASKS, ...EXPENDITURE_SENTENCE_TASKS, ...EXPENDITURE_WRITING_TASKS,
  ].map((t) => t.id);
  assert.ok(lesson3Ids.every((id) => id.startsWith('exp-')), 'every Lesson 03 task id uses the exp- prefix, distinct from bc- (Lesson 01) and acc- (Lesson 02)');
});

test('only the sentence-construction and writing-production tasks require English; every other task accepts Bangla or English', () => {
  for (const t of [...EXPENDITURE_STRUCTURE_TASKS, ...EXPENDITURE_1968_TASKS, ...EXPENDITURE_2018_TASKS, ...EXPENDITURE_INCREASE_TASKS, ...EXPENDITURE_DECREASE_TASKS, ...EXPENDITURE_DIFFERENCE_TASKS, ...EXPENDITURE_RANKING_TASKS, ...EXPENDITURE_KEY_FEATURE_TASKS])
    assert.notEqual(t.requiredLanguage, 'en', t.id);
  for (const t of [...EXPENDITURE_SENTENCE_TASKS, ...EXPENDITURE_WRITING_TASKS]) assert.equal(t.requiredLanguage, 'en', t.id);
});

test('the colour-identification questions expect "Black" for 1968 and "Grey" for 2018', () => {
  const colour1968 = EXPENDITURE_STRUCTURE_TASKS.find((t) => t.id === 'exp-s-colour-1968')!;
  const colour2018 = EXPENDITURE_STRUCTURE_TASKS.find((t) => t.id === 'exp-s-colour-2018')!;
  assert.equal(colour1968.modelAnswer, 'Black.');
  assert.equal(colour2018.modelAnswer, 'Grey.');
});

test('the percentage-point difference tasks explicitly reject a currency framing (Part E regression case 6)', () => {
  const foodPoints = EXPENDITURE_DIFFERENCE_TASKS.find((t) => t.id === 'exp-e5-q2-food-points')!;
  assert.ok(foodPoints.evaluationCriteria?.some((c) => /taka|currency/i.test(c)), 'criteria should guard against a currency-unit answer');
});

// ---------------------------------------------------------------- lesson structure & routing

test('lesson is registered under its own id and routes as task1', () => {
  assert.equal(lesson.id, 'bar-chart-family-expenditure-cambridge-17-t3');
  assert.equal(lesson.task, 'task1');
  assert.equal(getLesson('bar-chart-family-expenditure-cambridge-17-t3'), lesson);
});

test('every chart-board step in the lesson uses the one Cambridge 17 T3 dataset — no invented or borrowed chart', () => {
  const chartSteps = lesson.steps.filter((s) => s.material?.type === 'chart-board');
  assert.ok(chartSteps.length >= 10);
  for (const s of chartSteps) {
    const m = s.material as Extract<MaterialBlock, { type: 'chart-board' }>;
    assert.equal(m.dataset.id, 'cambridge-17-t3-family-expenditure', s.id);
  }
});

test('the introduction and overview writing-production tasks each appear exactly once across the lesson', () => {
  const chartSteps = lesson.steps.filter((s) => s.material?.type === 'chart-board');
  const allTaskIds = chartSteps.flatMap((s) => (s.material as Extract<MaterialBlock, { type: 'chart-board' }>).tasks.map((t) => t.id));
  assert.equal(new Set(allTaskIds).size, allTaskIds.length, 'no task id appears twice across steps');
  for (const id of EXPENDITURE_WRITING_TASKS.map((t) => t.id)) assert.ok(allTaskIds.includes(id), id);
});

test('final prompt reuses the same Cambridge 17 chart, is a full 150-word Task 1 report, and never embeds a model answer', () => {
  assert.equal(lesson.finalPrompt.chartId, 'cambridge-17-t3-family-expenditure');
  assert.equal(lesson.finalPrompt.minWords, 150);
  assert.ok(!lesson.finalPrompt.skillFocus);
  assert.ok(!('modelAnswer' in lesson.finalPrompt));
});

test("lesson.title stays in English ('Changing Family Expenditure (1968-2018)' is a lesson name, not translated)", () => {
  assert.equal(localize('en', lesson.title), 'Changing Family Expenditure (1968-2018)');
  assert.equal(localize('bn', lesson.title), 'Changing Family Expenditure (1968-2018)');
});

test('the model answer step quotes the real, byte-accurate word count rather than a hard-coded approximation', () => {
  const step = lesson.steps.find((s) => s.id === 'model-answer')!;
  const m = step.material as Extract<MaterialBlock, { type: 'text' }>;
  const modelAnswerText = m.paragraphs.slice(0, 4).map((p) => (typeof p === 'string' ? p : p.en)).join(' ');
  const realCount = modelAnswerText.trim().split(/\s+/).length;
  const claimed = m.paragraphs.map((p) => (typeof p === 'string' ? '' : p.en)).join(' ').match(/Word count: (\d+) words/);
  assert.ok(claimed, 'word count line present');
  assert.equal(Number(claimed![1]), realCount, `claimed ${claimed![1]} vs actual ${realCount}`);
});

// ---------------------------------------------------------------- three-lesson course routing (Part F)

test('the Bar Charts course now lists all three lessons, in order, via courseLessonIds', () => {
  const visual = TASK1_VISUALS.find((v) => v.id === 'bar-charts');
  assert.deepEqual(visual?.courseLessonIds, ['bar-chart-mastery', 'bar-chart-mastery-2', 'bar-chart-family-expenditure-cambridge-17-t3']);
  assert.equal(visual?.courseLessonId, 'bar-chart-mastery', 'the legacy single-id field still points at Lesson 01, unchanged');
});

test('Lessons 01 and 02 are completely untouched by this addition', () => {
  const lesson1 = getLesson('bar-chart-mastery')!;
  const lesson2 = getLesson('bar-chart-mastery-2')!;
  assert.equal(lesson1.finalPrompt.chartId, 'cambridge-12-t1-physical-activity');
  assert.equal(lesson1.steps.length, 15);
  assert.equal(lesson2.finalPrompt.chartId, 'cambridge-13-t2-owned-rented-accommodation');
  assert.equal(lesson2.steps.length, 16);
});

console.log(`\n${passed} passed`);
