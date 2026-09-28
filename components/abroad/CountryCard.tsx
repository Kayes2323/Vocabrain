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

/** One destination: image, name, what is verified, and two actions (explore, shortlist). */
export function CountryCard({ country, shortlisted, dream, onToggleShortlist }: CountryCardProps) {
  const { t } = useLocale();
  const text = useBilingual();
  const ind = countryIndicators(country);
  const href = countryHref(country.code);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-foreground/20" data-country={country.code}>
      <Link href={href} className="block" tabIndex={-1} aria-hidden>
        <CountryImage country={country} className="aspect-[16/8] sm:aspect-[16/9]" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight">
              <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
                <span aria-hidden>{country.flag}</span> {country.name}
              </Link>
            </h3>
            {country.capital && <p className="text-xs text-muted-foreground">{country.capital}</p>}
          </div>
          {dream && (
            <span className="inline-flex h-6 shrink-0 items-center gap-1 rounded-full bg-brand-soft px-2 text-xs font-medium text-brand">
              <Star className="size-3" aria-hidden /> {t('sa.card.dream')}
            </span>
          )}
        </div>
        {country.tagline && <p className="text-sm text-muted-foreground">{text(country.tagline)}</p>}
        <div className="flex flex-wrap gap-1.5">
          {ind.verified.length > 0 ? (
            <>
              {ind.verified.slice(0, 3).map((id) => (
                <span key={id} className="inline-flex h-7 items-center gap-1 rounded-lg bg-success-soft px-2 text-xs text-success">
                  <CheckCircle2 className="size-3.5" aria-hidden /> {t(`sa.indicators.${id}`)}
                </span>
              ))}
              <span className="inline-flex h-7 items-center rounded-lg bg-muted px-2 text-xs text-muted-foreground">{t('sa.indicators.facts', { n: ind.facts })}</span>
            </>
          ) : (
            <span className="inline-flex h-7 items-center rounded-lg bg-muted px-2 text-xs text-muted-foreground" title={t('sa.indicators.noneHint')}>
              {t('sa.indicators.none')}
            </span>
          )}
        </div>
        <div className="relative z-10 mt-auto flex items-center justify-between gap-2 pt-1">
          <Link href={href} className="inline-flex h-10 items-center gap-1.5 text-sm font-semibold text-brand">
            {t('sa.card.explore')} <ArrowRight className="size-4" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={onToggleShortlist}
            aria-pressed={shortlisted}
            className={cn(
              'inline-flex h-10 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors',
              shortlisted ? 'border-brand/30 bg-brand-soft text-brand' : 'bg-card hover:border-foreground/20',
            )}
          >
            {shortlisted ? <BookmarkCheck className="size-4" aria-hidden /> : <Bookmark className="size-4" aria-hidden />}
            {shortlisted ? t('sa.card.shortlisted') : t('sa.card.shortlist')}
          </button>
        </div>
      </div>
    </article>
  );
}
