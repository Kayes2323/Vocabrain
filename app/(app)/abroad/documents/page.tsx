'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, ChevronDown, ExternalLink, FileText, Info, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, Panel, ProgressBar, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useFormatDate } from '@/components/abroad/FactRow';
import { HubBar } from '@/components/abroad/HubBar';
import { PathwayPicker } from '@/components/abroad/PathwayPicker';
import { useBilingual } from '@/components/abroad/useBilingual';
import { documentExplanation, documentGroups, needsPathwayChoice, type DocumentNeed } from '@/lib/abroad/documents';
import { getCountry } from '@/lib/content/countries';
import { DOCUMENT_GUIDES, documentGuide } from '@/lib/content/documents';
import {
  abroadJourney,
  documentViewStatus,
  markStage,
  requiredDocumentNeeds,
  setDocumentStatus,
  setDocumentValidUntil,
  studentRouteContext,
  type DocumentViewStatus,
} from '@/lib/engine';
import type { DocumentKind, DocumentStatus } from '@/lib/models';
import { cn } from '@/lib/utils';

const STATUSES: DocumentStatus[] = ['not-started', 'drafting', 'ready'];
const TONE: Record<DocumentViewStatus, 'neutral' | 'brand' | 'success' | 'warning'> = { 'not-started': 'neutral', drafting: 'brand', ready: 'success', 'needs-update': 'warning' };

/**
 * Documents: SUMMARY (how many, for what) → a card per document (status)
 * → DETAILS (why · who · when · where · official requirement · what to
 * prepare) → official source. Requirements come only from verified data.
 */
