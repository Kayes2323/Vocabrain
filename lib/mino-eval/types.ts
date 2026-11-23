// Mino Answer Evaluation Engine — the shared contract.
//
// Every learner answer in Mino (a multiple-choice pick, a vocabulary meaning,
// a sentence, an idea, a paragraph…) can be evaluated through this one
// contract, so the learner always hears from Mino whether their answer is
// right, partly right or wrong, why, and what to do next — and never has to
// compare it with an answer key themselves.
//
// Objective answers are checked locally and instantly (lib/mino-eval/objective.ts).
// Meaning-dependent answers are evaluated by the server (lib/ai/server/evaluate)
// and validated against these schemas. This file has no server or UI imports so
// both sides can share it.
import { z } from 'zod';

export const ANSWER_TYPES = [
  'multiple_choice',
  'vocab_meaning',
  'vocab_usage',
  'speaking_usage',
  'short_answer',
  'sentence',
  'paraphrase',
  'idea',
  'idea_rung',
  'paragraph',
  'introduction',
  'conclusion',
  'essay',
] as const;
export type AnswerType = (typeof ANSWER_TYPES)[number];

export const VERDICTS = ['correct', 'partially_correct', 'incorrect', 'needs_revision', 'relevant_but_underdeveloped', 'unable_to_evaluate'] as const;
export type Verdict = (typeof VERDICTS)[number];

/**
 * Which verdicts make sense for which answer type. Objective and vocabulary
 * answers have a right and a wrong; open-ended writing does not, so it is
 * never forced into a bare right/wrong verdict.
 */
export const VERDICTS_BY_TYPE: Record<AnswerType, readonly Verdict[]> = {
  multiple_choice: ['correct', 'incorrect'],
  vocab_meaning: ['correct', 'partially_correct', 'incorrect', 'unable_to_evaluate'],
  vocab_usage: ['correct', 'partially_correct', 'incorrect', 'unable_to_evaluate'],
  // Transcript-only: judges meaning/grammar of the SAID word, never pronunciation (see RUBRIC).
  speaking_usage: ['correct', 'partially_correct', 'incorrect', 'unable_to_evaluate'],
  short_answer: ['correct', 'partially_correct', 'incorrect', 'unable_to_evaluate'],
  sentence: ['correct', 'needs_revision', 'partially_correct', 'incorrect', 'unable_to_evaluate'],
  paraphrase: ['correct', 'needs_revision', 'partially_correct', 'incorrect', 'unable_to_evaluate'],
  idea: ['correct', 'relevant_but_underdeveloped', 'needs_revision', 'incorrect', 'unable_to_evaluate'],
  idea_rung: ['correct', 'relevant_but_underdeveloped', 'needs_revision', 'incorrect', 'unable_to_evaluate'],
  paragraph: ['correct', 'relevant_but_underdeveloped', 'needs_revision', 'incorrect', 'unable_to_evaluate'],
  introduction: ['correct', 'needs_revision', 'partially_correct', 'incorrect', 'unable_to_evaluate'],
  conclusion: ['correct', 'needs_revision', 'partially_correct', 'incorrect', 'unable_to_evaluate'],
  essay: ['correct', 'relevant_but_underdeveloped', 'needs_revision', 'incorrect', 'unable_to_evaluate'],
};

/** Answer types whose answer is checked locally, with no AI request. */
export const OBJECTIVE_TYPES: readonly AnswerType[] = ['multiple_choice'];

export interface EvaluationIssue {
  /** Words copied exactly from the learner's answer (only present when they really occur there). */
  quote?: string;
  /** What is wrong. */
  problem: string;
  /** Why it matters. */
  why: string;
  /** A corrected version or a precise fix. */
  fix?: string;
  /** A stable tag, e.g. "unsupported-claim". */
  tag?: string;
}

export interface MinoEvaluation {
  verdict: Verdict;
  answerType: AnswerType;
  /** true = right, false = wrong, null = open-ended / partly right (no bare right/wrong). */
  isCorrect: boolean | null;
  /** 0–1. Objective checks are 1; AI evaluations report the model's own confidence. */
  confidence: number;
  strengths: string[];
  issues: EvaluationIssue[];
  /** Why the verdict is what it is — for an objective answer, why the right option is right. */
  explanation: string;
  /** A corrected or improved version, when one genuinely helps. */
  correction: string | null;
  /** A nudge that does not give the answer away. */
  hint: string | null;
  /** One specific thing to do next. */
  nextAction: string;
  /** Stable machine tags for mistake tracking. */
  errorTags: string[];
  latencyMs: number;
  /** "objective" = checked locally against trusted answer data; "ai" = semantic evaluation. */
  source: 'objective' | 'ai';
  model?: string;
}

