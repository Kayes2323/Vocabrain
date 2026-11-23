// How an evaluation affects the learner's saved progress. Pure functions, so the rules are testable.
import type { WritingStudioMistakeRecord } from '@/lib/models';
import type { AnswerType, MinoEvaluation } from './types';

/**
 * A skill-drill evaluation counts as "passed" — so the lesson may be marked
 * complete and the learner may continue — when Mino judged the answer correct
 * or only needing a small, specific improvement. Partly right, incorrect and
 * "unable to evaluate" answers are not a pass: the learner revises. A provider
 * failure never reaches here at all (no evaluation exists).
 */
export function passesSkillCheck(evaluation: Pick<MinoEvaluation, 'verdict'>): boolean {
  return evaluation.verdict === 'correct' || evaluation.verdict === 'needs_revision';
}

/** Maps one of Mino's error tags to the criterion-style category Mistake Revision groups by. */
export function categoryFromTag(tag: string | undefined, answerType: AnswerType | string): string {
  const t = (tag ?? '').toLowerCase();
  if (/grammar|tense|agreement|article|preposition|punctuation|word-order|spelling/.test(t)) return 'Grammar';
  if (/vocab|word-choice|collocation|wrong-meaning|register/.test(t)) return 'Vocabulary';
  if (/link|cohes|coheren|organis|paragraph-structure/.test(t)) return 'Coherence & cohesion';
  return answerType === 'vocab_meaning' || answerType === 'vocab_usage' ? 'Vocabulary' : 'Task response';
}

export type MistakeRow = Pick<WritingStudioMistakeRecord, 'category' | 'quote' | 'fix' | 'why'>;

/** The mistakes Mino found in an answer, as Mistake Revision rows. */
export function mistakeRowsFromEvaluation(evaluation: MinoEvaluation): MistakeRow[] {
  return evaluation.issues.map((i) => ({
    category: categoryFromTag(i.tag, evaluation.answerType),
    quote: i.quote ?? '',
    fix: i.fix ?? evaluation.correction ?? '',
    why: i.why,
  }));
}

const same = (a: MistakeRow, b: Pick<WritingStudioMistakeRecord, 'category' | 'quote' | 'why'>) =>
  a.category === b.category && a.quote.trim().toLowerCase() === b.quote.trim().toLowerCase() && a.why.trim().toLowerCase() === b.why.trim().toLowerCase();

/**
 * Drops rows already recorded among the learner's most recent mistakes, so
 * revising and re-checking an answer that still has the same problem does not
 * add the same mistake again (a genuinely new or different mistake is kept).
 */
export function newMistakeRows(existing: WritingStudioMistakeRecord[], rows: MistakeRow[], lookback = 30): MistakeRow[] {
  const recent = existing.slice(-lookback);
  const out: MistakeRow[] = [];
  for (const r of rows) {
    if (recent.some((e) => same(r, e)) || out.some((o) => same(r, o))) continue;
    out.push(r);
  }
  return out;
}
