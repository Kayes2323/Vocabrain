// Screenshots of the real app for the Mino ad, from a demo student ("Nadia",
// Bangla, phone 390×844 @3x) with believable, consistent data: target 7.5,
// starting point 6.0, Level 0 done, a few practice sections, saved words.
// Runs on the local emulators like every E2E spec; nothing touches production.
//   E2E_SHOTS=<dir> bash scripts/e2e/run.sh ad-shots
import type { Page } from 'playwright-core';
import { applyMyPlan, generateMyPlan, planDates } from '../../lib/engine';
import { FOUNDATION_TOPICS } from '../../lib/foundation/curriculum';
import { BOOKS } from '../../lib/ielts/content';
import type { PlanAnswers, UserProfile } from '../../lib/models';
import { answerCurrent, BASE, exercise, getDoc, LABELS, launch, patchField, putDoc, shot, signUp, tagAll, uidOf } from './helpers';

const failures: string[] = [];
const dayKey = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const iso = (daysAgo: number, hour = 19) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, 10, 0, 0);
  return d.toISOString();
};

/** One named capture; a failure is logged and the rest go on. */
async function step(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    console.log('OK  ', name);
  } catch (e) {
    failures.push(`${name}: ${(e as Error).message.split('\n')[0]}`);
    console.log('FAIL', name, (e as Error).message.split('\n')[0]);
  }
}

/** The screen as a phone shows it, and the whole page for scrolling shots. */
async function both(p: Page, name: string) {
  await p.waitForTimeout(900);
  await shot(p, name, false);
  // The long page for scrolling shots: without the fixed bottom navigation floating in the middle.
  const nav = await p.addStyleTag({ content: '[data-testid="bottom-nav"]{display:none!important}' });
  await shot(p, `${name}-full`, true);
  await nav.evaluate((el) => (el as Element).remove());
}

async function go(p: Page, path: string, ready: (p: Page) => Promise<unknown>) {
  await p.goto(BASE + path, { waitUntil: 'load' });
  await ready(p);
}

async function seed(uid: string) {
  const app = (await getDoc(`users/${uid}`)).app as UserProfile;
  // Starting point 6.0 (from the four skills), target 7.5, test in ~10 weeks.
  const answers: PlanAnswers = { targetDate: dayKey(72), targetBand: 7.5, currentLevel: 'intermediate', dailyStudyMinutes: 90, studyDaysPerWeek: 6, weakSkills: ['writing'], studyPreference: 'mixed' };
  let ielts = applyMyPlan(app, generateMyPlan(answers)).ielts;
  ielts = { ...ielts, targetBand: 7.5, currentBands: { listening: 6.5, reading: 6, writing: 5.5, speaking: 6 } };
  await patchField(`users/${uid}`, 'app.ielts', ielts);

  // Level 0 (IELTS Basics) done, then the first English topics; the next lesson is "What is a noun?".
  const order = FOUNDATION_TOPICS.flatMap((t) => t.lessons ?? []);
  const done = order.slice(0, order.indexOf('pn-1'));
  const lessons = Object.fromEntries(done.map((id, i) => [id, { completedAt: iso(done.length - i + 1), score: 80 + ((i * 7) % 20), best: 80 + ((i * 7) % 20), attempts: 1 }]));
  await patchField(`users/${uid}`, 'app.foundation.lessons', lessons);
  await patchField(`users/${uid}`, 'app.foundation.introSeenAt', iso(20));
  const days = Object.fromEntries([1, 2, 3, 5, 6, 8, 9].map((d) => [dayKey(-d), { lessons: 1, questions: 10, correct: 8 }]));
  await patchField(`users/${uid}`, 'app.foundation.days', days);

  // Study abroad goal.
  await patchField(`users/${uid}`, 'app.abroad', { degreeLevel: 'bachelors', subject: 'Computer Science', targetIntake: { month: 9, year: 2027 }, preferredCountryCodes: ['IT'] });

  // Practice sections: Listening 6.5, Reading 6.0 then 6.5 (a real trend).
  const test = BOOKS[0].tests[0];
  const section = (id: string, skill: 'listening' | 'reading', daysAgo: number, correct: number, band: number) =>
    putDoc(`users/${uid}/testSessions/${id}`, {
      id, testId: test.id, bookId: test.bookId, skill, status: 'submitted', startedAt: iso(daysAgo, 18), updatedAt: iso(daysAgo), submittedAt: iso(daysAgo),
      timeLimitSeconds: skill === 'listening' ? 1800 : 3600, elapsedSeconds: skill === 'listening' ? 1740 : 3420, answers: { q1: 'x' }, flagged: [], currentNumber: 40,
      result: { skill, correct, total: 40, estimatedBand: band, byPart: [], byType: [], questions: [] },
    });
  await section(`${test.id}-listening-demo`, 'listening', 9, 26, 6.5);
  await section(`${test.id}-reading-demo1`, 'reading', 6, 23, 6);
  await section(`${test.id}-reading-demo2`, 'reading', 2, 27, 6.5);
  return { test };
}

