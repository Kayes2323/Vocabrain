import type { WordInfo } from '@/lib/models';
import type {
  Bi, GapGroup, GapItem, LexEntry, LibraryPassage, MultiGroup, Option, PassageVocab, QuestionGroup, ReadingLevel, ReadingLibraryProgress, SelectGroup,
  SelectItem,
} from './types';

export const LETTERS = 'ABCDEFGHIJ'.split('');
export const paragraphLetter = (i: number) => LETTERS[i] ?? String(i + 1);

export const TFNG: Option[] = [
  { value: 'TRUE', label: 'TRUE' },
  { value: 'FALSE', label: 'FALSE' },
  { value: 'NOT GIVEN', label: 'NOT GIVEN' },
];
export const YNNG: Option[] = [
  { value: 'YES', label: 'YES' },
  { value: 'NO', label: 'NO' },
  { value: 'NOT GIVEN', label: 'NOT GIVEN' },
];

/** The options a select question offers. */
export function optionsFor(p: LibraryPassage, g: SelectGroup, item: SelectItem): Option[] {
  if (item.options) return item.options;
  if (g.options) return g.options;
  if (g.type === 'tfng') return TFNG;
  if (g.type === 'ynng') return YNNG;
  return p.paragraphs.map((_, i) => ({ value: paragraphLetter(i), label: paragraphLetter(i) }));
}

// ---------------------------------------------------------------- numbering
export type FlatQuestion =
  | { kind: 'select'; id: string; number: number; group: SelectGroup; item: SelectItem }
  | { kind: 'gap'; id: string; number: number; group: GapGroup; item: GapItem }
  | { kind: 'multi'; id: string; number: number; /** A "Choose TWO" item covers answers.length numbers. */ count: number; group: MultiGroup };

/** Every question in order with its IELTS number (1, 2, 3…). */
export function flatten(p: LibraryPassage): FlatQuestion[] {
  const out: FlatQuestion[] = [];
  let n = 1;
  for (const g of p.groups) {
    if (g.kind === 'multi') {
      out.push({ kind: 'multi', id: g.item.id, number: n, count: g.item.answers.length, group: g });
      n += g.item.answers.length;
    } else if (g.kind === 'select') {
      for (const item of g.items) out.push({ kind: 'select', id: item.id, number: n++, group: g, item });
    } else {
      for (const item of g.items) out.push({ kind: 'gap', id: item.id, number: n++, group: g, item });
    }
  }
  return out;
}

export const questionCount = (p: LibraryPassage) => flatten(p).reduce((s, q) => s + (q.kind === 'multi' ? q.count : 1), 0);

/** The question number range of a group, e.g. [1, 5]. */
export function groupRange(p: LibraryPassage, g: QuestionGroup): [number, number] {
  const qs = flatten(p).filter((q) => q.group === g);
  const last = qs[qs.length - 1];
  return [qs[0].number, last.number + (last.kind === 'multi' ? last.count - 1 : 0)];
}

// ---------------------------------------------------------------- grading
/** Normalises a typed answer: case, curly quotes, spaces and end punctuation. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/^[\s"'.,;:!?]+|[\s"'.,;:!?]+$/g, '')
    .trim();
}

/** Words counted the IELTS way: hyphenated words count as one; numbers count as one. */
export const wordCount = (s: string) => normalize(s).split(' ').filter(Boolean).length;

export type Verdict = { correct: boolean; reason?: 'blank' | 'limit' | 'wrong' };

export function gradeGap(g: GapGroup, item: GapItem, answer: string | undefined): Verdict {
  const a = normalize(answer ?? '');
  if (!a) return { correct: false, reason: 'blank' };
  if (wordCount(a) > g.maxWords) return { correct: false, reason: 'limit' };
  return item.accepted.some((x) => normalize(x) === a) ? { correct: true } : { correct: false, reason: 'wrong' };
}

/** A "Choose TWO" answer is stored as "A,C"; returns marks earned. */
export function gradeMulti(g: MultiGroup, answer: string | undefined): number {
  const chosen = new Set((answer ?? '').split(',').filter(Boolean));
  if (chosen.size > g.item.answers.length) return 0;
  return g.item.answers.filter((a) => chosen.has(a)).length;
}

/** Marks for one flattened question (a multi question can be worth more than one). */
export function marksFor(q: FlatQuestion, answer: string | undefined): number {
  if (q.kind === 'multi') return gradeMulti(q.group, answer);
  if (q.kind === 'select') return answer === q.item.answer ? 1 : 0;
  return gradeGap(q.group, q.item, answer).correct ? 1 : 0;
}

