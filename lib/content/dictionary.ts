import { IELTS_VOCABULARY, type IELTSWord } from '@/lib/ielts-vocabulary';
import type { WordInfo } from '@/lib/models';
import { VOCABULARY_DATA } from '@/lib/vocabulary';
import type { GlossaryEntry } from './passages';

/**
 * Word lookup for Save to Brain, in order of trust:
 * 1. the passage's own glossary (written for that context, with Bangla),
 * 2. the Vocab Brain IELTS word bank,
 * 3. the topic lessons (Bangla meanings),
 * 4. the free dictionaryapi.dev service (English only), with a short timeout.
 * Returns undefined when nothing is found; the student can still save the
 * word with its sentence.
 */

/** Possible dictionary forms of a word as it appears in text. */
export function lemmaCandidates(token: string): string[] {
  const w = token.toLowerCase().replace(/[’']s$/, '');
  const out = new Set([w]);
  const add = (s: string) => s.length >= 3 && out.add(s);
  if (w.endsWith('ies')) add(w.slice(0, -3) + 'y');
  if (w.endsWith('es')) add(w.slice(0, -2));
  if (w.endsWith('s')) add(w.slice(0, -1));
  if (w.endsWith('ied')) add(w.slice(0, -3) + 'y');
  if (w.endsWith('ed')) {
    add(w.slice(0, -2));
    add(w.slice(0, -1));
  }
  if (w.endsWith('ing')) {
    add(w.slice(0, -3));
    add(w.slice(0, -3) + 'e');
  }
  if (w.endsWith('ly')) add(w.slice(0, -2));
  return [...out];
}

function fromGlossary(entry: GlossaryEntry): WordInfo {
  return {
    word: entry.word,
    lemma: entry.word.toLowerCase(),
    meaning: entry.meaning,
    meaningBn: entry.meaningBn,
    partOfSpeech: entry.partOfSpeech,
    synonyms: entry.synonyms,
    antonyms: entry.antonyms ?? [],
    collocations: entry.collocations,
    exampleSentence: entry.example,
    dictionarySource: 'glossary',
  };
}

function fromWordBank(w: IELTSWord): WordInfo {
  return {
    word: w.word.toLowerCase(),
    lemma: w.word.toLowerCase(),
    meaning: w.definition,
    partOfSpeech: w.partOfSpeech,
    synonyms: w.synonyms,
    antonyms: w.antonyms ?? [],
    collocations: [],
    exampleSentence: w.exampleSentence || w.example,
    dictionarySource: 'word-bank',
  };
}

export function getWordBankInfo(id: string): { info: WordInfo; title: string } | undefined {
  const w = IELTS_VOCABULARY.find((x) => x.id === id);
  return w ? { info: fromWordBank(w), title: `IELTS word bank · Band ${w.bandLevel}` } : undefined;
}

const LESSON_WORDS = VOCABULARY_DATA.flatMap((l) => l.words);

export function lookupLocal(token: string, glossary?: Record<string, GlossaryEntry>): WordInfo | undefined {
  const candidates = lemmaCandidates(token);
  for (const c of candidates) if (glossary?.[c]) return fromGlossary(glossary[c]);
  for (const c of candidates) {
    const w = IELTS_VOCABULARY.find((x) => x.word.toLowerCase() === c);
    if (w) return fromWordBank(w);
  }
  for (const c of candidates) {
    const l = LESSON_WORDS.find((x) => x.word.toLowerCase() === c);
    if (l) {
      return {
        word: c,
        lemma: c,
        meaning: '',
        meaningBn: l.meaning,
        synonyms: [],
        antonyms: [],
        collocations: [],
        dictionarySource: 'word-bank',
      };
    }
  }
  return undefined;
}

interface ApiEntry {
  word: string;
  meanings: {
    partOfSpeech: string;
    definitions: { definition: string; example?: string; synonyms?: string[]; antonyms?: string[] }[];
    synonyms?: string[];
    antonyms?: string[];
  }[];
}

async function lookupApi(token: string): Promise<WordInfo | undefined> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3500);
  try {
    for (const candidate of lemmaCandidates(token).slice(0, 3)) {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(candidate)}`, {
        signal: controller.signal,
      });
      if (!res.ok) continue;
      const [entry] = (await res.json()) as ApiEntry[];
      const meaning = entry?.meanings?.[0];
      const def = meaning?.definitions?.[0];
      if (!meaning || !def) continue;
      const synonyms = [...(def.synonyms ?? []), ...(meaning.synonyms ?? [])].slice(0, 4);
      const antonyms = [...(def.antonyms ?? []), ...(meaning.antonyms ?? [])].slice(0, 3);
      return {
        word: entry.word,
        lemma: entry.word.toLowerCase(),
        meaning: def.definition,
        partOfSpeech: meaning.partOfSpeech,
        synonyms,
        antonyms,
        collocations: [],
        exampleSentence: def.example,
        dictionarySource: 'dictionary-api',
      };
    }
    return undefined;
  } catch {
    return undefined;
  } finally {
    clearTimeout(timer);
  }
}

export async function lookupWord(token: string, glossary?: Record<string, GlossaryEntry>): Promise<WordInfo | undefined> {
  return lookupLocal(token, glossary) ?? (await lookupApi(token));
}

/** Minimal info so a word can be saved even when no dictionary knows it. */
export function unknownWordInfo(token: string): WordInfo {
  const lemma = token.toLowerCase();
  return { word: lemma, lemma, meaning: '', synonyms: [], antonyms: [], collocations: [], dictionarySource: 'none' };
}
