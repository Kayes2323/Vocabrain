'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, ChevronRight, PenLine } from 'lucide-react';
import { ProgressBar } from '@/components/ds';
import { MinoMark } from '@/components/shell/MinoMark';
import { cn } from '@/lib/utils';
import { TASK1_MODULES, TASK2_MODULES } from '@/lib/writing-studio/content';
import { useStartedLessons } from '@/lib/writing-studio/lesson-activity';
import { continueHref, continueModule, taskHref } from '@/lib/writing-studio/navigation';
import { deriveAcademyStats } from '@/lib/writing-studio/progress';
import type { TaskId } from '@/lib/writing-studio/types';
import { useWsLocale, useWsProgress } from '@/components/writing-studio/nav/common';

/**
 * Level 1 — Writing Studio home. One purpose: choose Task 1 or Task 2. Two prominent cards (with their own lesson count)
 * and, only when the learner has something real to continue, one compact resume row. No training-mode cards, no progress
 * dashboard, no module lists: those live one level down, once, where they belong.
 */
export default function WritingStudioHome() {
  const { text, l } = useWsLocale();
  const progress = useWsProgress();
  const started = useStartedLessons();

  const tasks: { id: TaskId; icon: typeof PenLine; title: 'task1Title' | 'task2Title'; blurb: 'task1Blurb' | 'task2Blurb'; tint: string; bar: string }[] = [
    { id: 'task1', icon: BarChart3, title: 'task1Title', blurb: 'task1Blurb', tint: 'bg-tint-blue text-tint-blue-fg', bar: 'blue' },
    { id: 'task2', icon: PenLine, title: 'task2Title', blurb: 'task2Blurb', tint: 'bg-tint-lavender text-tint-lavender-fg', bar: 'lavender' },
  ];

  // One compact resume: the unfinished lesson the learner is in (Task 1 first only when it is the more recent activity).
  const resume = (() => {
    const candidates = (['task1', 'task2'] as TaskId[]).flatMap((id) => {
      const m = continueModule(id === 'task1' ? TASK1_MODULES : TASK2_MODULES, progress, started);
      return m ? [{ id, m, at: Math.max(started[m.builtLessonId ?? ''] ?? 0, ...Object.values(progress.lessons).filter((x) => x.task === (id === 'task1' ? 1 : 2)).map((x) => Date.parse(x.completedAt) || 0)) }] : [];
    });
    return candidates.sort((a, b) => b.at - a.at)[0];
  })();

  return (
    <div className="mx-auto max-w-3xl space-y-6" data-testid="ws-home">
      <header className="flex items-center gap-3">
        <MinoMark size="lg" alive />
        <div className="space-y-0.5">
          <h1 className="text-2xl font-semibold tracking-tight">{text('studioTitle')}</h1>
          <p className="text-[15px] text-muted-foreground">{text('studioSubtitle')}</p>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2" data-testid="ws-task-cards">
        {tasks.map((t) => {
          const modules = t.id === 'task1' ? TASK1_MODULES : TASK2_MODULES;
          const stats = deriveAcademyStats(progress, t.id, modules);
          const Icon = t.icon;
          return (
            <Link
              key={t.id}
              href={taskHref(t.id)}
              data-testid="ws-task-card"
              data-task={t.id}
              className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm transition-colors hover:bg-muted/50 active:scale-[0.99]"
            >
              <div className="flex items-start gap-3">
                <span className={cn('flex size-12 shrink-0 items-center justify-center rounded-xl', t.tint)} aria-hidden>
                  <Icon className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg leading-snug font-semibold">{text(t.title)}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">{text(t.blurb)}</span>
                </span>
                <ChevronRight className="mt-1 size-5 shrink-0 text-muted-foreground/70" aria-hidden />
              </div>
              <div className="space-y-1.5">
                <ProgressBar value={(stats.lessonsCompleted / Math.max(1, stats.lessonsTotal)) * 100} label={text(t.title)} size="sm" />
                <p className="text-xs text-muted-foreground">{text('lessonsOf', { done: stats.lessonsCompleted, total: stats.lessonsTotal })}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {resume && (
        <Link
          href={continueHref(resume.id, resume.m)}
          data-testid="ws-resume"
          className="flex min-h-12 items-center justify-between gap-3 rounded-xl border bg-brand-soft/60 px-4 py-2.5 text-sm"
        >
          <span className="min-w-0 truncate font-medium">{text('resumeLine', { title: l(resume.m.title) })}</span>
          <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-brand">
            {text('resume')} <ArrowRight className="size-4" aria-hidden />
          </span>
        </Link>
      )}
    </div>
  );
}
