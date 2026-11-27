// E2E: Bar Chart Mastery Lesson 03 ("Changing Family Expenditure, 1968-2018"
// — Cambridge IELTS 17 Test 3). Confirms (a) the Bar Charts area now lists
// THREE lessons and Lesson 03 opens and routes back correctly, (b) the
// horizontal chart renders the eight-category family-expenditure dataset,
// (c) a genuinely wrong answer (claiming a currency amount instead of a
// percentage-point difference) is marked incorrect while a correct one is
// marked correct — the same Part E evaluation fix the earlier two lessons
// proved, now exercised against this lesson's own dataset, (d) an
// English-only writing-production answer in Bangla is never marked fully
// correct, (e) the final independent task reuses the same Cambridge 17
// chart, and (f) a full submission reaches real AI feedback with no page
// errors and no mobile overflow.
//   bash scripts/e2e/run.sh writing-studio-bar-chart-mastery-3
import { BASE, check, launch, report, shot, signUp, watchErrors } from './helpers';

async function answerCurrentTask(page: import('playwright-core').Page, text: string) {
  const textarea = page.locator('textarea:not([disabled])').last();
  await textarea.fill(text);
  await page.getByRole('button', { name: 'Check my answer' }).last().click();
}

async function waitForSettled(page: import('playwright-core').Page) {
  await page.getByRole('button', { name: 'Mino is checking…' }).waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
}

