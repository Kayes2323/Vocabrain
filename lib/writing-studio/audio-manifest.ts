// Mino Writing Studio — narration audio manifest. One central mapping from
// (lessonId, stepId) to its recorded clip, so no component hardcodes an
// audio path. Today this covers the 15 clips delivered for Module 2
// ("Understanding Visual Information" / visual-information.ts), matched to
// its 15 steps by content, not file order — every clip's script was read
// against the step it is assigned to (see docs/TASK1_AUDIO_MAPPING.md for
// the full verification). Adding a lesson's narration later is a data
// change here, never a new lookup mechanism.

export interface LessonAudioAsset {
  /** Stable id, independent of array position. */
  id: string;
  lessonId: string;
  stepId: string;
  /** Public path under /public, served as-is. */
  path: string;
  /** Verified against the real file with ffprobe — never asserted without checking. */
  durationSeconds: number;
  /** The approved narration script this clip is read from, for traceability. */
  scriptRef: string;
}

const TASK1_M2_BASE = '/audio/mino/writing-studio/task1-m2';

/**
 * Module 2 ("Understanding Visual Information"): 15 clips, one per step, in
 * the lesson's own step order. The Misreading Clinic clips (11-14) narrate
 * only the step's trainerMessage and the check's prompt — never the options
 * or explanation, matching the approved script's own rule not to reveal
 * answers before the learner responds.
 */
export const WRITING_STUDIO_AUDIO: LessonAudioAsset[] = [
  { id: 'task1-m2-01', lessonId: 'visual-information', stepId: 'intro', path: `${TASK1_M2_BASE}/task1-m2-01-intro.mp3`, durationSeconds: 49.92, scriptRef: 'task1-m2 scripts.json clip 01 (INTRO)' },
  { id: 'task1-m2-02', lessonId: 'visual-information', stepId: 'visual-anatomy', path: `${TASK1_M2_BASE}/task1-m2-02-visual-anatomy.mp3`, durationSeconds: 72.41, scriptRef: 'task1-m2 scripts.json clip 02 (VISUAL ANATOMY)' },
  { id: 'task1-m2-03', lessonId: 'visual-information', stepId: 'units', path: `${TASK1_M2_BASE}/task1-m2-03-units.mp3`, durationSeconds: 87.72, scriptRef: 'task1-m2 scripts.json clip 03 (UNITS)' },
  { id: 'task1-m2-04', lessonId: 'visual-information', stepId: 'time-categories', path: `${TASK1_M2_BASE}/task1-m2-04-time-categories.mp3`, durationSeconds: 81.6, scriptRef: 'task1-m2 scripts.json clip 04 (TIME AND CATEGORIES)' },
  { id: 'task1-m2-05', lessonId: 'visual-information', stepId: 'legend', path: `${TASK1_M2_BASE}/task1-m2-05-legend.mp3`, durationSeconds: 59.88, scriptRef: 'task1-m2 scripts.json clip 05 (LEGEND)' },
  { id: 'task1-m2-06', lessonId: 'visual-information', stepId: 'trend-or-static', path: `${TASK1_M2_BASE}/task1-m2-06-trend-or-static.mp3`, durationSeconds: 82.94, scriptRef: 'task1-m2 scripts.json clip 06 (TREND OR STATIC)' },
  { id: 'task1-m2-07', lessonId: 'visual-information', stepId: 'comparison', path: `${TASK1_M2_BASE}/task1-m2-07-comparison.mp3`, durationSeconds: 88.87, scriptRef: 'task1-m2 scripts.json clip 07 (COMPARISON)' },
  { id: 'task1-m2-08', lessonId: 'visual-information', stepId: 'change-types', path: `${TASK1_M2_BASE}/task1-m2-08-change-types.mp3`, durationSeconds: 93.94, scriptRef: 'task1-m2 scripts.json clip 08 (TWO TYPES OF CHANGE)' },
  { id: 'task1-m2-09', lessonId: 'visual-information', stepId: 'key-features', path: `${TASK1_M2_BASE}/task1-m2-09-key-features.mp3`, durationSeconds: 88.73, scriptRef: 'task1-m2 scripts.json clip 09 (KEY FEATURES)' },
  { id: 'task1-m2-10', lessonId: 'visual-information', stepId: 'guided-analysis', path: `${TASK1_M2_BASE}/task1-m2-10-guided-analysis.mp3`, durationSeconds: 75.07, scriptRef: 'task1-m2 scripts.json clip 10 (GUIDED CHART ANALYSIS)' },
  { id: 'task1-m2-11', lessonId: 'visual-information', stepId: 'misreading-clinic', path: `${TASK1_M2_BASE}/task1-m2-11-misreading-clinic.mp3`, durationSeconds: 33.96, scriptRef: 'task1-m2 scripts.json clip 11 (MISREADING CLINIC 1)' },
  { id: 'task1-m2-12', lessonId: 'visual-information', stepId: 'misreading-clinic-2', path: `${TASK1_M2_BASE}/task1-m2-12-misreading-clinic-2.mp3`, durationSeconds: 31.66, scriptRef: 'task1-m2 scripts.json clip 12 (MISREADING CLINIC 2)' },
  { id: 'task1-m2-13', lessonId: 'visual-information', stepId: 'misreading-clinic-3', path: `${TASK1_M2_BASE}/task1-m2-13-misreading-clinic-3.mp3`, durationSeconds: 30.0, scriptRef: 'task1-m2 scripts.json clip 13 (MISREADING CLINIC 3)' },
  { id: 'task1-m2-14', lessonId: 'visual-information', stepId: 'misreading-clinic-4', path: `${TASK1_M2_BASE}/task1-m2-14-misreading-clinic-4.mp3`, durationSeconds: 35.21, scriptRef: 'task1-m2 scripts.json clip 14 (MISREADING CLINIC 4)' },
  { id: 'task1-m2-15', lessonId: 'visual-information', stepId: 'independent-review', path: `${TASK1_M2_BASE}/task1-m2-15-independent-review.mp3`, durationSeconds: 104.88, scriptRef: 'task1-m2 scripts.json clip 15 (INDEPENDENT REVIEW)' },
];

export const findLessonStepAudio = (lessonId: string, stepId: string): LessonAudioAsset | undefined =>
  WRITING_STUDIO_AUDIO.find((a) => a.lessonId === lessonId && a.stepId === stepId);
