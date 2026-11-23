// Objective answers (multiple choice) are checked instantly against trusted
// answer data — no AI request, no waiting. The result has the same shape as a
// semantic evaluation so the learner gets the same Mino experience either way.
import type { MinoEvaluation } from './types';

export interface ObjectiveInput {
  /** The options, in the order shown to the learner. */
  options: string[];
  /** Index of the genuinely correct option (trusted data). */
  correctIndex: number;
  /** Index the learner picked. */
  selectedIndex: number;
  /** Why the correct option is correct (shown whichever option was picked). */
  explain: string;
  /**
   * Optional, parallel to `options`: for a WRONG option, the specific
   * misconception that makes it tempting. Entries for the correct option are ignored.
   */
  optionFeedback?: (string | null | undefined)[];
  language?: 'en' | 'bn';
}

const COPY = {
  en: {
    chose: (o: string) => `You chose “${o}”.`,
    correctIs: (o: string) => `The correct answer is “${o}”.`,
    genericWhy: 'This option does not answer the question correctly.',
    rightStrength: (o: string) => `You picked “${o}”, which is correct.`,
    nextRight: 'Good — continue to the next step.',
    nextWrong: 'Read why the correct answer works, then continue.',
    hintWrong: 'Compare what the question actually asks with what your option says.',
  },
  bn: {
    chose: (o: string) => `আপনি বেছেছেন “${o}”।`,
    correctIs: (o: string) => `সঠিক উত্তর: “${o}”।`,
    genericWhy: 'এই বিকল্পটি প্রশ্নের সঠিক উত্তর নয়।',
    rightStrength: (o: string) => `আপনি “${o}” বেছেছেন, যা সঠিক।`,
    nextRight: 'ঠিক আছে — পরের ধাপে যান।',
    nextWrong: 'সঠিক উত্তরটি কেন সঠিক তা পড়ুন, তারপর এগিয়ে যান।',
    hintWrong: 'প্রশ্নটি আসলে কী জানতে চাইছে আর আপনার বিকল্প কী বলছে — মিলিয়ে দেখুন।',
  },
} as const;

/** Instant, local verdict for a multiple-choice answer. Throws on an impossible index so bad data fails loudly. */
export function evaluateObjective(input: ObjectiveInput): MinoEvaluation {
  const started = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const { options, correctIndex, selectedIndex } = input;
  if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex >= options.length) throw new Error('evaluateObjective: correctIndex is out of range');
  if (!Number.isInteger(selectedIndex) || selectedIndex < 0 || selectedIndex >= options.length) throw new Error('evaluateObjective: selectedIndex is out of range');
  const c = COPY[input.language ?? 'en'];
  const correct = selectedIndex === correctIndex;
  const chosen = options[selectedIndex];
  const right = options[correctIndex];
  const misconception = !correct ? (input.optionFeedback?.[selectedIndex] ?? null) : null;
  const latencyMs = Math.round((typeof performance !== 'undefined' ? performance.now() : Date.now()) - started);
  return {
    verdict: correct ? 'correct' : 'incorrect',
    answerType: 'multiple_choice',
    isCorrect: correct,
    confidence: 1,
    strengths: correct ? [c.rightStrength(chosen)] : [],
    issues: correct
      ? []
      : [{ quote: chosen, problem: c.chose(chosen), why: misconception || c.genericWhy, fix: c.correctIs(right), tag: 'wrong-option' }],
    explanation: input.explain,
    correction: correct ? null : right,
    hint: correct ? null : c.hintWrong,
    nextAction: correct ? c.nextRight : c.nextWrong,
    errorTags: correct ? [] : [misconception ? 'misconception' : 'wrong-option'],
    latencyMs,
    source: 'objective',
  };
}
