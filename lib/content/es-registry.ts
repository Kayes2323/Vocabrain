import type { Scholarship, SourceRef, SourcedValue, University } from '@/lib/models';
import {
  ES_AECID_BECAS_LATAM_AFRICA_ASIA,
  ES_IEU_ADMISSION_PROCESS,
  ES_READ,
  ES_UAB_ADMISSION,
  ES_UAM_STUDY_ABROAD,
  ES_UB_INTERNATIONAL,
  ES_UCM_APPLICATION,
} from './es-sources';

/**
 * Spain: university examples, built the same way as dk-registry.ts /
 * at-registry.ts. Universities are examples (alphabetical, never ordered
 * by quality). AECID's own "Becas para ciudadanos de países de América
 * Latina, África y Asia" convocatoria exists and nominally covers Asia,
 * but the texts read for this guide (the África-Med Máster call and the
 * Escuela Diplomática call) list specific eligible countries by name, and
 * Bangladesh was not found named among them on the pages read — so this
 * is recorded honestly as a scholarship programme that exists, without
 * claiming Bangladesh eligibility that could not be confirmed.
 */
const META = { createdAt: ES_READ, updatedAt: ES_READ };
const fact = (value: string, source: SourceRef, opts: { status?: SourcedValue<string>['status']; notes?: string } = {}): SourcedValue<string> => ({
  value,
  source,
  lastVerified: ES_READ,
  reviewedAt: ES_READ,
  reviewAt: '2027-03-01',
  status: opts.status ?? 'verified',
  confidence: source.sourceType === 'official-government' || source.sourceType === 'official-scholarship' ? 'high' : 'medium',
  ...(opts.notes ? { notes: opts.notes } : {}),
});

const mkUni = (id: string, name: string, city: string, source: SourceRef): University => ({
  id,
  name,
  countryCode: 'ES',
  city,
  officialUrl: source.url!,
  officialSource: source,
  ...META,
});

export const ES_UNIVERSITIES: University[] = [
  mkUni('es-ie-university', 'IE University', 'Madrid/Segovia', ES_IEU_ADMISSION_PROCESS),
  mkUni('es-uab', 'Universitat Autònoma de Barcelona (UAB)', 'Barcelona', ES_UAB_ADMISSION),
  mkUni('es-uam', 'Universidad Autónoma de Madrid (UAM)', 'Madrid', ES_UAM_STUDY_ABROAD),
  mkUni('es-ub', 'Universitat de Barcelona (UB)', 'Barcelona', ES_UB_INTERNATIONAL),
  mkUni('es-ucm', 'Universidad Complutense de Madrid (UCM)', 'Madrid', ES_UCM_APPLICATION),
];

export const ES_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'es-aecid-latam-africa-asia',
    name: 'AECID – Becas para ciudadanos de países de América Latina, África y Asia',
    provider: 'government',
    countryCode: 'ES',
    degreeLevels: ['masters', 'phd'],
    coverage: fact(
      'AECID’s own page describes this as an annual convocatoria bundling several programmes (e.g. the Colegio de Europa programme, the Escuela Diplomática programme, the África-Med Máster programme), each with its own stipend, health-insurance cover and, for some, travel allowance — stated per programme in its own call text, not as one single coverage figure for the whole convocatoria.',
      ES_AECID_BECAS_LATAM_AFRICA_ASIA,
      { status: 'partly-verified' },
    ),
    eligibility: fact(
      'AECID’s own page names this convocatoria "for citizens of Latin America, Africa and Asia", and a related Ministry page separately describes the Escuela Diplomática programme as open to "países de América Latina, África, Asia y Ucrania, que constan en la Convocatoria" — but the individual programme texts read for this guide (the África-Med Máster call) list specific eligible countries by name, mostly in Africa and the Middle East, and Bangladesh was not found named on the pages read. No official page read for this guide confirms Bangladesh as an eligible country for any specific programme in this convocatoria, so Bangladeshi eligibility is not shown here as confirmed.',
      ES_AECID_BECAS_LATAM_AFRICA_ASIA,
      { status: 'not-verified' },
    ),
    applicationMethod: fact(
      'Online, through AECID’s own electronic registry (sede electrónica AECID), within the dates each programme’s own call states (these vary by programme within the same convocatoria).',
      ES_AECID_BECAS_LATAM_AFRICA_ASIA,
    ),
    deadline: fact('Varies by programme within the convocatoria — AECID’s own page lists each programme’s own opening and closing dates separately (e.g. 2–15 July for one 2026/2027 programme read for this guide).', ES_AECID_BECAS_LATAM_AFRICA_ASIA, { status: 'partly-verified' }),
    officialUrl: ES_AECID_BECAS_LATAM_AFRICA_ASIA.url!,
    ...META,
  },
];
