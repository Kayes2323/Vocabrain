'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { BrainCircuit, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState, PageHeader, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { PassageReader } from '@/components/reading/PassageReader';
import { getPassage } from '@/lib/content/passages';
import { markActivityDone } from '@/lib/engine';

export default function PassagePage() {
  const { passageId } = useParams<{ passageId: string }>();
  const passage = getPassage(passageId);
  const { t } = useLocale();
  const { updateProfile } = useProfile();
  const [finished, setFinished] = useState<number | null>(null);

  if (!passage) notFound();

  const finish = (saved: number) => {
    updateProfile((p) => {
      const read = new Set(p.study.readPassages ?? []);
      read.add(passage.id);
      return markActivityDone({ ...p, study: { ...p.study, readPassages: [...read] } }, 'reading');
    });
    setFinished(saved);
    window.scrollTo({ top: 0 });
  };

  if (finished !== null) {
    return (
      <div className="max-w-2xl">
        <EmptyState
          icon={PartyPopper}
          title={t('reading.finishedTitle')}
          description={finished > 0 ? t('reading.finishedSaved', { n: finished }) : t('reading.finishedNone')}
          action={
            <div className="flex flex-col gap-2 sm:flex-row">
              {finished > 0 && (
                <Button asChild>
                  <Link href="/review">
                    <BrainCircuit /> {t('reading.reviewNow')}
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline">
                <Link href="/ielts/reading">{t('reading.morePassages')}</Link>
              </Button>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={passage.title}
        subtitle={
          <span className="inline-flex flex-wrap items-center gap-2">
            <span>
              {passage.topic} · {t('common.minutes', { n: passage.estimatedMinutes })}
            </span>
            <StatusChip>{t(`reading.license.${passage.licenseStatus}`)}</StatusChip>
          </span>
        }
        backHref="/ielts/reading"
        backLabel={t('skills.reading')}
      />
      <PassageReader passage={passage} onFinish={finish} />
    </div>
  );
}
