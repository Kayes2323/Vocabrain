'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, CalendarClock, ChevronDown, Compass, FileText, Globe2, Landmark, Plane, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { ListRow, PageHeader, Panel, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { HubBar } from '@/components/abroad/HubBar';
import { JourneyBars, JourneyTimeline, STAGE_TONE } from '@/components/abroad/JourneyTimeline';
import { TrustNote } from '@/components/abroad/TrustNote';
import { countVerifiedDataPoints, getCountry } from '@/lib/content/countries';
import { abroadJourney, formatIntake, hasAbroadGoal, markStage, setDreamCountry, type AbroadStage } from '@/lib/engine';
import { findSection, ABROAD_SECTIONS } from '@/lib/navigation';
import { cn } from '@/lib/utils';

/** Tools shown on the home screen; "Soon" follows the section's status in navigation. */
const TOOLS = [
  { id: 'countries', section: 'countries', icon: Globe2 },
  { id: 'match', section: 'country-match', icon: Compass },
  { id: 'universities', section: 'universities', icon: Building2 },
  { id: 'scholarships', section: 'scholarships', icon: Landmark },
  { id: 'deadlines', section: 'deadlines', icon: CalendarClock },
  { id: 'documents', section: 'documents', icon: FileText },
] as const;

export default function AbroadPage() {
  const { t } = useLocale();
  const { profile, updateProfile } = useProfile();
  const [showStages, setShowStages] = useState(false);
  if (!profile) return <ScreenSkeleton />;

  const { abroad } = profile;
  const journey = abroadJourney(profile);
  const dream = abroad.dreamCountryCode ? getCountry(abroad.dreamCountryCode) : undefined;
  const shortlist = (abroad.preferredCountryCodes ?? []).map(getCountry).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const others = shortlist.filter((c) => c.code !== dream?.code);
  const started = hasAbroadGoal(abroad) || Boolean(dream) || shortlist.length > 0;
  const goalParts = [abroad.degreeLevel ? t(`degree.${abroad.degreeLevel}`) : undefined, abroad.subject, formatIntake(abroad)].filter(Boolean);
  const stageTitle = (s: AbroadStage) => t(`sa.stages.${s.id}.title`);
  const stageAction = (s: AbroadStage) => t(`sa.stages.${s.id}.action`);
  const toggleMark = (s: AbroadStage) =>
    updateProfile((p) => ({ ...p, abroad: markStage(p.abroad, s.id, s.status !== 'done') }));

  return (
    <div className="space-y-6">
      <PageHeader title={t('sa.home.title')} subtitle={t('sa.home.subtitle')} />
      <HubBar />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div className="space-y-6">
          {!started ? (
            <Panel variant="brand" className="space-y-4 p-6" data-testid="abroad-start">
              <p className="text-xs font-semibold tracking-wider text-brand uppercase">{t('sa.home.startEyebrow')}</p>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-balance">{t('sa.home.startTitle')}</h2>
                <p className="text-muted-foreground">{t('sa.home.startBody')}</p>
              </div>
              <Button asChild size="lg" className="h-12 w-full sm:w-auto">
                <Link href="/setup/abroad">
                  {t('sa.home.startCta')} <ArrowRight />
                </Link>
              </Button>
            </Panel>
          ) : (
            <Panel className="space-y-5 p-5 sm:p-6" data-testid="abroad-journey">
              <JourneyBars journey={journey} />
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {journey.complete ? t('sa.status.done') : t('sa.home.stageOf', { n: journey.currentIndex + 1, total: journey.stages.length })}
                </p>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {journey.complete ? t('sa.home.completeTitle') : stageTitle(journey.current)}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {[dream ? `${dream.flag} ${dream.name}` : undefined, ...goalParts].filter(Boolean).join(' · ') || t('sa.home.notSet')}
                </p>
              </div>
              {journey.complete ? (
                <p className="text-sm text-muted-foreground">{t('sa.home.completeBody')}</p>
              ) : (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Button asChild size="lg" className="h-12">
                    <Link href={journey.current.href} data-testid="abroad-continue">
                      {t('sa.home.continue')} <ArrowRight />
                    </Link>
                  </Button>
                  {journey.current.manual && (
                    <Button variant="ghost" size="lg" onClick={() => toggleMark(journey.current)} data-testid="abroad-mark">
                      {t('sa.home.markDone')}
                    </Button>
                  )}
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowStages((v) => !v)}
                aria-expanded={showStages}
                className="flex items-center gap-1.5 text-sm font-medium text-brand"
              >
                {showStages ? t('sa.home.hideStages') : t('sa.home.allStages')}
                <ChevronDown className={cn('size-4 transition-transform', showStages && 'rotate-180')} aria-hidden />
              </button>
              {showStages && (
                <div className="space-y-3 border-t pt-4">
                  <JourneyTimeline journey={journey} />
                  <div className="flex flex-wrap gap-2 pt-1">
                    {journey.stages
                      .filter((s) => s.manual && (s.status === 'done' || s.id === journey.current.id))
                      .map((s) => (
                        <Button key={s.id} size="sm" variant="outline" onClick={() => toggleMark(s)}>
                          {stageTitle(s)}: {s.status === 'done' ? t('sa.home.markNotDone') : t('sa.home.markDone')}
                        </Button>
                      ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{t('sa.home.markHint')}</p>
                </div>
              )}
            </Panel>
          )}

          {started && !journey.complete && (
            <Section title={t('sa.home.nextUp')} variant="label">
              <RowGroup>
                {[
                  ...journey.attention.filter((s) => s.id !== journey.current.id).map((s) => ({ s, label: t('sa.home.attentionTitle') })),
                  { s: journey.current, label: t('sa.home.now') },
                  ...(journey.next ? [{ s: journey.next, label: t('sa.home.after') }] : []),
                ].map(({ s, label }) => (
                  <ListRow
                    key={`${label}-${s.id}`}
                    href={s.href}
                    icon={s.status === 'attention' ? CalendarClock : s.id === journey.current.id ? ArrowRight : Star}
                    iconTone={STAGE_TONE[s.status] === 'neutral' && s.id === journey.current.id ? 'brand' : STAGE_TONE[s.status]}
                    title={stageAction(s)}
                    description={s.attention ? t(s.attention.key, s.attention.params) : `${label} · ${stageTitle(s)}`}
                    trailing={s.status === 'upcoming' ? undefined : <StatusChip tone={STAGE_TONE[s.status]}>{t(`sa.status.${s.status}`)}</StatusChip>}
                  />
                ))}
              </RowGroup>
            </Section>
          )}

          <Section title={t('sa.home.tools')} variant="label">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {TOOLS.map((tool) => {
                const section = findSection(ABROAD_SECTIONS, tool.section);
                const soon = section?.status !== 'available';
                return (
                  <Link
                    key={tool.id}
                    href={section?.href ?? '/abroad'}
                    className="flex min-h-[4.75rem] flex-col justify-between gap-2 rounded-2xl border bg-card p-3.5 transition-colors hover:border-foreground/20"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <tool.icon className={cn('size-5', soon ? 'text-muted-foreground' : 'text-brand')} aria-hidden />
                      {soon && <span className="text-[11px] text-muted-foreground">{t('sa.tools.soon')}</span>}
                    </span>
                    <span className="text-sm font-medium">{t(`sa.tools.${tool.id}`)}</span>
                  </Link>
                );
              })}
            </div>
          </Section>
        </div>

        <div className="space-y-6">
          <Section title={t('sa.home.dreamCountry')} variant="label">
            {dream ? (
              <Panel className="flex items-center gap-3.5 p-4" data-testid="abroad-dream">
                <span className="text-3xl leading-none" aria-hidden>{dream.flag}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{dream.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {countVerifiedDataPoints(dream) > 0 ? t('sa.home.verified', { n: countVerifiedDataPoints(dream) }) : t('sa.home.noVerified')}
                  </p>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/abroad/countries">{t('sa.home.change')}</Link>
                </Button>
              </Panel>
            ) : (
              <Panel variant="muted" className="space-y-3 p-4">
                <p className="font-medium">{t('sa.home.chooseDreamTitle')}</p>
                <p className="text-sm text-muted-foreground">{t('sa.home.chooseDreamBody')}</p>
                {others.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {others.slice(0, 3).map((c) => (
                      <Button
                        key={c.code}
                        variant="outline"
                        className="justify-start"
                        onClick={() => updateProfile((p) => ({ ...p, abroad: setDreamCountry(p.abroad, c.code) }))}
                      >
                        <span aria-hidden>{c.flag}</span> {t('sa.home.makeDream', { country: c.name })}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Button asChild variant="outline">
                    <Link href="/abroad/countries">
                      {t('sa.home.explore')} <ArrowRight />
                    </Link>
                  </Button>
                )}
              </Panel>
            )}
          </Section>

          {dream && (
            <Section title={t('sa.home.shortlist')} variant="label" action={<Link href="/abroad/countries" className="text-sm font-medium text-brand">{t('sa.home.explore')}</Link>}>
              {others.length > 0 ? (
                <div className="flex flex-wrap gap-2" data-testid="abroad-shortlist">
                  {others.map((c) => (
                    <span key={c.code} className="inline-flex h-9 items-center gap-1.5 rounded-full border bg-card px-3 text-sm">
                      <span aria-hidden>{c.flag}</span> {c.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t('sa.home.shortlistEmpty')}</p>
              )}
            </Section>
          )}

          <Link
            href="/mino?ask=abroad-next"
            className="flex items-center gap-3 rounded-2xl bg-brand-soft px-4 py-3.5 text-brand transition-colors hover:bg-brand-soft/70"
            data-testid="abroad-ask-mino"
          >
            <Sparkles className="size-5 shrink-0" aria-hidden />
            <span className="flex-1 text-[15px] font-medium">{t('sa.home.askMino')}</span>
            <ArrowRight className="size-4" aria-hidden />
          </Link>

          {started && (
            <RowGroup>
              <ListRow href="/setup/abroad" icon={Plane} title={t('sa.home.editGoal')} description={goalParts.join(' · ') || t('sa.home.notSet')} />
            </RowGroup>
          )}
          <TrustNote />
        </div>
      </div>
    </div>
  );
}
