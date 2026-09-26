// Shared E2E helpers: browser, accounts, Firestore (emulator) access, and a
// lesson driver that answers from the real course content, so a question is
// answered right (or wrong) on purpose instead of by luck.
import fs from 'node:fs';
import path from 'node:path';
import { chromium, type Browser, type Page } from 'playwright-core';
import { CHALLENGES, MODULES, canonicalAnswer, type Exercise } from '../../lib/foundation';
import { orderWords } from '../../lib/foundation/grade';

export const BASE = process.env.E2E_BASE_URL ?? 'http://localhost:3105';
const FS = 'http://127.0.0.1:8080/v1/projects/demo-vocabbrain/databases/(default)/documents';
export const SHOTS = process.env.E2E_SHOTS ?? path.join(process.cwd(), '.e2e-shots');

export type Lang = 'en' | 'bn';
export const LABELS = {
  en: { continue: 'Continue', complete: 'Complete lesson', start: 'Start the challenge', reviewStart: /^Start \d+ questions/ },
  bn: { continue: 'এগিয়ে যাও', complete: 'Lesson শেষ করো', start: 'Challenge শুরু করো', reviewStart: /প্রশ্ন শুরু|শুরু করো/ },
} as const;

// ------------------------------------------------------------------ results
const results: [string, boolean, string][] = [];
export function check(name: string, ok: boolean, detail: unknown = '') {
  results.push([name, ok, String(detail).slice(0, 160)]);
  console.log(ok ? '  PASS' : '  FAIL', name, ok ? '' : String(detail).slice(0, 160));
}
export function report(): number {
  const failed = results.filter((r) => !r[1]);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  for (const f of failed) console.log('FAILED:', f[0], f[2]);
  return failed.length ? 1 : 0;
}

// ------------------------------------------------------------------ browser
export async function launch(): Promise<Browser> {
  const guess = () => {
    const root = '/opt/pw-browsers';
    if (!fs.existsSync(root)) return undefined;
    const dir = fs.readdirSync(root).find((d) => d.startsWith('chromium-'));
    return dir ? path.join(root, dir, 'chrome-linux', 'chrome') : undefined;
  };
  const executablePath = process.env.CHROMIUM_PATH ?? guess();
  if (!executablePath) throw new Error('Set CHROMIUM_PATH to a Chromium/Chrome binary.');
  return chromium.launch({ executablePath });
}

export function watchErrors(p: Page, tag: string, errors: string[]) {
  p.on('pageerror', (e) => errors.push(`${tag}: ${e.message}`));
  p.on('console', (m) => m.type() === 'error' && !/DevTools|Failed to load resource/.test(m.text()) && errors.push(`${tag}: ${m.text().slice(0, 200)}`));
}

export async function shot(p: Page, name: string, fullPage = true) {
  fs.mkdirSync(SHOTS, { recursive: true });
  await p.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage });
}

export const noHorizontalScroll = (p: Page) => p.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);

// ------------------------------------------------------------------ accounts
export async function signUp(p: Page, name: string, email: string, lang: Lang) {
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.getByText('Welcome to Vocab Brain').waitFor({ timeout: 90_000 });
  await p.getByRole('tab', { name: 'Create account' }).click();
  await p.fill('#signup-name', name);
  await p.fill('#signup-email', email);
  await p.fill('#signup-password', 'secret123');
  await p.getByRole('button', { name: 'Create account', exact: true }).click();
  await p.waitForURL('**/onboarding', { timeout: 60_000 });
  if (lang === 'en') {
    const c = (n: string, role: 'button' | 'radio' = 'button') => p.getByRole(role, { name: n, exact: true }).click();
    await c('English', 'radio'); await c('Continue');
    await c('IELTS', 'radio'); await c('Continue');
    await c('7.0', 'radio'); await c('Continue');
    await c('No', 'radio'); await c('Continue');
    await p.getByRole('radio', { name: /5 hours/ }).click(); await c('Continue');
    await c('Later, take me Home');
  } else {
    const go = () => p.getByRole('button', { name: 'এগিয়ে যাও', exact: true }).click();
    await p.getByRole('radio', { name: 'বাংলা' }).click(); await go();
    await p.getByRole('radio', { name: 'IELTS' }).click(); await go();
    await p.getByRole('radio', { name: '7.0' }).click(); await go();
    await p.getByRole('radio', { name: 'না', exact: true }).click(); await go();
    await p.getByRole('radio').nth(1).click(); await go();
    await p.getByRole('button', { name: /পরে করবো/ }).click();
  }
  await p.waitForURL(BASE + '/', { timeout: 60_000 });
}

