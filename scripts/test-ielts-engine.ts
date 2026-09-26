/** IELTS engine checks (pure, no network). Run: pnpm test:ielts */
import assert from 'node:assert/strict';
import { ALL_BOOKS, BOOKS, getTest } from '../lib/ielts/content/index';
import {
  analyseTests, answeredNumbers, countWords, createSession, expandAccepted, isPublishable, normalise, questionSlots, rawToBand,
  remainingSeconds, scoreSection, setAnswer, submit, tick, toggleFlag, validateBook, validateTest, withinLimit,
  type ObjectiveSection, type PracticeTest,
} from '../lib/ielts/index';

let passed = 0;
const test = (name: string, fn: () => void) => {
  try {
    fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (e) {
    console.log(`FAIL ${name}\n  ${(e as Error).message}`);
    process.exitCode = 1;
  }
};

const t1 = getTest('vb-practice-1')!;
const reading = t1.sections.reading as ObjectiveSection;
const KEY: Record<string, string | string[]> = {
  'r1-q1': 'ii', 'r1-q2': 'iv', 'r1-q3': 'v', 'r1-q4': 'i', 'r1-q5': 'TRUE', 'r1-q6': 'TRUE', 'r1-q7': 'FALSE', 'r1-q8': 'NOT GIVEN',
  'r1-q9': 'insulation', 'r1-q10': 'rainwater', 'r1-q11': 'grants', 'r1-q12': 'education',
  'r2-q13': 'B', 'r2-q14': 'C', 'r2-q15': 'C', 'r2-g2': ['C', 'A'], 'r2-q18': 'Karl Drais', 'r2-q19': 'chain', 'r2-q20': 'rubber tyres',
  'r2-q21': '1817', 'r2-q22': 'front', 'r2-q23': '1885', 'r2-q24': '1890s',
};

test('all library content validates', () => {
  for (const book of ALL_BOOKS) assert.deepEqual(validateBook(book), []);
});

test('validator catches broken content', () => {
  const broken = structuredClone(t1) as PracticeTest;
  const r = broken.sections.reading!;
  r.parts[0].groups[1].questions[0].answer.accepted = ['MAYBE'];
  r.parts[0].groups[1].questions[1].number = 5;
  r.parts[0].groups[2].template = 'only {{9}} here';
  const errors = validateTest(broken).join('\n');
  assert.match(errors, /"MAYBE" is not an option/);
  assert.match(errors, /numbers must run/);
  assert.match(errors, /gaps/);
});

test('unlicensed publisher content is never published', () => {
  assert.equal(isPublishable({ sourceType: 'licensed-publisher', licenseStatus: 'pending-review' }), false);
  assert.equal(isPublishable({ sourceType: 'licensed-publisher', licenseStatus: 'original' }), false);
  assert.equal(isPublishable({ sourceType: 'licensed-publisher', licenseStatus: 'licensed' }), true);
  assert.ok(BOOKS.every((b) => isPublishable(b) && b.tests.every(isPublishable)));
});

test('normalise and optional words', () => {
  assert.equal(normalise('  The   Library. '), 'the library');
  assert.equal(normalise('1,000'), '1000');
  assert.equal(normalise('air‑filled'), 'air-filled');
  assert.deepEqual(expandAccepted('(the) library').sort(), ['library', 'the library']);
});

test('word limits count hyphenated words once and numbers separately', () => {
  assert.deepEqual(countWords('air-filled rubber tyres'), { words: 3, numbers: 0 });
  assert.equal(withinLimit('rubber tyres', { words: 2, number: true }), true);
  assert.equal(withinLimit('air-filled rubber tyres', { words: 2, number: true }), false);
  assert.equal(withinLimit('2 bedrooms', { words: 1, number: true }), true);
  assert.equal(withinLimit('two bedrooms', { words: 1 }), false);
});

test('perfect answers score 24/24', () => {
  const r = scoreSection(reading, KEY);
  assert.equal(r.total, 24);
  assert.equal(r.correct, 24);
  assert.equal(r.estimatedBand, undefined, 'no band for a partial section');
  assert.deepEqual(r.byPart.map((p) => [p.number, p.correct, p.total]), [[1, 12, 12], [2, 12, 12]]);
});

test('answers are case/space tolerant; spelling and limits are strict', () => {
  const r = scoreSection(reading, { ...KEY, 'r1-q9': ' INSULATION ', 'r1-q10': 'rainwatter', 'r2-q20': 'air-filled rubber tyres', 'r2-q18': 'drais', 'r1-q5': 'true' });
  const q = (n: number) => r.questions.find((x) => x.number === n)!;
  assert.equal(q(9).correct, true);
  assert.equal(q(10).correct, false);
  assert.equal(q(10).nearMiss, true);
  assert.equal(q(20).correct, false);
  assert.equal(q(20).overLimit, true);
  assert.equal(q(18).correct, true);
  assert.equal(q(5).correct, true);
});

test('choose-TWO is order-free and pooled', () => {
  const one = scoreSection(reading, { 'r2-g2': ['A', 'D'] });
  const q = (n: number) => one.questions.find((x) => x.number === n)!;
  assert.equal([q(16), q(17)].filter((x) => x.correct).length, 1);
  const both = scoreSection(reading, { 'r2-g2': ['C', 'A', 'B'] });
  assert.equal(both.questions.filter((x) => x.number >= 16 && x.number <= 17 && x.correct).length, 2, 'extra letters beyond TWO are ignored');
});

test('breakdown by question type', () => {
  const r = scoreSection(reading, { ...KEY, 'r1-q1': 'iii', 'r1-q2': 'vi' });
  const mh = r.byType.find((t) => t.type === 'matching-headings')!;
  assert.deepEqual([mh.correct, mh.total], [2, 4]);
  assert.equal(r.questions.filter((x) => x.unanswered).length, 0);
  const empty = scoreSection(reading, {});
  assert.equal(empty.questions.filter((x) => x.unanswered).length, 24);
});

test('band conversion for 40-question sections', () => {
  assert.equal(rawToBand('listening', 40), 9);
  assert.equal(rawToBand('listening', 30), 7);
  assert.equal(rawToBand('reading', 30, 'academic'), 7);
  assert.equal(rawToBand('reading', 30, 'general'), 6);
  assert.equal(rawToBand('reading', 23), 6);
  assert.equal(rawToBand('reading', 0), 0);
});

test('session: answer, flag, time, submit', () => {
  let s = createSession(t1, 'reading', new Date('2026-09-26T10:00:00Z'));
  assert.equal(s.timeLimitSeconds, 40 * 60);
  s = setAnswer(s, 'r1-q1', 'ii');
  s = setAnswer(s, 'r2-g2', ['A']);
  s = setAnswer(s, 'r1-q2', 'iv');
  s = setAnswer(s, 'r1-q2', '  ');
  assert.deepEqual([...answeredNumbers(reading, s.answers)].sort((a, b) => a - b), [1, 16]);
  s = toggleFlag(toggleFlag(toggleFlag(s, 7), 3), 7);
  assert.deepEqual(s.flagged, [3]);
  s = tick(s, 100);
  assert.equal(remainingSeconds(s), 2300);
  s = tick(s, 99999);
  assert.equal(remainingSeconds(s), 0);
  s = submit(s, t1, { timedOut: true });
  assert.equal(s.status, 'submitted');
  assert.equal(s.result?.correct, 2);
  assert.equal(setAnswer(s, 'r1-q3', 'v'), s, 'submitted sessions are read-only');
  assert.deepEqual(JSON.parse(JSON.stringify(s)), s, 'sessions serialise cleanly for Firestore');
});

test('question slots cover 1..24 in order', () => {
  const slots = questionSlots(reading);
  assert.deepEqual(slots.map((s) => s.number), Array.from({ length: 24 }, (_, i) => i + 1));
  assert.equal(slots.find((s) => s.number === 17)?.answerKey, 'r2-g2');
});

test('analysis: history, weak areas and evidence-based patterns', () => {
  const run = (answers: Record<string, string | string[]>, at: string, opts: { timedOut?: boolean } = {}) => {
    let s = createSession(t1, 'reading', new Date(at));
    for (const [k, v] of Object.entries(answers)) s = setAnswer(s, k, v);
    return submit(s, t1, opts);
  };
  const weakHeadings = { ...KEY, 'r1-q1': 'iii', 'r1-q2': 'vi', 'r1-q3': 'vii', 'r1-q8': 'TRUE', 'r1-q10': 'rainwatter', 'r2-q13': 'A' };
  delete (weakHeadings as Record<string, unknown>)['r2-q24'];
  const first = run(weakHeadings, '2026-09-20T10:00:00Z', { timedOut: true });
  const second = run({ ...KEY, 'r1-q1': 'iii', 'r1-q3': 'vi' }, '2026-09-22T10:00:00Z');
  const a = analyseTests([second, first, createSession(t1, 'reading')], getTest);

  assert.equal(a.attempts.length, 2, 'in-progress sessions are ignored');
  assert.equal(a.attempts[0].sessionId, second.id, 'newest first');
  const mh = a.byType.find((x) => x.type === 'matching-headings')!;
  assert.deepEqual([mh.correct, mh.total, mh.tests], [3, 8, 2]);
  assert.deepEqual([mh.latest.correct, mh.latest.total], [2, 4]);
  assert.equal(a.weakAreas[0].type, 'matching-headings');
  assert.equal(a.weakAreas[0].guideTopic, 'matching-headings');
  assert.equal(a.weakAreas[0].confidence, 'medium');

  const p = (id: string) => a.patterns.find((x) => x.id === id);
  assert.equal(p('spelling')?.count, 1);
  assert.match(p('spelling')!.evidence[0], /Q10: wrote "rainwatter" \(answer: rainwater\)/);
  assert.equal(p('not-given-confusion')?.count, 1);
  assert.equal(p('distractor')?.count, 2, 'Q8 TRUE and Q13 A are content-marked traps');
  assert.equal(p('ran-out-of-time')?.count, 1);
  assert.equal(p('unanswered'), undefined);
  assert.match(a.dataNote, /2 submitted tests, 48 questions/);
});

test('analysis with no data says so', () => {
  const a = analyseTests([], getTest);
  assert.equal(a.weakAreas.length, 0);
  assert.match(a.dataNote, /No submitted practice tests yet/);
});

console.log(`\n${passed} passed`);
