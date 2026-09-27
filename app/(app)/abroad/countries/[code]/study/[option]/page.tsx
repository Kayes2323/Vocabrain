'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowRight, ChevronLeft, ExternalLink, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScreenSkeleton } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { formatMoney, useFormatDate } from '@/components/abroad/FactRow';
import { factSources, GuideBlocks, NotVerified, SectionSources, SourceLinks } from '@/components/abroad/GuideBlocks';
import { useBilingual } from '@/components/abroad/useBilingual';
import { countryHref } from '@/lib/abroad/countries';
import { blockSources, GUIDE_SECTIONS, guideSectionVerified, programGuide, shortSourceName, studyOptionName, type GuideSectionId } from '@/lib/abroad/study-options';
import { getCountry } from '@/lib/content/countries';
import { formatIntake } from '@/lib/engine';
import type { SourceRef } from '@/lib/models';

/**
 * Explore → Country → Study option: one complete, readable guide. Everything
 * comes from the country's verified data, filtered to this option; anything
 * not verified says so. Information, not a checklist.
 */
export default function StudyOptionPage() {
  const { code, option: optionId } = useParams<{ code: string; option: string }>();
  const { t, locale } = useLocale();
  const text = useBilingual();
  const date = useFormatDate();
  const { profile } = useProfile();
  const country = getCountry(code ?? '');
  if (!country) notFound();
  if (!profile) return <ScreenSkeleton />;
  const guide = programGuide(country, optionId ?? '', profile.abroad);
  if (!guide) notFound();

  const { option } = guide;
  const name = studyOptionName(option, t, locale, country.name);
  const lower = country.code.toLowerCase();
  const a = profile.abroad;
  const mine = option.degreeLevel && a.degreeLevel === option.degreeLevel;
  const goal = [a.degreeLevel ? t(`degree.${a.degreeLevel}`) : undefined, a.subject, formatIntake(a)].filter(Boolean).join(' · ');
  const visaCodes = guide.visaCategories.map((c) => c.code).join(', ');

  // Verified-or-not per section (documents and money have their own content).
  const verified = (id: GuideSectionId) =>
    id === 'documents'
      ? guide.documents.some((d) => d.requirements.length) || guideSectionVerified(guide.sections.documents)
      : id === 'finances'
        ? guide.fundsOfficial.length > 0 || guideSectionVerified(guide.sections.finances)
        : id === 'costs'
          ? guide.costGroups.some((g) => g.official.length || g.estimates.length) || guideSectionVerified(guide.sections.costs)
          : id === 'overview'
            ? Boolean(option.pathway?.description)
            : guideSectionVerified(guide.sections[id]);
  const withInfo = GUIDE_SECTIONS.filter(verified).length;

  const required = guide.documents.filter((d) => !d.generalOnly);
  const general = guide.documents.filter((d) => d.generalOnly);
  const costGroups = guide.costGroups.filter((g) => g.official.length || g.officialPending.length || g.estimates.length || g.mine);

  // The sources behind what a section shows: one small link at its end (the full list is at the bottom).
  const sectionSources = (id: GuideSectionId): SourceRef[] => [
    ...blockSources(guide.sections[id]),
    ...(id === 'visa' ? Object.values(guide.visaNames).flatMap((n) => (n ? [n.source] : [])) : []),
    ...(id === 'documents' ? required.flatMap((d) => d.requirements.map((r) => r.source)) : []),
    ...(id === 'finances' ? guide.fundsOfficial.map((o) => o.cost.amount.source) : []),
    ...(id === 'costs' ? costGroups.flatMap((g) => g.official.map((o) => o.cost.amount.source)) : []),
  ];

  const Section = ({ id, children }: { id: GuideSectionId | 'sources'; children: ReactNode }) => (
    <section id={id} className="scroll-mt-20 space-y-4 border-t pt-8" data-guide-section={id} data-verified={id === 'sources' ? undefined : String(verified(id as GuideSectionId))}>
      <h2 className="text-xl font-semibold tracking-tight">{t(`sa.guide.sections.${id}`)}</h2>
      {children}
      {id !== 'sources' && <SectionSources sources={sectionSources(id)} lastVerified={id === 'documents' || id === 'finances' || id === 'costs' || id === 'visa' ? undefined : factSources(guide.sections[id].flatMap((b) => b.facts)).lastVerified} />}
    </section>
  );

  return (
    <article className="mx-auto max-w-3xl space-y-8 pb-10" data-testid="study-guide" data-option={option.id}>
      <header className="space-y-4">
        <Link href={countryHref(country.code)} className="-ml-1 inline-flex h-9 items-center gap-1 rounded-lg pr-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ChevronLeft className="size-4" aria-hidden /> {t('sa.guide.back', { country: country.name })}
        </Link>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <span aria-hidden>{country.flag}</span> {country.name}
            {option.pathway && option.degreeLevel ? ` · ${text(option.pathway.name)}` : ''}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-balance">{t('sa.guide.title', { country: country.name, option: name })}</h1>
          {visaCodes && <p className="text-[15px] font-medium text-brand">{t('sa.guide.visaLine', { code: visaCodes })}</p>}
        </div>
        {mine && goal && (
          <p className="rounded-xl bg-brand-soft/60 px-4 py-3 text-sm" data-testid="guide-for-you">
            {t('sa.guide.forYou', { goal })}
          </p>
        )}
        <p className="text-xs text-muted-foreground">{t('sa.guide.summary', { n: withInfo, total: GUIDE_SECTIONS.length })}</p>
        <nav aria-label={t('sa.guide.contents')} className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {[...GUIDE_SECTIONS, 'sources' as const].map((id) => (
            <a key={id} href={`#${id}`} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
              {t(`sa.guide.sections.${id}`)}
            </a>
          ))}
        </nav>
      </header>

      <Section id="overview">
        {option.pathway?.description ? (
          <p className="text-[17px] leading-relaxed">{text(option.pathway.description)}</p>
        ) : (
          <p className="text-[17px] leading-relaxed">{t('sa.guide.generalBody')}</p>
        )}
        <GuideBlocks blocks={guide.sections.overview} />
      </Section>

      <Section id="who">
        <GuideBlocks blocks={guide.sections.who} showTitles />
      </Section>

      <Section id="study">
        <GuideBlocks blocks={guide.sections.study} showTitles />
        {option.pathway?.kind !== 'language' && (
          <Link href={`/abroad/universities?country=${lower}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
            {t('sa.guide.findPrograms')} <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </Section>

      <Section id="admission">
        <GuideBlocks blocks={guide.sections.admission} showTitles />
      </Section>

      <Section id="language">
        <GuideBlocks blocks={guide.sections.language} showTitles />
      </Section>

      <Section id="visa">
        {guide.visaCategories.map((c) => {
          const official = guide.visaNames[c.id];
          return (
            <div key={c.id} className="space-y-1.5" data-visa={c.code}>
              <p className="text-lg font-semibold">
                {c.code} · {official ? official.value : text(c.name)}
              </p>
              <p className="text-[15px] leading-relaxed text-foreground/85">{t('sa.guide.visaIntro', { code: c.code })}</p>
            </div>
          );
        })}
        <GuideBlocks blocks={guide.sections.visa} showTitles />
      </Section>

      <Section id="documents">
        <p className="text-[15px] text-foreground/85">{t('sa.guide.docsIntro')}</p>
        {required.length > 0 ? (
          <ul className="divide-y rounded-2xl border bg-card" data-testid="guide-documents">
            {required.map((d) => (
              <li key={d.kind} className="space-y-2 px-4 py-4" data-guide-doc={d.kind} data-verified={String(d.requirements.length > 0)}>
                <p className="flex items-center gap-2 font-semibold">
                  <FileText className="size-4 text-muted-foreground" aria-hidden /> {t(`sa.docKinds.${d.kind}`)}
                </p>
                <dl className="grid gap-x-4 gap-y-1 text-sm sm:grid-cols-[9rem_minmax(0,1fr)]">
                  <dt className="text-muted-foreground">{t('sa.docs2.why')}</dt>
                  <dd>{d.purposes.map((p) => t(`sa.docs2.purposes.${p}`)).join(' · ')}</dd>
                  {d.askedBy.length > 0 && (
                    <>
                      <dt className="text-muted-foreground">{t('sa.docs2.who')}</dt>
                      <dd>{[...new Set(d.askedBy.map((w) => t(`sa.docs2.sources.${w.from}`, { name: w.from === 'country' ? country.name : (w.name ?? '') })))].join(' · ')}</dd>
                    </>
                  )}
                  {d.submittedTo.length > 0 && (
                    <>
                      <dt className="text-muted-foreground">{t('sa.docs2.where')}</dt>
                      <dd>{[...new Set(d.submittedTo.map((s) => text(s)))].join(' · ')}</dd>
                    </>
                  )}
                </dl>
                {d.requirements.length > 0 ? (
                  d.requirements.map((r, i) => (
                    <div key={i} className="space-y-1 rounded-lg bg-muted/50 px-3 py-2">
                      <p className="text-xs font-medium text-muted-foreground">{t('sa.docs2.official')}</p>
                      <p className="text-sm leading-relaxed">{r.value}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">{t('sa.docs2.notVerified')}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <NotVerified />
        )}
        {general.length > 0 && (
          <div className="space-y-1" data-testid="guide-documents-general">
            <p className="text-sm font-medium">{t('sa.guide.docsGeneralTitle')}</p>
            <p className="text-sm text-muted-foreground">
              {general.map((d) => t(`sa.docKinds.${d.kind}`)).join(', ')} — {t('sa.guide.docsGeneralBody')}
            </p>
          </div>
        )}
        <GuideBlocks blocks={guide.sections.documents} showTitles />
      </Section>

      <Section id="finances">
        <p className="text-[15px] text-foreground/85">{t('sa.guide.fundsIntro')}</p>
        {guide.fundsOfficial.map((o) => (
          <div key={o.cost.id} className="space-y-1" data-official-cost={o.cost.id}>
            <p className="text-xs font-medium text-muted-foreground">{text(o.cost.label)}</p>
            <p className="text-[15px]">
              {formatMoney(o.cost.amount.value)} · {t(`sa.cost.per.${o.cost.amount.value.period}`)}
            </p>
          </div>
        ))}
        {guide.fundsOfficial.length === 0 && !guideSectionVerified(guide.sections.finances) ? (
          <NotVerified text={t('sa.guide.fundsNotVerified')} links={guide.sections.finances.flatMap((b) => b.links)} />
        ) : (
          <GuideBlocks blocks={guide.sections.finances} showTitles />
        )}
      </Section>

      <Section id="costs">
        <p className="text-[15px] text-foreground/85">{t('sa.guide.costsIntro')}</p>
        {costGroups.length > 0 ? (
          <div className="space-y-5">
            {costGroups.map((g) => (
              <div key={g.group} className="space-y-2" data-cost-group={g.group}>
                <h3 className="font-semibold">{t(`sa.cost.groups.${g.group}`)}</h3>
                <dl className="grid gap-x-4 gap-y-2 text-sm sm:grid-cols-[8rem_minmax(0,1fr)]">
                  <dt className="font-medium text-success">{t('sa.cost.official')}</dt>
                  <dd className="space-y-1">
                    {g.official.length ? (
                      g.official.map((o) => (
                        <div key={o.cost.id}>
                          <p>
                            {text(o.cost.label)}: {formatMoney(o.cost.amount.value)} · {t(`sa.cost.per.${o.cost.amount.value.period}`)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <span className="text-muted-foreground">{t('sa.cost.notVerified')}</span>
                    )}
                  </dd>
                  <dt className="font-medium text-brand">{t('sa.cost.estimate')}</dt>
                  <dd>
                    {g.estimateYear ? (
                      <span>
                        {g.estimateYear.currency} {g.estimateYear.low.toLocaleString('en-US')}–{g.estimateYear.high.toLocaleString('en-US')} · {t('sa.cost.per.year')}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">{t('sa.cost.noEstimate')}</span>
                    )}
                    {g.estimates.map((e) => (
                      <p key={e.id} className="text-xs text-muted-foreground">
                        {t('sa.cost.basis')}: {text(e.basis)}
                      </p>
                    ))}
                  </dd>
                  <dt className="font-medium">{t('sa.cost.mine')}</dt>
                  <dd>{g.mine ? `${formatMoney(g.mine)} · ${t(`sa.cost.per.${g.mine.period}`)}` : <span className="text-muted-foreground">{t('sa.cost.notSet')}</span>}</dd>
                </dl>
                <SourceLinks links={g.officialPending} label={t('sa.guide.officialPages')} />
              </div>
            ))}
          </div>
        ) : (
          !guideSectionVerified(guide.sections.costs) && <NotVerified />
        )}
        {guideSectionVerified(guide.sections.costs) && <GuideBlocks blocks={guide.sections.costs} showTitles />}
        <Button asChild variant="outline" className="h-11">
          <Link href={`/abroad/cost?country=${lower}`}>
            {t('sa.guide.planBudget')} <ArrowRight />
          </Link>
        </Button>
      </Section>

      <Section id="application">
        <GuideBlocks blocks={guide.sections.application} showTitles />
      </Section>

      <Section id="visa-application">
        <GuideBlocks blocks={guide.sections['visa-application']} showTitles />
        {guide.visaCategories.length > 0 && (
          <Link href={`/abroad/visa/${lower}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
            {t('sa.guide.openVisa')} <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </Section>

      <Section id="after-admission">
        <GuideBlocks blocks={guide.sections['after-admission']} showTitles />
      </Section>

      <Section id="before-departure">
        <GuideBlocks blocks={guide.sections['before-departure']} showTitles />
      </Section>

      <Section id="notes">
        <GuideBlocks blocks={guide.sections.notes} showTitles />
        <p className="text-sm text-muted-foreground">{t('sa.visa.warning')}</p>
      </Section>

      <Section id="sources">
        <p className="text-sm text-muted-foreground">{t('sa.guide.sourcesIntro')}</p>
        {guide.sources.length ? (
          <ul className="space-y-2.5" data-testid="guide-sources">
            {guide.sources.map(({ source: s, lastVerified }) => (
              <li key={s.url ?? s.name} className="flex gap-2 text-[15px]">
                <span aria-hidden className="text-muted-foreground">•</span>
                <span className="min-w-0">
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 font-medium text-brand" title={s.name}>
                      {shortSourceName(s.name)} <ExternalLink className="mt-1 size-3.5 shrink-0" aria-hidden />
                    </a>
                  ) : (
                    <span>{shortSourceName(s.name)}</span>
                  )}
                  {lastVerified && <span className="block text-xs text-muted-foreground">{t('sa.guide.checked', { date: date(lastVerified) })}</span>}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <NotVerified />
        )}
      </Section>

      <Link
        href={`/mino?${new URLSearchParams({ ask: 'abroad-option', country: lower, option: option.id })}`}
        className="inline-flex items-center gap-2 border-t pt-6 text-sm font-medium text-brand"
        data-testid="guide-ask-mino"
      >
        <Sparkles className="size-4" aria-hidden /> {t('sa.guide.askMino')}
      </Link>
    </article>
  );
}

