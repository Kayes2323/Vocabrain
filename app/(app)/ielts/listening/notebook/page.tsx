'use client';

import { PageHeader, Panel } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';

/**
 * The Error Notebook (product brief §6). Phase 1 ships the honest empty
 * state only: no Listening Lab lesson exists yet to produce a real mistake,
 * so no mistake is shown — never an invented one. Phase 2 wires this to the
 * error classifier and `ListeningMistake` records (lib/listening-lab/model.ts).
 */
export default function ListeningLabNotebookPage() {
  const { t } = useLocale();
  return (
    <div className="space-y-8">
      <PageHeader title={t('listeningLab.notebookTitle')} backHref="/ielts/listening" backLabel={t('listeningLab.title')} />
      <Panel>
        <p className="text-sm">{t('listeningLab.notebookEmpty')}</p>
        <p className="mt-3 text-sm text-muted-foreground">{t('listeningLab.notebookEmptyWhy')}</p>
      </Panel>
    </div>
  );
}
