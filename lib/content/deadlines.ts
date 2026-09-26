import type { Deadline } from '@/lib/models';

/**
 * Official dates (university rounds, scholarship closings, intakes). Empty
 * until each date is verified on its official page; dates change every year,
 * so each carries a lastVerified and, where known, validUntil.
 */
export const DEADLINES: Deadline[] = [];
