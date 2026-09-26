'use client';

import Link from 'next/link';
import { ArrowRight, BrainCircuit, Check, Clock, Flame, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, Panel, ProgressBar, ScreenSkeleton, Section } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useBrain } from '@/components/providers/BrainProvider';
import { localDateKey } from '@/lib/engine/dates';
import { todayMission, vocabJourney, vocabStats } from '@/lib/vocab-foundation';
import { cn } from '@/lib/utils';
import { useVocabFoundation } from './useVocabFoundation';

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon?: typeof Flame }) {
  return (
    <div className="rounded-2xl border bg-card px-4 py-3">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {Icon && <Icon className="size-3.5" aria-hidden />}
        {label}
      </p>
      <p className="mt-0.5 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
    </div>
  );
}

export function VocabFoundationHome() {
  const { t, n } = useLocale();
  const { profile, vf } = useVocabFoundation();
  const brain = useBrain();
  if (!profile || !vf || brain.loading) return <ScreenSkeleton />;

  const stats = vocabStats(brain.words, vf, profile.study);
  const mission = todayMission(vf, brain.words);
  const inProgress = vf.session?.date === localDateKey() && vf.session.phase !== 'done' && vf.session.index > 0;
  const journey = vocabJourney(vf, brain.words);
  const nothingNew = mission.newWords.length === 0;

  return (
    <div className="space-y-8">
      <PageHeader title={t('vocabFoundation.title')} subtitle={t('vocabFoundation.subtitle')} backHref="/ielts/vocabulary" backLabel={t('skills.vocabulary')} />

      {/* Where am I? */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        <Stat label={t('vocabFoundation.stats.brain')} value={n(stats.inBrain)} icon={BrainCircuit} />
        <Stat label={t('vocabFoundation.stats.mastered')} value={n(stats.mastered)} />
        <Stat label={t('vocabFoundation.stats.reviewing')} value={n(stats.reviewing)} />
        <Stat label={t('vocabFoundation.stats.due')} value={n(stats.dueToday)} icon={RotateCcw} />
        <Stat label={t('vocabFoundation.stats.streak')} value={t('vocabFoundation.stats.days', { n: stats.streak })} icon={Flame} />
      </div>

      {/* What should I do next? One dominant action. */}
      <Panel variant="brand" className="space-y-5 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{t('vocabFoundation.mission.title')}</p>
            <p className="mt-1 text-xl font-semibold tracking-tight">
              {mission.done ? t('vocabFoundation.mission.done') : nothingNew ? t('vocabFoundation.mission.allDiscovered') : t('vocabFoundation.mission.canFinish')}
            </p>
          </div>
          {!mission.done && !nothingNew && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-background/80 px-2.5 py-1 text-sm font-medium tabular-nums">
              <Clock className="size-3.5" aria-hidden /> {t('vocabFoundation.mission.minutes', { n: mission.minutes })}
            </span>
          )}
        </div>

        {mission.done ? (
          <p className="flex items-center gap-2 text-[15px]">
            <span className="flex size-6 animate-in zoom-in-50 items-center justify-center rounded-full bg-success text-white duration-300" aria-hidden>
              <Check className="size-4" />
            </span>
            {t('vocabFoundation.mission.doneBody')}
          </p>
        ) : !nothingNew ? (
          <ul className="grid gap-2 text-[15px] sm:grid-cols-2">
            {[
              t('vocabFoundation.mission.newWords', { n: mission.newWords.length }),
              t('vocabFoundation.mission.recalls', { n: mission.recalls }),
              t('vocabFoundation.mission.sentences', { n: mission.sentences }),
              ...(mission.reviews ? [t('vocabFoundation.mission.reviews', { n: mission.reviews })] : []),
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-brand" aria-hidden /> {item}
              </li>
            ))}
          </ul>
        ) : null}

        {!mission.done && !nothingNew ? (
          <Button asChild size="lg" className="h-13 w-full text-base sm:w-auto sm:px-8">
            <Link href="/ielts/vocabulary/foundation/mission">
              {inProgress ? t('vocabFoundation.mission.continue') : t('vocabFoundation.mission.start')} <ArrowRight />
            </Link>
          </Button>
        ) : stats.dueToday > 0 ? (
          <Button asChild size="lg" className="h-13 w-full text-base sm:w-auto sm:px-8">
            <Link href="/review">
              {t('vocabFoundation.mission.reviewNow', { n: stats.dueToday })} <ArrowRight />
            </Link>
          </Button>
        ) : (
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link href="/ielts/vocabulary/notebook">{t('vocabFoundation.links.brain')}</Link>
          </Button>
        )}
      </Panel>

      {/* The learning loop, with real counts. */}
      <Section title={t('vocabFoundation.journey.title')}>
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {journey.map((s, i) => (
            <li key={s.step} className={cn('space-y-2 rounded-xl border bg-card p-3', s.count > 0 && 'border-brand/30')}>
              <p className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="tabular-nums">{i + 1}</span>
                <span className="tabular-nums">
                  {n(s.count)}/{n(s.total)}
                </span>
              </p>
              <p className="text-sm font-medium">{t(`vocabFoundation.journey.${s.step}`)}</p>
              <ProgressBar value={(s.count / s.total) * 100} label={t(`vocabFoundation.journey.${s.step}`)} size="sm" />
            </li>
          ))}
        </ol>
      </Section>

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline">
          <Link href="/ielts/vocabulary/notebook">
            <BrainCircuit /> {t('vocabFoundation.links.brain')}
          </Link>
        </Button>
        {stats.dueToday > 0 && (
          <Button asChild variant="ghost">
            <Link href="/review">
              <RotateCcw /> {t('vocabFoundation.links.review')} ({n(stats.dueToday)})
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
