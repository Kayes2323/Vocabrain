// The IELTS page (phases 6–7): My IELTS Plan first, then Foundation, the four
// skills, Practice Tests and the Band Score Calculator — each one tap to its
// page; Progress on its own; no learning-path accordion or progress dashboard.
// Then the practice-test journey (test → result → Progress) and the plan card
// with a saved plan. Bangla on a small Android screen, English on desktop.
//   bash scripts/e2e/run.sh ielts-hub
import type { Page } from 'playwright-core';
import { applyMyPlan, generateMyPlan } from '../../lib/engine';
import type { PlanAnswers, UserProfile } from '../../lib/models';
import { BASE, check, getDoc, launch, noHorizontalScroll, patchField, report, shot, signUp, uidOf, watchErrors, type Lang } from './helpers';

const dayKey = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

async function hub(p: Page) {
  await p.goto(BASE + '/ielts', { waitUntil: 'load' });
  await p.getByTestId('ielts-hub').waitFor({ timeout: 60_000 });
  await p.getByTestId('hub-plan-card').waitFor({ timeout: 60_000 });
}

/** One tap on the hub card with this href opens that page. */
async function opens(p: Page, tag: string, href: string, ready: (p: Page) => Promise<unknown>, name: string) {
  await hub(p);
  await p.locator(`main a[href="${href}"]`).first().click();
  await p.waitForURL((u) => u.pathname === href, { timeout: 30_000 });
  await ready(p);
  check(`${tag}: ${name} opens directly (one tap)`, new URL(p.url()).pathname === href);
  check(`${tag}: ${name} page has no sideways scroll`, await noHorizontalScroll(p));
}

