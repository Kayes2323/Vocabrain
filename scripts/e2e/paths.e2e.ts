// Learning paths: IELTS Academic and Academic in one app.
//   - New Academic student (Bangla, small Android): onboarding branch → /academic,
//     honest "being built" state, Academic tab, Home shows Academic, nothing IELTS asked.
//   - New IELTS student (English, desktop): same IELTS onboarding and Home as before.
//   - Switching paths on Home and from /academic; saved to Firestore, survives reload.
//   - Existing student saved before paths existed: lands on IELTS Academic.
//   - IELTS, Study Abroad and Mino pages still open for an Academic student.
//   bash scripts/e2e/run.sh paths
import type { Page } from 'playwright-core';
import { BASE, check, createAccount, deleteField, getDoc, launch, noHorizontalScroll, report, shot, signUp, uidOf, watchErrors } from './helpers';

const NAV = { mobile: '[data-testid="bottom-nav"]', desktop: 'aside nav' } as const;

async function navHrefs(p: Page, where: keyof typeof NAV) {
  return p.locator(`${NAV[where]} a`).evaluateAll((els) => els.map((e) => e.getAttribute('href')));
}

async function waitForPath(uid: string, path: string, timeoutMs = 15_000) {
  const end = Date.now() + timeoutMs;
  let doc = await getDoc(`users/${uid}`);
  while (doc?.app?.activePath !== path && Date.now() < end) {
    await new Promise((r) => setTimeout(r, 300));
    doc = await getDoc(`users/${uid}`);
  }
  return doc;
}

async function home(p: Page) {
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.getByTestId('path-switch').waitFor({ timeout: 60_000 });
}

const pressed = (p: Page, path: string) => p.locator(`[data-testid="path-switch"] [data-path="${path}"]`).getAttribute('aria-pressed');

