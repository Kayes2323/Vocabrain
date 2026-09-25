'use client';

import { BookOpenCheck, Layers, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/providers/AuthProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useUpgrade } from '@/components/providers/UpgradeProvider';
import { ListRow, PageHeader, Panel, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { ActiveVocabularyPanel } from '@/components/vocabulary/ActiveVocabularyPanel';
import { FREE_BAND_LEVEL } from '@/lib/constants';
import { vocabularySummary } from '@/lib/engine';
import { getAllBands, getVocabularyByBand } from '@/lib/ielts-vocabulary';
import { VOCABULARY_DATA } from '@/lib/vocabulary';

export default function VocabularyPage() {
  const { t } = useLocale();
  const { isPremium, maxLessonAccess } = useAuth();
  const { profile } = useProfile();
  const { openUpgrade } = useUpgrade();

  if (!profile) return <ScreenSkeleton />;

  const lockIcon = <Lock className="size-4 text-muted-foreground" aria-label={t('common.locked')} />;

  return (
    <div className="space-y-8">
      <PageHeader title={t('skills.vocabulary')} subtitle={t('vocabulary.subtitle')} backHref="/ielts" backLabel={t('nav.ielts')} />

      <ActiveVocabularyPanel summary={vocabularySummary(profile)} />

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <Section title={t('vocabulary.topicLessons')} description={t('vocabulary.topicLessonsDesc')}>
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
                  description={t('vocabulary.wordsCount', { n: lesson.words.length })}
                  muted={locked}
                  href={locked ? undefined : `/ielts/vocabulary/lessons/${lesson.lessonId}`}
                  onClick={locked ? openUpgrade : undefined}
                  trailing={locked ? lockIcon : isLast ? <StatusChip tone="brand">{t('vocabulary.continue')}</StatusChip> : undefined}
                />
              );
            })}
          </RowGroup>
        </Section>

        <div className="space-y-8">
          <Section title={t('vocabulary.wordBank')} description={t('vocabulary.wordBankDesc')}>
            <RowGroup>
              {getAllBands().map((band) => {
                const locked = band > FREE_BAND_LEVEL && !isPremium;
                return (
                  <ListRow
                    key={band}
                    icon={Layers}
                    iconTone={locked ? 'neutral' : 'brand'}
                    title={t('vocabulary.band', { band: String(band) })}
                    description={`${t(`vocabulary.bandTitles.${band}`)} · ${t('vocabulary.wordsCount', { n: getVocabularyByBand(band).length })}`}
                    muted={locked}
                    href={locked ? undefined : `/ielts/vocabulary/bands/${band}`}
                    onClick={locked ? openUpgrade : undefined}
                    trailing={locked ? lockIcon : undefined}
                  />
                );
              })}
            </RowGroup>
          </Section>

          <Section title={t('vocabulary.comingNext')}>
            <RowGroup>
              <ListRow
                icon={Sparkles}
                title={t('vocabulary.notebookTitle')}
                description={t('vocabulary.notebookDesc')}
                href="/ielts/reading"
                trailing={<StatusChip>{t('common.soon')}</StatusChip>}
              />
            </RowGroup>
          </Section>
        </div>
      </div>

      {!isPremium && (
        <Panel variant="muted" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">{t('vocabulary.unlockTitle')}</p>
            <p className="text-sm text-muted-foreground">{t('vocabulary.unlockDesc')}</p>
          </div>
          <Button onClick={openUpgrade}>{t('vocabulary.seePremium')}</Button>
        </Panel>
      )}
    </div>
  );
}
