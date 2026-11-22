'use client';

import { BadgeCheck } from 'lucide-react';
import { Callout, ListRow, PageHeader, RowGroup, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { BOOKS, testSkills } from '@/lib/ielts/content';

/** Full Mock Test needs all four skills eventually; a test with at least one written skill still
 * belongs here, with its missing skills marked "coming soon" on its own overview page. */
export default function FullMockLibraryPage() {
  const { t } = useLocale();
  const fullTests = BOOKS.flatMap((book) => book.tests.map((test) => ({ book, test }))).filter(({ test }) => testSkills(test).length >= 1);

  return (
    <div className="space-y-8">
      <PageHeader title={t('fullMock.libraryTitle')} subtitle={t('fullMock.librarySubtitle')} backHref="/ielts" backLabel="IELTS" />

      <Section title={t('ielts.groups.test')} variant="label">
        <RowGroup>
          {fullTests.map(({ book, test }) => {
            const skillCount = testSkills(test).length;
            return (
              <ListRow
                key={test.id}
                href={`/ielts/full-mock-test/${test.id}`}
                icon={BadgeCheck}
                iconTone="brand"
                title={test.title}
                description={book.title}
                trailing={skillCount < 4 ? <StatusChip tone="neutral">{t('fullMock.partialBadge')}</StatusChip> : undefined}
              />
            );
          })}
        </RowGroup>
      </Section>

      <Callout>{t('fullMock.libraryNote')}</Callout>
    </div>
  );
}
