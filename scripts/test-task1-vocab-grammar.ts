/** Writing Studio Lesson 06 ("task1-vocab-grammar", module task1-m6, "Vocabulary and Grammar Mastery"):
 * curriculum integrity, answer keys (checked against option CONTENT, not just indices), answer-position
 * distribution, factual consistency with the 'commute-methods' dataset, and the paragraph-only language-drill
 * configuration and local-check behaviour its final task relies on. The server rubric is tested in
 * scripts/test-assess.ts.
 * Run: npx tsx scripts/test-task1-vocab-grammar.ts */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CHART_DATASETS } from '../lib/writing-studio/charts';
import { TASK1_MODULES } from '../lib/writing-studio/content';
import { checkEssay, deriveScope } from '../lib/writing-studio/feedback';
import { LESSONS, getLesson } from '../lib/writing-studio/lessons';
import { task1VocabGrammarLesson as lesson } from '../lib/writing-studio/lessons/task1-vocab-grammar';
import { bodyParagraphsLesson } from '../lib/writing-studio/lessons/body-paragraphs';
import { overviewWritingLesson } from '../lib/writing-studio/lessons/overview-writing';
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
const CATS = ['Car', 'Bus', 'Bicycle', 'Train', 'Walking'];
const val = (c: string, y: '2010' | '2023') => chart.series.find((s) => s.name === y)!.values[chart.categories.indexOf(c)];
const pp = (c: string) => val(c, '2023') - val(c, '2010');
const rel = (c: string) => (pp(c) / val(c, '2010')) * 100;

const GOOD_PARAGRAPH =
  'Car use declined from 52% in 2010 to 38% in 2023, a decrease of 14 percentage points. By contrast, bicycle use increased substantially from 6% to 19%, representing a rise of 13 percentage points. Bus use fell slightly from 24% to 21%, whereas walking remained unchanged at 7%. Despite its decline, car use continued to be the most common transport method in 2023.';

function allText(): string {
  const parts: string[] = [lesson.objective, lesson.finalPrompt.instructions];
  for (const s of lesson.steps) {
    parts.push(s.trainerMessage);
    const m = s.material;
    if (m?.type === 'text') parts.push(...m.paragraphs);
    if (m?.type === 'examples') parts.push(m.good, m.weak, m.note);
    if (m?.type === 'vocab') parts.push(...m.items.flatMap((i) => [i.phrase, i.use]));
    if (m?.type === 'chart-board') parts.push(...m.tasks.map((t) => `${t.prompt} ${t.modelAnswer}`));
    if (s.check) parts.push(s.check.prompt, ...s.check.options, s.check.explain);
  }
  return parts.join('\n');
}

/** Lines that are wrong multiple-choice options on purpose, so claim scans can skip them. */
const WRONG_OPTIONS = new Set(lesson.steps.flatMap((s) => (s.check ? s.check.options.filter((_, i) => i !== s.check!.correctIndex) : [])));
const claimLines = () => allText().split('\n').filter((l) => !WRONG_OPTIONS.has(l));

// ---------------------------------------------------------------- identity / coverage

test('existing identity is preserved: id task1-vocab-grammar, module task1-m6, export task1VocabGrammarLesson, registered once', () => {
  assert.equal(lesson.id, 'task1-vocab-grammar');
  assert.equal(lesson.task, 'task1');
  assert.equal(lesson.moduleId, 'task1-m6');
  assert.equal(getLesson('task1-vocab-grammar'), lesson);
  assert.equal(Object.values(LESSONS).filter((l) => l.id === 'task1-vocab-grammar').length, 1);
  assert.equal(Object.values(LESSONS).filter((l) => l.moduleId === 'task1-m6').length, 1, 'no duplicate Module 6 lesson');
  const m6 = TASK1_MODULES.find((m) => m.id === 'task1-m6')!;
  assert.equal(m6.builtLessonId, 'task1-vocab-grammar');
  assert.equal(lesson.title, 'Vocabulary and Grammar Mastery');
  assert.ok(lesson.estMinutes >= 30 && lesson.estMinutes <= 35);
});
test('teaching coverage: all 15 sections in order, 20 runner steps (within the 18-24 target), unique ids, supported schema only', () => {
  assert.deepEqual(lesson.steps.map((s) => s.id), [
    'intro', 'trend-verbs', 'magnitude-pace', 'percentage-points', 'comparison-language', 'tense-control', 'structures',
    'articles-agreement', 'sentence-variety', 'collocations', 'improve-paragraph', 'guided-practice',
    'clinic', 'clinic-2', 'clinic-3', 'clinic-4', 'clinic-5', 'clinic-6', 'language-checklist', 'independent-practice',
  ]);
  assert.ok(lesson.steps.length >= 18 && lesson.steps.length <= 24);
  assert.equal(new Set(lesson.steps.map((s) => s.id)).size, lesson.steps.length);
  const valid = new Set<MaterialBlock['type']>(['text', 'examples', 'vocab', 'chart-board']);
  for (const s of lesson.steps) {
    if (s.material) assert.ok(valid.has(s.material.type), `${s.id}: ${s.material.type}`);
    assert.ok(!('checks' in s), s.id);
  }
  assert.equal(lesson.steps[lesson.steps.length - 1].kind, 'independent');
});

