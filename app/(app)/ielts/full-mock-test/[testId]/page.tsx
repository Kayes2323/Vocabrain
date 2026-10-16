'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { BadgeCheck, BookText, Headphones, Mic, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, PageHeader, ProgressBar, RowGroup, ListRow, Section, ScreenSkeleton, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useTestSessions } from '@/components/test/useTestSessions';
import { getTest, testSkills } from '@/lib/ielts/content';
import type { IELTSSkillId, TestSession } from '@/lib/ielts';

const SKILL_ICON = { listening: Headphones, reading: BookText, writing: PenLine, speaking: Mic } as const;
const SKILL_ORDER: IELTSSkillId[] = ['listening', 'reading', 'writing', 'speaking'];

type Status = 'not-started' | 'in-progress' | 'done';

function latestFor(sessions: TestSession[], testId: string, skill: IELTSSkillId) {
  const mine = sessions.filter((s) => s.testId === testId && s.skill === skill);
  return { active: mine.find((s) => s.status === 'in-progress'), last: mine.find((s) => s.status === 'submitted') };
}

export default function FullMockOverviewPage() {
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

  const rows = SKILL_ORDER.map((skill) => {
    const { active, last } = latestFor(sessions, testId, skill);
    const status: Status = last ? 'done' : active ? 'in-progress' : 'not-started';
    const score = last?.result ? `${last.result.correct}/${last.result.total}` : undefined;
    return { skill, status, score };
  });
  const doneCount = rows.filter((r) => r.status === 'done').length;
  const allDone = doneCount === 4;

  return (
    <div className="space-y-8">
      <PageHeader title={test.title} subtitle={t('fullMock.stepsSubtitle')} backHref="/ielts/full-mock-test" backLabel={t('fullMock.libraryTitle')} />

      <ProgressBar value={(doneCount / 4) * 100} label={t('fullMock.progress', { done: doneCount })} tone={allDone ? 'brand' : 'neutral'} />

      <Section title={t('ielts.groups.test')} variant="label">
        <RowGroup>
          {rows.map(({ skill, status, score }) => (
            <ListRow
              key={skill}
              href={`/ielts/tests/${testId}/${skill}`}
              icon={SKILL_ICON[skill]}
              iconTone={status === 'done' ? 'success' : 'brand'}
              title={t(`skills.${skill}`)}
              description={status === 'in-progress' ? t('fullMock.status.inProgress') : status === 'done' ? t('fullMock.status.done') : t('fullMock.status.notStarted')}
              trailing={
                <StatusChip tone={status === 'done' ? 'success' : status === 'in-progress' ? 'warning' : 'neutral'}>
                  {score ?? t(`fullMock.status.${status === 'not-started' ? 'notStarted' : status === 'in-progress' ? 'inProgress' : 'done'}`)}
                </StatusChip>
              }
            />
          ))}
        </RowGroup>
      </Section>

      {allDone ? (
        <div className="space-y-3">
          <Callout tone="brand" icon={BadgeCheck}>
            {t('fullMock.allDoneNote')}
          </Callout>
          <Button asChild variant="brand" className="w-full sm:w-auto">
            <a href={`/ielts/full-mock-test/${testId}/result`}>{t('fullMock.viewResult')}</a>
          </Button>
        </div>
      ) : (
        <Callout>{t('tests.notOfficial')}</Callout>
      )}
    </div>
  );
}
