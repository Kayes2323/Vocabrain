'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { Callout, ListRow, PageHeader, Panel, ProgressBar, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { JourneyTimeline } from '@/components/abroad/JourneyTimeline';
import { TrustNote } from '@/components/abroad/TrustNote';
import { abroadJourney, formatIntake, hasAbroadGoal } from '@/lib/engine';
import { ABROAD_SECTION_GROUPS, sectionKey } from '@/lib/navigation';

export default function AbroadPage() {
  const { t } = useLocale();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  const { abroad } = profile;
  const journey = abroadJourney(profile);
  const summary = [abroad.degreeLevel ? t(`degree.${abroad.degreeLevel}`) : undefined, abroad.subject].filter(Boolean).join(' · ');

  return (
    <div className="space-y-8">
      <PageHeader title="Study Abroad" subtitle={t('abroad.subtitle')} />
      <Callout tone="brand">{t('abroad.phaseNote')}</Callout>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="space-y-8">
          {hasAbroadGoal(abroad) ? (
            <Panel className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-lg font-semibold">{summary || 'Study Abroad'}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('abroad.targetIntake', { intake: formatIntake(abroad) ?? t('common.notSet') })}
                  </p>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/setup/abroad">{t('common.edit')}</Link>
                </Button>
              </div>
              <ProgressBar value={journey.percent} label={t('abroad.journeyTitle')} tone="success" />
            </Panel>
          ) : (
            <Panel variant="muted" className="space-y-4">
              <div className="space-y-1">
                <p className="font-semibold">{t('abroad.startTitle')}</p>
                <p className="text-sm text-muted-foreground">{t('abroad.startBody')}</p>
              </div>
              <Button asChild>
                <Link href="/setup/abroad">
                  {t('abroad.startCta')} <ArrowRight />
                </Link>
              </Button>
            </Panel>
          )}

          {ABROAD_SECTION_GROUPS.map((group) => (
            <Section key={group.titleKey} title={t(group.titleKey)}>
              <RowGroup>
                {group.sections.map((section) => (
                  <ListRow
                    key={section.id}
                    href={section.href}
                    icon={section.icon}
                    iconTone={section.status === 'available' ? 'brand' : 'neutral'}
                    title={t(sectionKey(section.id, 'title'))}
                    description={t(sectionKey(section.id, 'description'))}
                    trailing={section.status === 'planned' ? <StatusChip>{t('common.soon')}</StatusChip> : undefined}
                  />
                ))}
              </RowGroup>
            </Section>
          ))}
        </div>

        <div className="space-y-8">
          <Section title={t('abroad.journeyTitle')}>
            <Panel>
              <JourneyTimeline journey={journey} />
            </Panel>
          </Section>
          <TrustNote />
        </div>
      </div>
    </div>
  );
}
