// Home "today's learning" CTA: the text follows today's plan (the existing
// daily log + Brain), in Bangla on mobile and English on desktop.
//   bash scripts/e2e/run.sh home
import type { Page } from 'playwright-core';
import { createBrainWord } from '../../lib/engine/brain';
import { localDateKey } from '../../lib/engine/dates';
import { BASE, check, launch, noHorizontalScroll, patchField, putDoc, report, shot, signUp, uidOf, watchErrors } from './helpers';

const TEXT = {
  bn: { start: 'আজকের পড়া শুরু করুন', cont: 'আজকের পড়া চালিয়ে যান', finish: 'আজকের পড়া শেষ করুন', done: 'আজকের পড়া সম্পন্ন হয়েছে' },
  en: { start: 'Start today’s learning', cont: 'Continue today’s learning', finish: 'Finish today’s learning', done: 'Today’s learning completed' },
};

async function cta(p: Page) {
  await p.goto(BASE + '/', { waitUntil: 'load' });
  const el = p.getByTestId('today-cta');
  await el.waitFor({ timeout: 60_000 });
  return { text: (await el.innerText()).trim(), state: await el.getAttribute('data-state'), href: await el.getAttribute('href'), status: (await p.getByTestId('today-status').innerText()).trim() };
}

async function run(p: Page, lang: 'bn' | 'en', tag: string) {
  const T = TEXT[lang];
  const uid = (await uidOf(p))!;
  const today = localDateKey(new Date());
  const days = (done: string[]) => patchField(`users/${uid}`, 'app.study.days', { [today]: { mode: 'normal', done } });

  let c = await cta(p);
  check(`${tag}: new student → "${T.start}"`, c.text === T.start && c.state === 'not-started', JSON.stringify(c));
  check(`${tag}: no "Continue learning" on the home card`, !/continue learning|শেখা চালিয়ে যান/i.test(await p.locator('main').innerText()));

  // Reading done, Brain still empty → reading + vocabulary: only one task left.
  await days(['reading']);
  c = await cta(p);
  check(`${tag}: daily goal one step from done → "${T.finish}"`, c.text === T.finish && c.state === 'finishing', JSON.stringify(c));

  // A saved word makes the full plan (vocabulary, reading, writing, speaking): started, several open.
  const word = createBrainWord(
    { word: 'resilient', lemma: 'resilient', meaning: 'able to recover quickly', synonyms: [], antonyms: [], collocations: [], dictionarySource: 'none' },
    { type: 'manual', title: 'E2E' },
    undefined,
  );
  await putDoc(`users/${uid}/vocabulary/${word.id}`, word);
  c = await cta(p);
  check(`${tag}: started but not finished → "${T.cont}"`, c.text === T.cont && c.state === 'in-progress', JSON.stringify(c));
  check(`${tag}: the CTA still opens the next task of the existing flow`, c.href === '/review', c.href);

  await days(['reading', 'vocabulary', 'writing', 'speaking']);
  c = await cta(p);
  check(`${tag}: everything done → "${T.done}" + next learning action`, c.status === T.done && c.state === 'completed' && (c.href === '/review' || c.href === '/ielts'), JSON.stringify(c));
  check(`${tag}: no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `home-today-${tag}`, false);

  // Quick access: a small shortcut layer under today's learning, three IELTS items, no Study Abroad.
  const qa = p.getByTestId('quick-access');
  const ids = await qa.locator('[data-quick]').evaluateAll((els) => els.map((e) => e.getAttribute('data-quick')));
  check(`${tag}: Quick access has 3 IELTS shortcuts (Foundation, Practice Test, Speaking Test)`, ids.join(',') === 'foundation,tests,speaking', ids.join(','));
  check(`${tag}: Quick access has no Study Abroad and no main-menu copies`, (await qa.locator('a[href^="/abroad"], a[href="/ielts"], a[href="/mino"], a[href="/"]').count()) === 0);
  const y = async (id: string) => (await p.getByTestId(id).boundingBox())!.y;
  check(`${tag}: order — today's learning, then Quick access, then Study Abroad at the bottom`, (await y('today-cta')) < (await y('quick-access')) && (await y('quick-access')) < (await y('home-abroad')));
  check(`${tag}: Foundation offered once on Home`, (await p.locator('main a[href="/ielts/foundation"]').count()) === 1);
  const h = (await qa.boundingBox())!.height;
  check(`${tag}: Quick access stays compact (one row)`, h < 170, h);
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.locator('[data-quick="foundation"]').click();
  await p.waitForURL('**/ielts/foundation', { timeout: 30_000 });
  check(`${tag}: Foundation shortcut opens IELTS Foundation`, p.url().endsWith('/ielts/foundation'));
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.getByTestId('quick-access').waitFor();
  check(`${tag}: home still has no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, `home-quick-${tag}`, true);
}

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  try {
    const mob = await (await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage();
    watchErrors(mob, 'bn-mobile', errors);
    await signUp(mob, 'Rafi', `home-bn-${stamp}@test.dev`, 'bn');
    console.log('\n[HOME] Bangla · mobile');
    await run(mob, 'bn', 'bn mobile');

    const desk = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
    watchErrors(desk, 'en-desktop', errors);
    await signUp(desk, 'Nadia', `home-en-${stamp}@test.dev`, 'en');
    console.log('\n[HOME] English · desktop');
    await run(desk, 'en', 'en desktop');
  } catch (e) {
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, (e as Error).stack);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
main();
