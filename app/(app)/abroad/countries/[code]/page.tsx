'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, Check, Map, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, ScreenSkeleton, StatusChip } from '@/components/ds';
import { STAGE_TONE } from '@/components/abroad/JourneyTimeline';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { CountryImage } from '@/components/abroad/CountryCard';
import { SectionCard, type SectionAction } from '@/components/abroad/SectionCard';
import { PathwayPicker } from '@/components/abroad/PathwayPicker';
import { StudyOptions } from '@/components/abroad/StudyOptions';
import { pathwayContext } from '@/lib/abroad/pathways';
import { useBilingual } from '@/components/abroad/useBilingual';
import { countryHref } from '@/lib/abroad/countries';
import { actionHref, countrySections, HUB_TABS, SECTION_DEFS, tabProgress, type HubTab, type ResolvedSection } from '@/lib/abroad/sections';
import { getCountry } from '@/lib/content/countries';
import { abroadJourney, APPLY_STAGES, countryRoadmap, markStage, markStep, setDreamCountry, stepsForStages, toggleShortlist } from '@/lib/engine';
import { cn } from '@/lib/utils';

function CountryHub() {
  const { code } = useParams<{ code: string }>();
  const country = getCountry(code ?? '');
  const { t } = useLocale();
  const text = useBilingual();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { profile, updateProfile } = useProfile();
  const tabParam = params.get('tab') as HubTab | null;
  const tab: HubTab = tabParam && (HUB_TABS as readonly string[]).includes(tabParam) ? tabParam : 'overview';
  const ctxKey = profile && country ? JSON.stringify(pathwayContext(profile.abroad, country)) : '';
  const sections = useMemo(() => (country ? countrySections(country, new Date(), ctxKey ? JSON.parse(ctxKey) : undefined) : []), [country, ctxKey]);
  const [open, setOpen] = useState<string | null>(null);

  if (!country)
    return (
      <div className="space-y-4 py-10 text-center" data-testid="hub-not-found">
        <p className="text-lg font-semibold">{t('sa.hub.notFound')}</p>
        <Button asChild variant="outline">
          <Link href="/abroad/countries">
            <ArrowLeft /> {t('sa.hub.back')}
          </Link>
        </Button>
      </div>
    );
  if (!profile) return <ScreenSkeleton />;

  const a = profile.abroad;
  const isDream = a.dreamCountryCode === country.code;
  const shortlisted = (a.preferredCountryCodes ?? []).includes(country.code);
  const journey = abroadJourney(profile);
  const roadmap = countryRoadmap(profile, country.code);
  const eligibilityDone = isDream && journey.stages.find((s) => s.id === 'eligibility')?.status === 'done';
  const lower = country.code.toLowerCase();
  const list = sections.filter((s) => s.tab === tab);
  const progress = tabProgress(sections, tab);
  const openId = open ?? list[0]?.id ?? null;

  const setTab = (next: HubTab) => {
    setOpen(null);
    router.replace(`${pathname}?tab=${next}`, { scroll: false });
  };
  const buildPlan = () => {
    updateProfile((p) => ({ ...p, abroad: setDreamCountry(p.abroad, country.code) }));
    router.push(`${countryHref(country.code)}/roadmap`);
  };
  const actionFor = (s: ResolvedSection): SectionAction | undefined => {
    const def = SECTION_DEFS[s.id].action;
    if (!def) return undefined;
    if (def.href === 'mark:eligibility') {
      if (!isDream) return { label: t('sa.hub.buildPlan', { country: country.name }), onClick: buildPlan };
      return {
        label: eligibilityDone ? t('sa.actions.eligibilityDone') : t('sa.actions.eligibility'),
        done: eligibilityDone,
        onClick: () => updateProfile((p) => ({ ...p, abroad: markStage(p.abroad, 'eligibility', !eligibilityDone) })),
      };
    }
    return { label: t(`sa.actions.${def.id}`, { country: country.name }), href: actionHref(def.href, country.code) };
  };

  return (
    <div className="space-y-5">
      <div className="relative -mx-4 -mt-4 overflow-hidden sm:mx-0 sm:mt-0 sm:rounded-3xl">
        <CountryImage country={country} priority className="h-56 sm:h-72" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden />
        <Link
          href="/abroad/countries"
          className="absolute top-3 left-3 inline-flex h-9 items-center gap-1.5 rounded-full bg-black/35 px-3 text-sm text-white backdrop-blur-sm sm:top-4 sm:left-4"
        >
          <ArrowLeft className="size-4" aria-hidden /> {t('sa.hub.back')}
        </Link>
        <div className="absolute inset-x-4 bottom-7 space-y-1 text-white sm:inset-x-6 sm:bottom-8">
          <p className="text-sm text-white/85">
            {t(`abroad.regions.${country.region}`)}
            {country.capital ? ` · ${country.capital}` : ''}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{country.name}</h1>
          <p className="max-w-xl text-sm text-white/90">{country.tagline ? text(country.tagline) : t('sa.hub.overviewComing')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="min-w-0 space-y-5">
          <StudyOptions country={country} />
          <Link
            href={`/mino?${new URLSearchParams({ ask: 'abroad-fit', country: lower })}`}
            className="block rounded-2xl border bg-card p-4 transition-colors hover:border-foreground/20"
            data-testid="hub-fit"
          >
            <p className="flex items-center gap-2 font-semibold">
              <Sparkles className="size-4 text-brand" aria-hidden /> {t('sa.hub.fitTitle', { country: country.name })}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{t('sa.hub.fitBody')}</p>
          </Link>
          <PathwayPicker country={country} />
          <div className="flex gap-2">
            {isDream ? (
              <Button asChild size="lg" className="h-12 flex-1">
                <Link href={`${countryHref(country.code)}/roadmap`}>
                  <Map /> {t('sa.actions.roadmap')}
                </Link>
              </Button>
            ) : (
              <Button size="lg" className="h-12 flex-1" onClick={buildPlan} data-testid="hub-build-plan">
                {t('sa.hub.buildPlan', { country: country.name })} <ArrowRight />
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className="h-12"
              aria-pressed={shortlisted}
              onClick={() => updateProfile((p) => ({ ...p, abroad: toggleShortlist(p.abroad, country.code) }))}
            >
              {shortlisted ? <BookmarkCheck /> : <Bookmark />}
              <span className="sr-only sm:not-sr-only">{shortlisted ? t('sa.card.shortlisted') : t('sa.card.shortlist')}</span>
            </Button>
          </div>
          {isDream && (
            <p className="flex items-center gap-1.5 text-sm font-medium text-brand">
              <Star className="size-4" aria-hidden /> {t('sa.hub.isDream')}
            </p>
          )}

          <nav aria-label={t('sa.tabs.label')} className="sticky top-0 z-10 -mx-4 border-b bg-background/95 px-4 backdrop-blur sm:mx-0 sm:px-0">
            <div className="flex gap-1 overflow-x-auto" role="tablist">
              {HUB_TABS.map((id) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={cn(
                    'h-11 shrink-0 border-b-2 px-3 text-sm whitespace-nowrap transition-colors',
                    tab === id ? 'border-brand font-semibold text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t(`sa.tabs.${id}`)}
                </button>
              ))}
            </div>
          </nav>

          {tab !== 'roadmap' && <p className="text-xs text-muted-foreground">{t('sa.hub.tabSummary', { n: progress.withFacts, total: progress.total })}</p>}

          <Panel className="px-4 py-0" role="tabpanel" data-testid="hub-sections">
            {list.map((s) => (
              <SectionCard
                key={s.id}
                section={s}
                open={openId === s.id}
                onToggle={() => setOpen(openId === s.id ? '' : s.id)}
                action={actionFor(s)}
              />
            ))}
          </Panel>

          {tab === 'apply' && isDream && (
            <Panel className="space-y-3" data-testid="apply-steps">
              <div className="space-y-0.5">
                <h2 className="font-semibold">{t('sa.applySteps.title')}</h2>
                <p className="text-xs text-muted-foreground">{t('sa.applySteps.body')}</p>
              </div>
              <ul className="divide-y">
                {stepsForStages(roadmap, APPLY_STAGES).map((st) => (
                  <li key={st.id} className="flex min-h-12 items-center gap-3 py-2" data-apply-step={st.id} data-status={st.status}>
                    <button
                      type="button"
                      disabled={st.auto}
                      aria-pressed={st.status === 'done'}
                      aria-label={text(st.title)}
                      onClick={() => updateProfile((p) => ({ ...p, abroad: markStep(p.abroad, country.code, st.id, st.status !== 'done') }))}
                      className={cn(
                        'grid size-6 shrink-0 place-items-center rounded-md border',
                        st.status === 'done' && 'border-success bg-success text-white',
                        st.auto && 'opacity-60',
                      )}
                    >
                      {st.status === 'done' && <Check className="size-4" aria-hidden />}
                    </button>
                    <span className={cn('min-w-0 flex-1 text-sm', st.status === 'done' && 'text-muted-foreground line-through')}>{text(st.title)}</span>
                    {st.status !== 'done' && st.status !== 'upcoming' && <StatusChip tone={STAGE_TONE[st.status]}>{t(`sa.status.${st.status}`)}</StatusChip>}
                  </li>
                ))}
              </ul>
              <Link href={`${countryHref(country.code)}/roadmap`} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                {t('sa.applySteps.open')} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Panel>
          )}

          {tab === 'roadmap' && (
            <Panel className="space-y-3" data-testid="hub-roadmap">
              <p className="text-sm text-muted-foreground">
                {isDream ? t('sa.hub.roadmapIntro', { country: country.name }) : t('sa.hub.roadmapNotDream', { country: country.name })}
              </p>
              {isDream && roadmap.current && (
                <p className="text-sm font-medium">{t('sa.roadmap.summary', { done: roadmap.done, total: roadmap.total, step: text(roadmap.current.title) })}</p>
              )}
              {isDream ? (
                <Button asChild>
                  <Link href={`${countryHref(country.code)}/roadmap`}>
                    <Map /> {t('sa.actions.roadmap')}
                  </Link>
                </Button>
              ) : (
                <Button onClick={buildPlan}>
                  {t('sa.hub.buildPlan', { country: country.name })} <ArrowRight />
                </Button>
              )}
            </Panel>
          )}
        </div>

        <aside className="hidden space-y-3 lg:block">
          {HUB_TABS.filter((x) => x !== 'roadmap').map((x) => {
            const p = tabProgress(sections, x);
            return (
              <button
                key={x}
                type="button"
                onClick={() => setTab(x)}
                className={cn('flex w-full items-center justify-between rounded-xl border bg-card px-4 py-3 text-left text-sm', tab === x && 'border-brand/40')}
              >
                <span className="font-medium">{t(`sa.tabs.${x}`)}</span>
                <span className="text-xs text-muted-foreground">
                  {p.withFacts}/{p.total}
                </span>
              </button>
            );
          })}
        </aside>
      </div>
    </div>
  );
}

export default function CountryHubPage() {
  return (
    <Suspense fallback={<ScreenSkeleton />}>
      <CountryHub />
    </Suspense>
  );
}
