'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useFormatDate } from '@/components/abroad/FactRow';
import { useBilingual } from '@/components/abroad/useBilingual';
import { SectionSources } from '@/components/abroad/guide/GuideParts';
import { GUIDE_DEGREES } from '@/lib/abroad/guides';
import { byRanking, rankLabel, type CountryUniversityLayer, type DataStatus, type IntakeInfo, type RankingEntry, type SourcedText } from '@/lib/abroad/university-layer';
import { universityHref } from '@/lib/content/university-layers';
import type { Country, SourceRef } from '@/lib/models';
import { cn } from '@/lib/utils';

/** A quiet label for anything that is not fully verified (nothing for verified data). */
export function DataStatusTag({ status }: { status: DataStatus }) {
  const { t } = useLocale();
  if (status === 'verified') return null;
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-xs font-medium',
        status === 'not-verified' ? 'bg-muted text-muted-foreground' : 'bg-warning-soft text-warning',
      )}
      data-data-status={status}
    >
      {t(`sa.book.unis.status.${status}`)}
    </span>
  );
}

/** "QS World University Rankings 2027: #25" — or "Not ranked in this edition". Provider and year always shown. */
export function RankLine({ ranking, className }: { ranking: RankingEntry; className?: string }) {
  const { t } = useLocale();
  const label = rankLabel(ranking.rank);
  const vars = { provider: ranking.provider, year: String(ranking.year), rank: label ?? '' };
  return (
    <p className={cn('text-sm font-medium', className)} data-rank={ranking.rank ?? 'none'} data-rank-provider={ranking.provider} data-rank-year={ranking.year}>
      {label ? t('sa.book.unis.rank', vars) : t('sa.book.unis.notRanked', vars)}
    </p>
  );
}

/** One labelled fact with its status, period and (optionally) its own sources. */
export function SourcedFact({ label, fact, id }: { label: string; fact: SourcedText; id?: string }) {
  const { t } = useLocale();
  const text = useBilingual();
  return (
    <div className="space-y-1" data-fact={id}>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        <DataStatusTag status={fact.status} />
      </div>
      <p className="text-[16px] leading-7 text-foreground/85">{text(fact.text)}</p>
      {fact.period && <p className="text-xs text-muted-foreground">{t('sa.book.unis.facts.period', { period: fact.period })}</p>}
    </div>
  );
}

const INTAKE_TONE: Record<IntakeInfo['status'], string> = {
  confirmed: 'bg-success/10 text-success',
  'not-published': 'bg-muted text-muted-foreground',
  varies: 'bg-brand/10 text-brand',
  'needs-review': 'bg-warning-soft text-warning',
};

/** Next intake with its status; no value is ever guessed. */
export function IntakeFact({ intake }: { intake: IntakeInfo }) {
  const { t } = useLocale();
  const text = useBilingual();
  return (
    <div className="space-y-1" data-intake={intake.status}>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold text-muted-foreground">{t('sa.book.unis.facts.nextIntake')}</p>
        <span className={cn('inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium', INTAKE_TONE[intake.status])}>{t(`sa.book.unis.intake.${intake.status}`)}</span>
      </div>
      {intake.value ? (
        <p className="text-[16px] leading-7 text-foreground/85">{text(intake.value)}</p>
      ) : intake.status !== 'varies' ? (
        <p className="text-[15px] leading-7 text-muted-foreground">{t('sa.book.unis.intakeMissing')}</p>
      ) : null}
    </div>
  );
}

