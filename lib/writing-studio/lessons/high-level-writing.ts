import type { Lesson } from '../types';

/**
 * Task 2 Academy — Module 9 ("High-Level Writing Performance"). Framed
 * explicitly as a Band 7–8 LEARNING GOAL, not a guarantee: argument depth
 * (one level deeper than the obvious point), precision over hedging and
 * repetition, and a majority of error-free sentences as the real
 * differentiator — not rare vocabulary for its own sake.
 */
export const highLevelWritingLesson: Lesson = {
  id: 'high-level-writing',
  task: 'task2',
  moduleId: 'task2-m9',
  title: 'Writing at a Higher Level',
  objective: 'Develop one argument one level deeper than the obvious point, as a learning goal toward Band 7–8 — never a guaranteed score.',
  estMinutes: 15,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi, Mino again. This module is a learning goal, not a promise — nothing guarantees a specific band. What separates higher-level writing isn't rare vocabulary; it's going one level deeper into WHY a point is true, and getting most sentences fully correct.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'Depth, precision, accuracy',
      trainerMessage:
        "Depth means explaining the mechanism behind a claim — not just stating that something is true, but why or how it becomes true. Precision means choosing one accurate word instead of hedging with several vague ones ('maybe', 'somewhat', 'kind of', 'in a way'). Accuracy means a majority of your sentences are completely free of grammar errors — that matters more at this level than trying rare words you are not confident with.",
      material: {
        type: 'text',
        paragraphs: [
          "Most Task 2 answers state a claim and move on: 'Public transport reduces traffic.' That's true but shallow — it stops at the first, most obvious layer.",
          "Going one level deeper asks: why does that happen, specifically? 'Public transport reduces traffic because a single bus replaces dozens of individual car journeys during peak commuting hours, when road capacity is most constrained.' Same claim, one layer of mechanism added.",
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'One claim, two depths',
      trainerMessage: 'Same argument — notice exactly where the second version adds its one extra layer.',
      material: {
        type: 'examples',
        weak: 'Working from home is good for employees because it saves time and reduces stress.',
        good:
          'Working from home benefits employees primarily by removing the daily commute, which for many workers in large cities can exceed two hours a day; reclaiming that time directly reduces the chronic fatigue that commuting-related stress produces.',
        note:
          'The weak version names two benefits but explains neither — "saves time" and "reduces stress" are left as bare claims. The good version picks ONE of them and explains the actual mechanism (the commute specifically, its typical length, and how that connects to fatigue) rather than listing more unexplained claims.',
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before we practise.',
      check: {
        prompt: 'At a higher level, what matters more than using rare vocabulary?',
        options: [
          'Writing the longest possible sentences',
          'Explaining the mechanism behind a claim and keeping most sentences error-free',
          'Mentioning as many different ideas as possible',
          'Avoiding all linking words',
        ],
        correctIndex: 1,
        explain:
          'Depth (explaining why/how a claim is true) and accuracy (a majority of error-free sentences) are the real differentiators — not rare words used uncertainly, which often introduce new errors.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Add one layer of depth',
      trainerMessage:
        "Here is a Task 2 question and a shallow, one-sentence argument for it. Before you write, think about the one mechanism question you could ask: why, specifically, does this happen?",
      material: {
        type: 'examples',
        weak: 'Some people think governments should fund the arts. I agree because art is important for society.',
        good:
          'Government funding for the arts matters because, without it, access to cultural participation narrows almost entirely to those who can already afford it, which widens the very inequality that public institutions are meant to reduce.',
        note:
          'The task below is to do exactly this for the shallow claim given — ask "why, specifically?" and answer it with one clear mechanism, not a second unexplained claim.',
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        "You have the method: take the one shallow sentence below, ask 'why, specifically?', and write one short paragraph that answers it — one layer deeper, not several new claims.",
    },
  ],
  finalPrompt: {
    title: 'Go one level deeper',
    instructions:
      'Question: "Some people think advertising aimed at children should be banned." Shallow argument given: "I agree because advertising aimed at children is unfair." Rewrite and extend this into one short paragraph that explains, specifically, WHY it is unfair — go exactly one layer deeper than the sentence given.',
    minWords: 90,
  },
};
