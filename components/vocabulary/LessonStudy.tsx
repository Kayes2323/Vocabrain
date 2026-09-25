'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState, Panel } from '@/components/ds';
import { cn } from '@/lib/utils';
import type { Lesson } from '@/lib/vocabulary';
import { Flashcard } from './Flashcard';
import { StudyNav, StudyProgress } from './StudyControls';

interface LessonStudyProps {
  lesson: Lesson;
  /** The next lesson if the student can open it. */
  nextLessonId?: number;
}

export function LessonStudy({ lesson, nextLessonId }: LessonStudyProps) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const go = (i: number) => {
    setIndex(i);
    setRevealed(false);
  };

  if (finished) {
    return (
      <EmptyState
        icon={PartyPopper}
        title="Lesson complete"
        description={`You went through all ${lesson.words.length} words in ${lesson.topic}. Come back tomorrow to review them.`}
        action={
          <div className="flex flex-col gap-2 sm:flex-row">
            {nextLessonId && (
              <Button asChild>
                <Link href={`/ielts/vocabulary/lessons/${nextLessonId}`}>Next lesson</Link>
              </Button>
            )}
            <Button variant="outline" onClick={() => { setFinished(false); go(0); }}>
              Review again
            </Button>
          </div>
        }
      />
    );
  }

  const word = lesson.words[index];

  return (
    <div className="space-y-5">
      <StudyProgress index={index} total={lesson.words.length} label="Progress" />

      <Flashcard
        revealed={revealed}
        onToggle={() => setRevealed((r) => !r)}
        front={<p className="text-4xl font-semibold tracking-tight text-balance">{word.word}</p>}
        back={
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Bengali meaning</p>
            <p className="text-xl" lang="bn">{word.meaning}</p>
          </div>
        }
      />

      <StudyNav
        index={index}
        total={lesson.words.length}
        onPrev={() => go(index - 1)}
        onNext={() => go(index + 1)}
        onFinish={() => setFinished(true)}
      />

      <Panel className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Jump to a word</p>
        <div className="grid grid-cols-5 gap-2">
          {lesson.words.map((w, i) => (
            <button
              key={w.word}
              type="button"
              onClick={() => go(i)}
              aria-label={`Word ${i + 1}: ${w.word}`}
              aria-current={i === index ? 'true' : undefined}
              className={cn(
                'h-10 rounded-lg text-sm font-medium tabular-nums transition-colors',
                i === index ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70',
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
