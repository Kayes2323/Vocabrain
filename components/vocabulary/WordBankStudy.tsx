'use client';

import { useState } from 'react';
import { Bookmark, BookmarkCheck, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, StatusChip } from '@/components/ds';
import type { IELTSWord } from '@/lib/ielts-vocabulary';
import { Flashcard } from './Flashcard';
import { StudyNav, StudyProgress } from './StudyControls';

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
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const go = (i: number) => {
    setIndex(i);
    setRevealed(false);
  };

  const word = words[index];
  const saved = savedIds.includes(word.id);

  return (
    <div className="space-y-5">
      <StudyProgress index={index} total={words.length} label={`Band ${band} word bank`} />

      <Flashcard
        revealed={revealed}
        onToggle={() => setRevealed((r) => !r)}
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

      <Button
        variant={saved ? 'secondary' : 'outline'}
        size="lg"
        className="w-full"
        onClick={() => onToggleSave(word.id)}
        aria-pressed={saved}
      >
        {saved ? <BookmarkCheck className="text-brand" /> : <Bookmark />}
        {saved ? 'Saved to your Brain' : 'Save to Brain'}
      </Button>

      {revealed && (
        <Panel className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <StatusChip>{word.category}</StatusChip>
            <StatusChip tone="brand">Band {word.bandLevel}</StatusChip>
          </div>
          {word.synonyms.length > 0 && <ChipList label="Similar words" items={word.synonyms} />}
          {word.antonyms && word.antonyms.length > 0 && <ChipList label="Opposites" items={word.antonyms} />}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">In an IELTS-style sentence</p>
            <p>{word.exampleSentence}</p>
          </div>
          <div className="flex gap-3 rounded-xl bg-warning-soft p-4 text-sm">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
            <p>{word.memoryTip}</p>
          </div>
        </Panel>
      )}

      <StudyNav index={index} total={words.length} onPrev={() => go(index - 1)} onNext={() => go(index + 1)} />
    </div>
  );
}
