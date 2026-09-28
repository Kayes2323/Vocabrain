'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { CountryImage } from '@/components/abroad/CountryCard';
import { useBilingual } from '@/components/abroad/useBilingual';
import { GUIDE_DEGREES, guideSources, type CountryGuide } from '@/lib/abroad/guides';
import { countryHref } from '@/lib/abroad/countries';
import type { Country } from '@/lib/models';
import { AnswerBody, AnswerTags, Discrepancy, GuideQA, GuideSources, SectionSources } from './GuideParts';

/** The country guide: a short introduction, the overview, the degree choice and the most asked questions. */
export function CountryGuideView({ country, guide }: { country: Country; guide: CountryGuide }) {
  const { t } = useLocale();
  const text = useBilingual();
  const lower = country.code.toLowerCase();
  const sections = [
    { id: 'overview', label: t('sa.book.overview') },
    { id: 'degrees', label: t('sa.book.degrees') },
    { id: 'questions', label: t('sa.book.faq') },
    ...(guide.life ? [{ id: 'living', label: t('sa.book.life', { country: country.name }) }] : []),
  ];
  const per = guide.sourcesPerSection;

  return (
    <article className="mx-auto max-w-3xl space-y-10 pb-8 sm:space-y-12" data-testid="country-guide" data-country-guide={country.code}>
      <header className="space-y-6">
        <Link href="/abroad" className="inline-flex h-10 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden /> {t('sa.home.title')}
        </Link>
        <CountryImage country={country} priority sizes="(min-width: 1024px) 768px, 100vw" className="aspect-[16/9] rounded-3xl" />
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            <span aria-hidden>{country.flag}</span> {t('sa.landing.studyIn', { country: country.name })}
          </h1>
          <p className="text-lg leading-8 text-foreground/80">{text(guide.intro)}</p>
        </div>
        <nav aria-label={t('sa.book.onThisPage')} className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="inline-flex h-9 items-center rounded-full bg-muted px-3.5 text-sm text-foreground/80 hover:text-foreground">
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      <section id="overview" className="scroll-mt-6 space-y-8" aria-labelledby="overview-title" data-testid="guide-overview">
        <h2 id="overview-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t('sa.book.overview')}
        </h2>
        {guide.overview.map((a) => (
          <GuideQA key={a.id} answer={a} />
        ))}
        {per && <SectionSources sources={guideSources(guide.overview)} />}
      </section>

      <section id="degrees" className="scroll-mt-6 space-y-5 border-t pt-10" aria-labelledby="degrees-title" data-testid="guide-degrees">
        <h2 id="degrees-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t('sa.book.degrees')}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {GUIDE_DEGREES.map((level) => (
            <Link
              key={level}
              href={`/abroad/countries/${lower}/degree/${level}`}
              className="group flex min-h-32 flex-col justify-between gap-4 rounded-3xl border bg-card p-5 shadow-[0_1px_2px_rgb(15_23_42/0.04),0_8px_24px_-12px_rgb(15_23_42/0.12)] transition-shadow hover:shadow-[0_2px_4px_rgb(15_23_42/0.06),0_16px_32px_-12px_rgb(15_23_42/0.2)]"
              data-degree={level}
            >
              <div className="space-y-1">
                <p className="text-xl font-bold tracking-tight">{t(`degree.${level}`)}</p>
                <p className="text-sm text-muted-foreground">{text(guide.degrees[level].card)}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                {t('sa.book.readGuide')} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="questions" className="scroll-mt-6 space-y-8 border-t pt-10" aria-labelledby="questions-title" data-testid="guide-faq">
        <h2 id="questions-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t('sa.book.faq')}
        </h2>
        {guide.faqs.map((a) => (
          <div key={a.id} className="space-y-3 border-l-[3px] border-brand/60 pl-4 sm:pl-5" data-faq={a.id}>
            <div className="space-y-2">
              <h3 className="text-lg font-bold tracking-tight text-balance sm:text-xl">{text(a.q)}</h3>
              <AnswerTags answer={a} />
            </div>
            <AnswerBody a={a.a} list={a.list} />
            <Discrepancy note={a.discrepancy} />
          </div>
        ))}
        {per && <SectionSources sources={guideSources(guide.faqs)} />}
      </section>

      {guide.life && (
        <section id="living" className="scroll-mt-6 space-y-8 border-t pt-10" aria-labelledby="living-title" data-testid="guide-life">
          <h2 id="living-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t('sa.book.life', { country: country.name })}
          </h2>
          {guide.life.map((a) => (
            <GuideQA key={a.id} answer={a} />
          ))}
          {per && <SectionSources sources={guideSources(guide.life)} />}
        </section>
      )}

      <Link
        href={`${countryHref(country.code)}/hub`}
        className="flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-sm font-medium hover:bg-muted/50"
        data-testid="guide-more"
      >
        {t('sa.book.more')} <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
      </Link>

      <GuideSources sources={guideSources([...guide.overview, ...guide.faqs, ...(guide.life ?? [])])} checkedAt={guide.checkedAt} />
    </article>
  );
}
