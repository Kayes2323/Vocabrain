'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, ExternalLink, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, Panel, ScreenSkeleton } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { formatMoney, useFormatDate } from '@/components/abroad/FactRow';
import { HubBar } from '@/components/abroad/HubBar';
import { useBilingual } from '@/components/abroad/useBilingual';
import { countryHref } from '@/lib/abroad/countries';
import { compareTable, MAX_COMPARE, parseCompare } from '@/lib/abroad/compare';
import { COUNTRIES, getCountry } from '@/lib/content/countries';
import { setDreamCountry } from '@/lib/engine';
import type { Country } from '@/lib/models';
import { cn } from '@/lib/utils';

const COLS = ['', 'sm:grid-cols-1', 'sm:grid-cols-2', 'sm:grid-cols-3'];

function Compare() {
  const { t } = useLocale();
  const text = useBilingual();
  const date = useFormatDate();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { profile, updateProfile } = useProfile();

  if (!profile) return <ScreenSkeleton />;
  const a = profile.abroad;
  const fromUrl = parseCompare(params.get('c'), getCountry);
  // Without a choice in the URL, start from the dream country and shortlist.
  const codes = params.has('c') ? fromUrl : [...new Set([a.dreamCountryCode, ...(a.preferredCountryCodes ?? [])].filter(Boolean) as string[])].slice(0, MAX_COMPARE);
  const countries = codes.map((c) => getCountry(c)).filter(Boolean) as Country[];
  const table = compareTable(countries);

  const setAt = (i: number, code: string) => {
    const next = [...codes];
    if (code) next[i] = code;
    else next.splice(i, 1);
    router.replace(`${pathname}?c=${[...new Set(next.filter(Boolean))].join(',').toLowerCase()}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t('sa.compare.title')} subtitle={t('sa.compare.subtitle')} />
      <HubBar />

      <div className="grid gap-2 sm:grid-cols-3" data-testid="compare-pickers">
        {Array.from({ length: MAX_COMPARE }, (_, i) => (
          <label key={i} className="flex items-center gap-2 text-sm">
            <span className="shrink-0 text-muted-foreground">{t('sa.compare.pick', { n: i + 1 })}</span>
            <select value={codes[i] ?? ''} onChange={(e) => setAt(i, e.target.value)} className="h-10 min-w-0 flex-1 rounded-lg border bg-background px-3" disabled={i > codes.length}>
              <option value="">{t('sa.compare.none')}</option>
              {COUNTRIES.filter((c) => c.code === codes[i] || !codes.includes(c.code)).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      {countries.length < 2 ? (
        <Panel className="text-sm text-muted-foreground">{t('sa.compare.empty')}</Panel>
      ) : (
        <>
          <div className={cn('grid gap-2', COLS[countries.length])}>
            {countries.map((c) => (
              <Panel key={c.code} className="flex flex-wrap items-center gap-2 p-3" data-compare-country={c.code}>
                <span className="text-2xl leading-none" aria-hidden>
                  {c.flag}
                </span>
                <span className="min-w-0 flex-1 font-semibold">{c.name}</span>
                {a.dreamCountryCode === c.code ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-brand">
                    <Star className="size-3.5" aria-hidden /> {t('sa.match.dream')}
                  </span>
                ) : (
                  <Button size="sm" variant="ghost" onClick={() => updateProfile((p) => ({ ...p, abroad: setDreamCountry(p.abroad, c.code) }))}>
                    {t('sa.match.makeDream')}
                  </Button>
                )}
                <Button asChild size="sm" variant="outline">
                  <Link href={countryHref(c.code)} aria-label={t('sa.compare.open', { country: c.name })}>
                    {t('sa.match.explore')} <ArrowRight />
                  </Link>
                </Button>
              </Panel>
            ))}
          </div>

          <div className="space-y-3" data-testid="compare-table">
            {table.map((row) => (
              <section key={row.id} className="space-y-2" data-row={row.id}>
                <h2 className="px-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{t(`sa.sections.${row.id}`)}</h2>
                <div className={cn('grid gap-2', COLS[countries.length])}>
                  {row.cells.map((cell, i) => (
                    <div key={countries[i].code} className="space-y-2 rounded-2xl border bg-card p-3.5" data-cell={countries[i].code} data-status={cell.status}>
                      <p className="text-xs font-medium text-muted-foreground sm:hidden">
                        {countries[i].flag} {countries[i].name}
                      </p>
                      {cell.facts.length === 0 ? (
                        <p className="text-sm text-muted-foreground">{t('sa.compare.notVerified')}</p>
                      ) : (
                        cell.facts.map((f, j) => (
                          <div key={j} className="space-y-0.5 text-sm">
                            <p className="text-xs text-muted-foreground">{text(f.label)}</p>
                            <p>{typeof f.fact.value === 'object' ? formatMoney(f.fact.value) : String(f.fact.value)}</p>
                            {f.fact.notes && <p className="text-xs text-muted-foreground">{f.fact.notes}</p>}
                            <a href={f.fact.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-success">
                              {f.fact.source.name} · {t('sa.hub.verifiedOn', { date: date(f.fact.lastVerified) })} <ExternalLink className="size-3" aria-hidden />
                            </a>
                          </div>
                        ))
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <Link
            href={`/mino?${new URLSearchParams({ ask: 'abroad-compare', c: codes.join(',').toLowerCase() })}`}
            className="flex items-center gap-2 rounded-2xl bg-brand-soft px-4 py-3.5 text-sm font-medium text-brand"
          >
            <Sparkles className="size-4" aria-hidden /> {t('sa.compare.ask')}
          </Link>
        </>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<ScreenSkeleton />}>
      <Compare />
    </Suspense>
  );
}
