# Mino Foundation — Phase 1 Content Audit

**Repository:** `Kayes2323/Vocabrain`  
**Audit target:** Existing IELTS Foundation content under `lib/foundation/content/`, catalogue in `index.ts`, model in `lib/foundation/model.ts`, and existing answer-audit report.  
**Status:** Initial full-catalogue audit with representative source inspection. This is not a claim that every individual lesson has already been manually line-edited or clinically/academically validated. The lesson-level pass must continue in batches before rewriting content.

## Executive finding

The Foundation is not empty or uniformly low quality. It already has useful infrastructure: bilingual lesson data, practice exercises, feedback fields, hooks/discovery steps in newer lessons, common-mistake steps, IELTS transfer, recall, and a deterministic answer audit. Several newer lesson families use a stronger problem-first pattern.

The central product risk is **inconsistent teaching depth and consistency across a mixed-generation content library**. Some legacy lessons are mostly concept → examples → IELTS link → practice → recall. Newer lessons add hook, diagnosis, discovery and mistake analysis. There are also multiple overlapping versions/final/apply files, which creates a risk that duplicated or older content may remain in the learner path or be maintained inconsistently. A premium rewrite should preserve the existing strong practice engine and upgrade the teaching, factual trust, and learner experience around it.

**Important distinction:** file size is not teaching quality. Large files can contain many exercises but still provide thin theory; small files may be excellent if the explanation and examples are precise.

## Evidence gathered

- The catalogue in `lib/foundation/content/index.ts` declares 16 module IDs: sentence basics, tenses, parts of speech, articles, subject–verb agreement, prepositions, connectors, complex sentences, punctuation, common errors, vocabulary foundation, IELTS introduction, Listening foundation, Reading foundation, Writing foundation and Speaking foundation.
- The content directory contains 68 TypeScript files. Several topics have multiple related files such as core, apply, final, v2/new and review-oriented content; the runtime import path must be treated as the source of truth when determining what students actually see.
- `lib/foundation/model.ts` supports a richer learning sequence: hook, discover, identify, concept, examples, IELTS, mistakes, practice and recall. It also supports question-specific feedback and personal-use exercises. This means we should improve content before assuming a large renderer rewrite is necessary.
- Representative inspection: `sentence-basics.ts` uses mostly concept/examples/IELTS/practice/recall; sampled newer files such as `tenses-core.ts`, `articles.ts`, `reading.ts` and `ielts-intro.ts` include hook/discover/mistakes steps. This supports a consistency finding, not a blanket judgement about every lesson in those files.
- Existing `docs/ANSWER_AUDIT.md` reports 774 Foundation typed questions checked, with 58 flagged for review and 6 flagged as intentionally exact-answer items. Many flagged items are open rewrites or content-word gaps with only one accepted answer. This is a known grading-trust issue, not just a theory-writing issue.
- The answer audit includes an IELTS delivery statement that paper-based Listening gives 10 minutes to transfer answers. That statement must be reviewed against current official IELTS delivery in the applicable market before release; outdated test advice is a high-priority trust risk.
- The lesson model says English study sentences and answers stay in English while explanations are bilingual. This is appropriate for Bangla-speaking learners if the Bangla explanation is natural and sufficiently deep.

## Premium-quality rubric

Each lesson will be scored from 0–4 in these dimensions:

1. Accuracy and trustworthy claims.
2. Conceptual depth: what, why, how, when, and limits.
3. Explanation clarity for the target learner.
4. Example quality and variety.
5. Visible reasoning in worked examples.
6. Misconception diagnosis and correction.
7. Practice alignment and meaningful feedback.
8. Transfer to unfamiliar contexts / IELTS use where relevant.
9. Natural Bangla-English pedagogy.
10. Mobile readability and learning rhythm.

**Release gate:** no factual/answer-key errors; Accuracy, Practice Alignment and Bilingual Clarity must each score at least 3/4; total target at least 32/40. A lesson failing the gate is revised, not released because it is long or visually polished.

## Module-by-module triage

Priority is a provisional triage based on catalogue structure, sampled content and known audit signals. “Rewrite” means inspect and improve the teaching sequence where needed—not automatically delete existing content or replace every line.

