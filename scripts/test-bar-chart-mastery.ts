/** Bar Chart Mastery: dataset integrity against the exact Cambridge IELTS 12
 * Test 1 figures, lesson structure, routing, and the writing-production
 * checkpoints' language requirement.
 * Run: npx tsx scripts/test-bar-chart-mastery.ts */
import assert from 'node:assert/strict';
import { BAR_CHART_GUIDED_TASKS, BAR_CHART_STRUCTURE_TASKS, BAR_CHART_WRITING_TASKS, CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY } from '../lib/writing-studio/bar-charts';
import { CHART_DATASETS } from '../lib/writing-studio/charts';
import { TASK1_VISUALS } from '../lib/writing-studio/content';
import { getLesson } from '../lib/writing-studio/lessons';
import { barChartMasteryLesson as lesson } from '../lib/writing-studio/lessons/bar-chart-mastery';
import { localize, type ChartDataset, type MaterialBlock } from '../lib/writing-studio/types';

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

const d = CAMBRIDGE_12_T1_PHYSICAL_ACTIVITY;
const male = d.series.find((s) => s.name === 'Male')!;
const female = d.series.find((s) => s.name === 'Female')!;
const at = (s: typeof male, age: string) => s.values[d.categories.indexOf(age)];

// ---------------------------------------------------------------- Part A: exact dataset

test('dataset id, kind and six age-group categories match Part A exactly', () => {
  assert.equal(d.id, 'cambridge-12-t1-physical-activity');
  assert.equal(d.kind, 'bar');
  assert.deepEqual(d.categories, ['15 to 24', '25 to 34', '35 to 44', '45 to 54', '55 to 64', '65 and over']);
  assert.equal(d.unit, '%');
});

test('every Male and Female value matches Part A\'s table exactly (no rounding, no alteration)', () => {
  assert.deepEqual(male.values, [52.8, 42.2, 39.5, 43.1, 45.1, 46.7]);
  assert.deepEqual(female.values, [47.7, 48.9, 52.5, 53.3, 53.0, 47.1]);
});

test('highest/lowest male and female figures match the spec\'s stated facts', () => {
  assert.equal(Math.max(...male.values), 52.8);
  assert.equal(at(male, '15 to 24'), 52.8, 'highest male: 15–24');
  assert.equal(Math.min(...male.values), 39.5);
  assert.equal(at(male, '35 to 44'), 39.5, 'lowest male: 35–44');
  assert.equal(Math.max(...female.values), 53.3);
  assert.equal(at(female, '45 to 54'), 53.3, 'highest female: 45–54');
  assert.equal(Math.min(...female.values), 47.1);
  assert.equal(at(female, '65 and over'), 47.1, 'lowest female: 65 and over');
});

test('female participation is higher in exactly five of the six age groups (15–24 is the one exception)', () => {
  const higher = d.categories.filter((age) => at(female, age) > at(male, age));
  assert.equal(higher.length, 5);
  assert.ok(!higher.includes('15 to 24'));
  assert.ok(at(male, '15 to 24') > at(female, '15 to 24'), '15–24 is the only group where men lead');
});

test('the largest gender gap is 35–44 at 13.0 percentage points; the smallest is 65-and-over at 0.4', () => {
  const gaps = d.categories.map((age) => Math.abs(at(female, age) - at(male, age)));
  const largest = Math.max(...gaps);
  const smallest = Math.min(...gaps);
  assert.ok(Math.abs(largest - 13.0) < 1e-9, `largest gap was ${largest}`);
  assert.equal(d.categories[gaps.indexOf(largest)], '35 to 44');
  assert.ok(Math.abs(smallest - 0.4) < 1e-9, `smallest gap was ${smallest}`);
  assert.equal(d.categories[gaps.indexOf(smallest)], '65 and over');
});

test('dataset is registered in CHART_DATASETS for the final-task chart lookup', () => {
  assert.equal(CHART_DATASETS['cambridge-12-t1-physical-activity'], d);
});

// ---------------------------------------------------------------- guided task metadata

