'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { DegreeGuideView } from '@/components/abroad/guide/DegreeGuideView';
import { isGuideDegree } from '@/lib/abroad/guides';
import { countryHref } from '@/lib/abroad/countries';
import { getCountry } from '@/lib/content/countries';
import { getCountryGuide } from '@/lib/content/country-guides';

/** One degree's reading guide in one country (Bachelor's, Master's or PhD). */
export default function DegreeGuidePage() {
  const { code, level } = useParams<{ code: string; level: string }>();
  const { t } = useLocale();
  const country = getCountry(code);
  const guide = getCountryGuide(code);
  if (!country || !guide || !isGuideDegree(level)) {
    return (
      <div className="mx-auto max-w-xl space-y-3 py-10 text-center" data-testid="degree-not-found">
        <p className="text-muted-foreground">{t('sa.hub.notFound')}</p>
        <Link href={country ? countryHref(country.code) : '/abroad'} className="font-medium text-brand">
          {country ? t('sa.book.backCountry', { country: country.name }) : t('sa.home.title')}
        </Link>
      </div>
    );
  }
  return <DegreeGuideView country={country} guide={guide} level={level} />;
}
