'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLocale } from '@/components/providers/LocaleProvider';
import { PageHeader, RowGroup, Section, StatusChip } from '@/components/ds';
import { TrustNote } from '@/components/abroad/TrustNote';
import { COUNTRIES, countVerifiedDataPoints } from '@/lib/content/countries';
import type { Country } from '@/lib/models';

export default function CountryExplorerPage() {
  const { t } = useLocale();
  const [query, setQuery] = useState('');

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = COUNTRIES.filter((c) => c.name.toLowerCase().includes(q)).sort((a, b) => a.name.localeCompare(b.name));
    return matches.reduce<Record<string, Country[]>>((acc, c) => {
      (acc[c.region] ??= []).push(c);
      return acc;
    }, {});
  }, [query]);

  const regions = Object.keys(grouped).sort();

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader
        title={t('sections.countries.title')}
        subtitle={t('abroad.countries.subtitle', { n: COUNTRIES.length })}
        backHref="/abroad"
        backLabel={t('nav.abroad')}
      />

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          type="search"
          aria-label={t('abroad.countries.search')}
          placeholder={t('abroad.countries.search')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11 rounded-xl bg-card pl-10"
        />
      </div>

      {regions.length === 0 && <p className="px-1 text-muted-foreground">{t('abroad.countries.noMatch', { q: query })}</p>}

      {regions.map((region) => (
        <Section key={region} title={t(`abroad.regions.${region}`)}>
          <RowGroup>
            {grouped[region].map((country) => {
              const points = countVerifiedDataPoints(country);
              return (
                <div key={country.code} className="flex min-h-14 items-center gap-3.5 px-4 py-3">
                  <span className="text-2xl leading-none" aria-hidden>
                    {country.flag}
                  </span>
                  <span className="flex-1 font-medium">{country.name}</span>
                  {points > 0 ? (
                    <StatusChip tone="success">{t('abroad.countries.verifiedFacts', { n: points })}</StatusChip>
                  ) : (
                    <StatusChip>{t('abroad.countries.profileComing')}</StatusChip>
                  )}
                </div>
              );
            })}
          </RowGroup>
        </Section>
      ))}

      <TrustNote />
    </div>
  );
}
