'use client';

import { PageHeader, Panel, ScreenSkeleton } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { formatBand, learningStats, overallBand, weeksUntilTest } from '@/lib/engine';

/**
 * Progress (minimal for now): the honest numbers that used to sit on the IELTS
 * page — lessons completed, practice sessions, topics mastered — and the
 * target / estimate / test date. A fuller view comes later.
 */
export default function IELTSProgressPage() {
  const { t, n } = useLocale();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  const { ielts } = profile;
  const stats = learningStats(profile);
  const weeks = weeksUntilTest(ielts);
  const tiles = [
    ['lessons', `${n(stats.lessonsDone)}/${n(stats.lessonsTotal)}`, 'stat-lessons'],
    ['practice', n(stats.practiceSessions), 'stat-practice'],
    ['mastered', n(stats.topicsMastered), 'stat-mastered'],
  ] as const;

  return (
    <div className="max-w-2xl space-y-6" data-testid="ielts-progress">
      <PageHeader title={t('ielts.progressPage.title')} subtitle={t('ielts.progressPage.subtitle')} backHref="/ielts" backLabel="IELTS" />

      <dl className="grid grid-cols-3 gap-2" data-testid="learning-stats">
        {tiles.map(([key, value, id]) => (
          <div key={key} className="rounded-2xl border bg-card px-2 py-3 text-center" data-testid={id}>
            <dd className="text-lg font-semibold tabular-nums">{value}</dd>
            <dt className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{t(`ielts.progress.${key}`)}</dt>
          </div>
        ))}
      </dl>

      {ielts.targetBand !== undefined && (
        <Panel className="grid grid-cols-3 divide-x p-0 text-center">
          {[
            [t('ielts.target'), formatBand(ielts.targetBand)],
            [t('ielts.estimated'), formatBand(overallBand(ielts.currentBands))],
            [t('ielts.testIn'), weeks !== undefined ? t('common.weeks', { n: weeks }) : '–'],
          ].map(([label, value]) => (
            <div key={label} className="px-2 py-4">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-lg font-semibold tabular-nums">{value}</p>
            </div>
          ))}
        </Panel>
      )}

      <p className="text-xs text-muted-foreground">{t('ielts.progress.note')}</p>
      <p className="text-sm text-muted-foreground">{t('ielts.progressPage.more')}</p>
    </div>
  );
}
