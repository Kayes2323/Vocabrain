'use client';

import { ExternalLink, Info } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { GuideBlock } from '@/lib/abroad/study-options';
import type { SourceRef } from '@/lib/models';
import { FactRow } from './FactRow';
import { useBilingual } from './useBilingual';

/** "This information is not verified yet", with the official pages to read meanwhile. */
export function NotVerified({ links = [], text: override }: { links?: SourceRef[]; text?: string }) {
  const { t } = useLocale();
  return (
    <div className="space-y-2" data-not-verified>
      <p className="flex items-start gap-2 text-[15px] text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden /> {override ?? t('sa.guide.notVerified')}
      </p>
      <SourceLinks links={links} />
    </div>
  );
}

export function SourceLinks({ links }: { links: SourceRef[] }) {
  const { t } = useLocale();
  if (!links.length) return null;
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{t('sa.guide.officialPages')}</p>
      <ul className="space-y-1">
        {links.map((l) => (
          <li key={l.url ?? l.name}>
            <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-sm font-medium text-brand">
              {l.name} <ExternalLink className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The sourced text of one guide section: facts (with source and date), the
 * reviewed plain-language explanation, general guidance (labelled) and
 * official pages. Readable top to bottom — no accordions, no per-block prompts.
 */
export function GuideBlocks({ blocks, showTitles }: { blocks: GuideBlock[]; showTitles?: boolean }) {
  const { t } = useLocale();
  const text = useBilingual();
  const verified = blocks.some((b) => b.facts.length > 0);
  if (!verified) {
    const guidance = blocks.filter((b) => b.guidance);
    const links = [...new Map(blocks.flatMap((b) => b.links).map((l) => [l.url ?? l.name, l])).values()];
    return (
      <div className="space-y-3">
        {guidance.map((b) => (
          <p key={b.key} className="text-[15px] leading-relaxed text-foreground/85">
            <span className="font-medium">{t('sa.hub.generalGuidance')}: </span>
            {text(b.guidance!)}
          </p>
        ))}
        <NotVerified links={links} />
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
                  <FactRow key={i} item={f} sectionId={b.reviewAs} />
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
            {b.facts.length > 0 && <SourceLinks links={b.links} />}
          </div>
        );
      })}
    </div>
  );
}
