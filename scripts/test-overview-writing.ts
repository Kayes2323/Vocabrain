/** Writing Studio Lesson 04 ("overview-writing", module task1-m4, "Overview Mastery"): curriculum
 * integrity, answer keys, accuracy against the 'commute-methods' dataset, and the overview-only
 * skill-drill configuration and local-check behaviour its final task relies on.
 * Run: npx tsx scripts/test-overview-writing.ts */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CHART_DATASETS } from '../lib/writing-studio/charts';
import { TASK1_MODULES } from '../lib/writing-studio/content';
import { checkEssay, deriveScope } from '../lib/writing-studio/feedback';
import { getLesson } from '../lib/writing-studio/lessons';
import { overviewWritingLesson as lesson } from '../lib/writing-studio/lessons/overview-writing';
import { task1IntroductionLesson } from '../lib/writing-studio/lessons/task1-introduction';
import { task1UnderstandingLesson } from '../lib/writing-studio/lessons/task1-understanding';
import { visualInformationLesson } from '../lib/writing-studio/lessons/visual-information';
import { recordLesson } from '../lib/writing-studio/progress';
import type { WritingStudioProgress } from '../lib/models';
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

const chart = CHART_DATASETS['commute-methods'];
const v = (category: string, year: '2010' | '2023') => chart.series.find((s) => s.name === year)!.values[chart.categories.indexOf(category)];

const MODEL_1 =
  'Overall, cars remained the most commonly used form of transport, although their share declined over the period. By contrast, cycling became considerably more popular, while walking remained unchanged.';
const MODEL_2 =
  'Although car use fell, it continued to account for the largest proportion of commuters in 2023. Cycling recorded the most substantial increase, whereas walking remained stable.';
const ONE_SENTENCE = 'Although car use fell, it stayed the leading method, while cycling rose sharply and walking was unchanged.';

function allText(): string {
  const parts: string[] = [localize('en', lesson.objective), localize('en', lesson.finalPrompt.instructions)];
  for (const s of lesson.steps) {
    parts.push(localize('en', s.trainerMessage));
    const m = s.material;
    if (m?.type === 'text') parts.push(...m.paragraphs.map((p) => localize('en', p)));
    if (m?.type === 'examples') parts.push(m.good, m.weak, localize('en', m.note));
    if (m?.type === 'vocab') parts.push(...m.items.flatMap((i) => [i.phrase, localize('en', i.use)]));
    if (m?.type === 'chart-board') parts.push(...m.tasks.map((t) => `${localize('en', t.prompt)} ${t.modelAnswer}`));
    if (s.check) parts.push(localize('en', s.check.prompt), ...s.check.options, localize('en', s.check.explain));
  }
  return parts.join('\n');
}

// ---------------------------------------------------------------- identity / curriculum

test('existing identity is preserved: id overview-writing, module task1-m4, registered once, wired to the module card', () => {
  assert.equal(lesson.id, 'overview-writing');
  assert.equal(lesson.task, 'task1');
  assert.equal(lesson.moduleId, 'task1-m4');
  assert.equal(getLesson('overview-writing'), lesson);
  assert.equal(getLesson('task1-overview'), undefined, 'no duplicate overview lesson is registered');
  const m4 = TASK1_MODULES.find((m) => m.id === 'task1-m4')!;
  assert.equal(localize('en', m4.title), 'Overview Mastery');
  assert.equal(m4.builtLessonId, 'overview-writing');
});
test('all intended teaching stages exist, in order (each multi-question group is consecutive check steps)', () => {
  assert.deepEqual(lesson.steps.map((s) => s.id), [
    'intro', 'overview-role', 'read-chart', 'main-vs-minor', 'trend-types', 'trend-check', 'trend-check-2', 'trend-check-3',
    'comparisons', 'select-features', 'build-overview', 'write-overview', 'visual-types', 'visual-types-check', 'visual-types-check-2',
    'common-errors', 'guided-analysis', 'clinic', 'clinic-2', 'clinic-3', 'clinic-4', 'reflection', 'independent-practice',
  ]);
  const ids = lesson.steps.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length, 'step ids are unique');
  assert.equal(lesson.steps[lesson.steps.length - 1].kind, 'independent');
});
test('only supported schema is used: valid material types, one check per step, no checks[] field', () => {
  const valid = new Set<MaterialBlock['type']>(['text', 'examples', 'vocab', 'chart-board']);
  for (const s of lesson.steps) {
    if (s.material) assert.ok(valid.has(s.material.type), `${s.id}: ${s.material.type}`);
    assert.ok(!('checks' in s), s.id);
  }
});

