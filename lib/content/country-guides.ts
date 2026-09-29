import type { CountryGuide } from '@/lib/abroad/guides';
import { DE_GUIDE } from './de-guide';
import { GB_GUIDE } from './gb-guide';
import { AU_GUIDE } from './au-guide';
import { US_GUIDE } from './us-guide';
import { NZ_GUIDE } from './nz-guide';
import { CN_GUIDE } from './cn-guide';
import { CA_GUIDE } from './ca-guide';
import { NO_GUIDE } from './no-guide';
import { SE_GUIDE } from './se-guide';
import { IT_GUIDE } from './it-guide';
import { JP_GUIDE } from './jp-guide';
import { KR_GUIDE } from './kr-guide';
import { TR_GUIDE } from './tr-guide';

/**
 * Reading guides by country code. A country without an entry has no guide
 * (its page shows the existing country hub); nothing falls back to another
 * country's guide.
 */
export const COUNTRY_GUIDES: Record<string, CountryGuide> = { KR: KR_GUIDE, DE: DE_GUIDE, JP: JP_GUIDE, IT: IT_GUIDE, TR: TR_GUIDE, GB: GB_GUIDE, AU: AU_GUIDE, US: US_GUIDE, NZ: NZ_GUIDE, CN: CN_GUIDE, CA: CA_GUIDE, NO: NO_GUIDE, SE: SE_GUIDE };

export const getCountryGuide = (code: string | undefined): CountryGuide | undefined => (code ? COUNTRY_GUIDES[code.toUpperCase()] : undefined);
