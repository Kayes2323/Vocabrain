'use client';

import Link from 'next/link';
import { notFound, useParams, useRouter } from 'next/navigation';
import { BookText, BrainCircuit, Ear, Mic, PenLine, Trash2, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { IconBadge, PageHeader, Panel, ProgressBar, ScreenSkeleton, Section } from '@/components/ds';
import { WordStatusChip } from '@/components/brain/WordStatusChip';
import { meanings } from '@/components/brain/meaning';
import { MinoSays } from '@/components/mino/MinoSays';
import { canSpeak, speakWord } from '@/components/reading/speak';
import { useBrain } from '@/components/providers/BrainProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { MAX_STAGE, diagnoseWord, speakingPrompt } from '@/lib/engine';
import { FoundationWordExtras } from '@/components/vocab-foundation/FoundationWordExtras';

function Chips({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((s) => (
          <span key={s} className="rounded-full border bg-card px-3 py-1 text-sm">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/60 px-3 py-2.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold tabular-nums">{value}</p>
    </div>
  );
}

export default function WordDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { t, locale, n } = useLocale();
  const brain = useBrain();

  if (brain.loading) return <ScreenSkeleton />;
  const word = brain.get(id);
  if (!word) notFound();

  const { primary, secondary } = meanings(word, locale);
  const diagnosis = diagnoseWord(word);
  const next = new Date(word.nextReviewAt);
  const nextLabel =
    next.getTime() <= Date.now()
      ? t('brain.dueNow')
      : next.toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short' });
  const prompt = speakingPrompt(word);

  return (
    <div className="max-w-2xl space-y-8">
      <PageHeader
        title={word.word}
        subtitle={
          <span className="inline-flex flex-wrap items-center gap-2">
            {word.partOfSpeech && <span>{word.partOfSpeech}</span>}
            <WordStatusChip status={word.status} />
          </span>
        }
        backHref="/ielts/vocabulary/notebook"
        backLabel={t('brain.title')}
        action={
          canSpeak() ? (
            <Button variant="outline" size="icon" aria-label={t('reading.listen')} onClick={() => speakWord(word.word)}>
              <Volume2 />
            </Button>
          ) : undefined
        }
      />

      <Panel className="space-y-4">
        {primary ? (
          <div className="space-y-1">
            <p className="text-lg">{primary}</p>
            {secondary && <p className="text-sm text-muted-foreground">{secondary}</p>}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t('brain.noMeaning')}</p>
        )}
        {word.originalSentence && (
          <div className="space-y-1 rounded-xl bg-muted/60 px-4 py-3">
            <p className="text-xs text-muted-foreground">{t('brain.foundIn', { source: word.source.title })}</p>
            <p className="text-[15px]" lang="en">
              “{word.originalSentence}”
            </p>
          </div>
        )}
        <Chips label={t('brain.collocations')} items={word.collocations} />
        <Chips label={t('vocabulary.bank.similar')} items={word.synonyms} />
        <Chips label={t('vocabulary.bank.opposites')} items={word.antonyms} />
        {word.exampleSentence && (
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{t('brain.example')}</p>
            <p lang="en">{word.exampleSentence}</p>
          </div>
        )}
      </Panel>

      <FoundationWordExtras word={word} />

      {diagnosis && (
        <Panel variant="brand" className="space-y-3">
          <MinoSays>{t(`diagnosis.${diagnosis.problem}.message`, { word: word.word })}</MinoSays>
          <Button asChild variant="brand" size="sm">
            <Link href={diagnosis.href}>{t(`diagnosis.${diagnosis.problem}.action`)}</Link>
          </Button>
        </Panel>
      )}

      <Section title={t('brain.progress')}>
        <Panel className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t('brain.memoryStrength')}</span>
              <span className="text-muted-foreground">{t('brain.nextReview', { date: nextLabel })}</span>
            </div>
            <ProgressBar value={(word.stage / MAX_STAGE) * 100} label={t('brain.memoryStrength')} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Fact label={t('brain.recalled')} value={`${n(word.successfulRecallCount)}/${n(word.recallCount)}`} />
            <Fact label={t('brain.usedWriting')} value={n(word.writingUsageCount)} />
            <Fact label={t('brain.usedSpeaking')} value={n(word.speakingUsageCount)} />
          </div>
          <Button asChild className="w-full">
            <Link href={`/review?word=${word.id}`}>
              <BrainCircuit /> {t('brain.practiceRecall')}
            </Link>
          </Button>
        </Panel>
      </Section>

      <Section title={t('brain.ieltsTitle')} description={t('brain.ieltsBody')}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Panel className="space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <IconBadge icon={BookText} tone="brand" size="sm" /> Reading
            </div>
            <p className="text-sm text-muted-foreground">
              {word.originalSentence ? t('brain.ielts.reading', { word: word.word }) : t('brain.ielts.readingGeneric')}
            </p>
            {word.synonyms.length > 0 && (
              <p className="text-sm">{t('brain.ielts.paraphrase', { synonyms: word.synonyms.slice(0, 2).join(', ') })}</p>
            )}
          </Panel>
          <Panel className="space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <IconBadge icon={PenLine} tone="brand" size="sm" /> Writing
            </div>
            <p className="text-sm text-muted-foreground">
              {word.collocations.length > 0
                ? t('brain.ielts.writing', { collocation: word.collocations[0] })
                : t('brain.ielts.writingGeneric')}
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href={`/practice/writing?word=${word.id}`}>{t('brain.writeSentence')}</Link>
            </Button>
          </Panel>
          <Panel className="space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <IconBadge icon={Mic} tone="brand" size="sm" /> Speaking
            </div>
            <p className="text-sm text-muted-foreground" lang="en">
              “{t(prompt.key, prompt.vars)}”
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href={`/practice/speaking?word=${word.id}`}>{t('brain.speakNow')}</Link>
            </Button>
          </Panel>
          <Panel className="space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <IconBadge icon={Ear} tone="brand" size="sm" /> Listening
            </div>
            <p className="text-sm text-muted-foreground">{t('brain.ielts.listening')}</p>
            {canSpeak() && (
              <Button variant="outline" size="sm" onClick={() => speakWord(word.exampleSentence ?? word.word)}>
                <Volume2 /> {t('brain.listenExample')}
              </Button>
            )}
          </Panel>
        </div>
      </Section>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="text-destructive hover:text-destructive">
            <Trash2 /> {t('brain.remove')}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('brain.removeTitle', { word: word.word })}</AlertDialogTitle>
            <AlertDialogDescription>{t('brain.removeBody')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.back')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await brain.remove(word.id);
                router.replace('/ielts/vocabulary/notebook');
              }}
            >
              {t('brain.remove')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
