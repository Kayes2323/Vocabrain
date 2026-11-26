// Mino Coach REAL-ARTWORK rig + isolated Task 1 welcome preview (dev-only routes; needs `next dev`, not `next start`).
//   E2E_BASE_URL=http://localhost:3100 E2E_SHOTS=/some/dir npx tsx scripts/e2e/mino-rig.e2e.ts
// Checks: artwork decodes (no 404s), layer alignment + pivots at two sizes, DOM hierarchy / draw order, every state,
// one-shot settling, pencil/notebook attachment across animation time, arm rotation at the Stage B angles with no
// torso gap (magenta-backdrop pixel test), independent face channels, speaking mouth cycle, natural blinking,
// reduced-motion, mobile + desktop sizing of the welcome preview, exact approved copy, no localStorage writes, no console errors.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import type { Page } from 'playwright-core';
import { BASE, check, launch, noHorizontalScroll, report, SHOTS, shot, watchErrors } from './helpers';
import { RIG_MANIFEST, RIG_STAGE } from '../../components/mino/dev/coach-rig-manifest';
import { COACH_ROLE, COACH_WELCOME } from '../../lib/mino/coach-messages';

const STATES = ['idle', 'entrance', 'landing', 'greeting', 'speaking', 'explaining', 'writing', 'thinking', 'success', 'encouraging'] as const;
const ONE_SHOT_MS: Record<string, number> = { entrance: 1050, landing: 420, greeting: 1100, success: 900, encouraging: 1350 };

const NAME_SHIM = 'window.__name = window.__name || ((f) => f);'; // tsx/esbuild keepNames helper used inside page.evaluate callbacks
const rigRect = (p: Page, sel: string) => p.evaluate((s) => { const r = document.querySelector(s)!.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }, sel);

/** Play a state, hold it (block the settle timer) and freeze every animation of the rig at time t. */
async function freezeAt(p: Page, state: string, t: number) {
  await p.evaluate(async ([s, tt]) => {
    const realSet = window.setTimeout;
    window.setTimeout = ((fn: TimerHandler, ms?: number, ...a: unknown[]) => (ms && ms >= 200 && ms <= 1500 ? 0 : realSet(fn as () => void, ms, ...a))) as typeof window.setTimeout;
    (document.querySelector(`[data-testid="rig-state-${s}"]`) as HTMLButtonElement).click();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    document.querySelector('.mino-rig')!.getAnimations({ subtree: true }).forEach((a) => { a.pause(); a.currentTime = tt as number; });
    window.setTimeout = realSet;
  }, [state, t] as const);
  await p.waitForTimeout(40);
}

