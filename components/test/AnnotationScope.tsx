'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Eraser, Highlighter, StickyNote, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { addHighlight, addNote, annotationAt, clearRange, fullyHighlighted, restore, setNote, touching, type Annotation } from '@/lib/ielts/annotations';
import { readJSON, writeJSON } from '@/lib/services/local-store';
import { cn } from '@/lib/utils';
import { canHighlight, publishRanges, unpublishRanges } from './annotationHighlights';

type Span = { s: number; e: number };

interface Menu {
  /** Where to put it (viewport coordinates). */
  x: number;
  top: number;
  bottom: number;
  ranges: Span[];
  canHighlight: boolean;
  canClear: boolean;
  canNote: boolean;
}

interface Editor {
  x: number;
  top: number;
  bottom: number;
  range: Span;
  note: string;
  existing: boolean;
}

const storeKey = (id: string) => `vocabbrain:annot:${id}`;

/** Offset of a point in a block's text, counted in characters (the same count as its textContent). */
function offsetIn(root: Element, node: Node, offset: number): number {
  const r = document.createRange();
  r.selectNodeContents(root);
  r.setEnd(node, offset);
  return r.toString().length;
}

/** A DOM range for an offset span, or null when the text is shorter than that. */
function rangeFor(root: Element, s: number, e: number): Range | null {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let at = 0;
  let started = false;
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const len = n.nodeValue?.length ?? 0;
    if (!started && s < at + len) {
      range.setStart(n, s - at);
      started = true;
    }
    if (started && e <= at + len) {
      range.setEnd(n, e - at);
      return range;
    }
    at += len;
  }
  return null;
}

/** The text offset under a screen point, if it is inside the block. */
function offsetAtPoint(root: Element, x: number, y: number): number | null {
  const d = document as Document & { caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null; caretRangeFromPoint?: (x: number, y: number) => Range | null };
  let node: Node | undefined;
  let offset = 0;
  if (d.caretPositionFromPoint) {
    const p = d.caretPositionFromPoint(x, y);
    node = p?.offsetNode;
    offset = p?.offset ?? 0;
  } else if (d.caretRangeFromPoint) {
    const r = d.caretRangeFromPoint(x, y);
    node = r?.startContainer;
    offset = r?.startOffset ?? 0;
  }
  return node && root.contains(node) ? offsetIn(root, node, offset) : null;
}

/**
 * A block of test text (a passage, or the questions of a part) the student can
 * annotate the way they can in the computer-delivered IELTS test: select text,
 * or right-click it, to Highlight it, add a Note or Clear it. Click a highlight
 * to clear it, or a note to read, edit or delete it. Annotations are kept for the
 * attempt, so a refresh keeps them.
 */
