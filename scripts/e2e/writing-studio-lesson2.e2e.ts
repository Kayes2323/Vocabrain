// E2E: Mino Writing Studio — Lesson 02 ("Understanding Visual Information").
// Walks every teaching step, completes the six-task chart-board (checking the
// model answers are revealed), answers the four "misreading clinic" checks,
// opens the targeted final task (chart + editor, no 150-word wording), and
// confirms the feedback is an honest skill check with no IELTS band.
//   bash scripts/e2e/run.sh writing-studio-lesson2
import { BASE, check, launch, report, shot, signUp, watchErrors } from './helpers';

const CLINIC: { prompt: string; correct: string; explain: RegExp }[] = [
  { prompt: "A student writes: 'There were 52 car users in 2010.'", correct: 'The student changed a percentage into an absolute number.', explain: /not 52 individual people/ },
  { prompt: 'Car use fell from 52% in 2010 to 38% in 2023. Which statement is accurate?', correct: 'Car use decreased by 14 percentage points.', explain: /52 − 38 = 14 percentage points/ },
  { prompt: 'Walking accounted for 7% in both 2010 and 2023.', correct: 'Walking use remained unchanged.', explain: /exactly 7% in both years/ },
  { prompt: 'Which is the strongest overall interpretation of the commuting chart?', correct: 'Car use remained the largest category, while bicycle use rose substantially.', explain: /invents a cause/ },
];

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  try {
    watchErrors(page, 'ws-lesson2', errors);
    await signUp(page, 'Nadia', `ws-lesson2-${stamp}@test.dev`, 'en');

    await page.goto(BASE + '/ielts/writing-studio/task1/lesson/visual-information', { waitUntil: 'load' });
    await page.getByText('Understanding Visual Information — Read Before You Write').first().waitFor({ timeout: 60_000 });
    check('lesson opens from the existing lesson id with the new title', true);
    check('progress shows 15 steps (12 teaching steps; the clinic is four check steps)', (await page.getByRole('progressbar', { name: 'Step 1 of 15' }).count()) === 1);

    const next = () => page.getByRole('button', { name: /^(Continue|Start writing)$/ });
    const clinicSeen = new Set<number>();
    let boardTasksChecked = 0;
    let sawModelCar = false;

    for (let i = 0; i < 30; i++) {
      if (!(await next().count())) break;
      const text = await page.locator('main').innerText();

      // ---- misreading clinic: answer correctly, expect the explanation
      const idx = CLINIC.findIndex((c) => text.includes(c.prompt));
      if (idx >= 0) {
        await page.getByRole('button', { name: CLINIC[idx].correct, exact: true }).click();
        await page.getByText(CLINIC[idx].explain).waitFor({ timeout: 10_000 });
        clinicSeen.add(idx);
        await next().click();
        await page.waitForTimeout(200);
        continue;
      }

      // ---- chart board: six sequential tasks
      if (/Visual Analysis Board/i.test(text)) {
        for (let t = 0; t < 6; t++) {
          const box = page.locator('textarea:not([disabled])').first();
          await box.fill('My answer based on the chart.');
          await page.getByRole('button', { name: /Check my answer/ }).first().click();
          boardTasksChecked++;
          await page.waitForTimeout(150);
        }
        sawModelCar = /a decrease of 14 percentage points/.test(await page.locator('main').innerText());
        check('chart-board: the car model answer (14 percentage points) is revealed after checking', sawModelCar);
        check('chart-board: all six tasks show "6/6 checked"', /6\/6 checked/.test(await page.locator('main').innerText()));
        await shot(page, 'ws-lesson2-chart-board');
      }

      await next().click();
      await page.waitForTimeout(200);
    }
    check('chart-board: six tasks were completed', boardTasksChecked === 6);
    check('misreading clinic: all four questions answered with explanations shown', clinicSeen.size === 4);

    // ---- final task
    const editor = page.locator('#ws-editor');
    await editor.waitFor({ timeout: 15_000 });
    const writeText = await page.locator('main').innerText();
    check('final task opens with its title and the commuting chart', /Write the Main Message of the Chart/.test(writeText) && /Main method of travelling to work in a city, 2010 and 2023/.test(writeText));
    check('final task asks for an overview only (no introduction/body requested)', /Do not write an introduction or body paragraph/.test(writeText));
    check('word count is a suggestion, not a hard minimum, and no 150-word wording appears', /Suggested length: around 20 words/.test(writeText) && !/Minimum 20 words/.test(writeText) && !/150/.test(writeText));

    await editor.fill('Car use remained the most common way to travel to work despite falling noticeably, while cycling rose sharply and narrowed the gap.');
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();
    await page.getByText(/Skill check/).first().waitFor({ timeout: 60_000 });
    const fb = await page.locator('main').innerText();
    check('feedback names the targeted skill', /Skill check: Chart interpretation and key-feature selection/.test(fb));
    check('feedback says it is not a complete Task 1/2 response', /not a complete Task 1 or Task 2 response/.test(fb));
    check('feedback shows no IELTS band number', !/\b[4-8]\.[05]\b/.test(fb));
    check('feedback does not demand an introduction, body paragraphs or 150 words', !/150 words|add an introduction|body paragraph/i.test(fb));
    await shot(page, 'ws-lesson2-skill-check-feedback');

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
