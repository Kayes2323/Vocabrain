import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { emptyProfile, type UserProfile } from '../lib/models';
import { addUniversity, markStage, markStep, setDocumentStatus, setDocumentValidUntil, setDreamCountry, setStepDue, updateUniversity } from '../lib/engine';
import { JOURNEY_PHASES, journeyPhases, phaseOfStep, PHASE_STAGES } from '../lib/abroad/phases';
import { roadmapDefs } from '../lib/abroad/roadmap';
import { COUNTRIES, getCountry } from '../lib/content/countries';
import { abroadSnapshotLine, abroadSummary } from '../lib/abroad/summary';

let passed = 0;
function test(name: string, fn: () => void) {
  fn();
  passed++;
  console.log(`PASS ${name}`);
}
const NOW = new Date('2026-09-27T10:00:00Z');
const base = (): UserProfile => emptyProfile('u1');
/** A student with a goal and South Korea as the dream country. */
const korea = (): UserProfile => {
  const p = base();
  p.goal = 'abroad';
  p.abroad = setDreamCountry({ ...p.abroad, degreeLevel: 'bachelors', subject: 'Mechanical Engineering' }, 'KR');
  return p;
};
const with_ = (p: UserProfile, fn: (a: UserProfile['abroad']) => UserProfile['abroad']): UserProfile => ({ ...p, abroad: fn(p.abroad) });
const status = (p: UserProfile) => Object.fromEntries(journeyPhases(p, NOW).phases.map((x) => [x.id, x.status]));
const tickPhase = (p: UserProfile, phase: string) =>
  with_(p, (a) => journeyPhases(p, NOW).phases.find((x) => x.id === phase)!.steps.filter((s) => !s.auto).reduce((acc, s) => markStep(acc, 'KR', s.id, true, NOW), a));

test('six phases, in this order', () => {
  assert.deepEqual([...JOURNEY_PHASES], ['english', 'documents', 'university', 'application', 'visa', 'departure']);
});

test('every roadmap step of every country maps to exactly one phase (or the setup), nothing lost', () => {
  for (const c of COUNTRIES) {
    for (const pathway of [undefined, ...(c.pathways ?? []).map((x) => x.id)]) {
      for (const d of roadmapDefs(c, { pathway })) {
        const phase = phaseOfStep(d);
        if (d.stage === 'discover' || d.stage === 'choose-country') assert.equal(phase, undefined, `${c.code} ${d.id} is setup`);
        else assert.ok(phase, `${c.code}/${pathway ?? '-'} step ${d.id} (${d.stage}) has a phase`);
      }
    }
  }
  assert.equal(phaseOfStep({ id: 'scholarships', stage: 'apply' }), 'university', 'scholarship search sits with choosing a university');
  assert.equal(phaseOfStep({ id: 'budget', stage: 'eligibility' }), 'university');
  assert.equal(phaseOfStep({ id: 'offer', stage: 'offer' }), 'application');
  assert.deepEqual(PHASE_STAGES.visa, ['visa']);
});

test('missing profile data: setup first, nothing is marked done, current = English', () => {
  const j = journeyPhases(base(), NOW);
  assert.equal(j.setup, 'goal');
  assert.ok(j.phases.every((p) => p.status === 'not-started'), JSON.stringify(status(base())));
  assert.equal(j.current.id, 'english');
  assert.equal(j.completed, 0);
  const noCountry = base();
  noCountry.abroad = { ...noCountry.abroad, degreeLevel: 'bachelors' };
  assert.equal(journeyPhases(noCountry, NOW).setup, 'country');
  assert.equal(journeyPhases(korea(), NOW).setup, null);
});

test('English not ready → current phase is English; next is Documents', () => {
  const j = journeyPhases(korea(), NOW);
  assert.equal(j.current.id, 'english');
  assert.equal(j.next?.id, 'documents');
  assert.equal(j.current.href, '/ielts');
});

test('English ready (stage done or test result ready) but documents incomplete → Documents', () => {
  const done = with_(korea(), (a) => markStage(a, 'english', true, NOW));
  assert.equal(status(done).english, 'completed');
  assert.equal(journeyPhases(done, NOW).current.id, 'documents');
  const result = with_(korea(), (a) => setDocumentStatus(a, 'english-test', 'ready', NOW));
  assert.equal(status(result).english, 'ready');
  assert.equal(journeyPhases(result, NOW).current.id, 'documents');
  // Some documents started → in progress, not ready.
  const partial = with_(done, (a) => setDocumentStatus(a, 'passport', 'ready', NOW));
  assert.equal(status(partial).documents, 'in-progress');
  assert.equal(journeyPhases(partial, NOW).current.id, 'documents');
});

