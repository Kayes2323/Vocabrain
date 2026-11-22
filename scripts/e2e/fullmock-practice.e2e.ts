// E2E: inside a Full Mock Test, Reading can now be taken "one part at a time"
// (practice mode) instead of only the full timed exam, and that still counts
// as the section done — honestly labelled as practice, not real exam
// conditions, on the Full Mock Test overview and result pages.
//   bash scripts/e2e/run.sh fullmock-practice
import { BASE, check, launch, report, shot, signUp, watchErrors } from './helpers';

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  try {
    watchErrors(page, 'fullmock-practice', errors);
    await signUp(page, 'Rafi', `fullmock-practice-${stamp}@test.dev`, 'en');

    await page.goto(BASE + '/ielts/full-mock-test', { waitUntil: 'load' });
    const href = await page.locator('main a[href^="/ielts/full-mock-test/"]').first().getAttribute('href');
    if (!href) throw new Error('no Full Mock Test in the library');
    const testId = href.split('/').pop()!;

    await page.goto(BASE + `/ielts/full-mock-test/${testId}`, { waitUntil: 'load' });
    await page.locator(`main a[href="/ielts/tests/${testId}/reading?full=1"]`).click();
    await page.waitForURL((u) => u.pathname === `/ielts/tests/${testId}/reading`, { timeout: 30_000 });

    await page.getByTestId('intro-start').click();
    await page.getByTestId('mode-dialog').waitFor({ timeout: 15_000 });
    check('inside Full Mock Test: the full-vs-practice popup now appears for Reading', true);
    await shot(page, 'fullmock-mode-dialog');

    await page.getByTestId('mode-practice').click();
    await page.getByTestId('practice-passages').waitFor({ timeout: 30_000 });
    check('practice mode: passage tabs are shown (one part at a time)', true);

    await page.getByRole('button', { name: /Review/ }).first().click();
    await page.getByRole('button', { name: /^Submit/ }).click();
    await page.getByText(/not an official IELTS score/i).first().waitFor({ timeout: 30_000 });
    const resultPageText = await page.locator('main').innerText();
    check('practice mode: the result honestly says it was taken in practice mode', /practice mode/i.test(resultPageText), resultPageText.slice(0, 300));

    await page.goto(BASE + `/ielts/full-mock-test/${testId}`, { waitUntil: 'load' });
    await page.getByText('Reading').first().waitFor({ timeout: 30_000 });
    const overviewText = await page.locator('main').innerText();
    check('overview: Reading now counts as done, even though it was practice', /Reading/.test(overviewText) && /Practice mode/.test(overviewText));
    await shot(page, 'fullmock-overview-practice');

    await page.goto(BASE + `/ielts/full-mock-test/${testId}/result`, { waitUntil: 'load' });
    await page.getByText('Full Mock Test').first().waitFor({ timeout: 30_000 });
    const resultText = await page.locator('main').innerText();
    check('result page: an honest note explains some scores came from practice mode', /practice mode/i.test(resultText));
    check('result page: Reading shows a band instead of "Not done yet"', !/Not done yet/.test(resultText.split('Reading')[1]?.slice(0, 80) ?? ''));
    await shot(page, 'fullmock-result-practice');
  } catch (e) {
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, (e as Error).stack);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
main();
