'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/components/providers/ProfileProvider';
import { ListRow, PageHeader, Panel, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import type { IELTSSkill } from '@/lib/constants';
import { formatBand, overallBand, weeksUntilTest } from '@/lib/engine';
import { IELTS_SECTIONS, IELTS_TOOLS, type SectionDef } from '@/lib/navigation';
import type { UserProfile } from '@/lib/models';

const SKILL_IDS = ['listening', 'reading', 'writing', 'speaking'];

function sectionTrailing(section: SectionDef, profile: UserProfile) {
  if (SKILL_IDS.includes(section.id)) {
    const band = profile.ielts.currentBands[section.id as IELTSSkill];
    if (band !== undefined) {
      const behind = profile.ielts.targetBand !== undefined && band < profile.ielts.targetBand;
      return <StatusChip tone={behind ? 'warning' : 'success'}>{formatBand(band)}</StatusChip>;
    }
  }
  if (section.status === 'planned') return <StatusChip>Soon</StatusChip>;
  return undefined;
}

function Row({ section, profile }: { section: SectionDef; profile: UserProfile }) {
  return (
    <ListRow
      href={section.href}
      icon={section.icon}
      iconTone={section.status === 'available' ? 'brand' : 'neutral'}
      title={section.title}
      description={section.description}
      trailing={sectionTrailing(section, profile)}
    />
  );
}

export default function IELTSPage() {
  const { profile } = useProfile();
  if (!profile) return <ScreenSkeleton />;

  const { ielts } = profile;
  const byId = (id: string) => IELTS_SECTIONS.find((s) => s.id === id)!;
  const weeks = weeksUntilTest(ielts);

  return (
    <div className="space-y-8">
      <PageHeader title="IELTS" subtitle="Every skill, your plan and your vocabulary in one place." />

      {ielts.targetBand === undefined ? (
        <Panel variant="muted" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Start with your target band</p>
            <p className="text-sm text-muted-foreground">We&apos;ll build your plan around it.</p>
          </div>
          <Button asChild>
            <Link href="/setup/ielts">
              Set goal <ArrowRight />
            </Link>
          </Button>
        </Panel>
      ) : (
        <Panel className="grid grid-cols-3 divide-x p-0 text-center">
          {[
            ['Target', formatBand(ielts.targetBand)],
            ['Estimated', formatBand(overallBand(ielts.currentBands))],
            ['Test in', weeks !== undefined ? `${weeks} wks` : '–'],
          ].map(([label, value]) => (
            <div key={label} className="px-2 py-4">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-lg font-semibold tabular-nums">{value}</p>
            </div>
          ))}
        </Panel>
      )}

      <Section title="Your plan">
        <RowGroup>
          <Row section={byId('plan')} profile={profile} />
        </RowGroup>
      </Section>

      <Section title="Skills">
        <RowGroup>
          {SKILL_IDS.map((id) => (
            <Row key={id} section={byId(id)} profile={profile} />
          ))}
        </RowGroup>
      </Section>

      <Section title="Practice">
        <RowGroup>
          <Row section={byId('vocabulary')} profile={profile} />
          <Row section={byId('mock-tests')} profile={profile} />
        </RowGroup>
      </Section>

      <Section title="Tools">
        <RowGroup>
          {IELTS_TOOLS.map((tool) => (
            <Row key={tool.id} section={tool} profile={profile} />
          ))}
        </RowGroup>
      </Section>
    </div>
  );
}
