'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { EmptyState, ScreenSkeleton } from '@/components/ds';
import { meanings } from '@/components/brain/meaning';
import { MinoSays } from '@/components/mino/MinoSays';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useLeave } from '@/components/setup/useLeave';
import { checkSentence, markActivityDone, type UsageCheck } from '@/lib/engine';
import { PracticeShell } from './PracticeShell';
import { pickWord } from './pickWord';

export function WritingPractice() {
  const params = useSearchParams();
  const leave = useLeave('/');
  const { t, locale } = useLocale();
  const brain = useBrain();
  const { updateProfile } = useProfile();
  const [done, setDone] = useState<string[]>([]);
  const [requested, setRequested] = useState<string | null>(params.get('word'));
  const [text, setText] = useState('');
  const [result, setResult] = useState<UsageCheck | null>(null);

  if (brain.loading) return <ScreenSkeleton />;
  const word = pickWord(brain.words, 'writing', requested, done);

  if (!word) {
    return (
      <PracticeShell title={t('practice.writingTitle')} onClose={() => leave()}>
        <EmptyState
          icon={BrainCircuit}
          title={t('brain.emptyTitle')}
          description={t('brain.emptyBody')}
          action={
            <Button asChild>
              <Link href="/ielts/reading">{t('brain.emptyCta')}</Link>
            </Button>
          }
        />
      </PracticeShell>
    );
  }

  const { primary } = meanings(word, locale);

  const check = async () => {
    const r = checkSentence(word, text);
    setResult(r);
    await brain.recordUsage(word.id, { mode: 'writing', text, correct: r.correct, feedback: r.feedback });
    updateProfile((p) => markActivityDone(p, 'writing'));
  };

  const nextWord = () => {
    setDone((d) => [...d, word.id]);
    setRequested(null);
    setText('');
    setResult(null);
  };

  return (
    <PracticeShell title={t('practice.writingTitle')} onClose={() => leave()}>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-balance">{t('practice.writePrompt', { word: word.word })}</h1>
        {primary && <p className="text-muted-foreground">{primary}</p>}
      </div>

      {word.collocations.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{t('practice.naturalPhrases')}</p>
          <div className="flex flex-wrap gap-2">
            {word.collocations.map((c) => (
              <span key={c} className="rounded-full border bg-card px-3 py-1 text-sm" lang="en">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="sentence" className="sr-only">
          {t('practice.yourSentence')}
        </label>
        <Textarea
          id="sentence"
          rows={4}
          lang="en"
          spellCheck
          value={text}
          readOnly={result !== null}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('practice.sentencePlaceholder')}
          className="rounded-xl bg-card text-base"
        />
      </div>

      {result === null ? (
        <Button size="lg" className="w-full" onClick={check} disabled={text.trim().length < 3}>
          {t('practice.checkSentence')}
        </Button>
      ) : (
        <div className="space-y-4" aria-live="polite">
          <MinoSays>
            {result.feedback
              .map((key) => t(key, { word: word.word, collocation: result.collocation ?? '' }))
              .join(' ')}
          </MinoSays>
          <p className="text-xs text-muted-foreground">{t('practice.quickCheckNote')}</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setResult(null);
              }}
            >
              {t('practice.rewrite')}
            </Button>
            <Button size="lg" onClick={nextWord}>
              {t('practice.nextWord')}
            </Button>
          </div>
          <Button variant="ghost" className="w-full" onClick={() => leave()}>
            {t('practice.done')}
          </Button>
        </div>
      )}
    </PracticeShell>
  );
}
