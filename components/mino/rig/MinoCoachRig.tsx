'use client';

import { memo, useEffect, useRef, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { MinoRigController, type RigControllerOptions } from './coach-rig-controller';
import { RIG_ASPECT, RIG_MANIFEST, RIG_STAGE, rigLayerSrc, rigLayerStyle, rigOrigin, type RigLayerName } from './coach-rig-manifest';
import type { CoachRigState, RigPointDirection } from './coach-preview-state';
import { WRITING_STROKE_PATHS } from './coach-rig-writing.generated';
import './mino-rig.css';

export interface MinoCoachRigProps {
  /** Held/one-shot state to show. Changing it calls controller.play(); it never re-renders the rig DOM. */
  state?: CoachRigState;
  point?: RigPointDirection;
  /** Fired when a one-shot settles. */
  onSettle?: RigControllerOptions['onSettle'];
  /** Fired on every state change (for hosts that display the active state). */
  onStateChange?: RigControllerOptions['onStateChange'];
  /** Receives the imperative controller once the artwork has decoded (for choreographies / face overrides). */
  onReady?: (controller: MinoRigController) => void;
  /** Called (instead of onReady) if any layer image fails to decode, so a host can fall back to a static mascot. */
  onFail?: () => void;
  /** Clip the entrance to the rig's own box (so Mino enters from outside the visible area). */
  clip?: boolean;
  className?: string;
  label?: string;
}

const p = rigOrigin;
const piv = RIG_MANIFEST.pivots;

/** One layer image: absolutely placed from the manifest, never interactive, decoded before the rig is shown. */
function Layer({ name, className }: { name: RigLayerName; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={cn('mino-rig__layer', className)} data-layer={name} src={rigLayerSrc(name)} alt="" aria-hidden draggable={false} decoding="async" style={rigLayerStyle(name)} />;
}

const origin = (v: [number, number]): CSSProperties => ({ transformOrigin: p(v) });

/**
 * The real Mino Coach rig: the approved Stage B artwork (19 independent layers) in a DOM hierarchy driven by
 * data-attributes + CSS keyframes (components/mino/rig/mino-rig.css) and the imperative MinoRigController.
 * React renders it once; animation never goes through React state.
 */
function MinoCoachRigInner({ state = 'idle', point = 'right', onSettle, onStateChange, onReady, onFail, clip = false, className, label = 'Mino, your learning coach' }: MinoCoachRigProps) {
  const root = useRef<HTMLDivElement>(null);
  const ctrl = useRef<MinoRigController | null>(null);
  const wanted = useRef({ state, point });
  const cbs = useRef({ onSettle, onReady, onStateChange, onFail });
  wanted.current = { state, point };
  cbs.current = { onSettle, onReady, onStateChange, onFail };

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let cancelled = false;
    const c = new MinoRigController(el, { onSettle: (a, b) => cbs.current.onSettle?.(a, b), onStateChange: (st) => cbs.current.onStateChange?.(st) });
    ctrl.current = c;
    // Show (and start the entrance) only after every layer has decoded: no pop-in, no half-built character.
    const imgs = Array.from(el.querySelectorAll('img'));
    let failed = false;
    Promise.all(
      imgs.map((img) =>
        img.decode().catch(() => {
          failed = true;
        }),
      ),
    ).then(() => {
      if (cancelled) return;
      if (failed) {
        cbs.current.onFail?.();
        return;
      }
      el.dataset.ready = 'true';
      c.play(wanted.current.state, { point: wanted.current.point });
      cbs.current.onReady?.(c);
    });
    return () => {
      cancelled = true;
      c.destroy();
      ctrl.current = null;
    };
  }, []);

  useEffect(() => {
    const c = ctrl.current;
    if (c && root.current?.dataset.ready === 'true') c.play(state, { point });
  }, [state, point]);

  return (
    <div
      ref={root}
      className={cn('mino-rig', className)}
      data-state="idle"
      data-motion="off"
      data-eyes="open"
      data-mouth="neutral"
      data-point="right"
      data-clip={clip ? 'true' : 'false'}
      style={{ aspectRatio: `${RIG_ASPECT}` }}
      role="img"
      aria-label={label}
    >
      <div className="mino-rig__stage" data-stage={`${RIG_STAGE.w}x${RIG_STAGE.h}`}>
        <span className="mino-rig__shadow" />
        <div className="mino-rig__figure" style={origin([piv.torsoBase[0], RIG_MANIFEST.pivots.feetBaseline])}>
          <div className="mino-rig__pack" style={origin([420, 360])}>
            <Layer name="backpack" />
          </div>
          <Layer name="footR" className="mino-rig__foot mino-rig__foot-r" />
          <Layer name="footL" className="mino-rig__foot mino-rig__foot-l" />
          <div className="mino-rig__torso" style={origin(piv.torsoBase)}>
            <Layer name="body" />
            <div className="mino-rig__tag" style={origin(piv.tagHook)}>
              <Layer name="tag" />
            </div>
            <div className="mino-rig__head" style={origin([832, 520])}>
              <Layer name="mask" />
              <div className="mino-rig__eyes">
                <Layer name="eyeL" className="mino-rig__eye-open" />
                <Layer name="eyeR" className="mino-rig__eye-open" />
                <Layer name="eyeL-closed" className="mino-rig__eye-closed" />
                <Layer name="eyeR-closed" className="mino-rig__eye-closed" />
                <Layer name="eyeR-wink" className="mino-rig__eye-wink" />
              </div>
              <div className="mino-rig__mouth">
                <Layer name="mouth" className="mino-rig__mouth-neutral" />
                <Layer name="mouth-small" className="mino-rig__mouth-small" />
                <Layer name="mouth-wide" className="mino-rig__mouth-wide" />
              </div>
            </div>
            <div className="mino-rig__arm-r" style={origin(piv.shoulderR)}>
              <Layer name="shadowR" className="mino-rig__contact-shadow" />
              <Layer name="armRight" />
              <div className="mino-rig__notebook" style={origin(piv.notebookCentre)}>
                <Layer name="notebook" />
                <svg className="mino-rig__stroke" viewBox={`${RIG_STAGE.x} ${RIG_STAGE.y} ${RIG_STAGE.w} ${RIG_STAGE.h}`} aria-hidden>
                  {WRITING_STROKE_PATHS.map((d, i) => (
                    <path key={i} d={d} pathLength={1} />
                  ))}
                </svg>
              </div>
              <Layer name="armRightHand" />
            </div>
            <div className="mino-rig__arm-l" style={origin(piv.shoulderL)}>
              <Layer name="shadowL" className="mino-rig__contact-shadow" />
              <Layer name="armLeft" />
              <div className="mino-rig__pencil" style={origin(piv.pencilGrip)}>
                <Layer name="pencil" />
              </div>
            </div>
          </div>
        </div>
        <span className="mino-rig__sparkle mino-rig__sparkle-a" />
        <span className="mino-rig__sparkle mino-rig__sparkle-b" />
        <span className="mino-rig__sparkle mino-rig__sparkle-c" />
      </div>
    </div>
  );
}

export const MinoCoachRig = memo(MinoCoachRigInner);
