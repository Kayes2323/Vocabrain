'use client';

import Link from 'next/link';
import { ArrowRight, BookOpenCheck, BookText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { ListRow, PageHeader, Panel, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { PASSAGES } from '@/lib/content/passages';
import { LIBRARY, READING_LEVELS, levelStats, nextPassage, questionCount, suggestedLevel } from '@/lib/content/reading-library';

export default function ReadingPage() {
  const { t } = useLocale();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  const progress = profile.study.readingLibrary;
  const read = new Set(profile.study.readPassages ?? []);
  const next = nextPassage(LIBRARY, progress);
  const suggested = suggestedLevel(LIBRARY, progress);

  return (
    <div className="max-w-2xl space-y-8">
      <PageHeader title={t('skills.reading')} subtitle={t('reading.subtitle')} backHref="/ielts" backLabel={t('nav.ielts')} />

      <Panel variant="brand" className="space-y-4" data-testid="reading-next">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-brand">{t('reading.lib.suggested')}</p>
          <StatusChip>{t(`reading.lib.levels.${next.level}`)}</StatusChip>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold">{next.title}</p>
          <p className="inline-flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <Clock className="size-3.5" aria-hidden /> {t('common.minutes', { n: next.minutes })} · {next.topic} ·{' '}
            {t('reading.lib.questions', { n: questionCount(next) })}
          </p>
        </div>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href={`/ielts/reading/${next.id}`}>
            {progress?.[next.id] ? t('common.continue') : t('reading.start')} <ArrowRight />
          </Link>
        </Button>
      </Panel>

      <p className="px-1 text-sm text-muted-foreground">{t('reading.lib.levelGuide')}</p>

      {READING_LEVELS.map((level) => {
        const stats = levelStats(LIBRARY, progress, level);
        const list = LIBRARY.filter((p) => p.level === level);
        return (
          <Section
            key={level}
            title={t(`reading.lib.levels.${level}`)}
            description={t(`reading.lib.levelDesc.${level}`)}
            action={
              level === suggested ? (
                <StatusChip tone="brand">{t('reading.lib.suggestedLevel')}</StatusChip>
              ) : (
                <span className="text-xs text-muted-foreground">{t('reading.lib.levelProgress', { done: stats.done, total: stats.total })}</span>
              )
            }
          >
            <RowGroup>
              {list.map((p) => {
                const state = progress?.[p.id];
                return (
                  <ListRow
                    key={p.id}
                    href={`/ielts/reading/${p.id}`}
                    icon={state?.checked || state?.score ? BookOpenCheck : BookText}
                    iconTone={state?.checked || state?.score ? 'success' : 'brand'}
                    title={p.title}
                    description={`${p.topic} · ${t('common.minutes', { n: p.minutes })} · ${t('reading.lib.questions', { n: questionCount(p) })}`}
                    trailing={
                      state?.checked || state?.score ? (
                        <StatusChip tone="success">{t('reading.lib.checked')}</StatusChip>
                      ) : state && Object.keys(state.answers).length > 0 ? (
                        <StatusChip>{t('reading.lib.inProgress')}</StatusChip>
                      ) : undefined
                    }
                  />
                );
              })}
            </RowGroup>
          </Section>
        );
      })}

      <Section title={t('reading.lib.shortPractice')}>
        <RowGroup>
          {PASSAGES.map((p) => (
            <ListRow
              key={p.id}
              href={`/ielts/reading/${p.id}`}
              icon={BookText}
              iconTone={read.has(p.id) ? 'success' : 'neutral'}
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
