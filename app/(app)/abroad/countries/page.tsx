'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { PageHeader, Panel, ScreenSkeleton, Section } from '@/components/ds';
import { CountryCard } from '@/components/abroad/CountryCard';
import { HubBar } from '@/components/abroad/HubBar';
import { TrustNote } from '@/components/abroad/TrustNote';
import { OTHER_COUNTRIES, PRIORITY_COUNTRIES } from '@/lib/content/countries';
import { toggleShortlist } from '@/lib/engine';
import type { Country } from '@/lib/models';
import { cn } from '@/lib/utils';

const REGIONS = ['Asia', 'Europe', 'North America', 'Oceania'] as const;

export default function CountryExplorerPage() {
  const { t } = useLocale();
  const { profile, updateProfile } = useProfile();
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<string>('all');

  const filter = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (list: Country[]) =>
      list.filter((c) => (region === 'all' || c.region === region) && (!q || c.name.toLowerCase().includes(q) || c.capital?.toLowerCase().includes(q) || c.code.toLowerCase() === q));
  }, [query, region]);

  if (!profile) return <ScreenSkeleton />;
  const shortlist = profile.abroad.preferredCountryCodes ?? [];
  const priority = filter(PRIORITY_COUNTRIES);
  const others = filter(OTHER_COUNTRIES);
  const card = (c: Country) => (
    <CountryCard
      key={c.code}
      country={c}
      shortlisted={shortlist.includes(c.code)}
      dream={profile.abroad.dreamCountryCode === c.code}
      onToggleShortlist={() => updateProfile((p) => ({ ...p, abroad: toggleShortlist(p.abroad, c.code) }))}
    />
  );

  return (
    <div className="space-y-6">
      <PageHeader title={t('sa.explorer.title')} subtitle={t('sa.explorer.subtitle')} />
      <HubBar />

      <Panel variant="brand" className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <Compass className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
          <div className="space-y-0.5">
            <p className="font-semibold">{t('sa.explorer.findFit')}</p>
            <p className="text-sm text-muted-foreground">{t('sa.explorer.findFitBody')}</p>
          </div>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/abroad/country-match">
            {t('sa.explorer.findFitCta')} <ArrowRight />
          </Link>
        </Button>
      </Panel>

      <div className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            aria-label={t('sa.explorer.search')}
            placeholder={t('sa.explorer.search')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 rounded-xl bg-card pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={t('abroad.countries.search')}>
          {['all', ...REGIONS].map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={region === r}
              onClick={() => setRegion(r)}
              className={cn(
                'h-9 rounded-full px-3.5 text-sm transition-colors',
                region === r ? 'bg-foreground text-background' : 'bg-muted text-foreground/80 hover:text-foreground',
              )}
            >
              {r === 'all' ? t('sa.explorer.all') : t(`abroad.regions.${r}`)}
            </button>
          ))}
        </div>
      </div>

      {priority.length + others.length === 0 && <p className="px-1 text-muted-foreground">{t('sa.explorer.noMatch', { q: query })}</p>}

      {priority.length > 0 && (
        <Section title={t('sa.explorer.priority')} variant="label" action={<span className="text-xs text-muted-foreground">{t('sa.explorer.count', { n: priority.length })}</span>}>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" data-testid="priority-countries">
            {priority.map(card)}
          </div>
        </Section>
      )}
      {others.length > 0 && (
        <Section title={t('sa.explorer.others')} variant="label" action={<span className="text-xs text-muted-foreground">{t('sa.explorer.count', { n: others.length })}</span>}>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" data-testid="other-countries">
            {others.map(card)}
          </div>
        </Section>
      )}

      <TrustNote />
    </div>
  );
}
