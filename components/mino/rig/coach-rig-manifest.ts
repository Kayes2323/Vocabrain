/**
 * Typed view of public/mino/coach/manifest.json (built by scripts/mino-art/build-web-assets.mjs from the approved
 * Stage B artwork). All numbers are master pixels on the 1536x1024 canvas; the rig renders a crop of it ("stage")
 * and expresses every offset/pivot as a percentage of that stage so the rig scales to any container.
 */
import manifestJson from '@/public/mino/coach/manifest.json';

export type RigLayerName =
  | 'backpack' | 'footR' | 'footL' | 'body' | 'tag' | 'mask' | 'mouth' | 'mouth-small' | 'mouth-wide'
  | 'eyeR' | 'eyeL' | 'eyeL-closed' | 'eyeR-closed' | 'eyeR-wink' | 'armRight' | 'notebook' | 'armRightHand' | 'armLeft' | 'pencil' | 'shadowL' | 'shadowR';

export interface RigLayerMeta {
  name: RigLayerName;
  file: string;
  x: number;
  y: number;
  w: number;
  h: number;
  provenance: 'original' | 'original+locally-reconstructed' | 'locally-generated' | 'derived-from-master';
}

export const RIG_MANIFEST = manifestJson as unknown as {
  canvas: { w: number; h: number };
  order: RigLayerName[];
  layers: RigLayerMeta[];
  pivots: Record<'shoulderL' | 'shoulderR' | 'pencilGrip' | 'notebookCentre' | 'headCentre' | 'eyeL' | 'eyeR' | 'mouth' | 'torsoBase' | 'tagHook', [number, number]> & { feetBaseline: number };
};

/** The visible window of the master canvas the rig renders (character bbox x 213–1281, y 19–973 plus margin). */
export const RIG_STAGE = { x: 150, y: -64, w: 1200, h: 1088 } as const;
export const RIG_ASSET_BASE = '/mino/coach';

const pctX = (x: number) => ((x - RIG_STAGE.x) / RIG_STAGE.w) * 100;
const pctY = (y: number) => ((y - RIG_STAGE.y) / RIG_STAGE.h) * 100;

export function rigLayer(name: RigLayerName): RigLayerMeta {
  const l = RIG_MANIFEST.layers.find((layer) => layer.name === name);
  if (!l) throw new Error(`Mino rig: missing layer ${name}`);
  return l;
}

/** Absolute placement of a layer inside the stage, in % of the stage box. */
export function rigLayerStyle(name: RigLayerName): { left: string; top: string; width: string; height: string } {
  const l = rigLayer(name);
  return { left: `${pctX(l.x)}%`, top: `${pctY(l.y)}%`, width: `${(l.w / RIG_STAGE.w) * 100}%`, height: `${(l.h / RIG_STAGE.h) * 100}%` };
}

/** CSS transform-origin for a master-pixel pivot, relative to the stage box. */
export function rigOrigin([x, y]: [number, number]): string {
  return `${pctX(x).toFixed(3)}% ${pctY(y).toFixed(3)}%`;
}

export const RIG_ASPECT = RIG_STAGE.w / RIG_STAGE.h;
export const rigLayerSrc = (name: RigLayerName): string => `${RIG_ASSET_BASE}/${rigLayer(name).file}`;
