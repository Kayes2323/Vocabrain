'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ExternalLink, Sparkles } from 'lucide-react';
import { PageHeader, Panel, ScreenSkeleton } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { HubBar } from '@/components/abroad/HubBar';
import { compareUniversities, MAX_COMPARE } from '@/lib/abroad/compare';
import { getCountry } from '@/lib/content/countries';
import { cn } from '@/lib/utils';

const COLS = ['', 'sm:grid-cols-1', 'sm:grid-cols-2', 'sm:grid-cols-3'];

/** Up to three entries from the student's list, fact by fact; "—" when not verified; never a winner. */
function UniversityCompare() {
  const { t } = useLocale();
  const params = useSearchParams();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;
  const ids = (params.get('ids') ?? '').split(',').filter(Boolean).slice(0, MAX_COMPARE);
  const entries = ids.map((id) => profile.abroad.universities?.find((u) => u.id === id)).filter((u): u is NonNullable<typeof u> => Boolean(u));
  const { items, rows } = compareUniversities(entries);

  return (
    <div className="space-y-6">
      <PageHeader title={t('sa.uniCompare.title')} subtitle={t('sa.uniCompare.subtitle')} backHref="/abroad/universities" backLabel={t('sa.unis.title')} className="mb-0" />
      <HubBar />
      {items.length < 2 ? (
        <Panel className="text-sm text-muted-foreground">{t('sa.uniCompare.empty')}</Panel>
      ) : (
        <>
          <div className={cn('grid gap-2', COLS[items.length])}>
            {items.map(({ entry, university }) => (
              <Panel key={entry.id} className="space-y-1 p-3" data-compare-entry={entry.name}>
                <p className="font-semibold">{entry.name}</p>
                <p className="text-sm text-muted-foreground">
                  {getCountry(entry.countryCode)?.flag} {entry.program ?? t('sa.uniProgram.none')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('sa.uniCompare.yourStatus')}: {t(`sa.unis.statuses.${entry.status}`)}
                </p>
                {!university && <p className="text-xs text-muted-foreground italic">{t('sa.uniCompare.studentEntered')}</p>}
              </Panel>
            ))}
          </div>
          <div className="space-y-3" data-testid="uni-compare-table">
            {rows.map((row) => (
              <section key={row.id} className="space-y-2" data-row={row.id}>
                <h2 className="px-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{t(`sa.uniCompare.rows.${row.id}`)}</h2>
                <div className={cn('grid gap-2', COLS[items.length])}>
                  {row.cells.map((cell, i) => (
                    <div key={items[i].entry.id} className="space-y-1 rounded-2xl border bg-card p-3.5 text-sm" data-cell={i} data-empty={!cell.value}>
                      <p className="text-xs font-medium text-muted-foreground sm:hidden">{items[i].entry.name}</p>
                      <p>{cell.value ?? '—'}</p>
                      {cell.value && cell.source?.url && (
                        <a href={cell.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-success">
                          {cell.source.name}
                          {cell.verified ? ` · ${t('sa.hub.verifiedOn', { date: cell.verified })}` : ''} <ExternalLink className="size-3" aria-hidden />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <Link href="/mino?ask=abroad-unis" className="flex items-center gap-2 rounded-2xl bg-brand-soft px-4 py-3.5 text-sm font-medium text-brand">
            <Sparkles className="size-4" aria-hidden /> {t('sa.unis.ask')}
          </Link>
        </>
      )}
    </div>
  );
}

export default function UniversityComparePage() {
  return (
    <Suspense fallback={<ScreenSkeleton />}>
      <UniversityCompare />
    </Suspense>
  );
}
