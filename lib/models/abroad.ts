import type { DegreeLevel } from '@/lib/constants';
import type { ID, ISODate, Money, SourceRef, SourcedValue } from './common';

/**
 * Country records hold only sourced, dated facts. Screens read from the
 * registry and never hard-code a country list or a figure.
 */
export interface Country {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  region: 'Europe' | 'North America' | 'Oceania' | 'Asia' | 'Middle East' | 'Africa' | 'Latin America';
  flag: string;
  data: CountryData;
}

export interface CountryData {
  tuition?: SourcedValue<{ min: Money; max: Money }>[];
  livingCost?: SourcedValue<Money>[];
  visaInformation?: SourcedValue<string>[];
  workRules?: SourcedValue<string>[];
  postStudyOptions?: SourcedValue<string>[];
  scholarshipInformation?: SourcedValue<string>[];
  language?: SourcedValue<string[]>;
  intakes?: SourcedValue<string[]>;
  applicationPatterns?: SourcedValue<string>[];
  sources?: SourceRef[];
}

export interface University {
  id: ID;
  name: string;
  countryCode: string;
  city?: string;
  website: string;
}

export interface Course {
  id: ID;
  universityId: ID;
  title: string;
  degreeLevel: DegreeLevel;
  subject: string;
  tuition?: SourcedValue<Money>;
  englishRequirement?: SourcedValue<{ test: 'IELTS'; overall: number; minimumPerSkill?: number }>;
}

export interface Intake {
  id: ID;
  courseId: ID;
  month: number;
  year: number;
}

/** Deadlines always belong to a specific university, course, degree and intake. */
export interface Deadline {
  id: ID;
  intakeId: ID;
  kind: 'application' | 'scholarship' | 'deposit' | 'visa' | 'other';
  date: SourcedValue<ISODate>;
}

export interface Scholarship {
  id: ID;
  name: string;
  countryCode?: string;
  degreeLevels: DegreeLevel[];
  funding: 'full' | 'partial' | 'tuition-only' | 'stipend';
  eligibility: SourcedValue<string>;
  deadline?: SourcedValue<ISODate>;
  officialUrl: string;
}

export const APPLICATION_STEPS = [
  'research',
  'requirements',
  'sop',
  'lor',
  'transcript',
  'submit',
  'decision',
] as const;
export type ApplicationStep = (typeof APPLICATION_STEPS)[number];

export interface Application {
  id: ID;
  userId: ID;
  universityId: ID;
  courseId?: ID;
  intakeId?: ID;
  completedSteps: ApplicationStep[];
  status: 'planning' | 'in-progress' | 'submitted' | 'offer' | 'rejected' | 'withdrawn';
  updatedAt: ISODate;
}

export type DocumentKind =
  | 'passport'
  | 'transcript'
  | 'certificate'
  | 'ielts'
  | 'cv'
  | 'sop'
  | 'lor'
  | 'financial'
  | 'offer-letter'
  | 'visa';

export interface StudentDocument {
  id: ID;
  userId: ID;
  kind: DocumentKind;
  status: 'missing' | 'in-progress' | 'ready';
  applicationId?: ID;
  fileUrl?: string;
}

export interface StudyAbroadTask {
  id: ID;
  userId: ID;
  title: string;
  dueAt?: ISODate;
  applicationId?: ID;
  done: boolean;
}
