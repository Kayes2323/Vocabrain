'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, Panel, ProgressBar, ScreenSkeleton } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { RoadmapStepItem } from '@/components/abroad/RoadmapStepItem';
import { countryHref } from '@/lib/abroad/countries';
import { getCountry } from '@/lib/content/countries';
import { countryRoadmap, markStep, setDreamCountry, setStepDue, studentRouteContext, type RoadmapStep } from '@/lib/engine';
import { documentsFor, stepDocuments } from '@/lib/abroad/documents';

/**
 * A country roadmap: the 16 steps from goal to travel, with the student's own
 * ticks and target dates. Statuses are computed; only ticks and dates are saved.
 */
export default function CountryRoadmapPage() {
  const { code } = useParams<{ code: string }>();
  const country = getCountry(code ?? '');
  const { t } = useLocale();
  const { profile, updateProfile } = useProfile();
  const [open, setOpen] = useState<string | null>(null);
  const [showDone, setShowDone] = useState(false);

  if (!country)
    return (
      <div className="space-y-4 py-10 text-center" data-testid="hub-not-found">
        <p className="text-lg font-semibold">{t('sa.hub.notFound')}</p>
        <Button asChild variant="outline">
          <Link href="/abroad/countries">{t('sa.hub.back')}</Link>
        </Button>
      </div>
    );
  if (!profile) return <ScreenSkeleton />;

  const roadmap = countryRoadmap(profile, country.code);
  const docsByStep = stepDocuments(roadmap.steps, documentsFor(country, studentRouteContext(profile.abroad, country.code)));
  const dream = profile.abroad.dreamCountryCode ? getCountry(profile.abroad.dreamCountryCode) : undefined;
  const openId = open ?? roadmap.current?.id ?? null;
  const doneSteps = roadmap.steps.filter((s) => s.status === 'done' && !s.current);
  const visible = roadmap.active && !showDone ? roadmap.steps.filter((s) => s.status !== 'done') : roadmap.steps;

  const update = (fn: Parameters<typeof updateProfile>[0]) => updateProfile(fn);
  const toggle = (s: RoadmapStep) => update((p) => ({ ...p, abroad: markStep(p.abroad, country.code, s.id, s.status !== 'done') }));
  const setDue = (s: RoadmapStep, date: string) => update((p) => ({ ...p, abroad: setStepDue(p.abroad, country.code, s.id, date || undefined) }));

  return (
    <div className="space-y-5">
      <PageHeader
        title={t('sa.roadmap.title', { country: country.name })}
        backHref={countryHref(country.code)}
        backLabel={country.name}
        subtitle={
          <span className="flex items-center gap-2">
            <span aria-hidden>{country.flag}</span>
            {t('sa.roadmap.progress', { done: roadmap.done, total: roadmap.total })}
          </span>
        }
        className="mb-0"
      />
      <ProgressBar value={roadmap.percent} label={t('sa.roadmap.progress', { done: roadmap.done, total: roadmap.total })} tone="success" />

      {!roadmap.active && (
        <Panel className="space-y-3" data-testid="roadmap-inactive">
          <p className="font-semibold">{t('sa.roadmap.notActiveTitle', { country: country.name })}</p>
          <p className="text-sm text-muted-foreground">{t('sa.roadmap.notActiveBody', { country: country.name })}</p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => update((p) => ({ ...p, abroad: setDreamCountry(p.abroad, country.code) }))}>
              <Star /> {t('sa.roadmap.makeDream', { country: country.name })}
            </Button>
            {dream && (
              <Button asChild variant="outline">
                <Link href={`${countryHref(dream.code)}/roadmap`}>{t('sa.roadmap.openDream', { country: dream.name })}</Link>
              </Button>
            )}
          </div>
        </Panel>
      )}

      {roadmap.active && !roadmap.current && <Panel className="text-sm">{t('sa.roadmap.allDone')}</Panel>}

      {roadmap.active && doneSteps.length > 0 && (
        <button type="button" className="text-sm font-medium text-brand" onClick={() => setShowDone((v) => !v)} aria-expanded={showDone}>
          {showDone ? t('sa.roadmap.hideDone') : t('sa.roadmap.showDone', { n: doneSteps.length })}
        </button>
      )}

      <ol className="space-y-2" data-testid="roadmap-steps">
        {visible.map((s) => (
          <RoadmapStepItem
            key={s.id}
            step={s}
            index={roadmap.steps.indexOf(s) + 1}
            country={country}
            abroad={profile.abroad}
            docs={docsByStep[s.id]}
            active={roadmap.active}
            open={openId === s.id}
            onOpen={() => setOpen(openId === s.id ? '' : s.id)}
            onToggle={() => toggle(s)}
            onDue={(date) => setDue(s, date)}
          />
        ))}
      </ol>
      <p className="text-xs text-muted-foreground">{t('sa.roadmap.general', { country: country.name })}</p>
    </div>
  );
}
