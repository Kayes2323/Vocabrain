// A reusable E2E flow for a v2 Foundation grammar module (Prepositions and the
// modules after it). Each module spec only supplies its data; the flow is:
//
// English desktop: dashboard card → module page (lessons, challenge) → one
// lesson with deliberate mistakes and a Mino-checked sentence → why-wrong
// feedback on one question → the repeated mistake opens a 5-question fix →
// a second lesson → 2 due spaced reviews → mastery → the Final Mastery
// Challenge and its report → Ask Mino → a fresh sign-in sees it all.
// Bangla mobile: module page, a lesson with resume after reload and Mino
// feedback in Bangla, the challenge — respectful Bangla, no sideways scroll.
import { conceptMastery, getChallenge } from '../../lib/foundation';
import type { Page } from 'playwright-core';
import {
  BASE, LABELS, answerCurrent, check, launch, makeDue, noHorizontalScroll, playChallenge, playLesson, report, shot, signIn, signUp, takeReview, uidOf,
  waitForFoundation, watchErrors,
} from './helpers';

export interface ModuleSpec {
  moduleId: string;
  /** Short name used in the report link: "Ask Mino about my {name} report". */
  name: string;
  lessonPrefix: string;
  lessonCount: number;
  shotPrefix: string;
  mino: { lesson: string; concept: string; wrong: string[]; write: string; expect: RegExp[]; followUp: string; mistakeId: string; mistakePattern: string };
  feedback: { lesson: string; exercise: string; wrongOption: string; expect: RegExp };
  fix: { pattern: string; title: string; rule: RegExp };
  mastery: { lesson: string; concept: string; write: string };
  bn: { lesson: string; stopAt: string; resumed: RegExp; english: RegExp; write: string; expect: RegExp };
  /** A linked daily practice shown on the module page (e.g. the word missions). */
  practiceLink?: { href: string; title: string };
}

async function skipTo(p: Page, exerciseId: string, lang: 'en' | 'bn', answer: boolean, collect?: (t: string) => void) {
  for (let i = 0; i < 80 && !(await p.locator(`[data-exercise-id="${exerciseId}"]`).count()); i++) {
    if (collect) collect(await p.locator('main').innerText());
    if (await p.locator('[data-exercise-id]').count()) {
      if (!answer) throw new Error(`unexpected question before ${exerciseId}`);
      await answerCurrent(p);
      continue;
    }
    const radios = p.locator('main [role=radiogroup] [role=radio]');
    if ((await radios.count()) && !(await p.locator('main [role=radio][aria-checked=true]').count())) await radios.first().click();
    const next = p.getByRole('button', { name: LABELS[lang].continue });
    if (await next.isEnabled({ timeout: 2000 }).catch(() => false)) await next.click();
    else await p.waitForTimeout(250);
  }
}

