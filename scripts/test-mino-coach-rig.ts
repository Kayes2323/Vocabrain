import assert from 'node:assert/strict';
import { COACH_RIG_STATES, evaluationSequence, LESSON_START_SEQUENCE, rigStateHoldMs, WELCOME_SEQUENCE } from '../components/mino/dev/coach-preview-state';

let passed = 0;
function test(name: string, fn: () => void) {
  fn();
  passed++;
  console.log(`PASS ${name}`);
}

test('the rig understands exactly the 10 states from the spec', () => {
  assert.deepEqual(
    [...COACH_RIG_STATES].sort(),
    ['encouraging', 'entrance', 'explaining', 'greeting', 'idle', 'landing', 'speaking', 'success', 'thinking', 'writing'].sort(),
  );
});

test('one-shot states (entrance/landing/greeting/success/encouraging) settle on their own; held states wait for the caller', () => {
  for (const s of ['entrance', 'landing', 'greeting', 'success', 'encouraging'] as const) {
    assert.ok(rigStateHoldMs(s) > 0, s);
  }
  for (const s of ['idle', 'speaking', 'explaining', 'writing', 'thinking'] as const) {
    assert.equal(rigStateHoldMs(s), 0, s);
  }
});

test('entrance/landing/success durations match the spec ranges (ms)', () => {
  assert.ok(rigStateHoldMs('entrance') >= 900 && rigStateHoldMs('entrance') <= 1200);
  assert.ok(rigStateHoldMs('landing') >= 350 && rigStateHoldMs('landing') <= 500);
  assert.ok(rigStateHoldMs('greeting') >= 900 && rigStateHoldMs('greeting') <= 1300);
  assert.ok(rigStateHoldMs('success') >= 800 && rigStateHoldMs('success') <= 1000);
});

test('the welcome choreography is entrance -> landing -> greeting -> speaking, in that order', () => {
  assert.deepEqual(WELCOME_SEQUENCE, ['entrance', 'landing', 'greeting', 'speaking']);
});

test('the lesson-start choreography is explaining -> writing', () => {
  assert.deepEqual(LESSON_START_SEQUENCE, ['explaining', 'writing']);
});

test('the evaluation choreography ends in the actual outcome, never a guessed one', () => {
  assert.deepEqual(evaluationSequence('success'), ['thinking', 'success']);
  assert.deepEqual(evaluationSequence('encouraging'), ['thinking', 'encouraging']);
});

console.log(`\n${passed} passed`);
