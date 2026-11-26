'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Panel } from '@/components/ds';
import { Button } from '@/components/ui/button';
import { MinoCoachMascot } from '@/components/mino/MinoCoachMascot';
import type { MinoRigController } from '@/components/mino/rig/coach-rig-controller';
import { WELCOME_SEQUENCE, WELCOME_TOTAL_MS, type CoachRigState, type RigPointDirection } from '@/components/mino/rig/coach-preview-state';
import { coachText, COACH_ROLE, COACH_WELCOME } from '@/lib/mino/coach-messages';

type Locale = 'en' | 'bn';

const PHASES: { id: string; label: string; range: string; state: CoachRigState }[] = [
  { id: 'p1', label: 'Peek-in', range: '0–200 ms', state: 'entrance' },
  { id: 'p2', label: 'Soft roll-in', range: '200–600 ms', state: 'entrance' },
  { id: 'p3', label: 'Tiny hop & landing', range: '600–900 ms', state: 'landing' },
  { id: 'p4', label: 'Pencil salute', range: '900–1260 ms', state: 'greeting' },
  { id: 'p5', label: 'Ready idle', range: '1260–1400 ms', state: 'greeting' },
];

const STATE_BUTTONS: { label: string; state: CoachRigState; point?: RigPointDirection }[] = [
  { label: 'Entrance', state: 'entrance' },
  { label: 'Landing', state: 'landing' },
  { label: 'Greeting', state: 'greeting' },
  { label: 'Speaking', state: 'speaking' },
  { label: 'Explaining', state: 'explaining', point: 'right' },
  { label: 'Writing', state: 'writing' },
  { label: 'Success', state: 'success' },
  { label: 'Idle', state: 'idle' },
];
const POINT_BUTTONS: { label: string; point: RigPointDirection }[] = [
  { label: 'Pointing left', point: 'left' },
  { label: 'Pointing centre', point: 'center' },
  { label: 'Pointing right', point: 'right' },
];
const FUTURE_BUTTONS: { label: string; state: CoachRigState }[] = [
  { label: 'Thinking', state: 'thinking' },
  { label: 'Encouraging', state: 'encouraging' },
];

const btn = 'min-h-11 rounded-xl border px-3 py-2 text-sm font-medium transition-colors active:scale-[0.98] disabled:opacity-50';

/** Follows the rig's `data-state` attribute so the page can show what is playing (review tooling only). */
function useRigState(host: React.RefObject<HTMLElement | null>, ready: boolean): CoachRigState {
  const [state, setState] = useState<CoachRigState>('idle');
  useEffect(() => {
    const root = host.current?.querySelector<HTMLElement>('.mino-rig');
    if (!ready || !root) return;
    const read = () => setState((root.dataset.state || 'idle') as CoachRigState);
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ['data-state'] });
    return () => mo.disconnect();
  }, [host, ready]);
  return state;
}

