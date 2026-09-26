'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, RotateCcw, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, Panel, ProgressBar, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { formatBand } from '@/lib/engine';
import type { ObjectiveSection, PracticeTest, Question, QuestionResult, TestSession } from '@/lib/ielts';
import { cn } from '@/lib/utils';
import { formatClock, QUESTION_TYPE_LABELS } from './labels';

/** The main accepted answer, readable: "(rubber) tyres" → "rubber tyres"; all letters for choose-TWO groups. */
const displayAnswer = (r: QuestionResult) =>
  r.type === 'multiple-choice-multi' ? r.expected.join(', ') : r.expected[0].replace(/[()]/g, '');

const pct = (correct: number, total: number) => (total ? Math.round((correct / total) * 100) : 0);

export function ResultView({ test, section, session, onRetry }: { test: PracticeTest; section: ObjectiveSection; session: TestSession; onRetry: () => void }) {
  const { t } = useLocale();
  const result = session.result!;
  const partKey = section.skill === 'reading' ? 'tests.passageN' : 'tests.partN';
  // Weakest area: lowest-scoring question type with at least two questions (deterministic, not AI).
  const weakest = [...result.byType].filter((x) => x.total >= 2 && x.correct < x.total).sort((a, b) => a.correct / a.total - b.correct / b.total)[0];
  const questionsById = new Map(section.parts.flatMap((p) => p.groups.flatMap((g) => g.questions.map((q) => [q.id, q] as const))));

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 px-4 py-6 md:py-10">
      <div className="flex items-center justify-between gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/ielts/tests">{t('tests.library')}</Link>
        </Button>
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RotateCcw /> {t('tests.tryAgain')}
        </Button>
      </div>

      <header className="space-y-2">
        <p className="text-sm text-muted-foreground">
          {test.title} · {t(`skills.${section.skill}`)} · {t('tests.practiceLabel')}
        </p>
        <h1 className="text-3xl font-semibold tabular-nums">{t('tests.score', { correct: result.correct, total: result.total })}</h1>
        <p className="text-sm text-muted-foreground">
          {result.estimatedBand !== undefined
            ? t('tests.bandEstimate', { band: formatBand(result.estimatedBand) })
            : t('tests.noBandPartial')}
          {' · '}
          {t('tests.timeUsed', { time: formatClock(session.elapsedSeconds) })}
        </p>
        {session.timedOut && <StatusChip tone="warning">{t('tests.timedOut')}</StatusChip>}
      </header>

      {weakest && (
        <Callout tone="brand" title={t('tests.focusTitle')}>
          {t('tests.focusBody', { type: QUESTION_TYPE_LABELS[weakest.type], correct: weakest.correct, total: weakest.total })}
        </Callout>
      )}

      <Button asChild variant="brand" className="w-full sm:w-auto">
        <Link
          href={`/mino?${new URLSearchParams({ ask: 'result', test: test.title, skill: section.skill, date: (session.submittedAt ?? '').slice(0, 10) })}`}
        >
          <Sparkles /> {t('tests.askMino')}
        </Link>
      </Button>

      <Section title={t(section.skill === 'reading' ? 'tests.byPassage' : 'tests.byPart')}>
        <Panel className="space-y-4">
          {result.byPart.map((p) => (
            <div key={p.partId} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>{t(partKey, { n: p.number })}</span>
                <span className="font-semibold tabular-nums">{p.correct}/{p.total}</span>
              </div>
              <ProgressBar value={pct(p.correct, p.total)} label={t(partKey, { n: p.number })} tone={pct(p.correct, p.total) < 60 ? 'warning' : 'brand'} size="sm" />
            </div>
          ))}
        </Panel>
      </Section>

      <Section title={t('tests.byType')}>
        <Panel className="divide-y p-0">
          {[...result.byType]
            .sort((a, b) => a.correct / a.total - b.correct / b.total)
            .map((x) => (
              <div key={x.type} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                <span>{QUESTION_TYPE_LABELS[x.type]}</span>
                <StatusChip tone={x.correct === x.total ? 'success' : pct(x.correct, x.total) < 60 ? 'warning' : 'neutral'}>
                  {x.correct}/{x.total}
                </StatusChip>
              </div>
            ))}
        </Panel>
      </Section>

      <Section title={t('tests.answers')}>
        <ol className="divide-y rounded-xl border">
          {result.questions.map((q) => (
            <AnswerRow key={q.questionId} result={q} question={questionsById.get(q.questionId)} />
          ))}
        </ol>
      </Section>
    </div>
  );
}

function AnswerRow({ result, question }: { result: QuestionResult; question?: Question }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const explanation = question?.explanation;
  const distractor = result.given && explanation?.distractors?.[result.given];

  return (
    <li>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-muted/50"
      >
        <span
          className={cn(
            'flex size-6 shrink-0 items-center justify-center rounded-full',
            result.correct ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400' : 'bg-destructive/10 text-destructive',
          )}
          aria-label={result.correct ? t('tests.correct') : t('tests.incorrect')}
        >
          {result.correct ? <Check className="size-3.5" /> : <X className="size-3.5" />}
        </span>
        <span className="w-6 font-semibold tabular-nums">{result.number}</span>
        <span className="min-w-0 flex-1 truncate">
          {result.unanswered ? <span className="text-muted-foreground">{t('tests.noAnswer')}</span> : result.given}
          {!result.correct && <span className="text-muted-foreground"> → {displayAnswer(result)}</span>}
        </span>
        {result.nearMiss && <StatusChip tone="warning">{t('tests.spelling')}</StatusChip>}
        {result.overLimit && <StatusChip tone="warning">{t('tests.overLimit')}</StatusChip>}
        <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="space-y-2 px-4 pb-4 pl-[4.25rem] text-sm">
          <p className="text-xs text-muted-foreground">{QUESTION_TYPE_LABELS[result.type]}</p>
          {question?.prompt && <p className="font-medium">{question.prompt}</p>}
          {explanation ? (
            <>
              <p>{explanation.text}</p>
              {explanation.evidence && (
                <blockquote className="border-l-2 border-primary/50 pl-3 text-muted-foreground italic">
                  {explanation.evidence.paragraphId && <span className="not-italic font-semibold">{t('tests.paragraph', { id: explanation.evidence.paragraphId })} · </span>}
                  “{explanation.evidence.quote}”
                </blockquote>
              )}
              {distractor && (
                <p>
                  <span className="font-medium">{t('tests.whyNot', { answer: result.given })}</span> {distractor}
                </p>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">{t('tests.noExplanation')}</p>
          )}
        </div>
      )}
    </li>
  );
}
