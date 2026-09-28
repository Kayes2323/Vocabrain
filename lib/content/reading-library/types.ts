/**
 * IELTS Reading Library: original Academic passages with IELTS-style
 * questions and a shared, bilingual vocabulary lexicon.
 *
 * Every passage is original Mino content written to Cambridge-level
 * difficulty; no Cambridge (or other published) passage is reproduced.
 * Vocabulary is defined once in the lexicon and referenced by each passage
 * with its meaning in that context, so a word learned in one passage is the
 * same entry everywhere (and the same word in My Brain).
 */

export type ReadingLevel = 'foundation' | 'intermediate' | 'advanced';
export const READING_LEVELS: ReadingLevel[] = ['foundation', 'intermediate', 'advanced'];

/** How important a word is for the student: learn Core first. */
export type VocabTier = 'core' | 'useful' | 'advanced';

export interface Bi {
  en: string;
  bn: string;
}

/** One lexicon entry, defined once for the whole library. */
export interface LexEntry {
  /** Lowercase dictionary form; may be a phrase ("in turn"). The key. */
  lemma: string;
  /** noun, verb, adjective, adverb, phrase, collocation, phrasal verb… */
  pos: string;
  /** Simple English meaning of the usual sense. */
  en: string;
  /** Bangla meaning of the usual sense. */
  bn: string;
  example: string;
  exampleBn: string;
  synonyms?: string[];
  tier: VocabTier;
}

/** A lexicon word as used in one passage. */
export interface PassageVocab {
  lemma: string;
  /** Exact forms as they appear in the passage (case-insensitive); all are highlighted. */
  match: string[];
  /** What the word means here. */
  ctx: Bi;
  /** Sense-specific meanings when this passage uses a different sense from the lexicon default. */
  sense?: Partial<Bi>;
}

export interface Option {
  value: string;
  label: string;
}

export type SelectType = 'mcq' | 'tfng' | 'ynng' | 'headings' | 'info' | 'names';
export type GapType = 'sentence' | 'summary' | 'note' | 'table' | 'short';

interface ItemBase {
  /** Unique across the library, e.g. "rl01-q3". */
  id: string;
  /** Why the answer is right, and where it is (paragraph). Bangla is shown to Bangla learners and whenever an answer is wrong. */
  explain: Bi;
  /** Words copied from the passage that prove the answer (checked in tests). Omitted only for NOT GIVEN. */
  evidence?: string;
}

export interface SelectItem extends ItemBase {
  prompt: string;
  answer: string;
  /** Per-question options (multiple choice). Otherwise the group's options. */
  options?: Option[];
}

export interface SelectGroup {
  kind: 'select';
  type: SelectType;
  instruction: Bi;
  /** Shared options: a list of headings, names or paragraph letters. TF/NG and Y/N/NG get theirs automatically. */
  options?: Option[];
  items: SelectItem[];
}

/** "Choose TWO letters": one mark per correct letter, in any order. */
export interface MultiGroup {
  kind: 'multi';
  instruction: Bi;
  item: ItemBase & { prompt: string; options: Option[]; answers: string[] };
}

export interface GapItem extends ItemBase {
  /** Sentence or short-answer text; "___" marks the gap. Summary, note and table gaps live in the group text. */
  prompt?: string;
  /** Accepted answers; the first is the model answer and must appear in the passage. */
  accepted: string[];
}

export interface GapGroup {
  kind: 'gap';
  type: GapType;
  instruction: Bi;
  /** Word limit, e.g. 2 for "NO MORE THAN TWO WORDS". */
  maxWords: number;
  /** "AND/OR A NUMBER" */
  numbers?: boolean;
  title?: string;
  /** Summary / note lines with [[itemId]] placeholders. */
  lines?: string[];
  /** Table with [[itemId]] placeholders in cells. */
  table?: { head: string[]; rows: string[][] };
  items: GapItem[];
}

export type QuestionGroup = SelectGroup | MultiGroup | GapGroup;

export interface LibraryPassage {
  id: string;
  title: string;
  topic: string;
  level: ReadingLevel;
  minutes: number;
  /** Paragraphs A, B, C… */
  paragraphs: string[];
  vocab: PassageVocab[];
  groups: QuestionGroup[];
  /**
   * Optional background for a passage about a real topic: well-known facts it
   * draws on. The passage text itself is always original.
   */
  background?: string;
}

/** The student's saved state for one passage (stored in the profile). */
export type { ReadingLibraryProgress } from '@/lib/models/profile';