/** "What is a noun?", played for real, with a picture of every screen and every answer. */
async function playNounLesson(p: Page) {
  const special: Record<string, string> = { 'pn-1-r1': 'tutor', 'pn-1-r2': 'main gate' };
  let n = 0;
  const name = (s: string) => `07-lesson-${String(++n).padStart(2, '0')}-${s}`;
  for (let i = 0; i < 200; i++) {
    const box = p.locator('[data-exercise-id]');
    if (await box.count()) {
      const id = (await box.getAttribute('data-exercise-id'))!;
      const e = exercise(id)!;
      const action = box.locator('div.flex.justify-end > button');
      if (e.type === 'choice' || e.type === 'gap') {
        if (e.type === 'choice') await box.getByRole('radio', { name: e.answer, exact: true }).click();
        else await box.getByRole('textbox').fill(special[id] ?? e.accepted[0]);
        await p.waitForTimeout(300);
        await shot(p, name(`${id}-answer`), false);
        await action.click();
        await box.getByRole('status').waitFor({ timeout: 10_000 });
        await p.waitForTimeout(500);
        await shot(p, name(`${id}-feedback`), false);
        await shot(p, `${name(`${id}-feedback`)}-full`, true);
        await action.click();
      } else {
        await shot(p, name(`${id}-question`), false);
        await answerCurrent(p);
      }
      continue;
    }
    const complete = p.getByRole('button', { name: LABELS.bn.complete });
    if (await complete.isVisible().catch(() => false)) {
      await shot(p, name('summary'), false);
      await complete.click();
      await p.waitForTimeout(1500);
      await shot(p, name('done'), false);
      return;
    }
    const radios = p.locator('main [role=radiogroup] [role=radio]');
    if ((await radios.count()) && !(await p.locator('main [role=radio][aria-checked=true]').count())) await radios.first().click();
    await tagAll(p);
    const next = p.getByRole('button', { name: LABELS.bn.continue });
    if (await next.isEnabled({ timeout: 2000 }).catch(() => false)) {
      await p.waitForTimeout(500);
      await shot(p, name('learn'), false);
      await next.click();
    } else await p.waitForTimeout(250);
  }
  throw new Error('lesson did not finish');
}

