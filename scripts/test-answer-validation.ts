// The shared answer validator (lib/answers) and every grader that uses it.
// Run: npx -y tsx scripts/test-answer-validation.ts
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fromAcceptedList, normalizeAnswer, validateAnswer, validateChoice, type AnswerSpec } from '../lib/answers';
import { answerSpec, checkExercise, gradeExercise } from '../lib/foundation/grade';
import type { Exercise } from '../lib/foundation/model';
import { MODULES } from '../lib/foundation/content';
import { gradeGap } from '../lib/content/reading-library';
import { scoreSection, type ObjectiveSection } from '../lib/ielts';

let passed = 0;
let failed = 0;
function test(name: string, fn: () => void) {
  try {
    fn();
    passed++;
    console.log('PASS', name);
  } catch (e) {
    failed++;
    console.log('FAIL', name, '\n ', (e as Error).message);
  }
}
const ok = (question: AnswerSpec, userAnswer: string | null | undefined) => validateAnswer({ question, userAnswer }).correct;

// The example from the brief: "The tour starts at the main ____." → gate / entrance / main gate.
const GATE: AnswerSpec = { correctAnswer: 'gate', acceptedAnswers: ['entrance'], context: { before: 'The tour starts at the main', after: '.' } };

test('gate example: gate, Gate, " GATE ", entrance, main gate → correct; station → wrong', () => {
  for (const a of ['gate', 'Gate', ' GATE ', 'entrance', 'main gate', 'the main gate', 'Main Gate.']) assert.equal(ok(GATE, a), true, a);
  assert.equal(ok(GATE, 'station'), false);
  assert.equal(ok(GATE, 'gates'), false, 'a plural is a different answer unless listed');
  assert.equal(ok(GATE, 'main'), false, 'only the repeated words are dropped, never the whole answer');
});

test('feedback: main answer → correct; alternative → accepted with the main answer; wrong → your answer + every accepted answer', () => {
  const main = validateAnswer({ question: GATE, userAnswer: ' Gate ' });
  assert.deepEqual(main.feedback, { kind: 'correct', answer: 'Gate' });
  assert.equal(main.matchedAnswer, 'gate');
  assert.equal(main.primary, true);
  const alt = validateAnswer({ question: GATE, userAnswer: 'entrance' });
  assert.deepEqual(alt.feedback, { kind: 'accepted', answer: 'entrance', mainAnswer: 'gate' });
  assert.equal(alt.correct, true, 'an accepted alternative is never marked wrong');
  const echo = validateAnswer({ question: GATE, userAnswer: 'main gate' });
  assert.equal(echo.matchedAnswer, 'gate');
  const wrong = validateAnswer({ question: GATE, userAnswer: 'station' });
  assert.deepEqual(wrong.feedback, { kind: 'wrong', answer: 'station', accepted: ['gate', 'entrance'] });
});

test('case, extra spaces, punctuation at the ends, curly quotes are forgiven', () => {
  const q: AnswerSpec = { correctAnswer: "the students' union" };
  for (const a of ["The Students' Union", '  the   students’ union ', '"the students\' union."', 'the students’ union!']) assert.equal(ok(q, a), true, a);
  assert.equal(normalizeAnswer('  Hello ,  World . '), 'hello, world');
});

test('punctuation inside an answer still counts (meaning is never changed)', () => {
  assert.equal(ok({ correctAnswer: "countries'" }, 'countries'), false, 'a possessive apostrophe is part of the answer');
  assert.equal(ok({ correctAnswer: "it's" }, 'its'), false);
  assert.equal(ok({ correctAnswer: ';' }, ':'), false, 'punctuation-only answers are compared as written');
  assert.equal(ok({ correctAnswer: ';' }, ' ; '), true);
});

test('empty and null answers are wrong (and marked empty)', () => {
  for (const a of ['', '   ', null, undefined]) {
    const v = validateAnswer({ question: GATE, userAnswer: a });
    assert.equal(v.correct, false);
    assert.equal(v.empty, true);
    assert.deepEqual(v.feedback, { kind: 'empty' });
  }
});

