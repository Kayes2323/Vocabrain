'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, Panel, ProgressBar, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { HubBar } from '@/components/abroad/HubBar';
import { useBilingual } from '@/components/abroad/useBilingual';
import { getCountry } from '@/lib/content/countries';
import { DOCUMENT_GUIDES, documentGuide } from '@/lib/content/documents';
import { abroadJourney, documentStatus, markStage, requiredDocuments, setDocumentStatus } from '@/lib/engine';
import type { DocumentKind, DocumentStatus } from '@/lib/models';
import { cn } from '@/lib/utils';

const STATUSES: DocumentStatus[] = ['not-started', 'drafting', 'ready'];
const TONE = { 'not-started': 'neutral', drafting: 'brand', ready: 'success' } as const;

export default function DocumentsPage() {
  const { t } = useLocale();
  const text = useBilingual();
  const { profile, updateProfile } = useProfile();
  const [open, setOpen] = useState<string | null>(null);

  if (!profile) return <ScreenSkeleton />;
  const a = profile.abroad;
  const dream = a.dreamCountryCode ? getCountry(a.dreamCountryCode) : undefined;
  const required = requiredDocuments(a);
  const other = DOCUMENT_GUIDES.map((g) => g.kind).filter((k) => !required.includes(k));
  const ready = required.filter((k) => documentStatus(a, k) === 'ready').length;
  const stageDone = dream ? abroadJourney(profile).stages.find((s) => s.id === 'documents')?.status === 'done' : false;

  const row = (kind: DocumentKind) => {
    const status = documentStatus(a, kind);
    const guide = documentGuide(kind);
    const isOpen = open === kind;
    const label = t(`sa.docKinds.${kind}`);
    return (
      <li key={kind} className="rounded-2xl border bg-card" data-document={kind} data-status={status}>
        <button type="button" className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : kind)}>
          <FileText className="size-5 shrink-0 text-muted-foreground" aria-hidden />
          <span className="min-w-0 flex-1 text-[15px] font-semibold">{label}</span>
          <StatusChip tone={TONE[status]}>{t(`sa.docs.statuses.${status}`)}</StatusChip>
          <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', isOpen && 'rotate-180')} aria-hidden />
        </button>
        {isOpen && (
          <div className="space-y-4 border-t px-4 pt-3 pb-4">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={status === s}
                  onClick={() => updateProfile((p) => ({ ...p, abroad: setDocumentStatus(p.abroad, kind, s) }))}
                  className={cn('h-9 rounded-full px-3.5 text-sm', status === s ? 'bg-foreground text-background' : 'border')}
                >
                  {t(`sa.docs.statuses.${s}`)}
                </button>
              ))}
            </div>
            {guide && (
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-medium">{t('sa.docs.what')}: </span>
                  {text(guide.what)}
                </p>
                <p>
                  <span className="font-medium">{t('sa.docs.why')}: </span>
                  {text(guide.why)}
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
              </div>
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

      <Section title={dream ? t('sa.docs.forPlan', { country: dream.name }) : t('sa.docs.general')}>
        <Panel className="space-y-2">
          <p className="text-sm font-medium" data-testid="docs-readiness">
            {t('sa.docs.readiness', { n: ready, total: required.length })}
          </p>
          <ProgressBar value={required.length ? (ready / required.length) * 100 : 0} label={t('sa.docs.readiness', { n: ready, total: required.length })} tone="success" size="sm" />
        </Panel>
        <ul className="space-y-2" data-testid="docs-required">
          {required.map(row)}
        </ul>
        {dream && ready === required.length && required.length > 0 && (
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
          <ul className="space-y-2">{other.map(row)}</ul>
        </Section>
      )}
    </div>
  );
}
