import assert from 'node:assert/strict';
import { emptyProfile, type UserProfile } from '../lib/models';
import { withProfileDefaults } from '../lib/services/profile-repository';
import { ABROAD_STAGE_IDS, abroadJourney, markStage, setDreamCountry, toggleShortlist } from '../lib/engine';
import { COUNTRIES, OTHER_COUNTRIES, PRIORITY_COUNTRIES, getCountry } from '../lib/content/countries';
import { countryHref, countryIndicators } from '../lib/abroad/countries';
import { actionHref, countrySections, factNeedsReview, HUB_TABS, SECTION_DEFS, sectionsOfTab } from '../lib/abroad/sections';
import { deadlineBucket, scholarshipStatus } from '../lib/abroad/status';
import { COUNTRY_SECTION_IDS } from '../lib/models';

/**
 * Study Abroad product tests (journey, countries, hub, roadmap, centres…).
 * Pure functions only; the browser flows live in scripts/e2e/abroad.e2e.ts.
 */
let passed = 0;
const test = (name: string, fn: () => void) => {
  try {
    fn();
    passed++;
    console.log('PASS', name);
  } catch (e) {
    console.log('FAIL', name);
    throw e;
  }
};

const NOW = new Date('2026-09-26T10:00:00Z');
const base = (): UserProfile => emptyProfile('u1');
const withAbroad = (p: UserProfile, abroad: Partial<UserProfile['abroad']>): UserProfile => ({ ...p, abroad: { ...p.abroad, ...abroad } });

// ---------------------------------------------------------------- 3A journey
test('journey: 10 stages in order; a new student is at "Discover" with nothing done', () => {
  assert.deepEqual([...ABROAD_STAGE_IDS], ['discover', 'choose-country', 'eligibility', 'program', 'english', 'documents', 'apply', 'offer', 'visa', 'travel']);
  const j = abroadJourney(base(), NOW);
  assert.equal(j.current.id, 'discover');
  assert.equal(j.percent, 0);
  assert.ok(j.stages.every((s) => s.status === 'upcoming'));
  assert.equal(j.next?.id, 'choose-country');
});

test('journey: goal → Discover done; a shortlist without a dream country is "in progress" (old "destination" rule kept)', () => {
  let p = withAbroad(base(), { degreeLevel: 'masters', subject: 'Computer Science' });
  let j = abroadJourney(p, NOW);
  assert.equal(j.stages[0].status, 'done');
  assert.equal(j.current.id, 'choose-country');
  p = withAbroad(p, { preferredCountryCodes: ['DE', 'KR'] });
  j = abroadJourney(p, NOW);
  assert.equal(j.stages[1].status, 'in-progress');
  assert.equal(j.current.id, 'choose-country');
});

test('journey: dream country → "Choose a country" done; the next stage links to that country', () => {
  const p = withAbroad(base(), { degreeLevel: 'masters', ...setDreamCountry({}, 'DE') });
  const j = abroadJourney(p, NOW);
  assert.equal(j.stages[1].status, 'done');
  assert.equal(j.current.id, 'eligibility');
  assert.equal(j.current.href, '/abroad/countries/de?tab=apply');
  assert.equal(j.current.manual, true);
  assert.deepEqual(p.abroad.preferredCountryCodes, ['DE'], 'the dream country joins the shortlist');
  assert.equal(j.percent, 20);
});

test('journey: manual marks belong to one dream country and are never deleted when switching', () => {
  let a = setDreamCountry({ degreeLevel: 'masters' }, 'DE');
  a = markStage(a, 'eligibility', true, NOW);
  assert.equal(a.journey!.marks.eligibility.countryCode, 'DE');
  let j = abroadJourney(withAbroad(base(), a), NOW);
  assert.equal(j.stages[2].status, 'done');
  assert.equal(j.current.id, 'program');
  a = setDreamCountry(a, 'KR');
  j = abroadJourney(withAbroad(base(), a), NOW);
  assert.equal(j.stages[2].status, 'upcoming', 'a new country starts its own eligibility check');
  assert.ok(a.journey!.marks.eligibility, 'the German mark is still stored');
  a = setDreamCountry(a, 'DE');
  j = abroadJourney(withAbroad(base(), a), NOW);
  assert.equal(j.stages[2].status, 'done', 'switching back restores it');
  a = markStage(a, 'eligibility', false, NOW);
  assert.equal(abroadJourney(withAbroad(base(), a), NOW).stages[2].status, 'in-progress');
});

