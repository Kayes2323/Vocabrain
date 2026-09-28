// E2E: Understanding IELTS Writing (Foundation LEVEL 2, module 4).
// Run with `pnpm test:e2e:writing` (starts emulators, the mock AI and the app).
// The flow is shared by the Foundation modules; see module-spec.ts.
import { runModuleSpec } from './module-spec';

void runModuleSpec({
  moduleId: 'writing-foundation',
  name: 'Writing',
  lessonPrefix: 'wr-',
  lessonCount: 9,
  shotPrefix: 'wr',
  mino: {
    lesson: 'wr-1',
    concept: 'wr-format',
    wrong: ['wr-1-p1', 'wr-1-p2', 'wr-1-p3'],
    write: 'I will spend 40 minutes on Task 1 and 20 minutes on Task 2. I will write at least 150 words for Task 1 and 250 words for Task 2. The examiner marks four criteria.',
    expect: [/about 40 minutes on Task 2/, /counts for more/],
    followUp: '40',
    mistakeId: 'wr-1-p1',
    mistakePattern: 'wr-format-fact',
  },
  feedback: { lesson: 'wr-2', exercise: 'wr-2-p1', wrongOption: 'The table shows the number of visitors to three museums.', expect: /copies the question word for word/ },
  fix: { pattern: 'wr-format-fact', title: 'Writing timing, length and criteria', rule: /at least 250 words in about 40 minutes/ },
  mastery: { lesson: 'wr-3', concept: 'wr-data', write: 'Visitors to the Science Museum rose sharply, from 120,000 in 2000 to 260,000 in 2020. By contrast, the number of people visiting the Art Gallery fell from 150,000 to 90,000. The History Museum remained stable at around 80,000. In 2020, the Science Museum had almost three times as many visitors as the Art Gallery.' },
  bn: {
    lesson: 'wr-4',
    stopAt: 'wr-4-p3',
    resumed: /^wr-4-(p[3-5]|r\d|c\d|y1)$/,
    english: /Discuss both views|Topic: what universities should teach/,
    write: 'University fees are too high for many families. In my opinion, the government should reduce them.',
    expect: /universities should offer a wide range of subjects/,
  },
});
