import type { DocumentKind, UserProfile } from '@/lib/models';
import { getCountry } from '@/lib/content/countries';
import {
  abroadJourney,
  countryRoadmap,
  documentViewStatus,
  hasAbroadGoal,
  studentRouteContext,
  type AbroadStage,
  type RoadmapStep,
} from '@/lib/engine';
import { countryHref } from './countries';
import { documentsFor, stepDocuments } from './documents';

/**
 * The student-facing Journey: six high-level phases on top of the existing
 * journey stages and country roadmap. Nothing new is stored and nothing is
 * inferred: every status comes from the same roadmap ticks, stage marks,
 * IELTS progress, document progress and university list the other screens use.
 *
 * The first two stages (goal, dream country) are the setup before the phases.
 */
export const JOURNEY_PHASES = ['english', 'documents', 'university', 'application', 'visa', 'departure'] as const;
export type JourneyPhaseId = (typeof JOURNEY_PHASES)[number];

export type PhaseStatus = 'not-started' | 'in-progress' | 'ready' | 'completed';

/** Which journey stages (and so which roadmap steps) make up each phase. */
export const PHASE_STAGES: Record<JourneyPhaseId, readonly string[]> = {
  english: ['english'],
  documents: ['documents'],
  university: ['eligibility', 'program'],
  application: ['apply', 'offer'],
  visa: ['visa'],
  departure: ['travel'],
};

/** Steps shown in a different phase than their stage (scholarship search belongs to choosing a university). */
const STEP_PHASE: Record<string, JourneyPhaseId> = { scholarships: 'university' };

/** The phase a roadmap step belongs to; undefined for the setup steps (goal, dream country). */
export function phaseOfStep(step: { id: string; stage: string }): JourneyPhaseId | undefined {
  return STEP_PHASE[step.id] ?? JOURNEY_PHASES.find((p) => PHASE_STAGES[p].includes(step.stage));
}

export interface JourneyPhase {
  id: JourneyPhaseId;
  status: PhaseStatus;
  /** The roadmap steps of this phase (dream country's roadmap), in order. */
  steps: RoadmapStep[];
  /** Documents that belong to this phase's steps (same list as the roadmap and documents page). */
  documents: DocumentKind[];
  /** Where the student does the work of this phase (existing Study Abroad pages). */
  href: string;
  /** A close or missed personal date, or an IELTS test soon. */
  attention?: AbroadStage['attention'];
}

export interface PhaseJourney {
  /** What is still missing before the phases start. */
  setup: 'goal' | 'country' | null;
  countryCode?: string;
  phases: JourneyPhase[];
  current: JourneyPhase;
  next?: JourneyPhase;
  /** Completed phases (for the progress line). */
  completed: number;
  complete: boolean;
}

/** University statuses that mean "on my list for real" and "application under way / done". */
const SHORTLISTED = new Set(['shortlisted', 'applying', 'applied', 'offer']);
const APPLYING = new Set(['applying', 'applied', 'offer']);

export function journeyPhases(profile: UserProfile, now = new Date()): PhaseJourney {
  const a = profile.abroad;
  const code = a.dreamCountryCode;
  const country = code ? getCountry(code) : undefined;
  const journey = abroadJourney(profile, now);
  const stage = (id: string) => journey.stages.find((s) => s.id === id);
  const roadmap = country ? countryRoadmap(profile, country.code, now) : undefined;
  const docsByStep = roadmap ? stepDocuments(roadmap.steps, documentsFor(country, studentRouteContext(a, country!.code))) : {};
  const myUnis = (a.universities ?? []).filter((u) => !code || u.countryCode === code);
  const docReady = (k: DocumentKind) => documentViewStatus(a, k, now) === 'ready';
  const docTouched = (k: DocumentKind) => documentViewStatus(a, k, now) !== 'not-started';
  const lower = code?.toLowerCase();

  const href: Record<JourneyPhaseId, string> = {
    english: '/ielts',
    documents: '/abroad/documents',
    university: lower ? `/abroad/universities?country=${lower}` : '/abroad/universities',
    application: lower ? `/abroad/deadlines?country=${lower}` : '/abroad/deadlines',
    visa: lower ? `/abroad/visa/${lower}` : '/abroad/visa',
    departure: code ? countryHref(code, 'visa') : '/abroad/visa',
  };

  const phases: JourneyPhase[] = JOURNEY_PHASES.map((id) => {
    const steps = roadmap ? roadmap.steps.filter((s) => phaseOfStep(s) === id) : [];
    const stages = PHASE_STAGES[id].map(stage).filter((s): s is AbroadStage => Boolean(s));
    const documents = [...new Set(steps.flatMap((s) => docsByStep[s.id] ?? []))];

    // Completed: every step of the phase is done (ticks, stage marks and data rules, as on the roadmap).
    // Without a roadmap (no dream country yet) only the stages can say so.
    const completed = steps.length ? steps.every((s) => s.status === 'done') : stages.length > 0 && stages.every((s) => s.status === 'done');

    // Ready: the student's own data says the work of this phase is prepared, before every step is ticked.
    let ready = false;
    if (id === 'english') ready = docReady('english-test');
    if (id === 'documents') ready = documents.length > 0 && documents.every(docReady);
    if (id === 'university') ready = myUnis.some((u) => SHORTLISTED.has(u.status));
    if (id === 'application') ready = myUnis.some((u) => u.status === 'offer');

    // In progress: something real has happened (a tick, a date, a document, a university, IELTS started).
    const stepStarted = steps.some((s) => s.status === 'done' || Boolean(s.mark));
    const stageStarted = stages.some((s) => s.status !== 'upcoming');
    let activity = stepStarted || stageStarted;
    if (id === 'documents') activity ||= documents.some(docTouched);
    if (id === 'university') activity ||= myUnis.length > 0;
    if (id === 'application') activity ||= myUnis.some((u) => APPLYING.has(u.status));

    const status: PhaseStatus = completed ? 'completed' : ready ? 'ready' : activity ? 'in-progress' : 'not-started';
    const attention = status === 'completed' ? undefined : steps.find((s) => s.attention)?.attention ?? stages.find((s) => s.attention)?.attention;
    return { id, status, steps, documents, href: href[id], ...(attention ? { attention } : {}) };
  });

  // The current phase: the first one that is neither completed nor ready.
  const idx = phases.findIndex((p) => p.status !== 'completed' && p.status !== 'ready');
  const complete = idx < 0;
  const current = complete ? phases[phases.length - 1] : phases[idx];
  const next = complete ? undefined : phases.slice(idx + 1).find((p) => p.status !== 'completed');
  return {
    setup: !hasAbroadGoal(a) ? 'goal' : !code ? 'country' : null,
    ...(code ? { countryCode: code } : {}),
    phases,
    current,
    ...(next ? { next } : {}),
    completed: phases.filter((p) => p.status === 'completed').length,
    complete,
  };
}

/** Budget matters in these phases (tuition and money to show); the Journey links to the cost planner, never copies it. */
export const BUDGET_PHASES: readonly JourneyPhaseId[] = ['university', 'documents', 'visa'];
