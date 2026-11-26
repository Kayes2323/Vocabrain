'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, BookOpenCheck, ClipboardList, GraduationCap, RotateCcw, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardGrid, ModuleCard, PageHeader, Panel, ProgressBar, RowGroup, Section, StatusChip } from '@/components/ds';
import { MinoCoachWelcome } from '@/components/mino/MinoCoachWelcome';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { cn } from '@/lib/utils';
import { deriveAcademyStats } from '@/lib/writing-studio/progress';
import { localize, type ModuleSummary, type TaskId, type VisualTrainingArea } from '@/lib/writing-studio/types';
import { LevelBadge } from './LevelBadge';

const TASK_META: Record<TaskId, { label: string; tagline: string; exam: string }> = {
  task1: { label: 'Task 1 Academy', tagline: 'Learn to analyse and describe visual information.', exam: 'task1' },
  task2: { label: 'Task 2 Academy', tagline: 'Learn to develop ideas, construct arguments, and write essays.', exam: 'task2' },
};

export function AcademyOverview({
  task,
  modules,
  visuals,
}: {
  task: TaskId;
  modules: ModuleSummary[];
  visuals?: VisualTrainingArea[];
}) {
  const { profile } = useProfile();
  const { locale, hasChosen } = useLocale();
  // Bangla is the default for Task 1's Academy cards until a student has
  // explicitly chosen a UI language; Task 2 always follows their normal
  // locale choice, unchanged.
  const contentLocale: 'en' | 'bn' = task === 'task1' && !hasChosen ? 'bn' : locale;
  const stats = deriveAcademyStats(profile?.writingStudio ?? { lessons: {}, practice: [], mistakes: [], exams: [] }, task, modules);
  const meta = TASK_META[task];
  const base = `/ielts/writing-studio/${task}`;
  const builtModule = modules.find((m) => m.builtLessonId);
  const completedLessonIds = new Set(Object.keys(profile?.writingStudio.lessons ?? {}));

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader title={meta.label} subtitle={meta.tagline} backHref="/ielts/writing-studio" backLabel="Writing Studio" />

      <MinoCoachWelcome area={task} />

      <Panel className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-muted-foreground">Your progress in this Academy</p>
          <LevelBadge level={stats.currentLevel} />
        </div>
        <ProgressBar value={(stats.lessonsCompleted / Math.max(1, stats.lessonsTotal)) * 100} label="Lessons completed" />
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span>{stats.lessonsCompleted}/{stats.lessonsTotal} lessons</span>
          <span>{stats.practiceSessions} practice sessions</span>
          <span>{stats.mockTestsTaken} mock tests taken</span>
        </div>
        {stats.focusAreas.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {stats.focusAreas.map((f) => (
              <StatusChip key={f} tone="warning">Focus: {f}</StatusChip>
            ))}
          </div>
        )}
      </Panel>

      {builtModule?.builtLessonId && (
        <Panel variant="brand" className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand uppercase">Continue learning</p>
            <p className="font-medium">{localize(contentLocale, builtModule.title)}</p>
          </div>
          <Button asChild size="sm" className="shrink-0">
            <Link href={`${base}/lesson/${builtModule.builtLessonId}`}>
              Resume <ArrowRight />
            </Link>
          </Button>
        </Panel>
      )}

      <Section title="Learning modules" variant="label">
        <RowGroup>
          {modules.map((m) => {
            const done = !!m.builtLessonId && completedLessonIds.has(m.builtLessonId);
            return (
              <Link
                key={m.id}
                href={`${base}/lesson/${m.builtLessonId ?? m.id}`}
                className="flex min-h-16 w-full items-center gap-3.5 px-4 py-3 text-left transition-colors hover:bg-muted/60"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">{m.number}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium leading-snug">{localize(contentLocale, m.title)}</p>
                  <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{localize(contentLocale, m.description)}</p>
                </div>
                <span className={cn('shrink-0 text-xs font-medium', done ? 'text-success' : 'text-muted-foreground')}>
                  {done ? 'Done' : m.builtLessonId ? 'Start' : 'Preview'}
                </span>
              </Link>
            );
          })}
        </RowGroup>
      </Section>

      {visuals && (
        <Section title="Visual-specific training" variant="label" description="A dedicated area for each chart type you'll meet in Task 1.">
          <CardGrid>
            {visuals.map((v) => (
              <ModuleCard
                key={v.id}
                href={v.builtLessonId ? `${base}/chart-analysis-board` : `${base}/lesson/${v.id}`}
                icon={BarChart3}
                tint="blue"
                title={localize(contentLocale, v.title)}
                subtitle={localize(contentLocale, v.description)}
                wrapSubtitle
                trailing={v.builtLessonId ? <StatusChip tone="brand">Built</StatusChip> : undefined}
              />
            ))}
          </CardGrid>
        </Section>
      )}

      <Section title="Training modes" variant="label">
        <CardGrid>
          <ModuleCard
            href={`${base}/lesson/${builtModule?.builtLessonId ?? modules[0].id}`}
            icon={GraduationCap}
            tint="lavender"
            title="Learn Mode"
            subtitle="Mino teaches the topic step by step."
            wrapSubtitle
          />
          <ModuleCard href={task === 'task1' ? `${base}/chart-analysis-board` : `${base}/idea-development-board`} icon={ClipboardList} tint="green" title="Practice Mode" subtitle="Answer, get feedback, retry and improve." wrapSubtitle />
          <ModuleCard href={`/ielts/writing-studio/exam/${meta.exam}`} icon={Timer} tint="yellow" title="Exam Simulation" subtitle={`Timed, distraction-free ${task === 'task1' ? '20-minute' : '40-minute'} practice.`} wrapSubtitle />
          <ModuleCard href="/ielts/writing-studio/progress" icon={RotateCcw} tint="neutral" title="Mistake Revision" subtitle="Practice built from your recurring errors." wrapSubtitle />
        </CardGrid>
      </Section>

      <Section title="Mock tests" variant="label">
        <RowGroup>
          <Link href={`/ielts/writing-studio/exam/${meta.exam}`} className="flex min-h-16 w-full items-center gap-3.5 px-4 py-3 text-left transition-colors hover:bg-muted/60">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-tint-yellow text-tint-yellow-fg"><BookOpenCheck className="size-4" /></span>
            <div className="min-w-0 flex-1">
              <p className="font-medium leading-snug">{meta.label.replace(' Academy', '')} timed mock</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{task === 'task1' ? '20 minutes · 150+ words' : '40 minutes · 250+ words'}</p>
            </div>
            <StatusChip>{stats.mockTestsTaken} taken</StatusChip>
          </Link>
        </RowGroup>
      </Section>
    </div>
  );
}
