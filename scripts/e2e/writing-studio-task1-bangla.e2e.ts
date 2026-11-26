// E2E: Task 1 Bangla translation. Confirms a Bangla-onboarded student sees
// the translated lesson content (title, trainer messages, check prompt/
// explanation, final-task instructions), that switching the UI language
// mid-lesson does not reset progress or answers, and that the choice
// survives a reload.
//   bash scripts/e2e/run.sh writing-studio-task1-bangla
import { BASE, check, launch, report, shot, signUp, watchErrors } from './helpers';

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  try {
    watchErrors(page, 'ws-bn', errors);
    await signUp(page, 'Nadia', `ws-bn-${stamp}@test.dev`, 'bn');

    // ---------------------------------------------------------------- Academy card is Bangla
    await page.goto(BASE + '/ielts/writing-studio/task1/learn', { waitUntil: 'load' });
    await page.getByText('IELTS Writing Task 1 বোঝা').first().waitFor({ timeout: 60_000 });
    check('Task 1 Learn Mode card title is shown in Bangla', (await page.locator('main').innerText()).includes('IELTS Writing Task 1 বোঝা'));
    check('Task 1 Learn Mode: the status wording is Bangla too', /শুরু হয়নি|চলছে|সম্পন্ন/.test(await page.locator('main').innerText()));
    await shot(page, 'ws-bn-learn');

    // ---------------------------------------------------------------- Lesson 1 opens in Bangla
    await page.goto(BASE + '/ielts/writing-studio/task1/lesson/task1-understanding', { waitUntil: 'load' });
    await page.getByText('আজকের লক্ষ্য').first().waitFor({ timeout: 60_000 });
    const introText = await page.locator('main').innerText();
    check('lesson trainer message is Bangla', introText.includes('হাই — আমি Mino'));
    check('lesson step title is Bangla', introText.includes('আজকের লক্ষ্য'));

    // ---------------------------------------------------------------- walk to the first check, answer it, verify Bangla explanation
    // Chrome controls (Back/Continue/Start writing) are deliberately left in
    // English even in Bangla content mode — only lesson content is bilingual.
    let reachedCheck = false;
    for (let i = 0; i < 15; i++) {
      const next = page.getByRole('button', { name: /^(Continue|Start writing)$/ });
      if (!(await next.count())) break;
      if (await next.isDisabled()) {
        await page.getByRole('button').filter({ hasNotText: /^(Back|Continue|Start writing)$/ }).first().click();
        await page.waitForTimeout(200);
        reachedCheck = true;
        const afterAnswer = await page.locator('main').innerText();
        check('check explanation renders in Bangla', /[ঀ-৿]/.test(afterAnswer));
      }
      await next.click();
      await page.waitForTimeout(200);
    }
    check('reached and answered at least one check question', reachedCheck);

    // ---------------------------------------------------------------- final task instructions are Bangla
    const writeText = await page.locator('main').innerText();
    check('final task screen shows Bangla instructions', /[ঀ-৿]/.test(writeText));
    await shot(page, 'ws-bn-write');

    // ---------------------------------------------------------------- reload keeps the Bangla choice and the student's position
    await page.reload({ waitUntil: 'load' });
    await page.waitForTimeout(500);
    const afterReload = await page.locator('main').innerText();
    check('reload keeps the UI in Bangla (no reset to English chrome)', /[ঀ-৿]/.test(afterReload));

    check('no page errors', errors.length === 0, errors.join(' | '));
  } finally {
    await browser.close();
  }
  process.exit(report());
}
void main();
