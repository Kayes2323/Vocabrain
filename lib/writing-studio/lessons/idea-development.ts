import type { Lesson } from '../types';

/**
 * Task 2 Academy — Module 5 ("Paragraph Development"), the example lesson
 * the prototype brief asks for. Teaches the IDEA → EXPLANATION → EXAMPLE →
 * RESULT/LINK framework, then hands the student to the Idea Development
 * Trainer before they write the paragraph themselves.
 */
export const ideaDevelopmentLesson: Lesson = {
  id: 'idea-development',
  task: 'task2',
  moduleId: 'task2-m5',
  title: 'Developing One Idea Fully',
  objective: 'Take a single argument and develop it with an explanation, a realistic example and a result — instead of listing several shallow points.',
  estMinutes: 18,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi, it's Mino again. A common Task 2 problem is writing three or four ideas, none of them explained properly. Today you'll learn to develop just one idea fully — that's worth far more than four shallow ones.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'The four-part paragraph',
      trainerMessage:
        'Use this shape for a body paragraph: IDEA (your main point) → EXPLANATION (why it is true) → EXAMPLE (a realistic situation) → RESULT (what this leads to, linked back to the question).',
      material: {
        type: 'text',
        paragraphs: [
          "Most weak paragraphs stop after the idea: 'Saving money is important because it helps in emergencies.' That is one sentence with nothing behind it.",
          'A developed paragraph explains the mechanism (why does saving help in an emergency?), gives a believable example (a specific situation a reader can picture), and states the result (what happens because of this, and how it answers the question).',
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'Shallow vs. developed',
      trainerMessage: 'Same idea, two treatments. Notice how much further the second one goes.',
      material: {
        type: 'examples',
        weak: 'Saving money is important for young people because it helps them in emergencies. It also gives them independence.',
        good:
          'Young people who save regularly build a safety net for sudden costs such as medical bills or urgent travel. For instance, a graduate with even three months of basic expenses saved can handle a short gap between jobs without borrowing from family or taking on high-interest debt. As a result, saving early reduces financial stress at exactly the age when income is least stable.',
        note: 'The weak version lists two separate ideas, neither explained. The good version stays with one idea, explains the mechanism, gives a specific example, and ends with a clear result tied back to the question.',
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'What is usually missing from a shallow Task 2 paragraph?',
        options: [
          'A topic sentence',
          'Explanation, a specific example and a result',
          'Correct spelling',
          'A conclusion to the whole essay',
        ],
        correctIndex: 1,
        explain: 'A topic sentence is usually present — what is missing is depth: explaining the mechanism, a concrete example, and a result that links back to the question.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Build your idea, one question at a time',
      trainerMessage:
        "Let's build your paragraph for this question using the ladder below. Answer one question at a time — I will tell you if an answer repeats the one before it rather than adding something new.",
      material: {
        type: 'idea-board',
        question: {
          id: 'saving-money',
          prompt: 'Some people believe that saving money is essential for young people. To what extent do you agree or disagree?',
          questionType: 'agree-disagree',
          ladder: [
            { id: 'q1', order: 1, prompt: 'What is your main argument?', hint: 'One sentence. Pick a side — agree, disagree, or partly.', placeholder: 'e.g. I largely agree that saving money is essential for young people.' },
            { id: 'q2', order: 2, prompt: 'Why is that argument true? (The mechanism)', hint: 'Explain how or why, not just that it is true.', placeholder: 'e.g. Because unexpected costs can force young people into debt if they have no savings.' },
            { id: 'q3', order: 3, prompt: 'Can you explain how this works, in more detail?', hint: 'Go one level deeper than your last answer — do not just repeat it.', placeholder: 'e.g. Without savings, a sudden expense is often paid for with a credit card or a loan, which then carries interest.' },
            { id: 'q4', order: 4, prompt: 'Can you give a realistic, specific example?', hint: 'Picture one person in one situation — avoid vague phrases like "many people".', placeholder: 'e.g. A 22-year-old whose car needs an unexpected repair before an exam period.' },
            { id: 'q5', order: 5, prompt: 'What consequence does this create?', hint: 'What happens as a result of your example?', placeholder: 'e.g. That single bill can take months to pay off, affecting their ability to focus on work or study.' },
            { id: 'q6', order: 6, prompt: 'How does this support your position overall?', hint: 'Tie it back to the exact question.', placeholder: 'e.g. This shows why building savings early protects young people from a cycle that is hard to escape later.' },
          ],
        },
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        "You now have an idea, an explanation, an example and a result. Turn your six answers into one flowing paragraph — you don't need six separate sentences, join them naturally with linking words.",
    },
  ],
  finalPrompt: {
    title: 'Write your developed paragraph',
    instructions:
      'Using your answers from the Idea Development Board, write one full body paragraph (not the whole essay) that develops your argument with an explanation, an example and a result.',
    minWords: 90,
  },
};
