// My IELTS Plan (phase 3): the day-by-day plan. Today's tasks, status from
// real activity only (opening a page does nothing), refresh, other dates,
// skip and undo, editing (future days change, the past stays), the test day.
// Bangla on a small Android screen, English on desktop.
//   bash scripts/e2e/run.sh plan-daily
import type { Page } from 'playwright-core';
import { applyMyPlan, dayTasks, generateMyPlan } from '../../lib/engine';
import type { PlanAnswers, UserProfile } from '../../lib/models';
import { BASE, check, getDoc, launch, noHorizontalScroll, patchField, report, shot, signUp, uidOf, watchErrors, type Lang } from './helpers';

const T = {
  bn: { today: 'আজকের IELTS Plan', half: '৩০ মিনিট' },
  en: { today: "Today's IELTS Plan", half: '30 min' },
};
const dayKey = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

async function appDoc(uid: string, ok: (app: any) => boolean) {
  for (let i = 0; i < 40; i++) {
    const app = (await getDoc(`users/${uid}`))?.app;
    if (app && ok(app)) return app;
    await new Promise((r) => setTimeout(r, 250));
  }
  return (await getDoc(`users/${uid}`))?.app;
}

const statuses = (p: Page) => p.locator('[data-testid="day-tasks"] [data-task]').evaluateAll((els) => els.map((e) => `${e.getAttribute('data-task')}:${e.getAttribute('data-status')}`));

