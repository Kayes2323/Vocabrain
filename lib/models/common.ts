// Shared primitives for every domain model.

/** ISO-8601 date or date-time string. Stored as strings so models serialise cleanly. */
export type ISODate = string;
export type ID = string;

/**
 * Where a piece of information comes from. Study-abroad facts must name an
 * authoritative source; user input and calculations are labelled as such so the
 * UI can always distinguish preference, fact, calculated fit and uncertainty.
 */
export type SourceType =
  | 'official-government'
  | 'official-university'
  | 'official-scholarship'
  | 'intergovernmental' // OECD, UNESCO, etc.
  | 'licensed-publisher'
  | 'vocab-brain-original'
  | 'user-provided'
  | 'calculated'
  | 'unverified';

export interface SourceRef {
  name: string;
  url?: string;
  sourceType: SourceType;
}

/**
 * A single dynamic fact (tuition, work rights, deadline...). Never render a
 * SourcedValue as current without showing `lastVerified`.
 */
export interface SourcedValue<T> {
  value: T;
  source: SourceRef;
  lastVerified: ISODate;
  /** e.g. "masters", "undergraduate". Omitted means not degree-specific. */
  applicableDegree?: string;
  /** e.g. "international", "eu". */
  applicableStudentType?: string;
  notes?: string;
}

export type LicenseStatus =
  | 'licensed'
  | 'public-sample' // officially published sample material, used as permitted
  | 'original' // written by Vocab Brain
  | 'pending-review';

/** Metadata every piece of learning content must carry. */
export interface ContentProvenance {
  source: string;
  sourceType: SourceType;
  licenseStatus: LicenseStatus;
  dateAdded: ISODate;
}

export interface Money {
  amount: number;
  currency: string; // ISO 4217
}
