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
  title: 'Writing an Accurate Task 1 Introduction',
  objective:
    'Identify the essential information in a Task 1 question, change its wording and sentence structure naturally, and write a concise, accurate introduction in your own words — without omitting, distorting or inventing information.',
  estMinutes: 22,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: 'Welcome: Your Introduction Has One Job',
      trainerMessage:
        "Hi! Welcome to Lesson 03. In our previous lessons, you learned what IELTS Academic Writing Task 1 requires and how to understand the information presented in a chart. Today, we are going to focus on one specific skill: writing an accurate introduction. Many students think that writing an introduction means replacing words from the question with synonyms. That is not enough. Your real job is to communicate the same information in a different and natural way. By the end of this lesson, you should be able to look at a Task 1 question, understand its important details, and write your own introduction without changing its meaning. Let's begin.",
      material: {
        type: 'text',
        paragraphs: [
          'An IELTS Academic Task 1 introduction usually performs one main function: it introduces the visual by accurately paraphrasing the question.',
          'It does not need to explain the main trends, describe individual figures, give opinions, or discuss possible reasons.',
          'Those are different tasks, and we will study them in their appropriate lessons.',
        ],
      },
    },
    {
      id: 'introduction-purpose',
      kind: 'explain',
      title: 'What Does an Introduction Actually Do?',
      trainerMessage:
        'Before learning how to write an introduction, understand why it exists. Imagine that someone has not seen the question. Your introduction should tell that reader what the visual presents. It should establish the subject, measurement, categories or groups, and relevant time or location. It should not try to tell the whole story of the chart.',
      material: {
        type: 'text',
        paragraphs: [
          'A Task 1 introduction generally identifies the following information when it is provided:',
          '1. Visual type: Is it a bar chart, line graph, pie chart, table, map, or process diagram?',
          '2. Subject: What is the visual about?',
          '3. Measurement: What is being measured?',
          '4. Groups or categories: Which people, places, products, or categories are involved?',
          '5. Time: Which year, years, or period are covered?',
          '6. Location: Which country, city, or place is mentioned?',
          'Not every question contains all six elements. Your responsibility is to preserve the information that the question actually provides.',
          'Example question: "The bar chart below shows the percentage of commuters using different methods of transport in a city in 2010 and 2023."',
          'A suitable introduction: "The bar chart compares the proportions of commuters travelling by different forms of transport in one city in 2010 and 2023."',
          'Notice that the introduction tells the reader what the chart presents without discussing which method increased or decreased.',
        ],
      },
    },
    {
      id: 'break-down-question',
      kind: 'explain',
      title: 'Break the Question into Essential Information',
      trainerMessage:
        'This is the first practical skill you need. Do not start paraphrasing immediately after reading the question. First, identify its essential information. If you do not understand what the original sentence means, you cannot reliably rewrite it.',
      material: {
        type: 'text',
        paragraphs: [
          'Question: "The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023."',
          'Information map: Visual type → bar chart. Subject → commuting methods. Measurement → percentage. Population → commuters. Categories → five transport methods. Location → one city. Time → 2010 and 2023.',
          'These are the facts that your introduction must preserve. You may change how you express them, but you cannot change what they mean.',
          'Safe changes: percentage → proportion (generally safe in this context). Methods of transport → forms of transport (safe). Commuters using transport → commuters travelling by transport (natural). 2010 and 2023 → 2010 and 2023 (unchanged).',
          'Inaccurate changes: percentage → number. One city → two cities. Five methods → several countries. 2010 and 2023 → 2000 and 2023.',
          'Key rule: before changing words, understand the information.',
        ],
      },
    },
    {
      id: 'real-paraphrase',
      kind: 'demonstrate',
      title: 'What Is a Real Paraphrase?',
      trainerMessage:
        'Now let\'s understand paraphrasing properly. A paraphrase is not simply a sentence containing different words. It is a sentence that communicates the same meaning using different wording and, where appropriate, a different grammatical structure. A strong paraphrase often changes both vocabulary and sentence structure naturally. The original sentence is: "The chart below shows the percentage of commuters using different methods of transport."',
      material: {
        type: 'examples',
        weak: 'The chart below illustrates the percentage of commuters using different methods of transport.',
        good: 'The chart compares the proportions of commuters travelling by different forms of transport.',
        note: 'The weak paraphrase changes only one word. The sentence structure and almost all the original wording remain identical. The better paraphrase changes "shows" to "compares", "percentage" to "proportions", "using" to "travelling by" and "methods of transport" to "forms of transport", and the sentence reads more naturally. However, not every word needs to be changed. Some words, names, dates, technical terms and measurements should remain unchanged when changing them would damage accuracy. Key rule: a paraphrase is judged by accuracy and natural expression, not by how many synonyms it contains.',
      },
    },
    {
      id: 'safe-techniques',
      kind: 'explain',
      title: 'Learn the Safest Paraphrasing Techniques',
      trainerMessage:
        'You do not need complicated vocabulary to paraphrase well. Start with reliable transformations. There are several ways to change a sentence naturally.',
      material: {
        type: 'vocab',
        items: [
          {
            phrase: 'Technique 1 — Safe vocabulary replacement',
            use: 'Original: "The graph shows the number of visitors." Paraphrase: "The graph illustrates the number of visitors." Depending on context: shows → illustrates / presents; percentage → proportion; method → means; people → individuals; use → usage; increase → rise. A synonym is safe only when it preserves the intended meaning and grammatical use.',
          },
          {
            phrase: 'Technique 2 — Change the grammatical structure',
            use: 'Original: "The chart shows how people travelled to work." Paraphrase: "The chart illustrates the methods of travel used by commuters." The original clause has been reorganised into a noun-based structure.',
          },
          {
            phrase: 'Technique 3 — Use a natural alternative expression',
            use: 'Original: "The percentage of people who used bicycles." Paraphrase: "The proportion of people travelling by bicycle." The expression changes without changing the underlying information.',
          },
          {
            phrase: 'Technique 4 — Change the sentence opening',
            use: 'Original: "The diagram below illustrates the stages of producing chocolate." Paraphrase: "The process diagram presents the stages involved in chocolate production." A natural change of sentence structure and vocabulary.',
          },
          {
            phrase: 'Warning',
            use: 'Do not force a grammatical transformation just to make a sentence look different. A simple and accurate sentence is better than a complicated and incorrect one.',
          },
        ],
      },
    },
    {
      id: 'safe-synonyms',
      kind: 'explain',
      title: 'Synonyms: Which Changes Are Safe?',
      trainerMessage:
        'Students often make a serious mistake here. They learn a list of synonyms and try to use them everywhere. But words that look similar in a dictionary may not have the same meaning in a particular question. Let\'s examine the difference between a safe synonym and an inaccurate substitution. Key rule: never choose a synonym just because it sounds more academic. Choose it because it means the same thing in that sentence.',
      material: {
        type: 'vocab',
        items: [
          { phrase: 'shows → illustrates', use: 'Usually safe.' },
          { phrase: 'percentage → proportion', use: 'Usually safe.' },
          { phrase: 'methods of transport → forms of transport', use: 'Safe.' },
          { phrase: 'number of people → amount of people', use: 'Incorrect usage: "number" goes with countable nouns such as people.' },
          { phrase: 'people → population', use: 'Not always equivalent.' },
          { phrase: 'visitors → tourists', use: 'Not always equivalent.' },
          { phrase: 'cost → value', use: 'Not always equivalent.' },
          { phrase: 'increased → improved', use: 'Changes meaning.' },
          { phrase: 'remained stable → remained popular', use: 'Changes meaning.' },
          {
            phrase: 'Accurate paraphrase',
            use: 'Original: "The table shows the number of visitors to four museums." Accurate: "The table presents visitor numbers for four museums."',
          },
          {
            phrase: 'Inaccurate paraphrase',
            use: 'Inaccurate: "The table illustrates the popularity of four tourist attractions." The original reports visitor numbers. It does not directly measure popularity, and it does not necessarily identify the museums as tourist attractions.',
          },
        ],
      },
    },
    {
      id: 'preserve-meaning',
      kind: 'explain',
      title: 'Preserve the Original Meaning',
      trainerMessage:
        'This is one of the most important parts of today\'s lesson. A sentence can look completely different from the original and still be a poor paraphrase. Why? Because it may have lost information or introduced something that the question never said. Let\'s learn how to detect those problems.',
      material: {
        type: 'text',
        paragraphs: [
          'Original question: "The line graph shows the percentage of electricity generated from renewable sources in three countries between 2000 and 2020."',
          'Error A — Information omitted: "The line graph illustrates renewable electricity generation." The sentence omits the three countries and the 2000–2020 period.',
          'Error B — Measurement changed: "The line graph compares the amount of renewable electricity generated in three countries." The original measures a percentage, not an absolute amount of electricity.',
          'Error C — Unsupported information added: "The line graph shows how government policies improved renewable electricity production in three countries." The question does not mention government policies or prove that they caused any improvement.',
          'Error D — Incorrect time information: "The line graph compares renewable electricity generation in three countries from 2010 to 2020." The starting year has been changed from 2000 to 2010.',
          'Error E — Topic changed: "The line graph compares electricity consumption in three countries." The original is about electricity generation from renewable sources, not electricity consumption.',
          'The three-part meaning check. Before accepting your paraphrase, ask: 1. Did I preserve all essential information? 2. Did I change or distort any information? 3. Did I add anything that the question did not state?',
          'If the answer to the first question is yes, and the answers to the other two are no, your paraphrase is likely accurate.',
        ],
      },
    },
    {
      id: 'grammar-structure',
      kind: 'explain',
      title: 'Grammar and Sentence Structure',
      trainerMessage:
        'Good paraphrasing also requires grammatical control. You may know the right vocabulary but still produce an inaccurate sentence if the grammar is wrong. Let\'s look at some common transformations.',
      material: {
        type: 'text',
        paragraphs: [
          'Example 1 — Active to passive. Original: "The diagram shows how workers produce glass bottles." Alternative: "The process diagram illustrates how glass bottles are produced." The subject and grammatical focus have changed, but the meaning remains the same.',
          'Example 2 — Verb phrase to noun phrase. Original: "The chart shows how people travelled to work." Alternative: "The chart compares commuting methods." The second sentence is more concise, but be careful: it may omit information if the original also specifies a location, period, or measurement.',
          'Example 3 — Clause to noun phrase. Original: "The table shows how many students enrolled in each course." Alternative: "The table presents student enrolment figures for each course." This is a natural grammatical transformation.',
          'Example 4 — Singular and plural accuracy. Original: "The graph compares two cities." Incorrect: "The graph compares two city." Correct: "The graph compares two cities."',
          'Example 5 — Preposition accuracy. Natural: "The chart compares the figures for 2010 and 2023." Natural: "The chart shows changes between 2010 and 2023." But be careful with: "The chart compares the figures between 2010 until 2023." This is grammatically incorrect.',
          'Key rule: do not sacrifice grammatical accuracy for sentence variety.',
        ],
      },
    },
    {
      id: 'intro-vs-overview',
      kind: 'demonstrate',
      title: 'Introduction or Overview? Know the Difference',
      trainerMessage:
        'A common Task 1 mistake is writing the overview inside the introduction. These two sections have different responsibilities. Your introduction tells the reader what the visual presents. Your overview tells the reader what the most important features are. The question is: "The bar chart shows the percentage of commuters using five methods of transport in a city in 2010 and 2023."',
      material: {
        type: 'examples',
        good: 'The bar chart compares the proportions of commuters travelling by five different forms of transport in one city in 2010 and 2023.',
        weak: 'The bar chart compares commuting methods, and car use declined while bicycle use increased substantially.',
        note: 'The good introduction identifies the subject and measurement. The weak one mixes the introduction\'s job with the overview\'s job. An overview would be a separate sentence such as: "Overall, car use remained the most common method despite declining, while bicycle use increased substantially." Remember — Introduction: what does the visual show? Overview: what are the main features? Body: what specific figures and comparisons support those features? Do not write an overview when the task is to write only an introduction.',
      },
    },
    {
      id: 'visual-types',
      kind: 'explain',
      title: 'Different Visual Types, Different Introductions',
      trainerMessage:
        'Not every IELTS Academic Task 1 question is a bar chart. You may receive a table, line graph, pie chart, map, or process diagram. The same paraphrasing principles apply, but the information you preserve depends on the visual. Let\'s examine some examples.',
      material: {
        type: 'vocab',
        items: [
          {
            phrase: 'A. Line graph',
            use: 'Question: "The line graph shows the percentage of renewable electricity generated in three countries between 2000 and 2020." Introduction: "The line graph illustrates the proportion of electricity produced from renewable sources in three countries from 2000 to 2020."',
          },
          {
            phrase: 'B. Table',
            use: 'Question: "The table gives information about the number of visitors to four museums in 2015 and 2023." Introduction: "The table presents visitor numbers for four museums in 2015 and 2023."',
          },
          {
            phrase: 'C. Pie chart',
            use: 'Question: "The pie charts show how household spending was distributed across six categories in 2020." Introduction: "The pie charts illustrate the distribution of household expenditure among six categories in 2020."',
          },
          {
            phrase: 'D. Map',
            use: 'Question: "The maps show changes to a town centre between 1990 and 2020." Introduction: "The maps compare the layout of a town centre in 1990 and 2020."',
          },
          {
            phrase: 'E. Process diagram',
            use: 'Question: "The diagram illustrates how plastic bottles are recycled." Introduction: "The process diagram presents the stages involved in recycling plastic bottles."',
          },
          {
            phrase: 'Important distinction',
            use: 'For a process diagram, preserve the process and the subject. For a map, preserve the place and the relevant dates. For charts and tables, preserve the measurement, groups, and time information. Never use the same mechanical template for every visual.',
          },
        ],
      },
    },
    {
      id: 'worked-demonstration',
      kind: 'demonstrate',
      title: 'Demonstration: From Question to Accurate Introduction',
      trainerMessage:
        'Now let\'s put the techniques together. I will show you how an accurate introduction is developed from the original question. Do not memorise the final sentence. Understand the decisions behind it.',
      material: {
        type: 'text',
        paragraphs: [
          'Original question: "The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023."',
          'Stage 1 — Understand the question. Visual: bar chart. Subject: commuting methods. Measurement: percentage. Population: commuters. Categories: five transport methods. Location: one city. Years: 2010 and 2023.',
          'Stage 2 — Identify safe alternatives. shows → compares. percentage → proportion. using → travelling by. methods of transport → forms of transport.',
          'Stage 3 — Build a new sentence: "The bar chart compares the proportions of commuters travelling by five different forms of transport in one city in 2010 and 2023."',
          'Stage 4 — Check accuracy. Bar chart preserved? Yes. Percentage/proportion preserved? Yes. Commuters preserved? Yes. Five methods preserved? Yes. One city preserved? Yes. Both years preserved? Yes. Extra information added? No. Main trend included? No.',
          'Final result: the introduction is accurate, concise, and naturally paraphrased.',
        ],
      },
    },
    // Step 12 of the lesson is four questions. A LessonStep carries exactly one
    // CheckQuestion and the runner renders one per step, so the clinic is four
    // consecutive check steps rather than a new schema field.
    {
      id: 'paraphrasing-clinic',
      kind: 'check',
      title: 'Misreading and Paraphrasing Clinic (1 of 4)',
      trainerMessage:
        "Let's test whether you can identify the mistakes that make an introduction inaccurate. Read each question carefully. The original question is: \"The chart shows the percentage of households with internet access in three countries.\"",
      check: {
        prompt: 'Which paraphrase preserves the measurement correctly?',
        options: [
          'The chart compares the number of households with internet access in three countries.',
          'The chart illustrates the proportion of households with internet access in three countries.',
          'The chart shows how many people use the internet worldwide.',
          'The chart compares internet prices in three countries.',
        ],
        correctIndex: 1,
        explain:
          '"Percentage" and "proportion" can express the same measurement in this context. The other options change the measurement, population, or topic.',
      },
    },
    {
      id: 'paraphrasing-clinic-2',
      kind: 'check',
      title: 'Misreading and Paraphrasing Clinic (2 of 4)',
      trainerMessage:
        'Next, decide what has to stay the same. The original question is: "The table shows the number of international students at five universities in 2020 and 2023."',
      check: {
        prompt: 'Which information must be preserved?',
        options: [
          'Five universities and the two years.',
          'Five countries and the two years.',
          'Five universities and the number of courses.',
          'The opinions of international students.',
        ],
        correctIndex: 0,
        explain:
          'The question identifies five universities and two years. Replacing universities with countries or adding courses changes the original information.',
      },
    },
    {
      id: 'paraphrasing-clinic-3',
      kind: 'check',
      title: 'Misreading and Paraphrasing Clinic (3 of 4)',
      trainerMessage:
        'Now look for added information. A student writes: "The line graph shows how government investment caused renewable energy production to increase." The original question only says: "The line graph shows the percentage of electricity generated from renewable sources in three countries."',
      check: {
        prompt: 'What is the main problem?',
        options: [
          'The sentence is too short.',
          'The student has added an unsupported cause.',
          'The student has used the present tense.',
          'The student has changed a noun into a verb.',
        ],
        correctIndex: 1,
        explain:
          'The original question does not mention government investment or establish a cause. A Task 1 introduction must not invent explanations.',
      },
    },
    {
      id: 'paraphrasing-clinic-4',
      kind: 'check',
      title: 'Misreading and Paraphrasing Clinic (4 of 4)',
      trainerMessage: 'Last one. The original is: "The maps show changes to a town centre between 1990 and 2020."',
      check: {
        prompt: 'Which introduction is best?',
        options: [
          'The maps compare the layout of a town centre in 1990 and 2020.',
          'The maps explain why the town centre became more popular.',
          'The maps show the number of people living in the town.',
          'The maps compare two different countries in 2020.',
        ],
        correctIndex: 0,
        explain:
          'It preserves the subject, visual purpose, location, and dates without adding unsupported information.',
      },
    },
    {
      id: 'introduction-checklist',
      kind: 'review',
      title: 'Your Introduction Writing Checklist',
      trainerMessage:
        'Before writing your introduction in an IELTS exam, use this checklist. You do not need a complicated introduction. You need an accurate one.',
      material: {
        type: 'text',
        paragraphs: [
          'Accuracy checklist: Did I identify the correct visual type? Did I preserve the main subject? Did I preserve the measurement or unit? Did I preserve the relevant categories or groups? Did I preserve the correct dates or period? Did I preserve the location, if provided? Did I avoid changing the meaning through inaccurate synonyms? Did I avoid adding information that was not in the question?',
          'Writing checklist: Did I use my own natural sentence structure? Did I change enough wording to create a genuine paraphrase? Is the grammar correct? Is the sentence concise? Did I avoid copying the entire question? Did I avoid including the overview? Did I avoid personal opinions and unsupported explanations?',
          'Final reminder: a simple, accurate introduction is better than an unnecessarily complicated sentence containing inaccurate vocabulary.',
        ],
      },
    },
    {
      id: 'independent-practice',
      kind: 'independent',
      title: 'Final Independent Practice',
      trainerMessage:
        'You have learned how to identify the important information, choose safe vocabulary, change sentence structures, and preserve the original meaning. Now it is your turn. You will receive a Task 1 question. Write only its introduction. Do not write the overview or body paragraphs. Take your time and focus on accuracy.',
      material: {
        type: 'text',
        paragraphs: [
          'Task 1 question: "The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant."',
          'Write one concise introduction that: 1. Identifies the bar chart. 2. Preserves the commuting subject. 3. Preserves the percentage measurement. 4. Preserves the five transport methods. 5. Preserves the city context. 6. Preserves both years. 7. Uses natural paraphrasing. 8. Does not include an overview, data comparisons, opinions, or explanations.',
          'Do not write a complete Task 1 response. Only write the introduction.',
        ],
      },
    },
  ],
  finalPrompt: {
    title: 'Write an Accurate Introduction',
    instructions:
      'Write ONE concise introduction for the provided IELTS Academic Task 1 question: "The bar chart below shows the percentage of commuters using five different methods of transport in a city in 2010 and 2023." Your introduction must accurately paraphrase the question. Preserve the visual type, subject, percentage measurement, five transport methods, city context, and both years. Change the wording and sentence structure naturally. Do not add an overview, individual figures, personal opinions, or unsupported explanations. Write only the introduction.',
    minWords: 18,
    chartId: 'commute-methods',
    skillFocus: 'Task 1 introduction paraphrasing accuracy',
    checkScope: 'introduction-only',
  },
};
