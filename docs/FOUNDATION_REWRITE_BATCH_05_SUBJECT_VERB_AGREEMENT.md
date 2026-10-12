# Mino Foundation Rewrite — Batch 05
## Subject–Verb Agreement: core learning source

**Status:** Editorial source draft; not live.  
**Active source families:** `agreement.ts` and `agreement-apply.ts`; map exact lesson IDs from the active catalogue before integration. This batch is a content guide, not permission to create duplicate lessons.

---

## Lesson concept — Find the subject head before choosing the verb
### Start with a trap
“The quality of the roads **has** improved.” The noun closest to the verb is “roads”, but the subject head is “quality”. The verb agrees with the subject head, not automatically with the nearest noun.

### Core model
In the present simple, a third-person singular subject generally takes a verb ending in -s (“she works”, “the system improves”); plural subjects and I/you take the base form (“they work”, “I work”, “you work”). With be, use am/is/are according to the subject. In the past simple, most lexical verbs do not change for singular/plural (“she worked”, “they worked”), but be does (“was/were”).

বাংলায়: verb বাছার আগে পুরো subject phrase পড়ুন এবং মূল noun বা head খুঁজুন। “of”, “with”, “in”, “who…”-এর মধ্যে থাকা noun দেখে verb ঠিক করবেন না।

### Worked examples
- “The list of required documents **is** on the website.” Head = list.
- “The documents on the list **are** required.” Head = documents.
- “A student who practises daily **improves**.” Main subject = student; “who practises daily” is a relative clause.
- “Students who practise daily **improve**.” Main subject = students; plural verb.
- “There **are** several reasons.” In existential there-constructions, the verb commonly agrees with the following noun phrase in standard usage.

### Misconceptions to repair
- Nearest noun rule: “The effects of pollution **is** serious.” → “The effects … **are** serious.”
- Every subject ending in -s is plural: “News **is** available.” “News” is grammatically singular in this use.
- Collective nouns have one fixed agreement form in all English: agreement can vary by meaning and variety; teach the form used in the target example and flag relevant variation.
- “Each of the students **have** a book.” → “Each of the students **has** a book.” The head “each” is singular in this construction.

### IELTS transfer
In Writing, underline the subject head and circle the finite verb during proofreading. This is especially useful when a long subject contains distracting plural nouns. In Reading, identifying agreement can help reveal clause boundaries, but do not use agreement as the only clue.

### Retrieval
Correct and explain: “The percentage of students who work part-time are increasing.” First identify the intended subject and meaning; several sentence rewrites may be possible.

---

## Lesson concept — Compound and indefinite subjects
### Compound subjects
- “Mina and Rafi are preparing.” Two subjects joined by and usually take a plural verb.
- “Tea and toast is my usual breakfast.” When two nouns form one combined item or unit in context, singular agreement can occur.
- “Either the teacher or the students are presenting.” With “or/nor” structures, agreement can depend on the nearest subject in standard usage; rewriting to avoid an awkward mismatch is often clearer.

### Indefinite pronouns and quantity expressions
- “Everyone is ready.” Words such as everyone, someone, each and anybody are grammatically singular in standard agreement.
- “Many are waiting.” “Many” can stand for a plural count.
- “Some of the water is missing.” The noun after “of” is uncountable.
- “Some of the books are missing.” The noun after “of” is plural countable.
- “A number of students are absent.” “A number of” means several.
- “The number of students is increasing.” “The number” is the subject head.

বাংলায়: “of-এর পরে কী আছে” অনেক সময় quantity expression-এর agreement বুঝতে সাহায্য করে, কিন্তু সব phrase-এর জন্য একই shortcut নেই। পুরো grammatical subject চিনুন।

### Common traps
- “Everybody have…” → “Everybody has…”
- “A number of people is…” (when meaning several people) → “A number of people are…”
- “The number of people are…” → “The number of people is…”
- With either/or and neither/nor, a long or awkward sentence may be clearer if rewritten: “The teacher or the students will present” can be recast to avoid a difficult agreement choice.

### IELTS transfer
Avoid building very long subjects just to sound academic. When a sentence has “the proportion of”, “the number of”, “a range of”, or “some of”, identify the grammatical head and the meaning before choosing the verb.

### Retrieval
Choose and justify: “A number of applicants (has/have) arrived”; “The number of applicants (has/have) risen”; “Each of the answers (is/are) checked.”

---

## Lesson concept — Agreement with time, distance, money and titles
Agreement is grammatical, not a direct count of every noun inside the subject.
- “Ten kilometres is a long walk.” The distance is viewed as one measure.
- “Five years is a long time to wait.” The period is viewed as one span.
- “Twenty dollars is enough for lunch.” The amount is viewed as one sum.
- “The United States is a country.” Some plural-looking names have singular grammatical agreement.
- “The police are investigating.” Some nouns have conventional plural agreement in standard usage.

These are patterns, not a universal rule that all measurements or collective nouns are singular. When the sentence focuses on separate individual units, plural meaning can become more prominent.

### Repair method
1. Identify the exact subject, not just the noun nearest the verb.
2. Decide whether the subject is grammatically singular/plural or a quantity treated as one unit in this context.
3. Check the verb form for the tense: present simple, be, modal, or past simple.
4. Read the full sentence aloud to confirm the intended meaning.

### IELTS transfer
In Task 1, a figure or percentage can be the subject (“The percentage of households has risen”), while the people or items represented may appear inside an “of” phrase. In Task 2, clear sentence design is better than a complicated subject that makes agreement difficult.

### Retrieval
Write two examples: one where a measurement takes singular agreement as a unit, and one where a plural noun takes a plural verb. Explain what the grammatical subject is in each.

---

## Integration / QA requirements
- Do not overwrite active lessons until lesson IDs and source order are mapped from `index.ts`.
- Audit every agreement exercise for a single defensible answer, context, accepted variants, and explanation.
- Where a sentence is genuinely ambiguous, improve its context rather than treating one preference as universal.
- Keep all practice interactions and progress IDs intact. Add regression tests only using the repository's existing test conventions.
