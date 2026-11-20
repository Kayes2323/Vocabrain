/**
 * Highlights and notes on the text of a test, as in the computer-delivered IELTS
 * test: the student selects text and highlights it, adds a note to it, or clears
 * it again. An annotation is a character range inside one block of text (a
 * passage, or the questions of a part). Pure functions only; the screen part
 * lives in components/test/AnnotationScope.tsx.
 */
export interface Annotation {
  /** Start and end offsets into the block's text (end exclusive). */
  s: number;
  e: number;
  /** The text itself, so an annotation can find its place again if the page text shifts. */
  q: string;
  /** Present when this is a note rather than a plain highlight. */
  note?: string;
}

const order = (a: Annotation, b: Annotation) => a.s - b.s || a.e - b.e;
const isNote = (a: Annotation) => a.note !== undefined;

/** Plain highlights are joined when they overlap or touch; notes always keep their own range. */
export function normalise(list: Annotation[], text?: string): Annotation[] {
  const notes = list.filter((a) => isNote(a) && a.e > a.s).map((a) => ({ ...a }));
  const marks = list.filter((a) => !isNote(a) && a.e > a.s).map((a) => ({ ...a })).sort(order);
  const joined: Annotation[] = [];
  for (const m of marks) {
    const last = joined[joined.length - 1];
    if (last && m.s <= last.e) last.e = Math.max(last.e, m.e);
    else joined.push(m);
  }
  const out = [...joined, ...notes].sort(order);
  return text === undefined ? out : out.map((a) => ({ ...a, q: text.slice(a.s, a.e) }));
}

export const addHighlight = (list: Annotation[], range: { s: number; e: number }, text: string): Annotation[] =>
  normalise([...list, { s: range.s, e: range.e, q: text.slice(range.s, range.e) }], text);

export const addNote = (list: Annotation[], range: { s: number; e: number }, text: string, note: string): Annotation[] =>
  normalise([...list, { s: range.s, e: range.e, q: text.slice(range.s, range.e), note }], text);

/** Changes the text of the note that has exactly this range. An empty note removes it. */
export function setNote(list: Annotation[], range: { s: number; e: number }, note: string): Annotation[] {
  const text = note.trim();
  return list.flatMap((a) => (isNote(a) && a.s === range.s && a.e === range.e ? (text ? [{ ...a, note }] : []) : [a]));
}

/**
 * Removes the selected stretch. A highlight loses just that stretch (and is split
 * when the stretch is in its middle); a note touched by it is removed whole.
 */
export function clearRange(list: Annotation[], range: { s: number; e: number }, text: string): Annotation[] {
  const out: Annotation[] = [];
  for (const a of list) {
    if (range.e <= a.s || range.s >= a.e) {
      out.push(a);
      continue;
    }
    if (isNote(a)) continue;
    if (range.s > a.s) out.push({ s: a.s, e: range.s, q: text.slice(a.s, range.s) });
    if (range.e < a.e) out.push({ s: range.e, e: a.e, q: text.slice(range.e, a.e) });
  }
  return normalise(out, text);
}

/** The annotations a stretch touches (edges that only meet do not count). */
export const touching = (list: Annotation[], range: { s: number; e: number }): Annotation[] => list.filter((a) => range.s < a.e && range.e > a.s);

/** Whether every character of the stretch is already inside a plain highlight. */
export function fullyHighlighted(list: Annotation[], range: { s: number; e: number }): boolean {
  let at = range.s;
  for (const a of normalise(list.filter((x) => !isNote(x)))) {
    if (a.e <= at) continue;
    if (a.s > at) return false;
    at = a.e;
    if (at >= range.e) return true;
  }
  return at >= range.e;
}

/** The annotation under a point in the text, preferring a note. */
export function annotationAt(list: Annotation[], offset: number): Annotation | undefined {
  const here = list.filter((a) => offset >= a.s && offset < a.e);
  return here.find(isNote) ?? here[0];
}

/**
 * Puts stored annotations back on the current text. One whose text is still where
 * it was stays; one whose text has moved is found again by its words (the nearest
 * match); one whose text has gone is dropped.
 */
export function restore(list: Annotation[], text: string): Annotation[] {
  const out: Annotation[] = [];
  for (const a of list) {
    if (a.q && text.slice(a.s, a.e) === a.q) {
      out.push(a);
      continue;
    }
    if (!a.q) continue;
    let best = -1;
    for (let i = text.indexOf(a.q); i !== -1; i = text.indexOf(a.q, i + 1)) {
      if (best === -1 || Math.abs(i - a.s) < Math.abs(best - a.s)) best = i;
    }
    if (best !== -1) out.push({ ...a, s: best, e: best + a.q.length });
  }
  return normalise(out, text);
}
