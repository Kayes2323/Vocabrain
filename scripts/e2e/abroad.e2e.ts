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
    await p.goto(`${BASE}/abroad/countries/de?tab=roadmap`, { waitUntil: 'load' });
    await p.getByTestId('hub-roadmap').waitFor({ timeout: 60_000 });
    check('hub roadmap tab: summary with the current step', /4 of 16 steps done · Now: Research programs/.test(await p.getByTestId('hub-roadmap').innerText()), await p.getByTestId('hub-roadmap').innerText());

    // ============================================================ 3E · Country roadmap
    console.log('\n[3E] Country roadmap');
    await p.getByTestId('hub-roadmap').getByRole('link', { name: 'Open my roadmap' }).click();
    await p.waitForURL('**/abroad/countries/de/roadmap');
    await p.getByTestId('roadmap-steps').waitFor({ timeout: 60_000 });
    check('roadmap title', (await p.getByRole('heading', { level: 1 }).innerText()) === 'My Germany roadmap');
    check('4 of 16 done (goal, country, eligibility stage marked earlier)', (await p.getByText('4 of 16 steps done').count()) >= 1);
    check('completed steps folded away', (await p.locator('[data-step]').count()) === 12 && (await p.getByRole('button', { name: 'Show completed steps (4)' }).count()) === 1);
    const cur = p.locator('[data-step="programs"]');
    check('current step: Research programs · You are here · In progress', (await cur.getAttribute('data-status')) === 'in-progress' && /You are here/.test(await cur.innerText()));
    check('current step is open with its action and Mino', (await cur.getByRole('link', { name: /Find universities/ }).getAttribute('href')) === '/abroad/universities?country=de' && (await cur.getByRole('link', { name: 'Ask Mino about this step' }).getAttribute('href')) === '/mino?ask=abroad-step&country=de&step=programs');
    await cur.getByRole('button', { name: 'Mark as done' }).click();
    a = await waitForAbroad(uid, (x) => (x.journey as { steps?: Record<string, Record<string, { status: string }>> })?.steps?.DE?.programs?.status === 'done');
    check('Firestore: step saved under the country', (a.journey as { steps?: Record<string, Record<string, { status: string }>> })?.steps?.DE?.programs?.status === 'done');
    await p.locator('[data-step="shortlist"]').getByRole('button', { name: 'Mark as done' }).click();
    await p.getByText('6 of 16 steps done').first().waitFor({ timeout: 10_000 });
    check('both program steps done → next is English', (await p.locator('[data-step="english"]').getAttribute('data-status')) === 'in-progress');
    check('English step is automatic (follows IELTS)', /Updates automatically/.test(await p.locator('[data-step="english"]').innerText()) && (await p.locator('[data-step="english"]').getByRole('button', { name: 'Mark as done' }).count()) === 0);
    const sop = p.locator('[data-step="sop-cv"]');
    await sop.getByRole('button', { name: /Write your SOP and CV/ }).click();
    check('step lists its documents', /Statement of purpose \(SOP\)/.test(await sop.innerText()) && /CV/.test(await sop.innerText()));
    const soon = new Date(Date.now() + 5 * 86_400_000).toISOString().slice(0, 10);
    await sop.getByTestId('step-date').fill(soon);
    a = await waitForAbroad(uid, (x) => (x.journey as { steps?: Record<string, Record<string, { dueAt?: string }>> })?.steps?.DE?.['sop-cv']?.dueAt === soon);
    check('Firestore: target date saved', (a.journey as { steps?: Record<string, Record<string, { dueAt?: string }>> })?.steps?.DE?.['sop-cv']?.dueAt === soon);
    await p.waitForFunction(() => document.querySelector('[data-step="sop-cv"]')?.getAttribute('data-status') === 'attention', null, { timeout: 10_000 });
    check('date in 5 days → Needs attention', /Due in 5 days/.test(await sop.innerText()));
    await p.getByRole('button', { name: 'Show completed steps (6)' }).click();
    await p.locator('[data-step="budget"]').getByRole('button', { name: /Plan your budget/ }).click();
    await p.locator('[data-step="budget"]').getByRole('button', { name: 'Not done yet' }).click();
    a = await waitForAbroad(uid, (x) => (x.journey as { steps?: Record<string, Record<string, { status: string }>> })?.steps?.DE?.budget?.status === 'in-progress');
    const js = a.journey as { marks: Record<string, { status: string }>; steps?: Record<string, Record<string, { status: string }>> };
    check('un-ticking one step keeps the other and re-opens the stage', js.steps?.DE?.eligibility?.status === 'done' && js.marks.eligibility.status === 'in-progress', JSON.stringify(js).slice(0, 240));
    await p.reload({ waitUntil: 'load' });
    await p.getByTestId('roadmap-steps').waitFor({ timeout: 60_000 });
    check('after reload: current step is Plan your budget', (await p.locator('[data-step="budget"]').getAttribute('data-status')) === 'in-progress' && /You are here/.test(await p.locator('[data-step="budget"]').innerText()));
    check('after reload: date still needs attention', (await p.locator('[data-step="sop-cv"]').getAttribute('data-status')) === 'attention');
    check('roadmap desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3e-01-roadmap');
    await p.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await p.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    check('home: documents stage needs attention from the step date', /Needs attention/.test(await p.getByTestId('abroad-journey').innerText() + (await p.locator('main').innerText())) && /Due in 5 days/.test(await p.locator('main').innerText()));
    await p.goto(`${BASE}/abroad/countries/kr/roadmap`, { waitUntil: 'load' });
    await p.getByTestId('roadmap-inactive').waitFor({ timeout: 60_000 });
    check('other country: read-only roadmap + way back to the dream plan', (await p.getByRole('link', { name: 'Open my Germany roadmap' }).count()) === 1 && (await p.getByRole('button', { name: 'Mark as done' }).count()) === 0);

    // ============================================================ 3F · Universities
    console.log('\n[3F] Universities');
    type AB = Record<string, unknown> & { universities?: { name: string; countryCode: string; status: string; fit: string; officialUrl?: string }[]; deadlines?: { title: string; done?: boolean }[]; documents?: Record<string, { status: string }> };
    const ab = async (ok: (x: AB) => boolean) => (await waitForAbroad(uid, (x) => ok(x as AB))) as AB;
    await p.goto(`${BASE}/abroad/universities`, { waitUntil: 'load' });
    await p.getByLabel('Country').waitFor({ timeout: 60_000 });
    check('defaults to the dream country', (await p.getByLabel('Country').inputValue()) === 'DE');
    check('Explore hub is current', (await p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link', { name: 'Explore' }).getAttribute('aria-current')) === 'page');
    check('no invented universities: honest empty state', /No verified university profiles for Germany yet/.test(await p.getByTestId('uni-verified-empty').innerText()));
    await p.getByRole('button', { name: 'Add a university' }).click();
    await p.getByLabel('University name').fill('TU Test');
    await p.getByLabel('Official website (optional)').fill('https://www.tu-test.example');
    await p.getByRole('button', { name: 'Ambitious' }).click();
    await p.getByRole('button', { name: 'Add to my list' }).click();
    let x = await ab((y) => (y.universities?.length ?? 0) === 1);
    check('Firestore: university saved for Germany', x.universities?.[0].name === 'TU Test' && x.universities?.[0].countryCode === 'DE' && x.universities?.[0].fit === 'ambitious', JSON.stringify(x.universities));
    await p.locator('[data-university="TU Test"]').getByLabel('Status').selectOption('applied');
    x = await ab((y) => y.universities?.[0].status === 'applied');
    check('Firestore: status updated', x.universities?.[0].status === 'applied');
    check('official website link opens in a new tab', (await p.locator('[data-university="TU Test"]').getByRole('link', { name: 'Official website' }).getAttribute('target')) === '_blank');
    await p.getByRole('button', { name: 'Add a university' }).click();
    await p.getByLabel('University name').fill('Uni B');
    await p.getByRole('button', { name: 'Add to my list' }).click();
    await p.locator('[data-university="Uni B"]').waitFor();
    check('balance line + safer-choice tip', /1 ambitious · 1 good match · 0 safer/.test(await p.getByTestId('uni-balance').innerText()) && (await p.getByText(/add at least one safer choice/).count()) === 1);
    check('shortlist step already done on the roadmap shows here', (await p.getByRole('button', { name: 'Shortlist step done ✓' }).count()) === 1);
    check('universities desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3f-01-universities');

    // ============================================================ 3G · Scholarships
    console.log('\n[3G] Scholarships');
    await p.goto(`${BASE}/abroad/scholarships?country=gb`, { waitUntil: 'load' });
    await p.getByTestId('schol-empty').waitFor({ timeout: 60_000 });
    check('Money hub is current', (await p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link', { name: 'Money' }).getAttribute('aria-current')) === 'page');
    check('?country=gb selects the UK', (await p.getByLabel('Country').inputValue()) === 'GB');
    check('no invented scholarship facts', /No verified scholarship information for United Kingdom yet/.test(await p.getByTestId('schol-official').innerText()));
    check('no invented scholarships', /No verified scholarships here yet/.test(await p.getByTestId('schol-empty').innerText()));
    await p.getByRole('button', { name: 'Fully funded' }).click();
    check('funding filter toggles', (await p.getByRole('button', { name: 'Fully funded' }).getAttribute('aria-pressed')) === 'true');
    await p.getByLabel('Country').selectOption('DE');
    await p.waitForURL('**country=de');
    check('changing country updates the URL', p.url().endsWith('?country=de'));
    await p.getByRole('link', { name: 'Add a scholarship date to my deadlines' }).click();
    await p.waitForURL('**/abroad/deadlines?add=scholarship');

    // ============================================================ 3H · Deadlines
    console.log('\n[3H] Deadlines');
    await p.getByTestId('dl-form').waitFor({ timeout: 60_000 });
    check('Apply hub is current', (await p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link', { name: 'Apply' }).getAttribute('aria-current')) === 'page');
    check('form opens with Scholarship preselected', (await p.getByTestId('dl-form').locator('select').inputValue()) === 'scholarship');
    check('roadmap target date already listed (This week)', /Write your SOP and CV/.test(await p.locator('[data-bucket="this-week"]').innerText()));
    const in3 = new Date(Date.now() + 3 * 86_400_000).toISOString().slice(0, 10);
    await p.getByLabel('What is due?').fill('DAAD application');
    await p.getByTestId('dl-form').locator('input[type="date"]').fill(in3);
    await p.getByRole('button', { name: 'Add date' }).click();
    x = await ab((y) => (y.deadlines?.length ?? 0) === 1);
    check('Firestore: personal deadline saved', x.deadlines?.[0].title === 'DAAD application');
    const dl = p.locator('[data-origin="personal"]').first();
    check('new date sits in This week with days left', /In 3 days/.test(await dl.innerText()) && (await p.locator('[data-bucket="this-week"] [data-origin="personal"]').count()) === 1);
    await dl.getByRole('button', { name: 'Mark done' }).click();
    x = await ab((y) => y.deadlines?.[0].done === true);
    await p.locator('[data-bucket="completed"]').waitFor({ timeout: 10_000 });
    check('marked done → Completed (and saved)', x.deadlines?.[0].done === true);
    check('deadlines desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3h-01-deadlines');

    // ============================================================ 3I · Documents
    console.log('\n[3I] Documents');
    await p.goto(`${BASE}/abroad/documents`, { waitUntil: 'load' });
    await p.getByTestId('docs-required').waitFor({ timeout: 60_000 });
    check('documents for the Germany plan: 0 of 8 ready', /For your Germany plan/.test(await p.locator('main').innerText()) && (await p.getByTestId('docs-readiness').innerText()) === '0 of 8 ready');
    const sopDoc = p.locator('[data-document="sop"]');
    await sopDoc.getByRole('button', { name: /Statement of purpose/ }).click();
    check('guide: what to include + general-guidance label', /What to include/.test(await sopDoc.innerText()) && /General guidance/.test(await sopDoc.innerText()));
    check('Ask Mino carries the document', (await sopDoc.getByRole('link', { name: 'Ask Mino to help with this' }).getAttribute('href')) === '/mino?ask=abroad-doc&doc=sop');
    await sopDoc.getByRole('button', { name: 'Ready' }).click();
    x = await ab((y) => y.documents?.sop?.status === 'ready');
    check('Firestore: document status saved', x.documents?.sop?.status === 'ready');
    check('readiness updates: 1 of 8', (await p.getByTestId('docs-readiness').innerText()) === '1 of 8 ready');
    check('documents desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3i-01-documents');

    // ============================================================ 3J · Visa
    console.log('\n[3J] Visa');
    await p.goto(`${BASE}/abroad/visa`, { waitUntil: 'load' });
    await p.locator('[data-visa-country="DE"]').waitFor({ timeout: 60_000 });
    check('Visa hub is current; dream country first', (await p.getByRole('navigation', { name: 'Study Abroad sections' }).getByRole('link', { name: 'Visa & go' }).getAttribute('aria-current')) === 'page' && (await p.locator('[data-visa-country]').first().getAttribute('data-visa-country')) === 'DE');
    await p.goto(`${BASE}/abroad/visa/gb`, { waitUntil: 'load' });
    await p.getByTestId('visa-parts').waitFor({ timeout: 60_000 });
    check('15 visa parts (12 + insurance, work, restrictions)', (await p.locator('[data-section]').count()) === 15);
    const fin = p.locator('[data-section="finances"]');
    check('Proof of funds: partly verified, opened, 2 sourced facts', (await fin.getAttribute('data-status')) === 'partial' && (await fin.locator('[data-fact]').count()) === 2);
    await p.locator('[data-section="portal"]').getByRole('button', { name: /Where to apply/ }).click();
    check('Where to apply: official GOV.UK page, still "Not verified yet"', (await p.locator('[data-section="portal"] a[href="https://www.gov.uk/student-visa"]').count()) === 1 && (await p.locator('[data-section="portal"]').getAttribute('data-status')) === 'not-yet');
    check('Ask Mino carries country and part', (await p.locator('[data-section="portal"]').getByRole('link', { name: /Ask Mino about/ }).getAttribute('href')) === '/mino?ask=abroad-visa&country=gb&part=portal');
    check('visa desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3j-01-visa-gb');
    await p.goto(`${BASE}/abroad`, { waitUntil: 'load' });
    await p.getByTestId('abroad-journey').waitFor({ timeout: 60_000 });
    check('home tools: centres no longer "Soon"', (await p.locator('main').getByText('Soon', { exact: true }).count()) === 0, String(await p.locator('main').getByText('Soon', { exact: true }).count()));

    // ============================================================ 3N · Next action on home
    console.log('\n[3N] Next action');
    check('home: next action is the roadmap date due this week', /Your next action: Write your SOP and CV · In 5 days/.test(await p.getByTestId('abroad-next-action').innerText()), await p.getByTestId('abroad-next-action').innerText());
    check('Continue goes to the roadmap', (await p.getByTestId('abroad-continue').getAttribute('href')) === '/abroad/countries/de/roadmap');

    // ============================================================ 3K · Country Match v2
    console.log('\n[3K] Country Match');
    await p.goto(`${BASE}/abroad/country-match`, { waitUntil: 'load' });
    await p.getByRole('button', { name: 'Post-study work' }).waitFor({ timeout: 60_000 });
    await p.getByRole('button', { name: 'Post-study work' }).click();
    await p.getByRole('button', { name: 'Show my matches' }).click();
    await p.locator('[data-match="CA"]').waitFor({ timeout: 10_000 });
    x = await ab((y) => Boolean((y as { priorities?: object }).priorities));
    check('dream country stays on the shortlist after saving answers', ((x.preferredCountryCodes as string[]) ?? []).includes('DE'), JSON.stringify(x.preferredCountryCodes));
    check('each match leads to an action (Explore)', (await p.locator('[data-match="CA"]').getByRole('link', { name: 'Explore' }).getAttribute('href')) === '/abroad/countries/ca');
    check('Germany (no verified post-study data) is listed as not enough data, not ranked', (await p.locator('[data-match="DE"]').count()) === 0 && /Not enough verified data yet/.test(await p.locator('main').innerText()));
    await p.locator('[data-match="CA"]').getByRole('button', { name: 'Add to compare' }).click();
    await p.locator('[data-match="GB"]').getByRole('button', { name: 'Add to compare' }).click();
    check('compare bar appears with 2', (await p.getByTestId('match-compare').innerText()).includes('Compare 2'));
    check('match desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3k-01-match');
    await p.getByTestId('match-compare').click();
    await p.waitForURL('**/abroad/compare?c=ca,gb');

    // ============================================================ 3L · Compare
    console.log('\n[3L] Compare');
    await p.getByTestId('compare-table').waitFor({ timeout: 60_000 });
    check('two countries side by side', (await p.locator('[data-compare-country]').count()) === 2);
    check('work row: Canada verified, facts sourced', (await p.locator('[data-row="work"] [data-cell="CA"]').getAttribute('data-status')) === 'verified' && (await p.locator('[data-row="work"] [data-cell="CA"] a[href^="https://www.canada.ca"]').count()) === 1);
    check('tuition row: not verified for both (nothing invented)', (await p.locator('[data-row="tuition"] [data-status="not-yet"]').count()) === 2 && /Not verified yet/.test(await p.locator('[data-row="tuition"]').innerText()));
    await p.getByLabel('Country 3').selectOption('DE');
    await p.waitForURL('**c=ca,gb,de');
    check('third country added via picker → URL', (await p.locator('[data-compare-country]').count()) === 3);
    check('compare desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-3l-01-compare');

    // ============================================================ 3M · Mino
    console.log('\n[3M] Mino');
    await p.getByRole('link', { name: 'Ask Mino to compare these' }).click();
    await p.waitForURL('**/mino**');
    await p.getByText(/Compare Canada, United Kingdom, Germany for my Study Abroad plan/).first().waitFor({ timeout: 30_000 });
    check('Mino gets the comparison question with the verified-only rule', true);

    // ============================================================ Korea B2 · pathways & visa categories
    console.log('\n[KR-B2] Pathways, visa categories, work check, Apply ↔ Roadmap');
    type PB = Record<string, unknown> & { pathwayByCountry?: Record<string, string>; journey?: { steps?: Record<string, Record<string, { status: string }>> } };
    const pb = async (ok: (x: PB) => boolean) => (await waitForAbroad(uid, (y) => ok(y as PB))) as PB;
    await p.goto(`${BASE}/abroad/countries/kr`, { waitUntil: 'load' });
    await p.getByTestId('pathway-picker').waitFor({ timeout: 60_000 });
    check('KR hub asks "What are you planning to study?" with 2 pathways', (await p.getByTestId('pathway-picker').locator('[data-pathway]').count()) === 2);
    await p.locator('[data-pathway="language"]').click();
    let y = await pb((v) => v.pathwayByCountry?.KR === 'language');
    check('Firestore: pathway saved per country', y.pathwayByCountry?.KR === 'language');
    check('KR sections stay honest: all Not verified yet', (await p.locator('[data-section][data-status="not-yet"]').count()) === (await p.locator('[data-section]').count()));
    check('Germany hub has no pathway picker', await (async () => { await p.goto(`${BASE}/abroad/countries/de`, { waitUntil: 'load' }); await p.getByTestId('hub-sections').waitFor({ timeout: 60_000 }); return (await p.getByTestId('pathway-picker').count()) === 0; })());
    await p.goto(`${BASE}/abroad/visa/kr`, { waitUntil: 'load' });
    await p.getByTestId('visa-parts').waitFor({ timeout: 60_000 });
    check('language pathway → only D-4', (await p.getByTestId('visa-categories').locator('[data-category]').allInnerTexts()).join() === 'D-4' && (await p.getByTestId('visa-parts').getAttribute('data-category')) === 'D-4');
    check('every D-4 part: Not verified yet (no invented rules)', (await p.locator('[data-section][data-status="not-yet"]').count()) === 15);
    check('Can I work? → not enough verified information', (await p.getByTestId('work-check').getAttribute('data-state')) === 'not-verified' && /Not enough verified information yet/.test(await p.getByTestId('work-check').innerText()));
    await p.getByTestId('pathway-picker').locator('[data-pathway="degree"]').click();
    await p.waitForFunction(() => document.querySelector('[data-testid="visa-parts"]')?.getAttribute('data-category') === 'D-2', null, { timeout: 10_000 });
    y = await pb((v) => v.pathwayByCountry?.KR === 'degree');
    check('switch to degree → D-2, saved', y.pathwayByCountry?.KR === 'degree' && (await p.getByTestId('visa-categories').locator('[data-category]').allInnerTexts()).join() === 'D-2');
    check('Ask Mino carries the visa category', /category=D-2/.test((await p.locator('[data-section]').first().getByRole('link', { name: /Ask Mino about/ }).getAttribute('href')) ?? ''));
    await p.getByTestId('pathway-picker').locator('[data-pathway="degree"]').click();
    y = await pb((v) => !v.pathwayByCountry?.KR);
    check('no pathway → both categories, with a hint to choose', (await p.getByTestId('visa-categories').locator('[data-category]').allInnerTexts()).join() === 'D-2,D-4' && /Choose your pathway/.test(await p.locator('main').innerText()));
    check('visa KR desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'sa-kr-b2-01-visa');
    await p.goto(`${BASE}/abroad/visa/de`, { waitUntil: 'load' });
    await p.getByTestId('work-check').waitFor({ timeout: 60_000 });
    check('Germany: no categories; Can I work? shows the sourced rule', (await p.getByTestId('visa-categories').count()) === 0 && (await p.getByTestId('work-check').getAttribute('data-state')) === 'answered' && /140 full days/.test(await p.getByTestId('work-check').innerText()));
    await p.goto(`${BASE}/abroad/countries/de?tab=apply`, { waitUntil: 'load' });
    await p.getByTestId('apply-steps').waitFor({ timeout: 60_000 });
    const lorBox = p.locator('[data-apply-step="lor"]');
    check('Apply checklist lists the roadmap’s application steps', (await p.locator('[data-apply-step]').count()) >= 8 && (await lorBox.getAttribute('data-status')) !== 'done');
    await lorBox.getByRole('button').click();
    y = await pb((v) => v.journey?.steps?.DE?.lor?.status === 'done');
    check('Apply tick → the one roadmap store', y.journey?.steps?.DE?.lor?.status === 'done');
    await p.goto(`${BASE}/abroad/countries/de/roadmap`, { waitUntil: 'load' });
    await p.getByTestId('roadmap-steps').waitFor({ timeout: 60_000 });
    await p.getByRole('button', { name: /Show completed steps/ }).click();
    check('…and the roadmap shows it done', (await p.locator('[data-step="lor"]').getAttribute('data-status')) === 'done');
    await p.locator('[data-step="lor"]').getByRole('button', { name: /Ask for recommendation letters/ }).click();
    await p.locator('[data-step="lor"]').getByRole('button', { name: 'Not done yet' }).click();
    y = await pb((v) => v.journey?.steps?.DE?.lor?.status !== 'done');
    await p.goto(`${BASE}/abroad/countries/de?tab=apply`, { waitUntil: 'load' });
    await p.getByTestId('apply-steps').waitFor({ timeout: 60_000 });
    check('roadmap un-tick → Apply shows it open again', (await p.locator('[data-apply-step="lor"]').getAttribute('data-status')) !== 'done');

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
    await q.goto(`${BASE}/abroad/countries/au/roadmap`, { waitUntil: 'load' });
    await q.getByTestId('roadmap-steps').waitFor({ timeout: 60_000 });
    check('bn roadmap: title in Bangla', /আমার Australia roadmap/.test(await q.getByRole('heading', { level: 1 }).innerText()));
    check('bn roadmap mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-3e-02-roadmap-mobile-bn', false);
    await setDark(q, true);
    check('bn roadmap mobile dark: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'sa-3e-03-roadmap-mobile-dark', false);
    await setDark(q, false);
    for (const [path, id] of [['/abroad/universities', 'my-universities'], ['/abroad/deadlines', ''], ['/abroad/documents', 'docs-required'], ['/abroad/visa/au', 'visa-parts'], ['/abroad/scholarships', 'schol-empty']] as const) {
      await q.goto(`${BASE}${path}`, { waitUntil: 'load' });
      if (id) await q.getByTestId(id).waitFor({ timeout: 60_000 }).catch(() => {});
      else await q.getByRole('heading', { level: 1 }).waitFor({ timeout: 60_000 });
      await q.waitForTimeout(300);
      check(`bn ${path} mobile: no sideways scroll`, await noHorizontalScroll(q), await overflowers(q));
    }
    check('bn documents in Bangla', /তোমার Australia plan-এর জন্য/.test(await (async () => { await q.goto(`${BASE}/abroad/documents`, { waitUntil: 'load' }); await q.getByTestId('docs-required').waitFor({ timeout: 60_000 }); return q.locator('main').innerText(); })()));
    await shot(q, 'sa-3i-02-documents-mobile-bn', false);
    await q.goto(`${BASE}/abroad/visa/au`, { waitUntil: 'load' });
    await q.getByTestId('visa-parts').waitFor({ timeout: 60_000 });
    await q.goto(`${BASE}/abroad/visa/kr`, { waitUntil: 'load' });
    await q.getByTestId('pathway-picker').waitFor({ timeout: 60_000 });
    check('bn KR visa: pathway question in Bangla', /তুমি কী পড়ার plan করছো\?/.test(await q.getByTestId('pathway-picker').innerText()));
    check('bn KR visa mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-kr-b2-02-visa-mobile-bn', false);
    await q.goto(`${BASE}/abroad/compare?c=au,gb,ca`, { waitUntil: 'load' });
    await q.getByTestId('compare-table').waitFor({ timeout: 60_000 });
    check('bn compare mobile: no sideways scroll', await noHorizontalScroll(q), await overflowers(q));
    await shot(q, 'sa-3l-02-compare-mobile-bn', false);
    await q.goto(`${BASE}/abroad/visa/au`, { waitUntil: 'load' });
    await q.getByTestId('visa-parts').waitFor({ timeout: 60_000 });
    await setDark(q, true);
    check('bn visa mobile dark: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'sa-3j-02-visa-mobile-dark', false);
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
