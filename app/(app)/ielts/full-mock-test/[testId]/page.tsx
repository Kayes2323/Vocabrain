'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { BadgeCheck, BookText, Headphones, Mic, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, PageHeader, ProgressBar, RowGroup, ListRow, Section, ScreenSkeleton, StatusChip } from '@/components/ds';
import { FULL_MOCK_ORDER, fullMockHref } from '@/components/test/useFullMock';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useTestSessions } from '@/components/test/useTestSessions';
import { getTest, testSkills } from '@/lib/ielts/content';
import { isPractice, questionSlots, type IELTSSkillId, type ObjectiveSection, type TestSession } from '@/lib/ielts';

const SKILL_ICON = { listening: Headphones, reading: BookText, writing: PenLine, speaking: Mic } as const;
const SKILL_ORDER = FULL_MOCK_ORDER;
/** The speaking test runs 11–14 minutes; planning uses the upper end. */
const SPEAKING_MINUTES = 14;

type Status = 'not-started' | 'in-progress' | 'done';

function latestFor(sessions: TestSession[], testId: string, skill: IELTSSkillId) {
  // A section done one part at a time (practice mode) still counts as done here,
  // just honestly marked as practice rather than full exam conditions.
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
    return { skill, status, score, practice: last ? isPractice(last) : false };
  });
  const meta = (skill: IELTSSkillId) => {
    const sec = test.sections[skill]!;
    if (sec.skill === 'writing') return t('tests.rowMetaWriting', { n: sec.tasks.length, minutes: sec.timeLimitMinutes });
    if (sec.skill === 'speaking') return t('tests.rowMetaSpeaking', { n: sec.parts.length });
    return t('tests.rowMeta', { n: questionSlots(sec as ObjectiveSection).length, minutes: sec.timeLimitMinutes });
  };
  const totalMinutes = SKILL_ORDER.reduce((sum, skill) => {
    const sec = test.sections[skill]!;
    return sum + (sec.skill === 'speaking' ? SPEAKING_MINUTES : sec.timeLimitMinutes);
  }, 0);
  const doneCount = rows.filter((r) => r.status === 'done').length;
  const allDone = doneCount === 4;
  const next = rows.find((r) => r.status !== 'done');

  return (
    <div className="space-y-8">
      <PageHeader title={test.title} subtitle={t('fullMock.stepsSubtitle')} backHref="/ielts/full-mock-test" backLabel={t('fullMock.libraryTitle')} />

      <ProgressBar value={(doneCount / 4) * 100} label={t('fullMock.progress', { done: doneCount })} tone={allDone ? 'brand' : 'neutral'} />

      {next && (
        <div className="space-y-2">
          <Button asChild variant="brand" size="lg" className="w-full sm:w-auto">
            <a href={fullMockHref(testId, next.skill)}>
              {t(doneCount === 0 && next.status === 'not-started' ? 'fullMock.startWith' : 'fullMock.continueWith', { skill: t(`skills.${next.skill}`) })}
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">{t('fullMock.totalTime', { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 })}</p>
        </div>
      )}

      <Section title={t('ielts.groups.test')} variant="label">
        <RowGroup>
          {rows.map(({ skill, status, score, practice }, i) => (
            <ListRow
              key={skill}
              href={fullMockHref(testId, skill)}
              icon={SKILL_ICON[skill]}
              iconTone={status === 'done' ? 'success' : 'brand'}
              title={`${i + 1}. ${t(`skills.${skill}`)}`}
              description={meta(skill)}
              trailing={
                <div className="flex items-center gap-1.5">
                  {status === 'done' && practice && <StatusChip tone="warning">{t('tests.practice.badge')}</StatusChip>}
                  <StatusChip tone={status === 'done' ? 'success' : status === 'in-progress' ? 'warning' : 'neutral'}>
                    {score ?? t(`fullMock.status.${status === 'not-started' ? 'notStarted' : status === 'in-progress' ? 'inProgress' : 'done'}`)}
                  </StatusChip>
                </div>
              }
            />
          ))}
        </RowGroup>
      </Section>

      <Section title={t('fullMock.rulesTitle')} variant="label">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {SKILL_ORDER.map((skill) => (
            <li key={skill} className="flex gap-2">
              {(() => {
                const Icon = SKILL_ICON[skill];
                return <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />;
              })()}
              {t(`fullMock.rule.${skill}`)}
            </li>
          ))}
        </ul>
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
