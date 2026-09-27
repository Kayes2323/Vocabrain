import { getCountry } from '@/lib/content/countries';
import { abroadAlerts, abroadJourney, abroadNextAction, allDeadlines, countryRoadmap, documentViewStatus, requiredDocumentNeeds, studentRouteContext } from '@/lib/engine';
import { costPlan } from './costs';
import { documentExplanation } from './documents';
import type { UserProfile } from '@/lib/models';
import { countryPathways, selectedPathway, visaCategoriesFor } from './pathways';
import { PROFILE_QUESTION_IDS, profileAnswer, type ProfileAnswer, type ProfileQuestionId } from './profile-questions';
import { PROGRAMS, UNIVERSITIES } from '@/lib/content/universities';

/** The student's own answers for Mino: each question's answer, or "not provided" (never guessed). */
export function studentProfileForMino(a: UserProfile['abroad']): Record<'wantedDegree' | 'wantedSubject' | ProfileQuestionId, string> {
  const fmt = (v: ProfileAnswer | undefined) => {
    if (v === undefined) return 'not provided';
    if (typeof v !== 'object') return String(v);
    return 'amount' in v ? `${v.currency} ${v.amount}` : `${v.value} (${v.scale})`;
  };
  return {
    wantedDegree: a.degreeLevel ?? 'not provided',
    wantedSubject: a.subject ? `"${a.subject}" (student-entered)` : 'not provided',
    ...(Object.fromEntries(PROFILE_QUESTION_IDS.map((id) => [id, fmt(profileAnswer(a, id))])) as Record<ProfileQuestionId, string>),
  };
}

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
  const needs = requiredDocumentNeeds(a);
  const required = needs.map((n) => n.kind);
  const universities = a.universities ?? [];
  const next = abroadNextAction(profile, now);
  return {
    profile: studentProfileForMino(a),
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
      ready: required.filter((k) => documentViewStatus(a, k, now) === 'ready').length,
      required: required.length,
      status: Object.fromEntries(required.map((k) => [k, documentViewStatus(a, k, now)])),
      // Why each document is on the list; "official" only when a verified requirement exists.
      why: needs.map((n) => {
        const ex = documentExplanation(n);
        const who = ex.askedBy.map((w) => `${w.from}${w.name ? ` ${w.name}` : ''}`).join(', ') || 'general preparation';
        return `${n.kind}: ${documentViewStatus(a, n.kind, now)}; for ${who}; ${ex.requirements.length ? `official requirement verified (${ex.requirements.map((r) => `${r.source.name}, ${r.lastVerified}`).join('; ')})` : 'official requirement NOT verified'}`;
      }),
    },
    costs: dream ? costsForMino(profile, dream.code, now) : null,
    alerts: abroadAlerts(profile, now).map((al) => `${al.kind}: ${al.kind === 'document-update' || al.kind === 'document-missing' ? al.document : al.kind === 'needs-review' ? al.section : al.kind === 'scholarship' ? al.name : typeof al.title === 'string' ? `"${al.title}" (student-entered)` : al.title.en} → ${al.href}`),
    universities: {
      count: universities.length,
      list: universities.slice(0, 8).map((u) => {
        const reviewed = u.universityId && UNIVERSITIES.some((x) => x.id === u.universityId);
        const program = u.programId ? PROGRAMS.find((p) => p.id === u.programId)?.title : u.program ? `"${u.program}"` : 'no program yet';
        return `"${u.name}" (${getCountry(u.countryCode)?.name ?? u.countryCode}; program ${program}; ${u.fit}; ${u.status}; ${reviewed ? 'reviewed record — use getCountryData/facts' : 'student-entered, no verified facts'})`;
      }),
    },
  };
}

/** Cost view for Mino: OFFICIAL (verified, sourced), ESTIMATE (labelled), MY BUDGET (student's) — never mixed, never a hidden value. */
export function costsForMino(profile: UserProfile, code: string, now = new Date()) {
  const country = getCountry(code);
  if (!country) return null;
  const plan = costPlan(country, profile.abroad, studentRouteContext(profile.abroad, code), now);
  const money = (m: { amount: number; currency: string }) => `${m.currency} ${Math.round(m.amount)}`;
  return {
    groups: Object.fromEntries(
      plan.groups.map((g) => [
        g.group,
        {
          official: g.official.length
            ? g.official.map((o) => `${money(o.cost.amount.value)} ${o.cost.amount.value.period} (${o.cost.label.en}; ${o.cost.amount.source.name}, ${o.cost.amount.lastVerified}; ${o.status})`)
            : 'not verified',
          estimate: g.estimateYear ? `ESTIMATE ${money({ amount: g.estimateYear.low, currency: g.estimateYear.currency })}–${money({ amount: g.estimateYear.high, currency: g.estimateYear.currency })} per year` : 'no estimate',
          myBudget: g.mine ? `${money(g.mine)} per ${g.mine.period} (student's own number)` : 'not provided',
        },
      ]),
    ),
    available: plan.available ? `${money(plan.available)} (student's own number)` : 'not provided',
    currencyConversion: plan.currencyUnavailable ? 'unavailable — do not convert' : 'not needed',
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
    s.documents.required && `documents ready ${s.documents.ready}/${s.documents.required} (${s.documents.why.join(' | ')})`,
    s.costs && `costs: ${Object.entries(s.costs.groups).map(([g, v]) => `${g} official ${Array.isArray(v.official) ? v.official.join(' / ') : v.official}, ${v.estimate}, my budget ${v.myBudget}`).join('; ')}; money available ${s.costs.available}; currency conversion ${s.costs.currencyConversion}`,
    s.universities.count && `${s.universities.count} universities on their list`,
    `profile: ${Object.entries(s.profile).filter(([, v]) => v !== 'not provided').map(([k, v]) => `${k} ${v}`).join(', ') || 'nothing provided yet'}`,
    s.alerts.length && `needs attention: ${s.alerts.join('; ')}`,
    `next action: ${s.nextAction}`,
  ].filter(Boolean);
  return `- Study abroad journey: ${parts.join('; ')}.`;
}
