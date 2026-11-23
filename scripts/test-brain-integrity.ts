// Phase 0 — My Brain trust & data integrity. Unit tests for the Brain store (load / error / retry /
// failed writes / races), the recall attempt lifecycle, the legacy migration, learning-data validation,
// the missing-meaning fallback and the progress counts. Each test reproduces the original failure first
// (see "REPRO") and then checks the fix.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  BRAIN_FILTERS, BrainStore, BrainValidationError, applyRating, applyRecall, brainCounts, brainSummary, brainView, brainWordIssues, createBrainWord, hasUsableMeaning,
  isValidBrainWord, matchesBrainFilter, sanitizeBrainWord, speakingPrompt, wordId, type BrainStoreOptions,
} from '../lib/engine';
import { getWordBankInfo } from '../lib/content/dictionary';
import type { BrainWord, RecallRating, WordInfo } from '../lib/models';
import type { BrainRepository, SnapshotMeta } from '../lib/services/brain-repository';

let passed = 0;
const tests: [string, () => Promise<void> | void][] = [];
const test = (name: string, fn: () => Promise<void> | void) => tests.push([name, fn]);

const NOW = new Date('2026-09-30T10:00:00.000Z');
const info = (lemma: string, over: Partial<WordInfo> = {}): WordInfo => ({
  word: lemma, lemma, meaning: `meaning of ${lemma}`, meaningBn: `${lemma}-এর অর্থ`, partOfSpeech: 'adjective', synonyms: ['plentiful'], antonyms: [], collocations: [],
  exampleSentence: `The region has an ${lemma} supply.`, dictionarySource: 'glossary', ...over,
});
const mk = (lemma: string, over: Partial<WordInfo> = {}): BrainWord => createBrainWord(info(lemma, over), { type: 'manual', title: 't' }, `A ${lemma} sentence.`, NOW);
const SOURCE = { type: 'manual' as const, title: 't' };

/** A repository whose answers the test controls. */
class FakeRepo implements BrainRepository {
  docs = new Map<string, BrainWord>();
  puts: string[] = [];
  putIfAbsentCalls: string[] = [];
  confirmCalls = 0;
  failPut: ((w: BrainWord) => unknown) | undefined;
  failConfirm = false;
  /** Ids the server does not report even though the write call returned (a write that did not land). */
  notOnServer = new Set<string>();
  failPutIfAbsent: ((w: BrainWord) => unknown) | undefined;
  onChange?: (w: BrainWord[], m: SnapshotMeta) => void;
  onError?: (e: unknown) => void;
  subscribes = 0;
  delay = 0;
  subscribe(_u: string, onChange: (w: BrainWord[], m: SnapshotMeta) => void, onError?: (e: unknown) => void) {
    this.subscribes++;
    this.onChange = onChange;
    this.onError = onError;
    return () => { this.onChange = undefined; };
  }
  emit(words = [...this.docs.values()], fromCache = false) { this.onChange?.(JSON.parse(JSON.stringify(words)), { fromCache }); }
  async put(_u: string, w: BrainWord) {
    if (this.delay) await new Promise((r) => setTimeout(r, this.delay));
    const err = this.failPut?.(w);
    if (err) throw err;
    this.puts.push(w.id);
    this.docs.set(w.id, JSON.parse(JSON.stringify(w)));
  }
  async putIfAbsent(_u: string, w: BrainWord) {
    this.putIfAbsentCalls.push(w.id);
    const err = this.failPutIfAbsent?.(w);
    if (err) throw err;
    if (this.docs.has(w.id)) return false;
    this.docs.set(w.id, JSON.parse(JSON.stringify(w)));
    return true;
  }
  async confirm(_u: string, ids: string[]) {
    this.confirmCalls++;
    if (this.failConfirm) throw Object.assign(new Error('offline'), { code: 'unavailable' });
    return ids.filter((id) => this.docs.has(id) && !this.notOnServer.has(id));
  }
  async remove(_u: string, id: string) {
    const err = this.failPut?.({ id } as BrainWord);
    if (err) throw err;
    this.docs.delete(id);
  }
}

