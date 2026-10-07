'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { AcademicHome } from '@/components/academic/AcademicHome';
import { ScreenSkeleton } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';

/** The Academic world: its own home, separate from the IELTS hub. */
export default function AcademicPage() {
  const { t } = useLocale();
  const { profile, updateProfile } = useProfile();
  if (!profile) return <ScreenSkeleton />;
  return (
    <div className="space-y-6">
      <AcademicHome headingLevel="h1" />
      <Link
        href="/ielts"
        onClick={() => updateProfile((p) => ({ ...p, activePath: 'ielts' }))}
        className="flex min-h-12 items-center justify-between gap-3 rounded-xl px-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        data-testid="academic-switch-ielts"
      >
        {t('academic.switchToIelts')}
        <ChevronRight className="size-4 shrink-0" aria-hidden />
      </Link>
    </div>
  );
}
