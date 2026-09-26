'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, RotateCcw, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, PageHeader, Panel, ProgressBar, Section, StatusChip } from '@/components/ds';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  FINAL_PARTS, FINAL_PER_PART, finalStartLevel, nextFinalLevel, PASS_SCORE, pickFinalItem, posPatterns, recordAnswer, recordFinal,
  type FinalItem, type FinalLevel, type Module, type Pos, type Unit,
} from '@/lib/foundation';
import type { FoundationProgress } from '@/lib/models';
import { ExerciseView } from './ExerciseView';
import { UnitMark, usePatternLabel } from './UnitsDashboard';
import { useFoundation, useText } from './useFoundation';

const TOTAL = FINAL_PARTS.length * FINAL_PER_PART;

interface Answered {
  part: string;
  item: FinalItem;
  correct: boolean;
}

/**
 * Final Mastery Challenge: 10 parts × 3 questions, adaptive (right → harder,
 * wrong → easier), many without options. Ends with a report by part and by
 * word job, the level reached and what to practise next.
 */
export function MasteryChallenge({ module, unit, fp }: { module: Module; unit: Unit; fp: FoundationProgress }) {
  const { t } = useLocale();
  const text = useText();
  const { update, fp: live } = useFoundation();
  const [phase, setPhase] = useState<'intro' | 'run' | 'report'>('intro');
  const [round, setRound] = useState(0);
  const [partIndex, setPartIndex] = useState(0);
  const [level, setLevel] = useState<FinalLevel>(() => finalStartLevel(fp));
  const [answered, setAnswered] = useState<Answered[]>([]);
  const used = useRef(new Set<string>());
  const seed = useMemo(() => `${Date.now()}`, [round]); // eslint-disable-line react-hooks/exhaustive-deps
  const [item, setItem] = useState<FinalItem | undefined>();
  const backHref = `/ielts/foundation/${module.id}`;
  const levelName = (lv: number) => t(`foundation.final.levels.${lv}`);

  const start = () => {
    used.current = new Set();
    const lv = finalStartLevel(live ?? fp);
    const first = pickFinalItem(FINAL_PARTS[0].items, lv, used.current, `${seed}:A`)!;
    used.current.add(first.id);
    setLevel(lv);
    setPartIndex(0);
    setAnswered([]);
    setItem(first);
    setPhase('run');
    window.scrollTo({ top: 0 });
  };

  if (phase === 'intro') {
    const last = fp.posFinal;
    return (
      <div className="space-y-8">
        <PageHeader title={text(unit.title)} subtitle={text(unit.tagline)} backHref={backHref} backLabel={text(module.title)} action={<UnitMark unit={unit} className="size-12 text-base" />} />
        <Panel variant="brand" className="space-y-4">
          <p className="leading-7">{t('foundation.final.intro', { n: TOTAL })}</p>
          {last && <p className="text-sm font-medium tabular-nums">{t('foundation.final.last', { score: last.score, best: last.best })}</p>}
          <Button size="lg" className="h-12 w-full sm:w-auto" onClick={start}>
            {last ? t('foundation.final.retry') : t('foundation.final.start')} <ArrowRight />
          </Button>
        </Panel>
        <Section title={t('foundation.final.partsTitle')} variant="label">
          <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {FINAL_PARTS.map((p) => {
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

  if (phase === 'report') return <Report module={module} answered={answered} level={level} onRetry={() => { setRound((r) => r + 1); setPhase('intro'); }} levelName={levelName} />;

  const part = FINAL_PARTS[partIndex];
  const n = answered.length;
  const last = n === TOTAL - 1;
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" aria-label={t('foundation.lesson.exit')}>
            <Link href={backHref} onClick={(e) => { if (n > 0 && !window.confirm(t('foundation.final.quit'))) e.preventDefault(); }}>
              <X />
            </Link>
          </Button>
          <h1 className="min-w-0 flex-1 truncate text-lg font-semibold">{text(unit.title)}</h1>
          <span className="text-xs text-muted-foreground tabular-nums">{t('foundation.lesson.exerciseOf', { n: n + 1, total: TOTAL })}</span>
        </div>
        <ProgressBar value={((n + 1) / TOTAL) * 100} label={text(unit.title)} size="sm" />
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
            onAnswer={(r) => update((p) => recordAnswer(p, { source: 'final', exercise: item, answer: r.answer, correct: r.correct, attempt: (fp.posFinal?.attempts ?? 0) + 1 }))}
            onDone={(r) => {
              const correct = r.correct === true;
              const next = [...answered, { part: part.id, item, correct }];
              const nextLevel = nextFinalLevel(level, correct);
              setAnswered(next);
              setLevel(nextLevel);
              window.scrollTo({ top: 0 });
              if (next.length >= TOTAL) {
                const score = Math.round((next.filter((a) => a.correct).length / next.length) * 100);
                const parts = Object.fromEntries(FINAL_PARTS.map((p) => {
                  const mine = next.filter((a) => a.part === p.id);
                  return [p.id, { correct: mine.filter((a) => a.correct).length, total: mine.length }];
                }));
                update((p) => recordFinal(p, { score, level: nextLevel, parts }));
                setPhase('report');
                return;
              }
              const inPart = next.filter((a) => a.part === part.id).length;
              const pi = inPart >= FINAL_PER_PART ? partIndex + 1 : partIndex;
              const nextItem = pickFinalItem(FINAL_PARTS[pi].items, nextLevel, used.current, `${seed}:${FINAL_PARTS[pi].id}`)!;
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

function Report({ module, answered, level, onRetry, levelName }: { module: Module; answered: Answered[]; level: FinalLevel; onRetry: () => void; levelName: (lv: number) => string }) {
  const { t } = useLocale();
  const text = useText();
  const { fp } = useFoundation();
  const patternLabel = usePatternLabel();
  const score = Math.round((answered.filter((a) => a.correct).length / answered.length) * 100);
  const passed = score >= PASS_SCORE;
  const byPart = FINAL_PARTS.map((p) => {
    const mine = answered.filter((a) => a.part === p.id);
    return { part: p, correct: mine.filter((a) => a.correct).length, total: mine.length };
  });
  // By word job: the job an item checks (its own, or its unit's).
  const jobs = new Map<Pos, { correct: number; total: number }>();
  for (const a of answered) {
    const job = a.item.pos ?? (a.item.concept ? CONCEPT_POS[a.item.concept] : undefined);
    if (!job) continue;
    const cur = jobs.get(job) ?? { correct: 0, total: 0 };
    jobs.set(job, { correct: cur.correct + (a.correct ? 1 : 0), total: cur.total + 1 });
  }
  const weakParts = byPart.filter((b) => b.total && b.correct / b.total < 0.67).slice(0, 3);
  const patterns = fp ? posPatterns(fp).slice(0, 2) : [];
  const units = module.units ?? [];
  const weakJobs = [...jobs.entries()].filter(([, v]) => v.correct / v.total < 0.67).map(([j]) => units.find((u) => u.pos === j)).filter((u): u is Unit => Boolean(u)).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <Panel variant={passed ? 'brand' : 'muted'} className="space-y-2 text-center">
        <p className="text-sm text-muted-foreground">{t('foundation.final.levelReached', { name: levelName(level) })}</p>
        <h1 className="text-2xl font-semibold">{t(passed ? 'foundation.final.passed' : 'foundation.final.notYet')}</h1>
        <p className="text-3xl font-semibold tabular-nums">{score}%</p>
        <p className="text-sm text-muted-foreground">{t(passed ? 'foundation.final.passedBody' : 'foundation.final.notYetBody')}</p>
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

      {jobs.size > 0 && (
        <Section title={t('foundation.final.byJob')} variant="label">
          <div className="flex flex-wrap gap-2">
            {[...jobs.entries()].map(([job, v]) => (
              <StatusChip key={job} tone={v.correct / v.total >= 0.67 ? 'success' : 'warning'}>
                {t(`foundation.pos.${job}`)} {v.correct}/{v.total}
              </StatusChip>
            ))}
          </div>
        </Section>
      )}

      {(weakParts.length > 0 || patterns.length > 0 || weakJobs.length > 0) && (
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
            {weakJobs.map((u) => (
              <Button key={u.id} asChild variant="outline" size="lg" className="h-12 justify-between">
                <Link href={`/ielts/foundation/${module.id}/${u.id}`}>
                  {text(u.title)} <ArrowRight />
                </Link>
              </Button>
            ))}
            {weakParts.length > 0 && weakJobs.length === 0 && (
              <Button asChild variant="outline" size="lg" className="h-12 justify-between">
                <Link href={`/ielts/foundation/${module.id}/lab`}>
                  {text(units.find((u) => u.id === 'lab')?.title ?? { en: 'Lab', bn: 'Lab' })} <ArrowRight />
                </Link>
              </Button>
            )}
          </div>
        </Section>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild size="lg" className="flex-1">
          <Link href="/mino?ask=pos-final">{t('foundation.final.askMino')}</Link>
        </Button>
        <Button size="lg" variant="outline" className="flex-1" onClick={onRetry}>
          <RotateCcw /> {t('foundation.final.retry')}
        </Button>
      </div>
      <Callout>{t('foundation.final.note')}</Callout>
      <Button asChild variant="ghost" className="w-full">
        <Link href={`/ielts/foundation/${module.id}`}>{t('foundation.final.back')}</Link>
      </Button>
    </div>
  );
}
