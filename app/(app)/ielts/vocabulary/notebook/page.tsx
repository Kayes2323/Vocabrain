'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookText, BrainCircuit, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmptyState, PageHeader, Panel, RowGroup, ScreenSkeleton } from '@/components/ds';
import { WordStatusChip } from '@/components/brain/WordStatusChip';
import { meanings } from '@/components/brain/meaning';
import { MinoMark } from '@/components/shell/MinoMark';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { brainSummary, isDue } from '@/lib/engine';
import type { BrainWord } from '@/lib/models';
import { cn } from '@/lib/utils';

type Filter = 'review' | 'new' | 'learning' | 'strong' | 'mastered' | 'all';
const FILTERS: Filter[] = ['review', 'new', 'learning', 'strong', 'mastered', 'all'];

function matches(w: BrainWord, filter: Filter) {
  switch (filter) {
    case 'review':
      return isDue(w);
    case 'new':
      return w.status === 'new';
    case 'learning':
      return w.status === 'learning' || w.status === 'recalling' || w.status === 'active';
    case 'strong':
      return w.status === 'strong';
    case 'mastered':
      return w.status === 'mastered';
    default:
      return true;
  }
}

export default function NotebookPage() {
  const { t, locale } = useLocale();
  const brain = useBrain();
  const [filter, setFilter] = useState<Filter>('review');
  const [query, setQuery] = useState('');

  const summary = brainSummary(brain.words);
  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f, brain.words.filter((w) => matches(w, f)).length])) as Record<Filter, number>,
    [brain.words],
  );
  const effectiveFilter = filter === 'review' && counts.review === 0 && brain.words.length > 0 ? 'all' : filter;
  const list = brain.words
    .filter((w) => matches(w, effectiveFilter))
    .filter((w) => !query.trim() || w.word.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  if (brain.loading) return <ScreenSkeleton />;

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader title={t('brain.title')} subtitle={t('brain.subtitle')} backHref="/ielts/vocabulary" backLabel={t('skills.vocabulary')} />

      {brain.words.length === 0 ? (
        <EmptyState
          icon={BrainCircuit}
          title={t('brain.emptyTitle')}
          description={t('brain.emptyBody')}
          action={
            <Button asChild>
              <Link href="/ielts/reading">
                <BookText /> {t('brain.emptyCta')}
              </Link>
            </Button>
          }
        />
      ) : (
        <>
          <Panel variant="brand" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <MinoMark size="sm" className="mt-0.5" />
              <p className="text-[15px] text-pretty">
                {summary.due > 0
                  ? summary.failedLastTime > 0
                    ? t('brain.minoDueFailed', { n: summary.due, failed: summary.failedLastTime })
                    : t('brain.minoDue', { n: summary.due })
                  : t('brain.minoNoneDue')}
              </p>
            </div>
            {summary.due > 0 && (
              <Button asChild className="shrink-0">
                <Link href="/review">
                  {t('brain.startReview')} <ArrowRight />
                </Link>
              </Button>
            )}
          </Panel>

          <div className="-mx-4 overflow-x-auto px-4">
            <div role="tablist" aria-label={t('brain.title')} className="flex w-max gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  type="button"
                  aria-selected={effectiveFilter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'h-9 rounded-full border px-3.5 text-sm font-medium whitespace-nowrap transition-colors',
                    effectiveFilter === f ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:bg-muted',
                  )}
                >
                  {t(`brain.filters.${f}`)} <span className="tabular-nums opacity-70">{counts[f]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              type="search"
              aria-label={t('brain.search')}
              placeholder={t('brain.search')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 rounded-xl bg-card pl-10"
            />
          </div>

          {list.length === 0 ? (
            <p className="px-1 text-muted-foreground">{t('brain.filterEmpty')}</p>
          ) : (
            <RowGroup>
              {list.map((w) => {
                const { primary } = meanings(w, locale);
                return (
                  <Link
                    key={w.id}
                    href={`/ielts/vocabulary/notebook/${w.id}`}
                    className="flex min-h-16 items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/60"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{w.word}</p>
                      <p className="truncate text-sm text-muted-foreground">{primary || w.originalSentence}</p>
                    </div>
                    <WordStatusChip status={w.status} />
                  </Link>
                );
              })}
            </RowGroup>
          )}
        </>
      )}
    </div>
  );
}
