'use client';

import { Sigma } from 'lucide-react';
import { StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';

const METHOD_STEPS = ['check', 'repair', 'learn', 'review'] as const;

/** Faint graph-paper grid: the Academic world's own surface, distinct from the IELTS cards. */
const GRID = {
  backgroundImage:
    'linear-gradient(var(--academic-line) 1px, transparent 1px), linear-gradient(90deg, var(--academic-line) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
  backgroundPosition: '-1px -1px',
} as const;

/**
 * The Academic world's entry. Concept- and mastery-oriented, not skill cards.
 * No subject is open yet, so it says so plainly: no invented lessons or
 * progress. When the first concepts ship, Continue Learning, Your Subjects
 * and the mastery counts replace the "being built" row (from real evidence).
 */
export function AcademicHome({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const { t, n } = useLocale();
  const Heading = headingLevel;
  return (
    <div className="space-y-6" data-testid="academic-home">
      <section className="relative overflow-hidden rounded-2xl border border-academic-line bg-academic-soft">
        <div aria-hidden className="absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom_right,black,transparent_75%)]" style={GRID} />
        <div className="relative space-y-2 p-5 md:p-7">
          <p className="text-xs font-semibold tracking-wider text-academic uppercase">{t('academic.label')}</p>
          <Heading className="text-xl font-semibold tracking-tight text-balance md:text-2xl">{t('academic.title')}</Heading>
          <p className="max-w-prose text-[15px] text-muted-foreground text-pretty">{t('academic.intro')}</p>
        </div>
      </section>

      <section aria-labelledby="academic-first-subject" className="space-y-3">
        <h3 id="academic-first-subject" className="px-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {t('academic.firstSubject.heading')}
        </h3>
        <div className="flex items-start gap-3 rounded-2xl border bg-card p-4" data-testid="academic-first-subject-row">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-academic-soft text-academic" aria-hidden>
            <Sigma className="size-5" />
          </span>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <p className="font-semibold">
                <span className="text-muted-foreground">{t('academic.firstSubject.level')} · </span>
                {t('academic.firstSubject.name')}
              </p>
              <StatusChip>{t('academic.firstSubject.status')}</StatusChip>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">{t('academic.firstSubject.body')}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="academic-method" className="space-y-3">
        <h3 id="academic-method" className="px-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {t('academic.method.heading')}
        </h3>
        <ol className="divide-y rounded-2xl border bg-card" data-testid="academic-method">
          {METHOD_STEPS.map((step, i) => (
            <li key={step} className="flex items-center gap-3 px-4 py-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-academic-line text-sm font-semibold text-academic tabular-nums">
                {n(i + 1)}
              </span>
              <span className="text-[15px]">{t(`academic.method.steps.${step}`)}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="px-1 text-sm text-muted-foreground text-pretty" data-testid="academic-no-progress">
        {t('academic.nothingYet')}
      </p>
    </div>
  );
}
