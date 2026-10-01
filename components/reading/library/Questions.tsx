'use client';

import { CheckCircle2, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  explainOf, flatten, gradeGap, groupRange, marksFor, modelAnswer, optionsFor,
  type FlatQuestion, type GapGroup, type LibraryPassage, type MultiGroup, type Option, type QuestionGroup, type SelectGroup,
} from '@/lib/content/reading-library';
import { cn } from '@/lib/utils';

type Answers = Record<string, string>;

interface QuestionsProps {
  passage: LibraryPassage;
  answers: Answers;
  checked: boolean;
  onAnswer: (id: string, value: string) => void;
}

/** All question groups of a library passage, IELTS-numbered, with feedback after checking. */
export function Questions({ passage, answers, checked, onAnswer }: QuestionsProps) {
  const flat = flatten(passage);
  const byId = new Map(flat.map((q) => [q.id, q]));
  return (
    <div className="space-y-8">
      {passage.groups.map((g, gi) => (
        <Group key={gi} passage={passage} group={g} byId={byId} answers={answers} checked={checked} onAnswer={onAnswer} />
      ))}
    </div>
  );
}

function Group({
  passage, group, byId, answers, checked, onAnswer,
}: { passage: LibraryPassage; group: QuestionGroup; byId: Map<string, FlatQuestion> } & Omit<QuestionsProps, 'passage'>) {
  const { t, locale } = useLocale();
  const [from, to] = groupRange(passage, group);
  return (
    <section className="space-y-4" data-testid="question-group">
      <div className="space-y-1">
        <h3 className="text-[15px] font-semibold">{from === to ? `${t('reading.lib.questionsTitle')} ${from}` : t('reading.lib.questionsRange', { from, to })}</h3>
        <p className="text-sm text-muted-foreground">{locale === 'bn' ? group.instruction.bn : group.instruction.en}</p>
      </div>
      {group.kind === 'select' && <SelectBlock passage={passage} group={group} byId={byId} answers={answers} checked={checked} onAnswer={onAnswer} />}
      {group.kind === 'multi' && <MultiBlock group={group} byId={byId} answers={answers} checked={checked} onAnswer={onAnswer} />}
      {group.kind === 'gap' && <GapBlock group={group} byId={byId} answers={answers} checked={checked} onAnswer={onAnswer} />}
    </section>
  );
}

type BlockProps = { byId: Map<string, FlatQuestion>; answers: Answers; checked: boolean; onAnswer: (id: string, value: string) => void };

/** A shared list of options (headings, names) printed once above the items. */
function OptionList({ options }: { options: Option[] }) {
  return (
    <ul className="space-y-1 rounded-xl border bg-muted/40 p-3 text-sm" lang="en">
      {options.map((o) => (
        <li key={o.value} className="flex gap-2">
          <span className="w-7 shrink-0 font-semibold">{o.value}</span>
          <span className="min-w-0">{o.label}</span>
        </li>
      ))}
    </ul>
  );
}

function Choice({ selected, disabled, onClick, children, testId }: { selected: boolean; disabled: boolean; onClick: () => void; children: React.ReactNode; testId?: string }) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      data-testid={testId}
      onClick={onClick}
      className={cn(
        'min-h-10 rounded-lg border px-3 py-2 text-left text-sm transition-colors disabled:cursor-default',
        selected ? 'border-brand bg-brand-soft font-medium text-brand' : 'bg-card hover:bg-muted/60',
      )}
    >
      {children}
    </button>
  );
}

