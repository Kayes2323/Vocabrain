import { COUNTRIES, getCountry } from '@/lib/content/countries';
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
      "The student's study-abroad profile: degree level, subject, intake, budget, priorities and preferred countries, plus which answers are missing. Use before discussing destinations so you only ask for what's missing.",
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
    return {
      ...abroad,
      preferredCountries: (abroad.preferredCountryCodes ?? []).map((c) => getCountry(c)?.name ?? c),
      missing,
      whereToSet: 'Study Abroad profile (abroad-profile button) for degree/subject/intake; Country Match (country-match button) for priorities, countries and budget.',
    };
  },
};

/** Verified official facts about one destination, or a clear "not verified". */
export const getCountryData: MinoTool = {
  declaration: {
    name: 'getCountryData',
    description:
      'Official, dated facts about a study destination (living-cost money to show, work while studying, post-study work) with source name, link and verification date. Categories without verified data come back as notVerified: then say you do not have verified information and point to the official source; never fill gaps from memory.',
    parameters: {
      type: 'object',
      properties: { country: { type: 'string', description: 'Country name or ISO code, e.g. "Canada" or "GB".' } },
      required: ['country'],
    },
  },
  async run(_ctx, args) {
    const q = String(args.country ?? '').trim().toLowerCase();
    const alias: Record<string, string> = { uk: 'GB', britain: 'GB', england: 'GB', usa: 'US', america: 'US' };
    const country = COUNTRIES.find((c) => c.code.toLowerCase() === q || c.name.toLowerCase() === q || c.code === alias[q]);
    if (!country) return { found: false, note: 'Not in the Vocab Brain destination list.' };
    const facts = (list: { value: unknown; source: { name: string; url?: string }; lastVerified: string; notes?: string }[] | undefined) =>
      list?.length ? list.map((f) => ({ value: f.value, notes: f.notes, source: f.source.name, url: f.source.url, verified: f.lastVerified })) : 'notVerified';
    const d = country.data;
    return {
      country: country.name,
      livingCostToShow: facts(d.livingCost),
      workWhileStudying: facts(d.workRules),
      postStudyWork: facts(d.postStudyOptions),
      tuition: facts(d.tuition),
      scholarships: facts(d.scholarshipInformation),
      visa: facts(d.visaInformation),
      rule: 'Quote figures with their source and date; rules change, so tell the student to confirm on the official page.',
    };
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
