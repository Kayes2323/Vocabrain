'use client';

import { Suspense, useState } from 'react';
import { ChevronDown, ExternalLink, Info } from 'lucide-react';
import { PageHeader, Panel, ScreenSkeleton } from '@/components/ds';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { CountrySelect, useCountryParam } from '@/components/abroad/CountrySelect';
import { useFormatDate } from '@/components/abroad/FactRow';
import { HubBar } from '@/components/abroad/HubBar';
import { PathwayPicker } from '@/components/abroad/PathwayPicker';
import { ProfileQuestion } from '@/components/abroad/ProfileQuestion';
import { useBilingual } from '@/components/abroad/useBilingual';
import { costPlan, type CostGroup, type GroupPlan, type Range } from '@/lib/abroad/costs';
import { needsPathwayChoice } from '@/lib/abroad/documents';
import { getCountry } from '@/lib/content/countries';
import { studentRouteContext } from '@/lib/engine';
import type { CostPeriod } from '@/lib/models';
import { cn } from '@/lib/utils';

const fmt = (amount: number, currency: string) => `${currency} ${Math.round(amount).toLocaleString('en-US')}`;

/** The three kinds of money, each with its own unmistakable tag. */
function Tag({ kind }: { kind: 'official' | 'estimate' | 'mine' }) {
  const { t } = useLocale();
  const tone = { official: 'bg-success-soft text-success', estimate: 'bg-warning-soft text-warning', mine: 'bg-brand-soft text-brand' }[kind];
  return <span className={cn('inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wider uppercase', tone)}>{t(`sa.cost.${kind}`)}</span>;
}

