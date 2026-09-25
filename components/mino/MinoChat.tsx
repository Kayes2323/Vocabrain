'use client';

import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { MinoMark } from '@/components/shell/MinoMark';
import { askMino } from '@/lib/ai/client';
import { MINO_PROMPT_IDS, type MinoPromptId } from '@/lib/ai/capabilities';
import type { AIMessage, MinoContext } from '@/lib/ai/types';
import { setPlanMode } from '@/lib/engine';
import { cn } from '@/lib/utils';

interface ChatMessage extends AIMessage {
  /** Local notices (e.g. Mino unavailable) are shown but never sent to the model. */
  notice?: boolean;
}

export function MinoChat({ context }: { context: MinoContext }) {
  const { t } = useLocale();
  const { updateProfile } = useProfile();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || pending) return;
    const history: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages(history);
    setDraft('');
    setPending(true);
    const res = await askMino({ capability: 'next-action', messages: history.filter((m) => !m.notice), context });
    setMessages((prev) => [
      ...prev,
      res.ok
        ? { role: 'assistant', content: res.reply }
        : { role: 'assistant', content: t(res.reason === 'unavailable' ? 'mino.unavailable' : 'mino.error'), notice: true },
    ]);
    setPending(false);
  };

  const pickPrompt = (id: MinoPromptId) => {
    const text = t(`mino.prompts.${id}`);
    if (id === 'minimumDay') {
      // Handled without AI: switch today's plan to the 15-minute version.
      updateProfile((p) => setPlanMode(p, 'minimum'));
      setMessages((prev) => [...prev, { role: 'user', content: text }, { role: 'assistant', content: t('mino.minimumDayReply') }]);
      return;
    }
    send(text);
  };

  return (
    <div className="space-y-4">
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
              <p
                className={cn(
                  'max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] whitespace-pre-wrap',
                  m.role === 'user' ? 'rounded-br-md bg-primary text-primary-foreground' : 'rounded-bl-md border bg-card',
                  m.notice && 'border-dashed text-muted-foreground',
                )}
              >
                {m.content}
              </p>
            </li>
          ))}
          {pending && (
            <li className="flex gap-2.5">
              <MinoMark size="sm" className="mt-0.5" />
              <p className="rounded-2xl rounded-bl-md border bg-card px-4 py-2.5 text-muted-foreground">{t('mino.thinking')}</p>
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
