import type { CountryUniversityLayer, UniversityProfile } from '@/lib/abroad/university-layer';
import { DE_UNI_LAYER } from './de-unis';

/** Countries whose university → program layer has been researched. Others show nothing (never placeholders). */
export const UNI_LAYERS: Record<string, CountryUniversityLayer> = {
  DE: DE_UNI_LAYER,
};

export const getUniLayer = (code: string): CountryUniversityLayer | undefined => UNI_LAYERS[code.toUpperCase()];

export const getUniversityProfile = (code: string, id: string): UniversityProfile | undefined =>
  getUniLayer(code)?.universities.find((u) => u.id === id);

export const universityHref = (code: string, id: string) => `/abroad/countries/${code.toLowerCase()}/universities/${id}`;
