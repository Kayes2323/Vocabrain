'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useFormatDate } from '@/components/abroad/FactRow';
import { useBilingual } from '@/components/abroad/useBilingual';
import { SectionSources } from '@/components/abroad/guide/GuideParts';
import { GUIDE_DEGREES } from '@/lib/abroad/guides';
import type { ProgramProfile, UniversityProfile } from '@/lib/abroad/university-layer';
import { countryHref } from '@/lib/abroad/countries';
import type { Country, SourceRef } from '@/lib/models';
import { DataStatusTag, IntakeFact, OutLink, RankLine, SourcedFact, uniqueSources } from './UniParts';

function Section({ id, title, sources, children }: { id: string; title: string; sources: SourceRef[]; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6 space-y-5 border-t pt-8" aria-labelledby={`${id}-title`} data-uni-section={id}>
      <h2 id={`${id}-title`} className="text-2xl font-bold tracking-tight">
        {title}
      </h2>
      {children}
      <SectionSources sources={uniqueSources(sources)} />
    </section>
  );
}

function ProgramCard({ p }: { p: ProgramProfile }) {
  const { t } = useLocale();
  const text = useBilingual();
  const date = useFormatDate();
  return (
    <article className="min-w-0 space-y-4 rounded-3xl border bg-card p-5" data-program={p.id} data-program-level={p.level}>
      <div className="space-y-1.5">
        <h4 className="text-lg font-bold tracking-tight break-words">{p.title}</h4>
        <p className="text-sm text-muted-foreground">
          {[t(`sa.book.unis.levels.${p.level}`), p.duration && text(p.duration), p.englishOnly ? t('sa.book.unis.englishOnly') : t('sa.book.unis.mixed')].filter(Boolean).join(' · ')}
        </p>
      </div>
      <dl className="grid gap-x-4 gap-y-1 text-[15px] leading-6 sm:grid-cols-[9rem_1fr]">
        {p.faculty && (
          <>
            <dt className="font-medium text-muted-foreground">{t('sa.book.unis.facts.faculty')}</dt>
            <dd>{p.faculty}</dd>
          </>
        )}
        <dt className="font-medium text-muted-foreground">{t('sa.book.unis.facts.language')}</dt>
        <dd>{text(p.languages)}</dd>
        {p.applyVia && (
          <>
            <dt className="font-medium text-muted-foreground">{t('sa.book.unis.facts.applyVia')}</dt>
            <dd>{text(p.applyVia)}</dd>
          </>
        )}
      </dl>
      <div className="space-y-4">
        <SourcedFact id="tuition" label={t('sa.book.unis.facts.tuition')} fact={p.tuition} />
        <SourcedFact id="deadline" label={t('sa.book.unis.facts.deadlines')} fact={p.deadline} />
        <IntakeFact intake={p.nextIntake} />
        <SourcedFact id="requirements" label={t('sa.book.unis.facts.requirements')} fact={p.requirements} />
        <SourcedFact id="english" label={t('sa.book.unis.facts.english')} fact={p.english} />
        {p.documents && <SourcedFact id="documents" label={t('sa.book.unis.facts.documents')} fact={p.documents} />}
      </div>
      <OutLink href={p.url}>{t('sa.book.unis.facts.programPage')}</OutLink>
      <p className="text-xs text-muted-foreground">{t('sa.book.unis.lastVerified', { date: date(p.lastVerified) })}</p>
      <SectionSources sources={uniqueSources(p.sources)} />
    </article>
  );
}

