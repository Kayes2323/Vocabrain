import { getCountry } from '@/lib/content/countries';
import { abroadJourney, abroadNextAction, allDeadlines, countryRoadmap, documentStatus, requiredDocuments } from '@/lib/engine';
import type { UserProfile } from '@/lib/models';
import { countryPathways, selectedPathway, visaCategoriesFor } from './pathways';

/**
 * A compact, English summary of the student's Study Abroad progress for Mino
 * (snapshot and tools). Built from the same engines as the screens, so Mino
 * and the app always agree. Student-entered text is quoted as such.
 */
export function abroadSummary(profile: UserProfile, now = new Date()) {
  const a = profile.abroad;
  const dream = a.dreamCountryCode ? getCountry(a.dreamCountryCode) : undefined;
  const journey = abroadJourney(profile, now);
  const roadmap = dream ? countryRoadmap(profile, dream.code, now) : undefined;
  const deadlines = allDeadlines(profile, now).filter((d) => !d.done);
  const required = requiredDocuments(a);
  const universities = a.universities ?? [];
  const next = abroadNextAction(profile, now);
  return {
    nextAction:
      next.kind === 'date'
        ? `date ${next.date} (${next.bucket}): ${typeof next.title === 'string' ? `"${next.title}" (student-entered)` : next.title.en} → ${next.href}`
        : next.kind === 'step'
          ? `roadmap step "${next.title.en}" → ${next.href}`
          : `journey stage "${next.stageId}" → ${next.href}`,
    dreamCountry: dream?.name ?? null,
    // Route for the dream country (countries with several pathways, e.g. degree vs language).
    pathway: dream && countryPathways(dream).length
      ? (() => {
          const p = selectedPathway(a, dream);
          return p
            ? { chosen: p.id, name: p.name.en, visaCategories: visaCategoriesFor(dream, p.id).map((c) => c.code) }
            : { chosen: null, options: countryPathways(dream).map((x) => `${x.id} (${x.name.en})`) };
        })()
      : null,
    shortlist: (a.preferredCountryCodes ?? []).map((c) => getCountry(c)?.name ?? c),
    journey: {
      stage: `${journey.currentIndex + 1} of ${journey.stages.length}`,
      current: journey.current.id,
      currentStatus: journey.current.status,
      next: journey.next?.id ?? null,
      done: journey.stages.filter((s) => s.status === 'done').map((s) => s.id),
      needsAttention: journey.attention.map((s) => ({ stage: s.id, why: s.attention?.key.replace('sa.attention.', ''), days: s.attention?.params?.n })),
    },
    roadmap: roadmap
      ? { done: roadmap.done, total: roadmap.total, currentStep: roadmap.current ? roadmap.current.title.en : 'all steps done', where: `/abroad/countries/${roadmap.code.toLowerCase()}/roadmap` }
      : null,
    upcomingDates: deadlines
      .filter((d) => d.bucket !== 'missed')
      .slice(0, 5)
      .map((d) => ({ date: d.date, what: typeof d.title === 'string' ? `"${d.title}" (student-entered)` : d.title.en, from: d.origin })),
    missedDates: deadlines.filter((d) => d.bucket === 'missed').length,
    documents: {
      ready: required.filter((k) => documentStatus(a, k) === 'ready').length,
      required: required.length,
      status: Object.fromEntries(required.map((k) => [k, documentStatus(a, k)])),
    },
    universities: {
      count: universities.length,
      list: universities.slice(0, 8).map((u) => `"${u.name}" (${getCountry(u.countryCode)?.name ?? u.countryCode}; ${u.fit}; ${u.status})`),
    },
  };
}

/** One line for the always-on snapshot. */
export function abroadSnapshotLine(profile: UserProfile, now = new Date()): string {
  const s = abroadSummary(profile, now);
  const parts = [
    s.dreamCountry ? `dream country ${s.dreamCountry}` : 'no dream country yet',
    s.shortlist.length && `shortlist ${s.shortlist.join(', ')}`,
    s.pathway && (s.pathway.chosen ? `pathway ${s.pathway.chosen} (visa ${s.pathway.visaCategories?.join('/') || 'not set'})` : `pathway not chosen yet (${s.pathway.options?.join(', ')})`),
    `journey stage ${s.journey.stage} "${s.journey.current}" (${s.journey.currentStatus})`,
    s.roadmap && `roadmap ${s.roadmap.done}/${s.roadmap.total}, now "${s.roadmap.currentStep}"`,
    s.journey.needsAttention.length && `needs attention: ${s.journey.needsAttention.map((x) => `${x.stage} (${x.why} ${x.days ?? ''})`).join(', ')}`,
    s.upcomingDates.length && `next dates: ${s.upcomingDates.slice(0, 3).map((d) => `${d.date} ${d.what}`).join('; ')}`,
    s.missedDates && `${s.missedDates} missed date(s)`,
    s.documents.required && `documents ready ${s.documents.ready}/${s.documents.required}`,
    s.universities.count && `${s.universities.count} universities on their list`,
    `next action: ${s.nextAction}`,
  ].filter(Boolean);
  return `- Study abroad journey: ${parts.join('; ')}.`;
}
