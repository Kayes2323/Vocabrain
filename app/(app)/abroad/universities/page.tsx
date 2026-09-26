'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { Building2, Check, ExternalLink, Plus, Sparkles, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader, Panel, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { CountrySelect, useCountryParam } from '@/components/abroad/CountrySelect';
import { HubBar } from '@/components/abroad/HubBar';
import { TrustNote } from '@/components/abroad/TrustNote';
import { getCountry } from '@/lib/content/countries';
import { universitiesIn } from '@/lib/content/universities';
import { addUniversity, countryRoadmap, markStep, removeUniversity, shortlistBalance, updateUniversity } from '@/lib/engine';
import type { UniversityFit, UniversityStatus } from '@/lib/models';

const FITS: UniversityFit[] = ['ambitious', 'match', 'safer'];
const STATUSES: UniversityStatus[] = ['researching', 'applying', 'applied', 'offer', 'rejected'];
const FIT_TONE = { ambitious: 'warning', match: 'brand', safer: 'success' } as const;

function Universities() {
  const { t } = useLocale();
  const { profile, updateProfile } = useProfile();
  const [code, setCode] = useCountryParam(profile?.abroad);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', program: '', url: '', fit: 'match' as UniversityFit, country: '' });

  if (!profile) return <ScreenSkeleton />;
  const a = profile.abroad;
  const country = code === 'all' ? undefined : getCountry(code);
  const mine = (a.universities ?? []).filter((u) => !country || u.countryCode === country.code);
  const balance = shortlistBalance(mine);
  const verified = universitiesIn(country?.code);
  const dream = a.dreamCountryCode;
  const stepDone = dream ? countryRoadmap(profile, dream).steps.find((s) => s.id === 'shortlist')?.status === 'done' : false;
  const formCountry = country?.code ?? (form.country || dream || a.preferredCountryCodes?.[0] || 'KR');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !formCountry) return;
    updateProfile((p) => ({ ...p, abroad: addUniversity(p.abroad, { name: form.name, program: form.program, officialUrl: form.url, fit: form.fit, countryCode: formCountry }) }));
    setForm({ name: '', program: '', url: '', fit: 'match', country: form.country });
    setAdding(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t('sa.unis.title')} subtitle={t('sa.unis.subtitle')} />
      <HubBar />
      <CountrySelect value={code} onChange={setCode} abroad={a} />

      <Section
        title={t('sa.unis.mine')}
        action={
          !adding ? (
            <Button size="sm" variant="outline" onClick={() => setAdding(true)}>
              <Plus /> {t('sa.unis.add')}
            </Button>
          ) : undefined
        }
      >
        {adding && (
          <Panel className="space-y-3" data-testid="uni-form">
            <form onSubmit={submit} className="space-y-3">
              {!country && <CountrySelect id="uni-country" value={formCountry} onChange={(c) => setForm({ ...form, country: c })} abroad={a} allowAll={false} />}
              <Input aria-label={t('sa.unis.name')} placeholder={t('sa.unis.name')} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Input aria-label={t('sa.unis.program')} placeholder={t('sa.unis.program')} value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} />
              <Input aria-label={t('sa.unis.url')} placeholder={t('sa.unis.url')} type="url" inputMode="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
              <fieldset className="space-y-1.5">
                <legend className="text-sm text-muted-foreground">{t('sa.unis.fit')}</legend>
                <div className="flex flex-wrap gap-1.5">
                  {FITS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={form.fit === f}
                      onClick={() => setForm({ ...form, fit: f })}
                      className={form.fit === f ? 'h-9 rounded-full bg-foreground px-3.5 text-sm text-background' : 'h-9 rounded-full border px-3.5 text-sm'}
                    >
                      {t(`sa.unis.fits.${f}`)}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="flex gap-2">
                <Button type="submit">{t('sa.unis.save')}</Button>
                <Button type="button" variant="ghost" onClick={() => setAdding(false)}>
                  {t('sa.unis.cancel')}
                </Button>
              </div>
            </form>
          </Panel>
        )}
        {mine.length === 0 && !adding ? (
          <Panel className="flex items-start gap-3 border-dashed text-sm text-muted-foreground">
            <Building2 className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
            {t('sa.unis.mineEmpty')}
          </Panel>
        ) : (
          <ul className="space-y-2" data-testid="my-universities">
            {mine.map((u) => {
              const c = getCountry(u.countryCode);
              return (
                <li key={u.id} className="space-y-2.5 rounded-2xl border bg-card p-4" data-university={u.name}>
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{u.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {c?.flag} {c?.name}
                        {u.program ? ` · ${u.program}` : ''}
                      </p>
                    </div>
                    <StatusChip tone={FIT_TONE[u.fit]}>{t(`sa.unis.fits.${u.fit}`)}</StatusChip>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      aria-label={t('sa.unis.statusLabel')}
                      value={u.status}
                      onChange={(e) => updateProfile((p) => ({ ...p, abroad: updateUniversity(p.abroad, u.id, { status: e.target.value as UniversityStatus }) }))}
                      className="h-9 rounded-lg border bg-background px-2.5 text-sm"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {t(`sa.unis.statuses.${s}`)}
                        </option>
                      ))}
                    </select>
                    {u.officialUrl && (
                      <a href={u.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 text-sm font-medium text-brand">
                        {t('sa.unis.officialSite')} <ExternalLink className="size-3.5" aria-hidden />
                      </a>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="ml-auto size-9"
                      aria-label={t('sa.unis.remove', { name: u.name })}
                      onClick={() => updateProfile((p) => ({ ...p, abroad: removeUniversity(p.abroad, u.id) }))}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        {balance.total > 0 && (
          <p className="px-1 text-sm text-muted-foreground" data-testid="uni-balance">
            {t('sa.unis.balance', { ambitious: balance.ambitious, match: balance.match, safer: balance.safer })}
          </p>
        )}
        {balance.needsSafer && <p className="px-1 text-sm text-warning">{t('sa.unis.needsSafer')}</p>}
        {dream && (a.universities ?? []).some((u) => u.countryCode === dream) && (
          <Button
            variant={stepDone ? 'secondary' : 'default'}
            aria-pressed={stepDone}
            onClick={() => updateProfile((p) => ({ ...p, abroad: markStep(p.abroad, dream, 'shortlist', !stepDone) }))}
          >
            {stepDone ? t('sa.unis.stepDone') : (
              <>
                <Check /> {t('sa.unis.markStep')}
              </>
            )}
          </Button>
        )}
      </Section>

      <Section title={t('sa.unis.verified')}>
        {verified.length === 0 ? (
          <Panel className="text-sm text-muted-foreground" data-testid="uni-verified-empty">
            {country ? t('sa.unis.verifiedEmpty', { country: country.name }) : t('sa.unis.verifiedEmptyAll')}
          </Panel>
        ) : (
          <ul className="space-y-2">
            {verified.map((u) => (
              <li key={u.id} className="rounded-2xl border bg-card p-4">
                <a href={u.officialUrl} target="_blank" rel="noopener noreferrer" className="font-semibold">
                  {u.name} <ExternalLink className="inline size-3.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Link href={`/mino?${new URLSearchParams({ ask: 'abroad-unis' })}`} className="flex items-center gap-2 rounded-2xl bg-brand-soft px-4 py-3.5 text-sm font-medium text-brand">
        <Sparkles className="size-4" aria-hidden /> {t('sa.unis.ask')}
      </Link>
      <TrustNote />
    </div>
  );
}

export default function UniversitiesPage() {
  return (
    <Suspense fallback={<ScreenSkeleton />}>
      <Universities />
    </Suspense>
  );
}