| Priority | Module | Initial audit judgement | Recommended action |
|---|---|---|---|
| P0 | IELTS introduction | Time-sensitive facts, test format and scoring must remain accurate. Existing answer-audit flags include a potentially outdated transfer-time claim. | Verify every format/scoring/delivery claim against current official sources; inspect myths, score examples and answer keys. Rewrite inaccurate/outdated items first. |
| P0 | Listening foundation | Test strategy is valuable only if aligned with current computer-delivered format and actual task rules. Answer-key precision matters. | Audit timing, instructions, word limits, distractors, spelling and exact-answer rationale; ensure explanations teach why a trap works. |
| P0 | Reading foundation | Strategy content can become generic advice unless demonstrated on a passage. | Check each strategy against short original passages; add evidence locating, paraphrase reasoning and TRUE/FALSE/NOT GIVEN distinctions; review all completion answer keys. |
| P0 | Writing foundation | High perceived-value area, but “tips” alone do not teach writing. | Add annotated before/after examples, reasoning, task-specific transfer, paragraph logic and clear rubrics for open responses. Avoid unsupported claims about guaranteed band gains. |
| P0 | Speaking foundation | Generic advice risks feeling shallow unless learners see and practise specific improvements. | Add weak/strong answer comparisons, answer development, natural phrasing, fluency vs memorisation distinctions, pronunciation guidance and self-review criteria. |
| P1 | Sentence Basics | Representative legacy structure is mostly concept → examples → IELTS → practice → recall; useful practice exists, but learning can feel like reading a rule sheet. | Rewrite teaching explanations with hook, mental model, worked reasoning, contrast sets, misconception repair and new-context transfer. Preserve useful exercise IDs. |
| P1 | Tenses | Multiple generations coexist; newer core lessons include richer problem-first steps, while older lessons remain in the combined sequence. | Map actual runtime order; consolidate duplicate explanations only after IDs/progress dependencies are understood; teach time meaning and context, not 12 tables by rote. |
| P1 | Articles | Newer problem-first lessons exist and note the difficulty for Bangla speakers. | Keep the strong learner-specific framing; deepen countability, shared knowledge, first/next mention and generic reference with contrasting examples and context. Review exceptions carefully. |
| P1 | Parts of Speech | Distributed across many files and units, including forms, IELTS and lab content. Breadth can overwhelm if word categories are taught as labels alone. | Audit unit progression; connect word function to sentence meaning, word families and common IELTS completion patterns; reduce repetitive classification without application. |
| P1 | Subject–Verb Agreement | Several lesson families cover basics, compound/indefinite/long subjects and quantity. | Teach how to find the grammatical head of a subject, diagnose distractors, and handle quantity expressions; verify every tricky example and accepted answer. |
| P1 | Prepositions | Broad topic with time/place/movement/partners/data and applied/review files. Prepositions are often context-sensitive. | Avoid presenting translations as one-to-one rules; teach common patterns/collocations, spatial/time meaning and contrastive context examples. |
| P1 | Complex Sentences | Multiple clause types and applied/review lessons. | Explain clause relationships and punctuation with sentence comparisons; show how meaning changes, not merely which linker to insert. |
| P1 | Connectors | Additive, contrast, cause, example, grammar and cohesion content exists. | Teach logic and register before memorised lists; contrast connectors that are not interchangeable and demonstrate overuse/incorrect punctuation. |
| P1 | Common Errors | Broad collection of translation, countability, plural, collocation, word-pair and naturalness issues. | Build diagnosis → reason → correction → transfer. Avoid oversimplified “Bangla speakers always…” generalisations; review examples for naturalness. |
| P2 | Punctuation & Capitalisation | Dedicated lessons plus applied/error/review files. | Prioritise meaning and readability; use before/after examples and explain comma splices, clause boundaries, apostrophes and punctuation conventions. |
| P1 | Vocabulary Foundation | A parallel vocabulary-learning path exists; exact integration and runtime source should be verified. | Audit depth beyond definitions: collocation, register, word families, context, paraphrase, retrieval and learner-produced sentences. Avoid isolated synonym lists. |

## Cross-cutting risks

### 1. Mixed generations and duplicate-looking files
Files named `*-apply.ts`, `*-final.ts`, `*-new.ts`, `*-v2.ts` and `*-core.ts` are not automatically redundant; the catalogue imports many of them intentionally. Before merging or deleting anything, build a dependency map from `index.ts` and identify which lesson IDs are active. Keep historical IDs whenever learner progress depends on them.

### 2. Answer validation and feedback trust
The 58 flagged items in `docs/ANSWER_AUDIT.md` should be handled as a separate QA queue. Open-ended rewrites need accepted variants or a rubric; IELTS listening/reading items may require exact source words. Never globally loosen grading. Each answer change must be checked against its task type and source.

### 3. Outdated IELTS facts
Any time-sensitive delivery/timing claim must be rechecked before shipping. Store review dates or source notes for volatile claims where practical. Avoid teaching a previously correct format as current fact.

### 4. “More content” is not the goal
Do not simply expand every lesson into long paragraphs. Add explanation only where it resolves a learner question, demonstrates reasoning, handles a misconception or enables transfer. Break dense explanations into readable sections and examples.

### 5. Premium feel must come from learning value
A premium lesson should leave the learner with:
- a useful mental model;
- a clear explanation of why the rule works;
- at least one worked example with reasoning;
- contrasting examples and a common-mistake repair;
- independent application in a new context;
- feedback that explains the underlying reason;
- a short retrieval prompt for later review.

Do not promise a band score, fluency, or exam result. Measure usefulness through new-item performance, return-review performance, hint use and learner feedback—not completion time alone.

## Execution plan after this audit

1. Finish lesson-level inventory: active lesson IDs, step sequence, explanation length/quality, exercise count, review status, and answer-audit flags.
2. Fix P0 factual and grading trust issues before broad copywriting.
3. Rewrite one representative lesson from a P1 module into the approved premium standard and compare it against the current live rendering.
4. Pilot a small batch of 3–5 lessons across different content types; review quality and schema fit.
5. Expand module by module, maintaining a change log and preserving IDs/progress.
6. Run answer audit, tests, type check/build, and learner review before each release batch.

## Scope and confidence

This document is the first inventory-and-triage report based on the actual catalogue, model, 68-file content directory, representative lesson files, and existing answer-audit report. It is deliberately explicit that it is **not yet a complete manual judgement of every lesson**. The next audit pass must enumerate every active lesson and map each to the criteria above before declaring Phase 1 fully complete.
