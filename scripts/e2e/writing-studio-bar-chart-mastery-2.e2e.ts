// E2E: Bar Chart Mastery Lesson 02 ("Long-term Changes and Reversing
// Trends" — Cambridge IELTS 13 Test 2). Confirms (a) the Bar Charts area now
// lists TWO lessons and Lesson 02 opens and routes back correctly, (b) the
// chart renders the nine-year accommodation dataset, (c) a genuinely wrong
// answer (a swapped ownership/renting figure) is marked incorrect while a
// correct one is marked correct — the same Part H evaluation fix Lesson 01
// proved, now exercised against this lesson's own dataset, (d) an
// English-only writing-production answer in Bangla is never marked fully
// correct, (e) the final independent task reuses the same Cambridge 13
// chart, and (f) a full submission reaches real AI feedback with no page
// errors and no mobile overflow.
//   bash scripts/e2e/run.sh writing-studio-bar-chart-mastery-2
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
    watchErrors(page, 'bc2-mastery', errors);
    await signUp(page, 'Nabila', `bc2-mastery-${stamp}@test.dev`, 'en');

    // ---------------------------------------------------------------- the Bar Charts area lists both lessons
    await page.goto(BASE + '/ielts/writing-studio/task1/learn/visual-information/bar-charts', { waitUntil: 'load' });
    const lessonCards = page.getByTestId('ws-chart-course-lesson');
    await lessonCards.first().waitFor({ timeout: 30_000 });
    check('the Bar Charts area now lists exactly two lessons', (await lessonCards.count()) === 2);
    await lessonCards.nth(1).click();
    await page.waitForURL('**/lesson/bar-chart-mastery-2**', { timeout: 15_000 });
    check('opening the second card goes to the dedicated bar-chart-mastery-2 lesson', page.url().includes('/lesson/bar-chart-mastery-2'), page.url());

    await page.getByText('Understanding Long-term Bar Chart Changes').first().waitFor({ timeout: 30_000 });
    const next = () => page.getByRole('button', { name: /^(Continue|Start writing)$/ });

    await next().click(); // welcome
    await page.getByText('Understand What the Chart Shows').first().waitFor({ timeout: 15_000 });
    await next().click(); // chart-structure (text) — no chart-board material on this step yet

    await page.getByText('Quick check').first().waitFor({ timeout: 15_000 });
    await page.getByRole('button', { name: 'The percentage of households in each type of accommodation', exact: true }).click();
    await next().click();

    // ---------------------------------------------------------------- THE REGRESSION PROOF: swapped ownership/renting figures must be rejected
    await page.getByText('Discover the Two Opposing Trends').first().waitFor({ timeout: 15_000 });
    check('chart renders the real Cambridge 13 T2 dataset (title visible)', (await page.locator('main').innerText()).includes('Households owning and renting accommodation in England and Wales'));
    await answerCurrentTask(page, 'Ownership generally increased, from 22% in 1918 to a peak of 69% in 2001, before falling to 64% in 2011.');
    await waitForSettled(page);
    const afterCorrect = await page.locator('main').innerText();
    check('a genuinely correct trend description is marked correct ("What you got right" shown)', /What you got right/.test(afterCorrect));
    await completeChartBoardWithAnswers(page, ['Renting generally declined, from 78% in 1918 to a low of 31% in 2001, before recovering to 36% in 2011.']);
    await next().click();

    await page.getByText('Language for Long-term Change').first().waitFor({ timeout: 15_000 });
    await next().click(); // vocab
    await page.getByText('Quick check').first().waitFor({ timeout: 15_000 });
    await page.getByRole('button', { name: /No — both showed a reversal between 2001 and 2011\./, exact: true }).click();
    await next().click();

    await page.getByText('The Most Important Turning Point').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithAnswers(page, [
      'The two figures became equal in 1971, at 50% each.',
      "In 1971, the two percentages became equal, at 50% each — the chart's crossover point.",
    ]);
    await next().click();

    // ---------------------------------------------------------------- stability-and-reversal step: deliberately submit a SWAPPED figure
    await page.getByText('Look Beyond the Main Trend').first().waitFor({ timeout: 15_000 });
    await answerCurrentTask(page, 'Ownership was 31% in 2001, its peak.'); // wrong: 31% is the RENTED low, not the owned peak (69%) — the classic swap mistake
    await waitForSettled(page);
    const afterSwap = await page.locator('main').innerText();
    check(
      'REGRESSION: a swapped ownership/renting figure (31% claimed as the ownership peak) is marked incorrect, never shown as a false "correct"',
      /What was wrong/.test(afterSwap) && !afterSwap.includes('What you got right'),
      afterSwap.slice(0, 300),
    );
    await shot(page, 'bc2-mastery-swap-incorrect');
    await completeChartBoardWithAnswers(page, [
      'Ownership fell from 69% to 64% while renting rose from 31% to 36% — a partial reversal of the long-term trend.',
      'Renting had recovered to 36% by 2011.',
    ]);
    check('Continue is enabled after the board settles, even though one answer was wrong', await next().isEnabled({ timeout: 10_000 }));
    await next().click();

    // ---------------------------------------------------------------- remaining guided steps: answer correctly to move through
    await page.getByText('Choose What Deserves to Be Written').first().waitFor({ timeout: 15_000 });
    await next().click(); // text-only key-features step

    await page.getByText('Organise the Information Logically').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithAnswers(page, [
      'Paragraph 1: 1918, 1939, 1953, 1961, 1971 (renting dominant, narrowing gap, ending at equality). Paragraph 2: 1971, 1981, 1991, 2001, 2011 (ownership dominant, peaking in 2001, then a late reversal).',
    ]);
    await next().click();

    await page.getByText('Identify the Mistake').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithAnswers(page, [
      'Incorrect — ownership rose until 2001 (69%) but then declined to 64% by 2011, so the increase was not continuous.',
      'Correct — in 1918, renting was 78% against only 22% for ownership.',
      'Correct — both figures were exactly 50% in 1971.',
      'Incorrect — ownership peaked in 2001 at 69%; by 2011 it had fallen to 64%.',
      'Correct — between 2001 and 2011, ownership fell (69% to 64%) while renting rose (31% to 36%).',
    ]);
    await next().click();

    await page.getByText('Sentence Construction').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithAnswers(page, [
      'In 1918, only 22% of households owned their accommodation, compared with 78% that rented.',
      'By 1971, the two figures had converged, with exactly half of all households in each type of accommodation.',
      'Home ownership reached its highest level in 2001, at 69%.',
      'However, this trend partly reversed by 2011, when ownership fell to 64% while renting recovered to 36%.',
    ]);
    await next().click();

    // ---------------------------------------------------------------- writing-production: Bangla is not accepted as a full English answer
    await page.getByText('Paraphrase the Task').first().waitFor({ timeout: 15_000 });
    await answerCurrentTask(page, 'এটা একটা chart যেটা owned আর rented accommodation-এর তুলনা করে।');
    await waitForSettled(page);
    const afterBangla = await page.locator('main').innerText();
    check('REGRESSION (Mode 2): a Bangla answer to an English writing-production question is never marked fully correct', !afterBangla.includes('What you got right'), afterBangla.slice(0, 300));
    await next().click();

    await page.getByText('Summarise the Main Changes').first().waitFor({ timeout: 15_000 });
    await completeChartBoardWithAnswers(page, [
      'Overall, home ownership increased substantially while renting declined, with the two figures becoming equal in 1971. Ownership then became the dominant form of accommodation, although this pattern reversed slightly in the final decade.',
    ]);
    await next().click();

    await page.getByText('A Complete Task 1 Response').first().waitFor({ timeout: 15_000 });
    await next().click();
    await page.getByText('Write Your Own Complete Report').first().waitFor({ timeout: 15_000 });
    await shot(page, 'bc2-mastery-readiness');
    await next().click();

    // ---------------------------------------------------------------- independent test: SAME Cambridge 13 chart, not a different one
    await page.getByText('Independent Report: Owned and Rented Accommodation').first().waitFor({ timeout: 15_000 });
    const writeScreen = await page.locator('main').innerText();
    check('the independent test reuses the same Cambridge 13 chart', writeScreen.includes('Households owning and renting accommodation in England and Wales'));
    await shot(page, 'bc2-mastery-write');

    const essay =
      'The bar chart compares the percentages of households in England and Wales that owned or rented their accommodation between 1918 and 2011. Overall, home ownership increased substantially while renting declined, with the two figures becoming equal in 1971. Ownership then became the dominant form of accommodation, although this pattern reversed slightly in the final decade. In 1918, only 22% of households owned their accommodation, whereas 78% rented. By 1971, both figures had converged at exactly 50%. After 1971, ownership continued rising, reaching 69% in 2001, its highest point. However, this was followed by a decline to 64% by 2011, while renting recovered slightly from 31% to 36% over the same period, showing that the long-term trend partly reversed in the final decade.';
    await page.getByRole('textbox').first().fill(essay);
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();
    await page.getByText(/Mino is reading your answer/).waitFor({ timeout: 10_000 });
    await page.getByText('Feedback').first().waitFor({ timeout: 30_000 });
    await shot(page, 'bc2-mastery-feedback');

    // ---------------------------------------------------------------- mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    check('on a 390px mobile viewport, there is no horizontal overflow', scrollWidth <= clientWidth + 2, `scrollWidth=${scrollWidth} clientWidth=${clientWidth}`);

    check('no page errors across the whole lesson', errors.length === 0, errors.join(' | '));
  } finally {
    await browser.close();
  }
  process.exit(report());
}
void main();
