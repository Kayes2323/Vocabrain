'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Bookmark, BookmarkCheck, CheckCircle2, CircleAlert, PartyPopper, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState, Panel } from '@/components/ds';
import { EvaluationView, MinoVerdictPanel } from '@/components/mino-eval/MinoVerdictPanel';
import { useMinoEvaluation } from '@/components/mino-eval/useMinoEvaluation';
import type { MinoEvaluation } from '@/lib/mino-eval/types';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useBrain } from '@/components/providers/BrainProvider';
import { lookupLocal } from '@/lib/content/dictionary';
import { recallOutcomeFromVerdict, routeRecall, wordId, type RecallOutcome, type RecallSubject } from '@/lib/engine';
import { cn } from '@/lib/utils';
import type { Lesson } from '@/lib/vocabulary';
import { Flashcard } from './Flashcard';
import { StudyNav, StudyProgress } from './StudyControls';

interface LessonStudyProps {
  lesson: Lesson;
  /** The next lesson if the student can open it. */
  nextLessonId?: number;
}

type Phase = 'ask' | 'checking' | 'selfcheck' | 'result';
type Outcome = { kind: 'exact' } | { kind: 'mino'; verdict: 'correct' | 'partial' | 'wrong' | 'uncertain' } | { kind: 'self'; correct: boolean } | { kind: 'skip' };

const succeeded = (o: Outcome) => o.kind === 'exact' || (o.kind === 'mino' && o.verdict === 'correct') || (o.kind === 'self' && o.correct);

