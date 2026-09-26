import { isMinoAction, MINO_ACTION_IDS } from '../../actions';
import type { MinoTool } from './types';

/** Lets Mino put up to three "go there" buttons under its reply. */
export const suggestActions: MinoTool = {
  declaration: {
    name: 'suggestActions',
    description:
      'Show up to 3 buttons under your reply that open the exact place in the app for the next step (e.g. review for due words, reading-test to practise, study-plan for the plan). Call once, only when the next step exists in the app. Do not describe the buttons in your text beyond naming the step.',
    parameters: {
      type: 'object',
      properties: {
        actions: { type: 'array', description: 'Button ids, most important first.', items: { type: 'string', enum: MINO_ACTION_IDS }, maxItems: 3 },
      },
      required: ['actions'],
    },
  },
  async run(ctx, args) {
    const ids = (Array.isArray(args.actions) ? args.actions : []).filter(isMinoAction).slice(0, 3);
    ctx.actions = [...new Set([...(ctx.actions ?? []), ...ids])].slice(0, 3);
    return { shown: ctx.actions };
  },
};
