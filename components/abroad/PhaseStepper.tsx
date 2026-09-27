'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { PhaseJourney, PhaseStatus } from '@/lib/abroad/phases';
import { cn } from '@/lib/utils';

export const PHASE_TONE: Record<PhaseStatus, 'success' | 'brand' | 'neutral'> = {
  completed: 'success',
  ready: 'success',
  'in-progress': 'brand',
  'not-started': 'neutral',
};

/**
 * English → Documents → University → Apply → Visa → Departure: one bar per
 * phase with its name. Three per row on phones, six on wider screens. Each
 * phase opens its detail page.
 */
export function PhaseStepper({ journey, className }: { journey: PhaseJourney; className?: string }) {
  const { t } = useLocale();
  return (
    <ol className={cn('grid grid-cols-3 gap-x-2 gap-y-1 sm:grid-cols-6', className)} aria-label={t('sa.phase.label')} data-testid="journey-phases">
      {journey.phases.map((p) => {
        const here = !journey.complete && p.id === journey.current.id;
        const done = p.status === 'completed' || p.status === 'ready';
        return (
          <li key={p.id} data-phase={p.id} data-status={p.status} aria-current={here ? 'step' : undefined}>
            <Link
              href={`/abroad/journey/${p.id}`}
              className="group flex min-h-11 flex-col gap-1.5 rounded-lg pt-1 focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
              aria-label={`${t(`sa.phase.${p.id}.title`)}: ${t(`sa.phase.status.${p.status}`)}`}
            >
              <span className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                <span
                  className={cn(
                    'block h-full rounded-full transition-[width,background-color] duration-700 ease-out motion-reduce:transition-none',
                    done ? 'w-full bg-brand' : here ? 'w-1/2 bg-brand/50' : p.status === 'in-progress' ? 'w-1/3 bg-brand/40' : 'w-0',
                  )}
                />
              </span>
              <span
                className={cn(
                  'flex items-center gap-1 text-xs leading-tight',
                  here ? 'font-semibold text-foreground' : done ? 'text-foreground/80' : 'text-muted-foreground group-hover:text-foreground',
                )}
              >
                {p.status === 'completed' && <Check className="size-3.5 shrink-0 text-success motion-safe:animate-in motion-safe:zoom-in-50" aria-hidden />}
                {t(`sa.phase.short.${p.id}`)}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
