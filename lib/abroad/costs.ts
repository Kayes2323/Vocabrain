import { PROGRAMS } from '@/lib/content/universities';
import type { Country, CostAmount, CostCategory, CostEstimate, FactStatus, Money, OfficialCost, SourceRef, StudyAbroadProfile } from '@/lib/models';
import { documentApplies, type DocumentContext } from './documents';
import { factStatus } from './sections';

/**
 * "How much might I need?" — three kinds of money kept apart:
 *  OFFICIAL  sourced fees / tuition / minimum funds (never a not-verified value),
 *  ESTIMATE  low / typical / high planning ranges with their basis,
 *  MY BUDGET the student's own numbers from their profile.
 * Periods are converted to a year by plain arithmetic; currencies never are.
 */
export const COST_GROUPS = ['tuition', 'living', 'visa-application', 'accommodation', 'other'] as const;
export type CostGroup = (typeof COST_GROUPS)[number];

export const GROUP_OF: Record<CostCategory, CostGroup> = {
  tuition: 'tuition',
  living: 'living',
  food: 'living',
  transport: 'living',
  utilities: 'living',
  application: 'visa-application',
  visa: 'visa-application',
  accommodation: 'accommodation',
  insurance: 'other',
  other: 'other',
};

const PER_YEAR: Record<Exclude<CostAmount['period'], 'unspecified'>, number> = { month: 12, semester: 2, year: 1, once: 1 };

/** A yearly figure, or undefined when the period is unknown (then it is shown but never added). */
export function perYear(amount: number, period: CostAmount['period']): number | undefined {
  return period === 'unspecified' ? undefined : amount * PER_YEAR[period];
}

export interface ShownOfficial {
  cost: OfficialCost;
  /** verified / partly-verified / needs-review — a not-verified cost is never here. */
  status: FactStatus;
}

export interface Range {
  low: number;
  typical: number;
  high: number;
  currency: string;
}

export interface GroupPlan {
  group: CostGroup;
  official: ShownOfficial[];
  /** Official pages for amounts we could not verify (shown as "Not verified yet"). */
  officialPending: SourceRef[];
  estimates: CostEstimate[];
  /** Estimates added up per year — only when they share one currency. */
  estimateYear?: Range;
  /** True when this group's estimates are in different currencies (no total). */
  currencyMismatch?: boolean;
  /** The student's own number for this group, as they entered it. */
  mine?: Money & { period: 'year' | 'month' };
}

export interface CostPlan {
  groups: GroupPlan[];
  /** Sum of every group's yearly estimate, when all share one currency. */
  estimateTotal?: Range;
  available?: Money;
  /** available − estimateTotal (same currency only). Positive = money left over. */
  difference?: Range;
  /** Some figures are in different currencies, so no total or difference is given. */
  currencyUnavailable: boolean;
  /** Some groups have no verified official figure and no estimate. */
  incomplete: boolean;
}

/** Official figures for a country: its cost list, money-to-show facts and the student's programs' tuition. */
export function officialCosts(country: Country, ctx: DocumentContext = {}): OfficialCost[] {
  const list = (country.costs?.official ?? []).filter((c) => documentApplies(c.appliesTo, ctx));
  // Money-to-show facts already in the registry (period as the source gives it: unspecified here).
  (country.data.livingCost ?? []).forEach((f, i) =>
    list.push({
      id: `living-${i}`,
      category: 'living',
      kind: 'minimum-funds',
      label: { en: 'Money to show (official)', bn: 'দেখানোর মতো টাকা (official)' },
      amount: { ...f, value: { ...f.value, period: 'unspecified' } },
    }),
  );
  for (const id of ctx.programIds ?? []) {
    const p = PROGRAMS.find((x) => x.id === id);
    if (p?.tuition) list.push({ id: `tuition-${p.id}`, category: 'tuition', kind: 'tuition', label: { en: p.title, bn: p.title }, amount: { ...p.tuition, value: { ...p.tuition.value, period: 'unspecified' } } });
  }
  return list;
}

function sumRange(items: { low: number; typical: number; high: number; currency: string }[]): Range | 'mismatch' | undefined {
  if (!items.length) return undefined;
  const currency = items[0].currency;
  if (items.some((i) => i.currency !== currency)) return 'mismatch';
  return items.reduce((r, i) => ({ low: r.low + i.low, typical: r.typical + i.typical, high: r.high + i.high, currency }), { low: 0, typical: 0, high: 0, currency });
}

/**
 * The planning view for one country. Estimates for "living" (an all-in
 * figure) replace its parts (food, transport, utilities) so nothing is
 * counted twice. The student's budget is read, never changed.
 */
export function costPlan(country: Country, abroad: StudyAbroadProfile, ctx: DocumentContext = {}, now = new Date()): CostPlan {
  const official = officialCosts(country, ctx);
  const estimates = (country.costs?.estimates ?? []).filter((e) => documentApplies(e.appliesTo, ctx) && e.low <= e.typical && e.typical <= e.high);
  const budget = abroad.student?.budget ?? {};
  const groups = COST_GROUPS.map((group): GroupPlan => {
    const mine = official.filter((c) => GROUP_OF[c.category] === group);
    const shown: ShownOfficial[] = [];
    const pending: SourceRef[] = [];
    for (const cost of mine) {
      const status = factStatus(cost.amount, undefined, now);
      if (status === 'not-verified') {
        if (cost.amount.source.url && !pending.some((p) => p.url === cost.amount.source.url)) pending.push(cost.amount.source);
      } else shown.push({ cost, status });
    }
    let est = estimates.filter((e) => GROUP_OF[e.category] === group);
    if (group === 'living' && est.some((e) => e.category === 'living')) est = est.filter((e) => e.category === 'living');
    const yearly = sumRange(est.map((e) => ({ low: e.low * PER_YEAR[e.period], typical: e.typical * PER_YEAR[e.period], high: e.high * PER_YEAR[e.period], currency: e.currency })));
    const myBudget = group === 'tuition' && budget.tuition ? { ...budget.tuition, period: 'year' as const } : group === 'living' && budget.living ? { ...budget.living, period: 'month' as const } : undefined;
    return {
      group,
      official: shown,
      officialPending: pending,
      estimates: est,
      ...(yearly && yearly !== 'mismatch' ? { estimateYear: yearly } : {}),
      ...(yearly === 'mismatch' ? { currencyMismatch: true } : {}),
      ...(myBudget ? { mine: myBudget } : {}),
    };
  });
  const withEstimates = groups.filter((g) => g.estimateYear);
  const total = sumRange(withEstimates.map((g) => g.estimateYear!));
  const available = budget.total;
  const range = total && total !== 'mismatch' ? total : undefined;
  const currencyUnavailable = groups.some((g) => g.currencyMismatch) || total === 'mismatch' || Boolean(range && available && available.currency !== range.currency);
  const difference =
    range && available && available.currency === range.currency
      ? { low: available.amount - range.high, typical: available.amount - range.typical, high: available.amount - range.low, currency: range.currency }
      : undefined;
  return {
    groups,
    ...(range ? { estimateTotal: range } : {}),
    ...(available ? { available } : {}),
    ...(difference ? { difference } : {}),
    currencyUnavailable,
    incomplete: groups.some((g) => g.official.length === 0 && !g.estimateYear),
  };
}
