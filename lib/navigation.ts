// Single source of truth for the information architecture. Screens render
// these lists; adding a section means adding an entry here.
import {
  BookOpen,
  BookText,
  Building2,
  Calculator,
  CalendarClock,
  ClipboardCheck,
  ClipboardList,
  Compass,
  FileText,
  Globe2,
  GraduationCap,
  Headphones,
  Home,
  Landmark,
  Luggage,
  Map,
  Mic,
  PenLine,
  Plane,
  Scale,
  Sparkles,
  Target,
  Timer,
  User,
  type LucideIcon,
} from 'lucide-react';

export interface PrimaryNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Mino gets a distinctive treatment in the nav. */
  featured?: boolean;
}

export const PRIMARY_NAV: PrimaryNavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/ielts', label: 'IELTS', icon: GraduationCap },
  { href: '/mino', label: 'Mino', icon: Sparkles, featured: true },
  { href: '/abroad', label: 'Abroad', icon: Plane },
  { href: '/profile', label: 'Profile', icon: User },
];

export function isNavActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** "available" sections are usable now; "planned" show what is coming and when. */
export type SectionStatus = 'available' | 'planned';

export interface SectionDef {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  status: SectionStatus;
  /** Roadmap phase that delivers the full feature. */
  phase: number;
  /** What the student will be able to do, shown on the placeholder screen. */
  highlights?: string[];
}

export const IELTS_SECTIONS: SectionDef[] = [
  {
    id: 'plan',
    title: 'My IELTS Plan',
    description: 'A weekly plan built from your target and test date.',
    icon: Target,
    href: '/ielts/plan',
    status: 'planned',
    phase: 3,
    highlights: [
      'Plan phases from foundation to final preparation',
      'Daily time split across the four skills',
      'Automatic rebalancing when a skill falls behind',
    ],
  },
  {
    id: 'listening',
    title: 'Listening',
    description: 'Audio practice with section-by-section feedback.',
    icon: Headphones,
    href: '/ielts/listening',
    status: 'planned',
    phase: 3,
    highlights: ['Section 1–4 practice sets', 'Answer review with transcripts', 'Band tracking'],
  },
  {
    id: 'reading',
    title: 'Reading',
    description: 'Daily passages that feed your vocabulary notebook.',
    icon: BookText,
    href: '/ielts/reading',
    status: 'planned',
    phase: 2,
    highlights: [
      'Today’s Reading: one focused passage a day',
      'Tap any word to save it to your Brain, with its sentence',
      'Paraphrase and synonym recognition drills',
    ],
  },
  {
    id: 'writing',
    title: 'Writing',
    description: 'Task 1 and Task 2 practice with structured feedback.',
    icon: PenLine,
    href: '/ielts/writing',
    status: 'planned',
    phase: 7,
    highlights: [
      'Use your saved words in real IELTS arguments',
      'Feedback on accuracy, appropriacy and collocation',
      'Guidance towards natural, not over-complicated, vocabulary',
    ],
  },
  {
    id: 'speaking',
    title: 'Speaking',
    description: 'Voice practice for Parts 1, 2 and 3.',
    icon: Mic,
    href: '/ielts/speaking',
    status: 'planned',
    phase: 7,
    highlights: [
      'Speak your answer and get feedback from Mino',
      '“I forgot the word” paraphrase practice',
      'Target-word usage and range tracking',
    ],
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Topic lessons and the IELTS word bank.',
    icon: BookOpen,
    href: '/ielts/vocabulary',
    status: 'available',
    phase: 1,
  },
  {
    id: 'mock-tests',
    title: 'Mock Tests',
    description: 'Full timed tests to measure your band.',
    icon: Timer,
    href: '/ielts/mock-tests',
    status: 'planned',
    phase: 3,
    highlights: ['Full timed test conditions', 'Band estimate per skill', 'Results feed your plan'],
  },
];

export const IELTS_TOOLS: SectionDef[] = [
  {
    id: 'band-calculator',
    title: 'Band score calculator',
    description: 'Work out an overall band from four skill scores.',
    icon: Calculator,
    href: '/ielts/band-calculator',
    status: 'available',
    phase: 1,
  },
];

