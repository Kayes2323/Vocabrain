'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, ChevronLeft, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ChoiceGrid, ScreenSkeleton, StepFlow } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { IELTS_SKILLS } from '@/lib/constants';
import {
  applyMyPlan, changedFields, formatBand, generateMyPlan, isCompletePlan, localDateKey, PLAN_BANDS, PLAN_DAILY_MINUTES, PLAN_DAYS_PER_WEEK, PLAN_LEVELS,
  PLAN_MAX_DAYS_AHEAD, PLAN_PREFERENCES, planAnswers, suggestedAnswers, suggestedLevel, validatePlanAnswers,
} from '@/lib/engine';
import type { PlanAnswers } from '@/lib/models';
import { readJSON, writeJSON } from '@/lib/services/local-store';
import { cn } from '@/lib/utils';
import { PlanOverview, PlanSummary, usePlanText } from './PlanParts';

/** One question per step, in this order. */
export const PLAN_STEPS: (keyof PlanAnswers)[] = ['targetDate', 'targetBand', 'currentLevel', 'dailyStudyMinutes', 'studyDaysPerWeek', 'weakSkills', 'studyPreference'];

interface Draft {
  answers: Partial<PlanAnswers>;
  step: number;
  preview: boolean;
  edit: boolean;
  /** "All about the same" was chosen for weak skills (an empty list is otherwise "not answered"). */
  balanced?: boolean;
  /** Came here from "Change" on the preview: Next returns to the preview. */
  review?: boolean;
}

const draftKey = (uid: string) => `mino:plan-draft:${uid}`;
const clearDraft = (uid: string) => {
  try {
    window.localStorage.removeItem(draftKey(uid));
  } catch {
    // Storage unavailable: nothing to clear.
  }
};

/**
 * Plan setup: the questions one at a time, then a preview of the generated
 * plan to save (or, when editing, the changes to confirm). Answers are kept
 * on this device while the student is in the middle of it, so a refresh
 * does not lose them.
 */
export function PlanSetupFlow() {
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;
  return <Setup />;
}

