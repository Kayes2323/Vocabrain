// Universal Mino Coach: the shared full-body mascot and its first-entry
// welcome in Task 1, Task 2 and My Brain. Checks: the mascot renders, each
// area gets its own (not reused) welcome script, Task 1's Bangla script is
// the exact approved one, the welcome is remembered per device and per area
// (never repeats, never leaks across areas), and nothing regresses layout.
import { BASE, check, launch, noHorizontalScroll, report, shot, signUp, watchErrors } from './helpers';

const APPROVED_TASK1_BN =
  'হ্যালো! আমি Mino—আপনার Writing Task 1 শেখার সঙ্গী। চার্ট, Overview কিংবা Body Paragraph কঠিন লাগছে? চিন্তা করবেন না। আপনি নিশ্চিন্তে শুরু করুন। আমি ধাপে ধাপে বুঝিয়ে দেব কীভাবে তথ্য বিশ্লেষণ করবেন, গুরুত্বপূর্ণ তুলনা বেছে নেবেন, আর পরিষ্কারভাবে লিখবেন। আপনার লেখা দেখে ভুলগুলো চিহ্নিত করে সহজভাবে বুঝিয়ে দেব, এবং কীভাবে উন্নতি করবেন সেটাও দেখাব। আপনি শুধু নিয়মিত অনুশীলন করুন—Writing Task 1 শেখার প্রতিটি ধাপে আপনাকে গাইড করার দায়িত্ব আমার। চলুন, শুরু করি!';

