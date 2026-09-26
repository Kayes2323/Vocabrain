// E2E: the Tenses module (Foundation, Phase A).
// Run with `pnpm test:e2e:tenses` (starts emulators, the mock AI and the app).
//
// English desktop: module page → Past Simple lesson (with a deliberate tense
// mistake and the "have went … yesterday" sentence for Mino) → Present Perfect
// lesson answered right → two spaced reviews → real mastery → the Tenses Final
// Mastery Challenge and its report → Ask Mino → a fresh sign-in sees it all.
// Bangla mobile: dashboard levels, module page, a new lesson (Present Perfect
// Continuous) with Mino feedback in Bangla, the challenge — no sideways scroll.
import type { Page } from 'playwright-core';
import { conceptMastery, getChallenge } from '../../lib/foundation';
import {
  BASE,
  LABELS,
  answerCurrent,
  check,
  getDoc,
  launch,
  noHorizontalScroll,
  patchField,
  playLesson,
  report,
  shot,
  signIn,
  signUp,
  uidOf,
  waitForFoundation,
  watchErrors,
} from './helpers';

const errors: string[] = [];
const stamp = Date.now();

/** Makes a concept's spaced review due now, as if the waiting time had passed. */
async function makeDue(uid: string, concept: string) {
  const f = (await getDoc(`users/${uid}`)).app.foundation;
  const c = f.concepts[concept];
  c.srs.dueAt = new Date(Date.now() - 60_000).toISOString();
  await patchField(`users/${uid}`, 'app.foundation.concepts', f.concepts);
}

async function takeReview(p: Page, concept: string) {
  await p.goto(`${BASE}/ielts/foundation/review/${concept}`, {
    waitUntil: 'load',
  });
  await p.getByRole('button', { name: LABELS.en.reviewStart }).click({ timeout: 60_000 });
  for (let i = 0; i < 12 && (await p.locator('[data-exercise-id]').count()); i++) await answerCurrent(p);
  await p.getByText('Well done — review complete!').waitFor({ timeout: 15_000 });
}

