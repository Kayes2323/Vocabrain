'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUp, Check, Copy, Info, Mic, SquarePen, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { useSpeechRecognition } from '@/components/practice/useSpeechRecognition';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { MinoMark } from '@/components/shell/MinoMark';
import { askMino } from '@/lib/ai/client';
import { MINO_ACTIONS, isMinoAction, type MinoActionId } from '@/lib/ai/actions';
import { MINO_PROMPT_IDS, type MinoPromptId } from '@/lib/ai/capabilities';
import type { AIMessage, MinoCapabilityId, MinoContext } from '@/lib/ai/types';
import { MINO } from '@/lib/constants';
import { setPlanMode } from '@/lib/engine';
import type { NextAction } from '@/lib/models';
import { cn } from '@/lib/utils';
import { MinoContextSummary } from './MinoContextSummary';
import { MinoMemoryList } from './MinoMemoryList';
import { NextActionList, PILLAR_STYLE } from './NextActionList';
import { useMinoRepository } from './useMinoRepository';

interface ChatMessage extends AIMessage {
  /** Buttons Mino attached to this reply. */
  actions?: MinoActionId[];
  /** Local notices (e.g. Mino unavailable) are shown but never sent to the model. */
  notice?: boolean;
}

/** Quick prompts tell Mino what kind of help is wanted (layer 8). */
const PROMPT_CAPABILITY: Partial<Record<MinoPromptId, MinoCapabilityId>> = {
  today: 'next-action',
  writingStuck: 'writing-coach',
  plan: 'study-planner',
};

/** Mino's text with **bold** kept; everything else is plain text. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function CopyButton({ text }: { text: string }) {
  const { t } = useLocale();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label={done ? t('mino.copied') : t('mino.copy')}
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => {
            setDone(true);
            setTimeout(() => setDone(false), 1500);
          },
          () => {},
        );
      }}
      className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
    >
      {done ? <Check className="size-4 text-success" /> : <Copy className="size-4" />}
    </button>
  );
}

/** Mino speaks without a bubble so long answers read like a page. */
function MinoMessage({ children, footer }: { children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="flex gap-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300">
      <MinoMark size="sm" />
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="text-[15px] leading-7 break-words whitespace-pre-wrap">{children}</div>
        {footer}
      </div>
    </div>
  );
}

function Thinking({ slow }: { slow: boolean }) {
  const { t } = useLocale();
  return (
    <div className="flex items-center gap-3 motion-safe:animate-in motion-safe:fade-in" role="status">
      <MinoMark size="sm" thinking />
      {slow ? (
        <span className="text-sm text-muted-foreground">{t('mino.thinkingLonger')}</span>
      ) : (
        <span className="mino-status relative block h-6 flex-1 overflow-hidden text-sm text-muted-foreground">
          <span>{t('mino.thinking')}</span>
          <span>{t('mino.thinkingProgress')}</span>
          <span>{t('mino.thinkingWriting')}</span>
        </span>
      )}
    </div>
  );
}

function SheetBody({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <>
      <div className="mx-auto h-1 w-10 rounded-full bg-border" aria-hidden />
      <div className="space-y-1 pr-8">
        <SheetTitle className="text-lg">{title}</SheetTitle>
        {description ? <SheetDescription>{description}</SheetDescription> : <SheetDescription className="sr-only">{title}</SheetDescription>}
      </div>
      {children}
    </>
  );
}

const SHEET = 'max-h-[85dvh] gap-4 overflow-y-auto rounded-t-3xl border-0 px-5 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:mx-auto sm:max-w-lg';