export function LessonStudy({ lesson, nextLessonId }: LessonStudyProps) {
  const { t, locale } = useLocale();
  const brain = useBrain();
  const mino = useMinoEvaluation();
  const [minoEval, setMinoEval] = useState<MinoEvaluation | null>(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [phase, setPhase] = useState<Phase>('ask');
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [finished, setFinished] = useState(false);
  const [recalled, setRecalled] = useState<Set<number>>(new Set());
  // One id per card this session, so a retry or navigating back and forth never double-counts a recall.
  const sessionKey = useRef(`ls${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`);
  const recorded = useRef(false);

  const go = (i: number) => {
    setIndex(i);
    setAnswer('');
    setPhase('ask');
    setOutcome(null);
    setMinoEval(null);
    mino.reset();
    recorded.current = false;
  };

  const word = lesson.words[index];
  const brainId = wordId(word.word.toLowerCase());
  const saved = brain.has(brainId);
  const toggleSave = () => {
    if (saved) return void brain.remove(brainId).catch(() => undefined);
    const info = lookupLocal(word.word);
    if (info) void brain.save(info, { type: 'word-bank', title: t('vocabulary.lesson.title', { n: lesson.lessonId }) }, word.example).catch(() => undefined);
  };

  const subject: RecallSubject = { word: word.word, lemma: word.word.toLowerCase(), meaning: '', meaningBn: word.meaning, synonyms: [] };

  /** Only a word already saved to My Brain has a schedule to update — this feeds the SAME
   * BrainWord record every other surface reads, never a separate self-report counter. */
  const record = (result: RecallOutcome) => {
    if (recorded.current) return;
    recorded.current = true;
    if (saved) void brain.recordRecall(brainId, 'meaning', result, answer, undefined, `${sessionKey.current}:${index}`).catch(() => undefined);
  };

  const finish = (o: Outcome) => {
    setRecalled((prev) => {
      const next = new Set(prev);
      if (succeeded(o)) next.add(index);
      else next.delete(index);
      return next;
    });
  };

  const applyEvaluation = (evaluation: MinoEvaluation) => {
    setMinoEval(evaluation);
    const result = recallOutcomeFromVerdict(evaluation.verdict);
    const o: Outcome = { kind: 'mino', verdict: result === true ? 'correct' : result === 'partial' ? 'partial' : result === 'uncertain' ? 'uncertain' : 'wrong' };
    setOutcome(o);
    setPhase('result');
    if (result === 'uncertain') return; // Mino could not judge this: not a verified result, so nothing is recorded or counted either way.
    finish(o);
    record(result);
  };

  // An exact match of the Bangla meaning is graded instantly; anything else — a meaning in the
  // student's own words, an English translation, a near-miss — is judged by Mino, never merely
  // because the card was flipped.
  const check = async () => {
    const route = routeRecall(subject, 'meaning', answer);
    if (route.kind === 'local') {
      const o: Outcome = { kind: 'exact' };
      setOutcome(o);
      setPhase('result');
      finish(o);
      record(true);
      return;
    }
    setPhase('checking');
    const evaluation = await mino.run({
      answerType: route.answerType,
      language: locale === 'bn' ? 'bn' : 'en',
      question: route.question,
      answer: answer.trim(),
      vocab: { word: word.word, meaningBn: word.meaning, synonyms: [], collocations: [] },
      learner: { lessonId: `vocabulary-lesson-${lesson.lessonId}`, objective: 'Recall the meaning of a vocabulary lesson word', recentMistakes: [] },
    });
    if (evaluation) applyEvaluation(evaluation); // on failure the panel below offers Retry (the answer is kept) or an explicit self-check
  };

  /** Viewing the card is not a recall attempt: nothing is sent to Mino and nothing is recorded. */
  const showAnswer = () => {
    const o: Outcome = { kind: 'skip' };
    setOutcome(o);
    setPhase('result');
    finish(o);
  };

  const selfCheckInstead = () => {
    mino.reset();
    setPhase('selfcheck');
  };

  const confirmSelfCheck = (correct: boolean) => {
    const o: Outcome = { kind: 'self', correct };
    setOutcome(o);
    setPhase('result');
    finish(o);
    record(correct);
  };

  const last = index === lesson.words.length - 1;
  const advance = () => {
    if (last) setFinished(true);
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

  return (
    <div className="max-w-xl space-y-5">
      <StudyProgress index={index} total={lesson.words.length} label={t('vocabulary.lesson.progress')} />

      <Flashcard
        locked
        revealed={phase === 'result'}
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

      {phase === 'ask' && (
        <div className="space-y-3">
          <label htmlFor="lesson-answer" className="sr-only">
            {t('vocabulary.lesson.recallQuestion')}
          </label>
          <input
            id="lesson-answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && answer.trim() && void check()}
            placeholder={t('vocabulary.lesson.answerPlaceholder')}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="h-12 w-full rounded-xl border bg-card px-4 text-base outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
          />
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <Button size="lg" disabled={!answer.trim() || mino.busy} onClick={() => void check()} data-testid="lesson-check">
              {t('vocabulary.lesson.check')}
            </Button>
            <Button variant="ghost" size="lg" onClick={showAnswer} disabled={mino.busy} data-testid="lesson-show-answer">
              {t('vocabulary.lesson.showAnswer')}
            </Button>
          </div>
        </div>
      )}

      {phase === 'checking' && (mino.state.status === 'evaluating' || mino.state.status === 'error') && (
        <div className="space-y-2">
          <MinoVerdictPanel state={mino.state} language={locale === 'bn' ? 'bn' : 'en'} onRetry={() => void mino.retry().then((ev) => ev && applyEvaluation(ev))} />
          {mino.state.status === 'error' && (
            <Button variant="ghost" size="sm" onClick={selfCheckInstead} data-testid="lesson-self-check">
              {locale === 'bn' ? 'নিজে মিলিয়ে দেখব (Mino যাচাই করেনি)' : 'Check it myself instead (not evaluated by Mino)'}
            </Button>
          )}
        </div>
      )}

      {phase === 'selfcheck' && (
        <div className="space-y-3 rounded-xl border p-4 animate-in fade-in duration-300">
          <p className="text-xl" lang="bn">
            {word.meaning}
          </p>
          <p className="text-xs text-muted-foreground">
            {locale === 'bn' ? 'Mino যাচাই করতে পারেনি — এটি নিজে মিলিয়ে দেখা, মূল্যায়ন নয়।' : 'Mino could not evaluate this — this is your own check, not a Mino evaluation.'}
          </p>
          <p className="font-medium">{locale === 'bn' ? 'আপনার উত্তর কি ঠিক ছিল?' : 'Was your answer right?'}</p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="lg" onClick={() => confirmSelfCheck(false)}>
              {locale === 'bn' ? 'না' : 'Not quite'}
            </Button>
            <Button size="lg" onClick={() => confirmSelfCheck(true)}>
              {locale === 'bn' ? 'হ্যাঁ' : 'Yes'}
            </Button>
          </div>
        </div>
      )}

      {phase === 'result' && outcome && (
        <div className="space-y-2" aria-live="polite" data-testid="lesson-result">
          {outcome.kind === 'mino' && minoEval && (
            <div className="rounded-xl border bg-card p-4" data-testid="lesson-mino-evaluation">
              <EvaluationView evaluation={minoEval} language={locale === 'bn' ? 'bn' : 'en'} />
            </div>
          )}
          {outcome.kind === 'exact' && (
            <p className="flex items-center gap-2 font-medium text-success">
              <CheckCircle2 className="size-5" /> {t('review.correct')}
            </p>
          )}
          {outcome.kind === 'self' && (
            <p className={cn('flex items-center gap-2 font-medium', outcome.correct ? 'text-success' : 'text-destructive')}>
              {outcome.correct ? <CheckCircle2 className="size-5" /> : <XCircle className="size-5" />}
              {outcome.correct ? t('review.correct') : t('review.wrong')}
            </p>
          )}
          {outcome.kind === 'skip' && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <CircleAlert className="size-4" /> {t('vocabulary.lesson.skipped')}
            </p>
          )}
          <Button size="lg" className="w-full" onClick={advance} data-testid="lesson-advance">
            {last ? t('vocabulary.lesson.finish') : t('vocabulary.lesson.next')}
          </Button>
        </div>
      )}

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
