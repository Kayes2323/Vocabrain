'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { BookText, ChevronRight, Headphones, Mic, PenLine, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, PageHeader, Panel, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useTestSessions } from '@/components/test/useTestSessions';
import { getTest, testSkills } from '@/lib/ielts/content';
import type { IELTSSkillId, TestSession } from '@/lib/ielts';
import { formatBand, overallBand } from '@/lib/engine';
import type { SkillBands } from '@/lib/models';

const SKILL_ICON = { listening: Headphones, reading: BookText, writing: PenLine, speaking: Mic } as const;
const SKILL_ORDER: IELTSSkillId[] = ['listening', 'reading', 'writing', 'speaking'];

function latestSubmitted(sessions: TestSession[], testId: string, skill: IELTSSkillId) {
  return sessions.find((s) => s.testId === testId && s.skill === skill && s.status === 'submitted');
}

function bandFor(session: TestSession | undefined): number | undefined {
  if (!session) return undefined;
  if (session.result?.estimatedBand !== undefined) return session.result.estimatedBand;
  if (session.feedback?.overall != null) return session.feedback.overall;
  return undefined;
}

export default function FullMockResultPage() {
  const { testId } = useParams<{ testId: string }>();
  const { t } = useLocale();
  const { repository, userId } = useTestSessions();
  const [sessions, setSessions] = useState<TestSession[] | null>(null);

  const test = getTest(testId);

  useEffect(() => {
    repository.list(userId).then(setSessions, (e) => console.error('[full-mock-test] History failed', e));
  }, [repository, userId]);

  if (!test || testSkills(test).length !== 4) notFound();
  if (sessions === null) return <ScreenSkeleton />;

  const perSkill = SKILL_ORDER.map((skill) => {
    const session = latestSubmitted(sessions, testId, skill);
    return { skill, session, band: bandFor(session) };
  });
  const bands: SkillBands = Object.fromEntries(perSkill.filter((p) => p.band !== undefined).map((p) => [p.skill, p.band])) as SkillBands;
  const overall = overallBand(bands);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 px-4 py-6 md:py-10">
      <PageHeader title={test.title} subtitle={t('fullMock.libraryTitle')} backHref={`/ielts/full-mock-test/${testId}`} backLabel={test.title} />

      <div className="space-y-4 rounded-2xl border-2 p-6 text-center">
        <StatusChip tone="danger" className="mx-auto">
          {t('fullMock.resultBadge')}
        </StatusChip>
        <div>
          <p className="text-sm text-muted-foreground">{t('fullMock.overallBand')}</p>
          <p className="text-5xl font-bold tabular-nums">{overall !== undefined ? formatBand(overall) : '—'}</p>
          {overall === undefined && <p className="mt-1 text-sm text-muted-foreground">{t('fullMock.overallPending')}</p>}
        </div>
      </div>

      <Button asChild variant="brand" className="w-full sm:w-auto">
        <Link href={`/mino?${new URLSearchParams({ ask: 'full-mock-result', test: test.title })}`}>
          <Sparkles /> {t('fullMock.askMino')}
        </Link>
      </Button>

      <Section title={t('fullMock.perSkill')}>
        <Panel className="divide-y p-0">
          {perSkill.map(({ skill, session, band }) => {
            const Icon = SKILL_ICON[skill];
            return (
              <Link
                key={skill}
                href={`/ielts/tests/${testId}/${skill}`}
                className="flex items-center gap-3 px-4 py-3.5 text-sm transition-colors hover:bg-muted/60"
              >
                <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <span className="min-w-0 flex-1 font-medium">{t(`skills.${skill}`)}</span>
                {session ? (
                  <>
                    <StatusChip tone="success">{band !== undefined ? formatBand(band) : '—'}</StatusChip>
                    <span className="text-xs text-muted-foreground">{t('fullMock.seeDetail')}</span>
                  </>
                ) : (
                  <StatusChip tone="neutral">{t('fullMock.pendingSkill')}</StatusChip>
                )}
                <ChevronRight className="size-4 shrink-0 text-muted-foreground/70" aria-hidden />
              </Link>
            );
          })}
        </Panel>
      </Section>

      <Callout tone="warning">{t('fullMock.disclaimer')}</Callout>
    </div>
  );
}
