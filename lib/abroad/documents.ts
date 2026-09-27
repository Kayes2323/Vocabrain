import { SCHOLARSHIPS } from '@/lib/content/scholarships';
import { PROGRAMS, UNIVERSITIES } from '@/lib/content/universities';
import type { Bilingual, Country, DocumentApplicability, DocumentKind, DocumentRequirement, SourcedValue } from '@/lib/models';
import type { DegreeLevel } from '@/lib/constants';
import { countryPathways, getPathway, visaCategoriesFor } from './pathways';
import { roadmapDefs } from './roadmap';
import { appliesTo, factStatus } from './sections';

/** What we know about the student's route, for picking documents (and official costs). */
export interface DocumentContext {
  pathway?: string;
  visaCategoryId?: string;
  degreeLevel?: DegreeLevel;
  /** Reviewed universities / programs / scholarships the student chose. */
  universityIds?: string[];
  programIds?: string[];
  scholarshipIds?: string[];
}

export type DocumentSource = 'roadmap' | 'country' | 'pathway' | 'visa' | 'university' | 'program' | 'scholarship';

export interface DocumentReason {
  from: DocumentSource;
  /** Pathway / visa category / university / program / scholarship id. */
  id?: string;
  /** Display name of that source (e.g. a university's name or a visa code). */
  name?: string;
  purpose: DocumentRequirement['purpose'];
  /** The official statement, only when a student may see it (never a not-verified one). */
  requirement?: SourcedValue<string>;
  submittedTo?: Bilingual;
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
  const miss = (want: string[] | undefined, have: string[] | undefined) => Boolean(want?.length && have && !want.some((id) => have.includes(id)));
  if (app.visaCategoryIds?.length && ctx.visaCategoryId && !app.visaCategoryIds.includes(ctx.visaCategoryId)) return false;
  if (miss(app.universityIds, ctx.universityIds) || miss(app.programIds, ctx.programIds) || miss(app.scholarshipIds, ctx.scholarshipIds)) return false;
  return true;
}

/** Journey stage a document is needed in, by why it is needed. */
export const PURPOSE_STAGE: Record<DocumentRequirement['purpose'], string | undefined> = {
  admission: 'apply',
  scholarship: 'apply',
  visa: 'visa',
  arrival: 'travel',
  general: undefined,
};

/**
 * "Documents you need": general preparation from the roadmap, then the
 * country's, the chosen pathway's and visa category's, and those of the
 * universities, programs and scholarships the student picked — each kept
 * once with every reason. A not-verified requirement is never passed on;
 * the reason stays (the document is still expected), its wording is "not
 * verified yet".
 */
export function documentsFor(country: Pick<Country, 'code' | 'roadmap' | 'pathways'> & Partial<Pick<Country, 'documents'>> | undefined, ctx: DocumentContext = {}): DocumentNeed[] {
  const needs: DocumentNeed[] = [];
  const add = (kind: DocumentKind, reason: DocumentReason) => {
    const found = needs.find((n) => n.kind === kind);
    if (found) {
      if (!found.reasons.some((r) => r.from === reason.from && r.id === reason.id && r.purpose === reason.purpose)) found.reasons.push(reason);
    } else needs.push({ kind, reasons: [reason] });
  };
  const from = (source: DocumentSource, list: DocumentRequirement[] | undefined, id?: string, name?: string, extra: Partial<DocumentContext> = {}) => {
    for (const d of list ?? []) {
      if (!documentApplies(d.appliesTo, { ...ctx, ...extra })) continue;
      const shown = d.requirement && factStatus(d.requirement, undefined) !== 'not-verified' ? d.requirement : undefined;
      add(d.kind, { from: source, ...(id ? { id } : {}), ...(name ? { name } : {}), purpose: d.purpose, ...(shown ? { requirement: shown } : {}), ...(d.submittedTo ? { submittedTo: d.submittedTo } : {}) });
    }
  };

  for (const step of roadmapDefs(country, { pathway: ctx.pathway })) for (const k of step.documents ?? []) add(k, { from: 'roadmap', purpose: 'general' });
  if (!country) return needs;
  from('country', country.documents);
  const pathway = getPathway(country, ctx.pathway);
  if (pathway) from('pathway', pathway.documents, pathway.id, pathway.name.en);
  // Without a chosen pathway, visa documents stay out: they depend on the route.
  if (pathway || ctx.visaCategoryId) {
    for (const c of visaCategoriesFor(country, pathway?.id).filter((c) => !ctx.visaCategoryId || c.id === ctx.visaCategoryId)) from('visa', c.documents, c.id, c.code, { visaCategoryId: c.id });
  }
  for (const id of ctx.universityIds ?? []) {
    const u = UNIVERSITIES.find((x) => x.id === id && x.countryCode === country.code);
    if (u) from('university', u.documents, u.id, u.name);
  }
  for (const id of ctx.programIds ?? []) {
    const p = PROGRAMS.find((x) => x.id === id);
    const u = p && UNIVERSITIES.find((x) => x.id === p.universityId && x.countryCode === country.code);
    if (p && u) from('program', p.documents, p.id, `${p.title} · ${u.name}`);
  }
  for (const id of ctx.scholarshipIds ?? []) {
    const s = SCHOLARSHIPS.find((x) => x.id === id && (!x.countryCode || x.countryCode === country.code));
    if (s) from('scholarship', s.documents, s.id, s.name);
  }
  return needs;
}