test('only correctAnswer (backward compatible): it is the only accepted answer', () => {
  const q: AnswerSpec = { correctAnswer: 'library' };
  assert.equal(ok(q, 'Library'), true);
  assert.equal(ok(q, 'libraries'), false);
  assert.equal(ok(q, 'bookshop'), false);
  assert.deepEqual(validateAnswer({ question: q, userAnswer: 'x' }).accepted, ['library']);
  assert.deepEqual(fromAcceptedList(['gate', 'entrance']), { correctAnswer: 'gate', acceptedAnswers: ['entrance'] });
});

test('with acceptedAnswers: every listed answer is right, nothing else (no guessed synonyms)', () => {
  const q: AnswerSpec = { correctAnswer: 'car', acceptedAnswers: ['vehicle'] };
  assert.equal(ok(q, 'vehicle'), true);
  assert.equal(ok(q, 'automobile'), false, 'synonyms are never auto-accepted');
  assert.equal(ok(q, 'cars'), false);
});

test('"car" / "the car": articles are optional only where the question says so; "cars" never', () => {
  const q: AnswerSpec = { correctAnswer: 'car', optionalArticles: true };
  assert.equal(ok(q, 'the car'), true);
  assert.equal(ok(q, 'a car'), true);
  assert.equal(ok(q, 'cars'), false);
  assert.equal(ok({ correctAnswer: 'car' }, 'the car'), false, 'off by default (article lessons depend on it)');
  assert.equal(ok({ correctAnswer: '(the) library', optionalWords: true }, 'library'), true);
  assert.equal(ok({ correctAnswer: '(the) library', optionalWords: true }, 'the library'), true);
});

test('spelling-sensitive: a misspelling is wrong (flagged as a near miss); tolerant only when the exercise allows it', () => {
  const strict = validateAnswer({ question: { correctAnswer: 'accommodation' }, userAnswer: 'accomodation' });
  assert.equal(strict.correct, false);
  assert.equal(strict.nearMiss, true);
  assert.equal(validateAnswer({ question: { correctAnswer: 'accommodation' }, userAnswer: 'hotel' }).nearMiss, false);
  assert.equal(ok({ correctAnswer: 'accommodation', spelling: 'tolerant' }, 'accomodation'), true);
  assert.equal(ok({ correctAnswer: 'cat', spelling: 'tolerant' }, 'car'), false, 'short words are never tolerated');
});

test('exact mode: capitals, punctuation and dashes count; spaces and curly quotes do not', () => {
  const q: AnswerSpec = { correctAnswer: 'My name is Rafi.', mode: 'exact' };
  assert.equal(ok(q, 'My name is Rafi.'), true);
  assert.equal(ok(q, ' My  name is Rafi. '), true);
  assert.equal(ok(q, 'my name is rafi.'), false);
  assert.equal(ok(q, 'My name is Rafi'), false);
  assert.equal(ok({ correctAnswer: '2010–2020', mode: 'exact' }, '2010-2020'), false);
  assert.equal(ok({ correctAnswer: "Rafi's book", mode: 'exact' }, 'Rafi’s book'), true);
});

test('equivalents are opt-in: numbers, UK/US spelling, contractions', () => {
  assert.equal(ok({ correctAnswer: '15', equivalents: ['numbers'] }, 'fifteen'), true);
  assert.equal(ok({ correctAnswer: 'twenty-five', equivalents: ['numbers'] }, '25'), true);
  assert.equal(ok({ correctAnswer: '15' }, 'fifteen'), false, 'off by default');
  assert.equal(ok({ correctAnswer: 'colour', equivalents: ['spelling'] }, 'color'), true);
  assert.equal(ok({ correctAnswer: 'city centre', equivalents: ['spelling'] }, 'city center'), true);
  assert.equal(ok({ correctAnswer: "isn't", equivalents: ['contractions'] }, 'is not'), true);
  assert.equal(ok({ correctAnswer: "isn't" }, 'is not'), false, 'short-form exercises stay exact');
});

test('word limit: a right answer over the limit is wrong (flagged over limit)', () => {
  const v = validateAnswer({ question: { correctAnswer: 'gate', withinLimit: (a) => a.trim().split(/\s+/).length <= 1 }, userAnswer: 'the gate' });
  assert.equal(v.correct, false);
  assert.equal(validateAnswer({ question: { correctAnswer: 'the gate', withinLimit: (a) => a.trim().split(/\s+/).length <= 1 }, userAnswer: 'the gate' }).overLimit, true);
});

