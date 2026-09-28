// E2E: the Common Errors to Fix module (Foundation, Module 10).
// Run with `pnpm test:e2e:common-errors` (starts emulators, the mock AI and the app).
// The flow is shared by the grammar modules; see module-spec.ts.
import { runModuleSpec } from './module-spec';

void runModuleSpec({
  moduleId: 'common-errors',
  name: 'Common Errors',
  lessonPrefix: 'ce-',
  lessonCount: 9,
  shotPrefix: 'ce',
  mino: {
    lesson: 'ce-2',
    concept: 'ce-countable',
    wrong: ['ce-2-p1', 'ce-2-p2', 'ce-2-p3'],
    write: 'Could you send me some informations about student accommodation? I would also like some advice about my luggage. Is lab equipment provided?',
    expect: [/some information about/, /uncountable/],
    followUp: 'luggage',
    mistakeId: 'ce-2-p1',
    mistakePattern: 'ce-uncountable',
  },
  feedback: { lesson: 'ce-1', exercise: 'ce-1-p1', wrongOption: 'I am agree with you.', expect: /agree needs no am/ },
  fix: { pattern: 'ce-uncountable', title: 'Uncountable nouns (informations, advices)', rule: /Uncountable nouns have no -s/ },
  mastery: { lesson: 'ce-6', concept: 'ce-natural', write: 'Many graduates return to their home countries after studying abroad. This essay will discuss the main reasons for this trend. In my view, family life at home is often easier.' },
  bn: {
    lesson: 'ce-4',
    stopAt: 'ce-4-p3',
    resumed: /^ce-4-(p[3-5]|r\d|c\d|y1)$/,
    english: /make a mistake|In the evening I make my homework/,
    write: 'I practise every evening. Sometimes I do a lot of mistakes in Writing. Then I take a short break.',
    expect: /make a lot of mistakes/,
  },
});
