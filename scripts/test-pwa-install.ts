import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  afterChoice,
  afterDismiss,
  afterInstalled,
  cooldownMs,
  INSTALL_DEFAULTS,
  installDelay,
  isIOS,
  isStandalone,
  parseInstallState,
  shouldOfferInstall,
} from '../lib/pwa/install';

let passed = 0;
function test(name: string, fn: () => void) {
  fn();
  passed++;
  console.log(`PASS ${name}`);
}
const DAY = 24 * 60 * 60 * 1000;
const NOW = 1_800_000_000_000;
const base = { state: {}, standalone: false, nativeAvailable: true, now: NOW };

test('offered only when the browser really can install (beforeinstallprompt), else nothing (iOS, Firefox…)', () => {
  assert.equal(shouldOfferInstall(base), true);
  assert.equal(shouldOfferInstall({ ...base, nativeAvailable: false }), false);
});

test('never when already installed or running as the app (standalone)', () => {
  assert.equal(shouldOfferInstall({ ...base, state: { installedAt: NOW - DAY } }), false);
  assert.equal(shouldOfferInstall({ ...base, standalone: true }), false);
  assert.equal(isStandalone({ displayModeStandalone: true }), true);
  assert.equal(isStandalone({ displayModeStandalone: false, navigatorStandalone: true }), true);
  assert.equal(isStandalone({ displayModeStandalone: false }), false);
});

test('"Not now" is remembered with a cooldown that grows each time; never every page load', () => {
  const once = afterDismiss({}, NOW);
  assert.deepEqual(once, { dismissedAt: NOW, dismissCount: 1 });
  assert.equal(shouldOfferInstall({ ...base, state: once, now: NOW + 1000 }), false, 'not on the next load');
  assert.equal(shouldOfferInstall({ ...base, state: once, now: NOW + 13 * DAY }), false);
  assert.equal(shouldOfferInstall({ ...base, state: once, now: NOW + 14 * DAY }), true);
  const twice = afterDismiss(once, NOW);
  assert.equal(cooldownMs(twice), 2 * INSTALL_DEFAULTS.cooldownDays * DAY);
  assert.equal(shouldOfferInstall({ ...base, state: twice, now: NOW + 20 * DAY }), false);
  assert.equal(shouldOfferInstall({ ...base, state: once, now: NOW + 3 * DAY, cooldownDays: 2 }), true, 'configurable');
});

test('native dialog: accepted → hidden for good; dismissed → counts as "not now"; appinstalled → hidden', () => {
  const acc = afterChoice({}, 'accepted', NOW);
  assert.equal(acc.installedAt, NOW);
  assert.equal(shouldOfferInstall({ ...base, state: acc, now: NOW + 365 * DAY }), false);
  assert.deepEqual(afterChoice({}, 'dismissed', NOW), { dismissedAt: NOW, dismissCount: 1 });
  const inst = afterInstalled({ dismissCount: 2 }, NOW);
  assert.equal(inst.installedAt, NOW);
  assert.equal(afterInstalled({ installedAt: 5 }, NOW).installedAt, 5, 'keeps the first install time');
});

test('stored state: malformed or tampered values never crash and count as fresh', () => {
  assert.deepEqual(parseInstallState(null), {});
  assert.deepEqual(parseInstallState('not json'), {});
  assert.deepEqual(parseInstallState('{"installedAt":"yes","dismissedAt":null}'), {});
  assert.deepEqual(parseInstallState('{"dismissedAt":5,"dismissCount":1}'), { dismissedAt: 5, dismissCount: 1 });
});

test('iOS (incl. iPad as Mac) is detected: no Install button there', () => {
  assert.equal(isIOS('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'), true);
  assert.equal(isIOS('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 5), true);
  assert.equal(isIOS('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 0), false);
  assert.equal(isIOS('Mozilla/5.0 (Linux; Android 14; Pixel 8) Chrome/126'), false);
});

test('shown after some use (45 s by default); the override only accepts sane numbers', () => {
  assert.equal(installDelay(null), 45_000);
  assert.equal(installDelay(''), 45_000);
  assert.equal(installDelay('abc'), 45_000);
  assert.equal(installDelay('-1'), 45_000);
  assert.equal(installDelay('99999999'), 45_000);
  assert.equal(installDelay('500'), 500);
});

test('the service worker does not intercept requests (no stale pages, no caching of private data)', () => {
  const sw = readFileSync('public/sw.js', 'utf8');
  assert.ok(!/addEventListener\(\s*['"]fetch['"]/.test(sw));
  const manifest = readFileSync('app/manifest.ts', 'utf8');
  assert.match(manifest, /display: 'standalone'/);
  assert.match(manifest, /icon-192\.png/);
  assert.match(manifest, /icon-512\.png/);
});

console.log(`\n${passed} passed`);
