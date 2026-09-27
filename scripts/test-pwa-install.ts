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
import { en } from '../lib/i18n/locales/en';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import manifest from '../app/manifest';
import { APP_NAME } from '../lib/constants';
import { bn } from '../lib/i18n/locales/bn';

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

test('the card text exists at the top level in both languages (keys used by InstallPrompt)', () => {
  const ui = readFileSync('components/pwa/InstallPrompt.tsx', 'utf8');
  const keys = [...ui.matchAll(/t\('pwa\.(\w+)'\)/g)].map((m) => m[1]);
  assert.ok(keys.length >= 6);
  for (const k of keys) {
    assert.equal(typeof (en.pwa as Record<string, string>)[k], 'string', `en pwa.${k}`);
    assert.equal(typeof (bn.pwa as Record<string, string>)[k], 'string', `bn pwa.${k}`);
  }
  assert.equal(bn.pwa.titlePhone, 'ফোনে Mino ইনস্টল করুন');
  assert.equal(bn.pwa.body, 'Mino-কে আপনার ফোনের home screen-এ রাখুন এবং আরও দ্রুত ব্যবহার করুন।');
  assert.equal(bn.pwa.notNow, 'পরে');
  assert.equal(en.pwa.titleDesktop, 'Install Mino');
});

test('manifest: the installed app is called "Mino" (name + short_name); install behaviour unchanged', () => {
  const m = manifest();
  assert.equal(APP_NAME, 'Mino');
  assert.equal(m.name, 'Mino');
  assert.equal(m.short_name, 'Mino');
  assert.equal(m.id, '/', 'same app identity, so an installed copy updates instead of duplicating');
  assert.equal(m.start_url, '/');
  assert.equal(m.scope, '/');
  assert.equal(m.display, 'standalone');
  assert.equal(m.background_color, '#fafafc');
  assert.equal(m.theme_color, '#1e2a4a');
  const icons = (m.icons ?? []).map((i) => `${i.src} ${i.sizes}`);
  assert.ok(icons.includes('/icon-192.png 192x192') && icons.includes('/icon-512.png 512x512'), icons.join(', '));
  assert.ok(!/vocab ?brain/i.test(JSON.stringify(m)));
});

test('page metadata used for install (application-name, apple title, og site name) is Mino', () => {
  const layout = readFileSync('app/layout.tsx', 'utf8');
  assert.match(layout, /applicationName: APP_NAME/);
  assert.match(layout, /appleWebApp: \{[^}]*title: APP_NAME/);
  assert.match(layout, /siteName: APP_NAME/);
  assert.ok(!/vocab ?brain/i.test(layout));
});

test('no app code, text or public file still shows the old name "Vocab Brain"', () => {
  const hits: string[] = [];
  const walk = (dir: string) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(tsx?|mjs|js|json|svg|css|webmanifest|html)$/.test(f)) {
        readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
          // Old storage keys (vocabbrain:…) and internal ids (vocab-brain) are kept on purpose: saved data depends on them.
          const visible = line.replace(/vocabbrain:[\w:${}]*/gi, '').replace(/vocab-brain/g, '');
          if (/vocab ?brain|vocabrain/i.test(visible)) hits.push(`${p}:${i + 1}`);
        });
      }
    }
  };
  for (const d of ['app', 'components', 'lib', 'public']) walk(d);
  // The Stripe logo URL is a placeholder domain, not a name shown as the app.
  assert.deepEqual(hits.filter((h) => !h.startsWith('app/api/stripe/')), []);
});

test('the install card names Mino (en + bn), never the old name', () => {
  assert.equal(en.pwa.titleDesktop, 'Install Mino');
  assert.equal(en.pwa.titlePhone, 'Install Mino on your phone');
  assert.ok(Object.values({ ...en.pwa, ...bn.pwa }).every((v) => !/vocab ?brain/i.test(v)));
  assert.ok(Object.values({ ...en.pwa, ...bn.pwa }).filter((v) => /Mino/.test(v)).length >= 4);
});

test('service worker: one registration at /sw.js, re-checked on every visit (updates install cleanly)', () => {
  const boot = readFileSync('components/pwa/PwaBoot.tsx', 'utf8');
  assert.equal(boot.match(/serviceWorker\.register\(/g)?.length, 1);
  assert.match(boot, /register\('\/sw\.js', \{ updateViaCache: 'none' \}\)/);
  const all = ['app', 'components', 'lib'].flatMap((d) => {
    const out: string[] = [];
    const walk = (dir: string) => readdirSync(dir).forEach((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : out.push(join(dir, f))));
    walk(d);
    return out;
  });
  const registrars = all.filter((f) => /\.tsx?$/.test(f) && /serviceWorker\.register\(/.test(readFileSync(f, 'utf8')));
  assert.deepEqual(registrars, ['components/pwa/PwaBoot.tsx'], 'no duplicate service workers');
  const sw = readFileSync('public/sw.js', 'utf8');
  assert.match(sw, /skipWaiting/);
  assert.match(sw, /clients\.claim/);
});

console.log(`\n${passed} passed`);
