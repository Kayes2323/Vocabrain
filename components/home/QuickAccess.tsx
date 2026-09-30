'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ProgressBar } from '@/components/ds';
import { useBrainContext } from '@/components/brain/useBrainContext';
import { useBrain } from '@/components/providers/BrainProvider';
import { readingVocabulary } from '@/lib/content/reading-library/vocab-list';
import { useLocale } from '@/components/providers/LocaleProvider';
import { buildDailyPlan, dailyPlanState } from '@/lib/engine';
import type { UserProfile } from '@/lib/models';
import { HOME_QUICK_ACCESS } from '@/lib/navigation';
import { cn } from '@/lib/utils';

/**
 * Home's one hub: today's learning (with where the student is today), the
 * three main IELTS areas and Study Abroad. Every tile opens an existing page.
 */
export function QuickAccess({ profile }: { profile: UserProfile }) {
  const { t, n } = useLocale();
  const brain = useBrainContext();
  const { words } = useBrain();
  const plan = buildDailyPlan(profile, brain);
  // Small live counts, only when there is something real to count.
  const fresh = readingVocabulary(profile.study.readingLibrary, words).fresh.length;
  const counts: Partial<Record<string, string>> = {
    brain: brain.due > 0 ? t('home.quick.brain.due', { n: n(brain.due) }) : brain.total > 0 ? t('home.quick.brain.words', { n: n(brain.total) }) : undefined,
    readingVocab: fresh > 0 ? t('home.quick.readingVocab.fresh', { n: n(fresh) }) : undefined,
  };
  const done = plan.tasks.filter((task) => task.done).length;
  const completed = dailyPlanState(plan, profile) === 'completed';
  const [today, ...rest] = HOME_QUICK_ACCESS;
  const TodayIcon = today.icon;

  return (
    <section aria-labelledby="quick-access-title" className="space-y-3" data-testid="quick-access">
      <h2 id="quick-access-title" className="px-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {t('home.quickAccess')}
      </h2>

      {/* Today's learning leads: a wide tile with today's progress. */}
      <Link
        href={today.href}
        data-quick={today.id}
        className="flex items-center gap-3.5 rounded-2xl border border-brand/15 bg-card p-4 shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-colors hover:bg-muted/50 active:scale-[0.99]"
      >
        <span className={cn('flex size-12 shrink-0 items-center justify-center rounded-2xl', today.tint)} aria-hidden>
          <TodayIcon className="size-6" />
        </span>
        <span className="min-w-0 flex-1 space-y-1.5">
          <span className="flex items-baseline justify-between gap-2">
            <span className="text-[15px] font-semibold">{t('home.quick.today.title')}</span>
            <span className={cn('shrink-0 text-xs tabular-nums', completed ? 'font-medium text-success' : 'text-muted-foreground')} data-testid="quick-today-status">
              {completed ? t('home.todayCompleted') : t('home.todayProgress', { done: n(done), total: n(plan.tasks.length) })}
            </span>
          </span>
          <ProgressBar value={plan.tasks.length ? Math.round((done / plan.tasks.length) * 100) : 0} label={t('home.quick.today.title')} />
        </span>
        <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      </Link>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {rest.map(({ id, href, icon: Icon, tint }) => (
          <li key={id}>
            <Link
              href={href}
              data-quick={id}
              className="flex h-full min-h-[6.5rem] flex-col justify-start gap-3 rounded-2xl border bg-card p-4 shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-colors hover:bg-muted/50 active:scale-[0.98]"
            >
              <span className={cn('flex size-11 items-center justify-center rounded-xl', tint)} aria-hidden>
                <Icon className="size-[22px]" />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] leading-tight font-semibold">{t(`home.quick.${id}.title`)}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{t(`home.quick.${id}.body`)}</span>
                {counts[id] && (
                  <span className="mt-1.5 inline-block text-xs font-medium text-brand tabular-nums" data-quick-count={id}>
                    {counts[id]}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
