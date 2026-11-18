import type { PracticeTest } from '../../model';
import { mock1Listening } from './test1-listening';
import { mock1Reading } from './test1-reading';
import { mock1Speaking, mock1Writing } from './test1-writing-speaking';
import { mock2Listening } from './test2-listening';
import { mock2Reading } from './test2-reading';
import { mock2Speaking, mock2Writing } from './test2-writing-speaking';

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
