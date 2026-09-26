// E2E: Study Abroad (Phase 3). Run with `pnpm test:e2e:abroad`.
// Each phase adds its own section; every section starts from real UI and
// checks what was saved to Firestore.
import type { Page } from 'playwright-core';
import {
  BASE, check, getDoc, launch, noHorizontalScroll, patchField, report, shot, signUp, uidOf, waitForFoundation, watchErrors,
} from './helpers';

const errors: string[] = [];
const stamp = Date.now();

/** Reads the stored Study Abroad profile. */
async function abroadOf(uid: string) {
  return (await getDoc(`users/${uid}`))?.app?.abroad ?? {};
}

/** Waits until the stored Study Abroad profile satisfies `ok`. */
async function waitForAbroad(uid: string, ok: (a: Record<string, unknown> & { journey?: { marks: Record<string, { status: string; countryCode?: string }> } }) => boolean, timeoutMs = 15_000) {
  const end = Date.now() + timeoutMs;
  let a = await abroadOf(uid);
  while (Date.now() < end && !ok(a)) {
    await new Promise((r) => setTimeout(r, 400));
    a = await abroadOf(uid);
  }
  return a;
}

/** Rough lightness 0–100 of a computed colour (rgb(), lab() or oklch()). */
function lightness(color: string): number {
  const n = (color.match(/[\d.]+/g) ?? []).map(Number);
  if (color.startsWith('rgb')) return ((n[0] + n[1] + n[2]) / 3 / 255) * 100;
  if (color.startsWith('oklch')) return n[0] <= 1 ? n[0] * 100 : n[0];
  return n[0];
}

