import { IELTS_SKILL_LABELS } from '@/lib/constants';
import type { NextAction, UserProfile } from '@/lib/models';
import { hasAbroadGoal } from './abroad-journey';
import { formatBand, hasIELTSGoal, knownSkillCount, overallBand, skillGaps } from './ielts';

/**
 * Rule-based Next Action Engine. Given the student's profile it answers
 * "what should I do now?" with a short, ordered list. The same interface will
 * later be served by an AI capability, so callers never depend on how the
 * actions were produced.
 */
export function getNextActions(profile: UserProfile, limit = 3): NextAction[] {
  const actions: NextAction[] = [];
  const { ielts, abroad, vocabulary } = profile;

  if (!hasIELTSGoal(ielts)) {
    actions.push({
      id: 'set-ielts-goal',
      pillar: 'ielts',
      title: 'Set your IELTS target',
      reason: 'Your plan, daily tasks and Mino’s advice all start from your target band.',
      href: '/setup/ielts',
      cta: 'Set target',
      priority: 0,
      estimatedMinutes: 2,
    });
  } else if (knownSkillCount(ielts.currentBands) < 4) {
    actions.push({
      id: 'add-skill-bands',
      pillar: 'ielts',
      title: 'Add your current skill scores',
      reason: 'Knowing where you are in each skill lets the plan focus on the right one.',
      href: '/setup/ielts?step=skills',
      cta: 'Add scores',
      priority: 1,
      estimatedMinutes: 1,
    });
  }

  const [weakest] = skillGaps(ielts);
  if (weakest && weakest.gap > 0) {
    actions.push({
      id: `focus-${weakest.skill}`,
      pillar: 'ielts',
      title: `Focus on ${weakest.label}`,
      reason: `${weakest.label} is at ${formatBand(weakest.current)}, your biggest gap to ${formatBand(ielts.targetBand)}.`,
      href: `/ielts/${weakest.skill}`,
      cta: `Open ${weakest.label}`,
      priority: 2,
      estimatedMinutes: 30,
    });
  }

  actions.push(
    vocabulary.lastLessonId
      ? {
          id: 'continue-vocabulary',
          pillar: 'vocabulary',
          title: `Continue vocabulary Lesson ${vocabulary.lastLessonId}`,
          reason: 'A short daily session keeps new words retrievable.',
          href: `/ielts/vocabulary/lessons/${vocabulary.lastLessonId}`,
          cta: 'Continue',
          priority: 3,
          estimatedMinutes: 15,
        }
      : {
          id: 'start-vocabulary',
          pillar: 'vocabulary',
          title: 'Start your first vocabulary lesson',
          reason: 'Ten topic words in context, about 15 minutes.',
          href: '/ielts/vocabulary/lessons/1',
          cta: 'Start',
          priority: 3,
          estimatedMinutes: 15,
        },
  );

  if (!hasAbroadGoal(abroad)) {
    actions.push({
      id: 'set-abroad-goal',
      pillar: 'abroad',
      title: 'Tell us your study-abroad goal',
      reason: 'Your degree and target intake shape your timeline and deadlines.',
      href: '/setup/abroad',
      cta: 'Add goal',
      priority: 4,
      estimatedMinutes: 2,
    });
  } else {
    actions.push({
      id: 'explore-countries',
      pillar: 'abroad',
      title: 'Explore destinations',
      reason: 'Start a shortlist of countries that match your plans.',
      href: '/abroad/countries',
      cta: 'Explore',
      priority: 5,
      estimatedMinutes: 10,
    });
  }

  return actions.sort((a, b) => a.priority - b.priority).slice(0, limit);
}

/** One-sentence personalised observation for Home and Mino. */
export function getMinoInsight(profile: UserProfile): string {
  const { ielts } = profile;
  if (!hasIELTSGoal(ielts)) {
    return 'Tell me your target band and I’ll turn it into a daily plan.';
  }
  const gaps = skillGaps(ielts);
  if (gaps.length < 2) {
    return 'Add your current score for each skill so I can see where to focus.';
  }
  const weakest = gaps[0];
  const strongest = gaps[gaps.length - 1];
  const overall = overallBand(ielts.currentBands);
  if (weakest.gap <= 0) {
    return `Every skill is at or above ${formatBand(ielts.targetBand)}. Timed mock tests are the best next step.`;
  }
  return `${strongest.label} is your strongest skill${overall !== undefined ? ` (overall estimate ${formatBand(overall)})` : ''}. ${IELTS_SKILL_LABELS[weakest.skill]} needs the most attention this week.`;
}
