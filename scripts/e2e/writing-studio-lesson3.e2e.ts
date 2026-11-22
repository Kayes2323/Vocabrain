// E2E: Mino Writing Studio — Lesson 03 ("Writing an Accurate Task 1 Introduction").
// Walks all 17 runner steps (answering the four clinic checks correctly), opens the
// introduction-only final task, and confirms the feedback is an honest skill check
// with no IELTS band and no demand for an overview, body paragraphs or 150 words.
//   bash scripts/e2e/run.sh writing-studio-lesson3
import { BASE, check, launch, report, shot, signUp, watchErrors } from './helpers';

const CLINIC: { prompt: string; correct: string; explain: RegExp }[] = [
  { prompt: 'Which paraphrase preserves the measurement correctly?', correct: 'The chart illustrates the proportion of households with internet access in three countries.', explain: /can express the same measurement/ },
  { prompt: 'Which information must be preserved?', correct: 'Five universities and the two years.', explain: /five universities and two years/ },
  { prompt: 'What is the main problem?', correct: 'The student has added an unsupported cause.', explain: /must not invent explanations/ },
  { prompt: 'Which introduction is best?', correct: 'The maps compare the layout of a town centre in 1990 and 2020.', explain: /without adding unsupported information/ },
];

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  try {
    watchErrors(page, 'ws-lesson3', errors);
    await signUp(page, 'Nadia', `ws-lesson3-${Date.now()}@test.dev`, 'en');

    await page.goto(BASE + '/ielts/writing-studio/task1/lesson/task1-introduction', { waitUntil: 'load' });
    await page.getByText('Writing an Accurate Task 1 Introduction').first().waitFor({ timeout: 60_000 });
    check('lesson opens from the existing lesson id with the new title', true);
    check('progress shows 17 steps (14 teaching steps; the clinic is four check steps)', (await page.getByRole('progressbar', { name: 'Step 1 of 17' }).count()) === 1);

    const next = () => page.getByRole('button', { name: /^(Continue|Start writing)$/ });
    const seen = new Set<number>();
    let steps = 0;
    for (let i = 0; i < 30; i++) {
      if (!(await next().count())) break;
      steps++;
      const text = await page.locator('main').innerText();
      const idx = CLINIC.findIndex((c) => text.includes(c.prompt));
      if (idx >= 0) {
        await page.getByRole('button', { name: CLINIC[idx].correct, exact: true }).click();
        await page.getByText(CLINIC[idx].explain).waitFor({ timeout: 10_000 });
        seen.add(idx);
      }
      await next().click();
      await page.waitForTimeout(200);
    }
    check('all 17 steps were walked', steps === 17);
    check('clinic: all four questions answered correctly with explanations shown', seen.size === 4);

    const editor = page.locator('#ws-editor');
    await editor.waitFor({ timeout: 15_000 });
    const writeText = await page.locator('main').innerText();
    check('final task shows its title, the commuting chart and an introduction-only instruction', /Write an Accurate Introduction/.test(writeText) && /Main method of travelling to work in a city, 2010 and 2023/.test(writeText) && /Write only the introduction/.test(writeText));
    check('word count is a suggestion (around 18), not a minimum, and no 150-word wording', /Suggested length: around 18 words/.test(writeText) && !/Minimum 18 words/.test(writeText) && !/150/.test(writeText));

    await editor.fill('The bar chart compares the proportions of commuters travelling by five different forms of transport in one city in 2010 and 2023.');
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();
    await page.getByText(/Skill check/).first().waitFor({ timeout: 60_000 });
    const fb = await page.locator('main').innerText();
    check('feedback names the targeted skill', /Skill check: Task 1 introduction paraphrasing accuracy/.test(fb));
    check('feedback says it is not a complete Task 1/2 response and shows no IELTS band', /not a complete Task 1 or Task 2 response/.test(fb) && !/\b[4-8]\.[05]\b/.test(fb));
    check('feedback does not demand an overview, body paragraphs, 150 words, linking words, or flag the years as figures', !/dedicated overview|body paragraph|150 words|linking words|specific figure/i.test(fb));
    await shot(page, 'ws-lesson3-skill-check-feedback');

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
