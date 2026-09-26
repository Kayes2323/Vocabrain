import type { FoundationProgress } from '@/lib/models';
import { LEVELS, MODULES } from './content';
import type { ErrorTag, FoundationSkill, Lesson, Module } from './model';


export type LessonOutcome = 'strong' | 'good' | 'practice';

/** ≥80: move on · 60–79: good, review the misses · <60: a little more practice. */
export function lessonOutcome(score: number): LessonOutcome {
  return score >= 80 ? 'strong' : score >= 60 ? 'good' : 'practice';
}

export const lessonTotal = (m: Module) => m.lessons.length + (m.planned?.length ?? 0);
export const lessonsDone = (m: Module, fp: FoundationProgress) => m.lessons.filter((l) => fp.lessons[l.id]).length;
export const isComingSoon = (m: Module) => m.lessons.length === 0;

/** 0–100. */
export function moduleProgress(m: Module, fp: FoundationProgress): number {
  const total = lessonTotal(m);
  return total ? Math.round((lessonsDone(m, fp) / total) * 100) : 0;
}

/** 0–100 over every lesson in the level, including ones still being written. */
export function levelProgress(level: number, fp: FoundationProgress): number {
  const mods = MODULES.filter((m) => m.level === level);
  const total = mods.reduce((s, m) => s + lessonTotal(m), 0);
  const done = mods.reduce((s, m) => s + lessonsDone(m, fp), 0);
  return total ? Math.round((done / total) * 100) : 0;
}

/** A strong diagnostic means the student may skip Level 1 (lessons stay open for review). */
export const testedOutOfFoundation = (fp: FoundationProgress) => fp.diagnostic?.level === 'strong';

export interface SkillProgress {
  skill: FoundationSkill;
  /** 0–100, or null when no lessons exist yet for this skill. */
  percent: number | null;
  done: number;
  total: number;
}

/** Progress per skill across the course: completed lessons / all lessons (written + planned). */
export function skillProgress(fp: FoundationProgress): SkillProgress[] {
  const skills: FoundationSkill[] = ['grammar', 'vocabulary', 'listening', 'reading', 'writing', 'speaking'];
  return skills.map((skill) => {
    let total = 0;
    let done = 0;
    let written = 0;
    for (const m of MODULES) {
      for (const l of m.lessons) {
        if (l.skill !== skill) continue;
        total++;
        written++;
        if (fp.lessons[l.id]) done++;
      }
      if (m.skill === skill) total += m.planned?.length ?? 0;
    }
    return { skill, done, total, percent: written ? Math.round((done / total) * 100) : null };
  });
}

/** Recommended module to start with, from the diagnostic. */
export function recommendedModule(fp: FoundationProgress): Module | undefined {
  const d = fp.diagnostic;
  if (!d) return undefined;
  if (d.level === 'strong') return MODULES.find((m) => m.level === 2 && !isComingSoon(m));
  if (d.level === 'developing') {
    const focus = d.focusModules.map((id) => MODULES.find((m) => m.id === id)).find((m) => m && m.level === 1 && !isComingSoon(m));
    if (focus) return focus;
  }
  return MODULES[0];
}

/**
 * The next lesson: the first unfinished lesson of the recommended module, then
 * the course in order. Students who tested out skip Level 1.
 */
export function nextLesson(fp: FoundationProgress): { module: Module; lesson: Lesson } | undefined {
  const skipLevel1 = testedOutOfFoundation(fp);
  const rec = recommendedModule(fp);
  const ordered = [...(rec ? [rec] : []), ...MODULES.filter((m) => m !== rec && !(skipLevel1 && m.level === 1))];
  for (const module of ordered) {
    const lesson = module.lessons.find((l) => !fp.lessons[l.id]);
    if (lesson) return { module, lesson };
  }
  return undefined;
}

/** Records a finished lesson and the error tags of its wrong answers. */
export function recordLesson(fp: FoundationProgress, lessonId: string, score: number, wrongTags: ErrorTag[], now = new Date()): FoundationProgress {
  const at = now.toISOString();
  const prev = fp.lessons[lessonId];
  return {
    ...fp,
    lessons: {
      ...fp.lessons,
      [lessonId]: { completedAt: at, score, best: Math.max(score, prev?.best ?? 0), attempts: (prev?.attempts ?? 0) + 1 },
    },
    errors: addErrors(fp.errors, wrongTags, at),
  };
}

export function addErrors(errors: FoundationProgress['errors'], tags: ErrorTag[], at: string): FoundationProgress['errors'] {
  const next = { ...errors };
  for (const tag of tags) next[tag] = { count: (next[tag]?.count ?? 0) + 1, lastAt: at };
  return next;
}

/** Most frequent error tags, for the dashboard and Mino. */
export function topErrors(fp: FoundationProgress, n = 3): { tag: ErrorTag; count: number }[] {
  return Object.entries(fp.errors)
    .map(([tag, e]) => ({ tag: tag as ErrorTag, count: e.count }))
    .filter((e) => e.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

/** Modules that practise a tag (Level 1 first). */
export const modulesForTag = (tag: ErrorTag) => MODULES.filter((m) => m.tags.includes(tag)).sort((a, b) => a.level - b.level || a.number - b.number);

export { LEVELS };
