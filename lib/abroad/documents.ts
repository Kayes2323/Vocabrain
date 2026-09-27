import type { Country, DocumentApplicability, DocumentKind, DocumentRequirement, SourcedValue } from '@/lib/models';
import type { DegreeLevel } from '@/lib/constants';
import { getPathway, visaCategoriesFor } from './pathways';
import { roadmapDefs } from './roadmap';
import { appliesTo } from './sections';

/** What we know about the student's route, for picking documents. */
export interface DocumentContext {
  pathway?: string;
  visaCategoryId?: string;
  degreeLevel?: DegreeLevel;
  programId?: string;
  scholarshipIds?: string[];
}

export interface DocumentReason {
  from: 'roadmap' | 'pathway' | 'visa';
  /** Pathway or visa category id (absent for the general roadmap). */
  id?: string;
  purpose: DocumentRequirement['purpose'];
  /** The official statement, when verified; absent = "not verified yet". */
  requirement?: SourcedValue<string>;
}

export interface DocumentNeed {
  kind: DocumentKind;
  /** Every reason this document is needed; one document is never listed twice. */
  reasons: DocumentReason[];
}

/** Unknown answers never hide a document; a known answer that doesn't match does. */
export function documentApplies(app: DocumentApplicability | undefined, ctx: DocumentContext): boolean {
  if (!app) return true;
  if (!appliesTo(app, ctx)) return false;
  if (app.visaCategoryIds?.length && ctx.visaCategoryId && !app.visaCategoryIds.includes(ctx.visaCategoryId)) return false;
  if (app.programIds?.length && ctx.programId && !app.programIds.includes(ctx.programId)) return false;
  if (app.scholarshipIds?.length && ctx.scholarshipIds && !app.scholarshipIds.some((id) => ctx.scholarshipIds!.includes(id))) return false;
  return true;
}

/**
 * "Documents you need": the roadmap's general documents, then the chosen
 * pathway's, then its visa categories' (only the chosen one, when known),
 * each kept once with all the reasons it is needed.
 */
export function documentsFor(country: Pick<Country, 'code' | 'roadmap' | 'pathways'> | undefined, ctx: DocumentContext = {}): DocumentNeed[] {
  const needs: DocumentNeed[] = [];
  const add = (kind: DocumentKind, reason: DocumentReason) => {
    const found = needs.find((n) => n.kind === kind);
    if (found) {
      if (!found.reasons.some((r) => r.from === reason.from && r.id === reason.id && r.purpose === reason.purpose)) found.reasons.push(reason);
    } else needs.push({ kind, reasons: [reason] });
  };
  for (const step of roadmapDefs(country, { pathway: ctx.pathway })) for (const k of step.documents ?? []) add(k, { from: 'roadmap', purpose: 'general' });
  if (!country) return needs;
  const pathway = getPathway(country, ctx.pathway);
  for (const d of pathway?.documents ?? []) if (documentApplies(d.appliesTo, ctx)) add(d.kind, { from: 'pathway', id: pathway!.id, purpose: d.purpose, ...(d.requirement ? { requirement: d.requirement } : {}) });
  const categories = visaCategoriesFor(country, pathway?.id).filter((c) => !ctx.visaCategoryId || c.id === ctx.visaCategoryId);
  // Without a chosen pathway, visa documents stay out: they depend on the route.
  if (pathway || ctx.visaCategoryId) {
    for (const c of categories) for (const d of c.documents ?? []) if (documentApplies(d.appliesTo, { ...ctx, visaCategoryId: c.id })) add(d.kind, { from: 'visa', id: c.id, purpose: d.purpose, ...(d.requirement ? { requirement: d.requirement } : {}) });
  }
  return needs;
}
