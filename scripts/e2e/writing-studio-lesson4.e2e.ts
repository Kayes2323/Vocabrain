// E2E: Mino Writing Studio — Lesson 04 ("Overview Mastery", overview-writing).
// Walks every runner step (answering each check with the key from the lesson data, completing
// both chart-boards), opens the overview-only final task (commute chart + editor, no 150-word
// wording), and confirms the feedback is an honest skill check with no IELTS band. The unit test
// scripts/test-overview-writing.ts independently verifies the answer keys themselves.
// Also checks the standalone Visual Analysis Board page still renders from this lesson's board.
//   bash scripts/e2e/run.sh writing-studio-lesson4
import { overviewWritingLesson as lesson } from '../../lib/writing-studio/lessons/overview-writing';
import { localize } from '../../lib/writing-studio/types';
import { BASE, check, launch, report, shot, signUp, watchErrors } from './helpers';

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  try {
    watchErrors(page, 'ws-lesson4', errors);
    await signUp(page, 'Nadia', `ws-lesson4-${Date.now()}@test.dev`, 'en');

    await page.goto(BASE + '/ielts/writing-studio/task1/lesson/overview-writing', { waitUntil: 'load' });
    await page.getByText('Overview Mastery').first().waitFor({ timeout: 60_000 });
    const total = lesson.steps.length;
    check('lesson opens from the existing id with the new title', true);
    check(`progress shows ${total} steps`, (await page.getByRole('progressbar', { name: `Step 1 of ${total}` }).count()) === 1);

    const next = () => page.getByRole('button', { name: /^(Continue|Start writing)$/ });
    let walked = 0;
    let answered = 0;
    let boardTasks = 0;
    for (let i = 0; i < total + 5; i++) {
      if (!(await next().count())) break;
      const step = lesson.steps[walked];
      walked++;
      if (step.check) {
        const c = step.check;
        await page.getByRole('button', { name: c.options[c.correctIndex], exact: true }).click();
        await page.getByText(localize('en', c.explain).slice(0, 40), { exact: false }).first().waitFor({ timeout: 10_000 });
        answered++;
      }
      if (step.material?.type === 'chart-board') {
        for (let t = 0; t < step.material.tasks.length; t++) {
          await page.locator('textarea:not([disabled])').first().fill('My answer based on the chart.');
          await page.getByRole('button', { name: /Check my answer/ }).first().click();
          boardTasks++;
          await page.waitForTimeout(120);
        }
        check(`chart-board "${step.id}": all tasks revealed`, new RegExp(`${step.material.tasks.length}/${step.material.tasks.length} checked`).test(await page.locator('main').innerText()));
      }
      await next().click();
      await page.waitForTimeout(150);
    }
    check(`all ${total} steps were walked`, walked === total);
    check('every check was answered and its explanation shown', answered === lesson.steps.filter((s) => s.check).length);
    check('both chart-boards were completed (5 + 4 tasks)', boardTasks === 9);

    const editor = page.locator('#ws-editor');
    await editor.waitFor({ timeout: 15_000 });
    const writeText = await page.locator('main').innerText();
    check('final task shows its title and the commuting chart', /Write Your Own Overview/.test(writeText) && /Main method of travelling to work in a city, 2010 and 2023/.test(writeText));
    check('final task is overview-only (no introduction/body required)', /do not need to write an introduction or body paragraphs/.test(writeText));
    check('word count is a suggestion (around 25) and there is no 150-word wording', /Suggested length: around 25 words/.test(writeText) && !/Minimum 25 words/.test(writeText) && !/150/.test(writeText));

    await editor.fill('Overall, cars remained the most commonly used form of transport, although their share declined over the period. By contrast, cycling became considerably more popular, while walking remained unchanged.');
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();
    await page.getByText(/Skill check/).first().waitFor({ timeout: 60_000 });
    const fb = await page.locator('main').innerText();
    check('feedback names the targeted skill', /Skill check: Task 1 overview feature selection and synthesis/.test(fb));
    check('feedback says it is not a complete Task 1/2 response and shows no IELTS band', /not a complete Task 1 or Task 2 response/.test(fb) && !/\b[4-8]\.[05]\b/.test(fb));
    check('feedback does not demand an introduction, body paragraphs, 150 words or linking words', !/150 words|add an introduction|body paragraph|linking words/i.test(fb));
    await shot(page, 'ws-lesson4-skill-check-feedback');

    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByText('Lesson complete').waitFor({ timeout: 15_000 });
    check('lesson reaches "Lesson complete"', true);

    // the standalone Visual Analysis Board page reuses this lesson's first chart-board
    await page.goto(BASE + '/ielts/writing-studio/task1/chart-analysis-board', { waitUntil: 'load' });
    await page.getByText('Visual Analysis Board').first().waitFor({ timeout: 30_000 });
    const boardText = await page.locator('main').innerText();
    check('standalone Visual Analysis Board page renders the commute chart and its first task', /Main method of travelling to work in a city, 2010 and 2023/.test(boardText) && /What is being measured, how many categories/.test(boardText));
  } catch (e) {
    const where = await page.locator('main').innerText().catch(() => '');
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, `${(e as Error).stack}\n--- page text ---\n${where.slice(0, 1500)}`);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
main();
