'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { UniversityView } from '@/components/abroad/uni/UniversityView';
import { countryHref } from '@/lib/abroad/countries';
import { getCountry } from '@/lib/content/countries';
import { getUniversityProfile } from '@/lib/content/university-layers';

/** One researched university in a country: programs, fees, dates, requirements, how to apply, visa. */
export default function UniversityPage() {
  const { code, uni } = useParams<{ code: string; uni: string }>();
  const { t } = useLocale();
  const country = getCountry(code);
  const profile = country ? getUniversityProfile(country.code, uni) : undefined;
  if (!country || !profile) {
    return (
      <div className="mx-auto max-w-xl space-y-3 py-10 text-center" data-testid="university-not-found">
        <p className="text-muted-foreground">{country ? t('sa.book.unis.notFound', { country: country.name }) : t('sa.hub.notFound')}</p>
        <Link href={country ? countryHref(country.code) : '/abroad'} className="font-medium text-brand">
          {country ? t('sa.book.backCountry', { country: country.name }) : t('sa.home.title')}
        </Link>
      </div>
    );
  }
  return <UniversityView country={country} uni={profile} />;
}
