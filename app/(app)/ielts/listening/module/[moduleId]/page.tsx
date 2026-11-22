'use client';

import { notFound, useParams } from 'next/navigation';
import { Headphones } from 'lucide-react';
import { Callout, ListRow, PageHeader, RowGroup, ScreenSkeleton, Section } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useBilingual } from '@/components/listening-lab/useBilingual';
import { StatusBadge } from '@/components/listening-lab/StatusBadge';
import { findModule } from '@/lib/listening-lab';

export default function ListeningLabModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { t } = useLocale();
  const l = useBilingual();
  if (!moduleId) return <ScreenSkeleton />;
  const module = findModule(moduleId);
  if (!module) notFound();

  return (
    <div className="space-y-8">
      <PageHeader title={`${module.number}. ${l(module.title)}`} subtitle={l(module.purpose)} backHref="/ielts/listening" backLabel={t('listeningLab.title')} />

      <Section title={t('listeningLab.skillsToMaster')} variant="label">
        <RowGroup>
          {module.skills.map((skill) => (
            <ListRow key={skill.id} icon={Headphones} title={l(skill.title)} description={l(skill.outcome)} trailing={<StatusBadge status={skill.status} />} />
          ))}
        </RowGroup>
      </Section>

      <Callout>{t('listeningLab.plannedNote')}</Callout>
    </div>
  );
}