/** Manual timers so the "unconfirmed" delay is tested without waiting. */
function manualTimers() {
  const pending: { fn: () => void; ms: number; id: number }[] = [];
  let n = 0;
  const timers: BrainStoreOptions['timers'] = { set: (fn, ms) => { pending.push({ fn, ms, id: ++n }); return n; }, clear: (h) => { const i = pending.findIndex((p) => p.id === h); if (i >= 0) pending.splice(i, 1); } };
  return { timers, fire: () => { const p = pending.splice(0); p.forEach((x) => x.fn()); }, count: () => pending.length };
}
const transient = Object.assign(new Error('network'), { code: 'unavailable' });
const denied = Object.assign(new Error('rules'), { code: 'permission-denied' });
const makeStore = (repo: FakeRepo, opts: BrainStoreOptions = {}) => new BrainStore(repo, 'u1', { now: () => NOW, ...opts });
const loaded = (repo: FakeRepo, store: BrainStore) => { store.start(); repo.emit(); return store; };

// =============================================================================== 1. recall attempt lifecycle
test('REPRO + fix: a correct answer is stored on its own, before any rating; the rating only refines it', () => {
  const w = mk('abundant');
  // REPRO of the original failure: with the old flow nothing was stored until a rating arrived — a word whose
  // answer was never rated stayed at recallCount 0 / stage 0.
  const answered = applyRecall(w, 'recall-en', true, 'abundant', NOW, undefined, 'a1');
  assert.equal(answered.recallCount, 1); assert.equal(answered.successfulRecallCount, 1); assert.equal(answered.stage, 1);
  assert.ok(answered.recallHistory[0].before, 'an unrated answer keeps what it needs to take a rating later');
  assert.equal(answered.recallHistory[0].rating, undefined); assert.equal(answered.recallHistory[0].ratedAt, undefined);
});

test('rating after the answer gives exactly the schedule the rating would have given with the answer (every rating, every stage, streaks)', () => {
  const ratings: RecallRating[] = ['again', 'hard', 'good', 'easy'];
  for (let stage = 0; stage <= 6; stage++) {
    for (const streak of [false, true]) {
      let base = mk('abundant');
      base = { ...base, stage, recallCount: stage + 1, successfulRecallCount: stage, consecutiveFailures: 0, recallHistory: streak ? [{ at: NOW.toISOString(), exercise: 'recall-en', correct: true }, { at: NOW.toISOString(), exercise: 'recall-en', correct: true }] : [] };
      for (const r of ratings) {
        const together = applyRecall(base, 'recall-en', true, 'abundant', NOW, r);
        const separate = applyRating(applyRecall(base, 'recall-en', true, 'abundant', NOW, undefined, 'a1'), 'a1', r, NOW);
        for (const f of ['stage', 'nextReviewAt', 'recallCount', 'successfulRecallCount', 'consecutiveFailures', 'status', 'confidence'] as const) assert.deepEqual(separate[f], together[f], `stage ${stage} streak ${streak} rating ${r}: ${f}`);
        assert.equal(separate.recallHistory.at(-1)!.rating, r); assert.ok(separate.recallHistory.at(-1)!.ratedAt); assert.equal(separate.recallHistory.at(-1)!.before, undefined);
      }
    }
  }
});

test('the same attempt recorded twice is stored once; a rating applied twice is applied once; first rating wins', () => {
  const w = mk('abundant');
  const once = applyRecall(w, 'recall-en', true, 'x', NOW, undefined, 'a1');
  const twice = applyRecall(once, 'recall-en', true, 'x', NOW, undefined, 'a1');
  assert.equal(twice, once); assert.equal(twice.recallCount, 1);
  const rated = applyRating(once, 'a1', 'easy', NOW);
  assert.equal(applyRating(rated, 'a1', 'hard', NOW), rated, 'a second rating changes nothing');
  assert.equal(rated.recallHistory[0].rating, 'easy');
  assert.equal(applyRating(once, 'unknown', 'easy', NOW), once, 'an unknown attempt is ignored');
});

test('a rating for an attempt that is no longer the latest is noted but never rewrites the schedule', () => {
  const a = applyRecall(mk('abundant'), 'recall-en', true, 'x', NOW, undefined, 'a1');
  const b = applyRecall(a, 'recall-en', true, 'x', new Date(NOW.getTime() + 1000), undefined, 'a2');
  const late = applyRating(b, 'a1', 'hard', NOW);
  assert.equal(late.stage, b.stage); assert.equal(late.nextReviewAt, b.nextReviewAt); assert.equal(late.recallHistory[0].rating, 'hard'); assert.equal(late.recallHistory[0].before, undefined);
});

test('a wrong answer is stored immediately and needs no rating; "Again" on an answered attempt turns it into a failed recall', () => {
  const w = mk('abundant');
  const wrong = applyRecall(w, 'recall-en', false, 'nope', NOW, undefined, 'w1');
  assert.equal(wrong.stage, 0); assert.equal(wrong.consecutiveFailures, 1);
  const again = applyRating(applyRecall(w, 'recall-en', true, 'x', NOW, undefined, 'c1'), 'c1', 'again', NOW);
  assert.equal(again.stage, 0); assert.equal(again.successfulRecallCount, 0); assert.equal(again.recallHistory[0].correct, false);
});

