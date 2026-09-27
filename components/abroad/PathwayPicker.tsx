'use client';

import { Check } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { countryPathways, selectedPathway, setPathway } from '@/lib/abroad/pathways';
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
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
