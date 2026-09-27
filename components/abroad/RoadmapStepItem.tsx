'use client';

import Link from 'next/link';
import { AlertTriangle, ArrowRight, Check, ExternalLink, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { STAGE_TONE } from '@/components/abroad/JourneyTimeline';
import { useBilingual } from '@/components/abroad/useBilingual';
import { roadmapHref } from '@/lib/abroad/roadmap';
import { documentViewStatus, type RoadmapStep } from '@/lib/engine';
import type { Country, DocumentKind, StudyAbroadProfile } from '@/lib/models';
import { cn } from '@/lib/utils';

/**
 * One roadmap step: a row that opens to its description, documents, target
 * date, action and tick. Shared by the country roadmap and the Journey phase
 * pages, so a step looks and behaves the same everywhere.
 */
export function RoadmapStepItem({
  step: s,
  index,
  country,
  abroad,
  docs,
  active,
  open,
  onOpen,
  onToggle,
  onDue,
  askMino = true,
  subtitle,
}: {
  step: RoadmapStep;
  index: number;
  country: Pick<Country, 'code' | 'name'>;
  abroad: StudyAbroadProfile;
  docs: DocumentKind[] | undefined;
  /** The student's dream country: steps can be ticked and dated. */
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onToggle: () => void;
  onDue: (date: string) => void;
  /** A per-step "Ask Mino" link (the full roadmap has one; Journey phases have a single one instead). */
  askMino?: boolean;
  subtitle?: string;
}) {
  const { t } = useLocale();
  const text = useBilingual();
  const canTick = active && !s.auto;
  return (
    <li data-step={s.id} data-status={s.status} className={cn('rounded-2xl border bg-card', s.current && 'border-brand/50 ring-1 ring-brand/20')}>
      <button type="button" className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left" aria-expanded={open} onClick={onOpen}>
        <span
          className={cn(
            'grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold transition-colors',
            s.status === 'done' ? 'bg-success text-white' : s.status === 'attention' ? 'bg-warning-soft text-warning' : s.current ? 'bg-brand text-white' : 'bg-muted text-muted-foreground',
          )}
          aria-hidden
        >
          {s.status === 'done' ? <Check className="size-4 motion-safe:animate-in motion-safe:zoom-in-50" /> : s.status === 'attention' ? <AlertTriangle className="size-3.5" /> : index}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold">{text(s.title)}</span>
          <span className="block text-xs text-muted-foreground">
            {s.current ? t('sa.roadmap.youAreHere') : (subtitle ?? t(`sa.stages.${s.stage}.title`))}
            {s.attention ? ` · ${t(s.attention.key, s.attention.params)}` : ''}
          </span>
        </span>
        <StatusChip tone={STAGE_TONE[s.status]}>{t(`sa.status.${s.status}`)}</StatusChip>
      </button>
      {open && (
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
          {docs?.length ? (
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">{t('sa.roadmap.documents')}</p>
              <div className="flex flex-wrap gap-1.5">
                {docs.map((d) => {
                  const st = documentViewStatus(abroad, d);
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
                onChange={(e) => onDue(e.target.value)}
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
              <Button size="sm" className="h-10" variant={s.status === 'done' ? 'secondary' : 'default'} aria-pressed={s.status === 'done'} onClick={onToggle}>
                {s.status === 'done' ? (
                  t('sa.roadmap.undo')
                ) : (
                  <>
                    <Check /> {t('sa.roadmap.markDone')}
                  </>
                )}
              </Button>
            )}
          </div>
          {askMino && (
            <Link
              href={`/mino?${new URLSearchParams({ ask: 'abroad-step', country: country.code.toLowerCase(), step: s.id })}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand"
            >
              <Sparkles className="size-4" aria-hidden /> {t('sa.roadmap.ask')}
            </Link>
          )}
        </div>
      )}
    </li>
  );
}