test('semantic mode (architecture only): grades like accepted_answers and flags a non-match for a later meaning check', () => {
  const q: AnswerSpec = { correctAnswer: 'gate', acceptedAnswers: ['entrance'], mode: 'semantic' };
  assert.equal(ok(q, 'entrance'), true);
  const v = validateAnswer({ question: q, userAnswer: 'doorway' });
  assert.equal(v.correct, false);
  assert.equal(v.needsSemantic, true);
});

test('multiple choice is graded by option id, exactly', () => {
  assert.deepEqual(validateChoice('B', 'B'), { correct: true, empty: false });
  assert.equal(validateChoice('B', 'C').correct, false);
  assert.equal(validateChoice('a', 'A').correct, false, '"a" and "A" are different options');
  assert.equal(validateChoice(['A', 'D'], 'D').correct, true);
  assert.deepEqual(validateChoice('B', ''), { correct: false, empty: true });
  assert.deepEqual(validateChoice('B', null), { correct: false, empty: true });
});

// ---------------------------------------------------------------- the graders that use it
const all: Exercise[] = MODULES.flatMap((m) => m.lessons.flatMap((l) => l.steps.flatMap((s) => (s.kind === 'practice' ? s.exercises : []))));
const find = (id: string) => all.find((e) => e.id === id)!;

test('Foundation gap (pn-1-r2, a Listening item): gate, Gate, " GATE ", main gate → correct; station / entrance → wrong (only the word heard)', () => {
  const ex = find('pn-1-r2');
  assert.equal(ex.type, 'gap');
  for (const a of ['gate', 'Gate', ' GATE ', 'main gate']) assert.equal(gradeExercise(ex, a), true, a);
  assert.equal(gradeExercise(ex, 'station'), false);
  assert.equal(gradeExercise(ex, 'entrance'), false, 'the recording said "gate": a synonym is not what was heard');
  assert.deepEqual(answerSpec(ex).context, { before: 'The tour starts at the main ', after: '.' });
});

test('Foundation: an alternative from the content is accepted and shown as acceptable, not wrong', () => {
  const ex = all.find((e) => e.type === 'correct' && e.accepted.length > 1 && !e.strict)!;
  assert.ok(ex && ex.type === 'correct');
  const v = checkExercise(ex, ex.accepted[1])!;
  assert.equal(v.correct, true);
  assert.equal(v.feedback.kind, 'accepted');
  assert.equal(gradeExercise(ex, ex.accepted[1]), true);
});

test('Foundation: strict (punctuation) exercises still need capitals and punctuation', () => {
  const ex = all.find((e) => e.type === 'correct' && e.strict)!;
  assert.ok(ex && ex.type === 'correct');
  assert.equal(gradeExercise(ex, ex.accepted[0]), true);
  assert.equal(gradeExercise(ex, ex.accepted[0].toLowerCase()), ex.accepted[0] === ex.accepted[0].toLowerCase());
});

test('Foundation: short-form answers stay exact (no contraction equivalence) and British/American spelling is accepted', () => {
  const sb = find('sb-10-r2');
  assert.equal(answerSpec(sb).equivalents?.includes('contractions') ?? false, false);
  const fav = all.find((e) => e.type === 'correct' && !e.strict && e.accepted.some((a) => /favourite/.test(a)))!;
  if (fav && fav.type === 'correct') assert.equal(gradeExercise(fav, fav.accepted[0].replace('favourite', 'favorite')), true);
});

