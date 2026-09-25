'use client';

import Link from 'next/link';
import { ArrowRight, BookText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { ListRow, PageHeader, Panel, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { PASSAGES } from '@/lib/content/passages';

export default function ReadingPage() {
  const { t } = useLocale();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  const read = new Set(profile.study.readPassages ?? []);
  const today = PASSAGES.find((p) => !read.has(p.id)) ?? PASSAGES[0];

  return (
    <div className="max-w-2xl space-y-8">
      <PageHeader title={t('skills.reading')} subtitle={t('reading.subtitle')} backHref="/ielts" backLabel={t('nav.ielts')} />

      <Panel variant="brand" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-brand">{t('reading.today')}</p>
          <StatusChip>{today.topic}</StatusChip>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold">{today.title}</p>
          <p className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="size-3.5" aria-hidden /> {t('common.minutes', { n: today.estimatedMinutes })}
          </p>
          <p className="text-sm text-muted-foreground">{t('reading.todayTask')}</p>
        </div>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href={`/ielts/reading/${today.id}`}>
            {t('reading.start')} <ArrowRight />
          </Link>
        </Button>
      </Panel>

      <Section title={t('reading.allPassages')}>
        <RowGroup>
          {PASSAGES.map((p) => (
            <ListRow
              key={p.id}
              href={`/ielts/reading/${p.id}`}
              icon={BookText}
              iconTone={read.has(p.id) ? 'success' : 'brand'}
              title={p.title}
              description={`${p.topic} · ${t('common.minutes', { n: p.estimatedMinutes })}`}
              trailing={read.has(p.id) ? <StatusChip tone="success">{t('reading.done')}</StatusChip> : undefined}
            />
          ))}
        </RowGroup>
        <p className="px-1 text-xs text-muted-foreground">{t('reading.contentNote')}</p>
      </Section>
    </div>
  );
}
