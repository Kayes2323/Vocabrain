'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChoiceGrid, ScreenSkeleton, StepFlow } from '@/components/ds';
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
    onClose: () => router.back(),
  };

  const thisYear = new Date().getFullYear();
  const years = [0, 1, 2, 3].map((n) => thisYear + n);
  const intake = abroad.targetIntake;

  switch (flow.step) {
    case 'degree':
      return (
        <StepFlow
          {...common}
          title="What do you want to study abroad?"
          primaryLabel="Continue"
          primaryDisabled={!abroad.degreeLevel}
          onPrimary={advance}
        >
          <ChoiceGrid
            label="Degree level"
            columns={1}
            value={abroad.degreeLevel}
            onChange={(degreeLevel) => set({ degreeLevel })}
            options={DEGREE_LEVELS.map((d) => ({ value: d.id, label: d.label }))}
          />
        </StepFlow>
      );

    case 'subject':
      return (
        <StepFlow
          {...common}
          title="Which subject?"
          description="A broad area is fine. You can refine it later."
          primaryLabel="Continue"
          primaryDisabled={!abroad.subject?.trim()}
          onPrimary={advance}
          secondaryLabel="I'm not sure yet"
          onSecondary={flow.next}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                className="h-12 text-base"
                placeholder="e.g. Computer Science"
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
          title="When do you want to start?"
          description="Intakes differ by university and course. This helps us find the right deadlines later."
          primaryLabel="Save my goal"
          primaryDisabled={!intake?.month || !intake?.year}
          onPrimary={advance}
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-sm font-medium">Year</p>
              <ChoiceGrid
                label="Intake year"
                columns={2}
                value={intake?.year}
                onChange={(year) => set({ targetIntake: { month: intake?.month ?? 0, year } })}
                options={years.map((y) => ({ value: y, label: String(y) }))}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Month</p>
              <ChoiceGrid
                label="Intake month"
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
