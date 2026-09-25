import type { BrainWord, WordProblem } from '@/lib/models';

/**
 * Mistake-based learning: when a word keeps failing, work out why instead of
 * just repeating it. Looks at the most recent attempts only.
 */
export interface WordDiagnosis {
  problem: WordProblem;
  /** i18n keys under `diagnosis.<problem>`: `.message` and `.action`. */
  href: string;
}

export function diagnoseWord(w: BrainWord): WordDiagnosis | undefined {
  const recent = w.recallHistory.slice(-6);
  const fails = (ex: string) => recent.filter((a) => a.exercise === ex && !a.correct).length;
  const passes = (ex: string) => recent.filter((a) => a.exercise === ex && a.correct).length;
  const writingFails = w.usageHistory.filter((u) => u.mode === 'writing' && !u.correct).length;
  const collocationHints = w.usageHistory.filter((u) => u.feedback?.includes('practice.feedback.tryCollocation')).length;

  if (fails('meaning') >= 2) return { problem: 'meaning', href: `/review?word=${w.id}&focus=meaning` };
  if (fails('context') >= 2) return { problem: 'context', href: `/review?word=${w.id}&focus=context` };
  if (fails('completion') + fails('synonym') >= 2) return { problem: 'recall', href: `/review?word=${w.id}&focus=recall` };
  if (passes('meaning') + passes('synonym') >= 1 && writingFails >= 2)
    return { problem: 'usage', href: `/practice/writing?word=${w.id}` };
  if (collocationHints >= 2) return { problem: 'collocation', href: `/practice/writing?word=${w.id}` };
  return undefined;
}
