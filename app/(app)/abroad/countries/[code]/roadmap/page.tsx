'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AlertTriangle, ArrowRight, Check, ExternalLink, FileText, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, Panel, ProgressBar, ScreenSkeleton, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { STAGE_TONE } from '@/components/abroad/JourneyTimeline';
import { useBilingual } from '@/components/abroad/useBilingual';
import { countryHref } from '@/lib/abroad/countries';
import { roadmapHref } from '@/lib/abroad/roadmap';
import { getCountry } from '@/lib/content/countries';
import { countryRoadmap, documentViewStatus, markStep, setDreamCountry, setStepDue, studentRouteContext, type RoadmapStep } from '@/lib/engine';
import { documentsFor, stepDocuments } from '@/lib/abroad/documents';
import { cn } from '@/lib/utils';

/**
 * A country roadmap: the 16 steps from goal to travel, with the student's own
 * ticks and target dates. Statuses are computed; only ticks and dates are saved.
 */
export default function CountryRoadmapPage() {
  const { code } = useParams<{ code: string }>();
  const country = getCountry(code ?? '');
  const { t } = useLocale();
  const text = useBilingual();
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
        {visible.map((s) => {
          const index = roadmap.steps.indexOf(s) + 1;
          const isOpen = openId === s.id;
          const title = text(s.title);
          const canTick = roadmap.active && !s.auto;
          return (
            <li
              key={s.id}
              data-step={s.id}
              data-status={s.status}
              className={cn('rounded-2xl border bg-card', s.current && 'border-brand/50 ring-1 ring-brand/20')}
            >
              <button
                type="button"
                className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? '' : s.id)}
              >
                <span
                  className={cn(
                    'grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold',
                    s.status === 'done' ? 'bg-success text-white' : s.status === 'attention' ? 'bg-warning-soft text-warning' : s.current ? 'bg-brand text-white' : 'bg-muted text-muted-foreground',
                  )}
                  aria-hidden
                >
                  {s.status === 'done' ? <Check className="size-4" /> : s.status === 'attention' ? <AlertTriangle className="size-3.5" /> : index}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold">{title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {s.current ? t('sa.roadmap.youAreHere') : t(`sa.stages.${s.stage}.title`)}
                    {s.attention ? ` · ${t(s.attention.key, s.attention.params)}` : ''}
                  </span>
                </span>
                <StatusChip tone={STAGE_TONE[s.status]}>{t(`sa.status.${s.status}`)}</StatusChip>
              </button>
              {isOpen && (
                <div className="space-y-4 border-t px-4 pt-3 pb-4 sm:pl-14">
                  <p className="text-sm text-foreground/85">{text(s.description)}</p>
                  {s.source && (
                    <p className="text-xs text-muted-foreground">
                      {t('sa.roadmap.countryStep', { country: country.name })} ·{' '}
                      <a href={s.source.url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand">
                        {s.source.name} <ExternalLink className="inline size-3" aria-hidden />
                      </a>
                    </p>
                  )}
                  {docsByStep[s.id]?.length ? (
                    <div className="space-y-1.5">
                      <p className="text-xs font-medium text-muted-foreground">{t('sa.roadmap.documents')}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {docsByStep[s.id].map((d) => {
                          const st = documentViewStatus(profile.abroad, d);
                          return (
                            <Link
                              key={d}
                              href={`/abroad/documents?open=${d}`}
                              className={cn('inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs', st === 'ready' && 'border-success/40 text-success', st === 'needs-update' && 'border-warning/50 text-warning')}
                              data-step-doc={d}
                              data-status={st}
                            >
                              <span aria-hidden>{st === 'ready' ? '✓' : st === 'needs-update' ? '⚠' : '○'}</span>
                              <FileText className="size-3.5" aria-hidden /> {t(`sa.docKinds.${d}`)}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {s.auto && <p className="text-xs text-muted-foreground">{t('sa.roadmap.auto')}</p>}
                  {canTick && (
                    <label className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="text-muted-foreground">{t('sa.roadmap.targetDate')}</span>
                      <input
                        type="date"
                        className="h-10 rounded-lg border bg-background px-3"
                        value={s.mark?.dueAt?.slice(0, 10) ?? ''}
                        onChange={(e) => setDue(s, e.target.value)}
                        data-testid="step-date"
                      />
                    </label>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {s.action && (
                      <Button asChild size="sm" variant={canTick ? 'outline' : 'default'} className="h-10">
                        <Link href={roadmapHref(s.action.href, country.code)}>
                          {text(s.action.label)} <ArrowRight />
                        </Link>
                      </Button>
                    )}
                    {canTick && (
                      <Button size="sm" className="h-10" variant={s.status === 'done' ? 'secondary' : 'default'} aria-pressed={s.status === 'done'} onClick={() => toggle(s)}>
                        {s.status === 'done' ? t('sa.roadmap.undo') : (
                          <>
                            <Check /> {t('sa.roadmap.markDone')}
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  <Link
                    href={`/mino?${new URLSearchParams({ ask: 'abroad-step', country: country.code.toLowerCase(), step: s.id })}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand"
                  >
                    <Sparkles className="size-4" aria-hidden /> {t('sa.roadmap.ask')}
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <p className="text-xs text-muted-foreground">{t('sa.roadmap.general', { country: country.name })}</p>
    </div>
  );
}
