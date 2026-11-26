'use client';

import { useState } from 'react';
import { MinoCoachPlaceholder } from '@/components/mino/dev/MinoCoachPlaceholder';
import {
  COACH_RIG_STATES,
  evaluationSequence,
  LESSON_START_SEQUENCE,
  WELCOME_SEQUENCE,
  type CoachRigState,
} from '@/components/mino/dev/coach-preview-state';

const STATE_LABELS: Record<CoachRigState, string> = {
  idle: 'Idle',
  entrance: 'Entrance',
  landing: 'Landing',
  greeting: 'Greeting',
  speaking: 'Speaking',
  explaining: 'Explaining',
  writing: 'Writing',
  thinking: 'Thinking',
  success: 'Success',
  encouraging: 'Encouraging',
};

function useSequence(seq: CoachRigState[], onDone: () => void) {
  const [queue, setQueue] = useState<CoachRigState[] | null>(null);
  const advance = () => {
    setQueue((q) => {
      if (!q || q.length <= 1) {
        onDone();
        return null;
      }
      return q.slice(1);
    });
  };
  const start = () => setQueue(seq);
  return { current: queue?.[0] ?? null, start, advance };
}

export function MinoCoachPreviewClient() {
  const [manual, setManual] = useState<CoachRigState>('idle');
  const [running, setRunning] = useState<'welcome' | 'lesson' | 'eval-success' | 'eval-encouraging' | null>(null);

  const welcome = useSequence(WELCOME_SEQUENCE, () => setRunning(null));
  const lesson = useSequence(LESSON_START_SEQUENCE, () => setRunning(null));
  const evalSuccess = useSequence(evaluationSequence('success'), () => setRunning(null));
  const evalEncouraging = useSequence(evaluationSequence('encouraging'), () => setRunning(null));

  const active =
    running === 'welcome' ? welcome.current :
    running === 'lesson' ? lesson.current :
    running === 'eval-success' ? evalSuccess.current :
    running === 'eval-encouraging' ? evalEncouraging.current :
    manual;

  const onSettle = () => {
    if (running === 'welcome') welcome.advance();
    else if (running === 'lesson') lesson.advance();
    else if (running === 'eval-success') evalSuccess.advance();
    else if (running === 'eval-encouraging') evalEncouraging.advance();
  };

  const runSequence = (which: typeof running, seq: ReturnType<typeof useSequence>) => {
    setRunning(which);
    seq.start();
  };

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6">
      <header className="space-y-2">
        <p className="inline-block rounded bg-amber-100 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
          Dev-only — not reachable in production
        </p>
        <h1 className="text-2xl font-semibold">Mino Coach animation-architecture preview</h1>
        <p className="text-sm text-muted-foreground">
          Every shape below is placeholder rig artwork (see <code>docs/MINO_COACH_CHARACTER_SPEC.md</code>), not the approved
          Mino character. It exists to demonstrate the 10-state animation mechanics — pivots, timing, layer independence — so
          they can be reviewed before any real artwork is produced. The shipped mascot in Task 1/Task 2/My Brain is untouched.
        </p>
      </header>

      <div className="flex justify-center py-10">
        <MinoCoachPlaceholder state={active ?? 'idle'} onStateSettle={onSettle} />
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Individual states</h2>
        <div className="flex flex-wrap gap-2">
          {COACH_RIG_STATES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setRunning(null);
                setManual(s);
              }}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                active === s && !running ? 'border-foreground bg-foreground text-background' : 'border-border bg-card'
              }`}
            >
              {STATE_LABELS[s]}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Choreographed sequences</h2>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="rounded-full border border-border bg-card px-3 py-1.5 text-sm" onClick={() => runSequence('welcome', welcome)}>
            Welcome: entrance → landing → greeting → speaking
          </button>
          <button type="button" className="rounded-full border border-border bg-card px-3 py-1.5 text-sm" onClick={() => runSequence('lesson', lesson)}>
            Lesson start: explaining → writing
          </button>
          <button type="button" className="rounded-full border border-border bg-card px-3 py-1.5 text-sm" onClick={() => runSequence('eval-success', evalSuccess)}>
            Evaluation: thinking → success
          </button>
          <button type="button" className="rounded-full border border-border bg-card px-3 py-1.5 text-sm" onClick={() => runSequence('eval-encouraging', evalEncouraging)}>
            Evaluation: thinking → encouraging
          </button>
        </div>
        {running && <p className="text-sm text-muted-foreground">Running: {STATE_LABELS[active ?? 'idle']}…</p>}
      </section>
    </main>
  );
}
