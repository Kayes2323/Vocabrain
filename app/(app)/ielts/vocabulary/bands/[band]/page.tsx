'use client';

import { useCallback, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/AuthProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useUpgrade } from '@/components/providers/UpgradeProvider';
import { EmptyState, PageHeader, ScreenSkeleton } from '@/components/ds';
import { WordBankStudy } from '@/components/vocabulary/WordBankStudy';
import { FREE_BAND_LEVEL } from '@/lib/constants';
import { getAllBands, getVocabularyByBand } from '@/lib/ielts-vocabulary';

type Band = 6 | 7 | 8 | 9;

export default function BandPage() {
  const params = useParams<{ band: string }>();
  const band = Number(params.band) as Band;
  const { isPremium } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { openUpgrade } = useUpgrade();
  const valid = getAllBands().includes(band);
  const locked = band > FREE_BAND_LEVEL && !isPremium;
  const profileReady = profile !== null;

  useEffect(() => {
    if (!valid || locked || !profileReady) return;
    updateProfile((p) => ({ ...p, vocabulary: { ...p.vocabulary, lastBand: band } }));
  }, [valid, locked, band, profileReady, updateProfile]);

  const toggleSave = useCallback(
    (wordId: string) =>
      updateProfile((p) => {
        const ids = p.vocabulary.savedWordIds;
        const savedWordIds = ids.includes(wordId) ? ids.filter((id) => id !== wordId) : [...ids, wordId];
        return { ...p, vocabulary: { ...p.vocabulary, savedWordIds } };
      }),
    [updateProfile],
  );

  if (!valid) notFound();
  if (!profile) return <ScreenSkeleton />;

  return (
    <div>
      <PageHeader title={`Band ${band} words`} backHref="/ielts/vocabulary" backLabel="Vocabulary" />
      {locked ? (
        <EmptyState
          icon={Lock}
          title={`Band ${band} is part of Premium`}
          description={`Band ${FREE_BAND_LEVEL} is free. Premium opens Bands 7–9.`}
          action={<Button onClick={openUpgrade}>See Premium</Button>}
        />
      ) : (
        <WordBankStudy
          band={band}
          words={getVocabularyByBand(band)}
          savedIds={profile.vocabulary.savedWordIds}
          onToggleSave={toggleSave}
        />
      )}
    </div>
  );
}
