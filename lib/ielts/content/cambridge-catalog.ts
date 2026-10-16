// Browsing catalog for the Cambridge IELTS series (books 10–21). This is
// intentionally separate from ALL_BOOKS/BOOKS in lib/ielts/content/index.ts:
// those render real, structurally validated exam content through the test
// engine, and no real Cambridge content exists in this app yet. This file
// only describes which books/tests exist so the library UI can be browsed
// honestly — every test's `linkedTestId` stays undefined (not available)
// until a real, licensed PracticeTest is added to the content registry and
// linked here. Do not add invented section/question content anywhere for
// these entries.
import type { PracticeTest } from '../model';
import { isPublishable } from '../validate';
import { getTest } from './index';

export interface CambridgeTestMeta {
  id: string;
  /** Test 1–4 within the book. */
  number: 1 | 2 | 3 | 4;
  /**
   * The id of a real, validated PracticeTest in lib/ielts/content that
   * delivers this test's content. Undefined (the current state for every
   * entry) means "not yet available" — the honest default until a future,
   * separately licensed content-integration task adds and links one.
   */
  linkedTestId?: string;
}

export interface CambridgeBookMeta {
  id: string;
  /** Cambridge IELTS 19 → 19. */
  edition: number;
  title: string;
  /** All editions 10–21 are Academic; general training content isn't claimed here. */
  academic: true;
  tests: CambridgeTestMeta[];
}

function testsFor(edition: number): CambridgeTestMeta[] {
  return [1, 2, 3, 4].map((number) => ({ id: `cambridge-${edition}-test-${number}`, number: number as 1 | 2 | 3 | 4 }));
}

/** Editions 10–21, newest first (matches the `order` convention in TestBook). */
export const CAMBRIDGE_CATALOG: CambridgeBookMeta[] = Array.from({ length: 12 }, (_, i) => 21 - i).map((edition) => ({
  id: `cambridge-${edition}`,
  edition,
  title: `Cambridge IELTS ${edition}`,
  academic: true,
  tests: testsFor(edition),
}));

export function getCambridgeBook(id: string): CambridgeBookMeta | undefined {
  return CAMBRIDGE_CATALOG.find((b) => b.id === id);
}

export function getCambridgeTest(bookId: string, number: number): CambridgeTestMeta | undefined {
  return getCambridgeBook(bookId)?.tests.find((t) => t.number === number);
}

/**
 * The real, launchable PracticeTest behind a catalog entry, or undefined
 * when the entry has no linked test, the link is broken, or the linked
 * test isn't publishable. This is the single source of truth for whether a
 * Cambridge test is "available" in the UI — never infer availability any
 * other way.
 */
export function launchableTest(meta: CambridgeTestMeta): PracticeTest | undefined {
  if (!meta.linkedTestId) return undefined;
  const test = getTest(meta.linkedTestId);
  return test && isPublishable(test) ? test : undefined;
}