// ---------------------------------------------------------------- answer keys

const KEYS: [string, number][] = [
  ['intro', 1], ['overview-role', 1], ['main-vs-minor', 1], ['trend-check', 1], ['trend-check-2', 2], ['trend-check-3', 0],
  ['comparisons', 1], ['select-features', 2], ['build-overview', 0], ['visual-types-check', 1], ['visual-types-check-2', 1],
  ['clinic', 1], ['clinic-2', 1], ['clinic-3', 0], ['clinic-4', 0],
];
test('every question group has the specified, valid answer key, and every check has an explanation', () => {
  const withChecks = lesson.steps.filter((s) => s.check);
  assert.deepEqual(withChecks.map((s) => s.id), KEYS.map(([id]) => id), 'exactly the intended checks exist');
  for (const [id, key] of KEYS) {
    const c = lesson.steps.find((s) => s.id === id)!.check!;
    assert.equal(c.correctIndex, key, id);
    assert.ok(c.correctIndex >= 0 && c.correctIndex < c.options.length, id);
    assert.ok(c.options.length >= 3 && new Set(c.options).size === c.options.length, `${id}: options`);
    assert.ok(localize('en', c.explain).length > 30, `${id}: explanation`);
  }
});
test('the correct option is the accurate statement for each content check', () => {
  const key = (id: string) => {
    const c = lesson.steps.find((s) => s.id === id)!.check!;
    return c.options[c.correctIndex];
  };
  assert.match(key('intro'), /most important patterns and comparisons/);
  assert.match(key('overview-role'), /remained the leading transport method.*cycling recorded the most substantial increase/);
  assert.match(key('main-vs-minor'), /Observations 2 and 5/);
  assert.match(key('trend-check'), /substantial increase/);
  assert.match(key('trend-check-2'), /remained unchanged/);
  assert.match(key('trend-check-3'), /declined while retaining its leading position/);
  assert.match(key('comparisons'), /Car use declined, whereas cycling experienced a substantial increase/);
  assert.match(key('select-features'), /^A, C and D$/);
  assert.match(key('build-overview'), /too many individual figures/);
  assert.match(key('visual-types-check'), /sequence and final outcome/);
  assert.match(key('visual-types-check-2'), /major transformations and unchanged features/);
  assert.match(key('clinic'), /individual figures instead of the main overall patterns/);
  assert.match(key('clinic-2'), /does not provide evidence for the cause/);
  assert.match(key('clinic-3'), /remained at 7% in both years/);
  assert.match(key('clinic-4'), /illustrate how a town centre changed between 1990 and 2020/);
});
test('the map clinic never rewards narrowing "changes" to "layout"', () => {
  const c = lesson.steps.find((s) => s.id === 'clinic-4')!.check!;
  assert.ok(!/layout/i.test(c.options[c.correctIndex]));
  assert.ok(/layout/i.test(c.options[1]) && c.correctIndex !== 1, 'the "layout" option is a distractor');
  assert.match(localize('en', c.explain), /narrows the meaning/);
});

// ---------------------------------------------------------------- dataset

