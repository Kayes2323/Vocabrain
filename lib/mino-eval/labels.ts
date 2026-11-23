// Learner-facing wording for evaluation results. English and Bangla.
import type { AnswerType, Verdict } from './types';

export type EvalLang = 'en' | 'bn';

const VERDICT_LABEL: Record<EvalLang, Record<Verdict, string>> = {
  en: {
    correct: 'Correct and effective',
    needs_revision: 'Mostly correct — needs improvement',
    partially_correct: 'Partially correct',
    relevant_but_underdeveloped: 'Relevant, but underdeveloped',
    incorrect: 'Incorrect or irrelevant',
  },
  bn: {
    correct: 'সঠিক ও কার্যকর',
    needs_revision: 'প্রায় ঠিক — আরও উন্নতি দরকার',
    partially_correct: 'আংশিক সঠিক',
    relevant_but_underdeveloped: 'প্রাসঙ্গিক, কিন্তু আরও বিকশিত করা দরকার',
    incorrect: 'ভুল বা অপ্রাসঙ্গিক',
  },
};

/** The short label shown next to Mino's verdict. Objective answers read as plain right / wrong. */
export function verdictLabel(verdict: Verdict, answerType: AnswerType, lang: EvalLang = 'en'): string {
  if (answerType === 'multiple_choice') {
    if (lang === 'bn') return verdict === 'correct' ? 'সঠিক' : 'ভুল';
    return verdict === 'correct' ? 'Correct' : 'Not quite';
  }
  return VERDICT_LABEL[lang][verdict];
}

export type VerdictTone = 'success' | 'warning' | 'destructive' | 'neutral';
export function verdictTone(verdict: Verdict): VerdictTone {
  switch (verdict) {
    case 'correct':
      return 'success';
    case 'incorrect':
      return 'destructive';
    default:
      return 'warning';
  }
}

export const STATUS_TEXT: Record<EvalLang, Record<'checking' | 'stillChecking' | 'failed' | 'retry' | 'revise' | 'strengths' | 'issues' | 'why' | 'fix' | 'hint' | 'next' | 'correction' | 'explanation' | 'answerKept' | 'quoteHeading', string>> = {
  en: {
    checking: 'Mino is checking your meaning and accuracy…',
    stillChecking: 'Still checking — longer answers take a little more time.',
    failed: 'Mino could not finish checking this answer, so there is no verdict yet.',
    retry: 'Try again',
    revise: 'Revise and check again',
    strengths: 'What you did well',
    issues: 'What to fix',
    why: 'Why',
    fix: 'Try',
    hint: 'Hint',
    next: 'Next step',
    correction: 'A better version',
    explanation: 'Why this verdict',
    answerKept: 'Your answer is still here — nothing was lost.',
    quoteHeading: 'Your words',
  },
  bn: {
    checking: 'Mino আপনার অর্থ ও নির্ভুলতা যাচাই করছে…',
    stillChecking: 'এখনও যাচাই চলছে — বড় উত্তরে একটু বেশি সময় লাগে।',
    failed: 'Mino এই উত্তরটি যাচাই শেষ করতে পারেনি, তাই এখনও কোনো ফলাফল নেই।',
    retry: 'আবার চেষ্টা করুন',
    revise: 'সংশোধন করে আবার যাচাই করুন',
    strengths: 'আপনি যা ভালো করেছেন',
    issues: 'যা ঠিক করতে হবে',
    why: 'কেন',
    fix: 'এভাবে চেষ্টা করুন',
    hint: 'ইঙ্গিত',
    next: 'পরের ধাপ',
    correction: 'আরও ভালো একটি রূপ',
    explanation: 'এই ফলাফল কেন',
    answerKept: 'আপনার উত্তর এখানেই আছে — কিছু হারায়নি।',
    quoteHeading: 'আপনার লেখা',
  },
};
