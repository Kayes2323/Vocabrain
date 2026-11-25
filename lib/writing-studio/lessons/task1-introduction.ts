import type { Lesson } from '../types';

/**
 * Task 1 Academy — Module 3 ("Introduction Writing"). One narrow skill:
 * writing an accurate introduction by paraphrasing the question — identify
 * its essential information first, change wording and structure naturally,
 * and never change, drop or add information. Accuracy comes before
 * vocabulary variety. The closing exercise is an introduction-only skill
 * drill (skillFocus + checkScope), so it never produces or stores a full
 * IELTS Task 1 band.
 *
 * The worked question throughout is the 'commute-methods' bar chart
 * (percentage of commuters, five methods, one city, 2010 and 2023);
 * scripts/test-task1-introduction.ts checks every example against it.
 */
export const task1IntroductionLesson: Lesson = {
  id: 'task1-introduction',
  task: 'task1',
  moduleId: 'task1-m3',
  title: { en: 'Writing an Accurate Task 1 Introduction', bn: 'একটা সঠিক Task 1 Introduction লেখা' },
  objective: {
    en: 'Identify the essential information in a Task 1 question, change its wording and sentence structure naturally, and write a concise, accurate introduction in your own words — without omitting, distorting or inventing information.',
    bn: 'Task 1 প্রশ্নের গুরুত্বপূর্ণ তথ্যগুলো চিহ্নিত করা, স্বাভাবিকভাবে তার শব্দ আর বাক্য গঠন পাল্টানো, আর নিজের ভাষায় একটা সংক্ষিপ্ত, সঠিক introduction লেখা — কোনো তথ্য বাদ না দিয়ে, না বিকৃত করে, না বানিয়ে।',
  },
  estMinutes: 22,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: { en: 'Welcome: Your Introduction Has One Job', bn: 'স্বাগতম: তোমার Introduction-এর একটাই কাজ' },
      trainerMessage: {
        en: "Hi! Welcome to Lesson 03. In our previous lessons, you learned what IELTS Academic Writing Task 1 requires and how to understand the information presented in a chart. Today, we are going to focus on one specific skill: writing an accurate introduction. Many students think that writing an introduction means replacing words from the question with synonyms. That is not enough. Your real job is to communicate the same information in a different and natural way. By the end of this lesson, you should be able to look at a Task 1 question, understand its important details, and write your own introduction without changing its meaning. Let's begin.",
        bn: 'হাই! Lesson 03-এ স্বাগতম। আগের lesson-গুলোতে তুমি শিখেছ IELTS Academic Writing Task 1 আসলে কী চায়, আর একটা chart-এ দেওয়া তথ্য কীভাবে বুঝতে হয়। আজ আমরা একটা নির্দিষ্ট skill-এর ওপর focus করব: একটা সঠিক introduction লেখা। অনেক student মনে করে introduction লেখা মানে প্রশ্নের শব্দগুলোকে synonym দিয়ে বদলে দেওয়া। কিন্তু এটা যথেষ্ট না। তোমার আসল কাজ হলো একই তথ্য অন্যভাবে, স্বাভাবিকভাবে বলা। এই lesson শেষে, তুমি একটা Task 1 প্রশ্ন দেখেই তার গুরুত্বপূর্ণ তথ্যগুলো বুঝতে পারবে, আর অর্থ না পাল্টেই নিজের মতো করে introduction লিখতে পারবে। চলো শুরু করি।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'An IELTS Academic Task 1 introduction usually performs one main function: it introduces the visual by accurately paraphrasing the question.',
            bn: 'একটা IELTS Academic Task 1 introduction সাধারণত একটাই মূল কাজ করে: এটা প্রশ্নটাকে সঠিকভাবে paraphrase করে visual-টা পরিচয় করিয়ে দেয়।',
          },
          {
            en: 'It does not need to explain the main trends, describe individual figures, give opinions, or discuss possible reasons.',
            bn: 'এটাতে মূল trend ব্যাখ্যা করতে হয় না, আলাদা আলাদা figure describe করতে হয় না, নিজের opinion দিতে হয় না, বা সম্ভাব্য কারণ নিয়ে আলোচনা করতে হয় না।',
          },
          {
            en: 'Those are different tasks, and we will study them in their appropriate lessons.',
            bn: 'ওইগুলো আলাদা কাজ, আর আমরা সেগুলো তাদের নিজ নিজ lesson-এ শিখব।',
          },
        ],
      },
    },
    {
      id: 'introduction-purpose',
      kind: 'explain',
      title: { en: 'What Does an Introduction Actually Do?', bn: 'Introduction আসলে কী করে?' },
      trainerMessage: {
        en: 'Before learning how to write an introduction, understand why it exists. Imagine that someone has not seen the question. Your introduction should tell that reader what the visual presents. It should establish the subject, measurement, categories or groups, and relevant time or location. It should not try to tell the whole story of the chart.',
        bn: 'introduction কীভাবে লিখতে হয় শেখার আগে, বুঝে নাও কেন এটা থাকে। ধরো কেউ প্রশ্নটা দেখেনি। তোমার introduction সেই reader-কে বলবে visual-টা আসলে কী দেখাচ্ছে। এটা subject, measurement, category বা group, আর প্রাসঙ্গিক সময় বা location স্পষ্ট করবে। এটা chart-এর পুরো গল্প বলার চেষ্টা করবে না।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'A Task 1 introduction generally identifies the following information when it is provided:',
            bn: 'একটা Task 1 introduction সাধারণত নিচের তথ্যগুলো চিহ্নিত করে, যদি সেগুলো দেওয়া থাকে:',
          },
          { en: '1. Visual type: Is it a bar chart, line graph, pie chart, table, map, or process diagram?', bn: '১. Visual-এর ধরন: এটা কি bar chart, line graph, pie chart, table, map, নাকি process diagram?' },
          { en: '2. Subject: What is the visual about?', bn: '২. Subject: visual-টা আসলে কী নিয়ে?' },
          { en: '3. Measurement: What is being measured?', bn: '৩. Measurement: কী measure করা হচ্ছে?' },
          { en: '4. Groups or categories: Which people, places, products, or categories are involved?', bn: '৪. Group বা category: কোন মানুষ, জায়গা, product, বা category জড়িত?' },
          { en: '5. Time: Which year, years, or period are covered?', bn: '৫. সময়: কোন বছর, বছরগুলো, বা সময়কাল এখানে আছে?' },
          { en: '6. Location: Which country, city, or place is mentioned?', bn: '৬. Location: কোন দেশ, শহর, বা জায়গার কথা বলা হয়েছে?' },
          {
            en: 'Not every question contains all six elements. Your responsibility is to preserve the information that the question actually provides.',
            bn: 'প্রতিটা প্রশ্নে এই ছয়টা উপাদানই থাকে না। তোমার দায়িত্ব হলো প্রশ্নে যে তথ্য আসলে দেওয়া আছে, সেটা অক্ষত রাখা।',
          },
          {
            en: 'Example question: "The bar chart below shows the percentage of commuters using different methods of transport in a city in 2010 and 2023."',
            bn: 'উদাহরণ প্রশ্ন: "The bar chart below shows the percentage of commuters using different methods of transport in a city in 2010 and 2023."',
          },
          {
            en: 'A suitable introduction: "The bar chart compares the proportions of commuters travelling by different forms of transport in one city in 2010 and 2023."',
            bn: 'একটা উপযুক্ত introduction: "The bar chart compares the proportions of commuters travelling by different forms of transport in one city in 2010 and 2023."',
          },
          {
            en: 'Notice that the introduction tells the reader what the chart presents without discussing which method increased or decreased.',
            bn: 'খেয়াল করো, এই introduction-টা reader-কে বলছে chart-টা কী দেখাচ্ছে — কোন method বেড়েছে বা কমেছে সেটা নিয়ে কিছু বলছে না।',
          },
        ],
      },
    },
    {
      id: 'break-down-question',
      kind: 'explain',
      title: { en: 'Break the Question into Essential Information', bn: 'প্রশ্নকে গুরুত্বপূর্ণ তথ্যে ভেঙে ফেলো' },
      trainerMessage: {
        en: 'This is the first practical skill you need. Do not start paraphrasing immediately after reading the question. First, identify its essential information. If you do not understand what the original sentence means, you cannot reliably rewrite it.',
        bn: 'এটাই তোমার প্রথম practical skill। প্রশ্ন পড়ার সাথে সাথেই paraphrase শুরু করো না। প্রথমে এর গুরুত্বপূর্ণ তথ্যগুলো চিহ্নিত করো। মূল বাক্যটার অর্থ না বুঝলে, তুমি নির্ভরযোগ্যভাবে সেটা নতুন করে লিখতে পারবে না।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Question: "The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023."',
            bn: 'প্রশ্ন: "The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023."',
          },
          {
            en: 'Information map: Visual type → bar chart. Subject → commuting methods. Measurement → percentage. Population → commuters. Categories → five transport methods. Location → one city. Time → 2010 and 2023.',
            bn: 'তথ্যের মানচিত্র: Visual-এর ধরন → bar chart। Subject → commuting methods। Measurement → percentage। Population → commuters। Category → পাঁচটা transport method। Location → একটা city। সময় → 2010 আর 2023।',
          },
          {
            en: 'These are the facts that your introduction must preserve. You may change how you express them, but you cannot change what they mean.',
            bn: 'এগুলোই সেই তথ্য যেগুলো তোমার introduction-এ অক্ষত রাখতেই হবে। তুমি কীভাবে এগুলো express করছ সেটা পাল্টাতে পারো, কিন্তু এর অর্থ পাল্টাতে পারবে না।',
          },
          {
            en: 'Safe changes: percentage → proportion (generally safe in this context). Methods of transport → forms of transport (safe). Commuters using transport → commuters travelling by transport (natural). 2010 and 2023 → 2010 and 2023 (unchanged).',
            bn: 'নিরাপদ পরিবর্তন: percentage → proportion (এই context-এ সাধারণত নিরাপদ)। Methods of transport → forms of transport (নিরাপদ)। Commuters using transport → commuters travelling by transport (স্বাভাবিক)। 2010 and 2023 → 2010 and 2023 (অপরিবর্তিত)।',
          },
          {
            en: 'Inaccurate changes: percentage → number. One city → two cities. Five methods → several countries. 2010 and 2023 → 2000 and 2023.',
            bn: 'ভুল পরিবর্তন: percentage → number। One city → two cities। Five methods → several countries। 2010 and 2023 → 2000 and 2023।',
          },
          { en: 'Key rule: before changing words, understand the information.', bn: 'মূল নিয়ম: শব্দ পাল্টানোর আগে, তথ্যটা বুঝে নাও।' },
        ],
      },
    },
    {
      id: 'real-paraphrase',
      kind: 'demonstrate',
      title: { en: 'What Is a Real Paraphrase?', bn: 'আসল Paraphrase আসলে কী?' },
      trainerMessage: {
        en: 'Now let\'s understand paraphrasing properly. A paraphrase is not simply a sentence containing different words. It is a sentence that communicates the same meaning using different wording and, where appropriate, a different grammatical structure. A strong paraphrase often changes both vocabulary and sentence structure naturally. The original sentence is: "The chart below shows the percentage of commuters using different methods of transport."',
        bn: 'এবার paraphrasing ঠিকভাবে বুঝে নিই। Paraphrase মানে শুধু অন্য শব্দ দিয়ে একটা বাক্য বানানো না। এটা এমন একটা বাক্য যা একই অর্থ অন্য শব্দে, আর প্রয়োজনে অন্য grammatical structure-এ বলে। একটা ভালো paraphrase প্রায়ই vocabulary আর sentence structure — দুটোই স্বাভাবিকভাবে পাল্টায়। মূল বাক্যটা হলো: "The chart below shows the percentage of commuters using different methods of transport."',
      },
      material: {
        type: 'examples',
        weak: 'The chart below illustrates the percentage of commuters using different methods of transport.',
        good: 'The chart compares the proportions of commuters travelling by different forms of transport.',
        note: {
          en: 'The weak paraphrase changes only one word. The sentence structure and almost all the original wording remain identical. The better paraphrase changes "shows" to "compares", "percentage" to "proportions", "using" to "travelling by" and "methods of transport" to "forms of transport", and the sentence reads more naturally. However, not every word needs to be changed. Some words, names, dates, technical terms and measurements should remain unchanged when changing them would damage accuracy. Key rule: a paraphrase is judged by accuracy and natural expression, not by how many synonyms it contains.',
          bn: 'দুর্বল paraphrase-টা মাত্র একটা শব্দ পাল্টেছে। বাক্যের গঠন আর প্রায় সব মূল শব্দ একই থেকে গেছে। ভালো paraphrase-টা "shows" কে "compares", "percentage" কে "proportions", "using" কে "travelling by" আর "methods of transport" কে "forms of transport" করে দিয়েছে, আর বাক্যটা অনেক বেশি স্বাভাবিক লাগছে। তবে সব শব্দ পাল্টানোর দরকার নেই। কিছু শব্দ, নাম, তারিখ, technical term আর measurement অপরিবর্তিত থাকা উচিত, যদি সেগুলো পাল্টালে accuracy নষ্ট হয়। মূল নিয়ম: একটা paraphrase বিচার করা হয় accuracy আর স্বাভাবিক expression দিয়ে, কতগুলো synonym আছে তা দিয়ে না।',
        },
      },
    },
    {
      id: 'safe-techniques',
      kind: 'explain',
      title: { en: 'Learn the Safest Paraphrasing Techniques', bn: 'সবচেয়ে নিরাপদ Paraphrasing Technique শেখো' },
      trainerMessage: {
        en: 'You do not need complicated vocabulary to paraphrase well. Start with reliable transformations. There are several ways to change a sentence naturally.',
        bn: 'ভালো paraphrase করতে জটিল vocabulary লাগে না। নির্ভরযোগ্য কিছু পরিবর্তন দিয়ে শুরু করো। একটা বাক্য স্বাভাবিকভাবে পাল্টানোর বেশ কয়েকটা উপায় আছে।',
      },
      material: {
        type: 'vocab',
        items: [
          {
            phrase: 'Technique 1 — Safe vocabulary replacement',
            use: {
              en: 'Original: "The graph shows the number of visitors." Paraphrase: "The graph illustrates the number of visitors." Depending on context: shows → illustrates / presents; percentage → proportion; method → means; people → individuals; use → usage; increase → rise. A synonym is safe only when it preserves the intended meaning and grammatical use.',
              bn: 'মূল: "The graph shows the number of visitors." Paraphrase: "The graph illustrates the number of visitors." Context অনুযায়ী: shows → illustrates / presents; percentage → proportion; method → means; people → individuals; use → usage; increase → rise। একটা synonym তখনই নিরাপদ, যখন এটা মূল অর্থ আর grammatical use ঠিক রাখে।',
            },
          },
          {
            phrase: 'Technique 2 — Change the grammatical structure',
            use: {
              en: 'Original: "The chart shows how people travelled to work." Paraphrase: "The chart illustrates the methods of travel used by commuters." The original clause has been reorganised into a noun-based structure.',
              bn: 'মূল: "The chart shows how people travelled to work." Paraphrase: "The chart illustrates the methods of travel used by commuters." মূল clause-টাকে noun-ভিত্তিক গঠনে পুনর্বিন্যাস করা হয়েছে।',
            },
          },
          {
            phrase: 'Technique 3 — Use a natural alternative expression',
            use: {
              en: 'Original: "The percentage of people who used bicycles." Paraphrase: "The proportion of people travelling by bicycle." The expression changes without changing the underlying information.',
              bn: 'মূল: "The percentage of people who used bicycles." Paraphrase: "The proportion of people travelling by bicycle." expression পাল্টেছে, কিন্তু আসল তথ্য একই আছে।',
            },
          },
          {
            phrase: 'Technique 4 — Change the sentence opening',
            use: {
              en: 'Original: "The diagram below illustrates the stages of producing chocolate." Paraphrase: "The process diagram presents the stages involved in chocolate production." A natural change of sentence structure and vocabulary.',
              bn: 'মূল: "The diagram below illustrates the stages of producing chocolate." Paraphrase: "The process diagram presents the stages involved in chocolate production." এটা sentence structure আর vocabulary-র একটা স্বাভাবিক পরিবর্তন।',
            },
          },
          {
            phrase: 'Warning',
            use: {
              en: 'Do not force a grammatical transformation just to make a sentence look different. A simple and accurate sentence is better than a complicated and incorrect one.',
              bn: 'বাক্যটাকে আলাদা দেখানোর জন্যই জোর করে grammatical পরিবর্তন করো না। একটা সহজ, সঠিক বাক্য একটা জটিল, ভুল বাক্যের চেয়ে ভালো।',
            },
          },
        ],
      },
    },
    {
      id: 'safe-synonyms',
      kind: 'explain',
      title: { en: 'Synonyms: Which Changes Are Safe?', bn: 'Synonym: কোন পরিবর্তনগুলো নিরাপদ?' },
      trainerMessage: {
        en: 'Students often make a serious mistake here. They learn a list of synonyms and try to use them everywhere. But words that look similar in a dictionary may not have the same meaning in a particular question. Let\'s examine the difference between a safe synonym and an inaccurate substitution. Key rule: never choose a synonym just because it sounds more academic. Choose it because it means the same thing in that sentence.',
        bn: 'এখানে student-রা প্রায়ই একটা বড় ভুল করে। তারা synonym-এর একটা তালিকা শিখে সেগুলো সব জায়গায় ব্যবহার করার চেষ্টা করে। কিন্তু dictionary-তে একই রকম দেখতে শব্দগুলো একটা নির্দিষ্ট প্রশ্নে একই অর্থ নাও বহন করতে পারে। চলো দেখি একটা নিরাপদ synonym আর একটা ভুল substitution-এর মধ্যে পার্থক্য কী। মূল নিয়ম: শুধু academic শোনাচ্ছে বলে কখনো কোনো synonym বেছে নিও না। সেই বাক্যে একই অর্থ বহন করে বলে বেছে নাও।',
      },
      material: {
        type: 'vocab',
        items: [
          { phrase: 'shows → illustrates', use: { en: 'Usually safe.', bn: 'সাধারণত নিরাপদ।' } },
          { phrase: 'percentage → proportion', use: { en: 'Usually safe.', bn: 'সাধারণত নিরাপদ।' } },
          { phrase: 'methods of transport → forms of transport', use: { en: 'Safe.', bn: 'নিরাপদ।' } },
          {
            phrase: 'number of people → amount of people',
            use: { en: 'Incorrect usage: "number" goes with countable nouns such as people.', bn: 'ভুল ব্যবহার: "number" countable noun-এর সাথে যায়, যেমন people।' },
          },
          { phrase: 'people → population', use: { en: 'Not always equivalent.', bn: 'সবসময় সমতুল্য না।' } },
          { phrase: 'visitors → tourists', use: { en: 'Not always equivalent.', bn: 'সবসময় সমতুল্য না।' } },
          { phrase: 'cost → value', use: { en: 'Not always equivalent.', bn: 'সবসময় সমতুল্য না।' } },
          { phrase: 'increased → improved', use: { en: 'Changes meaning.', bn: 'অর্থ পাল্টে দেয়।' } },
          { phrase: 'remained stable → remained popular', use: { en: 'Changes meaning.', bn: 'অর্থ পাল্টে দেয়।' } },
          {
            phrase: 'Accurate paraphrase',
            use: {
              en: 'Original: "The table shows the number of visitors to four museums." Accurate: "The table presents visitor numbers for four museums."',
              bn: 'মূল: "The table shows the number of visitors to four museums." সঠিক: "The table presents visitor numbers for four museums."',
            },
          },
          {
            phrase: 'Inaccurate paraphrase',
            use: {
              en: 'Inaccurate: "The table illustrates the popularity of four tourist attractions." The original reports visitor numbers. It does not directly measure popularity, and it does not necessarily identify the museums as tourist attractions.',
              bn: 'ভুল: "The table illustrates the popularity of four tourist attractions." মূল বাক্যটা visitor-এর সংখ্যা জানাচ্ছে। এটা সরাসরি popularity measure করছে না, আর museum-গুলোকে tourist attraction হিসেবেও নিশ্চিতভাবে চিহ্নিত করছে না।',
            },
          },
        ],
      },
    },
    {
      id: 'preserve-meaning',
      kind: 'explain',
      title: { en: 'Preserve the Original Meaning', bn: 'মূল অর্থ অক্ষত রাখো' },
      trainerMessage: {
        en: 'This is one of the most important parts of today\'s lesson. A sentence can look completely different from the original and still be a poor paraphrase. Why? Because it may have lost information or introduced something that the question never said. Let\'s learn how to detect those problems.',
        bn: 'আজকের lesson-এর সবচেয়ে গুরুত্বপূর্ণ অংশগুলোর একটা এটা। একটা বাক্য মূল বাক্য থেকে সম্পূর্ণ আলাদা দেখাতে পারে, তবুও সেটা একটা দুর্বল paraphrase হতে পারে। কেন? কারণ হয়তো এটা কোনো তথ্য হারিয়েছে, অথবা এমন কিছু যোগ করেছে যা প্রশ্নে কখনো বলা হয়নি। চলো শিখি এই সমস্যাগুলো কীভাবে ধরতে হয়।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Original question: "The line graph shows the percentage of electricity generated from renewable sources in three countries between 2000 and 2020."',
            bn: 'মূল প্রশ্ন: "The line graph shows the percentage of electricity generated from renewable sources in three countries between 2000 and 2020."',
          },
          {
            en: 'Error A — Information omitted: "The line graph illustrates renewable electricity generation." The sentence omits the three countries and the 2000–2020 period.',
            bn: 'ভুল A — তথ্য বাদ পড়েছে: "The line graph illustrates renewable electricity generation." এই বাক্যটা তিনটা দেশ আর 2000–2020 সময়কাল বাদ দিয়েছে।',
          },
          {
            en: 'Error B — Measurement changed: "The line graph compares the amount of renewable electricity generated in three countries." The original measures a percentage, not an absolute amount of electricity.',
            bn: 'ভুল B — Measurement পাল্টে গেছে: "The line graph compares the amount of renewable electricity generated in three countries." মূল বাক্যটা একটা percentage measure করে, electricity-র absolute পরিমাণ না।',
          },
          {
            en: 'Error C — Unsupported information added: "The line graph shows how government policies improved renewable electricity production in three countries." The question does not mention government policies or prove that they caused any improvement.',
            bn: 'ভুল C — সমর্থনহীন তথ্য যোগ করা হয়েছে: "The line graph shows how government policies improved renewable electricity production in three countries." প্রশ্নে government policy-র কথা নেই, আর এটাও প্রমাণ করে না যে এগুলো কোনো উন্নতি ঘটিয়েছে।',
          },
          {
            en: 'Error D — Incorrect time information: "The line graph compares renewable electricity generation in three countries from 2010 to 2020." The starting year has been changed from 2000 to 2010.',
            bn: 'ভুল D — ভুল সময়ের তথ্য: "The line graph compares renewable electricity generation in three countries from 2010 to 2020." শুরুর বছর 2000 থেকে 2010 করে দেওয়া হয়েছে।',
          },
          {
            en: 'Error E — Topic changed: "The line graph compares electricity consumption in three countries." The original is about electricity generation from renewable sources, not electricity consumption.',
            bn: 'ভুল E — বিষয় পাল্টে গেছে: "The line graph compares electricity consumption in three countries." মূল বাক্যটা renewable source থেকে electricity generation নিয়ে, electricity consumption নিয়ে না।',
          },
          {
            en: 'The three-part meaning check. Before accepting your paraphrase, ask: 1. Did I preserve all essential information? 2. Did I change or distort any information? 3. Did I add anything that the question did not state?',
            bn: 'তিন ধাপের অর্থ-যাচাই। তোমার paraphrase গ্রহণ করার আগে জিজ্ঞেস করো: ১. আমি কি সব গুরুত্বপূর্ণ তথ্য অক্ষত রেখেছি? ২. আমি কি কোনো তথ্য পাল্টেছি বা বিকৃত করেছি? ৩. প্রশ্নে বলা হয়নি এমন কিছু কি আমি যোগ করেছি?',
          },
          {
            en: 'If the answer to the first question is yes, and the answers to the other two are no, your paraphrase is likely accurate.',
            bn: 'প্রথম প্রশ্নের উত্তর যদি হ্যাঁ হয়, আর বাকি দুইটার উত্তর যদি না হয়, তাহলে তোমার paraphrase সম্ভবত সঠিক।',
          },
        ],
      },
    },
    {
      id: 'grammar-structure',
      kind: 'explain',
      title: { en: 'Grammar and Sentence Structure', bn: 'Grammar আর বাক্যের গঠন' },
      trainerMessage: {
        en: 'Good paraphrasing also requires grammatical control. You may know the right vocabulary but still produce an inaccurate sentence if the grammar is wrong. Let\'s look at some common transformations.',
        bn: 'ভালো paraphrasing-এর জন্য grammar-ও ঠিকভাবে control করতে হয়। তুমি সঠিক vocabulary জানলেও, grammar ভুল হলে বাক্যটা ভুল হয়ে যেতে পারে। চলো কিছু common পরিবর্তন দেখি।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Example 1 — Keeping the agent while changing the verb. Original: "The diagram shows how workers produce glass bottles." Alternative: "The process diagram illustrates how workers manufacture glass bottles." Here "shows" becomes "illustrates", "produce" becomes the accurate synonym "manufacture", and "diagram" becomes "process diagram". The agent (workers) and the object (glass bottles) are both preserved, so the original meaning is unchanged. A passive version is also possible, but only if it keeps the agent — "glass bottles are produced by workers". Dropping "workers" would omit information that the original states.',
            bn: 'উদাহরণ ১ — verb পাল্টে agent রাখা। মূল: "The diagram shows how workers produce glass bottles." বিকল্প: "The process diagram illustrates how workers manufacture glass bottles." এখানে "shows" হয়ে গেছে "illustrates", "produce" হয়ে গেছে সঠিক synonym "manufacture", আর "diagram" হয়ে গেছে "process diagram"। Agent (workers) আর object (glass bottles) দুটোই অক্ষত আছে, তাই মূল অর্থ পাল্টায়নি। একটা passive version-ও সম্ভব, কিন্তু শুধু তখনই যদি agent-টা থাকে — "glass bottles are produced by workers"। "workers" বাদ দিলে মূল বাক্যের একটা তথ্য বাদ পড়ে যাবে।',
          },
          {
            en: 'Example 2 — Verb phrase to noun phrase. Original: "The chart shows how people travelled to work." Alternative: "The chart compares commuting methods." The second sentence is more concise, but be careful: it may omit information if the original also specifies a location, period, or measurement.',
            bn: 'উদাহরণ ২ — verb phrase থেকে noun phrase। মূল: "The chart shows how people travelled to work." বিকল্প: "The chart compares commuting methods." দ্বিতীয় বাক্যটা বেশি সংক্ষিপ্ত, কিন্তু সাবধান: মূল বাক্যে যদি কোনো location, সময়কাল, বা measurement-ও উল্লেখ থাকে, এটা সেগুলো বাদ দিয়ে ফেলতে পারে।',
          },
          {
            en: 'Example 3 — Clause to noun phrase. Original: "The table shows how many students enrolled in each course." Alternative: "The table presents student enrolment figures for each course." This is a natural grammatical transformation.',
            bn: 'উদাহরণ ৩ — clause থেকে noun phrase। মূল: "The table shows how many students enrolled in each course." বিকল্প: "The table presents student enrolment figures for each course." এটা একটা স্বাভাবিক grammatical পরিবর্তন।',
          },
          {
            en: 'Example 4 — Singular and plural accuracy. Original: "The graph compares two cities." Incorrect: "The graph compares two city." Correct: "The graph compares two cities."',
            bn: 'উদাহরণ ৪ — singular আর plural-এর যথার্থতা। মূল: "The graph compares two cities." ভুল: "The graph compares two city." সঠিক: "The graph compares two cities."',
          },
          {
            en: 'Example 5 — Preposition accuracy. Natural: "The chart compares the figures for 2010 and 2023." Natural: "The chart shows changes between 2010 and 2023." But be careful with: "The chart compares the figures between 2010 until 2023." This is grammatically incorrect.',
            bn: 'উদাহরণ ৫ — preposition-এর যথার্থতা। স্বাভাবিক: "The chart compares the figures for 2010 and 2023." স্বাভাবিক: "The chart shows changes between 2010 and 2023." কিন্তু সাবধান: "The chart compares the figures between 2010 until 2023." এটা grammatically ভুল।',
          },
          { en: 'Key rule: do not sacrifice grammatical accuracy for sentence variety.', bn: 'মূল নিয়ম: বাক্যে বৈচিত্র্য আনার জন্য grammatical accuracy বিসর্জন দিও না।' },
        ],
      },
    },
    {
      id: 'intro-vs-overview',
      kind: 'demonstrate',
      title: { en: 'Introduction or Overview? Know the Difference', bn: 'Introduction নাকি Overview? পার্থক্যটা জেনে রাখো' },
      trainerMessage: {
        en: 'A common Task 1 mistake is writing the overview inside the introduction. These two sections have different responsibilities. Your introduction tells the reader what the visual presents. Your overview tells the reader what the most important features are. The question is: "The bar chart shows the percentage of commuters using five methods of transport in a city in 2010 and 2023."',
        bn: 'Task 1-এ একটা common ভুল হলো introduction-এর ভেতরেই overview লিখে ফেলা। এই দুইটা অংশের দায়িত্ব আলাদা। তোমার introduction reader-কে বলে visual-টা কী দেখাচ্ছে। তোমার overview reader-কে বলে সবচেয়ে গুরুত্বপূর্ণ feature-গুলো কী। প্রশ্নটা হলো: "The bar chart shows the percentage of commuters using five methods of transport in a city in 2010 and 2023."',
      },
      material: {
        type: 'examples',
        good: 'The bar chart compares the proportions of commuters travelling by five different forms of transport in one city in 2010 and 2023.',
        weak: 'The bar chart compares commuting methods, and car use declined while bicycle use increased substantially.',
        note: {
          en: 'The good introduction identifies the subject and measurement. The weak one mixes the introduction\'s job with the overview\'s job. An overview would be a separate sentence such as: "Overall, car use remained the most common method despite declining, while bicycle use increased substantially." Remember — Introduction: what does the visual show? Overview: what are the main features? Body: what specific figures and comparisons support those features? Do not write an overview when the task is to write only an introduction.',
          bn: 'ভালো introduction-টা subject আর measurement চিহ্নিত করে। দুর্বলটা introduction-এর কাজের সাথে overview-এর কাজ মিশিয়ে ফেলেছে। একটা overview হতো একটা আলাদা বাক্য, যেমন: "Overall, car use remained the most common method despite declining, while bicycle use increased substantially." মনে রাখো — Introduction: visual-টা কী দেখাচ্ছে? Overview: মূল feature-গুলো কী? Body: কোন নির্দিষ্ট figure আর comparison ওই feature-গুলোকে support করে? শুধু introduction লেখার কথা থাকলে overview লিখো না।',
        },
      },
    },
    {
      id: 'visual-types',
      kind: 'explain',
      title: { en: 'Different Visual Types, Different Introductions', bn: 'বিভিন্ন Visual Type, বিভিন্ন Introduction' },
      trainerMessage: {
        en: 'Not every IELTS Academic Task 1 question is a bar chart. You may receive a table, line graph, pie chart, map, or process diagram. The same paraphrasing principles apply, but the information you preserve depends on the visual. Let\'s examine some examples.',
        bn: 'প্রতিটা IELTS Academic Task 1 প্রশ্ন bar chart না। তুমি table, line graph, pie chart, map, বা process diagram-ও পেতে পারো। একই paraphrasing নীতি প্রযোজ্য, কিন্তু তুমি কোন তথ্য অক্ষত রাখবে সেটা visual-এর ওপর নির্ভর করে। চলো কিছু উদাহরণ দেখি।',
      },
      material: {
        type: 'vocab',
        items: [
          {
            phrase: 'A. Line graph',
            use: {
              en: 'Question: "The line graph shows the percentage of renewable electricity generated in three countries between 2000 and 2020." Introduction: "The line graph illustrates the proportion of electricity produced from renewable sources in three countries from 2000 to 2020."',
              bn: 'প্রশ্ন: "The line graph shows the percentage of renewable electricity generated in three countries between 2000 and 2020." Introduction: "The line graph illustrates the proportion of electricity produced from renewable sources in three countries from 2000 to 2020."',
            },
          },
          {
            phrase: 'B. Table',
            use: {
              en: 'Question: "The table gives information about the number of visitors to four museums in 2015 and 2023." Introduction: "The table presents visitor numbers for four museums in 2015 and 2023."',
              bn: 'প্রশ্ন: "The table gives information about the number of visitors to four museums in 2015 and 2023." Introduction: "The table presents visitor numbers for four museums in 2015 and 2023."',
            },
          },
          {
            phrase: 'C. Pie chart',
            use: {
              en: 'Question: "The pie charts show how household spending was distributed across six categories in 2020." Introduction: "The pie charts illustrate the distribution of household expenditure among six categories in 2020."',
              bn: 'প্রশ্ন: "The pie charts show how household spending was distributed across six categories in 2020." Introduction: "The pie charts illustrate the distribution of household expenditure among six categories in 2020."',
            },
          },
          {
            phrase: 'D. Map',
            use: {
              en: 'Question: "The maps show changes to a town centre between 1990 and 2020." Introduction: "The maps illustrate how a town centre changed between 1990 and 2020."',
              bn: 'প্রশ্ন: "The maps show changes to a town centre between 1990 and 2020." Introduction: "The maps illustrate how a town centre changed between 1990 and 2020."',
            },
          },
          {
            phrase: 'E. Process diagram',
            use: {
              en: 'Question: "The diagram illustrates how plastic bottles are recycled." Introduction: "The process diagram presents the stages involved in recycling plastic bottles."',
              bn: 'প্রশ্ন: "The diagram illustrates how plastic bottles are recycled." Introduction: "The process diagram presents the stages involved in recycling plastic bottles."',
            },
          },
          {
            phrase: 'Important distinction',
            use: {
              en: 'For a process diagram, preserve the process and the subject. For a map, preserve the place and the relevant dates. For charts and tables, preserve the measurement, groups, and time information. Never use the same mechanical template for every visual.',
              bn: 'process diagram-এর জন্য, process আর subject অক্ষত রাখো। map-এর জন্য, জায়গা আর প্রাসঙ্গিক তারিখ অক্ষত রাখো। chart আর table-এর জন্য, measurement, group, আর সময়ের তথ্য অক্ষত রাখো। সব visual-এর জন্য একই যান্ত্রিক template ব্যবহার করো না।',
            },
          },
        ],
      },
    },
    {
      id: 'worked-demonstration',
      kind: 'demonstrate',
      title: { en: 'Demonstration: From Question to Accurate Introduction', bn: 'Demonstration: প্রশ্ন থেকে একটা সঠিক Introduction' },
      trainerMessage: {
        en: 'Now let\'s put the techniques together. I will show you how an accurate introduction is developed from the original question. Do not memorise the final sentence. Understand the decisions behind it.',
        bn: 'এবার সব technique একসাথে প্রয়োগ করি। আমি দেখাব মূল প্রশ্ন থেকে কীভাবে একটা সঠিক introduction তৈরি হয়। শেষ বাক্যটা মুখস্থ করো না। এর পেছনের সিদ্ধান্তগুলো বুঝে নাও।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Original question: "The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023."',
            bn: 'মূল প্রশ্ন: "The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023."',
          },
          {
            en: 'Stage 1 — Understand the question. Visual: bar chart. Subject: commuting methods. Measurement: percentage. Population: commuters. Categories: five transport methods. Location: one city. Years: 2010 and 2023.',
            bn: 'ধাপ ১ — প্রশ্নটা বুঝো। Visual: bar chart। Subject: commuting methods। Measurement: percentage। Population: commuters। Category: পাঁচটা transport method। Location: একটা city। বছর: 2010 আর 2023।',
          },
          {
            en: 'Stage 2 — Identify safe alternatives. shows → compares. percentage → proportion. using → travelling by. methods of transport → forms of transport.',
            bn: 'ধাপ ২ — নিরাপদ বিকল্প চিহ্নিত করো। shows → compares। percentage → proportion। using → travelling by। methods of transport → forms of transport।',
          },
          {
            en: 'Stage 3 — Build a new sentence: "The bar chart compares the proportions of commuters travelling by five different forms of transport in one city in 2010 and 2023."',
            bn: 'ধাপ ৩ — নতুন বাক্য তৈরি করো: "The bar chart compares the proportions of commuters travelling by five different forms of transport in one city in 2010 and 2023."',
          },
          {
            en: 'Stage 4 — Check accuracy. Bar chart preserved? Yes. Percentage/proportion preserved? Yes. Commuters preserved? Yes. Five methods preserved? Yes. One city preserved? Yes. Both years preserved? Yes. Extra information added? No. Main trend included? No.',
            bn: 'ধাপ ৪ — accuracy চেক করো। Bar chart অক্ষত আছে? হ্যাঁ। Percentage/proportion অক্ষত আছে? হ্যাঁ। Commuters অক্ষত আছে? হ্যাঁ। পাঁচটা method অক্ষত আছে? হ্যাঁ। একটা city অক্ষত আছে? হ্যাঁ। দুই বছরই অক্ষত আছে? হ্যাঁ। অতিরিক্ত তথ্য যোগ হয়েছে? না। মূল trend অন্তর্ভুক্ত হয়েছে? না।',
          },
          { en: 'Final result: the introduction is accurate, concise, and naturally paraphrased.', bn: 'চূড়ান্ত ফলাফল: introduction-টা সঠিক, সংক্ষিপ্ত, আর স্বাভাবিকভাবে paraphrase করা।' },
        ],
      },
    },
    // Step 12 of the lesson is four questions. A LessonStep carries exactly one
    // CheckQuestion and the runner renders one per step, so the clinic is four
    // consecutive check steps rather than a new schema field.
    {
      id: 'paraphrasing-clinic',
      kind: 'check',
      title: { en: 'Misreading and Paraphrasing Clinic (1 of 4)', bn: 'ভুল পড়া আর Paraphrasing Clinic (১/৪)' },
      trainerMessage: {
        en: "Let's test whether you can identify the mistakes that make an introduction inaccurate. Read each question carefully. The original question is: \"The chart shows the percentage of households with internet access in three countries.\"",
        bn: 'চলো দেখি তুমি introduction-কে ভুল করে তোলা ভুলগুলো চিহ্নিত করতে পারো কিনা। প্রতিটা প্রশ্ন ভালোভাবে পড়ো। মূল প্রশ্নটা হলো: "The chart shows the percentage of households with internet access in three countries."',
      },
      check: {
        prompt: { en: 'Which paraphrase preserves the measurement correctly?', bn: 'কোন paraphrase-টা measurement ঠিকভাবে অক্ষত রেখেছে?' },
        options: [
          'The chart compares the number of households with internet access in three countries.',
          'The chart illustrates the proportion of households with internet access in three countries.',
          'The chart shows how many people use the internet worldwide.',
          'The chart compares internet prices in three countries.',
        ],
        correctIndex: 1,
        explain: {
          en: '"Percentage" and "proportion" can express the same measurement in this context. The other options change the measurement, population, or topic.',
          bn: 'এই context-এ "Percentage" আর "proportion" একই measurement বোঝাতে পারে। বাকি option-গুলো measurement, population, বা topic পাল্টে দিয়েছে।',
        },
      },
    },
    {
      id: 'paraphrasing-clinic-2',
      kind: 'check',
      title: { en: 'Misreading and Paraphrasing Clinic (2 of 4)', bn: 'ভুল পড়া আর Paraphrasing Clinic (২/৪)' },
      trainerMessage: {
        en: 'Next, decide what has to stay the same. The original question is: "The table shows the number of international students at five universities in 2020 and 2023."',
        bn: 'এরপর, কী একই রাখতে হবে সেটা ঠিক করো। মূল প্রশ্নটা হলো: "The table shows the number of international students at five universities in 2020 and 2023."',
      },
      check: {
        prompt: { en: 'Which information must be preserved?', bn: 'কোন তথ্যটা অক্ষত রাখতেই হবে?' },
        options: [
          'Five universities and the two years.',
          'Five countries and the two years.',
          'Five universities and the number of courses.',
          'The opinions of international students.',
        ],
        correctIndex: 0,
        explain: {
          en: 'The question identifies five universities and two years. Replacing universities with countries or adding courses changes the original information.',
          bn: 'প্রশ্নটা পাঁচটা university আর দুইটা বছর চিহ্নিত করেছে। university-কে country দিয়ে বদলানো বা course যোগ করা মূল তথ্যটা পাল্টে দেয়।',
        },
      },
    },
    {
      id: 'paraphrasing-clinic-3',
      kind: 'check',
      title: { en: 'Misreading and Paraphrasing Clinic (3 of 4)', bn: 'ভুল পড়া আর Paraphrasing Clinic (৩/৪)' },
      trainerMessage: {
        en: 'Now look for added information. A student writes: "The line graph shows how government investment caused renewable energy production to increase." The original question only says: "The line graph shows the percentage of electricity generated from renewable sources in three countries."',
        bn: 'এবার যোগ করা তথ্য খুঁজে বের করো। একজন student লিখেছে: "The line graph shows how government investment caused renewable energy production to increase." মূল প্রশ্নে শুধু বলা আছে: "The line graph shows the percentage of electricity generated from renewable sources in three countries."',
      },
      check: {
        prompt: { en: 'What is the main problem?', bn: 'মূল সমস্যাটা কী?' },
        options: [
          'The sentence is too short.',
          'The student has added an unsupported cause.',
          'The student has used the present tense.',
          'The student has changed a noun into a verb.',
        ],
        correctIndex: 1,
        explain: {
          en: 'The original question does not mention government investment or establish a cause. A Task 1 introduction must not invent explanations.',
          bn: 'মূল প্রশ্নে government investment-এর কথা নেই, আর কোনো কারণও বলা নেই। একটা Task 1 introduction-এ নিজে থেকে ব্যাখ্যা বানানো যাবে না।',
        },
      },
    },
    {
      id: 'paraphrasing-clinic-4',
      kind: 'check',
      title: { en: 'Misreading and Paraphrasing Clinic (4 of 4)', bn: 'ভুল পড়া আর Paraphrasing Clinic (৪/৪)' },
      trainerMessage: {
        en: 'Last one. The original is: "The maps show changes to a town centre between 1990 and 2020."',
        bn: 'শেষটা। মূল বাক্যটা হলো: "The maps show changes to a town centre between 1990 and 2020."',
      },
      check: {
        prompt: { en: 'Which introduction is best?', bn: 'কোন introduction-টা সবচেয়ে ভালো?' },
        options: [
          'The maps illustrate how a town centre changed between 1990 and 2020.',
          'The maps explain why the town centre became more popular.',
          'The maps show the number of people living in the town.',
          'The maps compare two different countries in 2020.',
        ],
        correctIndex: 0,
        explain: {
          en: 'It preserves the subject (a town centre), the idea of change, and both dates, without narrowing the change to one feature or adding unsupported information.',
          bn: 'এটা subject (একটা town centre), পরিবর্তনের ধারণা, আর দুইটা তারিখ — সব অক্ষত রেখেছে, কোনো একটা feature-এ সীমাবদ্ধ করেনি বা সমর্থনহীন তথ্য যোগ করেনি।',
        },
      },
    },
    {
      id: 'introduction-checklist',
      kind: 'review',
      title: { en: 'Your Introduction Writing Checklist', bn: 'তোমার Introduction লেখার Checklist' },
      trainerMessage: {
        en: 'Before writing your introduction in an IELTS exam, use this checklist. You do not need a complicated introduction. You need an accurate one.',
        bn: 'IELTS exam-এ introduction লেখার আগে এই checklist ব্যবহার করো। তোমার একটা জটিল introduction লাগবে না। তোমার লাগবে একটা সঠিক introduction।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Accuracy checklist: Did I identify the correct visual type? Did I preserve the main subject? Did I preserve the measurement or unit? Did I preserve the relevant categories or groups? Did I preserve the correct dates or period? Did I preserve the location, if provided? Did I avoid changing the meaning through inaccurate synonyms? Did I avoid adding information that was not in the question?',
            bn: 'Accuracy checklist: আমি কি সঠিক visual type চিহ্নিত করেছি? আমি কি মূল subject অক্ষত রেখেছি? আমি কি measurement বা unit অক্ষত রেখেছি? আমি কি প্রাসঙ্গিক category বা group অক্ষত রেখেছি? আমি কি সঠিক তারিখ বা সময়কাল অক্ষত রেখেছি? location দেওয়া থাকলে সেটা কি অক্ষত রেখেছি? ভুল synonym দিয়ে অর্থ পাল্টানো থেকে কি বিরত থেকেছি? প্রশ্নে নেই এমন তথ্য যোগ করা থেকে কি বিরত থেকেছি?',
          },
          {
            en: 'Writing checklist: Did I use my own natural sentence structure? Did I change enough wording to create a genuine paraphrase? Is the grammar correct? Is the sentence concise? Did I avoid copying the entire question? Did I avoid including the overview? Did I avoid personal opinions and unsupported explanations?',
            bn: 'Writing checklist: আমি কি নিজের স্বাভাবিক বাক্য গঠন ব্যবহার করেছি? একটা আসল paraphrase তৈরি করার মতো যথেষ্ট শব্দ কি পাল্টেছি? grammar কি সঠিক? বাক্যটা কি সংক্ষিপ্ত? পুরো প্রশ্ন copy করা থেকে কি বিরত থেকেছি? overview অন্তর্ভুক্ত করা থেকে কি বিরত থেকেছি? ব্যক্তিগত opinion আর সমর্থনহীন ব্যাখ্যা থেকে কি বিরত থেকেছি?',
          },
          {
            en: 'Final reminder: a simple, accurate introduction is better than an unnecessarily complicated sentence containing inaccurate vocabulary.',
            bn: 'শেষ কথা: একটা সহজ, সঠিক introduction একটা অপ্রয়োজনীয়ভাবে জটিল, ভুল vocabulary-ভরা বাক্যের চেয়ে ভালো।',
          },
        ],
      },
    },
    {
      id: 'independent-practice',
      kind: 'independent',
      title: { en: 'Final Independent Practice', bn: 'শেষ Independent Practice' },
      trainerMessage: {
        en: 'You have learned how to identify the important information, choose safe vocabulary, change sentence structures, and preserve the original meaning. Now it is your turn. You will receive a Task 1 question. Write only its introduction. Do not write the overview or body paragraphs. Take your time and focus on accuracy.',
        bn: 'তুমি শিখেছ কীভাবে গুরুত্বপূর্ণ তথ্য চিহ্নিত করতে হয়, নিরাপদ vocabulary বেছে নিতে হয়, বাক্য গঠন পাল্টাতে হয়, আর মূল অর্থ অক্ষত রাখতে হয়। এবার তোমার পালা। তুমি একটা Task 1 প্রশ্ন পাবে। শুধু এর introduction লেখো। overview বা body paragraph লিখো না। সময় নাও আর accuracy-র দিকে মনোযোগ দাও।',
      },
      material: {
        type: 'text',
        paragraphs: [
          {
            en: 'Task 1 question: "The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."',
            bn: 'Task 1 প্রশ্ন: "The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."',
          },
          {
            en: 'Write one concise introduction that: 1. Identifies the bar chart. 2. Preserves the commuting subject. 3. Preserves the percentage measurement. 4. Preserves the five transport methods. 5. Preserves the city context. 6. Preserves both years. 7. Uses natural paraphrasing. 8. Does not include an overview, data comparisons, opinions, or explanations.',
            bn: 'এমন একটা সংক্ষিপ্ত introduction লেখো যেটা: ১. bar chart-টা চিহ্নিত করে। ২. commuting subject-টা অক্ষত রাখে। ৩. percentage measurement অক্ষত রাখে। ৪. পাঁচটা transport method অক্ষত রাখে। ৫. city-র প্রসঙ্গ অক্ষত রাখে। ৬. দুইটা বছরই অক্ষত রাখে। ৭. স্বাভাবিক paraphrasing ব্যবহার করে। ৮. এতে কোনো overview, তথ্যের comparison, opinion, বা ব্যাখ্যা থাকে না।',
          },
          { en: 'Do not write a complete Task 1 response. Only write the introduction.', bn: 'একটা সম্পূর্ণ Task 1 response লিখো না। শুধু introduction-টা লেখো।' },
        ],
      },
    },
  ],
  finalPrompt: {
    title: { en: 'Write an Accurate Introduction', bn: 'একটা সঠিক Introduction লেখো' },
    instructions: {
      en: 'Write ONE concise introduction for the provided IELTS Academic Task 1 question: "The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023." Your introduction must accurately paraphrase the question. Preserve the visual type, subject, percentage measurement, five transport methods, city context, and both years. Change the wording and sentence structure naturally. Do not add an overview, individual figures, personal opinions, or unsupported explanations. Write only the introduction.',
      bn: 'দেওয়া IELTS Academic Task 1 প্রশ্নের জন্য একটা সংক্ষিপ্ত introduction লেখো: "The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023." তোমার introduction-টা প্রশ্নটাকে সঠিকভাবে paraphrase করতে হবে। visual type, subject, percentage measurement, পাঁচটা transport method, city-র প্রসঙ্গ, আর দুইটা বছর — সব অক্ষত রাখো। শব্দ আর বাক্য গঠন স্বাভাবিকভাবে পাল্টাও। কোনো overview, আলাদা figure, ব্যক্তিগত opinion, বা সমর্থনহীন ব্যাখ্যা যোগ করো না। শুধু introduction-টাই লেখো।',
    },
    minWords: 18,
    chartId: 'commute-methods',
    skillFocus: 'Task 1 introduction paraphrasing accuracy',
    checkScope: 'introduction-only',
  },
};
