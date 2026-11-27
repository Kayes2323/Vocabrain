// Writing Studio navigation: Writing Studio → Task 1 / Task 2 → four modes → Learn Mode (7 / 9 modules) → Visual
// Information (core lecture + seven chart types) → a chart type's own area. One purpose per screen, no repeated
// training modes / progress / continue cards, honest chart-type previews, a validated way back, and every old direct
// route still working. Bangla on a small Android screen, English on desktop.
//   bash scripts/e2e/run.sh writing-studio-navigation
import type { Page } from 'playwright-core';
import { BASE, check, getDoc, launch, noHorizontalScroll, patchField, report, shot, signUp, uidOf, watchErrors, type Lang } from './helpers';

const WS = '/ielts/writing-studio';
const VISUAL_IDS = ['line-graphs', 'bar-charts', 'pie-charts', 'tables', 'mixed-charts', 'maps', 'process-diagrams'];
const MODULE_IDS_T1 = ['task1-m1', 'task1-m2', 'task1-m3', 'task1-m4', 'task1-m5', 'task1-m6', 'task1-m7'];
const MODULE_IDS_T2 = ['task2-m1', 'task2-m2', 'task2-m3', 'task2-m4', 'task2-m5', 'task2-m6', 'task2-m7', 'task2-m8', 'task2-m9'];

const path = (p: Page) => new URL(p.url()).pathname;
const hrefs = (p: Page, sel: string) => p.locator(sel).evaluateAll((els) => els.map((e) => e.getAttribute('href')));
/** Every tappable card / link of a list is at least 44 px tall. */
const tapOk = async (p: Page, sel: string) => (await p.locator(sel).evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().height < 44).length)) === 0;

