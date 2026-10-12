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
| 3 | Parts of Speech | not audited for rewrite | Inspect active `POS_LESSONS`, units, planned lessons and prior live implementation before edits. |
| 4 | Articles | draft (partial) | Batch 04 covers `ar-1`–`ar-4`; audit remaining article application/review lessons. |
| 5 | Subject–Verb Agreement | not audited | Audit `agreement` and `agreement-apply`. |
| 6 | Prepositions | not audited | Audit `prepositions` and `prepositions-apply`. |
| 7 | Connectors | not audited | Audit `connectors` and `connectors-apply`. |
| 8 | Complex Sentences | not audited | Audit `complex` and `complex-apply`. |
| 9 | Punctuation | not audited | Audit `punctuation` and `punctuation-apply`. |
| 10 | Common Errors | not audited | Audit `common-errors` and `common-errors-apply`. |
| 11 | Vocabulary Foundation | not audited | Audit `vocabulary` and `vocabulary-apply`. |
| 12 | IELTS Introduction | not audited; factual review required | Verify test format, versions, marking and scoring against current official IELTS sources before edits. |
| 13 | Listening Foundation | not audited; factual review required | Verify format, question types, timing and transfer/answer-entry rules against current official sources. |
| 14 | Reading Foundation | not audited; factual review required | Verify format, question instructions, timing and scoring statements against current official sources. |
| 15 | Writing Foundation | not audited; factual review required | Verify task formats, word-count guidance, assessment criteria and claims against current official sources. |
| 16 | Speaking Foundation | not audited; factual review required | Verify parts, timing, assessment criteria and claims against current official sources. |

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
