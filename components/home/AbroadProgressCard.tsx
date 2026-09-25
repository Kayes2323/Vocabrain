import Link from 'next/link';
import { ChevronRight, Plane } from 'lucide-react';
import { Panel, ProgressBar } from '@/components/ds';
import { formatIntake, hasAbroadGoal, journeyStatus } from '@/lib/engine';
import type { UserProfile } from '@/lib/models';

export function AbroadProgressCard({ profile }: { profile: UserProfile }) {
  const status = journeyStatus(profile);
  const intake = formatIntake(profile.abroad);
  const hasGoal = hasAbroadGoal(profile.abroad);

  return (
    <Link href={hasGoal ? '/abroad' : '/setup/abroad'} className="block rounded-2xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40">
      <Panel className="space-y-4 transition-colors hover:bg-muted/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Plane className="size-4" aria-hidden /> Study Abroad
          </div>
          <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
        </div>
        {hasGoal ? (
          <>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Target intake</p>
                <p className="text-lg font-semibold">{intake ?? 'Not set'}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Application journey</p>
                <p className="text-lg font-semibold tabular-nums">{status.percent}%</p>
              </div>
            </div>
            <ProgressBar value={status.percent} label="Application journey progress" tone="success" />
            <p className="text-sm text-muted-foreground">You are here: {status.current.title}</p>
          </>
        ) : (
          <div className="space-y-1">
            <p className="font-semibold">Planning to study abroad?</p>
            <p className="text-sm text-muted-foreground">Add your degree and target intake to see your timeline.</p>
          </div>
        )}
      </Panel>
    </Link>
  );
}
