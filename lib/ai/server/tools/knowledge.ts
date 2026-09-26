import { findKnowledge, IELTS_CARDS } from '../mino/knowledge/ielts';
import { APP_GUIDES, findGuide } from '../mino/knowledge/product';
import type { MinoTool } from './types';

/** How a Vocab Brain feature works, from the real current build. */
export const getAppGuide: MinoTool = {
  declaration: {
    name: 'getAppGuide',
    description:
      'How to do something in the Vocab Brain app and whether it exists yet. Use for "where/how do I…" questions (save words, My Brain, review, practice tests, progress, diagnostic, goals, study abroad tools).',
    parameters: {
      type: 'object',
      properties: { topic: { type: 'string', description: `What the student wants to do. Known topics: ${APP_GUIDES.map((g) => g.id).join(', ')}.` } },
      required: ['topic'],
    },
  },
  async run(_ctx, args) {
    const guides = findGuide(String(args.topic ?? ''));
    return guides.length ? { guides } : { found: false, note: 'No guide matches. Only describe features listed as AVAILABLE in the app map.' };
  },
};

/** IELTS and vocabulary-learning knowledge cards, labelled official / technique / vocab-brain. */
export const getIELTSGuide: MinoTool = {
  declaration: {
    name: 'getIELTSGuide',
    description:
      'Reliable IELTS knowledge: test format, scoring, question-type strategies, Writing/Speaking criteria, vocabulary learning method, study-abroad and document basics. Each point is labelled official, technique or vocab-brain. Use before explaining a question type or IELTS rule.',
    parameters: {
      type: 'object',
      properties: { topic: { type: 'string', description: `Topic, e.g. ${IELTS_CARDS.map((c) => c.id).join(', ')}.` } },
      required: ['topic'],
    },
  },
  async run(_ctx, args) {
    const cards = findKnowledge(String(args.topic ?? ''));
    return cards.length ? { cards } : { found: false, note: 'No card for this topic; answer from general IELTS knowledge and label it as such.' };
  },
};
