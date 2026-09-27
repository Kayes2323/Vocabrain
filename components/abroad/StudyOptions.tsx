'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useBilingual } from '@/components/abroad/useBilingual';
import { countryHref } from '@/lib/abroad/countries';
import { visaCategoriesFor } from '@/lib/abroad/pathways';
import { studyOptionGroups, studyOptionName } from '@/lib/abroad/study-options';
import type { Country } from '@/lib/models';

/**
 * "How can I study here?": the country's own study options, grouped by
 * pathway, each opening one complete guide. Read from data; no country is
 * special-cased.
 */
export function StudyOptions({ country }: { country: Country }) {
  const { t, locale } = useLocale();
  const text = useBilingual();
  const groups = studyOptionGroups(country);
  return (
    <section className="space-y-3" aria-labelledby="study-options-title" data-testid="study-options">
      <div className="space-y-0.5">
        <h2 id="study-options-title" className="text-xl font-semibold tracking-tight">
          {t('sa.guide.studyOptions')}
        </h2>
        <p className="text-sm text-muted-foreground">{t('sa.guide.studyOptionsBody')}</p>
      </div>
      <div className="space-y-4">
        {groups.map((g) => {
          const visa = g.pathway ? visaCategoriesFor(country, g.pathway.id).map((c) => c.code).join(', ') : '';
          return (
            <div key={g.pathway?.id ?? 'general'} className="space-y-1.5" data-option-group={g.pathway?.id ?? 'general'}>
              {g.pathway && (
                <p className="text-xs font-medium text-muted-foreground">
                  {text(g.pathway.name)}
                  {visa ? ` · ${t('sa.guide.visaLine', { code: visa })}` : ''}
                </p>
              )}
              <ul className="divide-y overflow-hidden rounded-2xl border bg-card">
                {g.options.map((o) => (
                  <li key={o.id}>
                    <Link
                      href={`${countryHref(country.code)}/study/${o.id}`}
                      className="flex min-h-14 items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
                      data-study-option={o.id}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-semibold">{studyOptionName(o, t, locale, country.name)}</span>
                        {!g.pathway && <span className="block text-sm text-muted-foreground">{t('sa.guide.generalBody')}</span>}
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
