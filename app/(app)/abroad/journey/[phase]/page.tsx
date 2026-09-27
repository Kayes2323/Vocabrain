'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowRight, ChevronRight, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, Panel, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { PHASE_TONE } from '@/components/abroad/PhaseStepper';
import { RoadmapStepItem } from '@/components/abroad/RoadmapStepItem';
import { getCountry } from '@/lib/content/countries';
import { documentsFor, stepDocuments } from '@/lib/abroad/documents';
import { BUDGET_PHASES, JOURNEY_PHASES, journeyPhases, type JourneyPhaseId } from '@/lib/abroad/phases';
import { documentViewStatus, markStep, setStepDue, studentRouteContext, type RoadmapStep } from '@/lib/engine';
import { cn } from '@/lib/utils';

/** What each phase involves, in plain words (3–4 items). The checklist below is the real, tickable one. */
const DO_ITEMS: Record<JourneyPhaseId, readonly string[]> = {
  english: ['a', 'b', 'c'],
  documents: ['a', 'b', 'c', 'd'],
  university: ['a', 'b', 'c', 'd'],
  application: ['a', 'b', 'c', 'd'],
  visa: ['a', 'b', 'c', 'd'],
  departure: ['a', 'b', 'c', 'd'],
};

/** Phases where a question to Mino about a requirement is genuinely useful. */
const ASK_PHASES: readonly JourneyPhaseId[] = ['documents', 'university', 'application', 'visa'];

/**
 * One Journey phase: what it is, what you'll do, one action, then the
 * existing roadmap steps and documents of this phase (same data, same ticks).
 */
