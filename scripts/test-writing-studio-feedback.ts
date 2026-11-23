/** Local Writing Studio feedback checks: deriveScope() and checkEssay(), especially the
 * new 'introduction-only' scope added for Lesson 01's paraphrase-only final task.
 * Run: npx tsx scripts/test-writing-studio-feedback.ts */
import assert from 'node:assert/strict';
import { checkEssay, deriveScope } from '../lib/writing-studio/feedback';
import { task1UnderstandingLesson } from '../lib/writing-studio/lessons/task1-understanding';
import { recordLesson } from '../lib/writing-studio/progress';
import type { WritingStudioProgress } from '../lib/models';

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

// ---------------------------------------------------------------- Issue 3: introduction-only must not require linkers

test('introduction-only: a clean introduction with no linking words is NOT flagged for missing linkers', () => {
  const r = checkEssay(INTRO_GOOD, 20, 'task1', 'introduction-only');
  assert.ok(!r.mistakes.some((m) => /linking words/.test(m.why)), JSON.stringify(r.mistakes));
});
test('overview-only (unchanged): still requires linking words', () => {
  const r = checkEssay('The chart shows travel methods in a city over two years.', 10, 'task1', 'overview-only');
  assert.ok(r.mistakes.some((m) => /linking words/.test(m.why)));
});
test('task2 paragraph-only (unchanged): still requires (at least two) linking words', () => {
  const r = checkEssay(
    'Some people enjoy city life. For example, cities offer more jobs and services. As a result, many people move there every year.',
    10,
    'task2',
    'paragraph-only',
  );
  assert.ok(!r.mistakes.some((m) => /linking words/.test(m.why)), 'two linkers present, so it should NOT be flagged');
  const withoutLinker = checkEssay('Some people enjoy city life. Cities offer more jobs and services, which is why many people move there every year.', 10, 'task2', 'paragraph-only');
  assert.ok(withoutLinker.mistakes.some((m) => /linking words/.test(m.why)), 'no linker at all should still be flagged for a full task2 paragraph');
});
test('task2 full (unchanged): still requires linking words', () => {
  const r = checkEssay('I believe cities are better places to live. Rural areas lack services.', 10, 'task2', 'full');
  assert.ok(r.mistakes.some((m) => /linking words/.test(m.why)));
});

// ---------------------------------------------------------------- Issue 2: Lesson 01's real minWords accepts a clean short introduction

test("Lesson 01's own minWords (not a hardcoded 35) accepts a clean ~21-word introduction", () => {
  const minWords = task1UnderstandingLesson.finalPrompt.minWords;
  assert.ok(minWords <= 25, `expected a pedagogically appropriate minimum for a 1-2 sentence introduction, got ${minWords}`);
  const r = checkEssay(INTRO_GOOD, minWords, 'task1', 'introduction-only');
  assert.equal(r.meetsLength, true, `a ${r.wordCount}-word clean introduction should meet a ${minWords}-word minimum`);
  assert.ok(!r.mistakes.some((m) => /underdeveloped/.test(m.why)), 'should not be penalised for being short');
});

// ---------------------------------------------------------------- Issue 1: skill-check attempts must never store an IELTS band

test('recordLesson: a skill-check attempt (band=null) does not create a new bestBand', () => {
  const empty: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };
  const after = recordLesson(empty, 'task1-understanding', 1, null);
  assert.equal(after.lessons['task1-understanding'].lastBand, null);
  assert.equal(after.lessons['task1-understanding'].bestBand, null);
  assert.equal(after.lessons['task1-understanding'].attempts, 1, 'attempt is still counted');
  assert.ok(after.lessons['task1-understanding'].completedAt, 'completion is still recorded');
});
test('recordLesson: historical band records remain intact after a later skill-check (null) attempt', () => {
  const empty: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };
  const scored = recordLesson(empty, 'task1-full', 1, 6.5);
  assert.equal(scored.lessons['task1-full'].bestBand, 6.5);
  const thenSkillCheck = recordLesson(scored, 'task1-full', 1, null);
  assert.equal(thenSkillCheck.lessons['task1-full'].bestBand, 6.5, 'the earlier real band must not be erased or lowered');
  assert.equal(thenSkillCheck.lessons['task1-full'].lastBand, null, 'the most recent attempt honestly had no band');
  assert.equal(thenSkillCheck.lessons['task1-full'].attempts, 2);
});
test('recordLesson: a real band after a skill-check still raises bestBand normally (unaffected path)', () => {
  const empty: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };
  const skillCheck = recordLesson(empty, 'task1-full', 1, null);
  assert.equal(skillCheck.lessons['task1-full'].bestBand, null);
  const scored = recordLesson(skillCheck, 'task1-full', 1, 7);
  assert.equal(scored.lessons['task1-full'].bestBand, 7);
  assert.equal(scored.lessons['task1-full'].lastBand, 7);
});

