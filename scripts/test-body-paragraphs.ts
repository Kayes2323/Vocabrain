/** Writing Studio Lesson 05 ("body-paragraphs", module task1-m5, "Body Paragraph Development"):
 * curriculum integrity, answer keys, accuracy of every figure and calculation against the
 * 'renewable-electricity' dataset, and the paragraph-only skill-drill configuration and
 * local-check behaviour its final task relies on. The server prompt for paragraph-only is
 * tested in scripts/test-assess.ts.
 * Run: npx tsx scripts/test-body-paragraphs.ts */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CHART_DATASETS } from '../lib/writing-studio/charts';
import { TASK1_MODULES } from '../lib/writing-studio/content';
import { checkEssay, deriveScope } from '../lib/writing-studio/feedback';
import { LESSONS, getLesson } from '../lib/writing-studio/lessons';
import { bodyParagraphsLesson as lesson } from '../lib/writing-studio/lessons/body-paragraphs';
import { overviewWritingLesson } from '../lib/writing-studio/lessons/overview-writing';
import { task1IntroductionLesson } from '../lib/writing-studio/lessons/task1-introduction';
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

const chart = CHART_DATASETS['renewable-electricity'];
const years = chart.categories;
const COUNTRIES = ['Denmark', 'Country B', 'Country C'];
const val = (country: string, year: string) => chart.series.find((s) => s.name === country)!.values[years.indexOf(year)];
const rise = (country: string) => val(country, '2020') - val(country, '2000');

const DEVELOPED =
  "Denmark consistently recorded the highest proportion of renewable electricity, with its share rising from 14% in 2000 to 62% in 2020. This 48-percentage-point increase was substantially greater than the rises recorded by Country B and Country C. Country B's figure climbed from 6% to 27%, whereas Country C experienced more gradual growth, reaching 16% from an initial 9%. Consequently, Country B had moved ahead of Country C by 2010 and widened the gap to 11 percentage points by the end of the period.";
const WORKED =
  "Denmark recorded the highest proportion throughout the period, with its share rising steadily from 14% in 2000 to 62% in 2020. This represented an increase of 48 percentage points and meant that its final figure was more than four times the initial level. Although Country B also experienced substantial growth, increasing from 6% to 27%, Country C rose more gradually from 9% to 16%.";

function allText(): string {
  const parts: string[] = [lesson.objective, localize('en', lesson.finalPrompt.instructions)];
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

// ---------------------------------------------------------------- identity

test('existing identity is preserved: id body-paragraphs, module task1-m5, export bodyParagraphsLesson, registered once', () => {
  assert.equal(lesson.id, 'body-paragraphs');
  assert.equal(lesson.task, 'task1');
  assert.equal(lesson.moduleId, 'task1-m5');
  assert.equal(getLesson('body-paragraphs'), lesson);
  assert.equal(Object.values(LESSONS).filter((l) => l.id === 'body-paragraphs').length, 1);
  assert.equal(Object.values(LESSONS).filter((l) => l.moduleId === 'task1-m5').length, 1, 'no duplicate Module 5 lesson');
  assert.equal(lesson.title, 'Body Paragraph Development');
  const m5 = TASK1_MODULES.find((m) => m.id === 'task1-m5')!;
  assert.equal(m5.title, 'Body Paragraph Development');
  assert.equal(m5.builtLessonId, 'body-paragraphs');
});

// ---------------------------------------------------------------- curriculum

test('all 15 teaching sections are represented, in order (each multi-question group is consecutive check steps)', () => {
  assert.deepEqual(lesson.steps.map((s) => s.id), [
    'intro', 'overview-vs-body', 'read-dataset', 'group-data', 'select-details', 'comparisons', 'support-evidence',
    'paragraph-structure', 'cohesion', 'common-mistakes', 'clinic', 'clinic-2', 'clinic-3', 'clinic-4',
    'plan-paragraph', 'weak-vs-developed', 'plan-before-write', 'reflection', 'independent-practice',
  ]);
  const ids = lesson.steps.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length, 'step ids are unique');
  assert.ok(ids.every((id) => id.trim().length > 0));
  assert.equal(lesson.steps[lesson.steps.length - 1].kind, 'independent');
});
test('only supported schema is used: valid material types, one check per step, no checks[] field', () => {
  const valid = new Set<MaterialBlock['type']>(['text', 'examples', 'vocab', 'chart-board']);
  for (const s of lesson.steps) {
    if (s.material) assert.ok(valid.has(s.material.type), `${s.id}: ${s.material.type}`);
    assert.ok(!('checks' in s), s.id);
  }
});

