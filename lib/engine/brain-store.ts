import type { BrainWord, RecallExercise, RecallRating, UsageAttempt, WordInfo, WordSource } from '@/lib/models';
import type { BrainRepository } from '@/lib/services/brain-repository';
import { applyRating, applyRecall, applyUsage, createBrainWord, wordId, type RecallOutcome } from './brain';
import { BrainValidationError, assertValidBrainWord, sanitizeBrainWord } from './brain-validate';

/**
 * The student's Brain as a small store, independent of React so every path
 * (load, failure, retry, optimistic write, failed write, migration) is tested
 * directly. BrainProvider is a thin wrapper around it.
 *
 * Rules it keeps:
 *  - A failed load is an error, never an empty list; words already loaded stay.
 *  - An empty list that only came from the device cache is "unconfirmed", not empty.
 *  - A write that fails is reported to its caller and kept as "unsaved" (and merged
 *    over incoming snapshots) until it succeeds; a write the server rejects as invalid
 *    is rolled back instead of retried forever.
 *  - Updates to one word are applied in order on the latest copy and written in order.
 */
export type BrainStatus = 'loading' | 'ready' | 'error' | 'unconfirmed';

export interface BrainStoreState {
  status: BrainStatus;
  words: BrainWord[];
  /** The last load or write failure, until the next success. */
  error: unknown;
  /** Words whose last write failed and have not been saved yet. */
  unsaved: string[];
  /** Words came from the device cache and the server has not confirmed them yet. */
  fromCache: boolean;
}

/** What a screen should show. `error` and `unconfirmed` are never an empty list. */
export type BrainView = 'loading' | 'empty' | 'ready' | 'error' | 'unconfirmed';

export function brainView(s: Pick<BrainStoreState, 'status' | 'words'>): BrainView {
  if (s.status === 'loading') return 'loading';
  if (s.words.length > 0) return 'ready';
  if (s.status === 'error') return 'error';
  if (s.status === 'unconfirmed') return 'unconfirmed';
  return 'empty';
}

export interface LegacyEntry {
  info: WordInfo;
  title: string;
}

export interface MigrationResult {
  /** Legacy ids that are now safely in the Brain (confirmed on the server): safe to remove from the old list. */
  confirmed: string[];
  /** Legacy ids whose write or confirmation failed: keep them and try again. */
  retry: string[];
  /** Legacy ids nothing can resolve: kept as they are, never deleted. */
  unresolvable: string[];
}

export interface BrainStoreOptions {
  /** How long an empty, cache-only list may stay "loading" before it is called unconfirmed. */
  unconfirmedAfterMs?: number;
  timers?: { set: (fn: () => void, ms: number) => unknown; clear: (handle: unknown) => void };
  now?: () => Date;
}

const PERMANENT = new Set(['permission-denied', 'invalid-argument', 'failed-precondition', 'out-of-range']);
export const isPermanentFailure = (e: unknown) => e instanceof BrainValidationError || PERMANENT.has((e as { code?: string })?.code ?? '');

export class BrainStore {
  private state: BrainStoreState = { status: 'loading', words: [], error: undefined, unsaved: [], fromCache: false };
  private listeners = new Set<() => void>();
  private unsubscribe: (() => void) | undefined;
  private unconfirmedTimer: unknown;
  private confirmedOnce = false;
  private chains = new Map<string, Promise<void>>();
  private unsavedIds = new Set<string>();
  private readonly timers: NonNullable<BrainStoreOptions['timers']>;
  private readonly unconfirmedAfterMs: number;
  private readonly now: () => Date;

  constructor(
    private readonly repository: BrainRepository,
    private readonly userId: string,
    options: BrainStoreOptions = {},
  ) {
    this.timers = options.timers ?? { set: (fn, ms) => setTimeout(fn, ms), clear: (h) => clearTimeout(h as ReturnType<typeof setTimeout>) };
    this.unconfirmedAfterMs = options.unconfirmedAfterMs ?? 8000;
    this.now = options.now ?? (() => new Date());
  }

