import { ROADMAP_TEMPLATE } from '@/lib/content/roadmap';
import type { Country, RoadmapOverride, RoadmapStepDef, SourceRef } from '@/lib/models';
import { getPathway, visaCategoriesFor } from './pathways';

export interface ResolvedStepDef extends RoadmapStepDef {
  /** Official source, for a step a country, pathway or visa category adds. */
  source?: SourceRef;
}

/** Applies one override (skip, rename, add) to a list of steps. */
function applyOverride(steps: ResolvedStepDef[], o: RoadmapOverride | undefined): ResolvedStepDef[] {
  if (!o) return steps;
  let out = steps.filter((s) => !o.skip?.includes(s.id)).map((s) => (o.rename?.[s.id] ? { ...s, title: o.rename[s.id] } : s));
  for (const add of o.add ?? []) {
    if (out.some((s) => s.id === add.step.id)) continue; // never duplicate a step
    const at = out.findIndex((s) => s.id === add.after);
    const step: ResolvedStepDef = { ...add.step, ...(add.source ? { source: add.source } : {}) };
    out = at < 0 ? [...out, step] : [...out.slice(0, at + 1), step, ...out.slice(at + 1)];
  }
  return out;
}

/**
 * A student's roadmap for a country: the 16-step template, then the
 * country's override, then the chosen pathway's, then its visa categories'.
 * Without a pathway (or for a country without pathways) nothing changes.
 */
type RoadmapCountry = Partial<Pick<Country, 'code' | 'roadmap' | 'pathways'>>;

export function roadmapDefs(country: RoadmapCountry | undefined, ctx: { pathway?: string } = {}): ResolvedStepDef[] {
  let steps = applyOverride(ROADMAP_TEMPLATE, country?.roadmap);
  const pathway = country ? getPathway(country, ctx.pathway) : undefined;
  if (country && pathway) {
    steps = applyOverride(steps, pathway.roadmap);
    if (country.code) for (const c of visaCategoriesFor({ code: country.code, pathways: country.pathways }, pathway.id)) steps = applyOverride(steps, c.roadmap);
  }
  return steps;
}

/** Finds a step on any of the country's pathway variants (for links that don't carry the pathway). */
export function findStepDef(country: RoadmapCountry | undefined, stepId: string | null): ResolvedStepDef | undefined {
  if (!stepId) return undefined;
  const variants = [undefined, ...(country?.pathways ?? []).map((p) => p.id)];
  for (const pathway of variants) {
    const step = roadmapDefs(country, { pathway }).find((d) => d.id === stepId);
    if (step) return step;
  }
  return undefined;
}

/** Fills {code} in a roadmap link. */
export const roadmapHref = (href: string, code: string) => href.replace(/\{code\}/g, code.toLowerCase());
