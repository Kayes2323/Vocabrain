import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IconBadge, PageHeader, Panel, StatusChip } from '@/components/ds';
import type { SectionDef } from '@/lib/navigation';

interface PlannedSectionProps {
  section: SectionDef;
  backHref: string;
  backLabel: string;
  /** Something useful the student can do right now instead. */
  meanwhile?: { label: string; href: string };
}

/**
 * Honest placeholder for a section on the roadmap: what it will do, when, and
 * what to do in the meantime so the student is never left at a dead end.
 */
export function PlannedSection({ section, backHref, backLabel, meanwhile }: PlannedSectionProps) {
  return (
    <div>
      <PageHeader title={section.title} subtitle={section.description} backHref={backHref} backLabel={backLabel} />
      <Panel className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <IconBadge icon={section.icon} tone="brand" size="lg" />
          <StatusChip tone="brand">In development</StatusChip>
        </div>
        {section.highlights && (
          <div className="space-y-3">
            <p className="font-medium">What you&apos;ll be able to do</p>
            <ul className="space-y-2.5">
              {section.highlights.map((h) => (
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
            <p className="text-sm text-muted-foreground">Until then, keep your momentum going:</p>
            <Button asChild className="w-full sm:w-auto">
              <Link href={meanwhile.href}>{meanwhile.label}</Link>
            </Button>
          </div>
        )}
      </Panel>
    </div>
  );
}