async function main() {
  const errors: string[] = [];
  const bad404: string[] = [];
  const browser = await launch();
  try {
    // ---------------------------------------------------------------- desktop rig preview
    const ctx = await browser.newContext({ viewport: { width: 1400, height: 1100 } });
    await ctx.addInitScript(NAME_SHIM);
    const p = await ctx.newPage();
    watchErrors(p, 'rig', errors);
    p.on('response', (r) => { if (r.url().includes('/mino/coach/') && r.status() >= 400) bad404.push(`${r.status()} ${r.url()}`); });

    console.log('\n[1] Artwork loads from repo assets');
    await p.goto(`${BASE}/dev/mino-coach-preview`, { waitUntil: 'networkidle' });
    await p.waitForSelector('.mino-rig[data-ready="true"]', { timeout: 30_000 });
    const layerInfo = await p.$$eval('.mino-rig img[data-layer]', (els) => els.map((e) => ({ name: (e as HTMLElement).dataset.layer!, ok: (e as HTMLImageElement).complete && (e as HTMLImageElement).naturalWidth > 0, src: (e as HTMLImageElement).getAttribute('src') })));
    check('all 21 layer images rendered and decoded', layerInfo.length === 21 && layerInfo.every((l) => l.ok), JSON.stringify(layerInfo.filter((l) => !l.ok)));
    check('every layer is served from /mino/coach (repo public assets, not a scratch path)', layerInfo.every((l) => l.src!.startsWith('/mino/coach/')));
    check('no 404/4xx for any rig asset', bad404.length === 0, bad404.join(','));

    console.log('\n[2] Layer alignment + pivots (idle, t=0) at desktop and mobile sizes');
    for (const width of [420, 220]) {
      await p.evaluate((w) => { (document.querySelector('[data-testid="rig-frame"]') as HTMLElement).style.width = `${w}px`; }, width);
      await freezeAt(p, 'idle', 0);
      const R = await rigRect(p, '.mino-rig');
      const sc = R.w / RIG_STAGE.w;
      const worst = { dx: 0, dy: 0, dw: 0, dh: 0 };
      for (const l of RIG_MANIFEST.layers) {
        const r = await rigRect(p, `.mino-rig img[data-layer="${l.name}"]`);
        const ex = R.x + (l.x - RIG_STAGE.x) * sc, ey = R.y + (l.y - RIG_STAGE.y) * sc;
        worst.dx = Math.max(worst.dx, Math.abs(r.x - ex)); worst.dy = Math.max(worst.dy, Math.abs(r.y - ey));
        worst.dw = Math.max(worst.dw, Math.abs(r.w - l.w * sc)); worst.dh = Math.max(worst.dh, Math.abs(r.h - l.h * sc));
      }
      check(`all 21 layers sit exactly where the manifest says at ${width}px (≤1px)`, Math.max(worst.dx, worst.dy, worst.dw, worst.dh) <= 1, JSON.stringify(worst));
      const origins = await p.evaluate(() => Object.fromEntries(['arm-l', 'arm-r', 'pencil', 'head', 'torso', 'tag', 'pack'].map((c) => [c, getComputedStyle(document.querySelector(`.mino-rig__${c}`)!).transformOrigin])));
      const exp = (pt: [number, number]) => [(pt[0] - RIG_STAGE.x) * sc, (pt[1] - RIG_STAGE.y) * sc];
      const near = (s: string, pt: number[]) => { const [a, b] = s.split(' ').map(parseFloat); return Math.abs(a - pt[0]) <= 1 && Math.abs(b - pt[1]) <= 1; };
      const pv = RIG_MANIFEST.pivots;
      check(`shoulder / wrist / tag pivots are at the measured points at ${width}px`, near(origins['arm-l'], exp(pv.shoulderL)) && near(origins['arm-r'], exp(pv.shoulderR)) && near(origins.pencil, exp(pv.pencilGrip)) && near(origins.tag, exp(pv.tagHook)), JSON.stringify(origins));
    }
    await p.evaluate(() => { (document.querySelector('[data-testid="rig-frame"]') as HTMLElement).style.width = '420px'; });

    console.log('\n[3] DOM hierarchy and draw order');
    const hier = await p.evaluate(() => {
      const q = (s: string) => document.querySelector(s);
      const inside = (child: string, parent: string) => !!q(parent)?.contains(q(child));
      const order = Array.from(document.querySelectorAll('.mino-rig img[data-layer]')).map((e) => (e as HTMLElement).dataset.layer);
      return { pencilInArmL: inside('img[data-layer="pencil"]', '.mino-rig__arm-l'), notebookInArmR: inside('img[data-layer="notebook"]', '.mino-rig__arm-r'), handInArmR: inside('img[data-layer="armRightHand"]', '.mino-rig__arm-r'), pencilNotInArmR: !inside('img[data-layer="pencil"]', '.mino-rig__arm-r'), armsInTorso: inside('.mino-rig__arm-l', '.mino-rig__torso') && inside('.mino-rig__arm-r', '.mino-rig__torso'), feetOutsideTorso: !inside('img[data-layer="footL"]', '.mino-rig__torso') && !inside('img[data-layer="footR"]', '.mino-rig__torso'), packOutsideTorso: !inside('img[data-layer="backpack"]', '.mino-rig__torso'), order };
    });
    check('pencil is a child of the left arm; notebook and right hand are children of the right arm', hier.pencilInArmL && hier.notebookInArmR && hier.handInArmR && hier.pencilNotInArmR);
    check('arms move with the torso; feet and backpack are independent of it', hier.armsInTorso && hier.feetOutsideTorso && hier.packOutsideTorso);
    const o = hier.order as string[];
    const idx = (n: string) => o.indexOf(n);
    check('draw order: backpack < feet < body < tag < mask < face < right arm < notebook < right hand < left arm < pencil', ['backpack', 'footR', 'footL', 'body', 'tag', 'mask', 'eyeL', 'mouth', 'armRight', 'notebook', 'armRightHand', 'armLeft', 'pencil'].every((n, i, a) => i === 0 || idx(a[i - 1]) < idx(n)), o.join('>'));

    console.log('\n[4] All 10 states play, one-shots settle, held states hold');
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForSelector('.mino-rig[data-ready="true"]');
    await p.waitForTimeout(1500);
    for (const s of STATES) {
      if (ONE_SHOT_MS[s]) { await p.click('[data-testid="rig-state-idle"]'); await p.waitForTimeout(30); }
      await p.click(`[data-testid="rig-state-${s}"]`);
      await p.waitForTimeout(60);
      const st = await p.getAttribute('.mino-rig', 'data-state');
      check(`state "${s}" activates`, st === s, st);
      if (ONE_SHOT_MS[s]) {
        await p.waitForTimeout(ONE_SHOT_MS[s] + 350);
        const after = await p.getAttribute('.mino-rig', 'data-state');
        check(`one-shot "${s}" settles back to idle on its own`, after === 'idle', after);
      } else {
        await p.waitForTimeout(1300);
        check(`held state "${s}" stays until changed`, (await p.getAttribute('.mino-rig', 'data-state')) === s);
      }
    }
    await p.click('[data-testid="rig-state-idle"]');

    console.log('\n[5] Choreographies chain without conflicts');
    await p.click('[data-testid="rig-seq-welcome"]');
    const seen: string[] = [];
    for (let i = 0; i < 40; i++) { const st = await p.getAttribute('.mino-rig', 'data-state'); if (st && seen[seen.length - 1] !== st) seen.push(st); await p.waitForTimeout(100); }
    check('welcome = entrance → landing → greeting → speaking, in order, ending held on speaking', seen.join('>') === 'entrance>landing>greeting>speaking', seen.join('>'));
    await p.click('[data-testid="rig-seq-lesson"]');
    await p.waitForTimeout(200);
    check('lesson start begins with explaining (a held state)', (await p.getAttribute('.mino-rig', 'data-state')) === 'explaining');
    await p.click('[data-testid="rig-state-greeting"]');
    await p.click('[data-testid="rig-state-success"]');
    check('a new play() cancels the previous one-shot (no overlap)', (await p.getAttribute('.mino-rig', 'data-state')) === 'success');
    await p.waitForTimeout(1400);
    check('…and settles once, to the held base state it interrupted', ['idle', 'explaining'].includes((await p.getAttribute('.mino-rig', 'data-state')) ?? ''));
    await p.click('[data-testid="rig-seq-success"]');
    await p.waitForTimeout(1300);
    check('a choreography that ends on a one-shot (success → idle) returns to idle', (await p.getAttribute('.mino-rig', 'data-state')) === 'idle');
    await p.click('[data-testid="rig-state-idle"]');

    console.log('\n[6] Pencil and notebook stay attached across animation time');
    const dist = async () => p.evaluate(() => {
      const c = (s: string) => { const r = document.querySelector(s)!.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; };
      const W = document.querySelector('.mino-rig')!.getBoundingClientRect().width;
      const d = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1]) / W;
      return { pencil: d(c('img[data-layer="pencil"]'), c('img[data-layer="armLeft"]')), notebook: d(c('img[data-layer="notebook"]'), c('img[data-layer="armRight"]')), hand: d(c('img[data-layer="armRightHand"]'), c('img[data-layer="armRight"]')) };
    });
    await freezeAt(p, 'idle', 0);
    const base = await dist();
    let maxP = 0, maxN = 0, maxH = 0;
    for (const [s, dur] of [['greeting', 1100], ['explaining', 4600], ['writing', 3400], ['speaking', 3200], ['success', 900], ['entrance', 1050]] as const) {
      for (let k = 0; k <= 8; k++) {
        await freezeAt(p, s, (dur * k) / 8);
        const d = await dist();
        maxP = Math.max(maxP, Math.abs(d.pencil - base.pencil)); maxN = Math.max(maxN, Math.abs(d.notebook - base.notebook)); maxH = Math.max(maxH, Math.abs(d.hand - base.hand));
      }
    }
    check('pencil never leaves the left hand (grip offset stays within 0.12 of rig width in every state)', maxP < 0.12, maxP.toFixed(3));
    check('notebook never leaves the right hand (offset ≈ constant in every state)', maxN < 0.03, maxN.toFixed(3));
    check('right hand piece stays fused to the right arm', maxH < 0.005, maxH.toFixed(4));

    console.log('\n[7] Arm rotation at ±20° and combined ±12° leaves no torso gap');
    await p.evaluate(() => { (document.querySelector('[data-testid="rig-frame"]') as HTMLElement).style.background = '#ff00ff'; (document.querySelector('[data-testid="rig-frame"]') as HTMLElement).style.backgroundImage = 'none'; });
    const frameEl = await p.$('[data-testid="rig-frame"]');
    const regions = [{ name: 'left torso under the arm', x0: 440, y0: 650, x1: 560, y1: 760 }, { name: 'right torso under the notebook', x0: 930, y0: 650, x1: 1100, y1: 790 }];
    for (const [label, aL, aR] of [['L −20°', -20, 0], ['L +20°', 20, 0], ['R −20°', 0, -20], ['R +20°', 0, 20], ['both −12°/+12°', -12, 12], ['both +12°/−12°', 12, -12]] as const) {
      await freezeAt(p, 'idle', 0);
      await p.evaluate(([l, r]) => { const a = document.querySelector('.mino-rig__arm-l') as HTMLElement, b = document.querySelector('.mino-rig__arm-r') as HTMLElement; a.style.animation = 'none'; b.style.animation = 'none'; a.style.transform = `rotate(${l}deg)`; b.style.transform = `rotate(${r}deg)`; }, [aL, aR] as const);
      await p.waitForTimeout(60);
      const buf = await frameEl!.screenshot();
      const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
      const sc = info.width / RIG_STAGE.w;
      for (const rg of regions) {
        let mag = 0, tot = 0;
        for (let y = Math.round((rg.y0 - RIG_STAGE.y) * sc); y < Math.round((rg.y1 - RIG_STAGE.y) * sc); y++) for (let x = Math.round((rg.x0 - RIG_STAGE.x) * sc); x < Math.round((rg.x1 - RIG_STAGE.x) * sc); x++) { const i = (y * info.width + x) * info.channels; tot++; if (data[i] > 200 && data[i + 1] < 80 && data[i + 2] > 200) mag++; }
        check(`${label}: ${rg.name} is fully covered (no backdrop showing through)`, mag / tot < 0.004, `${mag}/${tot}`);
      }
      await p.evaluate(() => { for (const s of ['.mino-rig__arm-l', '.mino-rig__arm-r']) { const e = document.querySelector(s) as HTMLElement; e.style.animation = ''; e.style.transform = ''; } });
    }
    await p.evaluate(() => { (document.querySelector('[data-testid="rig-frame"]') as HTMLElement).style.background = ''; });

    console.log('\n[8] Independent facial channels');
    await p.click('[data-testid="rig-state-idle"]');
    const op = (sel: string) => p.evaluate((s) => parseFloat(getComputedStyle(document.querySelector(s)!).opacity), sel);
    await p.click('[data-testid="rig-eyes-closed"]');
    check('eyes: closed shows both closed eyes and hides both open eyes', (await op('img[data-layer="eyeL-closed"]')) > 0.9 && (await op('img[data-layer="eyeR-closed"]')) > 0.9 && (await op('img[data-layer="eyeL"]')) < 0.1 && (await op('img[data-layer="eyeR"]')) < 0.1);
    await p.click('[data-testid="rig-eyes-wink"]');
    check('eyes: wink closes only the right eye (left stays open)', (await op('img[data-layer="eyeR-wink"]')) > 0.9 && (await op('img[data-layer="eyeR"]')) < 0.1 && (await op('img[data-layer="eyeL"]')) > 0.9 && (await op('img[data-layer="eyeL-closed"]')) < 0.1);
    await p.click('[data-testid="rig-eyes-open"]');
    await p.click('[data-testid="rig-mouth-wide"]');
    check('mouth: wide shows only the wide mouth, independent of the eyes', (await op('img[data-layer="mouth-wide"]')) > 0.9 && (await op('img[data-layer="mouth"]')) < 0.1 && (await op('img[data-layer="mouth-small"]')) < 0.1 && (await op('img[data-layer="eyeL"]')) > 0.9);
    await p.click('[data-testid="rig-mouth-small"]');
    check('mouth: small shows only the small mouth', (await op('img[data-layer="mouth-small"]')) > 0.9 && (await op('img[data-layer="mouth-wide"]')) < 0.1);
    await p.click('[data-testid="rig-mouth-neutral"]');

    console.log('\n[9] Speaking cycles all three mouth shapes; idle blinks naturally');
    await p.click('[data-testid="rig-state-speaking"]');
    const shapes = new Set<string>();
    for (let i = 0; i < 70; i++) { const v = await p.evaluate(() => ['mouth', 'mouth-small', 'mouth-wide'].find((n) => parseFloat(getComputedStyle(document.querySelector(`img[data-layer="${n}"]`)!).opacity) > 0.9) ?? '-'); shapes.add(v); await p.waitForTimeout(45); }
    check('speaking shows neutral, small-open and wide-open mouth shapes', shapes.has('mouth') && shapes.has('mouth-small') && shapes.has('mouth-wide'), [...shapes].join(','));
    await p.click('[data-testid="rig-state-idle"]');
    let blinked = false;
    for (let i = 0; i < 100 && !blinked; i++) { blinked = (await p.getAttribute('.mino-rig', 'data-eyes')) === 'closed'; await p.waitForTimeout(100); }
    check('idle blinks on its own within 10 s (natural blink scheduler)', blinked);

    console.log('\n[10] Explaining points in the chosen direction');
    for (const d of ['right', 'center', 'left'] as const) {
      await p.click(`[data-testid="rig-point-${d}"]`);
      check(`pointing "${d}" sets the gesture direction`, (await p.getAttribute('.mino-rig', 'data-point')) === d && (await p.getAttribute('.mino-rig', 'data-state')) === 'explaining');
    }
    await shot(p, 'rig-preview-desktop');

    console.log('\n[11] Console health (rig preview)');
    check('no console errors / page errors on the rig preview', errors.length === 0, errors.join(' | '));

    // ---------------------------------------------------------------- reduced motion
    console.log('\n[12] Reduced motion');
    const rm = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    await rm.addInitScript(NAME_SHIM);
    const rp = await rm.newPage();
    const rmErr: string[] = [];
    watchErrors(rp, 'reduced', rmErr);
    await rp.goto(`${BASE}/dev/mino-coach-preview`, { waitUntil: 'networkidle' });
    await rp.waitForSelector('.mino-rig[data-ready="true"]');
    check('reduced-motion is detected by the controller', (await rp.getAttribute('.mino-rig', 'data-reduced')) === 'true' && (await rp.getAttribute('.mino-rig', 'data-motion')) === 'off');
    await rp.click('[data-testid="rig-state-greeting"]');
    await rp.waitForTimeout(80);
    const anims = await rp.evaluate(() => document.querySelector('.mino-rig')!.getAnimations({ subtree: true }).length);
    check('no CSS animation runs under reduced motion', anims === 0, anims);
    await rp.waitForTimeout(500);
    check('one-shots still settle quickly under reduced motion (choreographies keep advancing)', (await rp.getAttribute('.mino-rig', 'data-state')) === 'idle');
    await rp.click('[data-testid="rig-seq-welcome"]');
    await rp.waitForTimeout(1500);
    check('the welcome choreography completes in ≤1.5 s under reduced motion', (await rp.getAttribute('.mino-rig', 'data-state')) === 'speaking');
    check('no console errors under reduced motion', rmErr.length === 0, rmErr.join(' | '));
    await rm.close();

    // ---------------------------------------------------------------- Task 1 welcome placement
    console.log('\n[13] Task 1 welcome preview — desktop');
    const t1errors: string[] = [];
    const dctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await dctx.addInitScript(NAME_SHIM);
    const dp = await dctx.newPage();
    watchErrors(dp, 'task1', t1errors);
    await dp.goto(`${BASE}/dev/mino-task1-welcome-preview`, { waitUntil: 'networkidle' });
    await dp.waitForSelector('[data-testid="task1-welcome-mino"] .mino-rig[data-ready="true"]');
    check('the welcome panel renders the new rig in the character slot', await dp.locator('[data-testid="task1-welcome-mino"] .mino-rig').isVisible());
    const t1 = await dp.locator('[data-testid="task1-welcome-panel"]').innerText();
    check('approved Task 1 role label is shown', t1.toLowerCase().includes(COACH_ROLE.task1.en.toLowerCase()));
    check('approved Task 1 English welcome text is shown unchanged', t1.includes(COACH_WELCOME.task1.en));
    check('Start / Replay / Skip buttons are present', (await dp.getByRole('button', { name: 'Start learning' }).isVisible()) && (await dp.getByRole('button', { name: 'Replay welcome' }).isVisible()) && (await dp.getByRole('button', { name: 'Skip' }).isVisible()));
    const rowLayout = await dp.evaluate(() => { const m = document.querySelector('[data-testid="task1-welcome-mino"]')!.getBoundingClientRect(); const t = document.querySelector('[data-testid="task1-welcome-panel"] p.text-xs')!.getBoundingClientRect(); return { minoRight: m.right, textLeft: t.left, minoW: m.width, minoH: m.height }; });
    check('desktop: character sits left of the text in a row (same layout as production)', rowLayout.minoRight <= rowLayout.textLeft + 1, JSON.stringify(rowLayout));
    check('desktop: the character cell is ≈320 px wide', Math.abs(rowLayout.minoW - 320) <= 2, rowLayout.minoW);
    await dp.waitForTimeout(400);
    const entering = await dp.getAttribute('[data-testid="task1-welcome-mino"] .mino-rig', 'data-state');
    check('the welcome choreography starts automatically', ['entrance', 'landing', 'greeting', 'speaking'].includes(entering ?? ''), entering);
    await shot(dp, 'task1-welcome-desktop-entrance', false);
    await dp.waitForTimeout(3500);
    check('after the choreography Mino is speaking while the text is shown', (await dp.getAttribute('[data-testid="task1-welcome-mino"] .mino-rig', 'data-state')) === 'speaking');
    await shot(dp, 'task1-welcome-desktop-speaking', false);
    await dp.getByRole('button', { name: 'Replay welcome' }).click();
    await dp.waitForTimeout(150);
    check('Replay welcome restarts the entrance without dismissing', (await dp.getAttribute('[data-testid="task1-welcome-mino"] .mino-rig', 'data-state')) === 'entrance' && (await dp.getByRole('button', { name: 'Start learning' }).isVisible()));
    await dp.click('[data-testid="locale-bn"]');
    const bn = await dp.locator('[data-testid="task1-welcome-panel"]').innerText();
    check('approved Task 1 Bangla script is shown exactly', bn.includes(COACH_WELCOME.task1.bn));
    await dp.getByRole('button', { name: 'চলুন, শুরু করি' }).click();
    const stored = await dp.evaluate(() => Object.keys(localStorage).filter((k) => k.includes('mino-coach-welcome')));
    check('previewing never writes the production "welcome seen" flag', stored.length === 0, stored.join(','));
    check('the production mascot comparison panel is still rendered (untouched)', await dp.locator('[data-testid="task1-welcome-production-compare"] .mino-coach').first().isVisible());
    check('no console errors on the Task 1 welcome preview', t1errors.length === 0, t1errors.join(' | '));
    await dctx.close();

    console.log('\n[14] Task 1 welcome preview — mobile');
    const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await mctx.addInitScript(NAME_SHIM);
    const mp = await mctx.newPage();
    const mErr: string[] = [];
    watchErrors(mp, 'mobile', mErr);
    await mp.goto(`${BASE}/dev/mino-task1-welcome-preview`, { waitUntil: 'networkidle' });
    await mp.waitForSelector('[data-testid="task1-welcome-mino"] .mino-rig[data-ready="true"]');
    check('mobile: no horizontal scroll', await noHorizontalScroll(mp));
    const mob = await mp.evaluate(() => { const m = document.querySelector('[data-testid="task1-welcome-mino"]')!.getBoundingClientRect(); const t = document.querySelector('[data-testid="task1-welcome-panel"] p.text-xs')!.getBoundingClientRect(); const panel = document.querySelector('[data-testid="task1-welcome-panel"]')!.getBoundingClientRect(); return { minoBottom: m.bottom, textTop: t.top, minoW: m.width, panelW: panel.width, minoLeft: m.left, panelLeft: panel.left }; });
    check('mobile: character stacks above the text', mob.minoBottom <= mob.textTop + 1, JSON.stringify(mob));
    check('mobile: character fits inside the panel', mob.minoW <= mob.panelW && mob.minoLeft >= mob.panelLeft - 1, JSON.stringify(mob));
    await mp.waitForTimeout(4500);
    await shot(mp, 'task1-welcome-mobile', false);
    await shot(mp, 'task1-welcome-mobile-full', true);
    check('no console errors on mobile', mErr.length === 0, mErr.join(' | '));
    await mctx.close();
    await ctx.close();
  } finally {
    await browser.close();
  }
  console.log(`\nscreenshots: ${path.resolve(SHOTS)} (${fs.existsSync(SHOTS) ? fs.readdirSync(SHOTS).filter((f) => f.startsWith('rig-') || f.startsWith('task1-')).length : 0} files)`);
  process.exit(report());
}
main().catch((e) => { console.error(e); process.exit(1); });