const KEYS: [string, number][] = [
  ['intro', 2], ['overview-vs-body', 0], ['group-data', 1], ['select-details', 2], ['comparisons', 0], ['support-evidence', 1],
  ['paragraph-structure', 2], ['cohesion', 0], ['clinic', 1], ['clinic-2', 2], ['clinic-3', 0], ['clinic-4', 2], ['plan-before-write', 1],
];
test('every check has the specified answer key, valid options and an explanation', () => {
  assert.deepEqual(lesson.steps.filter((s) => s.check).map((s) => s.id), KEYS.map(([id]) => id));
  for (const [id, key] of KEYS) {
    const c = lesson.steps.find((s) => s.id === id)!.check!;
    assert.equal(c.correctIndex, key, id);
    assert.ok(c.correctIndex >= 0 && c.correctIndex < c.options.length, id);
    assert.ok(c.options.length >= 3 && new Set(c.options).size === c.options.length, `${id}: options`);
    assert.ok(localize('en', c.explain).length > 30, `${id}: explanation`);
  }
});
// What each option IS, independent of where it sits: one correct pattern and the wrong/inferior patterns.
const ROLES: Record<string, { correct: RegExp; wrong: RegExp[] }> = {
  intro: { correct: /^Denmark's share rose from 14% in 2000 to 62% in 2020, representing an increase of 48 percentage points\.$/, wrong: [/^Overall, Denmark/, /^The chart illustrates/] },
  'overview-vs-body': { correct: /^Specific figures showing how the pattern developed\.$/, wrong: [/^The overall pattern/, /^A general statement/] },
  'group-data': { correct: /^Discuss Denmark separately, then compare Country B and Country C\.$/, wrong: [/^Group all three countries together/, /alphabetical/] },
  'select-details': { correct: /^Its starting and ending figures, with the time period\.$/, wrong: [/^Only the 2005 figure/, /^A list of all three countries/] },
  comparisons: { correct: /^Country C initially led Country B by 3 percentage points, but Country B had moved ahead by 2010\.$/, wrong: [/^Country B was 6% and Country C was 9%\.$/, /both had percentages/] },
  'support-evidence': { correct: /^Country B's share increased by 21 percentage points\.$/, wrong: [/because its government/, /more environmentally responsible/] },
  'paragraph-structure': { correct: /^The group, trend or comparison that the paragraph will develop\.$/, wrong: [/^An unrelated fact/, /personal opinion/] },
  cohesion: { correct: /^"Country B grew more strongly than Country C, while Denmark remained well ahead of both\."$/, wrong: [/Moreover, furthermore/, /Firstly, secondly/] },
  clinic: { correct: /^An unsupported cause has been invented\.$/, wrong: [/figure for Country C is missing/, /wrong tense/, /repeats the introduction/] },
  'clinic-2': { correct: /^A clear explanation of the trend and a meaningful comparison\.$/, wrong: [/Country B and Country C only/, /opinion about renewable energy/, /^A reason for the increase/] },
  'clinic-3': { correct: /^The figure is attributed to the wrong country; Country C was 16%\.$/, wrong: [/Country C reached 27% in 2015/, /Percentage points should be used/, /^Nothing; the statement is accurate/] },
  'clinic-4': { correct: /^It repeats a broad overview instead of developing the data with supporting details\.$/, wrong: [/uses a linking word/, /too long/, /wrong chart/] },
  'plan-before-write': { correct: /^Denmark: 14% in 2000 and 62% in 2020\.$/, wrong: [/^Country C: 9%/, /chart's title/] },
};
test('answer keys follow the CONTENT: in every check the option at correctIndex is the correct one and every other option is a known distractor', () => {
  assert.deepEqual(Object.keys(ROLES).sort(), KEYS.map(([id]) => id).sort(), 'every check is covered');
  for (const [id] of KEYS) {
    const c = lesson.steps.find((s) => s.id === id)!.check!;
    const { correct, wrong } = ROLES[id];
    assert.equal(c.options.filter((o) => correct.test(o)).length, 1, `${id}: exactly one correct option`);
    c.options.forEach((o, i) => {
      const isCorrect = correct.test(o);
      const wrongHits = wrong.filter((w) => w.test(o)).length;
      assert.equal(i === c.correctIndex, isCorrect, `${id}: option ${i} ("${o}") — correctIndex points at the wrong option`);
      assert.equal(wrongHits, isCorrect ? 0 : 1, `${id}: option ${i} ("${o}") must be exactly one known distractor`);
    });
    assert.equal(c.options.length, 1 + wrong.length, `${id}: no unexpected options`);
  }
});
test('"intro" explanation assigns the right role to each option by CONTENT, so it fails if options are reordered or a role is mislabelled', () => {
  const c = lesson.steps.find((s) => s.id === 'intro')!.check!;
  const { correct } = ROLES.intro;
  // Find each option by what it says (never by position).
  const bodyOpt = c.options.find((o) => correct.test(o))!;
  const overviewOpt = c.options.find((o) => /^Overall, Denmark/.test(o))!;
  const introOpt = c.options.find((o) => /^The chart illustrates/.test(o))!;
  assert.ok(bodyOpt && overviewOpt && introOpt && new Set([bodyOpt, overviewOpt, introOpt]).size === 3, 'all three options are found by content');
  assert.equal(c.options[c.correctIndex], bodyOpt, 'the correct answer is the body-paragraph sentence');
  // The explanation must quote every option; the role statement that follows each quote (up to the
  // next quoted option) must name that option's own role.
  const explain = localize('en', c.explain);
  const clauseAround = (opt: string) => {
    const quote = opt.replace(/\.$/, '');
    const at = explain.indexOf(quote);
    assert.ok(at >= 0, `the explanation quotes the option: ${opt}`);
    const after = explain.slice(at + quote.length);
    const next = after.search(/\s"/);
    return next === -1 ? after : after.slice(0, next);
  };
  const body = clauseAround(bodyOpt);
  const overview = clauseAround(overviewOpt);
  const intro = clauseAround(introOpt);
  assert.match(body, /body[- ]paragraph/i);
  assert.match(body, /specific evidence/);
  assert.ok(!/overview|introduction/i.test(body), `the correct option must not be labelled overview/introduction: ${body}`);
  assert.match(overview, /overview-style/);
  assert.ok(!/introduction|body[- ]paragraph/i.test(overview), `overview option mislabelled: ${overview}`);
  assert.match(intro, /introduction-style/);
  assert.ok(!/overview|body[- ]paragraph/i.test(intro), `introduction option mislabelled: ${intro}`);
  assert.ok(!/\b(first|second|third)\b/i.test(explain), 'no positional references that go stale when options are reordered');
});
test('the facts behind the correct answers and the data-based distractors hold in the dataset', () => {
  assert.equal(val('Denmark', '2000'), 14); assert.equal(val('Denmark', '2020'), 62); assert.equal(rise('Denmark'), 48);
  assert.equal(rise('Country B'), 21);
  assert.equal(val('Country C', '2000') - val('Country B', '2000'), 3, 'C led B by 3 in 2000');
  assert.ok(val('Country B', '2010') > val('Country C', '2010'), 'B ahead by 2010');
  assert.equal(val('Country C', '2020'), 16, 'clinic-3: Country C was 16% in 2020');
  assert.notEqual(val('Country C', '2015'), 27, 'clinic-3 distractor "Country C reached 27% in 2015" is false');
  assert.equal(val('Country C', '2000'), 9); assert.equal(val('Country B', '2000'), 6);
});
test('correct answers are distributed across positions: no position holds more than 6 of the 13 correct answers, and A, B and C are all used', () => {
  const checks = lesson.steps.filter((s) => s.check).map((s) => s.check!);
  assert.equal(checks.length, 13);
  const counts = [0, 1, 2, 3].map((pos) => checks.filter((c) => c.correctIndex === pos).length);
  assert.ok(counts.every((n) => n <= 6), `a position holds too many correct answers: ${counts}`);
  assert.ok(counts[0] >= 3 && counts[1] >= 3 && counts[2] >= 3, `A, B and C should each be used at least 3 times: ${counts}`);
  assert.equal(counts.reduce((a, b) => a + b, 0), 13);
  // and the keys are not one long run of the same position
  const keys = checks.map((c) => c.correctIndex);
  for (let i = 2; i < keys.length; i++) assert.ok(!(keys[i] === keys[i - 1] && keys[i] === keys[i - 2]), `three identical keys in a row at ${i - 2}-${i}`);
});
test('the correct option is the accurate statement for each check', () => {
  const key = (id: string) => {
    const c = lesson.steps.find((s) => s.id === id)!.check!;
    return c.options[c.correctIndex];
  };
  assert.match(key('intro'), /48 percentage points/);
  assert.match(key('overview-vs-body'), /Specific figures/);
  assert.match(key('group-data'), /Denmark separately, then compare Country B and Country C/);
  assert.match(key('select-details'), /starting and ending figures/);
  assert.match(key('comparisons'), /led Country B by 3 percentage points.*moved ahead by 2010/);
  assert.match(key('support-evidence'), /21 percentage points/);
  assert.match(key('paragraph-structure'), /group, trend or comparison/);
  assert.match(key('cohesion'), /grew more strongly than Country C, while Denmark remained well ahead/);
  assert.match(key('clinic'), /unsupported cause/);
  assert.match(key('clinic-2'), /explanation of the trend and a meaningful comparison/);
  assert.match(key('clinic-3'), /wrong country; Country C was 16%/);
  assert.match(key('clinic-4'), /repeats a broad overview/);
  assert.match(key('plan-before-write'), /14% in 2000 and 62% in 2020/);
});
test('the clinic distractors are false and the correct clinic-3 option matches the data', () => {
  assert.equal(val('Country C', '2015'), 13, 'distractor "Country C reached 27% in 2015" is false');
  assert.equal(val('Country B', '2020'), 27, '27% in 2020 is Country B');
  assert.equal(val('Country C', '2020'), 16);
  assert.notEqual(val('Country C', '2015'), 27);
});
test('every chart-board task has a non-empty prompt and model answer (5 reading tasks, 4 planning tasks)', () => {
  const boards = lesson.steps.filter((s) => s.material?.type === 'chart-board');
  assert.deepEqual(boards.map((s) => s.id), ['read-dataset', 'plan-paragraph']);
  const counts = boards.map((s) => (s.material as Extract<MaterialBlock, { type: 'chart-board' }>).tasks.length);
  assert.deepEqual(counts, [5, 4]);
  for (const s of boards) {
    const m = s.material as Extract<MaterialBlock, { type: 'chart-board' }>;
    assert.deepEqual(m.tasks.map((t) => t.order), m.tasks.map((_, i) => i + 1));
    assert.equal(new Set(m.tasks.map((t) => t.id)).size, m.tasks.length);
    for (const t of m.tasks) assert.ok(localize('en', t.prompt).length > 15 && t.modelAnswer.length > 15, t.id);
  }
});

// ---------------------------------------------------------------- dataset integrity

test('the chart is the existing renewable-electricity dataset with the exact source values (not a copy)', () => {
  assert.equal(chart.id, 'renewable-electricity');
  assert.deepEqual(chart.categories, ['2000', '2005', '2010', '2015', '2020']);
  assert.deepEqual(chart.series.map((s) => [s.name, s.values]), [
    ['Denmark', [14, 21, 33, 48, 62]],
    ['Country B', [6, 8, 12, 18, 27]],
    ['Country C', [9, 10, 11, 13, 16]],
  ]);
  assert.equal(chart.unit, '% of total electricity generation');
  for (const id of ['read-dataset', 'plan-paragraph']) {
    const m = lesson.steps.find((s) => s.id === id)!.material;
    assert.ok(m && m.type === 'chart-board');
    assert.equal(m.dataset, CHART_DATASETS['renewable-electricity'], id);
  }
  assert.equal(lesson.finalPrompt.chartId, 'renewable-electricity');
  const src = readFileSync('lib/writing-studio/lessons/body-paragraphs.ts', 'utf8');
  assert.ok(!/values:\s*\[/.test(src) && !/categories:\s*\[/.test(src), 'no second dataset in the lesson file');
});
test('derived calculations: Denmark +48, Country B +21, Country C +7 percentage points; Denmark 2020 > 4x 2000', () => {
  assert.equal(rise('Denmark'), 48);
  assert.equal(rise('Country B'), 21);
  assert.equal(rise('Country C'), 7);
  assert.ok(val('Denmark', '2020') / val('Denmark', '2000') > 4 && val('Denmark', '2020') / val('Denmark', '2000') < 5);
  assert.ok(chart.categories.every((_, i) => i === 0 || val('Denmark', years[i]) > val('Denmark', years[i - 1])), 'Denmark increased at every recorded point');
  for (const y of years) assert.equal(COUNTRIES.slice().sort((a, b) => val(b, y) - val(a, y))[0], 'Denmark', `Denmark highest in ${y}`);
});
test('B vs C: C leads by 3 in 2000, B ahead by 1 in 2010, B leads by 11 in 2020 (so they do NOT stay close)', () => {
  const gap = (y: string) => val('Country B', y) - val('Country C', y);
  assert.deepEqual(years.map(gap), [-3, -2, 1, 5, 11]);
  assert.equal(-gap('2000'), 3);
  assert.equal(gap('2010'), 1);
  assert.equal(gap('2020'), 11);
});
test('no inaccurate claim that B and C stay close, that C levels off, or that C ends near 10% (the old lesson\'s errors)', () => {
  const t = allText();
  assert.ok(!/stayed close|remain(?:ed)? close|within a few percentage points|a little over 10%|levelled off|leveled off|accelerated/i.test(t), 'inaccurate trend wording present');
  assert.ok(!/Country C[^.\n]*\b(?:10|11)% in 2020/.test(t));
});
test('every "<country> … from X% [in Y] to Z% [in Y]" claim matches the dataset (start 2000, end 2020 where years are given)', () => {
  let n = 0;
  for (const m of allText().matchAll(/\b(Denmark|Country B|Country C)\b(?:'s)?[^.\n]*?\bfrom (\d+)%(?: in (\d{4}))? to (\d+)%(?: in (\d{4}))?/g)) {
    assert.equal(Number(m[2]), val(m[1], '2000'), m[0]);
    assert.equal(Number(m[4]), val(m[1], '2020'), m[0]);
    if (m[3]) assert.equal(m[3], '2000', m[0]);
    if (m[5]) assert.equal(m[5], '2020', m[0]);
    n++;
  }
  assert.ok(n >= 6, `only ${n} from/to claims were checked`);
});
test('every "<country> was/reached N% in YEAR" claim matches the dataset, except the deliberately wrong clinic examples', () => {
  // The wrong clinic example, and the clinic-3 distractor that is itself a false statement, are excluded here.
  const text = allText()
    .split('Country C reached 27% in 2020').join('')
    .split('Country C reached 27% in 2015').join('');
  let n = 0;
  for (const m of text.matchAll(/\b(Denmark|Country B|Country C)\b (?:was|reached|stood at) (\d+)% in (\d{4})/g)) {
    assert.equal(Number(m[2]), val(m[1], m[3]), m[0]);
    n++;
  }
  assert.ok(n >= 3, `only ${n} claims were checked`);
  // The one wrong claim must only ever be shown as a mistake.
  for (const line of allText().split('\n').filter((l) => /Country C reached 27% in 2020/.test(l))) assert.match(line, /Mistake 6|Weak:|What is wrong|wrong country|learner writes/i, line.slice(0, 120));
});
test('weak list paragraph figures are the real ones (2000, 2005, 2010)', () => {
  const m = lesson.steps.find((s) => s.id === 'weak-vs-developed')!.material;
  assert.ok(m && m.type === 'examples');
  assert.ok(m.weak.includes('Denmark was 14% in 2000 and 21% in 2005. Country B was 6% and 8%. Country C was 9% and 10%. In 2010 Denmark was 33%, Country B was 12% and Country C was 11%.'));
  assert.equal(m.good, DEVELOPED);
});
test('"percentage points" figures are only ever 48, 21, 7, 3 or 11, each tied to the right comparison', () => {
  const t = allText();
  for (const m of t.matchAll(/(\d+)[ -]percentage[ -]points?|(\d+) points? in (Country [BC])/g)) {
    const n = Number(m[1] ?? m[2]);
    assert.ok([48, 21, 7, 3, 11].includes(n), m[0]);
  }
  assert.match(t, /21 points in Country B and 7 points in Country C/);
  assert.match(t, /moved ahead of Country C by 2010/);
});
test('Denmark\'s "more than four times" is stated, and never "five times" or "almost twice" about Denmark', () => {
  assert.match(allText(), /more than four times/);
  assert.ok(!/five times|almost twice as high/i.test(allText().replace('almost twice as high as', '')));
});
test('the percentage-vs-relative mistake example is right: B at 27% vs C at 16% is an 11-point gap, not "27% higher"', () => {
  assert.equal(val('Country B', '2020') - val('Country C', '2020'), 11);
  assert.ok(Math.round(((27 - 16) / 16) * 100) !== 27);
  assert.match(allText(), /27% higher than Country C in 2020\.[\s\S]*?11 percentage points/);
});
test('invented causes (government, policy, preference, responsibility) appear only inside deliberately flagged examples', () => {
  // Wrong multiple-choice options are deliberately false statements, so they are excluded.
  const wrongOptions = new Set(lesson.steps.flatMap((s) => (s.check ? s.check.options.filter((_, i) => i !== s.check!.correctIndex) : [])));
  for (const line of allText().split('\n').filter((l) => !wrongOptions.has(l) && /government|polic(y|ies)|preferred clean energy|environmentally responsible|adopted renewable/i.test(l))) {
    assert.match(line, /Weak|Incorrect|Mistake 3|What is wrong|learner writes|Which claim|unsupported|does not provide|chart does not|cause|reason|Explaining why|Task 4|Task 1|Which focus/i, line.slice(0, 140));
  }
});
test('board model answers agree with the data', () => {
  const m = lesson.steps.find((s) => s.id === 'read-dataset')!.material as Extract<MaterialBlock, { type: 'chart-board' }>;
  const a = Object.fromEntries(m.tasks.map((t) => [t.id, t.modelAnswer]));
  assert.match(a['highest-2000'], /Denmark, at 14%/);
  assert.match(a['highest-2020'], /Denmark, at 62%/);
  assert.match(a['largest-increase'], /Denmark.*48 percentage points/);
  assert.match(a['smallest-increase'], /Country C.*7 percentage points/);
  assert.equal(COUNTRIES.slice().sort((x, y) => rise(y) - rise(x))[0], 'Denmark');
  assert.equal(COUNTRIES.slice().sort((x, y) => rise(x) - rise(y))[0], 'Country C');
  assert.match(a['b-vs-c'], /Country C started 3 percentage points ahead in 2000.*Country B was already slightly ahead by 2010.*11 percentage points ahead in 2020/);
  const p = lesson.steps.find((s) => s.id === 'plan-paragraph')!.material as Extract<MaterialBlock, { type: 'chart-board' }>;
  assert.match(p.tasks.find((t) => t.id === 'plan-order')!.modelAnswer, /^2, then 3, then 1/);
  assert.match(p.tasks.find((t) => t.id === 'plan-focus')!.modelAnswer, /^A\./);
});

// ---------------------------------------------------------------- final prompt / assessment scope

test('final prompt is a paragraph-only skill drill on the renewable-electricity chart', () => {
  const f = lesson.finalPrompt;
  assert.equal(f.title, 'Write One Well-Developed Body Paragraph');
  assert.equal(f.skillFocus, 'Task 1 body paragraph development');
  assert.equal(f.checkScope, 'paragraph-only');
  assert.equal(f.chartId, 'renewable-electricity');
  assert.equal(f.minWords, 70);
  assert.equal(deriveScope(lesson), 'paragraph-only');
  const instructions = localize('en', f.instructions);
  assert.match(instructions, /Write ONE body paragraph/);
  assert.match(instructions, /learning guide, not a universal IELTS rule/);
  assert.ok(!/150|complete task 1|full task 1/i.test(instructions), instructions);
});

const drill = (t: string) => checkEssay(t, lesson.finalPrompt.minWords, 'task1', 'paragraph-only', true);

test('both model paragraphs get no local mistakes: no "Overall" overview, no linker quota, no 150 words, no intro required', () => {
  for (const [label, p] of [['developed', DEVELOPED], ['worked', WORKED]] as const) {
    const r = drill(p);
    assert.deepEqual(r.mistakes, [], `${label}: ${JSON.stringify(r.mistakes)}`);
  }
  assert.ok(!/\boverall\b/i.test(DEVELOPED), 'the model paragraph does not use "Overall" and is still accepted');
});
test('a short but valid paragraph is not marked "underdeveloped": under 70 words is only a neutral suggestion', () => {
  const r = drill('Denmark led throughout, rising from 14% in 2000 to 62% in 2020, whereas Country C grew from 9% to 16%.');
  assert.equal(r.meetsLength, false);
  assert.ok(!r.mistakes.some((m) => /underdeveloped|dedicated overview|linking words|150/.test(m.why + m.fix)), JSON.stringify(r.mistakes));
  assert.ok(r.suggestions.some((s) => /Suggested length/.test(s)));
});
// ---------------------------------------------------------------- scope-aware length suggestion

test('paragraph-only drill: a short paragraph gets a neutral, paragraph-specific suggestion — never "paraphrase", never a length mistake', () => {
  const r = drill('Denmark led throughout, rising from 14% in 2000 to 62% in 2020, whereas Country C grew from 9% to 16%.');
  assert.equal(r.meetsLength, false);
  const sug = r.suggestions.find((x) => /Suggested length/.test(x));
  assert.ok(sug, 'a suggestion is given');
  assert.match(sug!, /around 70 words/);
  assert.match(sug!, /flexible/);
  assert.match(sug!, /develop a clear comparison using accurate supporting data/);
  assert.ok(!/paraphras/i.test(JSON.stringify(r)), 'no paraphrase wording anywhere in a paragraph drill result');
  assert.ok(!/not a strict requirement/.test(sug!), 'not the introduction wording');
  assert.deepEqual(r.mistakes, [], 'no length-related (or any) mistake');
  assert.ok(!/must|required|minimum|too short|underdeveloped|incorrect/i.test(sug!), `suggestion must stay neutral: ${sug}`);
  assert.ok(!/(accurate|correct|good|weak|strong) (comparison|paragraph)s? (is|are|was)/i.test(sug!), 'makes no claim to have judged comparison quality');
});
test('a paragraph that meets the suggested length gets no length suggestion at all', () => {
  const r = drill(DEVELOPED + ' Denmark remained ahead of both other countries at every point.');
  assert.equal(r.meetsLength, true);
  assert.ok(!r.suggestions.some((x) => /Suggested length/.test(x)));
});
test('introduction-only keeps its paraphrase-specific suggestion wording', () => {
  const r = checkEssay('The bar chart compares commuters in one city in 2010 and 2023.', 18, 'task1', 'introduction-only', true);
  const sug = r.suggestions.find((x) => /Suggested length/.test(x))!;
  assert.match(sug, /around 18 words — not a strict requirement, as long as the paraphrase is accurate\./);
  assert.deepEqual(r.mistakes, []);
});
test('overview-only drill gets overview-specific suggestion wording (no "paraphrase"), still a neutral suggestion', () => {
  const r = checkEssay('Car use fell but cycling rose sharply.', 25, 'task1', 'overview-only', true);
  const sug = r.suggestions.find((x) => /Suggested length/.test(x))!;
  assert.match(sug, /around 25 words/);
  assert.match(sug, /flexible/);
  assert.match(sug, /communicates the main pattern accurately/);
  assert.ok(!/paraphras/i.test(sug));
  assert.ok(!r.mistakes.some((m) => /underdeveloped/.test(m.why)));
});
test('the length suggestion is only given for soft-length drills: a non-drill under-length answer is still a Task response mistake', () => {
  const r = checkEssay('Short.', 10, 'task1', 'paragraph-only');
  assert.ok(r.mistakes.some((m) => /underdeveloped/.test(m.why)));
  assert.ok(!r.suggestions.some((x) => /Suggested length/.test(x)));
});
test('the one reliable data check still works: a paragraph with no figures at all is flagged', () => {
  assert.ok(drill('Denmark led throughout the period while the other two countries grew more slowly and in a similar way.').mistakes.some((m) => /specific data/.test(m.why)));
});
test('the local checker makes no claims it cannot back up: it never flags comparisons, grouping, causes or attribution', () => {
  const wrong = drill('Country C reached 27% in 2020 because the government invested more in renewable energy.');
  assert.ok(!wrong.mistakes.some((m) => /attribut|cause|group|compar/i.test(m.why + m.fix)), JSON.stringify(wrong.mistakes));
});
test('regressions: the drill flag changes nothing outside Task 1 paragraph-only (full, overview-only, introduction-only, Task 2)', () => {
  const t = 'Overall, car use fell. However, cycling rose, for example from 6% to 19%.';
  assert.deepEqual(checkEssay(t, 10, 'task1', 'full', true), checkEssay(t, 10, 'task1', 'full'));
  assert.deepEqual(checkEssay(t, 10, 'task1', 'introduction-only', true), checkEssay(t, 10, 'task1', 'introduction-only'));
  assert.deepEqual(checkEssay(t, 10, 'task2', 'paragraph-only', true), checkEssay(t, 10, 'task2', 'paragraph-only'));
  const ov = checkEssay('The chart shows travel methods in a city.', 10, 'task1', 'overview-only', true);
  assert.ok(!ov.mistakes.some((m) => /dedicated overview|linking words/.test(m.why)), 'overview-only drill behaviour is unchanged');
});
test('non-drill Task 1 paragraph-only is unchanged: still wants an overview phrase and linking words', () => {
  const r = checkEssay('Denmark rose from 14% to 62% while Country C rose from 9% to 16%.', 10, 'task1', 'paragraph-only');
  assert.ok(r.mistakes.some((m) => /dedicated overview/.test(m.why)));
  assert.ok(r.mistakes.some((m) => /linking words/.test(m.why)));
});
test('earlier lessons keep their identity and drill configuration', () => {
  assert.equal(visualInformationLesson.finalPrompt.checkScope, 'overview-only');
  assert.equal(task1IntroductionLesson.finalPrompt.checkScope, 'introduction-only');
  assert.equal(overviewWritingLesson.finalPrompt.checkScope, 'overview-only');
  assert.equal(overviewWritingLesson.moduleId, 'task1-m4');
  assert.equal(visualInformationLesson.steps.length, 15);
  assert.equal(task1IntroductionLesson.steps.length, 17);
  assert.equal(overviewWritingLesson.steps.length, 23);
});

// ---------------------------------------------------------------- progress isolation

test('a paragraph drill attempt (band=null) completes the lesson but stores no band and leaves other progress alone', () => {
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
test('LessonRunner withholds the band for any lesson with skillFocus (source-level guard, so paragraph drills are covered)', () => {
  const src = readFileSync('components/writing-studio/LessonRunner.tsx', 'utf8');
  assert.match(src, /lesson\.finalPrompt\.skillFocus \? null : unified\.band/);
  assert.match(src, /checkScope: lesson\.finalPrompt\.checkScope/);
  assert.match(src, /checkEssay\(essay, lesson\.finalPrompt\.minWords, lesson\.task, scope, !!lesson\.finalPrompt\.skillFocus\)/);
});

console.log(`\n${passed} passed`);
