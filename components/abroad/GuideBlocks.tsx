'use client';

import { AlertTriangle, ExternalLink, Info } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { factStatus } from '@/lib/abroad/sections';
import { shortSourceName, type GuideBlock } from '@/lib/abroad/study-options';
import type { CountrySectionId, SectionFact, SourceRef } from '@/lib/models';
import { formatMoney, useFormatDate } from './FactRow';
import { useBilingual } from './useBilingual';

const uniq = (links: SourceRef[]) => [...new Map(links.map((l) => [l.url ?? l.name, l])).values()];

/** "This information is not verified yet", with the official pages to read meanwhile. */
export function NotVerified({ links = [], text: override }: { links?: SourceRef[]; text?: string }) {
  const { t } = useLocale();
  return (
    <div className="space-y-2" data-not-verified>
      <p className="flex items-start gap-2 text-[15px] text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden /> {override ?? t('sa.guide.notVerified')}
      </p>
      <SourceLinks links={links} label={t('sa.guide.officialPages')} />
    </div>
  );
}

/** Official pages as short, tappable names (the full name and URL stay in the data). */
export function SourceLinks({ links, label }: { links: SourceRef[]; label: string }) {
  const list = uniq(links).filter((l) => l.url);
  if (!list.length) return null;
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <ul className="space-y-1">
        {list.map((l) => (
          <li key={l.url}>
            <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-sm font-medium text-brand" title={l.name}>
              {shortSourceName(l.name)} <ExternalLink className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The small, secondary source link at the end of a section: "Official source ↗"
 * (or a few short names when a section draws on several). The full list with
 * dates is at the end of the guide.
 */
export function SectionSources({ sources, lastVerified }: { sources: SourceRef[]; lastVerified?: string }) {
  const { t } = useLocale();
  const date = useFormatDate();
  const list = uniq(sources).filter((s) => s.url);
  if (!list.length) return null;
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground" data-section-sources data-sources={list.map((s) => s.name).join(' | ')}>
      {list.length === 1 ? (
        <a href={list[0].url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground" title={list[0].name}>
          {t('sa.guide.sourceOne')} <ExternalLink className="size-3" aria-hidden />
        </a>
      ) : (
        <>
          <span>{t('sa.guide.sourceMany')}:</span>
          {list.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground" title={s.name}>
              {shortSourceName(s.name)} <ExternalLink className="size-3" aria-hidden />
            </a>
          ))}
        </>
      )}
      {lastVerified && <span>· {t('sa.guide.checked', { date: date(lastVerified) })}</span>}
    </p>
  );
}

/** Sources and latest verification date behind a set of facts (for SectionSources). */
export function factSources(facts: SectionFact[]): { sources: SourceRef[]; lastVerified?: string } {
  const lastVerified = facts.map((f) => f.fact.reviewedAt ?? f.fact.lastVerified).sort().pop();
  return { sources: facts.map((f) => f.fact.source), ...(lastVerified ? { lastVerified } : {}) };
}

/**
 * One verified fact, content first: its label and value. The source is not
 * repeated under every fact (it is at the end of the section and of the
 * guide); only a fact that must be re-checked says so here.
 */
export function GuideFact({ item, reviewAs }: { item: SectionFact; reviewAs?: CountrySectionId }) {
  const { t } = useLocale();
  const text = useBilingual();
  const { fact } = item;
  const status = factStatus(fact, reviewAs);
  const value = typeof fact.value === 'object' ? formatMoney(fact.value) : String(fact.value);
  return (
    <div className="space-y-1 py-3 first:pt-0 last:pb-0" data-fact data-fact-status={status}>
      <p className="text-xs font-medium text-muted-foreground">{text(item.label)}</p>
      <p className="text-[15px] leading-relaxed">{value}</p>
      {fact.notes && <p className="text-sm text-muted-foreground">{fact.notes}</p>}
      {status === 'needs-review' && (
        <p className="flex items-start gap-1.5 text-xs text-warning">
          <AlertTriangle className="mt-px size-3.5 shrink-0" aria-hidden /> {t('sa.guide.checkAgain')}
        </p>
      )}
      {status === 'partly-verified' && <p className="text-xs text-muted-foreground">{t('sa.sectionStatus.partial')}</p>}
    </div>
  );
}

/**
 * The sourced text of one guide section: facts, the reviewed plain-language
 * explanation, general guidance (labelled) and, when nothing is verified,
 * the official pages to read. Readable top to bottom — no accordions, no
 * per-block prompts, no citation after every line.
 */
export function GuideBlocks({ blocks, showTitles }: { blocks: GuideBlock[]; showTitles?: boolean }) {
  const { t } = useLocale();
  const text = useBilingual();
  const verified = blocks.some((b) => b.facts.length > 0);
  if (!verified) {
    const guidance = blocks.filter((b) => b.guidance);
    return (
      <div className="space-y-3">
        {guidance.map((b) => (
          <p key={b.key} className="text-[15px] leading-relaxed text-foreground/85">
            <span className="font-medium">{t('sa.hub.generalGuidance')}: </span>
            {text(b.guidance!)}
          </p>
        ))}
        <NotVerified links={blocks.flatMap((b) => b.links)} />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {blocks.map((b) => {
        const title = b.title ? text(b.title) : b.titleKey && showTitles ? t(b.titleKey) : undefined;
        return (
          <div key={b.key} className="space-y-3" data-guide-block={b.key} data-status={b.status}>
            {title && <h3 className="text-base font-semibold">{title}</h3>}
            {b.facts.length > 0 && (
              <div className="divide-y">
                {b.facts.map((f, i) => (
                  <GuideFact key={i} item={f} reviewAs={b.reviewAs} />
                ))}
              </div>
            )}
            {b.explanation && (
              <div className="rounded-xl bg-muted/60 px-4 py-3">
                <p className="text-xs font-medium text-muted-foreground">{t('sa.guide.plain')}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-foreground/85">{text(b.explanation)}</p>
              </div>
            )}
            {b.guidance && (
              <p className="text-[15px] leading-relaxed text-foreground/85">
                <span className="font-medium">{t('sa.hub.generalGuidance')}: </span>
                {text(b.guidance)}
              </p>
            )}
            {b.facts.length === 0 && (b.links.length > 0 || !b.guidance) && <NotVerified links={b.links} />}
          </div>
        );
      })}
    </div>
  );
}
