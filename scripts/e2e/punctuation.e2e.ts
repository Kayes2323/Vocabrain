// E2E: the Punctuation & Capitalisation module (Foundation, Module 9).
// Run with `pnpm test:e2e:punctuation` (starts emulators, the mock AI and the app).
// The flow is shared by the grammar modules; see module-spec.ts.
import { runModuleSpec } from './module-spec';

void runModuleSpec({
  moduleId: 'punctuation',
  name: 'Punctuation',
  lessonPrefix: 'pu-',
  lessonCount: 9,
  shotPrefix: 'pu',
  mino: {
    lesson: 'pu-5',
    concept: 'pn-apostrophe',
    wrong: ['pu-5-p1', 'pu-5-p2', 'pu-5-p3'],
    write: 'My mothers cooking is the best in our area. My two brothers share a room. Our house is old, but its garden is beautiful.',
    expect: [/mother’s cooking/, /owner/],
    followUp: 'father’s',
    mistakeId: 'pu-5-p1',
    mistakePattern: 'pn-apostrophes',
  },
  feedback: { lesson: 'pu-1', exercise: 'pu-1-p1', wrongOption: 'my sister lives in canada.', expect: /The first word and the country name need capitals/ },
  fix: { pattern: 'pn-apostrophes', title: 'Apostrophes (’s, s’, its / it’s)', rule: /One owner/ },
  mastery: { lesson: 'pu-3', concept: 'pn-comma', write: 'In 2010, the museum had 8,000 visitors. The number rose to 12,500 in 2015, but it fell to 10,000 in 2020. Most visitors came from Dhaka, Chattogram and Sylhet.' },
  bn: {
    lesson: 'pu-2',
    stopAt: 'pu-2-p3',
    resumed: /^pu-2-(p[3-5]|r\d|c\d|y1)$/,
    english: /The library opens at nine|I saw your advert/,
    write: 'i am interested in your evening English course. Is there a class for beginners? I would like to know how much it costs.',
    expect: /I am interested/,
  },
});
