'use client';

import Link from 'next/link';
import { RowGroup } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { MinoContext } from '@/lib/ai/types';
import { formatBand } from '@/lib/engine';

function Fact({ label, value, fallback }: { label: string; value?: string; fallback: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={value ? 'text-right font-medium' : 'text-muted-foreground'}>{value ?? fallback}</span>
    </div>
  );
}

/** Transparency: exactly what Mino uses to personalise advice. */
export function MinoContextSummary({ context }: { context: MinoContext }) {
  const { t } = useLocale();
  const { ielts, abroad, vocabulary } = context;
  const notSet = t('common.notSet');
  return (
    <div className="space-y-2">
      <RowGroup>
        <Fact label={t('mino.facts.goal')} value={context.goal ? t(`mino.goals.${context.goal}`) : undefined} fallback={notSet} />
        <Fact label={t('mino.facts.target')} value={ielts.targetBand !== undefined ? formatBand(ielts.targetBand) : undefined} fallback={notSet} />
        <Fact
          label={t('mino.facts.estimate')}
          value={ielts.estimatedOverall !== undefined ? formatBand(ielts.estimatedOverall) : undefined}
          fallback={notSet}
        />
        <Fact label={t('mino.facts.stage')} value={t(`journey.stages.${ielts.journeyStage}`)} fallback={notSet} />
        <Fact
          label={t('mino.facts.testIn')}
          value={ielts.weeksUntilTest !== undefined ? t('common.weeks', { n: ielts.weeksUntilTest }) : undefined}
          fallback={notSet}
        />
        <Fact
          label={t('mino.facts.studyTime')}
          value={ielts.weeklyStudyHours ? t('common.hoursPerWeek', { n: ielts.weeklyStudyHours }) : undefined}
          fallback={notSet}
        />
        <Fact label={t('mino.facts.savedWords')} value={String(vocabulary.savedWordCount)} fallback={notSet} />
        <Fact label={t('mino.facts.dueToday')} value={String(vocabulary.dueToday)} fallback={notSet} />
        {(abroad.degreeLevel || abroad.targetIntake) && (
          <>
            <Fact label={t('mino.facts.degree')} value={abroad.degreeLevel} fallback={notSet} />
            <Fact label={t('mino.facts.intake')} value={abroad.targetIntake} fallback={notSet} />
          </>
        )}
      </RowGroup>
      <p className="px-1 text-sm text-muted-foreground">
        {t('mino.somethingWrong')}{' '}
        <Link href="/profile" className="font-medium text-foreground underline underline-offset-4">
          {t('mino.updateGoals')}
        </Link>
      </p>
    </div>
  );
}
