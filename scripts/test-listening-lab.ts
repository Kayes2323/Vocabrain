/**
 * Phase 1 structural validation for the Listening Lab: module/part tree
 * integrity, honest status values, the error taxonomy, and the audio
 * manifest/brief generator. Does not test lesson content or exercises —
 * none exist yet (Phase 2+). Run: pnpm test:listening-lab
 */
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  AUDIO_MANIFEST,
  LISTENING_ERROR_CODES,
  LISTENING_MODULES,
  PART3_TRAP_LIBRARY,
  PART_DASHBOARDS,
  findModule,
  findPartDashboard,
  findSkill,
  productionSummary,
  renderProductionBrief,
  resolveSkillRef,
  validateAsset,
  type AudioAsset,
  type DevelopmentStatus,
} from '../lib/listening-lab';
import { QUESTION_TYPES } from '../lib/ielts/question-types';
import { en } from '../lib/i18n/locales/en';
import { bn } from '../lib/i18n/locales/bn';

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

const VALID_STATUSES: DevelopmentStatus[] = ['planned', 'in-development', 'available'];
const nonEmpty = (s: string | undefined) => typeof s === 'string' && s.trim().length > 0;

// ---------- modules ----------
test('exactly 8 modules, numbered 1–8 with unique ids', () => {
  assert.equal(LISTENING_MODULES.length, 8);
  assert.deepEqual(LISTENING_MODULES.map((m) => m.number), [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.equal(new Set(LISTENING_MODULES.map((m) => m.id)).size, 8);
});

test('every module and skill has non-empty bilingual text and a valid status', () => {
  for (const m of LISTENING_MODULES) {
    assert.ok(nonEmpty(m.title.en) && nonEmpty(m.title.bn), `${m.id} title`);
    assert.ok(nonEmpty(m.purpose.en) && nonEmpty(m.purpose.bn), `${m.id} purpose`);
    assert.ok(VALID_STATUSES.includes(m.status), `${m.id} status`);
    assert.ok(m.skills.length > 0, `${m.id} has no skills`);
    const ids = new Set<string>();
    for (const s of m.skills) {
      assert.ok(!ids.has(s.id), `${m.id}: duplicate skill id ${s.id}`);
      ids.add(s.id);
      assert.ok(nonEmpty(s.title.en) && nonEmpty(s.title.bn), `${m.id}:${s.id} title`);
      assert.ok(nonEmpty(s.outcome.en) && nonEmpty(s.outcome.bn), `${m.id}:${s.id} outcome`);
      assert.ok(VALID_STATUSES.includes(s.status), `${m.id}:${s.id} status`);
      for (const qt of s.questionTypes ?? []) assert.ok(qt in QUESTION_TYPES, `${m.id}:${s.id} unknown question type ${qt}`);
      for (const p of s.parts ?? []) assert.ok([1, 2, 3, 4].includes(p), `${m.id}:${s.id} invalid part ${p}`);
    }
  }
});

test('HONEST STATE: no module or skill claims available/in-development without real content (Phase 1 ships structure only)', () => {
  for (const m of LISTENING_MODULES) {
    assert.equal(m.status, 'planned', `${m.id} module status`);
    for (const s of m.skills) {
      assert.equal(s.status, 'planned', `${m.id}:${s.id} skill status`);
      assert.ok(!s.lessonIds || s.lessonIds.length === 0, `${m.id}:${s.id} claims lessons that do not exist`);
    }
  }
});

test('findModule / findSkill resolve real entries and reject fake ones', () => {
  assert.equal(findModule('sound-recognition')?.id, 'sound-recognition');
  assert.equal(findModule('does-not-exist'), undefined);
  const found = findSkill('part3-conversation', 'opinion-recognition');
  assert.equal(found?.skill.id, 'opinion-recognition');
  assert.equal(findSkill('part3-conversation', 'nope'), undefined);
  assert.equal(findSkill('nope', 'nope'), undefined);
});

// ---------- part dashboards ----------
test('exactly parts 1–4, each with real question types and resolvable skill refs', () => {
  assert.deepEqual(PART_DASHBOARDS.map((p) => p.part).sort(), [1, 2, 3, 4]);
  for (const p of PART_DASHBOARDS) {
    assert.ok(nonEmpty(p.title.en) && nonEmpty(p.title.bn), `part ${p.part} title`);
    assert.ok(p.questionTypes.length > 0, `part ${p.part} has no question types`);
    for (const qt of p.questionTypes) assert.ok(qt in QUESTION_TYPES, `part ${p.part}: unknown question type ${qt}`);
    assert.ok(p.skillRefs.length > 0, `part ${p.part} has no skill refs`);
    for (const ref of p.skillRefs) assert.ok(resolveSkillRef(ref), `part ${p.part}: unresolved skill ref "${ref}"`);
    for (const trap of p.commonTraps) assert.ok(nonEmpty(trap.en) && nonEmpty(trap.bn), `part ${p.part} trap text`);
    assert.equal(p.status, 'planned', `part ${p.part} status`);
  }
});

test('findPartDashboard resolves 1–4 and rejects out-of-range input', () => {
  for (const n of [1, 2, 3, 4]) assert.equal(findPartDashboard(n)?.part, n);
  for (const n of [0, 5, -1, NaN]) assert.equal(findPartDashboard(n), undefined);
});

test('Part 3 Trap Library has entries, each bilingual', () => {
  assert.ok(PART3_TRAP_LIBRARY.length >= 3);
  const ids = new Set<string>();
  for (const trap of PART3_TRAP_LIBRARY) {
    assert.ok(!ids.has(trap.id), `duplicate trap id ${trap.id}`);
    ids.add(trap.id);
    assert.ok(nonEmpty(trap.title.en) && nonEmpty(trap.title.bn));
    assert.ok(nonEmpty(trap.explanation.en) && nonEmpty(trap.explanation.bn));
  }
});

// ---------- error taxonomy ----------
test('exactly the 10 documented error codes, each usable (not inferred from the wrong option alone)', () => {
  const expected = ['DEC', 'PAR', 'TRP', 'SPK', 'TIM', 'ATT', 'SPE', 'GRM', 'MAP', 'PRD'];
  assert.deepEqual(LISTENING_ERROR_CODES.map((e) => e.code).sort(), [...expected].sort());
  assert.equal(new Set(LISTENING_ERROR_CODES.map((e) => e.code)).size, 10);
  for (const e of LISTENING_ERROR_CODES) {
    assert.ok(nonEmpty(e.name.en) && nonEmpty(e.name.bn), `${e.code} name`);
    assert.ok(nonEmpty(e.detectedFrom.en) && nonEmpty(e.detectedFrom.bn), `${e.code} detectedFrom`);
    assert.ok(nonEmpty(e.nextStep.en) && nonEmpty(e.nextStep.bn), `${e.code} nextStep`);
    // The brief explicitly forbids inferring a code from the wrong option alone.
    assert.ok(!/wrong option alone|selected option alone/i.test(e.detectedFrom.en), e.code);
  }
});

// ---------- audio manifest & production brief ----------
test('the manifest starts empty: no asset is marked produced before it exists', () => {
  assert.deepEqual(AUDIO_MANIFEST, []);
  const summary = productionSummary();
  assert.deepEqual(summary, { total: 0, briefDrafted: 0, recording: 0, stitched: 0, needsRerecord: 0, qaPassed: 0, qaFailed: 0 });
});

const SAMPLE_ASSET: AudioAsset = {
  assetId: 'lab-sound-recognition-connected-speech-01',
  moduleId: 'sound-recognition',
  skillId: 'connected-speech',
  part: 2,
  questionTypes: ['short-answer'],
  difficulty: 1,
  locale: 'en-GB',
  speakers: [{ identity: 'Helen', accent: 'en-GB', voice: 'female', instructions: 'Calm, natural pace, clear but not slowed.' }],
  script: [
    { speaker: 'Helen', text: "Turn it off before you leave, could you?" },
    { speaker: 'Helen', text: "The museum closes at five, not four as the leaflet says." },
  ],
  transcript: "Turn it off before you leave, could you? The museum closes at five, not four as the leaflet says.",
  questions: [
    { id: 'q1', prompt: 'What time does the museum close?', type: 'short-answer', correctAnswer: 'five / 5 o\'clock', explanation: 'The leaflet time is corrected in the same sentence.', evidenceLineIndex: 1, distractor: { optionText: 'four o\'clock', rejectedAtLineIndex: 1, errorCode: 'TRP' } },
  ],
  trapCategories: ['spoken correction'],
  productionStatus: 'brief-drafted',
  qaStatus: 'not-started',
};

test('validateAsset accepts a well-formed sample and flags real problems (cast mismatch, out-of-range evidence, a stitched asset without a file)', () => {
  assert.deepEqual(validateAsset(SAMPLE_ASSET), []);
  assert.ok(validateAsset({ ...SAMPLE_ASSET, script: [{ speaker: 'Unknown Person', text: 'Hello.' }] }).length > 0);
  assert.ok(validateAsset({ ...SAMPLE_ASSET, questions: [{ ...SAMPLE_ASSET.questions[0], evidenceLineIndex: 99 }] }).length > 0);
  assert.ok(validateAsset({ ...SAMPLE_ASSET, productionStatus: 'stitched' }).length > 0);
  assert.deepEqual(validateAsset({ ...SAMPLE_ASSET, productionStatus: 'stitched', filePath: '/x.mp3', durationSeconds: 12 }), []);
});

test('validateAsset catches a performance direction or speaker label written as spoken text (rule 8)', () => {
  assert.ok(validateAsset({ ...SAMPLE_ASSET, script: [{ speaker: 'Helen', text: '[pause] Turn it off, could you?' }] }).length > 0);
  assert.ok(validateAsset({ ...SAMPLE_ASSET, script: [{ speaker: 'Helen', text: 'Helen: Turn it off, could you?' }] }).length > 0);
});

test('renderProductionBrief produces a self-contained Markdown brief with the required sections (brief §11, A–O)', () => {
  const brief = renderProductionBrief('Sound Recognition — Batch 1', 'Hear a spoken correction and still catch the real answer.', [SAMPLE_ASSET]);
  for (const must of [
    SAMPLE_ASSET.assetId,
    'Learning objective',
    'Accent',
    'Speakers',
    'Voice consistency',
    'Script (spoken text only',
    'Transcript (verified',
    'Questions, answer key and paraphrase mapping',
    'Trap categories',
    'Pronunciation notes',
    'Audio quality requirements',
    'File naming convention',
    'Turn it off before you leave',
  ]) {
    assert.ok(brief.includes(must), `brief missing "${must}"`);
  }
  // Spoken text and performance direction stay in separate places (rule 8): the brief's own text is not spoken.
  assert.ok(!/^\s*\[.*\]\s*$/m.test(SAMPLE_ASSET.script.map((l) => l.text).join('\n')));
});

test('renderProductionBrief handles an empty batch without throwing', () => {
  assert.doesNotThrow(() => renderProductionBrief('Empty batch', 'none', []));
});

// ---------- navigation and i18n wiring ----------
test('the Listening Lab route and its 4 sub-routes exist as real pages', () => {
  for (const route of ['app/(app)/ielts/listening/page.tsx', 'app/(app)/ielts/listening/module/[moduleId]/page.tsx', 'app/(app)/ielts/listening/part/[part]/page.tsx', 'app/(app)/ielts/listening/notebook/page.tsx']) {
    assert.ok(existsSync(join(process.cwd(), route)), route);
  }
});

test('the IELTS hub links to the Listening Lab, and the hub section is marked available', () => {
  const hub = require('node:fs').readFileSync(join(process.cwd(), 'app/(app)/ielts/page.tsx'), 'utf8');
  assert.match(hub, /'listening-lab'/);
});

test('i18n: sections, cards and the listeningLab namespace exist in both languages', () => {
  const dicts: Record<string, unknown> = { en, bn };
  for (const [lang, dict] of Object.entries(dicts)) {
    const d = dict as Record<string, Record<string, unknown>>;
    assert.ok((d.sections as Record<string, { title: string }>)?.['listening-lab']?.title, `${lang}: sections['listening-lab']`);
    assert.ok((d.ielts as { cards: Record<string, string> })?.cards?.['listening-lab'], `${lang}: ielts.cards['listening-lab']`);
    const lab = (d as Record<string, { status: Record<string, string>; title: string; subtitle: string }>).listeningLab;
    assert.ok(nonEmpty(lab?.title) && nonEmpty(lab?.subtitle), `${lang}: listeningLab.title/subtitle`);
    for (const s of VALID_STATUSES) assert.ok(nonEmpty(lab?.status?.[s]), `${lang}: listeningLab.status.${s}`);
  }
});

console.log(`\n${passed} passed`);
