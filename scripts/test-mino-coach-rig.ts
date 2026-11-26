import assert from 'node:assert/strict';
import {
  COACH_RIG_STATES, evaluationSequence, isRigDormant, isRigOneShot, LESSON_START_SEQUENCE, REDUCED_MOTION_SETTLE_MS, RIG_DORMANT_STATES, RIG_ONE_SHOT_STATES,
  RIG_POINT_DIRECTIONS, rigBlinkAllowed, rigSettleTarget, rigStateHoldMs, WELCOME_SEQUENCE,
} from '../components/mino/rig/coach-preview-state';

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

test('one-shot classification matches the hold table and the exported list', () => {
  for (const s of COACH_RIG_STATES) assert.equal(isRigOneShot(s), RIG_ONE_SHOT_STATES.includes(s), s);
});

test('a one-shot returns to the held base state; a held base stays; one-shots never become the base', () => {
  assert.equal(rigSettleTarget('speaking'), 'speaking');
  assert.equal(rigSettleTarget('explaining'), 'explaining');
  assert.equal(rigSettleTarget('idle'), 'idle');
  assert.equal(rigSettleTarget('greeting'), 'idle');
  assert.equal(rigSettleTarget('entrance'), 'idle');
});

test('thinking and encouraging stay defined but dormant; no active state is dormant', () => {
  assert.deepEqual([...RIG_DORMANT_STATES].sort(), ['encouraging', 'thinking']);
  for (const s of ['idle', 'entrance', 'landing', 'greeting', 'speaking', 'explaining', 'writing', 'success'] as const) assert.equal(isRigDormant(s), false, s);
  assert.ok(COACH_RIG_STATES.includes('thinking') && COACH_RIG_STATES.includes('encouraging'));
  assert.ok(rigStateHoldMs('encouraging') > 0, 'encouraging keeps its timing');
});

test('the welcome flow only uses non-dormant states', () => {
  for (const s of WELCOME_SEQUENCE) assert.equal(isRigDormant(s), false, s);
  for (const s of LESSON_START_SEQUENCE) assert.equal(isRigDormant(s), false, s);
});

test('natural blinking never fights a state that drives the eyes itself', () => {
  for (const s of ['greeting', 'success', 'entrance'] as const) assert.equal(rigBlinkAllowed(s), false, s);
  for (const s of ['idle', 'speaking', 'explaining', 'writing'] as const) assert.equal(rigBlinkAllowed(s), true, s);
});

test('pointing supports left / center / right; reduced-motion settles quickly', () => {
  assert.deepEqual([...RIG_POINT_DIRECTIONS], ['left', 'center', 'right']);
  assert.ok(REDUCED_MOTION_SETTLE_MS > 0 && REDUCED_MOTION_SETTLE_MS < 500);
});

console.log(`\n${passed} passed`);