async function run(p: Page, lang: Lang, tag: string, mobile: boolean) {
  const uid = (await uidOf(p))!;
  await p.waitForTimeout(1500);

  // ---------------------------------------------------------------- the page itself
  await hub(p);
  const order = await Promise.all(['plan', 'learn', 'practice', 'test', 'tools'].map(async (id) => (await p.locator(`#hub-${id}`).boundingBox())!.y));
  check(`${tag}: order — My IELTS Plan, Foundation, Practice, Practice Tests, Band Score Calculator`, order.every((y, i) => i === 0 || y > order[i - 1]), order.join(','));
  check(`${tag}: no plan → "Create your IELTS Plan" first`, (await p.getByTestId('hub-plan-card').getAttribute('data-state')) === 'none' && (await p.getByTestId('hub-plan-create').isVisible()));
  const text = await p.locator('main').innerText();
  check(`${tag}: no learning-path accordion, no Level 0–6 list`, (await p.locator('main [aria-expanded]').count()) === 0 && !/Level [0-6]|আপনার শেখার পথ|Your learning path/.test(text));
  check(`${tag}: no progress dashboard on the page (Progress has its own page)`, (await p.getByTestId('learning-stats').count()) === 0 && (await p.getByTestId('progress-overall').count()) === 0 && (await p.getByTestId('hub-progress').isVisible()));
  const cards = await p.locator('#hub-learn a, #hub-practice a, #hub-test a, #hub-tools a').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  check(`${tag}: one card per destination, no duplicates`, cards.length === 7 && new Set(cards).size === 7, cards.join(' '));
  check(`${tag}: practice cards are the four skills`, ['/ielts/practice/listening', '/ielts/reading', '/ielts/practice/writing', '/ielts/practice/speaking'].every((h) => cards.includes(h)));
  const tall = await p.locator('#hub-learn a, #hub-practice a, #hub-test a, #hub-tools a').evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().height > 96 || e.getBoundingClientRect().height < 44).length);
  check(`${tag}: compact cards with good touch targets (44–96 px)`, tall === 0);
  check(`${tag}: no "Soon" on any card`, !/Soon|শীঘ্রই/.test(await p.locator('#hub-practice').innerText()));
  check(`${tag}: no General Training path`, !/General Training/.test(text));
  check(`${tag}: IELTS page has no sideways scroll`, await noHorizontalScroll(p));
  if (mobile) {
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await p.waitForTimeout(300);
    const nav = await p.getByTestId('bottom-nav').boundingBox();
    const last = await p.locator('#hub-tools a').last().boundingBox();
    check(`${tag}: the last card is not hidden behind the bottom navigation`, Boolean(nav && last && last.y + last.height <= nav.y + 1), JSON.stringify({ nav, last }));
  }
  await shot(p, `ielts-hub-${lang}`);

  // ---------------------------------------------------------------- one tap → one destination
  await opens(p, tag, '/ielts/foundation', (q) => q.getByTestId('topic-cards').waitFor({ timeout: 60_000 }), 'IELTS Foundation');
  await opens(p, tag, '/ielts/practice/listening', (q) => q.getByTestId('skill-practice').waitFor({ timeout: 60_000 }), 'Listening');
  check(`${tag}: Listening page — the lessons and real test sections`, (await p.locator('main a[href="/ielts/foundation/listening-foundation"]').count()) === 1 && (await p.locator('main a[href$="/listening"][href^="/ielts/tests/"]').count()) >= 1);
  await opens(p, tag, '/ielts/reading', (q) => q.locator('main h1').first().waitFor({ timeout: 60_000 }), 'Reading');
  await opens(p, tag, '/ielts/practice/writing', (q) => q.getByTestId('skill-practice').waitFor({ timeout: 60_000 }), 'Writing');
  check(`${tag}: Writing page — Task 1 & 2 sections`, (await p.locator('main a[href$="/writing"][href^="/ielts/tests/"]').count()) >= 1);
  await opens(p, tag, '/ielts/practice/speaking', (q) => q.getByTestId('skill-practice').waitFor({ timeout: 60_000 }), 'Speaking');
  await opens(p, tag, '/ielts/tests', (q) => q.locator('main a[href^="/ielts/tests/"]').first().waitFor({ timeout: 60_000 }), 'Practice Tests');
  await opens(p, tag, '/ielts/band-calculator', (q) => q.locator('main h1').first().waitFor({ timeout: 60_000 }), 'Band Score Calculator');
  await hub(p);
  await p.getByTestId('hub-progress').click();
  await p.waitForURL('**/ielts/progress', { timeout: 30_000 });
  await p.getByTestId('progress-foundation').waitFor({ timeout: 60_000 });
  check(`${tag}: Progress is reachable separately`, (await p.getByTestId('progress-empty').count()) === 1);
  await hub(p);
  await p.getByTestId('hub-plan-create').click();
  await p.waitForURL('**/ielts/plan', { timeout: 30_000 });
  await p.getByTestId('plan-intro').waitFor({ timeout: 60_000 });
  check(`${tag}: My IELTS Plan opens directly`, true);

  // ---------------------------------------------------------------- Practice Test → result → Progress (English run)
  if (lang === 'en') {
    await opens(p, tag, '/ielts/tests', (q) => q.locator('main a[href$="/reading"]').first().waitFor({ timeout: 60_000 }), 'Practice Tests (again)');
    const href = (await p.locator('main a[href$="/reading"]').first().getAttribute('href'))!;
    await p.locator(`main a[href="${href}"]`).click();
    await p.waitForURL((u) => u.pathname === href, { timeout: 30_000 });
    await p.getByRole('button', { name: 'Start test' }).click();
    await p.getByRole('button', { name: 'Review' }).first().click();
    await p.getByRole('button', { name: 'Submit test' }).click();
    await p.getByText(/Estimated band|Band estimates need/).first().waitFor({ timeout: 60_000 });
    check(`${tag}: a submitted test shows its result`, /\d+ \/ \d+/.test(await p.locator('main').innerText()));
    let sessions = 0;
    for (let i = 0; i < 40 && !sessions; i++) {
      await p.waitForTimeout(250);
      await p.goto(BASE + '/ielts/progress', { waitUntil: 'load' });
      await p.getByTestId('mock-sections').waitFor({ timeout: 60_000 });
      sessions = Number((await p.getByTestId('mock-sections').innerText()).trim().split(/\s/)[0]);
    }
    check(`${tag}: Progress counts the submitted section`, sessions === 1, sessions);
    await p.reload({ waitUntil: 'load' });
    await p.getByTestId('mock-latest').waitFor({ timeout: 60_000 });
    check(`${tag}: the result survives a refresh`, (await p.getByTestId('mock-latest').innerText()).includes('Reading'));
  }

  // ---------------------------------------------------------------- with a plan: target, date, today, Continue
  const app = (await getDoc(`users/${uid}`)).app as UserProfile;
  const answers: PlanAnswers = { targetDate: dayKey(90), targetBand: 7, currentLevel: 'intermediate', dailyStudyMinutes: 60, studyDaysPerWeek: 7, weakSkills: ['reading'], studyPreference: 'mixed' };
  await patchField(`users/${uid}`, 'app.ielts', applyMyPlan(app, generateMyPlan(answers)).ielts);
  await p.reload({ waitUntil: 'load' });
  await hub(p);
  await p.getByTestId('hub-plan-today').waitFor({ timeout: 60_000 });
  check(`${tag}: plan card shows the target band and test date`, (await p.getByTestId('hub-plan-card').getAttribute('data-state')) === 'plan' && (await p.getByTestId('hub-plan-target').innerText()).includes('7.0') && (await p.getByTestId('hub-plan-date').innerText()).length > 4);
  check(`${tag}: plan card shows today's progress`, Number(await p.getByTestId('hub-plan-today').getAttribute('data-total')) > 0);
  check(`${tag}: only one My IELTS Plan block`, (await p.getByTestId('hub-plan-card').count()) === 1 && (await p.locator('main a[href="/ielts/plan"]').count()) === 1);
  await shot(p, `ielts-hub-plan-${lang}`);
  await p.getByTestId('hub-plan-continue').click();
  await p.waitForURL(`**/ielts/plan/day/${dayKey()}`, { timeout: 30_000 });
  await p.getByTestId('day-tasks').waitFor({ timeout: 60_000 });
  check(`${tag}: Continue opens today's plan`, true);
  await hub(p);
  await p.getByTestId('hub-plan-open').click();
  await p.waitForURL('**/ielts/plan', { timeout: 30_000 });
  await p.getByTestId('plan-saved').waitFor({ timeout: 60_000 });
  check(`${tag}: the plan header opens My IELTS Plan`, true);
}

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  try {
    const mob = await (await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })).newPage();
    watchErrors(mob, 'bn-mobile', errors);
    await signUp(mob, 'Rafi', `hub-bn-${stamp}@test.dev`, 'bn');
    console.log('\n[IELTS PAGE] Bangla · small Android');
    await run(mob, 'bn', 'bn mobile', true);

    const desk = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
    watchErrors(desk, 'en-desktop', errors);
    await signUp(desk, 'Nadia', `hub-en-${stamp}@test.dev`, 'en');
    console.log('\n[IELTS PAGE] English · desktop');
    await run(desk, 'en', 'en desktop', false);
  } catch (e) {
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, (e as Error).stack);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
main();