export function MinoReviewClient() {
  const [locale, setLocale] = useState<Locale>('bn');
  const [ctrl, setCtrl] = useState<MinoRigController | null>(null);
  const [replay, setReplay] = useState(0);
  const [slow, setSlow] = useState(false);
  const [point, setPoint] = useState<RigPointDirection>('right');
  const [lastAction, setLastAction] = useState('Opening sequence (automatic)');
  const stageRef = useRef<HTMLDivElement>(null);
  const state = useRigState(stageRef, !!ctrl);

  const playOpening = useCallback(() => {
    ctrl?.playSequence(WELCOME_SEQUENCE);
    setReplay((n) => n + 1);
    setLastAction('Opening sequence: entrance → landing → greeting → idle');
  }, [ctrl]);
  const playState = useCallback((s: CoachRigState, p?: RigPointDirection, label?: string) => {
    if (p) setPoint(p);
    ctrl?.play(s, p ? { point: p } : { point });
    setLastAction(label ?? s);
  }, [ctrl, point]);

  // slow motion (0.25×) helps judge the 1.4 s opening on a phone
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const apply = () => el.getAnimations({ subtree: true }).forEach((a) => a.updatePlaybackRate(slow ? 0.25 : 1));
    apply();
    const id = window.setInterval(apply, 120);
    return () => window.clearInterval(id);
  }, [slow, state]);

  const role = coachText(locale, COACH_ROLE.task1);
  const welcome = coachText(locale, COACH_WELCOME.task1);

  return (
    <main className="mx-auto max-w-3xl space-y-5 p-4 pb-16" data-testid="mino-review">
      <header className="space-y-2">
        <p className="inline-block rounded bg-amber-100 px-2 py-1 text-xs font-semibold tracking-wide text-amber-800 uppercase">Review build — not visible to learners in production</p>
        <h1 className="text-xl font-semibold">Mino animation review</h1>
        <p className="text-sm text-muted-foreground">The real layered Mino through the same central component every screen uses. Opening: “Mino’s Soft Roll-In &amp; Pencil Salute” (~1.4 s).</p>
      </header>

      {/* 1. the stage: automatic opening, replay, current state */}
      <section className="space-y-3 rounded-2xl border bg-card p-3" aria-labelledby="stage-h">
        <h2 id="stage-h" className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Stage</h2>
        <div ref={stageRef} className="mx-auto w-full max-w-[340px]" data-testid="review-stage">
          <MinoCoachMascot pose="welcome" size="xl" className="w-full" onController={setCtrl} />
        </div>
        <div className="space-y-2">
          <p className="text-sm" data-testid="review-now">Now playing: <b data-testid="review-state">{state}</b> <span className="text-muted-foreground">· last request: {lastAction}</span></p>
          <div key={replay} className="h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
            <div className="h-full origin-left rounded-full bg-brand" style={{ animation: `review-bar ${slow ? WELCOME_TOTAL_MS * 4 : WELCOME_TOTAL_MS}ms linear forwards` }} />
          </div>
          <ol className="grid gap-1 text-xs" data-testid="review-phases">
            {PHASES.map((p) => (
              <li key={p.id} className={`flex justify-between rounded-md px-2 py-1 ${state === p.state ? 'bg-brand/10 font-medium text-foreground' : 'text-muted-foreground'}`}>
                <span>{p.label}</span>
                <span>{p.range}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button className="min-h-11" data-testid="review-replay" disabled={!ctrl} onClick={playOpening}>Replay opening</Button>
          <label className={`${btn} flex items-center justify-center gap-2 bg-card`}>
            <input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} data-testid="review-slow" /> Slow motion (¼×)
          </label>
        </div>
      </section>

      {/* 2. individual states */}
      <section className="space-y-3 rounded-2xl border bg-card p-3" aria-labelledby="states-h">
        <h2 id="states-h" className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">States</h2>
        <div className="grid grid-cols-2 gap-2">
          {STATE_BUTTONS.map((b) => (
            <button key={b.label} type="button" data-testid={`review-${b.state}`} disabled={!ctrl} onClick={() => playState(b.state, b.point, b.label)} className={`${btn} ${state === b.state ? 'border-foreground bg-foreground text-background' : 'border-border bg-card'}`}>
              {b.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2" aria-label="Pointing">
          {POINT_BUTTONS.map((b) => (
            <button key={b.point} type="button" data-testid={`review-point-${b.point}`} disabled={!ctrl} onClick={() => playState('explaining', b.point, b.label)} className={`${btn} ${state === 'explaining' && point === b.point ? 'border-foreground bg-foreground text-background' : 'border-border bg-card'}`}>
              {b.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Available for future screens (not used in the current flows):</p>
        <div className="grid grid-cols-2 gap-2">
          {FUTURE_BUTTONS.map((b) => (
            <button key={b.state} type="button" data-testid={`review-${b.state}`} disabled={!ctrl} onClick={() => playState(b.state, undefined, b.label)} className={`${btn} border-dashed ${state === b.state ? 'border-foreground bg-foreground text-background' : 'border-border bg-muted/40 text-muted-foreground'}`}>
              {b.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. real placements, all through the central component */}
      <section className="space-y-3" aria-labelledby="places-h">
        <div className="flex items-center justify-between">
          <h2 id="places-h" className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">In the app (same component)</h2>
          <div className="flex gap-1 text-sm">
            <button type="button" data-testid="review-locale-en" className={`rounded-full border px-3 py-1 ${locale === 'en' ? 'bg-foreground text-background' : ''}`} onClick={() => setLocale('en')}>EN</button>
            <button type="button" data-testid="review-locale-bn" className={`rounded-full border px-3 py-1 ${locale === 'bn' ? 'bg-foreground text-background' : ''}`} onClick={() => setLocale('bn')}>বাংলা</button>
          </div>
        </div>

        <PlaceWelcome locale={locale} role={role} welcome={welcome} />

        <Panel variant="brand" className="space-y-3" data-testid="review-lesson-card">
          <div className="flex items-center gap-2.5">
            <MinoCoachMascot pose="speaking" size="sm" />
            <div>
              <p className="text-xs font-semibold tracking-wide text-brand uppercase">{role}</p>
              <p className="text-sm font-medium text-muted-foreground">Visual Information বোঝা — লেখার আগে পড়ো</p>
            </div>
          </div>
          <p className="text-sm font-semibold">লেখার আগে পড়ো</p>
          <p className="text-[15px] leading-relaxed text-foreground/90">হাই, আবার স্বাগতম। আগের lesson-এ তুমি শিখেছ IELTS Academic Writing Task 1 আসলে কী চায়। আজ আমরা এমন একটা skill develop করব যেটা লেখার আগে দরকার: visual-টা নিজে বোঝা।</p>
          <p className="text-xs text-muted-foreground">Lesson trainer panel (every lesson step): Mino speaking, in its usual spot beside the heading.</p>
        </Panel>

        <div className="flex flex-col items-center gap-3 rounded-2xl border bg-card px-4 py-8 text-center" data-testid="review-reading">
          <MinoCoachMascot pose="thinking" size="lg" />
          <p className="font-medium">Mino is reading your answer against the IELTS criteria…</p>
          <p className="text-sm text-muted-foreground">This usually takes a few seconds.</p>
        </div>
      </section>

      <p className="text-xs text-muted-foreground">
        Real screens: <Link className="underline" href="/ielts/writing-studio/task1">Task 1 Academy</Link> · <Link className="underline" href="/ielts/writing-studio/task2">Task 2 Academy</Link> · <Link className="underline" href="/ielts/vocabulary">My Brain</Link> (these need a signed-in account).
      </p>
    </main>
  );
}

/** The Task 1 welcome exactly as in MinoCoachWelcome (layout/copy), but never writes the "seen" flag, so it can be replayed freely. */
function PlaceWelcome({ locale, role, welcome }: { locale: Locale; role: string; welcome: string }) {
  const [n, setN] = useState(0);
  return (
    <Panel variant="brand" className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left" data-testid="review-welcome-card">
      <MinoCoachMascot key={n} pose="welcome" size="xl" className="shrink-0" />
      <div className="min-w-0 flex-1 space-y-3">
        <p className="text-xs font-semibold tracking-wide text-brand uppercase">{role}</p>
        <p className="text-[15px] leading-relaxed text-foreground/90 text-pretty">{welcome}</p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
          <Button disabled>{locale === 'bn' ? 'চলুন, শুরু করি' : 'Start learning'}</Button>
          <Button variant="outline" data-testid="review-welcome-replay" onClick={() => setN((x) => x + 1)}>
            {locale === 'bn' ? 'আবার শুনি' : 'Replay welcome'}
          </Button>
        </div>
      </div>
    </Panel>
  );
}
