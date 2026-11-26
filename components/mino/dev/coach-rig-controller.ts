/**
 * MinoRigController — the one imperative controller for the Mino Coach DOM rig.
 *
 * It owns everything that is not pure CSS: which of the 10 states is active, the one-shot settle timers, the
 * natural-blink scheduler, motion gating (reduced-motion / save-data / off-screen / hidden tab) and listener
 * lifecycle. It writes `data-*` attributes on the rig root and nothing else, so React renders the rig exactly once
 * and never re-renders to animate. It knows nothing about IELTS lessons: a host calls `play()` / `playSequence()`.
 *
 * Contract:
 *  - exactly one state is active at a time (`data-state`); `play()` always wins and restarts one-shots;
 *  - one-shots (entrance/landing/greeting/success/encouraging) settle to the held base state after rigStateHoldMs;
 *  - held states (idle/speaking/explaining/writing/thinking) stay until the next `play()`;
 *  - `destroy()` clears every timer and listener.
 */
import { motionAllowed, nextBlinkDelay, isDoubleBlink, MINO_TIMING } from '@/lib/mino/motion';
import {
  isRigOneShot,
  REDUCED_MOTION_SETTLE_MS,
  rigBlinkAllowed,
  rigSettleTarget,
  rigStateHoldMs,
  type CoachRigState,
  type RigPointDirection,
} from './coach-preview-state';

/** Every group that carries a state animation: their live pose is bridged back to rest when a state is interrupted. */
const POSE_GROUPS = ['figure', 'pack', 'torso', 'tag', 'head', 'eyes', 'arm-r', 'arm-l', 'notebook', 'pencil', 'shadow'] as const;
/** How long the pose bridge takes (ms) and how far from rest a group must be before a bridge is worth playing. */
export const RIG_BRIDGE_MS = 190;
/** A pose far from rest (e.g. the raised wave arm) takes longer to ease back so it never looks like a flick. */
export const RIG_BRIDGE_MAX_MS = 440;
const BRIDGE_MIN = { translatePx: 3, rotateDeg: 1.8, scale: 0.016 };

export type RigEyes = 'open' | 'closed' | 'wink';
export type RigMouth = 'neutral' | 'small' | 'wide';

export interface RigPlayOptions {
  /** Direction the `explaining` gesture points (toward the content). Default 'right'. */
  point?: RigPointDirection;
}

export interface RigControllerOptions {
  /** Called when a one-shot finishes and the rig has returned to its base state (or the next in a sequence). */
  onSettle?: (settled: CoachRigState, now: CoachRigState) => void;
  onStateChange?: (state: CoachRigState) => void;
  /** Injectable for tests. */
  random?: () => number;
}

export class MinoRigController {
  private root: HTMLElement;
  private opts: RigControllerOptions;
  private state: CoachRigState = 'idle';
  private base: CoachRigState = 'idle';
  private sequence: CoachRigState[] = [];
  private seqIndex = 0;
  private settleTimer: ReturnType<typeof setTimeout> | undefined;
  private blinkTimer: ReturnType<typeof setTimeout> | undefined;
  private blinkReopenTimer: ReturnType<typeof setTimeout> | undefined;
  private onScreen = true;
  private io: IntersectionObserver | null = null;
  private reducedMq: MediaQueryList | null = null;
  private destroyed = false;
  private motionOn = false;
  private bridgeAnims: Animation[] = [];
  private bridgeTimer: ReturnType<typeof setTimeout> | undefined;
  private groupEls: HTMLElement[] | null = null;

  constructor(root: HTMLElement, opts: RigControllerOptions = {}) {
    this.root = root;
    this.opts = opts;
    this.reducedMq = typeof window !== 'undefined' ? window.matchMedia?.('(prefers-reduced-motion: reduce)') ?? null : null;
    if (typeof IntersectionObserver !== 'undefined') {
      this.io = new IntersectionObserver((entries) => {
        this.onScreen = entries[entries.length - 1]?.isIntersecting ?? true;
        this.refreshMotion();
      });
      this.io.observe(root);
    }
    document.addEventListener('visibilitychange', this.refreshMotion);
    this.reducedMq?.addEventListener?.('change', this.refreshMotion);
    this.root.dataset.eyes = 'open';
    this.root.dataset.mouth = 'neutral';
    this.root.dataset.point = 'right';
    this.refreshMotion();
  }

  get current(): CoachRigState {
    return this.state;
  }
  get motion(): boolean {
    return this.motionOn;
  }

