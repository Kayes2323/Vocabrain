'use client';

import Link from 'next/link';
import { AlertTriangle, ArrowRight, CalendarClock, ChevronRight, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { ListRow, PageHeader, Panel, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { HubBar } from '@/components/abroad/HubBar';
import { PHASE_TONE, PhaseStepper } from '@/components/abroad/PhaseStepper';
import { TrustNote } from '@/components/abroad/TrustNote';
import { useBilingual } from '@/components/abroad/useBilingual';
import { countVerifiedDataPoints, getCountry } from '@/lib/content/countries';
import { abroadAlerts, formatIntake, setDreamCountry } from '@/lib/engine';
import { BUDGET_PHASES, journeyPhases } from '@/lib/abroad/phases';
import { daysUntil } from '@/lib/abroad/status';

/**
 * Study Abroad → Journey: where am I, what is this phase, what do I do now,
 * what comes next. One phase in focus, one primary action; the details live
 * on the phase page and in the existing Study Abroad areas.
 */
export function JourneyHome() {
  const { t } = useLocale();
  const text = useBilingual();
  const { profile, updateProfile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  const { abroad } = profile;
  const journey = journeyPhases(profile);
  const alerts = abroadAlerts(profile, new Date(), 3);
  const dream = abroad.dreamCountryCode ? getCountry(abroad.dreamCountryCode) : undefined;
  const shortlist = (abroad.preferredCountryCodes ?? []).map(getCountry).filter((c): c is NonNullable<typeof c> => Boolean(c));
  const others = shortlist.filter((c) => c.code !== dream?.code);
  const goalParts = [abroad.degreeLevel ? t(`degree.${abroad.degreeLevel}`) : undefined, abroad.subject, formatIntake(abroad)].filter(Boolean);
  const current = journey.current;
  const choosingCountry = journey.setup === 'country';

  const dueWhen = (date: string) => {
    const n = daysUntil(date);
    return n === 0 ? t('sa.dl.today') : n > 0 ? t('sa.dl.inDays', { n }) : t('sa.dl.ago', { n: -n });
  };
  const alertText = (al: (typeof alerts)[number]) => {
    switch (al.kind) {
      case 'deadline':
        return t('sa.alerts.deadline', { title: typeof al.title === 'string' ? al.title : text(al.title), when: dueWhen(al.date) });
      case 'document-update':
        return t('sa.alerts.document-update', { doc: t(`sa.docKinds.${al.document}`) });
      case 'document-missing':
        return t('sa.alerts.document-missing', { doc: t(`sa.docKinds.${al.document}`), step: text(al.step) });
      case 'scholarship':
        return t('sa.alerts.scholarship', { name: al.name, when: dueWhen(al.date) });
      case 'needs-review':
        return t('sa.alerts.needs-review', { section: t(`sa.sections.${al.section}`) });
    }
  };

  // The one primary action: choose a country first, otherwise the current phase's own page.
  const primary = choosingCountry
    ? { href: '/abroad/countries', label: t('sa.phase.setupCountryCta') }
    : { href: current.href, label: t(`sa.phase.${current.id}.cta`) };

  return (
    <div className="space-y-6">
      <PageHeader title={t('sa.home.title')} subtitle={t('sa.home.subtitle')} />
      <HubBar />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="space-y-6">
          {journey.setup === 'goal' ? (
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
            <Panel className="space-y-6 p-5 sm:p-6" data-testid="abroad-journey" data-current-phase={choosingCountry ? 'setup-country' : current.id}>
              {/* Where: country, degree, subject. */}
              <div className="space-y-1" data-testid="journey-goal">
                <p className="flex items-center gap-2 text-xl font-semibold tracking-tight">
                  {dream ? (
                    <>
                      <span aria-hidden>{dream.flag}</span> {dream.name}
                    </>
                  ) : (
                    <span className="text-muted-foreground">{t('sa.phase.setupCountryTitle')}</span>
                  )}
                </p>
                <p className="text-[15px] text-muted-foreground">
                  {goalParts.join(' · ') || t('sa.phase.notProvided')}{' '}
                  <Link href="/setup/abroad" className="ml-1 text-sm font-medium whitespace-nowrap text-brand">
                    {t('sa.phase.editGoal')}
                  </Link>
                </p>
              </div>

              <div className="space-y-2">
                <PhaseStepper journey={journey} />
                <p className="text-xs text-muted-foreground">{t('sa.phase.progress', { n: journey.completed })}</p>
              </div>

              {/* Now: one phase, a short explanation, one action. */}
              <div key={choosingCountry ? 'setup' : current.id} className="space-y-4 border-t pt-5 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:duration-300">
                {journey.complete ? (
                  <div className="space-y-1.5">
                    <h2 className="text-2xl font-semibold tracking-tight">{t('sa.phase.allDone')}</h2>
                    <p className="text-muted-foreground">{t('sa.phase.allDoneBody')}</p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-medium text-brand">
                      {t('sa.phase.now')}
                      {!choosingCountry && current.status !== 'not-started' && <StatusChip tone={PHASE_TONE[current.status]}>{t(`sa.phase.status.${current.status}`)}</StatusChip>}
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight text-balance" data-testid="journey-now">
                      {choosingCountry ? t('sa.phase.setupCountryTitle') : t(`sa.phase.${current.id}.title`)}
                    </h2>
                    <p className="text-[15px] leading-relaxed text-foreground/80">{choosingCountry ? t('sa.phase.setupCountryBody') : t(`sa.phase.${current.id}.body`)}</p>
                    {!choosingCountry && current.attention && (
                      <p className="flex items-center gap-1.5 text-sm text-warning">
                        <AlertTriangle className="size-4 shrink-0" aria-hidden /> {t(current.attention.key, current.attention.params)}
                      </p>
                    )}
                  </div>
                )}

                {choosingCountry && others.length > 0 && (
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    {others.slice(0, 3).map((c) => (
                      <Button key={c.code} variant="outline" className="h-11 justify-start" onClick={() => updateProfile((p) => ({ ...p, abroad: setDreamCountry(p.abroad, c.code) }))}>
                        <span aria-hidden>{c.flag}</span> {t('sa.home.makeDream', { country: c.name })}
                      </Button>
                    ))}
                  </div>
                )}

                {!journey.complete && (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button asChild size="lg" variant={choosingCountry && others.length ? 'outline' : 'default'} className="h-12">
                      <Link href={primary.href} data-testid="abroad-continue">
                        {primary.label} <ArrowRight />
                      </Link>
                    </Button>
                    {!choosingCountry && (
                      <Link href={`/abroad/journey/${current.id}`} className="inline-flex h-11 items-center gap-1 text-sm font-medium text-brand" data-testid="journey-details">
                        {t('sa.phase.whatYoullDo')} <ChevronRight className="size-4" aria-hidden />
                      </Link>
                    )}
                  </div>
                )}

                {!choosingCountry && !journey.complete && dream && BUDGET_PHASES.includes(current.id) && (
                  <Link href={`/abroad/cost?country=${dream.code.toLowerCase()}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline" data-testid="journey-budget">
                    {t('sa.phase.budget')} <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                )}

                {!choosingCountry && journey.next && (
                  <Link href={`/abroad/journey/${journey.next.id}`} className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-4 py-3 text-sm" data-testid="journey-next">
                    <span>
                      <span className="text-muted-foreground">{t('sa.phase.next')}: </span>
                      <span className="font-medium">{t(`sa.phase.${journey.next.id}.title`)}</span>
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
                  </Link>
                )}
              </div>
            </Panel>
          )}

          {alerts.length > 0 && (
            <Section title={t('sa.home.attentionTitle')} variant="label">
              <RowGroup>
                {alerts.map((al) => (
                  <ListRow
                    key={al.id}
                    href={al.href}
                    icon={al.kind === 'deadline' || al.kind === 'scholarship' ? CalendarClock : FileText}
                    iconTone="warning"
                    title={alertText(al)}
                    trailing={<span className="text-sm font-medium text-brand">{t('sa.alerts.view')}</span>}
                  />
                ))}
              </RowGroup>
            </Section>
          )}
        </div>

        <div className="space-y-5">
          {dream && (
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
          )}
          {dream && others.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">{t('sa.home.shortlist')}</p>
              <div className="flex flex-wrap gap-2" data-testid="abroad-shortlist">
                {others.map((c) => (
                  <span key={c.code} className="inline-flex h-9 items-center gap-1.5 rounded-full border bg-card px-3 text-sm">
                    <span aria-hidden>{c.flag}</span> {c.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {journey.setup !== 'goal' && (
            <Link href="/mino?ask=abroad-next" className="flex items-center gap-2.5 rounded-xl px-1 py-2 text-sm font-medium text-brand" data-testid="abroad-ask-mino">
              <Sparkles className="size-4 shrink-0" aria-hidden />
              <span className="flex-1">{t('sa.home.askMino')}</span>
            </Link>
          )}
          <TrustNote />
        </div>
      </div>
    </div>
  );
}
