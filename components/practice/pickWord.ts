import { hasUsableMeaning, wordsReadyToUse } from '@/lib/engine';
import type { BrainWord } from '@/lib/models';

/** The word to practise: the requested one, else one the student can recall but hasn't used yet. */
export function pickWord(words: BrainWord[], mode: 'writing' | 'speaking', requested?: string | null, exclude: string[] = []) {
  if (requested) {
    const w = words.find((x) => x.id === requested);
    if (w) return w;
  }
  // A word the learner can be asked about comes first; a word with no meaning is offered only when nothing else is left
  // (the screen then asks the learner to add the meaning, never invents one).
  const all = words.filter((w) => !exclude.includes(w.id));
  const pool = all.some(hasUsableMeaning) ? all.filter(hasUsableMeaning) : all;
  return wordsReadyToUse(pool, mode)[0] ?? [...pool].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
}
