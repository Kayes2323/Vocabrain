import type { Deadline, Scholarship } from '@/lib/models';
import { KR_EMBASSY_BD_GKS_U_2027, KR_SIK_SCHOLARSHIPS, krFact } from './kr-sources';

/**
 * South Korea scholarships, C2.4. Each value is in the source's own words;
 * `funding` is left out because neither source calls GKS "fully funded" —
 * the coverage line says what it pays for instead.
 */
const META = { createdAt: '2026-09-27', updatedAt: '2026-09-27' };
const SIK = (v: string) => krFact(v, KR_SIK_SCHOLARSHIPS, 'medium');
const BD = (v: string) => krFact(v, KR_EMBASSY_BD_GKS_U_2027, 'high', { reviewAt: '2026-12-31' });

export const KR_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'kr-gks-u-2027',
    name: 'Global Korea Scholarship for Undergraduate Degrees 2027 (GKS-U) — Embassy Track, Bangladesh',
    provider: 'government',
    countryCode: 'KR',
    degreeLevels: ['bachelors'],
    coverage: SIK('Airfare, Korean language training fees, tuition and monthly allowances.'),
    eligibility: SIK(
      "You and both of your parents hold non-Korean citizenship; you are under 25; you have graduated (or will graduate) from high school or an associate degree; and you meet the academic requirement, such as a cumulative 80% or higher, the top 20% of your class, or the required CGPA.",
    ),
    requirements: BD(
      "Bangladesh Embassy Track quota: 3 (General 2 + R-GKS 1). Bachelor's: 5–7 years (1 year of Korean language + 4–6 years of degree). Shortlisted applicants are interviewed in English at the Korean Embassy (expected 5–6 October 2026).",
    ),
    applicationMethod: BD(
      'Online only, through Study in Korea. At this stage documents do not need attestation by the Korean Embassy or the Bangladesh Foreign Ministry; candidates who pass the first round must submit originals and apostilled documents by the deadline they are given. Submitted documents are not returned.',
    ),
    opensAt: krFact('2026-09-15', KR_EMBASSY_BD_GKS_U_2027, 'high', { reviewAt: '2026-12-31' }),
    deadline: krFact('2026-09-30', KR_EMBASSY_BD_GKS_U_2027, 'high', { reviewAt: '2026-12-31', notes: 'Documents are not accepted after 30 September.' }),
    officialUrl: KR_EMBASSY_BD_GKS_U_2027.url!,
    applyUrl: 'https://www.studyinkorea.go.kr',
    ...META,
  },
  {
    id: 'kr-gks-g',
    name: "Global Korea Scholarship for Graduate Degrees (GKS-G) — Master's and PhD",
    provider: 'government',
    countryCode: 'KR',
    degreeLevels: ['masters', 'phd'],
    coverage: SIK('Airfare, Korean language training fees, tuition and monthly allowances.'),
    eligibility: SIK("You and both of your parents hold non-Korean citizenship; you are under 40; you have a bachelor's or master's degree; and your average from the most recent program is at least 80%."),
    applicationMethod: SIK('Through the Korean Embassy in your country (online, on Study in Korea) or directly to a GKS-designated university. Applications are usually taken in February–March; check the GKS notices for the next round.'),
    officialUrl: KR_SIK_SCHOLARSHIPS.url!,
    ...META,
  },
];

export const KR_DEADLINES: Deadline[] = [
  {
    id: 'kr-gks-u-2027-close',
    kind: 'scholarship',
    title: { en: 'GKS Undergraduate 2027 — Embassy Track (Bangladesh) closes', bn: 'GKS Undergraduate 2027 — Embassy Track (Bangladesh) বন্ধ হয়' },
    countryCode: 'KR',
    owner: { type: 'scholarship', id: 'kr-gks-u-2027' },
    degreeLevel: 'bachelors',
    intake: { month: 3, year: 2027 },
    date: krFact('2026-09-30', KR_EMBASSY_BD_GKS_U_2027, 'high', { reviewAt: '2026-12-31' }),
    ...META,
  },
];
