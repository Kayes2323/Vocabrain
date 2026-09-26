'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Panel, ProgressBar } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { formatBand, ieltsJourney } from '@/lib/engine';
import type { UserProfile } from '@/lib/models';
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

  const journey = ieltsJourney(profile);

  return (
    <Panel className="space-y-5">
      <div>
        <p className="text-sm text-muted-foreground">{t('home.yourGoal')}</p>
        <p className="text-2xl font-semibold tracking-tight tabular-nums">{t('home.goalValue', { band: formatBand(target) })}</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-sm font-medium">{t('journey.preparation')}</span>
          <span className="text-sm font-semibold tabular-nums">{journey.percent}%</span>
        </div>
        <ProgressBar value={journey.percent} label={t('journey.preparation')} />
      </div>
      {(journey.current === 'starting-point' || journey.current === 'foundation') && (
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/ielts/foundation">
            {t('foundation.homeCta')} <ArrowRight />
          </Link>
        </Button>
      )}
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
