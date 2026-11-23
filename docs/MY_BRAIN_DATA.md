# My Brain — data ownership, counts and integrity rules

Phase 0 (trust & data integrity). Behaviour described here is enforced by
`scripts/test-brain-integrity.ts` and `scripts/e2e/brain-integrity.e2e.ts`.

## Authoritative stores

| What | Store | Authority for |
|---|---|---|
| Saved words and their learning state | Firestore `users/{uid}/vocabulary/{wordId}` (guests: `localStorage` `vocabbrain:brain:{uid}`) | **Every count shown in My Brain**: Words, Review today, New, Learning, Mastered, and the Home/Progress/Plan numbers that come from `brainSummary()` |
| Legacy "saved from the word bank" ids | `users/{uid}.app.vocabulary.savedWordIds` | Migration source only. Never an authority for counts. Shortened only by ids the server has confirmed in the Brain |
| Word-bank / lesson flashcard stats (`seen/recalled/missed`) | `users/{uid}.app.vocabulary.words` | Flashcard "active word" numbers on the lesson screens only. **Not** used by My Brain counts (Phase 1+ decides whether to unify) |
| Vocabulary Foundation course progress (days, discovered words, session) | `users/{uid}.app.vocabFoundation` | The course's own streak/mission numbers. A Foundation word that was saved is also a Brain word, and its memory state lives only in the Brain |

## Counts (one rule, `lib/engine/brain.ts`)

Groups partition the words: **New** (never recalled) + **Learning** (recalled at least once, not mastered) + **Mastered** = **All**.
**Review** (due now) cuts across the groups. `brainCounts()` and `matchesBrainFilter()` are used by the stat tiles, the tab counts and the list, so the three cannot disagree.
The audit's "Learning 1 vs Learning 8" came from the tab counting every non-mastered word as Learning while the tile counted only words that had been recalled.

## Recall attempts

* The answer is stored the moment its result is known (`recordRecall(..., attemptId)`); the optional self-rating (`rateRecall`) refines that same attempt.
* An attempt has a stable key (`recallHistory[].id`); recording the same key twice is a no-op, so retries never double count.
* An unrated attempt carries `before` (the scheduler fields as they were) so that a later rating produces exactly the schedule the rating would have produced with the answer. `ratedAt` is set when it is rated.
* A "check yourself" answer (the learner compares with the model answer) has no machine verdict; it is stored when the learner chooses a rating, as before.

## Load and write states (`lib/engine/brain-store.ts`)

`loading` → `ready` (words may be none = **empty**) · `error` (load failed) · `unconfirmed` (device cache is empty and the server has not answered).
Only a server-confirmed empty list is "empty". A failed write is reported to its caller, kept as *unsaved* (and merged over incoming snapshots) until it succeeds; a write the server rejects as invalid is rolled back.

## Validation boundaries

1. **Firestore rules** (`validBrainWord` in `firestore.rules`) — the authority: stage 0–6 whole number, ISO-8601 UTC dates, known status, counts ≥ 0, short lists/text, history size caps. Fields are checked only when present, so words saved by older versions stay valid. Owner-only access is unchanged.
2. **Client** (`lib/engine/brain-validate.ts`) — mirrors the rules (plus rejects impossible calendar days) and refuses an invalid write before sending it.
3. **Server** — no server route writes vocabulary today (Mino tools only read). The server reads defensively with `sanitizeBrainWord`, so an already-invalid stored value cannot skew Mino's picture. Any future server write path must call `assertValidBrainWord`.
4. Reading a stored word never rewrites it; `sanitizeBrainWord` repairs the in-memory copy only.
