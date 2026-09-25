import type { NextAction, UserProfile } from '@/lib/models';
import { msg } from '@/lib/i18n/message';
import { buildDailyPlan, type BrainContext } from './daily-plan';
import { biggestOpportunity } from './diagnostic';
import { formatBand, overallBand, skillGaps } from './ielts';
import { nextProfileGap } from './profile-gaps';

export interface MinoBrainContext extends BrainContext {
  failedLastTime: number;
  /** A recalled word the student hasn't used yet, for a usage nudge. */
  wordToUse?: string;
}

/**
 * Rule-based Next Best Action: "what should I do now?" as a short ordered
 * list. An AI capability can later return the same NextAction shape.
 */
export function getNextActions(profile: UserProfile, brain: MinoBrainContext, limit = 3, now = new Date()): NextAction[] {
  const actions: NextAction[] = [];

  const gap = nextProfileGap(profile);
  if (gap) {
    actions.push({
      id: `gap-${gap.id}`,
      pillar: 'profile',
      title: msg(`gaps.${gap.id}.title`),
      reason: msg(`gaps.${gap.id}.why`),
      href: gap.href,
      cta: msg('actions.answer'),
      priority: 0,
      estimatedMinutes: gap.id === 'startingPoint' ? 5 : 1,
    });
  }

  buildDailyPlan(profile, brain, now)
    .tasks.filter((t) => !t.done)
    .forEach((t, i) =>
      actions.push({
        id: `today-${t.kind}`,
        pillar: t.kind === 'vocabulary' ? 'vocabulary' : 'ielts',
        title: msg(t.titleKey),
        reason:
          t.kind === 'vocabulary' && brain.failedLastTime > 0
            ? msg('actions.reviewFailed', { n: brain.failedLastTime })
            : msg(t.detailKey, t.detailVars),
        href: t.href,
        cta: msg('actions.start'),
        priority: 1 + i,
        estimatedMinutes: t.minutes,
      }),
    );

  return actions.sort((a, b) => a.priority - b.priority).slice(0, limit);
}

/** One sentence from Mino for Home, the Brain and the Mino screen. */
export function getMinoInsight(profile: UserProfile, brain: MinoBrainContext, now = new Date()) {
  const plan = buildDailyPlan(profile, brain, now);
  if (plan.mode === 'catch-up') return msg('mino.insight.catchUp');
  if (plan.tasks.every((t) => t.done)) return msg('mino.insight.dayDone');

  if (brain.due > 0) {
    return brain.failedLastTime > 0
      ? msg('mino.insight.reviewFailed', { n: brain.due, failed: brain.failedLastTime })
      : msg('mino.insight.review', { n: brain.due });
  }
  if (brain.total === 0) return msg('mino.insight.startReading');
  if (brain.wordToUse) return msg('mino.insight.useWord', { word: brain.wordToUse });

  const { ielts } = profile;
  if (ielts.targetBand === undefined) return msg('mino.insight.noTarget');
  const gaps = skillGaps(ielts);
  if (gaps.length < 4) return msg('mino.insight.noBands');
  const focus = biggestOpportunity(ielts)!;
  const gap = gaps.find((g) => g.skill === focus)!;
  if (gap.gap <= 0) return msg('mino.insight.atTarget', { target: formatBand(ielts.targetBand) });
  return msg('mino.insight.focus', { skill: gap.label, gap: gap.gap.toFixed(1), overall: formatBand(overallBand(ielts.currentBands)) });
}
