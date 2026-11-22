import type { Lesson } from '../types';

/**
 * Task 1 Academy — Module 1 ("Understanding IELTS Writing Task 1"). The
 * foundation lesson: what IELTS ACADEMIC Writing Task 1 actually asks for
 * (not General Training's letter, not Task 2's essay), how a response is
 * structured (Introduction / Overview / Body), objective reporting versus
 * opinion, and an accurate paraphrase — before any chart-reading work.
 * Everything later in this Academy builds on getting this right.
 */
export const task1UnderstandingLesson: Lesson = {
  id: 'task1-understanding',
  task: 'task1',
  moduleId: 'task1-m1',
  title: 'Understanding IELTS Writing Task 1',
  objective: 'Know exactly what Academic Task 1 asks for, how a response is structured, and how to paraphrase a question accurately — so every later lesson builds on the right foundation.',
  estMinutes: 16,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi — I'm Mino. This lesson is about IELTS ACADEMIC Writing Task 1 — describing a chart, table, map or diagram. (General Training has a different Task 1, a letter, which this Academy does not cover.) By the end, you'll know what Task 1 actually wants, how its response is built from three parts, and how to paraphrase a question without changing its meaning. Most early mistakes come from misunderstanding the task itself, not from weak English — so that's where we start.",
    },
    {
      id: 'what-task1-asks',
      kind: 'explain',
      title: 'What Academic Task 1 actually asks for',
      trainerMessage:
        'Task 1 gives you ONE visual and asks you to describe it in your own words, using data from it. Think of yourself as a reporter, not a judge: your job is to describe what is shown, accurately and clearly — never to argue a case, explain causes, or recommend anything.',
      material: {
        type: 'text',
        paragraphs: [
          "The visual can be a line graph, a bar chart, a pie chart, a table, a map, or a process diagram — and these behave differently. Don't assume every visual has a rising or falling trend: a pie chart or table often shows a single moment with no trend at all, a map shows how a place changed between two dates, and a process diagram shows the stages of a cycle with no time axis whatsoever.",
          "Whichever visual you get, the task is the same: report what it actually shows, selecting the features that matter most. You are never asked to report every single number — picking the right details is itself part of the skill, which later lessons in this Academy cover in depth.",
        ],
      },
    },
    {
      id: 'task1-vs-task2',
      kind: 'explain',
      title: 'Task 1 versus Task 2',
      trainerMessage: "It's easy to blur the two Writing tasks together early on. Here's exactly how they differ — and the two mistakes that blur usually causes.",
      material: {
        type: 'text',
        paragraphs: [
          'Task 1: describe visual data objectively, at least 150 words, about 20 minutes, no personal opinion, no essay structure. Task 2: answer a question with a developed, persuasive or discussion essay, at least 250 words, about 40 minutes, a clear personal position is required. Both are marked on four equally-weighted criteria that share the same names for Coherence & Cohesion, Lexical Resource and Grammatical Range & Accuracy — but the fourth criterion is Task Achievement for Task 1 and Task Response for Task 2, and the skills each one actually rewards are different.',
          "Two mistakes follow from mixing them up. First, treating Task 1 like a mini-essay — adding \"I think...\", explaining why a trend happened, or finishing with a recommendation. Second, under-investing in Task 1 because its word count is lower — but Task 1 is marked by the exact same four-criteria system as Task 2, just applied to a reporting skill instead of an argument.",
        ],
      },
    },
    {
      id: 'time-criteria',
      kind: 'explain',
      title: 'Time, word count, and the four criteria',
      trainerMessage: "Here are the numbers and the marking system — worth knowing cold before you write a single response.",
      material: {
        type: 'text',
        paragraphs: [
          'You have about 20 minutes and must write at least 150 words. Writing fewer than 150 words costs marks even when the content is good, because the examiner cannot see a fully developed response — and writing far more leaves less time for Task 2, which counts for more of your overall Writing band.',
          'Four criteria, each worth an equal share of the Task 1 score: Task Achievement (did you cover the key features accurately, with a clear overview, and no opinion?), Coherence & Cohesion (is it logically organised and linked with paragraphs and linking words?), Lexical Resource (is your vocabulary accurate, varied and precise — especially trend and comparison language?), and Grammatical Range & Accuracy (a mix of correct simple and complex sentences).',
        ],
      },
    },
    {
      id: 'response-structure',
      kind: 'explain',
      title: 'Introduction, Overview, and Body: three different jobs',
      trainerMessage: 'A Task 1 response always has the same three working parts, and each one has a distinct job — mixing them up is one of the most common structural mistakes.',
      material: {
        type: 'vocab',
        items: [
          { phrase: 'Introduction', use: 'Paraphrase the task question accurately — change the wording and structure, but keep every key fact (dates, units, categories, numbers of items) the same. No data, no trend, and no opinion belong here.' },
          { phrase: 'Overview', use: 'Stand back and state the one or two most significant overall features — the "headline" of the visual — without listing individual figures. A static visual gets an overview of its main comparison or feature instead of a "trend".' },
          { phrase: 'Body paragraph(s)', use: 'Support the overview with selected, grouped details and real comparisons (for example "more than double", "roughly the same as") — not a complete list of every number in the visual.' },
        ],
      },
    },
    {
      id: 'objective-vs-opinion',
      kind: 'demonstrate',
      title: 'Objective reporting versus opinion',
      trainerMessage: 'Here are two openings written about the same chart, on renewable electricity use. Only one of them is doing what Task 1 asks — and the difference is not about grammar.',
      material: {
        type: 'examples',
        good:
          'The line graph compares the proportion of electricity generated from renewable sources in three countries between 2000 and 2020.',
        weak:
          'In my opinion, countries should use more renewable electricity because it is better for the environment, and I think this chart proves it.',
        note: 'The weak version gives an opinion ("in my opinion", "I think") and argues a case — that is Task 2 behaviour. Both sentences are grammatically fine; the difference is entirely about task type. Task 1 only ever reports what the visual shows, in neutral, factual language, whatever the visual actually is.',
      },
    },
    {
      id: 'check-task-type',
      kind: 'check',
      title: 'Guided practice: which task is this?',
      trainerMessage: 'A quick check before we go further.',
      check: {
        prompt:
          "A friend practising IELTS shows you a task card: \"The chart below shows the number of international students in four countries from 2010 to 2020. Summarise the information by selecting and reporting the main features.\" Which task is this?",
        options: [
          'Academic Writing Task 1 — describing visual data',
          'Academic Writing Task 2 — an opinion essay',
          'General Training Task 1 — a letter',
          'Speaking Part 2 — a cue card',
        ],
        correctIndex: 0,
        explain:
          "The instruction \"summarise... by selecting and reporting the main features\" is the standard Academic Task 1 wording for describing a chart — there is no question to discuss and no opinion asked for, which rules out Task 2, and nothing here asks for a letter or spoken answer.",
      },
    },
    {
      id: 'check-sections',
      kind: 'check',
      title: 'Guided practice: which section is this?',
      trainerMessage: "Now let's test whether you can tell the three sections apart.",
      check: {
        prompt:
          'Read this sentence from a student\'s response: "The bar chart illustrates the proportion of households owning a car, a bicycle and a motorbike in two cities in 2015." Which part of a well-structured Task 1 response is this sentence?',
        options: ['Introduction', 'Overview', 'Body paragraph', 'Conclusion'],
        correctIndex: 0,
        explain:
          'This sentence only restates the question in different words — it names the chart type and topic but gives no overall pattern, no comparison and no figures. That is exactly the Introduction\'s job. An Overview would instead name the biggest pattern (for example, which vehicle was most common); a Body paragraph would add real figures and comparisons. Note too that Task 1 responses have no Conclusion — that belongs to Task 2\'s essay structure.',
      },
    },
    {
      id: 'check-objective',
      kind: 'check',
      title: 'Guided practice: objective or opinion?',
      trainerMessage: 'One more check — this time spotting several ways an opinion can sneak in.',
      check: {
        prompt: 'Which of these four sentences is suitable for an IELTS Academic Task 1 response?',
        options: [
          'The number of visitors rose from 10,000 in 2000 to 45,000 in 2020.',
          'The sharp rise is probably due to a new marketing campaign that year.',
          'Overall, this rise is a very positive sign for the local economy.',
          'In my opinion, the museum should receive more government funding.',
        ],
        correctIndex: 0,
        explain:
          'Only the first sentence reports what the chart actually shows, with real figures and no added comment. The second guesses at a CAUSE the chart does not state ("probably due to"); the third adds a value judgement ("a very positive sign"); the fourth is a direct personal opinion with a recommendation. Explaining causes, judging whether something is good, and recommending action are three of the most common beginner habits in Task 1 — and all three cost marks however fluent the English is.',
      },
    },
    {
      id: 'paraphrase-technique',
      kind: 'guided',
      title: 'Guided practice: paraphrasing a question',
      trainerMessage:
        'Paraphrasing means changing the words and the sentence structure while keeping every important fact exactly the same — names, dates, units, categories and numbers. Forcing an unfamiliar synonym that changes the meaning is worse than a plain, accurate sentence.',
      hint: 'Check: did the wording and structure change, and did every fact (dates, countries, topic) survive unchanged?',
      check: {
        prompt:
          'Task 1 question: "The chart below shows the percentage of households with internet access in three countries between 2005 and 2020." Which of these is the BEST paraphrase for your introduction?',
        options: [
          'The chart below shows the percentage of households with internet access in three countries between 2005 and 2020.',
          'The given chart illustrates the proportion of homes with internet connections in three countries from 2005 to 2020.',
          'The chart shows that internet access is now extremely common everywhere, which is a huge improvement for modern life.',
          'The graph shows the percentage of three countries between 2005 until 2020.',
        ],
        correctIndex: 1,
        explain:
          'A good paraphrase changes both the words ("shows" → "illustrates", "percentage of households with" → "proportion of homes with") and the structure, while every fact survives — three countries, 2005 to 2020, and internet access. Option 1 is not paraphrased at all, just copied. Option 3 drops the key facts (which countries, which dates) and drifts into an unsupported opinion ("huge improvement"). Option 4 tries to change the wording but loses the topic ("internet access") entirely and creates a grammar mistake ("between... until") — a forced, inaccurate synonym is often worse than a safe, accurate one.',
      },
    },
    {
      id: 'self-correction',
      kind: 'review',
      title: 'Self-correction checklist',
      trainerMessage: 'Before you submit any Task 1 response — today\'s practice included — run it against this checklist.',
      material: {
        type: 'text',
        paragraphs: [
          'Does my introduction paraphrase the question without copying it word for word, and without losing any key fact? Have I left out any opinion, any individual figures, and any explanation of causes? Is there one overview sentence, separate from the introduction, naming the one or two biggest patterns? Do my body paragraphs use selected, real figures and comparisons rather than opinion or a list of every number? Have I avoided words like "I think", "should", or "probably because" anywhere in the response? Is it at least 150 words?',
          'In order of how often they appear, the most common beginner mistakes are: giving an opinion or recommendation (Task 2 behaviour); guessing at causes the visual does not state; copying the question instead of paraphrasing it; forgetting the overview entirely; and trying to report every single figure instead of selecting the ones that matter most.',
        ],
      },
    },
    {
      id: 'readiness',
      kind: 'review',
      title: 'Ready to write',
      trainerMessage:
        "You now know what Task 1 actually asks for, how Introduction, Overview and Body work together, and how to paraphrase a question accurately. Next, you'll write just the introduction for a new Task 1 question — nothing else. Keep it short, accurate, and completely free of opinion, figures or causes; that belongs to later lessons.",
    },
  ],
  finalPrompt: {
    title: 'Write an accurate introduction',
    instructions:
      'Here is a new Task 1 question: "The graphs below show the average monthly temperature and rainfall in two cities over one year." Write ONLY the introduction — one or two sentences that paraphrase this question accurately. Keep every key fact unchanged (both cities, both measurements — temperature and rainfall — and the one-year period) while changing the wording and structure. Do not add an overview, any figures, or any opinion; those come in later lessons.',
    minWords: 35,
    skillFocus: 'Paraphrasing accuracy for a Task 1 introduction',
    checkScope: 'introduction-only',
  },
};
