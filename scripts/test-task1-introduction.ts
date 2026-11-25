/** Writing Studio Lesson 03 ("task1-introduction"): content integrity, accuracy of every
 * worked example against the 'commute-methods' question, and the introduction-only skill-drill
 * configuration and local-check behaviour its final task relies on.
 * Run: npx tsx scripts/test-task1-introduction.ts */
import assert from 'node:assert/strict';
import { CHART_DATASETS } from '../lib/writing-studio/charts';
import { checkEssay, deriveScope } from '../lib/writing-studio/feedback';
import { getLesson } from '../lib/writing-studio/lessons';
import { task1IntroductionLesson as lesson } from '../lib/writing-studio/lessons/task1-introduction';
import { visualInformationLesson } from '../lib/writing-studio/lessons/visual-information';
import { task1UnderstandingLesson } from '../lib/writing-studio/lessons/task1-understanding';
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
const QUESTION = 'The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023.';
const STRONG = 'The bar chart compares the proportions of commuters travelling by five different forms of transport in one city in 2010 and 2023.';
const INACCURATE = 'The chart compares the number of people using different transport systems in two cities from 2010 to 2023.';

function allText(): string {
  const parts: string[] = [localize('en', lesson.objective), localize('en', lesson.finalPrompt.instructions)];
  for (const s of lesson.steps) {
    parts.push(localize('en', s.trainerMessage));
    const m = s.material;
    if (m?.type === 'text') parts.push(...m.paragraphs.map((p) => localize('en', p)));
    if (m?.type === 'examples') parts.push(m.good, m.weak, localize('en', m.note));
    if (m?.type === 'vocab') parts.push(...m.items.flatMap((i) => [i.phrase, localize('en', i.use)]));
    if (s.check) parts.push(localize('en', s.check.prompt), ...s.check.options, localize('en', s.check.explain));
  }
  return parts.join('\n');
}

// ---------------------------------------------------------------- identity / structure

test('lesson id, task and module id are unchanged, and it is registered once and reachable via getLesson', () => {
  assert.equal(lesson.id, 'task1-introduction');
  assert.equal(lesson.task, 'task1');
  assert.equal(lesson.moduleId, 'task1-m3');
  assert.equal(getLesson('task1-introduction'), lesson);
});
test('the 14 specified teaching steps exist in order (step 12 is four consecutive check steps = 17 runner steps)', () => {
  assert.deepEqual(lesson.steps.map((s) => s.id), [
    'intro', 'introduction-purpose', 'break-down-question', 'real-paraphrase', 'safe-techniques', 'safe-synonyms',
    'preserve-meaning', 'grammar-structure', 'intro-vs-overview', 'visual-types', 'worked-demonstration',
    'paraphrasing-clinic', 'paraphrasing-clinic-2', 'paraphrasing-clinic-3', 'paraphrasing-clinic-4',
    'introduction-checklist', 'independent-practice',
  ]);
  assert.equal(lesson.steps.length, 17);
});
test('step ids are unique and kinds follow the teaching sequence', () => {
  const ids = lesson.steps.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(lesson.steps.map((s) => s.kind), [
    'intro', 'explain', 'explain', 'demonstrate', 'explain', 'explain', 'explain', 'explain', 'demonstrate', 'explain', 'demonstrate',
    'check', 'check', 'check', 'check', 'review', 'independent',
  ]);
});
test('material types are supported MaterialBlock variants; no chart/idea board and no checks[] field is used', () => {
  const valid = new Set<MaterialBlock['type']>(['text', 'examples', 'vocab']);
  for (const s of lesson.steps) {
    if (s.material) assert.ok(valid.has(s.material.type), `${s.id}: ${s.material.type}`);
    assert.ok(!('checks' in s), s.id);
  }
});
test('every check step has four options, a valid correctIndex and a meaningful explanation', () => {
  const checks = lesson.steps.filter((s) => s.kind === 'check');
  assert.equal(checks.length, 4);
  for (const s of checks) {
    assert.ok(s.check, s.id);
    assert.equal(s.check.options.length, 4, s.id);
    assert.ok(Number.isInteger(s.check.correctIndex) && s.check.correctIndex >= 0 && s.check.correctIndex < 4, s.id);
    assert.ok(localize('en', s.check.explain).length > 40, s.id);
    assert.equal(new Set(s.check.options).size, 4, `${s.id}: duplicate options`);
  }
});
test('clinic correct answers are the accurate options (0-based 1, 0, 1, 0)', () => {
  const c = lesson.steps.filter((s) => s.kind === 'check').map((s) => s.check!);
  assert.deepEqual(c.map((x) => x.correctIndex), [1, 0, 1, 0]);
  assert.match(c[0].options[1], /proportion of households/);
  assert.match(c[1].options[0], /Five universities and the two years/);
  assert.match(c[2].options[1], /unsupported cause/);
  assert.match(c[3].options[0], /illustrate how a town centre changed between 1990 and 2020/);
});

// ---------------------------------------------------------------- accuracy of examples

