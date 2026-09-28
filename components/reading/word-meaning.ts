'use client';

import { useCallback, useRef, useState } from 'react';
import { wordMeaning } from '@/lib/ai/client';
import type { WordMeaning } from '@/lib/ai/server/assess/word-meaning';
import { lookupWord } from '@/lib/content/dictionary';
import type { WordInfo } from '@/lib/models';

export type { WordMeaning };

/** What the meaning card shows: Mino's contextual meaning, or a dictionary fallback when Mino is unavailable. */
export type MeaningResult = { kind: 'mino'; meaning: WordMeaning } | { kind: 'dictionary'; info?: WordInfo };

/**
 * One explanation per word per passage for this browser session: the first
 * click asks Mino, later clicks (and a click while the first is still loading)
 * reuse it. Kept in memory and in sessionStorage so a reload does not ask again.
 */
const memory = new Map<string, Promise<MeaningResult>>();
const STORE = 'mino-word-meaning:';

const keyOf = (passageId: string, word: string) => `${passageId}:${word.toLowerCase().replace(/[’]/g, "'")}`;

function readStored(key: string): WordMeaning | undefined {
  try {
    const raw = sessionStorage.getItem(STORE + key);
    return raw ? (JSON.parse(raw) as WordMeaning) : undefined;
  } catch {
    return undefined;
  }
}

function store(key: string, meaning: WordMeaning) {
  try {
    sessionStorage.setItem(STORE + key, JSON.stringify(meaning));
  } catch {
    // Storage full or blocked: the in-memory copy still works for this page.
  }
}

/** True when this word already has an answer for this passage (no request needed). */
export function hasCachedMeaning(passageId: string, word: string) {
  const key = keyOf(passageId, word);
  return memory.has(key) || !!readStored(key);
}

export function getWordMeaning(passageId: string, word: string, sentence: string): Promise<MeaningResult> {
  const key = keyOf(passageId, word);
  const existing = memory.get(key);
  if (existing) return existing;
  const stored = readStored(key);
  if (stored) {
    const done = Promise.resolve<MeaningResult>({ kind: 'mino', meaning: stored });
    memory.set(key, done);
    return done;
  }
  const pending = (async (): Promise<MeaningResult> => {
    const res = await wordMeaning(passageId, word, sentence);
    if (res.ok) {
      store(key, res.meaning);
      return { kind: 'mino', meaning: res.meaning };
    }
    // Mino unavailable (offline, limit, not signed in): show a dictionary meaning, and try Mino again next time.
    memory.delete(key);
    return { kind: 'dictionary', info: await lookupWord(word).catch(() => undefined) };
  })();
  memory.set(key, pending);
  return pending;
}

/** Save to Brain uses the existing vocabulary system with Mino's contextual meaning. */
export function meaningWordInfo(m: WordMeaning): WordInfo {
  return {
    word: m.lemma,
    lemma: m.lemma.toLowerCase(),
    meaning: m.en,
    meaningBn: m.bn,
    partOfSpeech: m.partOfSpeech,
    synonyms: [],
    antonyms: [],
    collocations: [],
    ...(m.example ? { exampleSentence: m.example } : {}),
    dictionarySource: 'mino',
  };
}

/** Mino's loading shows at least this long, so the card never flickers. */
const MIN_LOADING_MS = 350;

/**
 * The meaning card's state for one reader: `lookup` starts Mino (or reuses the
 * cache); a newer click always replaces an older one.
 */
export function useMeaningLookup(passageId: string) {
  const [result, setResult] = useState<MeaningResult | undefined>();
  const request = useRef(0);
  const lookup = useCallback(
    async (word: string, sentence: string) => {
      const id = ++request.current;
      setResult(undefined);
      const started = Date.now();
      const r = await getWordMeaning(passageId, word, sentence);
      const wait = MIN_LOADING_MS - (Date.now() - started);
      if (wait > 0) await new Promise((done) => setTimeout(done, wait));
      if (id === request.current) setResult(r);
    },
    [passageId],
  );
  const cancel = useCallback(() => {
    request.current++;
  }, []);
  return { result, lookup, cancel };
}

/** The word id a Mino or dictionary result would be saved under, for the "Saved" state. */
export function resultLemma(result: MeaningResult | undefined): string | undefined {
  if (result?.kind === 'mino') return result.meaning.lemma.toLowerCase();
  return result?.info?.lemma;
}
