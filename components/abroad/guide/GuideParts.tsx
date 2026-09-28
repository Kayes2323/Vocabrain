'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { formatMoney, useFormatDate } from '@/components/abroad/FactRow';
import { useBilingual } from '@/components/abroad/useBilingual';
import { DOC_GROUPS, type GuideAnswer, type GuideCost, type GuideCosts, type GuideDegree, type GuideDocument, type GuideStatus } from '@/lib/abroad/guides';
import { scholarshipsFor } from '@/lib/content/scholarships';
import { PROGRAMS, universitiesIn } from '@/lib/content/universities';
import type { Bilingual, SourceRef } from '@/lib/models';
import { cn } from '@/lib/utils';

/** A small, quiet label for anything that is not fully verified. */
export function GuideStatusTag({ status }: { status?: GuideStatus }) {
  const { t } = useLocale();
  if (!status || status === 'verified') return null;
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium',
        status === 'not-verified' ? 'bg-muted text-muted-foreground' : 'bg-warning-soft text-warning',
      )}
      data-guide-status={status}
    >
      {t(`sa.book.status.${status}`)}
    </span>
  );
}

/** Paragraphs of a question's answer (and its list), in reading width. */
export function AnswerBody({ a, list }: { a: Bilingual[]; list?: Bilingual[] }) {
  const text = useBilingual();
  return (
    <div className="space-y-3 text-[16px] leading-7 text-foreground/85">
      {a.map((p, i) => (
        <p key={i}>{text(p)}</p>
      ))}
      {list && (
        <ul className="space-y-1.5 pl-1">
          {list.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-brand/70" aria-hidden />
              <span>{text(item)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Small labels under a question: status, estimate / guidance, "same for all degrees". Nothing for a plain verified fact. */
export function AnswerTags({ answer }: { answer: GuideAnswer }) {
  const { t } = useLocale();
  const kind = answer.kind && answer.kind !== 'fact' ? answer.kind : undefined;
  if ((!answer.status || answer.status === 'verified') && !kind && !answer.allDegrees) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      <GuideStatusTag status={answer.status} />
      {kind && (
        <span className="inline-flex h-6 items-center rounded-full bg-muted px-2.5 text-xs font-medium text-muted-foreground" data-guide-kind={kind}>
          {t(`sa.book.kind.${kind}`)}
        </span>
      )}
      {answer.allDegrees && (
        <span className="inline-flex h-6 items-center rounded-full bg-brand/10 px-2.5 text-xs font-medium text-brand" data-all-degrees="">
          {t('sa.book.allDegrees')}
        </span>
      )}
    </div>
  );
}

/** Two official sources disagree: said plainly, neither chosen. */
export function Discrepancy({ note }: { note?: Bilingual }) {
  const { t } = useLocale();
  const text = useBilingual();
  if (!note) return null;
  return (
    <p className="rounded-xl border-l-[3px] border-warning bg-warning-soft/60 px-3.5 py-2.5 text-sm leading-6 text-foreground/85" data-discrepancy="">
      <span className="font-semibold">{t('sa.book.discrepancy')}: </span>
      {text(note)}
    </p>
  );
}

/** One question (bold, prominent) with its answer right below. */
export function GuideQA({ answer, level = 'h3' }: { answer: GuideAnswer; level?: 'h2' | 'h3' }) {
  const text = useBilingual();
  const Heading = level;
  return (
    <article className="space-y-3" data-guide-q={answer.id}>
      <div className="space-y-2">
        <Heading className="text-lg font-bold tracking-tight text-balance sm:text-xl">{text(answer.q)}</Heading>
        <AnswerTags answer={answer} />
      </div>
      <AnswerBody a={answer.a} list={answer.list} />
      <Discrepancy note={answer.discrepancy} />
    </article>
  );
}

/** A small source list closing one section (when the guide asks for it). */
export function SectionSources({ sources }: { sources: SourceRef[] }) {
  const { t } = useLocale();
  if (!sources.length) return null;
  return (
    <div className="space-y-1.5 text-xs text-muted-foreground" data-section-sources="">
      <p className="font-semibold uppercase tracking-wide">{t('sa.book.sectionSources')}</p>
      <ul className="flex flex-wrap gap-x-3 gap-y-1">
        {sources.map((s, i) => (
          <li key={`${s.name}-${i}`} className="min-w-0 break-words">
            {s.url ? (
              <a href={s.url} target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-foreground hover:underline">
                {s.name}
              </a>
            ) : (
              s.name
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Documents grouped A–E; each document is explained once below the groups. */
export function GuideDocuments({ documents }: { documents: GuideDocument[] }) {
  const { t } = useLocale();
  const text = useBilingual();
  if (!documents.length) return null;
  return (
    <section className="space-y-6" data-testid="guide-documents">
      <h3 className="text-lg font-bold tracking-tight sm:text-xl">{t('sa.book.docs.title')}</h3>
      <div className="space-y-4">
        {DOC_GROUPS.map((g, i) => {
          const docs = documents.filter((d) => d.groups.includes(g));
          if (!docs.length) return null;
          return (
            <div key={g} className="space-y-1.5" data-doc-group={g}>
              <p className="text-[15px] font-semibold">
                {String.fromCharCode(65 + i)}. {t(`sa.book.docs.groups.${g}`)}
              </p>
              <p className="text-[15px] leading-7 text-foreground/85">
                {docs.map((d, j) => (
                  <span key={d.id}>
                    {j > 0 && ' · '}
                    <a href={`#doc-${d.id}`} className="underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground">
                      {text(d.name)}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          );
        })}
      </div>
      <div className="space-y-5 border-t pt-5">
        <p className="text-sm font-semibold text-muted-foreground">{t('sa.book.docs.aboutEach')}</p>
        {documents.map((d) => (
          <div key={d.id} id={`doc-${d.id}`} className="scroll-mt-6 space-y-2" data-document={d.id}>
            <p className="flex flex-wrap items-center gap-2 text-[17px] font-semibold">
              {text(d.name)} <GuideStatusTag status={d.status} />
            </p>
            <dl className="grid gap-x-4 gap-y-1.5 text-[15px] leading-6 sm:grid-cols-[8rem_1fr]">
              {(['why', 'who', 'when', 'where', 'prepare'] as const).map((k) => (
                <div key={k} className="contents">
                  <dt className="font-medium text-muted-foreground">{t(`sa.book.docs.${k}`)}</dt>
                  <dd className="text-foreground/85">{text(d[k])}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

/** The "Sources & Official References" list at the end of a page. */
export function GuideSources({ sources, checkedAt }: { sources: SourceRef[]; checkedAt: string }) {
  const { t } = useLocale();
  const date = useFormatDate();
  return (
    <section className="space-y-4 border-t pt-8" aria-labelledby="guide-sources" data-testid="guide-sources">
      <h2 id="guide-sources" className="text-base font-semibold">
        {t('sa.book.sources')}
      </h2>
      <ol className="space-y-2 text-sm">
        {sources.map((s, i) => (
          <li key={`${s.name}-${i}`} className="flex gap-2 text-muted-foreground">
            <span className="w-5 shrink-0 text-right tabular-nums">{i + 1}.</span>
            {s.url ? (
              <a href={s.url} target="_blank" rel="noreferrer" className="min-w-0 break-words underline-offset-4 hover:text-foreground hover:underline">
                {s.name}
              </a>
            ) : (
              <span className="min-w-0 break-words">{s.name}</span>
            )}
          </li>
        ))}
      </ol>
      <p className="text-xs text-muted-foreground">{t('sa.book.checked', { date: date(checkedAt) })}</p>
    </section>
  );
}

function CostLine({ cost }: { cost: GuideCost }) {
  const text = useBilingual();
  return (
    <li className="space-y-0.5 py-3" data-cost={cost.id}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-[15px] text-foreground/80">{text(cost.label)}</span>
        <span className="font-semibold tabular-nums">{text(cost.value)}</span>
      </div>
      {(cost.note || cost.status) && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {cost.note && <span>{text(cost.note)}</span>}
          <GuideStatusTag status={cost.status} />
        </div>
      )}
    </li>
  );
}

/** Costs kept in three separate groups: official, estimate, and the student's own budget. */
export function CostBreakdown({ costs }: { costs: GuideCosts }) {
  const { t } = useLocale();
  const { profile } = useProfile();
  const budget = profile?.abroad.student?.budget;
  const mine = [
    budget?.tuition && { key: 'tuition', value: formatMoney(budget.tuition) },
    budget?.living && { key: 'living', value: formatMoney(budget.living) },
    budget?.total && { key: 'total', value: formatMoney(budget.total) },
  ].filter((x): x is { key: string; value: string } => Boolean(x));

  const group = (id: 'official' | 'estimate' | 'mine', body: React.ReactNode) => (
    <div className="space-y-1" data-cost-group={id}>
      <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
        <span className={cn('font-semibold tracking-wide uppercase', id === 'official' ? 'text-success' : id === 'estimate' ? 'text-warning' : 'text-brand')}>{t(`sa.book.cost.${id}`)}</span>
        <span className="text-muted-foreground">{t(`sa.book.cost.${id}Body`)}</span>
      </p>
      {body}
    </div>
  );

  return (
    <div className="space-y-6 rounded-2xl bg-muted/40 p-4 sm:p-5" data-testid="guide-costs">
      {costs.official.length > 0 &&
        group(
          'official',
          <ul className="divide-y">
            {costs.official.map((c) => (
              <CostLine key={c.id} cost={c} />
            ))}
          </ul>,
        )}
      {group(
        'estimate',
        <ul className="divide-y">
          {costs.estimates.map((c) => (
            <CostLine key={c.id} cost={c} />
          ))}
        </ul>,
      )}
      {group(
        'mine',
        mine.length ? (
          <ul className="divide-y">
            {mine.map((m) => (
              <li key={m.key} className="flex flex-wrap items-baseline justify-between gap-x-4 py-3">
                <span className="text-[15px] text-foreground/80">{t(`sa.book.cost.${m.key}`)}</span>
                <span className="font-semibold tabular-nums">{m.value}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-2 text-[15px] text-foreground/80">
            {t('sa.book.cost.noBudget')}{' '}
            <Link href="/abroad/cost" className="font-medium text-brand underline-offset-4 hover:underline">
              {t('sa.book.cost.addBudget')}
            </Link>
          </p>
        ),
      )}
      <p className="text-xs text-muted-foreground">{t('sa.book.cost.noConvert')}</p>
    </div>
  );
}

/** Universities in the country's registry (alphabetical, never ranked), with this degree's verified programs. */
export function GuideUniversities({ code, level }: { code: string; level: GuideDegree }) {
  const { t } = useLocale();
  const text = useBilingual();
  const unis = [...universitiesIn(code)].sort((x, y) => x.name.localeCompare(y.name));
  if (!unis.length) return null;
  return (
    <section className="space-y-4" data-testid="guide-universities">
      <h3 className="text-lg font-bold tracking-tight sm:text-xl">{t('sa.book.uni.title')}</h3>
      <p className="text-[15px] text-muted-foreground">{t('sa.book.uni.note')}</p>
      <ul className="divide-y rounded-2xl border">
        {unis.map((u) => {
          const programs = PROGRAMS.filter((p) => p.universityId === u.id && p.degreeLevel === level);
          return (
            <li key={u.id} className="space-y-1.5 p-4" data-university={u.id}>
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-muted-foreground">
                {[u.ownership ? t(`sa.book.uni.${u.ownership.value}`) : undefined, u.city, u.studyLanguages?.value.includes('en') ? t('sa.book.uni.english') : undefined].filter(Boolean).join(' · ')}
              </p>
              {u.description && <p className="text-[15px] text-foreground/85">{text(u.description)}</p>}
              {programs.length > 0 ? (
                <div className="text-sm">
                  <span className="text-muted-foreground">{t('sa.book.uni.programs')}: </span>
                  {programs.map((p, i) => (
                    <span key={p.id}>
                      {i > 0 && ', '}
                      {p.officialUrl ? (
                        <a href={p.officialUrl} target="_blank" rel="noreferrer" className="font-medium text-brand underline-offset-4 hover:underline" data-program={p.id}>
                          {p.title}
                        </a>
                      ) : (
                        <span className="font-medium">{p.title}</span>
                      )}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t('sa.book.uni.noPrograms')}</p>
              )}
              {u.officialUrl && (
                <a href={u.officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-brand underline-offset-4 hover:underline">
                  {t('sa.book.uni.site')} <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Scholarships in the country's registry that name this degree. */
export function GuideScholarships({ code, level }: { code: string; level: GuideDegree }) {
  const { t } = useLocale();
  const date = useFormatDate();
  // Values stay in the source's own wording (never re-labelled, e.g. "fully funded").
  const list = scholarshipsFor(code).filter((s) => s.countryCode === code.toUpperCase() && s.degreeLevels?.includes(level));
  return (
    <section className="space-y-4" data-testid="guide-scholarships">
      <h3 className="text-lg font-bold tracking-tight sm:text-xl">{t('sa.book.sch.title')}</h3>
      {list.length === 0 && <p className="text-[15px] text-muted-foreground">{t('sa.book.sch.none')}</p>}
      {list.map((s) => (
        <div key={s.id} className="space-y-3 border-l-2 border-brand/40 pl-4" data-scholarship={s.id}>
          <p className="text-[17px] font-semibold">
            {s.name}
            <span className="ml-2 align-middle text-xs font-medium text-muted-foreground">{s.provider === 'government' ? t('sa.book.sch.government') : t('sa.book.sch.university')}</span>
          </p>
          <dl className="space-y-2 text-[15px] leading-7">
            {s.coverage && (
              <div>
                <dt className="font-semibold">{t('sa.book.sch.covers')}</dt>
                <dd className="text-foreground/85">{s.coverage.value}</dd>
              </div>
            )}
            {s.eligibility && (
              <div>
                <dt className="font-semibold">{t('sa.book.sch.who')}</dt>
                <dd className="text-foreground/85">{s.eligibility.value}</dd>
              </div>
            )}
            {(s.opensAt || s.deadline) && (
              <div>
                <dt className="font-semibold">{t('sa.book.sch.when')}</dt>
                <dd className="text-foreground/85">{[s.opensAt && t('sa.book.sch.opens', { date: date(s.opensAt.value) }), s.deadline && t('sa.book.sch.closes', { date: date(s.deadline.value) })].filter(Boolean).join(' · ')}</dd>
              </div>
            )}
            {s.applicationMethod && (
              <div>
                <dt className="font-semibold">{t('sa.book.sch.how')}</dt>
                <dd className="text-foreground/85">{s.applicationMethod.value}</dd>
              </div>
            )}
            {s.requirements && <dd className="text-foreground/85">{s.requirements.value}</dd>}
          </dl>
          <a href={s.officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-brand underline-offset-4 hover:underline">
            {t('sa.book.sch.link')} <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        </div>
      ))}
    </section>
  );
}