// ---------------------------------------------------------------- Round C: a short but
// accurate introduction-only answer must not be treated as a wrong/failing word count

const INTRO_SHORT_CLEAN = 'The two line graphs show the mean monthly temperature and rainfall levels in two cities over a year.';

test('introduction-only: a clean 17-19 word introduction gets NO word-count mistake (guideline, not a hard minimum)', () => {
  const words = INTRO_SHORT_CLEAN.trim().split(/\s+/).length;
  assert.ok(words >= 17 && words <= 19, `fixture is ${words} words, expected 17-19`);
  const r = checkEssay(INTRO_SHORT_CLEAN, 20, 'task1', 'introduction-only');
  assert.equal(r.meetsLength, false, 'genuinely under the suggested length');
  assert.ok(!r.mistakes.some((m) => m.category === 'Task response' && /underdeveloped/.test(m.why)), JSON.stringify(r.mistakes));
  assert.ok(r.suggestions.some((s) => /Suggested length/.test(s)), 'a neutral suggestion is fine, a "mistake" implying it is wrong is not');
});
test('introduction-only: a 20+ word introduction still passes cleanly (no mistake, no suggestion needed)', () => {
  const r = checkEssay(INTRO_GOOD, 20, 'task1', 'introduction-only');
  assert.equal(r.meetsLength, true);
  assert.ok(!r.mistakes.some((m) => m.category === 'Task response' && /underdeveloped/.test(m.why)));
  assert.ok(!r.suggestions.some((s) => /Suggested length/.test(s)), 'already meets the suggested length, so no nudge is needed');
});

test('overview-only (unchanged): a genuinely under-length answer is still flagged as a Task response mistake', () => {
  const r = checkEssay('Short.', 10, 'task1', 'overview-only');
  assert.ok(r.mistakes.some((m) => m.category === 'Task response' && /underdeveloped/.test(m.why)));
});
test('full task1 (unchanged): a genuinely under-length answer is still flagged as a Task response mistake', () => {
  const r = checkEssay('Short.', 10, 'task1', 'full');
  assert.ok(r.mistakes.some((m) => m.category === 'Task response' && /underdeveloped/.test(m.why)));
});
test('task2 paragraph-only (unchanged): a genuinely under-length answer is still flagged as a Task response mistake', () => {
  const r = checkEssay('Short.', 10, 'task2', 'paragraph-only');
  assert.ok(r.mistakes.some((m) => m.category === 'Task response' && /underdeveloped/.test(m.why)));
});
test('task2 full (unchanged): a genuinely under-length answer is still flagged as a Task response mistake', () => {
  const r = checkEssay('Short.', 10, 'task2', 'full');
  assert.ok(r.mistakes.some((m) => m.category === 'Task response' && /underdeveloped/.test(m.why)));
});

// ---------------------------------------------------------------- full Task 1: the local fallback must not judge the overview by phrase-spotting

const FULL_INTRO = 'The bar chart illustrates the proportions of commuters using five different forms of transport in a city in 2010 and 2023.';
const FULL_BODY_1 =
  'Car use fell from 52% in 2010 to 38% in 2023, a decrease of 14 percentage points. Despite this decline, it remained considerably more popular than the other methods in 2023. Bus use also decreased, although the change was smaller, falling from 24% to 21%. Consequently, the gap between car and bus use narrowed from 28 percentage points in 2010 to 17 in 2023.';