export interface SectionGroup {
  title: string;
  sections: SectionDef[];
}

export const ABROAD_SECTION_GROUPS: SectionGroup[] = [
  {
    title: 'Explore',
    sections: [
      {
        id: 'countries',
        title: 'Country Explorer',
        description: 'Browse study destinations.',
        icon: Globe2,
        href: '/abroad/countries',
        status: 'available',
        phase: 5,
      },
      {
        id: 'country-match',
        title: 'Country Match',
        description: 'Destinations that align with your priorities.',
        icon: Scale,
        href: '/abroad/country-match',
        status: 'planned',
        phase: 5,
        highlights: [
          'Rank what matters to you: cost, career, scholarships, lifestyle',
          'See how each destination aligns, factor by factor',
          'Every fact shows its official source and when it was last verified',
        ],
      },
      {
        id: 'universities',
        title: 'University Finder',
        description: 'Courses that could be a potential fit.',
        icon: Building2,
        href: '/abroad/universities',
        status: 'planned',
        phase: 6,
        highlights: [
          'Filter by subject, degree, budget and IELTS score',
          'Potential-fit matches with a clear eligibility check',
          'Save courses to your shortlist',
        ],
      },
    ],
  },
  {
    title: 'Plan & fund',
    sections: [
      {
        id: 'cost',
        title: 'Cost Calculator',
        description: 'Estimate your first-year cost and funding gap.',
        icon: Calculator,
        href: '/abroad/cost',
        status: 'planned',
        phase: 6,
        highlights: ['Minimum, typical and higher-cost scenarios', 'Estimated first-year total', 'Estimated funding gap'],
      },
      {
        id: 'scholarships',
        title: 'Scholarships',
        description: 'Funding you may be eligible for.',
        icon: Landmark,
        href: '/abroad/scholarships',
        status: 'planned',
        phase: 6,
        highlights: ['Filter by country, degree and funding type', 'Official source and deadline for each', 'Save and track applications'],
      },
      {
        id: 'deadlines',
        title: 'Deadlines',
        description: 'Dates for your target intake.',
        icon: CalendarClock,
        href: '/abroad/deadlines',
        status: 'planned',
        phase: 6,
        highlights: ['Deadlines per university, course and intake', 'Reminders before each date', 'Verified from official sources'],
      },
    ],
  },
  {
    title: 'Apply',
    sections: [
      {
        id: 'applications',
        title: 'Applications',
        description: 'Track every university application.',
        icon: ClipboardList,
        href: '/abroad/applications',
        status: 'planned',
        phase: 6,
        highlights: ['A checklist and timeline per university', 'SOP, LOR and transcript tracking', 'Decision tracking'],
      },
      {
        id: 'documents',
        title: 'Documents',
        description: 'What you need, and what is ready.',
        icon: FileText,
        href: '/abroad/documents',
        status: 'planned',
        phase: 6,
        highlights: ['Passport, transcripts, IELTS, CV, SOP, LOR', 'Country and university-specific checklists', 'Status for each document'],
      },
    ],
  },
  {
    title: 'Go',
    sections: [
      {
        id: 'visa',
        title: 'Visa Preparation',
        description: 'Prepare documents and interview answers.',
        icon: ClipboardCheck,
        href: '/abroad/visa',
        status: 'planned',
        phase: 7,
        highlights: [
          'Checklists linked to official government guidance',
          'Interview practice with Mino',
          'Not legal advice: always confirm with the official source',
        ],
      },
      {
        id: 'pre-departure',
        title: 'Pre-Departure',
        description: 'Everything for your first 30 days.',
        icon: Luggage,
        href: '/abroad/pre-departure',
        status: 'planned',
        phase: 8,
        highlights: ['Accommodation, banking, SIM and insurance', 'Packing and arrival checklist', 'First 30 days planner'],
      },
    ],
  },
];

export const ABROAD_SECTIONS: SectionDef[] = ABROAD_SECTION_GROUPS.flatMap((g) => g.sections);

export const JOURNEY_ICON: LucideIcon = Map;
export const COMPASS_ICON: LucideIcon = Compass;

export function findSection(list: SectionDef[], id: string): SectionDef | undefined {
  return list.find((s) => s.id === id);
}