export default function JourneyPhasePage() {
  const { phase: id } = useParams<{ phase: string }>();
  const { t } = useLocale();
  const { profile, updateProfile } = useProfile();
  const [open, setOpen] = useState<string | null>(null);
  if (!(JOURNEY_PHASES as readonly string[]).includes(id)) notFound();
  if (!profile) return <ScreenSkeleton />;

  const journey = journeyPhases(profile);
  const phase = journey.phases.find((p) => p.id === id)!;
  const country = journey.countryCode ? getCountry(journey.countryCode) : undefined;
  const docsByStep = country ? stepDocuments(phase.steps, documentsFor(country, studentRouteContext(profile.abroad, country.code))) : {};
  const index = JOURNEY_PHASES.indexOf(phase.id);
  const after = JOURNEY_PHASES[index + 1];
  const isCurrent = !journey.complete && journey.current.id === phase.id;
  const askStep = phase.steps.find((s) => s.status !== 'done') ?? phase.steps[0];

  const toggle = (s: RoadmapStep) => country && updateProfile((p) => ({ ...p, abroad: markStep(p.abroad, country.code, s.id, s.status !== 'done') }));
  const setDue = (s: RoadmapStep, date: string) => country && updateProfile((p) => ({ ...p, abroad: setStepDue(p.abroad, country.code, s.id, date || undefined) }));
  const openId = open ?? phase.steps.find((s) => s.current)?.id ?? null;

  return (
    <div className="space-y-6" data-testid="journey-phase" data-phase={phase.id} data-status={phase.status}>
      <PageHeader
        title={t(`sa.phase.${phase.id}.title`)}
        backHref="/abroad"
        backLabel={t('sa.phase.back')}
        subtitle={
          <span className="flex flex-wrap items-center gap-2">
            {country && (
              <span>
                <span aria-hidden>{country.flag}</span> {country.name}
              </span>
            )}
            <StatusChip tone={PHASE_TONE[phase.status]}>{t(`sa.phase.status.${phase.status}`)}</StatusChip>
            {isCurrent && <span className="text-xs font-medium text-brand">{t('sa.phase.now')}</span>}
          </span>
        }
        className="mb-2"
      />
      <Panel className="space-y-5 p-5 sm:p-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
        <p className="text-[15px] leading-relaxed text-foreground/85">{t(`sa.phase.${phase.id}.body`)}</p>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">{t('sa.phase.whatYoullDo')}</h2>
          <ul className="space-y-1.5 text-[15px]" data-testid="phase-do">
            {DO_ITEMS[phase.id].map((k) => (
              <li key={k} className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span>{t(`sa.phase.${phase.id}.do.${k}`)}</span>
              </li>
            ))}
          </ul>
        </div>
        {phase.attention && <p className="text-sm text-warning">{t(phase.attention.key, phase.attention.params)}</p>}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="h-12">
            <Link href={phase.href} data-testid="phase-primary">
              {t(`sa.phase.${phase.id}.cta`)} <ArrowRight />
            </Link>
          </Button>
          {country && BUDGET_PHASES.includes(phase.id) && (
            <Link href={`/abroad/cost?country=${country.code.toLowerCase()}`} className="inline-flex h-11 items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline" data-testid="journey-budget">
              {t('sa.phase.budget')} <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          )}
        </div>
      </Panel>

      {country ? (
        phase.steps.length > 0 && (
          <Section title={t('sa.phase.checklist')} variant="label">
            <p className="-mt-1 mb-3 text-sm text-muted-foreground">{t('sa.phase.checklistHint')}</p>
            <ol className="space-y-2" data-testid="roadmap-steps">
              {phase.steps.map((s, i) => (
                <RoadmapStepItem
                  key={s.id}
                  step={s}
                  index={i + 1}
                  country={country}
                  abroad={profile.abroad}
                  docs={docsByStep[s.id]}
                  active
                  open={openId === s.id}
                  onOpen={() => setOpen(openId === s.id ? '' : s.id)}
                  onToggle={() => toggle(s)}
                  onDue={(date) => setDue(s, date)}
                  askMino={false}
                  subtitle={t(`sa.phase.${phase.id}.title`)}
                />
              ))}
            </ol>
          </Section>
        )
      ) : (
        <Panel variant="muted" className="space-y-3 p-4">
          <p className="text-sm">{t('sa.phase.noCountrySteps')}</p>
          <Button asChild variant="outline">
            <Link href="/abroad/countries">{t('sa.phase.setupCountryCta')}</Link>
          </Button>
        </Panel>
      )}

      {phase.documents.length > 0 && (
        <Section title={t('sa.phase.docsLabel')} variant="label">
          <div className="flex flex-wrap gap-2" data-testid="phase-documents">
            {phase.documents.map((d) => {
              const st = documentViewStatus(profile.abroad, d);
              return (
                <Link
                  key={d}
                  href={`/abroad/documents?open=${d}`}
                  className={cn('inline-flex h-10 items-center gap-1.5 rounded-full border bg-card px-3.5 text-sm', st === 'ready' && 'border-success/40 text-success', st === 'needs-update' && 'border-warning/50 text-warning')}
                  data-phase-doc={d}
                  data-status={st}
                >
                  <span aria-hidden>{st === 'ready' ? '✓' : st === 'needs-update' ? '⚠' : '○'}</span>
                  <FileText className="size-4" aria-hidden /> {t(`sa.docKinds.${d}`)}
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      {country && askStep && ASK_PHASES.includes(phase.id) && (
        <Link
          href={`/mino?${new URLSearchParams({ ask: 'abroad-step', country: country.code.toLowerCase(), step: askStep.id })}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-brand"
          data-testid="phase-ask-mino"
        >
          <Sparkles className="size-4" aria-hidden /> {t('sa.phase.askMino')}
        </Link>
      )}

      {after && (
        <Link href={`/abroad/journey/${after}`} className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 px-4 py-3 text-sm" data-testid="phase-after">
          <span>
            <span className="text-muted-foreground">{t('sa.phase.next')}: </span>
            <span className="font-medium">{t(`sa.phase.${after}.title`)}</span>
          </span>
          <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
        </Link>
      )}
    </div>
  );
}