test('journey: English follows the IELTS journey; a close test or a personal date needs attention', () => {
  let p = withAbroad(base(), { degreeLevel: 'masters', ...setDreamCountry({}, 'DE') });
  p = { ...p, ielts: { ...p.ielts, targetBand: 7 } };
  assert.equal(abroadJourney(p, NOW).stages[4].status, 'in-progress');
  p = { ...p, ielts: { ...p.ielts, testDate: '2026-10-03' } };
  const eng = abroadJourney(p, NOW).stages[4];
  assert.equal(eng.status, 'attention');
  assert.deepEqual(eng.attention, { key: 'sa.attention.ieltsSoon', params: { n: 7 } });
  const a = { ...p.abroad, journey: { marks: { documents: { status: 'in-progress' as const, updatedAt: NOW.toISOString(), dueAt: '2026-09-20', countryCode: 'DE' } } } };
  const j = abroadJourney({ ...p, abroad: a }, NOW);
  assert.equal(j.stages[5].status, 'attention');
  assert.equal(j.stages[5].attention?.key, 'sa.attention.missed');
  assert.deepEqual(j.attention.map((s) => s.id), ['english', 'documents']);
});

test('journey: complete when every stage is done', () => {
  let a = setDreamCountry({ degreeLevel: 'bachelors' }, 'AU');
  for (const id of ABROAD_STAGE_IDS) a = markStage(a, id, true, NOW);
  const j = abroadJourney(withAbroad(base(), a), NOW);
  assert.equal(j.complete, true);
  assert.equal(j.percent, 100);
  assert.equal(j.next, undefined);
});

test('shortlist: add/remove; removing the dream country clears it', () => {
  let a = toggleShortlist({}, 'KR');
  a = setDreamCountry(a, 'KR');
  a = toggleShortlist(a, 'AU');
  assert.deepEqual(a.preferredCountryCodes, ['KR', 'AU']);
  a = toggleShortlist(a, 'KR');
  assert.deepEqual(a.preferredCountryCodes, ['AU']);
  assert.equal(a.dreamCountryCode, undefined);
});

test('persistence: old profiles load unchanged; journey marks survive a save/load', () => {
  const old = withProfileDefaults('u1', { abroad: { degreeLevel: 'masters', preferredCountryCodes: ['GB'] } } as Partial<UserProfile>);
  assert.deepEqual(old.abroad, { degreeLevel: 'masters', preferredCountryCodes: ['GB'] });
  const saved = withAbroad(base(), markStage(setDreamCountry({}, 'GB'), 'eligibility', true, NOW));
  const loaded = withProfileDefaults('u1', JSON.parse(JSON.stringify(saved)));
  assert.equal(loaded.abroad.journey!.marks.eligibility.status, 'done');
  assert.equal(abroadJourney(loaded, NOW).stages[2].status, 'done');
});

// ---------------------------------------------------------------- 3B countries
test('countries: 14 priority destinations in the approved order (New Zealand included), others after', () => {
  assert.deepEqual(PRIORITY_COUNTRIES.map((c) => c.code), ['KR', 'DE', 'AU', 'GB', 'CA', 'US', 'JP', 'IT', 'FR', 'NL', 'SE', 'FI', 'IE', 'NZ']);
  assert.equal(OTHER_COUNTRIES.length + PRIORITY_COUNTRIES.length, COUNTRIES.length);
  assert.equal(new Set(COUNTRIES.map((c) => c.code)).size, COUNTRIES.length, 'codes are unique');
  for (const c of COUNTRIES) {
    assert.match(c.code, /^[A-Z]{2}$/);
    assert.ok(c.capital, `${c.code} has a capital`);
    if (c.hero) for (const k of ['src', 'credit', 'source', 'sourceUrl', 'license'] as const) assert.ok(c.hero[k], `${c.code} image ${k}`);
  }
  assert.equal(getCountry('nz')?.name, 'New Zealand');
  assert.equal(countryHref('DE', 'apply'), '/abroad/countries/de?tab=apply');
});