test('the chart is the existing commute-methods dataset with the expected values (not a copy)', () => {
  assert.equal(chart.id, 'commute-methods');
  assert.deepEqual(chart.categories, ['Car', 'Bus', 'Bicycle', 'Train', 'Walking']);
  assert.deepEqual(chart.series.map((s) => s.name), ['2010', '2023']);
  assert.deepEqual(chart.series[0].values, [52, 24, 6, 11, 7]);
  assert.deepEqual(chart.series[1].values, [38, 21, 19, 15, 7]);
  assert.equal(chart.unit, '% of commuters');
  for (const id of ['read-chart', 'guided-analysis']) {
    const m = lesson.steps.find((s) => s.id === id)!.material;
    assert.ok(m && m.type === 'chart-board');
    assert.equal(m.dataset, CHART_DATASETS['commute-methods'], id);
  }
  assert.equal(lesson.finalPrompt.chartId, 'commute-methods');
});
test('the opening diagnostic says "five categories" (the dataset has five), never "six", and every stated count matches the chart', () => {
  const prompt = localize('en', lesson.steps.find((s) => s.id === 'intro')!.check!.prompt);
  assert.equal(chart.categories.length, 5);
  assert.match(prompt, /\bfive categories\b/);
  assert.ok(!/\bsix\b/i.test(prompt), prompt);
  assert.match(prompt, /\btwo years\b/);
  assert.equal(chart.series.length, 2);
  // Every "<number word> (different) (transport) categories/methods/forms" claim about the chart must be five.
  const counts = [...allText().matchAll(/\b(two|three|four|five|six|seven)\s+(?:different\s+)?(?:transport\s+)?(?:categories|methods|forms of transport)\b/gi)];
  const chartClaims = counts.filter((m) => !/first three categories/i.test(allText().slice(m.index! - 10, m.index! + m[0].length + 10)));
  for (const m of chartClaims) assert.equal(m[1].toLowerCase(), 'five', m[0]);
  assert.ok(chartClaims.length >= 3, `expected several category-count claims, saw ${chartClaims.length}`);
});
test('no second dataset is defined in the lesson file', () => {
  const src = readFileSync('lib/writing-studio/lessons/overview-writing.ts', 'utf8');
  assert.ok(!/values:\s*\[/.test(src) && !/categories:\s*\[/.test(src) && !/kind:\s*'(line|bar)'/.test(src));
});
test('the first chart-board in the lesson (reused by the standalone Visual Analysis Board page) is the chart-reading board', () => {
  const first = lesson.steps.find((s) => s.material?.type === 'chart-board')!;
  assert.equal(first.id, 'read-chart');
  const m = first.material!;
  assert.ok(m.type === 'chart-board' && m.tasks.length === 5);
});

// ---------------------------------------------------------------- pedagogy vs data

test('car leads in both years but decreases; bicycle has the largest increase (absolute and relative); walking is unchanged', () => {
  for (const y of ['2010', '2023'] as const) {
    assert.equal(chart.categories.slice().sort((a, b) => v(b, y) - v(a, y))[0], 'Car', y);
  }
  assert.ok(v('Car', '2023') < v('Car', '2010'));
  const abs = (c: string) => v(c, '2023') - v(c, '2010');
  const rel = (c: string) => abs(c) / v(c, '2010');
  assert.equal(chart.categories.slice().sort((a, b) => abs(b) - abs(a))[0], 'Bicycle');
  assert.equal(chart.categories.slice().sort((a, b) => rel(b) - rel(a))[0], 'Bicycle');
  assert.equal(abs('Walking'), 0);
  assert.ok(abs('Bus') < 0 && abs('Train') > 0, 'bus down, train up (so "all public transport increased" is false)');
  assert.equal(chart.categories.slice().sort((a, b) => v(a, '2010') - v(b, '2010'))[0], 'Bicycle', 'lowest in 2010');
});
test('every "<category> … N% in/to/from" figure quoted in the lesson agrees with the dataset (deliberately wrong "weak" examples excluded)', () => {
  const text = allText()
    .replace('Car use increased between 2010 and 2023.', '')
    .replace('Cars were 52% and then 38%. Bicycles were 6% and then 19%.', '');
  let checked = 0;
  for (const m of text.matchAll(/\b(car use|bicycle use|bus use|train use|walking)\b[^.\n]*?\bfrom (\d+)%[^.\n]*?\bto (\d+)%/gi)) {
    const cat = { 'car use': 'Car', 'bicycle use': 'Bicycle', 'bus use': 'Bus', 'train use': 'Train', walking: 'Walking' }[m[1].toLowerCase()]!;
    assert.equal(Number(m[2]), v(cat, '2010'), m[0]);
    assert.equal(Number(m[3]), v(cat, '2023'), m[0]);
    checked++;
  }
  for (const m of text.matchAll(/\b(Car|Bus|Bicycle|Train|Walking)(?: use)?:? (\d+)% then (\d+)%/g)) {
    assert.equal(Number(m[2]), v(m[1], '2010'), m[0]);
    assert.equal(Number(m[3]), v(m[1], '2023'), m[0]);
    checked++;
  }
  assert.ok(checked >= 8, `only ${checked} figure claims were checked`);
  for (const [cat, expected] of [['cars', 52], ['buses', 24], ['bicycles', 6], ['trains', 11], ['walking', 7]] as const) {
    assert.match(allText(), new RegExp(`${cat} were ${expected}%|${cat} was ${expected}%`, "i"), `Error 1 / data-dump figure for ${cat}`);
  }
});
test('"cycling was the least common" is only claimed for 2010 (walking is lowest in 2023)', () => {
  assert.equal(chart.categories.slice().sort((a, b) => v(a, '2023') - v(b, '2023'))[0], 'Walking');
  assert.ok(!/(?<!In 2010, cars were the dominant transport method, whereas )cycling was the least common/.test(allText()), 'unqualified "cycling was the least common"');
  assert.match(allText(), /In 2010, cars were the dominant transport method, whereas cycling was the least common\./);
});
test('the model overviews are accurate, cause-free, figure-light, and appear in the lesson / are safe to accept', () => {
  const text = allText();
  assert.ok(text.includes(MODEL_1));
  assert.ok(text.includes(MODEL_2));
  const causal = /\b(because|due to|owing to|as a result|thanks to|government|fuel|price|policy|policies|lanes?|caused|reason)\b/i;
  for (const m of [MODEL_1, MODEL_2, ONE_SENTENCE]) {
    assert.ok(!causal.test(m), m);
    assert.ok((m.match(/\d+%/g) ?? []).length === 0, `no figures in ${m}`);
  }
});
test('invented causes appear only inside deliberately flagged error examples', () => {
  for (const line of allText().split('\n').filter((l) => /government|fuel prices|cycle lanes/i.test(l))) {
    assert.match(line, /Weak:|Error 4|What is wrong|People increasingly chose bicycles|does not provide evidence|invent|reasons|Problem/i, line.slice(0, 120));
  }
});
test('no figures or claims contradict the chart: no wrong years, and "all forms of public transport" appears only as the flagged error', () => {
  const t = allText();
  for (const y of t.match(/\b(?:19|20)\d{2}\b/g) ?? []) assert.ok(['2010', '2023', '1990', '2020'].includes(y), y);
  for (const line of t.split('\n').filter((l) => /All forms of public transport became more popular/.test(l))) assert.match(line, /Error 5|Weak/);
});

// ---------------------------------------------------------------- final prompt / assessment scope

test('final prompt is an overview-only skill drill on the commute chart', () => {
  const f = lesson.finalPrompt;
  assert.equal(f.skillFocus, 'Task 1 overview feature selection and synthesis');
  assert.equal(f.checkScope, 'overview-only');
  assert.equal(f.chartId, 'commute-methods');
  assert.equal(f.minWords, 25);
  assert.equal(deriveScope(lesson), 'overview-only');
  const finalInstructions = localize('en', f.instructions);
  assert.match(finalInstructions, /approximately two sentences/);
  assert.match(finalInstructions, /do not need to write an introduction or body paragraphs/);
  assert.match(finalInstructions, /overview-only skill exercise/);
  assert.ok(!/150|full task|complete task 1 response|exactly two/i.test(finalInstructions), finalInstructions);
});

const drill = (t: string) => checkEssay(t, lesson.finalPrompt.minWords, 'task1', 'overview-only', true);

test('both model overviews get no mistakes, with or without "Overall"; no introduction/body/150-word/linker requirement', () => {
  for (const m of [MODEL_1, MODEL_2]) {
    const r = drill(m);
    assert.deepEqual(r.mistakes, [], `${m}: ${JSON.stringify(r.mistakes)}`);
  }
  assert.ok(!MODEL_2.toLowerCase().includes('overall'), 'the second model answer has no "Overall" and is still accepted');
});
test('a valid one-sentence overview is accepted: under the suggested length is only a neutral suggestion', () => {
  const r = drill(ONE_SENTENCE);
  assert.equal(r.mistakes.length, 0, JSON.stringify(r.mistakes));
  assert.equal(r.meetsLength, false);
  assert.ok(r.suggestions.some((s) => /Suggested length/.test(s)));
});
test('data dumping (3+ figures) is flagged; one or two figures are tolerated; no category is required', () => {
  assert.ok(drill('Car use was 52% in 2010 and 38% in 2023, bus use was 24% and 21%, and bicycle use was 6% and 19%.').mistakes.some((m) => /lists several individual figures/.test(m.why)));
  assert.ok(!drill(MODEL_1 + ' Car use fell from 52% to 38%.').mistakes.some((m) => /lists several/.test(m.why)));
  assert.equal(drill('Car use remained the most common method while cycling rose sharply over the period shown in the chart.').mistakes.length, 0, 'bus, train and walking need not be mentioned');
});
test('regressions: non-drill overview-only, Lesson 01/03 introduction-only and full scopes are unchanged by the drill flag', () => {
  assert.ok(checkEssay('The chart shows travel methods in a city.', 10, 'task1', 'overview-only').mistakes.some((m) => /dedicated overview/.test(m.why)));
  const intro = 'The bar chart compares the proportions of commuters travelling by five different forms of transport in one city in 2010 and 2023.';
  assert.deepEqual(checkEssay(intro, 18, 'task1', 'introduction-only', true), checkEssay(intro, 18, 'task1', 'introduction-only'));
  const full = 'Overall, car use fell. However, cycling rose, for example from 6% to 19%.';
  assert.deepEqual(checkEssay(full, 10, 'task1', 'full', true), checkEssay(full, 10, 'task1', 'full'));
});
test('earlier lessons keep their identity and drill configuration', () => {
  assert.equal(task1UnderstandingLesson.moduleId, 'task1-m1');
  assert.equal(visualInformationLesson.moduleId, 'task1-m2');
  assert.equal(visualInformationLesson.finalPrompt.checkScope, 'overview-only');
  assert.equal(task1IntroductionLesson.moduleId, 'task1-m3');
  assert.equal(task1IntroductionLesson.finalPrompt.checkScope, 'introduction-only');
  assert.equal(visualInformationLesson.steps.length, 15);
  assert.equal(task1IntroductionLesson.steps.length, 17);
});

// ---------------------------------------------------------------- progress safety

test('a drill attempt (band=null) completes the lesson but stores no band, and leaves other lessons/Task 2 progress alone', () => {
  const empty: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };
  const earlier = recordLesson(recordLesson(empty, 'task1-full-practice', 1, 6.5), 'task2-full-practice', 2, 7);
  const after = recordLesson(earlier, lesson.id, 1, null);
  assert.equal(after.lessons[lesson.id].bestBand, null);
  assert.equal(after.lessons[lesson.id].lastBand, null);
  assert.ok(after.lessons[lesson.id].completedAt);
  assert.deepEqual(after.lessons['task1-full-practice'], earlier.lessons['task1-full-practice']);
  assert.deepEqual(after.lessons['task2-full-practice'], earlier.lessons['task2-full-practice']);
  assert.deepEqual(after.practice, earlier.practice);
  assert.deepEqual(after.exams, earlier.exams);
});

console.log(`\n${passed} passed`);
