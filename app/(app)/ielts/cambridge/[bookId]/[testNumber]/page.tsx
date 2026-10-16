'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { BookText, Clock3, Headphones, Lock, Mic, PenLine } from 'lucide-react';
import { Callout, EmptyState, ListRow, PageHeader, RowGroup, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useTestSessions } from '@/components/test/useTestSessions';
import { questionSlots, type IELTSSkillId, type ObjectiveSection, type TestSession } from '@/lib/ielts';
import { testSkills } from '@/lib/ielts/content';
import { getCambridgeBook, getCambridgeTest, launchableTest } from '@/lib/ielts/content/cambridge-catalog';

const SKILL_ICON = { listening: Headphones, reading: BookText, writing: PenLine, speaking: Mic } as const;

export default function CambridgeTestOverviewPage() {
  const { bookId, testNumber } = useParams<{ bookId: string; testNumber: string }>();
  const { t } = useLocale();
  const { repository, userId } = useTestSessions();
  const [sessions, setSessions] = useState<TestSession[]>([]);

  const book = getCambridgeBook(bookId);
  const number = Number(testNumber);
  const meta = book && Number.isInteger(number) ? getCambridgeTest(bookId, number) : undefined;
  const real = meta ? launchableTest(meta) : undefined;

  useEffect(() => {
    if (!real) return;
    repository.list(userId).then(setSessions, (e) => console.error('[cambridge] History failed', e));
  }, [repository, userId, real]);

  if (!book || !meta) notFound();

  if (!real) {
    return (
      <div className="space-y-8">
        <PageHeader title={t('cambridge.testN', { n: meta.number })} subtitle={book.title} backHref={`/ielts/cambridge/${book.id}`} backLabel={book.title} />
        <EmptyState icon={Lock} title={t('cambridge.comingSoonTitle')} description={t('cambridge.comingSoonBody')} />
        <Callout>{t('cambridge.comingSoonNote')}</Callout>
      </div>
    );
  }

  const skills = testSkills(real);
  const metaFor = (skill: IELTSSkillId) => {
    const sec = real.sections[skill]!;
    if (sec.skill === 'writing') return t('tests.rowMetaWriting', { n: sec.tasks.length, minutes: sec.timeLimitMinutes });
    if (sec.skill === 'speaking') return t('tests.rowMetaSpeaking', { n: sec.parts.length });
    return t('tests.rowMeta', { n: questionSlots(sec as ObjectiveSection).length, minutes: sec.timeLimitMinutes });
  };

  return (
    <div className="space-y-8">
      <PageHeader title={real.title} subtitle={book.title} backHref={`/ielts/cambridge/${book.id}`} backLabel={book.title} />

      <Section title={t('ielts.groups.test')} variant="label">
        <RowGroup>
          {skills.map((skill) => {
            const mine = sessions.filter((s) => s.testId === real.id && s.skill === skill);
            const active = mine.find((s) => s.status === 'in-progress');
            const last = mine.find((s) => s.status === 'submitted');
            return (
              <ListRow
                key={skill}
                href={`/ielts/tests/${real.id}/${skill}`}
                icon={SKILL_ICON[skill]}
                iconTone="brand"
                title={t(`skills.${skill}`)}
                description={metaFor(skill)}
                trailing={
                  active ? (
                    <StatusChip tone="warning">{t('tests.inProgress')}</StatusChip>
                  ) : last?.result ? (
                    <StatusChip tone="success">{`${last.result.correct}/${last.result.total}`}</StatusChip>
                  ) : undefined
                }
              />
            );
          })}
        </RowGroup>
      </Section>

      <Callout icon={Clock3}>{t('tests.notOfficial')}</Callout>
    </div>
  );
}
