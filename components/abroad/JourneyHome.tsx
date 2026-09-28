'use client';

import Link from 'next/link';
import { AlertTriangle, ArrowRight, CalendarClock, ChevronRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { PageHeader, Panel, ScreenSkeleton, StatusChip } from '@/components/ds';
import { HubBar } from '@/components/abroad/HubBar';
import { PHASE_TONE, PhaseStepper } from '@/components/abroad/PhaseStepper';
import { TrustNote } from '@/components/abroad/TrustNote';
import { useBilingual } from '@/components/abroad/useBilingual';
import { getCountry } from '@/lib/content/countries';
import { abroadAlerts, formatIntake } from '@/lib/engine';
import { journeyPhases } from '@/lib/abroad/phases';
import { daysUntil } from '@/lib/abroad/status';

/**
 * The student's journey: a compact card computed from the profile (never
 * guessed). Phase details live on the phase pages.
 */
export function JourneyHome() {
  const { t } = useLocale();
  const text = useBilingual();
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  const { abroad } = profile;
  const journey = journeyPhases(profile);
  const alerts = abroadAlerts(profile, new Date(), 2);
  const dream = abroad.dreamCountryCode ? getCountry(abroad.dreamCountryCode) : undefined;
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

  // One primary action: pick a country, otherwise the current phase's own page.
  const primary = choosingCountry
    ? { href: '/abroad', label: t('sa.phase.setupCountryCta') }
    : { href: current.href, label: t(`sa.phase.${current.id}.cta`) };

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-4">
        <PageHeader title={t('sa.home.title')} />
        <HubBar />
      </div>

      {/* 1. My current journey */}
      {journey.setup === 'goal' ? (
        <Panel variant="brand" className="space-y-3 rounded-3xl p-5 sm:p-6" data-testid="abroad-start">
          <p className="text-xs font-semibold tracking-wider text-brand uppercase">{t('sa.landing.startHere')}</p>
          <h2 className="text-xl font-semibold tracking-tight">{t('sa.landing.journeyTitle')}</h2>
          <p className="text-[15px] text-muted-foreground">{t('sa.landing.startLine')}</p>
          <Button asChild size="lg" className="h-11 w-full rounded-full sm:w-auto">
            <Link href="/setup/abroad">
              {t('sa.landing.startCta')} <ArrowRight />
            </Link>
          </Button>
        </Panel>
      ) : (
        <Panel className="space-y-4 rounded-3xl p-5 shadow-sm sm:p-6" data-testid="abroad-journey" data-current-phase={choosingCountry ? 'setup-country' : current.id}>
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
            <div className="min-w-0 space-y-0.5" data-testid="journey-goal">
              <h2 className="text-lg font-semibold tracking-tight">{t('sa.landing.journeyTitle')}</h2>
              <p className="text-sm text-muted-foreground">
                {dream && (
                  <span className="font-medium text-foreground">
                    <span aria-hidden>{dream.flag}</span> {dream.name}
                    {goalParts.length > 0 && ' · '}
                  </span>
                )}
                {goalParts.join(' · ') || (!dream && t('sa.phase.notProvided'))}{' '}
                <Link href="/setup/abroad" className="ml-1 font-medium whitespace-nowrap text-brand">
                  {t('sa.phase.editGoal')}
                </Link>
              </p>
            </div>
            {!choosingCountry && !journey.complete && (
              <Link href={`/abroad/journey/${current.id}`} className="inline-flex h-9 items-center gap-0.5 text-sm font-medium text-brand" data-testid="journey-details">
                {t('sa.landing.details')} <ChevronRight className="size-4" aria-hidden />
              </Link>
            )}
          </div>

          <PhaseStepper journey={journey} />

          {journey.complete ? (
            <p className="font-medium" data-testid="journey-now">{t('sa.phase.allDone')}</p>
          ) : (
            <div className="flex flex-col gap-3 rounded-2xl bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 space-y-1">
                <p className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-brand uppercase">
                  {t('sa.landing.now')}
                  {!choosingCountry && current.status !== 'not-started' && <StatusChip tone={PHASE_TONE[current.status]}>{t(`sa.phase.status.${current.status}`)}</StatusChip>}
                </p>
                <p className="text-lg font-semibold tracking-tight text-balance" data-testid="journey-now">
                  {choosingCountry ? t('sa.phase.setupCountryTitle') : t(`sa.phase.${current.id}.title`)}
                </p>
                {!choosingCountry && current.attention && (
                  <p className="flex items-center gap-1.5 text-sm text-warning">
                    <AlertTriangle className="size-4 shrink-0" aria-hidden /> {t(current.attention.key, current.attention.params)}
                  </p>
                )}
                {!choosingCountry && journey.next && (
                  <p className="text-sm text-muted-foreground" data-testid="journey-next">
                    {t('sa.phase.next')}: <span className="font-medium text-foreground/80">{t(`sa.phase.${journey.next.id}.title`)}</span>
                  </p>
                )}
              </div>
              <Button asChild className="h-11 shrink-0 rounded-full">
                <Link href={primary.href} data-testid="abroad-continue">
                  {primary.label} <ArrowRight />
                </Link>
              </Button>
            </div>
          )}

          {alerts.length > 0 && (
            <div className="space-y-1.5 border-t pt-3" data-testid="journey-alerts">
              <p className="text-xs font-medium text-muted-foreground">{t('sa.home.attentionTitle')}</p>
              <ul className="space-y-1">
                {alerts.map((al) => {
                  const Icon = al.kind === 'deadline' || al.kind === 'scholarship' ? CalendarClock : FileText;
                  return (
                    <li key={al.id}>
                      <Link href={al.href} className="flex min-h-10 items-center gap-2.5 rounded-xl px-1 text-sm hover:bg-muted/60">
                        <Icon className="size-4 shrink-0 text-warning" aria-hidden />
                        <span className="min-w-0 flex-1">{alertText(al)}</span>
                        <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </Panel>
      )}

      <TrustNote />
    </div>
  );
}