test('existing history (no attempt ids) keeps working: old attempts are untouched and new ones append', () => {
  const old: BrainWord = { ...mk('abundant'), recallCount: 2, successfulRecallCount: 2, stage: 2, recallHistory: [{ at: NOW.toISOString(), exercise: 'choice', correct: true, rating: 'good' }, { at: NOW.toISOString(), exercise: 'recall-en', correct: true }] };
  const next = applyRecall(old, 'context', true, 'x', NOW, undefined, 'n1');
  assert.equal(next.recallHistory.length, 3); assert.equal(next.recallHistory[0].id, undefined);
  assert.equal(applyRating(old, 'n1', 'good', NOW), old);
});

test('the Review screen stores the answer before the rating (source audit of ReviewSession)', () => {
  const src = readFileSync('components/review/ReviewSession.tsx', 'utf8');
  assert.match(src, /const recordAnswered = async/); assert.match(src, /await recordAnswered\(\); \/\/ 'correct' or 'close'/);
  assert.match(src, /await recordAnswered\(\);\n/); assert.match(src, /brain\.rateRecall\(word\.id, card\.attemptId, r\)/);
  assert.match(src, /attemptId: string;/); assert.match(src, /if \(rating\.current\) return;/);
  assert.match(src, /data-testid="recall-save-failed"/);
});

// =============================================================================== 2. the store: loading and errors
test('REPRO + fix: a failed load is an error, not an empty list; words already loaded stay; Retry resubscribes', () => {
  const repo = new FakeRepo(); const store = makeStore(repo);
  store.start();
  assert.equal(brainView(store.getState()), 'loading');
  repo.onError?.(Object.assign(new Error('x'), { code: 'unavailable' }));
  assert.equal(brainView(store.getState()), 'error', 'REPRO: the old provider showed words=[] (empty) here');
  assert.equal(store.getState().words.length, 0); assert.ok(store.getState().error);
  store.retryLoad();
  assert.equal(repo.subscribes, 2); assert.equal(brainView(store.getState()), 'loading');
  repo.docs.set('a', mk('abundant')); repo.emit();
  assert.equal(brainView(store.getState()), 'ready'); assert.equal(store.getState().error, undefined);
  // an error after words were loaded keeps them on screen
  repo.onError?.(transient);
  assert.equal(store.getState().words.length, 1); assert.equal(brainView(store.getState()), 'ready'); assert.equal(store.getState().status, 'error');
  store.retryLoad();
  assert.equal(store.getState().words.length, 1, 'retry keeps what is on screen');
});

test('an empty list from the device cache is not "no words": it stays loading, then unconfirmed, and a server answer resolves it', () => {
  const repo = new FakeRepo(); const t = manualTimers(); const store = makeStore(repo, { timers: t.timers });
  store.start(); repo.emit([], true);
  assert.equal(brainView(store.getState()), 'loading'); assert.equal(t.count(), 1);
  t.fire();
  assert.equal(brainView(store.getState()), 'unconfirmed', 'offline + nothing cached must not look like an empty notebook');
  repo.emit([], false);
  assert.equal(brainView(store.getState()), 'empty', 'only a server-confirmed empty list is empty'); assert.equal(store.getState().status, 'ready');
});

test('cached words are real words (shown at once, flagged as from the cache); a server snapshot clears the flag', () => {
  const repo = new FakeRepo(); const store = makeStore(repo); store.start();
  repo.emit([mk('abundant')], true);
  assert.equal(brainView(store.getState()), 'ready'); assert.equal(store.getState().fromCache, true);
  repo.emit([mk('abundant')], false);
  assert.equal(store.getState().fromCache, false);
});

test('view: loading / empty / ready / error / unconfirmed are five distinct states', () => {
  assert.deepEqual(
    (['loading', 'ready', 'error', 'unconfirmed'] as const).flatMap((status) => [0, 1].map((n) => brainView({ status, words: Array.from({ length: n }, () => mk('abundant')) }))),
    ['loading', 'loading', 'empty', 'ready', 'error', 'ready', 'unconfirmed', 'ready'],
  );
});

