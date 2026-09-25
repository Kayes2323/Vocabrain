'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChoiceGrid, ScreenSkeleton, StepFlow } from '@/components/ds';
import { useProfile } from '@/components/providers/ProfileProvider';
import {
  IELTS_SKILLS,
  IELTS_SKILL_BANDS,
  IELTS_SKILL_LABELS,
  IELTS_TARGET_BANDS,
  WEEKLY_STUDY_HOUR_OPTIONS,
} from '@/lib/constants';
import { formatBand } from '@/lib/engine';
import type { IELTSProfile } from '@/lib/models';
import { useStep } from './useStep';

const STEPS = ['target', 'date', 'skills', 'time'] as const;
const NOT_SURE = 'unknown';

function todayISO(): string {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function IELTSSetupFlow() {
  const router = useRouter();
  const params = useSearchParams();
  const { profile, updateProfile } = useProfile();
  const flow = useStep(STEPS, params.get('step'));
  const [draft, setDraft] = useState<IELTSProfile | null>(null);

  if (!profile) return <ScreenSkeleton />;
  const ielts = draft ?? profile.ielts;
  const set = (patch: Partial<IELTSProfile>) => setDraft({ ...ielts, ...patch });

  const finish = () => {
    updateProfile((p) => ({
      ...p,
      ielts: { ...ielts, startedAt: ielts.startedAt ?? new Date().toISOString() },
    }));
    router.push('/');
  };
  const advance = () => (flow.isLast ? finish() : flow.next());
  const close = () => router.back();

  const common = {
    step: flow.number,
    totalSteps: flow.total,
    onBack: flow.back,
    onClose: close,
  };

  switch (flow.step) {
    case 'target':
      return (
        <StepFlow
          {...common}
          title="What overall band are you aiming for?"
          description="Check the requirement for your university or visa. You can change this any time."
          primaryLabel="Continue"
          primaryDisabled={ielts.targetBand === undefined}
          onPrimary={advance}
        >
          <ChoiceGrid
            label="Target band"
            columns={3}
            value={ielts.targetBand}
            onChange={(targetBand) => set({ targetBand })}
            options={IELTS_TARGET_BANDS.map((b) => ({ value: b, label: formatBand(b) }))}
          />
        </StepFlow>
      );

    case 'date':
      return (
        <StepFlow
          {...common}
          title="When is your test?"
          description="We'll pace your plan to finish on time."
          primaryLabel="Continue"
          primaryDisabled={!ielts.testDate}
          onPrimary={advance}
          secondaryLabel="I haven't booked it yet"
          onSecondary={() => {
            set({ testDate: undefined, testDateUnknown: true });
            flow.next();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="test-date">Test date</Label>
            <Input
              id="test-date"
              type="date"
              min={todayISO()}
              className="h-12 text-base"
              value={ielts.testDate?.slice(0, 10) ?? ''}
              onChange={(e) => set({ testDate: e.target.value || undefined, testDateUnknown: false })}
            />
          </div>
        </StepFlow>
      );

    case 'skills':
      return (
        <StepFlow
          {...common}
          title="Where are you now in each skill?"
          description="Use your last test, a mock test or your best guess. This decides where your plan focuses."
          primaryLabel="Continue"
          onPrimary={advance}
          secondaryLabel="Skip for now"
          onSecondary={flow.next}
        >
          <div className="space-y-3">
            {IELTS_SKILLS.map((skill) => (
              <div key={skill} className="flex items-center justify-between gap-4 rounded-xl border bg-card px-4 py-3">
                <Label htmlFor={`band-${skill}`} className="text-[15px]">
                  {IELTS_SKILL_LABELS[skill]}
                </Label>
                <Select
                  value={ielts.currentBands[skill]?.toString() ?? NOT_SURE}
                  onValueChange={(v) => {
                    const currentBands = { ...ielts.currentBands };
                    if (v === NOT_SURE) delete currentBands[skill];
                    else currentBands[skill] = Number(v);
                    set({ currentBands });
                  }}
                >
                  <SelectTrigger id={`band-${skill}`} className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NOT_SURE}>Not sure</SelectItem>
                    {IELTS_SKILL_BANDS.map((b) => (
                      <SelectItem key={b} value={b.toString()}>
                        {formatBand(b)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </StepFlow>
      );

    case 'time':
      return (
        <StepFlow
          {...common}
          title="How many hours a week can you study?"
          description="Be realistic. A plan you can keep beats an ambitious one you can't."
          primaryLabel="Build my plan"
          primaryDisabled={!ielts.weeklyStudyHours}
          onPrimary={advance}
        >
          <ChoiceGrid
            label="Weekly study hours"
            columns={1}
            value={ielts.weeklyStudyHours}
            onChange={(weeklyStudyHours) => set({ weeklyStudyHours })}
            options={WEEKLY_STUDY_HOUR_OPTIONS.map((h, i) => ({
              value: h,
              label: i === WEEKLY_STUDY_HOUR_OPTIONS.length - 1 ? `${h}+ hours` : `${h} hours`,
              description: `About ${Math.round((h * 60) / 6)} minutes a day, 6 days a week`,
            }))}
          />
        </StepFlow>
      );
  }
}
