import assert from 'node:assert/strict';
import { emptyProfile, type UserProfile } from '../lib/models';
import { withProfileDefaults } from '../lib/services/profile-repository';
import { ABROAD_STAGE_IDS, abroadJourney, countryRoadmap, markStage, markStep, setDreamCountry, setStepDue, toggleShortlist } from '../lib/engine';
import { roadmapDefs } from '../lib/abroad/roadmap';
import { ROADMAP_TEMPLATE } from '../lib/content/roadmap';
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

// ---------------------------------------------------------------- 3E roadmap
const dreamDE = () => withAbroad(base(), { degreeLevel: 'masters', dreamCountryCode: 'DE', preferredCountryCodes: ['DE'] });

test('roadmap: 16 template steps, each tied to one of the 10 stages, in stage order', () => {
  assert.equal(ROADMAP_TEMPLATE.length, 16);
  const order = ROADMAP_TEMPLATE.map((s) => ABROAD_STAGE_IDS.indexOf(s.stage as never));
  assert.ok(order.every((i) => i >= 0));
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
  assert.equal(new Set(ROADMAP_TEMPLATE.map((s) => s.id)).size, 16);
  assert.ok(ABROAD_STAGE_IDS.every((id) => ROADMAP_TEMPLATE.some((s) => s.stage === id)), 'every stage has a step');
});

test('roadmap: country overrides skip, rename and add (with source); no override = template', () => {
  assert.equal(roadmapDefs(getCountry('DE')).length, 16);
  const defs = roadmapDefs({
    roadmap: {
      skip: ['lor'],
      rename: { visa: { en: 'Apply for a study permit', bn: 'Study permit-এর জন্য apply করো' } },
      add: [{ after: 'passport', step: { id: 'extra', stage: 'documents', title: { en: 'X', bn: 'X' }, description: { en: 'x', bn: 'x' } }, source: { name: 'Official', url: 'https://example.gov', sourceType: 'official-government' } }],
    },
  });
  assert.equal(defs.length, 16);
  assert.ok(!defs.some((d) => d.id === 'lor'));
  assert.equal(defs.find((d) => d.id === 'visa')?.title.en, 'Apply for a study permit');
  assert.equal(defs[defs.findIndex((d) => d.id === 'passport') + 1].id, 'extra');
  assert.equal(defs.find((d) => d.id === 'extra')?.source?.name, 'Official');
});

test('roadmap: goal and country are automatic; the first open step is current and "in progress"', () => {
  const r = countryRoadmap(dreamDE(), 'de', NOW);
  assert.equal(r.active, true);
  assert.equal(r.total, 16);
  assert.equal(r.steps[0].status, 'done');
  assert.equal(r.steps[1].status, 'done');
  assert.equal(r.current?.id, 'eligibility');
  assert.equal(r.current?.status, 'in-progress');
  assert.equal(r.steps.filter((s) => s.current).length, 1);
  assert.equal(r.steps[3].status, 'upcoming');
  const other = countryRoadmap(dreamDE(), 'KR', NOW);
  assert.equal(other.active, false);
  assert.equal(other.steps[1].status, 'upcoming', 'Korea is not the chosen country');
});

test('roadmap: ticking every step of a stage completes the stage; un-ticking re-opens it without losing the others', () => {
  let p = dreamDE();
  p = { ...p, abroad: markStep(p.abroad, 'DE', 'eligibility', true, NOW) };
  assert.equal(abroadJourney(p, NOW).stages[2].status, 'in-progress');
  p = { ...p, abroad: markStep(p.abroad, 'DE', 'budget', true, NOW) };
  assert.equal(abroadJourney(p, NOW).stages[2].status, 'done');
  assert.equal(abroadJourney(p, NOW).current.id, 'program');
  p = { ...p, abroad: markStep(p.abroad, 'DE', 'budget', false, NOW) };
  assert.equal(abroadJourney(p, NOW).stages[2].status, 'in-progress');
  assert.equal(p.abroad.journey?.steps?.DE.eligibility.status, 'done');
  // Automatic steps can't be ticked by hand.
  assert.equal(markStep(p.abroad, 'DE', 'goal', false, NOW), p.abroad);
});

test('roadmap: a stage marked done elsewhere shows its steps done; un-ticking one keeps the rest', () => {
  let p = dreamDE();
  p = { ...p, abroad: markStage(p.abroad, 'documents', true, NOW) };
  const r = countryRoadmap(p, 'DE', NOW);
  assert.ok(r.steps.filter((s) => s.stage === 'documents').every((s) => s.status === 'done'));
  p = { ...p, abroad: markStep(p.abroad, 'DE', 'lor', false, NOW) };
  const r2 = countryRoadmap(p, 'DE', NOW);
  assert.deepEqual(
    r2.steps.filter((s) => s.stage === 'documents').map((s) => [s.id, s.status === 'done']),
    [['academic-docs', true], ['sop-cv', true], ['lor', false], ['passport', true]],
  );
  assert.equal(abroadJourney(p, NOW).stages.find((s) => s.id === 'documents')?.status, 'in-progress');
});

test('roadmap: a target date close or missed needs attention (step and stage); marks are kept per country', () => {
  let p = dreamDE();
  p = { ...p, abroad: setStepDue(p.abroad, 'DE', 'sop-cv', '2026-10-01', NOW) };
  const step = countryRoadmap(p, 'DE', NOW).steps.find((s) => s.id === 'sop-cv')!;
  assert.equal(step.status, 'attention');
  assert.equal(step.attention?.key, 'sa.attention.dueSoon');
  assert.equal(abroadJourney(p, NOW).stages.find((s) => s.id === 'documents')?.status, 'attention');
  p = { ...p, abroad: setStepDue(p.abroad, 'DE', 'sop-cv', '2026-09-01', NOW) };
  assert.equal(countryRoadmap(p, 'DE', NOW).steps.find((s) => s.id === 'sop-cv')?.attention?.key, 'sa.attention.missed');
  p = { ...p, abroad: setStepDue(p.abroad, 'DE', 'sop-cv', undefined, NOW) };
  assert.equal(p.abroad.journey?.steps?.DE['sop-cv'].dueAt, undefined);
  // Switching to Korea and back keeps Germany's roadmap.
  p = { ...p, abroad: markStep(p.abroad, 'DE', 'eligibility', true, NOW) };
  p = { ...p, abroad: setDreamCountry(p.abroad, 'KR') };
  assert.equal(abroadJourney(p, NOW).stages[2].status, 'upcoming');
  p = { ...p, abroad: setDreamCountry(p.abroad, 'DE') };
  assert.equal(countryRoadmap(p, 'DE', NOW).steps.find((s) => s.id === 'eligibility')?.status, 'done');
  const loaded = withProfileDefaults('u1', JSON.parse(JSON.stringify(p)) as UserProfile);
  assert.equal(loaded.abroad.journey?.steps?.DE.eligibility.status, 'done');
});

console.log(`\n${passed} passed`);
