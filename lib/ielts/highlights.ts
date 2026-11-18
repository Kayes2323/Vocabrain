/**
 * Highlighting in a Reading passage, as in the computer-delivered IELTS test: the
 * student selects text and highlights it, and can clear a highlight again. A
 * highlight is a character range inside one paragraph.
 */
export interface Highlight {
  /** Paragraph id. */
  p: string;
  /** Start and end offsets into that paragraph's text (end exclusive). */
  s: number;
  e: number;
}

const sameParagraph = (a: Highlight, b: Highlight) => a.p === b.p;
const order = (a: Highlight, b: Highlight) => (a.p === b.p ? a.s - b.s : a.p < b.p ? -1 : 1);

/** Sorts, and joins ranges that overlap or touch. Empty ranges are dropped. */
export function normalise(list: Highlight[]): Highlight[] {
  const sorted = list.filter((h) => h.e > h.s).map((h) => ({ ...h })).sort(order);
  const out: Highlight[] = [];
  for (const h of sorted) {
    const last = out[out.length - 1];
    if (last && sameParagraph(last, h) && h.s <= last.e) last.e = Math.max(last.e, h.e);
    else out.push(h);
  }
  return out;
}

export const addHighlight = (list: Highlight[], range: Highlight): Highlight[] => normalise([...list, range]);

/** Removes the selected stretch from any highlight it touches, splitting a highlight if it sits in the middle. */
export function clearHighlight(list: Highlight[], range: Highlight): Highlight[] {
  const out: Highlight[] = [];
  for (const h of list) {
    if (!sameParagraph(h, range) || range.e <= h.s || range.s >= h.e) {
      out.push(h);
      continue;
    }
    if (range.s > h.s) out.push({ p: h.p, s: h.s, e: range.s });
    if (range.e < h.e) out.push({ p: h.p, s: range.e, e: h.e });
  }
  return normalise(out);
}

/** The highlights a selection touches. */
export const touching = (list: Highlight[], range: Highlight): Highlight[] => list.filter((h) => sameParagraph(h, range) && range.s < h.e && range.e > h.s);

export interface Segment {
  text: string;
  start: number;
  end: number;
  highlighted: boolean;
}

/** A paragraph's text cut into plain and highlighted stretches, in order. */
export function segmentsOf(text: string, list: Highlight[], paragraph: string): Segment[] {
  const mine = normalise(list.filter((h) => h.p === paragraph)).map((h) => ({ ...h, s: Math.max(0, h.s), e: Math.min(text.length, h.e) })).filter((h) => h.e > h.s);
  const out: Segment[] = [];
  let at = 0;
  for (const h of mine) {
    if (h.s > at) out.push({ text: text.slice(at, h.s), start: at, end: h.s, highlighted: false });
    out.push({ text: text.slice(h.s, h.e), start: h.s, end: h.e, highlighted: true });
    at = h.e;
  }
  if (at < text.length) out.push({ text: text.slice(at), start: at, end: text.length, highlighted: false });
  return out.length ? out : [{ text, start: 0, end: text.length, highlighted: false }];
}
