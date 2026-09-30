'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Panel, ProgressBar } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { formatBand, ieltsJourney } from '@/lib/engine';
import type { UserProfile } from '@/lib/models';
import { useContinue } from '@/components/ielts/ContinueCard';
import { JourneyStages } from './JourneyStages';

/** "Where am I going?" and "Where am I now?" */
export function JourneyCard({ profile }: { profile: UserProfile }) {
  const { t } = useLocale();
  const target = profile.ielts.targetBand;

  if (target === undefined) {
    return (
      <Panel className="space-y-4">
        <p className="text-lg font-semibold">{t('home.noGoalTitle')}</p>
        <p className="text-sm text-muted-foreground">{t('home.noGoalBody')}</p>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href="/setup/ielts?step=target">
            {t('home.noGoalCta')} <ArrowRight />
          </Link>
        </Button>
      </Panel>
    );
  }

  return <GoalJourney profile={profile} target={target} />;
}

function GoalJourney({ profile, target }: { profile: UserProfile; target: number }) {
  const { t } = useLocale();
  const journey = ieltsJourney(profile);
  const next = useContinue(profile, journey);

  return (
    <Panel className="space-y-4" data-testid="progress-card">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{t('home.yourGoal')}</p>
          <p className="text-2xl font-semibold tracking-tight tabular-nums">{t('home.goalValue', { band: formatBand(target) })}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{t('journey.preparation')}</p>
          <p className="text-xl font-semibold tabular-nums">{journey.percent}%</p>
        </div>
      </div>
      <ProgressBar value={journey.percent} label={t('journey.preparation')} />
      {/* The same next step as the IELTS page's Continue Learning. */}
      <Link href={next.href} className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-muted/60" data-testid="home-continue">
        <span className="min-w-0 flex-1">
          <span className="block text-xs text-muted-foreground">{t('ielts.continue.label')}</span>
          <span className="block truncate text-[15px] font-medium">{next.title}</span>
        </span>
        <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      </Link>
      <Collapsible>
        <CollapsibleTrigger className="group flex w-full items-center justify-between gap-3 text-left text-[15px]">
          <span>{t('home.currentStage', { stage: t(`journey.stages.${journey.current}`) })}</span>
          <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" aria-hidden />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 pt-4">
          <JourneyStages stages={journey.stages} />
          <p className="text-xs text-muted-foreground">{t('journey.howCalculated')}</p>
        </CollapsibleContent>
      </Collapsible>
    </Panel>
  );
}
