import type { PracticeTest } from '../../model';
import { mock1Listening } from './test1-listening';
import { mock1Reading } from './test1-reading';
import { mock1Speaking, mock1Writing } from './test1-writing-speaking';
import { mock2Listening } from './test2-listening';
import { mock2Reading } from './test2-reading';
import { mock2Speaking, mock2Writing } from './test2-writing-speaking';
import { mock3Listening } from './test3-listening';
import { mock3Reading } from './test3-reading';
import { mock3Speaking, mock3Writing } from './test3-writing-speaking';
import { mock4Listening } from './test4-listening';
import { mock4Reading } from './test4-reading';
import { mock4Speaking, mock4Writing } from './test4-writing-speaking';
import { mock5Listening } from './test5-listening';
import { mock5Reading } from './test5-reading';
import { mock5Speaking, mock5Writing } from './test5-writing-speaking';
import { mock6Listening } from './test6-listening';
import { mock6Reading } from './test6-reading';
import { mock6Speaking, mock6Writing } from './test6-writing-speaking';
import { mock7Listening } from './test7-listening';
import { mock7Reading } from './test7-reading';
import { mock7Speaking, mock7Writing } from './test7-writing-speaking';

/** Mino Academic Mock Test 1: original, full-length, Cambridge-level practice. */
export const mockTest1: PracticeTest = {
  id: 'vb-mock-1',
  bookId: 'vb-mock',
  number: 1,
  title: 'Academic Mock Test 1',
  module: 'academic',
  source: 'Mino',
  sourceType: 'vocab-brain-original',
  licenseStatus: 'original',
  dateAdded: '2026-09-26',
  sections: {
    listening: mock1Listening,
    reading: mock1Reading,
    writing: mock1Writing,
    speaking: mock1Speaking,
  },
};

/** Mino Academic Mock Test 2: original, full-length, with recorded Listening and the voice examiner. */
export const mockTest2: PracticeTest = {
  id: 'vb-mock-2',
  bookId: 'vb-mock',
  number: 2,
  title: 'Academic Mock Test 2',
  module: 'academic',
  source: 'Mino',
  sourceType: 'vocab-brain-original',
  licenseStatus: 'original',
  dateAdded: '2026-11-18',
  sections: {
    listening: mock2Listening,
    reading: mock2Reading,
    writing: mock2Writing,
    speaking: mock2Speaking,
  },
};

/** Mino Academic Mock Test 3: original, full-length, Cambridge-format practice (same timing, counts and question types as Cambridge 19 Test 1). Not Cambridge material. */
export const mockTest3: PracticeTest = {
  id: 'vb-mock-3',
  bookId: 'vb-mock',
  number: 3,
  title: 'Academic Mock Test 3',
  module: 'academic',
  source: 'Mino',
  sourceType: 'vocab-brain-original',
  licenseStatus: 'original',
  dateAdded: '2026-11-18',
  sections: {
    listening: mock3Listening,
    reading: mock3Reading,
    writing: mock3Writing,
    speaking: mock3Speaking,
  },
};

/** Mino Academic Mock Test 4: original, full-length, Cambridge-format practice (same timing, counts and question types as Cambridge 19 Test 1). Not Cambridge material. */
export const mockTest4: PracticeTest = {
  id: 'vb-mock-4',
  bookId: 'vb-mock',
  number: 4,
  title: 'Academic Mock Test 4',
  module: 'academic',
  source: 'Mino',
  sourceType: 'vocab-brain-original',
  licenseStatus: 'original',
  dateAdded: '2026-11-18',
  sections: {
    listening: mock4Listening,
    reading: mock4Reading,
    writing: mock4Writing,
    speaking: mock4Speaking,
  },
};

/** Mino Academic Mock Test 5: original, full-length, Cambridge-format practice (same timing, counts and question types as Cambridge 19 Test 1). Not Cambridge material. */
export const mockTest5: PracticeTest = {
  id: 'vb-mock-5',
  bookId: 'vb-mock',
  number: 5,
  title: 'Academic Mock Test 5',
  module: 'academic',
  source: 'Mino',
  sourceType: 'vocab-brain-original',
  licenseStatus: 'pending-review',
  dateAdded: '2026-11-18',
  sections: {
    listening: mock5Listening,
    reading: mock5Reading,
    writing: mock5Writing,
    speaking: mock5Speaking,
  },
};

/** Mino Academic Mock Test 6: original, full-length, Cambridge-format practice (same timing, counts and question types as Cambridge 19 Test 1). Not Cambridge material. */
export const mockTest6: PracticeTest = {
  id: 'vb-mock-6',
  bookId: 'vb-mock',
  number: 6,
  title: 'Academic Mock Test 6',
  module: 'academic',
  source: 'Mino',
  sourceType: 'vocab-brain-original',
  licenseStatus: 'pending-review',
  dateAdded: '2026-11-18',
  sections: {
    listening: mock6Listening,
    reading: mock6Reading,
    writing: mock6Writing,
    speaking: mock6Speaking,
  },
};

/** Mino Academic Mock Test 7: original, full-length, Cambridge-format practice (same timing, counts and question types as Cambridge 19 Test 1). Not Cambridge material. */
export const mockTest7: PracticeTest = {
  id: 'vb-mock-7',
  bookId: 'vb-mock',
  number: 7,
  title: 'Academic Mock Test 7',
  module: 'academic',
  source: 'Mino',
  sourceType: 'vocab-brain-original',
  licenseStatus: 'pending-review',
  dateAdded: '2026-11-18',
  sections: {
    listening: mock7Listening,
    reading: mock7Reading,
    writing: mock7Writing,
    speaking: mock7Speaking,
  },
};
