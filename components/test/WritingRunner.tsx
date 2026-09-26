'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScreenSkeleton } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { countWords, remainingSeconds, setResponse, submit, tick, type PracticeTest, type ProductiveFeedback, type TestSession, type WritingSection } from '@/lib/ielts';
import { writeJSON } from '@/lib/services/local-store';
import { cn } from '@/lib/utils';
import { FeedbackView, useAssessment } from './FeedbackView';
import { formatClock } from './labels';
import { TestIntro } from './TestIntro';
import { clockKey, useTestSession } from './useTestSession';

const wordsIn = (text: string) => {
  const c = countWords(text);
  return c.words + c.numbers;
};

export function WritingRunner({ test }: { test: PracticeTest }) {
  const section = test.sections.writing as WritingSection;
  const { t } = useLocale();
  const { session, setSession, resumable, start, retry, save, saveFinal } = useTestSession(test, 'writing');
  const onFeedback = useCallback((feedback: ProductiveFeedback) => setSession((s) => (s ? { ...s, feedback } : s)), [setSession]);
  const { state, retry: retryAssessment } = useAssessment(session, onFeedback);

  if (!session) {
    if (resumable === undefined) return <ScreenSkeleton />;
    return (
      <TestIntro
        test={test}
        skill="writing"
        stats={[
          [t('tests.writing.tasks'), String(section.tasks.length)],
          [t('tests.time'), t('common.minutes', { n: section.timeLimitMinutes })],
          [t('tests.writing.minimum'), section.tasks.map((x) => x.minWords).join(' / ')],
        ]}
        bullets={[t('tests.writing.introTimer'), t('tests.writing.introFeedback')]}
        resumable={resumable}
        onStart={start}
      />
    );
  }

  if (session.status === 'submitted') {
    return (
      <FeedbackView
        test={test}
        session={session}
        state={state}
        onRetryAssessment={retryAssessment}
        onRetryTest={retry}
        answers={session.responses}
      />
    );
  }

  return <ActiveWriting test={test} section={section} session={session} setSession={setSession} save={save} saveFinal={saveFinal} />;
}