export function scorePassage(p: LibraryPassage, answers: Record<string, string>): { correct: number; total: number } {
  const qs = flatten(p);
  return { correct: qs.reduce((s, q) => s + marksFor(q, answers[q.id]), 0), total: questionCount(p) };
}

/** The model answer shown after checking. */
export function modelAnswer(q: FlatQuestion): string {
  if (q.kind === 'multi') return q.group.item.answers.join(', ');
  if (q.kind === 'select') return q.item.answer;
  return q.item.accepted[0];
}

export function explainOf(q: FlatQuestion): Bi {
  return q.kind === 'multi' ? q.group.item.explain : q.item.explain;
}

// ---------------------------------------------------------------- vocabulary
export interface Segment {
  text: string;
  /** Set when this span is a library vocabulary item. */
  vocab?: PassageVocab;
  start: number;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Splits a paragraph into plain text and vocabulary spans. Longer matches win
 * ("carbon dioxide" over "carbon"), and spans never overlap.
 */
export function segmentParagraph(text: string, vocab: PassageVocab[]): Segment[] {
  const hits: { start: number; end: number; v: PassageVocab }[] = [];
  for (const v of vocab) {
    for (const form of v.match) {
      const re = new RegExp(`(?<![A-Za-z])${escape(form)}(?![A-Za-z])`, 'gi');
      for (const m of text.matchAll(re)) hits.push({ start: m.index ?? 0, end: (m.index ?? 0) + m[0].length, v });
    }
  }
  hits.sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start));
  const chosen: typeof hits = [];
  let until = -1;
  for (const h of hits) {
    if (h.start < until) continue;
    chosen.push(h);
    until = h.end;
  }
  const out: Segment[] = [];
  let at = 0;
  for (const h of chosen) {
    if (h.start > at) out.push({ text: text.slice(at, h.start), start: at });
    out.push({ text: text.slice(h.start, h.end), vocab: h.v, start: h.start });
    at = h.end;
  }
  if (at < text.length) out.push({ text: text.slice(at), start: at });
  return out;
}

/** Everything the vocabulary card shows, in the passage's context. */
export interface VocabView {
  lemma: string;
  pos: string;
  bn: string;
  en: string;
  ctx: Bi;
  example: string;
  exampleBn: string;
  synonyms: string[];
  tier: LexEntry['tier'];
}

export function vocabView(lex: LexEntry, v: PassageVocab): VocabView {
  return {
    lemma: lex.lemma,
    pos: lex.pos,
    bn: v.sense?.bn ?? lex.bn,
    en: v.sense?.en ?? lex.en,
    ctx: v.ctx,
    example: lex.example,
    exampleBn: lex.exampleBn,
    synonyms: lex.synonyms ?? [],
    tier: lex.tier,
  };
}

/** Save to Brain uses the existing vocabulary system: the context meaning becomes the saved meaning. */
export function vocabWordInfo(view: VocabView): WordInfo {
  return {
    word: view.lemma,
    lemma: view.lemma,
    meaning: view.en,
    meaningBn: view.bn,
    partOfSpeech: view.pos,
    synonyms: view.synonyms,
    antonyms: [],
    collocations: [],
    exampleSentence: view.example,
    dictionarySource: 'glossary',
  };
}

// ---------------------------------------------------------------- progress
/** A passage counts as done once its answers were checked (a retry keeps the last result). */
export const isDone = (x: ReadingLibraryProgress | undefined) => !!(x?.checked || x?.score);

export function levelStats(passages: LibraryPassage[], progress: Record<string, ReadingLibraryProgress> | undefined, level: ReadingLevel) {
  const list = passages.filter((p) => p.level === level);
  const done = list.filter((p) => isDone(progress?.[p.id])).length;
  return { total: list.length, done };
}

/** Passages to finish in a level before the next one is suggested (a guide, never a lock). */
export const SUGGEST_AFTER = 3;

/** The level a student is ready for: the first level without SUGGEST_AFTER checked passages. */
export function suggestedLevel(passages: LibraryPassage[], progress: Record<string, ReadingLibraryProgress> | undefined): ReadingLevel {
  if (levelStats(passages, progress, 'foundation').done < SUGGEST_AFTER) return 'foundation';
  if (levelStats(passages, progress, 'intermediate').done < SUGGEST_AFTER) return 'intermediate';
  return 'advanced';
}

/** The next passage to read: the first unchecked one at the suggested level. */
export function nextPassage(passages: LibraryPassage[], progress: Record<string, ReadingLibraryProgress> | undefined): LibraryPassage {
  const level = suggestedLevel(passages, progress);
  return (
    passages.find((p) => p.level === level && !isDone(progress?.[p.id])) ??
    passages.find((p) => !isDone(progress?.[p.id])) ??
    passages[0]
  );
}