/** One university: overview → programs → fees → dates → requirements → documents → scholarships → how to apply → visa. */
export function UniversityView({ country, uni }: { country: Country; uni: UniversityProfile }) {
  const { t } = useLocale();
  const text = useBilingual();
  const date = useFormatDate();
  const lower = country.code.toLowerCase();
  const sections = ['overview', 'programs', 'fees', 'dates', 'requirements', 'documents', 'scholarships', 'apply', 'visa'] as const;
  const programSources = uni.programs.flatMap((p) => p.sources);
  const visaLevel = uni.programs[0]?.level ?? 'masters';

  return (
    <article className="mx-auto max-w-3xl space-y-10 pb-8" data-testid="university-page" data-university-page={uni.id}>
      <header className="space-y-5">
        <Link href={`${countryHref(country.code)}#universities`} className="inline-flex h-10 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden /> {t('sa.book.unis.back', { country: country.name })}
        </Link>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-balance break-words sm:text-4xl">{uni.name}</h1>
          <p className="text-muted-foreground">
            <span aria-hidden>{country.flag}</span> {uni.city}, {country.name} · {t(`sa.book.unis.${uni.ownership}`)}
          </p>
          <RankLine ranking={uni.ranking} className="text-brand" />
        </div>
        <nav aria-label={t('sa.book.onThisPage')} className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <a key={s} href={`#${s}`} className="inline-flex h-9 items-center rounded-full bg-muted px-3.5 text-sm text-foreground/80 hover:text-foreground">
              {t(`sa.book.unis.sections.${s}`)}
            </a>
          ))}
        </nav>
      </header>

      <Section id="overview" title={t('sa.book.unis.sections.overview')} sources={[{ name: `${uni.ranking.provider} ${uni.ranking.year}`, url: uni.ranking.sourceUrl, sourceType: 'ranking-publisher' }]}>
        <p className="text-lg leading-8 text-foreground/85">{text(uni.overview)}</p>
        <dl className="grid gap-x-4 gap-y-2 text-[15px] leading-6 sm:grid-cols-[11rem_1fr]">
          <dt className="font-medium text-muted-foreground">{t('sa.book.unis.facts.location')}</dt>
          <dd>
            {uni.city}, {country.name}
          </dd>
          <dt className="font-medium text-muted-foreground">{t('sa.book.unis.facts.type')}</dt>
          <dd>{t(`sa.book.unis.${uni.ownership}`)}</dd>
          <dt className="font-medium text-muted-foreground">{t('sa.book.unis.facts.ranking')}</dt>
          <dd>
            <RankLine ranking={uni.ranking} className="font-normal" />
          </dd>
          {uni.areas && (
            <>
              <dt className="font-medium text-muted-foreground">{t('sa.book.unis.facts.areas')}</dt>
              <dd>{text(uni.areas)}</dd>
            </>
          )}
          <dt className="font-medium text-muted-foreground">{t('sa.book.unis.facts.site')}</dt>
          <dd className="min-w-0">
            <OutLink href={uni.officialUrl} testId="uni-official">
              {uni.officialUrl.replace(/^https:\/\//, '').replace(/\/$/, '')}
            </OutLink>
          </dd>
          {uni.admissionsUrl && (
            <>
              <dt className="font-medium text-muted-foreground">{t('sa.book.unis.facts.admissions')}</dt>
              <dd className="min-w-0">
                <OutLink href={uni.admissionsUrl}>{t('sa.book.unis.facts.admissions')}</OutLink>
              </dd>
            </>
          )}
        </dl>
      </Section>

      <Section id="programs" title={t('sa.book.unis.sections.programs')} sources={programSources}>
        {GUIDE_DEGREES.map((level) => {
          const list = uni.programs.filter((p) => p.level === level);
          return (
            <div key={level} className="space-y-3" data-program-group={level}>
              <h3 className="text-lg font-bold tracking-tight">{t(`sa.book.unis.levels.${level}`)}</h3>
              {list.length ? list.map((p) => <ProgramCard key={p.id} p={p} />) : <p className="text-[15px] text-muted-foreground">{t('sa.book.unis.noLevel', { level: t(`sa.book.unis.levels.${level}`) })}</p>}
            </div>
          );
        })}
      </Section>

      <Section id="fees" title={t('sa.book.unis.sections.fees')} sources={[...uni.tuition.sources, ...(uni.semesterFee?.sources ?? []), ...uni.applicationFee.sources]}>
        <SourcedFact id="uni-tuition" label={t('sa.book.unis.facts.tuition')} fact={uni.tuition} />
        {uni.semesterFee && <SourcedFact id="semester-fee" label={t('sa.book.unis.facts.semesterFee')} fact={uni.semesterFee} />}
        <SourcedFact id="app-fee" label={t('sa.book.unis.facts.appFee')} fact={uni.applicationFee} />
        <p className="text-xs text-muted-foreground">{t('sa.book.cost.noConvert')}</p>
      </Section>

      <Section id="dates" title={t('sa.book.unis.sections.dates')} sources={[...uni.deadlines.sources, ...uni.nextIntake.sources]}>
        <SourcedFact id="uni-deadlines" label={t('sa.book.unis.facts.deadlines')} fact={uni.deadlines} />
        <IntakeFact intake={uni.nextIntake} />
      </Section>

      <Section id="requirements" title={t('sa.book.unis.sections.requirements')} sources={[...uni.admission.sources, ...uni.english.sources]}>
        <SourcedFact id="admission" label={t('sa.book.unis.facts.admission')} fact={uni.admission} />
        <SourcedFact id="uni-english" label={t('sa.book.unis.facts.english')} fact={uni.english} />
      </Section>

      <Section id="documents" title={t('sa.book.unis.sections.documents')} sources={uni.documents.sources}>
        <DataStatusTag status={uni.documents.status} />
        {uni.documents.required.length === 0 && uni.documents.mayBeRequired.length === 0 ? (
          <p className="text-[15px] text-muted-foreground">{t('sa.book.unis.docsNone')}</p>
        ) : (
          <div className="space-y-4">
            {(
              [
                ['required', uni.documents.required],
                ['maybe', uni.documents.mayBeRequired],
              ] as const
            ).map(([k, list]) =>
              list.length ? (
                <div key={k} className="space-y-1.5" data-doc-kind={k}>
                  <p className="text-[15px] font-semibold">{t(`sa.book.unis.docs.${k}`)}</p>
                  <ul className="space-y-1.5 pl-1 text-[15px] leading-7 text-foreground/85">
                    {list.map((d, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-brand/70" aria-hidden />
                        <span>{text(d)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null,
            )}
            {uni.programs.some((p) => p.documents) && <p className="text-sm text-muted-foreground">{t('sa.book.unis.docs.program')}: {uni.programs.filter((p) => p.documents).map((p) => p.title).join(', ')}</p>}
          </div>
        )}
      </Section>

      <Section id="scholarships" title={t('sa.book.unis.sections.scholarships')} sources={uni.scholarships.sources}>
        <SourcedFact id="scholarships" label={t('sa.book.unis.sections.scholarships')} fact={uni.scholarships} />
      </Section>

      <Section id="apply" title={t('sa.book.unis.sections.apply')} sources={[...uni.applicationRoute.sources, ...uni.steps.sources]}>
        <SourcedFact id="route" label={t('sa.book.unis.facts.route')} fact={uni.applicationRoute} />
        {uni.steps.items.length ? (
          <div className="space-y-2">
            <DataStatusTag status={uni.steps.status} />
            <ol className="space-y-4" data-testid="apply-steps">
              {uni.steps.items.map((s, i) => (
                <li key={i} className="flex gap-4" data-step={i + 1}>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand tabular-nums">{i + 1}</span>
                  <div className="min-w-0 space-y-1">
                    <p className="font-semibold">{text(s.title)}</p>
                    <p className="text-[15px] leading-7 text-foreground/85">{text(s.body)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p className="text-[15px] text-muted-foreground" data-testid="apply-steps-none">
            {t('sa.book.unis.stepsNone')}
          </p>
        )}
      </Section>

      <section id="visa" className="scroll-mt-6 space-y-4 border-t pt-8" aria-labelledby="visa-title" data-uni-section="visa">
        <h2 id="visa-title" className="text-2xl font-bold tracking-tight">
          {t('sa.book.unis.sections.visa')}
        </h2>
        <p className="text-[16px] leading-7 text-foreground/85">{t('sa.book.unis.visaBody')}</p>
        <Link href={`/abroad/countries/${lower}/degree/${visaLevel}#visa`} className="inline-flex items-center gap-1 text-sm font-semibold text-brand" data-testid="uni-visa-link">
          {t('sa.book.unis.visaLink', { country: country.name })} <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>

      <p className="border-t pt-6 text-xs text-muted-foreground" data-testid="uni-last-verified">
        {t('sa.book.checked', { date: date(uni.lastVerified) })}
      </p>
    </article>
  );
}
