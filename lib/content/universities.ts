import type { Program, University } from '@/lib/models';
import { KR_PROGRAMS } from './kr-programs';
import { KR_UNIVERSITIES } from './kr-universities';
import { DE_UNIVERSITIES } from './de-registry';
import { GB_UNIVERSITIES } from './gb-registry';
import { AU_UNIVERSITIES } from './au-registry';
import { US_UNIVERSITIES } from './us-registry';
import { NZ_UNIVERSITIES } from './nz-registry';
import { CN_UNIVERSITIES } from './cn-registry';
import { CA_UNIVERSITIES } from './ca-registry';
import { NO_UNIVERSITIES } from './no-registry';
import { SE_UNIVERSITIES } from './se-registry';
import { FI_UNIVERSITIES } from './fi-registry';
import { IT_UNIVERSITIES } from './it-registry';
import { JP_UNIVERSITIES } from './jp-registry';
import { TR_UNIVERSITIES } from './tr-registry';

/**
 * Reviewed university and program records. A record is added
 * only with its official website, and every changeable value (tuition, English
 * score, admission rule) as a SourcedValue checked on that website. Until then
 * the Universities centre shows the student's own list and says so plainly.
 * Shape is API/CMS-ready: the same objects can later come from a server.
 */
export const UNIVERSITIES: University[] = [...KR_UNIVERSITIES, ...DE_UNIVERSITIES, ...JP_UNIVERSITIES, ...IT_UNIVERSITIES, ...TR_UNIVERSITIES, ...GB_UNIVERSITIES, ...AU_UNIVERSITIES, ...US_UNIVERSITIES, ...NZ_UNIVERSITIES, ...CN_UNIVERSITIES, ...CA_UNIVERSITIES, ...NO_UNIVERSITIES, ...SE_UNIVERSITIES, ...FI_UNIVERSITIES];
export const PROGRAMS: Program[] = [...KR_PROGRAMS];

export const universitiesIn = (code: string | undefined) => (code ? UNIVERSITIES.filter((u) => u.countryCode === code.toUpperCase()) : UNIVERSITIES);
