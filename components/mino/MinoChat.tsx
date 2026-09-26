'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { MinoMark } from '@/components/shell/MinoMark';
import Link from 'next/link';
import { askMino } from '@/lib/ai/client';
import { MINO_ACTIONS, type MinoActionId } from '@/lib/ai/actions';
import { MINO_PROMPT_IDS, type MinoPromptId } from '@/lib/ai/capabilities';
import type { AIMessage, MinoCapabilityId, MinoContext } from '@/lib/ai/types';
import { setPlanMode } from '@/lib/engine';
import { cn } from '@/lib/utils';
import { isMinoAction } from '@/lib/ai/actions';
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
  next: 'next-action',
  writingStuck: 'writing-coach',
};

export function MinoChat({ context }: { context: MinoContext }) {
  const { t, locale } = useLocale();
  const { updateProfile } = useProfile();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [slow, setSlow] = useState(false);
  const repo = useMinoRepository();
  const [loaded, setLoaded] = useState(!repo);

  // Continue the recent conversation (kept for a week) after a refresh or a new visit.
  useEffect(() => {
    if (!repo) return setLoaded(true);
    repo
      .loadConversation()
      .then((stored) => setMessages(stored.map((m) => ({ role: m.role, content: m.content, actions: m.actions?.filter(isMinoAction) }))))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [repo]);

  const remember = (list: ChatMessage[]) => {
    if (repo) void repo.saveConversation(list.filter((m) => !m.notice)).catch(() => {});
  };

  const newChat = () => {
    setMessages([]);
    if (repo) void repo.clearConversation().catch(() => {});
  };

  const send = async (text: string, capability?: MinoCapabilityId) => {
    const content = text.trim();
    if (!content || pending) return;
    const history: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages(history);
    setDraft('');
    setPending(true);
    const request = {
      message: content,
      language: (locale === 'bn' ? 'bn' : 'en') as 'bn' | 'en',
      history: messages.filter((m) => !m.notice).map(({ role, content }) => ({ role, content })),
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

  // Opened from another screen (/mino?ask=result|plan&…): ask Mino once.
  const asked = useRef(false);
  useEffect(() => {
    if (asked.current || !loaded) return;
    const params = new URLSearchParams(window.location.search);
    const ask = params.get('ask');
    if (ask !== 'result' && ask !== 'plan' && ask !== 'feedback' && ask !== 'abroad') return;
    asked.current = true;
    window.history.replaceState(null, '', '/mino');
    if (ask === 'result') {
      const skill = params.get('skill') ?? 'reading';
      send(t('mino.askResult', { test: params.get('test') ?? '', skill: t(`skills.${skill}`), date: params.get('date') ?? '' }), 'ielts-coach');
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

  return (
    <div className="space-y-4">
      {messages.length > 0 && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={newChat}
            disabled={pending}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted"
          >
            <RotateCcw className="size-3.5" /> {t('mino.newChat')}
          </button>
        </div>
      )}
      {messages.length === 0 ? (
        <div className="flex flex-wrap gap-2">
          {MINO_PROMPT_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => pickPrompt(id)}
              className="rounded-full border bg-card px-3.5 py-2 text-left text-sm transition-colors hover:border-brand/40 hover:bg-brand-soft"
            >
              {t(`mino.prompts.${id}`)}
            </button>
          ))}
        </div>
      ) : (
        <ul className="space-y-3" aria-live="polite">
          {messages.map((m, i) => (
            <li key={i} className={cn('flex gap-2.5', m.role === 'user' && 'justify-end')}>
              {m.role === 'assistant' && <MinoMark size="sm" className="mt-0.5" />}
              <div className={cn('flex max-w-[85%] flex-col gap-2', m.role === 'user' && 'items-end')}>
                <p
                  className={cn(
                    'rounded-2xl px-4 py-2.5 text-[15px] whitespace-pre-wrap',
                    m.role === 'user' ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md border bg-card',
                    m.notice && 'border-dashed text-muted-foreground',
                  )}
                >
                  {m.content}
                </p>
                {m.actions && m.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {m.actions.map((id) => (
                      <Link
                        key={id}
                        href={MINO_ACTIONS[id]}
                        className="rounded-full border border-brand/40 bg-brand-soft px-3 py-1.5 text-sm font-medium transition-colors hover:bg-brand/15"
                      >
                        {t(`mino.actions.${id}`)} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
          {pending && (
            <li className="flex gap-2.5">
              <MinoMark size="sm" className="mt-0.5" />
              <p className="rounded-2xl rounded-bl-md border bg-card px-4 py-2.5 text-muted-foreground">{slow ? t('mino.thinkingLonger') : t('mino.thinking')}</p>
            </li>
          )}
        </ul>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="flex items-end gap-2 rounded-2xl border bg-card p-2 focus-within:ring-[3px] focus-within:ring-ring/30"
      >
        <label htmlFor="mino-input" className="sr-only">
          {t('mino.ask')}
        </label>
        <textarea
          id="mino-input"
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send(draft);
            }
          }}
          placeholder={t('mino.placeholder')}
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-[15px] outline-none placeholder:text-muted-foreground"
        />
        <Button type="submit" variant="brand" size="icon" disabled={!draft.trim() || pending} aria-label={t('mino.send')}>
          <ArrowUp />
        </Button>
      </form>
    </div>
  );
}
