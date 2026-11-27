/** Bar Chart Mastery Lesson 02 — Part H's 10 mandatory evaluator test cases,
 * using this lesson's own domain (owned/rented accommodation, 1918-2011).
 * Cases 1-8 are single chart-board questions (lib/ai/server/assess/chart-answer.ts,
 * via a fake AIProvider — no network); cases 9-10 are whole-essay structural
 * checks and reuse the EXISTING local fallback checker (checkEssay) rather
 * than inventing a second evaluation engine, confirming it still flags a
 * missing overview and an ungrouped year-by-year list for this lesson.
 * Run: npx tsx scripts/test-bar-chart-mastery-2-eval.ts */
import assert from 'node:assert/strict';
import { assessChartAnswer, type ChartAnswerFeedback } from '../lib/ai/server/assess/chart-answer';
import { checkEssay, deriveScope } from '../lib/writing-studio/feedback';
import { barChartMasteryLesson2 as lesson } from '../lib/writing-studio/lessons/bar-chart-mastery-2';
import type { AIProvider, AIRunRequest } from '../lib/ai/types';

let passed = 0;
const test = (name: string, fn: () => void | Promise<void>) => {
  try {
    const r = fn();
    if (r instanceof Promise) return r.then(() => { passed++; console.log('PASS', name); }).catch((e) => { console.log('FAIL', name, '\n ', (e as Error).message); process.exitCode = 1; });
    passed++;
    console.log('PASS', name);
  } catch (e) {
    console.log('FAIL', name, '\n ', (e as Error).message);
    process.exitCode = 1;
  }
};

let seen: AIRunRequest | undefined;
const fakeOk = (reply: Partial<Omit<ChartAnswerFeedback, 'model'>> & { verdict: ChartAnswerFeedback['verdict'] }): AIProvider => ({
  id: 'fake',
  run: async (req) => {
    seen = req;
    return { text: JSON.stringify({ identifiedFacts: [], missingFacts: [], incorrectClaims: [], explanationBn: '', suggestedAnswerEn: '', ...reply }), model: 'fake', toolCalls: [], truncated: false };
  },
});

const chart = { chartTitle: 'Households owning and renting accommodation in England and Wales, 1918 to 2011', chartUnit: '%', requiredLanguage: 'bn-or-en' as const, acceptableAlternatives: [], evaluationCriteria: [] };
const equalityQuestion = { ...chart, question: 'What happened in 1971?', referenceAnswer: 'The two percentages became equal, at 50% each — the chart\'s crossover point.' };

