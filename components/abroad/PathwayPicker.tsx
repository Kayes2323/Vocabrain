'use client';

import { Check, ExternalLink } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { countryPathways, selectedPathway, setPathway, visaCategoriesFor } from '@/lib/abroad/pathways';
import { verifiedVisaName } from '@/lib/abroad/visa';
import type { Country } from '@/lib/models';
import { cn } from '@/lib/utils';
import { useBilingual } from './useBilingual';

/**
 * "What are you planning to study?" — only for countries that define more
 * than one pathway. The choice is saved per country and filters the visa,
 * documents and roadmap that apply.
 */
export function PathwayPicker({ country, className }: { country: Country; className?: string }) {
  const { t } = useLocale();
  const text = useBilingual();
  const { profile, updateProfile } = useProfile();
  const pathways = countryPathways(country);
  if (!profile || pathways.length < 2) return null;
  const chosen = selectedPathway(profile.abroad, country);
  // The visa each pathway leads to; the official name only when it is verified.
  const visas = (id: string) => visaCategoriesFor(country, id).map((c) => ({ code: c.code, official: verifiedVisaName(c) }));
  const sources = pathways
    .flatMap((p) => visas(p.id).map((v) => v.official))
    .filter((o, i, all): o is NonNullable<typeof o> => Boolean(o) && all.findIndex((x) => x?.source.url === o!.source.url) === i);
  return (
    <section className={cn('space-y-2.5 rounded-2xl border bg-card p-4', className)} data-testid="pathway-picker" aria-labelledby="pathway-q">
      <div className="space-y-0.5">
        <h2 id="pathway-q" className="font-semibold">
          {t('sa.pathway.question')}
        </h2>
        <p className="text-sm text-muted-foreground">{t('sa.pathway.hint')}</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label={t('sa.pathway.question')}>
        {pathways.map((p) => {
          const on = chosen?.id === p.id;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={on}
              data-pathway={p.id}
              onClick={() => updateProfile((prev) => ({ ...prev, abroad: setPathway(prev.abroad, country.code, on ? undefined : p.id) }))}
              className={cn('flex items-start gap-2.5 rounded-xl border p-3 text-left transition-colors', on ? 'border-brand bg-brand-soft' : 'hover:border-foreground/20')}
            >
              <span className={cn('mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border', on && 'border-brand bg-brand text-white')} aria-hidden>
                {on && <Check className="size-3.5" />}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{text(p.name)}</span>
                {p.description && <span className="block text-xs text-muted-foreground">{text(p.description)}</span>}
                {visas(p.id).length > 0 && (
                  <span className="mt-1 block text-xs font-medium" data-pathway-visa={visas(p.id).map((v) => v.code).join(',')}>
                    {t('sa.pathway.visa', { code: visas(p.id).map((v) => v.official?.value ?? v.code).join(', ') })}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      {sources.map((o) => (
        <a key={o.source.url} href={o.source.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground" data-testid="pathway-source">
          {t('sa.pathway.source', { source: o.source.name, date: o.lastVerified })} <ExternalLink className="size-3" aria-hidden />
        </a>
      ))}
    </section>
  );
}
