'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Panel, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { missingQuestions } from '@/lib/abroad/profile-questions';
import { explainMatch, filterPrograms, filterUniversities, filtersFromProfile, programRows, universityCities, usable, type MatchVerdict, type ProgramFilters, type ProgramRow } from '@/lib/abroad/programs';
import { addUniversity, isSameShortlistEntry } from '@/lib/engine';
import type { Country, University } from '@/lib/models';
import { cn } from '@/lib/utils';
import { ProfileQuestion } from './ProfileQuestion';

const VERDICT_TONE: Record<MatchVerdict, 'success' | 'warning' | 'neutral'> = { fits: 'success', check: 'warning', 'no-data': 'neutral', 'no-profile': 'neutral' };
const VERDICT_MARK: Record<MatchVerdict, string> = { fits: '✓', check: '△', 'no-data': '?', 'no-profile': '?' };
const LANGUAGE_NAMES: Record<string, string> = { ko: 'Korean', ja: 'Japanese', de: 'German', fr: 'French', it: 'Italian', nl: 'Dutch', sv: 'Swedish', fi: 'Finnish', zh: 'Chinese', es: 'Spanish' };

function Chips<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { id: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={value === o.id}
            onClick={() => onChange(o.id)}
            className={cn('h-9 rounded-full px-3.5 text-sm', value === o.id ? 'bg-foreground text-background' : 'border bg-card')}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Program discovery for one country: factual filters (pre-filled from the
 * profile until the student changes them), results that fit, results we
 * can't check yet, and a per-dimension match explanation. No ranking.
 */
export function ProgramFinder({ country }: { country: Country }) {
  const { t } = useLocale();
  const { profile, updateProfile } = useProfile();
  // null = follow the profile; once the student touches a filter, their choice wins.
  const [own, setOwn] = useState<ProgramFilters | null>(null);
  const [askedLater, setAskedLater] = useState(false);
  if (!profile) return null;
  const a = profile.abroad;
  const filters = own ?? filtersFromProfile(a);
  const set = (patch: ProgramFilters) => setOwn({ ...filters, ...patch });
  const rows = programRows(country.code);
  const { fits, unknown } = filterPrograms(rows, filters);
  const cities = universityCities(country.code);
  const unis = filterUniversities(country.code, filters);
  const hasUnis = unis.fits.length + unis.unknown.length > 0 || cities.length > 0;
  const savedUni = (u: University) => (a.universities ?? []).some((x) => isSameShortlistEntry(x, { name: u.name, countryCode: u.countryCode, universityId: u.id }));
  const uniCard = (u: University) => {
    const o = usable(u.ownership);
    const langs = usable(u.studyLanguages);
    return (
      <li key={u.id} className="space-y-2 rounded-2xl border bg-card p-4" data-registry-university={u.id} data-ownership={o ?? 'unknown'}>
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{u.name}</p>
            <p className="text-sm text-muted-foreground">
              {[u.city, o === 'public' ? t('sa.uniFilter.national') : o === 'private' ? t('sa.uniFilter.privateUni') : undefined].filter(Boolean).join(' · ')}
            </p>
            {langs?.includes('en') && <p className="text-sm">{t('sa.uniFilter.englishTrack')}</p>}
          </div>
          <Button
            size="sm"
            variant={savedUni(u) ? 'secondary' : 'outline'}
            disabled={savedUni(u)}
            onClick={() =>
              updateProfile((p) => ({
                ...p,
                abroad: addUniversity(p.abroad, { name: u.name, countryCode: u.countryCode, fit: 'match', universityId: u.id, officialUrl: u.officialUrl, status: 'interested' }),
              }))
            }
          >
            {savedUni(u) ? t('sa.uniFilter.saved') : t('sa.uniFilter.save')}
          </Button>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <a href={u.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-brand">
            {t('sa.unis.officialSite')} <ExternalLink className="size-3.5" aria-hidden />
          </a>
          {u.applicationPortalUrl && (
            <a href={u.applicationPortalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-brand">
              {t('sa.uniFilter.admissions')} <ExternalLink className="size-3.5" aria-hidden />
            </a>
          )}
        </div>
      </li>
    );
  };
  const localName = country.localLanguage ? (LANGUAGE_NAMES[country.localLanguage] ?? country.localLanguage.toUpperCase()) : undefined;
  const askLanguage = !askedLater && own?.studyLanguage === undefined && missingQuestions(a, ['studyLanguage']).length > 0;

  const saved = (row: ProgramRow) =>
    (a.universities ?? []).some((u) => isSameShortlistEntry(u, { name: row.university.name, countryCode: row.university.countryCode, universityId: row.university.id, programId: row.program.id }));
  const card = (row: ProgramRow) => (
    <li key={row.program.id} className="space-y-2 rounded-2xl border bg-card p-4" data-program={row.program.id}>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{row.program.title}</p>
          <p className="text-sm text-muted-foreground">
            {row.university.name}
            {row.university.city ? ` · ${row.university.city}` : ''}
          </p>
        </div>
        <Button
          size="sm"
          variant={saved(row) ? 'secondary' : 'outline'}
          disabled={saved(row)}
          onClick={() =>
            updateProfile((p) => ({
              ...p,
              abroad: addUniversity(p.abroad, {
                name: row.university.name,
                countryCode: row.university.countryCode,
                fit: 'match',
                universityId: row.university.id,
                programId: row.program.id,
                program: row.program.title,
                officialUrl: row.program.officialUrl ?? row.university.officialUrl,
                status: 'interested',
              }),
            }))
          }
        >
          {saved(row) ? t('sa.uniFilter.saved') : t('sa.uniFilter.save')}
        </Button>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {explainMatch(row, a).map((m) => (
          <li key={m.dimension}>
            <StatusChip tone={VERDICT_TONE[m.verdict]}>
              {VERDICT_MARK[m.verdict]} {t(`sa.fit.dims.${m.dimension}`)} · {t(`sa.fit.verdict.${m.verdict}`)}
            </StatusChip>
          </li>
        ))}
      </ul>
      <a href={row.program.officialUrl ?? row.university.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-brand">
        {t('sa.unis.officialSite')} <ExternalLink className="size-3.5" aria-hidden />
      </a>
    </li>
  );

  return (
    <div className="space-y-4" data-testid="program-finder">
      {askLanguage && <ProfileQuestion id="studyLanguage" onDone={(ok) => !ok && setAskedLater(true)} />}
      <Panel className="space-y-3" data-testid="program-filters">
        <Chips
          label={t('sa.uniFilter.language')}
          value={filters.studyLanguage ?? 'either'}
          onChange={(v) => set({ studyLanguage: v })}
          options={[
            { id: 'en', label: t('sa.uniFilter.english') },
            ...(localName ? [{ id: 'local' as const, label: t('sa.uniFilter.local', { language: localName }) }] : []),
            { id: 'either', label: t('sa.uniFilter.either') },
          ]}
        />
        <Chips
          label={t('sa.uniFilter.type')}
          value={filters.ownership ?? 'any'}
          onChange={(v) => set({ ownership: v })}
          options={[
            { id: 'any', label: t('sa.uniFilter.all') },
            { id: 'public', label: t('sa.uniFilter.public') },
            { id: 'private', label: t('sa.uniFilter.private') },
          ]}
        />
        {cities.length > 0 && (
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{t('sa.uniFilter.city')}</span>
            <select className="h-10 rounded-lg border bg-background px-3" value={filters.city ?? ''} onChange={(e) => set({ city: e.target.value || undefined })}>
              <option value="">{t('sa.uniFilter.anyCity')}</option>
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        )}
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="size-4" checked={Boolean(filters.scholarship)} onChange={(e) => set({ scholarship: e.target.checked || undefined })} />
          {t('sa.uniFilter.scholarship')}
        </label>
        {!own && (filters.studyLanguage || filters.ownership || filters.city) && <p className="text-xs text-muted-foreground">{t('sa.uniFilter.fromProfile')}</p>}
      </Panel>

      {hasUnis && (
        <section className="space-y-2" data-testid="uni-registry">
          <div className="space-y-0.5 px-1">
            <p className="text-sm font-semibold">{t('sa.uniFilter.universities')}</p>
            <p className="text-xs text-muted-foreground">{t('sa.uniFilter.universitiesBody')}</p>
          </div>
          {unis.fits.length ? <ul className="space-y-2">{unis.fits.map(uniCard)}</ul> : <Panel className="text-sm text-muted-foreground">{t('sa.uniFilter.universitiesNone')}</Panel>}
          {unis.unknown.length > 0 && (
            <>
              <p className="px-1 text-sm font-semibold text-muted-foreground">{t('sa.uniFilter.cantCheck')}</p>
              <ul className="space-y-2">{unis.unknown.map(uniCard)}</ul>
            </>
          )}
        </section>
      )}

      {rows.length === 0 ? (
        <Panel className="text-sm text-muted-foreground" data-testid="uni-verified-empty">
          {hasUnis ? t('sa.uniFilter.programsEmpty') : t('sa.unis.verifiedEmpty', { country: country.name })}
        </Panel>
      ) : (
        <>
          <p className="px-1 text-sm font-semibold">{t('sa.uniFilter.results')}</p>
          {fits.length ? <ul className="space-y-2">{fits.map(card)}</ul> : <Panel className="text-sm text-muted-foreground">{t('sa.uniFilter.none')}</Panel>}
          {unknown.length > 0 && (
            <>
              <p className="px-1 text-sm font-semibold text-muted-foreground">{t('sa.uniFilter.cantCheck')}</p>
              <ul className="space-y-2">{unknown.map(card)}</ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
