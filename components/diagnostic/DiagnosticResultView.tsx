'use client';

import { Button } from '@/components/ui/button';
import { Callout, Panel, StatusChip } from '@/components/ds';
import { MinoSays } from '@/components/mino/MinoSays';
import { useLocale } from '@/components/providers/LocaleProvider';
import { IELTS_SKILLS } from '@/lib/constants';
import { biggestOpportunity, formatBand, overallBand } from '@/lib/engine';
import type { IELTSProfile } from '@/lib/models';
import { cn } from '@/lib/utils';

export function DiagnosticResultView({
  ielts,
  onContinue,
  onRetake,
}: {
  ielts: IELTSProfile;
  onContinue: () => void;
  onRetake: () => void;
}) {
  const { t } = useLocale();
  const bands = ielts.diagnostic?.bands ?? ielts.currentBands;
  const focus = biggestOpportunity(ielts);
  const target = ielts.targetBand;

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-8">
      <div className="space-y-2">
        <StatusChip tone="brand">{t('common.estimateBadge')}</StatusChip>
        <h1 className="text-2xl font-semibold tracking-tight">{t('diagnostic.result.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('diagnostic.result.disclaimer')}</p>
      </div>

      <Panel className="divide-y p-0">
        {IELTS_SKILLS.map((skill) => {
          const band = bands[skill];
          const behind = target !== undefined && band !== undefined && band < target;
          return (
            <div key={skill} className={cn('flex items-center justify-between px-5 py-3.5', skill === focus && 'bg-warning-soft/60')}>
              <span className="font-medium">{t(`skills.${skill}`)}</span>
              <span className={cn('text-lg font-semibold tabular-nums', behind && 'text-warning')}>{formatBand(band)}</span>
            </div>
          );
        })}
        <div className="flex items-center justify-between px-5 py-3.5 text-sm">
          <span className="text-muted-foreground">{t('diagnostic.result.overall')}</span>
          <span className="font-semibold tabular-nums">{formatBand(overallBand(bands))}</span>
        </div>
        {target !== undefined && (
          <div className="flex items-center justify-between px-5 py-3.5 text-sm">
            <span className="text-muted-foreground">{t('diagnostic.result.target')}</span>
            <span className="font-semibold tabular-nums">{formatBand(target)}</span>
          </div>
        )}
      </Panel>

      {focus && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">
            {t('diagnostic.result.opportunity')}
          </p>
          <p className="text-xl font-semibold">{t(`skills.${focus}`)}</p>
          <MinoSays>{t(`diagnostic.result.why.${focus}`)}</MinoSays>
        </div>
      )}

      <Callout>{t('diagnostic.result.nextNote')}</Callout>

      <div className="space-y-2">
        <Button size="lg" className="w-full" onClick={onContinue}>
          {t('diagnostic.result.cta')}
        </Button>
        <Button variant="ghost" className="w-full text-muted-foreground" onClick={onRetake}>
          {t('diagnostic.result.retake')}
        </Button>
      </div>
    </div>
  );
}
