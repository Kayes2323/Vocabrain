'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, PageHeader, Panel, ProgressBar, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  expectedAnswer, FINAL_PER_PART, finalRecord, finalStartLevel, getConcept, nextFinalLevel, PASS_SCORE, patternsFor, pickFinalItem, recordAnswer, recordFinal,
  type ChallengeDef, type FinalItem, type FinalLevel, type L, type Module, type Pos, type Unit,
} from '@/lib/foundation';
import type { FoundationProgress } from '@/lib/models';
import { cn } from '@/lib/utils';
import { ExerciseView } from './ExerciseView';
import { UnitMark, usePatternLabel } from './UnitsDashboard';
import { useFoundation, useText } from './useFoundation';

interface Answered {
  part: string;
  item: FinalItem;
  correct: boolean;
}

/**
 * A module's Final Mastery Challenge: its parts × 3 questions, adaptive (right →
 * harder, wrong → easier), many without options. Ends with a report by part and
 * by area (word job for Parts of Speech, tense by tense for Tenses), strongest
 * and weakest areas, the student's own mistakes and what to practise next.
 */
export function MasteryChallenge({ module, unit, fp, challenge }: { module: Module; unit?: Unit; fp: FoundationProgress; challenge: ChallengeDef }) {
  const { t } = useLocale();
  const text = useText();
  const { update, fp: live } = useFoundation();
  const parts = challenge.parts;
  const total = parts.length * FINAL_PER_PART;
  const [phase, setPhase] = useState<'intro' | 'run' | 'report'>('intro');
  const [round, setRound] = useState(0);
  const [partIndex, setPartIndex] = useState(0);
  const [level, setLevel] = useState<FinalLevel>(() => finalStartLevel(fp, challenge.concepts));
  const [answered, setAnswered] = useState<Answered[]>([]);
  const used = useRef(new Set<string>());
  const seed = useMemo(() => `${Date.now()}`, [round]); // eslint-disable-line react-hooks/exhaustive-deps
  const [item, setItem] = useState<FinalItem | undefined>();
  const backHref = `/ielts/foundation/${module.id}`;
  const levelName = (lv: number) => t(`foundation.final.levels.${lv}`);
  const title = text(unit?.title ?? challenge.title);

  const start = () => {
    used.current = new Set();
    const lv = finalStartLevel(live ?? fp, challenge.concepts);
    const first = pickFinalItem(parts[0].items, lv, used.current, `${seed}:${parts[0].id}`)!;
    used.current.add(first.id);
    setLevel(lv);
    setPartIndex(0);
    setAnswered([]);
    setItem(first);
    setPhase('run');
    window.scrollTo({ top: 0 });
  };

  if (phase === 'intro') {
    const last = finalRecord(fp, challenge.id);
    return (
      <div className="space-y-8">
        <PageHeader
          title={title}
          subtitle={text(unit?.tagline ?? challenge.tagline)}
          backHref={backHref}
          backLabel={text(module.title)}
          action={
            unit ? (
              <UnitMark unit={unit} className="size-12 text-base" />
            ) : (
              <span aria-hidden className="flex size-12 items-center justify-center rounded-xl bg-tint-yellow text-base font-bold text-tint-yellow-fg">{challenge.mark}</span>
            )
          }
        />
        <Panel variant="brand" className="space-y-4">
          <p className="leading-7">{t('foundation.final.intro', { n: total })}</p>
          {last && <p className="text-sm font-medium tabular-nums">{t('foundation.final.last', { score: last.score, best: last.best })}</p>}
          <Button size="lg" className="h-12 w-full sm:w-auto" onClick={start}>
            {last ? t('foundation.final.retry') : t('foundation.final.start')} <ArrowRight />
          </Button>
        </Panel>
        <Section title={t('foundation.final.partsTitle', { n: parts.length })} variant="label">
          <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {parts.map((p) => {
              const r = last?.parts[p.id];
              return (
                <li key={p.id} className="flex items-center gap-3 rounded-xl border bg-card px-3.5 py-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-bold">{p.id}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{text(p.title)}</span>
                    <span className="block text-xs text-muted-foreground">{text(p.intro)}</span>
                  </span>
                  {r && <span className="text-xs text-muted-foreground tabular-nums">{r.correct}/{r.total}</span>}
                </li>
              );
            })}
          </ol>
        </Section>
        <p className="text-xs text-muted-foreground">{t('foundation.final.note')}</p>
      </div>
    );
  }

  if (phase === 'report') {
    return (
      <Report
        module={module}
        challenge={challenge}
        answered={answered}
        level={level}
        levelName={levelName}
        onRetry={() => {
          setRound((r) => r + 1);
          setPhase('intro');
        }}
      />
    );
  }

  const part = parts[partIndex];
  const n = answered.length;
  const last = n === total - 1;
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" aria-label={t('foundation.lesson.exit')}>
            <Link href={backHref} onClick={(e) => { if (n > 0 && !window.confirm(t('foundation.final.quit'))) e.preventDefault(); }}>
              <X />
            </Link>
          </Button>
          <h1 className="min-w-0 flex-1 truncate text-lg font-semibold">{title}</h1>
          <span className="text-xs text-muted-foreground tabular-nums">{t('foundation.lesson.exerciseOf', { n: n + 1, total })}</span>
        </div>
        <ProgressBar value={((n + 1) / total) * 100} label={title} size="sm" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <StatusChip tone="brand">{t('foundation.final.part', { id: part.id, title: text(part.title) })}</StatusChip>
        <StatusChip>{t('foundation.final.level', { name: levelName(level) })}</StatusChip>
      </div>
      {item && (
        <Panel>
          <ExerciseView
            key={`${item.id}-${round}`}
            exercise={item}
            doneLabel={last ? t('foundation.review.finish') : t('foundation.lesson.next')}
            onAnswer={(r) => update((p) => recordAnswer(p, { source: `final:${challenge.id}`, exercise: item, answer: r.answer, correct: r.correct, attempt: (finalRecord(fp, challenge.id)?.attempts ?? 0) + 1 }))}
            onDone={(r) => {
              const correct = r.correct === true;
              const next = [...answered, { part: part.id, item, correct }];
              const nextLevel = nextFinalLevel(level, correct);
              setAnswered(next);
              setLevel(nextLevel);
              window.scrollTo({ top: 0 });
              if (next.length >= total) {
                const score = Math.round((next.filter((a) => a.correct).length / next.length) * 100);
                const byPart = Object.fromEntries(parts.map((p) => {
                  const mine = next.filter((a) => a.part === p.id);
                  return [p.id, { correct: mine.filter((a) => a.correct).length, total: mine.length }];
                }));
                update((p) => recordFinal(p, { score, level: nextLevel, parts: byPart }, new Date(), challenge.id));
                setPhase('report');
                return;
              }
              const inPart = next.filter((a) => a.part === part.id).length;
              const pi = inPart >= FINAL_PER_PART ? partIndex + 1 : partIndex;
              const nextItem = pickFinalItem(parts[pi].items, nextLevel, used.current, `${seed}:${parts[pi].id}`)!;
              used.current.add(nextItem.id);
              setPartIndex(pi);
              setItem(nextItem);
            }}
          />
        </Panel>
      )}
    </div>
  );
}

