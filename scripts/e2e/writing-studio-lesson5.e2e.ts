// E2E: Mino Writing Studio — Lesson 05 ("Body Paragraph Development", body-paragraphs).
// Walks every runner step (answering each check with the key from the lesson data, completing
// both chart-boards), opens the overview-only final task (commute chart + editor, no 150-word
// wording), and confirms the feedback is an honest skill check with no IELTS band. The unit test
// scripts/test-body-paragraphs.ts independently verifies the answer keys themselves.
//   bash scripts/e2e/run.sh writing-studio-lesson5
import { bodyParagraphsLesson as lesson } from '../../lib/writing-studio/lessons/body-paragraphs';
import { BASE, check, launch, report, shot, signUp, watchErrors } from './helpers';

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  try {
    watchErrors(page, 'ws-lesson5', errors);
    await signUp(page, 'Nadia', `ws-lesson5-${Date.now()}@test.dev`, 'en');

    await page.goto(BASE + '/ielts/writing-studio/task1/lesson/body-paragraphs', { waitUntil: 'load' });
    await page.getByText('Body Paragraph Development').first().waitFor({ timeout: 60_000 });
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
        await page.getByText(c.explain.slice(0, 40), { exact: false }).first().waitFor({ timeout: 10_000 });
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
    check('final task shows its title and the renewable-electricity chart', /Write One Well-Developed Body Paragraph/.test(writeText) && /Electricity generated from renewable sources in three countries, 2000–2020/.test(writeText));
    check('final task asks for one body paragraph, not a full response', /Write ONE body paragraph/.test(writeText) && !/complete Task 1 response/i.test(writeText));
    check('word count is a suggestion (around 70) with no 150-word wording', /Suggested length: around 70 words/.test(writeText) && !/Minimum 70 words/.test(writeText) && !/\b150\b/.test(writeText));

    await editor.fill("Denmark consistently recorded the highest proportion of renewable electricity, with its share rising from 14% in 2000 to 62% in 2020. This 48-percentage-point increase was substantially greater than the rises recorded by Country B and Country C. Country B's figure climbed from 6% to 27%, whereas Country C experienced more gradual growth, reaching 16% from an initial 9%. Consequently, Country B had moved ahead of Country C by 2010 and widened the gap to 11 percentage points by the end of the period.");
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();
    await page.getByText(/Skill check/).first().waitFor({ timeout: 60_000 });
    const fb = await page.locator('main').innerText();
    check('feedback names the targeted skill', /Skill check: Task 1 body paragraph development/.test(fb));
    check('feedback says it is not a complete Task 1/2 response and shows no IELTS band', /not a complete Task 1 or Task 2 response/.test(fb) && !/\b[4-8]\.[05]\b/.test(fb));
    check('feedback does not demand an introduction, an overview, 150 words or linking words', !/150 words|add an introduction|dedicated overview|no overview|linking words/i.test(fb));
    await shot(page, 'ws-lesson5-skill-check-feedback');

    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByText('Lesson complete').waitFor({ timeout: 15_000 });
    check('lesson reaches "Lesson complete"', true);
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