export async function signIn(p: Page, email: string) {
  await p.goto(BASE + '/', { waitUntil: 'load' });
  await p.getByText('Welcome to Vocab Brain').waitFor({ timeout: 90_000 });
  await p.fill('#signin-email', email);
  await p.fill('#signin-password', 'secret123');
  await p.getByRole('button', { name: 'Sign in', exact: true }).click();
  await p.waitForURL(BASE + '/', { timeout: 60_000 });
}

export const uidOf = (p: Page) =>
  p.evaluate(() => {
    for (const k of Object.keys(localStorage)) if (k.startsWith('firebase:authUser')) return JSON.parse(localStorage.getItem(k)!).uid as string;
    return null;
  });

// ------------------------------------------------------------------ firestore (emulator, owner access)
type FsValue = Record<string, unknown>;
const fromValue = (v: FsValue): unknown =>
  'stringValue' in v ? v.stringValue
  : 'integerValue' in v ? Number(v.integerValue)
  : 'doubleValue' in v ? v.doubleValue
  : 'booleanValue' in v ? v.booleanValue
  : 'nullValue' in v ? null
  : 'timestampValue' in v ? v.timestampValue
  : 'arrayValue' in v ? (((v.arrayValue as { values?: FsValue[] }).values ?? []).map(fromValue))
  : 'mapValue' in v ? Object.fromEntries(Object.entries((v.mapValue as { fields?: Record<string, FsValue> }).fields ?? {}).map(([k, x]) => [k, fromValue(x)]))
  : v;
const toValue = (v: unknown): FsValue =>
  v === null || v === undefined ? { nullValue: null }
  : typeof v === 'string' ? { stringValue: v }
  : typeof v === 'number' ? (Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v })
  : typeof v === 'boolean' ? { booleanValue: v }
  : Array.isArray(v) ? { arrayValue: { values: v.map(toValue) } }
  : { mapValue: { fields: Object.fromEntries(Object.entries(v as object).map(([k, x]) => [k, toValue(x)])) } };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getDoc(docPath: string): Promise<any> {
  const j = await (await fetch(`${FS}/${docPath}`, { headers: { Authorization: 'Bearer owner' } })).json();
  return j.fields ? fromValue({ mapValue: { fields: j.fields } }) : null;
}

/** Replace one top-level-path field (e.g. "app.foundation.concepts") of a document. */
export async function patchField(docPath: string, fieldPath: string, value: unknown) {
  const keys = fieldPath.split('.');
  const nested = keys.reduceRight<unknown>((acc, k) => ({ [k]: acc }), value) as object;
  const r = await fetch(`${FS}/${docPath}?updateMask.fieldPaths=${encodeURIComponent(fieldPath)}`, {
    method: 'PATCH',
    headers: { Authorization: 'Bearer owner', 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: (toValue(nested) as { mapValue: { fields: object } }).mapValue.fields }),
  });
  if (!r.ok) throw new Error(`patch ${r.status} ${(await r.text()).slice(0, 200)}`);
}

/** Wait until the stored Foundation progress satisfies `ok` (writes are debounced). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function waitForFoundation(uid: string, ok: (f: any) => boolean, timeoutMs = 15_000) {
  const end = Date.now() + timeoutMs;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let f: any = null;
  while (Date.now() < end) {
    f = (await getDoc(`users/${uid}`))?.app?.foundation ?? null;
    if (f && ok(f)) return f;
    await new Promise((r) => setTimeout(r, 500));
  }
  return f;
}

// ------------------------------------------------------------------ answering from the content
const EXERCISES = new Map<string, Exercise>();
for (const l of MODULES.flatMap((m) => m.lessons)) for (const s of l.steps) if (s.kind === 'practice') for (const e of s.exercises) EXERCISES.set(e.id, e);
for (const c of CHALLENGES) for (const part of c.parts) for (const e of part.items) EXERCISES.set(e.id, e);
export const exercise = (id: string) => EXERCISES.get(id);

export interface AnswerOptions {
  /** Answer this question wrong on purpose. */
  wrong?: boolean;
  /** Text for a personal (write) task. */
  write?: string;
  /** Runs after Mino's feedback on a write task, before moving on. */
  afterWrite?: (p: Page) => Promise<void>;
}

