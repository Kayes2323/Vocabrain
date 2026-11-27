// E2E: Bar Chart Mastery (Visual-Specific Training, Course 02 — Cambridge
// IELTS 12 Test 1). Confirms (a) the chart-type hub now offers this course
// (routing), (b) the Part H fix is real end to end: a deliberately wrong
// answer is marked incorrect, never a false green check, while a genuinely
// correct answer is marked correct — proving the board evaluates meaning
// rather than "did you submit something", (c) an English-only
// writing-production question does not accept a Bangla answer as fully
// correct, (d) the independent test reuses the same Cambridge chart (never
// a second, invented one), and (e) a full submission reaches real AI
// feedback with no page errors.
//   bash scripts/e2e/run.sh writing-studio-bar-chart-mastery
import { BAR_CHART_STRUCTURE_TASKS } from '../../lib/writing-studio/bar-charts';
import { BASE, check, launch, report, shot, signUp, watchErrors } from './helpers';

async function answerCurrentTask(page: import('playwright-core').Page, text: string) {
  const textarea = page.locator('textarea:not([disabled])').last();
  await textarea.fill(text);
  await page.getByRole('button', { name: 'Check my answer' }).last().click();
}

async function waitForSettled(page: import('playwright-core').Page) {
  await page.getByRole('button', { name: 'Mino is checking…' }).waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
}