/** Real learner history only — never invented. */
export const learnerContextSchema = z.object({
  /** Lesson or activity the answer belongs to, e.g. "task2-understanding". */
  lessonId: z.string().max(80).optional(),
  /** The learner's current learning objective. */
  objective: z.string().max(400).optional(),
  /** Recorded earlier mistakes that are relevant to this answer (most relevant first). */
  recentMistakes: z
    .array(
      z.object({
        category: z.string().max(80),
        quote: z.string().max(200).optional(),
        why: z.string().max(300).optional(),
        fix: z.string().max(200).optional(),
      }),
    )
    .max(5)
    .default([]),
  /** Optional history for a vocabulary word: how often it has been missed. */
  wordHistory: z.object({ attempts: z.number().int().min(0).max(1000), misses: z.number().int().min(0).max(1000) }).optional(),
});
export type LearnerContext = z.infer<typeof learnerContextSchema>;

const vocabSchema = z.object({
  word: z.string().min(1).max(60),
  partOfSpeech: z.string().max(30).optional(),
  /** Trusted English meaning. */
  meaning: z.string().max(300).optional(),
  /** Trusted Bangla meaning. */
  meaningBn: z.string().max(200).optional(),
  synonyms: z.array(z.string().max(60)).max(12).default([]),
  collocations: z.array(z.string().max(80)).max(12).default([]),
  /** For a context question: the sentence the word appears in. */
  contextSentence: z.string().max(500).optional(),
});

/** What the learner is being asked to do in an idea-ladder step. */
const rungSchema = z.object({
  /** The step's question, e.g. "Why is that argument true? (The mechanism)". */
  prompt: z.string().max(300),
  hint: z.string().max(300).optional(),
  /** 1-based position in the ladder. */
  order: z.number().int().min(1).max(12),
  /** Earlier steps' answers, in order (so the evaluator can see whether this step adds anything). */
  previous: z.array(z.object({ prompt: z.string().max(300), answer: z.string().max(1500) })).max(10).default([]),
});

export const evaluationRequestSchema = z.object({
  answerType: z.enum(ANSWER_TYPES).refine((t) => !OBJECTIVE_TYPES.includes(t), 'objective answers are checked locally'),
  language: z.enum(['en', 'bn']),
  /** The question or instruction the learner was answering. */
  question: z.string().trim().min(1).max(2000),
  /** The learner's answer. Untrusted content: it is only ever assessed, never obeyed. */
  answer: z.string().trim().min(1).max(4000),
  /** Optional trusted key points a good answer covers; not to be matched word for word. */
  keyPoints: z.array(z.string().max(300)).max(8).optional(),
  /** Whether the question requires the writer to take a position (agree/disagree etc.). */
  requiresPosition: z.boolean().optional(),
  vocab: vocabSchema.optional(),
  rung: rungSchema.optional(),
  learner: learnerContextSchema.optional(),
});
export type EvaluationRequest = z.infer<typeof evaluationRequestSchema>;

/** What the model is asked to return. Quotes are verified against the answer on the server. */
export const modelEvaluationSchema = z.object({
  verdict: z.enum(VERDICTS),
  confidence: z.number().min(0).max(1).default(0.7),
  strengths: z.array(z.string().max(300)).max(3).default([]),
  issues: z
    .array(
      z.object({
        quote: z.string().max(300).optional().nullable(),
        problem: z.string().max(300),
        why: z.string().max(400),
        fix: z.string().max(400).optional().nullable(),
        tag: z.string().max(40).optional().nullable(),
      }),
    )
    .max(4)
    .default([]),
  explanation: z.string().max(700),
  correction: z.string().max(600).nullable().default(null),
  hint: z.string().max(300).nullable().default(null),
  nextAction: z.string().max(300),
  errorTags: z.array(z.string().max(40)).max(6).default([]),
});
export type ModelEvaluation = z.infer<typeof modelEvaluationSchema>;

export type EvaluationResponse = { ok: true; evaluation: MinoEvaluation } | { ok: false; error: import('@/lib/ai/types').MinoErrorCode };