/** Unique sources in first-seen order. */
export function uniqueSources(list: SourceRef[]): SourceRef[] {
  const seen = new Set<string>();
  return list.filter((s) => {
    const key = s.url ?? s.name;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Country page: the researched universities, ordered by one ranking edition (unranked last). */
export function TopUniversities({ country, layer }: { country: Country; layer: CountryUniversityLayer }) {
  const { t } = useLocale();
  const text = useBilingual();
  const list = byRanking(layer.universities);
  if (!list.length) return null;
  const year = list[0].ranking.year;
  return (
    <section id="universities" className="scroll-mt-6 space-y-5 border-t pt-10" aria-labelledby="universities-title" data-testid="top-universities">
      <div className="space-y-2">
        <h2 id="universities-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t('sa.book.unis.title')}
        </h2>
        <p className="text-[15px] leading-6 text-muted-foreground">{t('sa.book.unis.note', { year: String(year) })}</p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {list.map((u) => {
          const english = u.programs.filter((p) => p.englishOnly || p.languages.en.includes('English'));
          return (
            <li key={u.id} className="min-w-0">
              <Link
                href={universityHref(country.code, u.id)}
                className="group flex h-full flex-col justify-between gap-4 rounded-3xl border bg-card p-5 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_8px_24px_-12px_rgb(15_23_42/0.12)] transition-shadow hover:shadow-[0_2px_4px_rgb(15_23_42/0.06),0_16px_32px_-12px_rgb(15_23_42/0.2)]"
                data-top-university={u.id}
              >
                <div className="min-w-0 space-y-2">
                  <p className="text-lg font-bold tracking-tight break-words">{u.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {u.city} · {t(`sa.book.unis.${u.ownership}`)}
                  </p>
                  <RankLine ranking={u.ranking} className="text-brand" />
                  <p className="text-[15px] leading-6 text-foreground/80">{text(u.overview)}</p>
                  {u.areas && <p className="text-sm leading-6 text-muted-foreground">{text(u.areas)}</p>}
                  <p className="text-sm text-muted-foreground">{english.length ? t('sa.book.unis.programsCount', { count: String(english.length) }) : t('sa.book.unis.programsNone')}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  {t('sa.book.unis.view')} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <SectionSources sources={uniqueSources(list.map((u) => ({ name: `${u.ranking.provider} ${u.ranking.year} – ${u.name}`, url: u.ranking.sourceUrl, sourceType: 'ranking-publisher' as const })))} />
    </section>
  );
}

/** Country page: student visa statistics, each with its scope; links to each degree's visa section. */
export function VisaData({ country, layer }: { country: Country; layer: CountryUniversityLayer }) {
  const { t } = useLocale();
  const text = useBilingual();
  const date = useFormatDate();
  const lower = country.code.toLowerCase();
  const hasBd = layer.visaStats.some((s) => s.scope === 'bangladesh');
  return (
    <section id="visa-data" className="scroll-mt-6 space-y-5 border-t pt-10" aria-labelledby="visa-data-title" data-testid="visa-data">
      <div className="space-y-2">
        <h2 id="visa-data-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t('sa.book.unis.sections.visa')}
        </h2>
        <p className="text-[15px] leading-6 text-muted-foreground">{t('sa.book.unis.visaBody')}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {GUIDE_DEGREES.map((level) => (
          <Link key={level} href={`/abroad/countries/${lower}/degree/${level}#visa`} className="inline-flex h-9 items-center gap-1 rounded-full bg-muted px-3.5 text-sm text-foreground/80 hover:text-foreground" data-visa-link={level}>
            {t(`degree.${level}`)} <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        ))}
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-bold tracking-tight sm:text-xl">{t('sa.book.visaData.title')}</h3>
        <p className="text-sm leading-6 text-muted-foreground">{t('sa.book.visaData.note')}</p>
        {layer.visaStats.length === 0 && <p className="text-[15px] text-muted-foreground">{t('sa.book.visaData.none')}</p>}
        {layer.visaStats.map((s) => (
          <div key={s.id} className="space-y-2 rounded-2xl bg-muted/40 p-4 sm:p-5" data-visa-stat={s.id} data-scope={s.scope}>
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn('inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold', s.scope === 'bangladesh' ? 'bg-brand/10 text-brand' : 'bg-background text-foreground/80')}>{t(`sa.book.visaData.scope.${s.scope}`)}</span>
              <DataStatusTag status={s.status} />
            </div>
            <p className="font-semibold">{text(s.title)}</p>
            <p className="text-sm leading-6 text-foreground/80">{text(s.covers)}</p>
            <dl className="divide-y">
              {s.figures.map((f, i) => (
                <div key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 py-2">
                  <dt className="text-[15px] text-foreground/80">{text(f.label)}</dt>
                  <dd className="font-semibold tabular-nums">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-muted-foreground">
              {t('sa.book.visaData.period', { period: s.period })} · {t('sa.book.unis.lastVerified', { date: date(s.lastVerified) })}
            </p>
            <SectionSources sources={[s.source]} />
          </div>
        ))}
        {!hasBd && (
          <p className="text-sm text-muted-foreground" data-bd-data="not-verified">
            {t('sa.book.visaData.bdNone')}
          </p>
        )}
      </div>
    </section>
  );
}

/** Small external link used on the university page. */
export function OutLink({ href, children, testId }: { href: string; children: React.ReactNode; testId?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium break-all text-brand underline-offset-4 hover:underline" data-testid={testId}>
      {children} <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
    </a>
  );
}
