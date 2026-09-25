import { wordsReadyToUse } from '@/lib/engine';
import type { BrainWord } from '@/lib/models';

/** The word to practise: the requested one, else one the student can recall but hasn't used yet. */
export function pickWord(words: BrainWord[], mode: 'writing' | 'speaking', requested?: string | null, exclude: string[] = []) {
  if (requested) {
    const w = words.find((x) => x.id === requested);
    if (w) return w;
  }
  const pool = words.filter((w) => !exclude.includes(w.id));
  return wordsReadyToUse(pool, mode)[0] ?? [...pool].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
}
