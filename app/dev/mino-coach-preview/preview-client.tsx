'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MinoCoachRig } from '@/components/mino/rig/MinoCoachRig';
import { RigStateControls } from '@/components/mino/dev/RigStateControls';
import type { MinoRigController } from '@/components/mino/rig/coach-rig-controller';
import type { CoachRigState, RigPointDirection } from '@/components/mino/rig/coach-preview-state';
import { RIG_MANIFEST, RIG_STAGE } from '@/components/mino/rig/coach-rig-manifest';

const SIZES = [
  { label: 'Desktop 420', px: 420 },
  { label: 'Welcome 320', px: 320 },
  { label: 'Mobile 220', px: 220 },
] as const;

function PivotOverlay() {
  const pts = Object.entries(RIG_MANIFEST.pivots).filter(([, v]) => Array.isArray(v)) as [string, [number, number]][];
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden data-testid="pivot-overlay">
      {pts.map(([k, [x, y]]) => (
        <span key={k} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${((x - RIG_STAGE.x) / RIG_STAGE.w) * 100}%`, top: `${((y - RIG_STAGE.y) / RIG_STAGE.h) * 100}%` }}>
          <span className="block size-2 rounded-full bg-red-500 ring-2 ring-white" />
          <span className="absolute top-2 left-2 rounded bg-black/70 px-1 text-[9px] whitespace-nowrap text-white">{k}</span>
        </span>
      ))}
    </div>
  );
}

export function MinoCoachPreviewClient() {
  const [ctrl, setCtrl] = useState<MinoRigController | null>(null);
  const [active, setActive] = useState<CoachRigState>('idle');
  const [point, setPoint] = useState<RigPointDirection>('right');
  const [size, setSize] = useState<number>(420);
  const [pivots, setPivots] = useState(false);
  const [slow, setSlow] = useState(false);
  const [hold, setHold] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const rootWrap = useRef<HTMLDivElement>(null);

  const note = useCallback((s: string) => setLog((l) => [`${new Date().toLocaleTimeString()}  ${s}`, ...l].slice(0, 12)), []);

  // inspection mode: one-shots stay on screen instead of auto-settling
  useEffect(() => {
    rootWrap.current?.querySelector<HTMLElement>('.mino-rig')?.setAttribute('data-hold', hold ? 'true' : 'false');
  }, [hold]);

  // slow motion (0.25x) for defect hunting: applied to every running animation of the rig, re-applied on state change
  useEffect(() => {
    const el = rootWrap.current;
    if (!el) return;
    const apply = () => el.getAnimations({ subtree: true }).forEach((a) => a.updatePlaybackRate(slow ? 0.25 : 1));
    apply();
    const id = window.setInterval(apply, 150);
    return () => window.clearInterval(id);
  }, [slow, active]);

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-4 md:p-6">
      <header className="space-y-2">
        <p className="inline-block rounded bg-amber-100 px-2 py-1 text-xs font-semibold tracking-wide text-amber-800 uppercase">Dev-only — not reachable in production</p>
        <h1 className="text-2xl font-semibold">Mino Coach — real artwork rig preview</h1>
        <p className="text-sm text-muted-foreground">
          The approved Stage B artwork (21 independent layers: 19 artwork + 2 contact-shadow) in the existing DOM/CSS rig. Trigger each state below; slow motion and pivot markers help spot defects. The shipped mascot in Task 1/Task 2/My Brain is untouched.{' '}
          <Link className="underline" href="/dev/mino-task1-welcome-preview">Open the Task 1 welcome placement preview →</Link>
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
        <div className="space-y-3 lg:sticky lg:top-4 lg:self-start">
          <div ref={rootWrap} className="relative mx-auto rounded-xl border border-dashed border-border bg-[repeating-conic-gradient(#f4f4f5_0_25%,#fff_0_50%)] bg-[length:20px_20px] p-0" style={{ width: size, maxWidth: '100%' }} data-testid="rig-frame">
            <MinoCoachRig
              onReady={(c) => { setCtrl(c); note('artwork decoded, rig ready'); }}
              onStateChange={(s) => { setActive(s); }}
              onSettle={(from, to) => { note(`${from} settled → ${to}`); }}
            />
            {pivots && <PivotOverlay />}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            {SIZES.map((s) => (
              <button key={s.px} type="button" className={`rounded-full border px-3 py-1 ${size === s.px ? 'border-foreground bg-foreground text-background' : 'border-border bg-card'}`} onClick={() => setSize(s.px)}>{s.label}</button>
            ))}
            <label className="flex items-center gap-1"><input type="checkbox" checked={pivots} onChange={(e) => setPivots(e.target.checked)} /> pivots</label>
            <label className="flex items-center gap-1"><input type="checkbox" checked={hold} onChange={(e) => setHold(e.target.checked)} /> hold one-shots</label>
            <label className="flex items-center gap-1"><input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} /> slow (0.25×)</label>
          </div>
          <p className="text-center text-xs text-muted-foreground" data-testid="rig-active">active: <b>{active}</b></p>
        </div>

        <div className="space-y-4">
          <RigStateControls
            controller={ctrl}
            active={active}
            point={point}
            onPoint={setPoint}
          />
          <section className="space-y-1">
            <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Event log</h2>
            <pre className="max-h-40 overflow-auto rounded bg-muted/50 p-2 text-[11px]" data-testid="rig-log">{log.join('\n') || '—'}</pre>
          </section>
        </div>
      </div>
    </main>
  );
}