async function main() {
  const browser = await launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'bn-BD' });
  // Hide the Next.js dev-mode badge (it does not exist on the live site).
  await ctx.addInitScript(() => {
    const css = 'nextjs-portal{display:none!important}';
    const add = () => document.head?.appendChild(Object.assign(document.createElement('style'), { textContent: css }));
    if (document.head) add();
    else document.addEventListener('DOMContentLoaded', add);
  });
  const p = await ctx.newPage();
  try {
    await signUp(p, 'Nadia', 'nadia@example.com', 'bn');
    const uid = (await uidOf(p))!;
    const { test } = await seed(uid);
    await p.reload({ waitUntil: 'load' });
    await p.waitForTimeout(2500);

    const app = (await getDoc(`users/${uid}`)).app as UserProfile;
    const plan = app.ielts.plan!;
    console.log('plan today is a study day:', planDates(plan).includes(dayKey()), 'target', app.ielts.targetBand);

    await step('01 home', async () => {
      await go(p, '/', (q) => q.getByTestId('quick-access').waitFor({ timeout: 60_000 }));
      await both(p, '01-home');
    });
    await step('02 ielts hub', async () => {
      await go(p, '/ielts', (q) => q.getByTestId('hub-plan-card').waitFor({ timeout: 60_000 }));
      await p.getByTestId('hub-plan-today').waitFor({ timeout: 30_000 });
      await both(p, '02-ielts-hub');
      await p.locator('#hub-practice').scrollIntoViewIfNeeded();
      await p.waitForTimeout(500);
      await shot(p, '02-ielts-hub-practice', false);
    });
    await step('03 my plan', async () => {
      await go(p, '/ielts/plan', (q) => q.getByTestId('plan-saved').waitFor({ timeout: 60_000 }));
      await both(p, '03-plan');
    });
    await step('04 plan day', async () => {
      await go(p, `/ielts/plan/day/${dayKey()}`, (q) => q.getByTestId('day-tasks').waitFor({ timeout: 60_000 }));
      await both(p, '04-plan-today');
    });
    await step('05 foundation', async () => {
      await go(p, '/ielts/foundation', (q) => q.getByTestId('topic-cards').waitFor({ timeout: 60_000 }));
      await both(p, '05-foundation');
    });
    await step('06 noun topic', async () => {
      await go(p, '/ielts/foundation/noun', (q) => q.locator('[data-lesson-card]').first().waitFor({ timeout: 60_000 }));
      await both(p, '06-topic-noun');
    });
    await step('07 lesson: What is a noun?', async () => {
      await p.locator('[data-lesson-card="pn-1"]').click();
      await p.getByRole('button', { name: LABELS.bn.continue }).first().waitFor({ timeout: 60_000 });
      await playNounLesson(p);
    });
    await step('08 practice pages', async () => {
      for (const skill of ['listening', 'writing', 'speaking']) {
        await go(p, `/ielts/practice/${skill}`, (q) => q.getByTestId('skill-practice').waitFor({ timeout: 60_000 }));
        await both(p, `08-practice-${skill}`);
      }
      await go(p, '/ielts/tests', (q) => q.locator('main a[href^="/ielts/tests/"]').first().waitFor({ timeout: 60_000 }));
      await both(p, '08-practice-tests');
    });
    await step('09 reading test', async () => {
      await go(p, `/ielts/tests/${test.id}/reading`, (q) => q.getByRole('button', { name: 'Test শুরু করুন' }).waitFor({ timeout: 60_000 }));
      await both(p, '09-reading-test-intro');
      await p.getByRole('button', { name: 'Test শুরু করুন' }).click();
      await p.waitForTimeout(2000);
      await shot(p, '09-reading-test-question', false);
    });
    await step('10 band calculator', async () => {
      await go(p, '/ielts/band-calculator', (q) => q.locator('main h1').first().waitFor({ timeout: 60_000 }));
      await both(p, '10-band-calculator');
    });
    await step('11 reading library + words', async () => {
      await go(p, '/ielts/reading', (q) => q.locator('main h1').first().waitFor({ timeout: 60_000 }));
      await both(p, '11-reading-library');
      await go(p, '/ielts/reading/rl-01-turtles', (q) => q.getByTestId('library-passage').waitFor({ timeout: 60_000 }));
      await both(p, '11-reading-passage');
      const vocab = p.getByTestId('library-passage').getByTestId('vocab-word');
      const count = Math.min(await vocab.count(), 5);
      for (let i = 0; i < count; i++) {
        await vocab.nth(i).scrollIntoViewIfNeeded();
        await vocab.nth(i).click();
        const card = p.getByTestId('vocab-card');
        await card.waitFor({ timeout: 20_000 });
        await p.waitForTimeout(600);
        if (i === 0 || i === 1) await shot(p, `11-reading-word-${i + 1}`, false);
        const save = card.getByRole('button', { name: 'Save to Brain' });
        if (await save.isVisible().catch(() => false)) {
          await save.click();
          await p.waitForTimeout(1200);
          if (i === 1) await shot(p, '11-reading-word-saved', false);
        }
        await p.keyboard.press('Escape');
        await p.waitForTimeout(400);
      }
    });
    await step('12 my brain', async () => {
      await go(p, '/ielts/vocabulary/notebook', (q) => q.getByTestId('my-brain').waitFor({ timeout: 60_000 }));
      await both(p, '12-my-brain');
      await go(p, '/ielts/vocabulary/reading', (q) => q.getByTestId('reading-vocab').waitFor({ timeout: 60_000 }));
      await both(p, '12-reading-vocabulary');
    });
    await step('13 progress', async () => {
      await go(p, '/ielts/progress', (q) => q.getByTestId('progress-foundation').waitFor({ timeout: 60_000 }));
      await p.getByTestId('mock-trend').waitFor({ timeout: 30_000 }).catch(() => undefined);
      await both(p, '13-progress');
    });
    await step('14 study abroad', async () => {
      await go(p, '/abroad', (q) => q.locator('main h1').first().waitFor({ timeout: 60_000 }));
      await p.waitForTimeout(2500);
      await both(p, '14-abroad');
      // One card per screen (Austria is left out: its photo carries a stock watermark).
      for (const code of ['GB', 'DE', 'IE', 'IT', 'CH', 'CA', 'AU', 'KR']) {
        const card = p.locator(`article[data-country="${code}"]`).first();
        if (!(await card.count())) continue;
        await card.evaluate((el) => el.scrollIntoView({ block: 'center' }));
        await p.waitForTimeout(1500);
        await shot(p, `14-abroad-${code.toLowerCase()}`, false);
      }
    });
    await step('15 profile', async () => {
      await go(p, '/profile', (q) => q.locator('main').getByText('Nadia').first().waitFor({ timeout: 60_000 }));
      await both(p, '15-profile');
    });
    await step('16 mino', async () => {
      await go(p, '/mino', (q) => q.locator('main').waitFor({ timeout: 60_000 }));
      await p.waitForTimeout(3000);
      await both(p, '16-mino');
    });
    await step('17 home after the lesson', async () => {
      await go(p, '/', (q) => q.getByTestId('quick-access').waitFor({ timeout: 60_000 }));
      await both(p, '17-home-after');
    });

    // The mark, alone, for the ad's opening and logo (the app's own drawing and colours).
    await step('18 logo', async () => {
      const lp = await (await browser.newContext({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 2 })).newPage();
      const svg = (eyes: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="900" height="900"><rect x="2" y="2" width="44" height="44" rx="15" fill="oklch(0.52 0.2 277)"/>${eyes}<path fill="oklch(0.99 0 0)" opacity="0.9" d="M36 8.5l1.1 2.9 2.9 1.1-2.9 1.1L36 16.5l-1.1-2.9L32 12.5l2.9-1.1z"/></svg>`;
      const open = '<rect fill="oklch(0.99 0 0)" x="15" y="18" width="5" height="10" rx="2.5"/><rect fill="oklch(0.99 0 0)" x="28" y="18" width="5" height="10" rx="2.5"/>';
      const closed = '<rect fill="oklch(0.99 0 0)" x="15" y="22.4" width="5" height="1.2" rx="0.6"/><rect fill="oklch(0.99 0 0)" x="28" y="22.4" width="5" height="1.2" rx="0.6"/>';
      for (const [n, eyes] of [['open', open], ['closed', closed]] as const) {
        await lp.setContent(`<body style="margin:0;display:grid;place-items:center;height:100vh;background:transparent">${svg(eyes)}</body>`);
        await lp.locator('svg').screenshot({ path: `${process.env.E2E_SHOTS}/18-mino-mark-${n}.png`, omitBackground: true });
      }
      const hex = await lp.evaluate(() => {
        const c = document.createElement('canvas').getContext('2d')!;
        c.fillStyle = 'oklch(0.52 0.2 277)';
        c.fillRect(0, 0, 1, 1);
        const [r, g, b] = c.getImageData(0, 0, 1, 1).data;
        return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
      });
      console.log('brand colour', hex);
    });
  } catch (e) {
    failures.push('EXCEPTION ' + (e as Error).message.split('\n')[0]);
  } finally {
    await browser.close();
  }
  console.log(failures.length ? `\n${failures.length} failed:\n${failures.join('\n')}` : '\nall captured');
  process.exit(failures.length ? 1 : 0);
}
main();