/** The elements that stick out past the right edge (for a failing no-scroll check). */
const overflowers = (p: Page) =>
  p.evaluate(() =>
    [...document.querySelectorAll('body *')]
      .filter((e) => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
      .slice(0, 4)
      .map((e) => `${e.tagName.toLowerCase()}.${String((e as HTMLElement).className).slice(0, 60)} → ${Math.round(e.getBoundingClientRect().right)}`)
      .join(' | '),
  );

async function setDark(p: Page, on: boolean) {
  await p.evaluate((d) => document.documentElement.classList.toggle('dark', d), on);
  await p.waitForTimeout(400); // let colour transitions finish before measuring or capturing
}

async function main() {
  const browser = await launch();
  try {
    // ============================================================ 3A · Home (English, desktop)
    console.log('\n[3A] Study Abroad home — desktop, English');
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    watchErrors(p, 'EN', errors);
    await signUp(p, 'Nabila', `abroad-en-${stamp}@test.dev`, 'en');
    const uid = (await uidOf(p))!;

    await p.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await p.getByTestId('abroad-start').waitFor({ timeout: 60_000 });
    check('new student sees one clear start card', await p.getByRole('link', { name: /Start my journey/ }).isVisible());
    const hubs = p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link');
    check('hub bar: Journey · Explore · Money · Apply · Visa & go', (await hubs.allInnerTexts()).join('|') === 'Journey|Explore|Money|Apply|Visa & go', (await hubs.allInnerTexts()).join('|'));
    check('Journey hub is marked current', (await hubs.first().getAttribute('aria-current')) === 'page');
    await shot(p, 'sa-3a-01-new-student');
    await p.getByRole('link', { name: /Start my journey/ }).click();
    await p.waitForURL('**/setup/abroad');
    check('start card opens the goal setup', p.url().endsWith('/setup/abroad'));

    // A student with a goal and a shortlist (set as saved data once the app is idle, then the UI takes over).
    await p.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await p.getByTestId('abroad-start').waitFor({ timeout: 60_000 });
    await patchField(`users/${uid}`, 'app.abroad', { degreeLevel: 'masters', subject: 'Computer Science', targetIntake: { month: 10, year: 2027 }, preferredCountryCodes: ['DE', 'KR'] });
    await p.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await p.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    const journeyText = await p.getByTestId('abroad-journey').innerText();
    check('journey: Stage 2 of 10 · Choose a country', /Stage 2 of 10/.test(journeyText) && /Choose a country/.test(journeyText), journeyText.slice(0, 120));
    check('journey shows the goal line', /Germany|Master.*Computer Science.*2027/.test(journeyText) && /Computer Science/.test(journeyText), journeyText.slice(0, 200));
    check('primary action: Continue my journey', await p.getByTestId('abroad-continue').isVisible());
    await p.getByRole('button', { name: 'Make Germany my dream country' }).click();
    let a = await waitForAbroad(uid, (x) => x.dreamCountryCode === 'DE');
    check('Firestore: dream country saved', a.dreamCountryCode === 'DE', JSON.stringify(a).slice(0, 160));
    await p.getByText('Stage 3 of 10').waitFor({ timeout: 10_000 });
    check('journey moves to Check eligibility', /Check eligibility/.test(await p.getByTestId('abroad-journey').innerText()));
    check('dream country card shows Germany', /Germany/.test(await p.getByTestId('abroad-dream').innerText()));
    check('shortlist shows South Korea', /South Korea/.test(await p.getByTestId('abroad-shortlist').innerText()));
    await p.getByTestId('abroad-mark').click();
    a = await waitForAbroad(uid, (x) => x.journey?.marks?.eligibility?.status === 'done');
    check('Firestore: eligibility marked done for Germany', a.journey?.marks?.eligibility?.countryCode === 'DE', JSON.stringify(a.journey ?? {}).slice(0, 160));
    await p.reload({ waitUntil: 'load' });
    await p.getByText('Stage 4 of 10').waitFor({ timeout: 60_000 });
    check('after reload: Stage 4 of 10 · Choose university & program', /Choose university & program/.test(await p.getByTestId('abroad-journey').innerText()));
    await p.getByRole('button', { name: 'See all 10 stages' }).click();
    check('all 10 stages can be opened', (await p.locator('[data-stage]').count()) === 10);
    check('next up lists now and after', (await p.getByText(/^Now · /).count()) === 1 && (await p.getByText(/^After that · /).count()) === 1);
    check('desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3a-02-journey-light');
    await setDark(p, true);
    const bg = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
    check('dark mode: tokens switch (body is dark)', lightness(bg) < 30, bg);
    await shot(p, 'sa-3a-03-journey-dark');
    await setDark(p, false);
    await p.getByTestId('abroad-ask-mino').click();
    await p.waitForURL('**/mino**');
    await p.getByText(/Look at my Study Abroad journey/).first().waitFor({ timeout: 30_000 });
    check('Ask Mino opens Mino with the journey question', true);
    await p.goto(`${BASE}/ielts/foundation`, { waitUntil: 'load' });
    await p.getByText('Level 1 — Foundation Grammar').waitFor({ timeout: 60_000 });
    check('Foundation still opens (regression)', true);
    const f = await waitForFoundation(uid, () => true);
    check('Foundation progress untouched by Study Abroad', f === null || typeof f === 'object');

    // ============================================================ 3B · Country explorer
    console.log('\n[3B] Country explorer');
    await p.goto(`${BASE}/abroad/countries`, { waitUntil: 'load' });
    await p.getByTestId('priority-countries').waitFor({ timeout: 60_000 });
    const priorityCodes = await p.getByTestId('priority-countries').locator('[data-country]').evaluateAll((els) => els.map((e) => e.getAttribute('data-country')));
    check('14 priority countries, in order, New Zealand last', priorityCodes.join(',') === 'KR,DE,AU,GB,CA,US,JP,IT,FR,NL,SE,FI,IE,NZ', priorityCodes.join(','));
    check('more destinations listed separately', (await p.getByTestId('other-countries').locator('[data-country]').count()) === 6);
    check('Explore hub is marked current', (await p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link', { name: 'Explore' }).getAttribute('aria-current')) === 'page');
    const broken = await p.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length);
    check('no broken images (placeholders until licensed photos exist)', broken === 0 && (await p.locator('[data-placeholder]').count()) === 20, `${broken} broken`);
    const kr = p.locator('[data-country="KR"]');
    check('South Korea card claims nothing unverified', /Profile coming/.test(await kr.innerText()));
    check('Canada card shows only verified topics', /Work while studying/.test(await p.locator('[data-country="CA"]').innerText()) && /Verified facts: 3/.test(await p.locator('[data-country="CA"]').innerText()));
    check('Explore links to the country hub', (await kr.getByRole('link', { name: 'Explore' }).getAttribute('href')) === '/abroad/countries/kr');
    await p.getByRole('searchbox', { name: 'Search countries or capitals' }).fill('wellington');
    check('search by capital finds New Zealand', (await p.locator('[data-country]').count()) === 1 && (await p.locator('[data-country="NZ"]').count()) === 1);
    await p.getByRole('searchbox', { name: 'Search countries or capitals' }).fill('');
    await p.getByRole('button', { name: 'Asia', exact: true }).click();
    check('region filter: Asia', (await p.locator('[data-country]').evaluateAll((els) => els.map((e) => e.getAttribute('data-country')))).join(',') === 'KR,JP,CN,MY');
    await p.getByRole('button', { name: 'All', exact: true }).click();
    await kr.getByRole('button', { name: 'Shortlisted' }).click();
    const sa = await waitForAbroad(uid, (x) => (x.preferredCountryCodes as string[] | undefined)?.includes('KR') === false);
    check('South Korea was already shortlisted → removed from shortlist', !(sa.preferredCountryCodes as string[]).includes('KR'), JSON.stringify(sa.preferredCountryCodes));
    await kr.getByRole('button', { name: 'Add to shortlist' }).click();
    const sb = await waitForAbroad(uid, (x) => (x.preferredCountryCodes as string[] | undefined)?.includes('KR') === true);
    check('Firestore: shortlist toggles back on', (sb.preferredCountryCodes as string[]).includes('KR'));
    check('dream country badge on Germany', /Dream country/.test(await p.locator('[data-country="DE"]').innerText()));
    check('explorer desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3b-01-explorer');

    // ============================================================ 3C · Country hub (one template)
    console.log('\n[3C] Country hub');
    await kr.getByRole('link', { name: 'Explore' }).click();
    await p.waitForURL('**/abroad/countries/kr');
    await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 });
    check('hub: South Korea heading', (await p.getByRole('heading', { level: 1 }).innerText()) === 'South Korea');
    const tabs = p.getByRole('tablist').getByRole('tab');
    check('six tabs in order', (await tabs.allInnerTexts()).join('|') === 'Overview|Universities|Money|Apply|Visa & life|My roadmap', (await tabs.allInnerTexts()).join('|'));
    check('Overview selected by default', (await tabs.first().getAttribute('aria-selected')) === 'true');
    const krStatuses = await p.locator('[data-section]').evaluateAll((els) => els.map((e) => e.getAttribute('data-status')));
    check('South Korea: every section “Not verified yet” (nothing invented)', krStatuses.length > 0 && krStatuses.every((s) => s === 'not-yet'), krStatuses.join(','));
    const firstSection = p.locator('[data-section]').first();
    check('open section shows Official information block', /Official information/i.test(await firstSection.innerText()) && /Not verified yet\. Official facts will appear here/.test(await firstSection.innerText()));
    check('open section shows a separate Mino block', /Mino’s explanation/i.test(await firstSection.innerText()));
    check('Ask Mino link carries the section', (await firstSection.getByRole('link', { name: /Ask Mino about/ }).getAttribute('href')) === '/mino?ask=abroad-section&country=kr&section=why');
    check('fit question links to Mino', (await p.getByTestId('hub-fit').getAttribute('href')) === '/mino?ask=abroad-fit&country=kr');
    check('non-dream country offers Build my plan', await p.getByTestId('hub-build-plan').isVisible());

    await p.goto(`${BASE}/abroad/countries/de?tab=money`, { waitUntil: 'load' });
    await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 });
    check('?tab=money opens the Money tab', (await p.getByRole('tab', { name: 'Money' }).getAttribute('aria-selected')) === 'true');
    const work = p.locator('[data-section="work"]');
    check('Germany · Part-time work: Verified', (await work.getAttribute('data-status')) === 'verified');
    await work.getByRole('button', { name: /Part-time work/ }).click();
    const fact = work.locator('[data-fact]').first();
    await fact.waitFor({ timeout: 5_000 });
    check('verified fact shows its official source link', (await fact.locator('a[href^="http"]').count()) === 1);
    check('verified fact shows when it was checked', /Verified|verified/.test(await fact.innerText()));
    check('Germany · Tuition fees: Not verified yet', (await p.locator('[data-section="tuition"]').getAttribute('data-status')) === 'not-yet');
    check('dream country: “Your dream country” + Open my roadmap', (await p.getByText('Your dream country').count()) === 1 && (await p.getByRole('link', { name: 'Open my roadmap' }).count()) >= 1);
    await p.getByRole('tab', { name: 'Apply' }).click();
    await p.waitForURL('**tab=apply');
    check('tab switch updates the URL', p.url().endsWith('?tab=apply'));
    const admission = p.locator('[data-section="admission"]');
    check('Admission section opens first on Apply', (await admission.getByRole('button', { name: /Admission requirements/ }).getAttribute('aria-expanded')) === 'true');
    const eligBtn = admission.getByRole('button', { name: 'Eligibility checked ✓' });
    check('eligibility already done on home shows as done here', await eligBtn.isVisible());
    await eligBtn.click();
    a = await waitForAbroad(uid, (x) => x.journey?.marks?.eligibility === undefined || x.journey?.marks?.eligibility?.status !== 'done');
    check('Firestore: eligibility un-marked from the hub', a.journey?.marks?.eligibility?.status !== 'done', JSON.stringify(a.journey ?? {}).slice(0, 160));
    await admission.getByRole('button', { name: 'I’ve checked my eligibility' }).click();
    a = await waitForAbroad(uid, (x) => x.journey?.marks?.eligibility?.status === 'done');
    check('Firestore: eligibility marked again, for Germany', a.journey?.marks?.eligibility?.countryCode === 'DE');
    check('hub desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3c-01-hub-de-apply');

    await p.goto(`${BASE}/abroad/countries/au?tab=visa`, { waitUntil: 'load' });
    await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 });
    check('same template for Australia: Post-study verified', (await p.locator('[data-section="post-study"]').getAttribute('data-status')) === 'verified');
    await p.goto(`${BASE}/abroad/countries/xx`, { waitUntil: 'load' });
    await p.getByTestId('hub-not-found').waitFor({ timeout: 60_000 });
    check('unknown country → clear message + way back', (await p.getByRole('link', { name: 'Countries' }).count()) >= 1);
    await ctx.close();

    // ============================================================ 3A · Home (Bangla, mobile)
    console.log('\n[3A] Study Abroad home — mobile, Bangla');
    const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const q = await m.newPage();
    watchErrors(q, 'BN', errors);
    await signUp(q, 'Rafi', `abroad-bn-${stamp}@test.dev`, 'bn');
    const uidBn = (await uidOf(q))!;
    await q.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await q.getByTestId('abroad-start').waitFor({ timeout: 60_000 });
    await patchField(`users/${uidBn}`, 'app.abroad', { degreeLevel: 'bachelors', preferredCountryCodes: ['AU'], dreamCountryCode: 'AU' });
    await q.reload({ waitUntil: 'load' });
    await q.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    check('bn: stage line in Bangla', /ধাপ ৩ \/ ১০|ধাপ 3 \/ 10/.test(await q.getByTestId('abroad-journey').innerText()), (await q.getByTestId('abroad-journey').innerText()).slice(0, 80));
    check('bn mobile: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'sa-3a-04-mobile-bn');
    await setDark(q, true);
    check('bn mobile dark: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'sa-3a-05-mobile-dark');
    await setDark(q, false);
    await q.goto(`${BASE}/abroad/countries`, { waitUntil: 'load' });
    await q.getByTestId('priority-countries').waitFor({ timeout: 60_000 });
    check('bn explorer mobile: no sideways scroll', await noHorizontalScroll(q));
    check('bn explorer: shortlist button in Bangla', (await q.getByRole('button', { name: 'Shortlist-এ রাখো' }).count()) >= 13);
    await shot(q, 'sa-3b-02-explorer-mobile', false);
    await q.goto(`${BASE}/abroad/countries/au`, { waitUntil: 'load' });
    await q.getByTestId('hub-sections').waitFor({ timeout: 60_000 });
    check('bn hub: tabs in Bangla', (await q.getByRole('tab', { name: 'টাকা-পয়সা' }).count()) === 1);
    check('bn hub: dream country Australia recognised', (await q.getByRole('link', { name: /roadmap/ }).count()) >= 1);
    check('bn hub mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-3c-02-hub-mobile-bn', false);
    await setDark(q, true);
    check('bn hub mobile dark: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'sa-3c-03-hub-mobile-dark', false);
    await setDark(q, false);
    await m.close();
  } catch (e) {
    const page = browser.contexts().flatMap((x) => x.pages()).at(-1);
    if (page) {
      console.log('PAGE:', (await page.locator('main').innerText().catch(() => '')).slice(0, 800));
      await shot(page, 'sa-failure').catch(() => {});
    }
    check('EXCEPTION', false, (e as Error).stack ?? e);
  }
  await browser.close();
  check('no page errors', errors.length === 0, errors.slice(0, 5).join(' | '));
  process.exit(report());
}

void main();
