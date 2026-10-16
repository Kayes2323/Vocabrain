'use client';

import { BadgeCheck } from 'lucide-react';
import { Callout, ListRow, PageHeader, RowGroup, Section } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { BOOKS, testSkills } from '@/lib/ielts/content';

/** Full Mock Test needs all four skills in one test; today that's Mino's own mock test(s). */
export default function FullMockLibraryPage() {
  const { t } = useLocale();
  const fullTests = BOOKS.flatMap((book) => book.tests.map((test) => ({ book, test }))).filter(({ test }) => testSkills(test).length === 4);

  return (
    <div className="space-y-8">
      <PageHeader title={t('fullMock.libraryTitle')} subtitle={t('fullMock.librarySubtitle')} backHref="/ielts" backLabel="IELTS" />

      <Section title={t('ielts.groups.test')} variant="label">
        <RowGroup>
          {fullTests.map(({ book, test }) => (
            <ListRow
              key={test.id}
              href={`/ielts/full-mock-test/${test.id}`}
              icon={BadgeCheck}
              iconTone="brand"
              title={test.title}
              description={book.title}
            />
          ))}
        </RowGroup>
      </Section>

      <Callout>{t('fullMock.libraryNote')}</Callout>
    </div>
  );
}
