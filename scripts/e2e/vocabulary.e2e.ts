// E2E: the Vocabulary Foundation module (Foundation, Module 11): the skill
// lessons, and the link from the module page to the daily word missions.
// Run with `pnpm test:e2e:vocabulary` (starts emulators, the mock AI and the app).
// The flow is shared by the grammar modules; see module-spec.ts.
import { runModuleSpec } from './module-spec';

void runModuleSpec({
  moduleId: 'vocabulary-foundation',
  name: 'Vocabulary',
  lessonPrefix: 'vc-',
  lessonCount: 9,
  shotPrefix: 'vc',
  mino: {
    lesson: 'vc-1',
    concept: 'voc-learn',
    wrong: ['vc-1-p1', 'vc-1-p2', 'vc-1-p3'],
    write: 'Many young people in my town cannot afford to go to university. Most villages now have access of mobile internet. Small factories contribute to the local economy.',
    expect: [/access to mobile internet/, /PATTERN/],
    followUp: 'to',
    mistakeId: 'vc-1-p1',
    mistakePattern: 'voc-word-pattern',
  },
  feedback: { lesson: 'vc-2', exercise: 'vc-2-p1', wrongOption: 'very cheap', expect: /un- means not/ },
  fix: { pattern: 'voc-word-pattern', title: 'Word patterns (afford to, access to, benefit from)', rule: /Learn each word with the words that follow it/ },
  mastery: { lesson: 'vc-5', concept: 'voc-precise', write: 'Living in a large city gives residents better healthcare. However, traffic congestion is a serious drawback. Long commutes can be exhausting for employees.' },
  bn: {
    lesson: 'vc-4',
    stopAt: 'vc-4-p3',
    resumed: /^vc-4-(p[3-5]|r\d|c\d|y1)$/,
    english: /kids → children|lots of kids get really stressed/,
    write: 'Nowadays, lots of kids move to cities to find jobs. Cities also offer better schools. Yeah, my cousins moved to Dhaka too.',
    expect: /Many children/,
  },
  practiceLink: { href: '/ielts/vocabulary/foundation', title: 'Daily word missions' },
});
