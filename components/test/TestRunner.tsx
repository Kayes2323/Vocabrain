'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Clock, Flag, ListChecks, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScreenSkeleton } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  answeredNumbers, goTo, questionSlots, remainingSeconds, setAnswer, submit, tick, toggleFlag,
  type AnswerValue, type ObjectiveSection, type ObjectiveSkill, type PracticeTest, type TestSession,
} from '@/lib/ielts';
import { writeJSON } from '@/lib/services/local-store';
import { cn } from '@/lib/utils';
import { formatClock } from './labels';
import { QuestionGroupView } from './QuestionGroupView';
import { ResultView } from './ResultView';
import { TestIntro } from './TestIntro';
import { clockKey, useTestSession } from './useTestSession';

/** Seconds of timer progress between background saves (answers save straight away). */
const TIME_SAVE_INTERVAL = 15;

export function TestRunner({ test, skill }: { test: PracticeTest; skill: ObjectiveSkill }) {
  const section = test.sections[skill] as ObjectiveSection;
  const { t } = useLocale();
  const { session, setSession, resumable, start, retry, save } = useTestSession(test, skill);

  if (!session) {
    if (resumable === undefined) return <ScreenSkeleton />;
    return (
      <TestIntro
        test={test}
        skill={skill}
        stats={[
          [t('tests.questionsLabel'), String(questionSlots(section).length)],
          [t(skill === 'reading' ? 'tests.passages' : 'tests.parts'), String(section.parts.length)],
          [t('tests.time'), t('common.minutes', { n: section.timeLimitMinutes })],
        ]}
        resumable={resumable}
        onStart={start}
      />
    );
  }

  if (session.status === 'submitted') {
    return (
      <ResultView
        test={test}
        section={section}
        session={session}
        onRetry={retry}
      />
    );
  }

  return <ActiveTest test={test} section={section} session={session} setSession={setSession} save={save} />;
}

