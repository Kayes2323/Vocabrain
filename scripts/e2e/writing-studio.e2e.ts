// E2E: Mino Writing Studio — a real lesson end to end: walk the teaching
// steps, submit the final task, get real feedback (Mino's AI via the mock
// Gemini server, or this prototype's local fallback if the mock reply
// doesn't match), and confirm the result is actually saved to the
// student's profile (Firestore) and reflected on the Academy and Dashboard.
//   bash scripts/e2e/run.sh writing-studio
import { BASE, check, getDoc, launch, report, shot, signUp, uidOf, watchErrors } from './helpers';

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  try {
    watchErrors(page, 'writing-studio', errors);
    await signUp(page, 'Nadia', `writing-studio-${stamp}@test.dev`, 'en');
    const uid = (await uidOf(page))!;

    // ---------------------------------------------------------------- dashboard
    await page.goto(BASE + '/ielts/writing-studio', { waitUntil: 'load' });
    await page.getByText('Mino Writing Studio').waitFor({ timeout: 60_000 });
    check('dashboard: welcome panel for a new student', (await page.locator('main').innerText()).includes('Welcome'));
    await shot(page, 'ws-dashboard');

    // ---------------------------------------------------------------- a real lesson, start to finish
    await page.goto(BASE + '/ielts/writing-studio/task1/lesson/task1-understanding', { waitUntil: 'load' });
    await page.getByText('Understanding IELTS Writing Task 1').first().waitFor({ timeout: 60_000 });

    for (let i = 0; i < 10; i++) {
      const next = page.getByRole('button', { name: /^(Continue|Start writing)$/ });
      if (!(await next.count())) break;
      if (await next.isDisabled()) {
        await page.getByRole('button').filter({ hasNotText: /^(Back|Continue|Start writing)$/ }).first().click();
        await page.waitForTimeout(200);
      }
      await next.click();
      await page.waitForTimeout(250);
    }

    const editor = page.locator('#ws-editor');
    await editor.waitFor({ timeout: 30_000 });
    const essay =
      'This essay describes a chart. Overall, the chart shows clear changes over the period. For example, one category rose while another fell. ' +
      'As a result, the gap between them widened noticeably by the end of the period in general.';
    await editor.fill(essay);
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();

    await page.getByText(/Mino's assessment|Local practice check/).first().waitFor({ timeout: 60_000 });
    check('lesson: feedback panel appears with an honest source label (AI or local fallback)', true);
    await shot(page, 'ws-lesson-feedback');

    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByText('Lesson complete').waitFor({ timeout: 15_000 });
    check('lesson: reaches "Lesson complete"', true);

    // ---------------------------------------------------------------- saved to the real profile
    let app: any = null;
    for (let i = 0; i < 20 && !app?.writingStudio?.lessons?.['task1-understanding']; i++) {
      await page.waitForTimeout(500);
      app = (await getDoc(`users/${uid}`)).app;
    }
    const record = app?.writingStudio?.lessons?.['task1-understanding'];
    check('profile: the lesson completion was saved to Firestore', Boolean(record), JSON.stringify(record));
    check('profile: one attempt recorded', record?.attempts === 1, record?.attempts);
    check('profile: task is 1', record?.task === 1, record?.task);

    // ---------------------------------------------------------------- reflected on the Academy page
    // The profile (and therefore real completion state) loads asynchronously after
    // first paint, so poll rather than reading the row immediately.
    await page.goto(BASE + '/ielts/writing-studio/task1', { waitUntil: 'load' });
    await page.getByText('Understanding IELTS Writing Task 1').first().waitFor({ timeout: 60_000 });
    let row = '';
    for (let i = 0; i < 20; i++) {
      row = await page.locator('main a', { hasText: 'Understanding IELTS Writing Task 1' }).first().innerText();
      if (/Done/.test(row)) break;
      await page.waitForTimeout(500);
    }
    check('academy: the finished module shows "Done"', /Done/.test(row), row);
    check('academy: lessons-completed count reflects the real save', /1\/7 lessons/.test(await page.locator('main').innerText()));

    // ---------------------------------------------------------------- reflected on the Dashboard and Progress page
    await page.goto(BASE + '/ielts/writing-studio', { waitUntil: 'load' });
    await page.getByText('1', { exact: true }).first().waitFor({ timeout: 30_000 });
    check('dashboard: "Lessons done" is no longer zero', /Lessons done/.test(await page.locator('main').innerText()));

    await page.goto(BASE + '/ielts/writing-studio/progress', { waitUntil: 'load' });
    await page.getByText('Progress & Learning Profile').waitFor({ timeout: 30_000 });
    const progressText = await page.locator('main').innerText();
    check('progress: no longer the empty state (a real mistake or band was recorded)', !/Nothing recorded yet/.test(progressText) || /Latest/.test(progressText));
    await shot(page, 'ws-progress');
  } catch (e) {
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, (e as Error).stack);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
main();
