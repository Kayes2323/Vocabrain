import type { DegreeLevel } from '@/lib/constants';
import { visaGuide } from '@/lib/content/visa';
import type { Bilingual, Country, CountrySectionId, DocumentKind, SectionFact, SourceRef, StudyAbroadProfile, StudyPathway, VisaCategory, VisaPartId } from '@/lib/models';
import { costPlan, type GroupPlan, type ShownOfficial } from './costs';
import { documentExplanation, documentsFor, type DocumentContext } from './documents';
import { countryPathways, visaCategoriesFor } from './pathways';
import { countrySections, type ApplicabilityContext, type ResolvedSection, type SectionStatus } from './sections';
import { verifiedVisaName, visaParts, type ResolvedVisaPart } from './visa';

/**
 * Explore: Country → study option → one complete, readable guide.
 *
 * A study option is read from the country's own pathways (a degree pathway
 * gives one option per degree level it covers; any other pathway is one
 * option). A country without pathways has one general option. Nothing here
 * knows a specific country, and nothing new is stored: the guide is put
 * together from the same sections, visa parts, documents and costs the other
 * screens use, filtered to the option.
 */
export interface StudyOption {
  /** URL id, e.g. "degree-bachelors", "language", "general". */
  id: string;
  pathway?: StudyPathway;
  degreeLevel?: DegreeLevel;
}

export function studyOptions(country: Pick<Country, 'pathways'>): StudyOption[] {
  const pathways = countryPathways(country);
  if (!pathways.length) return [{ id: 'general' }];
  return pathways.flatMap((p): StudyOption[] =>
    p.degreeLevels?.length ? p.degreeLevels.map((level) => ({ id: `${p.id}-${level}`, pathway: p, degreeLevel: level })) : [{ id: p.id, pathway: p }],
  );
}

/** Options grouped by pathway, in the country's order (for the country page). */
export function studyOptionGroups(country: Pick<Country, 'pathways'>): { pathway?: StudyPathway; options: StudyOption[] }[] {
  const groups: { pathway?: StudyPathway; options: StudyOption[] }[] = [];
  for (const o of studyOptions(country)) {
    const g = groups.find((x) => x.pathway?.id === o.pathway?.id);
    if (g) g.options.push(o);
    else groups.push({ pathway: o.pathway, options: [o] });
  }
  return groups;
}

/** Display name: the degree level (e.g. "Bachelor's"), else the pathway's name, else "Studying in {country}". */
export function studyOptionName(o: StudyOption, t: (key: string, params?: Record<string, string | number>) => string, locale: string, country?: string): string {
  if (o.degreeLevel) return t(`degree.${o.degreeLevel}`);
  if (o.pathway) return locale === 'bn' ? o.pathway.name.bn : o.pathway.name.en;
  return t('sa.guide.general', { country: country ?? '' });
}

export const getStudyOption = (country: Pick<Country, 'pathways'>, id: string | undefined) => studyOptions(country).find((o) => o.id === id);

// ------------------------------------------------------------------ the guide

/** The guide's sections, in reading order. */
export const GUIDE_SECTIONS = [
  'overview',
  'who',
  'study',
  'admission',
  'language',
  'visa',
  'documents',
  'finances',
  'costs',
  'application',
  'visa-application',
  'after-admission',
  'before-departure',
  'notes',
] as const;
export type GuideSectionId = (typeof GUIDE_SECTIONS)[number];

/** One sourced block of text inside a guide section (a country section, a visa part, or a sub-block of either). */
export interface GuideBlock {
  key: string;
  /** A written title (sub-blocks) or an i18n key (the section/part it came from). */
  title?: Bilingual;
  titleKey?: string;
  facts: SectionFact[];
  links: SourceRef[];
  /** General guidance — never an official fact. */
  guidance?: Bilingual;
  /** Reviewed plain-language explanation of the facts (adds no facts). */
  explanation?: Bilingual;
  status: SectionStatus;
  /** Which review window the facts follow. */
  reviewAs?: CountrySectionId;
}

export interface GuideDocument {
  kind: DocumentKind;
  purposes: string[];
  askedBy: { from: string; name?: string }[];
  stages: string[];
  submittedTo: Bilingual[];
  requirements: ReturnType<typeof documentExplanation>['requirements'];
  /** No official requirement verified yet: shown as general preparation. */
  generalOnly: boolean;
}

export interface GuideSource {
  source: SourceRef;
  /** Latest verification date of a fact shown from this source (absent: an official page to read). */
  lastVerified?: string;
}

