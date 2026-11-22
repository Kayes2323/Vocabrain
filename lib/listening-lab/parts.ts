/**
 * The 4 part-specific dashboards. These group the curriculum by WHERE a
 * skill is tested (Part 1–4), as a second view over the same 8 modules —
 * `skillRefs` point at `lib/listening-lab/modules.ts` so a skill's status and
 * content live in exactly one place.
 */
import type { ConversationTrap, PartDashboard } from './model';

export const PART_DASHBOARDS: PartDashboard[] = [
  {
    part: 1,
    title: { en: 'Part 1 — Everyday Conversation', bn: 'Part 1 — Everyday Conversation' },
    questionTypes: ['form-completion', 'note-completion', 'table-completion'],
    skillRefs: [
      'sound-recognition:number-recognition',
      'sound-recognition:similar-sounding-words',
      'question-type-mastery:form-completion',
      'spelling-accuracy:names-and-addresses',
      'spelling-accuracy:numbers-and-dates',
    ],
    commonTraps: [
      { en: 'A spoken correction changes a number, name or spelling after it is first given.', bn: 'প্রথমে একটা number, name বা spelling বলার পর, সেটা মুখেই correct করা হয়।' },
      { en: 'A spelled name uses letters that sound alike (B/P/V, M/N).', bn: 'একই রকম শোনা letter (B/P/V, M/N) দিয়ে নাম spell করা হয়।' },
    ],
    status: 'planned',
  },
  {
    part: 2,
    title: { en: 'Part 2 — Monologue', bn: 'Part 2 — Monologue' },
    questionTypes: ['multiple-choice', 'plan-map-diagram-labelling', 'note-completion'],
    skillRefs: ['question-type-mastery:map-labelling', 'question-type-mastery:plan-labelling', 'sound-recognition:sentence-stress'],
    commonTraps: [
      { en: 'Directions name a wrong turn first, then correct it ("left — no, sorry, right").', bn: 'প্রথমে ভুল দিক বলে ("left"), পরে নিজেই ঠিক করে দেয় ("না, sorry, right")।' },
      { en: 'Several facilities are described in a row; only one matches the labelled position.', bn: 'একসাথে একাধিক facility-র বর্ণনা আসে; এর মধ্যে একটাই label-করা position-এর সাথে মেলে।' },
    ],
    status: 'planned',
  },
  {
    part: 3,
    title: { en: 'Part 3 — Academic Discussion', bn: 'Part 3 — Academic Discussion' },
    questionTypes: ['multiple-choice', 'multiple-choice-multi', 'matching'],
    skillRefs: [
      'part3-conversation:opinion-recognition',
      'part3-conversation:agreement-disagreement',
      'part3-conversation:opinion-changes',
      'part3-conversation:distractor-recognition',
      'part3-conversation:speaker-tracking',
    ],
    commonTraps: [
      { en: 'One speaker proposes an idea, the other rejects it; the rejected idea is a distractor option.', bn: 'একজন একটা idea প্রস্তাব করে, আরেকজন বাতিল করে; বাতিল হওয়া idea-টাই distractor option হিসেবে থাকে।' },
      { en: 'A speaker agrees in general but disagrees with one specific part ("partial agreement").', bn: 'একজন মোটের ওপর একমত, কিন্তু একটা নির্দিষ্ট অংশে না — এটাই "partial agreement"।' },
    ],
    status: 'planned',
  },
  {
    part: 4,
    title: { en: 'Part 4 — Academic Lecture', bn: 'Part 4 — Academic Lecture' },
    questionTypes: ['note-completion', 'sentence-completion', 'short-answer'],
    skillRefs: [
      'part4-lecture:lecture-structure',
      'part4-lecture:signposting-words',
      'part4-lecture:academic-vocabulary',
      'part4-lecture:part4-spelling-accuracy',
      'part4-lecture:word-formation',
    ],
    commonTraps: [
      { en: 'A fact is mentioned to introduce a contrast ("earlier studies thought X, but…").', bn: 'একটা তথ্য contrast আনার জন্য বলা হয় ("earlier studies thought X, but…"), সেটাই উত্তর না।' },
      { en: 'The gap needs a specific word form (noun vs adjective) the sentence grammar fixes.', bn: 'বাক্যের grammar যে ঠিক word form (noun বা adjective) চায়, gap-টার সেটাই লাগবে।' },
    ],
    status: 'planned',
  },
];

export const findPartDashboard = (part: number): PartDashboard | undefined => PART_DASHBOARDS.find((p) => p.part === part);

/** Part 3 Trap Library (product brief: "Build a dedicated PART 3 TRAP LIBRARY"). */
export const PART3_TRAP_LIBRARY: ConversationTrap[] = [
  { id: 'rejected-proposal', title: { en: 'The Rejected Proposal', bn: 'The Rejected Proposal' }, explanation: { en: 'An idea is suggested, discussed and then turned down. The suggestion is the distractor; the final decision is the answer.', bn: 'একটা idea প্রস্তাব করা হয়, নিয়ে আলোচনা হয়, তারপর বাতিল হয়। প্রস্তাবটাই distractor; শেষ সিদ্ধান্তটা উত্তর।' }, status: 'planned' },
  { id: 'reluctant-agreement', title: { en: 'The Reluctant Agreement', bn: 'The Reluctant Agreement' }, explanation: { en: 'A speaker agrees after first objecting ("I\'m not sure… actually, you\'re right").', bn: 'একজন speaker প্রথমে আপত্তি করে, পরে একমত হয় ("আমি নিশ্চিত না… আসলে, তুমি ঠিক")।' }, status: 'planned' },
  { id: 'partial-agreement-trap', title: { en: 'The Partial Agreement', bn: 'The Partial Agreement' }, explanation: { en: 'A speaker agrees with the main idea but disagrees with one detail inside it.', bn: 'একজন speaker মূল idea-র সাথে একমত, কিন্তু এর ভেতরের একটা অংশে না।' }, status: 'planned' },
  { id: 'changed-mind', title: { en: 'The Changed Mind', bn: 'The Changed Mind' }, explanation: { en: 'A speaker states a view, then updates it later in the same turn after new information.', bn: 'একজন speaker একটা মত দেয়, পরে নতুন তথ্য পেয়ে একই কথার মধ্যেই মত বদলায়।' }, status: 'planned' },
  { id: 'third-option', title: { en: 'The Third Option', bn: 'The Third Option' }, explanation: { en: 'Two options are discussed and both rejected in favour of a third, mentioned briefly.', bn: 'দুটো option নিয়ে আলোচনা হয়, দুটোই বাতিল হয়, আর অল্প একটু বলা তিন নম্বর option-টাই আসলে উত্তর।' }, status: 'planned' },
];
