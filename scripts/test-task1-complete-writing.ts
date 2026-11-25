/** Writing Studio Lesson 07 ("task1-complete-writing", module task1-m7, "Complete Task 1 Writing"):
 * identity and registration, curriculum completeness, answer keys (checked against option CONTENT),
 * answer-position distribution, factual consistency with the 'commute-methods' dataset, and the FULL
 * Task 1 final-assessment configuration (no skill-drill scope, no band suppression). The server's
 * full-task prompt is tested in scripts/test-assess.ts.
 * Run: npx tsx scripts/test-task1-complete-writing.ts */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CHART_DATASETS } from '../lib/writing-studio/charts';
import { TASK1_MODULES, TASK1_VISUALS, TASK2_MODULES } from '../lib/writing-studio/content';
import { checkEssay, deriveScope } from '../lib/writing-studio/feedback';
import { LESSONS, getLesson } from '../lib/writing-studio/lessons';
import { task1CompleteWritingLesson as lesson } from '../lib/writing-studio/lessons/task1-complete-writing';
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
const val = (c: string, y: '2010' | '2023') => chart.series.find((s) => s.name === y)!.values[chart.categories.indexOf(c)];
const pp = (c: string) => val(c, '2023') - val(c, '2010');
const rel = (c: string) => (pp(c) / val(c, '2010')) * 100;

const textOf = (id: string) => {
  const m = lesson.steps.find((s) => s.id === id)!.material;
  assert.ok(m && m.type === 'text', `${id} has text material`);
  // 'complete-response' is the English model essay itself — always read its
  // English form, whether or not this step's material is later localized.
  return m.paragraphs.map((p) => localize('en', p));
};
const MODEL = textOf('complete-response').slice(0, 4);
const MODEL_TEXT = MODEL.join('\n\n');

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

// ---------------------------------------------------------------- identity / registration

test('identity: id task1-complete-writing, module task1-m7, task1, export task1CompleteWritingLesson, registered exactly once', () => {
  assert.equal(lesson.id, 'task1-complete-writing');
  assert.equal(lesson.moduleId, 'task1-m7');
  assert.equal(lesson.task, 'task1');
  assert.equal(localize('en', lesson.title), 'Complete Task 1 Writing');
  assert.equal(getLesson('task1-complete-writing'), lesson);
  assert.equal(Object.values(LESSONS).filter((l) => l === lesson).length, 1, 'registered once');
  assert.equal(Object.values(LESSONS).filter((l) => l.id === 'task1-complete-writing').length, 1);
  assert.equal(Object.keys(LESSONS).filter((k) => k === 'task1-complete-writing').length, 1);
  assert.equal(Object.values(LESSONS).filter((l) => l.moduleId === 'task1-m7').length, 1, 'no duplicate Module 7 lesson');
  const src = readFileSync('lib/writing-studio/lessons/index.ts', 'utf8');
  assert.equal(src.split('task1CompleteWritingLesson').length - 1, 3, 'one import, one registry entry (the key and value on one line)');
});
test('the existing capstone lesson is untouched and still separate (task1-full-practice, task1-m8)', () => {
  const full = getLesson('task1-full-practice')!;
  assert.equal(full.moduleId, 'task1-m8');
  assert.equal(full.finalPrompt.skillFocus, undefined);
  assert.notEqual(full, lesson);
});

// ---------------------------------------------------------------- Academy integration