/** Answers the question on screen and moves on. Returns its id. */
export async function answerCurrent(p: Page, opts: AnswerOptions = {}): Promise<string> {
  const box = p.locator('[data-exercise-id]');
  const id = (await box.getAttribute('data-exercise-id'))!;
  const e = exercise(id);
  if (!e) throw new Error(`unknown exercise ${id}`);
  const action = box.locator('div.flex.justify-end > button');
  const right = !opts.wrong;
  switch (e.type) {
    case 'choice': {
      const pick = right ? e.answer : e.options.find((o) => o !== e.answer)!;
      await box.getByRole('radio', { name: pick, exact: true }).click();
      break;
    }
    case 'gap':
      await box.getByRole('textbox').fill(right ? canonicalAnswer(e) : 'xyz');
      break;
    case 'correct':
      await box.getByRole('textbox').fill(right ? canonicalAnswer(e) : (e.sentence ?? 'xyz'));
      break;
    case 'spot': {
      await box.locator('p[lang=en] > button').nth(right ? e.wrong : e.wrong === 0 ? 1 : 0).click();
      const fix = right ? e.accepted[0] : 'xyz';
      if (e.fixOptions) await box.getByRole('radio', { name: right ? fix : e.fixOptions.find((o) => !e.accepted.includes(o))!, exact: true }).click();
      else await box.getByRole('textbox').fill(fix);
      break;
    }
    case 'order': {
      const pool = box.locator('div.flex.flex-wrap.gap-2').last();
      const words = orderWords(canonicalAnswer(e));
      for (const w of right ? words : [...words].reverse()) await pool.getByRole('button', { name: w, exact: true }).first().click();
      break;
    }
    case 'write':
      await box.getByRole('textbox').fill(opts.write ?? e.model);
      break;
    default:
      throw new Error(`no driver for ${e.type}`);
  }
  await action.click(); // Check / Get Mino's feedback
  await action.waitFor();
  if (e.type === 'write') {
    await p.waitForFunction((sel) => !document.querySelector(sel)?.hasAttribute('disabled'), '[data-exercise-id] div.flex.justify-end > button', { timeout: 30_000 });
    if (opts.afterWrite) await opts.afterWrite(p);
  }
  await action.click(); // Next / Complete / See result
  return id;
}

/**
 * Plays a lesson from its first step to "Complete lesson". Hook and discover
 * steps pick the first option; every question is answered from the content.
 */
export async function playLesson(p: Page, lang: Lang, opts: { wrong?: string[]; write?: string; afterWrite?: (p: Page) => Promise<void> } = {}) {
  const seen: string[] = [];
  for (let i = 0; i < 200; i++) {
    const box = p.locator('[data-exercise-id]');
    if (await box.count()) {
      const id = (await box.getAttribute('data-exercise-id'))!;
      const e = exercise(id)!;
      seen.push(id);
      await answerCurrent(p, { wrong: opts.wrong?.includes(id), ...(e.type === 'write' ? { write: opts.write, afterWrite: opts.afterWrite } : {}) });
      continue;
    }
    const complete = p.getByRole('button', { name: LABELS[lang].complete });
    if (await complete.isVisible().catch(() => false)) {
      await complete.click();
      return seen;
    }
    const radios = p.locator('main [role=radiogroup] [role=radio]');
    if ((await radios.count()) && !(await p.locator('main [role=radio][aria-checked=true]').count())) await radios.first().click();
    const next = p.getByRole('button', { name: LABELS[lang].continue });
    if (await next.isEnabled({ timeout: 2000 }).catch(() => false)) await next.click();
    else await p.waitForTimeout(250);
  }
  throw new Error(`lesson did not finish (answered ${seen.join(', ')})`);
}
