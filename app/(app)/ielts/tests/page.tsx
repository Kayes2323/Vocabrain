'use client';

import { useEffect, useState } from 'react';
import { BookText, Headphones } from 'lucide-react';
import { Callout, ListRow, PageHeader, RowGroup, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useTestSessions } from '@/components/test/useTestSessions';
import { BOOKS, objectiveSkills } from '@/lib/ielts/content';
import { questionSlots, type ObjectiveSection, type TestSession } from '@/lib/ielts';

const SKILL_ICON = { listening: Headphones, reading: BookText } as const;

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
        <Section key={book.id} title={book.title}>
          <RowGroup>
            {book.tests.flatMap((test) =>
              objectiveSkills(test).map((skill) => {
                const section = test.sections[skill] as ObjectiveSection;
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
                    description={t('tests.rowMeta', { n: questionSlots(section).length, minutes: section.timeLimitMinutes })}
                    trailing={
                      active ? (
                        <StatusChip tone="warning">{t('tests.inProgress')}</StatusChip>
                      ) : last?.result ? (
                        <StatusChip tone="success">{`${last.result.correct}/${last.result.total}`}</StatusChip>
                      ) : undefined
                    }
                  />
                );
              }),
            )}
          </RowGroup>
        </Section>
      ))}

      <Callout>{t('tests.libraryNote')}</Callout>
    </div>
  );
}
