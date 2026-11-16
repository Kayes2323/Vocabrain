/**
 * The examiner's recorded voices. Lists every line the examiner can say across
 * all published Speaking tests and which voices already have a clip for it.
 *
 *   npm run examiner-audio                          summary per voice
 *   npm run examiner-audio -- --missing <voice-id>  JSON [{ key, text, body }] still to record for that voice
 *   npm run examiner-audio -- --manifest            rebuild public/examiner/manifest.json from the clips on disk
 *   npm run examiner-audio -- --check               exit 1 when any voice is incomplete
 *
 * Clips are filed as public/examiner/<voice id>/<key>.mp3. `key` is
 * lineKey(text), so changing a line's wording means recording it again.
 * `body` is the exact request for Speko's synthesize tool.
 */
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { BOOKS } from '../lib/ielts/content';
import { examinerLines, examinerScript, lineKey } from '../lib/ielts/examiner';
import { EXAMINER_VOICES, getExaminerVoice, synthBody } from '../lib/ielts/examiner-voices';

const ROOT = join(process.cwd(), 'public', 'examiner');

const lines = new Map<string, string>();
for (const test of BOOKS.flatMap((b) => b.tests)) {
  if (!test.sections.speaking) continue;
  for (const text of examinerLines(examinerScript(test.sections.speaking))) lines.set(lineKey(text), text);
}

const has = (voiceId: string, key: string) => existsSync(join(ROOT, voiceId, `${key}.mp3`));
const missingFor = (voiceId: string) => [...lines].filter(([key]) => !has(voiceId, key));
const arg = (flag: string) => {
  const i = process.argv.indexOf(flag);
  return i === -1 ? undefined : (process.argv[i + 1] ?? '');
};

if (process.argv.includes('--missing')) {
  const voice = getExaminerVoice(arg('--missing'));
  if (!voice) throw new Error(`Unknown voice. Use one of: ${EXAMINER_VOICES.map((v) => v.id).join(', ')}`);
  console.log(JSON.stringify(missingFor(voice.id).map(([key, text]) => ({ key, text, body: synthBody(voice, text) })), null, 2));
} else if (process.argv.includes('--manifest')) {
  const voices: Record<string, Record<string, string>> = {};
  for (const voice of EXAMINER_VOICES) {
    const dir = join(ROOT, voice.id);
    if (!existsSync(dir)) continue;
    const clips = Object.fromEntries(readdirSync(dir).filter((f) => f.endsWith('.mp3')).sort().map((f) => [f.replace(/\.mp3$/, ''), `${voice.id}/${f}`]));
    if (Object.keys(clips).length) voices[voice.id] = clips;
  }
  writeFileSync(join(ROOT, 'manifest.json'), `${JSON.stringify({ voices }, null, 2)}\n`);
  console.log(`manifest: ${Object.entries(voices).map(([id, c]) => `${id} ${Object.keys(c).length}`).join(', ')}`);
} else {
  console.log(`${lines.size} lines across the Speaking tests`);
  let incomplete = false;
  for (const v of EXAMINER_VOICES) {
    const missing = missingFor(v.id).length;
    if (missing) incomplete = true;
    console.log(`  ${v.id.padEnd(18)} ${lines.size - missing}/${lines.size}${missing ? `  (${missing} missing)` : ''}`);
  }
  if (process.argv.includes('--check') && incomplete) process.exitCode = 1;
}
