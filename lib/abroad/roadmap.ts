import { ROADMAP_TEMPLATE } from '@/lib/content/roadmap';
import type { Country, RoadmapStepDef, SourceRef } from '@/lib/models';

export interface ResolvedStepDef extends RoadmapStepDef {
  /** Official source, for a step a country adds on top of the template. */
  source?: SourceRef;
}

/**
 * A country's roadmap: the 16-step template with that country's sourced
 * overrides applied (steps it skips, renames, or adds). Without an override
 * every country gets the template unchanged.
 */
export function roadmapDefs(country: Pick<Country, 'roadmap'> | undefined): ResolvedStepDef[] {
  const o = country?.roadmap;
  let steps: ResolvedStepDef[] = ROADMAP_TEMPLATE.filter((s) => !o?.skip?.includes(s.id)).map((s) => (o?.rename?.[s.id] ? { ...s, title: o.rename[s.id] } : s));
  for (const add of o?.add ?? []) {
    const at = steps.findIndex((s) => s.id === add.after);
    const step: ResolvedStepDef = { ...add.step, ...(add.source ? { source: add.source } : {}) };
    steps = at < 0 ? [...steps, step] : [...steps.slice(0, at + 1), step, ...steps.slice(at + 1)];
  }
  return steps;
}

/** Fills {code} in a roadmap link. */
export const roadmapHref = (href: string, code: string) => href.replace(/\{code\}/g, code.toLowerCase());