test('every Brain screen goes through the gate and a failed load can never reach notFound() or "No words yet" (source audit)', () => {
  for (const f of ['app/(app)/ielts/vocabulary/notebook/page.tsx', 'app/(app)/ielts/vocabulary/notebook/[id]/page.tsx', 'components/review/ReviewSession.tsx', 'components/practice/WritingPractice.tsx', 'components/practice/SpeakingPractice.tsx', 'components/vocab-foundation/VocabFoundationHome.tsx', 'components/vocab-foundation/MissionSession.tsx', 'app/(app)/ielts/vocabulary/reading/page.tsx']) {
    const src = readFileSync(f, 'utf8');
    assert.match(src, /useBrainGate\(\)/, `${f} uses the gate`);
    assert.ok(!/if \(brain\.loading\)/.test(src), `${f} no longer treats only "loading" as not-ready`);
  }
  const detail = readFileSync('app/(app)/ielts/vocabulary/notebook/[id]/page.tsx', 'utf8');
  assert.ok(detail.indexOf('useBrainGate()') < detail.indexOf('notFound()'), 'the gate runs before notFound()');
  assert.match(readFileSync('components/shell/AppShell.tsx', 'utf8'), /<BrainSyncNotice \/>/);
  assert.match(readFileSync('components/progress/ProgressDashboard.tsx', 'utf8'), /brain\.view === 'ready' \|\| brain\.view === 'empty'/);
});

// =============================================================================== 3. the store: writes
test('REPRO + fix: a failed write is reported, the learner\'s change is kept as "unsaved", survives a server snapshot, and Save again works', async () => {
  const repo = new FakeRepo(); const w = mk('abundant'); repo.docs.set(w.id, w); const store = loaded(repo, makeStore(repo));
  repo.failPut = () => transient;
  await assert.rejects(store.recordRecall(w.id, 'recall-en', true, 'abundant', undefined, 'a1'), /network/);
  assert.deepEqual(store.getState().unsaved, [w.id]); assert.equal(store.get(w.id)!.recallCount, 1, 'the answer is not discarded');
  repo.emit(); // a snapshot from the server still has the OLD word; the unsaved answer must not be wiped by it
  assert.equal(store.get(w.id)!.recallCount, 1, 'snapshot must not overwrite an unsaved change');
  repo.failPut = undefined;
  assert.equal(await store.retryUnsaved(), 0);
  assert.equal(repo.docs.get(w.id)!.recallCount, 1); assert.deepEqual(store.getState().unsaved, []); assert.equal(store.getState().error, undefined);
  // retrying the same answer is safe: it does not count twice
  await store.recordRecall(w.id, 'recall-en', true, 'abundant', undefined, 'a1');
  assert.equal(store.get(w.id)!.recallCount, 1);
});

test('a write the server rejects as invalid is rolled back, not retried forever; the caller gets the error', async () => {
  const repo = new FakeRepo(); const w = mk('abundant'); repo.docs.set(w.id, w); const store = loaded(repo, makeStore(repo));
  repo.failPut = () => denied;
  await assert.rejects(store.recordUsage(w.id, { mode: 'writing', text: 'x', correct: true }), /rules/);
  assert.equal(store.get(w.id)!.writingUsageCount, 0, 'rolled back'); assert.deepEqual(store.getState().unsaved, []);
});

test('a client-side invalid word is refused before anything is written', async () => {
  const repo = new FakeRepo(); const store = loaded(repo, makeStore(repo));
  await assert.rejects(store.save(info('x'.repeat(65)), SOURCE), BrainValidationError);
  assert.equal(repo.puts.length, 0); assert.equal(store.getState().words.length, 0);
});

test('REPRO + fix: two updates to one word in the same moment are both kept (the old read-modify-write lost one)', async () => {
  const repo = new FakeRepo(); const w = mk('abundant'); repo.docs.set(w.id, w); repo.delay = 5; const store = loaded(repo, makeStore(repo));
  await Promise.all([store.recordRecall(w.id, 'recall-en', true, 'x', undefined, 'a1'), store.recordUsage(w.id, { mode: 'writing', text: 'x', correct: true }), store.recordUsage(w.id, { mode: 'speaking', text: 'x', correct: true })]);
  const stored = repo.docs.get(w.id)!;
  assert.equal(stored.recallCount, 1); assert.equal(stored.writingUsageCount, 1); assert.equal(stored.speakingUsageCount, 1);
  assert.equal(repo.puts.at(-1), w.id); assert.deepEqual(store.getState().unsaved, []);
});

