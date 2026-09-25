'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChoiceGrid, IconBadge, ScreenSkeleton, StepFlow } from '@/components/ds';
import { MinoSays } from '@/components/mino/MinoSays';
import { useLeave } from '@/components/setup/useLeave';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { IELTS_SKILLS } from '@/lib/constants';
import {
  DIAGNOSTIC_ANSWER_LEVELS,
  DIAGNOSTIC_STATEMENTS_PER_SKILL,
  buildDiagnosticResult,
  statementKey,
  type DiagnosticAnswer,
  type DiagnosticAnswers,
} from '@/lib/engine';
import { DiagnosticResultView } from './DiagnosticResultView';

const QUESTIONS = IELTS_SKILLS.flatMap((skill) =>
  Array.from({ length: DIAGNOSTIC_STATEMENTS_PER_SKILL }, (_, i) => ({ skill, index: i })),
);

type Phase = 'intro' | 'questions' | 'result';

export function DiagnosticFlow() {
  const router = useRouter();
  const leave = useLeave('/');
  const { t, list } = useLocale();
  const { profile, updateProfile } = useProfile();
  const [phase, setPhase] = useState<Phase | null>(null);
  const [position, setPosition] = useState(0);
  const [answers, setAnswers] = useState<(DiagnosticAnswer | undefined)[]>(() => QUESTIONS.map(() => undefined));

  if (!profile) return <ScreenSkeleton />;
  const current = phase ?? (profile.ielts.diagnostic ? 'result' : 'intro');
  const answerLabels = list('diagnostic.answers');

  if (current === 'result') {
    return (
      <DiagnosticResultView
        ielts={profile.ielts}
        onContinue={() => router.push('/')}
        onRetake={() => {
          setAnswers(QUESTIONS.map(() => undefined));
          setPosition(0);
          setPhase('intro');
        }}
      />
    );
  }

  if (current === 'intro') {
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center gap-8 px-4 py-10">
        <div className="space-y-5">
          <IconBadge icon={Compass} tone="brand" size="lg" />
          <h1 className="text-2xl font-semibold tracking-tight text-balance">{t('diagnostic.title')}</h1>
          <MinoSays>{t('diagnostic.body')}</MinoSays>
          <p className="text-[15px] text-muted-foreground">{t('diagnostic.how')}</p>
        </div>
        <div className="space-y-2">
          <Button size="lg" className="w-full" onClick={() => setPhase('questions')}>
            {t('diagnostic.start')}
          </Button>
          <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => leave()}>
            {t('common.back')}
          </Button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[position];
  const isLast = position === QUESTIONS.length - 1;

  const submit = () => {
    const bySkill = Object.fromEntries(
      IELTS_SKILLS.map((skill) => [
        skill,
        QUESTIONS.map((qq, i) => (qq.skill === skill ? answers[i] ?? 0 : undefined)).filter(
          (a): a is DiagnosticAnswer => a !== undefined,
        ),
      ]),
    ) as DiagnosticAnswers;
    const diagnostic = buildDiagnosticResult(bySkill);
    updateProfile((p) => ({
      ...p,
      ielts: { ...p.ielts, diagnostic, currentBands: { ...diagnostic.bands } },
    }));
    setPhase('result');
  };

  return (
    <StepFlow
      step={position + 1}
      totalSteps={QUESTIONS.length}
      onBack={position > 0 ? () => setPosition(position - 1) : () => setPhase('intro')}
      onClose={() => leave()}
      title={t(statementKey(q.skill, q.index))}
      description={t('diagnostic.question')}
      intro={
        <p className="text-sm font-semibold text-muted-foreground">
          {t('diagnostic.progress', { skill: t(`skills.${q.skill}`), n: q.index + 1, total: DIAGNOSTIC_STATEMENTS_PER_SKILL })}
        </p>
      }
      primaryLabel={t('common.continue')}
      primaryDisabled={answers[position] === undefined}
      onPrimary={() => (isLast ? submit() : setPosition(position + 1))}
    >
      <ChoiceGrid
        label={t('diagnostic.question')}
        columns={1}
        value={answers[position]}
        onChange={(a) => {
          setAnswers((prev) => prev.map((v, i) => (i === position ? a : v)));
        }}
        options={DIAGNOSTIC_ANSWER_LEVELS.map((level) => ({ value: level, label: answerLabels[level] }))}
      />
    </StepFlow>
  );
}
