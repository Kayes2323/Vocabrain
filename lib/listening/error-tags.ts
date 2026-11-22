/**
 * Error tag registry (brief §9). Sound Gym's six tags below are given
 * verbatim in the brief and are never renamed. Other modules get their own
 * namespaced prefix when their content arrives (e.g. a future
 * Conversation Intelligence tag might be `SPK-01`) — `registerErrorTags`
 * is how a later content package adds its own without touching this file's
 * existing entries or any module's UI.
 */
import type { ModuleId } from './model';

export interface ErrorTagDef {
  code: string;
  description: string;
  moduleId: ModuleId;
  /** Which lesson this tag is seeded against, when known. */
  lessonId?: string;
}

/** The six Sound Gym tags named in the brief, unmodified. */
export const SOUND_GYM_ERROR_TAGS: ErrorTagDef[] = [
  { code: 'SEG-01', description: 'Boundary confusion', moduleId: 'sound-gym', lessonId: 'sg-01' },
  { code: 'CS-03', description: 'Assimilation', moduleId: 'sound-gym', lessonId: 'sg-02' },
  { code: 'WF-01', description: 'Schwa', moduleId: 'sound-gym', lessonId: 'sg-03' },
  { code: 'SC-01', description: 'Vowel discrimination', moduleId: 'sound-gym', lessonId: 'sg-04' },
  { code: 'ND-01', description: 'Teen/ty confusion', moduleId: 'sound-gym', lessonId: 'sg-05' },
  { code: 'NS-04', description: 'Speaker tracking', moduleId: 'sound-gym', lessonId: 'sg-06' },
];

const registry = new Map<string, ErrorTagDef>(SOUND_GYM_ERROR_TAGS.map((t) => [t.code, t]));

/**
 * Adds a module's own error tags once its content package defines them.
 * Throws on a code that already exists (a later package must not silently
 * redefine an existing tag) and ignores an exact re-registration of the
 * same tag (idempotent on repeated calls with identical data).
 */
export function registerErrorTags(tags: ErrorTagDef[]): void {
  for (const tag of tags) {
    const existing = registry.get(tag.code);
    if (existing && JSON.stringify(existing) !== JSON.stringify(tag)) {
      throw new Error(`Error tag ${tag.code} is already registered with different data`);
    }
    registry.set(tag.code, tag);
  }
}

export const findErrorTag = (code: string): ErrorTagDef | undefined => registry.get(code);
export const allErrorTags = (): ErrorTagDef[] => [...registry.values()];
export const errorTagsForModule = (moduleId: ModuleId): ErrorTagDef[] => allErrorTags().filter((t) => t.moduleId === moduleId);