async function academicStudent(p: Page, email: string) {
  const tag = 'academic bn mobile';
  await createAccount(p, 'Tanvir', email);
  // Language → path. The path step comes before any IELTS question.
  await p.getByRole('radio', { name: 'বাংলা' }).click();
  await p.getByRole('button', { name: 'এগিয়ে যান', exact: true }).click();
  const options = await p.getByRole('radio').allInnerTexts();
  check(`${tag}: path step offers exactly IELTS Academic and Academic`, options.length === 2 && /^IELTS Academic/.test(options[0]) && /^Academic/.test(options[1]), options);
  check(`${tag}: each path explains itself in one line`, /বিদেশে পড়ার প্রস্তুতি/.test(options[0]) && /concept আয়ত্ত/.test(options[1]), options);
  const next = p.getByRole('button', { name: 'এগিয়ে যান', exact: true });
  check(`${tag}: Continue waits for a choice`, await next.isDisabled());
  await shot(p, 'paths-onboarding-bn-mobile', false);
  await p.getByRole('radio', { name: /^Academic/ }).click();
  check(`${tag}: Mino says honestly that Academic is new`, await p.getByText(/Academic একেবারে নতুন/).isVisible());
  await next.click();
  await p.waitForURL('**/academic', { timeout: 30_000 });
  await p.getByTestId('academic-home').waitFor({ timeout: 30_000 });
  check(`${tag}: onboarding ends on /academic without IELTS questions`, new URL(p.url()).pathname === '/academic');

  const uid = (await uidOf(p))!;
  const doc = await waitForPath(uid, 'academic');
  check(`${tag}: Firestore — activePath academic, onboarded`, doc?.app?.activePath === 'academic' && Boolean(doc?.app?.onboardedAt) && doc?.onboardingCompleted === true, doc?.app);
  check(`${tag}: Firestore — no IELTS goal or target was invented`, doc?.app?.goal === undefined && doc?.app?.ielts?.targetBand === undefined && doc?.targetIELTSScore === null, doc?.app?.ielts);
  check(`${tag}: Firestore — no Academic progress stored in the profile`, doc?.app?.academic === undefined);

  // /academic: its own world, honest state.
  check(`${tag}: /academic heading is the page h1`, (await p.locator('h1').innerText()).includes('প্রতিটি concept'));
  check(`${tag}: first subject shown as being built`, /HSC/.test(await p.getByTestId('academic-first-subject-row').innerText()) && /তৈরি হচ্ছে/.test(await p.getByTestId('academic-first-subject-row').innerText()));
  check(`${tag}: no percentages or fake progress`, !/%|[0-9০-৯]+\s*\/\s*[0-9০-৯]+/.test(await p.getByTestId('academic-home').innerText()) && (await p.getByTestId('academic-no-progress').isVisible()));
  check(`${tag}: method shows four steps in Bangla digits`, (await p.locator('[data-testid="academic-method"] li').count()) === 4 && (await p.getByTestId('academic-method').innerText()).includes('১'));
  const hrefs = await navHrefs(p, 'mobile');
  check(`${tag}: learning tab is Academic (5 tabs, no IELTS tab)`, hrefs.join(',') === '/,/academic,/mino,/abroad,/profile', hrefs);
  check(`${tag}: Academic tab is active on /academic`, (await p.locator(`${NAV.mobile} a[aria-current="page"]`).getAttribute('href')) === '/academic');
  check(`${tag}: /academic has no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, 'paths-academic-bn-mobile');

  // Home shows the Academic world, not the IELTS dashboard.
  await home(p);
  check(`${tag}: Home — Academic pressed in the path switch`, (await pressed(p, 'academic')) === 'true' && (await pressed(p, 'ielts')) === 'false');
  check(`${tag}: Home — Academic content, no IELTS cards or IELTS Mino insight`, (await p.getByTestId('academic-home').count()) === 1 && (await p.getByTestId('quick-access').count()) === 0 && (await p.getByTestId('progress-card').count()) === 0 && (await p.getByTestId('mino-card').count()) === 0);
  const y = async (sel: string) => (await p.locator(sel).first().boundingBox())!.y;
  check(`${tag}: Home order — greeting, path switch, Academic`, (await y('h1')) < (await y('[data-testid="path-switch"]')) && (await y('[data-testid="path-switch"]')) < (await y('[data-testid="academic-home"]')));
  const small = await p.locator('[data-testid="path-switch"] [data-path]').evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().height < 44).length);
  check(`${tag}: path buttons are comfortably tappable`, small === 0);
  check(`${tag}: Home has no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, 'paths-home-academic-bn-mobile');

  // Reload: the choice is remembered.
  await p.reload({ waitUntil: 'load' });
  await p.getByTestId('academic-home').waitFor({ timeout: 60_000 });
  check(`${tag}: after reload Home is still Academic`, (await pressed(p, 'academic')) === 'true');

  // IELTS, Study Abroad and Mino still open for an Academic student (no redirect to onboarding).
  for (const [url, ready] of [['/ielts', 'h1'], ['/ielts/foundation', 'h1'], ['/abroad', 'h1'], ['/mino', 'main']] as const) {
    await p.goto(BASE + url, { waitUntil: 'load' });
    await p.locator(ready).first().waitFor({ timeout: 60_000 });
    check(`${tag}: ${url} still opens`, new URL(p.url()).pathname === url);
  }

  // Switch to IELTS Academic on Home → IELTS Home + IELTS tab, saved.
  await home(p);
  await p.locator('[data-testid="path-switch"] [data-path="ielts"]').click();
  await p.getByTestId('quick-access').waitFor({ timeout: 30_000 });
  check(`${tag}: switch → IELTS Home appears`, (await p.getByTestId('academic-home').count()) === 0 && (await pressed(p, 'ielts')) === 'true');
  check(`${tag}: switch → learning tab becomes IELTS`, (await navHrefs(p, 'mobile')).join(',') === '/,/ielts,/mino,/abroad,/profile');
  check(`${tag}: switch saved to Firestore`, (await waitForPath(uid, 'ielts'))?.app?.activePath === 'ielts');

  // And back, then the /academic link to IELTS Academic.
  await p.locator('[data-testid="path-switch"] [data-path="academic"]').click();
  await p.getByTestId('academic-home').waitFor({ timeout: 30_000 });
  await waitForPath(uid, 'academic');
  await p.goto(BASE + '/academic', { waitUntil: 'load' });
  await p.getByTestId('academic-switch-ielts').click();
  await p.waitForURL('**/ielts', { timeout: 30_000 });
  check(`${tag}: /academic link opens IELTS Academic and makes it active`, (await waitForPath(uid, 'ielts'))?.app?.activePath === 'ielts');
}