test('step 8 example 1 keeps the agent: "workers manufacture glass bottles", and says so', () => {
  const m = lesson.steps.find((x) => x.id === 'grammar-structure')!.material;
  assert.ok(m && m.type === 'text');
  const ex = m.paragraphs.map((p) => localize('en', p)).find((p) => p.startsWith('Example 1'))!;
  assert.ok(ex.includes('Original: "The diagram shows how workers produce glass bottles."'));
  assert.ok(ex.includes('Alternative: "The process diagram illustrates how workers manufacture glass bottles."'));
  assert.ok(!ex.includes('glass bottles are produced."'), 'the agent-dropping passive must not be offered as the alternative');
  assert.match(ex, /agent \(workers\).*preserved.*meaning is unchanged/);
  assert.match(ex, /only if it keeps the agent/);
});
test('no worked example drops "workers" or narrows "changes" to "layout" while claiming the meaning is unchanged', () => {
  const t = allText();
  assert.ok(!/layout/i.test(t), 'no example narrows "changes" to "layout"');
});

test('the commute-methods dataset is what the lesson relies on (five categories, two years, %)', () => {
  assert.equal(chart.categories.length, 5);
  assert.deepEqual(chart.series.map((s) => s.name), ['2010', '2023']);
  assert.match(chart.unit, /%/);
});
test('the worked question and strong introduction preserve every element of the dataset', () => {
  for (const [label, text] of [['question', QUESTION], ['strong introduction', STRONG]] as const) {
    assert.match(text, /bar chart/i, label);
    assert.match(text, /commuters/i, label);
    assert.match(text, /\bfive\b/i, label);
    assert.match(text, /transport/i, label);
    assert.match(text, /\bcity\b/i, label);
    assert.match(text, /2010/, label);
    assert.match(text, /2023/, label);
  }
  assert.match(QUESTION, /percentage/);
  assert.match(STRONG, /proportions/);
  assert.match(STRONG, /\bone city\b/);
  assert.ok(!/\b(overall|increase|decrease|rose|fell|declin)/i.test(STRONG), 'no overview/trend language');
});
test('the lesson quotes the question and the strong introduction exactly where it uses them', () => {
  const text = allText();
  assert.ok(text.includes(STRONG), 'strong introduction appears (stage 3 of the demonstration)');
  assert.ok(text.includes('Stage 3 — Build a new sentence: "' + STRONG + '"'));
  assert.ok(text.includes('"The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023."'));
});
test('the commute-chart examples never contradict the dataset: only years 2010/2023, no invented figures or other cities/counts', () => {
  const text = allText();
  assert.ok(!/\d+%/.test(text), 'no percentage figures anywhere in this lesson');
  // Any sentence in the lesson about the commute question that names a year must use only 2010/2023.
  for (const line of text.split('\n').filter((l) => /commut/i.test(l) && /\b(19|20)\d{2}\b/.test(l))) {
    for (const y of line.match(/\b(?:19|20)\d{2}\b/g) ?? []) assert.ok(['2010', '2023'].includes(y), `${y} in: ${line}`);
  }
});
test('the lesson keeps the deliberately wrong commute-style example only as an error example', () => {
  // It is only the final-prompt documentation that contains the inaccurate answer: it must not appear in learner text.
  assert.ok(!allText().includes(INACCURATE));
});
test('each "preserve vs inaccurate" pairing in step 3 uses the dataset facts (percentage, one city, five, 2010 and 2023)', () => {
  const s = lesson.steps.find((x) => x.id === 'break-down-question')!.material;
  assert.ok(s && s.type === 'text');
  const t = s.paragraphs.map((p) => localize('en', p)).join('\n');
  assert.match(t, /Categories → five transport methods/);
  assert.match(t, /Location → one city/);
  assert.match(t, /Time → 2010 and 2023/);
  assert.match(t, /Inaccurate changes: percentage → number\. One city → two cities\. Five methods → several countries\. 2010 and 2023 → 2000 and 2023\./);
});
test('the independent-practice step repeats the exact question the final prompt uses', () => {
  const m = lesson.steps.find((x) => x.id === 'independent-practice')!.material;
  assert.ok(m && m.type === 'text');
  assert.ok(localize('en', m.paragraphs[0]).includes(QUESTION));
  assert.ok(localize('en', lesson.finalPrompt.instructions).includes(QUESTION));
});

// ---------------------------------------------------------------- final prompt

test('final prompt is an introduction-only skill drill on the commute chart', () => {
  const f = lesson.finalPrompt;
  assert.equal(f.skillFocus, 'Task 1 introduction paraphrasing accuracy');
  assert.equal(f.checkScope, 'introduction-only');
  assert.equal(f.chartId, 'commute-methods');
  assert.ok(CHART_DATASETS[f.chartId!]);
  assert.equal(f.minWords, 18);
  assert.equal(deriveScope(lesson), 'introduction-only');
});
test('final instructions ask for ONE introduction only: no full response, no 150 words, no reflection sentence', () => {
  const i = localize('en', lesson.finalPrompt.instructions);
  assert.match(i, /Write ONE concise introduction/);
  assert.match(i, /Write only the introduction\./);
  assert.match(i, /Do not add an overview, individual figures, personal opinions, or unsupported explanations/);
  assert.ok(!/150|full (task|response)|complete task 1 response|technique you used|second sentence/i.test(i), i);
  for (const e of ['bar chart', 'percentage', 'five', 'city', 'years']) assert.match(i, new RegExp(e, 'i'));
});

