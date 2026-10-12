# Foundation Active Catalogue Map

**Branch:** `mino/foundation-content-quality-pilot`  
**Source inspected:** `lib/foundation/content/index.ts` and `lib/foundation/model.ts`  
**Purpose:** Give content editors and Claude Code the actual runtime catalogue references. This is a mapping aid, not a claim that the lessons have all been individually audited.

## Rules before editing

- The authoritative active lesson order is the `lessons` array for each module in `lib/foundation/content/index.ts`, including spread arrays and unit-based lessons.
- Resolve each imported object to its `id` in its source file. Do not infer lesson IDs from variable names or filenames.
- Preserve every active lesson ID, exercise ID, order, prerequisites, unit, and existing answer behavior.
- The model supports only the declared `LessonStep` kinds in `lib/foundation/model.ts`: `hook`, `discover`, `identify`, `concept`, `examples`, `ielts`, `mistakes`, `practice`, `recall`. Reuse these; do not invent kinds.
- Existing editorial batches are prose/source drafts. They are not automatically a one-to-one replacement for the runtime lesson arrays.

## Active module mapping

| Module ID | Runtime lesson source/order | Active catalogue detail requiring resolution |
|---|---|---|
| `sentence-basics` | `sentenceBasicsLessons` then `sbQuestions` | Expand the imported array and resolve all lesson/exercise IDs. Draft batches 01–02 cover only `sb-1`–`sb-9`; verify the question lesson and any additional IDs. |
| `tenses` | `understandingTime`, `presentSimpleV2`, `presentContinuousV2`, `pastSimpleV2`, `pastContinuousV2`, `presentPerfectV2`, `presentPerfectContinuous`, `pastPerfectV2`, `futureFormsV2`, `tenseComparisons`, `tenseMistakesV2`, `tensesWritingV2`, `tensesSpeakingV2`, `tensesMixedPractice`, then `tensesLessons`, `tensesLessons2` | Two spread arrays and several source generations must be expanded; batch 03 only claims core lessons `t-3`–`t-8`. |
| `parts-of-speech` | `POS_LESSONS` and `POS_UNITS`; planned list `POS_PLANNED` | Inspect unit-level lesson references and planned topics; prose batch 07 is not a full lesson-by-lesson replacement. |
| `articles` | `aOrAn`, `aAnMeaning`, `theArticle`, `zeroArticle`, `articleChoice`, `articleMistakes`, `articlesInIelts`, `articlesMixed`, `articlesReview` | Nine active lesson objects; batch 04 explicitly covers `ar-1`–`ar-4` only. Resolve each symbol to its actual ID. |
| `agreement` | `svaBasics`, `svaCompound`, `svaIndefinite`, `svaLongSubjects`, `svaQuantity`, `svaMistakes`, `svaInIelts`, `svaMixed`, `svaReview` | Nine active lesson objects; batch 05 is a teaching source, not yet a complete per-ID map. |
| `prepositions` | `prepTime`, `prepDuration`, `prepPlace`, `prepMovement`, `prepPartners`, `prepData`, `prepMistakes`, `prepInIelts`, `prepReview` | Nine active lesson objects; map the batch 06 content to each without losing exercise IDs. |
| `connectors` | `connAdd`, `connContrast`, `connCause`, `connExample`, `connGrammar`, `connCohesion`, `connMistakes`, `connInIelts`, `connReview` | Nine active lesson objects; map the batch 06 content to each. |
| `complex-sentences` | `cxClauses`, `cxReasonPurpose`, `cxTimeIf`, `cxRelative`, `cxRelativeComma`, `cxNounClauses`, `cxMistakes`, `cxInIelts`, `cxReview` | Nine active lesson objects; batch 07 is a thematic source and needs per-ID mapping. |
| `punctuation` | `pnCapitals`, `pnEndMarks`, `pnCommas`, `pnCommaErrors`, `pnApostrophes`, `pnColonsParagraphs`, `pnMistakes`, `pnProofread`, `pnReview` | Nine active lesson objects; verify coverage of colon/paragraph and proofread/review content. |
| `common-errors` | `ceTranslation`, `ceCountable`, `cePlural`, `ceCollocation`, `ceWordPairs`, `ceNatural`, `ceHabits`, `ceInIelts`, `ceReview` | Nine active lesson objects; map the batch 07 source and verify each lesson's accepted variants. |
| `vocabulary-foundation` | `vcKnowWord`, `vcContext`, `vcParaphrase`, `vcRegister`, `vcPrecise`, `vcUseWords`, `vcHabits`, `vcInIelts`, `vcReview` | Nine active lesson objects; batch 08 is a source draft, not yet integrated per lesson. Daily word missions are a separate linked feature and must remain unchanged. |
| `ielts-intro` | `ibWhat`, `ibWhy`, `ibVersions`, `ibFormat`, `ibDelivery`, `ibBands`, `ibMarking`, `ibPlan`, `ibMyths`, `ibYourPlan`, `ibReview` | Eleven active lesson objects; verify all exam-format/scoring claims against official sources before release. |
| `listening-foundation` | `lsFormat`, `lsPart1`, `lsPart2`, `lsPart3`, `lsPart4`, `lsRules`, `lsTraps`, `lsStrategy`, `lsReview` | Nine active lesson objects; confirm mode-specific facts and answer rules against current official sources. |
| `reading-foundation` | `rdSkim`, `rdParaphrase`, `rdTfng`, `rdHeadings`, `rdChoice`, `rdCompletion`, `rdTraps`, `rdStrategy`, `rdReview` | Nine active lesson objects; verify format, time and scoring statements before release. |
| `writing-foundation` | `wrFormat`, `wrOverview`, `wrData`, `wrQuestion`, `wrParagraphs`, `wrCohesion`, `wrTraps`, `wrPlan`, `wrReview` | Nine active lesson objects; keep Academic and General Training distinctions accurate; verify word counts, timing and criteria. |
| `speaking-foundation` | `spFormat`, `spPart1`, `spPart2`, `spPart3`, `spFluency`, `spPronunciation`, `spTraps`, `spPlan`, `spReview` | Nine active lesson objects; verify official format/timing/criteria and avoid promises of a specific band. |

## Count status

The explicit single-object arrays above give a **catalogue-symbol count**, not necessarily a unique lesson-ID count: source objects still need to be opened and their IDs checked. Sentence Basics, Tenses and Parts of Speech include spread/unit collections and therefore cannot be counted accurately from this index excerpt alone. Do not report a final total until a script/test expands the actual `MODULES` export and checks uniqueness.

## Required automated audit before integration is called complete

1. Expand `MODULES` from the real runtime import graph and list each active lesson ID in order.
2. Assert lesson IDs are unique across active modules; assert exercise IDs are unique at the appropriate scope.
3. Compare that exact inventory against the rewrite manifest and editorial source sections.
4. Confirm every lesson has adequate bilingual teaching, examples, misconception repair where useful, and practice aligned with its answer key.
5. Verify all IELTS-specific claims against official, current sources and record URLs/date in the audit.
6. Run the existing TypeScript/lint/test scripts and any relevant Foundation tests.
7. Manually smoke-test representative lessons in the UI, especially practice answer checking and saved progress.
8. Mark each module `integrated` and `tested` only after evidence exists.

**Current state:** this document maps the index's active object references; it does not itself complete the lesson-by-lesson audit, integration, official fact-check, or tests.
