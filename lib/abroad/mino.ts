import type { DegreeLevel } from '@/lib/constants';
import type { Country, SourcedValue } from '@/lib/models';
import { countryPathways, visaCategoriesFor } from './pathways';
import { countrySections, factStatus } from './sections';
import { verifiedVisaName, visaParts } from './visa';
import { checkWork } from './work';

/** What Mino must say whenever something is not verified. */
export const NOT_VERIFIED_RULE =
  'Only VERIFIED facts (with source and date) may be stated as facts. For anything notVerified say exactly that it is not verified yet ("এই তথ্য এখনো verified নয়। Official source দেখে confirm করতে হবে।" in Bangla) and point to the official page if one is listed. Never fill a gap from memory. Label estimates as estimates and general guidance as general guidance. ' +
  'A needs-review fact is never a definitive answer: say it needs to be re-checked and, if its notes describe a source conflict, name both sources and what each says without choosing one. ' +
  'A fact with scope "shared" applies to every route of the country; a fact scoped to a visa code (e.g. D-2) applies only to that route — never apply one route\'s fact to another. ' +
  'When a Bangladesh-specific requirement needs review or is not verified, say so explicitly. Never assume the student\'s pathway, degree, Korean level or year: if a work rule needs an answer, ask for it.';

const status = (s: string) => (s === 'not-yet' ? 'notVerified' : s);

/** Sourced values Mino may quote: never a not-verified value; stale ones say so. */
function quotable(list: SourcedValue<unknown>[] | undefined) {
  const shown = (list ?? []).filter((f) => factStatus(f, undefined) !== 'not-verified');
  return shown.length
    ? shown.map((f) => ({ value: f.value, notes: f.notes, source: f.source.name, url: f.source.url, verified: f.lastVerified, status: factStatus(f, undefined) }))
    : 'notVerified';
}

/**
 * Mino's view of one country: verified facts, section and visa-part statuses,
 * pathways with their visa categories, and the "Can I work?" state for the
 * student's pathway. Built from the same engines as the screens.
 */
export function countryFactsForMino(country: Country, opts: { pathway?: string; degreeLevel?: string; korean?: string; now?: Date } = {}) {
  const now = opts.now ?? new Date();
  const d = country.data;
  const sections = countrySections(country, now, opts.pathway ? { pathway: opts.pathway } : undefined);
  // Only the student's own answers (pathway, degree, Korean level); anything else is asked, never assumed.
  const work = checkWork(country, { pathway: opts.pathway, degreeLevel: opts.degreeLevel, korean: opts.korean }, now);
  return {
    country: country.name,
    livingCostToShow: quotable(d.livingCost),
    workWhileStudying: quotable(d.workRules),
    postStudyWork: quotable(d.postStudyOptions),
    tuition: quotable(d.tuition),
    scholarships: quotable(d.scholarshipInformation),
    visa: quotable(d.visaInformation),
    sectionStatus: Object.fromEntries(sections.map((sec) => [sec.id, status(sec.status)])),
    visaPartStatus: Object.fromEntries(visaParts(country, now).map((p) => [p.id, status(p.status)])),
    pathways: countryPathways(country).map((p) => ({
      id: p.id,
      name: p.name.en,
      degreeLevels: p.degreeLevels ?? [],
      selected: p.id === opts.pathway,
      visaCategories: visaCategoriesFor(country, p.id).map((c) => {
        const own = new Set(Object.values(c.parts).flatMap((sec) => [...(sec?.facts ?? []), ...(sec?.blocks ?? []).flatMap((b) => b.facts ?? [])]));
        // Same filter as the screen: the student's degree hides other degrees' facts.
        const parts = visaParts(country, now, c.id, opts.degreeLevel ? { degreeLevel: opts.degreeLevel as DegreeLevel } : undefined);
        return {
          id: c.id,
          code: c.code,
          officialName: verifiedVisaName(c, now)?.value ?? 'notVerified',
          parts: Object.fromEntries(parts.map((part) => [part.id, status(part.status)])),
          // Only facts the screens show (never a not-verified value), each with its source.
          facts: parts.flatMap((part) =>
            [...part.facts, ...(part.blocks ?? []).flatMap((b) => b.facts)].map((f) => ({
              part: part.id,
              // "shared" = the country's (every route); otherwise this visa category only.
              scope: own.has(f) ? c.code : 'shared',
              label: f.label.en,
              value: f.fact.value,
              ...(f.fact.notes ? { notes: f.fact.notes } : {}),
              status: factStatus(f.fact, 'visa', now),
              source: f.fact.source.name,
              url: f.fact.source.url,
              verified: f.fact.lastVerified,
            })),
          ),
          // Labelled general guidance (e.g. a country-specific requirement that is not verified yet).
          guidance: parts.flatMap((part) => (part.blocks ?? []).filter((b) => b.guidance).map((b) => `${b.title.en}: ${b.guidance!.en}`)),
        };
      }),
    })),
    work:
      work.state === 'answered'
        ? { state: 'answered', rules: work.rules.map((r) => ({ rule: r.rule.outcome.value, status: r.status, ...(r.rule.outcome.notes ? { notes: r.rule.outcome.notes } : {}), source: r.rule.outcome.source.name, url: r.rule.outcome.source.url, verified: r.rule.outcome.lastVerified })) }
        : work.state === 'needs-answers'
          ? { state: 'needsAnswers', ask: work.questions.map((q) => q.label.en), officialPages: work.links.map((l) => l.url) }
          : { state: 'notVerified', officialPages: work.links.map((l) => l.url) },
    officialPages: [...new Set(sections.flatMap((sec) => [...sec.facts.map((f) => f.fact.source.url), ...(sec.links ?? []).map((l) => l.url)]).filter(Boolean))],
    rule: NOT_VERIFIED_RULE,
  };
}
