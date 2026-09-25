/**
 * A translatable message produced by business logic. Engines return these
 * instead of strings so the UI can render them in the student's language.
 */
export type MessageVars = Record<string, string | number>;

export interface Message {
  key: string;
  vars?: MessageVars;
}

export function msg(key: string, vars?: MessageVars): Message {
  return vars ? { key, vars } : { key };
}
