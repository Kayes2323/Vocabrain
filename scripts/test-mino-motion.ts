import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  idleLife,
  isDoubleBlink,
  MINO_MODES,
  MINO_TIMING,
  motionAllowed,
  nextBlinkDelay,
  nextSparkleDelay,
  reactionDuration,
  reactionForTransition,
} from '../lib/mino/motion';

let passed = 0;
function test(name: string, fn: () => void) {
  fn();
  passed++;
  console.log(`PASS ${name}`);
}
const seq = (...xs: number[]) => {
  let i = 0;
  return () => xs[i++ % xs.length];
};

test('blinks are organic: 2.8–7.2 s apart, never a fixed beat; sometimes a double blink', () => {
  assert.equal(nextBlinkDelay(() => 0), MINO_TIMING.blinkMin);
  assert.equal(nextBlinkDelay(() => 0.999999), MINO_TIMING.blinkMax);
  const delays = Array.from({ length: 200 }, () => nextBlinkDelay());
  assert.ok(delays.every((d) => d >= 2800 && d <= 7200));
  assert.ok(new Set(delays).size > 50, 'varied, not periodic');
  assert.equal(isDoubleBlink(seq(0.1)), true);
  assert.equal(isDoubleBlink(seq(0.5)), false);
  assert.ok(MINO_TIMING.blinkClosed <= 160, 'quick and subtle');
});

test('the star sparkles rarely (11–22 s) while idle', () => {
  const ds = Array.from({ length: 100 }, () => nextSparkleDelay());
  assert.ok(ds.every((d) => d >= 11000 && d <= 22000));
});

test('motion stops for reduced motion, data-saver, off-screen, or animated=false', () => {
  const on = { animated: true, reducedMotion: false, saveData: false, visible: true };
  assert.equal(motionAllowed(on), true);
  assert.equal(motionAllowed({ ...on, reducedMotion: true }), false);
  assert.equal(motionAllowed({ ...on, saveData: true }), false);
  assert.equal(motionAllowed({ ...on, visible: false }), false);
  assert.equal(motionAllowed({ ...on, animated: false }), false);
});

test('modes: static never moves; thinking has its own eyes (no idle blink); idle blinks + sparkles', () => {
  assert.deepEqual(MINO_MODES, ['static', 'idle', 'thinking', 'welcome', 'success', 'attention', 'celebrate', 'sparkle']);
  assert.deepEqual(idleLife('celebrate'), { blink: true, sparkle: false }, 'celebrate: one sparkle only, no idle sparkles on top');
  assert.deepEqual(idleLife('static'), { blink: false, sparkle: false });
  assert.deepEqual(idleLife('thinking'), { blink: false, sparkle: false });
  assert.deepEqual(idleLife('idle'), { blink: true, sparkle: true });
  assert.equal(idleLife('attention').sparkle, false, 'attention stays calm');
});

test('answer ready (thinking → idle) plays blink + sparkle once; entering one-shot modes plays them', () => {
  assert.equal(reactionForTransition('thinking', 'idle'), 'success');
  assert.equal(reactionForTransition('thinking', 'static'), null);
  assert.equal(reactionForTransition('idle', 'success'), 'success');
  assert.equal(reactionForTransition('idle', 'attention'), 'attention');
  assert.equal(reactionForTransition('idle', 'sparkle'), 'sparkle');
  assert.equal(reactionForTransition('idle', 'celebrate'), 'celebrate');
  assert.equal(reactionForTransition('celebrate', 'celebrate'), null, 'no replay without a change');
  assert.equal(reactionForTransition('thinking', 'celebrate'), 'success', 'answer ready wins');
  assert.equal(reactionForTransition('idle', 'thinking'), null);
  assert.equal(reactionForTransition('idle', 'idle'), null);
});

test('welcome fits the brief: ~1–1.5 s; one-shots stay short', () => {
  assert.ok(MINO_TIMING.welcome >= 1000 && MINO_TIMING.welcome <= 1500);
  assert.ok(MINO_TIMING.success < 1200 && MINO_TIMING.attention <= 1500 && MINO_TIMING.sparkle < 1000);
  assert.ok(MINO_TIMING.celebrate <= 1000, 'celebrate is a short hop');
  assert.equal(reactionDuration('celebrate'), MINO_TIMING.celebrate);
  assert.equal(reactionDuration('success'), MINO_TIMING.success);
  assert.equal(reactionDuration('blink'), MINO_TIMING.blinkClosed);
});

test('welcome is a roll/bounce on the bottom edge (not a spin); only translate/rotate/uniform scale', () => {
  const css = readFileSync('app/globals.css', 'utf8');
  const rule = css.match(/\.mino\[data-react='welcome'\] \.mino-mark \{([^}]*)\}/);
  assert.ok(rule, 'welcome rule exists');
  assert.match(rule![1], /transform-origin: 50% 100%/);
  assert.match(rule![1], /animation: mino-welcome-roll \d+ms/);
  const kf = css.match(/@keyframes mino-welcome-roll \{([\s\S]*?)\n\}/);
  assert.ok(kf, 'roll keyframes exist');
  const angles = [...kf![1].matchAll(/rotate\((-?\d+(?:\.\d+)?)deg\)/g)].map((m) => Math.abs(Number(m[1])));
  assert.ok(angles.length >= 3, 'rocks back and forth');
  assert.ok(Math.max(...angles) <= 15, 'a tilt, never a spin');
  assert.ok(!/scale[XY]\(|skew/.test(kf![1]), 'the mark is never distorted');
  assert.match(css, /@keyframes mino-celebrate/);
  assert.match(css, /\.mino\[data-react='celebrate'\] \.mino-mark/);
});

test('brand: the app icon is drawn from the exact same geometry as the component (face + star, no wordmark)', () => {
  const component = readFileSync('components/mino/Mino.tsx', 'utf8');
  const icon = readFileSync('public/icon.svg', 'utf8');
  for (const part of [
    'x="2" y="2" width="44" height="44" rx="15"',
    'x="15" y="18" width="5" height="10" rx="2.5"',
    'x="28" y="18" width="5" height="10" rx="2.5"',
    'M36 8.5l1.1 2.9 2.9 1.1-2.9 1.1L36 16.5l-1.1-2.9L32 12.5l2.9-1.1z',
  ]) {
    assert.ok(component.includes(part), `component: ${part}`);
    assert.ok(icon.includes(part), `icon: ${part}`);
  }
  assert.ok(!/Mino<|>M</.test(icon), 'no wordmark in the icon');
  assert.ok(icon.includes('#5252d8'), 'brand colour');
});

test('reduced motion is honoured in CSS too (no animation, no transition)', () => {
  const css = readFileSync('app/globals.css', 'utf8');
  assert.match(css, /prefers-reduced-motion: reduce\)\s*\{\s*\.mino \*, \.mino-mark \*/);
  assert.match(css, /\.mino\[data-motion='off'\] \*\s*\{\s*animation-play-state: paused;/);
});

console.log(`\n${passed} passed`);
