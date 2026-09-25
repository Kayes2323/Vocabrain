'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChoiceGrid, ScreenSkeleton, StepFlow } from '@/components/ds';
import { useLeave } from '@/components/setup/useLeave';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { DEGREE_LEVELS, MONTHS } from '@/lib/constants';
import type { StudyAbroadProfile } from '@/lib/models';
import { cn } from '@/lib/utils';
import { useStep } from './useStep';

const STEPS = ['degree', 'subject', 'intake'] as const;

const SUBJECT_SUGGESTIONS = [
  'Computer Science',
  'Data Science',
  'Business & Management',
  'Engineering',
  'Public Health',
  'Economics',
  'Law',
  'Education',
];

export function AbroadSetupFlow() {
  const router = useRouter();
  const leave = useLeave('/abroad');
  const { t } = useLocale();
  const { profile, updateProfile } = useProfile();
  const flow = useStep(STEPS);
  const [draft, setDraft] = useState<StudyAbroadProfile | null>(null);

  if (!profile) return <ScreenSkeleton />;
  const abroad = draft ?? profile.abroad;
  const set = (patch: Partial<StudyAbroadProfile>) => setDraft({ ...abroad, ...patch });

  const finish = () => {
    updateProfile((p) => ({ ...p, abroad }));
    router.push('/abroad');
  };
  const advance = () => (flow.isLast ? finish() : flow.next());

  const common = {
    step: flow.number,
    totalSteps: flow.total,
    onBack: flow.back,
    onClose: () => leave(),
  };

  const thisYear = new Date().getFullYear();
  const years = [0, 1, 2, 3].map((n) => thisYear + n);
  const intake = abroad.targetIntake;

  switch (flow.step) {
    case 'degree':
      return (
        <StepFlow
          {...common}
          title={t('setup.abroad.degreeTitle')}
          primaryLabel={t('common.continue')}
          primaryDisabled={!abroad.degreeLevel}
          onPrimary={advance}
        >
          <ChoiceGrid
            label={t('setup.abroad.degreeTitle')}
            columns={1}
            value={abroad.degreeLevel}
            onChange={(degreeLevel) => set({ degreeLevel })}
            options={DEGREE_LEVELS.map((d) => ({ value: d.id, label: t(`degree.${d.id}`) }))}
          />
        </StepFlow>
      );

    case 'subject':
      return (
        <StepFlow
          {...common}
          title={t('setup.abroad.subjectTitle')}
          description={t('setup.abroad.subjectDescription')}
          primaryLabel={t('common.continue')}
          primaryDisabled={!abroad.subject?.trim()}
          onPrimary={advance}
          secondaryLabel={t('setup.abroad.notSureYet')}
          onSecondary={flow.next}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">{t('setup.abroad.subjectLabel')}</Label>
              <Input
                id="subject"
                className="h-12 text-base"
                placeholder={t('setup.abroad.subjectPlaceholder')}
                value={abroad.subject ?? ''}
                onChange={(e) => set({ subject: e.target.value })}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {SUBJECT_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set({ subject: s })}
                  className={cn(
                    'rounded-full border px-3.5 py-2 text-sm transition-colors',
                    abroad.subject === s ? 'border-brand bg-brand-soft text-brand' : 'bg-card hover:border-foreground/20',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </StepFlow>
      );

    case 'intake':
      return (
        <StepFlow
          {...common}
          title={t('setup.abroad.intakeTitle')}
          description={t('setup.abroad.intakeDescription')}
          primaryLabel={t('setup.abroad.save')}
          primaryDisabled={!intake?.month || !intake?.year}
          onPrimary={advance}
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm font-medium">{t('setup.abroad.year')}</p>
              <ChoiceGrid
                label={t('setup.abroad.year')}
                columns={2}
                value={intake?.year}
                onChange={(year) => set({ targetIntake: { month: intake?.month ?? 0, year } })}
                options={years.map((y) => ({ value: y, label: String(y) }))}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">{t('setup.abroad.month')}</p>
              <ChoiceGrid
                label={t('setup.abroad.month')}
                columns={3}
                value={intake?.month}
                onChange={(month) => set({ targetIntake: { year: intake?.year ?? 0, month } })}
                options={MONTHS.map((m, i) => ({ value: i + 1, label: m.slice(0, 3) }))}
              />
            </div>
          </div>
        </StepFlow>
      );
  }
}
