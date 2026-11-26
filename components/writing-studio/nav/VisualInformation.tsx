'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, BarChart3, ChevronRight, Construction, LayoutGrid, LineChart, Map, PieChart, Table2, Workflow, type LucideIcon } from 'lucide-react';
import { Callout, Panel } from '@/components/ds';
import { MinoMark } from '@/components/shell/MinoMark';
import { cn } from '@/lib/utils';
import { TASK1_VISUALS } from '@/lib/writing-studio/content';
import { getLesson } from '@/lib/writing-studio/lessons';
import { useStartedLessons } from '@/lib/writing-studio/lesson-activity';
import { chartTypeById, chartTypeHref, chartTypeState, lessonHref, lessonStatus, learnHref, visualHubHref, VISUAL_LESSON_ID } from '@/lib/writing-studio/navigation';
import { actionKey, statusKey, useWsLocale, useWsProgress, WsHeader } from './common';

/** One icon per chart type, by registry id (the registry stays the source of truth for the categories themselves). */
const CHART_ICON: Record<string, LucideIcon> = {
  'line-graphs': LineChart,
  'bar-charts': BarChart3,
  'pie-charts': PieChart,
  tables: Table2,
  'mixed-charts': LayoutGrid,
  maps: Map,
  'process-diagrams': Workflow,
};

/**
 * Task 1 → Learn Mode → Module 2. Two clearly separated areas:
 *  1. the core lecture: ONE card that opens the existing `visual-information` lesson (its 15 steps, audio, questions
 *     and progress are the lesson's own and untouched);
 *  2. the seven chart types from TASK1_VISUALS, each its own card that opens that chart type's own area.
 */
export function VisualInformationHub() {
  const { text, l } = useWsLocale('task1');
  const progress = useWsProgress();
  const started = useStartedLessons();
  const lecture = getLesson(VISUAL_LESSON_ID);
  const status = lessonStatus(progress, VISUAL_LESSON_ID, started);

  return (
    <div className="mx-auto max-w-3xl space-y-7" data-testid="ws-visual-hub">
      <WsHeader
        title={text('visualTitle')}
        subtitle={text('visualSubtitle')}
        context={`${text('task1Title')} · ${text('learnTitle')}`}
        backHref={learnHref('task1')}
        backLabel={text('learnTitle')}
      />

      <section className="space-y-2.5" aria-labelledby="ws-core-h">
        <h2 id="ws-core-h" className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{text('coreLecture')}</h2>
        <Panel variant="brand" className="space-y-3" data-testid="ws-core-lecture" data-status={status}>
          <div className="flex items-start gap-3">
            <MinoMark size="md" />
            <div className="min-w-0 space-y-1">
              <p className="text-base leading-snug font-semibold text-balance">{lecture ? l(lecture.title) : text('visualTitle')}</p>
              <p className="text-sm text-muted-foreground">
                {lecture ? text('coreSteps', { n: lecture.steps.length }) : ''} · {text(statusKey(status))}
              </p>
            </div>
          </div>
          <Link
            href={lessonHref('task1', VISUAL_LESSON_ID, 'visual')}
            data-testid="ws-core-lecture-link"
            className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground"
          >
            {text(actionKey(status))} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Panel>
      </section>

      <section className="space-y-2.5" aria-labelledby="ws-types-h">
        <div className="space-y-0.5">
          <h2 id="ws-types-h" className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{text('chartTraining')}</h2>
          <p className="text-sm text-muted-foreground">{text('chartTrainingNote')}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2" data-testid="ws-chart-types">
          {TASK1_VISUALS.map((v) => {
            const Icon = CHART_ICON[v.id] ?? BarChart3;
            const state = chartTypeState(v);
            return (
              <Link
                key={v.id}
                href={chartTypeHref(v.id)}
                data-testid="ws-chart-card"
                data-chart-id={v.id}
                data-state={state}
                className="flex min-h-[4.5rem] items-center gap-3 rounded-2xl border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-muted/50 active:scale-[0.99]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-tint-blue text-tint-blue-fg" aria-hidden>
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] leading-snug font-semibold">{l(v.title)}</span>
                  <span className="mt-0.5 text-sm leading-snug text-muted-foreground line-clamp-2">{l(v.description)}</span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1">
                  <span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', state === 'course' ? 'bg-brand-soft text-brand' : 'bg-muted text-muted-foreground')}>
                    {text(state === 'course' ? 'chartCourse' : 'chartPreview')}
                  </span>
                  <ChevronRight className="size-4 text-muted-foreground/70" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/**
 * A chart type's own area. Today every chart type is an honest preview: the screen says so and offers only the shared
 * core lecture as a labelled next step. The moment a chart type gets its own registered course lesson
 * (`courseLessonId` in the registry) this screen offers it; it never borrows a generic lesson or another chart's board.
 */
export function ChartTypeScreen({ chartTypeId }: { chartTypeId: string }) {
  const { text, l } = useWsLocale('task1');
  const area = chartTypeById(TASK1_VISUALS, chartTypeId);
  if (!area) notFound();
  const Icon = CHART_ICON[area.id] ?? BarChart3;
  const state = chartTypeState(area);

  return (
    <div className="mx-auto max-w-3xl space-y-6" data-testid="ws-chart-type" data-chart-id={area.id} data-state={state}>
      <WsHeader
        title={l(area.title)}
        subtitle={l(area.description)}
        context={`${text('task1Title')} · ${text('visualTitle')}`}
        backHref={visualHubHref()}
        backLabel={text('chartBack')}
      />
      <Panel className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-tint-blue text-tint-blue-fg" aria-hidden>
          <Icon className="size-6" />
        </span>
        <p className="text-[15px] leading-snug font-medium">{l(area.title)}</p>
      </Panel>

      {state === 'course' && area.courseLessonId ? (
        <Link
          href={lessonHref('task1', area.courseLessonId, 'visual')}
          data-testid="ws-chart-course-link"
          className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground"
        >
          {text('chartStartCourse')} <ArrowRight className="size-4" aria-hidden />
        </Link>
      ) : (
        <>
          <div data-testid="ws-chart-preview">
            <Callout tone="neutral" icon={Construction} title={text('chartPreviewTitle')}>
              {text('chartPreviewBody')}
            </Callout>
          </div>
          <Link
            href={lessonHref('task1', VISUAL_LESSON_ID, 'visual')}
            data-testid="ws-chart-lecture-link"
            className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg border bg-card px-4 text-sm font-semibold hover:bg-muted/50"
          >
            {text('chartReadLecture')} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </>
      )}
    </div>
  );
}