const FULL_BODY_2 =
  'In contrast, bicycle use rose markedly from 6% to 19%, an increase of 13 percentage points, and it overtook train use, which had been higher in 2010. Train use also grew, moving from 11% to 15%. Meanwhile, the proportion of commuters who walked remained unchanged at 7% in both years.';
const OVERVIEW_WITH_OVERALL =
  'Overall, car use remained the most common form of transport despite a decline, while bicycle use recorded the most notable increase. Walking was the only category that remained unchanged.';
// An accurate overview that contains none of the predefined overview phrases ("overall", "in general", "it is clear that", ...).
const OVERVIEW_WITHOUT_PHRASE =
  'Car use stayed the most common form of transport even though it declined, whereas cycling grew the most and walking did not change at all.';
// A contradictory overview that nevertheless starts with "Overall".
const OVERVIEW_CONTRADICTORY =
  'Overall, every transport method became more popular, and car use increased the most, while walking also rose sharply.';
const full = (overview: string) => [FULL_INTRO, overview, FULL_BODY_1, FULL_BODY_2].join('\n\n');
const LIMIT_NOTE = /cannot reliably tell whether your response has a clear overview, or whether it summarises the main features accurately/;
const overviewClaims = (r: ReturnType<typeof checkEssay>) => [...r.strengths, ...r.mistakes.flatMap((m) => [m.why, m.fix, m.quote])].filter((x) => /overview/i.test(x));

