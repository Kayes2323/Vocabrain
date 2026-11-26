'use client';

import Link from 'next/link';
import { ClipboardList, GraduationCap, RotateCcw, Timer } from 'lucide-react';
import { ModuleCard, Panel } from '@/components/ds';
import { MinoCoachWelcome } from '@/components/mino/MinoCoachWelcome';
import { LevelBadge } from '@/components/writing-studio/LevelBadge';
import { TASK1_MODULES, TASK2_MODULES } from '@/lib/writing-studio/content';
import { deriveAcademyStats } from '@/lib/writing-studio/progress';
import { examHref, learnHref, mistakesHref, practiceHref, progressHref, WS_ROOT } from '@/lib/writing-studio/navigation';
import type { TaskId } from '@/lib/writing-studio/types';
import { useWsLocale, useWsProgress, WsHeader } from './common';

/**
 * Level 2 — the mode selection of one task. Exactly four cards, each opening ONE destination, plus a compact progress
 * summary that is not a card (no chevron, not a link) with a single secondary link to the full progress page.
 * No module list, no chart grid, no second mock-test card, no repeated "continue" here.
 */
export function TaskModes({ task }: { task: TaskId }) {
  const { text } = useWsLocale(task);
  const progress = useWsProgress();
  const modules = task === 'task1' ? TASK1_MODULES : TASK2_MODULES;
  const stats = deriveAcademyStats(progress, task, modules);
  const n = task === 'task1' ? 1 : 2;

  return (
    <div className="mx-auto max-w-3xl space-y-6" data-testid="ws-task-modes" data-task={task}>
      <WsHeader
        title={text(task === 'task1' ? 'task1Title' : 'task2Title')}
        subtitle={text(task === 'task1' ? 'task1Blurb' : 'task2Blurb')}
        backHref={WS_ROOT}
        backLabel={text('home')}
      />

      {/* Mino's first-entry welcome for this task (shown once per device and area, unchanged). */}
      {/* (clipped sideways: the welcome's violet glow extends past the panel and would make a 360 px screen scroll) */}
      <div className="overflow-x-clip">
        <MinoCoachWelcome area={task} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2" data-testid="ws-mode-cards">
        <ModuleCard href={learnHref(task)} icon={GraduationCap} tint="lavender" title={text('modeLearn')} subtitle={text('modeLearnSub')} wrapSubtitle />
        <ModuleCard href={practiceHref(task)} icon={ClipboardList} tint="green" title={text('modePractice')} subtitle={text('modePracticeSub')} wrapSubtitle />
        <ModuleCard href={examHref(task)} icon={Timer} tint="yellow" title={text('modeExam')} subtitle={text(task === 'task1' ? 'modeExamSub1' : 'modeExamSub2')} wrapSubtitle />
        <ModuleCard href={mistakesHref(task)} icon={RotateCcw} tint="blue" title={text('modeMistakes')} subtitle={text('modeMistakesSub')} wrapSubtitle />
      </div>

      {/* A summary, not an entry point: plain figures, no chevron. */}
      <Panel className="space-y-3" data-testid="ws-progress-summary">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="text-xl font-semibold tabular-nums" data-testid="ws-sum-lessons">{stats.lessonsCompleted}/{stats.lessonsTotal}</p>
            <p className="text-xs text-muted-foreground">{text('summaryLessons')}</p>
          </div>
          <div>
            <p className="text-xl font-semibold tabular-nums" data-testid="ws-sum-practice">{stats.practiceSessions}</p>
            <p className="text-xs text-muted-foreground">{text('summaryPractice')}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-t pt-3">
          <p className="text-xs text-muted-foreground">{text('summaryLevel')}</p>
          <LevelBadge level={stats.currentLevel} />
        </div>
        <Link href={progressHref()} data-testid="ws-view-progress" className="flex min-h-11 items-center justify-center rounded-lg text-sm font-medium text-brand hover:underline">
          {text('viewProgress')}
        </Link>
      </Panel>
      <span hidden data-testid="ws-task-number">{n}</span>
    </div>
  );
}
