/** Recorded Listening checks (no network). Run: npm run test:listening-audio */
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { ALL_BOOKS as BOOKS } from '../lib/ielts/content';
import { CHECK_SECONDS, LISTENING_CAST, LISTENING_VOICES, listeningTracks, NARRATOR, READ_SECONDS } from '../lib/ielts/listening-audio';
import type { ObjectivePart } from '../lib/ielts';

let passed = 0;
const test = (name: string, fn: () => void) => {
  try {
    fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (e) {
    console.log(`FAIL ${name}\n  ${(e as Error).message}`);
    process.exitCode = 1;
  }
};

const castParts = BOOKS.flatMap((b) => b.tests).flatMap((t) =>
  (t.sections.listening?.parts ?? []).map((part, index, all) => ({ id: `${t.id}:${part.id}`, testId: t.id, part, index, count: all.length })).filter((p) => LISTENING_CAST[p.id]),
);
const questionNumbers = (part: ObjectivePart) => part.groups.flatMap((g) => g.questions.map((q) => q.number));
const evidenceFor = (part: ObjectivePart, n: number) => part.groups.flatMap((g) => g.questions).find((q) => q.number === n)?.explanation?.evidence?.quote ?? '';
const parseRange = (r: string) => {
  const [a, b] = r.split(' to ').map(Number);
  return Array.from({ length: b - a + 1 }, (_, i) => a + i);
};
const tracksOf = (p: (typeof castParts)[number]) => listeningTracks(p.part.audio!, { testId: p.testId, partId: p.part.id, number: p.part.number, index: p.index, count: p.count });

test('every part of every Mino mock test is planned for recording', () => {
  assert.deepEqual(castParts.map((p) => p.id).sort(), ['vb-mock-1', 'vb-mock-2', 'vb-mock-3', 'vb-mock-4', 'vb-mock-5', 'vb-mock-6', 'vb-mock-7', 'vb-mock-9', 'vb-mock-10', 'vb-mock-11', 'vb-mock-12', 'vb-mock-13', 'vb-mock-14'].flatMap((t) => ['l1', 'l2', 'l3', 'l4'].map((p) => `${t}:${p}`)).sort());
});

test('every speaker has a voice of their own, different from the narrator and from each other', () => {
  for (const p of castParts) {
    const cast = LISTENING_CAST[p.id];
    const speakers = [...new Set(p.part.audio!.script!.map((l) => l.speaker))];
    assert.deepEqual(speakers.sort(), Object.keys(cast).sort(), `${p.id}: cast matches the script`);
    const voices = Object.values(cast);
    assert.equal(new Set([...voices, NARRATOR]).size, voices.length + 1, `${p.id}: no two speakers share a voice`);
    for (const v of voices) assert.ok(LISTENING_VOICES[v], `${p.id}: ${v} is a known voice`);
  }
});

test('question sets cover the whole part, in order, and each break falls after the last answer of the set before it', () => {
  for (const p of castParts) {
    const audio = p.part.audio!;
    const sets = audio.sets!;
    assert.equal(sets[0].fromLine, 0);
    assert.deepEqual(sets.flatMap((s) => parseRange(s.questions)), questionNumbers(p.part), `${p.id}: sets list every question once`);
    const lines = audio.script!;
    sets.forEach((set, i) => {
      const end = sets[i + 1]?.fromLine ?? lines.length;
      assert.ok(set.fromLine < end && end <= lines.length, `${p.id}: set ${i} has lines`);
      const heard = lines.slice(set.fromLine, end).map((l) => l.text).join(' ');
      for (const n of parseRange(set.questions)) {
        assert.ok(evidenceFor(p.part, n).split('…').map((x) => x.trim()).filter(Boolean).every((piece) => heard.includes(piece)), `${p.id}: the answer to Q${n} is spoken inside its own set (before the next break)`);
      }
    });
  }
});

test('the recording follows the real test: welcome once, each set announced then read in silence, closing, time to check', () => {
  for (const p of castParts) {
    const tracks = tracksOf(p);
    const said = (t: (typeof tracks)[number]) => (t.kind === 'say' && t.voice === NARRATOR ? t.text : '');
    const text = tracks.map(said).join(' ');
    assert.equal(/Welcome to the Listening test/.test(text), p.index === 0, `${p.id}: welcome only at the start of the test`);
    assert.match(text, new RegExp(`Part ${p.part.number}\\.`));
    p.part.audio!.sets!.forEach((s) => assert.ok(text.includes(`questions ${s.questions}`), `${p.id}: announces questions ${s.questions}`));
    assert.equal(/Before you hear the rest of the (conversation|discussion|talk)/.test(text), p.part.audio!.sets!.length > 1, `${p.id}: a break is announced only when there is a second set`);
    const silences = tracks.filter((t): t is Extract<typeof t, { kind: 'silence' }> => t.kind === 'silence');
    assert.deepEqual(silences.map((s) => [s.cue, s.seconds]), [...p.part.audio!.sets!.map(() => ['read', READ_SECONDS]), ['check', CHECK_SECONDS]]);
    assert.ok(tracks[tracks.length - 1].kind === 'silence' && (tracks[tracks.length - 1] as { cue: string }).cue === 'check', `${p.id}: ends with time to check`);
  }
});

test('the break is announced right before the speaker who starts the next set', () => {
  for (const p of castParts) {
    const audio = p.part.audio!;
    if (audio.sets!.length < 2) continue;
    const tracks = tracksOf(p);
    const at = tracks.findIndex((t) => t.kind === 'say' && t.voice === NARRATOR && t.text.startsWith('Before you hear the rest'));
    const next = tracks.slice(at).find((t) => t.kind === 'say' && t.voice !== NARRATOR);
    assert.equal(next && next.kind === 'say' ? next.text : '', audio.script![audio.sets![1].fromLine].text);
  }
});

test('stitched recordings exist, match their timeline and are listed in the content', () => {
  const metaFile = join(process.cwd(), 'lib', 'ielts', 'content', 'vb-mock', 'listening-audio.json');
  const meta = JSON.parse(readFileSync(metaFile, 'utf8')) as Record<string, { src: string; duration: number; cues: { at: number; kind: string }[] }>;
  assert.deepEqual(Object.keys(meta).sort(), castParts.map((p) => p.id).sort(), 'every planned part has been recorded and stitched');
  for (const [id, rec] of Object.entries(meta)) {
    const p = castParts.find((x) => x.id === id);
    assert.ok(p, `${id} is a planned part`);
    const file = join(process.cwd(), 'public', rec.src);
    assert.ok(existsSync(file) && statSync(file).size > 50_000, `${rec.src} exists`);
    const audio = p!.part.audio!;
    assert.equal(audio.src, rec.src, `${id}: the content points at the recording`);
    assert.equal(audio.narrated, true);
    assert.deepEqual(audio.cues, rec.cues);
    const kinds = rec.cues.map((c) => c.kind);
    assert.deepEqual(kinds, [...audio.sets!.flatMap(() => ['read', 'listen']), 'check']);
    assert.ok(rec.cues.every((c, i) => i === 0 || c.at > rec.cues[i - 1].at), `${id}: timeline moves forward`);
    const check = rec.cues[rec.cues.length - 1];
    assert.ok(Math.abs(rec.duration - check.at - CHECK_SECONDS) < 0.5, `${id}: ends after exactly the checking time`);
    // Reading time is real silence of the right length.
    rec.cues.forEach((c, i) => c.kind === 'read' && assert.ok(Math.abs(rec.cues[i + 1].at - c.at - READ_SECONDS) < 12 && rec.cues[i + 1].at - c.at >= READ_SECONDS, `${id}: ${READ_SECONDS}s to read`));
  }
});

console.log(`\n${passed} passed`);
