// E2E: Understanding IELTS Reading (Foundation LEVEL 2, module 3).
// Run with `pnpm test:e2e:reading` (starts emulators, the mock AI and the app).
// The flow is shared by the Foundation modules; see module-spec.ts.
import { runModuleSpec } from './module-spec';

void runModuleSpec({
  moduleId: 'reading-foundation',
  name: 'Reading',
  lessonPrefix: 'rd-',
  lessonCount: 9,
  shotPrefix: 'rd',
  mino: {
    lesson: 'rd-1',
    concept: 'rd-skim',
    wrong: ['rd-1-p1', 'rd-1-p2', 'rd-1-p3'],
    write: 'I will spend about 20 minutes on each passage and then use 10 extra minutes to transfer my answers. I will skim first and scan for names and numbers. If I am stuck, I will guess and move on.',
    expect: [/no extra time/, /transfer/],
    followUp: 'no',
    mistakeId: 'rd-1-p1',
    mistakePattern: 'rd-skim-scan',
  },
  feedback: { lesson: 'rd-2', exercise: 'rd-2-p1', wrongOption: 'saved money on tickets', expect: /The passage says time, not money/ },
  fix: { pattern: 'rd-skim-scan', title: 'Skimming, scanning and timing', rule: /About 20 minutes per passage/ },
  mastery: { lesson: 'rd-3', concept: 'rd-tfng', write: 'TRUE: The reading period started in 2018, because the passage gives the same year. FALSE: The sessions lasted an hour, because the passage says 20 minutes. NOT GIVEN: The school received government money, because funding is not mentioned.' },
  bn: {
    lesson: 'rd-4',
    stopAt: 'rd-4-p3',
    resumed: /^rd-4-(p[3-5]|r\d|c\d|y1)$/,
    english: /Many coastal villages now rely on rainwater|for example/,
    write: 'Heading: One family in Khulna. Distractor: Turning to the sky for water. The distractor is wrong because it is too general.',
    expect: /Coastal villages turn to rainwater/,
  },
});
