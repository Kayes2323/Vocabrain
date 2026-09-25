import { IELTS_SKILLS, IELTS_SKILL_LABELS, type IELTSSkill } from '@/lib/constants';
import type { UserProfile } from '@/lib/models';

export interface PlanItem {
  id: IELTSSkill | 'vocabulary';
  label: string;
  minutes: number;
  href: string;
  /** Short explanation of why this block got its time. */
  reason: string;
}

const DEFAULT_DAILY_MINUTES = 90;
const DEFAULT_STUDY_DAYS = 6;
const MIN_BLOCK = 10;
const VOCAB_SHARE = 0.15;

function roundTo5(n: number): number {
  return Math.max(MIN_BLOCK, Math.round(n / 5) * 5);
}

export function dailyMinutes(profile: UserProfile): number {
  const { weeklyStudyHours, studyDays } = profile.ielts;
  if (!weeklyStudyHours) return DEFAULT_DAILY_MINUTES;
  const days = studyDays?.length || DEFAULT_STUDY_DAYS;
  return Math.max(30, Math.round((weeklyStudyHours * 60) / days));
}

/**
 * First version of the adaptive allocation: every skill gets a base share,
 * and skills further below the target get proportionally more time.
 * Phase 3 replaces the self-reported bands with measured progress.
 */
export function buildTodayPlan(profile: UserProfile): PlanItem[] {
  const total = dailyMinutes(profile);
  const vocabMinutes = roundTo5(total * VOCAB_SHARE);
  const skillMinutes = total - vocabMinutes;
  const { targetBand, currentBands } = profile.ielts;

  const weights = IELTS_SKILLS.map((skill) => {
    const current = currentBands[skill];
    const gap = targetBand !== undefined && current !== undefined ? Math.max(0, targetBand - current) : 0.5;
    return { skill, gap, weight: 1 + gap * 2 };
  });
  const weightSum = weights.reduce((s, w) => s + w.weight, 0);

  const skills: PlanItem[] = weights.map(({ skill, gap, weight }) => ({
    id: skill,
    label: IELTS_SKILL_LABELS[skill],
    minutes: roundTo5((skillMinutes * weight) / weightSum),
    href: `/ielts/${skill}`,
    reason:
      targetBand === undefined || currentBands[skill] === undefined
        ? 'Balanced practice'
        : gap <= 0
          ? 'At target, keep it sharp'
          : `${gap.toFixed(1)} below your target`,
  }));

  const lessonId = profile.vocabulary.lastLessonId;
  const vocab: PlanItem = {
    id: 'vocabulary',
    label: 'Vocabulary',
    minutes: vocabMinutes,
    href: lessonId ? `/ielts/vocabulary/lessons/${lessonId}` : '/ielts/vocabulary',
    reason: lessonId ? `Continue Lesson ${lessonId}` : 'Start your first lesson',
  };

  // Biggest-gap skill first so the hardest work happens with the most energy.
  skills.sort((a, b) => b.minutes - a.minutes);
  return [...skills, vocab];
}

export function planTotalMinutes(items: PlanItem[]): number {
  return items.reduce((s, i) => s + i.minutes, 0);
}
