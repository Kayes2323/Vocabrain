import type { BrainWord, ReadingLibraryProgress } from '@/lib/models';
import { wordId } from '@/lib/engine/brain';
import { LEXICON, LIBRARY } from './index';
import { vocabView, type VocabView } from './engine';
import type { LibraryPassage } from './types';

/**
 * Reading Vocabulary: the words a student has met in the passages they opened.
 * Every word points at the same Brain entry (id = lemma), so a word is never
 * stored twice — "new" words are the ones not in the Brain yet.
 */
export interface ReadingWord {
  /** The Brain id this word saves to. */
  id: string;
  view: VocabView;
  passage: Pick<LibraryPassage, 'id' | 'title'>;
  /** The sentence of the passage the word appears in (saved with it). */
  sentence?: string;
}

/** The first sentence of the passage that uses one of the word's forms. */
export function sentenceFor(passage: LibraryPassage, match: string[]): string | undefined {
  const forms = match.map((m) => m.toLowerCase());
  for (const para of passage.paragraphs) {
    for (const sentence of para.split(/(?<=[.!?])\s+/)) {
      const words = sentence.toLowerCase().split(/[^a-z'-]+/);
      if (forms.some((f) => (f.includes(' ') ? sentence.toLowerCase().includes(f) : words.includes(f)))) return sentence.trim();
    }
  }
  return undefined;
}

export interface ReadingVocabulary {
  /** Met while reading, not saved yet (most recently read passage first). */
  fresh: ReadingWord[];
  /** Saved from any reading passage, newest first. */
  saved: BrainWord[];
}

export function readingVocabulary(progress: Record<string, ReadingLibraryProgress> | undefined, words: BrainWord[]): ReadingVocabulary {
  const inBrain = new Set(words.map((w) => w.id));
  const opened = Object.entries(progress ?? {})
    .sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt))
    .map(([id]) => LIBRARY.find((p) => p.id === id))
    .filter((p): p is LibraryPassage => Boolean(p));
  const seen = new Set<string>();
  const fresh: ReadingWord[] = [];
  for (const passage of opened) {
    for (const v of passage.vocab) {
      const lex = LEXICON[v.lemma];
      const id = wordId(v.lemma);
      if (!lex || inBrain.has(id) || seen.has(id)) continue;
      seen.add(id);
      fresh.push({ id, view: vocabView(lex, v), passage: { id: passage.id, title: passage.title }, sentence: sentenceFor(passage, v.match.length ? v.match : [v.lemma]) });
    }
  }
  const saved = words.filter((w) => w.source.type === 'reading-passage').sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return { fresh, saved };
}
