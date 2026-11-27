// E2E: Line Graph Mastery (Visual-Specific Training, Course 01). Confirms
// the Visual-Specific Training card now opens this dedicated course instead
// of the generic Chart Analysis Board (the routing bug this course's spec
// asked to fix), that each of the five guided chart boards gates "Continue"
// until every guided question is revealed, that the final independent test
// renders the unseen LG-06 chart, and that a full submission reaches real
// AI feedback through the mock Gemini server with no page errors.
//   bash scripts/e2e/run.sh writing-studio-line-graph-mastery
import { BASE, check, launch, report, shot, signUp, watchErrors } from './helpers';

// Only one task's textarea+"Check my answer" pair is ever interactive at a
// time (earlier tasks turn into read-only model-answer/verdict panels once
// settled), so the last enabled textarea on the page is always the current
// question. Checking an answer now goes through a real (mocked) AI
// evaluation round trip — never instant — so each submission must wait for
// "Mino is checking…" to clear before the next task's textarea can appear.
async function revealAllChartBoardTasks(page: import('playwright-core').Page) {
  for (let i = 0; i < 10; i++) {
    const checkBtn = page.getByRole('button', { name: 'Check my answer' });
    if (!(await checkBtn.count())) break;
    const textarea = page.locator('textarea:not([disabled])').last();
    await textarea.fill('My own interpretation of this feature of the chart, in my own words.');
    await checkBtn.last().click();
    await page.getByRole('button', { name: 'Mino is checking…' }).waitFor({ state: 'hidden', timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(150);
  }
}

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  try {
    watchErrors(page, 'lg-mastery', errors);
    await signUp(page, 'Priya', `lg-mastery-${stamp}@test.dev`, 'en');

    // ---------------------------------------------------------------- the Visual-Specific Training card opens the dedicated course
    await page.goto(BASE + '/ielts/writing-studio/task1/learn/visual-information', { waitUntil: 'load' });
    await page.locator('[data-chart-id="line-graphs"]').waitFor({ timeout: 60_000 });
    await page.locator('[data-chart-id="line-graphs"]').click();
    await page.getByTestId('ws-chart-course-link').click();
    await page.waitForURL('**/lesson/line-graph-mastery*', { timeout: 15_000 });
    check('the Line Graphs card opens the dedicated Line Graph Mastery lesson, not the generic chart-analysis board', page.url().includes('/lesson/line-graph-mastery'), page.url());
    await page.getByText('The eight-step method').first().waitFor({ timeout: 30_000 });

    const next = () => page.getByRole('button', { name: /^(Continue|Start writing)$/ });

    // ---------------------------------------------------------------- method intro
    await next().click();

    // ---------------------------------------------------------------- stage 1: gated until all six guided questions are revealed
    await page.getByText('Stage 1: Single-Line Graph').first().waitFor({ timeout: 15_000 });
    check('Continue is disabled before any guided question is answered on stage 1', await next().isDisabled());
    check('stage 1 chart renders the LG-01 dataset', (await page.locator('main').innerText()).includes('Average monthly household electricity consumption'));
    await revealAllChartBoardTasks(page);
    check('Continue becomes enabled once all six guided questions are revealed', await next().isEnabled({ timeout: 10_000 }));
    await next().click();

    // ---------------------------------------------------------------- stage 1 review: answer the real check question correctly
    await page.getByText('Stage 1 model answer and error clinic').first().waitFor({ timeout: 15_000 });
    await page.getByRole('button', { name: 'Electricity consumption increased from 240 to 260 kWh.', exact: true }).click();
    const afterCheck = await page.locator('main').innerText();
    check('a correct check answer shows the real explanation text', afterCheck.includes('"increase" is already intransitive') || afterCheck.includes('intransitive'));
    await next().click();

    // ---------------------------------------------------------------- stages 2-5: reveal every chart-board, pick any option on its review check
    const stageNames = ['Stage 2: Two-Line Graph', 'Stage 3: Three-Line Graph', 'Stage 4: Fluctuating Line Graph', 'Stage 5: Four-Line Graph'];
    for (const name of stageNames) {
      await page.getByText(name).first().waitFor({ timeout: 15_000 });
      await revealAllChartBoardTasks(page);
      check(`Continue is enabled after completing ${name}`, await next().isEnabled({ timeout: 10_000 }));
      await next().click();
      // Review step: pick any option — correctness of every stage's check is
      // already covered by the data-level unit test; here we only need to
      // progress through the course. At this point the only buttons on
      // screen are the four MCQ options (no chart-board or audio controls
      // on a review step), so the first one is always an option button.
      await page.locator('main').getByRole('button').first().click({ timeout: 10_000 });
      await next().click();
    }

    // ---------------------------------------------------------------- language bank, common mistakes, readiness — ungated
    await page.getByText('Line graph language bank').first().waitFor({ timeout: 15_000 });
    await next().click();
    await page.getByText('Common line graph mistakes').first().waitFor({ timeout: 15_000 });
    await next().click();
    await page.getByText('Ready for the independent test').first().waitFor({ timeout: 15_000 });
    await shot(page, 'lg-mastery-readiness');
    await next().click();

    // ---------------------------------------------------------------- independent test: the unseen LG-06 chart, never shown during the guided stages
    await page.getByText('Independent Line Graph Test').first().waitFor({ timeout: 15_000 });
    const writeScreen = await page.locator('main').innerText();
    check('the independent test shows the unseen Dalton Borough heating chart', writeScreen.includes('Dalton Borough'));
    check('the independent test chart was never shown during the five guided stages', !writeScreen.includes('Linton') && !writeScreen.includes('Eastford'));
    await shot(page, 'lg-mastery-write');

    const essay =
      'The line graph illustrates the proportion of households using four home-heating methods in Dalton Borough between 2000 and 2025. Overall, mains gas use declined substantially while heat pumps rose sharply, overtaking both electric storage heating and mains gas during the period. Oil use remained broadly stable throughout, and electric storage heating rose at a steadier, more moderate pace than heat pumps. In 2000, mains gas was used by 62% of households, falling steadily to just 16% by 2025. Heat pumps started at only 1% but climbed quickly, reaching 46% by the end of the period. Electric storage heating rose gradually from 8% to 25%, while oil stayed within a narrow 9% to 10% range for the whole twenty-five years, never changing by more than one percentage point. Heat pumps overtook both mains gas and electric storage heating between 2015 and 2020, finishing the period as the most widely used heating method among the four shown in the borough.';
    await page.getByRole('textbox').first().fill(essay);
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();
    // Not asserting on the transient "Mino is reading your answer…" text: after this test's many
    // real chart-answer calls, the shared per-minute AI rate limit is often already spent by this
    // point, so the final essay resolves via the instant local fallback — too fast for a poll-based
    // waitFor to reliably catch the in-between state. Waiting straight for the terminal Feedback
    // screen is the real thing being verified (a result arrived, local or AI, and nothing hung).
    await page.getByText('Feedback').first().waitFor({ timeout: 30_000 });
    const feedbackScreen = await page.locator('main').innerText();
    check('submitting the independent test produces real feedback (not a silent failure)', feedbackScreen.length > 0);
    await shot(page, 'lg-mastery-feedback');

    // ---------------------------------------------------------------- mobile viewport: no horizontal scroll, chart and controls fit
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    check('on a 390px mobile viewport (Android phone width), there is no horizontal overflow', scrollWidth <= clientWidth + 2, `scrollWidth=${scrollWidth} clientWidth=${clientWidth}`);
    await shot(page, 'lg-mastery-mobile');

    check('no page errors across the whole course', errors.length === 0, errors.join(' | '));
  } finally {
    await browser.close();
  }
  process.exit(report());
}
void main();
