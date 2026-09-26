'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { ResolvedSection, SectionStatus } from '@/lib/abroad/sections';
import { cn } from '@/lib/utils';
import { FactRow } from './FactRow';
import { useBilingual } from './useBilingual';

export const SECTION_TONE: Record<SectionStatus, 'success' | 'brand' | 'neutral'> = { verified: 'success', partial: 'brand', 'not-yet': 'neutral' };

export interface SectionAction {
  label: string;
  href?: string;
  onClick?: () => void;
  done?: boolean;
}

/**
 * A country section as an accordion row. Open, it shows OFFICIAL INFORMATION
 * (sourced facts only) and MINO'S EXPLANATION as two visibly different blocks,
 * then the one action this information leads to.
 */
export function SectionCard({
  section,
  open,
  onToggle,
  askHref,
  action,
}: {
  section: ResolvedSection;
  open: boolean;
  onToggle: () => void;
  askHref: string;
  action?: SectionAction;
}) {
  const { t } = useLocale();
  const text = useBilingual();
  const title = t(`sa.sections.${section.id}`);
  const panelId = `section-${section.id}`;
  return (
    <div className="border-b last:border-b-0" data-section={section.id} data-status={section.status}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-h-14 w-full items-center gap-3 py-3 text-left"
        >
          <span className="w-6 shrink-0 font-mono text-xs text-muted-foreground">{section.number}</span>
          <span className="min-w-0 flex-1 text-[15px] font-semibold">{title}</span>
          <StatusChip tone={SECTION_TONE[section.status]}>{t(`sa.sectionStatus.${section.status}`)}</StatusChip>
          <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden />
        </button>
      </h3>
      {open && (
        <div id={panelId} className="space-y-4 pb-5 pl-9">
          <div className="space-y-2">
            <p className="inline-flex rounded-md bg-success-soft px-2 py-0.5 text-[11px] font-semibold tracking-wider text-success uppercase">{t('sa.hub.official')}</p>
            {section.facts.length > 0 ? (
              <div className="divide-y">
                {section.facts.map((f, i) => (
                  <FactRow key={i} item={f} sectionId={section.id} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t('sa.hub.notVerifiedBody')}</p>
            )}
            {section.links?.map((l) => (
              <a key={l.url ?? l.name} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-brand">
                {l.name} <ExternalLink className="size-3.5" aria-hidden />
              </a>
            ))}
          </div>
          <div className="space-y-2 rounded-xl bg-brand-soft/60 p-3.5">
            <p className="inline-flex rounded-md bg-brand-soft px-2 py-0.5 text-[11px] font-semibold tracking-wider text-brand uppercase">{t('sa.hub.mino')}</p>
            <p className="text-sm text-foreground/80">
              {section.explanation ? text(section.explanation) : section.facts.length ? t('sa.hub.minoGeneral') : t('sa.hub.minoWaiting')}
            </p>
            <Link href={askHref} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
              <Sparkles className="size-4" aria-hidden /> {t('sa.hub.askSection', { section: title })}
            </Link>
          </div>
          {action &&
            (action.href ? (
              <Button asChild variant="outline" size="sm" className="h-10">
                <Link href={action.href}>
                  {action.label} <ArrowRight />
                </Link>
              </Button>
            ) : (
              <Button variant={action.done ? 'secondary' : 'outline'} size="sm" className="h-10" onClick={action.onClick} aria-pressed={action.done}>
                {action.label}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
}