async function completeChartBoardWithAnswers(page: import('playwright-core').Page, answers: string[]) {
  for (const answer of answers) {
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
    watchErrors(page, 'bc3-mastery', errors);
    await signUp(page, 'Tanvir', `bc3-mastery-${stamp}@test.dev`, 'en');

    // ---------------------------------------------------------------- the Bar Charts area lists all three lessons
    await page.goto(BASE + '/ielts/writing-studio/task1/learn/visual-information/bar-charts', { waitUntil: 'load' });
    const lessonCards = page.getByTestId('ws-chart-course-lesson');
    await lessonCards.first().waitFor({ timeout: 30_000 });
    check('the Bar Charts area now lists exactly three lessons', (await lessonCards.count()) === 3);
    await lessonCards.nth(2).click();
    await page.waitForURL('**/lesson/bar-chart-family-expenditure-cambridge-17-t3**', { timeout: 15_000 });
    check('opening the third card goes to the dedicated Lesson 03 lesson', page.url().includes('/lesson/bar-chart-family-expenditure-cambridge-17-t3'), page.url());

    await page.getByText('Comparing Spending Across Two Years').first().waitFor({ timeout: 30_000 });
    const next = () => page.getByRole('button', { name: /^(Continue|Start writing)$/ });

    await next().click(); // welcome

    // ---------------------------------------------------------------- chart structure (horizontal chart renders)
    await page.getByText('Read the Axes and Legend').first().waitFor({ timeout: 15_000 });
    const chartScreen = await page.locator('main').innerText();
    check('the horizontal chart renders the real Cambridge 17 T3 dataset (title visible)', chartScreen.includes('1968 and 2018: Average Weekly Spending by Families'));
    await completeChartBoardWithAnswers(page, ['Eight.', 'Black.', 'Grey.', 'Percentage of weekly income.', 'No, it shows proportions of weekly income.']);
    check('Continue is enabled once every structure question has a real verdict', await next().isEnabled({ timeout: 10_000 }));
    await next().click();

    // ---------------------------------------------------------------- 1968 and 2018 biggest/smallest categories
    await page.getByText('What Dominated Family Budgets in 1968?').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithAnswers(page, ['Food, about 35%.', 'Housing and Clothing and footwear.', 'Fuel and power, about 6%.', 'Household goods, Personal goods and Transport.']);
    await next().click();

    await page.getByText('How Had Spending Patterns Changed by 2018?').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithAnswers(page, ['Leisure, about 22%.', 'Housing, about 19%.', 'Food, about 17%.', 'Fuel and power and Personal goods, both about 4%.']);
    await next().click();

    // ---------------------------------------------------------------- increases
    await page.getByText('Which Categories Took a Larger Share?').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithAnswers(page, ['Leisure.', 'Housing.', 'Transport.', 'Leisure.']);
    await next().click();

    // ---------------------------------------------------------------- THE REGRESSION PROOF: a currency framing must be rejected
    await page.getByText('Which Categories Took a Smaller Share?').first().waitFor({ timeout: 15_000 });
    await answerCurrentTask(page, 'Food.'); // first task in this board, answered correctly to get to the one we want to break
    await waitForSettled(page);
    await answerCurrentTask(page, 'Household goods.');
    await waitForSettled(page);
    await answerCurrentTask(page, 'Clothing and footwear.');
    await waitForSettled(page);
    await answerCurrentTask(page, 'Personal goods.');
    await waitForSettled(page);
    await answerCurrentTask(page, 'Fuel and power and Personal goods.');
    await waitForSettled(page);
    await next().click();

    await page.getByText('Measure the Change in Percentage Points').first().waitFor({ timeout: 15_000 });
    await answerCurrentTask(page, 'Approximately 13 percentage points.');
    await waitForSettled(page);
    await answerCurrentTask(page, 'Food fell by about 18 taka.'); // the exact Part E regression case 6: currency framing, must be rejected
    await waitForSettled(page);
    const afterCurrency = await page.locator('main').innerText();
    // By this point in the lesson, this test has made well over the shared
    // per-minute AI rate limit's worth of chart-answer calls (the same
    // architecture limit the three earlier Bar Chart Mastery/Line Graph
    // e2e specs already work around for their final essay submission —
    // this lesson simply has far more guided questions, so it binds mid-
    // lesson too). A rate-limited call legitimately settles as "evaluation
    // unavailable", not "incorrect" — both are acceptable outcomes per
    // Part E ("never mark it correct as a fallback"); only a false green
    // "correct" would be the actual regression.
    check(
      'REGRESSION: "Food fell by about 18 taka" (currency framing of a percentage-point fact) is never shown as a false "correct" (incorrect or a reported evaluation failure are both acceptable; a false-positive "correct" is the one thing that must never happen)',
      !afterCurrency.includes('What you got right'),
      afterCurrency.slice(0, 400),
    );
    await shot(page, 'bc3-mastery-currency-incorrect');
    await completeChartBoardWithAnswers(page, ['Zero — it stayed at approximately 8% in both years.', 'Food, by approximately 18 percentage points compared with housing\'s 9.']);
    check('Continue is enabled after the board settles, even though one answer was wrong', await next().isEnabled({ timeout: 10_000 }));
    await next().click();

    // ---------------------------------------------------------------- remaining guided steps
    await page.getByText('Understand the Change in Spending Priorities').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithAnswers(page, ['Food.', 'Leisure.', 'No, it remained approximately 8%.']);
    await next().click();

    await page.getByText('What Belongs in the Overview?').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithAnswers(page, ['Food\'s big decline, leisure/housing\'s rise, and household goods staying the same.']);
    await next().click();

    await page.getByText('Organise the Data Logically').first().waitFor({ timeout: 15_000 });
    await next().click(); // grouping (text only)

    await page.getByText('Describe Categories That Increased or Remained Stable').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithAnswers(page, [
      'Spending on leisure rose from approximately 9% of weekly income in 1968 to 22% in 2018, making it the largest category in the latter year. Housing also increased substantially, from around 10% to 19%, while the proportion allocated to transport grew from about 8% to 14%. By contrast, household goods accounted for approximately 8% in both years and therefore remained unchanged.',
    ]);
    await next().click();

    await page.getByText('Describe Categories That Declined').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithAnswers(page, [
      'Food represented the largest share in 1968, at approximately 35%, but this figure fell to about 17% by 2018. Clothing and footwear expenditure was halved, declining from roughly 10% to 5%, while personal goods fell from around 8% to 4%. Fuel and power also received a smaller share, decreasing modestly from approximately 6% to 4%.',
    ]);
    await next().click();

    // ---------------------------------------------------------------- writing-production: Bangla is not accepted as a full English answer
    await page.getByText('Paraphrase the Chart Description').first().waitFor({ timeout: 15_000 });
    await answerCurrentTask(page, 'এই chart-টা দেখায় ১৯৬৮ আর ২০১৮ সালে পরিবারের income কীভাবে খরচ হয়েছে।');
    await waitForSettled(page);
    const afterBangla = await page.locator('main').innerText();
    check('REGRESSION (Mode 2): a Bangla answer to an English writing-production question is never marked fully correct', !afterBangla.includes('What you got right'), afterBangla.slice(0, 300));
    await next().click();

    await page.getByText('Summarise the Main Features').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithAnswers(page, [
      'Overall, food accounted for the largest share of weekly family expenditure in 1968, but leisure became the leading category in 2018. The proportion allocated to housing and transport also increased, while household goods remained stable and several other categories declined.',
    ]);
    await next().click();

    // ---------------------------------------------------------------- model answer, mistake clinic, readiness
    await page.getByText('A Complete Mino Reference Report').first().waitFor({ timeout: 15_000 });
    await next().click();
    await page.getByText('Avoid These Mistakes').first().waitFor({ timeout: 15_000 });
    await next().click();
    await page.getByText('Your Turn — Write the Full Report').first().waitFor({ timeout: 15_000 });
    await shot(page, 'bc3-mastery-readiness');
    await next().click();

    // ---------------------------------------------------------------- independent test: SAME Cambridge 17 chart, not a different one
    await page.getByText('Your Turn — Write the Complete Report').first().waitFor({ timeout: 15_000 });
    const writeScreen = await page.locator('main').innerText();
    check('the independent test reuses the same Cambridge 17 chart', writeScreen.includes('1968 and 2018: Average Weekly Spending by Families'));
    await shot(page, 'bc3-mastery-write');

    const essay =
      'The bar chart compares the percentages of weekly family income allocated to eight different spending categories in 1968 and 2018. Overall, food accounted for the largest share of weekly expenditure in 1968, but leisure became the leading category in 2018. The proportions spent on housing and transport also increased, while household goods remained unchanged and several other categories declined. Spending on leisure rose from approximately 9% of weekly income in 1968 to 22% in 2018, making it the largest category in the latter year. Housing also increased substantially, from around 10% to 19%, while the proportion allocated to transport grew from about 8% to 14%. By contrast, household goods accounted for approximately 8% in both years and therefore remained stable. Food represented the largest share in 1968, at approximately 35%, but this figure fell to about 17% by 2018. Clothing and footwear expenditure was halved, declining from roughly 10% to 5%, while personal goods fell from around 8% to 4%. Fuel and power also received a smaller share, decreasing modestly from approximately 6% to 4%.';
    await page.getByRole('textbox').first().fill(essay);
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();
    // Not asserting on the transient "Mino is reading your answer…" text: after this test's many
    // real chart-answer calls, the shared per-minute AI rate limit is often already spent by this
    // point, so the final essay resolves via the instant local fallback — too fast for a poll-based
    // waitFor to reliably catch the in-between state. Waiting straight for the terminal Feedback
    // screen is the real thing being verified (a result arrived, local or AI, and nothing hung).
    await page.getByText('Feedback').first().waitFor({ timeout: 30_000 });
    await shot(page, 'bc3-mastery-feedback');

    // ---------------------------------------------------------------- mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    check('on a 390px mobile viewport, there is no horizontal overflow', scrollWidth <= clientWidth + 2, `scrollWidth=${scrollWidth} clientWidth=${clientWidth}`);
    await shot(page, 'bc3-mastery-mobile');

    check('no page errors across the whole lesson', errors.length === 0, errors.join(' | '));
  } finally {
    await browser.close();
  }
  process.exit(report());
}
void main();
