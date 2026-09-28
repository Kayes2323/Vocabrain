// E2E: What is IELTS? (Foundation LEVEL 2, module 1).
// Run with `pnpm test:e2e:ielts-intro` (starts emulators, the mock AI and the app).
// The flow is shared by the Foundation modules; see module-spec.ts.
import { runModuleSpec } from './module-spec';

void runModuleSpec({
  moduleId: 'ielts-intro',
  name: 'What is IELTS?',
  lessonPrefix: 'ib-',
  lessonCount: 9,
  shotPrefix: 'ib',
  mino: {
    lesson: 'ib-1',
    concept: 'ib-versions',
    wrong: ['ib-1-p1', 'ib-1-p2', 'ib-1-p3'],
    write: 'I am taking IELTS because I want to study in Canada. I think I need General Training for my master’s degree. I will check the university website.',
    expect: [/IELTS Academic for my master/, /usually needs Academic/],
    followUp: 'Academic',
    mistakeId: 'ib-1-p1',
    mistakePattern: 'ib-version-fact',
  },
  feedback: { lesson: 'ib-2', exercise: 'ib-2-p1', wrongOption: '30', expect: /Listening lasts about 30 minutes, but has 40 questions/ },
  fix: { pattern: 'ib-version-fact', title: 'Academic or General Training', rule: /Listening and Speaking are the same in both versions/ },
  mastery: { lesson: 'ib-4', concept: 'ib-bands', write: 'My target is 6.5 overall with no band below 6.0. I am aiming for Listening 7.0, Reading 6.5, Writing 6.0 and Speaking 6.5. These add up to 26, and 26 divided by 4 is 6.5.' },
  bn: {
    lesson: 'ib-3',
    stopAt: 'ib-3-p3',
    resumed: /^ib-3-(p[3-5]|r\d|c\d|y1)$/,
    english: /Computer: you type answers|Same: questions, timing/,
    write: 'I prefer the computer test because it is easier and gives higher scores. I type fast. I will practise typing essays every week.',
    expect: /Neither format is easier/,
  },
});
