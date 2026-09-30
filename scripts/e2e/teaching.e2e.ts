// E2E: the teaching flow, walked as a first-time student.
// Run with `bash scripts/e2e/run.sh teaching`.
//
// Six journeys from the refinement brief: IELTS basics → Listening, Noun,
// Subject–verb agreement, Parts of Speech (overview), Reading (True / False /
// Not Given) and Listening question types. For each lesson: an intro says what
// it covers, the rule is taught on short screens BEFORE any question, then
// examples, one guided try, practice (easy → harder) and a "what you learned"
// summary. Questions show the question, then the options, then Check; wrong
// answers say "Not quite." with the reason and the full correct sentence.
// A module test gives no feedback until the end. Bangla mobile: same flow,
// respectful আপনি, no sideways scroll.
import type { Page } from 'playwright-core';
import { findLesson, lessonPages } from '../../lib/foundation';
import { BASE, LABELS, answerCurrent, check, exercise, launch, noHorizontalScroll, report, shot, signUp, tagAll, watchErrors, type Lang } from './helpers';

const errors: string[] = [];
const stamp = Date.now();
const ORDER = ['intro', 'learn', 'examples', 'try', 'practice', 'review'];

interface Walk {
  phases: string[];
  firstQuestionAt: number;
  firstRuleAt: number;
  text: Record<string, string>;
}

/** Walks a lesson screen by screen as a student; answers questions (wrong ones on purpose where asked). */
async function walk(p: Page, lang: Lang, lessonId: string, opts: { wrong?: string[]; shots?: string; stopAfterQuestions?: number } = {}): Promise<Walk> {
  await p.goto(`${BASE}/ielts/foundation/lesson/${lessonId}`, { waitUntil: 'load' });
  await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
  const phases: string[] = [];
  const text: Record<string, string> = {};
  let firstQuestionAt = -1;
  let firstRuleAt = -1;
  let questions = 0;
  for (let i = 0; i < 120; i++) {
    const section = p.locator('main [data-lesson-page]');
    if (!(await section.count())) break; // result screen
    const phase = (await section.getAttribute('data-phase'))!;
    const kind = (await section.getAttribute('data-step-kind'))!;
    const pageIndex = Number(await section.getAttribute('data-lesson-page'));
    if (phase === 'intro' && !('bar' in text)) text.bar = await p.getByTestId('lesson-phases').innerText();
    if (!(phase in text)) {
      text[phase] = await section.innerText();
      if (opts.shots) await shot(p, `${opts.shots}-${String(ORDER.indexOf(phase)).padStart(2, '0')}-${phase}`, false);
    }
    if (kind === 'rule' && firstRuleAt < 0) firstRuleAt = pageIndex;
    const box = p.locator('[data-exercise-id]');
    if (await box.count()) {
      if (firstQuestionAt < 0) firstQuestionAt = pageIndex;
      const id = (await box.getAttribute('data-exercise-id'))!;
      if (opts.stopAfterQuestions !== undefined && questions >= opts.stopAfterQuestions) break;
      await answerCurrent(p, { wrong: opts.wrong?.includes(id) });
      questions++;
      recordPhase(phases, phase);
      continue;
    }
    if ((kind === 'hook' || kind === 'identify') && firstQuestionAt < 0) firstQuestionAt = pageIndex;
    recordPhase(phases, phase);
    const radios = p.locator('main [role=radiogroup] [role=radio]');
    if ((await radios.count()) && !(await p.locator('main [role=radio][aria-checked=true]').count())) await radios.first().click();
    await tagAll(p);
    const complete = p.getByRole('button', { name: LABELS[lang].complete });
    if (await complete.isVisible().catch(() => false)) {
      await complete.click();
      break;
    }
    const next = p.getByRole('button', { name: LABELS[lang].continue });
    if (await next.isEnabled({ timeout: 2000 }).catch(() => false)) await next.click();
    else await p.waitForTimeout(250);
  }
  return { phases: dedupe(phases), firstQuestionAt, firstRuleAt, text };
}

function recordPhase(list: string[], phase: string) {
  if (list.at(-1) !== phase) list.push(phase);
}
const dedupe = (list: string[]) => list.filter((x) => ORDER.includes(x)).filter((x, i, a) => a[i - 1] !== x);
const inOrder = (phases: string[]) => phases.every((ph, i) => i === 0 || ORDER.indexOf(ph) >= ORDER.indexOf(phases[i - 1]));

