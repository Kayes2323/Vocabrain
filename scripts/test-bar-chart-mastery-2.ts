/** Bar Chart Mastery Lesson 02 ("Long-term Changes and Reversing Trends"):
 * dataset integrity against the Cambridge IELTS 13 Test 2 figures, lesson
 * structure, multi-lesson course routing, and the writing-production
 * checkpoints' language requirement.
 * Run: npx tsx scripts/test-bar-chart-mastery-2.ts */
import assert from 'node:assert/strict';
import {
  ACCOMMODATION_DATA_READING_TASKS,
  ACCOMMODATION_MISTAKE_TASKS,
  ACCOMMODATION_PLANNING_TASKS,
  ACCOMMODATION_SENTENCE_TASKS,
  ACCOMMODATION_TREND_TASKS,
  ACCOMMODATION_WRITING_TASKS,
  CAMBRIDGE_13_T2_OWNED_RENTED,
} from '../lib/writing-studio/bar-charts';
import { CHART_DATASETS } from '../lib/writing-studio/charts';
import { TASK1_VISUALS } from '../lib/writing-studio/content';
import { getLesson } from '../lib/writing-studio/lessons';
import { barChartMasteryLesson2 as lesson } from '../lib/writing-studio/lessons/bar-chart-mastery-2';
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

const d = CAMBRIDGE_13_T2_OWNED_RENTED;
const owned = d.series.find((s) => s.name === 'Owned accommodation')!;
const rented = d.series.find((s) => s.name === 'Rented accommodation')!;
const at = (s: typeof owned, year: string) => s.values[d.categories.indexOf(year)];

// ---------------------------------------------------------------- Part A: exact dataset

test('dataset id, kind and nine year categories match Part A exactly', () => {
  assert.equal(d.id, 'cambridge-13-t2-owned-rented-accommodation');
  assert.equal(d.kind, 'bar');
  assert.deepEqual(d.categories, ['1918', '1939', '1953', '1961', '1971', '1981', '1991', '2001', '2011']);
  assert.equal(d.unit, '%');
});

test('every Owned and Rented value matches the supplied table exactly', () => {
  assert.deepEqual(owned.values, [22, 31, 32, 42, 50, 60, 68, 69, 64]);
  assert.deepEqual(rented.values, [78, 69, 68, 58, 50, 40, 32, 31, 36]);
});

test('the two series are complementary: owned% + rented% = 100 in every one of the nine years', () => {
  d.categories.forEach((y) => assert.equal(at(owned, y) + at(rented, y), 100, `year ${y}`));
});

test('the crossover: both figures are exactly 50% in 1971, and in no other year', () => {
  assert.equal(at(owned, '1971'), 50);
  assert.equal(at(rented, '1971'), 50);
  const equalYears = d.categories.filter((y) => at(owned, y) === at(rented, y));
  assert.deepEqual(equalYears, ['1971']);
});

test('before 1971 renting led; after 1971 ownership led (the crossover direction)', () => {
  const before1971 = d.categories.slice(0, d.categories.indexOf('1971'));
  const after1971 = d.categories.slice(d.categories.indexOf('1971') + 1);
  before1971.forEach((y) => assert.ok(at(rented, y) > at(owned, y), `${y}: renting should lead`));
  after1971.forEach((y) => assert.ok(at(owned, y) > at(rented, y), `${y}: ownership should lead`));
});

test('ownership peaks at 69% in 2001 (not 2011); renting bottoms out at 31% in 2001', () => {
  assert.equal(Math.max(...owned.values), 69);
  assert.equal(at(owned, '2001'), 69);
  assert.equal(Math.min(...rented.values), 31);
  assert.equal(at(rented, '2001'), 31);
});

test('the final-decade reversal: ownership falls 2001->2011 while renting rises 2001->2011', () => {
  assert.ok(at(owned, '2011') < at(owned, '2001'));
  assert.ok(at(rented, '2011') > at(rented, '2001'));
  assert.equal(at(owned, '2011'), 64);
  assert.equal(at(rented, '2011'), 36);
});

test('1939-1953 is the near-stable interval (both series change by only one point)', () => {
  assert.equal(Math.abs(at(owned, '1953') - at(owned, '1939')), 1);
  assert.equal(Math.abs(at(rented, '1953') - at(rented, '1939')), 1);
});

test('ownership did NOT rise continuously through 2011 (the common "continuous increase" mistake is actually false)', () => {
  assert.ok(at(owned, '2011') < at(owned, '2001'), 'the chart genuinely has a late decline, so a "continuous increase" claim is factually wrong');
});

test('dataset is registered in CHART_DATASETS for the final-task chart lookup', () => {
  assert.equal(CHART_DATASETS['cambridge-13-t2-owned-rented-accommodation'], d);
});

// ---------------------------------------------------------------- guided task metadata

test('every guided/mistake/sentence/planning/writing task has a unique id and a non-empty reference answer', () => {
  const allArrays = [ACCOMMODATION_DATA_READING_TASKS, ACCOMMODATION_TREND_TASKS, ACCOMMODATION_MISTAKE_TASKS, ACCOMMODATION_SENTENCE_TASKS, ACCOMMODATION_PLANNING_TASKS, ACCOMMODATION_WRITING_TASKS];
  const allIds = allArrays.flatMap((arr) => arr.map((t) => t.id));
  assert.equal(new Set(allIds).size, allIds.length, 'no task id is reused across any of the exercise sets');
  allArrays.flat().forEach((t) => assert.ok(t.modelAnswer.trim().length > 0, t.id));
});

