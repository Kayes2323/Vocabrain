'use client';

import { useParams } from 'next/navigation';
import { CountryHubPage } from '@/components/abroad/CountryHub';
import { CountryGuideView } from '@/components/abroad/guide/CountryGuideView';
import { getCountry } from '@/lib/content/countries';
import { getCountryGuide } from '@/lib/content/country-guides';

/**
 * A country's page: its reading guide when the country has one, otherwise
 * the country hub (which stays available at /hub for every country).
 */
export default function CountryPage() {
  const { code } = useParams<{ code: string }>();
  const country = getCountry(code ?? '');
  const guide = getCountryGuide(code);
  if (country && guide) return <CountryGuideView country={country} guide={guide} />;
  return <CountryHubPage />;
}
