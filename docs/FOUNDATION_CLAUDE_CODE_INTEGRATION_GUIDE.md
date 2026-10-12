# Mino Foundation Rewrite — Claude Code Integration Guide

**Purpose:** This is the handoff contract for integrating the rewritten Foundation teaching content into Vocabrain. Claude Code should implement the content faithfully, not invent or paraphrase a new curriculum.

## Current status
- Rewrite branch: `mino/foundation-content-quality-pilot`
- Content is editorial source material in `docs/`; it is **not yet live in the app**.
- Batch 01: Sentence Basics lessons `sb-1`–`sb-3`.
- Batch 02: Sentence Basics lessons `sb-4`–`sb-9`.
- Batch 03: Core Tenses lessons `t-3`–`t-8`.
- Batch 04: Articles lessons `ar-1`–`ar-4`.
- Batch 05: Subject–Verb Agreement teaching source.
- Batch 06: Prepositions and Connectors teaching source.
- Batch 07: Parts of Speech, Complex Sentences, Punctuation and Common Errors teaching source.
- Batch 08: Vocabulary Foundation teaching source.
- Batch 09: Reading and Writing Foundation teaching source.
- Batch 10: IELTS Introduction, Listening and Speaking teaching source.
- Existing runtime sources remain in `lib/foundation/content/` until integration is explicitly completed and verified.

## Non-negotiable implementation rules
1. Keep the existing practice system and learner experience working: do not replace the exercise renderer, answer checking, hints, progress tracking, mastery logic, review scheduling, navigation, or completion behavior.
2. Preserve all active lesson IDs and exercise IDs unless a migration is deliberately designed and tested. In particular, do not duplicate the editorial draft's lesson headings as new runtime lessons.
3. Treat the batch documents as the editorial source of truth for lesson explanations. Map their content into the existing `Lesson` / `Step` schema in `lib/foundation/model.ts`; reuse supported step kinds and fields only.
4. Before editing a content file, inspect its imports in `lib/foundation/content/index.ts`, the renderer for every step kind used, and any tests that assert lesson counts/IDs. Do not infer the active order from filenames alone.
5. Do not silently change an answer key because a rewritten explanation suggests a different answer. Verify the question, prompt, answer, accepted variants and explanation together. Record any necessary answer-key correction and add a regression test.
6. Keep English examples natural and accurate; use clear contemporary Bangla to explain the idea. Do not promise a particular IELTS band or present context-sensitive usage as an absolute rule.
7. Do not add unsupported step kinds, UI, or dependencies. If a draft section has no exact schema equivalent, adapt it to existing supported fields and note any genuinely necessary schema change separately.
8. Keep changes small and reviewable by module. Never merge this branch or deploy without explicit user approval.

## Integration workflow
1. Read `docs/FOUNDATION_CONTENT_AUDIT.md`, `docs/FOUNDATION_CONTENT_QUALITY_STANDARD.md`, and every batch document in order.
2. Inspect the active source and schema; build a mapping table of source lesson ID → rewritten content section → preserved exercise IDs.
3. Integrate one module at a time. Preserve IDs and compatible answer shapes. Prefer changing teaching text and examples first; touch exercise logic only for a verified defect.
4. Run TypeScript/lint/tests available in the repository. Add focused tests for lesson-ID uniqueness, exercise-ID uniqueness, required bilingual fields, answer-key validity, and active catalogue reachability where compatible with existing test conventions.
5. Review the diff for accidental changes to practice behavior, navigation, progress, scoring, and unrelated features.
6. Update the audit/manifest with status: `draft`, `integrated`, `tested`, or `blocked`. Never label content complete merely because a Markdown draft exists.
7. Report exactly which modules/files changed, tests run and results, remaining blockers, and whether the content is live. Do not merge or deploy unless explicitly asked.

## Completion definition
Foundation content is **content-complete** only when every active lesson in all 16 modules has been audited and rewritten or explicitly approved as already meeting the standard; factual/IELTS claims and answer keys have been reviewed; the manifest lists every lesson; and all content quality gates are met.
Foundation is **integration-complete** only when that content is wired into the existing app, the existing practice/progress systems are preserved, tests pass, and the integrated lessons are verified in the active catalogue. These are different statuses and must be reported separately.

## Module inventory
The active catalogue in `lib/foundation/content/index.ts` currently defines:
1. Sentence Basics
2. Tenses for IELTS
3. Parts of Speech
4. Articles
5. Subject–Verb Agreement
6. Prepositions
7. Connectors
8. Complex Sentences
9. Punctuation
10. Common Errors
11. Vocabulary Foundation
12. IELTS Introduction
13. Listening Foundation
14. Reading Foundation
15. Writing Foundation
16. Speaking Foundation

The inventory is not proof that every lesson is high quality. Use the active imports and runtime IDs as the audit denominator; multiple generations of source files exist.

## Source documents
- `FOUNDATION_CONTENT_QUALITY_STANDARD.md`: editorial quality and scoring rules.
- `FOUNDATION_CONTENT_AUDIT.md`: initial inventory/triage; not a completed line-by-line audit.
- `FOUNDATION_REWRITE_BATCH_01_SENTENCE_BASICS.md`: lessons `sb-1`–`sb-3`.
- `FOUNDATION_REWRITE_BATCH_02_SENTENCE_BASICS.md`: lessons `sb-4`–`sb-9`.
- `FOUNDATION_REWRITE_BATCH_03_TENSES_CORE.md`: core tense lessons `t-3`–`t-8`.
- `FOUNDATION_REWRITE_BATCH_04_ARTICLES.md`: lessons `ar-1`–`ar-4`.
- `FOUNDATION_REWRITE_BATCH_05_SUBJECT_VERB_AGREEMENT.md`: agreement teaching source.
- `FOUNDATION_REWRITE_BATCH_06_PREPOSITIONS_CONNECTORS.md`: prepositions and connectors teaching source.
- `FOUNDATION_REWRITE_BATCH_07_POS_COMPLEX_PUNCTUATION_ERRORS.md`: grammar/error modules teaching source.
- `FOUNDATION_REWRITE_BATCH_08_VOCABULARY.md`: vocabulary teaching source.
- `FOUNDATION_REWRITE_BATCH_09_READING_WRITING.md`: Reading and Writing Foundation teaching source.
- `FOUNDATION_REWRITE_BATCH_10_IELTS_LISTENING_SPEAKING_INTRO.md`: IELTS Introduction, Listening and Speaking teaching source.
- `FOUNDATION_REWRITE_MANIFEST.md`: module/lesson status tracker.

**Important:** Keep this guide updated as new batches are added. Do not delete or overwrite the existing runtime content until the replacement has been integrated and tested.
