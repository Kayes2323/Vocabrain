'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Panel } from '@/components/ds';
import { TASK1_MODULES, TASK2_MODULES } from '@/lib/writing-studio/content';
import { useStartedLessons } from '@/lib/writing-studio/lesson-activity';
import { continueHref, continueModule, moduleHref, moduleStatus, taskHref } from '@/lib/writing-studio/navigation';
import type { TaskId } from '@/lib/writing-studio/types';
import { actionKey, LessonCard, statusKey, useWsLocale, useWsProgress, WsHeader } from './common';

/**
 * Level 3 — Learn Mode: only the task's modules (Task 1: seven, Task 2: nine), one consistent card each, and at most one
 * "continue where you left off" card when there is a real unfinished lesson. Modules come from TASK1_MODULES /
 * TASK2_MODULES (single source of truth); lesson ids and progress mapping are untouched.
 */
export function LearnLibrary({ task }: { task: TaskId }) {
  const { text, l } = useWsLocale(task);
  const progress = useWsProgress();
  const started = useStartedLessons();
  const modules = task === 'task1' ? TASK1_MODULES : TASK2_MODULES;
  const next = continueModule(modules, progress, started);
  const nextStatus = next ? moduleStatus(progress, next, started) : undefined;

  return (
    <div className="mx-auto max-w-3xl space-y-6" data-testid="ws-learn" data-task={task}>
      <WsHeader
        title={text('learnTitle')}
        subtitle={text('learnSubtitle', { n: modules.length })}
        context={text(task === 'task1' ? 'task1Title' : 'task2Title')}
        backHref={taskHref(task)}
        backLabel={text(task === 'task1' ? 'task1Title' : 'task2Title')}
      />

      {next && (
        <Panel variant="brand" className="space-y-2" data-testid="ws-continue">
          <p className="text-xs font-semibold tracking-wide text-brand uppercase">{text('continueTitle')}</p>
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 font-medium text-balance">{l(next.title)}</p>
            <Link href={continueHref(task, next)} data-testid="ws-continue-link" className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground">
              {text(actionKey(nextStatus ?? 'not-started'))} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Panel>
      )}

      <div className="space-y-3" data-testid="ws-module-list">
        {modules.map((m) => {
          const status = moduleStatus(progress, m, started);
          return (
            <LessonCard
              key={m.id}
              testId="ws-module-card"
              dataId={m.id}
              href={moduleHref(task, m)}
              number={m.number}
              title={l(m.title)}
              description={l(m.description)}
              status={status}
              statusLabel={text(statusKey(status))}
              actionLabel={text(actionKey(status))}
            />
          );
        })}
      </div>
    </div>
  );
}
