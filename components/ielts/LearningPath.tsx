'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, ChevronRight } from 'lucide-react';
import { StatusChip } from '@/components/ds';
import { useText } from '@/components/foundation/useFoundation';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { IELTSJourney, JourneyStageStatus, JourneyStepStatus, StepState } from '@/lib/engine';
import { getStage } from '@/lib/foundation';
import type { UserProfile } from '@/lib/models';
import { cn } from '@/lib/utils';

function Dot({ state, small = false }: { state: StepState; small?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full border-2',
        small ? 'size-4' : 'size-6',
        state === 'done' && 'border-success bg-success text-white',
        state === 'current' && 'border-brand bg-brand-soft',
        state === 'upcoming' && 'border-border',
      )}
    >
      {state === 'done' && <Check className={small ? 'size-2.5' : 'size-3.5'} />}
      {state === 'current' && <span className={cn('rounded-full bg-brand', small ? 'size-1.5' : 'size-2')} />}
    </span>
  );
}

/** Where a step leads: its first unfinished lesson, else its feature. */
function stepHref(s: JourneyStepStatus, profile: UserProfile) {
  const lessons = s.step.lessons ?? [];
  if (!lessons.length) return s.step.href ?? '/ielts';
  const open = lessons.find((id) => !profile.foundation?.lessons[id]) ?? lessons[0];
  return `/ielts/foundation/lesson/${open}`;
}

function StepRow({ s, profile }: { s: JourneyStepStatus; profile: UserProfile }) {
  const { t, n } = useLocale();
  const text = useText();
  return (
    <li>
      <Link
        href={stepHref(s, profile)}
        className={cn('flex min-h-12 items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted/60', s.state === 'current' && 'bg-brand-soft/60')}
        data-step={s.step.id}
        data-state={s.state}
        aria-current={s.state === 'current' ? 'step' : undefined}
      >
        <span className="pt-0.5">
          <Dot state={s.state} small />
        </span>
        <span className="min-w-0 flex-1">
          <span className={cn('block text-[15px]', s.state === 'current' ? 'font-semibold' : s.state === 'done' ? 'text-muted-foreground' : 'font-medium')}>
            {text(s.step.title)}
          </span>
          {s.state !== 'done' && <span className="block text-sm text-muted-foreground">{text(s.step.why)}</span>}
          <span className="mt-1 flex flex-wrap items-center gap-1.5">
            {s.lessonsTotal > 0 && <span className="text-xs text-muted-foreground tabular-nums">{t('ielts.path.lessons', { done: n(s.lessonsDone), total: n(s.lessonsTotal) })}</span>}
            {s.step.optional && <StatusChip tone="neutral">{t('ielts.path.optional')}</StatusChip>}
            {s.step.parallel && <StatusChip tone="brand">{t('ielts.path.parallel')}</StatusChip>}
          </span>
        </span>
        <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground" aria-hidden />
      </Link>
    </li>
  );
}

function StageRow({ stage, profile, last }: { stage: JourneyStageStatus; profile: UserProfile; last: boolean }) {
  const { t, n } = useLocale();
  const text = useText();
  const [open, setOpen] = useState(stage.state === 'current');
  const [all, setAll] = useState(false);
  // Long stages show a window around the current step; the rest is one tap away.
  const WINDOW = 5;
  const currentAt = Math.max(0, stage.steps.findIndex((s) => s.state === 'current'));
  const from = Math.max(0, currentAt - 1);
  const visible = all || stage.steps.length <= WINDOW + 1 ? stage.steps : stage.steps.slice(from, from + WINDOW);
  const hidden = stage.steps.length - visible.length;
  const def = getStage(stage.id);
  const meta =
    stage.lessonsTotal > 0
      ? t('ielts.path.lessons', { done: n(stage.lessonsDone), total: n(stage.lessonsTotal) })
      : t('ielts.path.percent', { n: n(Math.round(stage.progress * 100)) });
  const panelId = `stage-${stage.id}`;
  return (
    <li className="relative" data-stage={stage.id} data-state={stage.state} aria-current={stage.state === 'current' ? 'step' : undefined}>
      {!last && <span aria-hidden className="absolute top-9 bottom-0 left-[15px] w-0.5 bg-border" />}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="relative flex w-full items-center gap-3 rounded-xl px-1 py-2 text-left"
        data-testid={`stage-toggle-${stage.id}`}
      >
        <span className="flex size-8 shrink-0 items-center justify-center bg-background">
          <Dot state={stage.state} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs text-muted-foreground">{t('ielts.path.level', { n: n(def.level) })}</span>
          <span className={cn('block text-[17px]', stage.state === 'current' ? 'font-semibold' : stage.state === 'done' ? 'text-muted-foreground' : 'font-medium')}>
            {t(`journey.stages.${stage.id}`)}
          </span>
        </span>
        <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{meta}</span>
        <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden />
        <span className="sr-only">{open ? t('ielts.path.hideSteps') : t('ielts.path.showSteps')}</span>
      </button>
      {open && (
        <div id={panelId} className="space-y-2 pb-3 pl-11" data-testid={`stage-steps-${stage.id}`}>
          <p className="text-sm text-foreground/80">{text(def.goal)}</p>
          {stage.testedOut && <p className="text-sm font-medium text-success">{t('ielts.path.testedOut')}</p>}
          <ol className="-mx-3 space-y-0.5">
            {visible.map((s) => (
              <StepRow key={s.step.id} s={s} profile={profile} />
            ))}
          </ol>
          {hidden > 0 && (
            <button type="button" onClick={() => setAll(true)} className="h-11 text-sm font-medium text-brand" data-testid={`stage-all-${stage.id}`}>
              {t('ielts.path.showAll', { n: n(stage.steps.length) })}
            </button>
          )}
        </div>
      )}
    </li>
  );
}

/** The whole curriculum: ✓ done · ● current · ○ upcoming. Only the current stage starts expanded. */
export function LearningPath({ journey, profile }: { journey: IELTSJourney; profile: UserProfile }) {
  return (
    <ol className="space-y-1" data-testid="learning-path">
      {journey.stages.map((stage, i) => (
        <StageRow key={stage.id} stage={stage} profile={profile} last={i === journey.stages.length - 1} />
      ))}
    </ol>
  );
}
