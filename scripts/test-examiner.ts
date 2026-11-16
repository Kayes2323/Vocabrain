/** Voice-examiner logic checks (no browser, no network). Run: npm run test:examiner */
import assert from 'node:assert/strict';
import { frameRms, isSpeechLevel, nextNoiseFloor, answerStatus, examinerScript, NO_SPEECH_MS, SILENCE_MS, SPEAKING_LIMITS, speechThreshold } from '../lib/ielts/examiner';
import { mock1Speaking } from '../lib/ielts/content/vb-mock/test1-writing-speaking';

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

const script = examinerScript(mock1Speaking);
const all = (turn: { lead: string[] }) => turn.lead.join(' ');

test('one turn per answerable slot, in the same order and keys as the tap-through runner', () => {
  const expected = mock1Speaking.parts.flatMap((p) => (p.cueCard ? [`${p.id}-0`] : p.questions.map((_, i) => `${p.id}-${i}`)));
  assert.deepEqual(script.turns.map((t) => t.key), expected);
});

test('Part 1 opens with its own introduction, then asks the real questions word for word', () => {
  const p1 = script.turns.filter((t) => t.part === 1);
  assert.match(all(p1[0]), /first part/);
  assert.equal(p1[0].lead[p1[0].lead.length - 1], mock1Speaking.parts[0].questions[0]);
  assert.ok(p1.slice(1).every((t) => t.lead.length === 1), 'later questions are asked with no extra chatter');
});

test('Part 2: instructions and one minute of preparation, the card is shown but never read out', () => {
  const p2 = script.turns.find((t) => t.part === 2)!;
  assert.equal(p2.prepSeconds, 60);
  assert.equal(p2.limitSeconds, 120);
  assert.ok(p2.cueCard, 'cue card is kept for the screen');
  assert.match(all(p2), /one minute to think/);
  assert.ok(!all(p2).includes(p2.cueCard!.task), 'card text is not spoken');
  assert.match(p2.afterPrep.join(' '), /start speaking now/);
});

test('Part 3 leads in from the Part 2 topic, then asks every question', () => {
  const p3 = script.turns.filter((t) => t.part === 3);
  assert.equal(p3.length, mock1Speaking.parts[2].questions.length);
  assert.match(all(p3[0]), /talking about a piece of advice/);
  assert.equal(p3[0].lead[p3[0].lead.length - 1], mock1Speaking.parts[2].questions[0]);
});

test('the examiner opens and closes the test, and never asks the student to tap anything', () => {
  assert.ok(script.opening.length > 0 && script.closing.length > 0);
  assert.match(script.closing.join(' '), /end of the speaking test/);
  const spoken = [...script.opening, ...script.closing, ...script.turns.flatMap((t) => [...t.lead, ...t.afterPrep])].join(' ');
  assert.ok(!/\b(click|tap|press|button)\b/i.test(spoken));
});

test('an answer ends on silence once the student has spoken, never mid-sentence', () => {
  for (const part of [1, 2, 3] as const) {
    const base = { part, limitSeconds: SPEAKING_LIMITS[part], elapsedMs: 20_000, spoke: true };
    assert.equal(answerStatus({ ...base, silenceMs: SILENCE_MS[part] - 1 }), 'continue');
    assert.equal(answerStatus({ ...base, silenceMs: SILENCE_MS[part] }), 'silence');
  }
});

test('Part 2 waits longer for a pause than Part 1, so a long talk is not cut off', () => {
  assert.ok(SILENCE_MS[2] > SILENCE_MS[1] && SILENCE_MS[3] > SILENCE_MS[1]);
});

test('the hard limit always ends the answer, even while the student is still talking', () => {
  assert.equal(answerStatus({ part: 2, limitSeconds: 120, elapsedMs: 120_000, spoke: true, silenceMs: 0 }), 'limit');
  assert.equal(answerStatus({ part: 1, limitSeconds: 60, elapsedMs: 59_900, spoke: true, silenceMs: 0 }), 'continue');
});

test('no speech at all: the examiner waits, then moves on', () => {
  assert.equal(answerStatus({ part: 1, limitSeconds: 60, elapsedMs: NO_SPEECH_MS[1] - 1, spoke: false, silenceMs: NO_SPEECH_MS[1] - 1 }), 'continue');
  assert.equal(answerStatus({ part: 1, limitSeconds: 60, elapsedMs: NO_SPEECH_MS[1], spoke: false, silenceMs: NO_SPEECH_MS[1] }), 'no-speech');
});

test('voice detection: speech clears the threshold, a quiet room and a steady hum do not', () => {
  assert.equal(frameRms([]), 0);
  assert.ok(Math.abs(frameRms([0.5, -0.5, 0.5, -0.5]) - 0.5) < 1e-9);
  assert.ok(isSpeechLevel(0.12, 0.004));
  assert.ok(!isSpeechLevel(0.005, 0.004));
  // A noisy room (floor 0.03) needs a louder voice than a quiet one.
  assert.ok(speechThreshold(0.03) > speechThreshold(0.004));
  assert.ok(!isSpeechLevel(0.06, 0.03));
});

test('the noise floor follows quiet moments but is never dragged up by the student speaking', () => {
  let floor = 0.01;
  for (let i = 0; i < 50; i++) floor = nextNoiseFloor(floor, 0.15);
  assert.equal(floor, 0.01, 'loud frames leave it alone');
  for (let i = 0; i < 100; i++) floor = nextNoiseFloor(floor, 0.003);
  assert.ok(floor < 0.006, 'quiet frames pull it down');
});

console.log(`\n${passed} passed`);
