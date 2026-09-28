import type { LexEntry, LibraryPassage } from './types';
import * as p01 from './passages/p01-turtles';
import * as p02 from './passages/p02-floating-gardens';
import * as p03 from './passages/p03-protege-effect';
import * as p04 from './passages/p04-walking';
import * as p05 from './passages/p05-barcode';
import * as p06 from './passages/p06-languages';
import * as p07 from './passages/p07-memory';
import * as p08 from './passages/p08-longitude';
import * as p09 from './passages/p09-mangroves';
import * as p10 from './passages/p10-prices';
import * as p11 from './passages/p11-space-debris';
import * as p12 from './passages/p12-windcatchers';
import * as p13 from './passages/p13-bystanders';
import * as p14 from './passages/p14-ice-cores';
import * as p15 from './passages/p15-radiocarbon';
import * as p16 from './passages/p16-lone-inventor';
import * as p17 from './passages/p17-self-healing';
import * as p18 from './passages/p18-fifteen-minute-city';
import * as p19 from './passages/p19-cultured-meat';
import * as p20 from './passages/p20-loneliness';

/**
 * The Reading Library. To add a passage: write passages/pNN-name.ts exporting
 * LEX (only words not already in the lexicon) and PASSAGE, then add it here.
 * scripts/test-reading-library.ts checks every passage before release.
 */
const MODULES: { LEX: LexEntry[]; PASSAGE: LibraryPassage }[] = [p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20];

export const LIBRARY: LibraryPassage[] = MODULES.map((m) => m.PASSAGE);

/** Every lexicon entry, keyed by lemma. A word is defined once for the whole library. */
export const LEXICON: Record<string, LexEntry> = Object.fromEntries(MODULES.flatMap((m) => m.LEX).map((e) => [e.lemma, e]));

/** All lexicon entries in definition order (used to check for duplicates). */
export const LEX_LIST: LexEntry[] = MODULES.flatMap((m) => m.LEX);

export const getLibraryPassage = (id: string) => LIBRARY.find((p) => p.id === id);

export * from './types';
export * from './engine';