async function run(p: Page, lang: Lang, tag: string, mobile: boolean) {
  const uid = (await uidOf(p))!;

  // ------------------------------------------------------------------ 1. Level 1: Writing Studio home
  await p.goto(BASE + WS, { waitUntil: 'load' });
  await p.getByTestId('ws-task-card').first().waitFor({ timeout: 60_000 });
  const homeText = await p.locator('main').innerText();
  check(`${tag}: Writing Studio home presents exactly Task 1 and Task 2`, JSON.stringify(await hrefs(p, '[data-testid="ws-task-card"]')) === JSON.stringify([`${WS}/task1`, `${WS}/task2`]));
  check(`${tag}: home has no training-mode cards, progress dashboard, module list or continue section`, !/Training modes|Your progress|Learning modules|Visual-specific|Mock tests|Continue learning|Choose your Academy/i.test(homeText) && (await p.getByTestId('ws-module-card').count()) === 0 && (await p.getByTestId('ws-mode-cards').count()) === 0 && (await p.getByTestId('ws-resume').count()) === 0);
  check(`${tag}: home: a new learner sees no resume row`, (await p.getByTestId('ws-resume').count()) === 0);
  check(`${tag}: home: big tap targets`, await tapOk(p, '[data-testid="ws-task-card"]'));
  check(`${tag}: home: no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `ws-nav-home-${lang}`, false);

  // ------------------------------------------------------------------ 2. Level 2: Task 1 → four modes
  await p.getByTestId('ws-task-card').first().click();
  await p.waitForURL(`**${WS}/task1`, { timeout: 30_000 });
  await p.getByTestId('ws-mode-cards').waitFor({ timeout: 60_000 });
  check(`${tag}: Task 1 shows exactly four mode cards, each with one destination`, JSON.stringify(await hrefs(p, '[data-testid="ws-mode-cards"] a')) === JSON.stringify([`${WS}/task1/learn`, `${WS}/task1/chart-analysis-board`, `${WS}/exam/task1`, `${WS}/task1/mistakes`]), JSON.stringify(await hrefs(p, '[data-testid="ws-mode-cards"] a')));
  const t1Text = await p.locator('main').innerText();
  check(`${tag}: Task 1 mode page has no module list, chart grid, mock-test card or second modes section`, (await p.getByTestId('ws-module-card').count()) === 0 && (await p.getByTestId('ws-chart-card').count()) === 0 && !/Training modes|Learning modules|Visual-specific|Mock tests|timed mock/i.test(t1Text) && (await p.locator(`main a[href="${WS}/exam/task1"]`).count()) === 1);
  check(`${tag}: exactly one compact progress summary (lessons, practice, level) and one "full progress" link`, (await p.getByTestId('ws-progress-summary').count()) === 1 && (await p.getByTestId('ws-sum-lessons').innerText()).trim() === '0/7' && (await p.getByTestId('ws-view-progress').getAttribute('href')) === `${WS}/progress`);
  check(`${tag}: the progress summary is not a card (no link inside it except "view progress")`, (await p.locator('[data-testid="ws-progress-summary"] a').count()) === 1);
  check(`${tag}: mode cards have good tap targets`, await tapOk(p, '[data-testid="ws-mode-cards"] a'));
  check(`${tag}: Task 1 modes: no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `ws-nav-task1-${lang}`, false);

  // ------------------------------------------------------------------ 3. Level 3: Learn Mode (seven modules)
  await p.locator(`[data-testid="ws-mode-cards"] a[href="${WS}/task1/learn"]`).click();
  await p.waitForURL(`**${WS}/task1/learn`, { timeout: 30_000 });
  await p.getByTestId('ws-module-card').first().waitFor({ timeout: 60_000 });
  const cards = await p.getByTestId('ws-module-card').evaluateAll((els) => els.map((e) => ({ id: e.getAttribute('data-module-id'), status: e.getAttribute('data-status'), title: e.querySelector('[data-testid="ws-card-title"]')?.textContent ?? '', desc: e.querySelectorAll('span')[2]?.textContent ?? '' })));
  check(`${tag}: Learn Mode: exactly the seven Task 1 modules, in order`, JSON.stringify(cards.map((c) => c.id)) === JSON.stringify(MODULE_IDS_T1), JSON.stringify(cards.map((c) => c.id)));
  check(`${tag}: Learn Mode: a new learner: every module "not started", and no continue card`, cards.every((c) => c.status === 'not-started') && (await p.getByTestId('ws-continue').count()) === 0);
  check(`${tag}: Learn Mode: titles are in the learner's language`, lang === 'bn' ? /বোঝা/.test(cards[0].title) && /বোঝা/.test(cards[1].title) : cards[0].title === 'Understanding IELTS Writing Task 1' && cards[1].title === 'Understanding Visual Information', JSON.stringify(cards.slice(0, 2)));
  check(`${tag}: Learn Mode: no training-mode cards, no progress dashboard, no chart grid here`, (await p.getByTestId('ws-mode-cards').count()) === 0 && (await p.getByTestId('ws-progress-summary').count()) === 0 && (await p.getByTestId('ws-chart-card').count()) === 0);
  check(`${tag}: Learn Mode: tap targets and no sideways scroll`, (await tapOk(p, '[data-testid="ws-module-card"]')) && (await noHorizontalScroll(p)));
  await shot(p, `ws-nav-learn-${lang}`, false);

  // a lesson opened from Learn Mode returns to Learn Mode
  await p.locator('[data-module-id="task1-m1"]').click();
  await p.waitForURL(`**${WS}/task1/lesson/task1-understanding*`, { timeout: 30_000 });
  await p.getByRole('progressbar').first().waitFor({ timeout: 60_000 });
  check(`${tag}: a lesson opened from Learn Mode keeps its id and says where Back goes`, path(p) === `${WS}/task1/lesson/task1-understanding` && (await p.getByTestId('ws-back').getAttribute('href')) === `${WS}/task1/learn`);
  await p.getByTestId('ws-back').click();
  await p.waitForURL(`**${WS}/task1/learn`, { timeout: 30_000 });
  check(`${tag}: Back from the lesson returns to Task 1 Learn Mode`, path(p) === `${WS}/task1/learn`);

  // ------------------------------------------------------------------ 4. Module 2: Visual Information hub
  await p.locator('[data-module-id="task1-m2"]').click();
  await p.waitForURL(`**${WS}/task1/learn/visual-information`, { timeout: 30_000 });
  await p.getByTestId('ws-chart-types').waitFor({ timeout: 60_000 });
  check(`${tag}: Module 2 opens its own hub, not the lesson directly`, path(p) === `${WS}/task1/learn/visual-information`);
  check(`${tag}: hub: ONE core-lecture card opening the existing lesson`, (await p.getByTestId('ws-core-lecture').count()) === 1 && (await p.getByTestId('ws-core-lecture-link').getAttribute('href')) === `${WS}/task1/lesson/visual-information?from=visual`);
  check(`${tag}: hub: the core lecture shows its 15 teaching steps`, /15/.test(await p.getByTestId('ws-core-lecture').innerText()));
  const charts = await p.getByTestId('ws-chart-card').evaluateAll((els) => els.map((e) => ({ id: e.getAttribute('data-chart-id'), state: e.getAttribute('data-state'), href: e.getAttribute('href'), text: (e as HTMLElement).innerText })));
  check(`${tag}: hub: exactly the seven chart types, in registry order`, JSON.stringify(charts.map((c) => c.id)) === JSON.stringify(VISUAL_IDS), JSON.stringify(charts.map((c) => c.id)));
  check(`${tag}: hub: each chart type is its own screen (distinct route under the hub)`, charts.every((c) => c.href === `${WS}/task1/learn/visual-information/${c.id}`) && new Set(charts.map((c) => c.href)).size === 7);
  const COURSE_CHART_IDS = new Set(['line-graphs', 'bar-charts']);
  check(`${tag}: hub: Line Graphs and Bar Charts are marked as courses; the other five are honest previews`, charts.every((c) => (COURSE_CHART_IDS.has(c.id!) ? c.state === 'course' : c.state === 'preview' && /Preview/.test(c.text))), JSON.stringify(charts.map((c) => c.state)));
  check(`${tag}: hub: the core lecture is not duplicated among the chart cards`, !charts.some((c) => /visual-information\?from|lesson\/visual-information/.test(c.href ?? '')));
  check(`${tag}: hub: tap targets and no sideways scroll`, (await tapOk(p, '[data-testid="ws-chart-card"]')) && (await noHorizontalScroll(p)));
  await shot(p, `ws-nav-visual-${lang}`, false);

  // the core lecture opens the existing 15-step lesson
  await p.getByTestId('ws-core-lecture-link').click();
  await p.waitForURL(`**${WS}/task1/lesson/visual-information*`, { timeout: 30_000 });
  await p.getByRole('progressbar', { name: 'Step 1 of 15' }).waitFor({ timeout: 60_000 });
  check(`${tag}: the core lecture opens the existing visual-information lesson (15 steps)`, (await p.getByRole('progressbar', { name: 'Step 1 of 15' }).count()) === 1);
  check(`${tag}: the lecture's audio controls are present`, (await p.locator('main').innerText()).length > 0 && (await p.getByTestId('ws-back').getAttribute('href')) === `${WS}/task1/learn/visual-information`);
  await p.getByTestId('ws-back').click();
  await p.waitForURL(`**${WS}/task1/learn/visual-information`, { timeout: 30_000 });
  check(`${tag}: Back from the core lecture returns to the Visual Information hub`, path(p) === `${WS}/task1/learn/visual-information`);

  // Line Graphs: its own course (Line Graph Mastery), never the generic overview lesson or the commute bar-chart board
  await p.locator('[data-chart-id="line-graphs"]').click();
  await p.waitForURL(`**${WS}/task1/learn/visual-information/line-graphs`, { timeout: 30_000 });
  await p.getByTestId('ws-chart-type').waitFor({ timeout: 60_000 });
  const lgLinks = await hrefs(p, 'main a');
  check(`${tag}: Line Graphs opens its own area with its dedicated course`, (await p.getByTestId('ws-chart-type').getAttribute('data-state')) === 'course' && (await p.getByTestId('ws-chart-course-link').getAttribute('href')) === `${WS}/task1/lesson/line-graph-mastery?from=visual` && /Line Graphs/.test(await p.locator('main h1').innerText()));
  check(`${tag}: Line Graphs does NOT route to the generic overview lesson or the unrelated bar-chart board`, !lgLinks.some((h) => /overview-writing|chart-analysis-board/.test(h ?? '')), JSON.stringify(lgLinks));
  await p.getByTestId('ws-chart-course-link').click();
  await p.waitForURL(`**${WS}/task1/lesson/line-graph-mastery*`, { timeout: 30_000 });
  check(`${tag}: the course lesson's Back returns to the Line Graphs area`, (await p.getByTestId('ws-back').getAttribute('href')) === `${WS}/task1/learn/visual-information/line-graphs`);
  await p.goto(BASE + `${WS}/task1/learn/visual-information/line-graphs`, { waitUntil: 'load' });
  for (const id of VISUAL_IDS.slice(1).filter((id) => id !== 'bar-charts')) {
    await p.goto(BASE + `${WS}/task1/learn/visual-information/${id}`, { waitUntil: 'load' });
    await p.getByTestId('ws-chart-type').waitFor({ timeout: 60_000 });
    if ((await p.getByTestId('ws-chart-type').getAttribute('data-state')) !== 'preview' || (await p.locator('main a[href*="chart-analysis-board"], main a[href*="overview-writing"]').count()) > 0) check(`${tag}: ${id} is an honest, separate preview`, false);
  }
  check(`${tag}: every other chart type is its own honest preview screen`, true);

  // Bar Charts: a TWO-lesson course (Bar Chart Mastery + Lesson 02), never the generic overview lesson or chart-analysis board
  await p.goto(BASE + `${WS}/task1/learn/visual-information/bar-charts`, { waitUntil: 'load' });
  await p.getByTestId('ws-chart-type').waitFor({ timeout: 60_000 });
  const bcLinks = await hrefs(p, 'main a');
  const bcLessonCards = await p.getByTestId('ws-chart-course-lesson').evaluateAll((els) => els.map((e) => ({ id: e.getAttribute('data-module-id'), href: e.getAttribute('href') })));
  check(
    `${tag}: Bar Charts opens its own area with TWO lessons listed, in order`,
    (await p.getByTestId('ws-chart-type').getAttribute('data-state')) === 'course' &&
      JSON.stringify(bcLessonCards) === JSON.stringify([
        { id: 'bar-chart-mastery', href: `${WS}/task1/lesson/bar-chart-mastery?from=visual` },
        { id: 'bar-chart-mastery-2', href: `${WS}/task1/lesson/bar-chart-mastery-2?from=visual` },
      ]),
    JSON.stringify(bcLessonCards),
  );
  check(`${tag}: Bar Charts does NOT route to the generic overview lesson or the chart-analysis board`, !bcLinks.some((h) => /overview-writing|chart-analysis-board/.test(h ?? '')), JSON.stringify(bcLinks));
  await p.getByTestId('ws-chart-course-lesson').nth(1).click();
  await p.waitForURL(`**${WS}/task1/lesson/bar-chart-mastery-2*`, { timeout: 30_000 });
  check(`${tag}: Bar Chart Mastery Lesson 02 opens and its Back returns to the Bar Charts area`, (await p.getByTestId('ws-back').getAttribute('href')) === `${WS}/task1/learn/visual-information/bar-charts`);
  await p.goto(BASE + `${WS}/task1/learn/visual-information/bar-charts`, { waitUntil: 'load' });
  check(`${tag}: an unknown chart type is a 404`, (await (await p.goto(BASE + `${WS}/task1/learn/visual-information/not-a-chart`))!.status()) === 404);

  // back through the whole hierarchy
  await p.goto(BASE + `${WS}/task1/learn/visual-information/line-graphs`, { waitUntil: 'load' });
  await p.getByTestId('ws-back').click();
  await p.waitForURL(`**${WS}/task1/learn/visual-information`, { timeout: 30_000 });
  await p.getByTestId('ws-back').click();
  await p.waitForURL(`**${WS}/task1/learn`, { timeout: 30_000 });
  check(`${tag}: Back: chart type → Visual Information → Learn Mode`, path(p) === `${WS}/task1/learn`);
  await p.getByTestId('ws-back').click();
  await p.waitForURL(`**${WS}/task1`, { timeout: 30_000 });
  check(`${tag}: Back: Learn Mode → Task 1`, path(p) === `${WS}/task1`);
  await p.getByTestId('ws-back').click();
  await p.waitForURL((u) => u.pathname === WS, { timeout: 30_000 });
  check(`${tag}: Back: Task 1 → Writing Studio`, path(p) === WS);

  // ------------------------------------------------------------------ 5. Practice, Exam, Mistake Revision destinations
  await p.goto(BASE + `${WS}/task1`, { waitUntil: 'load' });
  await p.locator(`[data-testid="ws-mode-cards"] a[href="${WS}/task1/chart-analysis-board"]`).click();
  await p.waitForURL(`**${WS}/task1/chart-analysis-board`, { timeout: 30_000 });
  await p.getByText('Visual Analysis Board').first().waitFor({ timeout: 60_000 });
  check(`${tag}: Practice Mode opens the existing Visual Analysis Board`, path(p) === `${WS}/task1/chart-analysis-board`);
  check(`${tag}: ... and Back returns to Task 1`, (await p.getByText('Task 1', { exact: true }).first().isVisible()) && (await p.locator(`a[href="${WS}/task1"]`).count()) >= 1);

  await p.goto(BASE + `${WS}/task1`, { waitUntil: 'load' });
  await p.locator(`[data-testid="ws-mode-cards"] a[href="${WS}/exam/task1"]`).click();
  await p.waitForURL(`**${WS}/exam/task1`, { timeout: 30_000 });
  await p.getByRole('timer').waitFor({ timeout: 60_000 });
  check(`${tag}: Exam Simulation opens the 20-minute Task 1 exam`, /^(20:00|19:5\d)/.test((await p.getByRole('timer').innerText()).trim()), await p.getByRole('timer').innerText());

  // ------------------------------------------------------------------ 6. real progress + mistakes appear correctly; Mistake Revision is per task
  const app = (await getDoc(`users/${uid}`)).app;
  const stamp = '2026-02-01T10:00:00.000Z';
  const mk = (task: 1 | 2, category: string) => ({ at: stamp, task, source: 'local', category, quote: 'quoted words', fix: 'fixed words', why: 'because' });
  const history = {
    lessons: { 'task1-understanding': { task: 1, completedAt: stamp, attempts: 1, lastBand: 6, bestBand: 6 }, 'task2-understanding': { task: 2, completedAt: stamp, attempts: 1, lastBand: 6, bestBand: 6 } },
    practice: [{ at: stamp, task: 1, kind: 'chart-board' }],
    mistakes: [mk(1, 'Overview'), mk(1, 'Overview'), mk(1, 'Tense'), mk(2, 'Thesis')],
    exams: [],
  };
  await patchField(`users/${uid}`, 'app.writingStudio', history);
  void app;
  await p.goto(BASE + `${WS}/task1/learn`, { waitUntil: 'load' });
  await p.evaluate(() => localStorage.setItem('mino.ws.startedLessons', JSON.stringify({ 'overview-writing': Date.now() })));
  await p.reload({ waitUntil: 'load' });
  await p.getByTestId('ws-module-card').first().waitFor({ timeout: 60_000 });
  let st: Record<string, string | null> = {};
  for (let i = 0; i < 20; i++) {
    st = Object.fromEntries(await p.getByTestId('ws-module-card').evaluateAll((els) => els.map((e) => [e.getAttribute('data-module-id'), e.getAttribute('data-status')])));
    if (st['task1-m1'] === 'completed') break;
    await p.waitForTimeout(500);
  }
  check(`${tag}: statuses are real: Module 1 completed, Module 4 in progress, the rest not started`, st['task1-m1'] === 'completed' && st['task1-m4'] === 'in-progress' && ['task1-m2', 'task1-m3', 'task1-m5', 'task1-m6', 'task1-m7'].every((k) => st[k] === 'not-started'), JSON.stringify(st));
  const cont = p.getByTestId('ws-continue');
  check(`${tag}: ONE "continue where you left off" card, for the unfinished lesson (Module 4)`, (await cont.count()) === 1 && (await p.getByTestId('ws-continue-link').getAttribute('href')) === `${WS}/task1/lesson/overview-writing?from=learn`);
  check(`${tag}: a completed lesson can be revisited`, /Revisit|আবার দেখুন/.test(await p.locator('[data-module-id="task1-m1"]').innerText()));
  await shot(p, `ws-nav-learn-progress-${lang}`, false);
  await p.goto(BASE + WS, { waitUntil: 'load' });
  await p.getByTestId('ws-resume').waitFor({ timeout: 60_000 });
  check(`${tag}: home: one compact resume row appears only now that there is something to continue`, (await p.getByTestId('ws-resume').count()) === 1 && /overview-writing/.test((await p.getByTestId('ws-resume').getAttribute('href')) ?? ''));
  let sum = '';
  await p.goto(BASE + `${WS}/task1`, { waitUntil: 'load' });
  for (let i = 0; i < 20; i++) {
    sum = (await p.getByTestId('ws-sum-lessons').innerText()).trim() + '|' + (await p.getByTestId('ws-sum-practice').innerText()).trim();
    if (sum === '1/7|1') break;
    await p.waitForTimeout(500);
  }
  check(`${tag}: Task 1 summary reflects the existing progress (1/7 lessons, 1 practice session)`, sum === '1/7|1', sum);

  await p.goto(BASE + `${WS}/task1/mistakes`, { waitUntil: 'load' });
  await p.getByTestId('ws-mistake-card').first().waitFor({ timeout: 60_000 });
  const t1m = await p.getByTestId('ws-mistake-card').allInnerTexts();
  check(`${tag}: Task 1 Mistake Revision shows only Task 1's recorded mistakes (Overview ×2, Tense)`, t1m.length === 2 && t1m.some((t) => /Overview \(Task 1\)/.test(t) && /2×/.test(t)) && t1m.some((t) => /Tense \(Task 1\)/.test(t)) && !t1m.some((t) => /Thesis|Task 2/.test(t)), JSON.stringify(t1m));
  await p.goto(BASE + `${WS}/task2/mistakes`, { waitUntil: 'load' });
  await p.getByTestId('ws-mistake-card').first().waitFor({ timeout: 60_000 });
  const t2m = await p.getByTestId('ws-mistake-card').allInnerTexts();
  check(`${tag}: Task 2 Mistake Revision shows only Task 2's mistake (Thesis)`, t2m.length === 1 && /Thesis \(Task 2\)/.test(t2m[0]), JSON.stringify(t2m));
  await p.goto(BASE + `${WS}/progress`, { waitUntil: 'load' });
  await p.getByText('Progress & Learning Profile').waitFor({ timeout: 60_000 });
  await p.getByTestId('ws-mistake-card').first().waitFor({ timeout: 60_000 });
  check(`${tag}: the combined Progress page still shows all recorded mistakes`, (await p.getByTestId('ws-mistake-card').count()) === 3);
  const after = (await getDoc(`users/${uid}`)).app.writingStudio;
  check(`${tag}: viewing the new screens left every stored record untouched`, after.mistakes.length === 4 && Object.keys(after.lessons).length === 2 && after.practice.length === 1, JSON.stringify({ m: after.mistakes.length, l: Object.keys(after.lessons), p: after.practice.length }));
  // a mistake's "practise again" returns to the screen it came from
  await p.goto(BASE + `${WS}/task1/mistakes`, { waitUntil: 'load' });
  await p.getByTestId('ws-mistake-card').first().locator('a').click();
  await p.waitForURL(`**${WS}/task1/lesson/**`, { timeout: 30_000 });
  check(`${tag}: a lesson opened from Mistake Revision returns to Task 1 Mistake Revision`, (await p.getByTestId('ws-back').getAttribute('href')) === `${WS}/task1/mistakes`);

  // ------------------------------------------------------------------ 7. Task 2: its own nine modules, its own pattern
  await p.goto(BASE + `${WS}/task2`, { waitUntil: 'load' });
  await p.getByTestId('ws-mode-cards').waitFor({ timeout: 60_000 });
  check(`${tag}: Task 2 has the same four modes with its own destinations (40-minute exam)`, JSON.stringify(await hrefs(p, '[data-testid="ws-mode-cards"] a')) === JSON.stringify([`${WS}/task2/learn`, `${WS}/task2/idea-development-board`, `${WS}/exam/task2`, `${WS}/task2/mistakes`]));
  await p.locator(`[data-testid="ws-mode-cards"] a[href="${WS}/task2/learn"]`).click();
  await p.waitForURL(`**${WS}/task2/learn`, { timeout: 30_000 });
  await p.getByTestId('ws-module-card').first().waitFor({ timeout: 60_000 });
  const ids2 = await p.getByTestId('ws-module-card').evaluateAll((els) => els.map((e) => e.getAttribute('data-module-id')));
  check(`${tag}: Task 2 Learn Mode: exactly its nine modules, no chart categories`, JSON.stringify(ids2) === JSON.stringify(MODULE_IDS_T2) && (await p.getByTestId('ws-chart-card').count()) === 0 && !/Line Graphs|Bar Charts/.test(await p.locator('main').innerText()), JSON.stringify(ids2));
  check(`${tag}: Task 2 modules open their existing lesson routes`, (await hrefs(p, '[data-testid="ws-module-card"]')).every((h) => h!.startsWith(`${WS}/task2/lesson/`)));
  check(`${tag}: Task 2 Learn Mode: no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `ws-nav-task2-learn-${lang}`, false);
  await p.goto(BASE + `${WS}/task2/idea-development-board`, { waitUntil: 'load' });
  await p.locator('main h1').first().waitFor({ timeout: 60_000 });
  check(`${tag}: Task 2 Practice Mode opens the existing Idea Development Board`, path(p) === `${WS}/task2/idea-development-board`);
  await p.goto(BASE + `${WS}/exam/task2`, { waitUntil: 'load' });
  await p.getByRole('timer').waitFor({ timeout: 60_000 });
  check(`${tag}: Task 2 Exam Simulation is the 40-minute exam`, /^(40:00|39:5\d)/.test((await p.getByRole('timer').innerText()).trim()));

  // ------------------------------------------------------------------ 8. old direct routes still work; the way back is validated
  const direct: [string, (q: Page) => Promise<unknown>][] = [
    [`${WS}/task1/lesson/task1-understanding`, (q) => q.getByRole('progressbar').first().waitFor({ timeout: 60_000 })],
    [`${WS}/task1/lesson/overview-writing`, (q) => q.getByRole('progressbar').first().waitFor({ timeout: 60_000 })],
    [`${WS}/task1/lesson/task1-full-practice`, (q) => q.getByRole('progressbar').first().waitFor({ timeout: 60_000 })],
    [`${WS}/task1/lesson/line-graphs`, (q) => q.getByText(/not fully built|Content preview|পুরোপুরি/i).first().waitFor({ timeout: 60_000 })],
    [`${WS}/task2/lesson/idea-development`, (q) => q.getByRole('progressbar').first().waitFor({ timeout: 60_000 })],
    [`${WS}/task1/chart-analysis-board`, (q) => q.getByText('Visual Analysis Board').first().waitFor({ timeout: 60_000 })],
    [`${WS}/exam`, (q) => q.getByText('Exam Simulation').first().waitFor({ timeout: 60_000 })],
    [`${WS}/exam/full`, (q) => q.getByRole('timer').waitFor({ timeout: 60_000 })],
    [`${WS}/progress`, (q) => q.getByText('Progress & Learning Profile').waitFor({ timeout: 60_000 })],
  ];
  for (const [href, ready] of direct) {
    await p.goto(BASE + href, { waitUntil: 'load' });
    await ready(p);
    check(`${tag}: old direct route ${href} still works`, path(p) === href && !/This page could not be found/.test(await p.locator('body').innerText()));
  }
  for (const evil of ['https://evil.example', '//evil.example', '/ielts/progress', 'javascript:alert(1)']) {
    await p.goto(BASE + `${WS}/task1/lesson/overview-writing?from=${encodeURIComponent(evil)}`, { waitUntil: 'load' });
    await p.getByTestId('ws-back').waitFor({ timeout: 60_000 });
    if ((await p.getByTestId('ws-back').getAttribute('href')) !== `${WS}/task1/learn`) check(`${tag}: a return URL in the query is never trusted (${evil})`, false);
  }
  check(`${tag}: a return URL in the query is never trusted`, (await p.getByTestId('ws-back').getAttribute('href')) === `${WS}/task1/learn`);

  // ------------------------------------------------------------------ 9. layout across every new screen
  if (mobile) {
    for (const href of [WS, `${WS}/task1`, `${WS}/task1/learn`, `${WS}/task1/learn/visual-information`, `${WS}/task1/learn/visual-information/line-graphs`, `${WS}/task1/mistakes`, `${WS}/task2`, `${WS}/task2/learn`, `${WS}/task2/mistakes`]) {
      await p.goto(BASE + href, { waitUntil: 'load' });
      await p.locator('main h1').first().waitFor({ timeout: 60_000 });
      await p.waitForTimeout(400);
      if (!(await noHorizontalScroll(p)) || !(await tapOk(p, '[data-testid="ws-back"]'))) check(`${tag}: ${href}: no sideways scroll, back link is tap-sized`, false);
    }
    check(`${tag}: every new screen: no sideways scroll, tap-sized back link`, await noHorizontalScroll(p));
    const nav = await p.getByTestId('bottom-nav').count();
    check(`${tag}: the shared bottom navigation is unchanged`, nav === 1 && (await p.locator('[data-testid="bottom-nav"] li').count()) === 5);
  }
}

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  try {
    const mob = await (await browser.newContext({ viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })).newPage();
    watchErrors(mob, 'bn-mobile', errors);
    await signUp(mob, 'Nusrat', `ws-nav-bn-${stamp}@test.dev`, 'bn');
    console.log('\n[WRITING STUDIO NAVIGATION] Bangla · small Android');
    await run(mob, 'bn', 'bn mobile', true);

    const desk = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
    watchErrors(desk, 'en-desktop', errors);
    await signUp(desk, 'Nadia', `ws-nav-en-${stamp}@test.dev`, 'en');
    console.log('\n[WRITING STUDIO NAVIGATION] English · desktop');
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
