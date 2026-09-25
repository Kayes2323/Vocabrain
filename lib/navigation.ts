// Single source of truth for the information architecture. Screens render
// these lists; adding a section means adding an entry here plus its copy
// under `sections.<id>` in lib/i18n/locales.
import {
  BookOpen,
  BookText,
  Building2,
  Calculator,
  CalendarClock,
  ClipboardCheck,
  ClipboardList,
  FileText,
  Globe2,
  GraduationCap,
  Headphones,
  Home,
  Landmark,
  Luggage,
  Mic,
  PenLine,
  Plane,
  Scale,
  Sparkles,
  SpellCheck,
  Target,
  Timer,
  User,
  type LucideIcon,
} from 'lucide-react';

export interface PrimaryNavItem {
  href: string;
  /** i18n key under `nav`. */
  labelKey: string;
  icon: LucideIcon;
  /** Mino gets a distinctive treatment in the nav. */
  featured?: boolean;
}

export const PRIMARY_NAV: PrimaryNavItem[] = [
  { href: '/', labelKey: 'nav.home', icon: Home },
  { href: '/ielts', labelKey: 'nav.ielts', icon: GraduationCap },
  { href: '/mino', labelKey: 'nav.mino', icon: Sparkles, featured: true },
  { href: '/abroad', labelKey: 'nav.abroad', icon: Plane },
  { href: '/profile', labelKey: 'nav.profile', icon: User },
];

export function isNavActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** "available" sections are usable now; "planned" show what is coming and when. */
export type SectionStatus = 'available' | 'planned';

/**
 * A section of the app. Title, description and highlights live in the
 * locale files under `sections.<id>`.
 */
export interface SectionDef {
  id: string;
  icon: LucideIcon;
  href: string;
  status: SectionStatus;
  /** Roadmap phase that delivers the full feature (see docs/ARCHITECTURE.md). */
  phase: number;
}

export const sectionKey = (id: string, field: 'title' | 'description' | 'highlights') => `sections.${id}.${field}`;

export const IELTS_SECTIONS: SectionDef[] = [
  { id: 'plan', icon: Target, href: '/ielts/plan', status: 'planned', phase: 2 },
  { id: 'listening', icon: Headphones, href: '/ielts/listening', status: 'planned', phase: 2 },
  { id: 'reading', icon: BookText, href: '/ielts/reading', status: 'available', phase: 3 },
  { id: 'writing', icon: PenLine, href: '/ielts/writing', status: 'planned', phase: 3 },
  { id: 'speaking', icon: Mic, href: '/ielts/speaking', status: 'planned', phase: 3 },
  { id: 'vocabulary', icon: BookOpen, href: '/ielts/vocabulary', status: 'available', phase: 1 },
  { id: 'grammar', icon: SpellCheck, href: '/ielts/grammar', status: 'planned', phase: 2 },
  { id: 'mock-tests', icon: Timer, href: '/ielts/mock-tests', status: 'planned', phase: 2 },
];

export const IELTS_TOOLS: SectionDef[] = [
  { id: 'band-calculator', icon: Calculator, href: '/ielts/band-calculator', status: 'available', phase: 1 },
];

export interface SectionGroup {
  /** i18n key for the group heading. */
  titleKey: string;
  sections: SectionDef[];
}

export const ABROAD_SECTION_GROUPS: SectionGroup[] = [
  {
    titleKey: 'abroad.groups.explore',
    sections: [
      { id: 'countries', icon: Globe2, href: '/abroad/countries', status: 'available', phase: 4 },
      { id: 'country-match', icon: Scale, href: '/abroad/country-match', status: 'planned', phase: 4 },
      { id: 'universities', icon: Building2, href: '/abroad/universities', status: 'planned', phase: 4 },
    ],
  },
  {
    titleKey: 'abroad.groups.plan',
    sections: [
      { id: 'cost', icon: Calculator, href: '/abroad/cost', status: 'planned', phase: 4 },
      { id: 'scholarships', icon: Landmark, href: '/abroad/scholarships', status: 'planned', phase: 4 },
      { id: 'deadlines', icon: CalendarClock, href: '/abroad/deadlines', status: 'planned', phase: 4 },
    ],
  },
  {
    titleKey: 'abroad.groups.apply',
    sections: [
      { id: 'applications', icon: ClipboardList, href: '/abroad/applications', status: 'planned', phase: 5 },
      { id: 'documents', icon: FileText, href: '/abroad/documents', status: 'planned', phase: 5 },
    ],
  },
  {
    titleKey: 'abroad.groups.go',
    sections: [
      { id: 'visa', icon: ClipboardCheck, href: '/abroad/visa', status: 'planned', phase: 5 },
      { id: 'pre-departure', icon: Luggage, href: '/abroad/pre-departure', status: 'planned', phase: 5 },
    ],
  },
];

export const ABROAD_SECTIONS: SectionDef[] = ABROAD_SECTION_GROUPS.flatMap((g) => g.sections);

export function findSection(list: SectionDef[], id: string): SectionDef | undefined {
  return list.find((s) => s.id === id);
}
