// Deterministic scoring for Listening and Reading. No AI: answers are checked
// against the content's answer key, then broken down by part and question type
// so diagnostics (and Mino) can work from facts.
import type { IELTSModule, ObjectiveSection, ObjectiveSkill, Question, QuestionGroup, QuestionType, WordLimit } from './model';
import { answerMode } from './question-types';

/** A student's answer: text / option id, or a set of letters for multi-choice groups. */
export type AnswerValue = string | string[];
/** Keyed by question id; multi-choice groups are keyed by group id. */
export type Answers = Record<string, AnswerValue>;

export interface QuestionResult {
  questionId: string;
  number: number;
  partId: string;
  groupId: string;
  type: QuestionType;
  given: string;
  expected: string[];
  correct: boolean;
  unanswered: boolean;
  /** Text answer one or two letters away from a correct one: likely a spelling slip. */
  nearMiss?: boolean;
  /** Text answer longer than the word limit. */
  overLimit?: boolean;
}

export interface Tally {
  correct: number;
  total: number;
}

export interface SectionResult {
  skill: ObjectiveSkill;
  correct: number;
  total: number;
  /** Only for a full 40-question section; otherwise undefined (not enough data). */
  estimatedBand?: number;
  byPart: (Tally & { partId: string; number: number })[];
  byType: (Tally & { type: QuestionType })[];
  questions: QuestionResult[];
}

// ---------- text normalisation ----------

export function normalise(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[‘’`´]/g, "'")
    .replace(/[‐‑‒–—]/g, '-')
    .replace(/(\d),(?=\d{3}\b)/g, '$1')
    .replace(/^[\s.,;:!?"']+|[\s.,;:!?"']+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** "(the) library" → ["library", "the library"]. */
export function expandAccepted(answer: string): string[] {
  const match = answer.match(/\(([^()]*)\)/);
  if (!match) return [normalise(answer)];
  const before = answer.slice(0, match.index);
  const after = answer.slice((match.index ?? 0) + match[0].length);
  return [...expandAccepted(before + match[1] + after), ...expandAccepted(before + after)];
}

/**
 * Words as IELTS counts them: hyphenated words count once, and a number is not
 * a word. Digits split by spaces (a phone number, "2 500") count as one number.
 */
export function countWords(text: string): { words: number; numbers: number } {
  const tokens = normalise(text).split(' ').filter(Boolean);
  const isNumber = (t: string) => /^[\d.,/:%-]+$/.test(t);
  let numbers = 0;
  let words = 0;
  tokens.forEach((t, i) => {
    if (!isNumber(t)) words++;
    else if (i === 0 || !isNumber(tokens[i - 1])) numbers++;
  });
  return { words, numbers };
}

export function withinLimit(text: string, limit: WordLimit | undefined): boolean {
  if (!limit) return true;
  const { words, numbers } = countWords(text);
  // "AND/OR A NUMBER" allows one number on top of the words; otherwise numbers count as words.
  return limit.number ? words <= limit.words && numbers <= 1 : words + numbers <= limit.words;
}

function distance(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
}

// ---------- checking ----------

function checkText(given: string, question: Question, group: QuestionGroup) {
  const answer = normalise(given);
  const accepted = question.answer.accepted.flatMap(expandAccepted);
  const overLimit = !withinLimit(given, group.wordLimit);
  const matches = accepted.includes(answer);
  const nearMiss = !matches && answer.length >= 4 && accepted.some((a) => a.length >= 4 && distance(answer, a) <= (a.length > 7 ? 2 : 1));
  return { correct: matches && !overLimit, nearMiss, overLimit };
}

function checkOption(given: string, question: Question) {
  const answer = given.trim().toUpperCase();
  return question.answer.accepted.some((a) => a.trim().toUpperCase() === answer);
}

/**
 * Multi-choice ("Choose TWO letters"): each question number is worth one mark
 * and the letters can be in any order, so correct letters are pooled.
 */
function scoreMulti(group: QuestionGroup, chosen: string[]) {
  const key = new Set(group.questions.flatMap((q) => q.answer.accepted.map((a) => a.toUpperCase())));
  const picked = [...new Set(chosen.map((c) => c.toUpperCase()))].slice(0, group.choose ?? group.questions.length);
  const hits = picked.filter((c) => key.has(c));
  const misses = picked.filter((c) => !key.has(c));
  return group.questions.map((q, i) => ({ correct: i < hits.length, given: hits[i] ?? misses[i - hits.length] ?? '' }));
}

export function scoreSection(section: ObjectiveSection, answers: Answers, module: IELTSModule = 'academic'): SectionResult {
  const questions: QuestionResult[] = [];

  for (const part of section.parts) {
    for (const group of part.groups) {
      const mode = answerMode(group);
      const base = { partId: part.id, groupId: group.id, type: group.type };

      if (mode === 'multi-choice') {
        const chosen = answers[group.id];
        const marks = scoreMulti(group, Array.isArray(chosen) ? chosen : []);
        const expected = group.questions.flatMap((q) => q.answer.accepted);
        group.questions.forEach((q, i) =>
          questions.push({ ...base, questionId: q.id, number: q.number, given: marks[i].given, expected, correct: marks[i].correct, unanswered: !marks[i].given }),
        );
        continue;
      }

      for (const q of group.questions) {
        const raw = answers[q.id];
        const given = typeof raw === 'string' ? raw.trim() : '';
        const result = { ...base, questionId: q.id, number: q.number, given, expected: q.answer.accepted, unanswered: !given };
        if (!given) {
          questions.push({ ...result, correct: false });
        } else if (mode === 'text') {
          questions.push({ ...result, ...checkText(given, q, group) });
        } else {
          questions.push({ ...result, correct: checkOption(given, q) });
        }
      }
    }
  }

  questions.sort((a, b) => a.number - b.number);
  const tally = (list: QuestionResult[]): Tally => ({ correct: list.filter((q) => q.correct).length, total: list.length });

  const byType = new Map<QuestionType, QuestionResult[]>();
  for (const q of questions) byType.set(q.type, [...(byType.get(q.type) ?? []), q]);

  const { correct, total } = tally(questions);
  return {
    skill: section.skill,
    correct,
    total,
    // No undefined fields: results are stored in Firestore as-is.
    ...(total === 40 ? { estimatedBand: rawToBand(section.skill, correct, module) } : {}),
    byPart: section.parts.map((p) => ({ partId: p.id, number: p.number, ...tally(questions.filter((q) => q.partId === p.id)) })),
    byType: [...byType.entries()].map(([type, list]) => ({ type, ...tally(list) })),
    questions,
  };
}

// ---------- raw score → band (40-question sections) ----------

/** [minimum raw score, band], highest first. Widely published conversion guides; they vary slightly by test. */
const BAND_TABLES: Record<'listening' | 'academic-reading' | 'general-reading', [number, number][]> = {
  listening: [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5]],
  'academic-reading': [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5]],
  'general-reading': [[40, 9], [39, 8.5], [37, 8], [36, 7.5], [34, 7], [32, 6.5], [30, 6], [27, 5.5], [23, 5], [19, 4.5], [15, 4], [12, 3.5], [9, 3], [6, 2.5]],
};

/** Estimated band for a raw score out of 40. An estimate, never an official score. */
export function rawToBand(skill: ObjectiveSkill, raw: number, module: IELTSModule = 'academic'): number {
  const table = BAND_TABLES[skill === 'listening' ? 'listening' : (`${module}-reading` as const)];
  return table.find(([min]) => raw >= min)?.[1] ?? 0;
}