async function ieltsStudent(p: Page, email: string) {
  const tag = 'ielts en desktop';
  await signUp(p, 'Nadia', email, 'en');
  const uid = (await uidOf(p))!;
  await home(p);
  const doc = await waitForPath(uid, 'ielts');
  check(`${tag}: Firestore — activePath ielts with the IELTS answers`, doc?.app?.activePath === 'ielts' && doc?.app?.ielts?.targetBand === 7 && doc?.app?.goal === 'ielts', doc?.app);
  check(`${tag}: Home — IELTS Academic pressed`, (await pressed(p, 'ielts')) === 'true');
  check(`${tag}: Home — the IELTS dashboard is unchanged`, (await p.getByTestId('progress-card').count()) === 1 && (await p.getByTestId('quick-access').count()) === 1 && (await p.getByTestId('academic-home').count()) === 0);
  const ids = await p.locator('[data-quick]').evaluateAll((els) => els.map((e) => e.getAttribute('data-quick')));
  check(`${tag}: Quick access still has its 5 destinations`, ids.join(',') === 'today,foundation,brain,readingVocab,abroad', ids);
  check(`${tag}: side navigation has IELTS, not Academic`, (await navHrefs(p, 'desktop')).join(',') === '/,/ielts,/mino,/abroad,/profile');
  await shot(p, 'paths-home-ielts-en-desktop', false);

  // Desktop Academic view.
  await p.locator('[data-testid="path-switch"] [data-path="academic"]').click();
  await p.getByTestId('academic-home').waitFor({ timeout: 30_000 });
  check(`${tag}: switch → side navigation shows Academic`, (await navHrefs(p, 'desktop')).join(',') === '/,/academic,/mino,/abroad,/profile');
  check(`${tag}: switching never touches the IELTS answers`, (await waitForPath(uid, 'academic'))?.app?.ielts?.targetBand === 7);
  await shot(p, 'paths-home-academic-en-desktop', false);
  await p.goto(BASE + '/academic', { waitUntil: 'load' });
  await p.getByTestId('academic-home').waitFor({ timeout: 30_000 });
  check(`${tag}: /academic in English`, (await p.locator('h1').innerText()).includes('Build mastery'));
  check(`${tag}: /academic has no sideways scroll`, await noHorizontalScroll(p));
  await shot(p, 'paths-academic-en-desktop', false);
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.locator('[data-testid="path-switch"] [data-path="ielts"]').click();
  await p.getByTestId('quick-access').waitFor({ timeout: 30_000 });
  await waitForPath(uid, 'ielts');
}

async function existingStudent(p: Page, email: string) {
  const tag = 'existing en mobile';
  await signUp(p, 'Rumi', email, 'en');
  const uid = (await uidOf(p))!;
  await waitForPath(uid, 'ielts');
  // As saved before learning paths existed.
  await deleteField(`users/${uid}`, 'app.activePath');
  check(`${tag}: stored profile has no activePath`, (await getDoc(`users/${uid}`))?.app?.activePath === undefined);
  await p.reload({ waitUntil: 'load' });
  await home(p);
  check(`${tag}: lands on IELTS Academic, not onboarding`, new URL(p.url()).pathname === '/' && (await pressed(p, 'ielts')) === 'true');
  check(`${tag}: IELTS Home and IELTS tab as before`, (await p.getByTestId('quick-access').count()) === 1 && (await navHrefs(p, 'mobile')).join(',') === '/,/ielts,/mino,/abroad,/profile');
}

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  const stamp = Date.now();
  try {
    const mobile = { viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 };
    const a = await (await browser.newContext(mobile)).newPage();
    watchErrors(a, 'academic', errors);
    console.log('\n[PATHS] New Academic student · Bangla · small Android');
    await academicStudent(a, `paths-ac-${stamp}@test.dev`);

    const d = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
    watchErrors(d, 'ielts', errors);
    console.log('\n[PATHS] New IELTS student · English · desktop');
    await ieltsStudent(d, `paths-ie-${stamp}@test.dev`);

    const e = await (await browser.newContext(mobile)).newPage();
    watchErrors(e, 'existing', errors);
    console.log('\n[PATHS] Existing student (saved before paths)');
    await existingStudent(e, `paths-ex-${stamp}@test.dev`);
  } catch (e) {
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, (e as Error).stack);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
main();
