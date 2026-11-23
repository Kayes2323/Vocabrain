// E2E (emulators only): My Brain Phase 0 — trust & data integrity.
// Run with `bash scripts/e2e/run.sh brain-integrity`.
//
//  [1] Firestore rules, executed with real ID tokens: valid / legacy words accepted; stage 999, nextReviewAt "not-a-date",
//      bad status, oversize history, 65-char word refused; another user still gets 403 on read, list and write.
//  [2] Counts: the Learning tile and the Learning tab show the same number (the audit's 1 vs 8).
//  [3] Recall attempts: a correct answer is stored before any rating; closing the card keeps it; the rating refines
//      the same attempt (no second attempt); a double tap rates once; a wrong answer is stored at once.
//  [4] Honest load states: a real permission error is shown as an error with Retry (never "empty", never a 404);
//      Retry recovers when the problem is gone.
//  [5] Failed write: the answer is not silently lost; the learner is told; Try again stores it exactly once.
//  [6] Missing meaning: Writing and Speaking ask for the meaning instead of building a prompt; the learner's own
//      words are what get saved.
//  [7] Migration: a failing destination write leaves its legacy id in place; unresolvable ids are never deleted;
//      existing progress is never overwritten; once writes work again the rest migrates and nothing is duplicated.
import fs from 'node:fs';
import { applyRecall, createBrainWord } from '../../lib/engine';
import { getWordBankInfo } from '../../lib/content/dictionary';
import { BASE, check, getDoc, launch, noHorizontalScroll, patchField, putDoc, report, shot, signUp, uidOf, watchErrors } from './helpers';

const errors: string[] = [];
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const FS = 'http://127.0.0.1:8080/v1/projects/demo-vocabbrain/databases/(default)/documents';
const AUTH = 'http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=demo-key';
const RULES_URL = 'http://127.0.0.1:8080/emulator/v1/projects/demo-vocabbrain:securityRules';
const ORIGINAL_RULES = fs.readFileSync('firestore.rules', 'utf8');
const NOW = new Date();

// ---------------------------------------------------------------- helpers
async function setRules(content: string) {
  const r = await fetch(RULES_URL, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rules: { files: [{ name: 'firestore.rules', content }] } }) });
  if (!r.ok) throw new Error(`rules swap failed ${r.status} ${await r.text()}`);
}
const VOCAB_READ = 'allow read, delete: if isOwner(uid);\n        allow create, update: if isOwner(uid) && validBrainWord';
const swap = (from: string, to: string) => { if (!ORIGINAL_RULES.includes(from)) throw new Error('rules text changed: ' + from.slice(0, 40)); return ORIGINAL_RULES.replace(from, to); };
const denyVocabRead = () => swap(VOCAB_READ, 'allow delete: if isOwner(uid);\n        allow create, update: if isOwner(uid) && validBrainWord');
const WRITE = 'allow create, update: if isOwner(uid) && validBrainWord(request.resource.data);';
const denyVocabWrite = () => swap(WRITE, 'allow create, update: if false;');
const denyVocabWriteFor = (id: string) => swap(WRITE, `allow create, update: if isOwner(uid) && vocabId != '${id}' && validBrainWord(request.resource.data);`);

type Fs = Record<string, unknown>;
const toVal = (v: unknown): Fs =>
  typeof v === 'string' ? { stringValue: v }
  : typeof v === 'number' ? (Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v })
  : typeof v === 'boolean' ? { booleanValue: v }
  : Array.isArray(v) ? { arrayValue: { values: v.map(toVal) } }
  : { mapValue: { fields: Object.fromEntries(Object.entries(v as object).filter(([, x]) => x !== undefined).map(([k, x]) => [k, toVal(x)])) } };
const fieldsOf = (o: object) => (toVal(JSON.parse(JSON.stringify(o))) as { mapValue: { fields: object } }).mapValue.fields;

async function newUser(label: string) {
  const r = await (await fetch(AUTH, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: `${label}-${Date.now()}@test.dev`, password: 'secret123', returnSecureToken: true }) })).json();
  return { uid: r.localId as string, token: r.idToken as string };
}
const send = (token: string, method: 'GET' | 'PATCH' | 'DELETE', path: string, body?: object) =>
  fetch(`${FS}/${path}`, { method, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify({ fields: fieldsOf(body) }) } : {}) });