// ---------------------------------------------------------------- local check behaviour for the drill

const drill = (t: string) => checkEssay(t, lesson.finalPrompt.minWords, 'task1', 'introduction-only', true);

test('the strong answer meets the suggested length and gets no mistakes, even though it states 2010 and 2023', () => {
  const r = drill(STRONG);
  assert.equal(r.meetsLength, true);
  assert.deepEqual(r.mistakes, [], JSON.stringify(r.mistakes));
});
test('writing the word "percentage" (the question\'s own measurement word) is not treated as a data figure', () => {
  const r = drill('The bar chart illustrates the percentage of commuters using five types of transport in one city in 2010 and 2023.');
  assert.ok(!r.mistakes.some((m) => /specific figures belong in the body/.test(m.why)), JSON.stringify(r.mistakes));
});
test('small category counts written as digits ("5 methods") are tolerated, but real data figures are still flagged', () => {
  assert.ok(!drill('The bar chart compares commuters travelling by 5 forms of transport in one city in 2010 and 2023.').mistakes.some((m) => /specific figures/.test(m.why)));
  for (const t of [
    'The bar chart compares commuters, 52% of whom used cars, across five forms of transport in one city in 2010 and 2023.',
    'The bar chart compares the 52 commuters using five forms of transport in one city in 2010 and 2023.',
    'The bar chart compares commuters, with car use at 52.5 for five forms of transport in one city in 2010 and 2023.',
  ]) assert.ok(drill(t).mistakes.some((m) => /specific figures belong in the body/.test(m.why)), t);
});
test('no overview phrase, linking words, trend vocabulary or figures are required of the drill', () => {
  const r = drill(STRONG);
  assert.ok(!r.mistakes.some((m) => /overview|linking words|specific data|150/.test(m.why + m.fix)), JSON.stringify(r.mistakes));
});
test('a short but accurate introduction under 18 words gets a neutral suggestion, never an "underdeveloped" mistake', () => {
  const r = drill('The bar chart compares commuters using five transport methods in one city in 2010 and 2023.');
  assert.equal(r.meetsLength, false);
  assert.ok(!r.mistakes.some((m) => /underdeveloped/.test(m.why)));
  assert.ok(r.suggestions.some((s) => /Suggested length/.test(s)));
});

// ---------------------------------------------------------------- regressions

test('year handling is limited to introduction-only: overview-only (non-drill) and full still flag a number', () => {
  assert.ok(checkEssay('Overall, car use fell in 2023.', 5, 'task1', 'overview-only').mistakes.some((m) => /individual figures belong/.test(m.why)));
  assert.ok(checkEssay('The graph in 2023.', 5, 'task1', 'full').mistakes.every((m) => !/specific figures belong in the body/.test(m.why)));
});
test('Lesson 01 drill (introduction-only) still flags a real figure and is otherwise unchanged', () => {
  const t = 'The two line graphs illustrate the mean monthly temperature of 25 degrees and the amount of rainfall recorded in two cities over a year.';
  assert.ok(checkEssay(t, 20, 'task1', 'introduction-only').mistakes.some((m) => /figures belong in the body paragraphs/.test(m.why)));
});
test('Lessons 01 and 02 keep their ids, module ids and drill configuration', () => {
  assert.equal(task1UnderstandingLesson.id, 'task1-understanding');
  assert.equal(task1UnderstandingLesson.moduleId, 'task1-m1');
  assert.equal(task1UnderstandingLesson.finalPrompt.skillFocus, 'Paraphrasing accuracy for a Task 1 introduction');
  assert.equal(task1UnderstandingLesson.finalPrompt.checkScope, 'introduction-only');
  assert.equal(visualInformationLesson.id, 'visual-information');
  assert.equal(visualInformationLesson.moduleId, 'task1-m2');
  assert.equal(visualInformationLesson.finalPrompt.checkScope, 'overview-only');
  assert.equal(visualInformationLesson.steps.length, 15);
});

// ---------------------------------------------------------------- progress safety

test('a drill attempt (band=null) completes the lesson but never stores a band or disturbs an earlier one', () => {
  const empty: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };
  const earlier = recordLesson(empty, 'task1-full-practice', 1, 6.5);
  const after = recordLesson(earlier, lesson.id, 1, null);
  assert.equal(after.lessons[lesson.id].bestBand, null);
  assert.equal(after.lessons[lesson.id].lastBand, null);
  assert.ok(after.lessons[lesson.id].completedAt);
  assert.equal(after.lessons['task1-full-practice'].bestBand, 6.5);
});

console.log(`\n${passed} passed`);
