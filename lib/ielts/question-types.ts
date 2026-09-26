import type { ObjectiveSkill, QuestionGroup, QuestionType } from './model';

/** How the student answers a type; decides which renderer is used. */
export type AnswerMode = 'choice' | 'multi-choice' | 'select' | 'text';

export interface QuestionTypeInfo {
  skills: ObjectiveSkill[];
  mode: AnswerMode;
}

export const QUESTION_TYPES: Record<QuestionType, QuestionTypeInfo> = {
  'multiple-choice': { skills: ['listening', 'reading'], mode: 'choice' },
  'multiple-choice-multi': { skills: ['listening', 'reading'], mode: 'multi-choice' },
  matching: { skills: ['listening'], mode: 'select' },
  'plan-map-diagram-labelling': { skills: ['listening'], mode: 'select' },
  'form-completion': { skills: ['listening'], mode: 'text' },
  'note-completion': { skills: ['listening', 'reading'], mode: 'text' },
  'table-completion': { skills: ['listening', 'reading'], mode: 'text' },
  'flow-chart-completion': { skills: ['listening', 'reading'], mode: 'text' },
  'summary-completion': { skills: ['listening', 'reading'], mode: 'text' },
  'sentence-completion': { skills: ['listening', 'reading'], mode: 'text' },
  'short-answer': { skills: ['listening', 'reading'], mode: 'text' },
  'true-false-not-given': { skills: ['reading'], mode: 'choice' },
  'yes-no-not-given': { skills: ['reading'], mode: 'choice' },
  'matching-headings': { skills: ['reading'], mode: 'select' },
  'matching-information': { skills: ['reading'], mode: 'select' },
  'matching-features': { skills: ['reading'], mode: 'select' },
  'matching-sentence-endings': { skills: ['reading'], mode: 'select' },
  'diagram-label-completion': { skills: ['reading'], mode: 'text' },
};

const FIXED_OPTIONS: Partial<Record<QuestionType, string[]>> = {
  'true-false-not-given': ['TRUE', 'FALSE', 'NOT GIVEN'],
  'yes-no-not-given': ['YES', 'NO', 'NOT GIVEN'],
};

/**
 * Options for a question: its own, the group's shared list, or the fixed
 * TRUE/FALSE/NOT GIVEN set. Summary completion with a word box uses the
 * group's options and becomes a select.
 */
export function optionsFor(group: QuestionGroup, questionIndex: number) {
  const fixed = FIXED_OPTIONS[group.type];
  if (fixed) return fixed.map((id) => ({ id, text: id }));
  return group.questions[questionIndex]?.options ?? group.options ?? [];
}

/** Completion types become a select when the content supplies a word box. */
export function answerMode(group: QuestionGroup): AnswerMode {
  const mode = QUESTION_TYPES[group.type].mode;
  return mode === 'text' && group.options?.length ? 'select' : mode;
}

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
