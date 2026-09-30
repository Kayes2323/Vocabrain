'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { CardGrid, ModuleCard, PageHeader, ScreenSkeleton, Section, StatusChip, type Tint } from '@/components/ds';
import { IELTS_SKILLS, type IELTSSkill } from '@/lib/constants';
import { formatBand } from '@/lib/engine';
import { PlanHubCard } from '@/components/plan/PlanHubCard';
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
 * The IELTS hub, in order: My IELTS Plan (with a link to Progress), IELTS
 * Foundation, IELTS Practice (the four skills), Practice Tests, Band Score
 * Calculator. Every card is one tap to its own page.
 */
export default function IELTSPage() {
  const { t } = useLocale();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  const card = (id: string, tint: Tint) => <SectionCard key={id} section={byId(id)} profile={profile} tint={tint} />;

  return (
    <div className="space-y-7" data-testid="ielts-hub">
      <PageHeader title="IELTS" subtitle={t('ielts.subtitle')} />

      <section id="hub-plan" aria-label={t('ielts.groups.plan')}>
        <PlanHubCard profile={profile} />
      </section>

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
