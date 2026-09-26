import type { Exercise } from './model';

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

/** true/false for auto-graded exercises; null for free writing (self-checked). */
export function gradeExercise(ex: Exercise, answer: string | undefined): boolean | null {
  if (ex.type === 'write') return null;
  if (!answer || !answer.trim()) return false;
  const a = normaliseAnswer(answer);
  switch (ex.type) {
    case 'choice':
      return answer === ex.answer;
    case 'gap':
    case 'correct':
      return ex.accepted.some((x) => normaliseAnswer(x) === a);
    case 'order':
      return [ex.answer, ...(ex.alsoAccepted ?? [])].some((x) => normaliseAnswer(x) === a);
  }
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
    case 'write':
      return ex.model;
  }
}