test('answer then rating in quick succession both reach the store, in order', async () => {
  const repo = new FakeRepo(); const w = mk('abundant'); repo.docs.set(w.id, w); repo.delay = 3; const store = loaded(repo, makeStore(repo));
  await Promise.all([store.recordRecall(w.id, 'recall-en', true, 'x', undefined, 'a1'), store.rateRecall(w.id, 'a1', 'easy')]);
  const stored = repo.docs.get(w.id)!;
  assert.equal(stored.recallHistory.length, 1); assert.equal(stored.recallHistory[0].rating, 'easy'); assert.equal(stored.recallCount, 1);
});

test('save: an existing word is returned untouched; a word shown but never stored is stored when saved again; a failed save is reported', async () => {
  const repo = new FakeRepo(); const store = loaded(repo, makeStore(repo));
  repo.failPut = () => transient;
  await assert.rejects(store.save(info('abundant'), SOURCE), /network/);
  assert.deepEqual(store.getState().unsaved, ['abundant']);
  repo.failPut = undefined;
  const again = await store.save(info('abundant'), SOURCE);
  assert.ok(repo.docs.has('abundant'), 'the second save really stores it'); assert.deepEqual(store.getState().unsaved, []); assert.equal(again.id, 'abundant');
  const before = repo.puts.length;
  await store.save(info('abundant'), SOURCE);
  assert.equal(repo.puts.length, before, 'a stored word is not written again');
});

test('remove: a failed delete puts the word back and tells the caller', async () => {
  const repo = new FakeRepo(); const w = mk('abundant'); repo.docs.set(w.id, w); const store = loaded(repo, makeStore(repo));
  repo.failPut = () => transient;
  await assert.rejects(store.remove(w.id));
  assert.ok(store.get(w.id));
});

test('completeMeaning stores only what the learner wrote (trimmed) and never anything else', async () => {
  const repo = new FakeRepo(); const w = mk('ubiquitous', { meaning: '', meaningBn: undefined }); repo.docs.set(w.id, w); const store = loaded(repo, makeStore(repo));
  await store.completeMeaning(w.id, { meaning: '  found everywhere  ', meaningBn: '' });
  const s = repo.docs.get(w.id)!; assert.equal(s.meaning, 'found everywhere'); assert.equal(s.meaningBn, undefined); assert.equal(s.synonyms.join(), 'plentiful');
});

// =============================================================================== 4. migration
const LEGACY = ['band6_001', 'band6_002', 'band6_003'];
const resolver = (id: string) => getWordBankInfo(id);

test('REPRO + fix: migration never reports a source id as safe unless the word is confirmed in the Brain', async () => {
  const repo = new FakeRepo(); const store = loaded(repo, makeStore(repo));
  repo.failPutIfAbsent = (w) => (w.id === 'acquire' ? transient : undefined); // one destination write fails
  const r = await store.migrateLegacy(LEGACY, resolver);
  assert.deepEqual(r.confirmed.sort(), ['band6_001', 'band6_003']); assert.deepEqual(r.retry, ['band6_002'], 'the failed one stays in the source list');
  assert.ok(!repo.docs.has('acquire'));
});

test('migration is idempotent and retryable: a second run writes only what is missing and finishes the rest', async () => {
  const repo = new FakeRepo(); const store = loaded(repo, makeStore(repo));
  repo.failPutIfAbsent = (w) => (w.id === 'acquire' ? transient : undefined);
  await store.migrateLegacy(LEGACY, resolver); repo.emit();
  repo.failPutIfAbsent = undefined; repo.putIfAbsentCalls = [];
  const r2 = await store.migrateLegacy(LEGACY, resolver);
  assert.deepEqual(r2.confirmed.sort(), LEGACY.sort()); assert.deepEqual(r2.retry, []);
  assert.deepEqual(repo.putIfAbsentCalls, ['acquire'], 'already-present words are not written again');
  repo.emit();
  const r3 = await store.migrateLegacy(LEGACY, resolver);
  assert.deepEqual(r3.confirmed.sort(), LEGACY.sort()); assert.equal(repo.putIfAbsentCalls.length, 1, 'a third run writes nothing');
  assert.equal(repo.docs.size, 3, 'no duplicates');
});

test('migration confirms against the server: if confirmation cannot be done (offline) nothing is declared safe', async () => {
  const repo = new FakeRepo(); const store = loaded(repo, makeStore(repo));
  repo.failConfirm = true;
  const r = await store.migrateLegacy(LEGACY, resolver);
  assert.deepEqual(r.confirmed, []); assert.deepEqual(r.retry.sort(), LEGACY.sort());
  repo.failConfirm = false;
  const r2 = await store.migrateLegacy(LEGACY, resolver);
  assert.deepEqual(r2.confirmed.sort(), LEGACY.sort());
});