// ---------------------------------------------------------------- answer keys: by CONTENT

const CORE = ['intro', 'trend-verbs', 'magnitude-pace', 'percentage-points', 'comparison-language', 'tense-control', 'structures', 'articles-agreement', 'sentence-variety', 'collocations'];
const CLINIC = ['clinic', 'clinic-2', 'clinic-3', 'clinic-4', 'clinic-5', 'clinic-6'];
// What each option IS: exactly one correct pattern, and one known-wrong pattern per other option.
const ROLES: Record<string, { correct: RegExp; wrong: RegExp[] }> = {
  intro: { correct: /^Car use declined by 14 percentage points, while bicycle use increased by 13 percentage points\.$/, wrong: [/became bad and bicycle use became good/, /changed a lot and bicycle use changed a lot/] },
  'trend-verbs': { correct: /^Bicycle use increased from 6% to 19%\.$/, wrong: [/remained stable at 19%/, /declined from 6% to 19%/] },
  'magnitude-pace': { correct: /^It declined slightly\.$/, wrong: [/increased dramatically/, /remained completely unchanged/] },
  'percentage-points': { correct: /^13 percentage points\.$/, wrong: [/^216\.7 percentage points\.$/, /^13%\.$/] },
  'comparison-language': { correct: /^Car use declined, whereas bicycle use increased\.$/, wrong: [/bicycle use increase\.$/, /declined whereas bicycle use increasing\./] },
  'tense-control': { correct: /^Car use declined between 2010 and 2023, while the chart illustrates five transport methods\.$/, wrong: [/^Car use declines between/, /had decline/] },
  structures: { correct: /^Despite the decline in car use, it remained/, wrong: [/^Despite car use declined/, /^Despite declined car use/] },
  'articles-agreement': { correct: /^The number of commuters was higher in 2023\.$/, wrong: [/^The number of commuters were/, /^The amount of commuters was/] },
  'sentence-variety': { correct: /^Although car use declined, it remained the most common method\.$/, wrong: [/^Although car use declined, but/, /^Although declined car use/] },
  collocations: { correct: /^A substantial increase in bicycle use\.$/, wrong: [/^A substantially increase/, /^A more higher increase/] },
  clinic: { correct: /^The sentence uses the wrong direction\.$/, wrong: [/incorrect article/, /wrong plural form/] },
  'clinic-2': { correct: /^Bicycle use increased by 13 percentage points\.$/, wrong: [/^Bicycle use decreased by 13 percentage points/, /^Bicycle use remained stable/] },
  'clinic-3': { correct: /^bicycle use increased$/, wrong: [/^bicycle use increasing$/, /^bicycle use increase$/] },
  'clinic-4': { correct: /^Car use was higher than bicycle use\.$/, wrong: [/more highest/, /most higher/] },
  'clinic-5': { correct: /^Car use declined by 14 percentage points\.$/, wrong: [/declined from 14/, /declined to 14/] },
  'clinic-6': { correct: /^Although car use declined, it remained the most common method\.$/, wrong: [/^Despite car use declined/, /^Despite declined car use/] },
};
test('there are 10 core checks and 6 clinic checks, in the specified order, and nothing else carries a check', () => {
  assert.deepEqual(lesson.steps.filter((s) => s.check).map((s) => s.id), [...CORE, ...CLINIC]);
  assert.deepEqual(Object.keys(ROLES).sort(), [...CORE, ...CLINIC].sort());
});
test('answer keys follow the CONTENT: the option at correctIndex is the correct one and every other option is a known distractor', () => {
  for (const id of [...CORE, ...CLINIC]) {
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
    assert.ok(c.explain.length > 40, `${id}: explanation`);
  }
});
test('"tense-control" explanation gives each option its correct grammatical status, found by CONTENT (fails if the correct option is called incorrect)', () => {
  const c = lesson.steps.find((x) => x.id === 'tense-control')!.check!;
  // Locate the three options by what they say, never by position.
  const mixed = c.options.find((o) => /^Car use declined between 2010 and 2023, while the chart illustrates/.test(o))!;
  const presentSimple = c.options.find((o) => /^Car use declines between 2010 and 2023/.test(o))!;
  const hadDecline = c.options.find((o) => /^Car use had decline between 2010 and 2023/.test(o))!;
  assert.ok(mixed && presentSimple && hadDecline && new Set([mixed, presentSimple, hadDecline]).size === 3, 'all three options found by content');
  assert.equal(c.options[c.correctIndex], mixed, 'the correct answer is the mixed past-simple / present-simple sentence');

  // Split the explanation into one segment per quoted option (in the order they are quoted).
  const at = (opt: string) => c.explain.indexOf(opt);
  const starts = [mixed, presentSimple, hadDecline].map((o) => ({ o, i: at(o) }));
  for (const { o, i } of starts) assert.ok(i >= 0, `the explanation quotes the option: ${o}`);
  const ordered = starts.slice().sort((a, b) => a.i - b.i);
  const segment = (opt: string) => {
    const k = ordered.findIndex((x) => x.o === opt);
    return c.explain.slice(ordered[k].i + opt.length, k + 1 < ordered.length ? ordered[k + 1].i : undefined);
  };
  const m = segment(mixed), p = segment(presentSimple), h = segment(hadDecline);

  // Option: correct mixed tense — past simple for the change, present simple for what the chart shows.
  assert.match(m, /\bis correct\b/);
  assert.ok(!/incorrect|wrong|not valid/i.test(m), `the correct option must not be called incorrect: ${m}`);
  assert.match(m, /"declined" is past simple for a completed historical change/);
  assert.match(m, /"illustrates" is present simple for what the chart shows/);
  // Option: present simple used for a completed historical change.
  assert.match(p, /\bis incorrect\b/);
  assert.match(p, /present simple does not suit a completed historical change/);
  assert.ok(!/\bis correct\b/.test(p), p);
  // Option: invalid verb form; past perfect would need "had declined", and is unnecessary here.
  assert.match(h, /\bis incorrect\b/);
  assert.match(h, /"had decline" is not a valid verb form/);
  assert.match(h, /"had declined"/);
  assert.match(h, /past perfect is not needed in this sentence/);
  assert.ok(!/\bis correct\b/.test(h), h);
  // No positional wording that could go stale if the options are reordered.
  assert.ok(!/\b(first|second|third)\b/i.test(c.explain), 'no positional references');
});
test('the specified answer meaning is kept: the spec\'s letter keys map to the same correct options after balancing', () => {
  // Spec keys (A=0,B=1,C=2) -> the option that was correct there; checked by content above, restated here by the spec's own letters.
  const spec: Record<string, string> = {
    intro: 'B', 'trend-verbs': 'C', 'magnitude-pace': 'A', 'percentage-points': 'B', 'comparison-language': 'A', 'tense-control': 'B', structures: 'B',
    'articles-agreement': 'C', 'sentence-variety': 'A', collocations: 'B', clinic: 'A', 'clinic-2': 'A', 'clinic-3': 'B', 'clinic-4': 'B', 'clinic-5': 'B', 'clinic-6': 'B',
  };
  assert.equal(Object.keys(spec).length, 16);
  for (const id of Object.keys(spec)) assert.ok(ROLES[id].correct.test(lesson.steps.find((s) => s.id === id)!.check!.options[lesson.steps.find((s) => s.id === id)!.check!.correctIndex]), id);
});
test('answer positions are balanced across all 16 questions (computed from the data): no position over 6, each used 4+ times, no 3 in a row', () => {
  const keys = lesson.steps.filter((s) => s.check).map((s) => s.check!.correctIndex);
  assert.equal(keys.length, 16);
  const counts = [0, 1, 2].map((p) => keys.filter((k) => k === p).length);
  assert.ok(counts.every((n) => n <= 6), `a position holds too many: ${counts}`);
  assert.ok(counts.every((n) => n >= 4), `each position should be used at least 4 times: ${counts}`);
  assert.equal(counts[0] + counts[1] + counts[2], 16);
  for (let i = 2; i < keys.length; i++) assert.ok(!(keys[i] === keys[i - 1] && keys[i] === keys[i - 2]), `three identical keys in a row at ${i - 2}-${i}`);
});
test('the facts behind the answers hold in the dataset', () => {
  assert.equal(pp('Car'), -14); assert.equal(pp('Bicycle'), 13); assert.equal(pp('Bus'), -3); assert.equal(pp('Train'), 4); assert.equal(pp('Walking'), 0);
  assert.ok(Math.abs(rel('Bicycle') - 216.7) < 0.05);
  assert.ok(Math.abs(Math.abs(rel('Car')) - 26.9) < 0.05, 'car relative decrease is about 26.9%');
  assert.ok(val('Car', '2023') - val('Bicycle', '2023') === 19);
  assert.ok(Math.abs(val('Bicycle', '2023') / val('Bicycle', '2010') - 3.17) < 0.01);
  assert.ok(val('Bicycle', '2023') / val('Bicycle', '2010') > 3, 'more than three times');
  assert.ok(Math.round(rel('Bicycle')) !== 13, '"13%" would be wrong for the relative change too');
});

