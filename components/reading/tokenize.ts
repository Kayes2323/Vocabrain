export interface Token {
  text: string;
  isWord: boolean;
  /** Character offset in the paragraph. */
  start: number;
}

const WORD = /[A-Za-z][A-Za-z'’-]*[A-Za-z]|[A-Za-z]/g;

/** Splits a paragraph into word and non-word tokens, keeping every character. */
export function tokenize(paragraph: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const match of paragraph.matchAll(WORD)) {
    const start = match.index ?? 0;
    if (start > last) tokens.push({ text: paragraph.slice(last, start), isWord: false, start: last });
    tokens.push({ text: match[0], isWord: true, start });
    last = start + match[0].length;
  }
  if (last < paragraph.length) tokens.push({ text: paragraph.slice(last), isWord: false, start: last });
  return tokens;
}

/** The sentence that contains the character at `offset`. */
export function sentenceAt(paragraph: string, offset: number): string {
  const before = paragraph.slice(0, offset);
  const startMatch = before.match(/[\s\S]*[.!?]\s+/);
  const start = startMatch ? startMatch[0].length : 0;
  const rest = paragraph.slice(offset);
  const endMatch = rest.match(/[.!?](\s|$)/);
  const end = endMatch ? offset + (endMatch.index ?? 0) + 1 : paragraph.length;
  return paragraph.slice(start, end).trim();
}