test('Foundation: every other question type keeps its grading (choice, order, tag, spot, write)', () => {
  const choice = all.find((e) => e.type === 'choice')!;
  if (choice.type === 'choice') {
    assert.equal(gradeExercise(choice, choice.answer), true);
    assert.equal(gradeExercise(choice, choice.options.find((o) => o !== choice.answer)), false);
  }
  const order = all.find((e) => e.type === 'order')!;
  if (order.type === 'order') assert.equal(gradeExercise(order, ` ${order.answer.toUpperCase()} `), true);
  const spot = all.find((e) => e.type === 'spot')!;
  if (spot.type === 'spot') {
    assert.equal(gradeExercise(spot, `${spot.wrong}:${spot.accepted[0].toUpperCase()}`), !spot.strict || spot.accepted[0] === spot.accepted[0].toUpperCase());
    assert.equal(gradeExercise(spot, `${spot.wrong + 1}:${spot.accepted[0]}`), false, 'the wrong word must be chosen');
  }
  const write = all.find((e) => e.type === 'write')!;
  assert.equal(gradeExercise(write, 'anything'), null);
});

test('Reading Library gaps use it: case, spelling variants, word limit, blank', () => {
  const g = { kind: 'gap', maxWords: 2 } as never;
  const item = { id: 'x', accepted: ['city centre', 'centre'] } as never;
  assert.deepEqual(gradeGap(g, item, 'City Center'), { correct: true });
  assert.deepEqual(gradeGap(g, item, 'centre.'), { correct: true });
  assert.deepEqual(gradeGap(g, item, 'town'), { correct: false, reason: 'wrong' });
  assert.deepEqual(gradeGap(g, item, 'the city centre'), { correct: false, reason: 'limit' });
  assert.deepEqual(gradeGap(g, item, ''), { correct: false, reason: 'blank' });
});

test('IELTS practice tests use it: optional words, numbers, near miss, word limit, option letters', () => {
  const section = {
    skill: 'listening',
    parts: [
      {
        id: 'p1',
        number: 1,
        groups: [
          { id: 'g1', type: 'form-completion', wordLimit: { words: 1, number: true }, questions: [
            { id: 'q1', number: 1, answer: { accepted: ['(the) library'] } },
            { id: 'q2', number: 2, answer: { accepted: ['15'] } },
            { id: 'q3', number: 3, answer: { accepted: ['accommodation'] } },
            { id: 'q4', number: 4, answer: { accepted: ['gate'] } },
          ] },
          { id: 'g2', type: 'multiple-choice', options: [{ id: 'A' }, { id: 'B' }], questions: [{ id: 'q5', number: 5, answer: { accepted: ['B'] } }] },
        ],
      },
    ],
  } as unknown as ObjectiveSection;
  const r = scoreSection(section, { q1: 'Library', q2: 'fifteen', q3: 'accomodation', q4: 'the main gate', q5: 'b' });
  const by = Object.fromEntries(r.questions.map((q) => [q.questionId, q]));
  assert.equal(by.q1.correct, true);
  assert.equal(by.q2.correct, true, 'digits or words');
  assert.equal(by.q3.correct, false);
  assert.equal(by.q3.nearMiss, true);
  assert.equal(by.q4.correct, false, 'IELTS word limits are enforced: no repeated words here');
  assert.equal(by.q4.overLimit, true);
  assert.equal(by.q5.correct, true);
});

test('no answer checking inside components: the lesson and test UIs call the shared graders', () => {
  const view = readFileSync('components/foundation/ExerciseView.tsx', 'utf8');
  assert.ok(view.includes('gradeExercise(exercise, value)') && view.includes('checkExercise(') && view.includes('<AnswerFeedback'));
  assert.ok(!/accepted\.some\(|toLowerCase\(\)\s*===/.test(view));
  const fb = readFileSync('components/answers/AnswerFeedback.tsx', 'utf8');
  assert.ok(fb.includes("'answers.acceptedHere'") && fb.includes("'answers.mainAnswer'") && fb.includes("'answers.yourAnswer'"));
  const bn = readFileSync('lib/i18n/locales/bn.ts', 'utf8');
  assert.ok(bn.includes('আপনার উত্তর গ্রহণযোগ্য') && bn.includes('গ্রহণযোগ্য উত্তর: {list}') && bn.includes('মূল উত্তর: {answer}'));
  assert.ok(!/তুমি|তোমার/.test(bn.slice(bn.indexOf('  answers: {'), bn.indexOf('  foundation: {'))));
});

console.log(`\n${passed} passed${failed ? `, ${failed} failed` : ''}`);
process.exit(failed ? 1 : 0);
