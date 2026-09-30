// My IELTS Plan (phase 2): intro → questions (one per step) → preview →
// save → saved plan → leave/refresh → edit with confirmation. Bangla on a
// small Android screen, English on desktop; plus validation, a refresh in the
// middle of the setup, and the signed-out state.
//   bash scripts/e2e/run.sh plan
import type { Page } from 'playwright-core';
import { BASE, check, getDoc, launch, noHorizontalScroll, patchField, report, shot, signUp, uidOf, watchErrors, type Lang } from './helpers';

const T = {
  bn: { create: 'Plan তৈরি করুন', next: 'পরের ধাপ', see: 'Plan দেখুন', save: 'Plan Save করুন', apply: 'পরিবর্তন Save করুন', twoH: '২ ঘণ্টা', oneH: '১ ঘণ্টা', six: '৬ দিন', mix: 'মিশ্রভাবে', step: (n: string) => `ধাপ ${n}/৭`, noChanges: 'কিছু বদলানো হয়নি।', past: 'আজকের পরের একটা তারিখ দিন।' },
  en: { create: 'Create my plan', next: 'Next', see: 'See my plan', save: 'Save plan', apply: 'Save changes', twoH: '2 hours', oneH: '1 hour', six: '6 days', mix: 'A mix of both', step: (n: string) => `Step ${n} of 7`, noChanges: 'Nothing has changed.', past: 'Choose a date after today.' },
};
const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
const num = (lang: Lang, s: string | number) => (lang === 'bn' ? String(s).replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : String(s));
const dayKey = (offset: number) => {
  const d = new Date(Date.now() + offset * 86_400_000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

async function planFromFirestore(uid: string, ok: (plan: any) => boolean) {
  for (let i = 0; i < 40; i++) {
    const app = (await getDoc(`users/${uid}`))?.app;
    if (app?.ielts?.plan && ok(app.ielts.plan)) return app;
    await new Promise((r) => setTimeout(r, 250));
  }
  return (await getDoc(`users/${uid}`))?.app;
}

async function run(p: Page, lang: Lang, tag: string) {
  const L = T[lang];
  const uid = (await uidOf(p))!;
  const primary = () => p.locator('div.sticky button').first();
  const stepLabel = async () => (await p.locator('p.text-brand').first().innerText()).trim();
  // Existing progress that the plan must never touch. (Let sign-up writes settle first, then
  // reload so the app works from the stored profile.)
  await p.waitForTimeout(2000);
  await patchField(`users/${uid}`, 'app.foundation.lessons', { 'sb-1': { completedAt: new Date().toISOString(), score: 90, best: 90, attempts: 1 } });
  await p.reload({ waitUntil: 'load' });
  await p.waitForTimeout(1000);
  check(`${tag}: seeded progress is stored`, Boolean((await getDoc(`users/${uid}`)).app?.foundation?.lessons?.['sb-1']));

  // ---------------------------------------------------------------- no plan → intro
  await p.goto(BASE + '/ielts', { waitUntil: 'load' });
  await p.getByTestId('ielts-hub').waitFor({ timeout: 60_000 });
  await p.locator('main a[href="/ielts/plan"]').click();
  await p.getByTestId('plan-intro').waitFor({ timeout: 60_000 });
  check(`${tag}: no plan → a short intro and "${L.create}"`, (await p.getByTestId('plan-create').innerText()).trim() === L.create);
  check(`${tag}: intro has no sideways scroll`, await noHorizontalScroll(p));
  await p.getByTestId('plan-create').click();
  await p.waitForURL('**/ielts/plan/setup', { timeout: 30_000 });

  // ---------------------------------------------------------------- 1 · test date (validated)
  await p.getByTestId('plan-date').waitFor({ timeout: 60_000 });
  check(`${tag}: one question per step with a step counter`, (await stepLabel()) === L.step(num(lang, 1)), await stepLabel());
  check(`${tag}: focused setup (no bottom navigation)`, (await p.getByTestId('bottom-nav').count()) === 0 || !(await p.getByTestId('bottom-nav').isVisible()));
  check(`${tag}: cannot continue without a date`, await primary().isDisabled());
  await p.getByTestId('plan-date').fill('2020-01-15');
  check(`${tag}: a past date is refused with a clear message`, (await p.getByTestId('plan-error').innerText()).trim() === L.past && (await primary().isDisabled()));
  const testDate = dayKey(160);
  await p.getByTestId('plan-date').fill(testDate);
  check(`${tag}: a valid date is accepted`, (await p.getByTestId('plan-error').count()) === 0 && !(await primary().isDisabled()));
  await primary().click();

  // ---------------------------------------------------------------- 2–5
  await p.getByRole('radio', { name: '7.5', exact: true }).click();
  check(`${tag}: step 2/7`, (await stepLabel()) === L.step(num(lang, 2)));
  await primary().click();
  await p.getByRole('radio', { name: /Intermediate/ }).first().click();
  await primary().click();
  await p.getByRole('radio', { name: L.twoH, exact: true }).click();
  await primary().click();
  await p.getByRole('radio', { name: L.six, exact: true }).click();
  await primary().click();

  // ---------------------------------------------------------------- 6 · weak skills (multi) + refresh mid-setup
  check(`${tag}: weak skills need an answer`, await primary().isDisabled());
  await p.getByTestId('skill-writing').click();
  await p.getByTestId('skill-reading').click();
  await p.waitForTimeout(300);
  await p.reload({ waitUntil: 'load' });
  await p.getByTestId('skill-writing').waitFor({ timeout: 60_000 });
  check(`${tag}: a refresh keeps the answers and the step`, (await stepLabel()) === L.step(num(lang, 6)) && (await p.getByTestId('skill-writing').getAttribute('aria-pressed')) === 'true' && (await p.getByTestId('skill-reading').getAttribute('aria-pressed')) === 'true');
  await shot(p, `plan-step-skills-${tag}`, false);
  await primary().click();
  await p.getByRole('radio', { name: L.mix, exact: true }).click();
  check(`${tag}: the last step leads to the plan`, (await primary().innerText()).trim() === L.see);
  await primary().click();

  // ---------------------------------------------------------------- preview + edit an answer
  await p.getByTestId('plan-preview').waitFor({ timeout: 30_000 });
  const val = (f: string) => p.locator(`[data-value="${f}"]`).innerText();
  check(`${tag}: preview — target, days, focus`, (await val('targetBand')) === '7.5' && (await val('studyDaysPerWeek')).includes(num(lang, 6)) && /Writing/.test(await val('weakSkills')) && /Reading/.test(await val('weakSkills')));
  const phases = await p.locator('[data-phase]').evaluateAll((els) => els.map((e) => e.getAttribute('data-phase')));
  check(`${tag}: preview — Foundation → Skill Building → Practice → Mock Tests → Final Review`, phases.join(',') === 'foundation,skill-building,practice,mock-tests,final-review', phases.join(','));
  check(`${tag}: no band promise, a plain disclaimer`, !/guarantee|নিশ্চিত/i.test(await p.getByTestId('plan-overview').innerText().then((s) => s.replace(/নিশ্চয়তা নয়|not a promise/g, ''))));
  check(`${tag}: preview has no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `plan-preview-${tag}`);
  await p.locator('[data-change="targetBand"]').click();
  await p.getByRole('radio', { name: '8.0', exact: true }).click();
  check(`${tag}: after "Change", the button returns to the plan`, (await primary().innerText()).trim() === L.see);
  await primary().click();
  await p.getByTestId('plan-preview').waitFor({ timeout: 30_000 });
  check(`${tag}: the edited answer shows in the preview`, (await val('targetBand')) === '8.0');

  // ---------------------------------------------------------------- save
  await p.getByTestId('plan-save').click();
  await p.waitForURL(/\/ielts\/plan$/, { timeout: 30_000 });
  await p.getByTestId('plan-saved').waitFor({ timeout: 60_000 });
  check(`${tag}: saved plan shows its summary`, (await val('targetBand')) === '8.0' && (await val('dailyStudyMinutes')) === L.twoH);
  check(`${tag}: saved plan shows the preparation overview`, (await p.locator('[data-phase]').count()) === 5 && (await p.locator('[data-phase="foundation"]').getAttribute('data-status')) === 'current');
  const app = await planFromFirestore(uid, (pl) => pl.targetBand === 8);
  check(`${tag}: saved to the student's own profile`, app?.ielts?.plan?.targetBand === 8 && app.ielts.plan.targetDate === testDate && app.ielts.plan.weakSkills.join(',') === 'reading,writing');
  check(`${tag}: target and test date kept in step with the plan`, app.ielts.targetBand === 8 && app.ielts.testDate === testDate);
  check(`${tag}: existing progress untouched`, Boolean(app.foundation?.lessons?.['sb-1']));
  await shot(p, `plan-saved-${tag}`);

  // ---------------------------------------------------------------- leave, come back, refresh
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.getByTestId('quick-access').waitFor({ timeout: 60_000 });
  await p.goto(BASE + '/ielts/plan', { waitUntil: 'load' });
  await p.getByTestId('plan-saved').waitFor({ timeout: 60_000 });
  check(`${tag}: coming back shows the saved plan (not regenerated)`, (await val('targetBand')) === '8.0');
  await p.reload({ waitUntil: 'load' });
  await p.getByTestId('plan-saved').waitFor({ timeout: 60_000 });
  check(`${tag}: a refresh keeps the plan`, (await val('targetBand')) === '8.0');
  const generatedAt = (await getDoc(`users/${uid}`)).app.ielts.plan.generatedAt;
  check(`${tag}: viewing never regenerates it`, generatedAt === app.ielts.plan.generatedAt);

  // ---------------------------------------------------------------- edit with confirmation
  await p.getByTestId('plan-edit').click();
  await p.waitForURL('**/ielts/plan/setup?edit=1', { timeout: 30_000 });
  await p.getByTestId('plan-date').waitFor({ timeout: 60_000 });
  check(`${tag}: edit starts from the saved answers`, (await p.getByTestId('plan-date').inputValue()) === testDate);
  for (let i = 0; i < 7; i++) await primary().click();
  await p.getByTestId('plan-preview').waitFor({ timeout: 30_000 });
  check(`${tag}: nothing changed → nothing to save`, (await p.getByTestId('plan-changes').innerText()).includes(L.noChanges) && (await p.getByTestId('plan-save').isDisabled()));
  await p.locator('[data-change="dailyStudyMinutes"]').click();
  await p.getByRole('radio', { name: L.oneH, exact: true }).click();
  await primary().click();
  await p.getByTestId('plan-preview').waitFor({ timeout: 30_000 });
  check(`${tag}: the change is shown before it is applied`, (await p.locator('[data-changed]').evaluateAll((els) => els.map((e) => e.getAttribute('data-changed')))).join(',') === 'dailyStudyMinutes');
  check(`${tag}: the apply button asks to save the changes`, (await p.getByTestId('plan-save').innerText()).trim() === L.apply);
  await p.getByTestId('plan-save').click();
  await p.waitForURL(/\/ielts\/plan$/, { timeout: 30_000 });
  await p.getByTestId('plan-saved').waitFor({ timeout: 60_000 });
  check(`${tag}: the edited plan is shown`, (await val('dailyStudyMinutes')) === L.oneH);
  const edited = await planFromFirestore(uid, (pl) => pl.dailyStudyMinutes === 60);
  check(`${tag}: the edit persists — one plan, revision 1, first-save date kept`, edited.ielts.plan.dailyStudyMinutes === 60 && edited.ielts.plan.revisions === 1 && edited.ielts.plan.createdAt === app.ielts.plan.createdAt);
  check(`${tag}: progress still untouched after the edit`, Boolean(edited.foundation?.lessons?.['sb-1']));
  await p.goto(BASE + '/ielts', { waitUntil: 'load' });
  await p.getByTestId('ielts-hub').waitFor({ timeout: 60_000 });
  await p.getByTestId('hub-plan-target').waitFor({ timeout: 60_000 });
  check(`${tag}: IELTS page still opens; its plan card shows the target`, /8\.0/.test(await p.getByTestId('hub-plan-target').innerText()));
}

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  try {
    const mob = await (await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })).newPage();
    watchErrors(mob, 'bn-mobile', errors);
    await signUp(mob, 'Rafi', `plan-bn-${stamp}@test.dev`, 'bn');
    console.log('\n[MY PLAN] Bangla · small Android');
    await run(mob, 'bn', 'bn mobile');

    const desk = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
    watchErrors(desk, 'en-desktop', errors);
    await signUp(desk, 'Nadia', `plan-en-${stamp}@test.dev`, 'en');
    console.log('\n[MY PLAN] English · desktop');
    await run(desk, 'en', 'en desktop');

    // Signed out: the plan is never shown without an account.
    const out = await (await browser.newContext()).newPage();
    await out.goto(BASE + '/ielts/plan', { waitUntil: 'load' });
    await out.getByText('Welcome to Mino').waitFor({ timeout: 90_000 });
    check('signed out: /ielts/plan asks to sign in', (await out.getByTestId('plan-saved').count()) === 0 && (await out.getByTestId('plan-intro').count()) === 0);
  } catch (e) {
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, (e as Error).stack);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
main();
