'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, ListChecks, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, Panel } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { remainingSeconds, type IELTSSkillId, type PracticeTest, type TestSession } from '@/lib/ielts';
import { formatClock } from './labels';

export function TestIntro({
  test,
  skill,
  stats,
  bullets,
  resumable,
  onStart,
}: {
  test: PracticeTest;
  skill: IELTSSkillId;
  /** Three [label, value] facts shown at the top. */
  stats: [string, string][];
  /** How this test works; defaults to timer + review. */
  bullets?: string[];
  resumable: TestSession | null;
  onStart: (existing?: TestSession) => void;
}) {
  const { t } = useLocale();

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
          {stats.map(([label, value]) => (
            <div key={label} className="px-2 py-4">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-lg font-semibold tabular-nums">{value}</p>
            </div>
          ))}
        </Panel>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {(bullets ?? [t('tests.introTimer'), t('tests.introReview')]).map((b, i) => (
            <li key={i} className="flex gap-2">
              {i === 0 ? <Clock className="mt-0.5 size-4 shrink-0" /> : <ListChecks className="mt-0.5 size-4 shrink-0" />}
              {b}
            </li>
          ))}
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
