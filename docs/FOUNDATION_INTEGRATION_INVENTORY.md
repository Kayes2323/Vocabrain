# Foundation integration inventory

Generated from the live catalogue (`MODULES` in `lib/foundation/content/index.ts`) on branch
`mino/foundation-content-quality-pilot`. **194 active lessons in 16 modules; 2,309 exercises at the start of
this work** (all locked in `scripts/fixtures/foundation-ids.json`; none removed or moved).

Status words:
- **integrated** — the runtime lesson object changed on this branch (diffed against `main`), using the named source.
- **unchanged** — the runtime lesson is as on `main`. It passed the automated checks and the module-level nuance /
  fact scan below, but has **not** had a manual line-by-line rewrite against the quality standard.
- **tested** — `test:foundation` (content validator incl. the v2 rules), `test:foundation-integrity`, `test:answers`
  and the module's E2E spec where one exists (column E2E).

## IELTS facts checked (2026-10-14)

| Fact | Source | Where it changed |
| --- | --- | --- |
| Paper-based IELTS ends from mid-2026; timelines vary by market; Writing on Paper in selected markets (Listening and Reading on computer) | IELTS, "Updates to IELTS test delivery", 5 March 2026 — https://ielts.org/news-and-insights/updates-to-ielts-test-delivery ; IDP copy https://ielts.idp.com/about/news-and-articles/article-updates-to-ielts-test-delivery | ib-3, ib-7, ib-8, ib-9, What is IELTS? final part C, curriculum, Mino IELTS card |
| IDP Bangladesh: paper IELTS not offered after 31 January 2026 | https://ielts.idp.com/bangladesh/about/which-test-do-i-take/paper-based-ielts | ib-3, ib-8 |
| Computer Listening: answers typed during the recording, 2 minutes to check, no transfer time | IDP "How IELTS on computer works" https://ielts.idp.com/prepare/article-how-computer-delivered-ielts-works ; British Council https://takeielts.britishcouncil.org/blog/ielts-on-paper-vs-computer-how-to-choose | ib-3, ib-9, ls-8 |
| Listening ~30 min, 4 parts, 40 questions | British Council test format https://takeielts.britishcouncil.org/take-ielts/test-format | unchanged (already correct) |
| Academic Reading 60 min incl. transfer, 3 sections, 40 questions | https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading | unchanged (already correct) |
| Writing: Task 1 ≥150 words ~20 min, Task 2 ≥250 words ~40 min, Task 2 counts twice as much | https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing | unchanged ("counts for more" is correct) |
| Speaking 11–14 min, 3 parts, Part 2: 1 min prep + up to 2 min, face to face | IDP https://ielts.idp.com/bangladesh/prepare/speaking ; IELTS Australia | unchanged (already correct) |
| Overall band: average of four; .25 rounds up to the half band, .75 to the next whole band (6.125 → 6.0) | https://ielts.org/for-test-takers/how-ielts-is-scored | unchanged (already correct) |
| Listening/Reading answers are not marked by letter case; spelling counts | Reported official guidance (British Council / IELTS guide, quoted by several prep sites; the primary page could not be fetched from this environment) — **flagged as secondary** | ls-2 no longer marks a lowercase name wrong |

Not verifiable here: `ielts.org` pages could not be fetched directly (DNS blocked in the build environment); the
facts above come from search results that quote those pages, plus IDP and British Council pages.

## Answer-key review

`docs/ANSWER_AUDIT.md` (regenerated): 59 → 54 flags needing review. Six were real and fixed (sb-8-e3, cn-7-r3, cn-9-e10,
cx-8-c3 accept a second correct order; wr-8-r2 accepts "outline"; sp-8-r2 context made exact) plus sp-6-r1's duplicate.
The other flagged Foundation items were read one by one and each has a single defensible answer in its context
(e.g. "despite" before "being", "high" with "cost of living", Listening/Reading exact words); they stay flagged by the
heuristic, which is expected.

## Lessons

