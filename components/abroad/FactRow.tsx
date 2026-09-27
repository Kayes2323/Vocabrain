'use client';

import { AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { factStatus } from '@/lib/abroad/sections';
import type { CountrySectionId, Money, SectionFact } from '@/lib/models';
import { useBilingual } from './useBilingual';

export const formatMoney = (m: Money) => `${m.currency} ${m.amount.toLocaleString('en-US')}`;

export function useFormatDate() {
  const { locale } = useLocale();
  return (iso: string) =>
    new Intl.DateTimeFormat(locale === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(
      new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T00:00:00` : iso),
    );
}

/**
 * One official fact: the value, the official source (linked) and when we
 * verified it. A fact past its review date says so instead of looking current.
 */
export function FactRow({ item, sectionId }: { item: SectionFact; sectionId?: CountrySectionId }) {
  const { t } = useLocale();
  const text = useBilingual();
  const date = useFormatDate();
  const { fact } = item;
  const status = factStatus(fact, sectionId);
  const stale = status === 'needs-review';
  const value = typeof fact.value === 'object' ? formatMoney(fact.value) : String(fact.value);
  return (
    <div className="space-y-1.5 py-3 first:pt-0 last:pb-0" data-fact data-fact-status={status}>
      <p className="text-xs font-medium text-muted-foreground">{text(item.label)}</p>
      <p className="text-[15px] leading-relaxed">{value}</p>
      {fact.notes && <p className="text-sm text-muted-foreground">{fact.notes}</p>}
      <p className={stale ? 'flex items-start gap-1.5 text-xs text-warning' : 'flex items-start gap-1.5 text-xs text-success'}>
        {stale ? <AlertTriangle className="mt-px size-3.5 shrink-0" aria-hidden /> : <CheckCircle2 className="mt-px size-3.5 shrink-0" aria-hidden />}
        <span>
          {fact.source.url ? (
            <a href={fact.source.url} target="_blank" rel="noopener noreferrer" className="font-medium underline-offset-2 hover:underline">
              {fact.source.name} <ExternalLink className="inline size-3" aria-hidden />
            </a>
          ) : (
            fact.source.name
          )}{' '}
          · {t('sa.hub.verifiedOn', { date: date(fact.lastVerified) })}
          {status === 'partly-verified' && <span className="block">{t('sa.sectionStatus.partial')}</span>}
          {stale && <span className="block">{t('sa.hub.needsReview')}</span>}
        </span>
      </p>
    </div>
  );
}
