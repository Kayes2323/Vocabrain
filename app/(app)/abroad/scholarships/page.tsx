'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { Bookmark, BookmarkCheck, CalendarPlus, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, Panel, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { CountrySelect, useCountryParam } from '@/components/abroad/CountrySelect';
import { FactRow, useFormatDate } from '@/components/abroad/FactRow';
import { HubBar } from '@/components/abroad/HubBar';
import { TrustNote } from '@/components/abroad/TrustNote';
import { countrySections } from '@/lib/abroad/sections';
import { scholarshipStatus, type ScholarshipStatus } from '@/lib/abroad/status';
import { getCountry } from '@/lib/content/countries';
import { scholarshipsFor } from '@/lib/content/scholarships';
import { toggleSavedScholarship } from '@/lib/engine';
import type { ScholarshipFunding } from '@/lib/models';
import { cn } from '@/lib/utils';

const STATUS_TONE: Record<ScholarshipStatus, 'success' | 'brand' | 'neutral' | 'warning'> = {
  open: 'success',
  'opening-soon': 'brand',
  closed: 'neutral',
  'deadline-passed': 'neutral',
  unknown: 'warning',
};

function Scholarships() {
  const { t } = useLocale();
  const date = useFormatDate();
  const { profile, updateProfile } = useProfile();
  const [code, setCode] = useCountryParam(profile?.abroad);
  const [funding, setFunding] = useState<'all' | ScholarshipFunding>('all');

  if (!profile) return <ScreenSkeleton />;
  const a = profile.abroad;
  const country = code === 'all' ? undefined : getCountry(code);
  const official = country ? countrySections(country).find((s) => s.id === 'scholarships') : undefined;
  const list = scholarshipsFor(country?.code).filter(
    (s) => (funding === 'all' || s.funding === funding) && (!a.degreeLevel || s.degreeLevels.includes(a.degreeLevel)),
  );
  const saved = a.savedScholarships ?? [];

  return (
    <div className="space-y-6">
      <PageHeader title={t('sa.schol.title')} subtitle={t('sa.schol.subtitle')} />
      <HubBar />
      <CountrySelect value={code} onChange={setCode} abroad={a} />

      {country && (
        <Section title={t('sa.schol.official', { country: country.name })}>
          <Panel data-testid="schol-official">
            {official?.facts.length ? (
              <div className="divide-y">
                {official.facts.map((f, i) => (
                  <FactRow key={i} item={f} sectionId="scholarships" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t('sa.schol.officialEmpty', { country: country.name })}</p>
            )}
          </Panel>
        </Section>
      )}

      <Section title={t('sa.schol.list')}>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={t('sa.schol.list')}>
          {(['all', 'full', 'partial'] as const).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={funding === f}
              onClick={() => setFunding(f)}
              className={cn('h-9 rounded-full px-3.5 text-sm', funding === f ? 'bg-foreground text-background' : 'border')}
            >
              {t(`sa.schol.funding.${f}`)}
            </button>
          ))}
        </div>
        {list.length === 0 ? (
          <Panel className="text-sm text-muted-foreground" data-testid="schol-empty">
            {t('sa.schol.listEmpty')}
          </Panel>
        ) : (
          <ul className="space-y-2">
            {list.map((s) => {
              const status = scholarshipStatus(s);
              const isSaved = saved.includes(s.id);
              return (
                <li key={s.id} className="space-y-2 rounded-2xl border bg-card p-4" data-scholarship={s.id} data-status={status}>
                  <div className="flex items-start gap-3">
                    <p className="min-w-0 flex-1 font-semibold">{s.name}</p>
                    <StatusChip tone={STATUS_TONE[status]}>{t(`sa.schol.statuses.${status}`)}</StatusChip>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t(`sa.schol.funding.${s.funding}`)}
                    {s.deadline ? ` · ${t('sa.schol.deadline', { date: date(s.deadline.value) })}` : ''}
                    {status === 'opening-soon' && s.opensAt ? ` · ${t('sa.schol.opens', { date: date(s.opensAt.value) })}` : ''}
                  </p>
                  <p className="text-sm">{s.eligibility.value}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="outline">
                      <a href={s.officialUrl} target="_blank" rel="noopener noreferrer">
                        {t('sa.schol.apply')} <ExternalLink />
                      </a>
                    </Button>
                    <Button size="sm" variant="ghost" aria-pressed={isSaved} onClick={() => updateProfile((p) => ({ ...p, abroad: toggleSavedScholarship(p.abroad, s.id) }))}>
                      {isSaved ? <BookmarkCheck /> : <Bookmark />} {isSaved ? t('sa.schol.saved') : t('sa.schol.save')}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      <div className="grid gap-2 sm:grid-cols-2">
        <Link href="/abroad/deadlines?add=scholarship" className="flex items-center gap-2 rounded-2xl border bg-card px-4 py-3.5 text-sm font-medium">
          <CalendarPlus className="size-4 text-brand" aria-hidden /> {t('sa.schol.addDate')}
        </Link>
        <Link
          href={country ? `/mino?${new URLSearchParams({ ask: 'abroad-section', country: country.code.toLowerCase(), section: 'scholarships' })}` : '/mino?ask=abroad-next'}
          className="flex items-center gap-2 rounded-2xl bg-brand-soft px-4 py-3.5 text-sm font-medium text-brand"
        >
          <Sparkles className="size-4" aria-hidden /> {t('sa.schol.ask')}
        </Link>
      </div>
      <TrustNote />
    </div>
  );
}

export default function ScholarshipsPage() {
  return (
    <Suspense fallback={<ScreenSkeleton />}>
      <Scholarships />
    </Suspense>
  );
}