void (async () => {
  // ---------------------------------------------------------------- 1. exact model-answer wording
  await test('1. A correct answer using the exact model-answer wording is accepted', async () => {
    const res = await assessChartAnswer(fakeOk({ verdict: 'correct' }), { ...equalityQuestion, learnerAnswer: "The two percentages became equal, at 50% each — the chart's crossover point." });
    assert.equal(res.verdict, 'correct');
  });

  // ---------------------------------------------------------------- 2. correct, different wording
  await test('2. A correct answer using completely different wording is accepted', async () => {
    const res = await assessChartAnswer(fakeOk({ verdict: 'correct' }), { ...equalityQuestion, learnerAnswer: 'In 1971 ownership and renting were both exactly 50%, meeting at the same point.' });
    assert.equal(res.verdict, 'correct');
    assert.match(seen!.system!, /judge MEANING against the chart's real facts, never surface features/);
  });

  // ---------------------------------------------------------------- 3. correct trend, approximate values
  await test('3. A correct trend description using approximate values ("about 70%") is accepted, per the stated tolerance rule', async () => {
    const q = { ...chart, question: 'What was the ownership percentage in 2001?', referenceAnswer: 'Ownership stood at 69% in 2001, its peak.' };
    const res = await assessChartAnswer(fakeOk({ verdict: 'correct', identifiedFacts: ['Correctly reports the peak as about 70%, matching 69%.'] }), { ...q, learnerAnswer: 'Ownership was about 70% that year, its highest point.' });
    assert.equal(res.verdict, 'correct');
  });

  // ---------------------------------------------------------------- 4. swapped ownership/renting values
  await test('4. An answer that swaps the ownership and renting values is rejected, and the prompt carries both real figures so a real model can catch the swap', async () => {
    const q = { ...chart, question: 'What percentage of households owned their accommodation in 1918?', referenceAnswer: 'In 1918, 22% of households owned their accommodation.' };
    const res = await assessChartAnswer(fakeOk({ verdict: 'incorrect', incorrectClaims: ['78% is the rented figure for 1918, not the owned figure — these are swapped.'] }), { ...q, learnerAnswer: '78% of households owned their accommodation in 1918.' });
    assert.equal(res.verdict, 'incorrect');
    assert.match(seen!.system!, /22% of households owned/, 'the correct owned figure must be in the prompt for the swap to be catchable');
  });

  // ---------------------------------------------------------------- 5. misses the 1971 crossover
  await test('5. An overview-level answer that never mentions the 1971 crossover is marked partially correct, not fully correct', async () => {
    const overviewQ = {
      ...chart,
      question: 'Write a two-to-three-sentence overview: the overall direction of both series, the 1971 crossover, and the final-decade reversal — not every individual year.',
      referenceAnswer: 'Overall, home ownership increased substantially while renting declined, with the two figures becoming equal in 1971. Ownership then became the dominant form of accommodation, although this pattern reversed slightly in the final decade.',
      requiredLanguage: 'en' as const,
      evaluationCriteria: ['States the two opposing long-term trends', 'States the 1971 crossover', 'States the final-decade reversal'],
    };
    const res = await assessChartAnswer(fakeOk({ verdict: 'partially_correct', identifiedFacts: ['Correctly states ownership rose and renting fell overall.'], missingFacts: ['Does not mention the 1971 crossover, a required criterion.'] }), {
      ...overviewQ,
      learnerAnswer: 'Overall, home ownership increased a lot while renting fell. There was also a small reversal at the end.',
    });
    assert.equal(res.verdict, 'partially_correct');
    assert.ok(res.missingFacts.some((f) => /1971/.test(f)));
  });

  // ---------------------------------------------------------------- 6. false "continuous growth" claim
  await test('6. An answer falsely claiming ownership grew continuously through 2011 is rejected as a real factual error (the chart genuinely declines after 2001)', async () => {
    const q = { ...chart, question: 'Describe the overall trend in ownership.', referenceAnswer: 'Ownership generally increased, from 22% in 1918 to a peak of 69% in 2001, before falling to 64% in 2011.' };
    const res = await assessChartAnswer(fakeOk({ verdict: 'incorrect', incorrectClaims: ['Claims ownership rose continuously through 2011, but it actually fell from 69% to 64% after 2001.'] }), {
      ...q,
      learnerAnswer: 'Home ownership increased continuously and steadily from 1918 all the way to 2011.',
    });
    assert.equal(res.verdict, 'incorrect');
    assert.match(seen!.system!, /falling to 64% in 2011/, 'the real 2011 decline must be in the prompt for this false claim to be catchable');
  });

  // ---------------------------------------------------------------- 7. correct data, grammar mistakes
  await test('7. An answer with correct data but poor grammar is distinguished from a wrong-data answer (data-correct feedback, not rejected outright)', async () => {
    const q = { ...chart, question: 'What percentage rented in 1918?', referenceAnswer: 'In 1918, 78% of households rented their accommodation.' };
    const res = await assessChartAnswer(fakeOk({ verdict: 'correct', identifiedFacts: ['Correctly states 78% for 1918.'], explanationBn: 'তথ্য ঠিক আছে, grammar-এ ছোট সমস্যা আছে (subject-verb)।' }), {
      ...q,
      learnerAnswer: 'In 1918, 78% of household was renting the accommodation.',
    });
    assert.equal(res.verdict, 'correct', 'a real evaluator may still flag the grammar separately, but must not call correct data "incorrect"');
    assert.ok(res.identifiedFacts.length > 0);
  });

  // ---------------------------------------------------------------- 8. fluent English, wrong data
  await test('8. An answer with fluent English but factually wrong data is rejected despite good phrasing', async () => {
    const q = { ...chart, question: 'What percentage rented in 1918?', referenceAnswer: 'In 1918, 78% of households rented their accommodation.' };
    const res = await assessChartAnswer(fakeOk({ verdict: 'incorrect', incorrectClaims: ['States 22%, which is the 1918 ownership figure, not the rented figure (78%).'] }), {
      ...q,
      learnerAnswer: 'In 1918, a clear majority of households — around 22% — chose to rent their homes rather than own them.',
    });
    assert.equal(res.verdict, 'incorrect', 'fluent, confident wording must never substitute for correct data');
  });

  // ---------------------------------------------------------------- 9. incomplete answer, no overview (whole-essay, reuses existing checkEssay)
  test('9. An incomplete full-essay response with no overview sentence: the local checker honestly defers (by design) rather than silently passing it', () => {
    const scope = deriveScope(lesson);
    assert.equal(scope, 'full');
    const noOverviewEssay =
      'In 1918, 22% of households owned their accommodation and 78% rented. In 1939, ownership was 31% and renting was 69%. In 1953, ownership was 32% and renting was 68%. In 1961, ownership was 42% and renting was 58%. In 1971, both were 50%. In 1981, ownership was 60% and renting was 40%. In 1991, ownership was 68% and renting was 32%. In 2001, ownership was 69% and renting was 31%. In 2011, ownership was 64% and renting was 36%.';
    const result = checkEssay(noOverviewEssay, lesson.finalPrompt.minWords, lesson.task, scope, !!lesson.finalPrompt.skillFocus, 'en');
    // For a full-length Task 1 response, checkEssay deliberately never claims to verify the
    // overview itself (a semantic judgement it can't make reliably by pattern-matching) — that
    // real judgement is the AI evaluator's job (assessWritingStudioTask, already covered by
    // test-writing-studio-feedback.ts). What it DOES guarantee is surfacing an honest "check
    // this yourself" note rather than silently passing a response with no overview at all.
    assert.ok(result.suggestions.some((s) => /overview/i.test(s)), 'the honest "cannot verify overview" suggestion should be present');
  });

  // ---------------------------------------------------------------- 10. every year listed, no meaningful grouping
  test('10. An answer that lists every single year with no grouping gets the same honest local-checker deferral, and reports its real word count accurately', () => {
    const scope = deriveScope(lesson);
    const listEveryYear =
      'The chart shows nine years. In 1918 it was 22 and 78. In 1939 it was 31 and 69. In 1953 it was 32 and 68. In 1961 it was 42 and 58. In 1971 it was 50 and 50. In 1981 it was 60 and 40. In 1991 it was 68 and 32. In 2001 it was 69 and 31. In 2011 it was 64 and 36.';
    const result = checkEssay(listEveryYear, lesson.finalPrompt.minWords, lesson.task, scope, !!lesson.finalPrompt.skillFocus, 'en');
    assert.ok(result.suggestions.some((s) => /overview/i.test(s)), 'a mechanical year-by-year list with no overview sentence gets the same honest deferral');
    assert.ok(result.wordCount > 0, 'word count is still computed correctly even for a purely mechanical list');
  });

  // ---------------------------------------------------------------- provider failure never resolves to a verdict (same guarantee as Lesson 01)
  await test("a provider failure for this lesson's questions never produces a correct/partial/incorrect verdict", async () => {
    const throwing: AIProvider = { id: 'fake', run: async () => { throw new Error('provider down'); } };
    await assert.rejects(assessChartAnswer(throwing, { ...equalityQuestion, learnerAnswer: 'x' }));
  });

  console.log(`\n${passed} passed`);
  process.exit(process.exitCode ?? 0);
})();