/** The first practice question whose wrong answer shows a full corrected sentence. */
function gapQuestion(lessonId: string) {
  const l = findLesson(lessonId)!.lesson;
  return lessonPages(l).find((pg) => pg.exercise && (pg.exercise.type === 'choice' || pg.exercise.type === 'gap') && pg.exercise.sentence?.includes('___'))!.exercise!.id;
}

async function main() {
  const browser = await launch();
  try {
    // ============================================================ English, desktop
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    watchErrors(p, 'EN', errors);
    await signUp(p, 'Rafi', `teaching-en-${stamp}@test.dev`, 'en');

    const journeys: [string, string][] = [
      ['Journey 0 · Start Here: What is IELTS?', 'ib-10'],
      ['Journey 1a · Academic IELTS', 'ib-1'],
      ['Journey 1c · Statements, negatives and questions', 'sb-10'],
      ['Journey 1b · Listening basics', 'ls-1'],
      ['Journey 2 · Noun', 'pn-1'],
      ['Journey 3 · Subject–verb agreement', 'sva-1'],
      ['Journey 4 · Parts of Speech overview', 'po-1'],
      ['Journey 5 · Reading: True / False / Not Given', 'rd-3'],
      ['Journey 6 · Listening question types', 'ls-6'],
    ];
    for (const [name, id] of journeys) {
      console.log(`\n[${name}] ${id}`);
      const w = await walk(p, 'en', id, { shots: `teach-en-${id}`, stopAfterQuestions: 3 });
      check(`${id}: opens with "What you’ll learn" and a Start button`, /What you’ll learn/.test(w.text.intro ?? '') && w.phases[0] === 'intro', w.phases.join('>'));
      check(`${id}: the rule is taught before the first question`, w.firstRuleAt > 0 && w.firstRuleAt < w.firstQuestionAt, `rule ${w.firstRuleAt}, question ${w.firstQuestionAt}`);
      check(`${id}: learn → examples → try → practice, never backwards`, inOrder(w.phases) && ['learn', 'examples', 'practice'].every((x) => w.phases.includes(x)), w.phases.join('>'));
      check(`${id}: the step bar shows Learn · Examples · … · Review`, /Learn[\s\S]*Examples[\s\S]*Practice[\s\S]*Review/.test(w.text.bar ?? ''), w.text.bar);
    }

    console.log('\n[Rule screens are short]');
    await p.goto(`${BASE}/ielts/foundation/lesson/sva-1`, { waitUntil: 'load' });
    await p.getByRole('button', { name: 'Start lesson' }).click();
    const rule = p.getByTestId('rule-block');
    await rule.waitFor();
    const words = (await rule.innerText()).split(/\s+/).length;
    check('sva-1: first rule screen is short (≤ 70 words) and the step bar shows "Learn"', words <= 70 && (await p.locator('[data-testid="lesson-phases"] [aria-current="step"]').innerText()) === 'Learn', words);
    check('sva-1: rule screen is split into parts (1/n)', /1\/\d/.test(await p.locator('main h2').first().innerText()));

    console.log('\n[Question card: question → options → Check; feedback teaches]');
    const qid = gapQuestion('sva-1');
    const walkToQ = async () => {
      await p.goto(`${BASE}/ielts/foundation/lesson/sva-1`, { waitUntil: 'load' });
      await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
      for (let i = 0; i < 40 && !(await p.locator(`[data-exercise-id="${qid}"]`).count()); i++) {
        if (await p.locator('[data-exercise-id]').count()) {
          await answerCurrent(p);
          continue;
        }
        const radios = p.locator('main [role=radiogroup] [role=radio]');
        if ((await radios.count()) && !(await p.locator('main [role=radio][aria-checked=true]').count())) await radios.first().click();
        await p.getByRole('button', { name: LABELS.en.continue }).click();
      }
    };
    await walkToQ();
    const card = p.locator(`[data-exercise-id="${qid}"]`);
    const order = await card.evaluate((el) => {
      const q = el.querySelector('[data-testid="question-prompt"]')!.getBoundingClientRect().top;
      const o = el.querySelector('[role=radiogroup]')!.getBoundingClientRect().top;
      const b = el.querySelector('div.flex.justify-end > button')!.getBoundingClientRect().top;
      return q < o && o < b;
    });
    check('question card: question, then options, then Check', order);
    check('options are lettered A, B…', /^A\b/.test((await card.locator('[role=radio]').first().innerText()).trim()));
    const e = exercise(qid)!;
    if (e.type !== 'choice') throw new Error('expected a choice question');
    await card.getByRole('radio', { name: e.options.find((o) => o !== e.answer)!, exact: true }).click();
    await card.getByRole('button', { name: 'Check' }).click();
    const fb = await card.getByRole('status').innerText();
    check('wrong answer: "Not quite." + the reason + the full correct sentence', /Not quite\./.test(fb) && /Correct sentence: My uncle has a small shop in Sylhet\./.test(fb) && /one person/i.test(fb), fb);
    check('no cheerleading in feedback', !/Great|Awesome|🎉|Well done|Almost!/.test(fb));
    await shot(p, 'teach-en-sva-1-feedback-wrong', false);
    await card.getByRole('button', { name: 'Next' }).click();
    const card2 = p.locator('[data-exercise-id]');
    await card2.waitFor();
    const e2 = exercise((await card2.getAttribute('data-exercise-id'))!)!;
    if (e2.type === 'choice') {
      await card2.getByRole('radio', { name: e2.answer, exact: true }).click();
      await card2.getByRole('button', { name: 'Check' }).click();
      const ok = await card2.getByRole('status').innerText();
      check('right answer: "Correct." with the short reason (no "Great job!")', /^Correct\./m.test(ok) && ok.length > 'Correct.'.length + 5 && !/Great|🎉/.test(ok), ok);
    }

    console.log('\n[Summary at the end]');
    const full = await walk(p, 'en', 'po-1', { shots: 'teach-en-po-1-full' });
    check('po-1: ends with "What you learned"', /What you learned/.test(full.text.review ?? ''), full.phases.join('>'));
    check('po-1: taught before any question; ends after all questions', full.firstRuleAt > 0 && full.firstRuleAt < full.firstQuestionAt && full.phases.at(-1) === 'review', full.phases.join('>'));

    console.log('\n[Test mode: no answer until the end]');
    await p.goto(`${BASE}/ielts/foundation/lesson/sva-9`, { waitUntil: 'load' });
    await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
    const testIntro = await p.locator('main').innerText();
    check('module test explains: answers come at the end', /come at the end/.test(testIntro), testIntro.slice(0, 300));
    await p.getByRole('button', { name: LABELS.en.continue }).click();
    const tq = p.locator('[data-exercise-id]');
    await tq.waitFor();
    check('test question says it gives no feedback yet', /answers and explanations come at the end/.test(await p.locator('main').innerText()));
    const tid = (await tq.getAttribute('data-exercise-id'))!;
    const te = exercise(tid)!;
    if (te.type === 'choice') await tq.getByRole('radio', { name: te.answer, exact: true }).click();
    else await tq.getByRole('textbox').fill('xyz');
    await tq.locator('div.flex.justify-end > button').click();
    await p.waitForFunction((id) => document.querySelector('[data-exercise-id]')?.getAttribute('data-exercise-id') !== id, tid, { timeout: 10_000 });
    check('test: checking a question moves straight on (no feedback shown)', (await p.locator('[data-exercise-id] [role=status]').count()) === 0);
    await ctx.close();

    // ============================================================ Bangla, mobile
    const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const q = await m.newPage();
    watchErrors(q, 'BN', errors);
    await signUp(q, 'Rafi', `teaching-bn-${stamp}@test.dev`, 'bn');
    for (const id of ['pn-1', 'sva-1', 'ls-1']) {
      console.log(`\n[bn mobile] ${id}`);
      let overflow = 0;
      const w = await walk(q, 'bn', id, { shots: `teach-bn-${id}`, stopAfterQuestions: 2 });
      if (!(await noHorizontalScroll(q))) overflow++;
      check(`bn ${id}: "যা শিখবেন" intro, then rule before any question`, /যা শিখবেন/.test(w.text.intro ?? '') && w.firstRuleAt < w.firstQuestionAt, w.phases.join('>'));
      check(`bn ${id}: phases in order`, inOrder(w.phases), w.phases.join('>'));
      check(`bn ${id}: respectful আপনি (no তুমি / তোমার)`, !Object.values(w.text).some((t) => /তুমি|তোমার/.test(t)));
      check(`bn ${id}: no sideways scroll`, overflow === 0);
    }
    const bnTry = await walk(q, 'bn', 'sva-1', { stopAfterQuestions: 0 });
    check('bn: the guided try is labelled "এবার আপনি চেষ্টা করুন"', /এবার আপনি চেষ্টা করুন/.test(bnTry.text.try ?? ''), (bnTry.text.try ?? '').slice(0, 120));
    await m.close();

    check('no console or page errors', errors.length === 0, errors.join('\n'));
  } finally {
    await browser.close();
  }
}

main()
  .then(() => process.exit(report()))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
