'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { NextAction } from '@/lib/models';

/** "Your next steps": the core of Mino. */
export function NextActionList({ actions }: { actions: NextAction[] }) {
  const { t, m, n } = useLocale();
  return (
    <ol className="space-y-3">
      {actions.map((action, i) => (
        <li key={action.id}>
          <Link
            href={action.href}
            className="group flex gap-4 rounded-2xl border bg-card p-4 transition-colors hover:border-brand/30 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand tabular-nums">
              {n(i + 1)}
            </span>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="font-semibold">{m(action.title)}</p>
              <p className="text-sm text-muted-foreground text-pretty">{m(action.reason)}</p>
              <div className="flex items-center justify-between pt-1">
                {action.estimatedMinutes ? (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3.5" aria-hidden /> {t('common.minutes', { n: action.estimatedMinutes })}
                  </span>
                ) : (
                  <span />
                )}
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                  {m(action.cta)}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
