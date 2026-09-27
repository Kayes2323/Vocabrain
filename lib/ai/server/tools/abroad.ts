import { COUNTRIES, getCountry } from '@/lib/content/countries';
import { abroadSummary } from '@/lib/abroad/summary';
import { countryFactsForMino } from '@/lib/abroad/mino';
import { matchCountries } from '@/lib/engine';
import { getTranslator, type Message } from '@/lib/i18n';
import { withProfileDefaults } from '@/lib/services/profile-repository';
import { readOwnDoc } from '../firestore-rest';
import type { MinoTool } from './types';

const text = (m: Message) => getTranslator('en').t(m.key, m.vars);

/** The student's study-abroad answers, and what is still missing. */
export const getStudyAbroadProfile: MinoTool = {
  declaration: {
    name: 'getStudyAbroadProfile',
    description:
      "The student's study-abroad profile and progress: degree level, subject, intake, budget, priorities, dream country and shortlist, the 10-stage journey (current stage, what needs attention), their country roadmap step, upcoming dates, document readiness and their own university list, plus which answers are missing. Use before advising so the next step fits where they are.",
    parameters: { type: 'object', properties: {} },
  },
  async run({ uid, idToken }) {
    const doc = await readOwnDoc(uid, idToken);
    const abroad = withProfileDefaults(uid, ((doc?.app ?? {}) as never)).abroad;
    const missing = [
      !abroad.degreeLevel && 'degree level',
      !abroad.subject && 'subject',
      !abroad.targetIntake && 'target intake',
      !abroad.annualBudget && 'yearly budget',
      !Object.keys(abroad.priorities ?? {}).length && 'priorities',
    ].filter(Boolean);
    const { journey: _stored, universities: _u, deadlines: _d, documents: _docs, ...answers } = abroad;
    void _stored; void _u; void _d; void _docs;
    return {
      ...answers,
      progress: abroadSummary(withProfileDefaults(uid, (doc?.app ?? {}) as never)),
      preferredCountries: (abroad.preferredCountryCodes ?? []).map((c) => getCountry(c)?.name ?? c),
      missing,
      whereToSet: 'Study Abroad profile (abroad-profile button) for degree/subject/intake; Country Match (country-match button) for priorities, countries and budget; the dream country is chosen on a country page or Study Abroad home.',
    };
  },
};

/** Verified official facts about one destination, or a clear "not verified". */
export const getCountryData: MinoTool = {
  declaration: {
    name: 'getCountryData',
    description:
      'Official, dated facts about a study destination with source name, link and verification date; section and visa-part statuses; its study pathways and visa categories (e.g. degree vs language routes) and the work-rule check for a pathway. Anything notVerified: say it is not verified yet and point to the official page; never fill gaps from memory.',
    parameters: {
      type: 'object',
      properties: {
        country: { type: 'string', description: 'Country name or ISO code, e.g. "Canada" or "GB".' },
        pathway: { type: 'string', description: "Optional pathway id from the student's profile (e.g. for countries with degree vs language routes)." },
        degreeLevel: { type: 'string', description: "Optional degree level from the student's profile (bachelors, masters, phd…), used by work rules that differ by degree." },
        korean: { type: 'string', description: "Optional Korean level from the student's profile (none, beginner, topik-1 … topik-6), used by work rules that depend on it. Never guess it." },
      },
      required: ['country'],
    },
  },
  async run(_ctx, args) {
    const q = String(args.country ?? '').trim().toLowerCase();
    const alias: Record<string, string> = { uk: 'GB', britain: 'GB', england: 'GB', usa: 'US', america: 'US' };
    const country = COUNTRIES.find((c) => c.code.toLowerCase() === q || c.name.toLowerCase() === q || c.code === alias[q]);
    if (!country) return { found: false, note: 'Not in the Vocab Brain destination list.' };
    const pathway = String(args.pathway ?? '').trim() || undefined;
    const degreeLevel = String(args.degreeLevel ?? '').trim() || undefined;
    const korean = String(args.korean ?? '').trim() || undefined;
    return countryFactsForMino(country, { pathway, degreeLevel, korean });
  },
};

export const getCountryMatch: MinoTool = {
  declaration: {
    name: 'getCountryMatch',
    description:
      "The student's Country Match: destinations compared on their chosen priorities using only verified official data, with fit, how much of their priorities could be checked (coverage), the facts used and what is still unverified. Explain the reasoning; never call a country universally best.",
    parameters: { type: 'object', properties: {} },
  },
  async run({ uid, idToken }) {
    const doc = await readOwnDoc(uid, idToken);
    const abroad = withProfileDefaults(uid, ((doc?.app ?? {}) as never)).abroad;
    if (!Object.keys(abroad.priorities ?? {}).length) return { ready: false, note: 'The student has not chosen priorities yet (Country Match page).' };
    const r = matchCountries(COUNTRIES, abroad);
    return {
      priorities: r.priorities,
      matches: r.matches.map((m) => ({
        country: m.name,
        preferred: m.preferred,
        fit: m.fit ?? 'n/a',
        coverage: `${m.coverage}% of priorities checked`,
        facts: m.criteria.map((c) => `${c.criterion}: ${text(c.value)} (${c.source.name}, ${c.lastVerified})`),
        livingCostToShow: m.livingCost.map((l) => `${l.money.currency} ${l.money.amount}${l.notes ? ` – ${l.notes}` : ''}`),
        unverifiedPriorities: m.unknownPriorities,
      })),
      noVerifiedData: r.notEnoughData.map((c) => c.name),
    };
  },
};