function Documents() {
  const { t } = useLocale();
  const text = useBilingual();
  const date = useFormatDate();
  const params = useSearchParams();
  const { profile, updateProfile } = useProfile();
  const [open, setOpen] = useState<string | null>(params.get('open'));

  useEffect(() => {
    const id = params.get('open');
    if (id) document.querySelector(`[data-document="${CSS.escape(id)}"]`)?.scrollIntoView({ block: 'center' });
  }, [params, profile === undefined]);

  if (!profile) return <ScreenSkeleton />;
  const a = profile.abroad;
  const dream = a.dreamCountryCode ? getCountry(a.dreamCountryCode) : undefined;
  const ctx = studentRouteContext(a, dream?.code);
  const needs = requiredDocumentNeeds(a);
  const kinds = needs.map((n) => n.kind);
  const other = DOCUMENT_GUIDES.map((g) => g.kind).filter((k) => !kinds.includes(k));
  const ready = kinds.filter((k) => documentViewStatus(a, k) === 'ready').length;
  const stageDone = dream ? abroadJourney(profile).stages.find((s) => s.id === 'documents')?.status === 'done' : false;
  const groups = documentGroups(needs);
  const firstOpen = kinds.find((k) => documentViewStatus(a, k) !== 'ready');

  const sourceName = (from: string, name?: string) => t(`sa.docs2.sources.${from}`, { name: from === 'country' ? (dream?.name ?? '') : (name ?? '') });

  const row = (kind: DocumentKind, need?: DocumentNeed) => {
    const status = documentViewStatus(a, kind);
    const stored = a.documents?.[kind];
    const guide = documentGuide(kind);
    const isOpen = open === kind;
    const label = t(`sa.docKinds.${kind}`);
    const ex = need ? documentExplanation(need) : undefined;
    return (
      <li key={kind} className="rounded-2xl border bg-card" data-document={kind} data-status={status}>
        <button type="button" className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : kind)}>
          <FileText className="size-5 shrink-0 text-muted-foreground" aria-hidden />
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold">{label}</span>
            {ex && ex.purposes.length > 0 && <span className="block text-xs text-muted-foreground">{ex.purposes.map((p) => t(`sa.docs2.purposes.${p}`)).join(' · ')}</span>}
          </span>
          <StatusChip tone={TONE[status]}>{status === 'needs-update' ? t('sa.docs2.statusNeeds') : t(`sa.docs.statuses.${status}`)}</StatusChip>
          <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', isOpen && 'rotate-180')} aria-hidden />
        </button>
        {isOpen && (
          <div className="space-y-4 border-t px-4 pt-3 pb-4">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={stored?.status === s || (!stored && s === 'not-started')}
                  onClick={() => updateProfile((p) => ({ ...p, abroad: setDocumentStatus(p.abroad, kind, s) }))}
                  className={cn('h-9 rounded-full px-3.5 text-sm', (stored?.status ?? 'not-started') === s ? 'bg-foreground text-background' : 'border')}
                >
                  {t(`sa.docs.statuses.${s}`)}
                </button>
              ))}
            </div>
            <label className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">{t('sa.docs2.validUntil')}</span>
              <input
                type="date"
                className="h-10 rounded-lg border bg-background px-3"
                value={stored?.validUntil ?? ''}
                onChange={(e) => updateProfile((p) => ({ ...p, abroad: setDocumentValidUntil(p.abroad, kind, e.target.value || undefined) }))}
                data-testid="doc-valid-until"
              />
            </label>

            <dl className="grid gap-3 text-sm sm:grid-cols-2" data-testid="doc-explain">
              {guide && (
                <div className="space-y-0.5">
                  <dt className="text-xs font-medium text-muted-foreground">{t('sa.docs2.why')}</dt>
                  <dd>{text(guide.why)}</dd>
                </div>
              )}
              {ex && (
                <>
                  <div className="space-y-0.5">
                    <dt className="text-xs font-medium text-muted-foreground">{t('sa.docs2.who')}</dt>
                    <dd>{ex.askedBy.length ? ex.askedBy.map((w) => sourceName(w.from, w.name)).join(' · ') : t('sa.docs2.purposes.general')}</dd>
                  </div>
                  <div className="space-y-0.5">
                    <dt className="text-xs font-medium text-muted-foreground">{t('sa.docs2.when')}</dt>
                    <dd>{ex.stages.length ? ex.stages.map((s) => t(`sa.stages.${s}.title`)).join(' · ') : '—'}</dd>
                  </div>
                  <div className="space-y-0.5">
                    <dt className="text-xs font-medium text-muted-foreground">{t('sa.docs2.where')}</dt>
                    <dd>{ex.submittedTo.length ? ex.submittedTo.map((w) => text(w)).join(' · ') : t('sa.cost.notVerified')}</dd>
                  </div>
                </>
              )}
            </dl>

            <div className="space-y-1.5" data-testid="doc-official">
              <p className="inline-flex rounded-md bg-success-soft px-2 py-0.5 text-[11px] font-semibold tracking-wider text-success uppercase">{t('sa.docs2.official')}</p>
              {ex?.requirements.length ? (
                ex.requirements.map((r, i) => (
                  <div key={i} className="space-y-0.5 text-sm">
                    <p>{r.value}</p>
                    <a href={r.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-success">
                      {r.source.name} · {t('sa.hub.verifiedOn', { date: date(r.lastVerified) })} <ExternalLink className="size-3" aria-hidden />
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">{ex?.generalOnly || !ex ? t('sa.docs2.general') : t('sa.docs2.notVerified')}</p>
              )}
            </div>

            {guide && (
              <details className="space-y-3 text-sm">
                <summary className="cursor-pointer font-medium">{t('sa.docs2.prepare')}</summary>
                <p className="mt-2">
                  <span className="font-medium">{t('sa.docs.what')}: </span>
                  {text(guide.what)}
                </p>
                {[
                  ['contains', guide.contains],
                  ['checklist', guide.checklist],
                  ['mistakes', guide.mistakes],
                ].map(([key, list]) => (
                  <div key={key as string} className="space-y-1">
                    <p className="font-medium">{t(`sa.docs.${key}`)}</p>
                    <ul className="list-disc space-y-0.5 pl-5 text-foreground/85">
                      {(list as typeof guide.contains).map((x) => (
                        <li key={x.en}>{text(x)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">{t('sa.docs.guidance')}</p>
              </details>
            )}
            <Link href={`/mino?${new URLSearchParams({ ask: 'abroad-doc', doc: kind })}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
              <Sparkles className="size-4" aria-hidden /> {t('sa.docs.ask')}
            </Link>
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t('sa.docs.title')} subtitle={t('sa.docs.subtitle')} />
      <HubBar />

      {dream && needsPathwayChoice(dream, ctx) && (
        <div className="space-y-2">
          <p className="flex items-start gap-2 text-sm text-muted-foreground" data-testid="docs-choose-pathway">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden /> {t('sa.docs2.choosePathway')}
          </p>
          <PathwayPicker country={dream} />
        </div>
      )}

      <Section title={dream ? t('sa.docs.forPlan', { country: dream.name }) : t('sa.docs.general')}>
        <Panel className="space-y-3" data-testid="docs-summary">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm">
              <span className="font-semibold">{t('sa.docs2.youMayNeed')}: </span>
              {groups.total}
            </p>
            {firstOpen && (
              <Button size="sm" onClick={() => setOpen(firstOpen)} data-testid="docs-cta">
                {t('sa.docs2.cta')}
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {(['route', 'university', 'scholarship'] as const).map((g) =>
              groups[g] ? (
                <StatusChip key={g} tone="neutral">
                  {t(`sa.docs2.groups.${g}`)} · {groups[g]}
                </StatusChip>
              ) : null,
            )}
          </div>
          <p className="text-sm font-medium" data-testid="docs-readiness">
            {t('sa.docs.readiness', { n: ready, total: kinds.length })}
          </p>
          <ProgressBar value={kinds.length ? (ready / kinds.length) * 100 : 0} label={t('sa.docs.readiness', { n: ready, total: kinds.length })} tone="success" size="sm" />
        </Panel>
        <ul className="space-y-2" data-testid="docs-required">
          {needs.map((n) => row(n.kind, n))}
        </ul>
        {dream && ready === kinds.length && kinds.length > 0 && (
          <Button
            variant={stageDone ? 'secondary' : 'default'}
            aria-pressed={stageDone}
            onClick={() => updateProfile((p) => ({ ...p, abroad: markStage(p.abroad, 'documents', !stageDone) }))}
          >
            {stageDone ? t('sa.docs.stageDone') : (
              <>
                <Check /> {t('sa.docs.markStage')}
              </>
            )}
          </Button>
        )}
      </Section>

      {other.length > 0 && (
        <Section title={t('sa.docs.other')}>
          <ul className="space-y-2">{other.map((k) => row(k))}</ul>
        </Section>
      )}
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<ScreenSkeleton />}>
      <Documents />
    </Suspense>
  );
}
