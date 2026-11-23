'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { BrainStore, brainView, type BrainView } from '@/lib/engine';
import { getWordBankInfo } from '@/lib/content/dictionary';
import type { BrainWord, RecallExercise, RecallRating, UsageAttempt, WordInfo, WordSource } from '@/lib/models';
import type { BrainRepository } from '@/lib/services/brain-repository';
import { useProfile } from './ProfileProvider';

interface BrainState {
  words: BrainWord[];
  /** True until the first answer (words, or a failure) arrives. */
  loading: boolean;
  /** The words could not be loaded (and none were loaded before). Not the same as having no words. */
  error: boolean;
  /** What a screen should show: loading, empty, ready, error or unconfirmed (offline with nothing cached). */
  view: BrainView;
  /** Words whose last write failed and are still unsaved. */
  unsavedCount: number;
  /** Words came from this device and the server has not confirmed them yet. */
  fromCache: boolean;
  /** Try loading the words again. */
  retry: () => void;
  /** Write the unsaved words again. Resolves to how many are still unsaved. */
  retryUnsaved: () => Promise<number>;
  get: (id: string) => BrainWord | undefined;
  has: (lemma: string) => boolean;
  /** Save to Brain. Returns the saved (or already existing) word; rejects if it could not be stored. */
  save: (info: WordInfo, source: WordSource, originalSentence?: string) => Promise<BrainWord>;
  /** Stores an answer. Passing the same `attemptId` again is safe: it is stored once. */
  recordRecall: (id: string, exercise: RecallExercise, correct: boolean, answer?: string, rating?: RecallRating, attemptId?: string) => Promise<void>;
  /** Adds the learner's self-rating to an answer that is already stored. */
  rateRecall: (id: string, attemptId: string, rating: RecallRating) => Promise<void>;
  recordUsage: (id: string, attempt: Omit<UsageAttempt, 'at'>) => Promise<void>;
  /** The learner's own meaning for a word that has none. */
  completeMeaning: (id: string, meaning: { meaning?: string; meaningBn?: string }) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

const BrainContext = createContext<BrainState | null>(null);

const MIGRATION_RETRY_MS = 5000;
const MIGRATION_MAX_ATTEMPTS = 4;

export function BrainProvider({
  userId,
  repository,
  children,
}: {
  userId: string;
  repository: BrainRepository;
  children: React.ReactNode;
}) {
  const { profile, updateProfile } = useProfile();
  const store = useMemo(() => new BrainStore(repository, userId), [repository, userId]);
  useEffect(() => {
    store.start();
    return () => store.stop();
  }, [store]);
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState);

  // Words saved from the word bank before the Brain existed. The old list is only ever
  // shortened by ids the server has confirmed; anything that failed stays and is tried again.
  const legacyIds = profile?.vocabulary.savedWordIds;
  const confirmedLoad = state.status === 'ready' && !state.fromCache;
  const [tick, setTick] = useState(0);
  const running = useRef(false);
  const attempts = useRef(0);
  const settled = useRef(false);
  useEffect(() => {
    settled.current = false;
    attempts.current = 0;
  }, [store]);
  useEffect(() => {
    if (!confirmedLoad || !legacyIds || legacyIds.length === 0 || running.current || settled.current) return;
    running.current = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    void store
      .migrateLegacy(legacyIds, getWordBankInfo)
      .then((r) => {
        if (r.confirmed.length > 0) {
          updateProfile((p) => ({ ...p, vocabulary: { ...p.vocabulary, savedWordIds: p.vocabulary.savedWordIds.filter((id) => !r.confirmed.includes(id)) } }));
        }
        if (r.retry.length > 0 && attempts.current < MIGRATION_MAX_ATTEMPTS) {
          attempts.current += 1;
          timer = setTimeout(() => setTick((n) => n + 1), MIGRATION_RETRY_MS * attempts.current);
        } else {
          settled.current = true; // nothing left that this session can do (unresolvable ids stay untouched)
        }
      })
      .catch(() => {
        attempts.current += 1;
        if (attempts.current < MIGRATION_MAX_ATTEMPTS) timer = setTimeout(() => setTick((n) => n + 1), MIGRATION_RETRY_MS * attempts.current);
      })
      .finally(() => {
        running.current = false;
      });
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [confirmedLoad, legacyIds, store, updateProfile, tick]);

  const retry = useCallback(() => store.retryLoad(), [store]);
  const retryUnsaved = useCallback(() => store.retryUnsaved(), [store]);

  const value = useMemo<BrainState>(
    () => ({
      words: state.words,
      loading: state.status === 'loading',
      error: state.status === 'error',
      view: brainView(state),
      unsavedCount: state.unsaved.length,
      fromCache: state.fromCache,
      retry,
      retryUnsaved,
      get: store.get,
      has: store.has,
      save: (info, source, sentence) => store.save(info, source, sentence),
      recordRecall: (id, exercise, correct, answer, rating, attemptId) => store.recordRecall(id, exercise, correct, answer, rating, attemptId),
      rateRecall: (id, attemptId, rating) => store.rateRecall(id, attemptId, rating),
      recordUsage: (id, attempt) => store.recordUsage(id, attempt),
      completeMeaning: (id, meaning) => store.completeMeaning(id, meaning),
      remove: (id) => store.remove(id),
    }),
    [state, store, retry, retryUnsaved],
  );

  return <BrainContext.Provider value={value}>{children}</BrainContext.Provider>;
}

export function useBrain(): BrainState {
  const ctx = useContext(BrainContext);
  if (!ctx) throw new Error('useBrain must be used inside <BrainProvider>');
  return ctx;
}
