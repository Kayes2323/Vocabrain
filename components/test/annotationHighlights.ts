/**
 * Paints highlights and notes with the browser's CSS Custom Highlight API, so the
 * text of a passage or a question never has to be rewritten to be marked. Every
 * block of annotated text publishes its ranges here and one pair of highlights
 * ("vb-hl" and "vb-note", styled in globals.css) draws them all.
 */
const registry = new Map<string, { marks: Range[]; notes: Range[] }>();

type HighlightCtor = new (...ranges: Range[]) => { priority: number };
type Registry = { set(name: string, h: unknown): void; delete(name: string): void };

const api = (): { highlights: Registry; Highlight: HighlightCtor } | null => {
  if (typeof window === 'undefined') return null;
  const highlights = (CSS as unknown as { highlights?: Registry }).highlights;
  const Highlight = (window as unknown as { Highlight?: HighlightCtor }).Highlight;
  return highlights && Highlight ? { highlights, Highlight } : null;
};

/** Whether this browser can show highlights (current Chrome, Edge, Safari and Firefox can). */
export const canHighlight = () => api() !== null;

function paint() {
  const a = api();
  if (!a) return;
  const all = [...registry.values()];
  const marks = new a.Highlight(...all.flatMap((x) => x.marks));
  const notes = new a.Highlight(...all.flatMap((x) => x.notes));
  notes.priority = 1;
  a.highlights.set('vb-hl', marks);
  a.highlights.set('vb-note', notes);
}

export function publishRanges(id: string, marks: Range[], notes: Range[]) {
  registry.set(id, { marks, notes });
  paint();
}

export function unpublishRanges(id: string) {
  registry.delete(id);
  paint();
}
