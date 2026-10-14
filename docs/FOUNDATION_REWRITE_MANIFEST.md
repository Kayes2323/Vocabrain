# Mino Foundation Rewrite Manifest

**Branch:** `mino/foundation-content-quality-pilot`  
**Overall status:** In progress — 38 lessons integrated in the runtime on this branch (not yet merged or deployed to Production); 156 unchanged.  
**Source of truth for integration contract:** `FOUNDATION_CLAUDE_CODE_INTEGRATION_GUIDE.md`

Status vocabulary:
- `not audited`: active lesson inventory not yet checked.
- `audited`: lesson inventory and content reviewed, rewrite needs identified.
- `draft`: rewritten editorial source exists in docs.
- `integrated`: replacement mapped into active runtime source.
- `tested`: integration and relevant checks passed.
- `blocked`: a specific schema, factual, or product decision prevents safe completion.

| # | Module | Current status | What is live on this branch |
|---:|---|---|---|
| 1 | Sentence Basics | **integrated, tested** (sb-1–sb-9) · sb-10 unchanged | Batches 01/02 mapped by topic into sb-1–sb-9 (v2 format, hook, mistake lab, recall, Mino task, 8 review concepts). E2E: sb-1 in Bangla on a phone. |
| 2 | Tenses for IELTS | **integrated, tested** (t-3–t-8, t-11) · others unchanged | Batch 03 accuracy points added to t-3–t-8 (state verbs, has lived / lived, past perfect not compulsory, timetables, will vs going to). E2E: t-6. |
| 3 | Parts of Speech | partly integrated (pie-5, pcj-2) · others unchanged | Neutral wording instead of "Band 6+"; respectful Bangla. Batch 07 points already covered by the live units. |
| 4 | Articles | partly integrated (ar-3, ar-6, ar-7) | Shared context and "the" (batch 04); no "Band 7" label; respectful Bangla. |
| 5 | Subject–Verb Agreement | partly integrated (sva-2, sva-4) | Rewrite awkward either/or (batch 05); group-noun answer keys checked — none rejects a plural. |
| 6 | Prepositions | partly integrated (pr-5) | No "always one rule" claim (batch 06). |
| 7 | Connectors | partly integrated (cn-6, cn-7, cn-9) | No unsupported Band 7 claim; two answer keys accept a second correct order. |
| 8 | Complex Sentences | partly integrated (cx-8) | cx-8-c3 accepts the other non-defining order. |
| 9 | Punctuation | unchanged | Automated checks pass; batch 07 punctuation points are already taught (comma splices, apostrophes, colons). |
| 10 | Common Errors | unchanged | Automated checks pass. |
| 11 | Vocabulary Foundation | unchanged | Automated checks pass. E2E: vc-1 played end to end. |
| 12 | IELTS Introduction | **integrated, tested** (ib-3, ib-7, ib-8, ib-9, final part C) | Delivery facts checked 2026-10-14 (paper ends mid-2026; Bangladesh after 31 Jan 2026; Writing on Paper; 2-minute Listening check). E2E: ib-3. |
| 13 | Listening Foundation | integrated, tested (ls-2, ls-8) | Letter case does not change a mark; computer check time. |
| 14 | Reading Foundation | integrated, tested (rd-8) | Paper-only wording removed. |
| 15 | Writing Foundation | integrated (wr-8) | wr-8-r2 accepts "outline". Format facts verified, already correct. |
| 16 | Speaking Foundation | integrated (sp-6, sp-8) | Answer-key fixes. Format facts verified, already correct. |

Per-lesson detail, sources and test status: [`FOUNDATION_INTEGRATION_INVENTORY.md`](./FOUNDATION_INTEGRATION_INVENTORY.md).
"unchanged" means the lesson passed every automated check and the module-level scan, but has not had a manual
line-by-line rewrite against the quality standard.

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


## Runtime catalogue map
See [`FOUNDATION_ACTIVE_CATALOGUE_MAP.md`](./FOUNDATION_ACTIVE_CATALOGUE_MAP.md) for the actual active module-to-source-object order from `lib/foundation/content/index.ts`, including spread arrays and the remaining mapping/counting work. This is a source-reference map, not proof that all lessons have been rewritten or tested.
