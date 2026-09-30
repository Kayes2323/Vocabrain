'use client';

import { useEffect, useState } from 'react';
import { BookText, ClipboardCheck, GraduationCap, Headphones, Mic, PenLine } from 'lucide-react';
import { ListRow, PageHeader, RowGroup, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useTestSessions } from '@/components/test/useTestSessions';
import { formatBand } from '@/lib/engine';
import { getModule, moduleProgress } from '@/lib/foundation';
import { questionSlots, type ObjectiveSection, type TestSession } from '@/lib/ielts';
import { BOOKS, testSkills } from '@/lib/ielts/content';
import { useText } from '@/components/foundation/useFoundation';

export type PracticeSkill = 'listening' | 'writing' | 'speaking';
export const PRACTICE_SKILLS: PracticeSkill[] = ['listening', 'writing', 'speaking'];

const ICON = { listening: Headphones, writing: PenLine, speaking: Mic } as const;
const MODULE = { listening: 'listening-foundation', writing: 'writing-foundation', speaking: 'speaking-foundation' } as const;

/**
 * One IELTS skill's practice page (Academic): learn how the skill is tested,
 * then practise its sections from the practice tests, with the latest result.
 */
export function SkillPractice({ skill }: { skill: PracticeSkill }) {
  const { t } = useLocale();
  const text = useText();
  const { profile } = useProfile();
  const { repository, userId } = useTestSessions();
  const [sessions, setSessions] = useState<TestSession[] | null>(null);
  useEffect(() => {
    let live = true;
    repository.list(userId).then(
      (s) => live && setSessions(s),
      (e) => {
        console.error('[practice] History failed', e);
        if (live) setSessions([]);
      },
    );
    return () => {
      live = false;
    };
  }, [repository, userId]);

  const module = getModule(MODULE[skill])!;
  const pct = profile?.foundation ? moduleProgress(module, profile.foundation) : 0;
  const tests = BOOKS.flatMap((b) => b.tests).filter((test) => test.module === 'academic' && testSkills(test).includes(skill));
  const name = t(`skills.${skill}`);

  const meta = (test: (typeof tests)[number]) => {
    const sec = test.sections[skill]!;
    if (sec.skill === 'writing') return t('tests.rowMetaWriting', { n: sec.tasks.length, minutes: sec.timeLimitMinutes });
    if (sec.skill === 'speaking') return t('tests.rowMetaSpeaking', { n: sec.parts.length });
    return t('tests.rowMeta', { n: questionSlots(sec as ObjectiveSection).length, minutes: sec.timeLimitMinutes });
  };

  return (
    <div className="max-w-2xl space-y-7" data-testid="skill-practice" data-skill={skill}>
      <PageHeader title={t('practicePage.title', { skill: name })} subtitle={t(`practicePage.subtitle.${skill}`)} backHref="/ielts" backLabel="IELTS" />

      <Section title={t('practicePage.learn')} variant="label">
        <RowGroup>
          <ListRow
            href={`/ielts/foundation/${module.id}`}
            icon={GraduationCap}
            iconTone="brand"
            title={text(module.title)}
            description={pct > 0 ? t('practicePage.lessonsPct', { n: pct }) : t('practicePage.lessons', { n: module.lessons.length })}
          />
        </RowGroup>
      </Section>

      <Section title={t('practicePage.practise')} variant="label">
        <RowGroup>
          {tests.map((test) => {
            const mine = (sessions ?? []).filter((s) => s.testId === test.id && s.skill === skill);
            const active = mine.find((s) => s.status === 'in-progress');
            const last = mine.find((s) => s.status === 'submitted');
            return (
              <ListRow
                key={test.id}
                href={`/ielts/tests/${test.id}/${skill}`}
                icon={ICON[skill]}
                iconTone="brand"
                title={`${test.title} · ${name}`}
                description={meta(test)}
                trailing={
                  active ? (
                    <StatusChip tone="warning">{t('tests.inProgress')}</StatusChip>
                  ) : last?.result ? (
                    <StatusChip tone="success">{`${last.result.correct}/${last.result.total}`}</StatusChip>
                  ) : last?.feedback?.overall != null ? (
                    <StatusChip tone="success">{formatBand(last.feedback.overall)}</StatusChip>
                  ) : undefined
                }
              />
            );
          })}
        </RowGroup>
      </Section>

      <RowGroup>
        <ListRow href="/ielts/tests" icon={ClipboardCheck} title={t('practicePage.allTests')} description={t('practicePage.allTestsHint')} />
        {skill !== 'listening' && (
          <ListRow href={`/practice/${skill}`} icon={BookText} title={t(`practicePage.words.${skill}`)} description={t('practicePage.wordsHint')} />
        )}
      </RowGroup>
    </div>
  );
}
