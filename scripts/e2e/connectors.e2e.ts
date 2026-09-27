// E2E: the Connectors module (Foundation, Module 7).
// Run with `pnpm test:e2e:connectors` (starts emulators, the mock AI and the app).
// The flow is shared by the grammar modules; see module-spec.ts.
import { runModuleSpec } from './module-spec';

void runModuleSpec({
  moduleId: 'connectors',
  name: 'Connectors',
  lessonPrefix: 'cn-',
  lessonCount: 9,
  shotPrefix: 'cn',
  mino: {
    lesson: 'cn-2',
    concept: 'conn-contrast',
    wrong: ['cn-2-p2', 'cn-2-p4', 'cn-2-p5'],
    write: 'Although studying abroad is expensive, but many students choose it. However, some feel lonely. Despite this, I support it.',
    expect: [/one contrast word/i, /Although/],
    followUp: 'although',
    mistakeId: 'cn-2-p2',
    mistakePattern: 'conn-form',
  },
  feedback: { lesson: 'cn-3', exercise: 'cn-3-p1', wrongOption: 'because', expect: /because needs a clause/ },
  fix: { pattern: 'conn-form', title: 'Connector grammar and punctuation', rule: /join after a comma/ },
  mastery: { lesson: 'cn-1', concept: 'conn-add', write: 'English helps people find better jobs, and it also makes studying abroad possible. In addition, it opens up films and books from around the world.' },
  bn: {
    lesson: 'cn-3',
    stopAt: 'cn-3-p3',
    resumed: /^cn-3-(p[3-5]|r\d|c\d|y1)$/,
    english: /Prices rose because demand increased|Many people move to Dhaka/,
    write: 'Many people move to cities. Because there are more jobs. As a result, cities are crowded.',
    expect: /cities because there are more jobs/,
  },
});
