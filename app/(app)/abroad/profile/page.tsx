'use client';

import { useState } from 'react';
import { PageHeader, Panel, ScreenSkeleton, Section } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { HubBar } from '@/components/abroad/HubBar';
import { ProfileQuestion } from '@/components/abroad/ProfileQuestion';
import { clearAnswer, profileAnswer, PROFILE_QUESTIONS, type ProfileAnswer, type ProfileQuestionId } from '@/lib/abroad/profile-questions';

const GROUPS: { id: 'study' | 'background' | 'language' | 'budget'; questions: ProfileQuestionId[] }[] = [
  { id: 'study', questions: ['studyLanguage', 'universityType', 'city'] },
  { id: 'background', questions: ['educationLevel', 'educationField', 'educationStatus', 'graduationYear', 'result'] },
  { id: 'language', questions: ['englishLevel', 'ielts', 'korean'] },
  { id: 'budget', questions: ['tuitionBudget', 'livingBudget', 'totalBudget'] },
];

/** Everything the student chose to share, each answer editable or removable; missing = "Not provided". */
export default function StudyProfilePage() {
  const { t } = useLocale();
  const { profile, updateProfile } = useProfile();
  const [editing, setEditing] = useState<ProfileQuestionId | null>(null);
  if (!profile) return <ScreenSkeleton />;

  const show = (id: ProfileQuestionId, v: ProfileAnswer | undefined) => {
    if (v === undefined) return t('sa.profileQ.notProvided');
    const q = PROFILE_QUESTIONS[id];
    if (q.kind === 'choice') return t(`sa.profileQ.${id}.options.${v}`);
    if (typeof v === 'object' && 'amount' in v) return `${v.currency} ${v.amount.toLocaleString('en-US')}`;
    if (typeof v === 'object') return `${v.value} · ${t(`sa.profileQ.result.options.${v.scale}`)}`;
    return String(v);
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t('sa.profileQ.title')} subtitle={t('sa.profileQ.subtitle')} />
      <HubBar />
      {GROUPS.map((g) => (
        <Section key={g.id} title={t(`sa.profileQ.groups.${g.id}`)} variant="label">
          <Panel className="divide-y px-4 py-0">
            {g.questions.map((id) => {
              const v = profileAnswer(profile.abroad, id);
              return (
                <div key={id} className="space-y-2 py-3" data-profile-field={id} data-provided={v !== undefined}>
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-muted-foreground">{t(`sa.profileQ.${id}.q`)}</p>
                      <p className={v === undefined ? 'text-sm text-muted-foreground italic' : 'text-[15px] font-medium'}>{show(id, v)}</p>
                    </div>
                    <button type="button" className="text-sm font-medium text-brand" onClick={() => setEditing(editing === id ? null : id)}>
                      {t('sa.profileQ.edit')}
                    </button>
                    {v !== undefined && (
                      <button type="button" className="text-sm text-muted-foreground" onClick={() => updateProfile((p) => ({ ...p, abroad: clearAnswer(p.abroad, id) }))}>
                        {t('sa.profileQ.clear')}
                      </button>
                    )}
                  </div>
                  {editing === id && <ProfileQuestion id={id} inline onDone={() => setEditing(null)} />}
                </div>
              );
            })}
          </Panel>
        </Section>
      ))}
    </div>
  );
}
