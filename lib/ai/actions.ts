// Buttons Mino may show under a reply. A fixed whitelist of real app
// destinations, shared by the server (tool enum) and the chat UI, so Mino can
// only link to places that exist.
export const MINO_ACTIONS = {
  review: '/review',
  reading: '/ielts/reading',
  'practice-test': '/ielts/tests',
  'reading-test': '/ielts/tests/vb-practice-1/reading',
  'writing-test': '/ielts/tests/vb-practice-1/writing',
  'speaking-test': '/ielts/tests/vb-practice-1/speaking',
  'writing-practice': '/practice/writing',
  'speaking-practice': '/practice/speaking',
  diagnostic: '/ielts/diagnostic',
  foundation: '/ielts/foundation',
  'foundation-check': '/ielts/foundation/diagnostic',
  'sentence-basics': '/ielts/foundation/sentence-basics',
  tenses: '/ielts/foundation/tenses',
  'study-plan': '/ielts/plan',
  'my-brain': '/ielts/vocabulary/notebook',
  'set-goal': '/setup/ielts',
  'abroad-profile': '/setup/abroad',
  countries: '/abroad/countries',
  'country-match': '/abroad/country-match',
} as const;

export type MinoActionId = keyof typeof MINO_ACTIONS;
export const MINO_ACTION_IDS = Object.keys(MINO_ACTIONS) as MinoActionId[];
export const isMinoAction = (id: unknown): id is MinoActionId => typeof id === 'string' && id in MINO_ACTIONS;
