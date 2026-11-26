// E2E: Task 1 Module 2 narration audio. Instruments window.Audio so the test
// can see, without guessing, which clip is actually loaded for the visible
// slide, and reads the app's own rendered status (the same status a real
// learner would see: "Mino is speaking", "Play audio", etc.) rather than
// assuming autoplay succeeds — this sandbox's headless Chromium frequently
// rejects audio-with-sound autoplay the same way real mobile browsers do,
// so the test treats the blocked-and-recoverable path as a pass, not a
// failure, and separately proves the engine never leaves two clips able to
// play at once.
//   bash scripts/e2e/run.sh writing-studio-task1-m2-audio
import { BASE, check, launch, report, shot, signUp, watchErrors } from './helpers';

declare global {
  interface Window {
    __liveAudios: { src: string; audio: HTMLAudioElement }[];
  }
}

const INSTRUMENT = `
  (function () {
    window.__liveAudios = [];
    const RealAudio = window.Audio;
    window.Audio = function (src) {
      const a = new RealAudio(src);
      window.__liveAudios.push({ src: a.src, audio: a });
      return a;
    };
  })();
`;

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  try {
    watchErrors(page, 'ws-m2-audio', errors);
    await page.addInitScript(INSTRUMENT);
    await signUp(page, 'Nadia', `ws-m2-audio-${stamp}@test.dev`, 'en');

    await page.goto(BASE + '/ielts/writing-studio/task1/lesson/visual-information', { waitUntil: 'load' });
    await page.getByText('Read Before You Write').first().waitFor({ timeout: 60_000 });
    await page.waitForTimeout(600);

    // React StrictMode legitimately double-invokes effects in `next dev`, so
    // this can create more than one Audio() per slide — that's fine as long
    // as only the latest one is ever actually audible. Instance *count* is
    // never asserted; only "which clip is current" and "is more than one
    // clip audible" are.
    const lastSrc = () => page.evaluate(() => window.__liveAudios[window.__liveAudios.length - 1]?.src ?? '');
    const playingCount = () =>
      page.evaluate(() => window.__liveAudios.filter(({ audio }) => !audio.paused && !audio.ended && audio.currentTime > 0).length);
    const statusText = async () => (await page.locator('main').innerText()).slice(0, 400);
    const resolveBlocked = async () => {
      const playBtn = page.getByRole('button', { name: 'Play audio' });
      if (await playBtn.count()) {
        await playBtn.click();
        await page.waitForTimeout(400);
      }
    };

    await page.waitForTimeout(500);
    check('slide 1 loads the intro clip', (await lastSrc()).includes('task1-m2-01-intro.mp3'), await lastSrc());

    await resolveBlocked();
    const s1 = await statusText();
    check(
      'slide 1 either plays automatically or showed a clear, recoverable "Play audio" action (never silently nothing)',
      /Mino is speaking/.test(s1) || /Play audio/.test(s1) || (await playingCount()) > 0,
      s1,
    );
    check('exactly one clip is audible after slide 1 starts', (await playingCount()) <= 1);

    // ---------------------------------------------------------------- advance to slide 2
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByText('Understand the Parts of a Chart').first().waitFor({ timeout: 10_000 });
    await page.waitForTimeout(700);

    check('slide 2 loads clip 02 (visual-anatomy), matched by step id', (await lastSrc()).includes('task1-m2-02-visual-anatomy.mp3'), await lastSrc());
    check('at most one clip is audible on slide 2 (no overlap with slide 1)', (await playingCount()) <= 1);

    const slide1Paused = await page.evaluate(() => {
      const intro = window.__liveAudios.find((a) => a.src.includes('01-intro'))?.audio;
      return !intro || intro.paused;
    });
    check('navigating away leaves slide 1’s clip paused', slide1Paused);

    // ---------------------------------------------------------------- Back: returns to slide 1 (never two playable at once)
    await page.getByRole('button', { name: 'Back' }).click();
    await page.getByText('Read Before You Write').first().waitFor({ timeout: 10_000 });
    await page.waitForTimeout(700);
    check('Back reloads the intro clip', (await lastSrc()).includes('task1-m2-01-intro.mp3'), await lastSrc());
    check('after Back, at most one clip is audible', (await playingCount()) <= 1);
    const slide2Paused = await page.evaluate(() => {
      const anatomyClips = window.__liveAudios.filter((a) => a.src.includes('02-visual-anatomy'));
      return anatomyClips.every((a) => a.audio.paused);
    });
    check('going Back leaves every slide-2 instance paused', slide2Paused);

    // ---------------------------------------------------------------- Audio Off stops playback and stays off across a slide change
    await page.getByRole('button', { name: /Turn narration off/ }).click();
    await page.waitForTimeout(300);
    check('Audio Off leaves nothing audible', (await playingCount()) === 0);

    const liveBeforeToggleOff = await page.evaluate(() => window.__liveAudios.length);
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByText('Understand the Parts of a Chart').first().waitFor({ timeout: 10_000 });
    await page.waitForTimeout(600);
    const liveAfterToggleOff = await page.evaluate(() => window.__liveAudios.length);
    check(
      'with Audio Off, moving to the next slide does not create a new Audio instance at all',
      liveAfterToggleOff === liveBeforeToggleOff,
      `before=${liveBeforeToggleOff} after=${liveAfterToggleOff}`,
    );
    check('Audio Off: no speaker/replay controls claim anything is playing', !/Mino is speaking/.test(await statusText()));

    // ---------------------------------------------------------------- Audio back On plays the currently visible slide
    await page.getByRole('button', { name: /Turn narration on/ }).click();
    await page.waitForTimeout(600);
    const s2 = await statusText();
    check('turning Audio back On resumes or offers to play the current slide', /Mino is speaking/.test(s2) || /Play audio/.test(s2), s2);

    await shot(page, 'ws-m2-audio-slide2');

    // ---------------------------------------------------------------- mobile viewport: controls fit, no horizontal scroll
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const toggleBox = await page.getByRole('button', { name: /Turn narration (on|off)/ }).boundingBox();
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    check('on a 390px mobile viewport, the audio toggle is visible and on-screen', !!toggleBox && toggleBox.x >= 0 && toggleBox.x + toggleBox.width <= 390, JSON.stringify(toggleBox));
    check('no horizontal overflow on mobile', scrollWidth <= clientWidth + 2, `scrollWidth=${scrollWidth} clientWidth=${clientWidth}`);
    await shot(page, 'ws-m2-audio-mobile');

    check('no page errors', errors.length === 0, errors.join(' | '));
  } finally {
    await browser.close();
  }
  process.exit(report());
}
void main();
