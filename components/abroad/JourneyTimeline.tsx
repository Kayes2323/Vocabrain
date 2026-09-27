import type { AbroadStageStatus } from '@/lib/engine';

/** Chip tone for a journey stage or roadmap step status. */
export const STAGE_TONE: Record<AbroadStageStatus, 'success' | 'brand' | 'neutral' | 'warning'> = {
  done: 'success',
  'in-progress': 'brand',
  upcoming: 'neutral',
  attention: 'warning',
};