export interface ProgramGuide {
  country: Country;
  option: StudyOption;
  visaCategories: VisaCategory[];
  /** The visa's official name when verified (per category). */
  visaNames: Record<string, ReturnType<typeof verifiedVisaName>>;
  sections: Record<GuideSectionId, GuideBlock[]>;
  documents: GuideDocument[];
  /** Official minimum funds / requirements (never a hidden or converted value). */
  fundsOfficial: ShownOfficial[];
  /** Tuition, living and other costs: official, estimate and the student's budget, kept apart. */
  costGroups: GroupPlan[];
  /** Every source the guide uses, once, with the latest date a fact from it was verified. */
  sources: GuideSource[];
}

const hasContent = (b: GuideBlock) => b.facts.length > 0 || Boolean(b.guidance) || Boolean(b.explanation) || b.links.length > 0;

function fromSection(s: ResolvedSection | undefined): GuideBlock[] {
  if (!s) return [];
  const main: GuideBlock = {
    key: s.id,
    titleKey: `sa.sections.${s.id}`,
    facts: s.facts,
    links: s.links ?? [],
    ...(s.explanation ? { explanation: s.explanation } : {}),
    status: s.status,
    reviewAs: s.id,
  };
  const subs = s.blocks.map((b): GuideBlock => ({
    key: `${s.id}:${b.id}`,
    title: b.title,
    facts: b.facts,
    links: b.links ?? [],
    ...(b.guidance ? { guidance: b.guidance } : {}),
    status: b.status,
    reviewAs: s.id,
  }));
  return [main, ...subs].filter(hasContent);
}

function fromVisaPart(p: ResolvedVisaPart | undefined, prefix = ''): GuideBlock[] {
  if (!p) return [];
  const main: GuideBlock = {
    key: `${prefix}visa:${p.id}`,
    titleKey: `sa.visa.parts.${p.id}`,
    facts: p.facts,
    links: p.links ?? [],
    ...(p.explanation ? { explanation: p.explanation } : {}),
    status: p.status,
    reviewAs: 'visa',
  };
  const subs = (p.blocks ?? []).map((b): GuideBlock => ({
    key: `${prefix}visa:${p.id}:${b.id}`,
    title: b.title,
    facts: b.facts,
    links: b.links ?? [],
    ...(b.guidance ? { guidance: b.guidance } : {}),
    status: b.status,
    reviewAs: 'visa',
  }));
  return [main, ...subs].filter(hasContent);
}

/** Which country sections and visa parts fill each guide section. */
const SECTION_MAP: Record<GuideSectionId, { sections?: CountrySectionId[]; visa?: VisaPartId[] }> = {
  overview: {},
  who: { sections: ['why'] },
  study: { sections: ['education', 'subjects', 'universities'] },
  admission: { sections: ['admission'] },
  language: { sections: ['english'] },
  visa: { sections: ['visa'], visa: ['type', 'eligibility'] },
  documents: { sections: ['documents'], visa: ['documents'] },
  finances: { visa: ['finances'] },
  costs: { sections: ['tuition', 'scholarships'] },
  application: { sections: ['application', 'deadlines'] },
  'visa-application': { sections: ['visa-fees'], visa: ['portal', 'process', 'fees', 'biometrics', 'interview', 'processing', 'insurance', 'stay', 'restrictions'] },
  'after-admission': { sections: ['offer'] },
  'before-departure': { sections: ['accommodation', 'arrival'], visa: ['pre-departure'] },
  notes: { sections: ['work', 'post-study', 'safety'], visa: ['work', 'mistakes'] },
};

