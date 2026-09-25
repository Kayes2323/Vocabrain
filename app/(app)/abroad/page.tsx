'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useProfile } from '@/components/providers/ProfileProvider';
import { ListRow, PageHeader, Panel, ProgressBar, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { JourneyTimeline } from '@/components/abroad/JourneyTimeline';
import { TrustNote } from '@/components/abroad/TrustNote';
import { DEGREE_LEVELS } from '@/lib/constants';
import { formatIntake, hasAbroadGoal, journeyStatus } from '@/lib/engine';
import { ABROAD_SECTION_GROUPS } from '@/lib/navigation';

export default function AbroadPage() {
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  const status = journeyStatus(profile);
  const { abroad } = profile;
  const degree = DEGREE_LEVELS.find((d) => d.id === abroad.degreeLevel)?.label;

  return (
    <div className="space-y-8">
      <PageHeader title="Study Abroad" subtitle="Country, university, funding, application, visa, departure." />

      {hasAbroadGoal(abroad) ? (
        <Panel className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">My Journey</p>
              <p className="text-lg font-semibold">
                {[degree, abroad.subject].filter(Boolean).join(' · ') || 'Study abroad'}
              </p>
              <p className="text-sm text-muted-foreground">Target intake: {formatIntake(abroad) ?? 'Not set'}</p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/setup/abroad">Edit</Link>
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Application journey</span>
              <span className="font-medium tabular-nums">{status.percent}%</span>
            </div>
            <ProgressBar value={status.percent} label="Application journey progress" tone="success" />
          </div>
          <Collapsible>
            <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg py-1 text-sm font-medium">
              You are here: {status.current.title}
              <ChevronDown className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" aria-hidden />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <JourneyTimeline currentIndex={status.currentIndex} />
            </CollapsibleContent>
          </Collapsible>
        </Panel>
      ) : (
        <Panel variant="muted" className="space-y-4">
          <div className="space-y-1">
            <p className="font-semibold">Start your study-abroad journey</p>
            <p className="text-sm text-muted-foreground">
              Three quick questions: degree, subject and target intake. We&apos;ll map out the steps from there.
            </p>
          </div>
          <Button asChild>
            <Link href="/setup/abroad">
              Get started <ArrowRight />
            </Link>
          </Button>
        </Panel>
      )}

      {ABROAD_SECTION_GROUPS.map((group) => (
        <Section key={group.title} title={group.title}>
          <RowGroup>
            {group.sections.map((section) => (
              <ListRow
                key={section.id}
                href={section.href}
                icon={section.icon}
                iconTone={section.status === 'available' ? 'brand' : 'neutral'}
                title={section.title}
                description={section.description}
                trailing={section.status === 'planned' ? <StatusChip>Soon</StatusChip> : undefined}
              />
            ))}
          </RowGroup>
        </Section>
      ))}

      <TrustNote />
    </div>
  );
}
