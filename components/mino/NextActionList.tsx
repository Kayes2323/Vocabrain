import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import type { NextAction } from '@/lib/models';

/** "Here are the next 3 actions you should take." The core of Mino. */
export function NextActionList({ actions }: { actions: NextAction[] }) {
  return (
    <ol className="space-y-3">
      {actions.map((action, i) => (
        <li key={action.id}>
          <Link
            href={action.href}
            className="group flex gap-4 rounded-2xl border bg-card p-4 transition-colors hover:border-brand/30 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand tabular-nums">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="font-semibold">{action.title}</p>
              <p className="text-sm text-muted-foreground text-pretty">{action.reason}</p>
              <div className="flex items-center justify-between pt-1">
                {action.estimatedMinutes ? (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3.5" aria-hidden /> {action.estimatedMinutes} min
                  </span>
                ) : (
                  <span />
                )}
                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                  {action.cta}
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
