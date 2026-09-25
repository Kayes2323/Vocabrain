'use client';

import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { ListRow, PageHeader, Panel, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { JourneyStages } from '@/components/home/JourneyStages';
import { IELTS_SKILLS, type IELTSSkill } from '@/lib/constants';
import { formatBand, ieltsJourney, overallBand, weeksUntilTest } from '@/lib/engine';
import { IELTS_SECTIONS, IELTS_TOOLS, sectionKey, type SectionDef } from '@/lib/navigation';
import type { UserProfile } from '@/lib/models';

function SectionRow({ section, profile }: { section: SectionDef; profile: UserProfile }) {
  const { t } = useLocale();
  let trailing: React.ReactNode;
  if ((IELTS_SKILLS as readonly string[]).includes(section.id)) {
    const band = profile.ielts.currentBands[section.id as IELTSSkill];
    if (band !== undefined) {
      const behind = profile.ielts.targetBand !== undefined && band < profile.ielts.targetBand;
      trailing = <StatusChip tone={behind ? 'warning' : 'success'}>{formatBand(band)}</StatusChip>;
    }
  }
  if (!trailing && section.status === 'planned') trailing = <StatusChip>{t('common.soon')}</StatusChip>;
  return (
    <ListRow
      href={section.href}
      icon={section.icon}
      iconTone={section.status === 'available' ? 'brand' : 'neutral'}
      title={t(sectionKey(section.id, 'title'))}
      description={t(sectionKey(section.id, 'description'))}
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

      <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
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

        <RowGroup>
          <ListRow
            href="/ielts/diagnostic"
            icon={Compass}
            iconTone="brand"
            title={t('ielts.startingPoint')}
            description={hasStartingPoint ? t('ielts.startingPointDone') : t('ielts.startingPointTodo')}
            trailing={hasStartingPoint ? <StatusChip tone="success">{t('ielts.estimated')}</StatusChip> : undefined}
          />
        </RowGroup>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="space-y-8">
          <Section title={t('ielts.modules')}>
            <RowGroup>
              {IELTS_SECTIONS.map((s) => (
                <SectionRow key={s.id} section={s} profile={profile} />
              ))}
            </RowGroup>
          </Section>

          <Section title={t('ielts.tools')}>
            <RowGroup>
              {IELTS_TOOLS.map((s) => (
                <SectionRow key={s.id} section={s} profile={profile} />
              ))}
            </RowGroup>
          </Section>
        </div>

        <Section title={t('ielts.journey')}>
          <Panel className="space-y-4">
            <JourneyStages stages={journey.stages} />
            <p className="text-xs text-muted-foreground">{t('journey.howCalculated')}</p>
          </Panel>
        </Section>
      </div>
    </div>
  );
}
