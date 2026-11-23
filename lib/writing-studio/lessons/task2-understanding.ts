import type { Lesson } from '../types';

/**
 * Task 2 Academy — Module 1 ("Understanding IELTS Writing Task 2"): what Task 2
 * requires, the four assessment criteria, the 250-word / 40-minute constraint,
 * the essay shape, and how to open an essay with an accurate paraphrase and a
 * clear position.
 *
 * Every answer the learner gives here is evaluated by Mino, never left for the
 * learner to compare with a model answer: multiple-choice picks are checked
 * instantly with option-specific explanations (`optionFeedback`), the guided
 * practice is a `write-evaluate` step, and the closing exercise is an
 * introduction-only skill drill evaluated by the Mino Answer Evaluation Engine
 * (`finalPrompt.evaluate`) — a verdict, why, and the next step. It never
 * produces or stores an IELTS band and the 250-word full-essay minimum does
 * not apply to it.
 *
 * Runner notes: a LessonStep carries one CheckQuestion, so the clinic is a
 * teaching step followed by consecutive check steps.
 */
export const task2UnderstandingLesson: Lesson = {
  id: 'task2-understanding',
  task: 'task2',
  moduleId: 'task2-m1',
  title: 'Understanding IELTS Writing Task 2',
  objective:
    'Know what Task 2 requires, how it is marked, and how an essay is shaped — and write an introduction that paraphrases the question accurately and states a clear position.',
  estMinutes: 17,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: 'Welcome to Task 2',
      trainerMessage:
        "Welcome to Task 2. In this lesson, I will help you understand what IELTS examiners actually expect from your essay. You do not need complicated vocabulary to write a good essay. First, you need to understand the question, answer it properly and develop your ideas logically. Let's build that foundation.",
    },
    {
      id: 'what-is-task2',
      kind: 'explain',
      title: 'What Is IELTS Writing Task 2?',
      trainerMessage:
        'IELTS Academic Writing Task 2 asks you to write an essay in response to an argument, opinion, problem, discussion or question. Read these facts, then answer my question about them.',
      material: {
        type: 'text',
        paragraphs: [
          'You have 40 minutes and must write at least 250 words. The question must be answered directly. There are four equally weighted assessment criteria, and Task 2 contributes twice as much as Task 1 to the overall Writing score.',
          'Important distinction: writing 250 words does not automatically produce a good essay. Your ideas must answer the question and be sufficiently developed. Writing fewer than 250 words risks losing marks, because your response may not be adequately developed.',
        ],
      },
      check: {
        prompt: 'Which matters more: writing a long essay or answering the exact question?',
        options: [
          'Writing as many words as possible, because longer essays always score higher.',
          'Answering the exact question with sufficiently developed ideas — length alone does not guarantee quality.',
          'Neither matters, as long as the vocabulary is advanced.',
        ],
        correctIndex: 1,
        optionFeedback: [
          'Length only helps when the ideas are relevant and developed. A long essay that drifts away from the question still loses Task Response marks.',
          null,
          'Advanced vocabulary cannot make up for ideas that do not answer the question, and Lexical Resource is only one of the four criteria.',
        ],
        explain:
          'Task 2 rewards a direct answer with developed ideas. The 250-word minimum gives your ideas room to be developed; it is not the goal in itself.',
      },
    },
    {
      id: 'four-criteria',
      kind: 'explain',
      title: 'The Four Assessment Criteria',
      trainerMessage:
        'Your essay is marked on four equally weighted criteria. For each one, notice what the examiner is actually checking — then I will test you on the first.',
      material: {
        type: 'vocab',
        items: [
          {
            phrase: '1. Task Response',
            use: 'Have you answered every part of the question? Is your central response or position clear? Are your main ideas relevant, explained and supported sufficiently? Example: for "Should university education be free?", the response "Education is very important in modern society." is weak — it discusses the general topic but does not answer whether university education should be free.',
          },
          {
            phrase: '2. Coherence and Cohesion',
            use: 'Is the essay logically organised? Does each paragraph have a clear purpose? Do ideas progress naturally? Are linking expressions used accurately?',
          },
          {
            phrase: '3. Lexical Resource',
            use: 'Is vocabulary accurate? Can you express ideas precisely, with an appropriate range and natural collocations? Complicated words are not automatically better.',
          },
          {
            phrase: '4. Grammatical Range and Accuracy',
            use: 'Sentence-structure variety, correct complex sentences, tense consistency, subject–verb agreement, articles, prepositions and punctuation. A long sentence full of errors is not evidence of advanced grammar.',
          },
        ],
      },
      check: {
        prompt:
          'For the question "Should university education be free?", a response begins: "Education is very important in modern society." Which criterion does it weaken most, and why?',
        options: [
          'Task Response — it discusses the general topic but never answers whether university education should be free.',
          'Grammatical Range and Accuracy — the sentence contains a grammar error.',
          'Coherence and Cohesion — it needs a linking word.',
        ],
        correctIndex: 0,
        optionFeedback: [
          null,
          'The sentence is grammatically correct. Its problem is relevance: it does not answer the question that was asked.',
          'One sentence cannot show a cohesion problem. The issue is that it never answers whether university education should be free.',
        ],
        explain:
          'Task Response checks whether you answered the actual question. A statement that only discusses the general topic ("education is important") answers nothing, however correct the grammar is.',
      },
    },
    {
      id: 'essay-structure',
      kind: 'explain',
      title: 'The Shape of a Task 2 Essay',
      trainerMessage: 'A typical Task 2 essay has four parts. Read what each part does, then decide what does not belong in a conclusion.',
      material: {
        type: 'text',
        paragraphs: [
          'Introduction: paraphrase the question, and establish your central response or position where the question requires one.',
          'Body paragraph 1: your first main argument, its explanation, a supporting example or evidence, and a result or implication. Body paragraph 2: the same for your second main argument.',
          'Conclusion: restate your answer and summarise the main reasoning. Do not introduce a new argument.',
          'Two body paragraphs are a useful starting structure, not an absolute rule. The best structure depends on the question and the ideas being developed.',
        ],
      },
      check: {
        prompt: 'Which of these belongs in a conclusion?',
        options: [
          'A completely new argument that supports your view.',
          'A new example taken from a different topic.',
          'A restatement of your answer and a summary of your main reasoning.',
        ],
        correctIndex: 2,
        optionFeedback: [
          'A new argument belongs in a body paragraph, where it can be explained and supported. In a conclusion it is left undeveloped.',
          'A new example would need an argument to support, and a conclusion should not open one.',
          null,
        ],
        explain:
          'A conclusion closes the essay by restating your answer and pulling together the reasoning you have already developed. It adds no new argument.',
      },
    },
    {
      id: 'weak-vs-effective',
      kind: 'demonstrate',
      title: 'Weak vs. Effective Introduction',
      trainerMessage:
        'The question is: "Some people believe that governments should spend more money on public transport instead of building new roads. To what extent do you agree or disagree?" Compare these two introductions.',
      material: {
        type: 'examples',
        weak: 'Nowadays, transport is very important. Many people have different opinions. This essay will discuss this topic.',
        good: 'Whether governments should prioritise public transport over road construction is an important issue in growing cities. I strongly agree that investment in public transport should receive greater priority because it can reduce congestion and improve access to essential services.',
        note: 'The weak introduction is generic, does not establish a clear position, and does not directly answer the question. The stronger one preserves the original meaning, paraphrases the question naturally, makes the writer\'s position clear, and introduces the main reasoning.',
      },
      check: {
        prompt: 'Why is the weak introduction weak?',
        options: [
          'Its vocabulary is too simple.',
          'It is generic and never answers the question or states a position.',
          'It is too short to be an introduction.',
        ],
        correctIndex: 1,
        optionFeedback: [
          'Simple vocabulary is not the problem. The weak introduction could be about any topic, because it says nothing about the actual question.',
          null,
          'Length is not the issue. The stronger version is only a little longer — it simply does the two jobs an introduction must do.',
        ],
        explain:
          'An introduction must answer the actual question, not merely introduce its topic. The weak version only says that transport is important and that "this essay will discuss this topic" — no paraphrase of the question and no position.',
      },
    },
    {
      id: 'misconception-clinic',
      kind: 'explain',
      title: 'Mino\'s Misconception Clinic',
      trainerMessage: 'Five ideas that sound reasonable but cost marks. Read them, then I will test you on three.',
      material: {
        type: 'vocab',
        items: [
          { phrase: '1. A paraphrase is not a synonym swap', use: 'Replacing every word with a synonym often changes the meaning. A good paraphrase keeps the exact meaning while changing the wording and structure naturally.' },
          { phrase: '2. Answer the question, not the topic', use: 'An introduction must answer the actual question, not merely introduce its topic.' },
          { phrase: '3. No new argument in the conclusion', use: 'A conclusion restates your answer and summarises your reasoning. A new argument belongs in a body paragraph.' },
          { phrase: '4. Complex vocabulary cannot rescue irrelevant ideas', use: 'Precise, accurate vocabulary helps Lexical Resource, but ideas that do not answer the question still weaken Task Response.' },
          { phrase: '5. A template cannot replace question analysis', use: 'A fixed essay template is only a shape. You must still analyse what this particular question asks.' },
        ],
      },
    },
    {
      id: 'clinic-paraphrase',
      kind: 'check',
      title: 'Clinic (1 of 3): Paraphrase',
      trainerMessage:
        'A learner paraphrases "governments should spend more money on public transport" as "councils should purchase extra buses".',
      check: {
        prompt: 'What is the main problem with this paraphrase?',
        options: [
          'The meaning has changed: "governments" became "councils" and "public transport" became only "buses".',
          'It uses too many synonyms.',
          'It is too similar to the original.',
        ],
        correctIndex: 0,
        optionFeedback: [
          null,
          'The number of synonyms is not the issue — the problem is that two of them change the meaning of the sentence.',
          'It is actually quite different from the original. The difficulty is that the meaning is no longer the same.',
        ],
        explain:
          'A paraphrase must keep the original meaning. "Councils" is not the same as "governments", and "buses" is only one kind of public transport, so the sentence now says something different.',
      },
    },
    {
      id: 'clinic-vocabulary',
      kind: 'check',
      title: 'Clinic (2 of 3): Vocabulary and Relevance',
      trainerMessage:
        'An essay uses very advanced vocabulary, but it argues about the benefits of tourism — and the question was about public transport.',
      check: {
        prompt: 'What is the main consequence?',
        options: [
          'It will score highly, because advanced vocabulary is rewarded most.',
          'The examiner will ignore the essay entirely.',
          'Task Response will be weak, because the ideas do not answer the question — advanced vocabulary cannot make up for that.',
        ],
        correctIndex: 2,
        optionFeedback: [
          'Lexical Resource is only one of four equally weighted criteria, and irrelevant ideas still weaken Task Response.',
          'The essay is still assessed on all four criteria; it simply loses marks where it fails to answer the question.',
          null,
        ],
        explain:
          'Task Response checks that your ideas answer the actual question. Accurate vocabulary helps Lexical Resource, but it cannot compensate for ideas about the wrong topic.',
      },
    },
    {
      id: 'clinic-template',
      kind: 'check',
      title: 'Clinic (3 of 3): Templates',
      trainerMessage: 'A learner memorises one fixed essay template and uses it for every question.',
      check: {
        prompt: 'What is the main risk?',
        options: [
          'Templates are not allowed in IELTS.',
          'The essay may not answer this particular question, because a template cannot replace question analysis.',
          'The essay will always be too short.',
        ],
        correctIndex: 1,
        optionFeedback: [
          'A shape for your essay is fine. The risk is using it without analysing what this question asks.',
          null,
          'Length is not the main risk of a template. Relevance is — each question asks for something different.',
        ],
        explain:
          'A template is only a shape. Every question asks for something different (an opinion, both views, a problem and solution), so you must analyse the question before deciding what to write.',
      },
    },
    {
      id: 'guided-practice',
      kind: 'guided',
      title: 'Guided Practice: Paraphrase, Then Commit',
      trainerMessage:
        'Now write two short sentences for this question: first, paraphrase the question without changing its meaning; second, state your own position clearly. I will evaluate what you actually write — there is no model answer to compare with. You can revise and check again.',
      material: {
        type: 'write-evaluate',
        prompt: 'Write two sentences: (1) a paraphrase of the question, and (2) your own position.',
        question:
          'Some people think governments should spend more money on public transport than on new roads. To what extent do you agree or disagree?',
        answerType: 'introduction',
        requiresPosition: true,
        placeholder: 'Sentence 1: your paraphrase. Sentence 2: your position.',
        keyPoints: [
          'Preserves the meaning: governments, spending more on public transport than on new roads',
          'Changes the wording and structure naturally (not a copy, not a meaning-changing synonym swap)',
          'States a clear personal position on the extent of agreement',
        ],
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before You Write',
      trainerMessage:
        "You now know what Task 2 requires, how it is marked and how an essay is shaped. For your task below, write only the introduction: one sentence that paraphrases the question, and one that states your position clearly. Mino will evaluate it for meaning, accuracy and clarity of position — and it will not give you an IELTS band for such a short piece.",
    },
  ],
  finalPrompt: {
    title: 'Write your Task 2 introduction',
    instructions:
      'The question is: "Some people believe that governments should invest more in public transport rather than expanding road networks. To what extent do you agree or disagree?" Write a two-sentence introduction. Sentence 1: paraphrase the question. Sentence 2: clearly state your position. Suggested length: 35–55 words. Write only the introduction — not a full essay.',
    minWords: 35,
    skillFocus: 'Task 2 introduction structure and position clarity',
    checkScope: 'introduction-only',
    evaluate: {
      answerType: 'introduction',
      question:
        'Some people believe that governments should invest more in public transport rather than expanding road networks. To what extent do you agree or disagree?',
      requiresPosition: true,
      keyPoints: [
        'Paraphrases the question accurately: governments, investing more in public transport rather than expanding road networks',
        'States a clear position on the extent of agreement',
        'Relevant to the exact question; accurate grammar and precise vocabulary',
      ],
    },
  },
};
