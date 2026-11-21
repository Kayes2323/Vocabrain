'use client';

import { useEffect, useRef, useState } from 'react';
import { FileText, Image as ImageIcon, Mic, Paperclip, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StatusChip } from '@/components/ds';
import { cn } from '@/lib/utils';

export interface Attachment {
  id: string;
  name: string;
  kind: 'image' | 'pdf' | 'doc';
  /** Local object URL — never uploaded anywhere. */
  previewUrl?: string;
}

function wordCount(text: string): number {
  const m = text.trim().match(/\S+/g);
  return m ? m.length : 0;
}

/**
 * Zone C — the Writing Zone. A dedicated workspace, not a chat input box:
 * word counter, a save indicator, history (native browser undo/redo in the
 * textarea), and attachment controls that preview a locally chosen file
 * without sending it anywhere (spec §14).
 */
export function WritingEditor({
  value,
  onChange,
  minWords,
  placeholder,
  title = 'Your writing',
  onSubmit,
  submitLabel = 'Submit for feedback',
}: {
  value: string;
  onChange: (next: string) => void;
  minWords: number;
  placeholder?: string;
  title?: string;
  onSubmit: () => void;
  submitLabel?: string;
}) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const fileInput = useRef<HTMLInputElement>(null);
  const kindRef = useRef<Attachment['kind']>('doc');
  const words = wordCount(value);
  const meetsMin = words >= minWords;

  // Autosave indicator only — this is a prototype, so "saving" means local
  // component state settles, not a network write.
  useEffect(() => {
    if (value.length === 0) return;
    setSaveState('saving');
    const id = window.setTimeout(() => setSaveState('saved'), 600);
    return () => window.clearTimeout(id);
  }, [value]);

  const openPicker = (kind: Attachment['kind']) => {
    kindRef.current = kind;
    fileInput.current?.click();
  };

  const onFileChosen: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const kind = kindRef.current;
    const previewUrl = kind === 'image' ? URL.createObjectURL(file) : undefined;
    setAttachments((a) => [...a, { id: `${Date.now()}`, name: file.name, kind, previewUrl }]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((a) => {
      const found = a.find((x) => x.id === id);
      if (found?.previewUrl) URL.revokeObjectURL(found.previewUrl);
      return a.filter((x) => x.id !== id);
    });
  };

  return (
    <div className="flex h-full min-h-[22rem] flex-col gap-2.5 rounded-2xl border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">{title}</p>
        <div className="flex items-center gap-2">
          {saveState !== 'idle' && (
            <span className="text-xs text-muted-foreground">
              {saveState === 'saving' ? 'Saving…' : 'Draft saved'}
            </span>
          )}
          <StatusChip tone={meetsMin ? 'success' : 'neutral'}>{words} words</StatusChip>
        </div>
      </div>

      <label htmlFor="ws-editor" className="sr-only">{title}</label>
      <Textarea
        id="ws-editor"
        lang="en"
        spellCheck
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? 'Start writing here…'}
        className="min-h-56 flex-1 resize-none rounded-xl border-none bg-muted/30 p-3.5 text-[15px] leading-7 shadow-none focus-visible:ring-1"
      />

      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((a) => (
            <span key={a.id} className="flex items-center gap-1.5 rounded-full border bg-background py-1 pr-1.5 pl-2.5 text-xs">
              {a.kind === 'image' && a.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={a.previewUrl} alt="" className="size-4 rounded-sm object-cover" />
              ) : a.kind === 'image' ? (
                <ImageIcon className="size-3.5" />
              ) : (
                <FileText className="size-3.5" />
              )}
              <span className="max-w-32 truncate">{a.name}</span>
              <button type="button" onClick={() => removeAttachment(a.id)} aria-label={`Remove ${a.name}`} className="text-muted-foreground hover:text-foreground">
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-2.5">
        <div className="flex items-center gap-1">
          <input ref={fileInput} type="file" accept={kindRef.current === 'image' ? 'image/*' : undefined} className="hidden" onChange={onFileChosen} />
          <Button type="button" variant="ghost" size="icon-sm" title="Attach an image (handwritten draft, chart, question screenshot)" onClick={() => openPicker('image')}>
            <ImageIcon className="size-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon-sm" title="Attach a PDF or document" onClick={() => openPicker('doc')}>
            <Paperclip className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            title="Voice input is a prototype placeholder — this does not record audio here."
            onClick={() => alert('Voice input is a prototype placeholder in this build — no audio is recorded.')}
          >
            <Mic className="size-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon-sm" title="Clear (use Ctrl/Cmd+Z to undo while typing)" onClick={() => onChange('')} disabled={value.length === 0}>
            <RotateCcw className="size-4" />
          </Button>
        </div>
        <Button onClick={onSubmit} disabled={words < 5} className={cn('shrink-0')}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
