import { validateAnswer, type AnswerSpec, type Validation } from '@/lib/answers';
import type { Exercise, Pos, SpotExercise } from './model';

/** Case-, space- and final-punctuation-insensitive; curly quotes count as straight. */
export function normaliseAnswer(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.!?]+$/, '')
    .trim();
}

/**
 * Strict form for punctuation and capitalisation practice: capitals and final
 * punctuation count; spacing and curly quotes are still forgiven.
 */
export function strictAnswer(s: string): string {
  return s
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/** The comparison form an exercise is graded with. */
export const answerKey = (ex: Exercise, s: string) => ('strict' in ex && ex.strict ? strictAnswer(s) : normaliseAnswer(s));

/** Words of an order exercise, split on spaces (punctuation stays on its word). */
export const orderWords = (sentence: string) => sentence.split(/\s+/).filter(Boolean);

/** Deterministic shuffle (same order on server and client), never the original order. */
export function shuffledWords(id: string, sentence: string): string[] {
  const words = orderWords(sentence);
  let seed = [...id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rand = () => ((seed = (seed * 1103515245 + 12345) >>> 0) % 1000) / 1000;
  const out = [...words];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  if (out.length > 1 && out.join(' ') === words.join(' ')) out.push(out.shift()!);
  return out;
}

/** The answers a typed exercise accepts, main answer first. */
export function acceptedAnswers(ex: Exercise): string[] {
  switch (ex.type) {
    case 'gap':
    case 'correct':
    case 'spot':
      return ex.accepted;
    case 'order':
      return [ex.answer, ...(ex.alsoAccepted ?? [])];
    default:
      return [];
  }
}

/**
 * How a typed exercise is checked (shared validator, lib/answers). Strict
 * exercises (punctuation, capitals) compare exactly; others accept British or
 * American spelling. A one-gap sentence lets
 * the student repeat the words around the gap ("main gate" for "the main ___").
 */
export function answerSpec(ex: Exercise): AnswerSpec {
  const [correctAnswer = '', ...others] = acceptedAnswers(ex);
  const strict = 'strict' in ex && ex.strict;
  // British or American spelling never changes a grammar answer ("favourite" = "favorite").
  const spec: AnswerSpec = { correctAnswer, acceptedAnswers: others, mode: strict ? 'exact' : 'accepted_answers', ...(strict ? {} : { equivalents: ['spelling'] }) };
  if (ex.type === 'gap' && ex.sentence && ex.sentence.split('___').length === 2 && !correctAnswer.includes(' · ')) {
    const [before, after] = ex.sentence.split('___');
    spec.context = { before, after };
  }
  return spec;
}

/** The full check of a typed answer (gap / correct / order / spot fix), for feedback. */
export function checkExercise(ex: Exercise, answer: string | undefined): Validation | null {
  if (ex.type !== 'gap' && ex.type !== 'correct' && ex.type !== 'order' && ex.type !== 'spot') return null;
  return validateAnswer({ question: answerSpec(ex), userAnswer: ex.type === 'spot' ? parseSpot(answer ?? '').fix : answer });
}

/** true/false for auto-graded exercises; null for free writing (self-checked). */
export function gradeExercise(ex: Exercise, answer: string | undefined): boolean | null {
  if (ex.type === 'write') return null;
  if (!answer || !answer.trim()) return false;
  switch (ex.type) {
    case 'choice':
      return answer === ex.answer;
    case 'gap':
    case 'correct':
    case 'order':
      return checkExercise(ex, answer)!.correct;
    case 'tag': {
      const tags = parseTags(answer);
      return ex.tokens.every((tk, i) => !tk.pos || tags[i] === tk.pos);
    }
    case 'spot':
      return parseSpot(answer).index === ex.wrong && checkExercise(ex, answer)!.correct;
  }
}

/** Tag answers are "index=pos|index=pos". */
export function parseTags(answer: string): Record<number, Pos> {
  const out: Record<number, Pos> = {};
  for (const part of answer.split('|')) {
    const [i, pos] = part.split('=');
    if (i !== undefined && pos) out[Number(i)] = pos as Pos;
  }
  return out;
}
export const formatTags = (tags: Record<number, Pos>) =>
  Object.entries(tags)
    .map(([i, p]) => `${i}=${p}`)
    .join('|');

/** Spot answers are "index:fix". */
export function parseSpot(answer: string): { index: number; fix: string } {
  const at = answer.indexOf(':');
  return at < 0 ? { index: -1, fix: '' } : { index: Number(answer.slice(0, at)), fix: answer.slice(at + 1) };
}

/** An answer string that grades as correct (content checks and tests). */
export function canonicalAnswer(ex: Exercise): string {
  if (ex.type === 'tag') return formatTags(Object.fromEntries(ex.tokens.flatMap((tk, i) => (tk.pos ? [[i, tk.pos]] : []))));
  if (ex.type === 'spot') return `${ex.wrong}:${ex.accepted[0]}`;
  return expectedAnswer(ex);
}

/** The sentence with the wrong word replaced (keeps the original word's final punctuation). */
export function spotCorrected(ex: SpotExercise, fix = ex.accepted[0]): string {
  const punct = ex.words[ex.wrong].match(/[.,;:!?]+$/)?.[0] ?? '';
  return ex.words.map((w, i) => (i === ex.wrong ? `${fix}${/[.,;:!?]$/.test(fix) ? '' : punct}` : w)).join(' ');
}

/**
 * Parts of Speech pairs from a wrong answer: the job expected and the job the
 * student chose. Empty when the content does not say (or the answer was right).
 */
export function posPairs(ex: Exercise, answer: string): { expected: Pos; chosen: Pos }[] {
  if (ex.type === 'tag') {
    const tags = parseTags(answer);
    return ex.tokens.flatMap((tk, i) => (tk.pos && tags[i] && tags[i] !== tk.pos ? [{ expected: tk.pos, chosen: tags[i] }] : []));
  }
  if (!ex.pos || !ex.wrongPos) return [];
  const key = ex.type === 'choice' ? answer : ex.type === 'spot' ? normaliseAnswer(parseSpot(answer).fix) : normaliseAnswer(answer);
  const chosen = ex.wrongPos[key];
  return chosen && chosen !== ex.pos ? [{ expected: ex.pos, chosen }] : [];
}

/** The answer to show after checking. */
export function expectedAnswer(ex: Exercise): string {
  switch (ex.type) {
    case 'choice':
    case 'order':
      return ex.answer;
    case 'gap':
    case 'correct':
      return ex.accepted[0];
    case 'tag':
      return ex.tokens.flatMap((tk) => (tk.pos ? [`${tk.w.replace(/[.,;:!?]+$/, '')}: ${tk.pos}`] : [])).join(' · ');
    case 'spot':
      return spotCorrected(ex);
    case 'write':
      return ex.model;
  }
}

/** The gapped sentence with the right answer filled in ("She ___ to school." → "She goes to school."). */
export function fullSentence(exercise: Exercise): string | undefined {
  if ((exercise.type !== 'choice' && exercise.type !== 'gap') || !exercise.sentence?.includes('___')) return undefined;
  const answer = expectedAnswer(exercise);
  const gaps = exercise.sentence.split('___').length - 1;
  const parts = gaps > 1 ? answer.split(' · ') : [answer];
  if (parts.length !== gaps) return undefined;
  let i = 0;
  // "(no article)" / "-" means the gap stays empty.
  const filled = exercise.sentence
    // A hint in brackets after the gap ("___ (study)") is dropped once the gap is filled.
    .replace(/___(\s*\([^)]*\))?/g, () => {
      const part = parts[i++].trim();
      return /^(\(no article\)|-|—|–)$/.test(part) ? '' : part;
    })
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
  // Other hints or notes in brackets: the filled sentence would not read as one sentence.
  if (filled.includes('(')) return undefined;
  return filled.charAt(0).toUpperCase() + filled.slice(1);
}