function SelectBlock({ passage, group, byId, answers, checked, onAnswer }: BlockProps & { passage: LibraryPassage; group: SelectGroup }) {
  const shared = group.type === 'headings' || group.type === 'names';
  const long = group.type === 'mcq';
  return (
    <div className="space-y-4">
      {shared && group.options && <OptionList options={group.options} />}
      {group.items.map((item) => {
        const q = byId.get(item.id)!;
        const options = optionsFor(passage, group, item);
        return (
          <div key={item.id} className="space-y-2" data-testid={`q-${item.id}`}>
            <p className="text-[15px]" lang="en">
              <span className="mr-2 font-semibold">{q.number}</span>
              {item.prompt}
            </p>
            <div className={cn(long ? 'grid gap-2' : 'flex flex-wrap gap-2')}>
              {options.map((o) => (
                <Choice key={o.value} selected={answers[item.id] === o.value} disabled={checked} onClick={() => onAnswer(item.id, o.value)} testId={`opt-${item.id}-${o.value}`}>
                  {long ? (
                    <span lang="en">
                      <span className="mr-2 font-semibold">{o.value}</span>
                      {o.label}
                    </span>
                  ) : (
                    o.value
                  )}
                </Choice>
              ))}
            </div>
            {checked && <Feedback q={q} answer={answers[item.id]} />}
          </div>
        );
      })}
    </div>
  );
}

function MultiBlock({ group, byId, answers, checked, onAnswer }: BlockProps & { group: MultiGroup }) {
  const q = byId.get(group.item.id)!;
  const need = group.item.answers.length;
  const chosen = (answers[group.item.id] ?? '').split(',').filter(Boolean);
  const toggle = (v: string) => {
    const next = chosen.includes(v) ? chosen.filter((x) => x !== v) : chosen.length < need ? [...chosen, v] : chosen;
    onAnswer(group.item.id, [...next].sort().join(','));
  };
  return (
    <div className="space-y-2" data-testid={`q-${group.item.id}`}>
      <p className="text-[15px]" lang="en">
        <span className="mr-2 font-semibold">
          {q.number}–{q.number + need - 1}
        </span>
        {group.item.prompt}
      </p>
      <div className="grid gap-2">
        {group.item.options.map((o) => (
          <Choice key={o.value} selected={chosen.includes(o.value)} disabled={checked} onClick={() => toggle(o.value)} testId={`opt-${group.item.id}-${o.value}`}>
            <span lang="en">
              <span className="mr-2 font-semibold">{o.value}</span>
              {o.label}
            </span>
          </Choice>
        ))}
      </div>
      {checked && <Feedback q={q} answer={answers[group.item.id]} />}
    </div>
  );
}

function GapInput({ q, answers, checked, onAnswer, className }: BlockProps & { q: FlatQuestion; className?: string }) {
  const { t } = useLocale();
  const verdict = q.kind === 'gap' ? gradeGap(q.group, q.item, answers[q.id]) : undefined;
  return (
    <span className={cn('inline-flex items-center gap-1 align-middle', className)}>
      <span className="text-xs font-semibold text-muted-foreground">{q.number}</span>
      <Input
        value={answers[q.id] ?? ''}
        disabled={checked}
        onChange={(e) => onAnswer(q.id, e.target.value)}
        aria-label={`${t('reading.lib.typeAnswer')} ${q.number}`}
        data-testid={`gap-${q.id}`}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        className={cn(
          'h-8 w-36 max-w-full px-2 text-sm sm:w-40',
          checked && (verdict?.correct ? 'border-success text-success' : 'border-destructive text-destructive'),
        )}
      />
    </span>
  );
}

/** Replaces [[id]] placeholders (and ___ in sentence prompts) with inputs. */
function WithGaps({ text, block, placeholder }: { text: string; block: BlockProps; placeholder?: FlatQuestion }) {
  const parts = placeholder ? text.split('___') : text.split(/(\[\[[^\]]+\]\])/);
  return (
    <>
      {parts.map((part, i) => {
        if (placeholder) {
          return (
            <span key={i}>
              {part}
              {i < parts.length - 1 && <GapInput q={placeholder} {...block} className="mx-1" />}
            </span>
          );
        }
        const m = part.match(/^\[\[([^\]]+)\]\]$/);
        const q = m ? block.byId.get(m[1]) : undefined;
        return q ? <GapInput key={i} q={q} {...block} className="mx-1 my-0.5" /> : <span key={i}>{part}</span>;
      })}
    </>
  );
}

