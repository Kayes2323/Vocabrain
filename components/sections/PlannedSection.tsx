'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconBadge, PageHeader, Panel, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { sectionKey, type SectionDef } from '@/lib/navigation';

interface PlannedSectionProps {
  section: SectionDef;
  backHref: string;
  backLabel: string;
  /** Something useful the student can do right now instead. */
  meanwhile?: { labelKey: string; href: string };
}

/**
 * Honest placeholder for a section on the roadmap: what it will do and what
 * to do meanwhile, so the student never hits a dead end.
 */
export function PlannedSection({ section, backHref, backLabel, meanwhile }: PlannedSectionProps) {
  const { t, list } = useLocale();
  const highlights = list(sectionKey(section.id, 'highlights'));
  return (
    <div className="max-w-2xl">
      <PageHeader
        title={t(sectionKey(section.id, 'title'))}
        subtitle={t(sectionKey(section.id, 'description'))}
        backHref={backHref}
        backLabel={backLabel}
      />
      <Panel className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <IconBadge icon={section.icon} tone="brand" size="lg" />
          <StatusChip tone="brand">{t('planned.badge')}</StatusChip>
        </div>
        {highlights.length > 0 && (
          <div className="space-y-3">
            <p className="font-medium">{t('planned.whatYoullDo')}</p>
            <ul className="space-y-2.5">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[15px] text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
        {meanwhile && (
          <div className="space-y-3 border-t pt-5">
            <p className="text-sm text-muted-foreground">{t('planned.meanwhile')}</p>
            <Button asChild className="w-full sm:w-auto">
              <Link href={meanwhile.href}>{t(meanwhile.labelKey)}</Link>
            </Button>
          </div>
        )}
      </Panel>
    </div>
  );
}
