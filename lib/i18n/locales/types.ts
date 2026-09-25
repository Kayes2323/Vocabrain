import type { en } from './en';

type Shape<T> = {
  [K in keyof T]: T[K] extends string ? string : T[K] extends readonly string[] ? readonly string[] : Shape<T[K]>;
};

/** Every locale must provide exactly the keys of the English dictionary. */
export type LocaleDictionary = Shape<typeof en>;
