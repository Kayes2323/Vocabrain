'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useLocale } from '@/components/providers/LocaleProvider';
import { readJSON, writeJSON } from '@/lib/services/local-store';

// "Guide, don't block": when a student jumps ahead of the recommended path we
// ask once, kindly, and then let them go. Choosing "go anyway" is remembered
// on this device so the same reminder never nags twice.

const KEY = 'vb:guide:skipped';

interface Pending {
  /** Where the student wants to go. */
  href: string;
  /** The recommended step before it. */
  backHref: string;
  /** Remembers "go anyway" for this target. */
  id: string;
}

export function useGuideReminder() {
  const router = useRouter();
  const [pending, setPending] = useState<Pending | null>(null);

  /**
   * Call from a link's onClick. Returns true (and shows the reminder) when
   * `backHref`, a recommended earlier step, is set and not skipped before;
   * the caller then prevents the navigation.
   */
  const intercept = useCallback((href: string, backHref?: string, id = href) => {
    if (!backHref || (readJSON<string[]>(KEY) ?? []).includes(id)) return false;
    setPending({ href, backHref, id });
    return true;
  }, []);

  const dialog = (
    <GuideReminder
      open={pending !== null}
      onOpenChange={(open) => !open && setPending(null)}
      onBack={() => pending && router.push(pending.backHref)}
      onContinue={() => {
        if (!pending) return;
        const skipped = readJSON<string[]>(KEY) ?? [];
        writeJSON(KEY, [...new Set([...skipped, pending.id])].slice(-50));
        router.push(pending.href);
      }}
    />
  );
  return { intercept, dialog };
}

export function GuideReminder({
  open,
  onOpenChange,
  onBack,
  onContinue,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const { t } = useLocale();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-w-sm gap-5 rounded-3xl p-6 text-center sm:max-w-sm">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand" aria-hidden>
          <Compass className="size-6" />
        </span>
        <div className="space-y-2">
          <DialogTitle className="text-lg font-semibold">{t('guide.title')}</DialogTitle>
          <DialogDescription className="text-[15px] text-pretty">{t('guide.body')}</DialogDescription>
        </div>
        <div className="grid gap-2">
          <Button size="lg" className="h-12" onClick={onBack}>
            {t('guide.back')}
          </Button>
          <Button size="lg" variant="ghost" className="h-12" onClick={onContinue}>
            {t('guide.continue')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
