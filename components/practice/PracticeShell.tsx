'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';

export function PracticeShell({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  const { t } = useLocale();
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4">
      <div className="flex h-14 items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onClose} aria-label={t('common.close')}>
          <X />
        </Button>
        <p className="font-semibold">{title}</p>
      </div>
      <div className="flex-1 space-y-6 pt-4 pb-10">{children}</div>
    </div>
  );
}
