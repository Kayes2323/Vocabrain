// Mino, living: the pure rules for the decorative rotation, the Home-card pose, and the context bus.
//   npx tsx scripts/test-mino-living.ts
import assert from 'node:assert/strict';
import { COACH_RIG_STATES, rigStateHoldMs } from '../components/mino/rig/coach-preview-state';
import { MINO_COACH_POSES, poseHoldMs } from '../lib/mino/coach';
import {
  clampDwell,
  homeCardPose,
  LIVING_BEATS,
  LIVING_BETWEEN_DWELL_MS,
  LIVING_FIRST_DWELL_MS,
  livingBeatMs,
  livingLapMs,
  livingRigAllowed,
  livingRotationAllowed,
  nextBeatIndex,
} from '../lib/mino/living';
import { holdMinoCalm, minoBusyCounts, minoContextBusy, registerMinoPresence } from '../lib/mino/living-bus';

let passed = 0;
function test(name: string, fn: () => void) {
  fn();
  passed++;
  console.log('PASS', name);
}

const open = { reducedMotion: false, saveData: false, tabVisible: true, onScreen: true, contextBusy: false };

test('the rotation is exactly the requested sequence of EXISTING rig states (no invented poses)', () => {
  assert.deepEqual([...LIVING_BEATS], ['greeting', 'thinking', 'writing', 'explaining', 'encouraging', 'success']);
  for (const b of LIVING_BEATS) {
    assert.ok((COACH_RIG_STATES as readonly string[]).includes(b), `${b} is a real rig state`);
    assert.ok((MINO_COACH_POSES as readonly string[]).includes(b), `${b} is a supported mascot pose`);
  }
});

test('every beat has a bounded, sensible duration; one-shots outlast their own settle time', () => {
  for (const b of LIVING_BEATS) {
    const ms = livingBeatMs(b);
    assert.ok(ms >= 500 && ms <= 3000, `${b}: ${ms}`);
  }
  for (const b of ['greeting', 'encouraging', 'success'] as const) assert.ok(livingBeatMs(b) > rigStateHoldMs(b), `${b} settles before it is released`);
  assert.equal(poseHoldMs('greeting') > 0, true);
});

test('the rotation is calm: long idle between beats, so a lap is mostly rest', () => {
  assert.ok(LIVING_BETWEEN_DWELL_MS >= 6000 && LIVING_FIRST_DWELL_MS >= 4000);
  const lap = livingLapMs();
  const active = LIVING_BEATS.reduce((n, b) => n + livingBeatMs(b), 0);
  assert.ok(active / lap < 0.3, `active share ${(active / lap).toFixed(2)}`);
});

test('deterministic: the same index always gives the same next beat, and it loops', () => {
  let i = 0;
  const seen: string[] = [];
  for (let k = 0; k < LIVING_BEATS.length * 2; k++) {
    seen.push(LIVING_BEATS[i]);
    i = nextBeatIndex(i);
  }
  assert.deepEqual(seen.slice(0, 6), seen.slice(6));
  assert.equal(i, 0);
});

test('priority: any context-specific need, reduced motion, data saver, hidden tab or off-screen stops the rotation', () => {
  assert.equal(livingRotationAllowed(open), true);
  assert.equal(livingRotationAllowed({ ...open, contextBusy: true }), false);
  assert.equal(livingRotationAllowed({ ...open, reducedMotion: true }), false);
  assert.equal(livingRotationAllowed({ ...open, saveData: true }), false);
  assert.equal(livingRotationAllowed({ ...open, tabVisible: false }), false);
  assert.equal(livingRotationAllowed({ ...open, onScreen: false }), false);
});

test('the 21-layer rig is only downloaded when motion is welcome', () => {
  assert.equal(livingRigAllowed({ reducedMotion: false, saveData: false }), true);
  assert.equal(livingRigAllowed({ reducedMotion: true, saveData: false }), false);
  assert.equal(livingRigAllowed({ reducedMotion: false, saveData: true }), false);
});

test('Home card pose follows the message (one-shot poses only)', () => {
  assert.equal(homeCardPose('mino.insight.catchUp'), 'encouraging');
  assert.equal(homeCardPose('mino.insight.reviewFailed'), 'encouraging');
  assert.equal(homeCardPose('mino.insight.atTarget'), 'success');
  assert.equal(homeCardPose('mino.insight.review'), 'greeting');
  assert.equal(homeCardPose('mino.insight.startReading'), 'greeting');
  for (const k of ['mino.insight.catchUp', 'mino.insight.review', 'mino.insight.atTarget', 'x']) assert.ok(poseHoldMs(homeCardPose(k)) > 0, 'one-shot: settles on its own');
});

test('dwell override is clamped (tests / review only)', () => {
  assert.equal(clampDwell('300', 8000), 300);
  assert.equal(clampDwell('-5', 8000), 8000);
  assert.equal(clampDwell('abc', 8000), 8000);
  assert.equal(clampDwell('999999999', 8000), 8000);
  assert.equal(clampDwell(null, 8000), 8000);
});

test('bus: presence and calm holds are counted, released once, and can never go negative or stick', () => {
  assert.equal(minoContextBusy(), false);
  const a = registerMinoPresence();
  const b = holdMinoCalm();
  assert.equal(minoContextBusy(), true);
  assert.deepEqual(minoBusyCounts(), { presence: 1, calm: 1 });
  a();
  a(); // double release is harmless
  assert.deepEqual(minoBusyCounts(), { presence: 0, calm: 1 });
  assert.equal(minoContextBusy(), true);
  b();
  assert.equal(minoContextBusy(), false);
  assert.deepEqual(minoBusyCounts(), { presence: 0, calm: 0 });
});

console.log(`\n${passed} passed`);
