import type { NextAction, UserProfile } from '@/lib/models';
import { msg } from '@/lib/i18n/message';
import { buildDailyPlan } from './daily-plan';
import { biggestOpportunity } from './diagnostic';
import { formatBand, overallBand, skillGaps } from './ielts';
import { nextProfileGap } from './profile-gaps';

/**
 * Rule-based Next Action Engine: "what should I do now?" as a short ordered
 * list. An AI capability can later return the same NextAction shape.
 */
export function getNextActions(profile: UserProfile, limit = 3, now = new Date()): NextAction[] {
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

  const plan = buildDailyPlan(profile, now);
  plan.tasks
    .filter((t) => !plan.done.includes(t.kind))
    .forEach((t, i) =>
      actions.push({
        id: `today-${t.kind}`,
        pillar: t.kind === 'vocabulary' ? 'vocabulary' : 'ielts',
        title: msg(t.titleKey),
        reason: msg(i === 0 ? 'actions.todayFirst' : 'actions.todayNext'),
        href: t.href,
        cta: msg('actions.start'),
        priority: 1 + i,
        estimatedMinutes: t.minutes,
      }),
    );

  return actions.sort((a, b) => a.priority - b.priority).slice(0, limit);
}

/** One sentence from Mino for Home and the Mino screen. */
export function getMinoInsight(profile: UserProfile, now = new Date()) {
  const plan = buildDailyPlan(profile, now);
  if (plan.mode === 'catch-up') return msg('mino.insight.catchUp');
  if (plan.tasks.length > 0 && plan.done.length >= plan.tasks.length) return msg('mino.insight.dayDone');

  const { ielts } = profile;
  if (ielts.targetBand === undefined) return msg('mino.insight.noTarget');
  const gaps = skillGaps(ielts);
  if (gaps.length < 4) return msg('mino.insight.noBands');
  const focus = biggestOpportunity(ielts)!;
  const gap = gaps.find((g) => g.skill === focus)!;
  if (gap.gap <= 0) {
    return msg('mino.insight.atTarget', { target: formatBand(ielts.targetBand) });
  }
  return msg('mino.insight.focus', {
    skill: gap.label,
    gap: gap.gap.toFixed(1),
    overall: formatBand(overallBand(ielts.currentBands)),
  });
}