test('REPRO + fix: a write that returned but is not on the server is not declared safe', async () => {
  const repo = new FakeRepo(); const store = loaded(repo, makeStore(repo));
  repo.notOnServer.add('acquire');
  const r = await store.migrateLegacy(LEGACY, resolver);
  assert.deepEqual(r.confirmed.sort(), ['band6_001', 'band6_003']); assert.deepEqual(r.retry, ['band6_002']);
});

test('migration never overwrites a word the learner already has progress on, and unresolvable ids are kept, not deleted', async () => {
  const repo = new FakeRepo(); const existing = applyRecall(mk('abundant'), 'recall-en', true, 'x', NOW, 'good' as RecallRating); repo.docs.set('abundant', existing);
  const store = loaded(repo, makeStore(repo));
  const r = await store.migrateLegacy(['band6_001', 'no-such-id'], resolver);
  assert.deepEqual(r.confirmed, ['band6_001']); assert.deepEqual(r.unresolvable, ['no-such-id']); assert.deepEqual(r.retry, []);
  assert.equal(repo.docs.get('abundant')!.recallCount, 1, 'progress kept'); assert.equal(repo.putIfAbsentCalls.length, 0);
});

test('migration: the destination write itself is create-only (putIfAbsent), so a concurrent copy is never overwritten', async () => {
  const repo = new FakeRepo(); const store = loaded(repo, makeStore(repo));
  const progressed = { ...mk('abundant'), recallCount: 9 }; repo.docs.set('abundant', progressed); // exists on the server, not yet in this device's list
  const r = await store.migrateLegacy(['band6_001'], resolver);
  assert.deepEqual(r.confirmed, ['band6_001']); assert.equal(repo.docs.get('abundant')!.recallCount, 9);
});

test('the provider only removes confirmed ids from the old list and retries the rest (source audit)', () => {
  const src = readFileSync('components/providers/BrainProvider.tsx', 'utf8');
  assert.match(src, /store\s*\n?\s*\.migrateLegacy\(legacyIds, getWordBankInfo\)/);
  assert.match(src, /savedWordIds\.filter\(\(id\) => !r\.confirmed\.includes\(id\)\)/);
  assert.ok(!/savedWordIds: \[\]/.test(src), 'the old list is never cleared wholesale');
  assert.match(src, /MIGRATION_MAX_ATTEMPTS/);
});

// =============================================================================== 5. validation
test('REPRO + fix: the invalid values from the audit are rejected by the validator the rules mirror', () => {
  const good = mk('abundant');
  assert.ok(isValidBrainWord(good));
  const bad = (patch: object) => brainWordIssues({ ...good, ...patch }).map((i) => i.field);
  assert.deepEqual(bad({ stage: 999 }), ['stage']); assert.deepEqual(bad({ stage: -1 }), ['stage']); assert.deepEqual(bad({ stage: 2.5 }), ['stage']); assert.deepEqual(bad({ stage: '3' }), ['stage']);
  assert.deepEqual(bad({ nextReviewAt: 'not-a-date' }), ['nextReviewAt']); assert.deepEqual(bad({ nextReviewAt: '2026-02-30T00:00:00.000Z' }), ['nextReviewAt']); assert.deepEqual(bad({ nextReviewAt: '2026-09-30' }), ['nextReviewAt']);
  assert.deepEqual(bad({ status: 'god' }), ['status']); assert.deepEqual(bad({ recallCount: -3 }), ['recallCount']); assert.deepEqual(bad({ confidence: 101 }), ['confidence']);
  assert.deepEqual(bad({ word: '' }), ['word']); assert.deepEqual(bad({ word: 'x'.repeat(65) }), ['word']);
  assert.deepEqual(bad({ recallHistory: Array(21).fill({}) }), ['recallHistory']); assert.deepEqual(bad({ synonyms: Array(41).fill('a') }), ['synonyms']);
});

test('existing-user compatibility: words saved by older versions (fewer fields) and every word the app creates are valid', () => {
  const { confidence: _c, antonyms: _a, usageHistory: _u, ...legacy } = mk('abundant');
  void _c; void _a; void _u;
  assert.ok(isValidBrainWord(legacy), 'missing optional fields are fine');
  for (const id of ['band6_001', 'band6_002', 'band7_001']) { const e = getWordBankInfo(id); if (e) assert.ok(isValidBrainWord(createBrainWord(e.info, { type: 'word-bank', title: e.title }, undefined, NOW))); }
  assert.ok(isValidBrainWord(applyRecall(mk('abundant'), 'recall-en', true, 'x', NOW, undefined, 'a1')), 'a word with an unrated attempt is valid');
});