function Setup() {
  const router = useRouter();
  const params = useSearchParams();
  const { t, n } = useLocale();
  const { profile, updateProfile } = useProfile();
  const text = usePlanText();
  const uid = profile!.userId;
  const saved = profile!.ielts.plan;
  const edit = params.get('edit') === '1' && Boolean(saved);

  const [draft, setDraft] = useState<Draft>(() => {
    const stored = readJSON<Draft>(draftKey(uid));
    if (stored && stored.edit === edit) return stored;
    return edit && saved
      ? { answers: planAnswers(saved), step: 0, preview: false, edit, balanced: saved.weakSkills.length === 0 }
      : { answers: suggestedAnswers(profile!), step: 0, preview: false, edit };
  });
  const [saving, setSaving] = useState(false);
  useEffect(() => writeJSON(draftKey(uid), draft), [uid, draft]);

  const { answers, step, preview } = draft;
  const field = PLAN_STEPS[step];
  const errors = validatePlanAnswers(answers);
  const set = (patch: Partial<PlanAnswers>) => setDraft((d) => ({ ...d, answers: { ...d.answers, ...patch } }));
  const go = (next: Partial<Draft>) => {
    setDraft((d) => ({ ...d, ...next }));
    window.scrollTo({ top: 0 });
  };
  const leave = () => {
    clearDraft(uid);
    router.push('/ielts/plan');
  };

  const plan = useMemo(() => (isCompletePlan(answers) ? generateMyPlan(answers, new Date(), saved) : undefined), [answers, saved]);

  // ---------------------------------------------------------------- preview / confirm
  if (preview) {
    if (!plan) {
      // Incomplete answers can never be saved: back to the first open question.
      const first = PLAN_STEPS.findIndex((f) => errors[f]);
      return (
        <Shell onBack={() => go({ preview: false, step: Math.max(0, first) })} onClose={leave} title={t('myPlan.preview.title')}>
          <p className="text-[15px] text-destructive" role="alert">
            {t('myPlan.errors.incomplete')}
          </p>
        </Shell>
      );
    }
    const changes = edit && saved ? changedFields(planAnswers(saved), planAnswers(plan)) : [];
    const save = () => {
      if (saving) return;
      setSaving(true);
      // Generated once, outside the state update, so the saved plan is exactly this one.
      const final = generateMyPlan(planAnswers(plan), new Date(), saved);
      updateProfile((p) => applyMyPlan(p, final));
      clearDraft(uid);
      toast.success(edit ? t('myPlan.updated') : t('myPlan.saved'));
      router.replace('/ielts/plan');
    };
    return (
      <Shell
        onBack={() => go({ preview: false, step: PLAN_STEPS.length - 1 })}
        onClose={leave}
        title={t('myPlan.preview.title')}
        footer={
          <>
            <Button size="lg" className="w-full" onClick={save} disabled={saving || (edit && changes.length === 0)} data-testid="plan-save">
              {saving ? t('myPlan.preview.saving') : edit ? t('myPlan.preview.apply') : t('myPlan.preview.save')}
            </Button>
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => go({ preview: false, review: false, step: 0 })} data-testid="plan-edit-answers">
              {t('myPlan.preview.edit')}
            </Button>
          </>
        }
      >
        <p className="flex items-center gap-2 text-[15px] font-medium text-success" data-testid="plan-ready">
          <Check className="size-4 shrink-0" aria-hidden /> {t('myPlan.preview.ready')}
        </p>
        {edit && (
          <div className="space-y-2 rounded-2xl border border-brand/20 bg-brand-soft/50 px-4 py-3" data-testid="plan-changes">
            <p className="text-sm font-semibold">{t('myPlan.preview.changes')}</p>
            {changes.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t('myPlan.preview.noChanges')}</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {changes.map((f) => (
                  <li key={f} data-changed={f}>
                    <span className="text-muted-foreground">{t(`myPlan.fields.${f}`)}:</span> <span className="line-through opacity-60">{text.value(f, planAnswers(saved!))}</span> → <span className="font-medium">{text.value(f, plan)}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="text-xs text-muted-foreground">{t('myPlan.preview.keep')}</p>
          </div>
        )}
        <PlanSummary answers={plan} onChange={(f) => go({ preview: false, review: true, step: PLAN_STEPS.indexOf(f) })} />
        <PlanOverview plan={plan} />
      </Shell>
    );
  }

  // ---------------------------------------------------------------- questions
  const isLast = step === PLAN_STEPS.length - 1;
  const common = {
    step: step + 1,
    totalSteps: PLAN_STEPS.length,
    onBack: step > 0 ? () => go({ step: step - 1 }) : undefined,
    onClose: leave,
    primaryLabel: isLast || draft.review ? t('myPlan.seePlan') : t('myPlan.next'),
    primaryDisabled: Boolean(errors[field]),
    onPrimary: () => go(isLast || draft.review ? { preview: true, review: false } : { step: step + 1 }),
  };

  switch (field) {
    case 'targetDate': {
      const today = localDateKey();
      const min = localDateKey(new Date(Date.now() + 86_400_000));
      const max = localDateKey(new Date(Date.now() + PLAN_MAX_DAYS_AHEAD * 86_400_000));
      const error = answers.targetDate ? errors.targetDate : undefined;
      return (
        <StepFlow {...common} title={t('myPlan.q.date.title')} description={t('myPlan.q.date.desc')}>
          <div className="space-y-2">
            <input
              type="date"
              min={min}
              max={max}
              value={answers.targetDate ?? ''}
              onChange={(e) => set({ targetDate: e.target.value })}
              aria-label={t('myPlan.q.date.title')}
              aria-invalid={Boolean(error)}
              className={cn('h-14 w-full rounded-xl border bg-card px-4 text-[17px]', error && 'border-destructive')}
              data-testid="plan-date"
              data-today={today}
            />
            {error && (
              <p className="text-sm text-destructive" role="alert" data-testid="plan-error">
                {t(`myPlan.errors.${error}`)}
              </p>
            )}
            {answers.targetDate && !error && <p className="text-sm text-muted-foreground">{text.date(answers.targetDate)}</p>}
          </div>
        </StepFlow>
      );
    }
    case 'targetBand':
      return (
        <StepFlow {...common} title={t('myPlan.q.band.title')}>
          <ChoiceGrid label={t('myPlan.q.band.title')} columns={3} value={answers.targetBand} onChange={(v) => set({ targetBand: v })} options={PLAN_BANDS.map((b) => ({ value: b, label: formatBand(b) }))} />
        </StepFlow>
      );
    case 'currentLevel': {
      const hint = suggestedLevel(profile!);
      return (
        <StepFlow {...common} title={t('myPlan.q.level.title')} description={hint ? t('myPlan.q.level.hint', { level: t(`myPlan.levels.${hint}`) }) : undefined}>
          <ChoiceGrid
            label={t('myPlan.q.level.title')}
            columns={1}
            value={answers.currentLevel}
            onChange={(v) => set({ currentLevel: v })}
            options={PLAN_LEVELS.map((l) => ({ value: l, label: t(`myPlan.levels.${l}`), description: t(`myPlan.levelDesc.${l}`) }))}
          />
        </StepFlow>
      );
    }
    case 'dailyStudyMinutes':
      return (
        <StepFlow {...common} title={t('myPlan.q.minutes.title')}>
          <ChoiceGrid label={t('myPlan.q.minutes.title')} columns={2} value={answers.dailyStudyMinutes} onChange={(v) => set({ dailyStudyMinutes: v })} options={PLAN_DAILY_MINUTES.map((m) => ({ value: m, label: text.duration(m) }))} />
        </StepFlow>
      );
    case 'studyDaysPerWeek':
      return (
        <StepFlow {...common} title={t('myPlan.q.days.title')}>
          <ChoiceGrid label={t('myPlan.q.days.title')} columns={3} value={answers.studyDaysPerWeek} onChange={(v) => set({ studyDaysPerWeek: v })} options={PLAN_DAYS_PER_WEEK.map((d) => ({ value: d, label: t('myPlan.daysN', { n: n(d) }) }))} />
        </StepFlow>
      );
    case 'weakSkills': {
      const chosen = answers.weakSkills;
      const toggle = (s: (typeof IELTS_SKILLS)[number]) => {
        const cur = chosen ?? [];
        setDraft((d) => ({ ...d, balanced: false, answers: { ...d.answers, weakSkills: cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s] } }));
      };
      const balanced = Boolean(draft.balanced) && chosen?.length === 0;
      // "Not answered yet" is different from "all about the same" (both store no weak skills).
      const unanswered = !chosen || (chosen.length === 0 && !balanced);
      return (
        <StepFlow {...common} primaryDisabled={unanswered} title={t('myPlan.q.skills.title')} description={t('myPlan.q.skills.desc')}>
          <div className="grid grid-cols-2 gap-2.5" role="group" aria-label={t('myPlan.q.skills.title')}>
            {IELTS_SKILLS.map((s) => (
              <Toggle key={s} selected={Boolean(chosen?.includes(s))} onClick={() => toggle(s)} label={t(`skills.${s}`)} testId={`skill-${s}`} />
            ))}
            <div className="col-span-2">
              <Toggle selected={balanced} onClick={() => setDraft((d) => ({ ...d, balanced: true, answers: { ...d.answers, weakSkills: [] } }))} label={t('myPlan.q.skills.balanced')} testId="skill-balanced" />
            </div>
          </div>
        </StepFlow>
      );
    }
    case 'studyPreference':
      return (
        <StepFlow {...common} title={t('myPlan.q.preference.title')}>
          <ChoiceGrid label={t('myPlan.q.preference.title')} columns={1} value={answers.studyPreference} onChange={(v) => set({ studyPreference: v })} options={PLAN_PREFERENCES.map((p) => ({ value: p, label: t(`myPlan.prefs.${p}`) }))} />
        </StepFlow>
      );
  }
}

function Toggle({ selected, onClick, label, testId }: { selected: boolean; onClick: () => void; label: string; testId: string }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      data-testid={testId}
      className={cn(
        'relative flex min-h-14 w-full items-center rounded-xl border bg-card px-4 py-3 text-left font-medium transition-all',
        'focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none',
        selected ? 'border-brand ring-1 ring-brand' : 'hover:border-foreground/20',
      )}
    >
      {label}
      {selected && <Check className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-brand" aria-hidden />}
    </button>
  );
}

/** Full-screen layout for the preview, matching StepFlow. */
function Shell({ title, onBack, onClose, footer, children }: { title: string; onBack: () => void; onClose: () => void; footer?: React.ReactNode; children: React.ReactNode }) {
  const { t } = useLocale();
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4" data-testid="plan-preview">
      <div className="flex h-14 items-center justify-between gap-2">
        <Button variant="ghost" size="icon" onClick={onBack} aria-label={t('common.previousStep')}>
          <ChevronLeft />
        </Button>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label={t('common.close')}>
          <X />
        </Button>
      </div>
      <div className="flex-1 space-y-5 pt-2 pb-8">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {children}
      </div>
      {footer && <div className="sticky bottom-0 -mx-4 space-y-2 border-t bg-background/95 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur">{footer}</div>}
    </div>
  );
}
