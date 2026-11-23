'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bookmark, BookmarkCheck, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState, Panel } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useBrain } from '@/components/providers/BrainProvider';
import { lookupLocal } from '@/lib/content/dictionary';
import { wordId } from '@/lib/engine';
import { cn } from '@/lib/utils';
import type { Lesson } from '@/lib/vocabulary';
import { Flashcard } from './Flashcard';
import { RecallButtons, StudyNav, StudyProgress } from './StudyControls';

interface LessonStudyProps {
  lesson: Lesson;
  /** The next lesson if the student can open it. */
  nextLessonId?: number;
}

export function LessonStudy({ lesson, nextLessonId }: LessonStudyProps) {
  const { t } = useLocale();
  const brain = useBrain();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [recalled, setRecalled] = useState<Set<number>>(new Set());

  const go = (i: number) => {
    setIndex(i);
    setRevealed(false);
  };

  const answer = (knew: boolean) => {
    const word = lesson.words[index];
    const brainId = wordId(word.word.toLowerCase());
    // Only a word saved to My Brain has a schedule to update — this flip-card
    // self-report feeds the SAME BrainWord record every other surface reads,
    // not a separate counter nothing else sees.
    if (brain.has(brainId)) void brain.recordRecall(brainId, 'meaning', knew).catch(() => undefined);
    setRecalled((prev) => {
      const next = new Set(prev);
      if (knew) next.add(index);
      else next.delete(index);
      return next;
    });
    if (index === lesson.words.length - 1) setFinished(true);
    else go(index + 1);
  };

  if (finished) {
    return (
      <EmptyState
        icon={PartyPopper}
        title={t('vocabulary.lesson.completeTitle')}
        description={t('vocabulary.lesson.completeBody', { recalled: recalled.size, total: lesson.words.length })}
        action={
          <div className="flex flex-col gap-2 sm:flex-row">
            {nextLessonId && (
              <Button asChild>
                <Link href={`/ielts/vocabulary/lessons/${nextLessonId}`}>{t('vocabulary.lesson.nextLesson')}</Link>
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                setFinished(false);
                setRecalled(new Set());
                go(0);
              }}
            >
              {t('vocabulary.lesson.reviewAgain')}
            </Button>
          </div>
        }
      />
    );
  }

  const word = lesson.words[index];
  const brainId = wordId(word.word.toLowerCase());
  const saved = brain.has(brainId);
  const toggleSave = () => {
    if (saved) return void brain.remove(brainId).catch(() => undefined);
    const info = lookupLocal(word.word);
    if (info) void brain.save(info, { type: 'word-bank', title: t('vocabulary.lesson.title', { n: lesson.lessonId }) }, word.example).catch(() => undefined);
  };

  return (
    <div className="max-w-xl space-y-5">
      <StudyProgress index={index} total={lesson.words.length} label={t('vocabulary.lesson.progress')} />

      <Flashcard
        revealed={revealed}
        onToggle={() => setRevealed((r) => !r)}
        hint={t('vocabulary.lesson.recallFirst')}
        front={<p className="text-4xl font-semibold tracking-tight text-balance">{word.word}</p>}
        back={
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">{t('vocabulary.lesson.meaning')}</p>
            <p className="text-xl" lang="bn">
              {word.meaning}
            </p>
          </div>
        }
      />

      {revealed && <RecallButtons onAnswer={answer} />}
      <Button variant={saved ? 'secondary' : 'outline'} size="lg" className="w-full" onClick={toggleSave} aria-pressed={saved}>
        {saved ? <BookmarkCheck className="text-brand" /> : <Bookmark />}
        {saved ? t('vocabulary.bank.savedToBrain') : t('vocabulary.bank.save')}
      </Button>
      <StudyNav index={index} total={lesson.words.length} onPrev={() => go(index - 1)} onNext={() => go(index + 1)} />

      <Panel className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">{t('vocabulary.lesson.jump')}</p>
        <div className="grid grid-cols-5 gap-2">
          {lesson.words.map((w, i) => (
            <button
              key={w.word}
              type="button"
              onClick={() => go(i)}
              aria-label={t('vocabulary.lesson.wordN', { n: i + 1, word: w.word })}
              aria-current={i === index ? 'true' : undefined}
              className={cn(
                'h-10 rounded-lg text-sm font-medium tabular-nums transition-colors',
                i === index
                  ? 'bg-primary text-primary-foreground'
                  : recalled.has(i)
                    ? 'bg-success-soft text-success'
                    : 'bg-muted hover:bg-muted/70',
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </Panel>
    </div>
  );
}