async function main() {
  const errors: string[] = [];
  const browser = await launch();
  try {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    watchErrors(p, 'EN', errors);
    await signUp(p, 'Rafi', `mino-coach-${Date.now()}@test.dev`, 'en');

    console.log('\n[1] Task 1 Academy: first-entry welcome');
    await p.goto(`${BASE}/ielts/writing-studio/task1`, { waitUntil: 'load' });
    const mascot1 = p.locator('main [data-mino-coach="rig"]').first();
    await mascot1.waitFor({ timeout: 30_000 });
    check('the full-body mascot renders on Task 1 Academy', await mascot1.isVisible());
    // The rig must actually be on screen (not just its wrapper): ready, fully opaque, character inside its box after the entrance.
    await p.waitForSelector('main [data-mino-coach="rig"] .mino-rig[data-ready="true"]', { timeout: 30_000 });
    await p.waitForTimeout(2600);
    const geo = await p.evaluate(() => {
      const root = document.querySelector('main [data-mino-coach="rig"] .mino-rig') as HTMLElement;
      const body = root.querySelector('[data-layer="body"]') as HTMLElement;
      const rr = root.getBoundingClientRect();
      const br = body.getBoundingClientRect();
      return { ready: root.dataset.ready, state: root.dataset.state, stage: getComputedStyle(root.querySelector('.mino-rig__stage') as HTMLElement).opacity, rootH: rr.height, inside: br.left >= rr.left - 2 && br.right <= rr.right + 2 && br.top >= rr.top - 2 && br.bottom <= rr.bottom + 2, bodyW: br.width, loaded: (body as HTMLImageElement).naturalWidth > 0 };
    });
    check('welcome rig: artwork decoded and visible (ready, opaque, character inside its box)', geo.ready === 'true' && geo.stage === '1' && geo.rootH > 100 && geo.inside && geo.loaded && geo.bodyW > 80, JSON.stringify(geo));
    check('Task 1 shows its role label', await p.getByText('Writing Task 1 Coach', { exact: true }).isVisible());
    check('welcome offers Start, Replay and Skip', (await p.getByRole('button', { name: 'Start learning' }).isVisible()) && (await p.getByRole('button', { name: 'Replay welcome' }).isVisible()) && (await p.getByText('Skip').isVisible()));
    await shot(p, 'mino-coach-en-01-task1-welcome');

    await shot(p, 'mino-coach-en-01b-task1-welcome-settled');
    console.log('\n[1b] Lesson trainer panel shows the rig');
    await p.goto(`${BASE}/ielts/writing-studio/task1/lesson/task1-understanding`, { waitUntil: 'load' });
    await p.waitForSelector('main [data-mino-coach="rig"] .mino-rig[data-ready="true"]', { timeout: 30_000 });
    await p.waitForTimeout(1500);
    const lesson = await p.evaluate(() => {
      const root = document.querySelector('main [data-mino-coach="rig"] .mino-rig') as HTMLElement;
      const r = root.getBoundingClientRect();
      return { w: r.width, h: r.height, state: root.dataset.state, op: getComputedStyle(root.querySelector('.mino-rig__stage') as HTMLElement).opacity };
    });
    check('lesson trainer panel: rig visible at a usable size, speaking', lesson.w >= 80 && lesson.h >= 70 && lesson.op === '1' && lesson.state === 'speaking', JSON.stringify(lesson));
    await shot(p, 'mino-coach-en-01c-lesson-panel', false);
    await p.goto(`${BASE}/ielts/writing-studio/task1`, { waitUntil: 'load' });
    await p.getByRole('button', { name: 'Replay welcome' }).waitFor({ timeout: 30_000 });

    console.log('\n[2] Replay restarts the mascot without dismissing the welcome');
    await p.getByRole('button', { name: 'Replay welcome' }).click();
    check('the welcome is still open after Replay', await p.getByRole('button', { name: 'Start learning' }).isVisible());

    console.log('\n[3] Dismissing the welcome is remembered on reload');
    await p.getByRole('button', { name: 'Start learning' }).click();
    check('the welcome closes', (await p.getByRole('button', { name: 'Start learning' }).count()) === 0);
    await p.reload({ waitUntil: 'load' });
    await p.getByTestId('ws-progress-summary').waitFor({ timeout: 30_000 });
    check('a returning learner is not interrupted by the welcome again', (await p.getByRole('button', { name: 'Start learning' }).count()) === 0);

    console.log('\n[4] Task 2 Academy gets its own welcome, not Task 1\'s script');
    await p.goto(`${BASE}/ielts/writing-studio/task2`, { waitUntil: 'load' });
    await p.getByText('Essay Writing Coach', { exact: true }).waitFor({ timeout: 30_000 });
    const task2Text = await p.locator('main').innerText();
    check('Task 2 does not reuse the Task 1 script', !task2Text.includes(APPROVED_TASK1_BN));
    check('Task 2 welcome mentions Task 2, not Writing Task 1', task2Text.includes('Task 2') || task2Text.includes('Essay'));
    await shot(p, 'mino-coach-en-02-task2-welcome');
    await p.getByRole('button', { name: 'Start learning' }).click();

    console.log('\n[5] My Brain gets its own vocabulary/revision welcome');
    await p.goto(`${BASE}/ielts/vocabulary`, { waitUntil: 'load' });
    await p.getByText('Vocabulary & Revision Coach', { exact: true }).waitFor({ timeout: 30_000 });
    const myBrainText = await p.locator('main').innerText();
    check('My Brain does not reuse the Task 1 script', !myBrainText.includes(APPROVED_TASK1_BN));
    check('no page overlaps: BrainSummaryPanel still renders alongside the welcome', await p.getByText(/My Brain|due|mastered/i).first().isVisible());
    await shot(p, 'mino-coach-en-03-my-brain-welcome');
    await p.getByRole('button', { name: 'Start learning' }).click();

    console.log('\n[6] Mobile, Bangla: respectful address, no sideways scroll');
    await ctx.close();
    const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const q = await mctx.newPage();
    watchErrors(q, 'BN', errors);
    await signUp(q, 'Nusrat', `mino-coach-bn-${Date.now()}@test.dev`, 'bn');
    await q.goto(`${BASE}/ielts/writing-studio/task1`, { waitUntil: 'load' });
    const mascotBn = q.locator('main [data-mino-coach="rig"]').first();
    await mascotBn.waitFor({ timeout: 30_000 });
    const bnText = await q.locator('main').innerText();
    check('bn Task 1 welcome shows Bangla text', /[ঀ-৿]/.test(bnText));
    check("Task 1's Bangla welcome is the exact approved script (a Bangla-choosing learner sees it)", bnText.includes(APPROVED_TASK1_BN));
    check('bn: respectful address (no তুমি / তোমার / তুই)', !/তুমি|তোমার|তুই/.test(bnText));
    check('bn Task 1 welcome: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'mino-coach-bn-01-task1-welcome');
    await mctx.close();
  } catch (e) {
    check('EXCEPTION', false, (e as Error).stack ?? e);
  }
  await browser.close();
  check('no page errors', errors.length === 0, errors.slice(0, 5).join(' | '));
  process.exit(report());
}

main();
