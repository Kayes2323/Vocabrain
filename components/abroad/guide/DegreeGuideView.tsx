'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useBilingual } from '@/components/abroad/useBilingual';
import { degreeAnswers, GUIDE_DEGREES, guideSources, isAnswer, type CountryGuide, type GuideDegree, type GuideItem } from '@/lib/abroad/guides';
import { scholarshipsFor } from '@/lib/content/scholarships';
import { PROGRAMS, universitiesIn } from '@/lib/content/universities';
import type { Country, SourceRef } from '@/lib/models';
import { cn } from '@/lib/utils';
import { CostBreakdown, GuideQA, GuideScholarships, GuideSources, GuideUniversities } from './GuideParts';

/** One degree in one country, as a long read: bold questions, answers right below, sources at the end. */
export function DegreeGuideView({ country, guide, level }: { country: Country; guide: CountryGuide; level: GuideDegree }) {
  const { t } = useLocale();
  const text = useBilingual();
  const degree = guide.degrees[level];
  const lower = country.code.toLowerCase();
  const degreeName = t(`degree.${level}`);

  // Sources of the registry data this page shows (universities, their programs, scholarships).
  const unis = universitiesIn(country.code);
  const registrySources: SourceRef[] = [
    ...scholarshipsFor(country.code)
      .filter((s) => s.countryCode === country.code && s.degreeLevels.includes(level))
      .flatMap((s) => [s.coverage?.source, s.requirements?.source].filter((x): x is SourceRef => Boolean(x))),
    ...unis.flatMap((u) => [u.ownership?.source, u.officialSource].filter((x): x is SourceRef => Boolean(x))),
    ...PROGRAMS.filter((p) => p.degreeLevel === level && unis.some((u) => u.id === p.universityId)).flatMap((p) => (p.officialSource ? [p.officialSource] : [])),
  ];

  const item = (it: GuideItem, i: number) => {
    if (isAnswer(it)) return <GuideQA key={it.id} answer={it} />;
    if (it.embed === 'costs') return <CostBreakdown key={`costs-${i}`} costs={degree.costs} />;
    if (it.embed === 'universities') return <GuideUniversities key={`unis-${i}`} code={country.code} level={level} />;
    return <GuideScholarships key={`sch-${i}`} code={country.code} level={level} />;
  };

  return (
    <article className="mx-auto max-w-3xl space-y-10 pb-8" data-testid="degree-guide" data-degree-guide={level}>
      <header className="space-y-5">
        <Link href={`/abroad/countries/${lower}`} className="inline-flex h-10 items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden /> {t('sa.book.backCountry', { country: country.name })}
        </Link>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            <span aria-hidden>{country.flag}</span> {t('sa.book.degreeIn', { degree: degreeName, country: country.name })}
          </h1>
          <p className="text-lg leading-8 text-foreground/80">{text(degree.intro)}</p>
        </div>
        <nav aria-label={t('sa.book.onThisPage')} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {degree.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="inline-flex h-9 items-center rounded-full bg-muted px-3.5 text-sm whitespace-nowrap text-foreground/80 hover:text-foreground">
                {text(s.title)}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {degree.sections.map((s, i) => (
        <section key={s.id} id={s.id} className={cn('scroll-mt-6 space-y-8', i > 0 && 'border-t pt-10')} aria-labelledby={`${s.id}-title`} data-guide-section={s.id}>
          <h2 id={`${s.id}-title`} className="text-2xl font-bold tracking-tight sm:text-3xl">
            {text(s.title)}
          </h2>
          {s.items.map(item)}
        </section>
      ))}

      <nav aria-label={t('sa.book.otherDegrees')} className="space-y-3 border-t pt-8">
        <p className="text-sm font-semibold">{t('sa.book.otherDegrees')}</p>
        <div className="flex flex-wrap gap-2">
          {GUIDE_DEGREES.filter((d) => d !== level).map((d) => (
            <Link key={d} href={`/abroad/countries/${lower}/degree/${d}`} className="inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium hover:bg-muted/50">
              {t('sa.book.degreeIn', { degree: t(`degree.${d}`), country: country.name })}
            </Link>
          ))}
        </div>
      </nav>

      <GuideSources sources={guideSources(degreeAnswers(degree), [...degree.costs.official, ...degree.costs.estimates], registrySources)} checkedAt={guide.checkedAt} />
    </article>
  );
}