  /** Re-evaluates reduced-motion / save-data / visibility and gates the CSS (`data-motion`) and blink scheduler. */
  private refreshMotion = (): void => {
    if (this.destroyed) return;
    const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    this.motionOn = motionAllowed({ animated: true, reducedMotion: Boolean(this.reducedMq?.matches), saveData, visible: this.onScreen && !document.hidden });
    this.root.dataset.motion = this.motionOn ? 'on' : 'off';
    this.root.dataset.reduced = this.reducedMq?.matches ? 'true' : 'false';
    if (this.motionOn) this.scheduleBlink();
    else this.cancelBlink();
  };

  /** Jump to a state. `play()` always wins; one-shots restart even if already active. */
  play(state: CoachRigState, options: RigPlayOptions = {}): void {
    if (this.destroyed) return;
    this.sequence = [];
    if (!isRigOneShot(state)) this.base = state; // a one-shot returns to the held state that was active before it
    this.setState(state, options);
  }

  /** Play a choreography: each one-shot settles into the next entry; a held last entry becomes the base state. */
  playSequence(sequence: readonly CoachRigState[], options: RigPlayOptions = {}): void {
    if (this.destroyed || sequence.length === 0) return;
    this.sequence = [...sequence];
    this.seqIndex = 0;
    if (!isRigOneShot(this.sequence[0])) this.base = this.sequence[0];
    this.setState(this.sequence[0], options);
  }

  private groups(): HTMLElement[] {
    if (!this.groupEls) this.groupEls = POSE_GROUPS.map((g) => this.root.querySelector<HTMLElement>(`.mino-rig__${g}`)).filter((e): e is HTMLElement => !!e);
    return this.groupEls;
  }

