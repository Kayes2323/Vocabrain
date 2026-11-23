# Mino Answer Evaluation Engine

Every learner answer should be answered by Mino with a verdict, the reason, and the next step — the learner never
has to compare an answer with an answer key. This engine is the shared way to do that.

## Contract (`lib/mino-eval/types.ts`)

`MinoEvaluation` = `verdict` · `answerType` · `isCorrect` (true / false / null for open writing) · `confidence` ·
`strengths` · `issues` (exact quote, problem, why, fix, tag) · `explanation` · `correction` · `hint` · `nextAction` ·
`errorTags` · `latencyMs` · `source` (`objective` | `ai`).

Verdicts: `correct`, `partially_correct`, `incorrect`, `needs_revision`, `relevant_but_underdeveloped`.
`VERDICTS_BY_TYPE` says which make sense for which answer type, so open-ended writing is never forced into a bare
right/wrong. Labels (English + Bangla) are in `lib/mino-eval/labels.ts`.

## Two paths

| | Objective (`lib/mino-eval/objective.ts`) | Semantic (`lib/ai/server/evaluate`) |
|---|---|---|
| Answers | multiple choice, exact word/meaning | meaning in own words, unlisted synonym, sentence, paraphrase, idea, idea-ladder rung, paragraph, introduction, conclusion |
| Where | in the browser, instantly | `POST /api/mino/evaluate-answer` |
| AI | none | one fast-tier request, structured JSON |
| Option-specific feedback | `CheckQuestion.optionFeedback` (misconception per wrong option) | — |

## Honesty rules

* The learner's answer is untrusted data inside tags; tags are scrubbed; it never reaches the system prompt.
* Quotes are kept only if they really occur in the answer. Verdicts are clamped to the answer type.
* If the provider fails, times out or returns invalid JSON the API returns an error. **There is no local fallback
  verdict.** The UI keeps the learner's answer, shows "Mino could not finish checking this answer", and offers Retry
  (and, for vocabulary recall, an explicit, labelled "check it myself" that is not a Mino evaluation).
* Personalisation uses only real recorded mistakes (`buildLearnerContext`) and, for vocabulary, the word's real recall history.
* Skill drills never produce or store an IELTS band.

## Speed

Objective checks make no request. Short answers use the fast model tier, one request, 15 s timeout. Identical
resubmissions by the same student are served from a per-student in-memory cache (the student's UID is part of the
key). Evaluations have their own rate-limit bucket (`checkEvaluationLimit`), separate from chat and essay assessment.
The waiting state is Mino's thinking animation with honest status text — no fake progress; after 6 s it says
"Still checking".

## Where it is used

* Writing Studio: every lesson multiple-choice check (`CheckBlock`), `write-evaluate` steps, the Idea Development
  Board (each rung), and final tasks with `finalPrompt.evaluate` (Task 2 Lesson 01).
* Today's Recall (`ReviewSession`) and the Vocabulary Foundation recall step: meaning, synonym and sentence answers
  via `routeRecall` (`lib/engine/recall.ts`). An exact meaning is still graded instantly; a shared keyword is no longer
  enough to be accepted.

Not yet migrated: see the audit in the Task 2 Lesson 01 delivery report (Foundation exercise feedback, the Foundation
"use it" sentence step and full essays already have their own Mino assessments; they keep them).

## QA repair (Task 2 Lesson 01)

- **`unable_to_evaluate` verdict** (prompt `mino-eval-2`): for empty/gibberish/non-English answers or text that is an instruction to Mino rather than an attempt. Never a pass, never recorded as progress or as a mistake.
- **Introduction rubric**: any defensible stance is a valid position (agree, disagree, or a clearly stated partial view); a restated question or "this essay will discuss…" is a *missing* position; a paraphrase that changes meaning is not correct even if fluent; length and vocabulary are never rewarded by themselves.
- **Progress rules** (`lib/mino-eval/progress.ts`): a skill check *passes* on `correct` or `needs_revision`. Only a pass marks the lesson complete (never with a band) and offers Continue; partial/incorrect/underdeveloped/unable answers ask the learner to revise. Mistakes Mino finds are saved for personalisation but not repeated when the same mistake is re-checked. The guided-practice step unlocks on any real assessment, not on `unable_to_evaluate`.
- **Live check**: `GEMINI_API_KEY=… npx tsx scripts/live-eval-lesson1.ts` runs 10 controlled introductions against the real provider and prints verdict + latency (exit 2 with no key).
