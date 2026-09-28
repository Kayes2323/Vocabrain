'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Info, MessageCircle, RotateCcw, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Callout, PageHeader, Panel, StatusChip } from '@/components/ds';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { lemmaCandidates, unknownWordInfo } from '@/lib/content/dictionary';
import {
  LEXICON, LIBRARY, flatten, nextPassage, paragraphLetter, questionCount, scorePassage, segmentParagraph, vocabView, vocabWordInfo,
  type LibraryPassage, type PassageVocab, type VocabView,
} from '@/lib/content/reading-library';
import { markActivityDone, wordId } from '@/lib/engine';
import type { WordSource } from '@/lib/models';
import { cn } from '@/lib/utils';
import { keepWordVisible } from '../CardFrame';
import { sentenceAt, tokenize } from '../tokenize';
import { MeaningCard } from '../MeaningCard';
import { meaningWordInfo, resultLemma, useMeaningLookup } from '../word-meaning';
import { Questions } from './Questions';
import { VocabCard } from './VocabCard';

type Selection =
  | { kind: 'vocab'; key: string; view: VocabView; surface: string; sentence: string }
  | { kind: 'word'; key: string; token: string; sentence: string };

/** Link that opens Mino with a question about one sentence (only when the student asks). */
export function minoReadingHref(passageId: string, sentence: string, word?: string) {
  const params = new URLSearchParams({ ask: 'reading', passage: passageId, s: sentence.slice(0, 400) });
  if (word) params.set('w', word.slice(0, 60));
  return `/mino?${params.toString()}`;
}