/** True when the country has several pathways and the student hasn't chosen one (visa documents hidden). */
export const needsPathwayChoice = (country: Pick<Country, 'pathways'> | undefined, ctx: DocumentContext) => countryPathways(country).length > 1 && !getPathway(country, ctx.pathway);

/** Groups for the "Documents you may need" summary. */
export function documentGroups(needs: DocumentNeed[]) {
  const has = (n: DocumentNeed, s: DocumentSource[]) => n.reasons.some((r) => s.includes(r.from));
  return {
    total: needs.length,
    route: needs.filter((n) => has(n, ['country', 'pathway', 'visa'])).length,
    university: needs.filter((n) => has(n, ['university', 'program'])).length,
    scholarship: needs.filter((n) => has(n, ['scholarship'])).length,
  };
}

/** WHO asks, WHEN and WHERE — from the reasons (sources), never invented. */
export function documentExplanation(need: DocumentNeed) {
  const stages = [...new Set(need.reasons.map((r) => PURPOSE_STAGE[r.purpose]).filter((s): s is string => Boolean(s)))];
  return {
    purposes: [...new Set(need.reasons.map((r) => r.purpose))],
    askedBy: need.reasons.filter((r) => r.from !== 'roadmap').map((r) => ({ from: r.from, name: r.name })),
    stages,
    submittedTo: need.reasons.map((r) => r.submittedTo).filter((x): x is Bilingual => Boolean(x)),
    requirements: need.reasons.map((r) => r.requirement).filter((x): x is SourcedValue<string> => Boolean(x)),
    /** Only a general preparation item (no verified requirement from any source yet). */
    generalOnly: need.reasons.every((r) => r.from === 'roadmap'),
  };
}

/**
 * Which documents each roadmap step should surface: the step's own general
 * documents, plus every sourced document whose stage is the step's stage
 * (placed on the last step of that stage, where it is actually used).
 * Status still comes from the one document progress store.
 */
export function stepDocuments(steps: { id: string; stage: string; documents?: DocumentKind[] }[], needs: DocumentNeed[]): Record<string, DocumentKind[]> {
  const out: Record<string, DocumentKind[]> = {};
  const lastOfStage = new Map<string, string>();
  for (const s of steps) lastOfStage.set(s.stage, s.id);
  for (const s of steps) out[s.id] = [...(s.documents ?? [])];
  for (const n of needs) {
    for (const r of n.reasons) {
      const stage = r.from === 'roadmap' ? undefined : PURPOSE_STAGE[r.purpose];
      const stepId = stage && lastOfStage.get(stage);
      if (stepId && !out[stepId].includes(n.kind)) out[stepId].push(n.kind);
    }
  }
  return out;
}
