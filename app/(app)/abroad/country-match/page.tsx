'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Callout, PageHeader, Panel, ProgressBar, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { COUNTRIES } from '@/lib/content/countries';
import { matchCountries, PRIORITY_FACTORS, prioritiesFrom } from '@/lib/engine';
import type { Money, PriorityFactor, StudyAbroadProfile } from '@/lib/models';
import { cn } from '@/lib/utils';

const CURRENCIES = ['BDT', 'USD', 'GBP', 'CAD', 'AUD', 'EUR'] as const;
const money = (m: Money) => `${m.currency} ${m.amount.toLocaleString('en-US')}`;

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'rounded-full border px-3.5 py-2 text-sm transition-colors',
        selected ? 'border-brand bg-brand-soft text-brand' : 'bg-card hover:border-foreground/20',
      )}
    >
      {children}
    </button>
  );
}

function Questions({ abroad, onSave }: { abroad: StudyAbroadProfile; onSave: (a: StudyAbroadProfile) => void }) {
  const { t } = useLocale();
  const [picked, setPicked] = useState<PriorityFactor[]>(Object.keys(abroad.priorities ?? {}) as PriorityFactor[]);
  const [countries, setCountries] = useState<string[]>(abroad.preferredCountryCodes ?? []);
  const [amount, setAmount] = useState(abroad.annualBudget ? String(abroad.annualBudget.amount) : '');
  const [currency, setCurrency] = useState<string>(abroad.annualBudget?.currency ?? 'BDT');
  const toggle = <T,>(list: T[], item: T, max = Infinity) => (list.includes(item) ? list.filter((x) => x !== item) : list.length < max ? [...list, item] : list);

  return (
    <div className="space-y-8">
      <Section title={t('match.prioritiesTitle')} description={t('match.prioritiesHint')}>
        <div className="flex flex-wrap gap-2">
          {PRIORITY_FACTORS.map((p) => (
            <Chip key={p} selected={picked.includes(p)} onClick={() => setPicked((l) => toggle(l, p, 3))}>
              {t(`match.priorities.${p}`)}
            </Chip>
          ))}
        </div>
      </Section>
      <Section title={t('match.preferredTitle')}>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <Chip key={c.code} selected={countries.includes(c.code)} onClick={() => setCountries((l) => toggle(l, c.code))}>
              {c.flag} {c.name}
            </Chip>
          ))}
        </div>
      </Section>
      <Section title={t('match.budgetTitle')} description={t('match.budgetHint')}>
        <div className="flex max-w-sm gap-2">
          <select
            aria-label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="h-11 rounded-xl border bg-card px-3 text-sm"
          >
            {CURRENCIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <Input
            inputMode="numeric"
            aria-label={t('match.budgetTitle')}
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
            className="h-11 rounded-xl bg-card"
            placeholder="0"
          />
        </div>
      </Section>
      <Button
        size="lg"
        disabled={picked.length === 0}
        onClick={() =>
          onSave({
            ...abroad,
            priorities: prioritiesFrom(picked),
            preferredCountryCodes: countries,
            ...(amount ? { annualBudget: { amount: Number(amount), currency } } : { annualBudget: undefined }),
          })
        }
      >
        {t('match.save')}
      </Button>
    </div>
  );
}

export default function CountryMatchPage() {
  const { t, m } = useLocale();
  const { profile, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  if (!profile) return <ScreenSkeleton />;

  const abroad = profile.abroad;
  const hasPriorities = Object.keys(abroad.priorities ?? {}).length > 0;
  const header = <PageHeader title={t('match.title')} subtitle={t('match.subtitle')} backHref="/abroad" backLabel={t('nav.abroad')} />;

  if (!hasPriorities || editing) {
    return (
      <div className="max-w-2xl space-y-8">
        {header}
        <Questions
          abroad={abroad}
          onSave={(next) => {
            updateProfile((p) => ({ ...p, abroad: next }));
            setEditing(false);
          }}
        />
      </div>
    );
  }

  const result = matchCountries(COUNTRIES, abroad);
  const budget = abroad.annualBudget;

  return (
    <div className="max-w-2xl space-y-6">
      {header}
      <div className="flex flex-wrap items-center gap-2">
        {Object.keys(result.priorities).map((p) => (
          <StatusChip key={p} tone="brand">
            {t(`match.priorities.${p}`)}
          </StatusChip>
        ))}
        <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
          {t('match.edit')}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">{t('match.noCountryIsBest')}</p>

      <div className="space-y-4">
        {result.matches.map((c) => (
          <Panel key={c.code} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden>
                {c.flag}
              </span>
              <p className="flex-1 font-semibold">{c.name}</p>
              {c.preferred && <StatusChip>{t('match.preferred')}</StatusChip>}
              {c.fit !== undefined && <StatusChip tone="brand">{t('match.fit', { n: c.fit })}</StatusChip>}
            </div>
            <div className="space-y-1">
              <ProgressBar value={c.coverage} label={t('match.coverage', { n: c.coverage })} size="sm" tone="neutral" />
              <p className="text-xs text-muted-foreground">{t('match.coverage', { n: c.coverage })}</p>
            </div>
            {c.criteria.map((r) => (
              <div key={r.criterion} className="space-y-0.5 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{t(`match.criteria.${r.criterion}`)}</span>
                  <span className="text-right font-medium">{m(r.value)}</span>
                </div>
                <a href={r.source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground underline underline-offset-2">
                  {r.source.name} · {t('match.verified', { date: r.lastVerified })} <ExternalLink className="size-3" />
                </a>
              </div>
            ))}
            {c.livingCost.length > 0 && (
              <div className="space-y-2 rounded-lg bg-muted/40 p-3 text-sm">
                <p className="font-medium">{t('match.livingCost')}</p>
                {c.livingCost.map((l, i) => (
                  <div key={i} className="space-y-0.5">
                    <p>
                      <span className="font-medium tabular-nums">{money(l.money)}</span>
                      {l.notes && <span className="text-muted-foreground"> · {l.notes}</span>}
                    </p>
                    {budget && budget.currency === l.money.currency && (
                      <p className={cn('text-xs', budget.amount >= l.money.amount ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400')}>
                        {t('match.budgetCompare', { budget: money(budget) })} · {budget.amount >= l.money.amount ? t('match.budgetWithin') : t('match.budgetBelow')}
                      </p>
                    )}
                  </div>
                ))}
                <a href={c.livingCost[0].source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground underline underline-offset-2">
                  {c.livingCost[0].source.name} · {t('match.verified', { date: c.livingCost[0].lastVerified })} <ExternalLink className="size-3" />
                </a>
              </div>
            )}
            {c.unknownPriorities.length > 0 && (
              <p className="text-xs text-muted-foreground">{t('match.unknown', { list: c.unknownPriorities.map((p) => t(`match.priorities.${p}`)).join(', ') })}</p>
            )}
          </Panel>
        ))}
      </div>

      {result.notEnoughData.length > 0 && (
        <Callout title={t('match.notEnoughTitle')}>
          {t('match.notEnoughBody', { list: result.notEnoughData.map((c) => `${c.flag} ${c.name}`).join(', ') })}
        </Callout>
      )}

      <Callout tone="warning">{t('match.disclaimer')}</Callout>

      <Button asChild variant="brand">
        <Link href="/mino?ask=abroad">
          <Sparkles /> {t('match.askMino')}
        </Link>
      </Button>
    </div>
  );
}
