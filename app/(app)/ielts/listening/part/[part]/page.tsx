'use client';

import { notFound, useParams } from 'next/navigation';
import { Headphones } from 'lucide-react';
import { Callout, ListRow, PageHeader, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useBilingual } from '@/components/listening-lab/useBilingual';
import { StatusBadge } from '@/components/listening-lab/StatusBadge';
import { QUESTION_TYPE_LABELS } from '@/lib/ielts/question-types';
import { findPartDashboard, resolveSkillRef } from '@/lib/listening-lab';

export default function ListeningLabPartPage() {
  const { part } = useParams<{ part: string }>();
  const { t } = useLocale();
  const l = useBilingual();
  if (!part) return <ScreenSkeleton />;
  const dashboard = findPartDashboard(Number(part));
  if (!dashboard) notFound();

  return (
    <div className="space-y-8">
      <PageHeader title={l(dashboard.title)} subtitle={t('listeningLab.plannedNote')} backHref="/ielts/listening" backLabel={t('listeningLab.title')} />

      <Section title={t('listeningLab.questionTypes')} variant="label">
        <div className="flex flex-wrap gap-2">
          {dashboard.questionTypes.map((qt) => (
            <StatusChip key={qt}>{QUESTION_TYPE_LABELS[qt]}</StatusChip>
          ))}
        </div>
      </Section>

      <Section title={t('listeningLab.skillsToMaster')} variant="label">
        <RowGroup>
          {dashboard.skillRefs.map((ref) => {
            const resolved = resolveSkillRef(ref);
            if (!resolved) return null;
            return <ListRow key={ref} icon={Headphones} title={l(resolved.skill.title)} description={l(resolved.module.title)} trailing={<StatusBadge status={resolved.skill.status} />} />;
          })}
        </RowGroup>
      </Section>

      <Section title={t('listeningLab.commonTraps')} variant="label">
        <RowGroup>
          {dashboard.commonTraps.map((trap, i) => (
            <ListRow key={i} title={l(trap)} muted />
          ))}
        </RowGroup>
      </Section>

      <Callout>{t('listeningLab.plannedNote')}</Callout>
    </div>
  );
}
