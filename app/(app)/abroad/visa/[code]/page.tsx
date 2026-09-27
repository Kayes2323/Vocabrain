'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Map, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, PageHeader, Panel, ScreenSkeleton } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { HubBar } from '@/components/abroad/HubBar';
import { SectionCard } from '@/components/abroad/SectionCard';
import { PathwayPicker } from '@/components/abroad/PathwayPicker';
import { WorkCheck } from '@/components/abroad/WorkCheck';
import { countryPathways, pathwayContext, selectedPathway, visaCategoriesFor } from '@/lib/abroad/pathways';
import { cn } from '@/lib/utils';
import { countryHref } from '@/lib/abroad/countries';
import { visaParts } from '@/lib/abroad/visa';
import { getCountry } from '@/lib/content/countries';

/** One country's student visa in 12 parts: official facts only, Mino explains, the roadmap acts. */
export default function CountryVisaPage() {
  const { code } = useParams<{ code: string }>();
  const country = getCountry(code ?? '');
  const { t } = useLocale();
  const { profile } = useProfile();
  const [open, setOpen] = useState<string | null>(null);
  const [pickedCategory, setPickedCategory] = useState<string | null>(null);

  if (!country)
    return (
      <div className="space-y-4 py-10 text-center" data-testid="hub-not-found">
        <p className="text-lg font-semibold">{t('sa.hub.notFound')}</p>
        <Button asChild variant="outline">
          <Link href="/abroad/visa">{t('sa.visa.title')}</Link>
        </Button>
      </div>
    );
  if (!profile) return <ScreenSkeleton />;

  const hasPathways = countryPathways(country).length > 0;
  const pathway = selectedPathway(profile.abroad, country);
  const categories = visaCategoriesFor(country, pathway?.id);
  const category = categories.find((c) => c.id === pickedCategory) ?? (pathway || categories.length === 1 ? categories[0] : undefined);
  // The student's degree hides facts for other degrees (e.g. D-2 subtypes, stay limits).
  const parts = visaParts(country, undefined, category?.id, pathwayContext(profile.abroad, country));
  const withFacts = parts.filter((p) => p.status !== 'not-yet').length;
  const openId = open ?? parts.find((p) => p.status !== 'not-yet')?.id ?? parts[0].id;
  const isDream = profile.abroad.dreamCountryCode === country.code;
  const lower = country.code.toLowerCase();

  return (
    <div className="space-y-5">
      <PageHeader title={t('sa.visa.countryTitle', { country: country.name })} subtitle={t('sa.visa.summary', { n: withFacts, total: parts.length })} backHref="/abroad/visa" backLabel={t('sa.visa.title')} className="mb-0" />
      <HubBar />
      <Callout icon={ShieldAlert} tone="warning">{t('sa.visa.warning')}</Callout>
      {hasPathways && <PathwayPicker country={country} />}
      {categories.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{t('sa.visa.category')}</p>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label={t('sa.visa.category')} data-testid="visa-categories">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={category?.id === c.id}
                data-category={c.code}
                onClick={() => {
                  setPickedCategory(c.id);
                  setOpen(null);
                }}
                className={cn('h-9 rounded-full px-3.5 text-sm font-medium', category?.id === c.id ? 'bg-foreground text-background' : 'border')}
              >
                {c.code}
              </button>
            ))}
          </div>
          {hasPathways && !pathway && <p className="text-sm text-muted-foreground">{t('sa.visa.pickPathway')}</p>}
        </div>
      )}
      <Panel className="px-4 py-0" data-testid="visa-parts" data-category={category?.code ?? ''}>
        {parts.map((p) => {
          const title = t(`sa.visa.parts.${p.id}`);
          return (
            <SectionCard
              key={p.id}
              section={p}
              title={title}
              reviewAs="visa"
              open={openId === p.id}
              onToggle={() => setOpen(openId === p.id ? '' : p.id)}
              askHref={`/mino?${new URLSearchParams({ ask: 'abroad-visa', country: lower, part: p.id, ...(category ? { category: category.code } : {}) })}`}
            />
          );
        })}
      </Panel>
      <WorkCheck country={country} pathway={pathway?.id} visaCategory={category?.id} />
      {isDream && (
        <Button asChild size="lg" className="h-12 w-full sm:w-auto">
          <Link href={`${countryHref(country.code)}/roadmap`}>
            <Map /> {t('sa.visa.roadmap')}
          </Link>
        </Button>
      )}
    </div>
  );
}
