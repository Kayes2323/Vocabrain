// Foundation content integration, checked in the running app: representative
// lessons from four kinds of module open from the catalogue, show the
// integrated teaching (not just the old text), can be played question by
// question with feedback, and complete with progress saved to Firestore.
//   - sb-1  Sentence Basics (rewritten from editorial batch 01): Bangla, phone
//   - t-6   Tenses (batch 03 nuance): English, desktop
//   - vc-1  Vocabulary Foundation: English, desktop
//   - ib-3  IELTS Introduction (delivery facts checked 2026-10-14): English, desktop
//   bash scripts/e2e/run.sh foundation-content
import type { Page } from 'playwright-core';
import { BASE, LABELS, answerCurrent, check, exercise, getDoc, launch, noHorizontalScroll, report, shot, signUp, tagAll, uidOf, watchErrors, type Lang } from './helpers';

/** Plays a lesson to the end like playLesson, keeping every screen's text and the feedback shown after each answer. */
async function playAndRead(p: Page, lang: Lang, lessonId: string, wrong: string[] = []) {
  await p.goto(`${BASE}/ielts/foundation/lesson/${lessonId}`, { waitUntil: 'load' });
  await p.locator('main [data-lesson-page]').first().waitFor({ timeout: 60_000 });
  const screens: string[] = [];
  const feedback: string[] = [];
  let noScroll = true;
  for (let i = 0; i < 220; i++) {
    const main = p.locator('main');
    screens.push(await main.innerText().catch(() => ''));
    noScroll &&= await noHorizontalScroll(p);
    const box = p.locator('[data-exercise-id]');
    if (await box.count()) {
      const id = (await box.getAttribute('data-exercise-id'))!;
      const e = exercise(id)!;
      if (e.type !== 'write' && wrong.includes(id)) {
        // Answer wrong on purpose and keep the feedback text before moving on.
        const action = box.locator('div.flex.justify-end > button');
        if (e.type === 'choice') await box.getByRole('radio', { name: e.options.find((o) => o !== e.answer)!, exact: true }).click();
        else await box.getByRole('textbox').fill('xyz');
        await action.click();
        await p.waitForTimeout(300);
        feedback.push(await box.innerText());
        await action.click();
      } else {
        await answerCurrent(p, {});
      }
      continue;
    }
    const complete = p.getByRole('button', { name: LABELS[lang].complete });
    if (await complete.isVisible().catch(() => false)) {
      await complete.click();
      return { text: screens.join('\n'), feedback, noScroll };
    }
    const radios = p.locator('main [role=radiogroup] [role=radio]');
    if ((await radios.count()) && !(await p.locator('main [role=radio][aria-checked=true]').count())) await radios.first().click();
    await tagAll(p);
    const next = p.getByRole('button', { name: LABELS[lang].continue });
    if (await next.isEnabled({ timeout: 2000 }).catch(() => false)) await next.click();
    else await p.waitForTimeout(250);
  }
  throw new Error(`${lessonId} did not finish`);
}

async function lessonSaved(uid: string, lessonId: string, timeoutMs = 20_000) {
  const end = Date.now() + timeoutMs;
  for (;;) {
    const f = (await getDoc(`users/${uid}`))?.app?.foundation;
    if (f?.lessons?.[lessonId] || Date.now() > end) return f;
    await new Promise((r) => setTimeout(r, 400));
  }
}

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  try {
    // ---------------------------------------------------------------- Bangla, small phone: Sentence Basics sb-1
    const mob = await (await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })).newPage();
    watchErrors(mob, 'bn-mobile', errors);
    await signUp(mob, 'Rafi', `fc-bn-${stamp}@test.dev`, 'bn');
    const uidBn = (await uidOf(mob))!;
    await mob.goto(BASE + '/ielts/foundation/sentence-basics', { waitUntil: 'load' });
    await mob.locator('main').getByText('Sentence আসলে কী?').first().waitFor({ timeout: 60_000 });
    check('bn mobile: Sentence Basics module lists sb-1 from the catalogue', true);
    const sb1 = await playAndRead(mob, 'bn', 'sb-1', ['sb-1-p1']);
    check('bn mobile: sb-1 shows the new hook (three messages)', sb1.text.includes('তিনটা message') && sb1.text.includes('Because the bus was late.'), sb1.text.slice(0, 400));
    check('bn mobile: sb-1 teaches that commands are complete (corrected rule)', sb1.text.includes('Command-ও complete'));
    check('bn mobile: sb-1 has the mistake lab and recall without options', sb1.text.includes('Mistake lab: fragment') && sb1.text.includes('এবার option ছাড়া'));
    check('bn mobile: a wrong answer shows the reason', sb1.feedback.some((f) => f.includes('-ing')), sb1.feedback.join(' | '));
    check('bn mobile: sb-1 has no sideways scroll on any screen', sb1.noScroll);
    const fpBn = await lessonSaved(uidBn, 'sb-1');
    check('bn mobile: sb-1 completion saved', Boolean(fpBn?.lessons?.['sb-1']?.completedAt), fpBn?.lessons);
    check('bn mobile: answers recorded under the new review concept sb-complete', (fpBn?.concepts?.['sb-complete']?.attempts ?? 0) >= 5, fpBn?.concepts?.['sb-complete']);
    await shot(mob, 'fc-sb1-done-bn-mobile', false);

    // ---------------------------------------------------------------- English, desktop: t-6, vc-1, ib-3
    const desk = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
    watchErrors(desk, 'en-desktop', errors);
    await signUp(desk, 'Nadia', `fc-en-${stamp}@test.dev`, 'en');
    const uid = (await uidOf(desk))!;

    const t6 = await playAndRead(desk, 'en', 't-6');
    check('en desktop: t-6 shows the integrated contrast (has lived / lived)', t6.text.includes('She has lived here for five years'), '');
    const vc1 = await playAndRead(desk, 'en', 'vc-1');
    check('en desktop: vc-1 plays through', vc1.text.length > 0);
    const ib3 = await playAndRead(desk, 'en', 'ib-3', ['ib-3-p3']);
    check('en desktop: ib-3 teaches IELTS on computer (paper ends mid-2026)', ib3.text.includes('IELTS on computer') && ib3.text.includes('mid-2026') && ib3.text.includes('Writing on Paper'));
    check('en desktop: ib-3 says computer Listening gives 2 minutes, no transfer time', ib3.text.includes('2 minutes to check'));
    check('en desktop: ib-3 no longer offers paper as a choice', !/Choosing between the formats|Paper may suit|paper may suit/.test(ib3.text));
    check('en desktop: ib-3 wrong answer explains the current fact', ib3.feedback.some((f) => /paper is ending|Paper is no longer|other way round/i.test(f)), ib3.feedback.join(' | '));
    const fp = await lessonSaved(uid, 'ib-3');
    check('en desktop: t-6, vc-1 and ib-3 completions saved', ['t-6', 'vc-1', 'ib-3'].every((id) => fp?.lessons?.[id]?.completedAt), Object.keys(fp?.lessons ?? {}));
    await desk.goto(BASE + '/ielts/foundation/ielts-intro', { waitUntil: 'load' });
    await desk.locator('main').getByText('IELTS on computer: how you answer').first().waitFor({ timeout: 60_000 });
    check('en desktop: module page shows the new ib-3 title', true);
    await shot(desk, 'fc-ielts-intro-module-en-desktop', false);
  } catch (e) {
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, (e as Error).stack);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
main();
