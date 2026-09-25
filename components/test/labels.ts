import type { QuestionType } from '@/lib/ielts';

/** IELTS question-type names stay in English in every UI language. */
export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  'multiple-choice': 'Multiple Choice',
  'multiple-choice-multi': 'Multiple Choice (more than one answer)',
  matching: 'Matching',
  'plan-map-diagram-labelling': 'Plan / Map / Diagram Labelling',
  'form-completion': 'Form Completion',
  'note-completion': 'Note Completion',
  'table-completion': 'Table Completion',
  'flow-chart-completion': 'Flow-chart Completion',
  'summary-completion': 'Summary Completion',
  'sentence-completion': 'Sentence Completion',
  'short-answer': 'Short Answer',
  'true-false-not-given': 'True / False / Not Given',
  'yes-no-not-given': 'Yes / No / Not Given',
  'matching-headings': 'Matching Headings',
  'matching-information': 'Matching Information',
  'matching-features': 'Matching Features',
  'matching-sentence-endings': 'Matching Sentence Endings',
  'diagram-label-completion': 'Diagram Label Completion',
};

export const formatClock = (seconds: number) => {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

export const questionRange = (numbers: number[]) =>
  numbers.length > 1 ? `${numbers[0]}–${numbers[numbers.length - 1]}` : String(numbers[0]);
