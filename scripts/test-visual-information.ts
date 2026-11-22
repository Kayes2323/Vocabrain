/** Writing Studio Lesson 02 ("visual-information"): content integrity, chart-figure accuracy,
 * and the skill-drill feedback behaviour its final task relies on.
 * Run: npx tsx scripts/test-visual-information.ts */
import assert from 'node:assert/strict';
import { CHART_DATASETS } from '../lib/writing-studio/charts';
import { checkEssay, deriveScope } from '../lib/writing-studio/feedback';
import { getLesson } from '../lib/writing-studio/lessons';
import { visualInformationLesson as lesson } from '../lib/writing-studio/lessons/visual-information';
import { recordLesson } from '../lib/writing-studio/progress';
import type { WritingStudioProgress } from '../lib/models';
import type { MaterialBlock } from '../lib/writing-studio/types';

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

const chart = CHART_DATASETS['commute-methods'];
const v = (category: string, year: '2010' | '2023') => chart.series.find((s) => s.name === year)!.values[chart.categories.indexOf(category)];

// ---------------------------------------------------------------- identity / structure

test('lesson id and module id are unchanged, and it is the one registered lesson with that id', () => {
  assert.equal(lesson.id, 'visual-information');
  assert.equal(lesson.moduleId, 'task1-m2');
  assert.equal(lesson.task, 'task1');
  assert.equal(getLesson('visual-information'), lesson);
});
test('all twelve instructional steps exist, in order (step 11 is four consecutive check steps)', () => {
  const ids = lesson.steps.map((s) => s.id);
  const expected = [
    'intro', 'visual-anatomy', 'units', 'time-categories', 'legend', 'trend-or-static', 'comparison',
    'change-types', 'key-features', 'guided-analysis', 'misreading-clinic', 'misreading-clinic-2',
    'misreading-clinic-3', 'misreading-clinic-4', 'independent-review',
  ];
  assert.deepEqual(ids, expected);
});
test('every step id is unique', () => {
  const ids = lesson.steps.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
});
test('step kinds follow the specified sequence', () => {
  const kinds = lesson.steps.map((s) => s.kind);
  assert.deepEqual(kinds, ['intro', 'explain', 'explain', 'explain', 'explain', 'demonstrate', 'explain', 'demonstrate', 'explain', 'guided', 'check', 'check', 'check', 'check', 'review']);
});
test('material types are valid MaterialBlock variants and the guided step is the chart-board', () => {
  const valid = new Set<MaterialBlock['type']>(['text', 'examples', 'vocab', 'chart-board', 'idea-board']);
  for (const s of lesson.steps) if (s.material) assert.ok(valid.has(s.material.type), s.id);
  const guided = lesson.steps.find((s) => s.id === 'guided-analysis')!;
  assert.equal(guided.material?.type, 'chart-board');
});
test('the guided chart-board uses the existing commute-methods dataset object (not a copy)', () => {
  const m = lesson.steps.find((s) => s.id === 'guided-analysis')!.material;
  assert.ok(m && m.type === 'chart-board');
  assert.equal(m.dataset, CHART_DATASETS['commute-methods']);
  assert.deepEqual(m.tasks.map((t) => t.id), ['identify-unit', 'identify-period', 'car-direction', 'bicycle-direction', 'stable-category', 'headline']);
  assert.deepEqual(m.tasks.map((t) => t.order), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(m.tasks.map((t) => t.belongsIn), ['overview', 'overview', 'body', 'body', 'body', 'overview']);
});
test('every check step has four options, a valid correctIndex and an explanation', () => {
  for (const s of lesson.steps.filter((x) => x.kind === 'check')) {
    assert.ok(s.check, s.id);
    assert.equal(s.check.options.length, 4, s.id);
    assert.ok(s.check.correctIndex >= 0 && s.check.correctIndex < 4, s.id);
    assert.ok(s.check.explain.length > 20, s.id);
  }
});
test('clinic correct answers are the accurate options (0-based indexes 1, 1, 2, 1)', () => {
  const checks = lesson.steps.filter((s) => s.kind === 'check').map((s) => s.check!);
  assert.deepEqual(checks.map((c) => c.correctIndex), [1, 1, 2, 1]);
  assert.match(checks[0].options[1], /percentage into an absolute number/);
  assert.match(checks[1].options[1], /decreased by 14 percentage points/);
  assert.match(checks[2].options[2], /remained unchanged/);
  assert.match(checks[3].options[1], /remained the largest category, while bicycle use rose/);
});

// ---------------------------------------------------------------- data accuracy

test('dataset figures are what the lesson teaches', () => {
  assert.equal(chart.unit, '% of commuters');
  assert.deepEqual(chart.series.map((s) => s.name), ['2010', '2023']);
  assert.deepEqual([v('Car', '2010'), v('Car', '2023')], [52, 38]);
  assert.deepEqual([v('Bus', '2010'), v('Bus', '2023')], [24, 21]);
  assert.deepEqual([v('Bicycle', '2010'), v('Bicycle', '2023')], [6, 19]);
  assert.deepEqual([v('Train', '2010'), v('Train', '2023')], [11, 15]);
  assert.deepEqual([v('Walking', '2010'), v('Walking', '2023')], [7, 7]);
});
test('derived claims hold: car -14 pp, bicycle +13 pp, bicycle ~216.7% growth, walking unchanged', () => {
  assert.equal(v('Car', '2010') - v('Car', '2023'), 14);
  assert.equal(v('Bicycle', '2023') - v('Bicycle', '2010'), 13);
  const growth = ((v('Bicycle', '2023') - v('Bicycle', '2010')) / v('Bicycle', '2010')) * 100;
  assert.ok(Math.abs(growth - 216.7) < 0.05, String(growth));
  assert.equal(v('Walking', '2010'), v('Walking', '2023'));
});
test('bicycle has the largest relative growth; car is the largest category in both years', () => {
  const growth = (c: string) => (v(c, '2023') - v(c, '2010')) / v(c, '2010');
  const best = chart.categories.slice().sort((a, b) => growth(b) - growth(a))[0];
  assert.equal(best, 'Bicycle');
  for (const y of ['2010', '2023'] as const) {
    const top = chart.categories.slice().sort((a, b) => v(b, y) - v(a, y))[0];
    assert.equal(top, 'Car', y);
  }
});

/** All learner-facing text in the lesson, for scanning. */
function allText(): string {
  const parts: string[] = [lesson.objective, lesson.finalPrompt.instructions];
  for (const s of lesson.steps) {
    parts.push(s.trainerMessage);
    const m = s.material;
    if (m?.type === 'text') parts.push(...m.paragraphs);
    if (m?.type === 'examples') parts.push(m.good, m.weak, m.note);
    if (m?.type === 'chart-board') parts.push(...m.tasks.map((t) => `${t.prompt} ${t.modelAnswer}`));
    if (s.check) parts.push(s.check.prompt, ...s.check.options, s.check.explain);
  }
  return parts.join('\n');
}

test('every "<category> … N% in YEAR" figure quoted about a category agrees with the dataset', () => {
  // The legend step's deliberately reversed WEAK example is excluded here and asserted separately below.
  const text = allText().replace('Car use was 52% in 2023 and 38% in 2010.', '');
  const re = /\b(Car|Bus|Bicycle|Train|Walking)\b[^.\n]*?\b(\d+)% (?:of commuters )?in (2010|2023)/gi;
  let n = 0;
  for (const m of text.matchAll(re)) {
    const cat = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase();
    assert.equal(Number(m[2]), v(cat, m[3] as '2010' | '2023'), m[0]);
    n++;
  }
  assert.ok(n >= 5, `expected several figure claims to be checked, saw ${n}`);
});
test('"from A% … to B%" claims match start and end values', () => {
  const text = allText();
  const re = /\b(car use|bicycle use|bus use|train use|walking)\b[^.\n]*?\bfrom (\d+)%[^.\n]*? to (\d+)%/gi;
  let n = 0;
  for (const m of text.matchAll(re)) {
    const cat = { 'car use': 'Car', 'bicycle use': 'Bicycle', 'bus use': 'Bus', 'train use': 'Train', walking: 'Walking' }[m[1].toLowerCase()]!;
    assert.equal(Number(m[2]), v(cat, '2010'), m[0]);
    assert.equal(Number(m[3]), v(cat, '2023'), m[0]);
    n++;
  }
  assert.ok(n >= 5, `expected several from/to claims, saw ${n}`);
});
test('the reversed-series example is only ever presented as the WEAK example', () => {
  const legend = lesson.steps.find((s) => s.id === 'legend')!.material;
  assert.ok(legend && legend.type === 'examples');
  assert.match(legend.weak, /52% in 2023 and 38% in 2010/);
  assert.match(legend.good, /52% in 2010 against 38% in 2023/);
});
test('"13% increase" appears only inside the warning that it is wrong', () => {
  const text = allText();
  for (const m of text.matchAll(/13% increase|increased by 13%/g)) {
    const around = text.slice(Math.max(0, m.index! - 80), m.index! + 120);
    assert.match(around, /inaccurate|never label/i, around);
  }
});
test('"percentage points" is used for car (14) and bicycle (13) changes only with those exact figures', () => {
  const text = allText();
  for (const m of text.matchAll(/(\d+) percentage points/g)) assert.ok(['13', '14'].includes(m[1]), m[0]);
});

// ---------------------------------------------------------------- final prompt

test('final prompt is a targeted overview drill on the commute chart', () => {
  const f = lesson.finalPrompt;
  assert.equal(f.chartId, 'commute-methods');
  assert.ok(CHART_DATASETS[f.chartId!]);
  assert.equal(f.minWords, 20);
  assert.equal(f.skillFocus, 'Chart interpretation and key-feature selection');
  assert.equal(f.checkScope, 'overview-only');
  assert.equal(deriveScope(lesson), 'overview-only');
  assert.match(f.instructions, /two-sentence overview/);
  assert.match(f.instructions, /Do not write an introduction or body paragraph/);
});

// ---------------------------------------------------------------- skill-drill feedback behaviour

const GOOD = 'Car use remained the most common way to travel to work despite falling noticeably, while cycling rose sharply and narrowed the gap.';
const drill = (text: string) => checkEssay(text, lesson.finalPrompt.minWords, 'task1', 'overview-only', true);

test('drill: a good two-sentence overview with no "Overall", no linker pair and no figures gets no mistakes', () => {
  const r = drill(GOOD + ' Walking stayed the same.');
  assert.deepEqual(r.mistakes, [], JSON.stringify(r.mistakes));
});
test('drill: not required to have an overview opener, linking words, an introduction or body paragraphs', () => {
  const r = drill(GOOD);
  assert.ok(!r.mistakes.some((m) => /dedicated overview|linking words|150/.test(m.why)), JSON.stringify(r.mistakes));
});
test('drill: a short answer under 20 words gets only a neutral suggestion, never an "underdeveloped" mistake', () => {
  const r = drill('Car use fell but cycling rose sharply.');
  assert.equal(r.meetsLength, false);
  assert.ok(!r.mistakes.some((m) => /underdeveloped/.test(m.why)));
  assert.ok(r.suggestions.some((s) => /Suggested length/.test(s)));
});
test('drill: one or two figures are tolerated, but listing three or more is flagged', () => {
  assert.ok(!drill(GOOD + ' Car use dropped from 52% to 38%.').mistakes.some((m) => /lists several individual figures/.test(m.why)));
  const listy = drill('Car use fell from 52% to 38%, bus use fell from 24% to 21% and bicycle use rose from 6% to 19%.');
  assert.ok(listy.mistakes.some((m) => /lists several individual figures/.test(m.why)), JSON.stringify(listy.mistakes));
});
test('drill: no false 150-word warning appears anywhere', () => {
  const r = drill('Car use fell.');
  const all = JSON.stringify(r);
  assert.ok(!/150/.test(all), all);
});

// ---------------------------------------------------------------- regressions: non-drill behaviour unchanged

test('non-drill overview-only is unchanged: still requires an overview phrase, linking words, and bans figures', () => {
  const noPhrase = checkEssay('The chart shows travel methods in a city.', 10, 'task1', 'overview-only');
  assert.ok(noPhrase.mistakes.some((m) => /dedicated overview/.test(m.why)));
  assert.ok(noPhrase.mistakes.some((m) => /linking words/.test(m.why)));
  const fig = checkEssay('Overall, car use fell to 38% while cycling rose.', 10, 'task1', 'overview-only');
  assert.ok(fig.mistakes.some((m) => /individual figures belong in the body paragraphs/.test(m.why)));
});
test('non-drill overview-only under-length is still a Task response mistake', () => {
  assert.ok(checkEssay('Short.', 10, 'task1', 'overview-only').mistakes.some((m) => /underdeveloped/.test(m.why)));
});
test('drill flag does not change introduction-only (Lesson 01) results', () => {
  const t = 'The two line graphs illustrate the mean monthly temperature and the amount of rainfall recorded in two cities across a twelve-month period.';
  assert.deepEqual(checkEssay(t, 20, 'task1', 'introduction-only', true), checkEssay(t, 20, 'task1', 'introduction-only'));
});
test('drill flag does not change full-scope Task 1 or Task 2 results', () => {
  const t = 'Overall, car use fell. However, cycling rose, for example from 6% to 19%.';
  assert.deepEqual(checkEssay(t, 10, 'task1', 'full', true), checkEssay(t, 10, 'task1', 'full'));
  assert.deepEqual(checkEssay(t, 10, 'task2', 'paragraph-only', true), checkEssay(t, 10, 'task2', 'paragraph-only'));
});

// ---------------------------------------------------------------- progress safety

test('a skill-drill attempt (band=null) completes the lesson without touching the learner\'s band history', () => {
  const empty: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };
  const earlier = recordLesson(empty, 'task1-full-practice', 1, 6.5);
  const after = recordLesson(earlier, lesson.id, 1, null);
  assert.equal(after.lessons[lesson.id].bestBand, null);
  assert.equal(after.lessons[lesson.id].lastBand, null);
  assert.ok(after.lessons[lesson.id].completedAt);
  assert.equal(after.lessons['task1-full-practice'].bestBand, 6.5);
  assert.equal(after.lessons['task1-full-practice'].lastBand, 6.5);
});

console.log(`\n${passed} passed`);
