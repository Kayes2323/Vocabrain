'use client';

import { Calculator, Layers, PenLine, Radar } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { CardGrid, ListRow, ModuleCard, PageHeader, RowGroup, ScreenSkeleton, Section, StatusChip, type Tint } from '@/components/ds';
import { PlanHubCard } from '@/components/plan/PlanHubCard';
import { IELTS_SECTIONS, IELTS_TOOLS, sectionKey } from '@/lib/navigation';

const sectionById = (id: string) => [...IELTS_SECTIONS, ...IELTS_TOOLS].find((s) => s.id === id)!;

/**
 * The IELTS hub, a focused learning pathway:
 *   My IELTS Plan → IELTS Learning (Foundation, Listening Learning, Writing Learning)
 *   → Tests & Library (Full Mock Test, IELTS Test Library) → More Tools (Band Score Calculator).
 *
 * This page only chooses what is SHOWN. Nothing behind it was removed: the four skill practice pages
 * (/ielts/practice/listening, /ielts/reading, /ielts/practice/writing, /ielts/practice/speaking), Practice Tests
 * (/ielts/tests), their data, sessions and scoring all stay registered in lib/navigation.ts and reachable by their
 * own routes, ready for future integration. Home's Quick Access and Today's plan still link to them.
 */
export default function IELTSPage() {
  const { t } = useLocale();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  // Routes come from the one registry (lib/navigation.ts); only the wording differs from the skill cards.
  const learn: { id: string; key: 'foundation' | 'listening' | 'writing'; href: string; icon: typeof Layers; tint: Tint }[] = [
    { id: 'foundation', key: 'foundation', href: sectionById('foundation').href, icon: Layers, tint: 'lavender' },
    { id: 'listening-lab', key: 'listening', href: sectionById('listening-lab').href, icon: Radar, tint: 'blue' },
    // The Mino Writing Studio is a shipped feature (16 lessons, AI feedback, saved progress): no "New"/"Prototype" labelling.
    { id: 'writing-studio', key: 'writing', href: '/ielts/writing-studio', icon: PenLine, tint: 'brand' },
  ];
  const mock = sectionById('full-mock-test');
  const library = sectionById('cambridge');
  const calculator = sectionById('band-calculator');

  return (
    <div className="space-y-7" data-testid="ielts-hub">
      <PageHeader title="IELTS" subtitle={t('ielts.subtitle')} />

      <section id="hub-plan" aria-label={t('ielts.groups.plan')}>
        <PlanHubCard profile={profile} />
      </section>

      <Section title={t('ielts.groups.learning')} variant="label" id="hub-learn">
        <CardGrid className="xl:grid-cols-2">
          {learn.map((c) => (
            <ModuleCard key={c.id} href={c.href} icon={c.icon} tint={c.tint} title={t(`ielts.learnCards.${c.key}.title`)} subtitle={t(`ielts.learnCards.${c.key}.subtitle`)} wrapSubtitle />
          ))}
        </CardGrid>
      </Section>

      <Section title={t('ielts.groups.testsLibrary')} variant="label" id="hub-test">
        <CardGrid className="xl:grid-cols-2">
          <ModuleCard href={mock.href} icon={mock.icon} tint="green" title={t(sectionKey(mock.id, 'title'))} subtitle={t(`ielts.cards.${mock.id}`)} wrapSubtitle />
          {/* The library is browsable but carries no tests yet: the card says so rather than letting a student open 48 empty entries to find out. */}
          <ModuleCard
            href={library.href}
            icon={library.icon}
            tint="blue"
            title={t(sectionKey(library.id, 'title'))}
            subtitle={t(`ielts.cards.${library.id}`)}
            trailing={<StatusChip>{t('common.soon')}</StatusChip>}
            wrapSubtitle
          />
        </CardGrid>
      </Section>

      <Section title={t('ielts.groups.more')} variant="label" id="hub-tools">
        <RowGroup>
          <ListRow href={calculator.href} icon={Calculator} title={t(sectionKey(calculator.id, 'title'))} description={t(`ielts.cards.${calculator.id}`)} />
        </RowGroup>
      </Section>
    </div>
  );
}