test('full Task 1: a valid response whose overview starts with "Overall" gets no missing-overview error and no credit for it', () => {
  const r = checkEssay(full(OVERVIEW_WITH_OVERALL), 150, 'task1', 'full');
  assert.equal(r.meetsLength, true);
  assert.deepEqual(r.mistakes, [], JSON.stringify(r.mistakes));
  assert.deepEqual(overviewClaims(r), [], 'the presence of "Overall" is not treated as proof of an overview');
  assert.ok(r.suggestions.some((x) => LIMIT_NOTE.test(x)), 'a neutral limitation note is given instead');
});
test('full Task 1: a valid response with an accurate overview that uses NO predefined overview phrase gets no missing-overview error', () => {
  const text = full(OVERVIEW_WITHOUT_PHRASE);
  for (const p of ['overall', 'in general', 'it is clear that', 'the main feature', 'the most striking', 'a general trend']) assert.ok(!text.toLowerCase().includes(p), `fixture must not contain "${p}"`);
  const r = checkEssay(text, 150, 'task1', 'full');
  assert.equal(r.meetsLength, true);
  assert.deepEqual(r.mistakes, [], JSON.stringify(r.mistakes));
  const found: { why: string; fix: string }[] = r.mistakes;
  assert.ok(!found.some((m) => /overview|stands back|summarises the main trend/i.test(m.why + m.fix)));
  assert.ok(r.suggestions.some((x) => LIMIT_NOTE.test(x)));
});
test('full Task 1: the "with Overall" and "without a phrase" responses get the same local verdict (the checker does not read the overview)', () => {
  const a = checkEssay(full(OVERVIEW_WITH_OVERALL), 150, 'task1', 'full');
  const b = checkEssay(full(OVERVIEW_WITHOUT_PHRASE), 150, 'task1', 'full');
  assert.deepEqual(a.mistakes, b.mistakes);
  assert.deepEqual(a.suggestions.filter((x) => LIMIT_NOTE.test(x)), b.suggestions.filter((x) => LIMIT_NOTE.test(x)));
});
test('full Task 1: a contradictory overview is NOT declared accurate — no overview credit, and the limitation is stated instead', () => {
  const r = checkEssay(full(OVERVIEW_CONTRADICTORY), 150, 'task1', 'full');
  assert.deepEqual(overviewClaims(r), [], 'no strength or verdict about the overview is claimed');
  assert.ok(!r.strengths.some((x) => /accurate|correct|clear overview|overview-style/i.test(x)), JSON.stringify(r.strengths));
  const note = r.suggestions.find((x) => LIMIT_NOTE.test(x));
  assert.ok(note, 'the limitation note is present');
  assert.match(note!, /is every claim true to the chart\?/, 'asks the learner to check accuracy themselves');
  assert.match(note!, /cannot reliably/);
});
test('full Task 1: the existing word-count, figure and surface checks still work', () => {
  const short = checkEssay('Overall, car use fell from 52% to 38%. However, cycling rose from 6% to 19%, for example.', 150, 'task1', 'full');
  assert.equal(short.meetsLength, false);
  assert.ok(short.mistakes.some((m) => m.category === 'Task response' && /underdeveloped/.test(m.why)), '150-word rule is kept');
  assert.ok(short.suggestions.some((x) => LIMIT_NOTE.test(x)), 'limitation note is also given on a short answer');
  assert.ok(!short.suggestions.some((x) => /Suggested length/.test(x)), 'no soft-length drill wording on a full task');
  const noFigures = checkEssay(full(OVERVIEW_WITH_OVERALL).replace(/\d+%/g, 'a share').replace(/\d+ percentage points/g, 'some points').replace(/\d+/g, 'some'), 150, 'task1', 'full');
  assert.ok(noFigures.mistakes.some((m) => /specific data/.test(m.why)), 'figure check is kept');
  const contraction = checkEssay(full(OVERVIEW_WITH_OVERALL) + " Walking isn't the only category that stayed the same.", 150, 'task1', 'full');
  assert.ok(contraction.mistakes.some((m) => /Contractions/.test(m.why)), 'contraction check is kept');
  const noLinkers = checkEssay('The chart shows commuters. Car use fell from 52% to 38% and bicycle use rose from 6% to 19%. ' + 'Walking was 7% in both years. '.repeat(12), 150, 'task1', 'full');
  assert.ok(noLinkers.mistakes.some((m) => /linking words/.test(m.why)), 'linker check is kept');
  assert.equal(typeof short.indicativeBand, 'number');
});
test('skill drills are unchanged: no limitation note and no overview demands for introduction-only, overview-only (drill) and paragraph-only (drill)', () => {
  const intro = checkEssay(FULL_INTRO, 18, 'task1', 'introduction-only', true);
  const overview = checkEssay(OVERVIEW_WITHOUT_PHRASE, 25, 'task1', 'overview-only', true);
  const para = checkEssay(FULL_BODY_1, 80, 'task1', 'paragraph-only', true);
  for (const r of [intro, overview, para]) {
    assert.ok(!r.suggestions.some((x) => LIMIT_NOTE.test(x)), 'the full-task note is not shown in a drill');
    assert.ok(!r.mistakes.some((m) => /dedicated overview|linking words/.test(m.why)), JSON.stringify(r.mistakes));
  }
  assert.deepEqual(intro.mistakes, []);
  assert.deepEqual(overview.mistakes, []);
  assert.deepEqual(para.mistakes, []);
});
test('non-drill overview-only and paragraph-only Task 1 keep their phrase check (only full changed)', () => {
  const ov = checkEssay('The chart shows travel methods in a city.', 10, 'task1', 'overview-only');
  assert.ok(ov.mistakes.some((m) => /dedicated overview/.test(m.why)));
  const pg = checkEssay('Car use fell from 52% to 38% while bicycle use rose from 6% to 19%.', 10, 'task1', 'paragraph-only');
  assert.ok(pg.mistakes.some((m) => /dedicated overview/.test(m.why)));
  assert.ok(!ov.suggestions.some((x) => LIMIT_NOTE.test(x)) && !pg.suggestions.some((x) => LIMIT_NOTE.test(x)));
  const withPhrase = checkEssay('Overall, car use fell while cycling rose.', 5, 'task1', 'overview-only');
  assert.ok(withPhrase.strengths.some((x) => /overview-style sentence/.test(x)), 'non-full scopes still credit the phrase, as before');
});
test('Task 2 fallback is unchanged: no overview note, position and paragraph checks as before', () => {
  const r = checkEssay('Some people enjoy city life. Cities offer jobs.', 10, 'task2', 'full');
  assert.ok(!r.suggestions.some((x) => LIMIT_NOTE.test(x)));
  assert.ok(r.mistakes.some((m) => /clear personal position/.test(m.why)));
  assert.ok(r.mistakes.some((m) => /introduction, at least two body paragraphs/.test(m.why)));
});

console.log(`\n${passed} passed`);