// ---------------------------------------------------------------- dataset / accuracy

test('the chart is the existing commute-methods dataset (not a copy) and no second dataset is defined', () => {
  assert.equal(chart.id, 'commute-methods');
  assert.deepEqual(chart.categories, CATS);
  assert.deepEqual(chart.series.map((s) => [s.name, s.values]), [['2010', [52, 24, 6, 11, 7]], ['2023', [38, 21, 19, 15, 7]]]);
  assert.equal(chart.unit, '% of commuters');
  const m = lesson.steps.find((s) => s.id === 'guided-practice')!.material;
  assert.ok(m && m.type === 'chart-board');
  assert.equal(m.dataset, CHART_DATASETS['commute-methods']);
  assert.equal(m.tasks.length, 6);
  assert.equal(lesson.finalPrompt.chartId, 'commute-methods');
  const src = readFileSync('lib/writing-studio/lessons/task1-vocab-grammar.ts', 'utf8');
  assert.ok(!/values:\s*\[/.test(src) && !/categories:\s*\[/.test(src), 'no second dataset in the lesson file');
});
test('every "<category> … from X% to Y%" claim, "N% in YEAR", and "at N%" claim agrees with the dataset', () => {
  const text = allText();
  let n = 0;
  for (const m of text.matchAll(/\b(car use|bicycle use|bus use|train use|walking)\b[^.\n]*?\bfrom (\d+)%(?: in (\d{4}))?[^.\n]*? to (\d+)%(?: in (\d{4}))?/gi)) {
    const cat = { 'car use': 'Car', 'bicycle use': 'Bicycle', 'bus use': 'Bus', 'train use': 'Train', walking: 'Walking' }[m[1].toLowerCase()]!;
    assert.equal(Number(m[2]), val(cat, '2010'), m[0]);
    assert.equal(Number(m[4]), val(cat, '2023'), m[0]);
    if (m[3]) assert.equal(m[3], '2010', m[0]);
    if (m[5]) assert.equal(m[5], '2023', m[0]);
    n++;
  }
  assert.ok(n >= 12, `only ${n} from/to claims were checked`);
  for (const m of text.matchAll(/\b(Car|Bus|Bicycle|Train|Walking):? (\d+)% then (\d+)%/g)) {
    assert.equal(Number(m[2]), val(m[1], '2010'), m[0]);
    assert.equal(Number(m[3]), val(m[1], '2023'), m[0]);
  }
  assert.match(text, /Walking remained at 7%/);
  assert.match(text, /Car and bicycle use stood at 38% and 19%, respectively, in 2023/);
});
test('percentage-point and relative-change figures in the lesson are the verified ones; "13%" appears only as the flagged error', () => {
  const text = allText();
  for (const m of text.matchAll(/(\d+(?:\.\d+)?) percentage points?/g)) assert.ok(['14', '13', '3', '4', '19', '216.7', '10'].includes(m[1]), m[0]); // '10' is the generic preposition pattern (10% to 20%)
  for (const m of text.matchAll(/approximately (\d+(?:\.\d+)?)%/g)) assert.ok(['216.7', '26.9'].includes(m[1]), m[0]);
  for (const line of text.split('\n').filter((l) => /\b(14|13)%(?!\s+(from|to))/.test(l) && /(increased|decreased|rose|fell) by (13|14)%/.test(l))) {
    assert.match(line, /Incorrect|Weak|wrongly|Improve|Task C|What is the most accurate|problem|13%\./i, line.slice(0, 140));
  }
  assert.match(text, /\(19 − 6\) ÷ 6 × 100 = approximately 216\.7%/);
  assert.match(text, /14 ÷ 52 × 100 = approximately 26\.9%/);
  assert.match(text, /19 ÷ 6 ≈ 3\.17/);
  assert.match(text, /38 − 19 = 19 percentage points/);
});
test('trend direction: every "<category> use <verb> from A% to B%" model sentence uses a verb whose direction matches the data', () => {
  const up = /\b(increased|rose|grew|climbed)\b/i, down = /\b(decreased|fell|declined|dropped)\b/i;
  const text = claimLines().filter((l) => !/Weak|went up|went down|Incorrect|Improve:|What is the problem|go up|go down|sentence is:/.test(l));
  let n = 0;
  for (const line of text) {
    for (const m of line.matchAll(/\b(Car|Bicycle|Bus|Train)\b use (\w+)(?: \w+)? from (\d+)% (?:in \d{4} )?to (\d+)%/g)) {
      const cat = m[1];
      if (!up.test(m[2]) && !down.test(m[2]) && !/^(was|remained|stood)$/.test(m[2])) continue;
      assert.equal(up.test(m[2]), pp(cat) > 0, `${m[0]}: direction`);
      assert.equal(down.test(m[2]), pp(cat) < 0, `${m[0]}: direction`);
      n++;
    }
  }
  assert.ok(n >= 6, `only ${n} directional claims were checked`);
});
test('no unsupported pace claim about the commute chart: gradual/steady/sharp/rapid/dramatic never describe a commute figure; hypothetical examples are labelled', () => {
  const pace = /\b(gradually|steadily|progressively|rapidly|sharply|steeply|dramatically)\b/i;
  // Check every QUOTED model sentence about a commute figure (the word lists around them may legitimately contain pace words).
  let quoted = 0;
  for (const line of claimLines()) {
    if (/Weak:|Improve:|Task |problem|sentence is:/i.test(line)) continue;
    for (const q of line.matchAll(/"([^"]+)"/g)) {
      if (!/\b(Car|Bicycle|Bus|Train|Walking)\b( use)?\b/.test(q[1]) || !/\d+%/.test(q[1])) continue;
      assert.ok(!pace.test(q[1]), `pace word in a two-point commute sentence: ${q[1]}`);
      quoted++;
    }
  }
  assert.ok(quoted >= 10, `only ${quoted} quoted commute sentences were checked`);
  assert.match(allText(), /Sales increased steadily every year/);
  assert.match(allText(), /for a line graph with yearly figures \(not this chart\)/);
  assert.match(allText(), /only two time points, 2010 and 2023, so it gives no evidence about what happened in between/);
  assert.match(allText(), /Sales declined between 2010 and 2020, but they are projected to rise slightly by 2030/);
  assert.match(allText(), /Hypothetical example, not from this chart/);
});
test('"significant" is explained as ordinary descriptive language, never a statistical claim', () => {
  assert.match(allText(), /"significantly" is ordinary descriptive language for a large change; do not use it to imply a statistical claim/);
  assert.ok(!/statistically significant|p-value|confidence/i.test(allText().replace(/do not use it to imply a statistical claim/, '')));
});
test('tense teaching: past for completed changes, present for what the chart shows, future for projections; never "every verb must be past"', () => {
  const t = allText();
  assert.match(t, /do not use past tense automatically for every chart/);
  assert.match(t, /do not assume that every verb in a Task 1 response must be past tense/);
  assert.ok(!/every verb (in a Task 1 response )?(must|should) be (in the )?past/i.test(t.replace(/do not assume that every verb in a Task 1 response must be past tense/, '')));
  assert.match(t, /The chart illustrates the proportion of commuters/);
  assert.match(t, /projected to rise/);
});
test('grammar examples: despite + noun/gerund, although + clause, number/amount, from/to/by/at are taught correctly', () => {
  const t = allText();
  assert.match(t, /although \+ subject \+ verb; despite \+ noun or gerund/);
  assert.match(t, /Correct: "Despite the decline in car use…"/);
  assert.match(t, /Do not write "the amount of commuters"/);
  assert.match(t, /"the number of" takes a singular verb, whereas "a number of" is a plural expression/);
  assert.match(t, /"From" = starting point, "to" = ending point, "by" = amount of change, "at" = specific value/);
  assert.match(t, /"Higher" is already the comparative form/);
  assert.match(t, /sentence fragment/);
});
test('model sentences in the demonstration, tasks and final guidance are consistent with the data', () => {
  const m = lesson.steps.find((s) => s.id === 'improve-paragraph')!.material;
  assert.ok(m && m.type === 'examples');
  assert.equal(m.good, GOOD_PARAGRAPH);
  assert.ok(m.weak.includes('Car use go down from 52% to 38%'));
  const board = lesson.steps.find((s) => s.id === 'guided-practice')!.material as Extract<MaterialBlock, { type: 'chart-board' }>;
  const a = Object.fromEntries(board.tasks.map((t) => [t.id, t.modelAnswer]));
  assert.match(a['task-a'], /^Bicycle use increased from 6% to 19%\./);
  assert.match(a['task-b'], /^Bus use declined slightly from 24% to 21%\./);
  assert.match(a['task-c'], /^Car use decreased by 14 percentage points\./);
  assert.match(a['task-d'], /^Car use was higher than bicycle use\./);
  assert.match(a['task-e'], /^Walking remained unchanged between 2010 and 2023\./);
  assert.match(a['task-f'], /^Car use declined, whereas bicycle use increased\./);
  for (const t of board.tasks) assert.ok(t.prompt.length > 15 && t.modelAnswer.length > 15, t.id);
});

// ---------------------------------------------------------------- final prompt / assessment scope

test('final prompt is a paragraph-only language drill on the commute chart', () => {
  const f = lesson.finalPrompt;
  assert.equal(f.skillFocus, 'Task 1 vocabulary precision and grammatical accuracy');
  assert.equal(f.checkScope, 'paragraph-only');
  assert.equal(f.chartId, 'commute-methods');
  assert.equal(f.minWords, 80);
  assert.equal(deriveScope(lesson), 'paragraph-only');
  assert.match(f.instructions, /approximately 80–100 words/);
  assert.match(f.instructions, /Do not write a complete Task 1 response/);
  assert.match(f.instructions, /targeted vocabulary and grammar exercise/);
  assert.ok(!/150|exam time limit|full task 1 response\b(?!\.)/i.test(f.instructions.replace('Do not write a complete Task 1 response', '')), f.instructions);
  assert.match(f.skillFocus!, /\b(vocabulary|grammatical)\b/i, 'the skill name must route to the language rubric');
});
test('Lessons 04 and 05 keep their own focus (not routed to the language rubric)', () => {
  assert.equal(bodyParagraphsLesson.finalPrompt.skillFocus, 'Task 1 body paragraph development');
  assert.ok(!/\b(vocabulary|grammatical|grammar)\b/i.test(bodyParagraphsLesson.finalPrompt.skillFocus!));
  assert.ok(!/\b(vocabulary|grammatical|grammar)\b/i.test(overviewWritingLesson.finalPrompt.skillFocus!));
});

const drill = (t: string) => checkEssay(t, lesson.finalPrompt.minWords, 'task1', 'paragraph-only', true);

test('a correct, well-written paragraph gets no local mistakes: no "Overall", no linker quota, no overview/introduction/150-word demand', () => {
  const r = drill(GOOD_PARAGRAPH);
  assert.deepEqual(r.mistakes, [], JSON.stringify(r.mistakes));
  assert.ok(!/\boverall\b/i.test(GOOD_PARAGRAPH));
});
test('a valid shorter paragraph gets only a neutral suggestion (flexible target), never a length mistake or "paraphrase" wording', () => {
  const r = drill('Car use fell by 14 percentage points, from 52% to 38%, whereas bicycle use rose from 6% to 19%.');
  assert.equal(r.meetsLength, false);
  assert.deepEqual(r.mistakes, [], JSON.stringify(r.mistakes));
  const sug = r.suggestions.find((x) => /Suggested length/.test(x))!;
  assert.match(sug, /around 80 words/);
  assert.match(sug, /flexible/);
  assert.ok(!/paraphras/i.test(JSON.stringify(r)));
});
test('the local checker only does what it can: deterministic surface checks fire, semantic ones never do', () => {
  // deterministic: no figures at all, informal contraction, missing final punctuation, double space
  assert.ok(drill('Car use declined while bicycle use increased substantially over the period shown in the chart.').mistakes.some((m) => /specific data/.test(m.why)));
  assert.ok(drill('Car use fell from 52% to 38%, but bicycle use didn\'t fall and rose from 6% to 19%.').mistakes.some((m) => /Contractions/.test(m.why)));
  assert.ok(drill('Car use fell from 52% to 38%, whereas bicycle use rose from 6% to 19%').mistakes.some((m) => /sentence punctuation/.test(m.why)));
  // semantic: wrong direction, percentage-point misuse, wrong tense, pace claims, collocation errors are NOT claimed
  const bad = drill('Car use increased by 14% from 52% to 38% and bicycle use is going more higher gradually from 6% to 19%.');
  assert.ok(!bad.mistakes.some((m) => /direction|percentage point|tense|collocation|gradual|higher|attribut|compar/i.test(m.why + m.fix)), JSON.stringify(bad.mistakes));
});
test('regressions: the drill flag changes nothing for full / overview-only / introduction-only / Task 2, nor for non-drill Task 1 paragraph-only', () => {
  const t = 'Overall, car use fell. However, cycling rose, for example from 6% to 19%.';
  assert.deepEqual(checkEssay(t, 10, 'task1', 'full', true), checkEssay(t, 10, 'task1', 'full'));
  assert.deepEqual(checkEssay(t, 10, 'task1', 'introduction-only', true), checkEssay(t, 10, 'task1', 'introduction-only'));
  assert.deepEqual(checkEssay(t, 10, 'task2', 'paragraph-only', true), checkEssay(t, 10, 'task2', 'paragraph-only'));
  const r = checkEssay('Car use fell from 52% to 38% while bicycle use rose from 6% to 19%.', 10, 'task1', 'paragraph-only');
  assert.ok(r.mistakes.some((m) => /dedicated overview/.test(m.why)) && r.mistakes.some((m) => /linking words/.test(m.why)));
});
test('no full-task or band contamination in the lesson text: no "band", no 150-word full-task threshold', () => {
  const t = allText();
  assert.ok(!/\bband\b|IELTS band|band score/i.test(t));
  assert.ok(!/\b150\b/.test(t));
});

// ---------------------------------------------------------------- progress isolation

test('a language-drill attempt (band=null) completes the lesson but stores no band and leaves other progress alone', () => {
  const empty: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };
  const earlier = recordLesson(recordLesson(empty, 'task1-full-practice', 1, 6.5), 'task2-full-practice', 2, 7);
  const after = recordLesson(earlier, lesson.id, 1, null);
  assert.equal(after.lessons[lesson.id].bestBand, null);
  assert.equal(after.lessons[lesson.id].lastBand, null);
  assert.ok(after.lessons[lesson.id].completedAt);
  assert.deepEqual(after.lessons['task1-full-practice'], earlier.lessons['task1-full-practice']);
  assert.deepEqual(after.lessons['task2-full-practice'], earlier.lessons['task2-full-practice']);
  assert.deepEqual(after.practice, earlier.practice);
  assert.deepEqual(after.exams, earlier.exams, 'no exam/mock-test statistics are touched');
});
test('LessonRunner withholds the band for any lesson with skillFocus (source-level guard)', () => {
  const src = readFileSync('components/writing-studio/LessonRunner.tsx', 'utf8');
  assert.match(src, /lesson\.finalPrompt\.skillFocus \? null : unified\.band/);
  assert.match(src, /checkScope: lesson\.finalPrompt\.checkScope/);
});

console.log(`\n${passed} passed`);
