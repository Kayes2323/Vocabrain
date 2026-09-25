import { IELTS_SKILLS, type IELTSSkill } from '@/lib/constants';
import type { DiagnosticResult, IELTSProfile } from '@/lib/models';

/**
 * First version of "find your starting point": three can-do statements per
 * skill, from easier to harder. Answers are 0-3 ("not yet" to "easily").
 * This is a self-assessment estimate. Short timed skill checks will replace
 * or refine it; the result shape stays the same.
 */
export const DIAGNOSTIC_STATEMENTS_PER_SKILL = 3;
export const DIAGNOSTIC_ANSWER_LEVELS = [0, 1, 2, 3] as const;
export type DiagnosticAnswer = (typeof DIAGNOSTIC_ANSWER_LEVELS)[number];
export type DiagnosticAnswers = Record<IELTSSkill, DiagnosticAnswer[]>;

/** i18n key for statement `index` (0-based) of a skill. */
export function statementKey(skill: IELTSSkill, index: number): string {
  return `diagnostic.statements.${skill}.${index + 1}`;
}

/** Sum of 0-9 maps to Band 4.0-8.5 in half-band steps. */
export function estimateSkillBand(answers: DiagnosticAnswer[]): number {
  const sum = answers.reduce<number>((s, a) => s + a, 0);
  return Math.min(8.5, 4 + sum * 0.5);
}

export function buildDiagnosticResult(answers: DiagnosticAnswers, now = new Date()): DiagnosticResult {
  const bands = Object.fromEntries(
    IELTS_SKILLS.map((skill) => [skill, estimateSkillBand(answers[skill])]),
  ) as Record<IELTSSkill, number>;
  return { completedAt: now.toISOString(), method: 'self-assessment', bands };
}

/**
 * The skill where improvement moves the overall band most: the biggest gap to
 * target, or the lowest band when no target is set. Ties prefer Writing and
 * Speaking, the productive skills that usually hold students back.
 */
export function biggestOpportunity(ielts: IELTSProfile): IELTSSkill | undefined {
  const order: IELTSSkill[] = ['writing', 'speaking', 'reading', 'listening'];
  const known = order.filter((s) => ielts.currentBands[s] !== undefined);
  if (known.length === 0) return undefined;
  const target = ielts.targetBand ?? 9;
  return known.reduce((best, s) =>
    target - ielts.currentBands[s]! > target - ielts.currentBands[best]! ? s : best,
  );
}
