import type { Deadline } from '@/lib/models';
import { KR_DEADLINES } from './kr-scholarships';

/**
 * Official dates (university rounds, scholarship closings, intakes). Added
 * only once each date is verified on its official page; dates change every year,
 * so each carries a lastVerified and, where known, validUntil.
 */
export const DEADLINES: Deadline[] = [...KR_DEADLINES];
