'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Clock, ListChecks, RotateCcw, Timer, Headphones, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Callout, Panel } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { isPractice, remainingSeconds, type IELTSSkillId, type PracticeTest, type TestMode, type TestSession } from '@/lib/ielts';
import { formatClock } from './labels';
import { useFullMock } from './useFullMock';

export function TestIntro({
  test,
  skill,
  stats,
  bullets,
  extra,
  resumable,
  onStart,
}: {
  test: PracticeTest;
  skill: IELTSSkillId;
  /** Three [label, value] facts shown at the top. */
  stats: [string, string][];
  /** How this test works; defaults to timer + review. */
  bullets?: string[];
  /** Optional choices shown just above the start button (for example a mode picker). */
  extra?: React.ReactNode;
  resumable: TestSession | null;
  /** Resume an attempt, or start a new one in the chosen mode (Listening and Reading ask first). */
  onStart: (existing?: TestSession, mode?: TestMode) => void;
}) {
  const { t } = useLocale();
  const fm = useFullMock(test, skill);
  const [choosing, setChoosing] = useState(false);
  // Listening and Reading can always be taken as the full exam or one part at a time —
  // inside a Full Mock Test too; a practice attempt there still counts as that section done,
  // just honestly marked as practice rather than full exam conditions.
  const asks = skill === 'listening' || skill === 'reading';
  const minutes = test.sections[skill] && 'timeLimitMinutes' in test.sections[skill]! ? (test.sections[skill] as { timeLimitMinutes: number }).timeLimitMinutes : 0;
  const begin = () => (asks ? setChoosing(true) : onStart(undefined, 'full'));
  const choose = (mode: TestMode) => {
    setChoosing(false);
    onStart(undefined, mode);
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 py-6">
      <Button asChild variant="ghost" size="sm" className="self-start">
        <Link href={fm.full ? fm.overviewHref : '/ielts/tests'}>
          <ArrowLeft /> {fm.full ? t('fullMock.libraryTitle') : t('tests.library')}
        </Link>
      </Button>
      <div className="flex flex-1 flex-col justify-center gap-6 py-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{fm.full ? t('fullMock.sectionOf', { n: fm.step, total: fm.count }) : t('tests.practiceLabel')}</p>
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
          {[...(bullets ?? [t('tests.introTimer'), t('tests.introReview')]), ...(fm.full ? [t(`fullMock.rule.${skill}`)] : [])].map((b, i) => (
            <li key={i} className="flex gap-2">
              {i === 0 ? <Clock className="mt-0.5 size-4 shrink-0" /> : <ListChecks className="mt-0.5 size-4 shrink-0" />}
              {b}
            </li>
          ))}
        </ul>
        <Callout>{t('tests.notOfficial')}</Callout>
        {extra}
        {resumable ? (
          <div className="space-y-2">
            <Button size="lg" className="w-full" onClick={() => onStart(resumable)}>
              {isPractice(resumable) ? t('tests.practice.resume') : t('tests.resume', { time: formatClock(remainingSeconds(resumable)) })}
            </Button>
            <Button size="lg" variant="ghost" className="w-full" onClick={begin}>
              <RotateCcw /> {t('tests.startAgain')}
            </Button>
          </div>
        ) : (
          <Button size="lg" className="w-full" onClick={begin} data-testid="intro-start">
            {t('tests.start')}
          </Button>
        )}
      </div>

      <Dialog open={choosing} onOpenChange={setChoosing}>
        <DialogContent data-testid="mode-dialog">
          <DialogHeader>
            <DialogTitle>{t('tests.mode.title')}</DialogTitle>
            <DialogDescription>{t('tests.mode.subtitle')}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <button type="button" data-testid="mode-full" onClick={() => choose('full')} className="flex gap-3 rounded-xl border-2 p-4 text-left transition-colors hover:border-primary hover:bg-muted/50">
              <Timer className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
              <span>
                <span className="block font-semibold">{t('tests.mode.full.title')}</span>
                <span className="block text-sm text-muted-foreground">{t(`tests.mode.full.${skill}`, { minutes })}</span>
              </span>
            </button>
            <button type="button" data-testid="mode-practice" onClick={() => choose('practice')} className="flex gap-3 rounded-xl border-2 p-4 text-left transition-colors hover:border-primary hover:bg-muted/50">
              {skill === 'listening' ? <Headphones className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden /> : <BookOpen className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />}
              <span>
                <span className="block font-semibold">{t(`tests.mode.practice.title.${skill}`)}</span>
                <span className="block text-sm text-muted-foreground">{t(`tests.mode.practice.${skill}`)}</span>
              </span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
