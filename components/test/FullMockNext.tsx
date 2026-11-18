'use client';

import Link from 'next/link';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { IELTSSkillId, PracticeTest } from '@/lib/ielts';
import { useFullMock } from './useFullMock';

/** At the end of a section taken inside a Full Mock Test: on to the next section, or to the combined result. */
export function FullMockNext({ test, skill }: { test: PracticeTest; skill: IELTSSkillId }) {
  const { t } = useLocale();
  const { full, step, count, nextSkill, nextHref, resultHref, overviewHref } = useFullMock(test, skill);
  if (!full) return null;
  return (
    <div className="space-y-3 rounded-xl border-2 border-brand/40 bg-brand/5 p-4">
      <Callout tone="brand" icon={BadgeCheck}>
        {t('fullMock.sectionDone', { n: step, total: count, skill: t(`skills.${skill}`) })}
      </Callout>
      {nextHref && nextSkill ? (
        <Button asChild variant="brand" size="lg" className="w-full">
          <Link href={nextHref}>
            {t('fullMock.nextSection', { skill: t(`skills.${nextSkill}`) })} <ArrowRight />
          </Link>
        </Button>
      ) : (
        <Button asChild variant="brand" size="lg" className="w-full">
          <Link href={resultHref}>
            {t('fullMock.viewResult')} <ArrowRight />
          </Link>
        </Button>
      )}
      <Button asChild variant="ghost" size="sm" className="w-full">
        <Link href={overviewHref}>{t('fullMock.backToOverview')}</Link>
      </Button>
    </div>
  );
}
