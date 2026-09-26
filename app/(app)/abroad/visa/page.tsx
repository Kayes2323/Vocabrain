'use client';

import Link from 'next/link';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { Callout, PageHeader, Panel, ScreenSkeleton, Section } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { HubBar } from '@/components/abroad/HubBar';
import { visaParts } from '@/lib/abroad/visa';
import { COUNTRIES, getCountry } from '@/lib/content/countries';
import type { Country } from '@/lib/models';

/** Visa centre: the dream country's visa first, every other country one tap away. */
export default function VisaIndexPage() {
  const { t } = useLocale();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;
  const dream = profile.abroad.dreamCountryCode ? getCountry(profile.abroad.dreamCountryCode) : undefined;
  const row = (c: Country) => {
    const n = visaParts(c).filter((p) => p.status !== 'not-yet').length;
    return (
      <Link key={c.code} href={`/abroad/visa/${c.code.toLowerCase()}`} className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3.5 hover:border-foreground/20" data-visa-country={c.code}>
        <span className="text-2xl leading-none" aria-hidden>
          {c.flag}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">{c.name}</span>
          <span className="block text-xs text-muted-foreground">{t('sa.visa.summary', { n })}</span>
        </span>
        <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
      </Link>
    );
  };
  return (
    <div className="space-y-6">
      <PageHeader title={t('sa.visa.title')} subtitle={t('sa.visa.subtitle')} />
      <HubBar />
      <Callout icon={ShieldAlert} tone="warning">{t('sa.visa.warning')}</Callout>
      {dream && (
        <Section title={t('sa.visa.yourDream')} variant="label">
          <Panel className="p-0">{row(dream)}</Panel>
        </Section>
      )}
      <Section title={t('sa.visa.others')} variant="label">
        <div className="grid gap-2 sm:grid-cols-2">{COUNTRIES.filter((c) => c.code !== dream?.code).map(row)}</div>
      </Section>
    </div>
  );
}