export function MinoChat({ context, actions, greeting }: { context: MinoContext; actions: NextAction[]; greeting: string }) {
  const { t, m, locale } = useLocale();
  const { updateProfile } = useProfile();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [slow, setSlow] = useState(false);
  const [sheet, setSheet] = useState<'today' | 'about' | null>(null);
  const repo = useMinoRepository();
  const [loaded, setLoaded] = useState(!repo);
  const input = useRef<HTMLTextAreaElement>(null);
  const end = useRef<HTMLDivElement>(null);
  const speech = useSpeechRecognition(locale === 'bn' ? 'bn-BD' : 'en-US');
  const beforeSpeech = useRef('');

  // Continue the recent conversation (kept for a week) after a refresh or a new visit.
  useEffect(() => {
    if (!repo) return setLoaded(true);
    repo
      .loadConversation()
      .then((stored) => setMessages(stored.map((m) => ({ role: m.role, content: m.content, actions: m.actions?.filter(isMinoAction) }))))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [repo]);

  // Keep the newest message in view.
  useEffect(() => {
    if (messages.length > 0 || pending) end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, pending]);

  // Voice input fills the box; the student still presses send.
  useEffect(() => {
    if (speech.listening || speech.transcript) setDraft(`${beforeSpeech.current}${speech.transcript}`);
  }, [speech.transcript, speech.listening]);

  useEffect(() => {
    const el = input.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 136)}px`;
  }, [draft]);

  const remember = (list: ChatMessage[]) => {
    if (repo) void repo.saveConversation(list.filter((m) => !m.notice)).catch(() => {});
  };

  const newChat = () => {
    setMessages([]);
    if (repo) void repo.clearConversation().catch(() => {});
  };

  const send = async (text: string, capability?: MinoCapabilityId, base: ChatMessage[] = messages) => {
    const content = text.trim();
    if (!content || pending) return;
    if (speech.listening) speech.stop();
    const history: ChatMessage[] = [...base, { role: 'user', content }];
    setMessages(history);
    setDraft('');
    speech.setTranscript('');
    setPending(true);
    const request = {
      message: content,
      language: (locale === 'bn' ? 'bn' : 'en') as 'bn' | 'en',
      history: base.filter((m) => !m.notice).map(({ role, content }) => ({ role, content })),
      userContext: context,
      tzOffsetMinutes: -new Date().getTimezoneOffset(),
      capability,
    };
    let res = await askMino(request);
    // A busy AI model is usually free again seconds later: retry once before showing an error.
    if (!res.ok && (res.error === 'provider_busy' || res.error === 'timeout')) {
      setSlow(true);
      await new Promise((r) => setTimeout(r, 1500));
      res = await askMino(request);
      setSlow(false);
    }
    const reply: ChatMessage = res.ok
      ? { role: 'assistant', content: res.response, actions: res.metadata.actions }
      : { role: 'assistant', content: t(`mino.errors.${res.error}`), notice: true };
    const next = [...history, reply];
    setMessages(next);
    if (res.ok) remember(next);
    setPending(false);
  };

  /** After an error: send the last question again, without duplicating it. */
  const retry = () => {
    const lastUser = messages.map((m, i) => [m, i] as const).filter(([m]) => m.role === 'user').pop();
    if (!lastUser) return;
    send(lastUser[0].content, undefined, messages.slice(0, lastUser[1]));
  };

  // Opened from another screen (/mino?ask=result|plan&…): ask Mino once.
  const asked = useRef(false);
  useEffect(() => {
    if (asked.current || !loaded) return;
    const params = new URLSearchParams(window.location.search);
    const ask = params.get('ask');
    if (ask !== 'result' && ask !== 'plan' && ask !== 'feedback' && ask !== 'abroad' && ask !== 'lesson' && ask !== 'foundation' && ask !== 'foundation-review' && ask !== 'pos-final') return;
    asked.current = true;
    window.history.replaceState(null, '', '/mino');
    if (ask === 'result') {
      const skill = params.get('skill') ?? 'reading';
      send(t('mino.askResult', { test: params.get('test') ?? '', skill: t(`skills.${skill}`), date: params.get('date') ?? '' }), 'ielts-coach');
    } else if (ask === 'lesson') {
      send(t('foundation.askPrompt', { lesson: params.get('lesson') ?? '' }), 'ielts-coach');
    } else if (ask === 'pos-final') {
      send(t('foundation.final.askPrompt'), 'ielts-coach');
    } else if (ask === 'foundation-review') {
      send(t('foundation.askReview'), 'ielts-coach');
    } else if (ask === 'foundation') {
      send(t('foundation.askPattern', { tag: t(`foundation.tags.${params.get('tag') ?? 'sentence-structure'}`) }), 'ielts-coach');
    } else if (ask === 'abroad') {
      send(t('match.askPrompt'), 'study-abroad-advisor');
    } else if (ask === 'feedback') {
      const skill = params.get('skill') === 'speaking' ? 'speaking' : 'writing';
      send(t('mino.askFeedback', { skill: t(`skills.${skill}`), date: params.get('date') ?? '' }), skill === 'writing' ? 'writing-coach' : 'speaking-coach');
    } else {
      send(t('studyPlan.askPrompt', { days: Number(params.get('days')) || 30 }), 'study-planner');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  const pickPrompt = (id: MinoPromptId) => {
    const text = t(`mino.prompts.${id}`);
    if (id === 'minimumDay') {
      // Handled without AI: switch today's plan to the 15-minute version.
      updateProfile((p) => setPlanMode(p, 'minimum'));
      const next: ChatMessage[] = [...messages, { role: 'user', content: text }, { role: 'assistant', content: t('mino.minimumDayReply') }];
      setMessages(next);
      remember(next);
      return;
    }
    send(text, PROMPT_CAPABILITY[id]);
  };

  const toggleMic = () => {
    if (speech.listening) return speech.stop();
    beforeSpeech.current = draft.trim() ? `${draft.trim()} ` : '';
    speech.start();
  };

  const empty = loaded && messages.length === 0 && !pending;

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-start">
      <div className="mx-auto flex w-full max-w-[720px] min-w-0 flex-col">
        {/* Header: who Mino is, and the few things you can open. */}
        <header className="sticky top-0 z-20 -mx-4 -mt-6 flex items-center gap-2.5 bg-background/85 px-4 pt-3 pb-3 backdrop-blur-lg md:-mt-10 md:pt-6">
          <MinoMark size="sm" alive />
          <div className="min-w-0 flex-1 leading-tight">
            <h1 className="font-semibold">{MINO.name}</h1>
            <p className="truncate text-xs text-muted-foreground">{t('mino.role')}</p>
          </div>
          {actions.length > 0 && (
            <button
              type="button"
              onClick={() => setSheet('today')}
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border bg-card px-3 text-xs font-semibold transition-colors hover:bg-muted xl:hidden"
            >
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              {t('mino.todayPill', { n: actions.length })}
            </button>
          )}
          <Button type="button" variant="ghost" size="icon" onClick={newChat} disabled={pending || messages.length === 0} aria-label={t('mino.newChat')} title={t('mino.newChat')}>
            <SquarePen />
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={() => setSheet('about')} aria-label={t('mino.knows')} title={t('mino.knows')}>
            <UserRound />
          </Button>
        </header>

        <div className="flex min-h-[calc(100dvh-15rem)] flex-col gap-6 pt-2 pb-4 md:min-h-[calc(100dvh-13rem)]">
          {empty && (
            <>
              <div className="flex flex-col items-center gap-2 pt-4 text-center motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-500">
                <MinoMark size="xl" alive />
                <p className="mt-1 text-2xl font-semibold tracking-tight">{MINO.name}</p>
                <p className="text-[15px] text-muted-foreground">{t('mino.role')}</p>
              </div>

              <MinoMessage>
                <RichText text={greeting} />
              </MinoMessage>

              {actions.length > 0 && (
                <section className="space-y-2.5 xl:hidden" aria-label={t('mino.focusTitle')}>
                  <div className="flex items-center justify-between px-1">
                    <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{t('mino.focusTitle')}</h2>
                    <button type="button" onClick={() => setSheet('today')} className="text-sm font-medium text-brand">
                      {t('mino.seeAll')}
                    </button>
                  </div>
                  <div className="-mx-4 flex snap-x gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
                    {actions.slice(0, 3).map((a, i) => {
                      const { icon: Icon, tint } = PILLAR_STYLE[a.pillar];
                      return (
                        <Link
                          key={a.id}
                          href={a.href}
                          className={cn(
                            'flex w-40 shrink-0 snap-start flex-col gap-2 rounded-2xl border bg-card p-3 transition-colors hover:border-foreground/15 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2',
                            i === 0 && 'border-brand/40',
                          )}
                          style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
                        >
                          <span className={cn('flex size-8 items-center justify-center rounded-xl', tint)} aria-hidden>
                            <Icon className="size-4" />
                          </span>
                          <span className="line-clamp-2 text-sm leading-snug font-semibold">{m(a.title)}</span>
                          {a.estimatedMinutes ? <span className="mt-auto text-xs text-muted-foreground">{t('common.minutes', { n: a.estimatedMinutes })}</span> : null}
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}

              <section className="space-y-2.5" aria-label={t('mino.tryAsking')}>
                <h2 className="px-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{t('mino.tryAsking')}</h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {MINO_PROMPT_IDS.map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => pickPrompt(id)}
                      className="flex min-h-11 items-center gap-2.5 rounded-2xl border px-3.5 py-2.5 text-left text-[15px] transition-colors hover:border-brand/40 hover:bg-card"
                    >
                      <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                      {t(`mino.prompts.${id}`)}
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          {messages.map((msg, i) =>
            msg.role === 'user' ? (
              <div key={i} className="flex justify-end motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300">
                <p className="max-w-[85%] rounded-[20px] rounded-br-md bg-brand-soft px-4 py-2.5 text-[15px] leading-relaxed break-words whitespace-pre-wrap">{msg.content}</p>
              </div>
            ) : msg.notice ? (
              <MinoMessage
                key={i}
                footer={
                  i === messages.length - 1 && !pending ? (
                    <div className="mt-2">
                      <Button type="button" variant="outline" size="sm" className="rounded-full" onClick={retry}>
                        {t('mino.retry')}
                      </Button>
                    </div>
                  ) : undefined
                }
              >
                <span className="text-muted-foreground">{msg.content}</span>
              </MinoMessage>
            ) : (
              <MinoMessage
                key={i}
                footer={
                  <div className="mt-2 space-y-1">
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.actions.map((id) => (
                          <Link
                            key={id}
                            href={MINO_ACTIONS[id]}
                            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-brand/35 bg-card px-3.5 text-sm font-medium text-brand transition-colors hover:bg-brand-soft"
                          >
                            {t(`mino.actions.${id}`)} <ArrowRight className="size-3.5" aria-hidden />
                          </Link>
                        ))}
                      </div>
                    )}
                    <CopyButton text={msg.content} />
                  </div>
                }
              >
                <RichText text={msg.content} />
              </MinoMessage>
            ),
          )}
          {pending && <Thinking slow={slow} />}
          <div ref={end} />
        </div>

        {/* The composer never moves: docked above the tab bar. */}
        <div className="sticky bottom-[calc(4rem+env(safe-area-inset-bottom))] z-10 -mx-4 bg-gradient-to-t from-background from-70% to-transparent px-4 pt-3 pb-2 md:bottom-0 md:pb-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="flex items-end gap-1 rounded-3xl border bg-card p-1.5 pl-4 shadow-[0_1px_2px_rgb(15_23_42/0.05),0_8px_24px_-12px_rgb(15_23_42/0.15)] transition-[border-color,box-shadow] focus-within:border-brand/40 focus-within:ring-4 focus-within:ring-brand/10"
          >
            <label htmlFor="mino-input" className="sr-only">
              {t('mino.ask')}
            </label>
            <textarea
              ref={input}
              id="mino-input"
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  send(draft);
                }
              }}
              placeholder={t('mino.placeholder')}
              className="max-h-34 min-h-10 flex-1 resize-none bg-transparent py-2.5 text-[15px] leading-6 outline-none placeholder:text-muted-foreground"
            />
            {speech.supported && (
              <button
                type="button"
                onClick={toggleMic}
                aria-pressed={speech.listening}
                aria-label={speech.listening ? t('mino.stopSpeaking') : t('mino.speak')}
                title={speech.listening ? t('mino.stopSpeaking') : t('mino.speak')}
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-full transition-colors',
                  speech.listening ? 'bg-destructive-soft text-destructive motion-safe:animate-pulse' : 'text-muted-foreground hover:bg-muted',
                )}
              >
                <Mic className="size-[18px]" />
              </button>
            )}
            <Button type="submit" variant="brand" size="icon" className="size-10 shrink-0 rounded-full disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100" disabled={!draft.trim() || pending} aria-label={t('mino.send')}>
              <ArrowUp />
            </Button>
          </form>
          <p className="mt-1.5 text-center text-[11px] text-muted-foreground">{t('mino.hint')}</p>
        </div>
      </div>

      {/* Wide screens: today's list stays visible next to the conversation. */}
      <aside className="sticky top-10 hidden space-y-3 xl:block">
        <h2 className="px-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{t('mino.focusTitle')}</h2>
        <NextActionList actions={actions} />
        <p className="flex gap-2 px-1 text-xs text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          {t('mino.todayWhy')}
        </p>
      </aside>

      <Sheet open={sheet === 'today'} onOpenChange={(open) => !open && setSheet(null)}>
        <SheetContent side="bottom" className={SHEET}>
          <SheetBody title={t('mino.focusTitle')} description={t('mino.todayWhy')}>
            <NextActionList actions={actions} onNavigate={() => setSheet(null)} />
          </SheetBody>
        </SheetContent>
      </Sheet>
      <Sheet open={sheet === 'about'} onOpenChange={(open) => !open && setSheet(null)}>
        <SheetContent side="bottom" className={SHEET}>
          <SheetBody title={t('mino.aboutTitle')} description={t('mino.aboutSub')}>
            <MinoContextSummary context={context} />
            <MinoMemoryList />
          </SheetBody>
        </SheetContent>
      </Sheet>
    </div>
  );
}
