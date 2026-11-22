/**
 * Mino Listening — Phase 1 structural validation: the six-module tree,
 * Sound Gym's six lessons × six stages, the exact 36-asset audio mapping,
 * error tags, the pure progress engine, and that no audio file is claimed
 * to exist when it does not (the brief's central anti-fabrication rule).
 * Run: pnpm test:listening
 */
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  LISTENING_MODULES,
  SOUND_GYM_AUDIO_MANIFEST,
  SOUND_GYM_STAGE_ORDER,
  SOUND_GYM_ERROR_TAGS,
  STAGE_LABELS,
  emptyListeningProgress,
  findModule,
  findLesson,
  findStage,
  findAudioAsset,
  audioAssetsForLesson,
  findErrorTag,
  registerErrorTags,
  recordStageVisit,
  recordAnswer,
  isLessonComplete,
  isModuleComplete,
  masteryLevel,
  weakSkills,
  topErrors,
  recommendedNext,
  continueLearning,
  lessonsCompletedCount,
  totalMinutesPracticed,
  type ModuleId,
} from '../lib/listening';
import { emptyProfile } from '../lib/models';

let passed = 0;
function test(name: string, fn: () => void) {
  try {
    fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (error) {
    console.log(`FAIL ${name}\n  ${(error as Error).message}`);
    process.exitCode = 1;
  }
}

// =====================================================================
// six modules
// =====================================================================
test('exactly 6 modules, numbered 1–6, matching the brief\'s names and ids', () => {
  assert.equal(LISTENING_MODULES.length, 6);
  assert.deepEqual(LISTENING_MODULES.map((m) => m.number), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(
    LISTENING_MODULES.map((m) => m.id),
    ['sound-gym', 'speech-decoder', 'conversation-intelligence', 'academic-mind', 'accent-world', 'ielts-transfer-zone'],
  );
});

test('every module has bilingual, non-empty title/purpose and at least one learning area', () => {
  for (const m of LISTENING_MODULES) {
    assert.ok(m.title.en.trim() && m.title.bn.trim(), m.id);
    assert.ok(m.purpose.en.trim() && m.purpose.bn.trim(), m.id);
    assert.ok(m.learningAreas.length > 0, m.id);
    for (const area of m.learningAreas) assert.ok(area.en.trim() && area.bn.trim(), `${m.id} learning area`);
  }
});

test('only Sound Gym has real lessons in Phase 1; the other five are honestly empty and in-development', () => {
  const sg = findModule('sound-gym')!;
  assert.equal(sg.lessons.length, 6);
  // Sound Gym has lessons, but none of its 36 audio files have been delivered (verified below), so
  // the module itself must not claim "available": it is honestly 'audio-pending', never 'complete'.
  assert.equal(sg.status, 'audio-pending');
  assert.notEqual(sg.status, 'complete');
  for (const id of ['speech-decoder', 'conversation-intelligence', 'academic-mind', 'accent-world', 'ielts-transfer-zone'] as ModuleId[]) {
    const m = findModule(id)!;
    assert.deepEqual(m.lessons, [], id);
    assert.equal(m.status, 'in-development', id);
  }
});

// =====================================================================
// Sound Gym: 6 lessons × 6 stages
// =====================================================================
test('Sound Gym has exactly SG-01..SG-06, each with the 6 stages in the given order', () => {
  const sg = findModule('sound-gym')!;
  assert.deepEqual(sg.lessons.map((l) => l.code), ['SG-01', 'SG-02', 'SG-03', 'SG-04', 'SG-05', 'SG-06']);
  for (const lesson of sg.lessons) {
    assert.deepEqual(lesson.stages.map((s) => s.kind), SOUND_GYM_STAGE_ORDER, lesson.code);
    assert.equal(lesson.stages.length, 6, lesson.code);
    // No lesson may claim to be ready to play: none of its audio has been delivered yet.
    assert.equal(lesson.status, 'audio-pending', lesson.code);
    assert.notEqual(lesson.status, 'complete', lesson.code);
  }
});

test('every stage label is a real, non-empty bilingual name', () => {
  for (const kind of SOUND_GYM_STAGE_ORDER) {
    assert.ok(STAGE_LABELS[kind].en.trim() && STAGE_LABELS[kind].bn.trim(), kind);
  }
  assert.deepEqual(SOUND_GYM_STAGE_ORDER, ['diagnostic', 'understand', 'guided-practice', 'context-practice', 'challenge', 'transfer-test']);
});

test('findLesson / findStage resolve real entries and reject fake ones', () => {
  const found = findLesson('sg-01');
  assert.equal(found?.lesson.code, 'SG-01');
  assert.equal(found?.module.id, 'sound-gym');
  assert.equal(findLesson('sg-99'), undefined);
  assert.ok(findStage('sg-01', 'sg-01-diagnostic'));
  assert.equal(findStage('sg-01', 'nope'), undefined);
});

// =====================================================================
// the exact 36-asset audio mapping
// =====================================================================
test('exactly 36 assets, one per stage per lesson, every id and path matching the brief\'s mapping exactly', () => {
  assert.equal(SOUND_GYM_AUDIO_MANIFEST.length, 36);
  assert.equal(new Set(SOUND_GYM_AUDIO_MANIFEST.map((a) => a.assetId)).size, 36, 'all 36 asset ids are unique');
  for (let n = 1; n <= 6; n++) {
    const lessonCode = `SG${String(n).padStart(2, '0')}`;
    for (let a = 1; a <= 6; a++) {
      const assetId = `${lessonCode}-A${String(a).padStart(2, '0')}`;
      const asset = findAudioAsset(assetId);
      assert.ok(asset, `missing asset ${assetId}`);
      assert.equal(asset!.path, `/audio/mino/listening/sound-gym/${lessonCode}/${assetId}.mp3`);
      assert.equal(asset!.lessonId, `sg-${String(n).padStart(2, '0')}`);
    }
  }
});

test('each lesson\'s 6 assets are wired to its stages in stage order (asset A0n -> the nth stage)', () => {
  for (const lesson of findModule('sound-gym')!.lessons) {
    const assets = audioAssetsForLesson(lesson.id);
    assert.equal(assets.length, 6, lesson.code);
    lesson.stages.forEach((stage, i) => {
      assert.equal(stage.audioAssetId, assets[i].assetId, `${lesson.code} stage ${i}`);
      assert.equal(assets[i].stageId, stage.id);
    });
  }
});

test('HONEST STATE: no asset claims delivered speaker/accent metadata or a transcript it was never given', () => {
  for (const asset of SOUND_GYM_AUDIO_MANIFEST) {
    assert.equal(asset.speakers, undefined, asset.assetId);
    assert.equal(asset.scriptRef, undefined, asset.assetId);
    assert.equal(asset.durationSeconds, undefined, asset.assetId);
  }
});

test('ANTI-FABRICATION: none of the 36 audio files exist on disk in this build (no fake audio was created)', () => {
  for (const asset of SOUND_GYM_AUDIO_MANIFEST) {
    const onDisk = existsSync(join(process.cwd(), 'public', asset.path));
    assert.equal(onDisk, false, `${asset.assetId} should not exist yet (${asset.path}) — if it does, a real delivery landed and this test's assumption needs updating, not removing`);
  }
});

test('every Sound Gym stage honestly reports audio-pending content status (no invented script/question)', () => {
  for (const lesson of findModule('sound-gym')!.lessons) {
    for (const stage of lesson.stages) {
      assert.equal(stage.contentStatus, 'audio-pending', `${lesson.code} ${stage.kind}`);
      assert.equal(stage.content, undefined, `${lesson.code} ${stage.kind} should have no invented content`);
    }
  }
});

// =====================================================================
// error tags
// =====================================================================
test('the 6 Sound Gym error tags are exactly as given in the brief, unmodified', () => {
  const byCode: Record<string, string> = Object.fromEntries(SOUND_GYM_ERROR_TAGS.map((t) => [t.code, t.description]));
  assert.deepEqual(byCode, { 'SEG-01': 'Boundary confusion', 'CS-03': 'Assimilation', 'WF-01': 'Schwa', 'SC-01': 'Vowel discrimination', 'ND-01': 'Teen/ty confusion', 'NS-04': 'Speaker tracking' });
  for (const code of Object.keys(byCode)) assert.equal(findErrorTag(code)?.description, (byCode as Record<string, string>)[code]);
});

test('registerErrorTags lets a future module add its own tags; rejects silently redefining an existing one', () => {
  registerErrorTags([{ code: 'TEST-99', description: 'test-only tag', moduleId: 'speech-decoder' }]);
  assert.equal(findErrorTag('TEST-99')?.moduleId, 'speech-decoder');
  registerErrorTags([{ code: 'TEST-99', description: 'test-only tag', moduleId: 'speech-decoder' }]); // identical: no-op
  assert.throws(() => registerErrorTags([{ code: 'SEG-01', description: 'renamed', moduleId: 'sound-gym' }]), /already registered/);
  assert.equal(findErrorTag('SEG-01')?.description, 'Boundary confusion', 'the original Sound Gym tag is unchanged');
});

// =====================================================================
// progress engine (pure)
// =====================================================================
test('an empty progress record yields zero everywhere, never a fabricated number', () => {
  const p = emptyListeningProgress();
  assert.equal(masteryLevel(p), 'foundation');
  assert.deepEqual(weakSkills(p), []);
  assert.deepEqual(topErrors(p), []);
  assert.equal(lessonsCompletedCount(p), 0);
  assert.equal(totalMinutesPracticed(p), 0);
  assert.equal(continueLearning(p), undefined);
});

test('a first-time learner is recommended Sound Gym\'s first lesson, not a fake personalised pick', () => {
  const rec = recommendedNext(emptyListeningProgress());
  assert.equal(rec.module.id, 'sound-gym');
  assert.equal(rec.lesson?.id, 'sg-01');
});

test('recordStageVisit marks a stage done and is idempotent (visiting twice does not duplicate it)', () => {
  let p = emptyListeningProgress();
  p = recordStageVisit(p, 'sg-01', 'sg-01-diagnostic', 2, new Date('2026-01-01T00:00:00Z'));
  p = recordStageVisit(p, 'sg-01', 'sg-01-diagnostic', 2, new Date('2026-01-01T00:05:00Z'));
  assert.deepEqual(p.lessons['sg-01'].stagesCompleted, ['sg-01-diagnostic']);
});

test('a lesson is complete only once every one of its stages is visited', () => {
  const lesson = findLesson('sg-01')!.lesson;
  let p = emptyListeningProgress();
  assert.equal(isLessonComplete(lesson, p.lessons['sg-01']), false);
  for (const stage of lesson.stages) p = recordStageVisit(p, 'sg-01', stage.id, 1);
  assert.equal(isLessonComplete(lesson, p.lessons['sg-01']), true);
});

test('isModuleComplete requires every lesson done, and is false for an empty (no-lesson) module', () => {
  const sg = findModule('sound-gym')!;
  let p = emptyListeningProgress();
  assert.equal(isModuleComplete(sg, p), false);
  for (const lesson of sg.lessons) for (const stage of lesson.stages) p = recordStageVisit(p, lesson.id, stage.id, 1);
  assert.equal(isModuleComplete(sg, p), true);
  assert.equal(isModuleComplete(findModule('speech-decoder')!, p), false, 'an empty module is never "complete"');
});

test('mastery levels follow the documented criteria, not a percentage; higher levels are unreachable without their module\'s content', () => {
  let p = emptyListeningProgress();
  assert.equal(masteryLevel(p), 'foundation');
  const sg = findModule('sound-gym')!;
  for (const lesson of sg.lessons) for (const stage of lesson.stages) p = recordStageVisit(p, lesson.id, stage.id, 1);
  assert.equal(masteryLevel(p), 'recognition', 'all Sound Gym lessons done -> recognition');
  // speech-decoder, conversation-intelligence, academic-mind, ielts-transfer-zone all have 0 lessons,
  // so isModuleComplete is false for each: no amount of Sound Gym progress can reach comprehension+.
  assert.notEqual(masteryLevel(p), 'comprehension');
});

test('recordAnswer updates skill stats, and tags error codes only on a wrong answer', () => {
  let p = emptyListeningProgress();
  p = recordAnswer(p, 'SG-01', true, ['SEG-01']);
  assert.deepEqual(p.skills['SG-01'], { attempts: 1, correct: 1, lastPracticedAt: p.skills['SG-01'].lastPracticedAt });
  assert.deepEqual(p.errors, {}, 'a correct answer tags no error');
  p = recordAnswer(p, 'SG-01', false, ['SEG-01']);
  assert.equal(p.skills['SG-01'].attempts, 2);
  assert.equal(p.skills['SG-01'].correct, 1);
  assert.equal(p.errors['SEG-01'].count, 1);
});

test('weakSkills needs at least minAttempts and under 70% accuracy; ignores a skill with only a couple of tries', () => {
  let p = emptyListeningProgress();
  p = recordAnswer(p, 'SG-01', false, ['SEG-01']);
  p = recordAnswer(p, 'SG-01', false, ['SEG-01']);
  assert.deepEqual(weakSkills(p), [], 'only 2 attempts: not enough data yet');
  p = recordAnswer(p, 'SG-01', false, ['SEG-01']);
  const weak = weakSkills(p);
  assert.equal(weak.length, 1);
  assert.equal(weak[0].skillTag, 'SG-01');
  assert.equal(weak[0].accuracy, 0);
});

test('topErrors sorts by frequency, most frequent first', () => {
  let p = emptyListeningProgress();
  p = recordAnswer(p, 'SG-01', false, ['SEG-01']);
  p = recordAnswer(p, 'SG-02', false, ['CS-03']);
  p = recordAnswer(p, 'SG-02', false, ['CS-03']);
  const errs = topErrors(p);
  assert.equal(errs[0].code, 'CS-03');
  assert.equal(errs[0].count, 2);
  assert.equal(errs[1].code, 'SEG-01');
});

test('continueLearning resumes a real in-progress stage, and returns nothing for a stale/invalid one', () => {
  const p1 = { ...emptyListeningProgress(), inProgress: { lessonId: 'sg-02', stageId: 'sg-02-understand', stageIndex: 1 } };
  assert.deepEqual(continueLearning(p1), { lessonId: 'sg-02', stageId: 'sg-02-understand' });
  const p2 = { ...emptyListeningProgress(), inProgress: { lessonId: 'sg-02', stageId: 'does-not-exist', stageIndex: 1 } };
  assert.equal(continueLearning(p2), undefined);
});

// =====================================================================
// profile wiring
// =====================================================================
test('emptyProfile includes a listening field shaped exactly like ListeningProgress', () => {
  const profile = emptyProfile('u1');
  assert.deepEqual(profile.listening, { lessons: {}, skills: {}, errors: {}, days: {} });
});

// =====================================================================
// navigation and routes
// =====================================================================
test('the Mino Listening routes exist as real pages', () => {
  for (const route of [
    'app/(app)/ielts/listening/page.tsx',
    'app/(app)/ielts/listening/module/[moduleId]/page.tsx',
    'app/(app)/ielts/listening/lesson/[lessonId]/page.tsx',
    'app/(app)/ielts/listening/practice/page.tsx',
  ]) {
    assert.ok(existsSync(join(process.cwd(), route)), route);
  }
});

test('the IELTS hub still links to /ielts/listening', () => {
  const hub = require('node:fs').readFileSync(join(process.cwd(), 'app/(app)/ielts/page.tsx'), 'utf8');
  assert.match(hub, /listening-lab/);
  const nav = require('node:fs').readFileSync(join(process.cwd(), 'lib/navigation.ts'), 'utf8');
  assert.match(nav, /href: '\/ielts\/listening'/);
});

console.log(`\n${passed} passed`);
