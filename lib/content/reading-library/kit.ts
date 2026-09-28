import type { Bi, GapGroup, GapItem, LexEntry, MultiGroup, Option, PassageVocab, SelectGroup, SelectItem, SelectType, VocabTier } from './types';

/** Builders that keep the passage files short and readable. */

export const bi = (en: string, bn: string): Bi => ({ en, bn });

/** A lexicon entry. */
export const lex = (
  lemma: string,
  pos: string,
  tier: VocabTier,
  en: string,
  bn: string,
  example: string,
  exampleBn: string,
  synonyms: string[] = [],
): LexEntry => ({ lemma, pos, tier, en, bn, example, exampleBn, synonyms });

/** A word used in a passage, with what it means there. `match` defaults to the lemma. */
export const v = (lemma: string, match: string | string[], ctxEn: string, ctxBn: string, sense?: Partial<Bi>): PassageVocab => ({
  lemma,
  match: Array.isArray(match) ? match : [match],
  ctx: { en: ctxEn, bn: ctxBn },
  ...(sense ? { sense } : {}),
});

/** Multiple-choice options from strings: A, B, C, D. */
export const abcd = (...labels: string[]): Option[] => labels.map((label, i) => ({ value: 'ABCDEFGH'[i], label }));

/** Roman-numeral heading list. */
const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
export const headings = (...labels: string[]): Option[] => labels.map((label, i) => ({ value: ROMAN[i], label }));

/** Named options (people, places) with letters. */
export const named = (...labels: string[]): Option[] => labels.map((label, i) => ({ value: 'ABCDEFGH'[i], label }));

export const q = (id: string, prompt: string, answer: string, en: string, bn: string, evidence?: string, options?: Option[]): SelectItem => ({
  id,
  prompt,
  answer,
  explain: { en, bn },
  ...(evidence ? { evidence } : {}),
  ...(options ? { options } : {}),
});

export const select = (type: SelectType, instruction: Bi, items: SelectItem[], options?: Option[]): SelectGroup => ({
  kind: 'select',
  type,
  instruction,
  items,
  ...(options ? { options } : {}),
});

export const gapItem = (id: string, accepted: string[], en: string, bn: string, evidence: string, prompt?: string): GapItem => ({
  id,
  accepted,
  explain: { en, bn },
  evidence,
  ...(prompt ? { prompt } : {}),
});

export const multi = (id: string, instruction: Bi, prompt: string, options: Option[], answers: string[], en: string, bn: string, evidence: string): MultiGroup => ({
  kind: 'multi',
  instruction,
  item: { id, prompt, options, answers, explain: { en, bn }, evidence },
});

// Standard instructions, bilingual.
const WORDS = ['', 'ONE WORD', 'TWO WORDS', 'THREE WORDS'];
const WORDS_BN = ['', 'একটা word', 'দুটো word', 'তিনটা word'];
export const limitText = (max: number, numbers?: boolean): Bi =>
  max === 1 && !numbers
    ? bi('Choose ONE WORD ONLY from the passage for each answer.', 'প্রতিটা উত্তরে passage থেকে শুধু একটা word নিন।')
    : bi(
        `Choose NO MORE THAN ${WORDS[max]}${numbers ? ' AND/OR A NUMBER' : ''} from the passage for each answer.`,
        `প্রতিটা উত্তরে passage থেকে সর্বোচ্চ ${WORDS_BN[max]}${numbers ? ' এবং/অথবা একটা সংখ্যা' : ''} নিন।`,
      );

export const TFNG_I = bi(
  'Do the following statements agree with the information given in the passage? Write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
  'নিচের বাক্যগুলো কি passage-এর তথ্যের সাথে মেলে? মিললে TRUE, বিপরীত হলে FALSE, আর তথ্য না থাকলে NOT GIVEN।',
);
export const YNNG_I = bi(
  'Do the following statements agree with the claims of the writer? Write YES if the statement agrees with the claims of the writer, NO if it contradicts them, NOT GIVEN if it is impossible to say what the writer thinks about this.',
  'নিচের বাক্যগুলো কি লেখকের মতের সাথে মেলে? মিললে YES, বিপরীত হলে NO, আর লেখকের মত বোঝা না গেলে NOT GIVEN।',
);
export const MCQ_I = bi('Choose the correct letter, A, B, C or D.', 'সঠিক অক্ষরটা বেছে নিন: A, B, C বা D।');
export const HEAD_I = bi(
  'The passage has several paragraphs. Choose the correct heading for each paragraph from the list of headings. There are more headings than paragraphs.',
  'Passage-এর প্রতিটা paragraph-এর জন্য তালিকা থেকে সঠিক heading বাছুন। Heading paragraph-এর চেয়ে বেশি।',
);
export const INFO_I = bi(
  'Which paragraph contains the following information? You may use any letter more than once.',
  'কোন paragraph-এ নিচের তথ্য আছে? একটা অক্ষর একাধিকবার ব্যবহার করা যায়।',
);
export const NAMES_I = bi(
  'Match each statement with the correct person or group. You may use any letter more than once.',
  'প্রতিটা বাক্য সঠিক ব্যক্তি বা দলের সাথে মেলান। একটা অক্ষর একাধিকবার ব্যবহার করা যায়।',
);
export const TWO_I = bi('Choose TWO letters.', 'দুটো অক্ষর বাছুন।');
export const SHORT_I = (max: number, numbers?: boolean) =>
  bi(`Answer the questions below. ${limitText(max, numbers).en}`, `নিচের প্রশ্নগুলোর উত্তর দিন। ${limitText(max, numbers).bn}`);
export const COMPLETE_I = (what: 'sentences' | 'summary' | 'notes' | 'table', max: number, numbers?: boolean) => {
  const bnWhat = { sentences: 'বাক্যগুলো', summary: 'Summary-টা', notes: 'Note-গুলো', table: 'Table-টা' }[what];
  return bi(`Complete the ${what} below. ${limitText(max, numbers).en}`, `নিচের ${bnWhat} পূরণ করুন। ${limitText(max, numbers).bn}`);
};

export const gap = (
  type: GapGroup['type'],
  maxWords: number,
  items: GapItem[],
  extra: { numbers?: boolean; title?: string; lines?: string[]; table?: GapGroup['table'] } = {},
): GapGroup => {
  const what = type === 'sentence' ? 'sentences' : type === 'summary' ? 'summary' : type === 'note' ? 'notes' : 'table';
  return {
    kind: 'gap',
    type,
    instruction: type === 'short' ? SHORT_I(maxWords, extra.numbers) : COMPLETE_I(what, maxWords, extra.numbers),
    maxWords,
    items,
    ...extra,
  };
};
