'use client';

import { notFound, useParams } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { Callout, ListRow, PageHeader, RowGroup, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getCambridgeBook, launchableTest } from '@/lib/ielts/content/cambridge-catalog';

export default function CambridgeBookPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const { t } = useLocale();

  const book = getCambridgeBook(bookId);
  if (!book) notFound();

  return (
    <div className="space-y-8">
      <PageHeader title={book.title} subtitle={t('cambridge.bookSubtitle')} backHref="/ielts/cambridge" backLabel={t('cambridge.libraryTitle')} />

      <Section title={t('ielts.groups.test')} variant="label">
        <RowGroup>
          {book.tests.map((test) => {
            const available = launchableTest(test) !== undefined;
            return (
              <ListRow
                key={test.id}
                href={`/ielts/cambridge/${book.id}/${test.number}`}
                icon={BookOpen}
                iconTone={available ? 'success' : 'neutral'}
                title={t('cambridge.testN', { n: test.number })}
                description={book.title}
                trailing={<StatusChip tone={available ? 'success' : 'neutral'}>{available ? t('cambridge.available') : t('cambridge.comingSoon')}</StatusChip>}
              />
            );
          })}
        </RowGroup>
      </Section>

      <Callout>{t('cambridge.bookNote')}</Callout>
    </div>
  );
}