export function programGuide(country: Country, optionId: string, abroad?: StudyAbroadProfile, now = new Date()): ProgramGuide | undefined {
  const option = getStudyOption(country, optionId);
  if (!option) return undefined;
  const ctx: ApplicabilityContext = { ...(option.pathway ? { pathway: option.pathway.id } : {}), ...(option.degreeLevel ? { degreeLevel: option.degreeLevel } : {}) };
  const docCtx: DocumentContext = { ...ctx };
  const sections = new Map(countrySections(country, now, ctx).map((s) => [s.id, s]));

  // The visa this option leads to: the pathway's categories; without pathways, the country-level guide.
  const categories = option.pathway ? visaCategoriesFor(country, option.pathway.id) : [];
  const partSets = categories.length
    ? categories.map((c) => ({ prefix: categories.length > 1 ? `${c.id}:` : '', parts: new Map(visaParts(country, now, c.id, ctx).map((p) => [p.id, p])) }))
    : visaGuide(country.code) || country.data.livingCost?.length
      ? [{ prefix: '', parts: new Map(visaParts(country, now, undefined, ctx).map((p) => [p.id, p])) }]
      : [];

  const built = Object.fromEntries(
    GUIDE_SECTIONS.map((id) => {
      const m = SECTION_MAP[id];
      const blocks = [
        ...(m.sections ?? []).flatMap((s) => fromSection(sections.get(s))),
        ...(m.visa ?? []).flatMap((v) => partSets.flatMap((set) => fromVisaPart(set.parts.get(v), set.prefix))),
      ];
      return [id, blocks];
    }),
  ) as Record<GuideSectionId, GuideBlock[]>;

  // Language requirements the pathway itself carries (sourced facts).
  const lang = option.pathway?.languageRequirements?.filter((f) => f.fact.status !== 'not-verified' && (!f.appliesTo?.degreeLevels?.length || !option.degreeLevel || f.appliesTo.degreeLevels.includes(option.degreeLevel)));
  if (lang?.length) built.language.unshift({ key: 'pathway:language', facts: lang, links: [], status: 'partial' });
  // The pathway's official pages belong with the overview.
  if (option.pathway?.links?.length) built.overview.push({ key: 'pathway:links', facts: [], links: option.pathway.links, status: 'not-yet' });

  const documents: GuideDocument[] = documentsFor(country, docCtx).map((need) => {
    const ex = documentExplanation(need);
    return { kind: need.kind, purposes: ex.purposes, askedBy: ex.askedBy, stages: ex.stages, submittedTo: ex.submittedTo, requirements: ex.requirements, generalOnly: ex.generalOnly };
  });

  // Money: minimum funds / requirements apart from costs; money-to-show from the registry is already in the visa "finances" part.
  const plan = costPlan(country, abroad ?? ({} as StudyAbroadProfile), docCtx, now);
  const isFunds = (o: ShownOfficial) => o.cost.kind === 'minimum-funds' || o.cost.kind === 'requirement';
  const fromRegistry = (o: ShownOfficial) => o.cost.id.startsWith('living-');
  const fundsOfficial = plan.groups.flatMap((g) => g.official).filter((o) => isFunds(o) && !fromRegistry(o));
  const costGroups = plan.groups.map((g) => ({ ...g, official: g.official.filter((o) => !isFunds(o)) }));

  const sources = new Map<string, GuideSource>();
  const addSource = (s: SourceRef | undefined, verified?: string) => {
    if (!s) return;
    const key = s.url ?? s.name;
    const prev = sources.get(key);
    const lastVerified = [prev?.lastVerified, verified].filter((d): d is string => Boolean(d)).sort().pop();
    sources.set(key, { source: prev?.source ?? s, ...(lastVerified ? { lastVerified } : {}) });
  };
  for (const blocks of Object.values(built)) for (const b of blocks) {
    b.facts.forEach((f) => addSource(f.fact.source, f.fact.lastVerified));
    b.links.forEach((l) => addSource(l));
  }
  documents.forEach((d) => d.requirements.forEach((r) => addSource(r.source, r.lastVerified)));
  fundsOfficial.forEach((o) => addSource(o.cost.amount.source, o.cost.amount.lastVerified));
  costGroups.forEach((g) => {
    g.official.forEach((o) => addSource(o.cost.amount.source, o.cost.amount.lastVerified));
    g.officialPending.forEach((l) => addSource(l));
    g.estimates.forEach((e) => e.sources?.forEach((l) => addSource(l)));
  });
  const visaNames = Object.fromEntries(categories.map((c) => [c.id, verifiedVisaName(c, now)]));
  Object.values(visaNames).forEach((n) => addSource(n?.source, n?.lastVerified));

  return { country, option, visaCategories: categories, visaNames, sections: built, documents, fundsOfficial, costGroups, sources: [...sources.values()] };
}

/**
 * A short, readable name for a source ("Korea Immigration Service – Visa
 * Navigator"): parenthetical details are dropped. The full name, URL and
 * dates stay in the data.
 */
export function shortSourceName(name: string): string {
  const short = name.replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
  return short.length > 70 ? `${short.slice(0, 67).trimEnd()}…` : short || name;
}

/** Sources behind a set of blocks, once each (for the small link at the end of a section). */
export function blockSources(blocks: GuideBlock[]): SourceRef[] {
  const out = new Map<string, SourceRef>();
  for (const b of blocks) for (const f of b.facts) out.set(f.fact.source.url ?? f.fact.source.name, f.fact.source);
  return [...out.values()];
}

/** A guide section has official facts to show (else it reads "not verified yet"). */
export const guideSectionVerified = (blocks: GuideBlock[]) => blocks.some((b) => b.facts.length > 0);
