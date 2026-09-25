'use client';

import { useState } from 'react';
import { Bookmark, BookmarkCheck, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { recordRecall } from '@/lib/engine';
import type { IELTSWord } from '@/lib/ielts-vocabulary';
import { Flashcard } from './Flashcard';
import { RecallButtons, StudyNav, StudyProgress } from './StudyControls';

interface WordBankStudyProps {
  band: number;
  words: IELTSWord[];
  savedIds: string[];
  onToggleSave: (wordId: string) => void;
}

function ChipList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <span key={s} className="rounded-full border px-3 py-1 text-sm">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function WordBankStudy({ band, words, savedIds, onToggleSave }: WordBankStudyProps) {
  const { t } = useLocale();
  const { updateProfile } = useProfile();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const go = (i: number) => {
    setIndex(Math.max(0, Math.min(words.length - 1, i)));
    setRevealed(false);
  };

  const word = words[index];
  const saved = savedIds.includes(word.id);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
      <div className="space-y-5">
        <StudyProgress index={index} total={words.length} label={t('vocabulary.band', { band: String(band) })} />
        <Flashcard
          revealed={revealed}
          onToggle={() => setRevealed((r) => !r)}
          hint={t('vocabulary.lesson.recallFirst')}
          front={
            <div className="space-y-2">
              <p className="text-4xl font-semibold tracking-tight">{word.word}</p>
              <p className="text-muted-foreground">
                {word.pronunciation} · <span className="capitalize">{word.partOfSpeech}</span>
              </p>
            </div>
          }
          back={
            <div className="space-y-3 text-left">
              <p className="text-lg">{word.definition}</p>
              <p className="text-muted-foreground italic">&ldquo;{word.example}&rdquo;</p>
            </div>
          }
        />
        {revealed && (
          <RecallButtons
            onAnswer={(knew) => {
              updateProfile((p) => recordRecall(p, word.id, knew ? 'recalled' : 'missed'));
              go(index + 1);
            }}
          />
        )}
        <Button
          variant={saved ? 'secondary' : 'outline'}
          size="lg"
          className="w-full"
          onClick={() => onToggleSave(word.id)}
          aria-pressed={saved}
        >
          {saved ? <BookmarkCheck className="text-brand" /> : <Bookmark />}
          {saved ? t('vocabulary.bank.savedToBrain') : t('vocabulary.bank.save')}
        </Button>
        <StudyNav index={index} total={words.length} onPrev={() => go(index - 1)} onNext={() => go(index + 1)} />
      </div>

      {revealed && (
        <Panel className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <StatusChip>{word.category}</StatusChip>
            <StatusChip tone="brand">{t('vocabulary.band', { band: String(word.bandLevel) })}</StatusChip>
          </div>
          {word.synonyms.length > 0 && <ChipList label={t('vocabulary.bank.similar')} items={word.synonyms} />}
          {word.antonyms && word.antonyms.length > 0 && <ChipList label={t('vocabulary.bank.opposites')} items={word.antonyms} />}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{t('vocabulary.bank.inSentence')}</p>
            <p>{word.exampleSentence}</p>
          </div>
          <div className="flex gap-3 rounded-xl bg-warning-soft p-4 text-sm">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
            <p>{word.memoryTip}</p>
          </div>
        </Panel>
      )}
    </div>
  );
}