  // ------------------------------------------------------------ subscription
  getState = (): BrainStoreState => this.state;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  private set(patch: Partial<BrainStoreState>) {
    this.state = { ...this.state, ...patch, unsaved: patch.unsaved ?? [...this.unsavedIds] };
    this.listeners.forEach((l) => l());
  }

  // ------------------------------------------------------------------- load
  start() {
    this.stop();
    this.unsubscribe = this.repository.subscribe(
      this.userId,
      (words, meta) => this.onSnapshot(words, meta.fromCache),
      (e) => this.onError(e),
    );
  }

  stop() {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
    if (this.unconfirmedTimer !== undefined) this.timers.clear(this.unconfirmedTimer);
    this.unconfirmedTimer = undefined;
  }

  /** Try loading again after a failure. Words already shown stay on screen meanwhile. */
  retryLoad() {
    this.set({ error: undefined, status: this.state.words.length > 0 ? 'ready' : 'loading' });
    this.start();
  }

  private onSnapshot(raw: BrainWord[], fromCache: boolean) {
    const incoming = raw.map((w) => sanitizeBrainWord(w, this.now()));
    // Words whose last write failed keep the learner's version until they are saved.
    const mine = new Map(this.state.words.filter((w) => this.unsavedIds.has(w.id)).map((w) => [w.id, w]));
    const words = [...incoming.filter((w) => !mine.has(w.id)), ...mine.values()];
    if (fromCache && words.length === 0 && !this.confirmedOnce) {
      // Nothing from the server yet and nothing cached: that is "don't know", not "no words".
      if (this.unconfirmedTimer === undefined) {
        this.unconfirmedTimer = this.timers.set(() => {
          this.unconfirmedTimer = undefined;
          if (!this.confirmedOnce && this.state.words.length === 0) this.set({ status: 'unconfirmed' });
        }, this.unconfirmedAfterMs);
      }
      this.set({ words, fromCache: true });
      return;
    }
    if (!fromCache) {
      this.confirmedOnce = true;
      if (this.unconfirmedTimer !== undefined) this.timers.clear(this.unconfirmedTimer);
      this.unconfirmedTimer = undefined;
    }
    this.set({ words, status: 'ready', fromCache, error: this.unsavedIds.size ? this.state.error : undefined });
  }

  private onError(e: unknown) {
    if (this.unconfirmedTimer !== undefined) this.timers.clear(this.unconfirmedTimer);
    this.unconfirmedTimer = undefined;
    // Keep whatever was loaded; just say loading failed.
    this.set({ status: 'error', error: e });
  }

  // ------------------------------------------------------------------ reads
  get = (id: string) => this.state.words.find((w) => w.id === id);
  has = (lemma: string) => Boolean(this.get(wordId(lemma)));

  // ----------------------------------------------------------------- writes
  private replace(next: BrainWord) {
    const exists = this.state.words.some((w) => w.id === next.id);
    this.set({ words: exists ? this.state.words.map((w) => (w.id === next.id ? next : w)) : [...this.state.words, next] });
  }

  /** Writes the latest copy of the word, after any earlier write to it has finished. */
  private persist(id: string, revert: () => void): Promise<void> {
    const run = async () => {
      const latest = this.get(id);
      if (!latest) return; // removed meanwhile
      try {
        await this.repository.put(this.userId, latest);
        if (this.unsavedIds.delete(id)) this.set({ error: this.unsavedIds.size ? this.state.error : undefined });
      } catch (e) {
        if (isPermanentFailure(e)) {
          this.unsavedIds.delete(id);
          revert();
        } else {
          this.unsavedIds.add(id);
          this.set({ error: e });
        }
        throw e;
      }
    };
    const prev = this.chains.get(id) ?? Promise.resolve();
    const next = prev.then(run, run);
    this.chains.set(id, next.catch(() => undefined));
    return next;
  }

  private update(id: string, fn: (w: BrainWord) => BrainWord): Promise<void> {
    const current = this.get(id);
    if (!current) return Promise.resolve();
    const next = fn(current);
    if (next === current) return Promise.resolve();
    try {
      assertValidBrainWord(next);
    } catch (e) {
      return Promise.reject(e);
    }
    this.replace(next);
    return this.persist(id, () => this.replace(current));
  }

