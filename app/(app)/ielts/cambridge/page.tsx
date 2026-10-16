'use client';

import { Callout, CardGrid, PageHeader, Section } from '@/components/ds';
import { CambridgeBookCard } from '@/components/ielts/CambridgeBookCard';
import { useLocale } from '@/components/providers/LocaleProvider';
import { CAMBRIDGE_CATALOG, launchableTest } from '@/lib/ielts/content/cambridge-catalog';

export default function CambridgeLibraryPage() {
  const { t } = useLocale();

  return (
    <div className="space-y-8">
      <PageHeader title={t('cambridge.libraryTitle')} subtitle={t('cambridge.librarySubtitle')} backHref="/ielts" backLabel="IELTS" />

      <Section title={t('ielts.groups.test')} variant="label">
        <CardGrid className="xl:grid-cols-3">
          {CAMBRIDGE_CATALOG.map((book) => (
            <CambridgeBookCard
              key={book.id}
              book={book}
              availableCount={book.tests.filter((test) => launchableTest(test) !== undefined).length}
              academicLabel={t('cambridge.academic')}
              availableLabel={t('cambridge.available')}
              comingSoonLabel={t('cambridge.comingSoon')}
            />
          ))}
        </CardGrid>
      </Section>

      <Callout>{t('cambridge.libraryNote')}</Callout>
    </div>
  );
}