function GroupRow({ plan, open, onToggle }: { plan: GroupPlan; open: boolean; onToggle: () => void }) {
  const { t } = useLocale();
  const text = useBilingual();
  const date = useFormatDate();
  const per = (p: CostPeriod) => t(`sa.cost.per.${p}`);
  const hasAny = plan.official.length > 0 || plan.estimates.length > 0 || Boolean(plan.mine);
  return (
    <div className="border-b last:border-b-0" data-cost-group={plan.group}>
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex min-h-14 w-full items-center gap-3 py-3 text-left">
        <span className="min-w-0 flex-1 text-[15px] font-semibold">{t(`sa.cost.groups.${plan.group}`)}</span>
        <span className="flex gap-1">
          {plan.official.length > 0 && <Tag kind="official" />}
          {plan.estimateYear && <Tag kind="estimate" />}
          {plan.mine && <Tag kind="mine" />}
          {!hasAny && <span className="text-xs text-muted-foreground">{t('sa.cost.notVerified')}</span>}
        </span>
        <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      {open && (
        <div className="space-y-4 pb-5">
          <div className="space-y-2" data-block="official">
            <Tag kind="official" />
            {plan.official.length ? (
              plan.official.map(({ cost, status }) => (
                <div key={cost.id} className="space-y-0.5 text-sm" data-official={cost.id} data-status={status}>
                  <p className="text-xs text-muted-foreground">{text(cost.label)}</p>
                  <p className="font-medium">
                    {fmt(cost.amount.value.amount, cost.amount.value.currency)} <span className="text-muted-foreground">· {per(cost.amount.value.period)}</span>
                  </p>
                  {cost.amount.notes && <p className="text-xs text-muted-foreground">{cost.amount.notes}</p>}
                  <a href={cost.amount.source.url} target="_blank" rel="noopener noreferrer" className={cn('inline-flex items-center gap-1 text-xs', status === 'needs-review' ? 'text-warning' : 'text-success')}>
                    {cost.amount.source.name} · {t('sa.hub.verifiedOn', { date: date(cost.amount.lastVerified) })}
                    {status === 'needs-review' ? ` · ${t('sa.sectionStatus.needs-review')}` : ''} <ExternalLink className="size-3" aria-hidden />
                  </a>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">{t('sa.cost.notVerified')}</p>
            )}
            {plan.officialPending.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-brand">
                {l.name} <ExternalLink className="size-3.5" aria-hidden />
              </a>
            ))}
          </div>
          <div className="space-y-2 rounded-xl bg-warning-soft/40 p-3" data-block="estimate">
            <Tag kind="estimate" />
            {plan.estimates.length ? (
              plan.estimates.map((e) => (
                <div key={e.id} className="space-y-1 text-sm" data-estimate={e.id}>
                  <div className="grid grid-cols-3 gap-2">
                    {(['low', 'typical', 'high'] as const).map((k) => (
                      <div key={k}>
                        <p className="text-xs text-muted-foreground">{t(`sa.cost.${k}`)}</p>
                        <p className="font-medium">{fmt(e[k], e.currency)}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {per(e.period)} · {t('sa.cost.basis')}: {text(e.basis)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">{t('sa.cost.noEstimate')}</p>
            )}
            {plan.currencyMismatch && <p className="text-xs text-warning">{t('sa.cost.currency')}</p>}
          </div>
          {(plan.group === 'tuition' || plan.group === 'living') && (
            <div className="space-y-2" data-block="mine">
              <Tag kind="mine" />
              {plan.mine ? (
                <p className="text-sm font-medium">
                  {fmt(plan.mine.amount, plan.mine.currency)} <span className="text-muted-foreground">· {per(plan.mine.period)}</span>
                </p>
              ) : (
                <ProfileQuestion id={plan.group === 'tuition' ? 'tuitionBudget' : 'livingBudget'} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RangeText({ r }: { r: Range }) {
  return (
    <span>
      {fmt(r.low, r.currency)} – {fmt(r.high, r.currency)} <span className="text-muted-foreground">(~{fmt(r.typical, r.currency)})</span>
    </span>
  );
}

/**
 * "How much might I need?" — per cost group: official figures, estimates and
 * the student's own budget, then a planning view. No affordability score,
 * no verdict, no currency conversion.
 */
function CostPlanner() {
  const { t } = useLocale();
  const { profile } = useProfile();
  const [code, setCode] = useCountryParam(profile?.abroad, false);
  const [open, setOpen] = useState<CostGroup | null>('tuition');
  if (!profile) return <ScreenSkeleton />;
  const country = getCountry(code);
  if (!country) return <ScreenSkeleton />;
  const ctx = studentRouteContext(profile.abroad, country.code);
  const plan = costPlan(country, profile.abroad, ctx);
  const d = plan.difference;

  return (
    <div className="space-y-5">
      <PageHeader title={t('sa.cost.title')} subtitle={t('sa.cost.subtitle')} />
      <HubBar />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CountrySelect value={country.code} onChange={setCode} abroad={profile.abroad} allowAll={false} />
        <Button asChild data-testid="cost-cta">
          <a href="#my-budget">{t('sa.cost.planCta')}</a>
        </Button>
      </div>
      {needsPathwayChoice(country, ctx) && (
        <>
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden /> {t('sa.cost.choosePathway')}
          </p>
          <PathwayPicker country={country} />
        </>
      )}
      <div className="flex flex-wrap gap-1.5" aria-hidden>
        <Tag kind="official" />
        <Tag kind="estimate" />
        <Tag kind="mine" />
      </div>
      <Panel className="px-4 py-0" data-testid="cost-groups">
        {plan.groups.map((g) => (
          <GroupRow key={g.group} plan={g} open={open === g.group} onToggle={() => setOpen(open === g.group ? null : g.group)} />
        ))}
      </Panel>

      <Panel className="space-y-3" id="my-budget" data-testid="cost-plan">
        <h2 className="font-semibold">{t('sa.cost.plan')}</h2>
        <dl className="space-y-2 text-sm">
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="flex items-center gap-2">
              <Tag kind="estimate" /> {t('sa.cost.estimateTotal')}
            </dt>
            <dd data-testid="cost-estimate-total">{plan.estimateTotal ? <RangeText r={plan.estimateTotal} /> : '—'}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="flex items-center gap-2">
              <Tag kind="mine" /> {t('sa.cost.available')}
            </dt>
            <dd data-testid="cost-available">{plan.available ? fmt(plan.available.amount, plan.available.currency) : '—'}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt>{t('sa.cost.difference')}</dt>
            <dd data-testid="cost-difference">
              {d ? (
                <span>
                  {fmt(Math.abs(d.typical), d.currency)} {d.typical >= 0 ? t('sa.cost.left') : t('sa.cost.short')}
                </span>
              ) : (
                '—'
              )}
            </dd>
          </div>
        </dl>
        {!plan.available && <ProfileQuestion id="totalBudget" />}
        <div className="space-y-1 text-xs text-muted-foreground" data-testid="cost-notes">
          {!plan.estimateTotal && <p>{t('sa.cost.noTotal')}</p>}
          {plan.incomplete && <p>{t('sa.cost.someNotVerified')}</p>}
          {plan.currencyUnavailable && <p className="text-warning">{t('sa.cost.currency')}</p>}
          <p>{t('sa.cost.based')}</p>
        </div>
      </Panel>
    </div>
  );
}

export default function CostPage() {
  return (
    <Suspense fallback={<ScreenSkeleton />}>
      <CostPlanner />
    </Suspense>
  );
}