  /** True when the element is visibly away from its rest pose (matrix or opacity). */
  private away(el: HTMLElement): boolean {
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) < 0.98) return true;
    const t = cs.transform;
    if (!t || t === 'none') return false;
    const m = new DOMMatrixReadOnly(t);
    const rot = (Math.atan2(m.b, m.a) * 180) / Math.PI;
    return Math.hypot(m.e, m.f) > BRIDGE_MIN.translatePx || Math.abs(rot) > BRIDGE_MIN.rotateDeg || Math.abs(Math.hypot(m.a, m.b) - 1) > BRIDGE_MIN.scale || Math.abs(Math.hypot(m.c, m.d) - 1) > BRIDGE_MIN.scale;
  }

  /**
   * Interrupting a state must never leave the character in that state's pose: capture the live pose of every
   * animated group, drop the old state, ease the groups back to rest (script animations outrank the CSS ones),
   * and only then start the next state from rest. Reduced motion / nothing displaced → no bridge, instant switch.
   */
  private setState(next: CoachRigState, options: RigPlayOptions = {}): void {
    clearTimeout(this.settleTimer);
    clearTimeout(this.bridgeTimer);
    this.cancelBlinkReopen();
    const live = this.motionOn ? this.groups().filter((el) => this.away(el)) : [];
    const poses = live.map((el) => ({ el, transform: getComputedStyle(el).transform, opacity: getComputedStyle(el).opacity }));
    for (const a of this.bridgeAnims) a.cancel();
    this.bridgeAnims = [];
    const farDeg = poses.reduce((mx, { transform }) => { if (transform === 'none') return mx; const m = new DOMMatrixReadOnly(transform); return Math.max(mx, Math.abs((Math.atan2(m.b, m.a) * 180) / Math.PI)); }, 0);
    const bridgeMs = Math.min(RIG_BRIDGE_MAX_MS, Math.round(RIG_BRIDGE_MS + farDeg * 1.9));
    this.state = next;
    this.opts.onStateChange?.(next);
    if (!rigBlinkAllowed(next)) this.cancelBlink();
    if (poses.length === 0) {
      this.applyState(next, options);
      return;
    }
    // `data-state` is the requested state right away; `data-bridge` pauses all CSS animation while the live pose is eased to rest
    if (options.point) this.root.dataset.point = options.point;
    this.root.dataset.state = next;
    this.root.dataset.bridge = 'true';
    this.root.dataset.eyes = 'open';
    this.bridgeAnims = poses.map(({ el, transform, opacity }) =>
      el.animate([{ transform: transform === 'none' ? 'none' : transform, opacity }, { transform: 'none', opacity: '1' }], { duration: bridgeMs, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }),
    );
    this.bridgeTimer = setTimeout(() => {
      for (const a of this.bridgeAnims) a.cancel();
      this.bridgeAnims = [];
      if (this.destroyed || this.state !== next) return;
      delete this.root.dataset.bridge;
      this.armState(next);
    }, bridgeMs);
  }

  /** Start `next` from rest: restarts CSS animations cleanly (clear, flush, apply) and arms the settle/blink timers. */
  private applyState(next: CoachRigState, options: RigPlayOptions): void {
    delete this.root.dataset.bridge;
    if (options.point) this.root.dataset.point = options.point;
    this.root.dataset.state = '';
    void this.root.offsetWidth;
    this.root.dataset.state = next;
    this.root.dataset.eyes = 'open';
    this.armState(next);
  }

  private armState(next: CoachRigState): void {
    if (rigBlinkAllowed(next) && this.motionOn) this.scheduleBlink();
    const hold = rigStateHoldMs(next);
    // data-hold="true" (preview/inspection only) keeps one-shots on screen instead of auto-settling
    if (hold > 0 && this.root.dataset.hold !== 'true') {
      const ms = this.motionOn ? hold : REDUCED_MOTION_SETTLE_MS;
      this.settleTimer = setTimeout(() => this.settle(), ms);
    }
  }

  private settle(): void {
    if (this.destroyed) return;
    const settled = this.state;
    if (this.sequence.length && this.seqIndex + 1 < this.sequence.length) {
      this.seqIndex += 1;
      const nxt = this.sequence[this.seqIndex];
      if (!isRigOneShot(nxt)) this.base = nxt;
      this.setState(nxt);
      this.opts.onSettle?.(settled, nxt);
      return;
    }
    // A choreography that ends on a one-shot (e.g. thinking → success) returns to idle; a lone one-shot returns to the held state it interrupted.
    const target = this.sequence.length ? 'idle' : rigSettleTarget(this.base);
    this.sequence = [];
    this.base = target;
    this.setState(target);
    this.opts.onSettle?.(settled, target);
  }

  // ---- natural blinking (independent channel: only touches data-eyes) ----
  private scheduleBlink(): void {
    if (this.blinkTimer || this.destroyed || !this.motionOn || !rigBlinkAllowed(this.state)) return;
    const rnd = this.opts.random ?? Math.random;
    this.blinkTimer = setTimeout(() => {
      this.blinkTimer = undefined;
      if (this.destroyed || !this.motionOn) return;
      if (rigBlinkAllowed(this.state)) this.blinkOnce(isDoubleBlink(rnd), rnd);
      this.scheduleBlink();
    }, nextBlinkDelay(rnd));
  }

  private blinkOnce(double: boolean, rnd: () => number): void {
    this.root.dataset.eyes = 'closed';
    this.blinkReopenTimer = setTimeout(() => {
      this.root.dataset.eyes = 'open';
      if (double) {
        this.blinkReopenTimer = setTimeout(() => {
          if (this.destroyed || !rigBlinkAllowed(this.state)) return;
          this.root.dataset.eyes = 'closed';
          this.blinkReopenTimer = setTimeout(() => {
            this.root.dataset.eyes = 'open';
          }, MINO_TIMING.blinkClosed);
        }, MINO_TIMING.doubleBlinkGap);
      }
    }, MINO_TIMING.blinkClosed);
    void rnd;
  }

  private cancelBlinkReopen(): void {
    clearTimeout(this.blinkReopenTimer);
    this.blinkReopenTimer = undefined;
  }
  private cancelBlink(): void {
    clearTimeout(this.blinkTimer);
    this.blinkTimer = undefined;
    this.cancelBlinkReopen();
    this.root.dataset.eyes = 'open';
  }

  /** Force a static facial expression (debug / preview): eyes and mouth are independent channels. */
  setFace(face: { eyes?: RigEyes; mouth?: RigMouth }): void {
    if (face.eyes) this.root.dataset.eyes = face.eyes;
    if (face.mouth) this.root.dataset.mouth = face.mouth;
  }

  destroy(): void {
    this.destroyed = true;
    clearTimeout(this.settleTimer);
    clearTimeout(this.bridgeTimer);
    for (const a of this.bridgeAnims) a.cancel();
    this.cancelBlink();
    this.io?.disconnect();
    this.io = null;
    document.removeEventListener('visibilitychange', this.refreshMotion);
    this.reducedMq?.removeEventListener?.('change', this.refreshMotion);
  }
}
