'use client';

import { useEffect, useState } from 'react';
import { BookText, Headphones, Mic, PenLine } from 'lucide-react';
import { Callout, ListRow, PageHeader, RowGroup, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useTestSessions } from '@/components/test/useTestSessions';
import { BOOKS, testSkills } from '@/lib/ielts/content';
import { formatBand } from '@/lib/engine';
import { questionSlots, type IELTSSkillId, type ObjectiveSection, type TestSession } from '@/lib/ielts';

const SKILL_ICON = { listening: Headphones, reading: BookText, writing: PenLine, speaking: Mic } as const;

export default function TestLibraryPage() {
  const { t } = useLocale();
  const { repository, userId } = useTestSessions();
  const [sessions, setSessions] = useState<TestSession[]>([]);

  useEffect(() => {
    repository.list(userId).then(setSessions, (e) => console.error('[tests] History failed', e));
  }, [repository, userId]);

  return (
    <div className="space-y-8">
      <PageHeader title={t('tests.libraryTitle')} subtitle={t('tests.librarySubtitle')} backHref="/ielts" backLabel="IELTS" />

      {BOOKS.map((book) => (
        <Section key={book.id} title={book.title} variant="label">
          <RowGroup>
            {book.tests.flatMap((test) => {
              const meta = (skill: IELTSSkillId) => {
                const sec = test.sections[skill]!;
                if (sec.skill === 'writing') return t('tests.rowMetaWriting', { n: sec.tasks.length, minutes: sec.timeLimitMinutes });
                if (sec.skill === 'speaking') return t('tests.rowMetaSpeaking', { n: sec.parts.length });
                return t('tests.rowMeta', { n: questionSlots(sec as ObjectiveSection).length, minutes: sec.timeLimitMinutes });
              };
              return testSkills(test).map((skill: IELTSSkillId) => {
                const mine = sessions.filter((s) => s.testId === test.id && s.skill === skill);
                const active = mine.find((s) => s.status === 'in-progress');
                const last = mine.find((s) => s.status === 'submitted');
                return (
                  <ListRow
                    key={`${test.id}-${skill}`}
                    href={`/ielts/tests/${test.id}/${skill}`}
                    icon={SKILL_ICON[skill]}
                    iconTone="brand"
                    title={`${test.title} · ${t(`skills.${skill}`)}`}
                    description={meta(skill)}
                    trailing={
                      active ? (
                        <StatusChip tone="warning">{t('tests.inProgress')}</StatusChip>
                      ) : last?.result ? (
                        <StatusChip tone="success">{`${last.result.correct}/${last.result.total}`}</StatusChip>
                      ) : last?.feedback?.overall != null ? (
                        <StatusChip tone="success">{formatBand(last.feedback.overall)}</StatusChip>
                      ) : undefined
                    }
                  />
                );
              });
            })}
          </RowGroup>
        </Section>
      ))}

      <Callout>{t('tests.libraryNote')}</Callout>
    </div>
  );
}