export async function runModuleSpec(s: ModuleSpec) {
  const errors: string[] = [];
  const stamp = Date.now();
  const browser = await launch();
  // Topic pages show lesson cards; the other module pages show lesson rows.
  const lessonSel = `main a[href^="/ielts/foundation/lesson/${s.lessonPrefix}"], main [data-lesson-card^="${s.lessonPrefix}"]`;
  const challengeSel = `main a[href="/ielts/foundation/challenge/${s.moduleId}"]`;
  try {
    // ============================================================ English, desktop
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    watchErrors(p, 'EN', errors);
    const email = `${s.moduleId}-en-${stamp}@test.dev`;
    await signUp(p, 'Rafi', email, 'en');
    const uid = (await uidOf(p))!;

    console.log(`\n[1] Foundation dashboard and the ${s.name} module`);
    await p.goto(`${BASE}/ielts/foundation`, { waitUntil: 'load' });
    await p.getByText('Level 1 — English Foundation').waitFor({ timeout: 60_000 });
    const card = p.locator(`main a[href="/ielts/foundation/${s.moduleId}"], main [data-topic-modules~="${s.moduleId}"]`).first();
    check(`dashboard links to ${s.name}, and the card is no longer "Soon"`, (await card.isVisible()) && !(await card.innerText()).includes('Soon'), await card.innerText());
    for (const other of ['articles', 'agreement']) {
      const c = p.locator(`main a[href="/ielts/foundation/${other}"], main [data-topic-modules~="${other}"]`).first();
      check(`${other} is still available on the dashboard`, (await c.isVisible()) && !(await c.innerText()).includes('Soon'));
    }
    await p.goto(`${BASE}/ielts/foundation/${s.moduleId}`, { waitUntil: 'load' });
    await p.locator(lessonSel).first().waitFor({ timeout: 30_000 });
    check(`${s.name} module opens with ${s.lessonCount} lessons`, (await p.locator(lessonSel).count()) === s.lessonCount, await p.locator(lessonSel).count());
    check(`no ${s.name} lesson is marked "Soon"`, (await p.locator('main').getByText('Soon', { exact: true }).count()) === 0);
    check(`the ${s.name} Final Mastery Challenge is listed`, await p.locator(challengeSel).isVisible());
    if (s.practiceLink) {
      const link = p.locator(`main a[href="${s.practiceLink.href}"]`).filter({ hasText: s.practiceLink.title });
      check(`the module page links to "${s.practiceLink.title}"`, await link.isVisible());
      await link.click();
      await p.waitForURL((u) => u.pathname === s.practiceLink!.href, { timeout: 30_000 });
      check(`"${s.practiceLink.title}" opens ${s.practiceLink.href}`, new URL(p.url()).pathname === s.practiceLink.href, p.url());
    }
    await shot(p, `${s.shotPrefix}-en-01-module`);

    console.log('\n[2] A lesson with deliberate mistakes and Mino');
    await p.goto(`${BASE}/ielts/foundation/lesson/${s.mino.lesson}`, { waitUntil: 'load' });
    await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
    let minoText = '';
    let followUp = false;
    const answered = await playLesson(p, 'en', {
      wrong: s.mino.wrong,
      write: s.mino.write,
      afterWrite: async (pg) => {
        await pg.getByText('Quick practice from Mino').waitFor({ timeout: 20_000 });
        minoText = await pg.locator('[data-exercise-id]').innerText();
        await shot(pg, `${s.shotPrefix}-en-02-mino-feedback`, false);
        await pg.locator('form').getByRole('textbox').fill(s.mino.followUp);
        await pg.locator('form').getByRole('button', { name: 'Check' }).click();
        followUp = (await pg.getByTestId('mino-practice-result').innerText()).trim() === 'Correct.';
      },
    });
    check(`lesson ${s.mino.lesson} plays through every step (practice, recall, challenge, write)`, ['p1', 'r1', 'c2', 'y1'].every((k) => answered.includes(`${s.mino.lesson}-${k}`)), answered.join(','));
    check('Mino feedback names the deciding reason and the fix', s.mino.expect.every((re) => re.test(minoText)), minoText);
    check('Mino gives one follow-up question, checked right', followUp);
    let f = await waitForFoundation(uid, (x) => x.lessons?.[s.mino.lesson]);
    check(`Firestore: lesson ${s.mino.lesson} completed`, Boolean(f?.lessons?.[s.mino.lesson]));
    const c = f?.concepts?.[s.mino.concept] ?? {};
    check(`Firestore: free recall recorded for ${s.mino.concept}`, (c.recallAttempts ?? 0) >= 3, JSON.stringify(c).slice(0, 160));
    const miss = (f?.mistakes ?? []).find((m: { questionId: string }) => m.questionId === s.mino.mistakeId);
    check('Firestore: the mistake is saved with its concept and pattern', miss?.concept === s.mino.concept && miss?.pattern === s.mino.mistakePattern, JSON.stringify(miss ?? {}).slice(0, 200));
    check(`Firestore: spaced review scheduled for ${s.mino.concept}`, Boolean(c.srs?.dueAt) && Date.parse(c.srs.dueAt) > Date.now(), c.srs?.dueAt);
    check('no fake mastery: finishing the lesson is not mastery', conceptMastery(f, s.mino.concept).level !== 'mastered');

    console.log('\n[3] Immediate feedback: why the wrong answer is wrong');
    await p.goto(`${BASE}/ielts/foundation/lesson/${s.feedback.lesson}`, { waitUntil: 'load' });
    await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
    await skipTo(p, s.feedback.exercise, 'en', false);
    const box = p.locator(`[data-exercise-id="${s.feedback.exercise}"]`);
    await box.getByRole('radio', { name: s.feedback.wrongOption, exact: true }).click();
    await box.locator('div.flex.justify-end > button').click();
    const fb = await box.innerText();
    check('a wrong choice shows why it is wrong', s.feedback.expect.test(fb), fb.slice(0, 300));
    await shot(p, `${s.shotPrefix}-en-03-feedback`, false);

    console.log('\n[4] Mistake pattern → 5-question fix');
    await p.goto(`${BASE}/ielts/foundation/${s.moduleId}`, { waitUntil: 'load' });
    const fixLink = p.locator(`main a[href="/ielts/foundation/fix/${s.fix.pattern}"]`);
    await fixLink.waitFor({ timeout: 30_000 });
    check('module page offers the fix for the repeated mistake', await fixLink.isVisible());
    await fixLink.click();
    await p.getByText(`Fix: ${s.fix.title}`).first().waitFor({ timeout: 30_000 });
    check('fix shows the rule first', s.fix.rule.test(await p.locator('main').innerText()));
    await p.getByRole('button', { name: 'Start 5 questions' }).click();
    for (let i = 0; i < 5; i++) {
      await p.locator('[data-exercise-id]').waitFor({ timeout: 15_000 });
      await answerCurrent(p);
    }
    await p.getByText('Pattern fixed!').waitFor({ timeout: 15_000 });
    const fixText = await p.locator('main').innerText();
    check('fix summary: why it happens, how to recognise it, how to avoid it', /Why it happens/i.test(fixText) && /How to recognise it/i.test(fixText) && /How to avoid it/i.test(fixText));
    await shot(p, `${s.shotPrefix}-en-04-fix`);
    f = await waitForFoundation(uid, (x) => x.posFixes?.[s.fix.pattern]);
    check('Firestore: the fix is recorded', Boolean(f?.posFixes?.[s.fix.pattern]), JSON.stringify(f?.posFixes ?? {}).slice(0, 160));

    console.log('\n[5] A second lesson right → mastery only after 2 due reviews');
    await p.goto(`${BASE}/ielts/foundation/lesson/${s.mastery.lesson}`, { waitUntil: 'load' });
    await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
    await playLesson(p, 'en', { write: s.mastery.write });
    const mc = s.mastery.concept;
    f = await waitForFoundation(uid, (x) => x.lessons?.[s.mastery.lesson] && (x.concepts?.[mc]?.appliedCorrect ?? 0) >= 1);
    const m = conceptMastery(f, mc);
    check(`recognition, recall and application proven for ${mc}`, m.recognition && m.recall && m.application, JSON.stringify(m));
    check('…but not mastered before spaced reviews', m.level === 'practising');
    await makeDue(uid, mc);
    await takeReview(p, mc);
    f = await waitForFoundation(uid, (x) => x.concepts?.[mc]?.srs?.passes >= 1);
    check('first due review passed → still not mastered', conceptMastery(f, mc).level !== 'mastered');
    await makeDue(uid, mc);
    await takeReview(p, mc);
    f = await waitForFoundation(uid, (x) => x.concepts?.[mc]?.srs?.passes >= 2);
    check(`Firestore: 2 due spaced reviews passed → ${mc} mastered`, conceptMastery(f, mc).level === 'mastered');

    console.log(`\n[6] ${s.name} Final Mastery Challenge`);
    const ch = getChallenge(s.moduleId)!;
    await p.goto(`${BASE}/ielts/foundation/challenge/${s.moduleId}`, { waitUntil: 'load' });
    await p.getByRole('button', { name: 'Start the challenge' }).waitFor({ timeout: 60_000 });
    check(`intro lists the ${ch.parts.length} parts`, (await p.locator('main ol > li').count()) === ch.parts.length, await p.locator('main ol > li').count());
    await shot(p, `${s.shotPrefix}-en-05-challenge-intro`);
    await p.getByRole('button', { name: 'Start the challenge' }).click();
    const total = ch.parts.length * 3;
    const run = await playChallenge(p, total, (i) => i >= 6 && i % 2 === 0, /^Part [A-F] · /);
    check(`challenge asks ${total} questions across all parts`, run.parts.size === ch.parts.length, [...run.parts].join(''));
    check('challenge adapts (the level changes during the run)', run.levels.size >= 2, [...run.levels].join(' / '));
    await p.getByText(/Topic by topic/i).waitFor({ timeout: 15_000 });
    const reportText = await p.locator('main').innerText();
    check('report: overall %, by part, topic by topic', /\d+%/.test(reportText) && /By part/i.test(reportText) && /Topic by topic/i.test(reportText));
    check('report: strongest / weakest, my mistakes, what to practise', /Strongest|Needs work/i.test(reportText) && /Your mistakes/i.test(reportText) && /Practise next/i.test(reportText));
    check('report says it is a learning assessment, not an IELTS score', reportText.includes('This is a Mino learning assessment, not an official IELTS score.'));
    const ask = p.getByRole('link', { name: `Ask Mino about my ${s.name} report` });
    check(`report offers "Ask Mino about my ${s.name} report"`, await ask.isVisible());
    await shot(p, `${s.shotPrefix}-en-06-challenge-report`);
    f = await waitForFoundation(uid, (x) => x.finals?.[s.moduleId]?.attempts === 1);
    check(`Firestore: result stored in finals.${s.moduleId}`, f?.finals?.[s.moduleId]?.attempts === 1 && Object.keys(f.finals).length === 1, JSON.stringify(f?.finals ?? {}).slice(0, 160));

    console.log('\n[7] Ask Mino about the report');
    await ask.click();
    await p.waitForURL('**/mino**');
    const minoReply = p.getByText(/^Mock Mino: /).last();
    await minoReply.waitFor({ timeout: 60_000 });
    check(`Mino sees the stored ${s.name} challenge result`, new RegExp(`${s.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} Final Mastery Challenge: last \\d+%`).test(await minoReply.innerText()), await minoReply.innerText());
    await ctx.close();

    console.log('\n[8] Persistence: a fresh sign-in sees the same progress');
    const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p2 = await ctx2.newPage();
    watchErrors(p2, 'EN2', errors);
    await signIn(p2, email);
    await p2.goto(`${BASE}/ielts/foundation/${s.moduleId}`, { waitUntil: 'load' });
    await p2.locator(challengeSel).waitFor({ timeout: 60_000 });
    check('module page shows the best challenge score after sign-in', await p2.locator(challengeSel).getByText(/^Best \d+%$/).isVisible());
    check('module page shows the finished lessons', (await p2.locator(`main a[href="/ielts/foundation/lesson/${s.mino.lesson}"], main a[href="/ielts/foundation/lesson/${s.mastery.lesson}"]`).filter({ hasText: /Done|%|Practise/ }).count()) + (await p2.locator(`main [data-lesson-card="${s.mino.lesson}"][data-state="done"], main [data-lesson-card="${s.mastery.lesson}"][data-state="done"]`).count()) === 2);
    await ctx2.close();

    // ============================================================ Bangla, mobile
    console.log('\n[9] Bangla, mobile');
    const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const q = await mctx.newPage();
    watchErrors(q, 'BN', errors);
    await signUp(q, 'Nusrat', `${s.moduleId}-bn-${stamp}@test.dev`, 'bn');
    const uidBn = (await uidOf(q))!;
    await q.goto(`${BASE}/ielts/foundation/${s.moduleId}`, { waitUntil: 'load' });
    await q.locator(lessonSel).first().waitFor({ timeout: 60_000 });
    check(`bn ${s.name} module: ${s.lessonCount} lessons, no sideways scroll`, (await q.locator(lessonSel).count()) === s.lessonCount && (await noHorizontalScroll(q)));
    const bnModule = await q.locator('main').innerText();
    check('bn module page renders Bangla text', /[ঀ-৿]/.test(bnModule));
    check('bn: respectful Bangla (no তুমি / তোমার / তুই)', !/তুমি|তোমার|তুই/.test(bnModule));
    await shot(q, `${s.shotPrefix}-bn-01-module`);
    await q.goto(`${BASE}/ielts/foundation/lesson/${s.bn.lesson}`, { waitUntil: 'load' });
    await q.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
    let bnLesson = '';
    await skipTo(q, s.bn.stopAt, 'bn', true, (t) => (bnLesson += `\n${t}`));
    check('bn lesson: Bangla explanation with English examples', /[ঀ-৿]/.test(bnLesson) && s.bn.english.test(bnLesson), bnLesson.slice(0, 200));
    check('bn lesson: no তুমি / তোমার / তুই', !/তুমি|তোমার|তুই/.test(bnLesson));
    check('bn lesson step: no sideways scroll', await noHorizontalScroll(q));
    const saved = await waitForFoundation(uidBn, (x) => x.inProgress?.lessonId === s.bn.lesson && Object.keys(x.inProgress.answers ?? {}).length >= 2);
    check('Firestore: the unfinished lesson is saved with its answers', saved?.inProgress?.lessonId === s.bn.lesson, JSON.stringify(saved?.inProgress ?? {}).slice(0, 160));
    await q.reload({ waitUntil: 'load' });
    await q.locator('[data-exercise-id]').waitFor({ timeout: 60_000 });
    const resumedAt = await q.locator('[data-exercise-id]').getAttribute('data-exercise-id');
    check('reload resumes inside the lesson (at a question, not the hook)', s.bn.resumed.test(resumedAt ?? ''), resumedAt);
    let overflow = 0;
    let bnFeedback = '';
    await playLesson(q, 'bn', {
      write: s.bn.write,
      afterWrite: async (pg) => {
        await pg.getByText('Mino-র ছোট practice').waitFor({ timeout: 20_000 });
        bnFeedback = await pg.locator('[data-exercise-id]').innerText();
        if (!(await noHorizontalScroll(pg))) overflow++;
        await shot(pg, `${s.shotPrefix}-bn-02-mino-feedback`, false);
      },
    });
    check(`bn lesson ${s.bn.lesson} completes`, Boolean((await waitForFoundation(uidBn, (x) => x.lessons?.[s.bn.lesson]))?.lessons?.[s.bn.lesson]));
    check('bn Mino feedback is in Bangla and names the fix', /একটা জিনিস ঠিক করতে হবে|প্রায় ঠিক/.test(bnFeedback) && s.bn.expect.test(bnFeedback), bnFeedback.slice(0, 200));
    check('bn Mino feedback: no sideways scroll', overflow === 0);
    await q.goto(`${BASE}/ielts/foundation/challenge/${s.moduleId}`, { waitUntil: 'load' });
    await q.getByRole('button', { name: LABELS.bn.start }).waitFor({ timeout: 60_000 });
    check('bn challenge intro: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, `${s.shotPrefix}-bn-03-challenge-intro`);
    await q.getByRole('button', { name: LABELS.bn.start }).click();
    await q.locator('[data-exercise-id]').waitFor();
    check('bn challenge question: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, `${s.shotPrefix}-bn-04-challenge-question`, false);
    await mctx.close();
  } catch (e) {
    const page = browser.contexts().flatMap((x) => x.pages()).at(-1);
    if (page) {
      console.log('PAGE:', (await page.locator('main').innerText().catch(() => '')).slice(0, 800));
      await shot(page, `${s.shotPrefix}-failure`).catch(() => {});
    }
    check('EXCEPTION', false, (e as Error).stack ?? e);
  }
  await browser.close();
  check('no page errors', errors.length === 0, errors.slice(0, 5).join(' | '));
  process.exit(report());
}
