'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { COUNTRIES, getCountry } from '@/lib/content/countries';
import type { StudyAbroadProfile } from '@/lib/models';

/**
 * The country a Study Abroad centre is showing: ?country=xx, else the dream
 * country, else all. Changing it keeps the URL shareable.
 */
export function useCountryParam(abroad: StudyAbroadProfile | undefined, allowAll = true) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = params.get('country');
  const fromUrl = raw === 'all' && allowAll ? 'all' : raw ? getCountry(raw)?.code : undefined;
  const code = fromUrl ?? abroad?.dreamCountryCode ?? (allowAll ? 'all' : COUNTRIES[0].code);
  const set = (next: string) => router.replace(`${pathname}?country=${next.toLowerCase()}`, { scroll: false });
  return [code, set] as const;
}

/** Dream country first, then the shortlist, then every other destination. */
export function CountrySelect({ value, onChange, abroad, allowAll = true, id = 'country-select' }: { value: string; onChange: (code: string) => void; abroad: StudyAbroadProfile; allowAll?: boolean; id?: string }) {
  const { t } = useLocale();
  const dream = abroad.dreamCountryCode;
  const shortlist = (abroad.preferredCountryCodes ?? []).filter((c) => c !== dream);
  const first = [...(dream ? [dream] : []), ...shortlist];
  const rest = COUNTRIES.filter((c) => !first.includes(c.code));
  const label = (code: string) => {
    const c = getCountry(code);
    return c ? `${c.flag} ${c.name}${code === dream ? ` · ${t('sa.filter.dream')}` : ''}` : code;
  };
  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">{t('sa.filter.country')}</span>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="h-10 min-w-0 flex-1 rounded-lg border bg-background px-3 text-sm sm:flex-none">
        {allowAll && <option value="all">{t('sa.filter.all')}</option>}
        {first.map((c) => (
          <option key={c} value={c}>
            {label(c)}
          </option>
        ))}
        {first.length > 0 && <option disabled>──────────</option>}
        {rest.map((c) => (
          <option key={c.code} value={c.code}>
            {label(c.code)}
          </option>
        ))}
      </select>
    </label>
  );
}
