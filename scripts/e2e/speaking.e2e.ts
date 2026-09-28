// E2E: Understanding IELTS Speaking (Foundation LEVEL 2, module 5).
// Run with `pnpm test:e2e:speaking` (starts emulators, the mock AI and the app).
// The flow is shared by the Foundation modules; see module-spec.ts.
import { runModuleSpec } from './module-spec';

void runModuleSpec({
  moduleId: 'speaking-foundation',
  name: 'Speaking',
  lessonPrefix: 'sp-',
  lessonCount: 9,
  shotPrefix: 'sp',
  mino: {
    lesson: 'sp-1',
    concept: 'sp-format',
    wrong: ['sp-1-p1', 'sp-1-p2', 'sp-1-p3'],
    write: 'The Speaking test is 30 minutes on a computer. Part 2 has a cue card and one minute to prepare. The examiner listens for fluency, vocabulary, grammar and pronunciation.',
    expect: [/face to face with an examiner/, /11–14 minutes/],
    followUp: '3',
    mistakeId: 'sp-1-p1',
    mistakePattern: 'sp-format-fact',
  },
  feedback: { lesson: 'sp-2', exercise: 'sp-2-p1', wrongOption: 'Yes.', expect: /Too short to show anything/ },
  fix: { pattern: 'sp-format-fact', title: 'Speaking parts, timing and criteria', rule: /1 minute to prepare, 1–2 minutes to speak/ },
  mastery: { lesson: 'sp-3', concept: 'sp-part2', write: 'Notes: Cox’s Bazar · twice a year · beach walks · peaceful. I’d like to talk about Cox’s Bazar, which is on the south-east coast of Bangladesh. I visit it twice a year, mostly during the Eid holidays. I walk along the beach early in the morning and eat fresh fish in the evening. The main reason I love it is that it’s so peaceful.' },
  bn: {
    lesson: 'sp-4',
    stopAt: 'sp-4-p3',
    resumed: /^sp-4-(p[3-5]|r\d|c\d|y1)$/,
    english: /It’s likely that|Compared with the past/,
    write: 'I like my village. My grandmother lives there, and I visit her every Eid.',
    expect: /Many young people move to cities/,
  },
});
