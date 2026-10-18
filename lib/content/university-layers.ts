import type { CountryUniversityLayer, UniversityProfile } from '@/lib/abroad/university-layer';
import { DE_UNI_LAYER } from './de-unis';
import { KR_UNI_LAYER } from './kr-unis';
import { LT_UNI_LAYER } from './lt-unis';
import { CZ_UNI_LAYER } from './cz-unis';
import { SI_UNI_LAYER } from './si-unis';
import { FR_UNI_LAYER } from './fr-unis';
import { IE_UNI_LAYER } from './ie-unis';
import { NL_UNI_LAYER } from './nl-unis';
import { CH_UNI_LAYER } from './ch-unis';
import { HU_UNI_LAYER } from './hu-unis';
import { AT_UNI_LAYER } from './at-unis';
import { DK_UNI_LAYER } from './dk-unis';
import { ES_UNI_LAYER } from './es-unis';
import { MY_UNI_LAYER } from './my-unis';
import { PL_UNI_LAYER } from './pl-unis';

/** Countries whose university → program layer has been researched. Others show nothing (never placeholders). */
export const UNI_LAYERS: Record<string, CountryUniversityLayer> = {
  DE: DE_UNI_LAYER,
  KR: KR_UNI_LAYER,
  LT: LT_UNI_LAYER,
  CZ: CZ_UNI_LAYER,
  SI: SI_UNI_LAYER,
  FR: FR_UNI_LAYER,
  IE: IE_UNI_LAYER,
  NL: NL_UNI_LAYER,
  CH: CH_UNI_LAYER,
  HU: HU_UNI_LAYER,
  AT: AT_UNI_LAYER,
  DK: DK_UNI_LAYER,
  ES: ES_UNI_LAYER,
  MY: MY_UNI_LAYER,
  PL: PL_UNI_LAYER,
};

export const getUniLayer = (code: string): CountryUniversityLayer | undefined => UNI_LAYERS[code.toUpperCase()];

export const getUniversityProfile = (code: string, id: string): UniversityProfile | undefined =>
  getUniLayer(code)?.universities.find((u) => u.id === id);

export const universityHref = (code: string, id: string) => `/abroad/countries/${code.toLowerCase()}/universities/${id}`;
