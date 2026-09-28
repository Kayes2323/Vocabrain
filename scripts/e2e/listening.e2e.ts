// E2E: Understanding IELTS Listening (Foundation LEVEL 2, module 2).
// Run with `pnpm test:e2e:listening` (starts emulators, the mock AI and the app).
// The flow is shared by the Foundation modules; see module-spec.ts.
import { runModuleSpec } from './module-spec';

void runModuleSpec({
  moduleId: 'listening-foundation',
  name: 'Listening',
  lessonPrefix: 'ls-',
  lessonCount: 9,
  shotPrefix: 'ls',
  mino: {
    lesson: 'ls-1',
    concept: 'ls-format',
    wrong: ['ls-1-p1', 'ls-1-p2', 'ls-1-p3'],
    write: 'I will play each recording twice when I practise. Before each part I will read the questions. If I miss an answer, I will move on.',
    expect: [/play each recording once/, /heard once/],
    followUp: 'once',
    mistakeId: 'ls-1-p1',
    mistakePattern: 'ls-format-fact',
  },
  feedback: { lesson: 'ls-2', exercise: 'ls-2-p1', wrongOption: '6 o’clock', expect: /6 is corrected to 7/ },
  fix: { pattern: 'ls-format-fact', title: 'How Listening works (parts, heard once, order)', rule: /4 parts, 40 questions, about 30 minutes/ },
  mastery: { lesson: 'ls-3', concept: 'ls-part2', write: 'As you come in through the main gate, the office is on your left. Walk past the office and take the stairs at the end of the corridor. The library is opposite the computer room.' },
  bn: {
    lesson: 'ls-4',
    stopAt: 'ls-4-p3',
    resumed: /^ls-4-(p[3-5]|r\d|c\d|y1)$/,
    english: /Agreeing: "True\."|Should we use a questionnaire/,
    write: 'Rina: How about a survey? Omar: Exactly, a survey is too slow. Rina: Then interviews. Omar: Good idea.',
    expect: /I’m not so sure/,
  },
});
