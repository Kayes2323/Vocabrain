// Country Match: compares destinations on the student's own priorities using
// ONLY sourced, dated facts. A priority with no verified data counts as
// "unknown" (never guessed), and every result says how much of the student's
// priorities it could actually check. No country is "best" for everyone.
import { msg, type Message } from '@/lib/i18n/message';
import type { Country, Money, PriorityFactor, SourceRef, StudyAbroadProfile } from '@/lib/models';

export type MatchCriterion = 'postStudyWork' | 'workWhileStudying';

/** Which verified criterion (if any) can speak to each priority. */
const PRIORITY_CRITERIA: Record<PriorityFactor, MatchCriterion[]> = {
  postStudyWork: ['postStudyWork'],
  career: ['postStudyWork'],
  affordability: ['workWhileStudying'],
  scholarship: [],
  academicFit: [],
  lifestyle: [],
  safety: [],
};

export const PRIORITY_FACTORS = Object.keys(PRIORITY_CRITERIA) as PriorityFactor[];

export interface CriterionResult {
  criterion: MatchCriterion;
  /** 0–1 against the strongest verified value among destinations. */
  score: number;
  value: Message;
  source: SourceRef;
  lastVerified: string;
}

export interface CountryMatch {
  code: string;
  name: string;
  flag: string;
  preferred: boolean;
  /** 0–100 on the priorities that could be checked; undefined when none could. */
  fit?: number;
  /** Share of the student's priority weight backed by verified data (0–100). */
  coverage: number;
  criteria: CriterionResult[];
  unknownPriorities: PriorityFactor[];
  /** Official money-to-show figures, for the student to compare with their budget. */
  livingCost: { money: Money; notes?: string; source: SourceRef; lastVerified: string }[];
}

export interface MatchResult {
  priorities: Partial<Record<PriorityFactor, number>>;
  matches: CountryMatch[];
  /** Destinations with no verified data for any chosen priority. */
  notEnoughData: { code: string; name: string; flag: string }[];
}

function criterionValue(country: Country, c: MatchCriterion) {
  const m = country.data.metrics;
  if (c === 'postStudyWork' && m?.postStudyWorkMonths) {
    const { min, max } = m.postStudyWorkMonths.value;
    return { raw: max, value: msg(min === max ? 'match.value.months' : 'match.value.monthsRange', { min, max }), sv: m.postStudyWorkMonths };
  }
  if (c === 'workWhileStudying' && m?.termWorkHoursPerWeek) {
    return { raw: m.termWorkHoursPerWeek.value, value: msg('match.value.hours', { n: m.termWorkHoursPerWeek.value }), sv: m.termWorkHoursPerWeek };
  }
  return undefined;
}

export function matchCountries(countries: Country[], abroad: StudyAbroadProfile): MatchResult {
  const chosen = Object.entries(abroad.priorities ?? {}).filter(([, w]) => (w ?? 0) > 0) as [PriorityFactor, number][];
  const priorities = Object.fromEntries(chosen) as Partial<Record<PriorityFactor, number>>;
  const totalWeight = chosen.reduce((n, [, w]) => n + w, 0);
  const preferred = new Set(abroad.preferredCountryCodes ?? []);

  // Best verified value per criterion, to scale scores fairly.
  const best: Record<MatchCriterion, number> = { postStudyWork: 0, workWhileStudying: 0 };
  for (const c of countries) for (const k of Object.keys(best) as MatchCriterion[]) best[k] = Math.max(best[k], criterionValue(c, k)?.raw ?? 0);

  const matches: CountryMatch[] = [];
  const notEnoughData: MatchResult['notEnoughData'] = [];
  for (const country of countries) {
    const criteria: CriterionResult[] = [];
    const unknown: PriorityFactor[] = [];
    let covered = 0;
    let weighted = 0;
    for (const [priority, weight] of chosen) {
      const results = PRIORITY_CRITERIA[priority]
        .map((c) => ({ c, v: criterionValue(country, c) }))
        .filter((x): x is { c: MatchCriterion; v: NonNullable<ReturnType<typeof criterionValue>> } => Boolean(x.v));
      if (results.length === 0) {
        unknown.push(priority);
        continue;
      }
      covered += weight;
      const score = results.reduce((n, r) => n + (best[r.c] ? r.v.raw / best[r.c] : 0), 0) / results.length;
      weighted += weight * score;
      for (const r of results) {
        if (!criteria.some((x) => x.criterion === r.c)) {
          criteria.push({ criterion: r.c, score: best[r.c] ? r.v.raw / best[r.c] : 0, value: r.v.value, source: r.v.sv.source, lastVerified: r.v.sv.lastVerified });
        }
      }
    }
    const livingCost = (country.data.livingCost ?? []).map((l) => ({ money: l.value, notes: l.notes, source: l.source, lastVerified: l.lastVerified }));
    if (covered === 0 && livingCost.length === 0) {
      notEnoughData.push({ code: country.code, name: country.name, flag: country.flag });
      continue;
    }
    matches.push({
      code: country.code,
      name: country.name,
      flag: country.flag,
      preferred: preferred.has(country.code),
      ...(covered > 0 ? { fit: Math.round((weighted / covered) * 100) } : {}),
      coverage: totalWeight ? Math.round((covered / totalWeight) * 100) : 0,
      criteria,
      unknownPriorities: unknown,
      livingCost,
    });
  }

  matches.sort((a, b) => (b.fit ?? -1) - (a.fit ?? -1) || b.coverage - a.coverage || Number(b.preferred) - Number(a.preferred) || a.name.localeCompare(b.name));
  return { priorities, matches, notEnoughData };
}

/** Equal weights for up to three chosen priorities (sums to 100). */
export function prioritiesFrom(selected: PriorityFactor[]): Partial<Record<PriorityFactor, number>> {
  const picks = selected.slice(0, 3);
  if (picks.length === 0) return {};
  const base = Math.floor(100 / picks.length);
  return Object.fromEntries(picks.map((p, i) => [p, i === 0 ? 100 - base * (picks.length - 1) : base]));
}