export function AnnotationScope({ scopeId, className, children }: { scopeId: string; className?: string; children: React.ReactNode }) {
  const { t } = useLocale();
  const supported = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<Annotation[]>([]);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  const listRef = useRef(list);
  listRef.current = list;
  const pointerDown = useRef(false);
  const editorOpen = useRef(false);
  editorOpen.current = editor !== null;

  useEffect(() => {
    supported.current = canHighlight();
    setList(readJSON<Annotation[]>(storeKey(scopeId)) ?? []);
    setMenu(null);
    setEditor(null);
  }, [scopeId]);

  const commit = useCallback(
    (next: Annotation[]) => {
      setList(next);
      listRef.current = next;
      writeJSON(storeKey(scopeId), next);
    },
    [scopeId],
  );

  const text = () => root.current?.textContent ?? '';

  /** Draws the annotations; puts back any whose text moved, drops any whose text is gone. */
  const sync = useCallback(() => {
    const el = root.current;
    if (!el || !supported.current) return;
    const current = listRef.current;
    const fixed = restore(current, el.textContent ?? '');
    if (JSON.stringify(fixed) !== JSON.stringify(current)) commit(fixed);
    const marks: Range[] = [];
    const notes: Range[] = [];
    for (const a of fixed) {
      const r = rangeFor(el, a.s, a.e);
      if (r) (a.note !== undefined ? notes : marks).push(r);
    }
    publishRanges(scopeId, marks, notes);
  }, [scopeId, commit]);

  // After every render, and whenever the text inside changes.
  useEffect(() => {
    sync();
  });
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let frame = 0;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    });
    observer.observe(el, { childList: true, subtree: true, characterData: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      unpublishRanges(scopeId);
    };
  }, [scopeId, sync]);

  /** The selection as an offset span inside this block, with the rectangle to place a menu by. */
  const selectedSpan = useCallback((): { span: Span; rect: DOMRect } | null => {
    const sel = window.getSelection();
    const el = root.current;
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed || !el) return null;
    const r = sel.getRangeAt(0);
    if (!el.contains(r.startContainer) || !el.contains(r.endContainer)) return null;
    const s = offsetIn(el, r.startContainer, r.startOffset);
    const e = offsetIn(el, r.endContainer, r.endOffset);
    if (e <= s || el.textContent!.slice(s, e).trim() === '') return null;
    return { span: { s, e }, rect: r.getBoundingClientRect() };
  }, []);

  const openMenuFor = useCallback((span: Span, rect: { left: number; width: number; top: number; bottom: number }, x?: number) => {
    const here = listRef.current;
    setMenu({
      x: x ?? rect.left + rect.width / 2,
      top: rect.top,
      bottom: rect.bottom,
      ranges: [span],
      canHighlight: !fullyHighlighted(here, span),
      canClear: touching(here, span).length > 0,
      canNote: true,
    });
  }, []);

  // A selection that has settled offers the menu; losing it puts the menu away.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      if (pointerDown.current || editorOpen.current || !supported.current) return;
      const found = selectedSpan();
      if (!found) {
        setMenu((m) => (m && m.canNote ? null : m));
        return;
      }
      openMenuFor(found.span, found.rect);
    };
    const later = () => {
      clearTimeout(timer);
      timer = setTimeout(update, 200);
    };
    const up = () => {
      pointerDown.current = false;
      later();
    };
    document.addEventListener('selectionchange', later);
    document.addEventListener('mouseup', up);
    document.addEventListener('touchend', up);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('selectionchange', later);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('touchend', up);
    };
  }, [selectedSpan, openMenuFor]);

  // Escape, a click elsewhere or scrolling puts the menu away.
  useEffect(() => {
    if (!menu && !editor) return;
    const hide = () => {
      if (!editorOpen.current) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenu(null);
      setEditor(null);
    };
    document.addEventListener('scroll', hide, true);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('scroll', hide, true);
      document.removeEventListener('keydown', onKey);
    };
  }, [menu, editor]);

  const apply = (kind: 'highlight' | 'clear') => {
    if (!menu) return;
    let next = listRef.current;
    for (const span of menu.ranges) next = kind === 'highlight' ? addHighlight(next, span, text()) : clearRange(next, span, text());
    commit(next);
    window.getSelection()?.removeAllRanges();
    setMenu(null);
  };

  const startNote = () => {
    if (!menu) return;
    const span = menu.ranges[0];
    setEditor({ x: menu.x, top: menu.top, bottom: menu.bottom, range: span, note: '', existing: false });
    window.getSelection()?.removeAllRanges();
    setMenu(null);
  };

  const saveNote = () => {
    if (!editor) return;
    const value = editor.note.trim();
    if (editor.existing) commit(setNote(listRef.current, editor.range, value));
    else if (value) commit(addNote(listRef.current, editor.range, text(), value));
    setEditor(null);
  };

  const deleteNote = () => {
    if (!editor) return;
    commit(setNote(listRef.current, editor.range, ''));
    setEditor(null);
  };

  // Click on marked text: a note opens to read or edit; a highlight offers Clear.
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = root.current;
    if (!el || !supported.current || !window.getSelection()?.isCollapsed) return;
    if ((e.target as Element).closest('input, textarea, button, select')) return;
    const offset = offsetAtPoint(el, e.clientX, e.clientY);
    if (offset === null) return;
    const hit = annotationAt(listRef.current, offset);
    if (!hit) {
      setMenu(null);
      return;
    }
    const span = { s: hit.s, e: hit.e };
    if (hit.note !== undefined) {
      setMenu(null);
      setEditor({ x: e.clientX, top: e.clientY, bottom: e.clientY, range: span, note: hit.note, existing: true });
    } else {
      setMenu({ x: e.clientX, top: e.clientY, bottom: e.clientY, ranges: [span], canHighlight: false, canClear: true, canNote: false });
    }
  };

  // Right-click on a selection opens the same menu where the pointer is, as in the real test.
  const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!supported.current) return;
    const found = selectedSpan();
    if (!found) return;
    e.preventDefault();
    openMenuFor(found.span, { left: e.clientX, width: 0, top: e.clientY, bottom: e.clientY }, e.clientX);
  };

  const place = (m: { x: number; top: number; bottom: number }, width: number): React.CSSProperties => {
    const left = Math.min(Math.max(m.x, width / 2 + 8), window.innerWidth - width / 2 - 8);
    const above = m.top > 150;
    return { position: 'fixed', left, top: above ? m.top - 8 : m.bottom + 8, transform: above ? 'translate(-50%, -100%)' : 'translate(-50%, 0)' };
  };

  return (
    <div ref={root} className={className} onMouseDown={() => { pointerDown.current = true; }} onClick={onClick} onContextMenu={onContextMenu}>
      {children}

      {menu && (
        <div role="toolbar" aria-label={t('tests.highlight.menu')} data-testid="highlight-menu" onMouseDown={(e) => e.preventDefault()} style={place(menu, 280)} className="z-50 flex gap-1 rounded-lg border bg-popover p-1 shadow-lg">
          {menu.canHighlight && (
            <button type="button" data-testid="highlight-add" onClick={() => apply('highlight')} className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium hover:bg-muted">
              <Highlighter className="size-4 text-yellow-600" aria-hidden /> {t('tests.highlight.add')}
            </button>
          )}
          {menu.canNote && (
            <button type="button" data-testid="note-add" onClick={startNote} className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium hover:bg-muted">
              <StickyNote className="size-4 text-blue-600" aria-hidden /> {t('tests.highlight.note')}
            </button>
          )}
          {menu.canClear && (
            <button type="button" data-testid="highlight-clear" onClick={() => apply('clear')} className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium hover:bg-muted">
              <Eraser className="size-4 text-muted-foreground" aria-hidden /> {t('tests.highlight.clear')}
            </button>
          )}
        </div>
      )}

      {editor && (
        <div role="dialog" aria-label={t('tests.highlight.noteTitle')} data-testid="note-editor" onMouseDown={(e) => e.stopPropagation()} style={place(editor, 300)} className="z-50 w-[300px] max-w-[calc(100vw-16px)] space-y-2 rounded-lg border bg-popover p-3 shadow-lg">
          <p className="text-xs font-semibold text-muted-foreground uppercase">{t('tests.highlight.noteTitle')}</p>
          <textarea
            autoFocus
            data-testid="note-text"
            value={editor.note}
            maxLength={500}
            rows={3}
            placeholder={t('tests.highlight.notePlaceholder')}
            onChange={(e) => setEditor({ ...editor, note: e.target.value })}
            className={cn('w-full resize-none rounded-md border bg-background p-2 text-sm', 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none')}
          />
          <div className="flex items-center justify-between gap-2">
            {editor.existing ? (
              <Button size="sm" variant="ghost" data-testid="note-delete" onClick={deleteNote}>
                <Trash2 /> {t('tests.highlight.deleteNote')}
              </Button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setEditor(null)}>
                {t('tests.highlight.cancel')}
              </Button>
              <Button size="sm" data-testid="note-save" onClick={saveNote}>
                {t('tests.highlight.save')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
