// E2E: Mino Writing Studio — Lesson 01 ("Understanding IELTS Writing Task 1")
// instructional-quality upgrade. Walks the full teaching sequence (checking
// one guided-practice question for a correct answer specifically), submits
// the independent introduction-writing task, and confirms the feedback is
// honestly framed as a skill check rather than a full-task IELTS band. Also
// smoke-checks that two other lessons (one Task 1, one Task 2) are
// unaffected and still show the ordinary band-based feedback framing.
//   bash scripts/e2e/run.sh writing-studio-lesson1
import { BASE, check, launch, report, shot, signUp, watchErrors } from './helpers';

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  try {
    watchErrors(page, 'ws-lesson1', errors);
    await signUp(page, 'Nadia', `ws-lesson1-${stamp}@test.dev`, 'en');

    // ---------------------------------------------------------------- opens correctly
    await page.goto(BASE + '/ielts/writing-studio/task1/lesson/task1-understanding', { waitUntil: 'load' });
    await page.getByText('Understanding IELTS Writing Task 1').first().waitFor({ timeout: 60_000 });
    const introText = await page.locator('main').innerText();
    check('lesson opens with the Academic Task 1 label (not General Training)', /ACADEMIC/.test(introText) && /General Training/.test(introText));
    await shot(page, 'ws-lesson1-intro');

    // ---------------------------------------------------------------- walk the teaching steps
    let sawCorrectCheck = false;
    for (let i = 0; i < 20; i++) {
      const next = page.getByRole('button', { name: /^(Continue|Start writing)$/ });
      if (!(await next.count())) break;

      // The task-type classification question: answer it CORRECTLY and verify the explanation appears.
      const taskTypeQuestion = page.getByText('A friend practising IELTS shows you a task card');
      if (await taskTypeQuestion.count()) {
        await page.getByRole('button', { name: 'Academic Writing Task 1 — describing visual data' }).click();
        await page.getByText(/no opinion asked for/).waitFor({ timeout: 10_000 });
        sawCorrectCheck = true;
        await page.waitForTimeout(150);
        await next.click();
        await page.waitForTimeout(250);
        continue;
      }

      if (await next.isDisabled()) {
        await page.getByRole('button').filter({ hasNotText: /^(Back|Continue|Start writing)$/ }).first().click();
        await page.waitForTimeout(200);
      }
      await next.click();
      await page.waitForTimeout(250);
    }
    check('guided practice: the correct answer was selected and its explanation shown', sawCorrectCheck);

    // ---------------------------------------------------------------- independent practice: the final exercise
    const editor = page.locator('#ws-editor');
    await editor.waitFor({ timeout: 15_000 });
    const writeScreenText = await page.locator('main').innerText();
    check('independent practice only asks for the introduction (no overview/body/opinion requested)', /introduction/i.test(writeScreenText) && !/write a complete/i.test(writeScreenText));
    check('the word count is worded as a suggestion, not a hard minimum, for this skill drill', /Suggested length: around 20 words/.test(writeScreenText) && !/Minimum 20 words/.test(writeScreenText));

    const intro =
      'The two line graphs illustrate the mean monthly temperature and the amount of rainfall recorded in two cities across a twelve-month period.';
    await editor.fill(intro);
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();

    // ---------------------------------------------------------------- the feedback must be an honest skill check
    await page.getByText(/Skill check/).first().waitFor({ timeout: 60_000 });
    const feedbackText = await page.locator('main').innerText();
    check('feedback is framed as a skill check naming the targeted skill', /Skill check: Paraphrasing accuracy for a Task 1 introduction/.test(feedbackText));
    check('feedback does NOT present a decimal number as if it were a full-task IELTS band', !/\b[4-8]\.[05]\b/.test(feedbackText));
    check('feedback explicitly says this is not a full Task 1/2 response', /not a complete Task 1 or Task 2 response/.test(feedbackText));
    await shot(page, 'ws-lesson1-skill-check-feedback');

    // ------------------------------------------------------------ a short-but-accurate intro must not be shown as "wrong"
    await page.getByRole('button', { name: 'Rewrite and try again' }).click();
    await editor.waitFor({ timeout: 15_000 });
    const shortIntro = 'The two line graphs show the mean monthly temperature and rainfall levels in two cities over a year.';
    await editor.fill(shortIntro);
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();
    await page.getByText(/Skill check/).first().waitFor({ timeout: 60_000 });
    const shortFeedbackText = await page.locator('main').innerText();
    check('a genuinely under-20-word but accurate introduction shows its real word count, not an X/20 threshold format', /\b18 words\b/.test(shortFeedbackText) && !/18\/20/.test(shortFeedbackText));
    check('the under-length skill-check answer is not shown with "underdeveloped"/under-the-minimum wording', !/underdeveloped/i.test(shortFeedbackText) && !/Under 20 words/.test(shortFeedbackText));
    await shot(page, 'ws-lesson1-short-intro-feedback');

    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByText('Lesson complete').waitFor({ timeout: 15_000 });
    check('lesson reaches "Lesson complete"', true);

    // ---------------------------------------------------------------- other lessons are unaffected
    await page.goto(BASE + '/ielts/writing-studio/task1/lesson/task1-introduction', { waitUntil: 'load' });
    await page.getByText('Writing a Clear Introduction', { exact: false }).first().waitFor({ timeout: 30_000 });
    for (let i = 0; i < 15; i++) {
      const next = page.getByRole('button', { name: /^(Continue|Start writing)$/ });
      if (!(await next.count())) break;
      if (await next.isDisabled()) {
        await page.getByRole('button').filter({ hasNotText: /^(Back|Continue|Start writing)$/ }).first().click();
        await page.waitForTimeout(150);
      }
      await next.click();
      await page.waitForTimeout(200);
    }
    const otherEditor = page.locator('#ws-editor');
    await otherEditor.waitFor({ timeout: 15_000 });
    await otherEditor.fill(
      "The given table illustrates the number of people visiting four museums in one city during 2015 and 2023. I used a vocabulary swap and a structure shift to rewrite the sentence.",
    );
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();
    await page.getByText(/Mino's assessment|Local practice check/).first().waitFor({ timeout: 60_000 });
    const otherFeedbackText = await page.locator('main').innerText();
    check(
      'a lesson without skillFocus (task1-introduction) is unaffected: still shows band-based feedback, not a skill check',
      !/Skill check:/.test(otherFeedbackText),
    );
  } catch (e) {
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, (e as Error).stack);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
main();
