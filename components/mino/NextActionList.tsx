'use client';

import Link from 'next/link';
import { BookText, BrainCircuit, ChevronRight, Compass, Plane, type LucideIcon } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { NextAction, Pillar } from '@/lib/models';
import { cn } from '@/lib/utils';

/** One icon and soft tint per pillar, shared by the focus cards and the Today list. */
export const PILLAR_STYLE: Record<Pillar, { icon: LucideIcon; tint: string }> = {
  vocabulary: { icon: BrainCircuit, tint: 'bg-tint-green text-tint-green-fg' },
  ielts: { icon: BookText, tint: 'bg-tint-blue text-tint-blue-fg' },
  profile: { icon: Compass, tint: 'bg-tint-lavender text-tint-lavender-fg' },
  abroad: { icon: Plane, tint: 'bg-tint-yellow text-tint-yellow-fg' },
};

/** Today's next steps, compact: what, why, how long. */
export function NextActionList({ actions, onNavigate }: { actions: NextAction[]; onNavigate?: () => void }) {
  const { t, m } = useLocale();
  if (actions.length === 0) return <p className="px-1 text-sm text-muted-foreground">{t('mino.todayEmpty')}</p>;
  return (
    <ol className="space-y-2">
      {actions.map((action, i) => {
        const { icon: Icon, tint } = PILLAR_STYLE[action.pillar];
        return (
          <li key={action.id} className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1" style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}>
            <Link
              href={action.href}
              onClick={onNavigate}
              className={cn(
                'group flex items-center gap-3 rounded-2xl border bg-card p-3 transition-colors hover:border-foreground/15 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                i === 0 && 'border-brand/35',
              )}
            >
              <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-xl', tint)} aria-hidden>
                <Icon className="size-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium leading-snug">{m(action.title)}</span>
                <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">{m(action.reason)}</span>
              </span>
              {action.estimatedMinutes ? (
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{t('common.minutes', { n: action.estimatedMinutes })}</span>
              ) : null}
              <ChevronRight className="size-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
