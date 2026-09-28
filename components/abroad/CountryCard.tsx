'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bookmark, BookmarkCheck, CheckCircle2, Star } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useBilingual } from './useBilingual';
import { countryHref, countryIndicators } from '@/lib/abroad/countries';
import type { Country } from '@/lib/models';
import { cn } from '@/lib/utils';

/** How wide a card image is drawn, so the browser downloads the right file (1 column on phones, 2 from sm, 3 from xl). */
const CARD_SIZES = '(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw';

/**
 * The country's photo, or a calm placeholder (flag on a tinted surface) until
 * one is added. Never a broken image, never stretched: the photo covers the
 * frame at a fixed ratio and keeps its landmark in view (object-position).
 */
export function CountryImage({ country, className, priority, sizes = CARD_SIZES }: { country: Country; className?: string; priority?: boolean; sizes?: string }) {
  const { t } = useLocale();
  const text = useBilingual();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const hero = country.hero;
  if (hero && !failed) {
    return (
      <figure className={cn('relative overflow-hidden bg-muted', className)} data-country-photo={country.code}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static assets with responsive srcSet */}
        <img
          src={hero.src}
          srcSet={hero.srcSet?.map((s) => `${s.src} ${s.width}w`).join(', ')}
          sizes={hero.srcSet ? sizes : undefined}
          width={hero.width}
          height={hero.height}
          alt={text(hero.alt)}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          ref={(el) => {
            // Already in the cache: no load event will fire.
            if (el?.complete && el.naturalWidth > 0 && !loaded) setLoaded(true);
          }}
          style={{ objectPosition: hero.position ?? 'center' }}
          className={cn(
            'size-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
        {/* A soft shade at the bottom so the photo meets the card calmly. */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" aria-hidden />
        {hero.license && (
          <figcaption className="absolute right-2 bottom-1.5 text-[10px] text-white/80 [text-shadow:0_1px_2px_rgb(0_0_0/0.5)]">
            {t('sa.card.photoCredit', { credit: hero.credit, license: hero.license })}
          </figcaption>
        )}
      </figure>
    );
  }
  return (
    <div className={cn('relative flex items-center justify-center overflow-hidden bg-muted', className)} data-placeholder>
      <span className="text-5xl leading-none opacity-90 select-none" aria-hidden>
        {country.flag}
      </span>
      <span className="absolute right-2.5 bottom-2 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">{t('sa.card.photoComing')}</span>
    </div>
  );
}

interface CountryCardProps {
  country: Country;
  shortlisted: boolean;
  dream: boolean;
  onToggleShortlist: () => void;
}

/**
 * One destination: the photo with a "Study in …" label, the name, a small
 * verified-facts indicator when there is sourced data, and Explore. The whole
 * card opens the country; shortlisting stays one small button.
 */
export function CountryCard({ country, shortlisted, dream, onToggleShortlist }: CountryCardProps) {
  const { t } = useLocale();
  const facts = countryIndicators(country).facts;
  const href = countryHref(country.code);
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border bg-card shadow-[0_1px_2px_rgb(15_23_42/0.04),0_8px_24px_-12px_rgb(15_23_42/0.12)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgb(15_23_42/0.06),0_16px_32px_-12px_rgb(15_23_42/0.2)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      data-country={country.code}
    >
      <div className="relative">
        <CountryImage country={country} className="aspect-[16/10]" />
        <span className="absolute top-3 left-3 inline-flex h-7 items-center rounded-full bg-white/90 px-3 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-sm" data-testid="study-in">
          {t('sa.landing.studyIn', { country: country.name })}
        </span>
        {dream && (
          <span className="absolute top-3 right-3 inline-flex h-7 items-center gap-1 rounded-full bg-brand px-2.5 text-xs font-semibold text-brand-foreground shadow-sm">
            <Star className="size-3.5" aria-hidden /> {t('sa.card.dream')}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight">
            <Link href={href} className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none">
              <span aria-hidden>{country.flag}</span> {country.name}
            </Link>
          </h3>
          {country.capital && <p className="text-sm text-muted-foreground">{country.capital}</p>}
        </div>
        {facts > 0 && (
          <p className="inline-flex w-fit items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-xs font-medium text-success" data-testid="card-verified">
            <CheckCircle2 className="size-3.5" aria-hidden /> {t('sa.landing.verifiedInfo', { n: facts })}
          </p>
        )}
        <div className="relative z-10 mt-auto flex items-center justify-between gap-2 pt-1">
          <Link href={href} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-semibold text-background transition-colors hover:bg-foreground/90">
            {t('sa.card.explore')} <ArrowRight className="size-4" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={onToggleShortlist}
            aria-pressed={shortlisted}
            aria-label={shortlisted ? t('sa.card.shortlisted') : t('sa.card.shortlist')}
            title={shortlisted ? t('sa.card.shortlisted') : t('sa.card.shortlist')}
            className={cn(
              'grid size-10 place-items-center rounded-full border transition-colors',
              shortlisted ? 'border-brand/30 bg-brand-soft text-brand' : 'bg-card text-muted-foreground hover:border-foreground/20 hover:text-foreground',
            )}
          >
            {shortlisted ? <BookmarkCheck className="size-4" aria-hidden /> : <Bookmark className="size-4" aria-hidden />}
          </button>
        </div>
      </div>
    </article>
  );
}
