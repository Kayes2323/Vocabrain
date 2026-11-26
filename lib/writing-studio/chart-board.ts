/**
 * Pure reveal logic for the chart-analysis board, kept separate from the component so
 * the "onComplete fires exactly once" rule can be tested without a DOM.
 *
 * NOTE: this tracks only completion (has the learner submitted and settled an
 * answer for this task?), never correctness — those are deliberately separate
 * states. A task is "revealed" once Mino has given a real verdict on it
 * (correct, partial, incorrect, or unavailable), so the board can always be
 * finished regardless of how many questions were answered wrong; see
 * `ChartAnswerStatus` below for the correctness states themselves.
 */
export function revealTask(
  revealed: Record<string, boolean>,
  id: string,
  total: number,
): { next: Record<string, boolean>; completedNow: boolean } {
  // Rechecking an already-revealed task changes nothing and can never complete the board.
  if (revealed[id]) return { next: revealed, completedNow: false };
  const next = { ...revealed, [id]: true };
  return { next, completedNow: Object.keys(next).length >= total };
}

/**
 * A chart-board task's answer-evaluation state. `unanswered` and `pending`
 * are UI-only transients; the rest are terminal (a real verdict was reached,
 * or evaluation genuinely could not run). `correct`/`partial`/`incorrect`
 * only ever come from a real Mino AI verdict — nothing in this module or its
 * caller is allowed to set them just because the learner clicked submit.
 */
export type ChartAnswerStatus = 'unanswered' | 'pending' | 'correct' | 'partial' | 'incorrect' | 'unavailable';

/** Whether "Check my answer" may be pressed right now — false only while a request for this task is already in flight, so a second click (or a slow double-tap) can never fire a duplicate evaluation. */
export function canSubmitChartAnswer(status: ChartAnswerStatus): boolean {
  return status !== 'pending';
}

/** True once a task has a real, settled verdict (correct, partial, incorrect, or a reported-unavailable failure) — the signal `revealTask`'s `total` count should be driven from, never raw submission. */
export function isSettledChartAnswer(status: ChartAnswerStatus): boolean {
  return status === 'correct' || status === 'partial' || status === 'incorrect' || status === 'unavailable';
}
