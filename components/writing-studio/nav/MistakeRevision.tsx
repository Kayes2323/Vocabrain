'use client';

import Link from 'next/link';
import { ArrowRight, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, StatusChip } from '@/components/ds';
import { TASK1_MODULES, TASK2_MODULES } from '@/lib/writing-studio/content';
import { getLesson } from '@/lib/writing-studio/lessons';
import { deriveMistakeCategories } from '@/lib/writing-studio/progress';
import { lessonHref, progressHref, taskHref, type LessonOrigin } from '@/lib/writing-studio/navigation';
import type { MistakeCategory, TaskId } from '@/lib/writing-studio/types';
import type { WritingStudioProgress } from '@/lib/models';
import { useWsLocale, useWsProgress, WsHeader } from './common';

const TREND_ICON = { up: TrendingUp, down: TrendingDown, flat: Minus } as const;
const TREND_TONE = { up: 'danger', down: 'success', flat: 'neutral' } as const;

/**
 * The mistake cards of Mistake Revision, shared by the combined Progress page and the per-task screens. Presentation only:
 * the categories are derived from the learner's recorded mistakes exactly as before.
 */
export function MistakeCards({ mistakes, origin, practiseLabel, emptyText }: { mistakes: MistakeCategory[]; origin: LessonOrigin; practiseLabel: string; emptyText: string }) {
  if (mistakes.length === 0) {
    return (
      <Panel>
        <p className="text-sm text-muted-foreground" data-testid="ws-mistakes-empty">{emptyText}</p>
      </Panel>
    );
  }
  return (
    <div className="space-y-3" data-testid="ws-mistake-list">
      {mistakes.map((m) => {
        const TrendIcon = TREND_ICON[m.trend];
        const relatedTask = m.relatedLessonId ? getLesson(m.relatedLessonId)?.task : undefined;
        return (
          <Panel key={m.id} className="space-y-2.5" data-testid="ws-mistake-card">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium">{m.label}</p>
              <StatusChip tone={TREND_TONE[m.trend]}>
                <TrendIcon className="size-3" /> {m.occurrences}×
              </StatusChip>
            </div>
            <div className="space-y-1 rounded-lg bg-muted/50 p-3 text-sm">
              <p lang="en">
                <span className="line-through decoration-destructive/60">{m.example.quote}</span> → <span className="font-medium">{m.example.fix}</span>
              </p>
              <p className="text-muted-foreground">{m.example.why}</p>
            </div>
            {m.relatedLessonId && relatedTask && (
              <Button asChild variant="outline" size="sm" className="min-h-11">
                <Link href={lessonHref(relatedTask, m.relatedLessonId, origin)}>
                  {practiseLabel} <ArrowRight />
                </Link>
              </Button>
            )}
          </Panel>
        );
      })}
    </div>
  );
}

/** Only this task's recorded mistakes. A UI-level view over the same stored history: nothing is copied, moved or removed. */
export function progressForTask(progress: WritingStudioProgress, task: TaskId): WritingStudioProgress {
  const n = task === 'task1' ? 1 : 2;
  return { ...progress, mistakes: progress.mistakes.filter((m) => m.task === n) };
}

/** Task 1 / Task 2 → Mistake Revision. */
export function TaskMistakeRevision({ task }: { task: TaskId }) {
  const { text } = useWsLocale(task);
  const progress = useWsProgress();
  const n = task === 'task1' ? 1 : 2;
  const mine = progressForTask(progress, task);
  const categories = deriveMistakeCategories(mine, { task1: TASK1_MODULES, task2: TASK2_MODULES });

  return (
    <div className="mx-auto max-w-3xl space-y-6" data-testid="ws-mistakes" data-task={task}>
      <WsHeader
        title={text('mistakesTitle')}
        subtitle={text('mistakesSubtitle', { n })}
        context={text(task === 'task1' ? 'task1Title' : 'task2Title')}
        backHref={taskHref(task)}
        backLabel={text(task === 'task1' ? 'task1Title' : 'task2Title')}
      />
      <MistakeCards mistakes={categories} origin="mistakes" practiseLabel={text('practiseAgain')} emptyText={text('mistakesEmpty')} />
      <Link href={progressHref()} className="flex min-h-11 items-center justify-center rounded-lg text-sm font-medium text-brand hover:underline">
        {text('viewProgress')}
      </Link>
    </div>
  );
}
