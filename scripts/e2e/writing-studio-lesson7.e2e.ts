// E2E: Mino Writing Studio — Lesson 07 ("Complete Task 1 Writing", task1-complete-writing).
// Walks every runner step (answering each check with the key from the lesson data, completing the
// four-task guided chart-board), opens the FULL Task 1 final task (commute chart + editor, 150-word
// minimum), submits a complete response, and confirms the normal full-task feedback renders with an
// indicative band (NOT a skill check), that the lesson completes, and that the band was stored on the
// learner's profile. The unit test scripts/test-task1-complete-writing.ts independently verifies the
// answer keys. Uses the mock Gemini server, which does not prove live-model assessment quality.
//   bash scripts/e2e/run.sh writing-studio-lesson7
import { task1CompleteWritingLesson as lesson } from '../../lib/writing-studio/lessons/task1-complete-writing';
import { localize } from '../../lib/writing-studio/types';
import { BASE, check, getDoc, launch, report, shot, signUp, uidOf, watchErrors } from './helpers';

const RESPONSE = [
  'The bar chart illustrates the proportions of commuters using five different forms of transport in a city in 2010 and 2023.',
  'Overall, car use remained the most common form of transport despite a decline, while bicycle use recorded the most notable increase. Walking was the only category that remained unchanged.',
  'Car use fell from 52% in 2010 to 38% in 2023, a decrease of 14 percentage points. Despite this decline, it remained considerably more popular than the other methods in 2023. Bus use also decreased, although the change was smaller, falling from 24% to 21%.',
  'In contrast, bicycle use rose markedly from 6% to 19%, an increase of 13 percentage points, and it overtook train use, which had been higher in 2010. Train use also grew, moving from 11% to 15%. Meanwhile, the proportion of commuters who walked remained unchanged at 7% in both years.',
].join('\n\n');

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  try {
    watchErrors(page, 'ws-lesson7', errors);
    await signUp(page, 'Nadia', `ws-lesson7-${Date.now()}@test.dev`, 'en');
    const uid = (await uidOf(page))!;

    // ---------------------------------------------------------------- Learn Mode: seven cards, Lesson 07 is the seventh
    await page.goto(BASE + '/ielts/writing-studio/task1/learn', { waitUntil: 'load' });
    await page.getByTestId('ws-module-card').first().waitFor({ timeout: 60_000 });
    const lessonBase = '/ielts/writing-studio/task1/lesson/';
    const cards = await page.getByTestId('ws-module-card').evaluateAll((els) =>
      els.map((e) => ({ id: e.getAttribute('data-module-id'), href: e.getAttribute('href'), n: e.querySelector('span.rounded-full')?.textContent?.trim(), title: e.querySelector('[data-testid="ws-card-title"]')?.textContent?.trim() })),
    );
    const expectedIds = ['task1-m1', 'task1-m2', 'task1-m3', 'task1-m4', 'task1-m5', 'task1-m6', 'task1-m7'];
    check('Learn Mode: exactly seven module cards, in order', JSON.stringify(cards.map((c) => c.id)) === JSON.stringify(expectedIds), JSON.stringify(cards));
    check('Learn Mode: the cards are numbered 1 to 7 and the seventh is "Complete Task 1 Writing" (no card 8)', cards.length === 7 && cards.every((c, i) => c.n === String(i + 1) || c.n === '') && cards[6].title === 'Complete Task 1 Writing', JSON.stringify(cards));
    const lessonHrefs = cards.filter((c) => c.id !== 'task1-m2').map((c) => c.href);
    check('Learn Mode: every module but Visual Information opens its existing lesson route', lessonHrefs.every((h) => h!.startsWith(lessonBase)) && cards[6].href === `${lessonBase}task1-complete-writing?from=learn`, JSON.stringify(cards));
    const academyText = await page.locator('main').innerText();
    check('Learn Mode: exactly one "Complete Task 1 Writing" card and no card for the old capstone', (academyText.match(/Complete Task 1 Writing/g) ?? []).length === 1 && (await page.locator('a[href*="task1-full-practice"]').count()) === 0 && !/Guided, independent and timed practice/.test(academyText));
    check('Learn Mode: the subtitle says seven modules (no eighth card)', /7 modules/.test(academyText));
    await shot(page, 'ws-lesson7-learn');

    // open Lesson 07 THROUGH its Learn Mode card, not by typing the lesson URL
    await page.locator('[data-module-id="task1-m7"]').click();
    await page.waitForURL(`**${lessonBase}task1-complete-writing*`, { timeout: 30_000 });
    await page.getByText('Complete Task 1 Writing').first().waitFor({ timeout: 60_000 });
    const total = lesson.steps.length;
    check('Lesson 07 opens through its Learn Mode card with the right title', true);
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
        const text = await page.locator('main').innerText();
        check('guided practice: all four tasks revealed', /4\/4 checked/.test(text));
        check('guided practice: the introduction task is tagged "introduction", not "overview"', /belongs in the\s+introduction/i.test(text));
        check('guided practice: model answers (introduction and body) are shown', /illustrates the proportions of commuters/.test(text) && /decrease of 14 percentage points/.test(text));
        await shot(page, 'ws-lesson7-guided-practice');
      }
      await next().click();
      await page.waitForTimeout(150);
    }
    check(`all ${total} steps were walked`, walked === total);
    check('every check (9 teaching + 6 clinic) was answered and its explanation shown', answered === 15 && answered === lesson.steps.filter((s) => s.check).length);
    check('guided practice tasks A-D were completed', boardTasks === 4);

    const editor = page.locator('#ws-editor');
    await editor.waitFor({ timeout: 15_000 });
    const writeText = await page.locator('main').innerText();
    check('final task is the FULL Task 1 prompt with the commute chart', /Write a Complete Task 1 Response/.test(writeText) && /Main method of travelling to work in a city, 2010 and 2023/.test(writeText));
    check('final task asks for introduction, overview and supporting details, with a 150-word minimum (not a skill-drill suggestion)', /introduction, an overview, relevant supporting details/.test(writeText) && /Minimum 150 words/.test(writeText) && !/Suggested length: around/.test(writeText));

    await editor.fill(RESPONSE);
    await page.getByRole('button', { name: 'Get feedback from Mino' }).click();
    await page.getByText(/Mino's estimated band|Indicative band/).first().waitFor({ timeout: 60_000 });
    const fb = await page.locator('main').innerText();
    check('feedback is the normal full-task assessment, NOT a skill check', !/Skill check:/.test(fb));
    check('feedback shows an indicative band, labelled as an estimate (not official)', /\b[4-9]\.[05]\b/.test(fb) && /(not a real IELTS score|never an official|practice estimate|practice only)/i.test(fb));
    check('feedback shows the word count against the 150-word minimum', /\/150 words/.test(fb));
    await shot(page, 'ws-lesson7-full-feedback');

    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await page.getByText('Lesson complete').waitFor({ timeout: 15_000 });
    check('lesson reaches "Lesson complete"', true);

    // the full response stored a band on the profile (a skill drill would store null)
    let app: any = null;
    for (let i = 0; i < 20 && !app?.writingStudio?.lessons?.['task1-complete-writing']; i++) {
      await page.waitForTimeout(500);
      app = (await getDoc(`users/${uid}`)).app;
    }
    const record = app?.writingStudio?.lessons?.['task1-complete-writing'];
    check('profile: the lesson completion was saved', Boolean(record), JSON.stringify(record));
    check('profile: the full Task 1 response stored an indicative band', typeof record?.lastBand === 'number' && typeof record?.bestBand === 'number', JSON.stringify(record));
    check('profile: task is 1, one attempt, and no exam/practice records were created', record?.task === 1 && record?.attempts === 1 && !(app?.writingStudio?.exams?.length) , JSON.stringify(app?.writingStudio?.exams));
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
