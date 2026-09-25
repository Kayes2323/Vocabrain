'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChoiceGrid, ScreenSkeleton, StepFlow } from '@/components/ds';
import { MinoSays } from '@/components/mino/MinoSays';
import { MinoMark } from '@/components/shell/MinoMark';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useSetLanguage } from '@/components/providers/useSetLanguage';
import { WEEKLY_STUDY_HOUR_OPTIONS } from '@/lib/constants';
import { getTranslator } from '@/lib/i18n';
import { formatBand } from '@/lib/engine';
import type { StudentGoal } from '@/lib/models';

const TARGET_OPTIONS = [5.5, 6, 6.5, 7, 7.5, 8] as const;
const PREVIOUS_OPTIONS = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5] as const;
const NOT_SURE = -1;

type Step = 'language' | 'goal' | 'target' | 'taken' | 'previous' | 'time' | 'done';

interface Draft {
  goal?: StudentGoal;
  target?: number; // NOT_SURE when the student isn't sure
  takenBefore?: boolean;
  previous?: number; // NOT_SURE when they don't remember
  hours?: number;
}

/**
 * Mino-guided first-run: one question per screen. The language choice applies
 * immediately so every following question is in the student's language.
 */
export function OnboardingFlow() {
  const router = useRouter();
  const { t, locale } = useLocale();
  const setLanguage = useSetLanguage();
  const { profile, updateProfile } = useProfile();
  const [draft, setDraft] = useState<Draft>({});
  const [history, setHistory] = useState<Step[]>(['language']);

  if (!profile) return <ScreenSkeleton />;

  const step = history[history.length - 1];
  const steps: Step[] = ['language', 'goal', 'target', 'taken', ...(draft.takenBefore ? (['previous'] as Step[]) : []), 'time'];
  const number = Math.min(steps.indexOf(step) + 1, steps.length);
  const go = (next: Step) => setHistory((h) => [...h, next]);
  const back = history.length > 1 ? () => setHistory((h) => h.slice(0, -1)) : undefined;
  const set = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  const finish = (destination: string) => {
    const now = new Date().toISOString();
    updateProfile((p) => ({
      ...p,
      language: locale,
      goal: draft.goal,
      onboardedAt: now,
      ielts: {
        ...p.ielts,
        targetBand: draft.target === NOT_SURE ? undefined : draft.target,
        targetUnsure: draft.target === NOT_SURE,
        takenBefore: draft.takenBefore,
        previousOverall: draft.previous === NOT_SURE ? undefined : draft.previous,
        weeklyStudyHours: draft.hours,
        startedAt: p.ielts.startedAt ?? now,
      },
    }));
    router.replace(destination);
  };

  const common = {
    step: number,
    totalSteps: steps.length,
    onBack: back,
    onClose: () => finish('/'),
  };

  if (step === 'done') {
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center gap-8 px-4 py-10">
        <div className="space-y-4">
          <MinoMark size="lg" />
          <h1 className="text-2xl font-semibold tracking-tight">{t('onboarding.done.title')}</h1>
          <p className="text-[15px] text-muted-foreground">{t('onboarding.done.body')}</p>
        </div>
        <div className="space-y-2">
          <Button size="lg" className="w-full" onClick={() => finish('/ielts/diagnostic')}>
            <Sparkles /> {t('onboarding.done.cta')}
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => finish('/')}>
            {t('onboarding.done.later')}
          </Button>
        </div>
      </div>
    );
  }

  switch (step) {
    case 'language':
      return (
        <StepFlow
          {...common}
          intro={
            // The language isn't chosen yet, so Mino greets in both.
            <MinoSays>
              {getTranslator('bn').t('onboarding.minoHello')}
              <br />
              {getTranslator('en').t('onboarding.minoHello')}
            </MinoSays>
          }
          title="ভাষা বেছে নাও · Choose your language"
          description={t('onboarding.language.description')}
          primaryLabel={t('common.continue')}
          onPrimary={() => go('goal')}
        >
          <ChoiceGrid
            label="Language"
            columns={1}
            value={locale}
            onChange={setLanguage}
            options={[
              { value: 'bn', label: 'বাংলা' },
              { value: 'en', label: 'English' },
            ]}
          />
        </StepFlow>
      );

    case 'goal':
      return (
        <StepFlow
          {...common}
          title={t('onboarding.goal.title')}
          primaryLabel={t('common.continue')}
          primaryDisabled={!draft.goal}
          onPrimary={() => go('target')}
        >
          <div className="space-y-4">
            <ChoiceGrid
              label={t('onboarding.goal.title')}
              columns={1}
              value={draft.goal}
              onChange={(goal) => set({ goal })}
              options={(['ielts', 'abroad', 'english', 'unsure'] as const).map((g) => ({
                value: g,
                label: t(`onboarding.goal.options.${g}`),
              }))}
            />
            {draft.goal && draft.goal !== 'ielts' && <MinoSays>{t('onboarding.goal.ieltsFirst')}</MinoSays>}
          </div>
        </StepFlow>
      );

    case 'target':
      return (
        <StepFlow
          {...common}
          title={t('onboarding.target.title')}
          description={t('onboarding.target.description')}
          primaryLabel={t('common.continue')}
          primaryDisabled={draft.target === undefined}
          onPrimary={() => go('taken')}
        >
          <ChoiceGrid
            label={t('onboarding.target.title')}
            columns={3}
            value={draft.target}
            onChange={(target) => set({ target })}
            options={[
              ...TARGET_OPTIONS.map((b) => ({ value: b as number, label: formatBand(b) })),
              { value: NOT_SURE, label: t('common.notSure') },
            ]}
          />
        </StepFlow>
      );

    case 'taken':
      return (
        <StepFlow
          {...common}
          title={t('onboarding.taken.title')}
          primaryLabel={t('common.continue')}
          primaryDisabled={draft.takenBefore === undefined}
          onPrimary={() => go(draft.takenBefore ? 'previous' : 'time')}
        >
          <ChoiceGrid
            label={t('onboarding.taken.title')}
            columns={2}
            value={draft.takenBefore === undefined ? undefined : draft.takenBefore ? 'yes' : 'no'}
            onChange={(v) => set({ takenBefore: v === 'yes' })}
            options={[
              { value: 'yes', label: t('common.yes') },
              { value: 'no', label: t('common.no') },
            ]}
          />
        </StepFlow>
      );

    case 'previous':
      return (
        <StepFlow
          {...common}
          title={t('onboarding.previous.title')}
          primaryLabel={t('common.continue')}
          primaryDisabled={draft.previous === undefined}
          onPrimary={() => go('time')}
        >
          <ChoiceGrid
            label={t('onboarding.previous.title')}
            columns={3}
            value={draft.previous}
            onChange={(previous) => set({ previous })}
            options={[
              ...PREVIOUS_OPTIONS.map((b) => ({ value: b as number, label: formatBand(b) })),
              { value: NOT_SURE, label: t('onboarding.previous.dontRemember') },
            ]}
          />
        </StepFlow>
      );

    case 'time':
      return (
        <StepFlow
          {...common}
          intro={draft.takenBefore === false ? <MinoSays>{t('onboarding.newcomer')}</MinoSays> : undefined}
          title={t('onboarding.time.title')}
          description={t('onboarding.time.description')}
          primaryLabel={t('common.continue')}
          primaryDisabled={!draft.hours}
          onPrimary={() => go('done')}
        >
          <ChoiceGrid
            label={t('onboarding.time.title')}
            columns={1}
            value={draft.hours}
            onChange={(hours) => set({ hours })}
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
