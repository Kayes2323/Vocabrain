import { IELTS_SKILLS, IELTS_SKILL_LABELS, type IELTSSkill } from '@/lib/constants';
import type { IELTSProfile, SkillBands } from '@/lib/models';

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Overall band from the four skills, using the IELTS convention: average,
 * then round to the nearest half band (x.25 rounds up to x.5, x.75 to x+1).
 * Returns undefined unless all four skills are known.
 */
export function overallBand(bands: SkillBands): number | undefined {
  const values = IELTS_SKILLS.map((s) => bands[s]);
  if (values.some((v) => v === undefined)) return undefined;
  const avg = (values as number[]).reduce((a, b) => a + b, 0) / values.length;
  return Math.floor(avg * 2 + 0.5) / 2;
}

/**
 * The CEFR level that IELTS publishes as equivalent to a band: 8.5–9 C2, 7–8 C1,
 * 5.5–6.5 B2, 4–5 B1, 3–3.5 A2, below that A1. Bands below 1 have no level.
 */
export function cefrForBand(band: number | undefined): 'C2' | 'C1' | 'B2' | 'B1' | 'A2' | 'A1' | undefined {
  if (band === undefined || band < 1) return undefined;
  if (band >= 8.5) return 'C2';
  if (band >= 7) return 'C1';
  if (band >= 5.5) return 'B2';
  if (band >= 4) return 'B1';
  if (band >= 3) return 'A2';
  return 'A1';
}

/** The whole band (0–9) a score sits in, used to pick its plain-language level. */
export const bandLevel = (band: number): number => Math.min(9, Math.max(0, Math.floor(band)));

export function formatBand(band: number | undefined): string {
  return band === undefined ? '–' : band.toFixed(1);
}

export function hasIELTSGoal(ielts: IELTSProfile): boolean {
  return ielts.targetBand !== undefined;
}

export function knownSkillCount(bands: SkillBands): number {
  return IELTS_SKILLS.filter((s) => bands[s] !== undefined).length;
}

export interface SkillGap {
  skill: IELTSSkill;
  label: string;
  current: number;
  gap: number;
}

/** Skills sorted from biggest gap to target to smallest. Unknown skills are skipped. */
export function skillGaps(ielts: IELTSProfile): SkillGap[] {
  const target = ielts.targetBand;
  if (target === undefined) return [];
  return IELTS_SKILLS.flatMap((skill) => {
    const current = ielts.currentBands[skill];
    if (current === undefined) return [];
    return [{ skill, label: IELTS_SKILL_LABELS[skill], current, gap: target - current }];
  }).sort((a, b) => b.gap - a.gap);
}

export function daysUntil(isoDate: string, now = new Date()): number {
  // Date-only strings are local calendar days, not UTC midnight.
  const target = new Date(isoDate.length === 10 ? `${isoDate}T00:00` : isoDate);
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.ceil((target.getTime() - start.getTime()) / DAY_MS);
}

export function weeksUntilTest(ielts: IELTSProfile, now = new Date()): number | undefined {
  if (!ielts.testDate) return undefined;
  return Math.max(0, Math.ceil(daysUntil(ielts.testDate, now) / 7));
}

/** 1-based preparation week since the student set their goal. */
export function preparationWeek(ielts: IELTSProfile, now = new Date()): number | undefined {
  if (!ielts.startedAt) return undefined;
  const elapsed = now.getTime() - new Date(ielts.startedAt).getTime();
  return Math.max(1, Math.floor(elapsed / (7 * DAY_MS)) + 1);
}