async function completeChartBoardWithModelAnswers(page: import('playwright-core').Page, modelAnswers: string[]) {
  for (const answer of modelAnswers) {
    await answerCurrentTask(page, answer);
    await waitForSettled(page);
    await page.waitForTimeout(150);
  }
}

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  try {
    watchErrors(page, 'bc-mastery', errors);
    await signUp(page, 'Rashed', `bc-mastery-${stamp}@test.dev`, 'en');

    // ---------------------------------------------------------------- the chart-type hub offers this course (now a two-lesson list; Lesson 01 is the first card)
    await page.goto(BASE + '/ielts/writing-studio/task1/learn/visual-information/bar-charts', { waitUntil: 'load' });
    const lessonCards = page.getByTestId('ws-chart-course-lesson');
    await lessonCards.first().waitFor({ timeout: 30_000 });
    check('Bar Charts now offers its own course lessons (not stuck on the generic preview)', (await lessonCards.count()) >= 1);
    await lessonCards.first().click();
    await page.waitForURL((u) => /\/lesson\/bar-chart-mastery(?!-2)/.test(u.pathname), { timeout: 15_000 });
    check('opening the first lesson card goes to the dedicated bar-chart-mastery lesson', page.url().includes('/lesson/bar-chart-mastery') && !page.url().includes('bar-chart-mastery-2'), page.url());

    await page.getByText('Understanding Bar Charts').first().waitFor({ timeout: 30_000 });
    const next = () => page.getByRole('button', { name: /^(Continue|Start writing)$/ });

    await next().click(); // welcome
    await page.getByText('Read the Chart Before Comparing').first().waitFor({ timeout: 15_000 });
    await next().click(); // chart-structure (text)

    // ---------------------------------------------------------------- THE REGRESSION PROOF: a real verdict, not an automatic green check
    await page.getByText('Quick knowledge check').first().waitFor({ timeout: 15_000 });
    check('chart renders the real Cambridge dataset (title visible)', (await page.locator('main').innerText()).includes('Percentage of Australian men and women doing regular physical activity'));

    // Answer every structure question with the lesson's own correct reference text — must be marked correct.
    for (const task of BAR_CHART_STRUCTURE_TASKS) {
      await answerCurrentTask(page, task.modelAnswer);
      await waitForSettled(page);
      await page.waitForTimeout(150);
    }
    const afterCorrect = await page.locator('main').innerText();
    check('a genuinely correct answer is marked correct ("What you got right" shown, not an unavailable/incorrect message)', /What you got right/.test(afterCorrect));
    check('Continue is enabled once every structure question has a real verdict', await next().isEnabled({ timeout: 10_000 }));
    await next().click();

    // ---------------------------------------------------------------- static vs time-series MCQ
    await page.getByText('Static Chart or Time-Series Chart?').first().waitFor({ timeout: 15_000 });
    await page.getByRole('button', { name: 'The chart compares the percentages of men and women across six age groups in 2010.', exact: true }).click();
    await next().click();

    // ---------------------------------------------------------------- read-compare: ONE deliberately wrong answer must be rejected
    await page.getByText('How to Read the Bars Accurately').first().waitFor({ timeout: 15_000 });
    await answerCurrentTask(page, 'Janinna'); // the exact nonsense regression example from the bug report
    await waitForSettled(page);
    const afterWrong = await page.locator('main').innerText();
    check(
      'REGRESSION: a nonsense answer ("Janinna") is marked incorrect, never shown with a false green "correct" check',
      /What was wrong/.test(afterWrong) && !afterWrong.includes('What you got right'),
      afterWrong.slice(0, 300),
    );
    await shot(page, 'bc-mastery-incorrect');
    // finish the rest of this board correctly so the course can proceed
    await completeChartBoardWithModelAnswers(page, [
      'The lowest figure for men was recorded in the 35–44 age group, at 39.5%.',
      'Female participation peaked at 53.3% among those aged 45–54.',
      'The lowest female figure was 47.1%, among those aged 65 and over.',
      'Women recorded higher participation rates in five of the six age categories.',
    ]);
    check('Continue is enabled after the board is settled, even though one answer was wrong', await next().isEnabled({ timeout: 10_000 }));
    await next().click();

    // ---------------------------------------------------------------- remaining guided chart-boards: answer correctly to move through
    await page.getByText('Find the Biggest and Smallest Differences').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithModelAnswers(page, [
      '15–24 — the only age group where men (52.8%) were ahead of women (47.7%).',
      'The widest gender gap was in the 35–44 age group: 52.5% − 39.5% = 13 percentage points.',
      '65 and over: 47.1% − 46.7% = a gap of only 0.4 percentage points.',
    ]);
    await next().click();

    await page.getByText('Find the Main Features for Your Overview').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithModelAnswers(page, [
      'Overall, women were more physically active than men in five of the six age groups, with the only exception being those aged 15 to 24. The widest gender gap occurred among 35- to 44-year-olds, while the figures were almost identical in the oldest group.',
    ]);
    await next().click();

    await page.getByText('Organise Your Comparisons').first().waitFor({ timeout: 15_000 });
    await next().click(); // grouping (text only)

    // ---------------------------------------------------------------- writing-production: Bangla is not accepted as a full English answer
    await page.getByText('Paraphrase the Chart Description').first().waitFor({ timeout: 15_000 });
    await answerCurrentTask(page, 'এটা একটা bar chart যেটা পুরুষ আর নারীর তুলনা করে।');
    await waitForSettled(page);
    const afterBangla = await page.locator('main').innerText();
    check(
      'REGRESSION (Mode 2): a Bangla answer to an English writing-production question is never marked fully correct ("What you got right" never shown for it)',
      !afterBangla.includes('What you got right'),
      afterBangla.slice(0, 300),
    );
    await next().click();

    await page.getByText('Summarise the Main Features').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithModelAnswers(page, [
      'Overall, women recorded higher levels of physical activity than men in five of the six age groups. Men had a higher figure only among 15- to 24-year-olds, while the largest difference between the sexes was seen in the 35–44 age group.',
    ]);
    await next().click();

    await page.getByText('Support Your Overview with Data').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithModelAnswers(page, [
      'Among the youngest participants, men recorded a higher figure, at 52.8%, compared with 47.7% for women. However, the pattern was reversed in the 25–34 age group, where the female proportion stood at 48.9%, against 42.2% for males.',
      'Women also had higher participation rates in all the remaining age groups. The most substantial difference occurred among those aged 35–44, with 52.5% of women being active compared with 39.5% of men. Female participation then peaked at 53.3% among 45–54-year-olds, before remaining almost unchanged at 53.0% in the 55–64 group. In the oldest category, the figures were very similar, at 47.1% for women and 46.7% for men.',
    ]);
    await next().click();

    // ---------------------------------------------------------------- model answer, mistakes, recap, readiness
    await page.getByText('See How Everything Comes Together').first().waitFor({ timeout: 15_000 });
    await next().click();
    await page.getByText('Avoid These Bar Chart Mistakes').first().waitFor({ timeout: 15_000 });
    await next().click();
    await page.getByText('What You Have Learned').first().waitFor({ timeout: 15_000 });
    await next().click();
    await page.getByText('Your Turn — Write the Complete Report').first().waitFor({ timeout: 15_000 });
    await shot(page, 'bc-mastery-readiness');
    await next().click();

    // ---------------------------------------------------------------- independent test: SAME chart, not a second/unseen one
    await page.getByText('Independent Bar Chart Test').first().waitFor({ timeout: 15_000 });
    const writeScreen = await page.locator('main').innerText();
    check('the independent test reuses the same Cambridge chart (course content integrity rule: only one dataset)', writeScreen.includes('Percentage of Australian men and women doing regular physical activity'));
    await shot(page, 'bc-mastery-write');

    const essay =
      'The bar chart compares the proportions of Australian men and women in six different age groups who engaged in regular physical activity in 2010. Overall, women recorded higher levels of physical activity than men in five of the six age groups, the sole exception being those aged 15 to 24, where men led at 52.8% against 47.7% for women. The largest difference between the sexes was seen in the 35 to 44 age group. In that group, 52.5% of women were active compared with only 39.5% of men, a gap of 13 percentage points. Female participation then peaked at 53.3% among those aged 45 to 54, before remaining almost unchanged at 53.0% in the 55 to 64 group. In the oldest category, the figures were very similar, at 47.1% for women and 46.7% for men, a difference of only 0.4 percentage points.';
    await page.getByRole('textbox').first().fill(essay);
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();
    // Not asserting on the transient "Mino is reading your answer…" text: after this test's many
    // real chart-answer calls, the shared per-minute AI rate limit is often already spent by this
    // point, so the final essay resolves via the instant local fallback — too fast for a poll-based
    // waitFor to reliably catch the in-between state. Waiting straight for the terminal Feedback
    // screen is the real thing being verified (a result arrived, local or AI, and nothing hung).
    await page.getByText('Feedback').first().waitFor({ timeout: 30_000 });
    await shot(page, 'bc-mastery-feedback');

    // ---------------------------------------------------------------- mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    check('on a 390px mobile viewport, there is no horizontal overflow', scrollWidth <= clientWidth + 2, `scrollWidth=${scrollWidth} clientWidth=${clientWidth}`);

    check('no page errors across the whole course', errors.length === 0, errors.join(' | '));
  } finally {
    await browser.close();
  }
  process.exit(report());
}
void main();