test('country cards only claim what is verified', () => {
  assert.deepEqual(countryIndicators(getCountry('KR')!), { verified: [], facts: 0 });
  assert.deepEqual(countryIndicators(getCountry('DE')!).verified, ['work']);
  const ca = countryIndicators(getCountry('CA')!);
  assert.deepEqual(ca.verified, ['work', 'postStudy', 'living']);
  assert.equal(ca.facts, 3);
});

// ---------------------------------------------------------------- 3C/3D hub + models
test('hub: 24 sections in the approved order, spread over 6 tabs; every tab has sections', () => {
  assert.equal(COUNTRY_SECTION_IDS.length, 24);
  assert.deepEqual([...HUB_TABS], ['overview', 'universities', 'money', 'apply', 'visa', 'roadmap']);
  assert.deepEqual(sectionsOfTab('money'), ['tuition', 'living', 'work', 'scholarships']);
  assert.deepEqual(sectionsOfTab('apply'), ['admission', 'english', 'documents', 'application', 'offer', 'deadlines']);
  assert.deepEqual(sectionsOfTab('roadmap'), ['journey']);
  for (const t of HUB_TABS) assert.ok(sectionsOfTab(t).length > 0, t);
  assert.equal(actionHref(SECTION_DEFS.visa.action!.href, 'KR'), '/abroad/visa/kr');
});

test('hub: the same template serves every country; statuses come from verified facts only', () => {
  for (const c of COUNTRIES) assert.equal(countrySections(c, NOW).length, 24, c.code);
  const kr = countrySections(getCountry('KR')!, NOW);
  assert.ok(kr.every((s) => s.status === 'not-yet' && s.facts.length === 0), 'no facts → not verified yet');
  const de = countrySections(getCountry('DE')!, NOW);
  assert.equal(de.find((s) => s.id === 'work')!.status, 'verified');
  const ca = countrySections(getCountry('CA')!, NOW);
  assert.equal(ca.find((s) => s.id === 'living')!.status, 'partial', 'money to show is not a full living cost');
  assert.equal(ca.find((s) => s.id === 'post-study')!.status, 'verified');
});

test('hub: an old fact needs review and is no longer "verified"; reviewAt overrides the window', () => {
  const later = new Date('2027-10-01T00:00:00Z');
  const de = countrySections(getCountry('DE')!, later).find((s) => s.id === 'work')!;
  assert.equal(de.stale, 1);
  assert.equal(de.status, 'partial');
  const f = { value: 'x', source: { name: 's', url: 'https://x', sourceType: 'official-government' as const }, lastVerified: '2026-09-26' };
  assert.equal(factNeedsReview(f, 'deadlines', new Date('2026-12-01')), true, 'deadlines: 60 days');
  assert.equal(factNeedsReview({ ...f, reviewAt: '2027-06-01' }, 'deadlines', new Date('2026-12-01')), false);
  assert.equal(factNeedsReview({ ...f, validUntil: '2026-10-01' }, 'work', new Date('2026-11-01')), true);
});

test('status: scholarship open / opening soon / closed / passed, and deadline buckets, all computed from dates', () => {
  const d = (value: string) => ({ value, source: { name: 's', sourceType: 'official-scholarship' as const }, lastVerified: '2026-09-01' });
  const now = new Date('2026-09-26T10:00:00');
  assert.equal(scholarshipStatus({ opensAt: d('2026-09-01'), deadline: d('2026-11-30') }, now), 'open');
  assert.equal(scholarshipStatus({ opensAt: d('2026-11-01'), deadline: d('2027-01-31') }, now), 'opening-soon');
  assert.equal(scholarshipStatus({ opensAt: d('2027-06-01'), deadline: d('2027-08-31') }, now), 'closed');
  assert.equal(scholarshipStatus({ deadline: d('2026-09-25') }, now), 'deadline-passed');
  assert.equal(scholarshipStatus({}, now), 'unknown');
  assert.equal(deadlineBucket('2026-09-26', now), 'this-week');
  assert.equal(deadlineBucket('2026-10-03', now), 'this-week');
  assert.equal(deadlineBucket('2026-10-20', now), 'this-month');
  assert.equal(deadlineBucket('2027-01-10', now), 'upcoming');
  assert.equal(deadlineBucket('2026-09-20', now), 'missed');
  assert.equal(deadlineBucket('2026-09-20', now, true), 'completed');
});

console.log(`\n${passed} passed`);