const word = (lemma: string, bn: string, over: Record<string, unknown> = {}) =>
  ({ ...createBrainWord({ word: lemma, lemma, meaning: `meaning of ${lemma}`, meaningBn: bn, partOfSpeech: 'adjective', synonyms: ['alike'], antonyms: [], collocations: [], exampleSentence: `The ${lemma} thing.`, dictionarySource: 'glossary' }, { type: 'manual', title: 'Test' }, `A ${lemma} sentence.`, NOW), ...over });
const seed = async (uid: string, w: { id: string }) => putDoc(`users/${uid}/vocabulary/${w.id}`, w);
async function waitFor<T>(fn: () => Promise<T | null | undefined | false>, ms = 15000): Promise<T | null> {
  const end = Date.now() + ms;
  while (Date.now() < end) { const v = await fn(); if (v) return v as T; await sleep(400); }
  return null;
}
const stat = async (p: import('playwright-core').Page, id: string) => (await p.getByTestId(id).locator('dd').innerText()).trim();

async function main() {
  const browser = await launch();
  try {
    // ================================================================ [1] rules
    console.log('\n[1] Firestore rules, executed with real tokens');
    const a = await newUser('rules-a'); const b = await newUser('rules-b');
    const base = createBrainWord({ word: 'abundant', lemma: 'abundant', meaning: 'plentiful', synonyms: [], antonyms: [], collocations: [], dictionarySource: 'glossary' }, { type: 'manual', title: 't' }, undefined, NOW);
    const put = (patch: object, id = 'abundant', tok = a) => send(tok.token, 'PATCH', `users/${tok.uid}/vocabulary/${id}`, { ...base, ...patch }).then((r) => r.status);
    check('rules: a valid Brain word is accepted', (await put({})) === 200);
    const { confidence: _c, antonyms: _an, usageHistory: _u, ...legacy } = base as unknown as Record<string, unknown>;
    void _c; void _an; void _u;
    check('rules: a word saved by an older version (fewer fields) is still accepted (existing-user compatibility)', (await send(a.token, 'PATCH', `users/${a.uid}/vocabulary/legacy`, legacy)).status === 200);
    check('rules: a word with an unrated recall attempt (new fields) is accepted', (await put({ recallHistory: [applyRecall(base, 'recall-en', true, 'x', NOW, undefined, 'a1').recallHistory[0]] })) === 200);
    for (const [name, patch] of [
      ['stage 999 (the audit\'s example)', { stage: 999 }], ['stage -1', { stage: -1 }], ['stage 2.5', { stage: 2.5 }], ['stage "3" (text)', { stage: '3' }],
      ['nextReviewAt "not-a-date" (the audit\'s example)', { nextReviewAt: 'not-a-date' }], ['nextReviewAt "2026-13-45T25:61:00.000Z"', { nextReviewAt: '2026-13-45T25:61:00.000Z' }], ['nextReviewAt a plain date', { nextReviewAt: '2026-09-30' }],
      ['status "god"', { status: 'god' }], ['recallCount -5', { recallCount: -5 }], ['confidence 500', { confidence: 500 }],
      ['21 recall attempts', { recallHistory: Array.from({ length: 21 }, () => ({ at: NOW.toISOString(), exercise: 'choice', correct: true })) }],
      ['65-character word', { word: 'x'.repeat(65) }], ['empty word', { word: '' }], ['41 synonyms', { synonyms: Array(41).fill('a') }],
    ] as [string, object][]) check(`rules: refused — ${name}`, (await put(patch, 'bad')) === 403);
    check('rules: the refused words were never written', (await send(a.token, 'GET', `users/${a.uid}/vocabulary/bad`)).status === 404);
    check('rules: another user still cannot read, list or write this user\'s words', (await send(b.token, 'GET', `users/${a.uid}/vocabulary/abundant`)).status === 403 && (await send(b.token, 'GET', `users/${a.uid}/vocabulary`)).status === 403 && (await put({}, 'abundant', { uid: a.uid, token: b.token })) === 403);
    check('rules: the owner can still delete their own word', (await send(a.token, 'DELETE', `users/${a.uid}/vocabulary/legacy`)).status === 200);

    // ================================================================ signed-in learner
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    watchErrors(p, 'EN', errors);
    await signUp(p, 'Rafi', `brain-integrity-${Date.now()}@test.dev`, 'en');
    const uid = (await uidOf(p))!;
    await p.getByTestId('quick-access').waitFor({ timeout: 60_000 });

    const names = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel'];
    const words = names.map((n, i) => word(n, `${n}-এর অর্থ`, { meaning: `an invented test meaning number ${i + 1} for ${n}` }));
    const learning = applyRecall(words[0], 'recall-en', true, 'alpha', NOW, 'good');
    const all = [learning, ...words.slice(1)];
    for (const w of all) await seed(uid, w);

    // ================================================================ [2] counts
    console.log('\n[2] The Learning tile and the Learning tab agree');
    await p.goto(BASE + '/ielts/vocabulary/notebook', { waitUntil: 'load' });
    await p.getByTestId('brain-stats').waitFor({ timeout: 30_000 });
    await p.waitForFunction(() => document.querySelector('[data-testid="stat-words"] dd')?.textContent?.trim() === '8', null, { timeout: 20_000 });
    const tiles = [await stat(p, 'stat-words'), await stat(p, 'stat-due'), await stat(p, 'stat-learning'), await stat(p, 'stat-mastered')].join(',');
    const tabs = (await p.locator('[data-filter]').evaluateAll((els) => els.map((e) => e.textContent!.replace(/\s+/g, ' ').trim()))).join('|');
    check('tiles: 8 Words · 7 Review today (1 recalled word is not due until tomorrow) · 1 Learning · 0 Mastered', tiles === '8,7,1,0', tiles);
    check('tabs: All 8 | New 7 | Learning 1 | Review 7 | Mastered 0 — the same Learning number as the tile', tabs === 'All 8|New 7|Learning 1|Review 7|Mastered 0', tabs);
    await p.locator('[data-filter="learning"]').click();
    check('the Learning tab lists exactly that one word', (await p.locator('[data-testid="notebook"] a[href*="/notebook/"]').count()) === 1);
    await p.locator('[data-filter="new"]').click();
    check('the New tab lists the 7 never-recalled words', (await p.locator('[data-testid="notebook"] a[href*="/notebook/"]').count()) === 7);
    await p.setViewportSize({ width: 390, height: 844 });
    check('mobile: five tabs fit without horizontal scrolling', await noHorizontalScroll(p));
    await shot(p, 'brain-integrity-notebook-mobile');
    await p.setViewportSize({ width: 1280, height: 900 });

    // ================================================================ [3] attempt lifecycle
    console.log('\n[3] Recall attempts');
    const answer = async (how: 'right' | 'dontknow') => {
      await p.getByTestId('recall-check').waitFor({ timeout: 20_000 });
      const card = p.locator('[data-recall-word]');
      const id = (await card.getAttribute('data-recall-word'))!; const format = (await card.getAttribute('data-recall-format'))!;
      const w = await getDoc(`users/${uid}/vocabulary/${id}`);
      if (how === 'dontknow') { await p.getByRole('button', { name: /I don’t know/ }).click(); return { id, format, w }; }
      if (format === 'choice') await card.getByRole('radio', { name: w.meaning, exact: true }).click();
      else if (format === 'meaning') await card.locator('#recall-answer').fill(w.meaning);
      else if (format === 'recall-en' || format === 'context' || format === 'completion') await card.locator('#recall-answer').fill(w.word);
      else throw new Error(`unexpected first format ${format}`);
      await p.getByTestId('recall-check').click();
      return { id, format, w };
    };
    await p.goto(BASE + '/review', { waitUntil: 'load' });
    await p.getByTestId('recall-begin').click();
    const first = await answer('right');
    await p.getByTestId('recall-ratings').waitFor({ timeout: 10_000 });
    const stored1 = await waitFor(async () => { const d = await getDoc(`users/${uid}/vocabulary/${first.id}`); return d.recallCount === 1 ? d : null; });
    check('REPRO fixed: the correct answer is stored BEFORE any rating is chosen', stored1 !== null && stored1.successfulRecallCount === 1 && stored1.recallHistory.length === 1 && !stored1.recallHistory[0].rating, JSON.stringify(stored1?.recallHistory));
    check('the stored attempt is marked answered-but-unrated (kept with what a later rating needs) and has a stable key', Boolean(stored1?.recallHistory[0].id) && Boolean(stored1?.recallHistory[0].before));
    await p.getByRole('button', { name: 'Close' }).click();
    await p.waitForURL('**/ielts/vocabulary/notebook', { timeout: 15_000 });
    const afterClose = await getDoc(`users/${uid}/vocabulary/${first.id}`);
    check('closing the card without rating keeps the answer (the audit\'s lost-answer case): recallCount 1, stage 1, next review in the future', afterClose.recallCount === 1 && afterClose.stage === 1 && new Date(afterClose.nextReviewAt).getTime() > Date.now());

    await p.goto(BASE + '/review', { waitUntil: 'load' });
    await p.getByTestId('recall-begin').click();
    const second = await answer('right');
    await p.getByTestId('recall-ratings').waitFor({ timeout: 10_000 });
    const btn = p.getByTestId('recall-ratings').locator('[data-rating="easy"]');
    await Promise.all([btn.click(), btn.click({ timeout: 1500 }).catch(() => undefined)]); // a double tap
    const rated = await waitFor(async () => { const d = await getDoc(`users/${uid}/vocabulary/${second.id}`); return d.recallHistory?.[0]?.rating ? d : null; });
    check('rating refines the SAME attempt: one attempt, rating easy, rated time set, the pending snapshot removed', rated !== null && rated.recallHistory.length === 1 && rated.recallHistory[0].rating === 'easy' && Boolean(rated.recallHistory[0].ratedAt) && !rated.recallHistory[0].before, JSON.stringify(rated?.recallHistory));
    check('a double tap rated once; recallCount is 1 (not 2)', rated !== null && rated.recallCount === 1 && rated.successfulRecallCount === 1);
    check('Easy stretched the interval the way a rating always did (stage 1 → at least 2 days)', rated !== null && (new Date(rated.nextReviewAt).getTime() - Date.now()) / 86_400_000 >= 1.5, rated?.nextReviewAt);

    await p.goto(BASE + '/review', { waitUntil: 'load' });
    await p.getByTestId('recall-begin').click();
    const third = await answer('dontknow');
    await p.getByTestId('recall-next').waitFor({ timeout: 10_000 });
    const wrong = await waitFor(async () => { const d = await getDoc(`users/${uid}/vocabulary/${third.id}`); return d.recallCount === 1 ? d : null; });
    check('a wrong answer is stored immediately, with no rating needed', wrong !== null && wrong.recallHistory[0].correct === false && wrong.stage === 0 && wrong.consecutiveFailures === 1);

    // ================================================================ [4] honest load states
    console.log('\n[4] Honest load states (a real permission error from the emulator)');
    // A second learner on a second browser: nothing cached on this device, words only on the server.
    const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const q = await ctx2.newPage();
    watchErrors(q, 'MIG', errors);
    await signUp(q, 'Mina', `brain-migrate-${Date.now()}@test.dev`, 'en');
    const uid2 = (await uidOf(q))!;
    await q.getByTestId('quick-access').waitFor({ timeout: 60_000 });
    const existing = applyRecall(createBrainWord(getWordBankInfo('band6_001')!.info, { type: 'word-bank', title: 'IELTS word bank · Band 6' }, undefined, NOW), 'recall-en', true, 'abundant', NOW, 'good'); // learner already has progress on "abundant"
    await seed(uid2, existing);
    await setRules(denyVocabRead());
    await q.goto(BASE + '/ielts/vocabulary/notebook', { waitUntil: 'load' });
    const err = await q.getByTestId('brain-load-error').waitFor({ timeout: 40_000 }).then(() => true, () => false);
    const body = await q.locator('body').innerText();
    check('a failed load (nothing cached) shows an error with Retry', err && (await q.getByTestId('brain-load-error').getAttribute('data-kind')) === 'error' && (await q.getByTestId('brain-retry').count()) === 1, body.slice(0, 200));
    check('it is NOT shown as an empty notebook, nor as 0 words', !/My Brain is empty|No words yet|Save new words from Reading/.test(body) && (await q.getByTestId('brain-stats').count()) === 0);
    check('and it tells the learner the words are safe', /safe/.test(body));
    await shot(q, 'brain-integrity-load-error');
    await q.goto(BASE + '/ielts/vocabulary/notebook/abundant', { waitUntil: 'load' });
    await q.getByTestId('brain-load-error').waitFor({ timeout: 40_000 });
    check('a word page during a failed load shows the same error, not a 404', !/could not be found|404/i.test(await q.locator('body').innerText()));
    await q.goto(BASE + '/review', { waitUntil: 'load' });
    await q.getByTestId('brain-load-error').waitFor({ timeout: 40_000 });
    check('Today\'s Recall during a failed load shows the error, not "nothing to review"', !/Nothing due|all caught up|Nothing to review/i.test(await q.locator('body').innerText()));
    await q.goto(BASE + '/ielts/vocabulary/notebook', { waitUntil: 'load' });
    await q.getByTestId('brain-load-error').waitFor({ timeout: 40_000 });
    await q.getByTestId('brain-retry').click();
    await sleep(3000);
    check('Retry while the problem remains: still an error (never a silent empty list)', (await q.getByTestId('brain-load-error').count()) === 1);
    await setRules(ORIGINAL_RULES);
    await q.getByTestId('brain-retry').click();
    await q.getByTestId('brain-stats').waitFor({ timeout: 30_000 });
    await q.waitForFunction(() => document.querySelector('[data-testid="stat-words"] dd')?.textContent?.trim() === '1', null, { timeout: 20_000 });
    check('Retry after the problem is gone loads the learner\'s word', (await stat(q, 'stat-words')) === '1');
    // A device that already has the words keeps showing them when a refresh fails.
    await setRules(denyVocabRead());
    await p.goto(BASE + '/ielts/vocabulary/notebook', { waitUntil: 'load' });
    const cachedShown = await p.getByTestId('brain-stats').waitFor({ timeout: 40_000 }).then(() => true, () => false);
    const cachedNotice = await p.getByTestId('brain-sync-notice').waitFor({ timeout: 40_000 }).then(() => true, () => false);
    check('with words already on this device, a failed refresh keeps them on screen (not empty, not a 404)', cachedShown && !/My Brain is empty|No words yet/.test(await p.locator('body').innerText()) && (await stat(p, 'stat-words')) !== '0', `shown=${cachedShown}`);
    check('…and says the refresh failed, with a retry', cachedNotice && /refresh your words/.test(await p.getByTestId('brain-sync-notice').innerText()));
    await shot(p, 'brain-integrity-refresh-failed');
    await setRules(ORIGINAL_RULES);

    // ================================================================ [5] failed write
    console.log('\n[5] A failed write is not silently lost');
    await p.goto(BASE + '/review', { waitUntil: 'load' });
    await p.getByTestId('recall-begin').click();
    await setRules(denyVocabWrite());
    const fourth = await answer('right');
    await p.getByTestId('recall-save-failed').waitFor({ timeout: 20_000 });
    const unchanged = await getDoc(`users/${uid}/vocabulary/${fourth.id}`);
    check('the learner is told the answer could not be saved, with Try again', (await p.getByTestId('recall-save-retry').count()) === 1);
    check('nothing half-written reached the server', unchanged.recallCount === fourth.w.recallCount);
    await setRules(ORIGINAL_RULES);
    await p.getByTestId('recall-save-retry').click();
    const saved = await waitFor(async () => { const d = await getDoc(`users/${uid}/vocabulary/${fourth.id}`); return d.recallCount === fourth.w.recallCount + 1 ? d : null; });
    check('Try again stores the answer exactly once', saved !== null && saved.recallHistory.filter((h: { exercise: string }) => h.exercise === fourth.format).length >= 1 && saved.recallCount === fourth.w.recallCount + 1);
    await p.getByTestId('recall-save-failed').waitFor({ state: 'detached', timeout: 10_000 }).catch(() => undefined);
    check('the warning goes away once it is saved', (await p.getByTestId('recall-save-failed').count()) === 0);

    // ================================================================ [6] missing meaning
    console.log('\n[6] A word with no meaning');
    const bare = word('ubiquitous', 'x', { meaning: '', meaningBn: undefined, partOfSpeech: undefined, synonyms: [], exampleSentence: undefined });
    const bare2 = word('pervasive', 'x', { meaning: '', meaningBn: undefined, partOfSpeech: undefined, synonyms: [], exampleSentence: undefined });
    await seed(uid, bare); await seed(uid, bare2);
    await p.goto(BASE + `/practice/writing?word=ubiquitous`, { waitUntil: 'load' });
    await p.getByTestId('meaning-editor').waitFor({ timeout: 30_000 });
    check('Writing: no sentence prompt is built; the learner is asked to add the meaning', (await p.locator('#sentence').count()) === 0 && /Add a meaning for/.test(await p.getByTestId('meaning-editor').innerText()));
    await p.getByTestId('meaning-save').click();
    check('an empty meaning is not accepted', /at least 2 characters/.test(await p.getByTestId('meaning-editor').innerText()));
    await p.locator('#meaning-en').fill('  found everywhere  ');
    await p.getByTestId('meaning-save').click();
    await p.locator('#sentence').waitFor({ timeout: 20_000 });
    const meant = await getDoc(`users/${uid}/vocabulary/ubiquitous`);
    check('the learner\'s own words are saved (trimmed) — nothing invented — and the prompt now appears', meant.meaning === 'found everywhere' && !meant.meaningBn && /ubiquitous/.test(await p.locator('h1').innerText()));
    await p.goto(BASE + `/practice/speaking?word=pervasive`, { waitUntil: 'load' });
    await p.getByTestId('meaning-editor').waitFor({ timeout: 30_000 });
    check('Speaking: the same — no "a pervasive you have noticed" prompt; it asks for the meaning', (await p.getByRole('button', { name: 'Check my answer' }).count()) === 0 && !/you have noticed in your city/.test(await p.locator('body').innerText()));
    await p.locator('#meaning-bn').fill('সব জায়গায় ছড়িয়ে থাকা');
    await p.getByTestId('meaning-save').click();
    await p.getByRole('button', { name: 'Check my answer' }).waitFor({ timeout: 20_000 });
    const meant2 = await getDoc(`users/${uid}/vocabulary/pervasive`);
    check('Bangla-only meaning is accepted too; the prompt then avoids assuming a part of speech', meant2.meaningBn === 'সব জায়গায় ছড়িয়ে থাকা' && !/you have noticed in your city/.test(await p.locator('h1').innerText()), await p.locator('h1').innerText());
    await seed(uid, bare); // reset ubiquitous to bare for the auto-pick and detail checks
    await putDoc(`users/${uid}/vocabulary/ubiquitous`, bare);
    await p.goto(BASE + '/practice/writing', { waitUntil: 'load' });
    await p.locator('#sentence').waitFor({ timeout: 30_000 });
    check('automatic practice picks a word that has a meaning, not the bare one', !/ubiquitous/.test(await p.locator('h1').innerText()));
    await p.goto(BASE + '/ielts/vocabulary/notebook/ubiquitous', { waitUntil: 'load' });
    await p.getByTestId('meaning-editor').waitFor({ timeout: 30_000 });
    check('the word page offers the same editor for a word with no meaning', true);

    // ================================================================ [7] migration
    console.log('\n[7] Legacy migration');
    await setRules(denyVocabWriteFor('acquire'));
    await patchField(`users/${uid2}`, 'app.vocabulary.savedWordIds', ['band6_001', 'band6_002', 'band6_003', 'not-a-real-id']);
    const idsNow = async () => ((await getDoc(`users/${uid2}`))?.app?.vocabulary?.savedWordIds ?? []) as string[];
    const partway = await waitFor(async () => { const ids = await idsNow(); return !ids.includes('band6_001') && !ids.includes('band6_003') ? ids : null; }, 30_000);
    check('REPRO fixed: ids whose words were confirmed are removed from the old list…', partway !== null, JSON.stringify(await idsNow()));
    check('…but the id whose write FAILED stays (band6_002), and so does the id nothing can resolve — nothing is cleared wholesale', partway !== null && partway.includes('band6_002') && partway.includes('not-a-real-id'), JSON.stringify(partway));
    check('the failed word is not in the Brain; the two others are; existing progress on "abundant" is untouched', (await getDoc(`users/${uid2}/vocabulary/acquire`)) === null && (await getDoc(`users/${uid2}/vocabulary/adverse`)) !== null && (await getDoc(`users/${uid2}/vocabulary/abundant`)).recallCount === 1);
    await setRules(ORIGINAL_RULES);
    const finished = await waitFor(async () => { const ids = await idsNow(); return !ids.includes('band6_002') ? ids : null; }, 60_000);
    check('once writes work again, the remaining word migrates by itself and its id is then removed', finished !== null && (await getDoc(`users/${uid2}/vocabulary/acquire`)) !== null, JSON.stringify(await idsNow()));
    check('the unresolvable id is still there (never deleted)', finished !== null && finished.includes('not-a-real-id') && finished.length === 1);
    const list = await (await fetch(`${FS}/users/${uid2}/vocabulary?pageSize=50`, { headers: { Authorization: 'Bearer owner' } })).json();
    const docIds = (list.documents ?? []).map((d: { name: string }) => d.name.split('/').pop()).sort();
    check('exactly three words, no duplicates, and the existing word kept its progress', docIds.join() === 'abundant,acquire,adverse' && (await getDoc(`users/${uid2}/vocabulary/abundant`)).recallCount === 1, docIds.join());

    check('no console errors during the whole run', errors.filter((e) => !/Failed to load resource|permission|PERMISSION|403|Missing or insufficient/i.test(e)).length === 0, errors.slice(0, 4).join(' | '));
  } finally {
    await setRules(ORIGINAL_RULES).catch(() => undefined);
    await browser.close();
  }
}

main().then(() => process.exit(report()), (e) => { console.error(e); process.exit(1); });
