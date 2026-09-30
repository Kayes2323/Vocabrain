'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { CardGrid, ModuleCard, PageHeader, Panel, ScreenSkeleton, Section, StatusChip, type Tint } from '@/components/ds';
import { ContinueCard } from '@/components/ielts/ContinueCard';
import { LearningPath } from '@/components/ielts/LearningPath';
import { IELTS_SKILLS, type IELTSSkill } from '@/lib/constants';
import { formatBand, ieltsJourney, learningStats, overallBand, weeksUntilTest } from '@/lib/engine';
import { IELTS_SECTIONS, IELTS_TOOLS, sectionKey, type SectionDef } from '@/lib/navigation';
import type { UserProfile } from '@/lib/models';

const byId = (id: string) => [...IELTS_SECTIONS, ...IELTS_TOOLS].find((s) => s.id === id)!;

/** Every section stays one tap away; the learning path above is the recommended order. */
const GROUPS: { key: string; tint: Tint; ids: string[] }[] = [
  { key: 'learn', tint: 'lavender', ids: ['foundation', 'vocabulary'] },
  { key: 'practice', tint: 'blue', ids: ['listening', 'reading', 'writing', 'speaking'] },
  { key: 'test', tint: 'yellow', ids: ['mock-tests', 'band-calculator'] },
  { key: 'plan', tint: 'green', ids: ['plan'] },
];

function SectionCard({ section, profile, tint }: { section: SectionDef; profile: UserProfile; tint: Tint }) {
  const { t } = useLocale();
  let trailing: React.ReactNode;
  if ((IELTS_SKILLS as readonly string[]).includes(section.id)) {
    const band = profile.ielts.currentBands[section.id as IELTSSkill];
    if (band !== undefined) {
      const behind = profile.ielts.targetBand !== undefined && band < profile.ielts.targetBand;
      trailing = <StatusChip tone={behind ? 'warning' : 'success'}>{formatBand(band)}</StatusChip>;
    }
  }
  const planned = section.status === 'planned';
  return (
    <ModuleCard
      href={section.href}
      icon={section.icon}
      tint={tint}
      title={t(sectionKey(section.id, 'title'))}
      subtitle={planned ? t('common.soon') : t(`ielts.cards.${section.id}`)}
      trailing={trailing}
    />
  );
}

export default function IELTSPage() {
  const { t, n } = useLocale();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  const { ielts } = profile;
  const weeks = weeksUntilTest(ielts);
  const journey = ieltsJourney(profile);
  const stats = learningStats(profile);

  return (
    <div className="space-y-8">
      <PageHeader title="IELTS" subtitle={t('ielts.subtitle')} />

      {/* One obvious next step. */}
      <ContinueCard profile={profile} journey={journey} />

      <Section title={t('ielts.path.title')} variant="label">
        <p className="-mt-1 mb-3 text-sm text-muted-foreground">{t('ielts.path.subtitle')}</p>
        <Panel className="px-3 py-3 sm:px-4">
          <LearningPath journey={journey} profile={profile} />
        </Panel>
      </Section>

      <Section title={t('ielts.progress.title')} variant="label">
        <div className="space-y-3">
          <dl className="grid grid-cols-3 gap-2" data-testid="learning-stats">
            {(
              [
                ['lessons', `${n(stats.lessonsDone)}/${n(stats.lessonsTotal)}`, 'stat-lessons'],
                ['practice', n(stats.practiceSessions), 'stat-practice'],
                ['mastered', n(stats.topicsMastered), 'stat-mastered'],
              ] as const
            ).map(([key, value, id]) => (
              <div key={key} className="rounded-2xl border bg-card px-2 py-3 text-center" data-testid={id}>
                <dd className="text-lg font-semibold tabular-nums">{value}</dd>
                <dt className="mt-0.5 text-[11px] leading-tight text-muted-foreground">{t(`ielts.progress.${key}`)}</dt>
              </div>
            ))}
          </dl>
          {ielts.targetBand === undefined ? (
            <Panel variant="muted" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">{t('ielts.setGoalTitle')}</p>
                <p className="text-sm text-muted-foreground">{t('ielts.setGoalBody')}</p>
              </div>
              <Button asChild>
                <Link href="/setup/ielts?step=target">
                  {t('ielts.setGoalCta')} <ArrowRight />
                </Link>
              </Button>
            </Panel>
          ) : (
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
        </div>
      </Section>

      <Section title={t('ielts.browse')} variant="label">
        <div className="space-y-5">
          {GROUPS.map((g) => (
            <div key={g.key} className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{t(`ielts.groups.${g.key}`)}</p>
              <CardGrid className={g.key === 'practice' ? 'xl:grid-cols-2' : undefined}>
                {g.ids.map((id) => (
                  <SectionCard key={id} section={byId(id)} profile={profile} tint={g.tint} />
                ))}
              </CardGrid>
            </div>
          ))}
        </div>
      </Section>

      <p className="text-xs text-muted-foreground">{t('journey.howCalculated')}</p>
    </div>
  );
}
