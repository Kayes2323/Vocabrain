'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, ListChecks, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, Panel } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { questionSlots, remainingSeconds, type ObjectiveSection, type ObjectiveSkill, type PracticeTest, type TestSession } from '@/lib/ielts';
import { formatClock } from './labels';

export function TestIntro({
  test,
  skill,
  section,
  resumable,
  onStart,
}: {
  test: PracticeTest;
  skill: ObjectiveSkill;
  section: ObjectiveSection;
  resumable: TestSession | null;
  onStart: (existing?: TestSession) => void;
}) {
  const { t } = useLocale();
  const total = questionSlots(section).length;
  const partKey = skill === 'reading' ? 'tests.passages' : 'tests.parts';

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 py-6">
      <Button asChild variant="ghost" size="sm" className="self-start">
        <Link href="/ielts/tests">
          <ArrowLeft /> {t('tests.library')}
        </Link>
      </Button>
      <div className="flex flex-1 flex-col justify-center gap-6 py-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{t('tests.practiceLabel')}</p>
          <h1 className="text-2xl font-semibold tracking-tight">
            {test.title} · {t(`skills.${skill}`)}
          </h1>
        </div>
        <Panel className="grid grid-cols-3 divide-x p-0 text-center">
          {[
            [t('tests.questionsLabel'), String(total)],
            [t(partKey), String(section.parts.length)],
            [t('tests.time'), t('common.minutes', { n: section.timeLimitMinutes })],
          ].map(([label, value]) => (
            <div key={label} className="px-2 py-4">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-lg font-semibold tabular-nums">{value}</p>
            </div>
          ))}
        </Panel>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2"><Clock className="mt-0.5 size-4 shrink-0" />{t('tests.introTimer')}</li>
          <li className="flex gap-2"><ListChecks className="mt-0.5 size-4 shrink-0" />{t('tests.introReview')}</li>
        </ul>
        <Callout>{t('tests.notOfficial')}</Callout>
        {resumable ? (
          <div className="space-y-2">
            <Button size="lg" className="w-full" onClick={() => onStart(resumable)}>
              {t('tests.resume', { time: formatClock(remainingSeconds(resumable)) })}
            </Button>
            <Button size="lg" variant="ghost" className="w-full" onClick={() => onStart()}>
              <RotateCcw /> {t('tests.startAgain')}
            </Button>
          </div>
        ) : (
          <Button size="lg" className="w-full" onClick={() => onStart()}>
            {t('tests.start')}
          </Button>
        )}
      </div>
    </div>
  );
}