const CONCEPT_POS: Record<string, Pos> = {
  'pos-noun': 'noun', 'pos-verb': 'verb', 'pos-adjective': 'adjective', 'pos-adverb': 'adverb',
  'pos-pronoun': 'pronoun', 'pos-preposition': 'preposition', 'pos-conjunction': 'conjunction',
};

interface Area {
  key: string;
  label: string;
  correct: number;
  total: number;
  /** The concept behind the area, for a review link. */
  concept?: string;
  /** Parts of Speech: the unit that teaches it. */
  unit?: Unit;
}

function Report({ module, challenge, answered, level, onRetry, levelName }: {
  module: Module; challenge: ChallengeDef; answered: Answered[]; level: FinalLevel; onRetry: () => void; levelName: (lv: number) => string;
}) {
  const { t } = useLocale();
  const text = useText();
  const { fp } = useFoundation();
  const patternLabel = usePatternLabel();
  const score = Math.round((answered.filter((a) => a.correct).length / answered.length) * 100);
  const passed = score >= PASS_SCORE;
  const byPart = challenge.parts.map((p) => {
    const mine = answered.filter((a) => a.part === p.id);
    return { part: p, correct: mine.filter((a) => a.correct).length, total: mine.length };
  });
  const units = module.units ?? [];
  // Areas: the word job (Parts of Speech) or the concept (tense by tense).
  const areaMap = new Map<string, Area>();
  for (const a of answered) {
    let key: string | undefined;
    let label = '';
    let concept: string | undefined;
    let unit: Unit | undefined;
    if (challenge.areas === 'pos') {
      const job = a.item.pos ?? (a.item.concept ? CONCEPT_POS[a.item.concept] : undefined);
      if (job) { key = job; label = t(`foundation.pos.${job}`); unit = units.find((u) => u.pos === job); concept = unit?.concept; }
    } else if (a.item.concept) {
      key = a.item.concept; concept = a.item.concept; label = text(getConcept(a.item.concept)?.title ?? ({ en: key, bn: key } as L));
    }
    if (!key) continue;
    const cur = areaMap.get(key) ?? { key, label, correct: 0, total: 0, concept, unit };
    areaMap.set(key, { ...cur, correct: cur.correct + (a.correct ? 1 : 0), total: cur.total + 1 });
  }
  const areas = [...areaMap.values()];
  const rate = (x: Area) => x.correct / x.total;
  const ranked = areas.filter((x) => x.total >= 2).sort((a, b) => rate(b) - rate(a));
  const strongest = ranked.filter((x) => rate(x) >= 0.67).slice(0, 2);
  const weakest = [...ranked].reverse().filter((x) => rate(x) < 0.67).slice(0, 3);
  const missed = answered.filter((a) => !a.correct).slice(0, 5);
  const patterns = fp ? patternsFor(fp, module.id).slice(0, 2) : [];
  const askHref = challenge.id === 'pos' ? '/mino?ask=pos-final' : `/mino?ask=final&challenge=${challenge.id}`;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <Panel variant={passed ? 'brand' : 'muted'} className="space-y-2 text-center">
        <p className="text-sm text-muted-foreground">{t('foundation.final.levelReached', { name: levelName(level) })}</p>
        <h1 className="text-2xl font-semibold">{t(passed ? 'foundation.final.passed' : 'foundation.final.notYet')}</h1>
        <p className="text-3xl font-semibold tabular-nums">{score}%</p>
        <p className="text-sm text-muted-foreground">{t(passed ? 'foundation.final.passedBody' : 'foundation.final.notYetBody', { module: text(module.title) })}</p>
      </Panel>

      <Section title={t('foundation.final.byPart')} variant="label">
        <Panel className="space-y-3">
          {byPart.map((b) => (
            <div key={b.part.id} className="flex items-center gap-3">
              <span className="w-40 shrink-0 truncate text-sm sm:w-48">
                <span className="font-semibold">{b.part.id}</span> · {text(b.part.title)}
              </span>
              <ProgressBar value={b.total ? (b.correct / b.total) * 100 : 0} label={text(b.part.title)} size="sm" tone={b.correct === b.total ? 'success' : 'brand'} className="flex-1" />
              <span className="w-8 text-right text-xs text-muted-foreground tabular-nums">{b.correct}/{b.total}</span>
            </div>
          ))}
        </Panel>
      </Section>

      {areas.length > 0 && (
        <Section title={t(challenge.areas === 'pos' ? 'foundation.final.byJob' : 'foundation.final.byTense')} variant="label">
          <div className="flex flex-wrap gap-2">
            {areas.map((x) => (
              <StatusChip key={x.key} tone={rate(x) >= 0.67 ? 'success' : 'warning'}>
                {x.label} {x.correct}/{x.total}
              </StatusChip>
            ))}
          </div>
        </Section>
      )}

      {(strongest.length > 0 || weakest.length > 0) && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Panel className="space-y-1.5">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{t('foundation.final.strongest')}</p>
            <p className="text-[15px] font-semibold">{strongest.length ? strongest.map((x) => x.label).join(', ') : '—'}</p>
          </Panel>
          <Panel className="space-y-1.5">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{t('foundation.final.weakest')}</p>
            <p className="text-[15px] font-semibold">{weakest.length ? weakest.map((x) => x.label).join(', ') : '—'}</p>
          </Panel>
        </div>
      )}

      {missed.length > 0 && (
        <Section title={t('foundation.final.yourMistakes')} variant="label">
          <Panel className="space-y-3">
            <ul className="space-y-3 text-sm">
              {missed.map((a) => (
                <li key={a.item.id} className="space-y-1 border-l-2 border-amber-500/60 pl-3">
                  {(a.item.sentence ?? (a.item.type === 'spot' ? a.item.words.join(' ') : undefined)) && (
                    <p lang="en" className="text-muted-foreground">{a.item.sentence ?? (a.item.type === 'spot' ? a.item.words.join(' ') : '')}</p>
                  )}
                  <p lang="en" className="font-medium">→ {expectedAnswer(a.item)}</p>
                  <p className="text-foreground/80">{text(a.item.explanation)}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </Section>
      )}

      {(patterns.length > 0 || weakest.length > 0) && (
        <Section title={t('foundation.final.practiseNext')} variant="label">
          <div className="flex flex-col gap-2">
            {patterns.map((p) => (
              <Button key={p.pair} asChild variant="outline" size="lg" className="h-12 justify-between">
                <Link href={`/ielts/foundation/fix/${p.pair}`}>
                  <span className="flex min-w-0 items-center gap-2">
                    <Sparkles className="size-4 shrink-0" /> <span className="truncate">{patternLabel(p)}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground">{t('foundation.units.fixCta')} <ArrowRight /></span>
                </Link>
              </Button>
            ))}
            {weakest.map((x) => {
              const href = x.unit ? `/ielts/foundation/${module.id}/${x.unit.id}` : x.concept ? `/ielts/foundation/review/${x.concept}` : backHrefOf(module);
              return (
                <Button key={x.key} asChild variant="outline" size="lg" className="h-12 justify-between">
                  <Link href={href}>
                    <span className="truncate">{x.unit ? text(x.unit.title) : t('foundation.final.reviewArea', { topic: x.label })}</span> <ArrowRight />
                  </Link>
                </Button>
              );
            })}
          </div>
        </Section>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild size="lg" className={cn('flex-1')}>
          <Link href={askHref}>{challenge.id === 'pos' ? t('foundation.final.askMino') : t('foundation.final.askMinoTenses')}</Link>
        </Button>
        <Button size="lg" variant="outline" className="flex-1" onClick={onRetry}>
          <RotateCcw /> {t('foundation.final.retry')}
        </Button>
      </div>
      <Callout>{t('foundation.final.note')}</Callout>
      <Button asChild variant="ghost" className="w-full">
        <Link href={backHrefOf(module)}>{t('foundation.final.back', { module: text(module.short ?? module.title) })}</Link>
      </Button>
    </div>
  );
}

const backHrefOf = (module: Module) => `/ielts/foundation/${module.id}`;