function GapBlock({ group, ...block }: BlockProps & { group: GapGroup }) {
  const items = group.items.map((it) => block.byId.get(it.id)!);
  return (
    <div className="space-y-3">
      {group.title && <p className="text-sm font-semibold" lang="en">{group.title}</p>}
      {group.lines && (
        <div className="space-y-2 rounded-xl border p-3 text-[15px] leading-9" lang="en">
          {group.lines.map((line, i) => (
            <p key={i}>
              <WithGaps text={line} block={block} />
            </p>
          ))}
        </div>
      )}
      {group.table && (
        <>
        {/* Phones: one card per row, so nothing scrolls sideways. */}
        <div className="space-y-2 sm:hidden" lang="en">
          {group.table.rows.map((row, ri) => (
            <div key={ri} className="space-y-1 rounded-xl border p-3 text-sm">
              {row.map((cell, ci) => (
                <p key={ci} className="leading-8">
                  <span className="mr-1 text-xs font-semibold text-muted-foreground">{group.table!.head[ci]}:</span>
                  <WithGaps text={cell} block={block} />
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="hidden rounded-xl border sm:block" lang="en">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {group.table.head.map((h) => (
                  <th key={h} className="px-3 py-2 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {group.table.rows.map((row, ri) => (
                <tr key={ri} className="border-t">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 align-top leading-8">
                      <WithGaps text={cell} block={block} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}
      {!group.lines && !group.table && (
        <div className="space-y-3">
          {items.map((q) =>
            q.kind === 'gap' ? (
              <p key={q.id} className="text-[15px] leading-9" lang="en">
                {q.item.prompt?.includes('___') ? (
                  <WithGaps text={q.item.prompt} block={block} placeholder={q} />
                ) : (
                  <>
                    <span>{q.item.prompt}</span> <GapInput q={q} {...block} />
                  </>
                )}
              </p>
            ) : null,
          )}
        </div>
      )}
      {block.checked && (
        <div className="space-y-2">
          {items.map((q) => (
            <Feedback key={q.id} q={q} answer={block.answers[q.id]} numbered />
          ))}
        </div>
      )}
    </div>
  );
}

/** Right or wrong, the model answer, and the explanation — in Bangla whenever the answer was wrong. */
function Feedback({ q, answer, numbered }: { q: FlatQuestion; answer: string | undefined; numbered?: boolean }) {
  const { t, locale } = useLocale();
  const full = q.kind === 'multi' ? q.count : 1;
  const marks = marksFor(q, answer);
  const correct = marks === full;
  const explain = explainOf(q);
  const reason = q.kind === 'gap' ? gradeGap(q.group, q.item, answer).reason : !answer ? 'blank' : undefined;
  return (
    <div
      className={cn('space-y-1 rounded-xl border px-3 py-2 text-sm', correct ? 'border-success/30 bg-success-soft/50' : 'border-destructive/30 bg-destructive-soft/40')}
      data-testid={`fb-${q.id}`}
      data-correct={correct}
    >
      <p className={cn('flex items-center gap-1.5 font-semibold', correct ? 'text-success' : 'text-destructive')}>
        {correct ? <CheckCircle2 className="size-4" aria-hidden /> : <XCircle className="size-4" aria-hidden />}
        {numbered && <span>{q.number}.</span>}
        {correct ? t('reading.lib.correct') : t('reading.lib.wrong')}
        {q.kind === 'multi' && ` (${marks}/${full})`}
      </p>
      {!correct && (
        <p className="text-muted-foreground">
          {reason === 'blank' ? t('reading.lib.blank') : t('reading.lib.yourAnswer', { answer: answer ?? '' })}
          {reason === 'limit' && q.kind === 'gap' ? ` ${t('reading.lib.limit', { n: q.group.maxWords })}` : ''}
        </p>
      )}
      <p>
        <span className="font-medium">{t('reading.lib.answer', { answer: !correct && q.kind === 'gap' ? q.item.accepted.join(' / ') : modelAnswer(q) })}</span>
      </p>
      {locale === 'en' && <p lang="en">{explain.en}</p>}
      {(locale === 'bn' || !correct) && (
        <p lang="bn">
          {locale === 'en' && <span className="font-medium">{t('reading.lib.inBangla')}: </span>}
          {explain.bn}
        </p>
      )}
    </div>
  );
}
