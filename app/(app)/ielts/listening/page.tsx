'use client';

import { Headphones } from 'lucide-react';
import { CardGrid, Callout, ModuleCard, PageHeader, Panel, Section } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useBilingual } from '@/components/listening-lab/useBilingual';
import { LISTENING_MODULES, PART_DASHBOARDS } from '@/lib/listening-lab';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

/**
 * Listening Lab home: the 8 skill-area modules and the 4 part dashboards.
 * Every module is honestly marked — see docs/LISTENING_TRAINER_ARCHITECTURE.md
 * for what Phase 1 ships (this structure) versus what later phases add
 * (lessons, audio, the error classifier).
 */
export default function ListeningLabHome() {
  const { t } = useLocale();
  const l = useBilingual();

  return (
    <div className="space-y-8">
      <PageHeader title={t('listeningLab.title')} subtitle={t('listeningLab.subtitle')} backHref="/ielts" backLabel="IELTS" />

      <Section title={t('listeningLab.partsTitle')} variant="label">
        <CardGrid className="xl:grid-cols-2">
          {PART_DASHBOARDS.map((p) => (
            <ModuleCard key={p.part} href={`/ielts/listening/part/${p.part}`} icon={Headphones} tint="blue" title={l(p.title)} subtitle={`${p.questionTypes.length} ${t('listeningLab.questionTypes').toLowerCase()}`} />
          ))}
        </CardGrid>
      </Section>

      <Section title={t('listeningLab.modulesTitle')} variant="label">
        <CardGrid className="xl:grid-cols-2">
          {LISTENING_MODULES.map((m) => (
            <ModuleCard
              key={m.id}
              href={`/ielts/listening/module/${m.id}`}
              icon={Headphones}
              tint="lavender"
              title={`${m.number}. ${l(m.title)}`}
              subtitle={l(m.purpose)}
              wrapSubtitle
              trailing={<span className="text-xs text-muted-foreground tabular-nums">{t('listeningLab.skillCount', { n: m.skills.length })}</span>}
            />
          ))}
        </CardGrid>
      </Section>

      <Section title={t('listeningLab.examSimTitle')} variant="label">
        <Panel>
          <p className="text-sm text-muted-foreground">{t('listeningLab.examSimBody')}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t('listeningLab.examSimUseTests')}</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/ielts/tests">{t('listeningLab.openInTests')}</Link>
          </Button>
        </Panel>
      </Section>

      <Callout>
        <Link href="/ielts/listening/notebook" className="underline">
          {t('listeningLab.notebookTitle')}
        </Link>
      </Callout>
    </div>
  );
}
