// E2E: the Complex Sentences module (Foundation, Module 8).
// Run with `pnpm test:e2e:complex` (starts emulators, the mock AI and the app).
// The flow is shared by the grammar modules; see module-spec.ts.
import { runModuleSpec } from './module-spec';

void runModuleSpec({
  moduleId: 'complex-sentences',
  name: 'Complex Sentences',
  lessonPrefix: 'cx-',
  lessonCount: 9,
  shotPrefix: 'cx',
  mino: {
    lesson: 'cx-4',
    concept: 'cx-relative',
    wrong: ['cx-4-p1', 'cx-4-p3', 'cx-4-p4'],
    write: 'The person I admire most is my aunt, who she works as a nurse in Khulna. She works at a hospital where many poor families come for help.',
    expect: [/who works/, /subject/],
    followUp: 'who',
    mistakeId: 'cx-4-p1',
    mistakePattern: 'cx-relative-form',
  },
  feedback: { lesson: 'cx-3', exercise: 'cx-3-p1', wrongOption: 'will get', expect: /No will after as soon as/ },
  fix: { pattern: 'cx-relative-form', title: 'Relative clauses (who, which, no repeated pronoun)', rule: /replaces the pronoun/ },
  mastery: { lesson: 'cx-1', concept: 'cx-clause', write: 'I want to become a doctor. I study hard, and I help at a clinic on Fridays. When I finish college, I hope to study medicine.' },
  bn: {
    lesson: 'cx-3',
    stopAt: 'cx-3-p3',
    resumed: /^cx-3-(p[3-5]|r\d|c\d|y1)$/,
    english: /When I finish my degree|I will call you when I arrive/,
    write: 'When I will finish my exams, I will visit my grandparents in Rangpur.',
    expect: /When I finish/,
  },
});
