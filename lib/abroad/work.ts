import { visaGuide } from '@/lib/content/visa';
import type { Country, FactStatus, SourceRef, WorkQuestion, WorkRule } from '@/lib/models';
import { getPathway, visaCategoriesFor } from './pathways';
import { factStatus } from './sections';

/** Built-in inputs every country can use in a rule, besides its own questions. */
export const BUILT_IN_WORK_INPUTS = ['pathway', 'visaCategory'] as const;

export type WorkAnswers = Record<string, string | undefined>;

export type WorkCheck =
  /** No verified rule exists for this country (or none for the student's route). */
  | { state: 'not-verified'; links: SourceRef[] }
  /** Verified rules exist, but they depend on answers the student hasn't given. */
  | { state: 'needs-answers'; missing: string[]; questions: WorkQuestion[]; links: SourceRef[] }
  /** The rule(s) that apply to exactly this student's answers. */
  | { state: 'answered'; rules: { rule: WorkRule; status: FactStatus }[]; links: SourceRef[] };

/**
 * "Can I work?" — never a guessed yes/no. It returns the verified rule(s)
 * matching every answer, asks for the answers a rule depends on, or says the
 * rule is not verified yet and points to official pages.
 */
export function checkWork(country: Pick<Country, 'code' | 'pathways' | 'workQuestions'>, answers: WorkAnswers, now = new Date()): WorkCheck {
  const guide = visaGuide(country.code);
  const pathway = getPathway(country, answers.pathway);
  const categories = visaCategoriesFor(country, pathway?.id);
  const links = [
    ...(guide?.parts.work?.links ?? []),
    ...categories.flatMap((c) => [...(c.parts.work?.links ?? []), ...(c.links ?? [])]),
    ...(pathway?.links ?? []),
  ].filter((l, i, all) => all.findIndex((x) => x.url === l.url) === i);

  // Only rules a student may see: a not-verified outcome never answers anything.
  const rules = (guide?.workRules ?? []).filter((r) => factStatus(r.outcome, 'work', now) !== 'not-verified');
  const given = (key: string) => answers[key] !== undefined && answers[key] !== '';
  // A rule stays possible while every answered condition matches.
  const possible = rules.filter((r) => Object.entries(r.conditions).every(([k, vals]) => !given(k) || vals.includes(answers[k]!)));
  if (possible.length === 0) return { state: 'not-verified', links };

  const missing = [...new Set(possible.flatMap((r) => Object.keys(r.conditions).filter((k) => !given(k))))];
  if (missing.length > 0) {
    const questions = (country.workQuestions ?? []).filter((q) => missing.includes(q.id));
    return { state: 'needs-answers', missing, questions, links };
  }
  return { state: 'answered', rules: possible.map((rule) => ({ rule, status: factStatus(rule.outcome, 'work', now) })), links };
}
