// E2E: Mino Writing Studio — Lesson 06 ("Vocabulary and Grammar Mastery", task1-vocab-grammar).
// Walks every runner step (answering each check with the key from the lesson data, completing
// both chart-boards), opens the overview-only final task (commute chart + editor, no 150-word
// wording), and confirms the feedback is an honest skill check with no IELTS band. The unit test
// scripts/test-task1-vocab-grammar.ts independently verifies the answer keys themselves.
//   bash scripts/e2e/run.sh writing-studio-lesson6
import { task1VocabGrammarLesson as lesson } from '../../lib/writing-studio/lessons/task1-vocab-grammar';
import { localize } from '../../lib/writing-studio/types';
import { BASE, check, launch, report, shot, signUp, watchErrors } from './helpers';

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  try {
    watchErrors(page, 'ws-lesson6', errors);
    await signUp(page, 'Nadia', `ws-lesson6-${Date.now()}@test.dev`, 'en');

    await page.goto(BASE + '/ielts/writing-studio/task1/lesson/task1-vocab-grammar', { waitUntil: 'load' });
    await page.getByText('Vocabulary and Grammar Mastery').first().waitFor({ timeout: 60_000 });
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
    check('the chart-board (guided practice) was completed: 6 tasks', boardTasks === 6);

    const editor = page.locator('#ws-editor');
    await editor.waitFor({ timeout: 15_000 });
    const writeText = await page.locator('main').innerText();
    check('final task shows its title and the commute-methods chart', /Write with Precise Vocabulary and Grammar/.test(writeText) && /Main method of travelling to work in a city, 2010 and 2023/.test(writeText));
    check('final task is a targeted exercise, not a complete Task 1 response', /Do not write a complete Task 1 response/.test(writeText) && /targeted vocabulary and grammar exercise/.test(writeText));
    check('word count is a suggestion (around 80) with no 150-word wording', /Suggested length: around 80 words/.test(writeText) && !/Minimum 80 words/.test(writeText) && !/\b150\b/.test(writeText));

    await editor.fill('Car use declined from 52% in 2010 to 38% in 2023, a decrease of 14 percentage points. By contrast, bicycle use increased substantially from 6% to 19%, representing a rise of 13 percentage points. Bus use fell slightly from 24% to 21%, whereas walking remained unchanged at 7%. Despite its decline, car use continued to be the most common transport method in 2023.');
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();
    await page.getByText(/Skill check/).first().waitFor({ timeout: 60_000 });
    const fb = await page.locator('main').innerText();
    check('feedback names the targeted skill (skill-specific verdict)', /Skill check: Task 1 vocabulary precision and grammatical accuracy/.test(fb));
    check('feedback says it is not a complete Task 1/2 response and shows no IELTS band', /not a complete Task 1 or Task 2 response/.test(fb) && !/\b[4-8]\.[05]\b/.test(fb));
    check('feedback does not demand an introduction, an overview, 150 words or linking words', !/150 words|add an introduction|dedicated overview|no overview|linking words/i.test(fb));
    await shot(page, 'ws-lesson6-skill-check-feedback');

    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByText('Lesson complete').waitFor({ timeout: 15_000 });
    check('lesson reaches "Lesson complete"', true);

    // the drill must not be recorded as a full Task 1 exam: no band appears on the Progress page
    await page.goto(BASE + '/ielts/writing-studio/progress', { waitUntil: 'load' });
    await page.locator('main').waitFor({ timeout: 30_000 });
    const progress = (await page.locator('main').innerText()).replace(/Step \d+ of \d+/g, '');
    check('progress page shows no IELTS band from the skill drill', !/\b[4-8]\.[05]\b/.test(progress));
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
