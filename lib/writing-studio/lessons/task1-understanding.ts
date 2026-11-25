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
  title: { en: 'Understanding IELTS Writing Task 1', bn: 'IELTS Writing Task 1 বোঝা' },
  objective: {
    en: 'Know exactly what Academic Task 1 asks for, how a response is structured, and how to paraphrase a question accurately — so every later lesson builds on the right foundation.',
    bn: 'ঠিক ঠিক জানো Academic Task 1 আসলে কী চায়, একটা response কীভাবে structured হয়, আর কীভাবে একটা প্রশ্ন নির্ভুলভাবে paraphrase করতে হয় — যাতে পরের প্রতিটা lesson সঠিক ভিত্তির উপর তৈরি হয়।',
  },
  estMinutes: 16,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: { en: "Today's goal", bn: 'আজকের লক্ষ্য' },
      trainerMessage: {
        en: "Hi — I'm Mino. This lesson is about IELTS ACADEMIC Writing Task 1 — describing a chart, table, map or diagram. (General Training has a different Task 1, a letter, which this Academy does not cover.) By the end, you'll know what Task 1 actually wants, how its response is built from three parts, and how to paraphrase a question without changing its meaning. Most early mistakes come from misunderstanding the task itself, not from weak English — so that's where we start.",
        bn: 'হাই — আমি Mino। এই lesson-টা IELTS ACADEMIC Writing Task 1 নিয়ে — একটা chart, table, map বা diagram বর্ণনা করা। (General Training-এর Task 1 আলাদা, একটা letter, যেটা এই Academy-তে নেই।) শেষে গিয়ে তুমি জানবে Task 1 আসলে কী চায়, এর response তিনটা অংশ দিয়ে কীভাবে তৈরি হয়, আর অর্থ না বদলে কীভাবে একটা প্রশ্ন paraphrase করতে হয়। শুরুর দিকের বেশিরভাগ ভুল হয় Task-টা ভুল বুঝে, English দুর্বল থাকার জন্য না — তাই আমরা এখান থেকেই শুরু করছি।',
      },
    },
    {
      id: 'what-task1-asks',
      kind: 'explain',
      title: { en: 'What Academic Task 1 actually asks for', bn: 'Academic Task 1 আসলে কী চায়' },
      trainerMessage: {
        en: 'Task 1 gives you ONE visual and asks you to describe it in your own words, using data from it. Think of yourself as a reporter, not a judge: your job is to describe what is shown, accurately and clearly — never to argue a case, explain causes, or recommend anything.',
        bn: 'Task 1 তোমাকে একটা visual দেয় আর সেটাকে নিজের ভাষায়, সেখানের data ব্যবহার করে বর্ণনা করতে বলে। নিজেকে একজন reporter ভাবো, judge না: তোমার কাজ হলো যা দেখানো হয়েছে সেটা নির্ভুলভাবে আর স্পষ্টভাবে বর্ণনা করা — কখনো কোনো যুক্তি দেওয়া, কারণ ব্যাখ্যা করা, বা কিছু recommend করা না।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: "The visual can be a line graph, a bar chart, a pie chart, a table, a map, or a process diagram — and these behave differently. Don't assume every visual has a rising or falling trend: a pie chart or table often shows a single moment with no trend at all, a map shows how a place changed between two dates, and a process diagram shows the stages of a cycle with no time axis whatsoever.",
            bn: 'visual-টা একটা line graph, bar chart, pie chart, table, map, বা process diagram হতে পারে — আর এগুলো আলাদা আলাদাভাবে কাজ করে। ধরে নিও না যে প্রতিটা visual-এই বাড়া বা কমার একটা trend থাকবে: একটা pie chart বা table প্রায়ই একটা মুহূর্তের ছবি দেখায়, যেখানে কোনো trend-ই থাকে না, একটা map দেখায় একটা জায়গা দুইটা তারিখের মধ্যে কীভাবে বদলেছে, আর একটা process diagram একটা cycle-এর ধাপগুলো দেখায়, যেখানে কোনো সময়ের axis থাকে না।',
          },
          {
            en: 'Whichever visual you get, the task is the same: report what it actually shows, selecting the features that matter most. You are never asked to report every single number — picking the right details is itself part of the skill, which later lessons in this Academy cover in depth.',
            bn: 'যেকোনো visual-ই তুমি পাও না কেন, কাজটা একই: এটা আসলে কী দেখাচ্ছে সেটা report করা, সবচেয়ে গুরুত্বপূর্ণ feature-গুলো বেছে নিয়ে। তোমাকে কখনোই প্রতিটা সংখ্যা report করতে বলা হয় না — সঠিক detail বেছে নেওয়াটাই একটা skill, যা এই Academy-র পরের lesson-গুলোতে বিস্তারিত আলোচনা হবে।',
          },
        ],
      },
    },
    {
      id: 'task1-vs-task2',
      kind: 'explain',
      title: { en: 'Task 1 versus Task 2', bn: 'Task 1 বনাম Task 2' },
      trainerMessage: {
        en: "It's easy to blur the two Writing tasks together early on. Here's exactly how they differ — and the two mistakes that blur usually causes.",
        bn: 'শুরুর দিকে এই দুইটা Writing task গুলিয়ে ফেলা খুব সহজ। চলো দেখি এগুলো ঠিক কীভাবে আলাদা — আর এই গুলিয়ে ফেলা থেকে সাধারণত কোন দুইটা ভুল হয়।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Task 1: describe visual data objectively, at least 150 words, about 20 minutes, no personal opinion, no essay structure. Task 2: answer a question with a developed, persuasive or discussion essay, at least 250 words, about 40 minutes, a clear personal position is required. Both are marked on four equally-weighted criteria that share the same names for Coherence & Cohesion, Lexical Resource and Grammatical Range & Accuracy — but the fourth criterion is Task Achievement for Task 1 and Task Response for Task 2, and the skills each one actually rewards are different.',
            bn: 'Task 1: visual data-কে objectively বর্ণনা করা, অন্তত ১৫০ শব্দ, প্রায় ২০ মিনিট, কোনো ব্যক্তিগত opinion না, কোনো essay structure না। Task 2: একটা প্রশ্নের উত্তরে একটা developed, persuasive বা discussion essay লেখা, অন্তত ২৫০ শব্দ, প্রায় ৪০ মিনিট, একটা স্পষ্ট ব্যক্তিগত position দরকার। দুইটাই চারটা সমান-গুরুত্বের criteria দিয়ে marked হয় — Coherence & Cohesion, Lexical Resource আর Grammatical Range & Accuracy একই নামে থাকে — কিন্তু চতুর্থ criterion Task 1-এর জন্য Task Achievement আর Task 2-এর জন্য Task Response, আর প্রতিটা আসলে ভিন্ন skill-কে reward করে।',
          },
          {
            en: 'Two mistakes follow from mixing them up. First, treating Task 1 like a mini-essay — adding "I think...", explaining why a trend happened, or finishing with a recommendation. Second, under-investing in Task 1 because its word count is lower — but Task 1 is marked by the exact same four-criteria system as Task 2, just applied to a reporting skill instead of an argument.',
            bn: 'এই দুইটা গুলিয়ে ফেলার ফলে দুইটা ভুল হয়। প্রথমত, Task 1-কে একটা mini-essay-এর মতো treat করা — "I think..." যোগ করা, কেন একটা trend হয়েছে ব্যাখ্যা করা, বা একটা recommendation দিয়ে শেষ করা। দ্বিতীয়ত, word count কম বলে Task 1-এ কম সময় দেওয়া — কিন্তু Task 1, Task 2-এর মতোই একই চার-criteria system দিয়ে marked হয়, শুধু সেটা একটা argument-এর বদলে reporting skill-এ প্রয়োগ হয়।',
          },
        ],
      },
    },
    {
      id: 'time-criteria',
      kind: 'explain',
      title: { en: 'Time, word count, and the four criteria', bn: 'সময়, word count, আর চারটা criteria' },
      trainerMessage: {
        en: 'Here are the numbers and the marking system — worth knowing cold before you write a single response.',
        bn: 'এখানে সংখ্যা আর marking system-টা দেওয়া হলো — একটা response লেখার আগে এগুলো একদম মুখস্থ থাকা দরকার।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'You have about 20 minutes and must write at least 150 words. Writing fewer than 150 words costs marks even when the content is good, because the examiner cannot see a fully developed response — and writing far more leaves less time for Task 2, which counts for more of your overall Writing band.',
            bn: 'তোমার কাছে প্রায় ২০ মিনিট আছে আর অন্তত ১৫০ শব্দ লিখতে হবে। ১৫০ শব্দের কম লিখলে content ভালো হলেও নম্বর কাটা যায়, কারণ examiner একটা পুরোপুরি develop করা response দেখতে পান না — আর অনেক বেশি লিখলে Task 2-এর জন্য সময় কমে যায়, যেটা তোমার overall Writing band-এ বেশি গুরুত্ব বহন করে।',
          },
          {
            en: 'Four criteria, each worth an equal share of the Task 1 score: Task Achievement (did you cover the key features accurately, with a clear overview, and no opinion?), Coherence & Cohesion (is it logically organised and linked with paragraphs and linking words?), Lexical Resource (is your vocabulary accurate, varied and precise — especially trend and comparison language?), and Grammatical Range & Accuracy (a mix of correct simple and complex sentences).',
            bn: 'চারটা criteria, প্রতিটা Task 1-এর score-এ সমান ভাগ: Task Achievement (তুমি কি key feature-গুলো নির্ভুলভাবে cover করেছ, একটা স্পষ্ট overview সহ, কোনো opinion ছাড়া?), Coherence & Cohesion (এটা কি যুক্তিসঙ্গতভাবে সাজানো আর paragraph ও linking word দিয়ে সংযুক্ত?), Lexical Resource (তোমার vocabulary কি নির্ভুল, বৈচিত্র্যময় আর নির্দিষ্ট — বিশেষ করে trend আর comparison-এর ভাষা?), আর Grammatical Range & Accuracy (সঠিক simple আর complex বাক্যের মিশ্রণ)।',
          },
        ],
      },
    },
    {
      id: 'response-structure',
      kind: 'explain',
      title: { en: 'Introduction, Overview, and Body: three different jobs', bn: 'Introduction, Overview, আর Body: তিনটা আলাদা কাজ' },
      trainerMessage: {
        en: 'A Task 1 response always has the same three working parts, and each one has a distinct job — mixing them up is one of the most common structural mistakes.',
        bn: 'একটা Task 1 response-এর সবসময় একই তিনটা working part থাকে, আর প্রতিটার কাজ আলাদা — এগুলো গুলিয়ে ফেলা structural দিক থেকে সবচেয়ে সাধারণ ভুলগুলোর একটা।',
      },
      material: {
        type: 'vocab',
        items: [
          {
            phrase: 'Introduction',
            use: {
              en: 'Paraphrase the task question accurately — change the wording and structure, but keep every key fact (dates, units, categories, numbers of items) the same. No data, no trend, and no opinion belong here.',
              bn: 'task question-টা নির্ভুলভাবে paraphrase করা — শব্দ আর structure বদলাও, কিন্তু প্রতিটা key fact (তারিখ, unit, category, item-এর সংখ্যা) একই রাখো। এখানে কোনো data, trend, বা opinion থাকবে না।',
            },
          },
          {
            phrase: 'Overview',
            use: {
              en: 'Stand back and state the one or two most significant overall features — the "headline" of the visual — without listing individual figures. A static visual gets an overview of its main comparison or feature instead of a "trend".',
              bn: 'পিছিয়ে এসে সবচেয়ে গুরুত্বপূর্ণ এক বা দুইটা overall feature বলো — visual-টার "headline" — আলাদা আলাদা figure তালিকা না করে। একটা static visual-এর জন্য "trend"-এর বদলে এর মূল comparison বা feature-এর একটা overview থাকে।',
            },
          },
          {
            phrase: 'Body paragraph(s)',
            use: {
              en: 'Support the overview with selected, grouped details and real comparisons (for example "more than double", "roughly the same as") — not a complete list of every number in the visual.',
              bn: 'বেছে নেওয়া, গ্রুপ করা detail আর real comparison (যেমন "more than double", "roughly the same as") দিয়ে overview-কে support করো — visual-এর প্রতিটা সংখ্যার পূর্ণ তালিকা না।',
            },
          },
        ],
      },
    },
    {
      id: 'objective-vs-opinion',
      kind: 'demonstrate',
      title: { en: 'Objective reporting versus opinion', bn: 'Objective reporting বনাম Opinion' },
      trainerMessage: {
        en: 'Here are two openings written about the same chart, on renewable electricity use. Only one of them is doing what Task 1 asks — and the difference is not about grammar.',
        bn: 'এখানে একই chart নিয়ে লেখা দুইটা opening দেওয়া হলো, renewable electricity ব্যবহার নিয়ে। এর মধ্যে শুধু একটা Task 1 যা চায় সেটা করছে — আর পার্থক্যটা grammar নিয়ে না।',
      },
      material: {
        type: 'examples',
        good:
          'The line graph compares the proportion of electricity generated from renewable sources in three countries between 2000 and 2020.',
        weak:
          'In my opinion, countries should use more renewable electricity because it is better for the environment, and I think this chart proves it.',
        note: {
          en: 'The weak version gives an opinion ("in my opinion", "I think") and argues a case — that is Task 2 behaviour. Both sentences are grammatically fine; the difference is entirely about task type. Task 1 only ever reports what the visual shows, in neutral, factual language, whatever the visual actually is.',
          bn: 'weak version-টা একটা opinion দেয় ("in my opinion", "I think") আর একটা যুক্তি তুলে ধরে — এটা Task 2-এর আচরণ। দুইটা বাক্যই grammatically ঠিক আছে; পার্থক্যটা সম্পূর্ণভাবে task type নিয়ে। Task 1 সবসময় শুধু visual-টা যা দেখাচ্ছে সেটাই neutral, factual ভাষায় report করে, visual-টা আসলে যা-ই হোক না কেন।',
        },
      },
    },
    {
      id: 'check-task-type',
      kind: 'check',
      title: { en: 'Guided practice: which task is this?', bn: 'Guided practice: এটা কোন task?' },
      trainerMessage: { en: 'A quick check before we go further.', bn: 'আরও এগোনোর আগে একটা ছোট check।' },
      check: {
        prompt: {
          en: "A friend practising IELTS shows you a task card: \"The chart below shows the number of international students in four countries from 2010 to 2020. Summarise the information by selecting and reporting the main features.\" Which task is this?",
          bn: 'IELTS practice করা একজন বন্ধু তোমাকে একটা task card দেখাল: "The chart below shows the number of international students in four countries from 2010 to 2020. Summarise the information by selecting and reporting the main features." এটা কোন task?',
        },
        options: [
          'Academic Writing Task 1 — describing visual data',
          'Academic Writing Task 2 — an opinion essay',
          'General Training Task 1 — a letter',
          'Speaking Part 2 — a cue card',
        ],
        correctIndex: 0,
        explain: {
          en: "The instruction \"summarise... by selecting and reporting the main features\" is the standard Academic Task 1 wording for describing a chart — there is no question to discuss and no opinion asked for, which rules out Task 2, and nothing here asks for a letter or spoken answer.",
          bn: '"summarise... by selecting and reporting the main features" — এই instruction-টা একটা chart বর্ণনা করার জন্য standard Academic Task 1-এর ভাষা — এখানে discuss করার মতো কোনো প্রশ্ন নেই আর কোনো opinion চাওয়া হয়নি, তাই Task 2 বাদ, আর এখানে কোনো letter বা মুখে বলা উত্তরও চাওয়া হয়নি।',
        },
      },
    },
    {
      id: 'check-sections',
      kind: 'check',
      title: { en: 'Guided practice: which section is this?', bn: 'Guided practice: এটা কোন section?' },
      trainerMessage: { en: "Now let's test whether you can tell the three sections apart.", bn: 'এবার দেখি তুমি এই তিনটা section আলাদা করতে পারো কিনা।' },
      check: {
        prompt: {
          en: 'Read this sentence from a student\'s response: "The bar chart illustrates the proportion of households owning a car, a bicycle and a motorbike in two cities in 2015." Which part of a well-structured Task 1 response is this sentence?',
          bn: 'একজন student-এর response থেকে এই বাক্যটা পড়ো: "The bar chart illustrates the proportion of households owning a car, a bicycle and a motorbike in two cities in 2015." একটা ভালোভাবে structured Task 1 response-এর কোন অংশ এই বাক্যটা?',
        },
        options: ['Introduction', 'Overview', 'Body paragraph', 'Conclusion'],
        correctIndex: 0,
        explain: {
          en: 'This sentence only restates the question in different words — it names the chart type and topic but gives no overall pattern, no comparison and no figures. That is exactly the Introduction\'s job. An Overview would instead name the biggest pattern (for example, which vehicle was most common); a Body paragraph would add real figures and comparisons. Note too that Task 1 responses have no Conclusion — that belongs to Task 2\'s essay structure.',
          bn: 'এই বাক্যটা শুধু প্রশ্নটাকে অন্য শব্দে restate করছে — এটা chart-এর type আর topic বলছে কিন্তু কোনো overall pattern, comparison বা figure দিচ্ছে না। এটাই ঠিক Introduction-এর কাজ। একটা Overview এর বদলে সবচেয়ে বড় pattern-টা বলত (যেমন, কোন vehicle সবচেয়ে common ছিল); আর একটা Body paragraph real figure আর comparison যোগ করত। এটাও খেয়াল রাখো যে Task 1 response-এ কোনো Conclusion থাকে না — সেটা Task 2-এর essay structure-এ থাকে।',
        },
      },
    },
    {
      id: 'check-objective',
      kind: 'check',
      title: { en: 'Guided practice: objective or opinion?', bn: 'Guided practice: objective নাকি opinion?' },
      trainerMessage: { en: 'One more check — this time spotting several ways an opinion can sneak in.', bn: 'আরেকটা check — এবার দেখব opinion কীভাবে কয়েকভাবে ঢুকে পড়তে পারে।' },
      check: {
        prompt: { en: 'Which of these four sentences is suitable for an IELTS Academic Task 1 response?', bn: 'এই চারটা বাক্যের মধ্যে কোনটা একটা IELTS Academic Task 1 response-এর জন্য উপযুক্ত?' },
        options: [
          'The number of visitors rose from 10,000 in 2000 to 45,000 in 2020.',
          'The sharp rise is probably due to a new marketing campaign that year.',
          'Overall, this rise is a very positive sign for the local economy.',
          'In my opinion, the museum should receive more government funding.',
        ],
        correctIndex: 0,
        explain: {
          en: 'Only the first sentence reports what the chart actually shows, with real figures and no added comment. The second guesses at a CAUSE the chart does not state ("probably due to"); the third adds a value judgement ("a very positive sign"); the fourth is a direct personal opinion with a recommendation. Explaining causes, judging whether something is good, and recommending action are three of the most common beginner habits in Task 1 — and all three cost marks however fluent the English is.',
          bn: 'শুধু প্রথম বাক্যটা chart আসলে যা দেখাচ্ছে সেটা report করছে, real figure দিয়ে, কোনো অতিরিক্ত মন্তব্য ছাড়া। দ্বিতীয়টা chart-এ না থাকা একটা CAUSE অনুমান করছে ("probably due to"); তৃতীয়টা একটা value judgement যোগ করছে ("a very positive sign"); চতুর্থটা সরাসরি একটা ব্যক্তিগত opinion recommendation সহ। কারণ ব্যাখ্যা করা, কোনো কিছু ভালো কিনা বিচার করা, আর recommend করা — এই তিনটাই Task 1-এ নতুনদের সবচেয়ে সাধারণ অভ্যাস — আর English যত ভালোই হোক, এই তিনটাই নম্বর কাটে।',
        },
      },
    },
    {
      id: 'paraphrase-technique',
      kind: 'guided',
      title: { en: 'Guided practice: paraphrasing a question', bn: 'Guided practice: একটা প্রশ্ন paraphrase করা' },
      trainerMessage: {
        en: 'Paraphrasing means changing the words and the sentence structure while keeping every important fact exactly the same — names, dates, units, categories and numbers. Forcing an unfamiliar synonym that changes the meaning is worse than a plain, accurate sentence.',
        bn: 'Paraphrasing মানে হলো শব্দ আর বাক্যের structure বদলানো, কিন্তু প্রতিটা গুরুত্বপূর্ণ তথ্য — নাম, তারিখ, unit, category আর সংখ্যা — ঠিক একইরকম রাখা। অর্থ বদলে দেয় এমন একটা অপরিচিত synonym জোর করে ব্যবহার করা একটা সাদামাটা কিন্তু সঠিক বাক্যের চেয়েও খারাপ।',
      },
      hint: {
        en: 'Check: did the wording and structure change, and did every fact (dates, countries, topic) survive unchanged?',
        bn: 'চেক করো: শব্দ আর structure কি বদলেছে, আর প্রতিটা তথ্য (তারিখ, দেশ, topic) কি অপরিবর্তিত থেকেছে?',
      },
      check: {
        prompt: {
          en: 'Task 1 question: "The chart below shows the percentage of households with internet access in three countries between 2005 and 2020." Which of these is the BEST paraphrase for your introduction?',
          bn: 'Task 1 question: "The chart below shows the percentage of households with internet access in three countries between 2005 and 2020." তোমার introduction-এর জন্য এর মধ্যে কোনটা সবচেয়ে ভালো paraphrase?',
        },
        options: [
          'The chart below shows the percentage of households with internet access in three countries between 2005 and 2020.',
          'The given chart illustrates the proportion of homes with internet connections in three countries from 2005 to 2020.',
          'The chart shows that internet access is now extremely common everywhere, which is a huge improvement for modern life.',
          'The graph shows the percentage of three countries between 2005 until 2020.',
        ],
        correctIndex: 1,
        explain: {
          en: 'A good paraphrase changes both the words ("shows" → "illustrates", "percentage of households with" → "proportion of homes with") and the structure, while every fact survives — three countries, 2005 to 2020, and internet access. Option 1 is not paraphrased at all, just copied. Option 3 drops the key facts (which countries, which dates) and drifts into an unsupported opinion ("huge improvement"). Option 4 tries to change the wording but loses the topic ("internet access") entirely and creates a grammar mistake ("between... until") — a forced, inaccurate synonym is often worse than a safe, accurate one.',
          bn: 'একটা ভালো paraphrase শব্দ ("shows" → "illustrates", "percentage of households with" → "proportion of homes with") আর structure দুটোই বদলায়, আর প্রতিটা তথ্য টিকে থাকে — তিনটা দেশ, ২০০৫ থেকে ২০২০, আর internet access। Option 1 আসলে paraphrase-ই না, শুধু copy করা। Option 3 গুরুত্বপূর্ণ তথ্য (কোন দেশ, কোন তারিখ) বাদ দিয়ে একটা unsupported opinion-এ চলে যায় ("huge improvement")। Option 4 শব্দ বদলানোর চেষ্টা করে কিন্তু topic-টাই ("internet access") হারিয়ে ফেলে আর একটা grammar ভুল তৈরি করে ("between... until") — একটা জোর করে বসানো, ভুল synonym অনেক সময় একটা safe, সঠিক synonym-এর চেয়ে খারাপ।',
        },
      },
    },
    {
      id: 'self-correction',
      kind: 'review',
      title: { en: 'Self-correction checklist', bn: 'নিজে যাচাই করার checklist' },
      trainerMessage: {
        en: "Before you submit any Task 1 response — today's practice included — run it against this checklist.",
        bn: 'যেকোনো Task 1 response জমা দেওয়ার আগে — আজকের practice-ও বাদ না — এই checklist দিয়ে একবার যাচাই করো।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Does my introduction paraphrase the question without copying it word for word, and without losing any key fact? Have I left out any opinion, any individual figures, and any explanation of causes? Is there one overview sentence, separate from the introduction, naming the one or two biggest patterns? Do my body paragraphs use selected, real figures and comparisons rather than opinion or a list of every number? Have I avoided words like "I think", "should", or "probably because" anywhere in the response? Is it at least 150 words?',
            bn: 'আমার introduction কি প্রশ্নটা হুবহু copy না করে, কোনো key fact না হারিয়ে paraphrase করছে? আমি কি কোনো opinion, আলাদা আলাদা figure, বা কারণের ব্যাখ্যা বাদ দিয়েছি? introduction থেকে আলাদা, সবচেয়ে বড় এক বা দুইটা pattern বলা একটা overview বাক্য আছে কি? আমার body paragraph-গুলো কি opinion বা প্রতিটা সংখ্যার তালিকার বদলে বেছে নেওয়া, real figure আর comparison ব্যবহার করছে? আমি কি response-এ কোথাও "I think", "should", বা "probably because"-এর মতো শব্দ এড়িয়ে গেছি? এটা কি অন্তত ১৫০ শব্দের?',
          },
          {
            en: 'In order of how often they appear, the most common beginner mistakes are: giving an opinion or recommendation (Task 2 behaviour); guessing at causes the visual does not state; copying the question instead of paraphrasing it; forgetting the overview entirely; and trying to report every single figure instead of selecting the ones that matter most.',
            bn: 'কতবার দেখা যায় সেই ক্রমে, নতুনদের সবচেয়ে সাধারণ ভুলগুলো হলো: একটা opinion বা recommendation দেওয়া (Task 2-এর আচরণ); visual-এ না থাকা কারণ অনুমান করা; paraphrase না করে প্রশ্নটা copy করা; overview একেবারেই ভুলে যাওয়া; আর গুরুত্বপূর্ণ figure বেছে নেওয়ার বদলে প্রতিটা সংখ্যা report করার চেষ্টা করা।',
          },
        ],
      },
    },
    {
      id: 'readiness',
      kind: 'review',
      title: { en: 'Ready to write', bn: 'লেখার জন্য প্রস্তুত' },
      trainerMessage: {
        en: "You now know what Task 1 actually asks for, how Introduction, Overview and Body work together, and how to paraphrase a question accurately. Next, you'll write just the introduction for a new Task 1 question — nothing else. Keep it short, accurate, and completely free of opinion, figures or causes; that belongs to later lessons.",
        bn: 'এখন তুমি জানো Task 1 আসলে কী চায়, Introduction, Overview আর Body কীভাবে একসাথে কাজ করে, আর কীভাবে একটা প্রশ্ন নির্ভুলভাবে paraphrase করতে হয়। এরপর, তুমি শুধু একটা নতুন Task 1 প্রশ্নের introduction লিখবে — আর কিছু না। এটা ছোট, সঠিক, আর opinion, figure বা কারণ থেকে সম্পূর্ণ মুক্ত রাখো; সেগুলো পরের lesson-এ আসবে।',
      },
    },
  ],
  finalPrompt: {
    title: { en: 'Write an accurate introduction', bn: 'একটা সঠিক introduction লেখো' },
    instructions: {
      en: 'Here is a new Task 1 question: "The graphs below show the average monthly temperature and rainfall in two cities over one year." Write ONLY the introduction — one or two sentences that paraphrase this question accurately. Keep every key fact unchanged (both cities, both measurements — temperature and rainfall — and the one-year period) while changing the wording and structure. Do not add an overview, any figures, or any opinion; those come in later lessons.',
      bn: 'এখানে একটা নতুন Task 1 প্রশ্ন দেওয়া হলো: "The graphs below show the average monthly temperature and rainfall in two cities over one year." শুধু introduction-টা লেখো — এক বা দুইটা বাক্য যা এই প্রশ্নটা নির্ভুলভাবে paraphrase করে। প্রতিটা key fact অপরিবর্তিত রাখো (দুইটা শহর, দুইটা measurement — temperature আর rainfall — আর এক বছরের সময়কাল) আর একইসাথে শব্দ ও structure বদলাও। কোনো overview, figure, বা opinion যোগ করো না; সেগুলো পরের lesson-এ আসবে।',
    },
    minWords: 20,
    skillFocus: 'Paraphrasing accuracy for a Task 1 introduction',
    checkScope: 'introduction-only',
  },
};