  async save(info: WordInfo, source: WordSource, originalSentence?: string): Promise<BrainWord> {
    const id = wordId(info.lemma);
    const existing = this.get(id);
    if (existing) {
      // A word that is shown but never reached the server is saved now, not reported as saved.
      if (this.unsavedIds.has(id)) await this.persist(id, () => this.set({ words: this.state.words.filter((w) => w.id !== id) }));
      return existing;
    }
    const word = createBrainWord(info, source, originalSentence, this.now());
    assertValidBrainWord(word);
    this.replace(word);
    await this.persist(id, () => this.set({ words: this.state.words.filter((w) => w.id !== id) }));
    return word;
  }

  /** The answer is stored on its own; the same attemptId twice stores it once. */
  recordRecall(id: string, exercise: RecallExercise, correct: RecallOutcome, answer?: string, rating?: RecallRating, attemptId?: string) {
    return this.update(id, (w) => applyRecall(w, exercise, correct, answer, this.now(), rating, attemptId));
  }

  /** The optional self-rating for an answer that is already stored. */
  rateRecall(id: string, attemptId: string, rating: RecallRating) {
    return this.update(id, (w) => applyRating(w, attemptId, rating, this.now()));
  }

  recordUsage(id: string, attempt: Omit<UsageAttempt, 'at'>) {
    return this.update(id, (w) => applyUsage(w, attempt, this.now()));
  }

  /** The learner's own meaning for a word that has none. Trimmed; never generated here. */
  completeMeaning(id: string, meaning: { meaning?: string; meaningBn?: string }) {
    const en = meaning.meaning?.trim();
    const bn = meaning.meaningBn?.trim();
    return this.update(id, (w) => ({ ...w, ...(en ? { meaning: en } : {}), ...(bn ? { meaningBn: bn } : {}), updatedAt: this.now().toISOString() }));
  }

  async remove(id: string): Promise<void> {
    const current = this.get(id);
    if (!current) return;
    this.set({ words: this.state.words.filter((w) => w.id !== id) });
    this.unsavedIds.delete(id);
    try {
      await this.repository.remove(this.userId, id);
    } catch (e) {
      this.replace(current);
      throw e;
    }
  }

  /** Writes again every word whose last write failed. Resolves to how many are still unsaved. */
  async retryUnsaved(): Promise<number> {
    await Promise.allSettled([...this.unsavedIds].map((id) => this.persist(id, () => undefined)));
    return this.unsavedIds.size;
  }

  // -------------------------------------------------------------- migration
  /**
   * Moves legacy saved-word ids into the Brain without ever removing the source
   * first: a word is written only if absent, then confirmed on the server; only
   * confirmed ids are reported as safe to remove. Safe to run again and again.
   */
  async migrateLegacy(legacyIds: string[], resolve: (id: string) => LegacyEntry | undefined): Promise<MigrationResult> {
    const result: MigrationResult = { confirmed: [], retry: [], unresolvable: [] };
    const targets: { legacy: string; brainId: string }[] = [];
    for (const legacy of legacyIds) {
      const entry = resolve(legacy);
      if (!entry) {
        result.unresolvable.push(legacy);
        continue;
      }
      const brainId = wordId(entry.info.lemma);
      targets.push({ legacy, brainId });
      if (this.get(brainId) && !this.unsavedIds.has(brainId)) continue; // already here
      try {
        await this.repository.putIfAbsent(this.userId, createBrainWord(entry.info, { type: 'word-bank', title: entry.title }, entry.info.exampleSentence, this.now()));
      } catch {
        result.retry.push(legacy);
      }
    }
    const pending = targets.filter((t) => !result.retry.includes(t.legacy));
    if (pending.length === 0) return result;
    let present: Set<string>;
    try {
      present = new Set(await this.repository.confirm(this.userId, [...new Set(pending.map((t) => t.brainId))]));
    } catch {
      result.retry.push(...pending.map((t) => t.legacy));
      return result;
    }
    for (const t of pending) (present.has(t.brainId) ? result.confirmed : result.retry).push(t.legacy);
    return result;
  }
}
