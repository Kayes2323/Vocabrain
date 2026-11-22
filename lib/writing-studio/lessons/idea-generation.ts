import type { Lesson } from '../types';

/**
 * Task 2 Academy — Module 4 ("Idea Generation"): generating a few candidate
 * ideas quickly, then testing each one before committing — a thin idea is
 * worse than fewer, stronger ones. Leads naturally into the already-built
 * Paragraph Development lesson ('idea-development').
 */
export const ideaGenerationLesson: Lesson = {
  id: 'idea-generation',
  task: 'task2',
  moduleId: 'task2-m4',
  title: 'Idea Generation',
  objective: 'Generate a few candidate ideas for a question, then test each one before choosing the strongest two to develop.',
  estMinutes: 12,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi, Mino here. Before you can develop an idea fully — which you'll practise in the next module — you need good ideas to choose from. Today is about generating a few candidates quickly, then picking the strongest ones.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'Generate, then test',
      trainerMessage:
        'First, generate 3-4 candidate ideas quickly without judging them. Then test each one with one question: can I actually explain this and support it with a specific example in 3-4 sentences? If not, drop it rather than force it.',
      material: {
        type: 'text',
        paragraphs: [
          "A thin idea you cannot really support is worse than committing to fewer, stronger ones — Task Response rewards depth, not the number of points you raise.",
          'Most Task 2 essays only need two well-developed body ideas, so generating four candidates and keeping the best two is a normal, efficient way to plan under time pressure.',
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'Thin idea vs. supportable idea',
      trainerMessage: 'Both of these came from the same brainstorm. Only one survives the test.',
      material: {
        type: 'examples',
        weak:
          'Question about whether social media does more harm than good. Candidate idea: "Social media is bad for society." Testing it: this is really a conclusion, not a specific idea — there is nothing concrete to explain or exemplify.',
        good:
          'Same brainstorm. Candidate idea: "Constant social comparison on social media harms teenagers\' mental health." Testing it: explainable (seeing curated, idealised lives triggers comparison), exemplifiable (a specific platform and a believable scenario), and it clearly supports the "more harm" position.',
        note: 'The weak idea is really a restatement of the position itself, with nothing underneath it. The good idea names a specific mechanism that can be explained and shown with a real example.',
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'What should you do with a candidate idea that fails the "can I explain and exemplify it?" test?',
        options: [
          'Keep it anyway and hope the examiner does not notice',
          'Drop it and develop a stronger candidate instead',
          'Make the sentence longer to disguise the problem',
          'Use it as your topic sentence only, with no development',
        ],
        correctIndex: 1,
        explain: 'A thin idea does not improve by being written in a longer sentence or left undeveloped — the efficient move is to drop it in favour of an idea you can actually support.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Brainstorm, then test two',
      trainerMessage:
        "Look at these four quickly brainstormed candidates for one question, and notice how two pass the test and two do not — that's the filtering you'll do yourself in a moment.",
      material: {
        type: 'text',
        paragraphs: [
          'Question: "Some people think that the best way to reduce traffic congestion in cities is to improve public transport. Others believe different solutions are more effective. Discuss both views."',
          'Candidates for "improve public transport": (1) "It reduces the number of private cars on the road" — passes: explainable (fewer cars choose to drive if transport is reliable) and exemplifiable (a specific city\'s metro expansion). (2) "It is good for the environment" — fails as written: too broad, nothing specific to explain yet, though it could be rescued with a concrete mechanism.',
        ],
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        "You now have a method: generate a few candidates quickly, test each one, and commit to the strongest two. The next module, Paragraph Development, will teach you to develop one of those ideas fully.",
    },
  ],
  finalPrompt: {
    title: 'List your two strongest ideas',
    instructions:
      'For this question — "Some people believe that working from home benefits both employees and employers, while others disagree. Discuss both views and give your own opinion." — list the two ideas you would actually use (not every candidate you thought of), with one line each on how you would support each one.',
    minWords: 50,
  },
};
