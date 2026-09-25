'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { PageHeader, RowGroup, Section, StatusChip } from '@/components/ds';
import { TrustNote } from '@/components/abroad/TrustNote';
import { COUNTRIES, countVerifiedDataPoints } from '@/lib/content/countries';
import type { Country } from '@/lib/models';

export default function CountryExplorerPage() {
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
    <div className="space-y-6">
      <PageHeader
        title="Country Explorer"
        subtitle={`${COUNTRIES.length} destinations. Verified country profiles are being added.`}
        backHref="/abroad"
        backLabel="Study Abroad"
      />

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          type="search"
          aria-label="Search countries"
          placeholder="Search countries"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11 rounded-xl bg-card pl-10"
        />
      </div>

      {regions.length === 0 && <p className="px-1 text-muted-foreground">No countries match &ldquo;{query}&rdquo;.</p>}

      {regions.map((region) => (
        <Section key={region} title={region}>
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
                    <StatusChip tone="success">{points} verified facts</StatusChip>
                  ) : (
                    <StatusChip>Profile coming</StatusChip>
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