async function run(p: Page, lang: Lang, tag: string) {
  const L = T[lang];
  const uid = (await uidOf(p))!;
  const today = dayKey(0);
  const tomorrow = dayKey(1);
  const started = dayKey(-3);

  // A plan made three days ago (every day a study day), so there are past days too.
  const answers: PlanAnswers = { targetDate: dayKey(120), targetBand: 7, currentLevel: 'intermediate', dailyStudyMinutes: 60, studyDaysPerWeek: 7, weakSkills: ['writing'], studyPreference: 'mixed' };
  await p.waitForTimeout(2000);
  const app = (await getDoc(`users/${uid}`)).app as UserProfile;
  const withPlan = applyMyPlan(app, generateMyPlan(answers, new Date(`${started}T09:00:00`)));
  await patchField(`users/${uid}`, 'app.ielts', withPlan.ielts);
  await p.reload({ waitUntil: 'load' });
  await p.waitForTimeout(1000);
  const plan = (await appDoc(uid, (a) => Boolean(a.ielts?.plan))).ielts.plan;
  check(`${tag}: plan stored`, Boolean(plan?.phases?.length));
  const planned = dayTasks(plan, today);

  // ---------------------------------------------------------------- My IELTS Plan → today
  await p.goto(BASE + '/ielts/plan', { waitUntil: 'load' });
  await p.getByTestId('plan-today').waitFor({ timeout: 60_000 });
  check(`${tag}: "what do I do today" is at the top`, (await p.getByTestId('plan-today').innerText()).includes(L.today));
  check(`${tag}: today lists the planned tasks`, (await p.locator('[data-today-task]').count()) === planned.length && planned.length > 0);
  check(`${tag}: nothing done yet`, (await p.locator('[data-today-task][data-status="done"]').count()) === 0);
  const rows = await p.locator('[data-day]').evaluateAll((els) => els.map((e) => [e.getAttribute('data-day'), e.getAttribute('data-state')]));
  check(`${tag}: timeline shows past days, today and the days ahead`, rows.some(([d]) => d === started) && rows.some(([d, s]) => d === today && s === 'today') && rows.some(([d]) => d! > today), JSON.stringify(rows));
  check(`${tag}: a past day with no work shows as missed`, rows.find(([d]) => d === started)?.[1] === 'missed');
  check(`${tag}: plan page has no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `plan-daily-home-${lang}`);

  await p.getByTestId('plan-today').click();
  await p.waitForURL(`**/ielts/plan/day/${today}`, { timeout: 30_000 });
  await p.getByTestId('plan-day').waitFor({ timeout: 60_000 });
  check(`${tag}: the day page opens with today's title`, (await p.locator('h1').first().innerText()).includes(L.today));
  check(`${tag}: minutes match the daily time`, (await p.getByTestId('day-minutes').getAttribute('data-minutes')) === '60');
  check(`${tag}: every task starts ○`, (await statuses(p)).every((s) => s.endsWith(':todo')), (await statuses(p)).join(','));
  check(`${tag}: each task has a real link`, (await p.locator('[data-task-action]').evaluateAll((els) => els.every((e) => (e.getAttribute('href') ?? '').startsWith('/')))));
  check(`${tag}: task details are readable text`, !(await p.getByTestId('day-tasks').innerText()).includes('[object'));
  check(`${tag}: day page has no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `plan-daily-today-${lang}`);

  // Opening a task's page is not doing it.
  const first = p.locator('[data-task-action]').first();
  const href = (await first.getAttribute('href'))!;
  await first.click();
  await p.waitForURL((u) => u.pathname === href.split('?')[0], { timeout: 30_000 });
  await p.waitForTimeout(1500);
  await p.goto(BASE + `/ielts/plan/day/${today}`, { waitUntil: 'load' });
  await p.getByTestId('day-tasks').waitFor({ timeout: 60_000 });
  check(`${tag}: opening a task does not complete it`, (await statuses(p)).every((s) => !s.endsWith(':done')), (await statuses(p)).join(','));

  // ---------------------------------------------------------------- skip / undo
  await p.getByTestId('day-skip').click();
  await p.getByTestId('day-skipped').waitFor({ timeout: 10_000 });
  check(`${tag}: skip keeps the tasks and marks none done`, (await statuses(p)).length === planned.length && (await statuses(p)).every((s) => !s.endsWith(':done')));
  const skipped = await appDoc(uid, (a) => Boolean(a.ielts.plan.log?.[today]));
  check(`${tag}: skip is saved`, Boolean(skipped.ielts.plan.log?.[today]?.skippedAt));
  await p.reload({ waitUntil: 'load' });
  await p.getByTestId('day-undo-skip').waitFor({ timeout: 60_000 });
  check(`${tag}: after a refresh the day is still skipped`, (await p.getByTestId('plan-day').getAttribute('data-state')) === 'skipped');
  await p.getByTestId('day-undo-skip').click();
  await p.getByTestId('day-skip').waitFor({ timeout: 10_000 });
  const unskipped = await appDoc(uid, (a) => !a.ielts.plan.log?.[today]);
  check(`${tag}: undo removes the skip`, !unskipped.ielts.plan.log?.[today]);

  // ---------------------------------------------------------------- real activity → ✓
  // What the app records when the student finishes work: a Foundation lesson, a recall session.
  const lessons = Object.fromEntries(['sb-1', 'sb-2', 'sb-3'].map((id) => [id, { completedAt: new Date().toISOString(), score: 90, best: 90, attempts: 1 }]));
  await patchField(`users/${uid}`, 'app.foundation.lessons', lessons);
  await patchField(`users/${uid}`, 'app.study.days', { [today]: { mode: 'normal', done: ['vocabulary'] } });
  await p.reload({ waitUntil: 'load' });
  await p.getByTestId('day-tasks').waitFor({ timeout: 60_000 });
  await p.waitForTimeout(800);
  const after = await statuses(p);
  const expectDone = planned.filter((t) => t.kind === 'foundation' || t.kind === 'vocabulary').length;
  check(`${tag}: finished work shows ✓ (${expectDone} task(s))`, after.filter((s) => s.endsWith(':done')).length === expectDone && expectDone > 0, after.join(','));
  check(`${tag}: the other tasks stay ○`, after.filter((s) => !s.endsWith(':done')).length === planned.length - expectDone);
  check(`${tag}: today's count updates`, (await p.getByTestId('day-done').getAttribute('data-done')) === String(expectDone));
  await p.reload({ waitUntil: 'load' });
  await p.getByTestId('day-tasks').waitFor({ timeout: 60_000 });
  await p.waitForTimeout(800);
  check(`${tag}: a refresh keeps the ✓`, (await statuses(p)).filter((s) => s.endsWith(':done')).length === expectDone);
  await shot(p, `plan-daily-done-${lang}`);

  // ---------------------------------------------------------------- another date
  await p.getByTestId('day-next').click();
  await p.waitForURL(`**/ielts/plan/day/${tomorrow}`, { timeout: 30_000 });
  await p.getByTestId('day-tasks').waitFor({ timeout: 60_000 });
  check(`${tag}: tomorrow is planned, not started, no actions yet`, (await p.getByTestId('plan-day').getAttribute('data-state')) === 'upcoming' && (await p.locator('[data-task-action]').count()) === 0 && (await p.getByTestId('day-skip').count()) === 0);
  await p.goto(BASE + `/ielts/plan/day/${started}`, { waitUntil: 'load' });
  await p.getByTestId('plan-day').waitFor({ timeout: 60_000 });
  check(`${tag}: a past day without work is missed (kept, not done)`, (await p.getByTestId('plan-day').getAttribute('data-state')) === 'missed');

  // ---------------------------------------------------------------- progress on the plan page
  await p.goto(BASE + '/ielts/plan', { waitUntil: 'load' });
  await p.getByTestId('plan-progress').waitFor({ timeout: 60_000 });
  await p.waitForTimeout(500);
  check(`${tag}: plan progress counts the finished tasks`, (await p.getByTestId('plan-progress').getAttribute('data-done')) === String(expectDone));

  // ---------------------------------------------------------------- edit → future only
  const primary = () => p.locator('div.sticky button').first();
  await p.getByTestId('plan-edit').click();
  await p.waitForURL('**/ielts/plan/setup?edit=1', { timeout: 30_000 });
  await p.getByTestId('plan-date').waitFor({ timeout: 60_000 });
  for (let i = 0; i < 7; i++) await primary().click();
  await p.getByTestId('plan-preview').waitFor({ timeout: 30_000 });
  await p.locator('[data-change="dailyStudyMinutes"]').click();
  await p.getByRole('radio', { name: L.half, exact: true }).click();
  await primary().click();
  await p.getByTestId('plan-preview').waitFor({ timeout: 30_000 });
  await p.getByTestId('plan-save').click();
  await p.waitForURL(/\/ielts\/plan$/, { timeout: 30_000 });
  const edited = (await appDoc(uid, (a) => a.ielts.plan.dailyStudyMinutes === 30)).ielts.plan;
  check(`${tag}: the edit is saved`, edited.dailyStudyMinutes === 30 && edited.revisions === 1);
  check(`${tag}: past days and today (already started) are kept as planned`, [started, dayKey(-1), today].every((d) => edited.history?.[d]?.tasks?.length > 0), Object.keys(edited.history ?? {}).join(','));
  await p.goto(BASE + `/ielts/plan/day/${tomorrow}`, { waitUntil: 'load' });
  await p.getByTestId('day-minutes').waitFor({ timeout: 60_000 });
  check(`${tag}: future days use the new daily time`, (await p.getByTestId('day-minutes').getAttribute('data-minutes')) === '30');
  await p.goto(BASE + `/ielts/plan/day/${today}`, { waitUntil: 'load' });
  await p.getByTestId('day-tasks').waitFor({ timeout: 60_000 });
  await p.waitForTimeout(800);
  check(`${tag}: today keeps its tasks and its ✓ after the edit`, (await p.getByTestId('day-minutes').getAttribute('data-minutes')) === '60' && (await statuses(p)).filter((s) => s.endsWith(':done')).length === expectDone);

  // ---------------------------------------------------------------- the test day and beyond
  await p.goto(BASE + `/ielts/plan/day/${answers.targetDate}`, { waitUntil: 'load' });
  await p.getByTestId('day-test').waitFor({ timeout: 60_000 });
  check(`${tag}: the target date is the test day`, (await p.getByTestId('plan-day').getAttribute('data-state')) === 'test' && (await p.getByTestId('day-next').count()) === 0);
  await p.goto(BASE + `/ielts/plan/day/${dayKey(121)}`, { waitUntil: 'load' });
  await p.getByTestId('plan-day').waitFor({ timeout: 60_000 });
  check(`${tag}: a date after the test is outside the plan`, (await p.getByTestId('plan-day').getAttribute('data-state')) === 'none');
  await p.goto(BASE + '/ielts/plan/day/not-a-date', { waitUntil: 'load' });
  await p.getByTestId('plan-day').waitFor({ timeout: 60_000 });
  check(`${tag}: a broken link shows a clear message`, (await p.getByTestId('plan-day').getAttribute('data-state')) === 'none');
}

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  try {
    const mob = await (await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })).newPage();
    watchErrors(mob, 'bn-mobile', errors);
    await signUp(mob, 'Rafi', `plan-daily-bn-${stamp}@test.dev`, 'bn');
    console.log('\n[DAILY PLAN] Bangla · small Android');
    await run(mob, 'bn', 'bn mobile');

    const desk = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
    watchErrors(desk, 'en-desktop', errors);
    await signUp(desk, 'Nadia', `plan-daily-en-${stamp}@test.dev`, 'en');
    console.log('\n[DAILY PLAN] English · desktop');
    await run(desk, 'en', 'en desktop');
  } catch (e) {
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, (e as Error).stack);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
main();
