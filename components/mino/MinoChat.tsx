'use client';

import { useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { askMino } from '@/lib/ai/client';
import { MINO_SUGGESTED_PROMPTS } from '@/lib/ai/capabilities';
import type { AIMessage, MinoContext } from '@/lib/ai/types';
import { MINO } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MinoMark } from '@/components/shell/MinoMark';

interface ChatMessage extends AIMessage {
  /** System notices (e.g. Mino unavailable) are shown but not sent back to the model. */
  notice?: boolean;
}

export function MinoChat({ context }: { context: MinoContext }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || pending) return;
    const history: ChatMessage[] = [...messages, { role: 'user', content }];
    setMessages(history);
    setDraft('');
    setPending(true);
    const res = await askMino({
      capability: 'next-action',
      messages: history.filter((m) => !m.notice),
      context,
    });
    setMessages((m) => [
      ...m,
      res.ok ? { role: 'assistant', content: res.reply } : { role: 'assistant', content: res.message, notice: true },
    ]);
    setPending(false);
  };

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <div className="flex flex-wrap gap-2">
          {MINO_SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => send(prompt)}
              className="rounded-full border bg-card px-3.5 py-2 text-left text-sm transition-colors hover:border-brand/40 hover:bg-brand-soft"
            >
              {prompt}
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
              <p className="rounded-2xl rounded-bl-md border bg-card px-4 py-2.5 text-muted-foreground">Thinking…</p>
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
          Ask {MINO.name}
        </label>
        <textarea
          id="mino-input"
          ref={inputRef}
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send(draft);
            }
          }}
          placeholder={`Ask ${MINO.name} anything about your journey…`}
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-[15px] outline-none placeholder:text-muted-foreground"
        />
        <Button type="submit" variant="brand" size="icon" disabled={!draft.trim() || pending} aria-label="Send">
          <ArrowUp />
        </Button>
      </form>
    </div>
  );
}