function ActiveTest({
  test,
  section,
  session,
  setSession,
  save,
}: {
  test: PracticeTest;
  section: ObjectiveSection;
  session: TestSession;
  setSession: React.Dispatch<React.SetStateAction<TestSession | null>>;
  save: (s: TestSession) => Promise<void>;
}) {
  const { t } = useLocale();
  const router = useRouter();
  const slots = useMemo(() => questionSlots(section), [section]);
  const answered = useMemo(() => answeredNumbers(section, session.answers), [section, session.answers]);
  const current = session.currentNumber;
  const partId = slots.find((s) => s.number === current)?.partId ?? section.parts[0].id;
  const part = section.parts.find((p) => p.id === partId)!;
  const [mobileView, setMobileView] = useState<'passage' | 'questions'>('passage');
  const [reviewOpen, setReviewOpen] = useState(false);
  const remaining = remainingSeconds(session);

  // Persist: straight away for answers/flags/position, every 15s for the timer.
  const latest = useRef(session);
  latest.current = session;
  const saved = useRef({ updatedAt: session.updatedAt, elapsed: session.elapsedSeconds });
  useEffect(() => {
    writeJSON(clockKey(session.id), session.elapsedSeconds);
    const changed = session.updatedAt !== saved.current.updatedAt;
    if (changed || session.elapsedSeconds - saved.current.elapsed >= TIME_SAVE_INTERVAL) {
      saved.current = { updatedAt: session.updatedAt, elapsed: session.elapsedSeconds };
      void save(session);
    }
  }, [session, save]);

  // Timer runs only while the page is visible; progress is flushed when leaving.
  // The interval is created once, so frequent re-renders (typing) never delay it.
  const saveRef = useRef(save);
  saveRef.current = save;
  useEffect(() => {
    const flush = () => void saveRef.current(latest.current);
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') setSession((s) => (s ? tick(s, 1) : s));
    }, 1000);
    const onHide = () => document.visibilityState === 'hidden' && flush();
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('pagehide', flush);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('pagehide', flush);
    };
  }, [setSession]);

  // Time's up: submit automatically, as in the real test.
  useEffect(() => {
    if (remaining === 0) setSession((s) => (s && s.status === 'in-progress' ? submit(s, test, { timedOut: true }) : s));
  }, [remaining, setSession, test]);

  const onAnswer = useCallback((key: string, value: AnswerValue) => setSession((s) => (s ? setAnswer(s, key, value) : s)), [setSession]);
  const onFocusQuestion = useCallback((n: number) => setSession((s) => (s ? goTo(s, n) : s)), [setSession]);

  const jump = (n: number) => {
    setSession((s) => (s ? goTo(s, n) : s));
    setMobileView('questions');
    setReviewOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(`q-${n}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      document.getElementById(`q-${n}-input`)?.focus({ preventScroll: true });
    });
  };

  const index = slots.findIndex((s) => s.number === current);
  const unanswered = slots.length - answered.size;
  const skillLabel = t(`skills.${section.skill}`);

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-background">
      {/* Header: where am I, how much time is left */}
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-2 sm:px-4">
        <Button variant="ghost" size="icon" aria-label={t('tests.exit')} onClick={() => router.push('/ielts/tests')}>
          <X />
        </Button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {skillLabel} · {t(section.skill === 'reading' ? 'tests.passageN' : 'tests.partN', { n: part.number })}
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
        <Button variant="outline" size="sm" onClick={() => setReviewOpen(true)}>
          <ListChecks />
          <span className="hidden sm:inline">{t('tests.review')}</span>
        </Button>
      </header>

      {/* Mobile: passage and questions take turns; desktop shows both */}
      {part.passage && (
        <div className="flex shrink-0 gap-1 border-b p-1.5 lg:hidden" role="tablist">
          {(['passage', 'questions'] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={mobileView === v}
              onClick={() => setMobileView(v)}
              className={cn('flex-1 rounded-md py-1.5 text-sm font-medium', mobileView === v ? 'bg-muted' : 'text-muted-foreground')}
            >
              {t(`tests.view.${v}`)}
            </button>
          ))}
        </div>
      )}

      <div className={cn('min-h-0 flex-1', part.passage && 'lg:grid lg:grid-cols-2 lg:divide-x')}>
        {part.passage && (
          <article className={cn('h-full overflow-y-auto px-4 py-6 sm:px-8', mobileView !== 'passage' && 'hidden lg:block')}>
            <div className="mx-auto max-w-2xl space-y-4">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{t('tests.passageN', { n: part.number })}</p>
              <h2 className="text-xl font-semibold">{part.passage.title}</h2>
              {part.passage.paragraphs.map((p) => (
                <p key={p.id} className="flex gap-3 leading-7">
                  {p.labelled && <span className="w-5 shrink-0 font-semibold">{p.id}</span>}
                  <span>{p.text}</span>
                </p>
              ))}
            </div>
          </article>
        )}
        <div className={cn('h-full overflow-y-auto px-4 py-6 sm:px-8', part.passage && mobileView !== 'questions' && 'hidden lg:block')}>
          <div className="mx-auto max-w-2xl space-y-10 pb-6">
            {part.groups.map((g) => (
              <QuestionGroupView key={g.id} group={g} answers={session.answers} onAnswer={onAnswer} onFocusQuestion={onFocusQuestion} current={current} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer: question navigator */}
      <footer className="shrink-0 border-t bg-background pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center gap-2 px-2 py-2 sm:px-4">
          <Button variant="ghost" size="icon" disabled={index <= 0} onClick={() => jump(slots[index - 1].number)} aria-label={t('tests.previous')}>
            <ChevronLeft />
          </Button>
          <nav aria-label={t('tests.navigator')} className="flex min-w-0 flex-1 gap-3 overflow-x-auto py-1">
            {section.parts.map((p) => (
              <div key={p.id} className="flex shrink-0 items-center gap-1">
                <span className="pr-1 text-xs font-medium text-muted-foreground">{t(section.skill === 'reading' ? 'tests.passageShort' : 'tests.partShort', { n: p.number })}</span>
                {slots
                  .filter((s) => s.partId === p.id)
                  .map(({ number }) => (
                    <button
                      key={number}
                      onClick={() => jump(number)}
                      aria-label={t('tests.questionN', { n: number })}
                      aria-current={number === current ? 'step' : undefined}
                      className={cn(
                        'relative h-8 min-w-8 rounded-md border text-xs font-semibold tabular-nums',
                        answered.has(number) ? 'border-primary/40 bg-primary/10' : 'bg-background',
                        number === current && 'ring-2 ring-primary',
                      )}
                    >
                      {number}
                      {session.flagged.includes(number) && <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-amber-500" />}
                    </button>
                  ))}
              </div>
            ))}
          </nav>
          <Button
            variant={session.flagged.includes(current) ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setSession((s) => (s ? toggleFlag(s, current) : s))}
            aria-label={t('tests.flag')}
            aria-pressed={session.flagged.includes(current)}
          >
            <Flag className={cn(session.flagged.includes(current) && 'fill-amber-500 text-amber-500')} />
          </Button>
          <Button variant="ghost" size="icon" disabled={index >= slots.length - 1} onClick={() => jump(slots[index + 1].number)} aria-label={t('tests.next')}>
            <ChevronRight />
          </Button>
        </div>
      </footer>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t('tests.reviewTitle')}</DialogTitle>
            <DialogDescription>
              {t('tests.reviewSummary', { answered: answered.size, total: slots.length, flagged: session.flagged.length })}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-10">
            {slots.map(({ number }) => (
              <button
                key={number}
                onClick={() => jump(number)}
                className={cn(
                  'relative h-9 rounded-md border text-xs font-semibold tabular-nums',
                  answered.has(number) ? 'border-primary/40 bg-primary/10' : 'border-dashed',
                )}
              >
                {number}
                {session.flagged.includes(number) && <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-amber-500" />}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="size-3 rounded border border-primary/40 bg-primary/10" />{t('tests.legend.answered')}</span>
            <span className="flex items-center gap-1.5"><span className="size-3 rounded border border-dashed" />{t('tests.legend.unanswered')}</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-amber-500" />{t('tests.legend.flagged')}</span>
          </div>
          {unanswered > 0 && <p className="text-sm text-amber-700 dark:text-amber-400">{t('tests.unansweredWarning', { n: unanswered })}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewOpen(false)}>
              {t('tests.keepWorking')}
            </Button>
            <Button onClick={() => setSession((s) => (s ? submit(s, test) : s))}>{t('tests.submit')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
