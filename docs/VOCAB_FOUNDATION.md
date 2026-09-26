# Vocabulary Foundation

The first complete vocabulary learning loop, built on top of the existing Brain
(`users/{uid}/vocabulary`). No second word store.

Route: `/ielts/vocabulary/foundation` (home) → `/ielts/vocabulary/foundation/mission`.

## Loop

DISCOVER → CONTEXT → GUESS → EXPLANATION → SAVE → FREE RECALL → SENTENCE USE →
MINO FEEDBACK → REVIEW SCHEDULE → PROGRESS UPDATE

A daily mission (about 15 minutes) is a session of steps:

1. Discover 5 new course words: context sentence, guess from 4 options, then
   progressive reveal (meaning, pronunciation, explanation, examples,
   collocations, synonyms, word family, IELTS use), Save to Brain.
2. 5 meaning recalls, then 5 sentence-completion recalls in reverse order.
   A first miss shows "Almost…" plus a clue and a retry.
3. 2 sentence challenges, for the words the student missed most.
   Mino (`/api/mino/vocab-feedback`) checks meaning, grammar and naturalness;
   if Mino fails, the rule-based `checkSentence` runs instead.
4. Summary.

## Data

- Course content: `lib/vocab-foundation/words.ts` (10 words, each with a `why`).
- Engine: `lib/vocab-foundation/mission.ts` (pure functions).
- Course progress: `profile.vocabFoundation`
  - `discovered[id] = { at, guessedRight }`
  - `days[yyyy-mm-dd] = { newWords, recalls, recallCorrect, sentences, sentencesCorrect, missionDoneAt? }`
  - `session = { date, words, phase, index, results }`: resumes after a refresh
    or on another device.
- Word memory: the existing `BrainWord` (stage, nextReviewAt, recallHistory,
  usageHistory, …) plus `confidence`.

## Review algorithm (`lib/engine/brain.ts`)

- First recall due the same day; intervals of 1, 3, 7, 14, 30 and 60 days by stage.
- A wrong answer comes back in 1 day. A second failure in a row comes back in 4 hours.
- With 3 correct in a row at stage ≥ 3, the interval is ×1.5.
- `confidence` = recent accuracy (last 5) × 60 + stage progress × 40.
- `isWeakWord`: failed last time, or at least 3 recalls with a success rate below 50%.

## Tests

`pnpm test:vocab-foundation`