test('Academy: exactly seven Task 1 cards, numbered 1-7, with the seventh being Complete Task 1 Writing -> task1-complete-writing', () => {
  assert.equal(TASK1_MODULES.length, 7);
  assert.deepEqual(TASK1_MODULES.map((m) => m.number), [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(TASK1_MODULES.map((m) => m.id), ['task1-m1', 'task1-m2', 'task1-m3', 'task1-m4', 'task1-m5', 'task1-m6', 'task1-m7']);
  const seventh = TASK1_MODULES[6];
  assert.equal(seventh.id, 'task1-m7');
  assert.equal(seventh.number, 7);
  assert.equal(localize('en', seventh.title), 'Complete Task 1 Writing');
  assert.equal(seventh.builtLessonId, 'task1-complete-writing');
  const seventhDescription = localize('en', seventh.description);
  assert.match(seventhDescription, /analysis/i);
  assert.match(seventhDescription, /introduction/);
  assert.match(seventhDescription, /overview/);
  assert.match(seventhDescription, /body paragraphs/);
  assert.match(seventhDescription, /language/);
  assert.match(seventhDescription, /complete, coherent response/);
  assert.equal(new Set(TASK1_MODULES.map((m) => m.id)).size, 7);
  assert.equal(TASK1_MODULES.filter((m) => localize('en', m.title) === 'Complete Task 1 Writing').length, 1, 'no second "Complete Task 1 Writing" card');
});
test('Academy: the first six cards are unchanged', () => {
  assert.deepEqual(
    TASK1_MODULES.slice(0, 6).map((m) => [m.id, m.number, localize('en', m.title), m.builtLessonId]),
    [
      ['task1-m1', 1, 'Understanding IELTS Writing Task 1', 'task1-understanding'],
      ['task1-m2', 2, 'Understanding Visual Information', 'visual-information'],
      ['task1-m3', 3, 'Introduction Writing', 'task1-introduction'],
      ['task1-m4', 4, 'Overview Mastery', 'overview-writing'],
      ['task1-m5', 5, 'Body Paragraph Development', 'body-paragraphs'],
      ['task1-m6', 6, 'Vocabulary and Grammar for Task 1', 'task1-vocab-grammar'],
    ],
  );
});
test('Academy: every card points at a registered lesson of the same module, and no card points at task1-full-practice', () => {
  for (const m of TASK1_MODULES) {
    assert.ok(m.builtLessonId, `${m.id} has a built lesson`);
    const l = getLesson(m.builtLessonId!)!;
    assert.ok(l, `${m.id} -> ${m.builtLessonId} is registered`);
    assert.equal(l.moduleId, m.id, `${m.id} card and lesson agree on the module id`);
  }
  assert.ok(!TASK1_MODULES.some((m) => m.builtLessonId === 'task1-full-practice'), 'the old capstone has no Academy card');
  assert.ok(!TASK1_MODULES.some((m) => m.id === 'task1-m8'), 'no module 8 card');
});
test('Academy: the old capstone lesson is still registered (unchanged) for backwards compatibility', () => {
  const old = getLesson('task1-full-practice')!;
  assert.ok(old);
  assert.equal(old.id, 'task1-full-practice');
  assert.equal(old.moduleId, 'task1-m8');
  assert.equal(localize('en', old.title), 'Putting a Full Response Together');
  assert.equal(old.finalPrompt.minWords, 150);
  assert.equal(Object.values(LESSONS).filter((l) => l.id === 'task1-full-practice').length, 1);
});
test('Academy: Task 2 modules and the visual training areas are unchanged', () => {
  assert.equal(TASK2_MODULES.length, 9);
  assert.deepEqual(TASK2_MODULES.map((m) => m.number), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.equal(TASK1_VISUALS.length, 7);
  assert.deepEqual(TASK1_VISUALS.map((v) => v.id), ['line-graphs', 'bar-charts', 'pie-charts', 'tables', 'mixed-charts', 'maps', 'process-diagrams']);
  assert.equal(TASK1_VISUALS.find((v) => v.id === 'line-graphs')!.builtLessonId, 'overview-writing');
});
test('Academy: the curriculum comment no longer refers to "Modules 1-6 + 8"', () => {
  const src = readFileSync('lib/writing-studio/content.ts', 'utf8');
  assert.ok(!/Modules 1–6 \+ 8|Modules 1-6 \+ 8|Module 7's seven/.test(src), 'stale curriculum comment removed');
  assert.match(src, /seven modules, numbered 1-7/);
  assert.match(src, /'task1-complete-writing' lesson/);
});

// ---------------------------------------------------------------- curriculum completeness

test('curriculum: introduction, overview, both body paragraphs, full demonstration, guided A-D, six clinic checks, self-review and reflection all exist, in order', () => {
  assert.deepEqual(lesson.steps.map((s) => s.id), [
    'welcome', 'complete-structure', 'task-analysis', 'planning', 'introduction', 'overview', 'body-1', 'body-2', 'complete-response',
    'time-and-words', 'common-problems', 'guided-practice', 'clinic', 'clinic-2', 'clinic-3', 'clinic-4', 'clinic-5', 'clinic-6',
    'self-review', 'reflection', 'independent-practice',
  ]);
  assert.ok(lesson.steps.length >= 20 && lesson.steps.length <= 24);
  assert.equal(new Set(lesson.steps.map((s) => s.id)).size, lesson.steps.length);
  assert.equal(lesson.steps[lesson.steps.length - 1].kind, 'independent');
  assert.ok(lesson.estMinutes >= 45 && lesson.estMinutes <= 60);
  const valid = new Set<MaterialBlock['type']>(['text', 'examples', 'vocab', 'chart-board']);
  for (const s of lesson.steps) {
    if (s.material) assert.ok(valid.has(s.material.type), `${s.id}: ${s.material.type}`);
    assert.ok(!('checks' in s), s.id);
  }
});
test('guided practice A-D: four chart-board tasks on the shared dataset, tagged introduction / overview / body / body, with model answers', () => {
  const m = lesson.steps.find((s) => s.id === 'guided-practice')!.material;
  assert.ok(m && m.type === 'chart-board');
  assert.equal(m.dataset, CHART_DATASETS['commute-methods']);
  assert.deepEqual(m.tasks.map((t) => t.id), ['task-a-introduction', 'task-b-overview', 'task-c-car-bus', 'task-d-bicycle-train-walking']);
  assert.deepEqual(m.tasks.map((t) => t.belongsIn), ['introduction', 'overview', 'body', 'body']);
  assert.deepEqual(m.tasks.map((t) => t.order), [1, 2, 3, 4]);
  const a = Object.fromEntries(m.tasks.map((t) => [t.id, t.modelAnswer]));
  assert.match(a['task-a-introduction'], /bar chart.*proportions of commuters.*five different forms of transport.*a city in 2010 and 2023/);
  assert.match(a['task-b-overview'], /car use remained the most common.*bicycle use recorded the most notable increase.*Walking was the only category that remained unchanged/);
  assert.match(a['task-c-car-bus'], /52% to 38%.*14 percentage points.*24% to 21%/);
  assert.match(a['task-d-bicycle-train-walking'], /6% to 19%.*13 percentage points.*11% to 15%.*7% in both years/);
  for (const t of m.tasks) assert.ok(localize('en', t.prompt).length > 20 && t.modelAnswer.length > 20, t.id);
});
test('no arbitrary rules are imposed: no mandatory "Overall", no fixed sentence/paragraph counts, no linking-word quota', () => {
  const t = allText();
  assert.match(t, /no mandatory phrase such as "Overall", and no universal rule that an overview must contain exactly two sentences/);
  assert.match(t, /not a rigid template/);
  assert.match(t, /not the only acceptable answer/);
  assert.ok(!/\b(every|each) (response|overview|paragraph|body paragraph) (must|should) (always )?(use|contain|include|have)\b/i.test(t), 'no universal "must" rule');
  assert.ok(!/must (use|include|start with) "?Overall/i.test(t));
  assert.ok(!/exactly (two|three|four|\d+) (sentences|paragraphs)/i.test(t.replace('must contain exactly two sentences', '')));
  assert.ok(!/at least (two|three|\d+) linking/i.test(t));
});

// ---------------------------------------------------------------- answer keys: by CONTENT

const IDS = ['welcome', 'task-analysis', 'planning', 'introduction', 'overview', 'body-1', 'body-2', 'time-and-words', 'common-problems', 'clinic', 'clinic-2', 'clinic-3', 'clinic-4', 'clinic-5', 'clinic-6'];
const ROLES: Record<string, { correct: RegExp; wrong: RegExp[] }> = {
  welcome: { correct: /^Select the most important features, summarise the overall picture and support it with relevant data\.$/, wrong: [/^Describe every number/, /^Use as many advanced vocabulary words/] },
  'task-analysis': { correct: /^Bicycle use increased by 13 percentage points\.$/, wrong: [/^Bicycle use increased by 13%\.$/, /most popular transport method in 2023/] },
  planning: { correct: /^It helps select, group and organise information before writing\.$/, wrong: [/^It guarantees a Band 8/, /^It allows you to avoid using figures/] },
  introduction: { correct: /^The bar chart compares the proportions of commuters using five transport methods in one city in 2010 and 2023\.$/, wrong: [/vehicles sold in five countries/, /predicts how transport will change/] },
  overview: { correct: /^Overall, car use remained the most popular method despite declining, whereas bicycle use increased considerably and walking remained stable\.$/, wrong: [/car use was 52% in 2010, bus use was 24%/, /every transport method became more popular/] },
  'body-1': { correct: /^Car use decreased by 14 percentage points, from 52% to 38%\.$/, wrong: [/^Car use increased by 14 percentage points/, /^Car use decreased by 14% from/] },
  'body-2': { correct: /^Bicycle use increased steadily throughout the entire period\.$/, wrong: [/^Train use increased from 11% to 15%/, /^Walking remained at 7% in both recorded years/] },
  'time-and-words': { correct: /^150 words\.$/, wrong: [/^100 words/, /^200 words/] },
  'common-problems': { correct: /^The response lacks a clear summary of the main features\.$/, wrong: [/introduction is automatically invalid/, /too many paragraphs/] },
  clinic: { correct: /^The dominant category and the most notable change/, wrong: [/^The exact figure for every category/, /^A sentence explaining why commuters/] },
  'clinic-2': { correct: /^A 13-percentage-point increase is the arithmetic gap between the two percentages \(19 − 6\), whereas a 216\.7% relative increase compares that gap with the starting figure \(13 ÷ 6\)\.$/, wrong: [/two names for the same calculation/, /One applies to bicycle use and the other applies to car use/] },
  'clinic-3': { correct: /^Both declined between 2010 and 2023, so their changes can be compared directly\.$/, wrong: [/^Both were the lowest categories in 2010/, /^Both remained unchanged/] },
  'clinic-4': { correct: /^Past simple reports completed changes between 2010 and 2023, while present simple describes what the chart shows now\.$/, wrong: [/^Because tense does not matter/, /^Because every verb in a Task 1 response must be in the same tense/] },
  'clinic-5': { correct: /^The chart gives only two time points, so it shows nothing about how the change developed between them\.$/, wrong: [/^Because bicycle use did not increase/, /always an incorrect word/] },
  'clinic-6': { correct: /^Add relevant figures and comparisons that develop the overview's main points\.$/, wrong: [/^Delete the body paragraph and add a conclusion/, /^Repeat the overview more strongly/] },
};
test('there are 15 checks: 9 teaching checks and the 6 clinic checks, and nothing else carries a check', () => {
  assert.deepEqual(lesson.steps.filter((s) => s.check).map((s) => s.id), IDS);
  assert.deepEqual(Object.keys(ROLES).sort(), IDS.slice().sort());
  assert.equal(lesson.steps.filter((s) => s.kind === 'check').length, 6, 'six clinic check steps');
});
test('answer keys follow the CONTENT: the option at correctIndex is the correct one; every other option is a known distractor', () => {
  for (const id of IDS) {
    const c = lesson.steps.find((s) => s.id === id)!.check!;
    const { correct, wrong } = ROLES[id];
    assert.equal(c.options.length, 3, `${id}: three options`);
    assert.equal(new Set(c.options).size, 3, `${id}: distinct options`);
    assert.ok(Number.isInteger(c.correctIndex) && c.correctIndex >= 0 && c.correctIndex < 3, id);
    assert.equal(c.options.filter((o) => correct.test(o)).length, 1, `${id}: exactly one correct option`);
    c.options.forEach((o, i) => {
      const isCorrect = correct.test(o);
      assert.equal(i === c.correctIndex, isCorrect, `${id}: option ${i} ("${o}") — correctIndex points at the wrong option`);
      assert.equal(wrong.filter((w) => w.test(o)).length, isCorrect ? 0 : 1, `${id}: option ${i} ("${o}") must be exactly one known distractor`);
    });
    assert.ok(localize('en', c.explain).length > 40, `${id}: explanation`);
  }
});
test('the specified answer meaning is kept: each of the spec\'s letter keys maps to the same correct content after balancing', () => {
  const spec: Record<string, string> = { welcome: 'B', 'task-analysis': 'A', planning: 'B', introduction: 'B', overview: 'B', 'body-1': 'B', 'body-2': 'C', 'time-and-words': 'B', 'common-problems': 'B' };
  for (const id of Object.keys(spec)) {
    const c = lesson.steps.find((s) => s.id === id)!.check!;
    assert.ok(ROLES[id].correct.test(c.options[c.correctIndex]), id);
  }
});
test('answer positions are balanced (computed from the data): no position over 6, each used 4+ times, no 3 in a row', () => {
  const keys = lesson.steps.filter((s) => s.check).map((s) => s.check!.correctIndex);
  assert.equal(keys.length, 15);
  const counts = [0, 1, 2].map((p) => keys.filter((k) => k === p).length);
  assert.ok(counts.every((n) => n <= 6 && n >= 4), `unbalanced: ${counts}`);
  assert.equal(counts[0] + counts[1] + counts[2], 15);
  for (let i = 2; i < keys.length; i++) assert.ok(!(keys[i] === keys[i - 1] && keys[i] === keys[i - 2]), `three identical keys in a row at ${i - 2}-${i}`);
});
test('explanations identify answers by CONTENT, never by position, and give each answer the right verdict', () => {
  for (const id of IDS) {
    const c = lesson.steps.find((s) => s.id === id)!.check!;
    const explain = localize('en', c.explain);
    assert.ok(!/\b(first|second|third|fourth|last)\b/i.test(explain), `${id}: positional wording in "${explain}"`);
    assert.ok(!/\boption [a-d0-9]\b/i.test(explain), `${id}: option-letter wording`);
  }
  const ex = (id: string) => localize('en', lesson.steps.find((s) => s.id === id)!.check!.explain);
  assert.match(ex('task-analysis'), /19 − 6 = 13 percentage points/);
  assert.match(ex('task-analysis'), /216\.7%/);
  assert.match(ex('overview'), /data dumping/);
  assert.match(ex('overview'), /"every transport method became more popular" is false/);
  assert.match(ex('body-1'), /26\.9%/);
  assert.match(ex('body-2'), /Only two time points/);
  assert.match(ex('clinic-3'), /Car was actually the highest category in 2010/);
  assert.match(ex('clinic-5'), /Bicycle use did increase \(6% to 19%\)/);
  assert.match(ex('clinic-4'), /Tense does matter/);
});
test('the facts behind the answers and distractors hold in the dataset', () => {
  assert.equal(pp('Bicycle'), 13); assert.equal(pp('Car'), -14);
  assert.ok(Math.abs(rel('Bicycle') - 216.7) < 0.05); assert.ok(Math.abs(Math.abs(rel('Car')) - 26.9) < 0.05);
  assert.equal(chart.categories.slice().sort((a, b) => val(b, '2023') - val(a, '2023'))[0], 'Car', 'car is still largest in 2023 (so bicycle is not the most popular)');
  assert.equal(chart.categories.slice().sort((a, b) => val(b, '2010') - val(a, '2010'))[0], 'Car', 'car was highest in 2010 (clinic-3 distractor false)');
  assert.ok(pp('Car') < 0 && pp('Bus') < 0, 'car and bus both declined (clinic-3 correct)');
  assert.equal(pp('Walking'), 0);
  assert.ok(chart.categories.filter((c) => pp(c) === 0).length === 1, 'walking is the ONLY unchanged category');
  assert.ok(!chart.categories.every((c) => pp(c) > 0), '"every method became more popular" is false');
});

// ---------------------------------------------------------------- dataset / accuracy

test('the chart is the existing commute-methods dataset (not a copy) and no second dataset is defined', () => {
  assert.equal(chart.id, 'commute-methods');
  assert.deepEqual(chart.categories, ['Car', 'Bus', 'Bicycle', 'Train', 'Walking']);
  assert.deepEqual(chart.series.map((s) => [s.name, s.values]), [['2010', [52, 24, 6, 11, 7]], ['2023', [38, 21, 19, 15, 7]]]);
  assert.equal(chart.unit, '% of commuters');
  assert.equal(lesson.finalPrompt.chartId, 'commute-methods');
  const src = readFileSync('lib/writing-studio/lessons/task1-complete-writing.ts', 'utf8');
  assert.ok(!/values:\s*\[/.test(src) && !/categories:\s*\[/.test(src), 'no second dataset in the lesson file');
});
test('every "<category> … from X% [in Y] to Z% [in Y]" claim and every listed figure agrees with the dataset', () => {
  const text = allText();
  let n = 0;
  for (const m of text.matchAll(/\b(car use|bicycle use|bus use|train use)\b[^.\n]*?\bfrom (\d+)%(?: in (\d{4}))?[^.\n]*? to (\d+)%(?: in (\d{4}))?/gi)) {
    const cat = { 'car use': 'Car', 'bicycle use': 'Bicycle', 'bus use': 'Bus', 'train use': 'Train' }[m[1].toLowerCase()]!;
    assert.equal(Number(m[2]), val(cat, '2010'), m[0]);
    assert.equal(Number(m[4]), val(cat, '2023'), m[0]);
    if (m[3]) assert.equal(m[3], '2010', m[0]);
    if (m[5]) assert.equal(m[5], '2023', m[0]);
    n++;
  }
  assert.ok(n >= 10, `only ${n} claims checked`);
  for (const m of text.matchAll(/\b(Car|Bus|Bicycle|Train|Walking):? (\d+)%(?: in 2010)?,? (?:and|then) (?:in 2023,? )?(\d+)%/g)) {
    assert.equal(Number(m[2]), val(m[1], '2010'), m[0]);
    assert.equal(Number(m[3]), val(m[1], '2023'), m[0]);
  }
  assert.match(text, /Car: 52% in 2010, 38% in 2023\. Bus: 24% and 21%\. Bicycle: 6% and 19%\. Train: 11% and 15%\. Walking: 7% and 7%/);
  assert.match(text, /Car: 52% then 38%\. Bus: 24% then 21%\. Bicycle: 6% then 19%\. Train: 11% then 15%\. Walking: 7% then 7%/);
});
test('percentage-point and relative-change figures: 14, 13, 28 and 17 are the verified ones; relative figures are 216.7% and 26.9%; "13%" and "14%" appear only as flagged errors', () => {
  const text = allText();
  for (const m of text.matchAll(/(\d+(?:\.\d+)?)[ -]percentage[ -]points?/g)) assert.ok(['14', '13', '28', '17'].includes(m[1]), m[0]);
  assert.equal(val('Car', '2010') - val('Bus', '2010'), 28);
  assert.equal(val('Car', '2023') - val('Bus', '2023'), 17);
  assert.ok(28 > 17, '"narrowed" is true');
  for (const m of text.matchAll(/approximately (\d+(?:\.\d+)?)%/g)) assert.ok(['216.7', '26.9'].includes(m[1]), m[0]);
  const wrong = [...text.split('\n')].filter((l) => /(increased|decreased|rose|fell) by (13|14)%/.test(l));
  const WRONG_OPTIONS = new Set(lesson.steps.flatMap((s) => (s.check ? s.check.options.filter((_, i) => i !== s.check!.correctIndex) : [])));
  for (const l of wrong) assert.ok(WRONG_OPTIONS.has(l) || /would wrongly|would mix|for a rise|"increased by 13%"|"14%"/.test(l), `"13%/14%" used outside an error context: ${l.slice(0, 140)}`);
});
test('no unsupported pace claim: "steadily" appears only as the flagged error, and no pace word describes a commute figure in a model sentence', () => {
  const pace = /\b(gradually|steadily|progressively|rapidly|sharply|steeply|dramatically)\b/i;
  for (const l of allText().split('\n').filter((x) => pace.test(x))) {
    assert.match(l, /steadily/i, `unexpected pace word: ${l.slice(0, 140)}`);
    assert.match(l, /Bicycle use increased steadily throughout the entire period|bicycle use increased steadily|"Steadily"|"Steadily throughout the entire period"|steadily".*describes|describes how the change developed|word is fine when yearly data supports it|Unsupported|unsupported|Bicycle use did increase/i, `"steadily" outside a flagged context: ${l.slice(0, 140)}`);
  }
  for (const p of MODEL) assert.ok(!pace.test(p), `pace word in the model response: ${p}`);
  assert.match(allText(), /Only two time points are provided, so the chart does not show what happened between them/);
});
test('the model complete response is accurate, coherent and within the stated word guidance (>= 150, target 160-190)', () => {
  assert.equal(MODEL.length, 4, 'introduction, overview, body 1, body 2');
  const words = MODEL_TEXT.split(/\s+/).length;
  assert.ok(words >= 150, `model response must meet the 150-word minimum it teaches: ${words}`);
  assert.ok(words >= 160 && words <= 190, `model response should sit in the suggested 160-190 range: ${words}`);
  const [intro, overview, b1, b2] = MODEL;
  assert.match(intro, /bar chart/); assert.match(intro, /proportions of commuters/); assert.match(intro, /five different forms of transport/); assert.match(intro, /2010 and 2023/);
  assert.ok(!/\d+%/.test(intro) && !/Overall/.test(intro), 'no figures or overview in the introduction');
  assert.match(overview, /car use remained the most common/); assert.match(overview, /bicycle use recorded the most notable increase/); assert.match(overview, /Walking was the only category that remained unchanged/);
  assert.ok(!/\d+%/.test(overview), 'no figures in the overview');
  assert.match(b1, /Car use fell from 52% in 2010 to 38% in 2023, a decrease of 14 percentage points/);
  assert.match(b1, /Bus use also decreased[^.]*falling from 24% to 21%/);
  assert.match(b1, /gap between car and bus use narrowed from 28 percentage points in 2010 to 17 in 2023/);
  assert.match(b2, /bicycle use rose markedly from 6% to 19%, an increase of 13 percentage points/);
  assert.match(b2, /overtook train use, which had been higher in 2010/);
  assert.match(b2, /Train use also grew, moving from 11% to 15%/);
  assert.match(b2, /walked remained unchanged at 7% in both years/);
  // the facts behind the sentences
  assert.ok(val('Train', '2010') > val('Bicycle', '2010') && val('Bicycle', '2023') > val('Train', '2023'), 'bicycle overtook train');
  assert.ok(val('Car', '2023') > Math.max(...['Bus', 'Bicycle', 'Train', 'Walking'].map((c) => val(c, '2023'))), 'car considerably ahead in 2023');
  assert.ok(Math.abs(pp('Bus')) < Math.abs(pp('Car')), 'bus change was smaller');
  assert.ok(!/because|due to|owing to|as a result of|policy|government|fuel|will |predict|forecast/i.test(MODEL_TEXT), 'no invented causes or predictions in the model');
  // sections 6 and 7 teach the same body paragraphs the complete answer contains
  assert.ok(textOf('body-1')[0].includes(b1) && textOf('body-2')[0].includes(b2));
});
test('the model response passes the local full-task checks with no mistakes (past simple for changes, one coherent report)', () => {
  const r = checkEssay(MODEL_TEXT, 150, 'task1', 'full');
  assert.deepEqual(r.mistakes, [], JSON.stringify(r.mistakes));
  assert.equal(r.meetsLength, true);
});
test('time allocation adds up to the 20 minutes the lesson teaches', () => {
  assert.match(textOf('time-and-words')[0], /analyse and plan — 3 minutes; introduction — 2 minutes; overview — 3 minutes; body paragraphs — 9 minutes; review — 3 minutes/);
  assert.equal(3 + 2 + 3 + 9 + 3, 20);
  assert.match(localize('en', lesson.steps.find((s) => s.id === 'time-and-words')!.trainerMessage), /at least 150 words.*160–190/);
});

// ---------------------------------------------------------------- final assessment: FULL Task 1

test('the final exercise is a full Task 1 assessment: scope full, chart commute-methods, 150 words, no skillFocus (so no skill-drill scope or band suppression)', () => {
  const f = lesson.finalPrompt;
  assert.equal(f.chartId, 'commute-methods');
  assert.equal(f.minWords, 150);
  assert.equal(f.checkScope, 'full');
  assert.equal(deriveScope(lesson), 'full');
  assert.equal(f.skillFocus, undefined, 'a leftover skillFocus would suppress the band');
  assert.ok(!('skillFocus' in f) || f.skillFocus === undefined);
  assert.notEqual(f.checkScope, 'paragraph-only'); assert.notEqual(f.checkScope, 'overview-only'); assert.notEqual(f.checkScope, 'introduction-only');
  const i = localize('en', f.instructions);
  for (const must of [/introduction/, /overview/, /supporting details/, /meaningful comparisons/, /accurately/, /about 20 minutes/, /at least 150 words/, /160–190/, /Do not explain why the figures changed/, /do not copy the model answer/]) assert.match(i, must);
  assert.match(i, /The chart below compares the percentages of commuters who used five different methods of transport in one city in 2010 and 2023\./);
  assert.ok(!/exactly|\b(two|three|four) paragraphs\b|fixed number/i.test(i), 'no fixed paragraph or sentence counts');
  assert.ok(!/skill (drill|exercise)|targeted/i.test(i));
});
test('LessonRunner withholds the band ONLY when skillFocus is set, so this lesson\'s final response records a band (behavioural + source-level)', () => {
  const src = readFileSync('components/writing-studio/LessonRunner.tsx', 'utf8');
  assert.match(src, /lesson\.finalPrompt\.skillFocus \? null : unified\.band/);
  assert.match(src, /checkEssay\(essay, lesson\.finalPrompt\.minWords, lesson\.task, scope, !!lesson\.finalPrompt\.skillFocus, contentLocale\)/);
  const bandRecorded = (l: typeof lesson, band: number) => (l.finalPrompt.skillFocus ? null : band);
  assert.equal(bandRecorded(lesson, 6.5), 6.5);
});
test('lessons 01-06 keep their skill-drill scope; only this lesson and the existing capstone are full-task', () => {
  const drills = ['task1-understanding', 'visual-information', 'task1-introduction', 'overview-writing', 'body-paragraphs', 'task1-vocab-grammar'];
  for (const id of drills) assert.ok(getLesson(id)!.finalPrompt.skillFocus, `${id} is still a skill drill`);
  assert.equal(getLesson('task1-understanding')!.finalPrompt.checkScope, 'introduction-only');
  assert.equal(getLesson('visual-information')!.finalPrompt.checkScope, 'overview-only');
  assert.equal(getLesson('task1-vocab-grammar')!.finalPrompt.checkScope, 'paragraph-only');
});
test('the local full-task checker keeps its 150-word rule and rewards nothing a drill would: a 120-word answer is flagged, a short model-like answer is not suppressed', () => {
  const short = MODEL_TEXT.split(/\s+/).slice(0, 120).join(' ') + '.';
  const r = checkEssay(short, 150, 'task1', 'full');
  assert.equal(r.meetsLength, false);
  assert.ok(r.mistakes.some((m) => /underdeveloped/.test(m.why)), JSON.stringify(r.mistakes));
  assert.ok(!r.suggestions.some((x) => /Suggested length/.test(x)), 'no soft-length drill wording on a full task');
  assert.ok(typeof r.indicativeBand === 'number', 'a full task gets an indicative band');
});

// ---------------------------------------------------------------- progress

test('guided and clinic steps record nothing; the final full response can store a band; other lessons\' progress is unaffected', () => {
  const empty: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };
  const earlier = recordLesson(recordLesson(recordLesson(empty, 'task1-vocab-grammar', 1, null), 'task1-full-practice', 1, 6), 'task2-full-practice', 2, 7);
  const after = recordLesson(earlier, lesson.id, 1, 6.5);
  assert.equal(after.lessons[lesson.id].lastBand, 6.5);
  assert.equal(after.lessons[lesson.id].bestBand, 6.5);
  assert.ok(after.lessons[lesson.id].completedAt);
  assert.deepEqual(after.lessons['task1-vocab-grammar'], earlier.lessons['task1-vocab-grammar'], 'a skill-drill lesson keeps its null band');
  assert.deepEqual(after.lessons['task1-full-practice'], earlier.lessons['task1-full-practice']);
  assert.deepEqual(after.lessons['task2-full-practice'], earlier.lessons['task2-full-practice'], 'Task 2 progress untouched');
  assert.deepEqual(after.practice, earlier.practice);
  assert.deepEqual(after.exams, earlier.exams, 'no exam/mock statistics are touched by a lesson');
  // the board and check steps never call the progress recorder: they are plain material/check steps
  const board = lesson.steps.find((s) => s.id === 'guided-practice')!;
  assert.equal(board.material?.type, 'chart-board');
  assert.ok(!/band/i.test(JSON.stringify(board)), 'guided practice mentions no band');
});

console.log(`\n${passed} passed`);
