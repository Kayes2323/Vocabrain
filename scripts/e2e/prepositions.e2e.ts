// E2E: the Prepositions module (Foundation, Module 6).
// Run with `pnpm test:e2e:prepositions` (starts emulators, the mock AI and the app).
// The flow is shared by the grammar modules; see module-spec.ts.
import { runModuleSpec } from './module-spec';

void runModuleSpec({
  moduleId: 'prepositions',
  name: 'Prepositions',
  lessonPrefix: 'pr-',
  lessonCount: 9,
  shotPrefix: 'pr',
  mino: {
    lesson: 'pr-6',
    concept: 'prep-data',
    wrong: ['pr-6-p1', 'pr-6-p2', 'pr-6-p3'],
    write: 'The proportion of internet users rose with 35 percentage points from 2010 to 2015.',
    expect: [/rose by/, /change/],
    followUp: 'by',
    mistakeId: 'pr-6-p1',
    mistakePattern: 'prep-data-words',
  },
  feedback: { lesson: 'pr-1', exercise: 'pr-1-p1', wrongOption: 'on', expect: /on is for days and dates, not clock times/ },
  fix: { pattern: 'prep-data-words', title: 'Prepositions for data (by, to, at)', rule: /size of the change/ },
  mastery: { lesson: 'pr-3', concept: 'prep-place', write: 'I live in a quiet area of Khulna. Our flat is on the second floor, and there is a shop at the corner.' },
  bn: {
    lesson: 'pr-1',
    stopAt: 'pr-1-p3',
    resumed: /^pr-1-(p[3-5]|r\d|c\d|y1)$/,
    english: /I was born|Classes start at 9 am/,
    write: 'On Fridays I get up in 7 am and in the afternoon I play cricket.',
    expect: /at 7 am/,
  },
});
