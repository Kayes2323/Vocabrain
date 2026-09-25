'use client';

import { Fragment } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { answerMode, optionsFor, type AnswerValue, type Answers, type Option, type Question, type QuestionGroup } from '@/lib/ielts';
import { cn } from '@/lib/utils';
import { questionRange } from './labels';

interface GroupProps {
  group: QuestionGroup;
  answers: Answers;
  onAnswer: (key: string, value: AnswerValue) => void;
  onFocusQuestion: (number: number) => void;
  current: number;
}

/** Renders any question group from its data; one component for every test. */
export function QuestionGroupView(props: GroupProps) {
  const { t } = useLocale();
  const { group } = props;
  const mode = answerMode(group);
  const numbers = group.questions.map((q) => q.number);

  return (
    <section aria-labelledby={`${group.id}-title`} className="space-y-4">
      <div className="space-y-1.5">
        <h3 id={`${group.id}-title`} className="font-semibold">
          {t('tests.questions', { range: questionRange(numbers) })}
        </h3>
        <p className="text-sm text-muted-foreground">{group.instructions}</p>
      </div>

      {mode === 'select' && group.options && <OptionList title={group.optionsTitle} options={group.options} />}

      {mode === 'multi-choice' ? (
        <MultiChoice {...props} />
      ) : mode === 'text' && group.template ? (
        <TemplateCompletion {...props} />
      ) : mode === 'text' && group.table ? (
        <TableCompletion {...props} />
      ) : (
        <ol className="space-y-5">
          {group.questions.map((q, i) => (
            <li key={q.id} id={mode === 'text' ? undefined : `q-${q.number}`} className="scroll-mt-28">
              {mode === 'choice' && <SingleChoice {...props} question={q} options={optionsFor(group, i)} />}
              {mode === 'select' && <SelectAnswer {...props} question={q} options={optionsFor(group, i)} />}
              {mode === 'text' && <SentenceCompletion {...props} question={q} />}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function Num({ n, active }: { n: number; active?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-md border px-1 text-xs font-semibold tabular-nums',
        active ? 'border-primary bg-primary text-primary-foreground' : 'bg-muted',
      )}
    >
      {n}
    </span>
  );
}

function OptionList({ title, options }: { title?: string; options: Option[] }) {
  return (
    <div className="rounded-xl border bg-muted/40 p-4">
      {title && <p className="mb-2 text-sm font-semibold">{title}</p>}
      <ul className="space-y-1 text-sm">
        {options.map((o) => (
          <li key={o.id} className="flex gap-3">
            <span className="w-8 shrink-0 font-semibold">{o.id}</span>
            <span>{o.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type QuestionProps = GroupProps & { question: Question };

function SingleChoice({ question, options, answers, onAnswer, onFocusQuestion, current, group }: QuestionProps & { options: Option[] }) {
  const value = answers[question.id];
  const compact = group.type === 'true-false-not-given' || group.type === 'yes-no-not-given';
  return (
    <fieldset className="space-y-2.5">
      <legend className="flex gap-2.5">
        <Num n={question.number} active={current === question.number} />
        <span>{question.prompt}</span>
      </legend>
      <div className={cn(compact ? 'flex flex-wrap gap-2 pl-8.5' : 'space-y-2 pl-8.5')}>
        {options.map((o, i) => {
          const checked = value === o.id;
          return (
            <label
              key={o.id}
              className={cn(
                'flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/40',
                checked ? 'border-primary bg-primary/5' : 'hover:bg-muted/60',
              )}
            >
              <input
                type="radio"
                className="sr-only"
                name={question.id}
                id={i === 0 ? `q-${question.number}-input` : undefined}
                value={o.id}
                checked={checked}
                onChange={() => onAnswer(question.id, o.id)}
                onFocus={() => onFocusQuestion(question.number)}
              />
              {!compact && <span className="font-semibold">{o.id}</span>}
              <span>{o.text}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function SelectAnswer({ question, options, answers, onAnswer, onFocusQuestion, current }: QuestionProps & { options: Option[] }) {
  const { t } = useLocale();
  const value = answers[question.id];
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Num n={question.number} active={current === question.number} />
      {question.prompt && <label htmlFor={`q-${question.number}-input`} className="flex-1 basis-40">{question.prompt}</label>}
      <select
        id={`q-${question.number}-input`}
        aria-label={question.prompt ? undefined : t('tests.questionN', { n: question.number })}
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onAnswer(question.id, e.target.value)}
        onFocus={() => onFocusQuestion(question.number)}
        className="h-10 w-full max-w-72 rounded-lg border bg-background px-2 text-sm sm:w-auto"
      >
        <option value="">{t('tests.choose')}</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.id === o.text ? o.id : `${o.id}  ${o.text}`}
          </option>
        ))}
      </select>
    </div>
  );
}

function MultiChoice({ group, answers, onAnswer, onFocusQuestion, current }: GroupProps) {
  const { t } = useLocale();
  const chosen = (answers[group.id] as string[] | undefined) ?? [];
  const limit = group.choose ?? group.questions.length;
  const first = group.questions[0].number;
  const numbers = group.questions.map((q) => q.number);
  const toggle = (id: string) =>
    onAnswer(group.id, chosen.includes(id) ? chosen.filter((c) => c !== id) : chosen.length < limit ? [...chosen, id] : chosen);

  return (
    <fieldset id={`q-${first}`} className="scroll-mt-28 space-y-2.5">
      {numbers.slice(1).map((n) => (
        <span key={n} id={`q-${n}`} className="scroll-mt-28" />
      ))}
      <legend className="flex gap-2.5">
        <span className="flex gap-1">
          {numbers.map((n) => (
            <Num key={n} n={n} active={current === n} />
          ))}
        </span>
        <span>{group.stem}</span>
      </legend>
      <p className="pl-1 text-xs text-muted-foreground">{t('tests.chosen', { n: chosen.length, total: limit })}</p>
      <div className="space-y-2">
        {group.options?.map((o, i) => {
          const checked = chosen.includes(o.id);
          const disabled = !checked && chosen.length >= limit;
          return (
            <label
              key={o.id}
              className={cn(
                'flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/40',
                checked ? 'border-primary bg-primary/5' : 'hover:bg-muted/60',
                disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              <input
                type="checkbox"
                className="sr-only"
                id={i === 0 ? `q-${first}-input` : undefined}
                checked={checked}
                disabled={disabled}
                onChange={() => toggle(o.id)}
                onFocus={() => onFocusQuestion(first)}
              />
              <span className="font-semibold">{o.id}</span>
              <span>{o.text}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Gap({ number, answers, onAnswer, onFocusQuestion, current, questionId }: GroupProps & { number: number; questionId: string }) {
  const { t } = useLocale();
  const value = answers[questionId];
  return (
    <span id={`q-${number}`} className="inline-flex scroll-mt-28 items-center gap-1 align-baseline">
      <Num n={number} active={current === number} />
      <input
        id={`q-${number}-input`}
        aria-label={t('tests.questionN', { n: number })}
        value={typeof value === 'string' ? value : ''}
        onChange={(e) => onAnswer(questionId, e.target.value)}
        onFocus={() => onFocusQuestion(number)}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        className="h-8 w-36 rounded-md border bg-background px-2 text-sm outline-none focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring/30"
      />
    </span>
  );
}

/** Splits "text {{9}} more" into text and gaps. */
function renderWithGaps(text: string, props: GroupProps) {
  const byNumber = new Map(props.group.questions.map((q) => [q.number, q]));
  return text.split(/(\{\{\d+\}\})/).map((chunk, i) => {
    const m = chunk.match(/^\{\{(\d+)\}\}$/);
    const q = m ? byNumber.get(Number(m[1])) : undefined;
    return q ? <Gap key={i} {...props} number={q.number} questionId={q.id} /> : <Fragment key={i}>{chunk}</Fragment>;
  });
}

function TemplateCompletion(props: GroupProps) {
  return (
    <div className="space-y-3 rounded-xl border p-4 leading-9">
      {props.group.template!.split('\n').map((line, i) => (
        <p key={i}>{renderWithGaps(line, props)}</p>
      ))}
    </div>
  );
}

function TableCompletion(props: GroupProps) {
  const { headers, rows } = props.group.table!;
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[32rem] text-sm">
        <thead className="bg-muted/60 text-left">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-t">
              {row.map((cell, c) => (
                <td key={c} className="px-3 py-2 align-middle">
                  {renderWithGaps(cell, props)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SentenceCompletion(props: QuestionProps) {
  const { question } = props;
  const [before, after = ''] = (question.prompt ?? '___').split('___');
  return (
    <p className="leading-9">
      {before}
      <Gap {...props} number={question.number} questionId={question.id} />
      {after}
    </p>
  );
}
