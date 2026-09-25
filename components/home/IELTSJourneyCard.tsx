import Link from 'next/link';
import { ArrowRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, ProgressBar, StatusChip } from '@/components/ds';
import { formatBand, overallBand, preparationWeek, weeksUntilTest } from '@/lib/engine';
import type { UserProfile } from '@/lib/models';

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

export function IELTSJourneyCard({ profile }: { profile: UserProfile }) {
  const { ielts } = profile;

  if (ielts.targetBand === undefined) {
    return (
      <Panel className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Target className="size-4" aria-hidden /> IELTS Journey
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold">What band are you aiming for?</p>
          <p className="text-sm text-muted-foreground">
            Two minutes of setup turns your target into a daily plan.
          </p>
        </div>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/setup/ielts">
            Set my IELTS goal <ArrowRight />
          </Link>
        </Button>
      </Panel>
    );
  }

  const current = overallBand(ielts.currentBands);
  const weeks = weeksUntilTest(ielts);
  const week = preparationWeek(ielts);
  // Progress towards target measured from band 4.0 as a neutral floor.
  const progress = current === undefined ? 0 : ((current - 4) / (ielts.targetBand - 4)) * 100;

  return (
    <Panel className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Target className="size-4" aria-hidden /> IELTS Journey
        </div>
        {week && <StatusChip>Week {week}</StatusChip>}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Metric label="Target" value={formatBand(ielts.targetBand)} />
        <Metric label="Estimated now" value={formatBand(current)} />
        <Metric
          label="Test in"
          value={weeks !== undefined ? `${weeks} wk${weeks === 1 ? '' : 's'}` : ielts.testDateUnknown ? 'Not set' : '–'}
        />
      </div>
      <div className="space-y-2">
        <ProgressBar value={progress} label="Progress towards target band" />
        <p className="text-sm text-muted-foreground">
          {current === undefined
            ? 'Add your skill scores to estimate where you are now.'
            : current >= ielts.targetBand
              ? 'Your estimate meets your target. Confirm it with a mock test.'
              : `${(ielts.targetBand - current).toFixed(1)} bands to go.`}
        </p>
      </div>
    </Panel>
  );
}
