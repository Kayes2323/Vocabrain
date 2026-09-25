import Link from 'next/link';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel } from '@/components/ds';
import { buildTodayPlan, planTotalMinutes } from '@/lib/engine';
import type { UserProfile } from '@/lib/models';

export function TodayPlanCard({ profile }: { profile: UserProfile }) {
  const plan = buildTodayPlan(profile);
  const total = planTotalMinutes(plan);

  return (
    <Panel className="space-y-4 p-0">
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <CalendarCheck className="size-4" aria-hidden /> Today&apos;s Plan
        </div>
        <span className="text-sm text-muted-foreground tabular-nums">{total} min</span>
      </div>
      <ol className="divide-y border-y">
        {plan.map((item, i) => (
          <li key={item.id}>
            <Link href={item.href} className="flex items-center gap-3.5 px-5 py-3 transition-colors hover:bg-muted/60">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold tabular-nums">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.reason}</p>
              </div>
              <span className="text-sm font-medium tabular-nums text-muted-foreground">{item.minutes} min</span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="px-5 pb-5">
        {/* Until a goal exists, "Set my IELTS goal" is the one primary action on Home. */}
        <Button asChild size="lg" variant={profile.ielts.targetBand === undefined ? 'outline' : 'default'} className="w-full">
          <Link href={plan[0].href}>
            Start Today&apos;s Plan <ArrowRight />
          </Link>
        </Button>
      </div>
    </Panel>
  );
}
