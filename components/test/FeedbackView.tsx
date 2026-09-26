'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, Panel, Section, StatusChip } from '@/components/ds';
import { useAuth } from '@/components/providers/AuthProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { assessSession } from '@/lib/ai/client';
import { formatBand } from '@/lib/engine';
import type { PracticeTest, ProductiveFeedback, TaskFeedback, TestSession } from '@/lib/ielts';

type State = { status: 'idle' | 'loading' | 'failed' | 'guest' } | { status: 'done' };

/** Gets Mino's feedback once for a submitted Writing/Speaking attempt. */
export function useAssessment(session: TestSession | null, onFeedback: (f: ProductiveFeedback) => void) {
  const { isGuest } = useAuth();
  const { locale } = useLocale();
  const [state, setState] = useState<State>({ status: 'idle' });
  const started = useRef<string | null>(null);

  const run = useCallback(async () => {
    if (!session) return;
    if (isGuest) return setState({ status: 'guest' });
    setState({ status: 'loading' });
    const res = await assessSession(session.id, locale === 'bn' ? 'bn' : 'en');
    if (res.ok) {
      onFeedback(res.feedback);
      setState({ status: 'done' });
    } else setState({ status: res.error === 'unauthenticated' ? 'guest' : 'failed' });
  }, [session, isGuest, locale, onFeedback]);

  useEffect(() => {
    if (session?.status === 'submitted' && !session.feedback && started.current !== session.id) {
      started.current = session.id;
      void run();
    }
  }, [session, run]);

  return { state, retry: run };
}

function Band({ band }: { band: number | null }) {
  const { t } = useLocale();
  return band === null ? <StatusChip>{t('tests.feedback.notAssessed')}</StatusChip> : <StatusChip tone="brand">{formatBand(band)}</StatusChip>;
}

function TaskBlock({ task, answer }: { task: TaskFeedback; answer?: string }) {
  const { t } = useLocale();
  const list = (title: string, items: React.ReactNode[]) =>
    items.length > 0 && (
      <div className="space-y-1.5">
        <p className="text-sm font-semibold">{title}</p>
        <ul className="space-y-1.5 text-sm">{items}</ul>
      </div>
    );
  return (
    <Panel className="space-y-5">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">
          {task.title}
          {task.wordCount !== undefined && <span className="ml-2 text-sm font-normal text-muted-foreground">{t('tests.feedback.words', { n: task.wordCount })}</span>}
        </p>
        <Band band={task.band} />
      </div>
      <div className="divide-y rounded-lg border">
        {task.criteria.map((c) => (
          <div key={c.criterion} className="space-y-1 px-3 py-2.5">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-medium">{c.criterion}</span>
              <Band band={c.band} />
            </div>
            {c.comment && <p className="text-sm text-muted-foreground">{c.comment}</p>}
          </div>
        ))}
      </div>
      {list(t('tests.feedback.strengths'), task.strengths.map((s, i) => <li key={i}>✓ {s}</li>))}
      {list(
        t('tests.feedback.mistakes'),
        task.mistakes.map((m, i) => (
          <li key={i} className="rounded-lg bg-muted/50 p-2.5">
            <p lang="en">
              <span className="line-through decoration-destructive/60">{m.quote}</span> → <span className="font-medium">{m.fix}</span>
            </p>
            <p className="text-muted-foreground">{m.why}</p>
          </li>
        )),
      )}
      {list(
        t('tests.feedback.better'),
        task.betterSentences.map((b, i) => (
          <li key={i} className="space-y-0.5" lang="en">
            <p className="text-muted-foreground">{b.original}</p>
            <p className="font-medium">→ {b.improved}</p>
          </li>
        )),
      )}
      {list(
        t('tests.feedback.vocabulary'),
        task.vocabulary.map((v, i) => (
          <li key={i}>
            <span className="font-medium" lang="en">
              {v.word}
            </span>
            : {v.tip}
          </li>
        )),
      )}
      {list(t('tests.feedback.actions'), task.actions.map((a, i) => <li key={i}>→ {a}</li>))}
      {answer && (
        <details className="text-sm">
          <summary className="cursor-pointer text-muted-foreground">{t('tests.feedback.yourAnswer')}</summary>
          <p className="mt-2 whitespace-pre-wrap" lang="en">
            {answer}
          </p>
        </details>
      )}
    </Panel>
  );
}

/** Result screen for Writing and Speaking attempts. */
export function FeedbackView({
  test,
  session,
  state,
  onRetryAssessment,
  onRetryTest,
  answers,
}: {
  test: PracticeTest;
  session: TestSession;
  state: State;
  onRetryAssessment: () => void;
  onRetryTest: () => void;
  /** Answer text per task id, shown under each task. */
  answers?: Record<string, string>;
}) {
  const { t } = useLocale();
  const f = session.feedback;
  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 px-4 py-6 md:py-10">
      <div className="flex items-center justify-between gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/ielts/tests">{t('tests.library')}</Link>
        </Button>
        <Button variant="outline" size="sm" onClick={onRetryTest}>
          <RotateCcw /> {t('tests.tryAgain')}
        </Button>
      </div>

      <header className="space-y-2">
        <p className="text-sm text-muted-foreground">
          {test.title} · {t(`skills.${session.skill}`)} · {t('tests.practiceLabel')}
        </p>
        <h1 className="text-3xl font-semibold">
          {f ? (f.overall !== null ? t('tests.feedback.estimate', { band: formatBand(f.overall) }) : t('tests.feedback.noEstimate')) : t('tests.feedback.title')}
        </h1>
        <p className="text-sm text-muted-foreground">{t('tests.feedback.notOfficial')}</p>
      </header>

      {!f && state.status === 'loading' && (
        <Panel className="flex items-center gap-3">
          <Sparkles className="size-5 animate-pulse text-brand" /> {t('tests.feedback.loading')}
        </Panel>
      )}
      {!f && state.status === 'guest' && (
        <Callout tone="warning">
          {t('tests.feedback.signIn')}
        </Callout>
      )}
      {!f && state.status === 'failed' && (
        <Callout tone="warning" title={t('tests.feedback.failed')}>
          <Button size="sm" variant="outline" className="mt-2" onClick={onRetryAssessment}>
            {t('tests.feedback.retry')}
          </Button>
        </Callout>
      )}

      {f && (
        <>
          {(f.notes.includes('incomplete') || f.notes.includes('transcript-only') || f.skill === 'writing') && (
            <ul className="space-y-1 text-sm text-muted-foreground">
              {f.skill === 'writing' && <li>• {t('tests.feedback.writingWeight')}</li>}
              {f.notes.includes('transcript-only') && <li>• {t('tests.feedback.transcriptOnly')}</li>}
              {f.notes.includes('incomplete') && <li>• {t('tests.feedback.incomplete')}</li>}
            </ul>
          )}
          <Section title={t('tests.feedback.title')}>
            <div className="space-y-4">
              {f.tasks.map((task) => (
                <TaskBlock key={task.taskId} task={task} answer={answers?.[task.taskId]} />
              ))}
            </div>
          </Section>
          <Button asChild variant="brand" className="w-full sm:w-auto">
            <Link href={`/mino?${new URLSearchParams({ ask: 'feedback', skill: session.skill, date: (session.submittedAt ?? '').slice(0, 10) })}`}>
              <Sparkles /> {t('tests.feedback.askMino')} <ArrowRight />
            </Link>
          </Button>
        </>
      )}
    </div>
  );
}
