'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { RowGroup } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { MemoryNote } from '@/lib/ai/memory';
import { useMinoRepository } from './useMinoRepository';

/** What Mino remembers from earlier chats; the student can remove any note. */
export function MinoMemoryList() {
  const { t } = useLocale();
  const repo = useMinoRepository();
  const [notes, setNotes] = useState<MemoryNote[] | null>(null);

  useEffect(() => {
    if (!repo) return;
    repo.loadMemory().then(setNotes, () => setNotes([]));
  }, [repo]);

  if (!repo || notes === null) return null;
  return (
    <div className="space-y-2">
      <p className="px-1 text-sm font-medium">{t('mino.memory.title')}</p>
      {notes.length === 0 ? (
        <p className="px-1 text-sm text-muted-foreground">{t('mino.memory.empty')}</p>
      ) : (
        <RowGroup>
          {notes.map((n) => (
            <div key={n.id} className="flex items-start justify-between gap-3 px-4 py-3 text-sm">
              <span>{n.text}</span>
              <button
                type="button"
                aria-label={t('mino.memory.forget')}
                onClick={async () => setNotes(await repo.forgetNote(n.id))}
                className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </RowGroup>
      )}
      <p className="px-1 text-xs text-muted-foreground">{t('mino.memory.note')}</p>
    </div>
  );
}
