# Mino Foundation Rewrite Manifest

**Branch:** `mino/foundation-content-quality-pilot`  
**Overall status:** In progress — editorial drafts are not yet live.  
**Source of truth for integration contract:** `FOUNDATION_CLAUDE_CODE_INTEGRATION_GUIDE.md`

Status vocabulary:
- `not audited`: active lesson inventory not yet checked.
- `audited`: lesson inventory and content reviewed, rewrite needs identified.
- `draft`: rewritten editorial source exists in docs.
- `integrated`: replacement mapped into active runtime source.
- `tested`: integration and relevant checks passed.
- `blocked`: a specific schema, factual, or product decision prevents safe completion.

| # | Module | Current status | Source / next action |
|---:|---|---|---|
| 1 | Sentence Basics | draft (partial) | Batch 01 covers `sb-1`–`sb-3`; Batch 02 covers `sb-4`–`sb-9`. Map all existing exercise IDs before integration. |
| 2 | Tenses for IELTS | draft (partial) | Batch 03 covers core lessons `t-3`–`t-8`; still audit/rewrite the other active tense lessons and verify the complete order. |
| 3 | Parts of Speech | draft (partial) | Batch 07 covers core word-class function and word families; map to active `POS_LESSONS` and remaining units. |
| 4 | Articles | draft (partial) | Batch 04 covers `ar-1`–`ar-4`; audit remaining article application/review lessons. |
| 5 | Subject–Verb Agreement | not audited | Audit `agreement` and `agreement-apply`. |
| 6 | Prepositions | draft (partial) | Batch 06 contains bilingual Prepositions teaching source; map and audit all active lessons/exercises. |
| 7 | Connectors | draft (partial) | Batch 06 contains bilingual Connectors teaching source; map and audit all active lessons/exercises. |
| 8 | Complex Sentences | draft (partial) | Batch 07 covers clause types and relative clauses; map to all active lessons. |
| 9 | Punctuation | draft (partial) | Batch 07 covers sentence boundaries and apostrophes; audit remaining punctuation topics. |
| 10 | Common Errors | draft (partial) | Batch 07 provides a diagnostic teaching source; map it to active error lessons and exercises. |
| 11 | Vocabulary Foundation | draft (partial) | Batch 08 covers contextual meaning, paraphrase, collocation and word families; audit all active vocabulary lessons. |
| 12 | IELTS Introduction | draft (partial; fact-check pending) | Batch 10 covers test-version awareness and practice-score limitations; verify current official test facts before release. |
| 13 | Listening Foundation | draft (partial; fact-check pending) | Batch 10 covers listening strategy and answer constraints; verify mode-specific format/timing and current official rules. |
| 14 | Reading Foundation | draft (partial; fact-check pending) | Batch 09 covers reading strategy, paraphrase and evidence; verify official format/timing/scoring claims before release. |
| 15 | Writing Foundation | draft (partial; fact-check pending) | Batch 09 covers planning, cohesion and editing; verify Academic/General task details, word count, timing and criteria. |
| 16 | Speaking Foundation | draft (partial; fact-check pending) | Batch 10 covers response development, fluency, grammar and pronunciation; verify official format/timing/criteria. |

## Batch source index
- Batch 05: Subject–Verb Agreement teaching source.
- Batch 06: Prepositions and Connectors teaching source.
- Batch 07: Parts of Speech, Complex Sentences, Punctuation and Common Errors teaching source.
- Batch 08: Vocabulary Foundation teaching source.
- Batch 09: Reading and Writing Foundation teaching source.
- Batch 10: IELTS Introduction, Listening and Speaking teaching source.

These are editorial drafts; module status is partial until every active lesson ID and exercise has been mapped, reviewed, integrated and tested.

## Quality gate for each lesson
- Accurate rule, with limits/exceptions where needed.
- Clear Bangla explanation and natural English examples.
- Worked reasoning, contrastive examples and misconception repair where useful.
- IELTS transfer that is concrete and factually defensible.
- Practice remains aligned with teaching; existing IDs and accepted-answer behavior are reviewed.
- No duplicate active IDs, broken imports, unsupported schema fields, or unverified claims.
- Score using `FOUNDATION_CONTENT_QUALITY_STANDARD.md`; accuracy, practice alignment and bilingual clarity must each be at least 3/4, with a target total of 32/40.

## Honest reporting
Do not call the whole Foundation “done” until every active module/lesson is accounted for and the completion definition in the integration guide is met. Draft-only and live-tested status must never be conflated.
