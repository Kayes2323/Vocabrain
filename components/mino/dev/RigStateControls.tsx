'use client';

import { useRef } from 'react';
import { RIG_POINT_DIRECTIONS, isRigDormant, type CoachRigState, type RigPointDirection } from '../rig/coach-preview-state';
import type { MinoRigController, RigEyes, RigMouth } from '../rig/coach-rig-controller';

/** The states the Task 1 welcome flow uses (dormant ones are listed separately and never triggered by a flow). */
export const ACTIVE_BUTTONS: { state: CoachRigState; label: string }[] = [
  { state: 'entrance', label: 'Entrance' },
  { state: 'landing', label: 'Landing' },
  { state: 'greeting', label: 'Greeting (pencil salute)' },
  { state: 'speaking', label: 'Speaking' },
  { state: 'explaining', label: 'Explaining / pointing' },
  { state: 'writing', label: 'Writing' },
  { state: 'success', label: 'Success' },
  { state: 'idle', label: 'Idle' },
];
export const DORMANT_BUTTONS: { state: CoachRigState; label: string }[] = [
  { state: 'thinking', label: 'Thinking' },
  { state: 'encouraging', label: 'Encouraging' },
];

const chip = 'rounded-full border px-3 py-1.5 text-sm transition-colors';

/** Dev-only controls shared by both previews. Talks to the controller imperatively; holds no animation state. */
export function RigStateControls({
  controller,
  active,
  point,
  onPoint,
  onWelcome,
}: {
  controller: MinoRigController | null;
  active: CoachRigState;
  point: RigPointDirection;
  onPoint: (p: RigPointDirection) => void;
  onWelcome?: () => void;
}) {
  const welcomeBtn = useRef<HTMLButtonElement>(null);
  const play = (s: CoachRigState) => controller?.play(s, { point });
  const btn = (s: CoachRigState, label: string, dormant = false) => (
    <button
      key={s}
      type="button"
      data-testid={`rig-state-${s}`}
      disabled={!controller}
      onClick={() => play(s)}
      className={`${chip} ${active === s ? 'border-foreground bg-foreground text-background' : dormant ? 'border-dashed border-border bg-muted/40 text-muted-foreground' : 'border-border bg-card'}`}
    >
      {label}
      {dormant && isRigDormant(s) ? ' · dormant' : ''}
    </button>
  );
  return (
    <div className="space-y-4" data-testid="rig-controls">
      <section className="space-y-2">
        <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">States</h2>
        <div className="flex flex-wrap gap-2">{ACTIVE_BUTTONS.map((b) => btn(b.state, b.label))}</div>
        <div className="flex flex-wrap gap-2">{DORMANT_BUTTONS.map((b) => btn(b.state, b.label, true))}</div>
      </section>
      <section className="space-y-2">
        <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Choreographies</h2>
        <div className="flex flex-wrap gap-2">
          <button ref={welcomeBtn} type="button" data-testid="rig-seq-welcome" disabled={!controller} className={`${chip} border-border bg-card`} onClick={() => (onWelcome ? onWelcome() : controller?.playSequence(['entrance', 'landing', 'greeting']))}>
            Opening: entrance → landing → greeting → idle
          </button>
          <button type="button" data-testid="rig-seq-lesson" disabled={!controller} className={`${chip} border-border bg-card`} onClick={() => controller?.playSequence(['explaining', 'writing'], { point })}>
            Lesson start: explaining → writing
          </button>
          <button type="button" data-testid="rig-seq-success" disabled={!controller} className={`${chip} border-border bg-card`} onClick={() => controller?.playSequence(['success', 'idle'])}>
            Success → idle
          </button>
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Pointing direction (explaining)</h2>
        <div className="flex gap-2">
          {RIG_POINT_DIRECTIONS.map((d) => (
            <button key={d} type="button" data-testid={`rig-point-${d}`} className={`${chip} ${point === d ? 'border-foreground bg-foreground text-background' : 'border-border bg-card'}`} onClick={() => { onPoint(d); controller?.play('explaining', { point: d }); }}>
              {d}
            </button>
          ))}
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Face channels (independent of body state)</h2>
        <div className="flex flex-wrap gap-2">
          {(['open', 'closed', 'wink'] as RigEyes[]).map((e) => (
            <button key={e} type="button" data-testid={`rig-eyes-${e}`} disabled={!controller} className={`${chip} border-border bg-card`} onClick={() => controller?.setFace({ eyes: e })}>
              eyes: {e}
            </button>
          ))}
          {(['neutral', 'small', 'wide'] as RigMouth[]).map((m) => (
            <button key={m} type="button" data-testid={`rig-mouth-${m}`} disabled={!controller} className={`${chip} border-border bg-card`} onClick={() => controller?.setFace({ mouth: m })}>
              mouth: {m}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Face overrides stay until the next state is played; speaking/greeting/success then drive their own face.</p>
      </section>
    </div>
  );
}