function ActiveWriting({
  test,
  section,
  session,
  setSession,
  save,
  saveFinal,
}: {
  test: PracticeTest;
  section: WritingSection;
  session: TestSession;
  setSession: React.Dispatch<React.SetStateAction<TestSession | null>>;
  save: (s: TestSession) => Promise<void>;
  saveFinal: (s: TestSession) => Promise<void>;
}) {
  const { t } = useLocale();
  const router = useRouter();
  const [taskIndex, setTaskIndex] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const task = section.tasks[taskIndex];
  const text = session.responses?.[task.id] ?? '';
  const remaining = remainingSeconds(session);

  // Autosave: text is debounced (every keystroke would be too many writes); the
  // device keeps an instant copy for draft recovery.
  const latest = useRef(session);
  latest.current = session;
  useEffect(() => {
    const id = window.setTimeout(() => void save(latest.current), 1200);
    return () => window.clearTimeout(id);
  }, [session.responses, save]);
  useEffect(() => {
    writeJSON(clockKey(session.id), session.elapsedSeconds);
    if (session.elapsedSeconds > 0 && session.elapsedSeconds % 15 === 0) void save(latest.current);
  }, [session.id, session.elapsedSeconds, save]);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') setSession((s) => (s ? tick(s, 1) : s));
    }, 1000);
    const flush = () => void save(latest.current);
    window.addEventListener('pagehide', flush);
    return () => {
      window.clearInterval(id);
      window.removeEventListener('pagehide', flush);
    };
  }, [save, setSession]);

  const finish = useCallback(
    async (timedOut = false) => {
      const done = submit(latest.current, test, { timedOut });
      await saveFinal(done).catch((e) => console.error('[tests] Save failed', e));
      setSession(done);
    },
    [saveFinal, setSession, test],
  );

  useEffect(() => {
    if (remaining === 0) void finish(true);
  }, [remaining, finish]);

  const under = section.tasks.some((x) => wordsIn(session.responses?.[x.id] ?? '') < x.minWords);

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-2 sm:px-4">
        <Button variant="ghost" size="icon" aria-label={t('tests.exit')} onClick={() => router.push('/ielts/tests')}>
          <X />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {t('skills.writing')} · {t('tests.writing.taskN', { n: task.task })}
          </p>
          <p className="truncate text-xs text-muted-foreground">{t('tests.practiceLabel')}</p>
        </div>
        <div
          role="timer"
          aria-label={t('tests.timeLeft')}
          className={cn(
            'flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold tabular-nums',
            remaining < 60 ? 'border-destructive text-destructive' : remaining < 300 && 'border-amber-500 text-amber-600 dark:text-amber-400',
          )}
        >
          <Clock className="size-4" />
          {formatClock(remaining)}
        </div>
        <Button size="sm" onClick={() => setConfirm(true)}>
          {t('tests.submit')}
        </Button>
      </header>

      <div className="flex shrink-0 gap-1 border-b p-1.5" role="tablist">
        {section.tasks.map((x, i) => {
          const words = wordsIn(session.responses?.[x.id] ?? '');
          return (
            <button
              key={x.id}
              role="tab"
              aria-selected={taskIndex === i}
              onClick={() => setTaskIndex(i)}
              className={cn('flex-1 rounded-md py-1.5 text-sm font-medium', taskIndex === i ? 'bg-muted' : 'text-muted-foreground')}
            >
              {t('tests.writing.taskN', { n: x.task })} · <span className={cn('tabular-nums', words < x.minWords && 'text-amber-600')}>{words}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto lg:grid lg:grid-cols-2 lg:divide-x lg:overflow-hidden">
        <article className="space-y-4 px-4 py-6 sm:px-8 lg:overflow-y-auto">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {t('tests.writing.taskN', { n: task.task })} · {t('tests.writing.suggested', { n: task.suggestedMinutes })}
          </p>
          <p className="leading-7 whitespace-pre-line" lang="en">
            {task.prompt}
          </p>
          {task.data && (
            <figure className="space-y-2">
              <figcaption className="text-sm font-medium" lang="en">
                {task.data.caption}
              </figcaption>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm" lang="en">
                  <thead className="bg-muted/60 text-left">
                    <tr>{task.data.headers.map((h) => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {task.data.rows.map((row, r) => (
                      <tr key={r} className="border-t">
                        {row.map((cell, c) => <td key={c} className="px-3 py-2 tabular-nums">{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {task.data.note && <p className="text-xs text-muted-foreground">{task.data.note}</p>}
            </figure>
          )}
          <p className="text-sm text-muted-foreground">{t('tests.writing.minWords', { n: task.minWords })}</p>
        </article>

        <div className="flex min-h-[60vh] flex-col px-4 pb-4 sm:px-8 lg:min-h-0 lg:py-6">
          <label htmlFor={`answer-${task.id}`} className="sr-only">
            {t('tests.writing.editorLabel', { n: task.task })}
          </label>
          <textarea
            id={`answer-${task.id}`}
            lang="en"
            value={text}
            onChange={(e) => setSession((s) => (s ? setResponse(s, task.id, e.target.value) : s))}
            placeholder={t('tests.writing.placeholder')}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="sentences"
            className="min-h-0 flex-1 resize-none rounded-xl border bg-card p-4 text-[15px] leading-7 outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring/30"
          />
          <p className={cn('pt-2 text-sm font-medium tabular-nums', wordsIn(text) < task.minWords ? 'text-amber-600' : 'text-muted-foreground')} aria-live="polite">
            {t('tests.writing.words', { n: wordsIn(text) })} · {t('tests.writing.minWords', { n: task.minWords })}
          </p>
        </div>
      </div>

      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('tests.reviewTitle')}</DialogTitle>
            <DialogDescription>
              {section.tasks.map((x) => `${t('tests.writing.taskN', { n: x.task })}: ${wordsIn(session.responses?.[x.id] ?? '')}/${x.minWords}`).join(' · ')}
            </DialogDescription>
          </DialogHeader>
          {under && <p className="text-sm text-amber-700 dark:text-amber-400">{t('tests.writing.submitWarn')}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirm(false)}>
              {t('tests.keepWorking')}
            </Button>
            <Button onClick={() => void finish()}>{t('tests.submit')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
