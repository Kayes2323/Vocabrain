'use client';

import { useState } from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { checkWork, type WorkAnswers } from '@/lib/abroad/work';
import { useProfile } from '@/components/providers/ProfileProvider';
import { PROFILE_QUESTION_IDS, profileAnswer, type ProfileQuestionId } from '@/lib/abroad/profile-questions';
import type { Country } from '@/lib/models';
import { FactRow } from './FactRow';
import { useBilingual } from './useBilingual';

/**
 * "Can I work?" — shows the verified rule for the student's answers, asks the
 * questions a rule depends on, or says plainly that it is not verified yet.
 */
export function WorkCheck({ country, pathway, visaCategory }: { country: Country; pathway?: string; visaCategory?: string }) {
  const { t } = useLocale();
  const text = useBilingual();
  const { profile } = useProfile();
  // A work question that is also a profile question starts from the student's answer (they can change it here).
  const [answers, setAnswers] = useState<WorkAnswers>(() =>
    Object.fromEntries(
      (country.workQuestions ?? [])
        .filter((q) => (PROFILE_QUESTION_IDS as readonly string[]).includes(q.id) && profile)
        .map((q) => [q.id, profileAnswer(profile!.abroad, q.id as ProfileQuestionId)])
        .filter(([, v]) => typeof v === 'string'),
    ) as WorkAnswers,
  );
  const result = checkWork(country, { ...answers, pathway, visaCategory });
  return (
    <section className="space-y-3 rounded-2xl border bg-card p-4" data-testid="work-check" data-state={result.state}>
      <h2 className="flex items-center gap-2 font-semibold">
        <Briefcase className="size-4 text-brand" aria-hidden /> {t('sa.work.title')}
      </h2>
      {result.state === 'not-verified' && <p className="text-sm text-muted-foreground">{t('sa.work.notVerified')}</p>}
      {result.state === 'needs-answers' && (
        <div className="space-y-2">
          <p className="text-sm">{t('sa.work.needs')}</p>
          {result.questions.map((q) => (
            <label key={q.id} className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">{text(q.label)}</span>
              <select className="h-10 rounded-lg border bg-background px-3" value={answers[q.id] ?? ''} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value || undefined })}>
                <option value="">{t('sa.work.choose')}</option>
                {q.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {text(o.label)}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      )}
      {result.state === 'answered' && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">{t('sa.work.answered')}</p>
          {result.rules.map((r) => (
            <FactRow key={r.rule.id} item={{ label: { en: '', bn: '' }, fact: r.rule.outcome }} sectionId="work" />
          ))}
        </div>
      )}
      {result.links.map((l) => (
        <a key={l.url ?? l.name} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-brand">
          {l.name} <ExternalLink className="size-3.5" aria-hidden />
        </a>
      ))}
      <p className="text-xs text-muted-foreground">{t('sa.work.only')}</p>
    </section>
  );
}
