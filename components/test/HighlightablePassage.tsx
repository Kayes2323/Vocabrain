'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Eraser, Highlighter } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { addHighlight, clearHighlight, segmentsOf, touching, type Highlight } from '@/lib/ielts/highlights';
import { readJSON, writeJSON } from '@/lib/services/local-store';
import type { Paragraph } from '@/lib/ielts';
import { cn } from '@/lib/utils';

interface MenuState {
  /** Where to put the menu (viewport coordinates, the middle of the top edge of what it is about). */
  x: number;
  top: number;
  bottom: number;
  /** The stretch it acts on. */
  range: Highlight;
  /** Whether there is something here to clear. */
  canClear: boolean;
}

const storeKey = (id: string) => `vocabbrain:highlights:${id}`;

/** Offset of a point inside a paragraph's text element, counted in characters. */
function offsetIn(el: Element, node: Node, offset: number): number {
  const r = document.createRange();
  r.selectNodeContents(el);
  r.setEnd(node, offset);
  return r.toString().length;
}

/**
 * A Reading passage the student can highlight, like the real computer-delivered
 * test: select text with the mouse (or a finger) and a small menu offers
 * Highlight and Clear. Highlights are kept for the attempt, so a refresh keeps them.
 */
export function HighlightablePassage({ storageId, paragraphs }: { storageId: string; paragraphs: Paragraph[] }) {
  const { t } = useLocale();
  const [list, setList] = useState<Highlight[]>([]);
  const [menu, setMenu] = useState<MenuState | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const pointerDown = useRef(false);
  const selectionRanges = useRef<Highlight[]>([]);
  const listRef = useRef(list);
  listRef.current = list;

  // Load this passage's highlights (and again if the attempt or passage changes).
  useEffect(() => {
    setList(readJSON<Highlight[]>(storeKey(storageId)) ?? []);
    setMenu(null);
  }, [storageId]);

  const commit = useCallback(
    (next: Highlight[]) => {
      setList(next);
      writeJSON(storeKey(storageId), next);
    },
    [storageId],
  );

  /** The selection as ranges, one per paragraph it covers. */
  const selectedRanges = useCallback((): { ranges: Highlight[]; rect: DOMRect } | null => {
    const sel = window.getSelection();
    const container = root.current;
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed || !container) return null;
    const range = sel.getRangeAt(0);
    if (!container.contains(range.commonAncestorContainer)) return null;
    const ranges: Highlight[] = [];
    container.querySelectorAll<HTMLElement>('[data-para]').forEach((el) => {
      if (!range.intersectsNode(el)) return;
      const total = el.textContent?.length ?? 0;
      const startsBefore = range.compareBoundaryPoints(Range.START_TO_START, (() => { const r = document.createRange(); r.selectNodeContents(el); return r; })()) <= 0;
      const endsAfter = range.compareBoundaryPoints(Range.END_TO_END, (() => { const r = document.createRange(); r.selectNodeContents(el); return r; })()) >= 0;
      const s = startsBefore ? 0 : offsetIn(el, range.startContainer, range.startOffset);
      const e = endsAfter ? total : offsetIn(el, range.endContainer, range.endOffset);
      if (e > s) ranges.push({ p: el.dataset.para!, s, e });
    });
    return ranges.length ? { ranges, rect: range.getBoundingClientRect() } : null;
  }, []);

  // Show the menu when a selection settles; hide it when the selection goes.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      if (pointerDown.current) return;
      const found = selectedRanges();
      if (!found) {
        setMenu((m) => (m && !m.canClear ? null : m));
        return;
      }
      const { ranges, rect } = found;
      const canClear = ranges.some((r) => touching(listRef.current, r).length > 0);
      setMenu({ x: rect.left + rect.width / 2, top: rect.top, bottom: rect.bottom, range: ranges[0], canClear });
      selectionRanges.current = ranges;
    };
    const onChange = () => {
      clearTimeout(timer);
      timer = setTimeout(update, 200);
    };
    const onUp = () => {
      pointerDown.current = false;
      onChange();
    };
    document.addEventListener('selectionchange', onChange);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('selectionchange', onChange);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchend', onUp);
    };
  }, [selectedRanges]);

  const apply = (kind: 'add' | 'clear') => {
    const ranges = selectionRanges.current;
    let next = listRef.current;
    for (const r of ranges) next = kind === 'add' ? addHighlight(next, r) : clearHighlight(next, r);
    commit(next);
    window.getSelection()?.removeAllRanges();
    setMenu(null);
  };

  // Click on an existing highlight: offer to clear just that one.
  const onMarkClick = (e: React.MouseEvent<HTMLElement>, paragraph: string, s: number, end: number) => {
    if (!window.getSelection()?.isCollapsed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    selectionRanges.current = [{ p: paragraph, s, e: end }];
    setMenu({ x: e.clientX || rect.left + rect.width / 2, top: rect.top, bottom: rect.bottom, range: { p: paragraph, s, e: end }, canClear: true });
  };

  // Any other click, scroll or Escape puts the menu away.
  useEffect(() => {
    if (!menu) return;
    const hide = () => setMenu(null);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && hide();
    const scroller = root.current?.closest('article');
    scroller?.addEventListener('scroll', hide, { passive: true });
    document.addEventListener('keydown', onKey);
    return () => {
      scroller?.removeEventListener('scroll', hide);
      document.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  const cuts = useMemo(() => paragraphs.map((p) => ({ p, segments: segmentsOf(p.text, list, p.id) })), [paragraphs, list]);
  const isCleared = menu?.canClear ?? false;
  const showAdd = menu && selectionRanges.current.some((r) => !touching(list, r).some((h) => h.s <= r.s && h.e >= r.e));

  return (
    <div ref={root} onMouseDown={() => { pointerDown.current = true; }} className="space-y-4">
      {cuts.map(({ p, segments }) => (
        <p key={p.id} className="flex gap-3 leading-7">
          {p.labelled && <span className="w-5 shrink-0 font-semibold">{p.id}</span>}
          <span data-para={p.id} data-testid={`para-${p.id}`}>
            {segments.map((seg) =>
              seg.highlighted ? (
                <mark
                  key={seg.start}
                  data-testid="highlight"
                  onClick={(e) => onMarkClick(e, p.id, seg.start, seg.end)}
                  className="cursor-pointer rounded-[2px] bg-yellow-200 text-foreground dark:bg-yellow-500/40"
                >
                  {seg.text}
                </mark>
              ) : (
                <span key={seg.start}>{seg.text}</span>
              ),
            )}
          </span>
        </p>
      ))}

      {menu && (
        <div
          role="toolbar"
          aria-label={t('tests.highlight.menu')}
          data-testid="highlight-menu"
          onMouseDown={(e) => e.preventDefault()}
          style={{ position: 'fixed', left: Math.min(Math.max(menu.x, 80), window.innerWidth - 80), top: menu.top > 56 ? menu.top - 8 : menu.bottom + 8, transform: menu.top > 56 ? 'translate(-50%, -100%)' : 'translate(-50%, 0)' }}
          className="z-50 flex gap-1 rounded-lg border bg-popover p-1 shadow-lg"
        >
          {(showAdd || !isCleared) && (
            <button type="button" data-testid="highlight-add" onClick={() => apply('add')} className={cn('flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium hover:bg-muted')}>
              <Highlighter className="size-4 text-yellow-600" aria-hidden /> {t('tests.highlight.add')}
            </button>
          )}
          {isCleared && (
            <button type="button" data-testid="highlight-clear" onClick={() => apply('clear')} className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium hover:bg-muted">
              <Eraser className="size-4 text-muted-foreground" aria-hidden /> {t('tests.highlight.clear')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
