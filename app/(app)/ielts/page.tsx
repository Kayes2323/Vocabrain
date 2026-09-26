'use client';

import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { CardGrid, ModuleCard, PageHeader, Panel, ScreenSkeleton, Section, StatusChip, type Tint } from '@/components/ds';
import { JourneyStages } from '@/components/home/JourneyStages';
import { IELTS_SKILLS, type IELTSSkill } from '@/lib/constants';
import { formatBand, ieltsJourney, overallBand, weeksUntilTest } from '@/lib/engine';
import { IELTS_SECTIONS, IELTS_TOOLS, sectionKey, type SectionDef } from '@/lib/navigation';
import type { UserProfile } from '@/lib/models';

const byId = (id: string) => [...IELTS_SECTIONS, ...IELTS_TOOLS].find((s) => s.id === id)!;

const GROUPS: { key: string; tint: Tint; ids: string[] }[] = [
  { key: 'learn', tint: 'lavender', ids: ['foundation', 'vocabulary'] },
  { key: 'practice', tint: 'blue', ids: ['listening', 'reading', 'writing', 'speaking'] },
  { key: 'test', tint: 'yellow', ids: ['mock-tests', 'band-calculator'] },
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
  const { t } = useLocale();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  const { ielts } = profile;
  const weeks = weeksUntilTest(ielts);
  const journey = ieltsJourney(profile);
  const hasStartingPoint = Boolean(ielts.diagnostic);

  return (
    <div className="space-y-8">
      <PageHeader title="IELTS" subtitle={t('ielts.subtitle')} />

      <div>
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
      </div>

      {GROUPS.map((g) => (
        <Section key={g.key} title={t(`ielts.groups.${g.key}`)} variant="label">
          <CardGrid className={g.key === 'practice' ? 'xl:grid-cols-2' : undefined}>
            {g.ids.map((id) => (
              <SectionCard key={id} section={byId(id)} profile={profile} tint={g.tint} />
            ))}
          </CardGrid>
        </Section>
      ))}

      <Section title={t('ielts.groups.plan')} variant="label">
        <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2 lg:items-start">
          <div className="grid min-w-0 grid-cols-1 gap-2.5">
            <SectionCard section={byId('plan')} profile={profile} tint="green" />
            <ModuleCard
              href="/ielts/diagnostic"
              icon={Compass}
              tint="green"
              title={t('ielts.startingPoint')}
              subtitle={hasStartingPoint ? t('ielts.startingPointDone') : t('ielts.startingPointTodo')}
            />
          </div>
          <Panel className="space-y-4">
            <p className="text-sm font-medium">{t('ielts.journey')}</p>
            <JourneyStages stages={journey.stages} />
            <p className="text-xs text-muted-foreground">{t('journey.howCalculated')}</p>
          </Panel>
        </div>
      </Section>
    </div>
  );
}