test('only the sentence-construction and writing-production tasks require English; every other task accepts Bangla or English', () => {
  for (const t of [...ACCOMMODATION_DATA_READING_TASKS, ...ACCOMMODATION_TREND_TASKS, ...ACCOMMODATION_MISTAKE_TASKS, ...ACCOMMODATION_PLANNING_TASKS]) assert.notEqual(t.requiredLanguage, 'en', t.id);
  for (const t of [...ACCOMMODATION_SENTENCE_TASKS, ...ACCOMMODATION_WRITING_TASKS]) assert.equal(t.requiredLanguage, 'en', t.id);
});

test('Exercise 1 (data reading) accepts bare-figure alternatives like "22", "22%", "22 percent"', () => {
  const q1 = ACCOMMODATION_DATA_READING_TASKS.find((t) => t.id === 'acc-e1-q1-owned-1918')!;
  assert.ok(q1.acceptableAlternatives?.includes('22%'));
  assert.ok(q1.acceptableAlternatives?.includes('22'));
});

test('Exercise 3 (identify the mistake) marks exactly the three true/false pairs the spec expects', () => {
  const correctness: Record<string, boolean> = {
    'acc-e3-a-continuous': false, // continuous increase — false, it fell after 2001
    'acc-e3-b-1918-renting': true, // renting more common in 1918 — true
    'acc-e3-c-1971-equal': true, // equal in 1971 — true
    'acc-e3-d-2011-peak': false, // peak in 2011 — false, peak was 2001
    'acc-e3-e-final-decade': true, // opposite directions in final decade — true
  };
  for (const t of ACCOMMODATION_MISTAKE_TASKS) {
    const shouldBeCorrect = correctness[t.id];
    const saysCorrect = /^correct/i.test(t.modelAnswer);
    assert.equal(saysCorrect, shouldBeCorrect, `${t.id}: modelAnswer should start with "${shouldBeCorrect ? 'Correct' : 'Incorrect'}"`);
  }
});

// ---------------------------------------------------------------- lesson structure & routing

test('lesson is registered under its own id and routes as task1', () => {
  assert.equal(lesson.id, 'bar-chart-mastery-2');
  assert.equal(lesson.task, 'task1');
  assert.equal(getLesson('bar-chart-mastery-2'), lesson);
});

test('every chart-board step in the lesson uses the one Cambridge 13 T2 dataset — no invented or borrowed chart', () => {
  const chartSteps = lesson.steps.filter((s) => s.material?.type === 'chart-board');
  assert.ok(chartSteps.length >= 7);
  for (const s of chartSteps) {
    const m = s.material as Extract<MaterialBlock, { type: 'chart-board' }>;
    assert.equal(m.dataset.id, 'cambridge-13-t2-owned-rented-accommodation', s.id);
  }
});

test('the introduction and overview writing-production tasks each appear exactly once across the lesson', () => {
  const chartSteps = lesson.steps.filter((s) => s.material?.type === 'chart-board');
  const allTaskIds = chartSteps.flatMap((s) => (s.material as Extract<MaterialBlock, { type: 'chart-board' }>).tasks.map((t) => t.id));
  assert.equal(new Set(allTaskIds).size, allTaskIds.length, 'no task id appears twice across steps');
  for (const id of ACCOMMODATION_WRITING_TASKS.map((t) => t.id)) assert.ok(allTaskIds.includes(id), id);
});

test('final prompt reuses the same Cambridge 13 chart, is a full 150-word Task 1 report, and never embeds a model answer', () => {
  assert.equal(lesson.finalPrompt.chartId, 'cambridge-13-t2-owned-rented-accommodation');
  assert.equal(lesson.finalPrompt.minWords, 150);
  assert.ok(!lesson.finalPrompt.skillFocus);
  assert.ok(!('modelAnswer' in lesson.finalPrompt));
});

test("lesson.title stays in English ('Long-term Changes and Reversing Trends' is a lesson name, not translated)", () => {
  assert.equal(localize('en', lesson.title), 'Long-term Changes and Reversing Trends');
  assert.equal(localize('bn', lesson.title), 'Long-term Changes and Reversing Trends');
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

// ---------------------------------------------------------------- multi-lesson course routing (Part G)

test('the Bar Charts course now lists both lessons, in order, via courseLessonIds', () => {
  const visual = TASK1_VISUALS.find((v) => v.id === 'bar-charts');
  assert.deepEqual(visual?.courseLessonIds, ['bar-chart-mastery', 'bar-chart-mastery-2']);
  assert.equal(visual?.courseLessonId, 'bar-chart-mastery', 'the legacy single-id field still points at Lesson 01, unchanged');
});

test('Lesson 01 (bar-chart-mastery) is completely untouched by this addition', () => {
  const lesson1 = getLesson('bar-chart-mastery')!;
  assert.equal(lesson1.finalPrompt.chartId, 'cambridge-12-t1-physical-activity', "Lesson 01's own chart is unaffected");
  assert.equal(lesson1.steps.length, 15);
});

console.log(`\n${passed} passed`);
