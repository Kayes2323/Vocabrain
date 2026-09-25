'use client';

import { BookOpenCheck, Bookmark, Layers, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/AuthProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useUpgrade } from '@/components/providers/UpgradeProvider';
import { ListRow, PageHeader, Panel, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { MasteryLadder } from '@/components/vocabulary/MasteryLadder';
import { FREE_BAND_LEVEL } from '@/lib/constants';
import { getAllBands, getVocabularyByBand } from '@/lib/ielts-vocabulary';
import { VOCABULARY_DATA } from '@/lib/vocabulary';

const BAND_TITLES: Record<number, string> = {
  6: 'Competent user',
  7: 'Good user',
  8: 'Very good user',
  9: 'Expert user',
};

export default function VocabularyPage() {
  const { isPremium, maxLessonAccess } = useAuth();
  const { profile } = useProfile();
  const { openUpgrade } = useUpgrade();

  if (!profile) return <ScreenSkeleton />;

  const savedCount = profile.vocabulary.savedWordIds.length;
  const lockIcon = <Lock className="size-4 text-muted-foreground" aria-label="Premium" />;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Vocabulary"
        subtitle="Don't memorise isolated words. Meet them in context, recall them, then use them."
        backHref="/ielts"
        backLabel="IELTS"
      />

      <Panel className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold">How a word becomes yours</p>
          <StatusChip tone="brand">
            <Bookmark className="size-3" aria-hidden /> {savedCount} saved
          </StatusChip>
        </div>
        <MasteryLadder />
        <p className="text-sm text-muted-foreground">
          Each word is tracked separately for meaning, collocation, writing and speaking, so you know exactly which
          words you can actually use.
        </p>
      </Panel>

      <Section title="Topic lessons" description="Ten useful words per IELTS topic, with Bengali meanings.">
        <RowGroup>
          {VOCABULARY_DATA.map((lesson) => {
            const locked = lesson.lessonId > maxLessonAccess;
            const isLast = profile.vocabulary.lastLessonId === lesson.lessonId;
            return (
              <ListRow
                key={lesson.lessonId}
                icon={BookOpenCheck}
                iconTone={locked ? 'neutral' : 'brand'}
                title={`${lesson.lessonId}. ${lesson.topic}`}
                description={`${lesson.words.length} words`}
                muted={locked}
                href={locked ? undefined : `/ielts/vocabulary/lessons/${lesson.lessonId}`}
                onClick={locked ? openUpgrade : undefined}
                trailing={locked ? lockIcon : isLast ? <StatusChip tone="brand">Continue</StatusChip> : undefined}
              />
            );
          })}
        </RowGroup>
      </Section>

      <Section title="IELTS word bank" description="Academic words by band, with synonyms and examples.">
        <RowGroup>
          {getAllBands().map((band) => {
            const locked = band > FREE_BAND_LEVEL && !isPremium;
            return (
              <ListRow
                key={band}
                icon={Layers}
                iconTone={locked ? 'neutral' : 'brand'}
                title={`Band ${band}`}
                description={`${BAND_TITLES[band]} · ${getVocabularyByBand(band).length} words`}
                muted={locked}
                href={locked ? undefined : `/ielts/vocabulary/bands/${band}`}
                onClick={locked ? openUpgrade : undefined}
                trailing={locked ? lockIcon : undefined}
              />
            );
          })}
        </RowGroup>
      </Section>

      <Section title="Coming next">
        <RowGroup>
          <ListRow
            icon={Sparkles}
            title="Automatic vocabulary notebook"
            description="Tap a word while reading and it's saved with its sentence and source."
            href="/ielts/reading"
            trailing={<StatusChip>Soon</StatusChip>}
          />
        </RowGroup>
      </Section>

      {!isPremium && (
        <Panel variant="muted" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Unlock every lesson and band</p>
            <p className="text-sm text-muted-foreground">Premium opens all topic lessons and Bands 7–9.</p>
          </div>
          <Button onClick={openUpgrade}>See Premium</Button>
        </Panel>
      )}
    </div>
  );
}