export function LibraryReader({ passage }: { passage: LibraryPassage }) {
  const { t } = useLocale();
  const brain = useBrain();
  const { profile, updateProfile } = useProfile();
  const stored = profile?.study.readingLibrary?.[passage.id];

  const [answers, setAnswers] = useState<Record<string, string>>(() => stored?.answers ?? {});
  const [checked, setChecked] = useState<boolean>(() => !!stored?.checked);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [vocabReady, setVocabReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const meaning = useMeaningLookup(passage.id);
  const vocabTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const total = questionCount(passage);
  const score = useMemo(() => scorePassage(passage, answers), [passage, answers]);
  const unanswered = flatten(passage).filter((q) => !(answers[q.id] ?? '').trim()).length;
  const savedLemmas = new Set(brain.words.map((w) => w.lemma));

  // Autosave answers (debounced) so a reload or another device picks up where the student left off.
  const persist = useCallback(
    (next: Record<string, string>, isChecked: boolean) => {
      updateProfile((p) => {
        const all = { ...(p.study.readingLibrary ?? {}) };
        const s = scorePassage(passage, next);
        all[passage.id] = {
          answers: next,
          ...(isChecked ? { checked: true, score: s } : all[passage.id]?.score ? { score: all[passage.id].score } : {}),
          updatedAt: new Date().toISOString(),
        };
        let study = { ...p.study, readingLibrary: all };
        if (isChecked) {
          const read = new Set(p.study.readPassages ?? []);
          read.add(passage.id);
          study = { ...study, readPassages: [...read] };
        }
        const updated = { ...p, study };
        return isChecked ? markActivityDone(updated, 'reading') : updated;
      });
    },
    [passage, updateProfile],
  );

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pending = useRef<Record<string, string> | null>(null);
  const flush = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    if (pending.current) {
      persist(pending.current, false);
      pending.current = null;
    }
  }, [persist]);
  useEffect(() => flush, [flush]);

  const onAnswer = (id: string, value: string) => {
    if (checked) return;
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      pending.current = next;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(flush, 600);
      return next;
    });
  };

  const check = () => {
    if (timer.current) clearTimeout(timer.current);
    pending.current = null;
    setChecked(true);
    persist(answers, true);
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const retry = () => {
    setChecked(false);
    setAnswers({});
    updateProfile((p) => {
      const all = { ...(p.study.readingLibrary ?? {}) };
      const prev = all[passage.id];
      // Keep the last checked result, clear the answers for a fresh attempt.
      all[passage.id] = { answers: {}, ...(prev?.score ? { score: prev.score } : {}), updatedAt: new Date().toISOString() };
      return { ...p, study: { ...p.study, readingLibrary: all } };
    });
  };

  const pickVocab = (key: string, v: PassageVocab, surface: string, sentence: string) => {
    const lex = LEXICON[v.lemma];
    if (!lex) return;
    meaning.cancel();
    setSelection({ kind: 'vocab', key, view: vocabView(lex, v), surface, sentence });
    // Key words are written in the lexicon; Mino's short loading keeps every word click the same.
    setVocabReady(false);
    if (vocabTimer.current) clearTimeout(vocabTimer.current);
    vocabTimer.current = setTimeout(() => setVocabReady(true), 300);
  };

  /** Any other word: Mino explains it in this sentence (once per word per passage, then cached). */
  const pickWord = (key: string, token: string, sentence: string) => {
    setSelection({ kind: 'word', key, token, sentence });
    void meaning.lookup(token, sentence);
  };
  useEffect(() => () => {
    if (vocabTimer.current) clearTimeout(vocabTimer.current);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelection(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const source: WordSource = { type: 'reading-passage', title: passage.title, passageId: passage.id, licenseStatus: 'original' };
  const save = async () => {
    if (!selection) return;
    setSaving(true);
    try {
      const r = meaning.result;
      const wordInfo =
        selection.kind === 'vocab'
          ? vocabWordInfo(selection.view)
          : r?.kind === 'mino'
            ? meaningWordInfo(r.meaning)
            : (r?.info ?? unknownWordInfo(selection.token));
      const word = await brain.save(wordInfo, source, selection.sentence);
      toast.success(t('reading.savedToast', { word: word.word }));
    } catch {
      toast.error(t('reading.saveError'));
    } finally {
      setSaving(false);
    }
  };

  const savedId = (() => {
    if (!selection) return undefined;
    if (selection.kind === 'vocab') return brain.words.find((w) => w.lemma === selection.view.lemma)?.id;
    const lemma = resultLemma(meaning.result);
    return brain.words.find((w) => lemmaCandidates(selection.token).includes(w.lemma) || (lemma && w.id === wordId(lemma)))?.id;
  })();

  const askMino = selection && (
    <Link
      href={minoReadingHref(passage.id, selection.sentence, selection.kind === 'vocab' ? selection.surface : selection.token)}
      className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-brand hover:underline"
      data-testid="ask-mino-sentence"
    >
      <MessageCircle className="size-4" aria-hidden /> {t('reading.lib.askMino')}
    </Link>
  );

  const next = nextPassage(LIBRARY, { ...(profile?.study.readingLibrary ?? {}), [passage.id]: { answers, checked: true, updatedAt: '' } });

  return (
    <div className={cn('pb-40', selection && 'pb-[60dvh]')}>
      <PageHeader
        title={passage.title}
        subtitle={
          <span className="inline-flex flex-wrap items-center gap-2">
            <StatusChip tone="brand">{t(`reading.lib.levels.${passage.level}`)}</StatusChip>
            <span>
              {passage.topic} · {t('common.minutes', { n: passage.minutes })} · {t('reading.lib.questions', { n: total })}
            </span>
          </span>
        }
        backHref="/ielts/reading"
        backLabel={t('skills.reading')}
      />

      <Callout tone="brand" icon={Sparkles} className="mb-6 max-w-[68ch]">
        {t('reading.lib.hint')}
      </Callout>

      <article className="max-w-[68ch] space-y-5 text-[17px] leading-[1.85] text-foreground/90" lang="en" data-testid="library-passage">
        {passage.paragraphs.map((paragraph, pi) => (
          <div key={pi} className="flex gap-3">
            <span className="mt-[3px] w-5 shrink-0 text-sm font-semibold text-muted-foreground" aria-label={`Paragraph ${paragraphLetter(pi)}`}>
              {paragraphLetter(pi)}
            </span>
            <p className="min-w-0 break-words">
              {segmentParagraph(paragraph, passage.vocab).map((seg, si) => {
                if (seg.vocab) {
                  const key = `${pi}:v${si}`;
                  const active = selection?.key === key;
                  const saved = savedLemmas.has(seg.vocab.lemma);
                  const v = seg.vocab;
                  return (
                    <button
                      key={key}
                      type="button"
                      data-testid="vocab-word"
                      data-lemma={v.lemma}
                      onClick={(e) => { keepWordVisible(e.currentTarget); pickVocab(key, v, seg.text, sentenceAt(paragraph, seg.start)); }}
                      className={cn(
                        'rounded-[3px] px-[1px] text-left underline decoration-brand/50 decoration-dotted decoration-2 underline-offset-4 transition-colors hover:bg-brand-soft focus-visible:bg-brand-soft focus-visible:outline-none',
                        saved && 'decoration-brand decoration-solid',
                        active && 'bg-brand-soft text-brand',
                      )}
                    >
                      {seg.text}
                    </button>
                  );
                }
                return tokenize(seg.text).map((tok, ti) => {
                  if (!tok.isWord) return <span key={`${si}:${ti}`}>{tok.text}</span>;
                  const key = `${pi}:${si}:${ti}`;
                  const active = selection?.key === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={(e) => { keepWordVisible(e.currentTarget); pickWord(key, tok.text, sentenceAt(paragraph, seg.start + tok.start)); }}
                      className={cn(
                        'rounded-[3px] px-[1px] text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none',
                        active && 'bg-brand-soft text-brand',
                      )}
                    >
                      {tok.text}
                    </button>
                  );
                });
              })}
            </p>
          </div>
        ))}
      </article>

      <p className="mt-6 flex max-w-[68ch] items-start gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        <span>{t('reading.lib.original')}</span>
      </p>

      <div className="mt-10 max-w-[68ch] space-y-6" id="questions">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold">{t('reading.lib.questionsTitle')}</h2>
          <p className="text-xs text-muted-foreground">{t('reading.lib.autosaved')}</p>
        </div>

        <div ref={resultRef} className="scroll-mt-20">
          {checked && (
            <Panel variant="brand" className="space-y-3" data-testid="library-result">
              <p className="text-lg font-semibold">{t('reading.lib.result', { correct: score.correct, total })}</p>
              <p className="text-sm text-muted-foreground">{t('reading.lib.resultNote')}</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" onClick={retry} data-testid="library-retry">
                  <RotateCcw /> {t('reading.lib.retry')}
                </Button>
                {next.id !== passage.id && (
                  <Button asChild>
                    <Link href={`/ielts/reading/${next.id}`}>
                      {t('reading.lib.next')} <ArrowRight />
                    </Link>
                  </Button>
                )}
              </div>
            </Panel>
          )}
        </div>

        <Questions passage={passage} answers={answers} checked={checked} onAnswer={onAnswer} />

        {!checked && (
          <Panel className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">{unanswered > 0 ? t('reading.lib.unanswered', { n: unanswered }) : ' '}</p>
            <Button onClick={check} data-testid="library-check">
              <CheckCircle2 /> {t('reading.lib.check')}
            </Button>
          </Panel>
        )}

        <p className="text-xs text-muted-foreground">
          <Link href="/ielts/vocabulary/notebook" className="underline underline-offset-4">
            {t('reading.openNotebook')}
          </Link>
        </p>
      </div>

      {selection?.kind === 'vocab' && (
        <VocabCard
          view={selection.view}
          loading={!vocabReady}
          surface={selection.surface}
          sentence={selection.sentence}
          savedId={savedId}
          saving={saving}
          onSave={save}
          onDismiss={() => setSelection(null)}
          extra={askMino}
        />
      )}
      {selection?.kind === 'word' && (
        <MeaningCard
          token={selection.token}
          result={meaning.result}
          savedId={savedId}
          saving={saving}
          onSave={save}
          onDismiss={() => setSelection(null)}
          extra={askMino}
        />
      )}
    </div>
  );
}
