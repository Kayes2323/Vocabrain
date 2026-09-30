// E2E: the Articles module (Foundation, Phase B).
// Run with `pnpm test:e2e:articles` (starts emulators, the mock AI and the app).
//
// English desktop: dashboard and module page → "a / an: one of many" with a
// deliberate mistake and "I am student at an university" for Mino → "the"
// answered right → spaced reviews → real mastery → the Articles Final Mastery
// Challenge and its report → Ask Mino → a fresh sign-in sees it all.
// Bangla mobile: module page, the a/an lesson with Mino feedback in Bangla, the
// challenge — no sideways scroll.
import { conceptMastery, getChallenge } from '../../lib/foundation';
import {
  BASE, LABELS, check, launch, makeDue, noHorizontalScroll, playChallenge, playLesson, report, shot, signIn, signUp, takeReview, uidOf,
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
    const email = `articles-en-${stamp}@test.dev`;
    await signUp(p, 'Tanvir', email, 'en');
    const uid = (await uidOf(p))!;

    console.log('\n[1] Foundation dashboard and the Articles module');
    await p.goto(`${BASE}/ielts/foundation`, { waitUntil: 'load' });
    await p.getByText('Level 1 — Foundation Grammar').waitFor({ timeout: 60_000 });
    const card = p.locator('main a[href="/ielts/foundation/articles"]').first();
    check('dashboard links to Articles, and the card is no longer "Soon"', (await card.isVisible()) && !(await card.innerText()).includes('Soon'), await card.innerText());
    await p.goto(`${BASE}/ielts/foundation/articles`, { waitUntil: 'load' });
    const lessonLinks = p.locator('main a[href^="/ielts/foundation/lesson/ar-"]');
    await lessonLinks.first().waitFor({ timeout: 30_000 });
    check('Articles module opens with 9 lessons', (await lessonLinks.count()) === 9, await lessonLinks.count());
    check('no Articles lesson is marked "Soon"', (await p.locator('main').getByText('Soon', { exact: true }).count()) === 0);
    check('the Articles Final Mastery Challenge is listed', await p.locator('main a[href="/ielts/foundation/challenge/articles"]').isVisible());
    await shot(p, 'ar-en-01-module');

    console.log('\n[2] a / an: a deliberate mistake and "I am student at an university" for Mino');
    await p.goto(`${BASE}/ielts/foundation/lesson/ar-2`, { waitUntil: 'load' });
    await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
    let minoText = '';
    let followUp = false;
    const answered = await playLesson(p, 'en', {
      wrong: ['ar-2-p1'],
      write: 'I am student at an university in Dhaka.',
      afterWrite: async (pg) => {
        await pg.getByText('Quick practice from Mino').waitFor({ timeout: 20_000 });
        minoText = await pg.locator('[data-exercise-id]').innerText();
        await shot(pg, 'ar-en-02-mino-feedback', false);
        await pg.locator('form').getByRole('textbox').fill('an');
        await pg.locator('form').getByRole('button', { name: 'Check' }).click();
        followUp = (await pg.getByTestId('mino-practice-result').innerText()).trim() === 'Correct.';
      },
    });
    check('lesson ar-2 plays through every step (recall + write included)', answered.includes('ar-2-r1') && answered.includes('ar-2-y1'), answered.join(','));
    check('Mino names the noun: "student" is one countable thing → a', /student/.test(minoText) && /countable/.test(minoText), minoText);
    check('Mino explains a/an by the sound ("university" = "yoo")', /yoo/.test(minoText));
    check('Mino gives one follow-up question, checked right', followUp);
    let f = await waitForFoundation(uid, (x) => x.lessons?.['ar-2']);
    check('Firestore: lesson ar-2 completed', Boolean(f?.lessons?.['ar-2']));
    const c = f?.concepts?.['article-a'] ?? {};
    check('Firestore: free recall recorded for article-a', (c.recallAttempts ?? 0) >= 3 && (c.recallCorrect ?? 0) >= 2, JSON.stringify(c).slice(0, 160));
    const miss = (f?.mistakes ?? []).find((m: { questionId: string }) => m.questionId === 'ar-2-p1');
    check('Firestore: the mistake is saved with its pattern (missing-article)', miss?.pattern === 'missing-article', JSON.stringify(miss ?? {}).slice(0, 160));
    check('Firestore: spaced review scheduled for article-a', Boolean(c.srs?.dueAt) && Date.parse(c.srs.dueAt) > Date.now(), c.srs?.dueAt);
    check('no fake mastery: finishing the lesson is not mastery', conceptMastery(f, 'article-a').level !== 'mastered');

    console.log('\n[3] "the" answered right → mastery only after 2 due reviews');
    await p.goto(`${BASE}/ielts/foundation/lesson/ar-3`, { waitUntil: 'load' });
    await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
    await playLesson(p, 'en', { write: 'The most interesting place in my city is a museum. The museum shows the history of our country.' });
    f = await waitForFoundation(uid, (x) => x.lessons?.['ar-3'] && (x.concepts?.['article-the']?.appliedCorrect ?? 0) >= 1);
    let m = conceptMastery(f, 'article-the');
    check('recognition, recall and application proven for article-the', m.recognition && m.recall && m.application, JSON.stringify(m));
    check('…but not mastered before spaced reviews', m.level === 'practising');
    await makeDue(uid, 'article-the');
    await takeReview(p, 'article-the');
    f = await waitForFoundation(uid, (x) => x.concepts?.['article-the']?.srs?.passes >= 1);
    check('first due review passed → still not mastered', conceptMastery(f, 'article-the').level !== 'mastered');
    await makeDue(uid, 'article-the');
    await takeReview(p, 'article-the');
    f = await waitForFoundation(uid, (x) => x.concepts?.['article-the']?.srs?.passes >= 2);
    check('Firestore: 2 due spaced reviews passed → article-the mastered', conceptMastery(f, 'article-the').level === 'mastered');

    console.log('\n[4] Articles Final Mastery Challenge');
    const ch = getChallenge('articles')!;
    await p.goto(`${BASE}/ielts/foundation/challenge/articles`, { waitUntil: 'load' });
    await p.getByRole('button', { name: 'Start the challenge' }).waitFor({ timeout: 60_000 });
    check('intro lists the 6 parts', (await p.locator('main ol > li').count()) === ch.parts.length, await p.locator('main ol > li').count());
    await shot(p, 'ar-en-03-challenge-intro');
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
    check('report offers "Ask Mino about my Articles report"', await p.getByRole('link', { name: 'Ask Mino about my Articles report' }).isVisible());
    await shot(p, 'ar-en-04-challenge-report');
    f = await waitForFoundation(uid, (x) => x.finals?.articles?.attempts === 1);
    check('Firestore: result stored in finals.articles', f?.finals?.articles?.attempts === 1 && !f.finals.tenses && !f.posFinal, JSON.stringify(f?.finals ?? {}).slice(0, 160));

    console.log('\n[5] Ask Mino about the report');
    await p.getByRole('link', { name: 'Ask Mino about my Articles report' }).click();
    await p.waitForURL('**/mino**');
    const minoReply = p.getByText(/^Mock Mino: /).last();
    await minoReply.waitFor({ timeout: 60_000 });
    check('Mino sees the stored Articles challenge result', /Articles Final Mastery Challenge: last \d+%/.test(await minoReply.innerText()), await minoReply.innerText());
    check('Mino was asked about the Articles report', await p.getByText(/I just finished the Articles Final Mastery Challenge/).first().isVisible());
    await ctx.close();

    console.log('\n[6] Persistence: a fresh sign-in sees the same progress');
    const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p2 = await ctx2.newPage();
    watchErrors(p2, 'EN2', errors);
    await signIn(p2, email);
    await p2.goto(`${BASE}/ielts/foundation/articles`, { waitUntil: 'load' });
    await p2.locator('main a[href="/ielts/foundation/challenge/articles"]').waitFor({ timeout: 60_000 });
    check('module page shows the best challenge score after sign-in', await p2.locator('main a[href="/ielts/foundation/challenge/articles"]').getByText(/^Best \d+%$/).isVisible());
    check('module page shows the finished lessons', (await p2.locator('main a[href="/ielts/foundation/lesson/ar-2"], main a[href="/ielts/foundation/lesson/ar-3"]').filter({ hasText: /Done|%|Practise/ }).count()) === 2);
    await ctx2.close();

    // ============================================================ Bangla, mobile
    console.log('\n[7] Bangla, mobile');
    const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const q = await mctx.newPage();
    watchErrors(q, 'BN', errors);
    await signUp(q, 'Mitu', `articles-bn-${stamp}@test.dev`, 'bn');
    const uidBn = (await uidOf(q))!;
    await q.goto(`${BASE}/ielts/foundation/articles`, { waitUntil: 'load' });
    await q.locator('main a[href^="/ielts/foundation/lesson/ar-"]').first().waitFor({ timeout: 60_000 });
    check('bn Articles module: 9 lessons, no sideways scroll', (await q.locator('main a[href^="/ielts/foundation/lesson/ar-"]').count()) === 9 && (await noHorizontalScroll(q)));
    await shot(q, 'ar-bn-01-module');
    await q.goto(`${BASE}/ielts/foundation/lesson/ar-1`, { waitUntil: 'load' });
    await q.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
    let overflow = 0;
    let bnFeedback = '';
    await playLesson(q, 'bn', {
      write: 'I am student at an university.',
      afterWrite: async (pg) => {
        await pg.getByText('Mino-র ছোট practice').waitFor({ timeout: 20_000 });
        bnFeedback = await pg.locator('[data-exercise-id]').innerText();
        if (!(await noHorizontalScroll(pg))) overflow++;
        await shot(pg, 'ar-bn-02-mino-feedback', false);
      },
    });
    check('bn lesson ar-1 (a or an) completes', Boolean((await waitForFoundation(uidBn, (x) => x.lessons?.['ar-1']))?.lessons?.['ar-1']));
    check('bn Mino feedback is in Bangla and names the sound', /একটা জিনিস ঠিক করতে হবে|প্রায় ঠিক/.test(bnFeedback) && /sound/.test(bnFeedback), bnFeedback.slice(0, 160));
    check('bn Mino feedback: no sideways scroll', overflow === 0);
    await q.goto(`${BASE}/ielts/foundation/challenge/articles`, { waitUntil: 'load' });
    await q.getByRole('button', { name: LABELS.bn.start }).waitFor({ timeout: 60_000 });
    check('bn challenge intro: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'ar-bn-03-challenge-intro');
    await q.getByRole('button', { name: LABELS.bn.start }).click();
    await q.locator('[data-exercise-id]').waitFor();
    check('bn challenge question: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'ar-bn-04-challenge-question', false);
    await mctx.close();
  } catch (e) {
    const page = browser.contexts().flatMap((x) => x.pages()).at(-1);
    if (page) {
      console.log('PAGE:', (await page.locator('main').innerText().catch(() => '')).slice(0, 800));
      await shot(page, 'ar-failure').catch(() => {});
    }
    check('EXCEPTION', false, (e as Error).stack ?? e);
  }
  await browser.close();
  check('no page errors', errors.length === 0, errors.slice(0, 5).join(' | '));
  process.exit(report());
}

void main();
