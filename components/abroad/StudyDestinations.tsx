'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { CountryCard } from '@/components/abroad/CountryCard';
import { OTHER_COUNTRIES, PRIORITY_COUNTRIES } from '@/lib/content/countries';
import { toggleShortlist } from '@/lib/engine';
import type { Country } from '@/lib/models';
import { cn } from '@/lib/utils';

const REGIONS = ['Asia', 'Europe', 'North America', 'Oceania'] as const;

/**
 * "Study Destinations": the country cards, in the curated order (an editorial
 * order, never a ranking), with a small region filter and search. Used on the
 * Study Abroad landing and on /abroad/countries.
 */
export function StudyDestinations({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const { t } = useLocale();
  const { profile, updateProfile } = useProfile();
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<string>('all');

  const filter = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (list: Country[]) =>
      list.filter((c) => (region === 'all' || c.region === region) && (!q || c.name.toLowerCase().includes(q) || c.capital?.toLowerCase().includes(q) || c.code.toLowerCase() === q));
  }, [query, region]);

  if (!profile) return null;
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
  const Heading = headingLevel;
  const grid = 'grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3';

  return (
    <section className="space-y-5" aria-labelledby="destinations-title" id="destinations" data-testid="study-destinations">
      <div className="space-y-1">
        <Heading id="destinations-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {t('sa.landing.destinationsTitle')}
        </Heading>
        <p className="text-[15px] text-muted-foreground">{t('sa.landing.destinationsBody')}</p>
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            aria-label={t('sa.explorer.search')}
            placeholder={t('sa.explorer.search')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-10 rounded-full bg-card pl-10"
          />
        </div>
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label={t('abroad.countries.search')}>
          <div className="flex w-max gap-1.5">
            {['all', ...REGIONS].map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={region === r}
                onClick={() => setRegion(r)}
                className={cn(
                  'h-9 rounded-full px-3.5 text-sm whitespace-nowrap transition-colors',
                  region === r ? 'bg-foreground text-background' : 'bg-muted text-foreground/80 hover:text-foreground',
                )}
              >
                {r === 'all' ? t('sa.explorer.all') : t(`abroad.regions.${r}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {priority.length + others.length === 0 && <p className="px-1 text-muted-foreground">{t('sa.explorer.noMatch', { q: query })}</p>}

      {priority.length > 0 && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 px-1">
            <h3 className="text-sm font-semibold">{t('sa.landing.popular')}</h3>
            <p className="text-xs text-muted-foreground">{t('sa.landing.popularNote')}</p>
          </div>
          <div className={grid} data-testid="priority-countries">
            {priority.map(card)}
          </div>
        </div>
      )}
      {others.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="px-1 text-sm font-semibold">{t('sa.landing.more')}</h3>
          <div className={grid} data-testid="other-countries">
            {others.map(card)}
          </div>
        </div>
      )}
    </section>
  );
}
