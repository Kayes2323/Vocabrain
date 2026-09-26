'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CalendarClock, Check, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader, Panel, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { useFormatDate } from '@/components/abroad/FactRow';
import { HubBar } from '@/components/abroad/HubBar';
import { useBilingual } from '@/components/abroad/useBilingual';
import { daysUntil, type DeadlineBucket } from '@/lib/abroad/status';
import { getCountry } from '@/lib/content/countries';
import { addDeadline, allDeadlines, removeDeadline, toggleDeadlineDone, type DeadlineItem } from '@/lib/engine';
import type { PersonalDeadlineKind } from '@/lib/models';

const BUCKETS: DeadlineBucket[] = ['missed', 'this-week', 'this-month', 'upcoming', 'completed'];
const BUCKET_TONE = { missed: 'warning', 'this-week': 'warning', 'this-month': 'brand', upcoming: 'neutral', completed: 'success' } as const;
const KINDS: PersonalDeadlineKind[] = ['university', 'scholarship', 'test', 'visa', 'personal'];

function Deadlines() {
  const { t } = useLocale();
  const text = useBilingual();
  const date = useFormatDate();
  const params = useSearchParams();
  const preset = params.get('add') as PersonalDeadlineKind | null;
  const { profile, updateProfile } = useProfile();
  const [adding, setAdding] = useState(Boolean(preset));
  const [form, setForm] = useState({ title: '', date: '', kind: (preset && KINDS.includes(preset) ? preset : 'university') as PersonalDeadlineKind });

  if (!profile) return <ScreenSkeleton />;
  const items = allDeadlines(profile);
  const dream = profile.abroad.dreamCountryCode;

  const when = (d: DeadlineItem) => {
    const n = daysUntil(d.date);
    return n === 0 ? t('sa.dl.today') : n > 0 ? t('sa.dl.inDays', { n }) : t('sa.dl.ago', { n: -n });
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile((p) => ({ ...p, abroad: addDeadline(p.abroad, { ...form, countryCode: dream }) }));
    setForm({ title: '', date: '', kind: form.kind });
    setAdding(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t('sa.dl.title')} subtitle={t('sa.dl.subtitle')} />
      <HubBar />

      {adding ? (
        <Panel data-testid="dl-form">
          <form onSubmit={submit} className="space-y-3">
            <Input aria-label={t('sa.dl.titleLabel')} placeholder={t('sa.dl.titleLabel')} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{t('sa.dl.date')}</span>
                <input type="date" className="h-10 rounded-lg border bg-background px-3" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">{t('sa.dl.kind')}</span>
                <select className="h-10 rounded-lg border bg-background px-3" value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value as PersonalDeadlineKind })}>
                  {KINDS.map((k) => (
                    <option key={k} value={k}>
                      {t(`sa.dl.kinds.${k}`)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex gap-2">
              <Button type="submit">{t('sa.dl.save')}</Button>
              <Button type="button" variant="ghost" onClick={() => setAdding(false)}>
                {t('sa.unis.cancel')}
              </Button>
            </div>
          </form>
        </Panel>
      ) : (
        <Button variant="outline" onClick={() => setAdding(true)}>
          <Plus /> {t('sa.dl.add')}
        </Button>
      )}

      {items.length === 0 && (
        <Panel className="flex items-start gap-3 border-dashed text-sm text-muted-foreground">
          <CalendarClock className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
          {t('sa.dl.empty')}
        </Panel>
      )}

      {BUCKETS.map((b) => {
        const list = items.filter((d) => d.bucket === b);
        if (!list.length) return null;
        return (
          <Section key={b} title={t(`sa.dl.buckets.${b}`)} variant="label">
            <ul className="space-y-2" data-bucket={b}>
              {list.map((d) => {
                const c = d.countryCode ? getCountry(d.countryCode) : undefined;
                return (
                  <li key={d.id} className="rounded-2xl border bg-card p-4" data-deadline={d.id} data-origin={d.origin}>
                    <div className="flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <p className={d.done ? 'font-semibold text-muted-foreground line-through' : 'font-semibold'}>{typeof d.title === 'string' ? d.title : text(d.title)}</p>
                        <p className="text-sm text-muted-foreground">
                          {date(d.date)} · {when(d)}
                          {c ? ` · ${c.flag} ${c.name}` : ''}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t(`sa.dl.origin.${d.origin}`)}
                          {d.origin === 'personal' || d.origin === 'official' ? ` · ${t(`sa.dl.kinds.${d.kind}`)}` : ''}
                        </p>
                      </div>
                      <StatusChip tone={BUCKET_TONE[b]}>{t(`sa.dl.buckets.${b}`)}</StatusChip>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {d.origin === 'personal' && (
                        <>
                          <Button size="sm" variant={d.done ? 'secondary' : 'outline'} aria-pressed={d.done} onClick={() => updateProfile((p) => ({ ...p, abroad: toggleDeadlineDone(p.abroad, d.id) }))}>
                            {d.done ? t('sa.dl.undo') : (
                              <>
                                <Check /> {t('sa.dl.done')}
                              </>
                            )}
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => updateProfile((p) => ({ ...p, abroad: removeDeadline(p.abroad, d.id) }))}>
                            <Trash2 /> {t('sa.dl.remove')}
                          </Button>
                        </>
                      )}
                      {d.href && (
                        <Button asChild size="sm" variant="outline">
                          <Link href={d.href}>
                            {t('sa.roadmap.open')} <ArrowRight />
                          </Link>
                        </Button>
                      )}
                      {d.source?.url && (
                        <a href={d.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                          {d.source.name} <ExternalLink className="size-3.5" aria-hidden />
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Section>
        );
      })}

      <p className="text-xs text-muted-foreground">{t('sa.dl.officialNote')}</p>
    </div>
  );
}

export default function DeadlinesPage() {
  return (
    <Suspense fallback={<ScreenSkeleton />}>
      <Deadlines />
    </Suspense>
  );
}
