'use client';

import { TrendingUp } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { CardGrid, ModuleCard, PageHeader, ScreenSkeleton, Section, StatusChip, type Tint } from '@/components/ds';
import { IELTS_SKILLS, type IELTSSkill } from '@/lib/constants';
import { formatBand, weeksUntilTest } from '@/lib/engine';
import { IELTS_SECTIONS, IELTS_TOOLS, sectionKey, type SectionDef } from '@/lib/navigation';
import type { UserProfile } from '@/lib/models';

const byId = (id: string) => [...IELTS_SECTIONS, ...IELTS_TOOLS].find((s) => s.id === id)!;

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
      wrapSubtitle
    />
  );
}

/**
 * The IELTS hub: a short list of places to go, in order — plan and progress,
 * learn, practice, test, tools. Each card opens its own page.
 */
export default function IELTSPage() {
  const { t, n } = useLocale();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  const { ielts } = profile;
  const weeks = weeksUntilTest(ielts);
  // A one-line plan summary from data the student already gave (target, test date).
  const planSummary =
    ielts.targetBand !== undefined
      ? [t('ielts.planTarget', { band: formatBand(ielts.targetBand) }), weeks !== undefined ? t('ielts.planWeeks', { n: n(weeks) }) : undefined].filter(Boolean).join(' · ')
      : t('ielts.cards.plan');

  const card = (id: string, tint: Tint) => <SectionCard key={id} section={byId(id)} profile={profile} tint={tint} />;

  return (
    <div className="space-y-7" data-testid="ielts-hub">
      <PageHeader title="IELTS" subtitle={t('ielts.subtitle')} />

      <Section title={t('ielts.groups.plan')} variant="label" id="hub-plan">
        <CardGrid>
          <ModuleCard href="/ielts/plan" icon={byId('plan').icon} tint="green" title={t(sectionKey('plan', 'title'))} subtitle={planSummary} wrapSubtitle />
          <ModuleCard href="/ielts/progress" icon={TrendingUp} tint="green" title={t('ielts.progressCard.title')} subtitle={t('ielts.progressCard.subtitle')} wrapSubtitle />
        </CardGrid>
      </Section>

      <Section title={t('ielts.groups.learn')} variant="label" id="hub-learn">
        <CardGrid>{card('foundation', 'lavender')}</CardGrid>
      </Section>

      <Section title={t('ielts.groups.practice')} variant="label" id="hub-practice">
        <CardGrid className="xl:grid-cols-2">{['listening', 'reading', 'writing', 'speaking'].map((id) => card(id, 'blue'))}</CardGrid>
      </Section>

      <Section title={t('ielts.groups.test')} variant="label" id="hub-test">
        <CardGrid>{card('mock-tests', 'yellow')}</CardGrid>
      </Section>

      <Section title={t('ielts.groups.tools')} variant="label" id="hub-tools">
        <CardGrid>{card('band-calculator', 'neutral')}</CardGrid>
      </Section>
    </div>
  );
}