test('documents: ready only when every document of the phase is ready; an expired one is not', () => {
  let p = with_(korea(), (a) => markStage(a, 'english', true, NOW));
  const docs = journeyPhases(p, NOW).phases.find((x) => x.id === 'documents')!.documents;
  assert.ok(docs.includes('passport') && docs.includes('transcript'), docs.join(','));
  for (const d of docs) p = with_(p, (a) => setDocumentStatus(a, d, 'ready', NOW));
  assert.equal(status(p).documents, 'ready');
  assert.equal(journeyPhases(p, NOW).current.id, 'university');
  const expired = with_(p, (a) => setDocumentValidUntil(a, 'passport', '2026-01-01', NOW));
  assert.equal(status(expired).documents, 'in-progress', 'a passport past its date needs updating');
});

test('shortlisted university → Choose University is ready → current = University Application', () => {
  let p = tickPhase(with_(korea(), (a) => markStage(a, 'english', true, NOW)), 'documents');
  assert.equal(status(p).documents, 'completed');
  assert.equal(journeyPhases(p, NOW).current.id, 'university');
  p = with_(p, (a) => addUniversity(a, { name: 'Test University', countryCode: 'KR', fit: 'match' }, NOW));
  assert.equal(status(p).university, 'in-progress', 'researching is not shortlisted yet');
  const id = p.abroad.universities![0].id;
  p = with_(p, (a) => updateUniversity(a, id, { status: 'shortlisted' }, NOW));
  assert.equal(status(p).university, 'ready');
  assert.equal(journeyPhases(p, NOW).current.id, 'application');
  // A university in another country does not count for the Korea journey.
  const other = with_(korea(), (a) => addUniversity(a, { name: 'Elsewhere', countryCode: 'DE', fit: 'match', status: 'shortlisted' }, NOW));
  assert.equal(status(other).university, 'not-started');
});

test('during application: applying → in progress; offer → ready → current = Visa', () => {
  let p = tickPhase(tickPhase(with_(korea(), (a) => markStage(a, 'english', true, NOW)), 'documents'), 'university');
  p = with_(p, (a) => addUniversity(a, { name: 'Test University', countryCode: 'KR', fit: 'match', status: 'applying' }, NOW));
  assert.equal(status(p).application, 'in-progress');
  assert.equal(journeyPhases(p, NOW).current.id, 'application');
  p = with_(p, (a) => updateUniversity(a, a.universities![0].id, { status: 'offer' }, NOW));
  assert.equal(status(p).application, 'ready');
  assert.equal(journeyPhases(p, NOW).current.id, 'visa');
  assert.equal(journeyPhases(p, NOW).current.href, '/abroad/visa/kr');
});

test('visa done → Departure; departure done → the whole journey is complete', () => {
  let p = with_(korea(), (a) => markStage(a, 'english', true, NOW));
  for (const ph of ['documents', 'university', 'application', 'visa']) p = tickPhase(p, ph);
  const j = journeyPhases(p, NOW);
  assert.equal(j.current.id, 'departure');
  assert.equal(j.next, undefined);
  assert.equal(j.completed, 5);
  p = tickPhase(p, 'departure');
  assert.equal(journeyPhases(p, NOW).complete, true);
});

test('status never claims more than the data: a ticked step only makes a phase in progress', () => {
  const p = with_(korea(), (a) => markStep(a, 'KR', 'visa', true, NOW));
  assert.equal(status(p).visa, 'completed', 'the one visa step is ticked');
  const q = with_(korea(), (a) => markStep(a, 'KR', 'academic-docs', true, NOW));
  assert.equal(status(q).documents, 'in-progress');
  // A later phase ticked does not skip English.
  assert.equal(journeyPhases(q, NOW).current.id, 'english');
  // The artificial "current step" highlight of the roadmap is not activity.
  assert.equal(status(korea()).documents, 'not-started');
});

test('a close personal date shows attention on its phase', () => {
  const p = with_(korea(), (a) => setStepDue(a, 'KR', 'passport', '2026-09-30', NOW));
  const docs = journeyPhases(p, NOW).phases.find((x) => x.id === 'documents')!;
  assert.equal(docs.attention?.key, 'sa.attention.dueSoon');
  assert.equal(docs.status, 'in-progress');
});

test('Mino gets the same phase view (no scores, no invented values)', () => {
  const p = with_(korea(), (a) => markStage(a, 'english', true, NOW));
  const s = abroadSummary(p, NOW);
  assert.equal(s.phase.current, 'documents');
  assert.equal(s.phase.statuses.english, 'completed');
  assert.equal(s.phase.next, 'university');
  const line = abroadSnapshotLine(p, NOW);
  assert.match(line, /journey phase "documents" \(not-started\), next "university"/);
  assert.ok(!/score|readiness|%/i.test(JSON.stringify(s.phase)));
});

test('journey UI uses the phase engine, no readiness score, one primary action', () => {
  const home = readFileSync('components/abroad/JourneyHome.tsx', 'utf8');
  assert.match(home, /journeyPhases\(/);
  assert.ok(!/readiness|score/i.test(home));
  assert.equal(home.match(/data-testid="abroad-continue"/g)?.length, 1);
  assert.ok(getCountry('KR'));
});

console.log(`\n${passed} passed`);
