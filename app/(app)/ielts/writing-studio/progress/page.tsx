'use client';

import Link from 'next/link';
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ArrowRight, Minus, TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Callout, PageHeader, Panel, ProgressBar, Section, StatusChip } from '@/components/ds';
import { LevelBadge } from '@/components/writing-studio/LevelBadge';
import { useProfile } from '@/components/providers/ProfileProvider';
import type { WritingStudioProgress } from '@/lib/models';
import { TASK1_MODULES, TASK2_MODULES } from '@/lib/writing-studio/content';
import { getLesson } from '@/lib/writing-studio/lessons';
import { deriveAcademyStats, deriveMistakeCategories, deriveProgressTrend } from '@/lib/writing-studio/progress';

const TREND_ICON = { up: TrendingUp, down: TrendingDown, flat: Minus } as const;
const TREND_TONE = { up: 'danger', down: 'success', flat: 'neutral' } as const;

const chartConfig: ChartConfig = { band: { label: 'Indicative band', color: 'var(--chart-1)' } };
const EMPTY_PROGRESS: WritingStudioProgress = { lessons: {}, practice: [], mistakes: [], exams: [] };

/** Progress & Mistake Revision, with a short Learning Profile summary at the top (spec §3, §9 Mode 4, §12). */
export default function ProgressPage() {
  const { profile } = useProfile();
  const progress = profile?.writingStudio ?? EMPTY_PROGRESS;
  const task1 = deriveAcademyStats(progress, 'task1', TASK1_MODULES);
  const task2 = deriveAcademyStats(progress, 'task2', TASK2_MODULES);
  const trend = deriveProgressTrend(progress);
  const mistakes = deriveMistakeCategories(progress, { task1: TASK1_MODULES, task2: TASK2_MODULES });

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <PageHeader title="Progress & Learning Profile" subtitle="What Mino has noticed about your writing so far." backHref="/ielts/writing-studio" backLabel="Writing Studio" />

      <Panel className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold">Learning profile</p>
          <LevelBadge level={task1.currentLevel} />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <p className="text-xl font-semibold tabular-nums">{task1.lessonsCompleted + task2.lessonsCompleted}</p>
            <p className="text-xs text-muted-foreground">Lessons completed</p>
          </div>
          <div>
            <p className="text-xl font-semibold tabular-nums">{task1.practiceSessions + task2.practiceSessions}</p>
            <p className="text-xs text-muted-foreground">Practice sessions</p>
          </div>
          <div>
            <p className="text-xl font-semibold tabular-nums">{task1.mockTestsTaken + task2.mockTestsTaken}</p>
            <p className="text-xs text-muted-foreground">Mock tests</p>
          </div>
          <div>
            <p className="text-xl font-semibold tabular-nums">{trend.at(-1)?.band.toFixed(1) ?? '—'}</p>
            <p className="text-xs text-muted-foreground">Latest indicative band</p>
          </div>
        </div>
        <Callout tone="neutral">
          Your real history — "indicative band" is a rough practice estimate from Mino or this prototype's local checks, never an official IELTS result.
        </Callout>
      </Panel>

      <Section title="Indicative band over time" variant="label">
        <Panel>
          {trend.length > 0 ? (
            <ChartContainer config={chartConfig} className="w-full" style={{ height: 220 }}>
              <LineChart data={trend} margin={{ left: 4, right: 12, top: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
                <YAxis domain={[4, 8]} tickLine={false} axisLine={false} tickMargin={8} width={28} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="band" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 3.5, fill: 'var(--chart-1)' }} />
              </LineChart>
            </ChartContainer>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">Complete a lesson or a mock test and your band history will appear here.</p>
          )}
        </Panel>
      </Section>

      <Section title="Academy progress" variant="label">
        <div className="grid gap-3 sm:grid-cols-2">
          <Panel className="space-y-2">
            <p className="text-sm font-medium">Task 1</p>
            <ProgressBar value={(task1.lessonsCompleted / task1.lessonsTotal) * 100} label="Task 1 lessons" size="sm" />
            <p className="text-xs text-muted-foreground">{task1.lessonsCompleted}/{task1.lessonsTotal} lessons</p>
          </Panel>
          <Panel className="space-y-2">
            <p className="text-sm font-medium">Task 2</p>
            <ProgressBar value={(task2.lessonsCompleted / task2.lessonsTotal) * 100} label="Task 2 lessons" size="sm" />
            <p className="text-xs text-muted-foreground">{task2.lessonsCompleted}/{task2.lessonsTotal} lessons</p>
          </Panel>
        </div>
      </Section>

      <Section title="Mistake revision" variant="label" description="Built from the errors Mino sees most often in your writing.">
        {mistakes.length > 0 ? (
          <div className="space-y-3">
            {mistakes.map((m) => {
              const TrendIcon = TREND_ICON[m.trend];
              const relatedTask = m.relatedLessonId ? getLesson(m.relatedLessonId)?.task : undefined;
              return (
                <Panel key={m.id} className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium">{m.label}</p>
                    <div className="flex items-center gap-2">
                      <StatusChip tone={TREND_TONE[m.trend]}>
                        <TrendIcon className="size-3" /> {m.occurrences}×
                      </StatusChip>
                    </div>
                  </div>
                  <div className="space-y-1 rounded-lg bg-muted/50 p-3 text-sm">
                    <p lang="en">
                      <span className="line-through decoration-destructive/60">{m.example.quote}</span> →{' '}
                      <span className="font-medium">{m.example.fix}</span>
                    </p>
                    <p className="text-muted-foreground">{m.example.why}</p>
                  </div>
                  {m.relatedLessonId && relatedTask && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/ielts/writing-studio/${relatedTask}/lesson/${m.relatedLessonId}`}>
                        Practise this again <ArrowRight />
                      </Link>
                    </Button>
                  )}
                </Panel>
              );
            })}
          </div>
        ) : (
          <Panel>
            <p className="text-sm text-muted-foreground">
              Nothing recorded yet. Once you finish a lesson, a practice board or a mock test, Mino's and this prototype's
              findings will build your mistake history here.
            </p>
          </Panel>
        )}
      </Section>
    </div>
  );
}
