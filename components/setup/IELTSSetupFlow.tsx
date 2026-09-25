'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChoiceGrid, ScreenSkeleton, StepFlow } from '@/components/ds';
import { useLeave } from '@/components/setup/useLeave';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { IELTS_SKILLS, IELTS_SKILL_BANDS, IELTS_TARGET_BANDS, WEEKLY_STUDY_HOUR_OPTIONS } from '@/lib/constants';
import { formatBand, localDateKey } from '@/lib/engine';
import type { IELTSProfile } from '@/lib/models';
import { useStep } from './useStep';

const STEPS = ['target', 'date', 'skills', 'time'] as const;
const NOT_SURE = 'unknown';

export function IELTSSetupFlow() {
  const router = useRouter();
  const leave = useLeave('/');
  const params = useSearchParams();
  const { t } = useLocale();
  const { profile, updateProfile } = useProfile();
  const flow = useStep(STEPS, params.get('step'));
  const [draft, setDraft] = useState<IELTSProfile | null>(null);

  if (!profile) return <ScreenSkeleton />;
  const ielts = draft ?? profile.ielts;
  const set = (patch: Partial<IELTSProfile>) => setDraft({ ...ielts, ...patch });

  const save = (patch: Partial<IELTSProfile> = {}) => {
    updateProfile((p) => ({
      ...p,
      ielts: { ...ielts, ...patch, targetUnsure: false, startedAt: ielts.startedAt ?? new Date().toISOString() },
    }));
    leave();
  };
  const advance = () => (flow.isLast ? save() : flow.next());
  const primaryLabel = flow.isLast ? t('setup.ielts.saveAnswer') : t('common.continue');

  const common = {
    step: flow.number,
    totalSteps: flow.total,
    onBack: flow.back,
    onClose: () => leave(),
  };

  switch (flow.step) {
    case 'target':
      return (
        <StepFlow
          {...common}
          title={t('onboarding.target.title')}
          description={t('onboarding.target.description')}
          primaryLabel={primaryLabel}
          primaryDisabled={ielts.targetBand === undefined}
          onPrimary={advance}
        >
          <ChoiceGrid
            label={t('onboarding.target.title')}
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
          title={t('setup.ielts.dateTitle')}
          description={t('setup.ielts.dateDescription')}
          primaryLabel={primaryLabel}
          primaryDisabled={!ielts.testDate}
          onPrimary={advance}
          secondaryLabel={t('setup.ielts.notBooked')}
          onSecondary={() => {
            const patch = { testDate: undefined, testDateUnknown: true };
            if (flow.isLast) save(patch);
            else {
              set(patch);
              flow.next();
            }
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="test-date">{t('setup.ielts.dateLabel')}</Label>
            <Input
              id="test-date"
              type="date"
              min={localDateKey()}
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
          title={t('setup.ielts.skillsTitle')}
          description={t('setup.ielts.skillsDescription')}
          primaryLabel={primaryLabel}
          onPrimary={advance}
          secondaryLabel={flow.isLast ? undefined : t('common.skip')}
          onSecondary={flow.next}
        >
          <div className="space-y-3">
            {IELTS_SKILLS.map((skill) => (
              <div key={skill} className="flex items-center justify-between gap-4 rounded-xl border bg-card px-4 py-3">
                <Label htmlFor={`band-${skill}`} className="text-[15px]">
                  {t(`skills.${skill}`)}
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
                    <SelectItem value={NOT_SURE}>{t('common.notSure')}</SelectItem>
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
          title={t('onboarding.time.title')}
          description={t('onboarding.time.description')}
          primaryLabel={flow.isLast && flow.total > 1 ? t('setup.ielts.buildPlan') : primaryLabel}
          primaryDisabled={!ielts.weeklyStudyHours}
          onPrimary={advance}
        >
          <ChoiceGrid
            label={t('onboarding.time.title')}
            columns={1}
            value={ielts.weeklyStudyHours}
            onChange={(weeklyStudyHours) => set({ weeklyStudyHours })}
            options={WEEKLY_STUDY_HOUR_OPTIONS.map((h, i) => ({
              value: h,
              label: t(i === WEEKLY_STUDY_HOUR_OPTIONS.length - 1 ? 'onboarding.time.optionPlus' : 'onboarding.time.option', { n: h }),
              description: t('onboarding.time.perDay', { n: Math.round((h * 60) / 6) }),
            }))}
          />
        </StepFlow>
      );
  }
}