test('every guided/structure/writing task has a unique id, a non-empty reference answer, and order starts at 1', () => {
  for (const arr of [BAR_CHART_GUIDED_TASKS, BAR_CHART_STRUCTURE_TASKS, BAR_CHART_WRITING_TASKS]) {
    const ids = arr.map((t) => t.id);
    assert.equal(new Set(ids).size, ids.length);
    arr.forEach((t) => assert.ok(t.modelAnswer.trim().length > 0, t.id));
  }
  assert.equal(Math.min(...BAR_CHART_GUIDED_TASKS.map((t) => t.order)), 1);
  assert.equal(Math.min(...BAR_CHART_STRUCTURE_TASKS.map((t) => t.order)), 1);
});

test('only the writing-production tasks (Steps 08-10) require English; every chart-understanding task accepts Bangla or English', () => {
  for (const t of [...BAR_CHART_GUIDED_TASKS, ...BAR_CHART_STRUCTURE_TASKS]) assert.notEqual(t.requiredLanguage, 'en', t.id);
  for (const t of BAR_CHART_WRITING_TASKS) assert.equal(t.requiredLanguage, 'en', t.id);
});

test('the "only group where male led" fact (15–24) and the "percentage points" teaching point are both present', () => {
  const onlyMale = BAR_CHART_GUIDED_TASKS.find((t) => t.id === 'bc-q6-only-male-higher')!;
  assert.match(onlyMale.modelAnswer, /15–24/);
  const gap = BAR_CHART_GUIDED_TASKS.find((t) => t.id === 'bc-q7-largest-gap')!;
  assert.match(gap.modelAnswer, /13 percentage points/);
  assert.ok(gap.evaluationCriteria?.some((c) => /percentage points/.test(c)));
});

// ---------------------------------------------------------------- lesson structure & routing

test('lesson is registered under its own id and routes as task1', () => {
  assert.equal(lesson.id, 'bar-chart-mastery');
  assert.equal(lesson.task, 'task1');
  assert.equal(getLesson('bar-chart-mastery'), lesson);
});

test('every chart-board step in the lesson uses the one Cambridge dataset — no second, invented chart', () => {
  const chartSteps = lesson.steps.filter((s) => s.material?.type === 'chart-board');
  assert.ok(chartSteps.length >= 7);
  for (const s of chartSteps) {
    const m = s.material as Extract<MaterialBlock, { type: 'chart-board' }>;
    assert.equal(m.dataset.id, 'cambridge-12-t1-physical-activity', s.id);
  }
});

test('the four writing-production tasks (introduction, overview, 2 body paragraphs) all appear exactly once across the lesson', () => {
  const chartSteps = lesson.steps.filter((s) => s.material?.type === 'chart-board');
  const allTaskIds = chartSteps.flatMap((s) => (s.material as Extract<MaterialBlock, { type: 'chart-board' }>).tasks.map((t) => t.id));
  assert.equal(new Set(allTaskIds).size, allTaskIds.length, 'no task id appears twice across steps');
  for (const id of BAR_CHART_WRITING_TASKS.map((t) => t.id)) assert.ok(allTaskIds.includes(id), id);
});

test('final prompt reuses the same Cambridge chart (no second/unseen dataset for this course), is a full 150-word Task 1 report, and never embeds a model answer', () => {
  assert.equal(lesson.finalPrompt.chartId, 'cambridge-12-t1-physical-activity');
  assert.equal(lesson.finalPrompt.minWords, 150);
  assert.ok(!lesson.finalPrompt.skillFocus);
  assert.ok(!('modelAnswer' in lesson.finalPrompt));
});

test("lesson.title stays in English ('Bar Chart Mastery' is a course name, not translated)", () => {
  assert.equal(localize('en', lesson.title), 'Bar Chart Mastery');
  assert.equal(localize('bn', lesson.title), 'Bar Chart Mastery');
});

test('the static-vs-time-series check names the chart-understanding year correctly and does not invent a second year', () => {
  const step = lesson.steps.find((s) => s.id === 'static-vs-timeseries')!;
  assert.equal(step.check?.correctIndex, 1);
  assert.ok(step.check!.options.some((o) => /2010/.test(o) && /six age groups/.test(o)));
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

test('the Bar Charts visual-training card now opens its own course, not a generic preview', () => {
  const visual = TASK1_VISUALS.find((v) => v.id === 'bar-charts');
  assert.equal(visual?.courseLessonId, 'bar-chart-mastery');
});

console.log(`\n${passed} passed`);
