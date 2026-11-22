import type { Lesson } from '../types';

/**
 * Task 2 Academy — Module 8 ("Full Essay Writing"). The capstone: combine
 * paraphrase + thesis, two fully developed body paragraphs (IDEA →
 * EXPLANATION → EXAMPLE → RESULT, from the "Developing One Idea Fully"
 * lesson) and a conclusion into one complete, 250-word essay. Uses the same
 * question as the Exam Simulation's Task 2 (lib/writing-studio/content.ts
 * EXAM_CONTENT.task2), so this lesson rehearses exactly what the mock test
 * will ask.
 */
export const task2FullPracticeLesson: Lesson = {
  id: 'task2-full-practice',
  task: 'task2',
  moduleId: 'task2-m8',
  title: 'Writing a Complete Task 2 Essay',
  objective: 'Combine paraphrase, thesis, two developed body paragraphs and a conclusion into one complete, 250-word essay.',
  estMinutes: 42,
  steps: [
    {
      id: 'intro',
      kind: 'intro',
      title: "Today's goal",
      trainerMessage:
        "Hi, Mino here. You've practised every part separately — paraphrasing, developing one idea, writing a conclusion. Today you put all of it together into one complete essay, under the real 250-word, 40-minute standard.",
    },
    {
      id: 'explain',
      kind: 'explain',
      title: 'The complete shape',
      trainerMessage:
        'A full Task 2 essay has four parts: an introduction (paraphrase + thesis that previews your two main points), two body paragraphs (each fully developed: IDEA → EXPLANATION → EXAMPLE → RESULT), and a conclusion (restate the position, sum up briefly, nothing new).',
      material: {
        type: 'text',
        paragraphs: [
          'Plan before you write: spend roughly 5 minutes deciding your position and your two main points, 30 minutes writing, and 5 minutes checking.',
          'Each body paragraph should stay on ONE idea. Trying to fit three ideas into one paragraph is the single most common reason a Task 2 essay feels underdeveloped.',
        ],
      },
    },
    {
      id: 'demonstrate',
      kind: 'demonstrate',
      title: 'A thesis that previews the whole essay',
      trainerMessage: 'Notice how this thesis statement tells the examiner exactly what each body paragraph will do, before they read either one.',
      material: {
        type: 'examples',
        weak: 'I think young people should save money. There are many reasons for this.',
        good:
          "While some argue that young people should be free to spend as they wish, this essay will argue that building a savings habit early is essential, both because it protects against financial emergencies and because it builds long-term financial discipline.",
        note:
          'The weak version states a position but previews nothing — the examiner has no idea what is coming. The good version names both body paragraphs\' topics ("protects against... emergencies" and "builds long-term... discipline") inside the thesis itself.',
      },
    },
    {
      id: 'check',
      kind: 'check',
      title: 'Quick check',
      trainerMessage: 'One quick question before you plan your essay.',
      check: {
        prompt: 'What is the most common reason a Task 2 body paragraph feels underdeveloped?',
        options: [
          'It is too short in word count only',
          'It tries to fit more than one idea into the same paragraph',
          'It uses too many linking words',
          'It does not mention the question again',
        ],
        correctIndex: 1,
        explain:
          'Cramming two or three ideas into one paragraph means none of them gets a real explanation, example and result. One idea per paragraph, developed fully, scores higher than several shallow ones.',
      },
    },
    {
      id: 'guided',
      kind: 'guided',
      title: 'Plan before you write',
      trainerMessage:
        'Before you open the editor, plan on paper or in your head: your position, your two main points (one per body paragraph), and one specific example for each. Once you have that, write the complete essay below.',
      material: {
        type: 'text',
        paragraphs: [
          'Question: "Some people believe that saving money is essential for young people, while others think that young people should be free to spend their income as they wish. Discuss both views and give your own opinion."',
          'A workable plan: Paragraph 1 (introduction) — paraphrase + thesis previewing both points below. Paragraph 2 — the case for freedom to spend (brief, since you will disagree or partly disagree). Paragraph 3 — your own view, developed with an explanation, a specific example and a result. Paragraph 4 (conclusion) — restate your position, sum up briefly.',
        ],
      },
    },
    {
      id: 'review',
      kind: 'review',
      title: 'Before you write',
      trainerMessage:
        "You have the full shape and a plan. Write the complete essay now — introduction, two body paragraphs, conclusion — at least 250 words, as if this were the real 40-minute test.",
    },
  ],
  finalPrompt: {
    title: 'Write the complete essay',
    instructions:
      'Some people believe that saving money is essential for young people, while others think that young people should be free to spend their income as they wish. Discuss both views and give your own opinion. Write a complete essay: introduction, two body paragraphs, conclusion.',
    minWords: 250,
  },
};
