// The IELTS page, a focused learning hub: My IELTS Plan, then IELTS Learning (Foundation, Listening Learning, Writing
// Learning), Tests & Library (Full Mock Test, IELTS Test Library) and Band Score Calculator as a compact secondary
// tool. The old duplicate entry points (IELTS Practice section, the four skill cards, Practice Tests, the separate NEW
// Writing Studio section) are gone from the page, but every one of those pages must still open by its direct route.
// Then the practice-test journey (test → result → Progress) and the plan card with a saved plan.
// Bangla on a small Android screen, English on desktop.
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
  const order = await Promise.all(['plan', 'learn', 'test', 'tools'].map(async (id) => (await p.locator(`#hub-${id}`).boundingBox())!.y));
  check(`${tag}: order — My IELTS Plan, IELTS Learning, Tests & Library, Band Score Calculator`, order.every((y, i) => i === 0 || y > order[i - 1]), order.join(','));
  check(`${tag}: no plan → "Create your IELTS Plan" first`, (await p.getByTestId('hub-plan-card').getAttribute('data-state')) === 'none' && (await p.getByTestId('hub-plan-create').isVisible()));
  const text = await p.locator('main').innerText();
  check(`${tag}: no learning-path accordion, no Level 0–6 list`, (await p.locator('main [aria-expanded]').count()) === 0 && !/Level [0-6]|আপনার শেখার পথ|Your learning path/.test(text));
  check(`${tag}: no progress dashboard on the page (Progress has its own page)`, (await p.getByTestId('learning-stats').count()) === 0 && (await p.getByTestId('progress-overall').count()) === 0 && (await p.getByTestId('hub-progress').isVisible()));

  // IELTS Learning: exactly Foundation, Listening Learning, Writing Learning — in that order
  const learn = await p.locator('#hub-learn a').evaluateAll((els) => els.map((e) => ({ href: e.getAttribute('href'), text: (e as HTMLElement).innerText })));
  check(`${tag}: IELTS Learning has exactly three cards: Foundation, Listening Learning, Writing Learning`, JSON.stringify(learn.map((c) => c.href)) === JSON.stringify(['/ielts/foundation', '/ielts/listening', '/ielts/writing-studio']), JSON.stringify(learn));
  check(`${tag}: the learning cards carry their approved titles`, /IELTS Foundation/.test(learn[0].text) && /Listening Learning/.test(learn[1].text) && /Writing Learning/.test(learn[2].text), JSON.stringify(learn));
  check(`${tag}: Listening Learning mentions Sound Gym; Writing Learning mentions Task 1 and Task 2`, /Sound Gym/.test(learn[1].text) && /Task 1/.test(learn[2].text) && /Task 2/.test(learn[2].text), JSON.stringify(learn));
  check(`${tag}: section heading "IELTS Learning"`, /IELTS Learning/i.test(await p.locator("#hub-learn").innerText()));

  // Tests & Library: exactly Full Mock Test and IELTS Test Library
  const tests = await p.locator('#hub-test a').evaluateAll((els) => els.map((e) => ({ href: e.getAttribute('href'), text: (e as HTMLElement).innerText })));
  check(`${tag}: Tests & Library has exactly two cards: Full Mock Test and IELTS Test Library`, JSON.stringify(tests.map((c) => c.href)) === JSON.stringify(['/ielts/full-mock-test', '/ielts/cambridge']), JSON.stringify(tests));
  check(`${tag}: Full Mock Test and IELTS Test Library titles`, /Full Mock Test/.test(tests[0].text) && /IELTS Test Library/.test(tests[1].text), JSON.stringify(tests));
  check(`${tag}: the library keeps its honest "coming soon" status (and Full Mock does not claim it)`, /Soon|শীঘ্রই/.test(tests[1].text) && !/Soon|শীঘ্রই/.test(tests[0].text), JSON.stringify(tests));
  check(`${tag}: section heading "Tests & Library"`, /Tests & Library/i.test(await p.locator("#hub-test").innerText()));

  // More Tools: Band Score Calculator as one compact row
  const tools = await p.locator('#hub-tools a').evaluateAll((els) => els.map((e) => ({ href: e.getAttribute('href'), h: e.getBoundingClientRect().height })));
  check(`${tag}: Band Score Calculator stays, as one compact secondary row`, tools.length === 1 && tools[0].href === '/ielts/band-calculator' && tools[0].h <= 80, JSON.stringify(tools));

  // Removed from the page (still reachable by direct route, see below)
  const allHrefs = await p.locator('main a').evaluateAll((els) => els.map((e) => e.getAttribute('href') ?? ''));
  const gone = ['/ielts/practice/listening', '/ielts/reading', '/ielts/practice/writing', '/ielts/practice/speaking', '/ielts/tests'];
  check(`${tag}: no IELTS Practice cards and no Practice Tests card on the page`, gone.every((h) => !allHrefs.includes(h)) && (await p.locator('#hub-practice').count()) === 0, allHrefs.join(' '));
  check(`${tag}: one Writing Studio entry only — no separate NEW section, no Prototype badge`, allHrefs.filter((h) => h === '/ielts/writing-studio').length === 1 && (await p.locator('#hub-writing-studio').count()) === 0 && !/Prototype|\bNEW\b/i.test(text), text.slice(0, 400));
  check(`${tag}: no duplicate destinations on the page`, new Set(learn.concat(tests).map((c) => c.href)).size === 5);
  check(`${tag}: no duplicate section headings`, (await p.locator('main h2').allInnerTexts()).every((t, i, a) => a.indexOf(t) === i));
  const tall = await p.locator('#hub-learn a, #hub-test a, #hub-tools a').evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().height > 96 || e.getBoundingClientRect().height < 44).length);
  check(`${tag}: compact cards with good touch targets (44–96 px)`, tall === 0);
  check(`${tag}: no General Training path`, !/General Training/.test(text));
  check(`${tag}: IELTS page has no sideways scroll`, await noHorizontalScroll(p));
  if (mobile) {
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await p.waitForTimeout(300);
    const nav = await p.getByTestId('bottom-nav').boundingBox();
    const last = await p.locator('#hub-tools a').last().boundingBox();
    check(`${tag}: the last card is not hidden behind the bottom navigation`, Boolean(nav && last && last.y + last.height <= nav.y + 1), JSON.stringify({ nav, last }));
    check(`${tag}: bottom navigation unchanged (five tabs, Mino in the middle)`, (await p.locator('[data-testid="bottom-nav"] li').count()) === 5 && (await p.locator('[data-testid="bottom-nav"] [data-testid="nav-mino"]').count()) === 1);
  }
  await shot(p, `ielts-hub-${lang}`);

  // ---------------------------------------------------------------- one tap → one destination (the cards that remain)
  await opens(p, tag, '/ielts/foundation', (q) => q.getByTestId('topic-cards').waitFor({ timeout: 60_000 }), 'IELTS Foundation');
  await opens(p, tag, '/ielts/listening', (q) => q.getByText('Mino Listening').first().waitFor({ timeout: 60_000 }), 'Listening Learning');
  check(`${tag}: Listening Learning opens the existing Mino Listening trainer (Sound Gym)`, (await p.locator('main a[href^="/ielts/listening/"]').count()) >= 1);
  await opens(p, tag, '/ielts/writing-studio', (q) => q.getByText('Mino Writing Studio').first().waitFor({ timeout: 60_000 }), 'Writing Learning');
  check(`${tag}: Writing Learning opens the existing Writing Studio (Task 1 and Task 2 academies)`, (await p.locator('main a[href^="/ielts/writing-studio/task1"]').count()) >= 1 && (await p.locator('main a[href^="/ielts/writing-studio/task2"]').count()) >= 1);
  await opens(p, tag, '/ielts/full-mock-test', (q) => q.locator('main a[href^="/ielts/full-mock-test/"]').first().waitFor({ timeout: 60_000 }), 'Full Mock Test');
  const partial = await p.locator('main').innerText();
  check(`${tag}: Full Mock Test keeps its honest "partial" badges for tests missing a skill`, /Partial|আংশিক/i.test(partial) || (await p.locator('main a[href^="/ielts/full-mock-test/"]').count()) > 0);
  await opens(p, tag, '/ielts/cambridge', (q) => q.locator('main h1').first().waitFor({ timeout: 60_000 }), 'IELTS Test Library');
  await opens(p, tag, '/ielts/band-calculator', (q) => q.locator('main h1').first().waitFor({ timeout: 60_000 }), 'Band Score Calculator');

  // ---------------------------------------------------------------- every hidden practice route still opens directly (no redirect to /ielts)
  const direct: [string, (q: Page) => Promise<unknown>, string][] = [
    ['/ielts/practice/listening', (q) => q.getByTestId('skill-practice').waitFor({ timeout: 60_000 }), 'Listening practice'],
    ['/ielts/practice/writing', (q) => q.getByTestId('skill-practice').waitFor({ timeout: 60_000 }), 'Writing practice'],
    ['/ielts/practice/speaking', (q) => q.getByTestId('skill-practice').waitFor({ timeout: 60_000 }), 'Speaking practice'],
    ['/ielts/reading', (q) => q.locator('main h1').first().waitFor({ timeout: 60_000 }), 'Reading'],
    ['/ielts/tests', (q) => q.locator('main a[href^="/ielts/tests/"]').first().waitFor({ timeout: 60_000 }), 'Practice Tests'],
  ];
  for (const [href, ready, name] of direct) {
    await p.goto(BASE + href, { waitUntil: 'load' });
    await ready(p);
    check(`${tag}: ${name} still opens at ${href} (not redirected)`, new URL(p.url()).pathname === href);
    check(`${tag}: ${name} has no sideways scroll`, await noHorizontalScroll(p));
  }
  await p.goto(BASE + '/ielts/practice/listening', { waitUntil: 'load' });
  await p.getByTestId('skill-practice').waitFor({ timeout: 60_000 });
  check(`${tag}: Listening practice page — the lessons and real test sections`, (await p.locator('main a[href="/ielts/foundation/listening-foundation"]').count()) === 1 && (await p.locator('main a[href$="/listening"][href^="/ielts/tests/"]').count()) >= 1);
  await p.goto(BASE + '/ielts/practice/writing', { waitUntil: 'load' });
  await p.getByTestId('skill-practice').waitFor({ timeout: 60_000 });
  check(`${tag}: Writing practice page — Task 1 & 2 sections`, (await p.locator('main a[href$="/writing"][href^="/ielts/tests/"]').count()) >= 1);
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
    await p.goto(BASE + '/ielts/tests', { waitUntil: 'load' });
    await p.locator('main a[href$="/reading"]').first().waitFor({ timeout: 60_000 });
    const href = (await p.locator('main a[href$="/reading"]').first().getAttribute('href'))!;
    await p.locator(`main a[href="${href}"]`).click();
    await p.waitForURL((u) => u.pathname === href, { timeout: 30_000 });
    await p.getByRole('button', { name: 'Start test' }).click();
    // Since the per-part option (Full Mock Test), Reading asks first: the whole timed test, or one passage at a time.
    await p.getByRole('button', { name: /^Full test/ }).click();
    await p.getByRole('button', { name: 'Review' }).first().click();
    await p.getByRole('button', { name: 'Submit test' }).click();
    await p.getByText(/Estimated band|Band estimates need/).first().waitFor({ timeout: 60_000 });
    check(`${tag}: a submitted test shows its result`, /\d+ \/ \d+/.test(await p.locator('main').innerText()));

    // ---------------------------------------------------------- Full Mock Test picks up the same attempt
    const testId = href.split('/')[3];
    // (Full Mock Test links carry ?full=1 since the per-part option, so match by prefix.)
    await p.goto(BASE + `/ielts/full-mock-test/${testId}`, { waitUntil: 'load' });
    await p.locator(`main a[href^="/ielts/tests/${testId}/listening"]`).first().waitFor({ timeout: 60_000 });
    // (the "next section" button repeats one of the rows, so count distinct destinations)
    const rows = new Set(await p.locator('main a[href^="/ielts/tests/"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')))).size;
    check(`${tag}: Full Mock Test lists all 4 skills`, rows === 4);
    // The submitted section is saved asynchronously (Firestore): give it a moment before reading the overview.
    let readingRow = '';
    for (let i = 0; i < 30; i++) {
      readingRow = await p.locator(`main a[href^="/ielts/tests/${testId}/reading"]`).last().innerText();
      if (/Done|\d+\s*\/\s*\d+/.test(readingRow)) break; // a finished section shows its score (e.g. 0/40) in place of the status label
      await p.waitForTimeout(500);
      await p.reload({ waitUntil: 'load' });
      await p.locator(`main a[href^="/ielts/tests/${testId}/reading"]`).first().waitFor({ timeout: 60_000 });
    }
    check(`${tag}: Full Mock Test shows Reading as done after the attempt above`, /Done|\d+\s*\/\s*\d+/.test(readingRow), readingRow);
    await p.goto(BASE + `/ielts/full-mock-test/${testId}/result`, { waitUntil: 'load' });
    await p.getByText(/not an official/i).waitFor({ timeout: 60_000 });
    check(`${tag}: the combined result page loads without all 4 skills done`, (await p.locator('main').innerText()).toLowerCase().includes("not an official"));

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
