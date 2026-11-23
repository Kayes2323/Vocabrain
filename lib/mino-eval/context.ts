// Builds the learner context Mino uses to personalise feedback. It only ever
// contains REAL recorded learner data (earlier mistakes the app stored) plus
// the current lesson and objective — nothing is invented or inferred.
import type { WritingStudioMistakeRecord } from '@/lib/models';
import type { LearnerContext } from './types';

const clip = (s: string | undefined, n: number) => (s ? s.slice(0, n) : undefined);

export function buildLearnerContext(opts: {
  mistakes?: WritingStudioMistakeRecord[];
  /** Prefer mistakes from this task (1 or 2); other tasks fill any remaining room. */
  task?: 1 | 2;
  lessonId?: string;
  objective?: string;
  max?: number;
}): LearnerContext {
  const max = Math.min(opts.max ?? 5, 5);
  const newestFirst = [...(opts.mistakes ?? [])].reverse();
  const preferred = opts.task ? newestFirst.filter((m) => m.task === opts.task) : newestFirst;
  const rest = opts.task ? newestFirst.filter((m) => m.task !== opts.task) : [];
  const seen = new Set<string>();
  const picked: LearnerContext['recentMistakes'] = [];
  for (const m of [...preferred, ...rest]) {
    const key = `${m.category}|${(m.quote ?? '').toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push({ category: m.category.slice(0, 80), quote: clip(m.quote, 200), why: clip(m.why, 300), fix: clip(m.fix, 200) });
    if (picked.length >= max) break;
  }
  return { lessonId: clip(opts.lessonId, 80), objective: clip(opts.objective, 400), recentMistakes: picked };
}
