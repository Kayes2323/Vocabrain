# IELTS Reading Library

20 original IELTS Academic-style passages with IELTS question types and a
shared, bilingual vocabulary lexicon. Route: `/ielts/reading` (list) and
`/ielts/reading/[passageId]` (reader + questions). The three older short
readings (`lib/content/passages.ts`) still work on the same routes and are
listed under "Short vocabulary readings".

## Content rules

- Every passage is **original Mino text** written to Cambridge-level
  difficulty. No Cambridge (or other published) passage is copied,
  paraphrased or reproduced. The test suite rejects the word "Cambridge" in
  passage text.
- Passages about real topics draw only on well-established facts; the
  optional `background` field lists them. No invented sources, quotes or
  statistics.
- Every non-NOT GIVEN answer carries `evidence`: words that appear verbatim
  in the passage. The test checks this, so every answer is defensible.
- Explanations are bilingual. In the UI the Bangla explanation is shown in
  the Bangla locale, and always when an answer is wrong.
- Bangla uses respectful "আপনি".

## Files

| Path | Purpose |
| --- | --- |
| `lib/content/reading-library/types.ts` | Passage, question and lexicon types |
| `lib/content/reading-library/kit.ts` | Builders used by passage files (`lex`, `v`, `q`, `select`, `gap`, `multi`) and standard bilingual instructions |
| `lib/content/reading-library/engine.ts` | Numbering, grading (IELTS word limits), vocabulary segmentation, level suggestion |
| `lib/content/reading-library/passages/pNN-*.ts` | One passage per file: `LEX` (new lexicon words) + `PASSAGE` |
| `lib/content/reading-library/index.ts` | Registers passages, builds `LIBRARY` and `LEXICON` |
| `components/reading/library/*` | Reader, vocabulary card, questions |
| `scripts/test-reading-library.ts` | Content + engine tests (`pnpm test:reading-library`) |
| `scripts/e2e/reading-library.e2e.ts` | Browser test (`pnpm test:e2e:reading-library`) |

## Vocabulary

- One lexicon entry per word (`lemma`) across the whole library: no
  duplicates. A passage lists the words it teaches with `v(lemma, forms,
  ctxEn, ctxBn, sense?)`.
- `ctx` is the meaning in *this* passage. `sense` overrides the general
  meaning when a word is used in a different sense (e.g. *figure* = an
  important person, *issue*, *develop*, *driver* = a main cause). Only that
  one meaning is shown, never a dump of every meaning.
- Tiers: Core / Useful / Advanced. Very common words are not highlighted
  but can still be tapped: Mino explains them (see below).
- "Save to Brain" uses the existing Brain (`useBrain().save`) with the
  context meaning, Bangla meaning, example and the passage sentence; the
  word appears in My Brain and in Review. There is no separate list.

## Every word is clickable (Mino contextual meanings)

- Key words (`vocab`) are underlined and use the lexicon (instant, curated).
- Every other word is a button too. A click shows Mino's small loading
  animation inside the card, then Mino's meaning **for that sentence**:
  Bangla meaning, simple English meaning, part of speech, the meaning in this
  sentence and a short example. No page change.
- Flow: `components/reading/word-meaning.ts` (`useMeaningLookup`) →
  `lib/ai/client.ts` `wordMeaning()` → `POST /api/mino/word-meaning` →
  `lib/ai/server/assess/word-meaning.ts` (Gemini, fast tier, JSON).
- The route requires a signed-in student, accepts only a sentence that is
  really in that passage (library or legacy), has its own rate limit
  (`checkWordLookupLimit`: 30/min, 400/day) and keeps a server-side cache of
  recent explanations. The Gemini key stays on the server.
- The browser caches one explanation per word per passage (memory +
  sessionStorage), so clicking the same word again makes no new request.
- If Mino is unavailable the card falls back to the dictionary meaning.
- Works for every current and future passage automatically: nothing has to be
  written per word.
- The card floats (bottom sheet on phones, beside the passage on wide
  screens), so the passage never moves; one card at a time.
- "Save to Brain" saves Mino's meaning to the existing My Brain.

## Questions

Types: `mcq`, `tfng`, `ynng`, `headings`, `info` (matching information),
`names` (matching names), `multi` (choose TWO), and completion: `sentence`,
`summary`, `note`, `table`, `short`. Gap answers are graded with the IELTS
word limit (hyphenated words and numbers count as one word; case and a
final full stop are ignored).

## Progress and levels

`profile.study.readingLibrary[passageId] = { answers, checked?, score?, updatedAt }`.
Answers autosave (debounced). Checking marks the passage read and ticks the
daily Reading task. Levels are a guide, never a lock: after 3 checked
passages at a level the next level is suggested. No points or ranking.

## Mino

Mino is only involved when the student asks: the word card has "Ask Mino
about this sentence" (`/mino?ask=reading&passage=…&s=…`). MinoChat sends
the question only if the sentence really is in that passage.

## Adding a passage

1. Create `passages/pNN-topic.ts` with `LEX` (only words not yet in the
   lexicon) and `PASSAGE`.
2. Register it in `index.ts`.
3. Run `pnpm test:reading-library`: it checks length per level, vocabulary
   matches, evidence, word limits, answer balance and Bangla.
