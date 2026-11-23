/**
 * Pure reveal logic for the chart-analysis board, kept separate from the component so
 * the "onComplete fires exactly once" rule can be tested without a DOM.
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
