'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { applyRecall, applyUsage, createBrainWord, wordId } from '@/lib/engine';
import { getWordBankInfo } from '@/lib/content/dictionary';
import type { BrainWord, RecallExercise, UsageAttempt, WordInfo, WordSource } from '@/lib/models';
import type { BrainRepository } from '@/lib/services/brain-repository';
import { useProfile } from './ProfileProvider';

interface BrainState {
  words: BrainWord[];
  loading: boolean;
  error: boolean;
  get: (id: string) => BrainWord | undefined;
  has: (lemma: string) => boolean;
  /** Save to Brain. Returns the saved (or already existing) word. */
  save: (info: WordInfo, source: WordSource, originalSentence?: string) => Promise<BrainWord>;
  recordRecall: (id: string, exercise: RecallExercise, correct: boolean, answer?: string) => Promise<void>;
  recordUsage: (id: string, attempt: Omit<UsageAttempt, 'at'>) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

const BrainContext = createContext<BrainState | null>(null);

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
  const [words, setWords] = useState<BrainWord[] | null>(null);
  const [error, setError] = useState(false);
  const wordsRef = useRef<BrainWord[]>([]);
  wordsRef.current = words ?? [];

  useEffect(() => {
    setWords(null);
    setError(false);
    return repository.subscribe(
      userId,
      (next) => setWords(next),
      (e) => {
        console.error('[brain] load failed', e);
        setError(true);
        setWords([]);
      },
    );
  }, [userId, repository]);

  // One-time import of words saved from the word bank before the Brain existed.
  const migrated = useRef(false);
  useEffect(() => {
    if (migrated.current || words === null || !profile) return;
    const legacy = profile.vocabulary.savedWordIds;
    if (legacy.length === 0) return;
    migrated.current = true;
    const existing = new Set(words.map((w) => w.id));
    legacy.forEach((id) => {
      const entry = getWordBankInfo(id);
      if (entry && !existing.has(wordId(entry.info.lemma))) {
        void repository.put(userId, createBrainWord(entry.info, { type: 'word-bank', title: entry.title }, entry.info.exampleSentence));
      }
    });
    updateProfile((p) => ({ ...p, vocabulary: { ...p.vocabulary, savedWordIds: [] } }));
  }, [words, profile, repository, userId, updateProfile]);

  const find = useCallback((id: string) => wordsRef.current.find((w) => w.id === id), []);

  const save = useCallback<BrainState['save']>(
    async (info, source, originalSentence) => {
      const existing = find(wordId(info.lemma));
      if (existing) return existing;
      const word = createBrainWord(info, source, originalSentence);
      setWords((prev) => [...(prev ?? []), word]);
      await repository.put(userId, word);
      return word;
    },
    [find, repository, userId],
  );

  const update = useCallback(
    async (id: string, fn: (w: BrainWord) => BrainWord) => {
      const current = find(id);
      if (!current) return;
      const next = fn(current);
      setWords((prev) => (prev ?? []).map((w) => (w.id === id ? next : w)));
      await repository.put(userId, next);
    },
    [find, repository, userId],
  );

  const value = useMemo<BrainState>(
    () => ({
      words: words ?? [],
      loading: words === null,
      error,
      get: find,
      has: (lemma) => Boolean(find(wordId(lemma))),
      save,
      recordRecall: (id, exercise, correct, answer) => update(id, (w) => applyRecall(w, exercise, correct, answer)),
      recordUsage: (id, attempt) => update(id, (w) => applyUsage(w, attempt)),
      remove: async (id) => {
        setWords((prev) => (prev ?? []).filter((w) => w.id !== id));
        await repository.remove(userId, id);
      },
    }),
    [words, error, find, save, update, repository, userId],
  );

  return <BrainContext.Provider value={value}>{children}</BrainContext.Provider>;
}

export function useBrain(): BrainState {
  const ctx = useContext(BrainContext);
  if (!ctx) throw new Error('useBrain must be used inside <BrainProvider>');
  return ctx;
}