| Module | Lesson | Title | Source file | Exercises | Editorial source | Integration | Tests | E2E | Notes |
| --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- |
| sentence-basics | sb-1 | What is a sentence? | sentence-basics.ts | 11 (sb-1-e1 … sb-1-y1) | Batch 01 (sb-1–3) · Batch 02 (sb-4–9), mapped by topic | integrated | tested | foundation-content 17/17 (sb-1 played, bn mobile) | Rewritten to v2: hook, corrected rule (commands, fragments), worked examples, mistake lab, recall, Mino task; concept sb-complete |
| sentence-basics | sb-2 | The subject | sentence-basics.ts | 10 (sb-2-e1 … sb-2-y1) | Batch 01 (sb-1–3) · Batch 02 (sb-4–9), mapped by topic | integrated | tested | foundation-content 17/17 (sb-1 played, bn mobile) | v2: nearest-noun hook, head-word method, mistake lab, recall, Mino task; concept sb-subject; "Never drop the subject" corrected |
| sentence-basics | sb-3 | The verb | sentence-basics.ts | 10 (sb-3-e1 … sb-3-y1) | Batch 01 (sb-1–3) · Batch 02 (sb-4–9), mapped by topic | integrated | tested | foundation-content 17/17 (sb-1 played, bn mobile) | v2: verb hook, modal + base verb, mistake lab, recall, Mino task; concept sb-verb |
| sentence-basics | sb-4 | The object | sentence-basics.ts | 9 (sb-4-e1 … sb-4-y1) | Batch 01 (sb-1–3) · Batch 02 (sb-4–9), mapped by topic | integrated | tested | foundation-content 17/17 (sb-1 played, bn mobile) | v2: subject/object swap hook, complements, two objects, mistake lab, recall, Mino task; concept sb-object |
| sentence-basics | sb-5 | Basic sentence structure | sentence-basics.ts | 8 (sb-5-e1 … sb-5-y1) | Batch 01 (sb-1–3) · Batch 02 (sb-4–9), mapped by topic | integrated | tested | foundation-content 17/17 (sb-1 played, bn mobile) | v2: word order as a pattern (not a fixed rule), hook, mistake lab, recall, Mino task; concept sb-order |
| sentence-basics | sb-6 | Simple sentences | sentence-basics.ts | 9 (sb-6-e1 … sb-6-y1) | Batch 01 (sb-1–3) · Batch 02 (sb-4–9), mapped by topic | integrated | tested | foundation-content 17/17 (sb-1 played, bn mobile) | v2: phrase vs clause, hook, mistake lab, recall, Mino task; concept sb-simple |
| sentence-basics | sb-7 | Compound sentences | sentence-basics.ts | 9 (sb-7-e1 … sb-7-y1) | Batch 01 (sb-1–3) · Batch 02 (sb-4–9), mapped by topic | integrated | tested | foundation-content 17/17 (sb-1 played, bn mobile) | v2: comma splice / run-on, hook, mistake lab, recall, Mino task; concept sb-compound |
| sentence-basics | sb-8 | Complex sentences: a first look | sentence-basics.ts | 8 (sb-8-e1 … sb-8-y1) | Batch 01 (sb-1–3) · Batch 02 (sb-4–9), mapped by topic | integrated | tested | foundation-content 17/17 (sb-1 played, bn mobile) | v2: one joining word, dependent clauses, mistake lab, recall, Mino task; concept sb-complex-intro |
| sentence-basics | sb-9 | Sentence practice: IELTS mix | sentence-basics.ts | 10 (sb-9-e1 … sb-9-y1) | Batch 01 (sb-1–3) · Batch 02 (sb-4–9), mapped by topic | integrated | tested | foundation-content 17/17 (sb-1 played, bn mobile) | v2: five-check routine, worked repair, mistake lab, recall, Mino task |
| sentence-basics | sb-10 | Statements, negatives and questions | sentence-questions.ts | 13 (sb-10-p1 … sb-10-y1) | Batch 01 (sb-1–3) · Batch 02 (sb-4–9), mapped by topic | unchanged | tested | foundation-content 17/17 (sb-1 played, bn mobile) |  |
| tenses | t-1 | Understanding Time | tenses-v2.ts | 11 (t-1-p1 … t-1-y1) | Batch 03 (t-3–t-8) | unchanged | tested | tenses 45/45; foundation-content 17/17 (t-6 played) |  |
| tenses | t-2 | Present Simple | tenses-v2.ts | 11 (t-2-p1 … t-2-y1) | Batch 03 (t-3–t-8) | unchanged | tested | tenses 45/45; foundation-content 17/17 (t-6 played) |  |
| tenses | t-3 | Present Continuous | tenses-core.ts | 13 (t-3-e1 … t-3-e5) | Batch 03 (t-3–t-8) | integrated | tested | tenses 45/45; foundation-content 17/17 (t-6 played) | State verbs with another meaning; Task 1 past data vs trends |
| tenses | t-4 | Past Simple | tenses-core.ts | 12 (t-4-e1 … t-4-e6) | Batch 03 (t-3–t-8) | integrated | tested | tenses 45/45; foundation-content 17/17 (t-6 played) | be without did |
| tenses | t-5 | Past Continuous | tenses-core.ts | 11 (t-5-e1 … t-5-e5) | Batch 03 (t-3–t-8) | integrated | tested | tenses 45/45; foundation-content 17/17 (t-6 played) | Not always an interruption; overlapping actions |
| tenses | t-6 | Present Perfect | tenses-core.ts | 12 (t-6-e1 … t-6-e6) | Batch 03 (t-3–t-8) | integrated | tested | tenses 45/45; foundation-content 17/17 (t-6 played) | has lived / lived contrast |
| tenses | t-13 | Present Perfect Continuous | tenses-new.ts | 11 (t-13-p1 … t-13-y1) | Batch 03 (t-3–t-8) | unchanged | tested | tenses 45/45; foundation-content 17/17 (t-6 played) |  |
| tenses | t-7 | Past Perfect | tenses-core.ts | 11 (t-7-e1 … t-7-e5) | Batch 03 (t-3–t-8) | integrated | tested | tenses 45/45; foundation-content 17/17 (t-6 played) | Past perfect not compulsory; had = possession |
| tenses | t-8 | Future forms | tenses-core.ts | 11 (t-8-e1 … t-8-e5) | Batch 03 (t-3–t-8) | integrated | tested | tenses 45/45; foundation-content 17/17 (t-6 played) | Timetable present simple; will vs going to is not a fixed rule |
| tenses | t-14 | Tense Comparisons | tenses-new.ts | 14 (t-14-p1 … t-14-y1) | Batch 03 (t-3–t-8) | unchanged | tested | tenses 45/45; foundation-content 17/17 (t-6 played) |  |
| tenses | t-9 | Common tense mistakes | tenses-apply.ts | 13 (t-9-e5 … t-9-y1) | Batch 03 (t-3–t-8) | unchanged | tested | tenses 45/45; foundation-content 17/17 (t-6 played) |  |
| tenses | t-10 | Tenses in IELTS Writing | tenses-apply.ts | 12 (t-10-e1 … t-10-e5) | Batch 03 (t-3–t-8) | unchanged | tested | tenses 45/45; foundation-content 17/17 (t-6 played) |  |
| tenses | t-11 | Tenses in IELTS Speaking | tenses-apply.ts | 11 (t-11-e1 … t-11-e5) | Batch 03 (t-3–t-8) | integrated | tested | tenses 45/45; foundation-content 17/17 (t-6 played) | Respectful Bangla (আপনি) |
| tenses | t-15 | Mixed Practice | tenses-new.ts | 15 (t-15-p1 … t-15-y1) | Batch 03 (t-3–t-8) | unchanged | tested | tenses 45/45; foundation-content 17/17 (t-6 played) |  |
| tenses | t-12 | Tenses review test | tenses-2.ts | 12 (t-12-e1 … t-12-e12) | Batch 03 (t-3–t-8) | unchanged | tested | tenses 45/45; foundation-content 17/17 (t-6 played) |  |
| parts-of-speech | po-1 | What are Parts of Speech? | pos-overview.ts | 5 (po-1-p1 … po-1-p5) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pn-1 | What is a noun? | pos-noun.ts | 11 (pn-1-p1 … pn-1-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pn-2 | Countable or uncountable? | pos-noun.ts | 11 (pn-2-p1 … pn-2-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pn-3 | Noun mistakes to stop making | pos-noun.ts | 11 (pn-3-p1 … pn-3-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pn-4 | Nouns in IELTS | pos-noun.ts | 11 (pn-4-p1 … pn-4-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pvb-1 | What is a verb? | pos-verb.ts | 11 (pvb-1-p1 … pvb-1-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pvb-2 | Main and helping verbs | pos-verb.ts | 11 (pvb-2-p1 … pvb-2-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pvb-3 | Verb forms | pos-verb.ts | 11 (pvb-3-p1 … pvb-3-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pvb-4 | Common verb mistakes | pos-verb.ts | 11 (pvb-4-p1 … pvb-4-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pvb-5 | Verbs in IELTS | pos-verb.ts | 11 (pvb-5-p1 … pvb-5-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pa-1 | What is an adjective? | pos-adjective.ts | 11 (pa-1-p1 … pa-1-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pa-2 | Comparing things | pos-adjective.ts | 11 (pa-2-p1 … pa-2-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pa-3 | -ed or -ing? | pos-adjective.ts | 11 (pa-3-p1 … pa-3-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pa-4 | Adjectives in IELTS | pos-adjective.ts | 11 (pa-4-p1 … pa-4-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pv-1 | What is an adverb? | pos-adverb.ts | 11 (pv-1-p1 … pv-1-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pv-2 | Adjective or adverb? | pos-adverb.ts | 13 (pv-2-p1 … pv-2-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pv-3 | Where adverbs go | pos-adverb.ts | 11 (pv-3-p1 … pv-3-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pv-4 | Adverbs in IELTS | pos-adverb.ts | 11 (pv-4-p1 … pv-4-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pf-1 | The gap tells you the form | pos-forms.ts | 11 (pf-1-p1 … pf-1-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pf-2 | Endings that show the job | pos-forms.ts | 11 (pf-2-p1 … pf-2-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pf-3 | Word families | pos-forms.ts | 11 (pf-3-p1 … pf-3-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pf-4 | Opposites with prefixes | pos-forms.ts | 11 (pf-4-p1 … pf-4-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pf-5 | Word forms in IELTS | pos-forms.ts | 11 (pf-5-p1 … pf-5-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | ppr-1 | What pronouns do | pos-pronoun.ts | 11 (ppr-1-p1 … ppr-1-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | ppr-2 | Possessives and -self | pos-pronoun.ts | 11 (ppr-2-p1 … ppr-2-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | ppr-3 | What does "it" refer to? | pos-pronoun.ts | 11 (ppr-3-p1 … ppr-3-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | ppp-1 | What prepositions do | pos-preposition.ts | 11 (ppp-1-p1 … ppp-1-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | ppp-2 | Words that need a partner | pos-preposition.ts | 11 (ppp-2-p1 … ppp-2-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | ppp-3 | Prepositions for data | pos-preposition.ts | 11 (ppp-3-p1 … ppp-3-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pcj-1 | Joining words | pos-conjunction.ts | 11 (pcj-1-p1 … pcj-1-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pcj-2 | because, although, while, if | pos-conjunction.ts | 11 (pcj-2-p1 … pcj-2-w1) | Batch 07 | integrated | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) | Respectful Bangla (আপনি) |
| parts-of-speech | pcj-3 | although, however, despite | pos-conjunction.ts | 11 (pcj-3-p1 … pcj-3-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pij-1 | Oh, well, wow | pos-interjection.ts | 11 (pij-1-p1 … pij-1-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pie-1 | Reading: understand words you don’t know | pos-ielts-a.ts | 11 (pie-1-p1 … pie-1-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pie-2 | Reading: predict the gap | pos-ielts-a.ts | 11 (pie-2-p1 … pie-2-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pie-3 | Listening: predict the answer | pos-ielts-a.ts | 11 (pie-3-p1 … pie-3-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pie-4 | Writing: the word that breaks the sentence | pos-ielts-a.ts | 11 (pie-4-p1 … pie-4-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pie-5 | Building an academic sentence | pos-ielts-a.ts | 11 (pie-5-p1 … pie-5-w1) | Batch 07 | integrated | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) | No "Band 6+" label |
| parts-of-speech | pie-6 | Speaking: upgrade your answer | pos-ielts-b.ts | 11 (pie-6-p1 … pie-6-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pie-7 | Word-form clues: one word, four jobs | pos-ielts-b.ts | 11 (pie-7-p1 … pie-7-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pie-8 | Grammar + vocabulary: words that go together | pos-ielts-b.ts | 11 (pie-8-p1 … pie-8-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pie-9 | IELTS application challenge | pos-ielts-b.ts | 11 (pie-9-p1 … pie-9-w1) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pl-1 | Noun mistakes | pos-lab.ts | 9 (pl-1-s1 … pl-1-r3) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pl-2 | Verb mistakes | pos-lab.ts | 9 (pl-2-s1 … pl-2-r3) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pl-3 | Pronoun mistakes | pos-lab.ts | 9 (pl-3-s1 … pl-3-r3) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pl-4 | Adjective or adverb? | pos-lab.ts | 9 (pl-4-s1 … pl-4-r3) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pl-5 | Preposition mistakes | pos-lab.ts | 9 (pl-5-s1 … pl-5-r3) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pl-6 | Conjunction mistakes | pos-lab.ts | 9 (pl-6-s1 … pl-6-r3) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pl-7 | Word-form mistakes | pos-lab.ts | 9 (pl-7-s1 … pl-7-r3) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| parts-of-speech | pl-8 | Subject–verb mistakes | pos-lab.ts | 9 (pl-8-s1 … pl-8-r3) | Batch 07 | unchanged | tested | covered by curriculum/teaching/home E2E (no dedicated module spec) |  |
| articles | ar-1 | a or an? Listen to the sound | articles.ts | 13 (ar-1-p1 … ar-1-y1) | Batch 04 (ar-1–4) | unchanged | tested | articles 36/36 |  |
| articles | ar-2 | a / an: one of many | articles.ts | 13 (ar-2-p1 … ar-2-y1) | Batch 04 (ar-1–4) | unchanged | tested | articles 36/36 |  |
| articles | ar-3 | the: the one we both know | articles.ts | 13 (ar-3-p1 … ar-3-y1) | Batch 04 (ar-1–4) | integrated | tested | articles 36/36 | Shared context makes a first mention "the" |
| articles | ar-4 | No article: talking in general | articles.ts | 13 (ar-4-p1 … ar-4-y1) | Batch 04 (ar-1–4) | unchanged | tested | articles 36/36 |  |
| articles | ar-5 | a, the or nothing? Choose by meaning | articles-apply.ts | 13 (ar-5-p1 … ar-5-y1) | Batch 04 (ar-1–4) | unchanged | tested | articles 36/36 |  |
| articles | ar-6 | Article mistakes Bangla speakers make | articles-apply.ts | 13 (ar-6-p1 … ar-6-y1) | Batch 04 (ar-1–4) | integrated | tested | articles 36/36 | Respectful Bangla (আপনি) |
| articles | ar-7 | Articles in IELTS Writing and Speaking | articles-apply.ts | 13 (ar-7-p1 … ar-7-y1) | Batch 04 (ar-1–4) | integrated | tested | articles 36/36 | No "Band 7" label |
| articles | ar-8 | Mixed practice: no hints | articles-apply.ts | 13 (ar-8-p1 … ar-8-y1) | Batch 04 (ar-1–4) | unchanged | tested | articles 36/36 |  |
| articles | ar-9 | Articles review test | articles-apply.ts | 12 (ar-9-e1 … ar-9-e12) | Batch 04 (ar-1–4) | unchanged | tested | articles 36/36 |  |
| agreement | sva-1 | One or more? The -s on the verb | agreement.ts | 14 (sva-1-p1 … sva-1-y1) | Batch 05 | unchanged | tested | agreement 48/48 |  |
| agreement | sva-2 | Two subjects: and, or, nor | agreement.ts | 13 (sva-2-p1 … sva-2-y1) | Batch 05 | integrated | tested | agreement 48/48 | Rewrite awkward either/or with a modal |
| agreement | sva-3 | everyone, each, every and group nouns | agreement.ts | 13 (sva-3-p1 … sva-3-y1) | Batch 05 | unchanged | tested | agreement 48/48 |  |
| agreement | sva-4 | Long subjects: find the real subject | agreement.ts | 13 (sva-4-p1 … sva-4-y1) | Batch 05 | integrated | tested | agreement 48/48 | No "Band 6+" label |
| agreement | sva-5 | Amounts and numbers | agreement.ts | 13 (sva-5-p1 … sva-5-y1) | Batch 05 | unchanged | tested | agreement 48/48 |  |
| agreement | sva-6 | Agreement mistakes Bangla speakers make | agreement-apply.ts | 13 (sva-6-p1 … sva-6-y1) | Batch 05 | unchanged | tested | agreement 48/48 |  |
| agreement | sva-7 | Agreement in IELTS Writing and Speaking | agreement-apply.ts | 13 (sva-7-p1 … sva-7-y1) | Batch 05 | unchanged | tested | agreement 48/48 |  |
| agreement | sva-8 | Mixed practice: find and fix | agreement-apply.ts | 13 (sva-8-p1 … sva-8-y1) | Batch 05 | unchanged | tested | agreement 48/48 |  |
| agreement | sva-9 | Subject–verb agreement review test | agreement-apply.ts | 12 (sva-9-e1 … sva-9-e12) | Batch 05 | unchanged | tested | agreement 48/48 |  |
| prepositions | pr-1 | Time: in, on or at? | prepositions.ts | 13 (pr-1-p1 … pr-1-y1) | Batch 06 | unchanged | tested | prepositions 48/48 |  |
| prepositions | pr-2 | Time spans: for, since, during, by, until | prepositions.ts | 13 (pr-2-p1 … pr-2-y1) | Batch 06 | unchanged | tested | prepositions 48/48 |  |
| prepositions | pr-3 | Place: in, on or at? | prepositions.ts | 13 (pr-3-p1 … pr-3-y1) | Batch 06 | unchanged | tested | prepositions 48/48 |  |
| prepositions | pr-4 | Movement: to, into, through, across | prepositions.ts | 13 (pr-4-p1 … pr-4-y1) | Batch 06 | unchanged | tested | prepositions 48/48 |  |
| prepositions | pr-5 | Word partners: depend on, interested in | prepositions.ts | 13 (pr-5-p1 … pr-5-y1) | Batch 06 | integrated | tested | prepositions 48/48 | Partners are not "always" one rule; some change meaning |
| prepositions | pr-6 | Prepositions for data: by, to, at, from … to | prepositions.ts | 13 (pr-6-p1 … pr-6-y1) | Batch 06 | unchanged | tested | prepositions 48/48 |  |
| prepositions | pr-7 | Preposition mistakes Bangla speakers make | prepositions-apply.ts | 13 (pr-7-p1 … pr-7-y1) | Batch 06 | unchanged | tested | prepositions 48/48 |  |
| prepositions | pr-8 | Prepositions in IELTS Writing and Speaking | prepositions-apply.ts | 13 (pr-8-p1 … pr-8-y1) | Batch 06 | unchanged | tested | prepositions 48/48 |  |
| prepositions | pr-9 | Prepositions review test | prepositions-apply.ts | 12 (pr-9-e1 … pr-9-e12) | Batch 06 | unchanged | tested | prepositions 48/48 |  |
| connectors | cn-1 | Adding ideas: also, in addition, moreover | connectors.ts | 13 (cn-1-p1 … cn-1-y1) | Batch 06 | unchanged | tested | connectors 48/48 |  |
| connectors | cn-2 | Contrast: however, although, whereas, despite | connectors.ts | 13 (cn-2-p1 … cn-2-y1) | Batch 06 | unchanged | tested | connectors 48/48 |  |
| connectors | cn-3 | Cause and result: because, due to, therefore | connectors.ts | 13 (cn-3-p1 … cn-3-y1) | Batch 06 | unchanged | tested | connectors 48/48 |  |
| connectors | cn-4 | Examples, order and conclusions | connectors.ts | 13 (cn-4-p1 … cn-4-y1) | Batch 06 | unchanged | tested | connectors 48/48 |  |
| connectors | cn-5 | Position and punctuation of connectors | connectors.ts | 13 (cn-5-p1 … cn-5-y1) | Batch 06 | unchanged | tested | connectors 48/48 |  |
| connectors | cn-6 | Natural linking: this, which, fewer connectors | connectors.ts | 13 (cn-6-p1 … cn-6-y1) | Batch 06 | integrated | tested | connectors 48/48 | No unsupported "Band 7" claim |
| connectors | cn-7 | Linking mistakes Bangla speakers make | connectors-apply.ts | 13 (cn-7-p1 … cn-7-y1) | Batch 06 | integrated | tested | connectors 48/48 | cn-7-r3 accepts the Because-first order |
| connectors | cn-8 | Connectors in IELTS Writing and Speaking | connectors-apply.ts | 13 (cn-8-p1 … cn-8-y1) | Batch 06 | unchanged | tested | connectors 48/48 |  |
| connectors | cn-9 | Connectors review test | connectors-apply.ts | 12 (cn-9-e1 … cn-9-e12) | Batch 06 | integrated | tested | connectors 48/48 | cn-9-e10 accepts the Because-first order |
| complex-sentences | cx-1 | Clauses: complete sentences, fragments and run-ons | complex.ts | 13 (cx-1-p1 … cx-1-y1) | Batch 07 | unchanged | tested | complex 48/48 |  |
| complex-sentences | cx-2 | Reason, contrast and purpose clauses | complex.ts | 13 (cx-2-p1 … cx-2-y1) | Batch 07 | unchanged | tested | complex 48/48 |  |
| complex-sentences | cx-3 | Time and condition clauses | complex.ts | 13 (cx-3-p1 … cx-3-y1) | Batch 07 | unchanged | tested | complex 48/48 |  |
| complex-sentences | cx-4 | Relative clauses: who, which, that, whose, where | complex.ts | 13 (cx-4-p1 … cx-4-y1) | Batch 07 | unchanged | tested | complex 48/48 |  |
| complex-sentences | cx-5 | Relative clauses with and without commas | complex.ts | 13 (cx-5-p1 … cx-5-y1) | Batch 07 | unchanged | tested | complex 48/48 |  |
| complex-sentences | cx-6 | Noun clauses and indirect questions | complex.ts | 13 (cx-6-p1 … cx-6-y1) | Batch 07 | unchanged | tested | complex 48/48 |  |
| complex-sentences | cx-7 | Complex-sentence mistakes Bangla speakers make | complex-apply.ts | 13 (cx-7-p1 … cx-7-y1) | Batch 07 | unchanged | tested | complex 48/48 |  |
| complex-sentences | cx-8 | Combining sentences for IELTS | complex-apply.ts | 13 (cx-8-p1 … cx-8-y1) | Batch 07 | integrated | tested | complex 48/48 | cx-8-c3 accepts the other non-defining order |
| complex-sentences | cx-9 | Complex sentences review test | complex-apply.ts | 12 (cx-9-e1 … cx-9-e12) | Batch 07 | unchanged | tested | complex 48/48 |  |
| punctuation | pu-1 | Capital letters | punctuation.ts | 13 (pu-1-p1 … pu-1-y1) | Batch 07 | unchanged | tested | punctuation 48/48 |  |
| punctuation | pu-2 | Full stops and question marks | punctuation.ts | 13 (pu-2-p1 … pu-2-y1) | Batch 07 | unchanged | tested | punctuation 48/48 |  |
| punctuation | pu-3 | Commas that help: lists, openings, joining | punctuation.ts | 13 (pu-3-p1 … pu-3-y1) | Batch 07 | unchanged | tested | punctuation 48/48 |  |
| punctuation | pu-4 | Commas that break: splices and misplaced commas | punctuation.ts | 13 (pu-4-p1 … pu-4-y1) | Batch 07 | unchanged | tested | punctuation 48/48 |  |
| punctuation | pu-5 | Apostrophes: possession and contractions | punctuation.ts | 13 (pu-5-p1 … pu-5-y1) | Batch 07 | unchanged | tested | punctuation 48/48 |  |
| punctuation | pu-6 | Colons, semicolons and paragraphs | punctuation.ts | 13 (pu-6-p1 … pu-6-y1) | Batch 07 | unchanged | tested | punctuation 48/48 |  |
| punctuation | pu-7 | Punctuation mistakes Bangla speakers make | punctuation-apply.ts | 13 (pu-7-p1 … pu-7-y1) | Batch 07 | unchanged | tested | punctuation 48/48 |  |
| punctuation | pu-8 | Proofreading your IELTS writing | punctuation-apply.ts | 13 (pu-8-p1 … pu-8-y1) | Batch 07 | unchanged | tested | punctuation 48/48 |  |
| punctuation | pu-9 | Punctuation review test | punctuation-apply.ts | 12 (pu-9-e1 … pu-9-e12) | Batch 07 | unchanged | tested | punctuation 48/48 |  |
| common-errors | ce-1 | Direct translation from Bangla | common-errors.ts | 13 (ce-1-p1 … ce-1-y1) | Batch 07 | unchanged | tested | common-errors 48/48 |  |
| common-errors | ce-2 | Uncountable nouns | common-errors.ts | 13 (ce-2-p1 … ce-2-y1) | Batch 07 | unchanged | tested | common-errors 48/48 |  |
| common-errors | ce-3 | Singular and plural after numbers and quantifiers | common-errors.ts | 13 (ce-3-p1 … ce-3-y1) | Batch 07 | unchanged | tested | common-errors 48/48 |  |
| common-errors | ce-4 | Collocations: make, do, take, have | common-errors.ts | 13 (ce-4-p1 … ce-4-y1) | Batch 07 | unchanged | tested | common-errors 48/48 |  |
| common-errors | ce-5 | Confusing word pairs | common-errors.ts | 13 (ce-5-p1 … ce-5-y1) | Batch 07 | unchanged | tested | common-errors 48/48 |  |
| common-errors | ce-6 | Repetition and natural phrasing | common-errors.ts | 13 (ce-6-p1 … ce-6-y1) | Batch 07 | unchanged | tested | common-errors 48/48 |  |
| common-errors | ce-7 | Translation habits Bangla speakers bring | common-errors-apply.ts | 14 (ce-7-p1 … ce-7-y1) | Batch 07 | unchanged | tested | common-errors 48/48 |  |
| common-errors | ce-8 | Fixing common errors in IELTS Writing and Speaking | common-errors-apply.ts | 14 (ce-8-p1 … ce-8-y1) | Batch 07 | unchanged | tested | common-errors 48/48 |  |
| common-errors | ce-9 | Common errors review test | common-errors-apply.ts | 12 (ce-9-e1 … ce-9-e12) | Batch 07 | unchanged | tested | common-errors 48/48 |  |
| vocabulary-foundation | vc-1 | Knowing a word: meaning, form and pattern | vocabulary.ts | 13 (vc-1-p1 … vc-1-y1) | Batch 08 | unchanged | tested | vocabulary 50/50; foundation-content 17/17 (vc-1 played) |  |
| vocabulary-foundation | vc-2 | Guessing meaning from context | vocabulary.ts | 13 (vc-2-p1 … vc-2-y1) | Batch 08 | unchanged | tested | vocabulary 50/50; foundation-content 17/17 (vc-1 played) |  |
| vocabulary-foundation | vc-3 | Synonyms and paraphrasing | vocabulary.ts | 13 (vc-3-p1 … vc-3-y1) | Batch 08 | unchanged | tested | vocabulary 50/50; foundation-content 17/17 (vc-1 played) |  |
| vocabulary-foundation | vc-4 | Formal and informal words | vocabulary.ts | 13 (vc-4-p1 … vc-4-y1) | Batch 08 | unchanged | tested | vocabulary 50/50; foundation-content 17/17 (vc-1 played) |  |
| vocabulary-foundation | vc-5 | Precise words instead of general ones | vocabulary.ts | 13 (vc-5-p1 … vc-5-y1) | Batch 08 | unchanged | tested | vocabulary 50/50; foundation-content 17/17 (vc-1 played) |  |
| vocabulary-foundation | vc-6 | Using new words accurately | vocabulary.ts | 13 (vc-6-p1 … vc-6-y1) | Batch 08 | unchanged | tested | vocabulary 50/50; foundation-content 17/17 (vc-1 played) |  |
| vocabulary-foundation | vc-7 | Vocabulary habits Bangla speakers bring | vocabulary-apply.ts | 14 (vc-7-p1 … vc-7-y1) | Batch 08 | unchanged | tested | vocabulary 50/50; foundation-content 17/17 (vc-1 played) |  |
| vocabulary-foundation | vc-8 | Vocabulary in IELTS Writing and Speaking | vocabulary-apply.ts | 14 (vc-8-p1 … vc-8-y1) | Batch 08 | unchanged | tested | vocabulary 50/50; foundation-content 17/17 (vc-1 played) |  |
| vocabulary-foundation | vc-9 | Vocabulary review test | vocabulary-apply.ts | 12 (vc-9-e1 … vc-9-e12) | Batch 08 | unchanged | tested | vocabulary 50/50; foundation-content 17/17 (vc-1 played) |  |
| ielts-intro | ib-10 | What is IELTS? | ielts-start.ts | 13 (ib-10-p1 … ib-10-y1) | Batch 10 + official facts | unchanged | tested | ielts-intro 48/48; foundation-content 17/17 (ib-3 played, desktop) |  |
| ielts-intro | ib-11 | Why do you need IELTS? | ielts-start.ts | 11 (ib-11-p1 … ib-11-y1) | Batch 10 + official facts | unchanged | tested | ielts-intro 48/48; foundation-content 17/17 (ib-3 played, desktop) |  |
| ielts-intro | ib-1 | Academic IELTS: the test for university study | ielts-intro.ts | 13 (ib-1-p1 … ib-1-y1) | Batch 10 + official facts | unchanged | tested | ielts-intro 48/48; foundation-content 17/17 (ib-3 played, desktop) |  |
| ielts-intro | ib-2 | The four skills and test timing | ielts-intro.ts | 13 (ib-2-p1 … ib-2-y1) | Batch 10 + official facts | unchanged | tested | ielts-intro 48/48; foundation-content 17/17 (ib-3 played, desktop) |  |
| ielts-intro | ib-3 | IELTS on computer: how you answer | ielts-intro.ts | 13 (ib-3-p1 … ib-3-y1) | Batch 10 + official facts | integrated | tested | ielts-intro 48/48; foundation-content 17/17 (ib-3 played, desktop) | IELTS on computer: paper ends mid-2026 (Bangladesh: after 31 Jan 2026), Writing on Paper, 2-min Listening check; ib-3-p3/-p4/-c2 now ask current facts |
| ielts-intro | ib-4 | Band Scores and the overall score | ielts-intro.ts | 13 (ib-4-p1 … ib-4-y1) | Batch 10 + official facts | unchanged | tested | ielts-intro 48/48; foundation-content 17/17 (ib-3 played, desktop) |  |
| ielts-intro | ib-5 | How each skill is marked | ielts-intro.ts | 13 (ib-5-p1 … ib-5-y1) | Batch 10 + official facts | unchanged | tested | ielts-intro 48/48; foundation-content 17/17 (ib-3 played, desktop) |  |
| ielts-intro | ib-6 | Targets and official requirements | ielts-intro.ts | 13 (ib-6-p1 … ib-6-y1) | Batch 10 + official facts | unchanged | tested | ielts-intro 48/48; foundation-content 17/17 (ib-3 played, desktop) |  |
| ielts-intro | ib-7 | IELTS myths and facts | ielts-intro-apply.ts | 14 (ib-7-p1 … ib-7-y1) | Batch 10 + official facts | integrated | tested | ielts-intro 48/48; foundation-content 17/17 (ib-3 played, desktop) | Delivery point updated |
| ielts-intro | ib-8 | Your IELTS plan | ielts-intro-apply.ts | 14 (ib-8-p1 … ib-8-y1) | Batch 10 + official facts | integrated | tested | ielts-intro 48/48; foundation-content 17/17 (ib-3 played, desktop) | ib-8-p5 + model/task no longer choose paper |
| ielts-intro | ib-9 | What is IELTS? review test | ielts-intro-apply.ts | 12 (ib-9-e1 … ib-9-e12) | Batch 10 + official facts | integrated | tested | ielts-intro 48/48; foundation-content 17/17 (ib-3 played, desktop) | ib-9-e10 asks the computer check time |
| listening-foundation | ls-1 | How IELTS Listening works | listening.ts | 13 (ls-1-p1 … ls-1-y1) | Batch 10 + official facts | unchanged | tested | listening 48/48 |  |
| listening-foundation | ls-2 | Part 1: forms, spelling and numbers | listening.ts | 13 (ls-2-p1 … ls-2-y1) | Batch 10 + official facts | integrated | tested | listening 48/48 | Letter case does not change the mark; ls-2-p5 options |
| listening-foundation | ls-3 | Part 2: monologues, maps and plans | listening.ts | 13 (ls-3-p1 … ls-3-y1) | Batch 10 + official facts | unchanged | tested | listening 48/48 |  |
| listening-foundation | ls-4 | Part 3: academic discussions | listening.ts | 13 (ls-4-p1 … ls-4-y1) | Batch 10 + official facts | unchanged | tested | listening 48/48 |  |
| listening-foundation | ls-5 | Part 4: lectures and note completion | listening.ts | 13 (ls-5-p1 … ls-5-y1) | Batch 10 + official facts | unchanged | tested | listening 48/48 |  |
| listening-foundation | ls-6 | Question types and answer rules | listening.ts | 13 (ls-6-p1 … ls-6-y1) | Batch 10 + official facts | unchanged | tested | listening 48/48 |  |
| listening-foundation | ls-7 | Listening traps and how to avoid them | listening-apply.ts | 14 (ls-7-p1 … ls-7-y1) | Batch 10 + official facts | unchanged | tested | listening 48/48 |  |
| listening-foundation | ls-8 | A strategy for the whole Listening test | listening-apply.ts | 14 (ls-8-p1 … ls-8-y1) | Batch 10 + official facts | integrated | tested | listening 48/48 | ls-8-p5 asks the computer check time; IELTS use + Mino task facts |
| listening-foundation | ls-9 | Listening review test | listening-apply.ts | 12 (ls-9-e1 … ls-9-e12) | Batch 10 + official facts | unchanged | tested | listening 48/48 |  |
| reading-foundation | rd-1 | Skimming and scanning | reading.ts | 13 (rd-1-p1 … rd-1-y1) | Batch 09 + official facts | unchanged | tested | reading 48/48 |  |
| reading-foundation | rd-2 | Keywords and paraphrasing | reading.ts | 13 (rd-2-p1 … rd-2-y1) | Batch 09 + official facts | unchanged | tested | reading 48/48 |  |
| reading-foundation | rd-3 | True / False / Not Given | reading.ts | 13 (rd-3-p1 … rd-3-y1) | Batch 09 + official facts | unchanged | tested | reading 48/48 |  |
| reading-foundation | rd-4 | Matching Headings | reading.ts | 13 (rd-4-p1 … rd-4-y1) | Batch 09 + official facts | unchanged | tested | reading 48/48 |  |
| reading-foundation | rd-5 | Multiple choice and matching | reading.ts | 13 (rd-5-p1 … rd-5-y1) | Batch 09 + official facts | unchanged | tested | reading 48/48 |  |
| reading-foundation | rd-6 | Completion tasks and time management | reading.ts | 13 (rd-6-p1 … rd-6-y1) | Batch 09 + official facts | unchanged | tested | reading 48/48 |  |
| reading-foundation | rd-7 | Reading traps and how to avoid them | reading-apply.ts | 14 (rd-7-p1 … rd-7-y1) | Batch 09 + official facts | unchanged | tested | reading 48/48 |  |
| reading-foundation | rd-8 | A strategy for a whole passage | reading-apply.ts | 14 (rd-8-p1 … rd-8-y1) | Batch 09 + official facts | integrated | tested | reading 48/48 | Paper-only wording removed (rd-8-p3) |
| reading-foundation | rd-9 | Reading review test | reading-apply.ts | 12 (rd-9-e1 … rd-9-e12) | Batch 09 + official facts | unchanged | tested | reading 48/48 |  |
| writing-foundation | wr-1 | How Writing works and is marked | writing.ts | 13 (wr-1-p1 … wr-1-y1) | Batch 09 + official facts | unchanged | tested | writing 48/48 |  |
| writing-foundation | wr-2 | Task 1: introduction and overview | writing.ts | 13 (wr-2-p1 … wr-2-y1) | Batch 09 + official facts | unchanged | tested | writing 48/48 |  |
| writing-foundation | wr-3 | Task 1: describing and comparing data | writing.ts | 13 (wr-3-p1 … wr-3-y1) | Batch 09 + official facts | unchanged | tested | writing 48/48 |  |
| writing-foundation | wr-4 | Task 2: understanding the question | writing.ts | 13 (wr-4-p1 … wr-4-y1) | Batch 09 + official facts | unchanged | tested | writing 48/48 |  |
| writing-foundation | wr-5 | Task 2: paragraphs that develop ideas | writing.ts | 13 (wr-5-p1 … wr-5-y1) | Batch 09 + official facts | unchanged | tested | writing 48/48 |  |
| writing-foundation | wr-6 | Coherence, cohesion and word choice | writing.ts | 13 (wr-6-p1 … wr-6-y1) | Batch 09 + official facts | unchanged | tested | writing 48/48 |  |
| writing-foundation | wr-7 | Writing traps and how to avoid them | writing-apply.ts | 14 (wr-7-p1 … wr-7-y1) | Batch 09 + official facts | unchanged | tested | writing 48/48 |  |
| writing-foundation | wr-8 | A plan for the whole hour | writing-apply.ts | 13 (wr-8-p1 … wr-8-y1) | Batch 09 + official facts | integrated | tested | writing 48/48 | wr-8-r2 accepts "outline" |
| writing-foundation | wr-9 | Writing review test | writing-apply.ts | 12 (wr-9-e1 … wr-9-e12) | Batch 09 + official facts | unchanged | tested | writing 48/48 |  |
| speaking-foundation | sp-1 | How Speaking works and is marked | speaking.ts | 13 (sp-1-p1 … sp-1-y1) | Batch 10 + official facts | unchanged | tested | speaking 48/48 |  |
| speaking-foundation | sp-2 | Part 1: answer and extend | speaking.ts | 13 (sp-2-p1 … sp-2-y1) | Batch 10 + official facts | unchanged | tested | speaking 48/48 |  |
| speaking-foundation | sp-3 | Part 2: the long turn | speaking.ts | 13 (sp-3-p1 … sp-3-y1) | Batch 10 + official facts | unchanged | tested | speaking 48/48 |  |
| speaking-foundation | sp-4 | Part 3: opinions, comparing, speculating | speaking.ts | 13 (sp-4-p1 … sp-4-y1) | Batch 10 + official facts | unchanged | tested | speaking 48/48 |  |
| speaking-foundation | sp-5 | Fluency and natural spoken language | speaking.ts | 13 (sp-5-p1 … sp-5-y1) | Batch 10 + official facts | unchanged | tested | speaking 48/48 |  |
| speaking-foundation | sp-6 | Pronunciation: being easy to understand | speaking.ts | 13 (sp-6-p1 … sp-6-y1) | Batch 10 + official facts | integrated | tested | speaking 48/48 | sp-6-r1 duplicate accepted answer removed |
| speaking-foundation | sp-7 | Speaking traps and how to avoid them | speaking-apply.ts | 14 (sp-7-p1 … sp-7-y1) | Batch 10 + official facts | unchanged | tested | speaking 48/48 |  |
| speaking-foundation | sp-8 | A plan for the whole test | speaking-apply.ts | 13 (sp-8-p1 … sp-8-y1) | Batch 10 + official facts | integrated | tested | speaking 48/48 | sp-8-r2 context made exact |
| speaking-foundation | sp-9 | Speaking review test | speaking-apply.ts | 12 (sp-9-e1 … sp-9-e12) | Batch 10 + official facts | unchanged | tested | speaking 48/48 |  |

## What remains

- **Manual line-by-line rewrite** of the 156 unchanged lessons against
  `FOUNDATION_CONTENT_QUALITY_STANDARD.md` (rubric scoring per lesson). They are already in the v2 format (except
  the review tests and po-1) and pass every automated check, but no human-quality score was recorded for them.
- **Editorial batches 07–10** are thematic prose; their durable points were checked against the live lessons and
  applied where a lesson was wrong or absolute. They were not copied in wholesale.
- **Letter case** in Listening is backed by secondary sources only (see the table above).
- The remaining heuristic answer-audit flags (see `docs/ANSWER_AUDIT.md`).