test('reading an already-invalid stored word repairs the in-memory copy only: stage clamped, unreadable date means "review now"', () => {
  const broken = { ...mk('abundant'), stage: 999, nextReviewAt: 'not-a-date', status: 'god', recallCount: -4, synonyms: 'oops' } as unknown as BrainWord;
  const fixed = sanitizeBrainWord(broken, NOW);
  assert.equal(fixed.stage, 6); assert.equal(fixed.nextReviewAt, NOW.toISOString()); assert.equal(fixed.status, 'new'); assert.equal(fixed.recallCount, 0); assert.deepEqual(fixed.synonyms, []);
  assert.ok(isValidBrainWord(fixed)); assert.equal(broken.stage, 999, 'the stored object is not mutated');
  assert.equal(sanitizeBrainWord(mk('abundant'), NOW).stage, 0);
  const repo = new FakeRepo(); const store = makeStore(repo); store.start(); repo.emit([broken]);
  assert.equal(store.get('abundant')!.stage, 6); assert.ok(brainSummary(store.getState().words, NOW).due >= 1);
});

test('Firestore rules validate Brain documents and keep the owner-only rules (source audit; executed against the emulator in the E2E)', () => {
  const rules = readFileSync('firestore.rules', 'utf8');
  assert.match(rules, /function validBrainWord\(d\)/); assert.match(rules, /allow create, update: if isOwner\(uid\) && validBrainWord\(request\.resource\.data\);/);
  assert.match(rules, /wholeNumber\(d\.stage, 6\)/); assert.match(rules, /isoDate\(d\.nextReviewAt\)/);
  assert.match(rules, /match \/vocabulary\/\{vocabId\} \{\s*allow read, delete: if isOwner\(uid\);/);
  assert.match(rules, /!\(collection in \['vocabulary', 'testSessions', 'mino'\]\)/, 'the catch-all still cannot bypass the vocabulary rules');
});

test('no server route writes vocabulary, so the server paths only read it — defensively (source audit)', () => {
  const server = ['lib/ai/server/tools/vocabulary.ts', 'lib/ai/server/mino/snapshot.ts', 'lib/ai/server/firestore-rest.ts'].map((f) => readFileSync(f, 'utf8')).join('\n');
  assert.ok(!/method:\s*'(PATCH|POST|PUT|DELETE)'/.test(server) || !/vocabulary/.test(server.match(/method:\s*'(PATCH|POST|PUT|DELETE)'[\s\S]{0,200}/)?.[0] ?? ''), 'no vocabulary write');
  assert.match(readFileSync('lib/ai/server/mino/snapshot.ts', 'utf8'), /sanitizeBrainWord/);
});

// =============================================================================== 6. missing meaning
test('REPRO + fix: a word with no usable meaning gets no speaking/writing prompt; it asks the learner for the meaning', () => {
  for (const m of [{ meaning: '', meaningBn: undefined }, { meaning: ' ', meaningBn: '' }, { meaning: 'a', meaningBn: undefined }]) assert.equal(hasUsableMeaning({ ...mk('ubiquitous'), ...m }), false);
  assert.equal(hasUsableMeaning(mk('ubiquitous', { meaning: '', meaningBn: 'সর্বব্যাপী' })), true);
  for (const f of ['components/practice/WritingPractice.tsx', 'components/practice/SpeakingPractice.tsx']) {
    const src = readFileSync(f, 'utf8');
    assert.match(src, /!hasUsableMeaning\(word\)/); assert.match(src, /<MeaningEditor/);
    assert.ok(src.indexOf('!hasUsableMeaning(word)') < src.indexOf('speakingPrompt(word') || f.includes('Writing'), 'the check runs before a prompt is built');
  }
  assert.match(readFileSync('components/brain/MeaningEditor.tsx', 'utf8'), /completeMeaning/);
});

test('REPRO + fix: a word with no usable part of speech no longer gets "a ubiquitous you have noticed"', () => {
  const noPos = mk('ubiquitous', { partOfSpeech: undefined });
  const p = speakingPrompt(noPos);
  assert.equal(p.key, 'practice.speakingPrompts.generic.0');
  assert.equal(speakingPrompt(mk('x', { partOfSpeech: 'noun / verb' })).key.includes('generic'), true, 'ambiguous part of speech is not forced into the noun slot');
  assert.equal(speakingPrompt(mk('x', { partOfSpeech: 'noun' })).key, 'practice.speakingPrompts.noun.0');
  assert.equal(speakingPrompt(mk('x', { partOfSpeech: 'verb' })).key, 'practice.speakingPrompts.verb.0');
});

test('the auto-picked practice word is one the learner can be asked about; a requested word without a meaning is still reachable', async () => {
  const { pickWord } = await import('../components/practice/pickWord');
  const bare = mk('ubiquitous', { meaning: '', meaningBn: undefined });
  const good = mk('abundant');
  assert.equal(pickWord([bare, good], 'writing')!.id, 'abundant');
  assert.equal(pickWord([bare], 'writing')!.id, 'ubiquitous');
  assert.equal(pickWord([bare, good], 'writing', 'ubiquitous')!.id, 'ubiquitous');
});

test('both locales have every new string and the new generic prompts', async () => {
  const { default: _x } = { default: 0 }; void _x;
  const en = readFileSync('lib/i18n/locales/en.ts', 'utf8'); const bn = readFileSync('lib/i18n/locales/bn.ts', 'utf8');
  for (const key of ['errorTitle:', 'unconfirmedTitle:', 'refreshFailed:', 'stillUnsaved:', 'meaningEditor: {', 'generic: [', 'saveFailed:', "new: 'নতুন'"]) {
    assert.ok(bn.includes(key) || key.startsWith('new:'), `bn has ${key}`);
    assert.ok(en.includes(key) || key.startsWith('new:'), `en has ${key}`);
  }
  assert.ok(bn.includes("new: 'নতুন'") && en.includes("new: 'New'"));
});

// =============================================================================== 7. counts
test('REPRO + fix: the Learning tile and the Learning tab are the same number, from one rule', () => {
  const words = Array.from({ length: 8 }, (_, i) => mk(`word${i}`));
  const reviewed = applyRecall(words[0], 'recall-en', true, 'x', NOW, 'good' as RecallRating); // 1 started, 7 never recalled
  const set = [reviewed, ...words.slice(1)];
  const summary = brainSummary(set, NOW); const counts = brainCounts(set, NOW);
  // REPRO: the old notebook tab counted every non-mastered word as "Learning" (8) while the tile counted started words (1).
  const oldTab = set.filter((w) => w.status !== 'mastered').length;
  assert.equal(oldTab, 8); assert.equal(summary.learning, 1);
  assert.equal(counts.learning, summary.learning, 'tile === tab'); assert.equal(counts.new, 7);
  assert.equal(counts.new + counts.learning + counts.mastered, counts.all, 'the groups partition the words');
  assert.equal(counts.all, summary.total); assert.equal(counts.review, summary.due);
});

test('the filters, their counts and their lists agree on random sets (property check)', () => {
  let seed = 7; const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  for (let run = 0; run < 200; run++) {
    const words: BrainWord[] = Array.from({ length: Math.floor(rnd() * 25) }, (_, i) => {
      let w = mk(`w${run}x${i}`);
      const recalls = Math.floor(rnd() * 8);
      for (let k = 0; k < recalls; k++) w = applyRecall(w, 'recall-en', rnd() > 0.3, 'x', new Date(NOW.getTime() - (8 - k) * 86400000), 'good' as RecallRating);
      if (rnd() > 0.85) w = { ...w, stage: 5, writingUsageCount: 1, speakingUsageCount: 1, status: 'mastered' };
      return w;
    });
    const counts = brainCounts(words, NOW); const s = brainSummary(words, NOW);
    for (const f of BRAIN_FILTERS) assert.equal(words.filter((w) => matchesBrainFilter(w, f, NOW)).length, counts[f], `${f} count === list length`);
    assert.equal(counts.learning, s.learning); assert.equal(counts.mastered, s.mastered); assert.equal(counts.review, s.due); assert.equal(counts.all, s.total);
    assert.equal(counts.new + counts.learning + counts.mastered, counts.all);
  }
});

test('the notebook computes its tiles, tabs and list from the shared engine functions only (source audit)', () => {
  const src = readFileSync('app/(app)/ielts/vocabulary/notebook/page.tsx', 'utf8');
  assert.match(src, /brainCounts\(brain\.words\)/); assert.match(src, /matchesBrainFilter\(w, filter\)/); assert.match(src, /brainSummary\(brain\.words\)/);
  assert.ok(!/brainGroup\(w\) !== 'mastered'/.test(src), 'the old, different "Learning" rule is gone');
});

(async () => {
  for (const [name, fn] of tests) {
    try {
      await fn();
      passed++;
      console.log('PASS', name);
    } catch (e) {
      console.error('FAIL', name);
      console.error(e);
      process.exitCode = 1;
    }
  }
  console.log(`\n${passed}/${tests.length} passed`);
})();