async function main() {
  const browser = await launch();
  try {
    // ============================================================ English, desktop
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
    });
    const p = await ctx.newPage();
    watchErrors(p, 'EN', errors);
    const email = `tenses-en-${stamp}@test.dev`;
    await signUp(p, 'Rafi', email, 'en');
    const uid = (await uidOf(p))!;

    console.log('\n[1] Foundation dashboard and the Tenses module');
    await p.goto(`${BASE}/ielts/foundation`, { waitUntil: 'load' });
    await p.getByText('Level 1 — Foundation Grammar').waitFor({ timeout: 60_000 });
    check('dashboard shows LEVEL 1 — Foundation Grammar and LEVEL 2 — IELTS Basics', await p.getByText('Level 2 — IELTS Basics').isVisible());
    check('dashboard links to the Tenses module', await p.locator('main a[href="/ielts/foundation/tenses"]').first().isVisible());
    // (Clicking it first offers Sentence Basics — "guide, don't block" — so open the module directly.)
    await p.goto(`${BASE}/ielts/foundation/tenses`, { waitUntil: 'load' });
    const lessonLinks = p.locator('main a[href^="/ielts/foundation/lesson/t-"]');
    await lessonLinks.first().waitFor({ timeout: 30_000 });
    check('Tenses module opens with 15 lessons', (await lessonLinks.count()) === 15, await lessonLinks.count());
    check('no lesson in Tenses is marked "Soon"', (await p.locator('main').getByText('Soon', { exact: true }).count()) === 0);
    check('the Tenses Final Mastery Challenge is listed', await p.locator('main a[href="/ielts/foundation/challenge/tenses"]').isVisible());
    await shot(p, 'en-01-tenses-module');

    console.log('\n[2] Past Simple: a deliberate tense mistake and "have went … yesterday" for Mino');
    await p.goto(`${BASE}/ielts/foundation/lesson/t-4`, { waitUntil: 'load' });
    await p.locator('main [role=radio]').first().waitFor({ timeout: 60_000 });
    let minoWhy = '';
    let followUp = false;
    const answered = await playLesson(p, 'en', {
      wrong: ['t-4-r1'],
      write: 'I have went to Dhaka yesterday.',
      afterWrite: async (pg) => {
        await pg.getByText('Quick practice from Mino').waitFor({ timeout: 20_000 });
        minoWhy = await pg.locator('[data-exercise-id]').innerText();
        await shot(pg, 'en-02-mino-tense-feedback', false);
        await pg.locator('form').getByRole('textbox').fill('visited');
        await pg.locator('form').getByRole('button', { name: 'Check' }).click();
        followUp = await pg.getByText('Right! You’ve got it.').isVisible();
      },
    });
    check('lesson t-4 plays through every step (recall + write included)', answered.includes('t-4-r1') && answered.includes('t-4-e6'), answered.join(','));
    check('Mino names the time word: "yesterday" is a finished time → Past Simple', /yesterday/.test(minoWhy) && /Past Simple/.test(minoWhy), minoWhy);
    check('Mino separates the form error: "have went" is never correct', /never a correct form/.test(minoWhy));
    check('Mino gives one follow-up question, checked right', followUp);
    let f = await waitForFoundation(uid, (x) => x.lessons?.['t-4']);
    check('Firestore: lesson t-4 completed', Boolean(f?.lessons?.['t-4']));
    const ps = f?.concepts?.['past-simple'] ?? {};
    check('Firestore: free recall recorded for past-simple', (ps.recallAttempts ?? 0) >= 3 && (ps.recallCorrect ?? 0) >= 2, JSON.stringify(ps).slice(0, 160));
    const miss = (f?.mistakes ?? []).find((m: { questionId: string }) => m.questionId === 't-4-r1');
    check('Firestore: the mistake is saved with its pattern (past-vs-perfect)', miss?.pattern === 'past-vs-perfect', JSON.stringify(miss ?? {}).slice(0, 160));
    const wrote = (f?.mistakes ?? []).find((m: { questionType: string; answer: string }) => m.questionType === 'write' && /have went/.test(m.answer));
    check('Firestore: the wrong personal sentence is saved as a mistake', Boolean(wrote));
    check('Firestore: spaced review scheduled for past-simple', Boolean(ps.srs?.dueAt) && Date.parse(ps.srs.dueAt) > Date.now(), ps.srs?.dueAt);
    check('no fake mastery: finishing the lesson is not mastery', conceptMastery(f, 'past-simple').level !== 'mastered');

    console.log('\n[3] Present Perfect answered right → mastery only after 2 due reviews');
    await p.goto(`${BASE}/ielts/foundation/lesson/t-6`, { waitUntil: 'load' });
    await p.locator('main [role=radio]').first().waitFor({ timeout: 60_000 });
    await playLesson(p, 'en', {
      write: 'I have lived in Dhaka since 2015. The city has grown a lot.',
    });
    f = await waitForFoundation(uid, (x) => x.lessons?.['t-6'] && (x.concepts?.['present-perfect']?.appliedCorrect ?? 0) >= 1);
    let m = conceptMastery(f, 'present-perfect');
    check('recognition, recall and application proven for present-perfect', m.recognition && m.recall && m.application, JSON.stringify(m));
    check('…but not mastered before spaced reviews', m.level === 'practising' && !m.consistency);
    // The lesson schedules the first review a few hours later: taking it now is practice, not a spaced pass.
    await takeReview(p, 'present-perfect');
    f = await waitForFoundation(uid, (x) => x.concepts?.['present-perfect']?.lastReviewScore !== undefined);
    check('a review taken before it is due does not count', (f.concepts['present-perfect'].srs.passes ?? 0) === 0, f.concepts['present-perfect'].srs.passes);
    await makeDue(uid, 'present-perfect');
    await takeReview(p, 'present-perfect');
    f = await waitForFoundation(uid, (x) => x.concepts?.['present-perfect']?.srs?.passes >= 1);
    check(
      'first due review passed → still not mastered',
      f.concepts['present-perfect'].srs.passes === 1 && conceptMastery(f, 'present-perfect').level !== 'mastered',
    );
    await makeDue(uid, 'present-perfect');
    await takeReview(p, 'present-perfect');
    f = await waitForFoundation(uid, (x) => x.concepts?.['present-perfect']?.srs?.passes >= 2);
    m = conceptMastery(f, 'present-perfect');
    check(
      'Firestore: 2 due spaced reviews passed → present-perfect mastered',
      m.level === 'mastered',
      JSON.stringify(f.concepts['present-perfect']).slice(0, 160),
    );

    console.log('\n[4] Tenses Final Mastery Challenge');
    const ch = getChallenge('tenses')!;
    await p.goto(`${BASE}/ielts/foundation/challenge/tenses`, {
      waitUntil: 'load',
    });
    await p.getByRole('button', { name: 'Start the challenge' }).waitFor({ timeout: 60_000 });
    check('intro lists the 8 parts', (await p.locator('main ol > li').count()) === ch.parts.length, await p.locator('main ol > li').count());
    await shot(p, 'en-03-challenge-intro');
    await p.getByRole('button', { name: 'Start the challenge' }).click();
    const parts = new Set<string>();
    const levels = new Set<string>();
    const total = ch.parts.length * 3;
    for (let i = 0; i < total; i++) {
      await p.locator('[data-exercise-id]').waitFor({ timeout: 15_000 });
      parts.add(
        (
          await p
            .getByText(/^Part [A-H] · /)
            .first()
            .innerText()
        ).slice(5, 6),
      );
      levels.add(
        await p
          .getByText(/^Level: /)
          .first()
          .innerText(),
      );
      if (i === 4) await shot(p, 'en-04-challenge-question', false);
      // Right for the first part of the run, then wrong: the level must move both ways.
      await answerCurrent(p, {
        wrong: i >= 8 && i % 2 === 0,
        write: 'Last year I moved to Dhaka, and I have lived here since then.',
      });
    }
    check(`challenge asks ${total} questions across all 8 parts`, parts.size === ch.parts.length, [...parts].join(''));
    check('challenge adapts (the level changes during the run)', levels.size >= 2, [...levels].join(' / '));
    await p.getByText('Tense by tense').waitFor({ timeout: 15_000 });
    const reportText = await p.locator('main').innerText();
    check('report: overall %, by part, tense by tense', /\d+%/.test(reportText) && /By part/.test(reportText) && /Tense by tense/.test(reportText));
    check('report: strongest and weakest tense', /Strongest/.test(reportText) && /Needs work/.test(reportText));
    check('report: my mistakes and what to practise next', /Your mistakes/.test(reportText) && /Practise next/.test(reportText));
    check(
      'report says it is a learning assessment, not an IELTS score',
      reportText.includes('This is a Vocab Brain learning assessment, not an official IELTS score.'),
    );
    check('report offers "Ask Mino about my Tenses report"', await p.getByRole('link', { name: 'Ask Mino about my Tenses report' }).isVisible());
    await shot(p, 'en-05-challenge-report');
    f = await waitForFoundation(uid, (x) => x.finals?.tenses?.attempts === 1);
    check(
      'Firestore: result stored in finals.tenses (Parts of Speech result untouched)',
      f?.finals?.tenses?.attempts === 1 && !f.posFinal,
      JSON.stringify(f?.finals ?? {}).slice(0, 160),
    );

    console.log('\n[5] Ask Mino about the report');
    await p.getByRole('link', { name: 'Ask Mino about my Tenses report' }).click();
    await p.waitForURL('**/mino**');
    const minoReply = p.getByText(/^Mock Mino: /).last();
    await minoReply.waitFor({ timeout: 60_000 });
    check(
      'Mino sees the stored Tenses challenge result',
      /Tenses Final Mastery Challenge: last \d+%/.test(await minoReply.innerText()),
      await minoReply.innerText(),
    );
    await ctx.close();

    console.log('\n[6] Persistence: a fresh sign-in sees the same progress');
    const ctx2 = await browser.newContext({
      viewport: { width: 1280, height: 900 },
    });
    const p2 = await ctx2.newPage();
    watchErrors(p2, 'EN2', errors);
    await signIn(p2, email);
    await p2.goto(`${BASE}/ielts/foundation/tenses`, { waitUntil: 'load' });
    await p2.locator('main a[href="/ielts/foundation/challenge/tenses"]').waitFor({ timeout: 60_000 });
    check(
      'module page shows the best challenge score after sign-in',
      await p2
        .locator('main a[href="/ielts/foundation/challenge/tenses"]')
        .getByText(/^Best \d+%$/)
        .isVisible(),
    );
    check(
      'module page shows the finished lessons',
      (await p2
        .locator('main a[href="/ielts/foundation/lesson/t-4"], main a[href="/ielts/foundation/lesson/t-6"]')
        .filter({ hasText: /Done|%/ })
        .count()) === 2,
    );
    await ctx2.close();

    // ============================================================ Bangla, mobile
    console.log('\n[7] Bangla, mobile');
    const mctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const q = await mctx.newPage();
    watchErrors(q, 'BN', errors);
    await signUp(q, 'Nila', `tenses-bn-${stamp}@test.dev`, 'bn');
    const uidBn = (await uidOf(q))!;
    await q.goto(`${BASE}/ielts/foundation`, { waitUntil: 'load' });
    await q.getByText('Level 1 — Foundation Grammar').waitFor({ timeout: 60_000 });
    check('bn dashboard: levels shown, no sideways scroll', (await q.getByText('Level 2 — IELTS Basics').isVisible()) && (await noHorizontalScroll(q)));
    await q.goto(`${BASE}/ielts/foundation/tenses`, { waitUntil: 'load' });
    await q.locator('main a[href^="/ielts/foundation/lesson/t-"]').first().waitFor({ timeout: 60_000 });
    check(
      'bn Tenses module: 15 lessons, no sideways scroll',
      (await q.locator('main a[href^="/ielts/foundation/lesson/t-"]').count()) === 15 && (await noHorizontalScroll(q)),
    );
    await shot(q, 'bn-01-tenses-module');
    await q.goto(`${BASE}/ielts/foundation/lesson/t-13`, { waitUntil: 'load' });
    await q.locator('main [role=radio]').first().waitFor({ timeout: 60_000 });
    let overflow = 0;
    let bnFeedback = '';
    await playLesson(q, 'bn', {
      write: 'I am learning English for 10 years.',
      afterWrite: async (pg) => {
        await pg.getByText('Mino-র ছোট practice').waitFor({ timeout: 20_000 });
        bnFeedback = await pg.locator('[data-exercise-id]').innerText();
        if (!(await noHorizontalScroll(pg))) overflow++;
        await shot(pg, 'bn-02-mino-feedback', false);
      },
    });
    check('bn new lesson (Present Perfect Continuous) completes', Boolean((await waitForFoundation(uidBn, (x) => x.lessons?.['t-13']))?.lessons?.['t-13']));
    check('bn Mino feedback is in Bangla', /ভালো চেষ্টা/.test(bnFeedback), bnFeedback.slice(0, 120));
    check('bn Mino feedback: no sideways scroll', overflow === 0);
    await q.goto(`${BASE}/ielts/foundation/challenge/tenses`, {
      waitUntil: 'load',
    });
    await q.getByRole('button', { name: LABELS.bn.start }).waitFor({ timeout: 60_000 });
    check('bn challenge intro: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'bn-03-challenge-intro');
    await q.getByRole('button', { name: LABELS.bn.start }).click();
    await q.locator('[data-exercise-id]').waitFor();
    check('bn challenge question: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'bn-04-challenge-question', false);
    await mctx.close();
  } catch (e) {
    const page = browser
      .contexts()
      .flatMap((c) => c.pages())
      .at(-1);
    if (page) {
      console.log(
        'PAGE:',
        (
          await page
            .locator('main')
            .innerText()
            .catch(() => '')
        ).slice(0, 800),
      );
      await shot(page, 'failure').catch(() => {});
    }
    check('EXCEPTION', false, (e as Error).stack ?? e);
  }
  await browser.close();
  check('no page errors', errors.length === 0, errors.slice(0, 5).join(' | '));
  process.exit(report());
}

void main();
