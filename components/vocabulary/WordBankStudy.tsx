'use client';

import { useRef, useState } from 'react';
import { Bookmark, BookmarkCheck, CheckCircle2, CircleAlert, Lightbulb, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, StatusChip } from '@/components/ds';
import { EvaluationView, MinoVerdictPanel } from '@/components/mino-eval/MinoVerdictPanel';
import { useMinoEvaluation } from '@/components/mino-eval/useMinoEvaluation';
import type { MinoEvaluation } from '@/lib/mino-eval/types';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useBrain } from '@/components/providers/BrainProvider';
import { getWordBankInfo } from '@/lib/content/dictionary';
import { recallOutcomeFromVerdict, routeRecall, wordId, type RecallOutcome, type RecallSubject } from '@/lib/engine';
import type { IELTSWord } from '@/lib/ielts-vocabulary';
import { cn } from '@/lib/utils';
import { Flashcard } from './Flashcard';
import { StudyNav, StudyProgress } from './StudyControls';

interface WordBankStudyProps {
  band: number;
  words: IELTSWord[];
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

type Phase = 'ask' | 'checking' | 'selfcheck' | 'result';
type Outcome = { kind: 'exact' } | { kind: 'mino'; verdict: 'correct' | 'partial' | 'wrong' } | { kind: 'self'; correct: boolean } | { kind: 'skip' };

export function WordBankStudy({ band, words }: WordBankStudyProps) {
  const { t, locale } = useLocale();
  const brain = useBrain();
  const mino = useMinoEvaluation();
  const [minoEval, setMinoEval] = useState<MinoEvaluation | null>(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [phase, setPhase] = useState<Phase>('ask');
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  // One id per card this session, so a retry or navigating back and forth never double-counts a recall.
  const sessionKey = useRef(`wb${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`);
  const recorded = useRef(false);

  const go = (i: number) => {
    setIndex(Math.max(0, Math.min(words.length - 1, i)));
    setAnswer('');
    setPhase('ask');
    setOutcome(null);
    setMinoEval(null);
    mino.reset();
    recorded.current = false;
  };

  const word = words[index];
  const brainId = wordId(word.word.toLowerCase());
  const saved = Boolean(brain.get(brainId));
  const toggleSave = () => {
    if (saved) return void brain.remove(brainId).catch(() => undefined);
    const entry = getWordBankInfo(word.id);
    if (entry) void brain.save(entry.info, { type: 'word-bank', title: entry.title }, entry.info.exampleSentence).catch(() => undefined);
  };

  const subject: RecallSubject = { word: word.word, lemma: word.word.toLowerCase(), meaning: word.definition, synonyms: word.synonyms };

  /** Only a word already saved to My Brain has a schedule to update — this feeds the SAME
   * BrainWord record every other surface reads, never a separate self-report counter. */
  const record = (result: RecallOutcome) => {
    if (recorded.current) return;
    recorded.current = true;
    if (saved) void brain.recordRecall(brainId, 'meaning', result, answer, undefined, `${sessionKey.current}:${index}`).catch(() => undefined);
  };

  const applyEvaluation = (evaluation: MinoEvaluation) => {
    setMinoEval(evaluation);
    const result = recallOutcomeFromVerdict(evaluation.verdict);
    setOutcome({ kind: 'mino', verdict: result === true ? 'correct' : result === 'partial' ? 'partial' : 'wrong' });
    setPhase('result');
    record(result);
  };

  // An exact match of the trusted meaning is graded instantly; anything else — a meaning in the
  // student's own words, a near-miss, a Bangla translation — is judged by Mino, never by keyword
  // overlap, and never merely because the card was flipped.
  const check = async () => {
    const route = routeRecall(subject, 'meaning', answer);
    if (route.kind === 'local') {
      setOutcome({ kind: 'exact' });
      setPhase('result');
      record(true);
      return;
    }
    setPhase('checking');
    const evaluation = await mino.run({
      answerType: route.answerType,
      language: locale === 'bn' ? 'bn' : 'en',
      question: route.question,
      answer: answer.trim(),
      vocab: { word: word.word, partOfSpeech: word.partOfSpeech, meaning: word.definition, synonyms: word.synonyms.slice(0, 12), collocations: [] },
      learner: { lessonId: 'word-bank-study', objective: 'Recall the meaning of a saved IELTS word bank word', recentMistakes: [] },
    });
    if (evaluation) applyEvaluation(evaluation); // on failure the panel below offers Retry (the answer is kept) or an explicit self-check
  };

  /** Viewing the card is not a recall attempt: nothing is sent to Mino and nothing is recorded. */
  const showAnswer = () => {
    setOutcome({ kind: 'skip' });
    setPhase('result');
  };

  const selfCheckInstead = () => {
    mino.reset();
    setPhase('selfcheck');
  };

  const confirmSelfCheck = (correct: boolean) => {
    setOutcome({ kind: 'self', correct });
    setPhase('result');
    record(correct);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
      <div className="space-y-5">
        <StudyProgress index={index} total={words.length} label={t('vocabulary.band', { band: String(band) })} />
        <Flashcard
          locked
          revealed={phase === 'result'}
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

        {phase === 'ask' && (
          <div className="space-y-3">
            <label htmlFor="wordbank-answer" className="sr-only">
              {t('vocabulary.lesson.recallQuestion')}
            </label>
            <input
              id="wordbank-answer"
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
              <Button size="lg" disabled={!answer.trim() || mino.busy} onClick={() => void check()} data-testid="wordbank-check">
                {t('vocabulary.lesson.check')}
              </Button>
              <Button variant="ghost" size="lg" onClick={showAnswer} disabled={mino.busy} data-testid="wordbank-show-answer">
                {t('vocabulary.lesson.showAnswer')}
              </Button>
            </div>
          </div>
        )}

        {phase === 'checking' && (mino.state.status === 'evaluating' || mino.state.status === 'error') && (
          <div className="space-y-2">
            <MinoVerdictPanel state={mino.state} language={locale === 'bn' ? 'bn' : 'en'} onRetry={() => void mino.retry().then((ev) => ev && applyEvaluation(ev))} />
            {mino.state.status === 'error' && (
              <Button variant="ghost" size="sm" onClick={selfCheckInstead} data-testid="wordbank-self-check">
                {locale === 'bn' ? 'নিজে মিলিয়ে দেখব (Mino যাচাই করেনি)' : 'Check it myself instead (not evaluated by Mino)'}
              </Button>
            )}
          </div>
        )}

        {phase === 'selfcheck' && (
          <div className="space-y-3 rounded-xl border p-4 animate-in fade-in duration-300">
            <p className="text-lg">{word.definition}</p>
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
          <div className="space-y-2" aria-live="polite" data-testid="wordbank-result">
            {outcome.kind === 'mino' && minoEval && (
              <div className="rounded-xl border bg-card p-4" data-testid="wordbank-mino-evaluation">
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
          </div>
        )}

        <Button variant={saved ? 'secondary' : 'outline'} size="lg" className="w-full" onClick={toggleSave} aria-pressed={saved}>
          {saved ? <BookmarkCheck className="text-brand" /> : <Bookmark />}
          {saved ? t('vocabulary.bank.savedToBrain') : t('vocabulary.bank.save')}
        </Button>
        <StudyNav index={index} total={words.length} onPrev={() => go(index - 1)} onNext={() => go(index + 1)} />
      </div>

      {phase === 'result' && (
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
