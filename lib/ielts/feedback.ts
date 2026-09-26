// AI practice feedback for Writing and Speaking. Always an estimate from
// Mino, never an official IELTS score; the UI and Mino say so.
import type { IELTSSkillId } from './model';

export interface CriterionFeedback {
  criterion: string;
  /** Estimated band, or null when it can't be judged (e.g. Pronunciation from a transcript). */
  band: number | null;
  comment: string;
}

export interface TaskFeedback {
  taskId: string;
  title: string;
  wordCount?: number;
  band: number | null;
  criteria: CriterionFeedback[];
  strengths: string[];
  mistakes: { quote: string; fix: string; why: string }[];
  actions: string[];
  vocabulary: { word: string; tip: string }[];
  betterSentences: { original: string; improved: string }[];
}

export interface ProductiveFeedback {
  skill: Extract<IELTSSkillId, 'writing' | 'speaking'>;
  generatedAt: string;
  model: string;
  /** Estimated band for the whole skill (Writing: Task 2 counts double). */
  overall: number | null;
  tasks: TaskFeedback[];
  /** Limits of this feedback, e.g. "Pronunciation is not assessed from a transcript". */
  notes: string[];
}

export const WRITING_CRITERIA = {
  1: ['Task Achievement', 'Coherence & Cohesion', 'Lexical Resource', 'Grammatical Range & Accuracy'],
  2: ['Task Response', 'Coherence & Cohesion', 'Lexical Resource', 'Grammatical Range & Accuracy'],
} as const;
export const SPEAKING_CRITERIA = ['Fluency & Coherence', 'Lexical Resource', 'Grammatical Range & Accuracy', 'Pronunciation'] as const;

export const roundHalf = (x: number) => Math.round(x * 2) / 2;
export const clampBand = (x: unknown): number | null =>
  typeof x === 'number' && Number.isFinite(x) ? roundHalf(Math.min(9, Math.max(0, x))) : null;

/** Mean of the judged criteria, to the nearest half band. */
export function criteriaBand(criteria: CriterionFeedback[]): number | null {
  const bands = criteria.map((c) => c.band).filter((b): b is number => b !== null);
  return bands.length ? roundHalf(bands.reduce((a, b) => a + b, 0) / bands.length) : null;
}

/** IELTS Writing: Task 2 carries twice the weight of Task 1. */
export function writingOverall(task1: number | null, task2: number | null): number | null {
  if (task1 === null && task2 === null) return null;
  if (task1 === null) return task2;
  if (task2 === null) return task1;
  return roundHalf((task1 + 2 * task2) / 3);
}
