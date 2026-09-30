// E2E: the Subject–Verb Agreement module (Foundation, Module 5).
// Run with `pnpm test:e2e:agreement` (starts emulators, the mock AI and the app).
//
// English desktop: dashboard and module page → "Long subjects" with deliberate
// mistakes and "The quality of schools … have improved" for Mino → the mistake
// pattern opens a 5-question fix → "Two subjects" answered right → spaced
// reviews → real mastery → the Final Mastery Challenge and its report → Ask
// Mino → a fresh sign-in sees it all.
// Bangla mobile: module page, the first lesson with Mino feedback in Bangla,
// resume after a reload, the challenge — no sideways scroll.
import { conceptMastery, getChallenge } from '../../lib/foundation';
import {
  BASE, LABELS, answerCurrent, check, launch, makeDue, noHorizontalScroll, playChallenge, playLesson, report, shot, signIn, signUp, takeReview, uidOf,
  waitForFoundation, watchErrors,
} from './helpers';

const errors: string[] = [];
const stamp = Date.now();

async function main() {
  const browser = await launch();
  try {
    // ============================================================ English, desktop
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    watchErrors(p, 'EN', errors);
    const email = `agreement-en-${stamp}@test.dev`;
    await signUp(p, 'Rafi', email, 'en');
    const uid = (await uidOf(p))!;

    console.log('\n[1] Foundation dashboard and the Agreement module');
    await p.goto(`${BASE}/ielts/foundation`, { waitUntil: 'load' });
    await p.getByText('Level 1 — English Foundation').waitFor({ timeout: 60_000 });
    const card = p.locator('main [data-topic-modules~="agreement"]').first();
    check('dashboard links to Subject–Verb Agreement, and the card is no longer "Soon"', (await card.isVisible()) && !(await card.innerText()).includes('Soon'), await card.innerText());
    const articlesCard = p.locator('main [data-topic-modules~="articles"]').first();
    check('Articles is still available on the dashboard', (await articlesCard.isVisible()) && !(await articlesCard.innerText()).includes('Soon'));
    await p.goto(`${BASE}/ielts/foundation/agreement`, { waitUntil: 'load' });
    const lessonLinks = p.locator('main [data-lesson-card^="sva-"]');
    await lessonLinks.first().waitFor({ timeout: 30_000 });
    check('Agreement module opens with 9 lessons', (await lessonLinks.count()) === 9, await lessonLinks.count());
    check('no Agreement lesson is marked "Soon"', (await p.locator('main').getByText('Soon', { exact: true }).count()) === 0);
    check('the Agreement Final Mastery Challenge is listed', await p.locator('main a[href="/ielts/foundation/challenge/agreement"]').isVisible());
    await shot(p, 'sva-en-01-module');

    console.log('\n[2] Long subjects: deliberate mistakes, immediate feedback and Mino');
    await p.goto(`${BASE}/ielts/foundation/lesson/sva-4`, { waitUntil: 'load' });
    await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
    let minoText = '';
    let followUp = false;
    const answered = await playLesson(p, 'en', {
      wrong: ['sva-4-p1', 'sva-4-p2', 'sva-4-p3'],
      write: 'The quality of schools in my area have improved a lot.',
      afterWrite: async (pg) => {
        await pg.getByText('Quick practice from Mino').waitFor({ timeout: 20_000 });
        minoText = await pg.locator('[data-exercise-id]').innerText();
        await shot(pg, 'sva-en-02-mino-feedback', false);
        await pg.locator('form').getByRole('textbox').fill('has');
        await pg.locator('form').getByRole('button', { name: 'Check' }).click();
        followUp = (await pg.getByTestId('mino-practice-result').innerText()).trim() === 'Correct.';
      },
    });
    check('lesson sva-4 plays through every step (practice, recall, correction, write)', ['sva-4-p1', 'sva-4-r1', 'sva-4-c2', 'sva-4-y1'].every((id) => answered.includes(id)), answered.join(','));
    check('Mino names the real subject ("the quality", one) and the fix', /the quality/.test(minoText) && /has improved/.test(minoText), minoText);
    check('Mino gives one follow-up question, checked right', followUp);
    let f = await waitForFoundation(uid, (x) => x.lessons?.['sva-4']);
    check('Firestore: lesson sva-4 completed', Boolean(f?.lessons?.['sva-4']));
    const c = f?.concepts?.['sva-long'] ?? {};
    check('Firestore: free recall recorded for sva-long', (c.recallAttempts ?? 0) >= 3, JSON.stringify(c).slice(0, 160));
    const miss = (f?.mistakes ?? []).find((m: { questionId: string }) => m.questionId === 'sva-4-p1');
    check('Firestore: the mistake is saved with its concept and pattern', miss?.concept === 'sva-long' && miss?.pattern === 'sva-long-subject', JSON.stringify(miss ?? {}).slice(0, 200));
    check('Firestore: spaced review scheduled for sva-long', Boolean(c.srs?.dueAt) && Date.parse(c.srs.dueAt) > Date.now(), c.srs?.dueAt);
    check('no fake mastery: finishing the lesson is not mastery', conceptMastery(f, 'sva-long').level !== 'mastered');

    console.log('\n[3] Immediate feedback: why the wrong answer is wrong');
    await p.goto(`${BASE}/ielts/foundation/lesson/sva-1`, { waitUntil: 'load' });
    await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
    for (let i = 0; i < 40 && !(await p.locator('[data-exercise-id="sva-1-p1"]').count()); i++) {
      const radios = p.locator('main [role=radiogroup] [role=radio]');
      if ((await radios.count()) && !(await p.locator('main [role=radio][aria-checked=true]').count())) await radios.first().click();
      const next = p.getByRole('button', { name: LABELS.en.continue });
      if (await next.isEnabled({ timeout: 2000 }).catch(() => false)) await next.click();
      else await p.waitForTimeout(250);
    }
    const box = p.locator('[data-exercise-id="sva-1-p1"]');
    await box.getByRole('radio', { name: 'have', exact: true }).click();
    await box.locator('div.flex.justify-end > button').click();
    const fb = await box.innerText();
    check('a wrong choice shows why it is wrong ("My uncle" is one person)', /"My uncle" is one person/.test(fb), fb.slice(0, 300));
    check('…and the rule for the right answer', /One uncle = he → has/.test(fb));
    await shot(p, 'sva-en-03-feedback', false);

    console.log('\n[4] Mistake pattern → 5-question fix');
    await p.goto(`${BASE}/ielts/foundation/agreement`, { waitUntil: 'load' });
    const fixLink = p.locator('main a[href="/ielts/foundation/fix/sva-long-subject"]');
    await fixLink.waitFor({ timeout: 30_000 });
    check('module page offers the fix for the repeated mistake', await fixLink.isVisible());
    await fixLink.click();
    await p.getByText('Fix: Finding the real subject in long subjects').first().waitFor({ timeout: 30_000 });
    check('fix shows the rule first', /HEAD word/.test(await p.locator('main').innerText()));
    await p.getByRole('button', { name: 'Start 5 questions' }).click();
    for (let i = 0; i < 5; i++) {
      await p.locator('[data-exercise-id]').waitFor({ timeout: 15_000 });
      await answerCurrent(p);
    }
    await p.getByText('Pattern fixed!').waitFor({ timeout: 15_000 });
    const fixText = await p.locator('main').innerText();
    check('fix summary: why it happens, how to recognise it, how to avoid it', /Why it happens/i.test(fixText) && /How to recognise it/i.test(fixText) && /How to avoid it/i.test(fixText));
    await shot(p, 'sva-en-04-fix');
    f = await waitForFoundation(uid, (x) => x.posFixes?.['sva-long-subject']);
    check('Firestore: the fix is recorded', Boolean(f?.posFixes?.['sva-long-subject']), JSON.stringify(f?.posFixes ?? {}).slice(0, 160));

    console.log('\n[5] Two subjects answered right → mastery only after 2 due reviews');
    await p.goto(`${BASE}/ielts/foundation/lesson/sva-2`, { waitUntil: 'load' });
    await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
    await playLesson(p, 'en', { write: 'My brother and I play football, and neither of us likes cricket.' });
    f = await waitForFoundation(uid, (x) => x.lessons?.['sva-2'] && (x.concepts?.['sva-compound']?.appliedCorrect ?? 0) >= 1);
    let m = conceptMastery(f, 'sva-compound');
    check('recognition, recall and application proven for sva-compound', m.recognition && m.recall && m.application, JSON.stringify(m));
    check('…but not mastered before spaced reviews', m.level === 'practising');
    await makeDue(uid, 'sva-compound');
    await takeReview(p, 'sva-compound');
    f = await waitForFoundation(uid, (x) => x.concepts?.['sva-compound']?.srs?.passes >= 1);
    check('first due review passed → still not mastered', conceptMastery(f, 'sva-compound').level !== 'mastered');
    await makeDue(uid, 'sva-compound');
    await takeReview(p, 'sva-compound');
    f = await waitForFoundation(uid, (x) => x.concepts?.['sva-compound']?.srs?.passes >= 2);
    m = conceptMastery(f, 'sva-compound');
    check('Firestore: 2 due spaced reviews passed → sva-compound mastered', m.level === 'mastered');

    console.log('\n[6] Subject–Verb Agreement Final Mastery Challenge');
    const ch = getChallenge('agreement')!;
    await p.goto(`${BASE}/ielts/foundation/challenge/agreement`, { waitUntil: 'load' });
    await p.getByRole('button', { name: 'Start the challenge' }).waitFor({ timeout: 60_000 });
    check('intro lists the 6 parts', (await p.locator('main ol > li').count()) === ch.parts.length, await p.locator('main ol > li').count());
    await shot(p, 'sva-en-05-challenge-intro');
    await p.getByRole('button', { name: 'Start the challenge' }).click();
    const total = ch.parts.length * 3;
    const run = await playChallenge(p, total, (i) => i >= 6 && i % 2 === 0, /^Part [A-F] · /);
    check(`challenge asks ${total} questions across all 6 parts`, run.parts.size === ch.parts.length, [...run.parts].join(''));
    check('challenge adapts (the level changes during the run)', run.levels.size >= 2, [...run.levels].join(' / '));
    await p.getByText(/Topic by topic/i).waitFor({ timeout: 15_000 });
    const reportText = await p.locator('main').innerText();
    check('report: overall %, by part, topic by topic', /\d+%/.test(reportText) && /By part/i.test(reportText) && /Topic by topic/i.test(reportText));
    check('report: strongest / weakest, my mistakes, what to practise', /Strongest|Needs work/i.test(reportText) && /Your mistakes/i.test(reportText) && /Practise next/i.test(reportText));
    check('report says it is a learning assessment, not an IELTS score', reportText.includes('This is a Mino learning assessment, not an official IELTS score.'));
    const ask = p.getByRole('link', { name: 'Ask Mino about my Subject–Verb Agreement report' });
    check('report offers "Ask Mino about my Subject–Verb Agreement report"', await ask.isVisible());
    await shot(p, 'sva-en-06-challenge-report');
    f = await waitForFoundation(uid, (x) => x.finals?.agreement?.attempts === 1);
    check('Firestore: result stored in finals.agreement', f?.finals?.agreement?.attempts === 1 && !f.finals.articles && !f.finals.tenses, JSON.stringify(f?.finals ?? {}).slice(0, 160));

    console.log('\n[7] Ask Mino about the report');
    await ask.click();
    await p.waitForURL('**/mino**');
    const minoReply = p.getByText(/^Mock Mino: /).last();
    await minoReply.waitFor({ timeout: 60_000 });
    check('Mino sees the stored Agreement challenge result', /Subject–Verb Agreement Final Mastery Challenge: last \d+%/.test(await minoReply.innerText()), await minoReply.innerText());
    await ctx.close();

    console.log('\n[8] Persistence: a fresh sign-in sees the same progress');
    const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p2 = await ctx2.newPage();
    watchErrors(p2, 'EN2', errors);
    await signIn(p2, email);
    await p2.goto(`${BASE}/ielts/foundation/agreement`, { waitUntil: 'load' });
    await p2.locator('main a[href="/ielts/foundation/challenge/agreement"]').waitFor({ timeout: 60_000 });
    check('module page shows the best challenge score after sign-in', await p2.locator('main a[href="/ielts/foundation/challenge/agreement"]').getByText(/^Best \d+%$/).isVisible());
    check('module page shows the finished lessons', (await p2.locator('main [data-lesson-card="sva-2"][data-state="done"], main [data-lesson-card="sva-4"][data-state="done"]').count()) === 2);
    await ctx2.close();

    // ============================================================ Bangla, mobile
    console.log('\n[9] Bangla, mobile');
    const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const q = await mctx.newPage();
    watchErrors(q, 'BN', errors);
    await signUp(q, 'Nusrat', `agreement-bn-${stamp}@test.dev`, 'bn');
    const uidBn = (await uidOf(q))!;
    await q.goto(`${BASE}/ielts/foundation/agreement`, { waitUntil: 'load' });
    await q.locator('main [data-lesson-card^="sva-"]').first().waitFor({ timeout: 60_000 });
    check('bn Agreement module: 9 lessons, no sideways scroll', (await q.locator('main [data-lesson-card^="sva-"]').count()) === 9 && (await noHorizontalScroll(q)));
    const bnModule = await q.locator('main').innerText();
    check('bn module page renders Bangla text', /[ঀ-৿]/.test(bnModule));
    check('bn: respectful Bangla (no তুমি / তোমার / তুই)', !/তুমি|তোমার|তুই/.test(bnModule));
    await shot(q, 'sva-bn-01-module');

    // Resume: answer a few questions, reload, and continue where the student left off.
    await q.goto(`${BASE}/ielts/foundation/lesson/sva-1`, { waitUntil: 'load' });
    await q.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
    let bnLesson = '';
    for (let i = 0; i < 60 && !(await q.locator('[data-exercise-id="sva-1-p3"]').count()); i++) {
      bnLesson += `\n${await q.locator('main').innerText()}`;
      if (await q.locator('[data-exercise-id]').count()) {
        await answerCurrent(q);
        continue;
      }
      const radios = q.locator('main [role=radiogroup] [role=radio]');
      if ((await radios.count()) && !(await q.locator('main [role=radio][aria-checked=true]').count())) await radios.first().click();
      const next = q.getByRole('button', { name: LABELS.bn.continue });
      if (await next.isEnabled({ timeout: 2000 }).catch(() => false)) await next.click();
      else await q.waitForTimeout(250);
    }
    check('bn lesson: Bangla explanation with English examples', /[ঀ-৿]/.test(bnLesson) && /My (father|sister|two brothers)/.test(bnLesson), bnLesson.slice(0, 200));
    check('bn lesson: no তুমি / তোমার / তুই', !/তুমি|তোমার|তুই/.test(bnLesson));
    check('bn lesson step: no sideways scroll', await noHorizontalScroll(q));
    const saved = await waitForFoundation(uidBn, (x) => x.inProgress?.lessonId === 'sva-1' && Object.keys(x.inProgress.answers ?? {}).length >= 2);
    check('Firestore: the unfinished lesson is saved with its answers', saved?.inProgress?.lessonId === 'sva-1', JSON.stringify(saved?.inProgress ?? {}).slice(0, 160));
    await q.reload({ waitUntil: 'load' });
    await q.locator('[data-exercise-id]').waitFor({ timeout: 60_000 });
    const resumedAt = await q.locator('[data-exercise-id]').getAttribute('data-exercise-id');
    check('reload resumes inside the lesson (at a question, not the hook)', /^sva-1-(p[3-6]|r\d|c\d|y1)$/.test(resumedAt ?? ''), resumedAt);
    let overflow = 0;
    let bnFeedback = '';
    await playLesson(q, 'bn', {
      write: 'My father work in a bank. My two sisters study in Khulna.',
      afterWrite: async (pg) => {
        await pg.getByText('Mino-র ছোট practice').waitFor({ timeout: 20_000 });
        bnFeedback = await pg.locator('[data-exercise-id]').innerText();
        if (!(await noHorizontalScroll(pg))) overflow++;
        await shot(pg, 'sva-bn-02-mino-feedback', false);
      },
    });
    check('bn lesson sva-1 completes', Boolean((await waitForFoundation(uidBn, (x) => x.lessons?.['sva-1']))?.lessons?.['sva-1']));
    check('bn Mino feedback is in Bangla and names the fix (works)', /একটা জিনিস ঠিক করতে হবে|প্রায় ঠিক/.test(bnFeedback) && /works/.test(bnFeedback), bnFeedback.slice(0, 200));
    check('bn Mino feedback: no sideways scroll', overflow === 0);
    await q.goto(`${BASE}/ielts/foundation/challenge/agreement`, { waitUntil: 'load' });
    await q.getByRole('button', { name: LABELS.bn.start }).waitFor({ timeout: 60_000 });
    check('bn challenge intro: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'sva-bn-03-challenge-intro');
    await q.getByRole('button', { name: LABELS.bn.start }).click();
    await q.locator('[data-exercise-id]').waitFor();
    check('bn challenge question: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'sva-bn-04-challenge-question', false);
    await mctx.close();
  } catch (e) {
    const page = browser.contexts().flatMap((x) => x.pages()).at(-1);
    if (page) {
      console.log('PAGE:', (await page.locator('main').innerText().catch(() => '')).slice(0, 800));
      await shot(page, 'sva-failure').catch(() => {});
    }
    check('EXCEPTION', false, (e as Error).stack ?? e);
  }
  await browser.close();
  check('no page errors', errors.length === 0, errors.slice(0, 5).join(' | '));
  process.exit(report());
}

void main();
