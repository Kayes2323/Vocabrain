'use client';

import { AlertTriangle, Check } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { AbroadJourney, AbroadStageStatus } from '@/lib/engine';
import { cn } from '@/lib/utils';

export const STAGE_TONE: Record<AbroadStageStatus, 'success' | 'brand' | 'neutral' | 'warning'> = {
  done: 'success',
  'in-progress': 'brand',
  upcoming: 'neutral',
  attention: 'warning',
};

/** Ten short bars: done, current, the rest. Reads as "how far am I?" at a glance. */
export function JourneyBars({ journey, className }: { journey: AbroadJourney; className?: string }) {
  const { t } = useLocale();
  return (
    <div
      className={cn('flex gap-1', className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={journey.stages.length}
      aria-valuenow={journey.stages.filter((s) => s.status === 'done').length}
      aria-label={t('abroad.journeyTitle')}
    >
      {journey.stages.map((s, i) => (
        <span
          key={s.id}
          className={cn(
            'h-1.5 flex-1 rounded-full',
            s.status === 'done' ? 'bg-brand' : s.status === 'attention' ? 'bg-warning' : i === journey.currentIndex ? 'bg-brand/40' : 'bg-border',
          )}
        />
      ))}
    </div>
  );
}

/** All ten stages with their status and a "You are here" marker. */
export function JourneyTimeline({ journey }: { journey: AbroadJourney }) {
  const { t, n } = useLocale();
  return (
    <ol className="relative" aria-label={t('abroad.journeyTitle')}>
      {journey.stages.map((stage, i) => {
        const last = i === journey.stages.length - 1;
        const here = i === journey.currentIndex && !journey.complete;
        return (
          <li key={stage.id} className="relative flex gap-3.5 pb-4 last:pb-0" aria-current={here ? 'step' : undefined} data-stage={stage.id} data-status={stage.status}>
            {!last && (
              <span aria-hidden className={cn('absolute top-7 left-[11px] h-[calc(100%-1.25rem)] w-0.5', stage.status === 'done' ? 'bg-success' : 'bg-border')} />
            )}
            <span
              aria-hidden
              className={cn(
                'relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-semibold',
                stage.status === 'done' && 'border-success bg-success text-white',
                stage.status === 'attention' && 'border-warning bg-warning-soft text-warning',
                stage.status === 'in-progress' && 'border-brand bg-brand-soft text-brand',
                stage.status === 'upcoming' && (here ? 'border-brand bg-card text-brand' : 'border-border bg-card text-muted-foreground'),
              )}
            >
              {stage.status === 'done' ? <Check className="size-3.5" /> : stage.status === 'attention' ? <AlertTriangle className="size-3" /> : n(i + 1)}
            </span>
            <div className="flex min-w-0 flex-1 items-start justify-between gap-3 pt-0.5">
              <div className="min-w-0">
                <p className={cn('text-[15px]', here ? 'font-semibold' : stage.status === 'done' ? 'text-foreground/80' : 'text-muted-foreground')}>
                  {t(`sa.stages.${stage.id}.title`)}
                </p>
                {stage.attention && <p className="text-xs text-warning">{t(stage.attention.key, stage.attention.params)}</p>}
              </div>
              {here ? (
                <span className="shrink-0 rounded-full bg-brand px-2.5 py-0.5 text-xs font-medium text-brand-foreground">{t('abroad.youAreHere')}</span>
              ) : stage.status !== 'upcoming' ? (
                <span className="shrink-0 text-xs text-muted-foreground">{t(`sa.status.${stage.status}`)}</span>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
