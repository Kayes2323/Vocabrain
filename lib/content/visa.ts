import type { VisaGuide } from '@/lib/models';
import { KR_D2, KR_D2_WORK_RULES } from './kr-d2';
import { KR_EMBASSY_BD, KR_EMBASSY_BD_VISA, KR_KIS_NAVIGATOR, KR_SIK_VISA, KR_SIK_WORK, krFact } from './kr-sources';

/**
 * Reviewed student-visa guides, one per country, split into visa parts; a
 * country with several routes lists visa categories (each with its own parts).
 * Empty until checked against the official immigration website: visa rules,
 * fees and processing times must never be written from memory.
 */
export const VISA_GUIDES: VisaGuide[] = [
  {
    // South Korea (C1.1): route names and who each visa is for, from the Korea
    // Immigration Service and Study in Korea. Requirements, fees, processing,
    // stay length and work rules come in C1.2–C1.4, each with source and date.
    countryCode: 'KR',
    parts: {
      documents: {
        blocks: [
          {
            id: 'kr-bd-specific',
            title: { en: 'Bangladesh-specific requirements', bn: 'Bangladesh-এর জন্য আলাদা requirement' },
            facts: [
              {
                label: { en: 'Extra documents by country', bn: 'দেশভেদে বাড়তি document' },
                fact: krFact(
                  'Additional documents may be required depending on the program and your country; check with the Korean diplomatic mission in your country before applying for a visa.',
                  KR_SIK_VISA,
                  'medium',
                ),
              },
            ],
            guidance: {
              en: 'Bangladesh-specific requirement: Not verified yet. Check the Embassy of Korea in Bangladesh before you apply.',
              bn: 'Bangladesh-specific requirement: এখনো verified নয়। Apply করার আগে Dhaka-র Korean Embassy-র page দেখে নাও।',
            },
            links: [KR_EMBASSY_BD_VISA, KR_EMBASSY_BD],
          },
        ],
      },
      work: {
        facts: [
          {
            label: { en: 'Who this applies to', bn: 'কার জন্য প্রযোজ্য' },
            fact: krFact(
              'Students on a D-2 or D-4 visa who want part-time work must have a certain level of Korean proficiency and get permission from the local immigration office.',
              KR_SIK_WORK,
              'medium',
              { status: 'partly-verified', notes: 'Hours and TOPIK levels are not added yet (C1.4).' },
            ),
          },
        ],
        links: [KR_SIK_WORK],
      },
    },
    categories: [
      KR_D2,
      {
        id: 'kr-d4',
        code: 'D-4',
        name: { en: 'D-4 visa', bn: 'D-4 visa' },
        // Official name as the Korea Immigration Service writes it.
        officialName: krFact('D-4 (General Trainee)', KR_KIS_NAVIGATOR, 'high', { notes: 'Visa Navigator Ver 2023.05. Study in Korea words it slightly differently.' }),
        pathwayIds: ['language'],
        links: [KR_SIK_VISA, KR_KIS_NAVIGATOR],
        parts: {
          type: {
            facts: [
              {
                label: { en: 'Who it is for', bn: 'কার জন্য' },
                fact: krFact('International students enrolling in non-degree programs (training).', KR_SIK_VISA, 'medium'),
              },
              {
                label: { en: 'Official scope', bn: 'Official scope' },
                fact: krFact(
                  'Persons receiving training at university-affiliated language institutes or private educational institutions; this includes Korean language trainees.',
                  KR_KIS_NAVIGATOR,
                  'high',
                  { notes: 'Visa Navigator Ver 2023.05.' },
                ),
              },
            ],
            blocks: [
              {
                id: 'kr-d4-subtypes',
                title: { en: 'D-4 type for Korean language study', bn: 'Korean ভাষা শেখার জন্য D-4-র ধরন' },
                facts: [
                  {
                    label: { en: 'Korean language training', bn: 'Korean language training' },
                    fact: krFact('D-4-1 Korean Language Training', KR_SIK_VISA, 'medium', { status: 'partly-verified' }),
                  },
                ],
              },
            ],
          },
        },
      },
    ],
    // D-2 part-time hours (C1.2); D-4 rules are added in their own phase.
    workRules: KR_D2_WORK_RULES,
  },
];

export const visaGuide = (code: string) => VISA_GUIDES.find((g) => g.countryCode === code.toUpperCase());
