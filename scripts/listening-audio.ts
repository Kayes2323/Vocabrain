/**
 * Recorded Listening parts. Each part is one MP3: narrator, speakers, reading
 * time and checking time, played once like the real test.
 *
 *   npm run listening-audio                              summary of every planned part
 *   npm run listening-audio -- --missing <test>:<part>   JSON [{ voice, key, text, path, body }] still to record
 *   npm run listening-audio -- --build <test>:<part>     stitch a part into public/listening/<test>/<part>.mp3
 *   npm run listening-audio -- --check                   exit 1 when a planned part has no stitched audio
 *
 * Raw lines are filed as listening-work/<voice>/<key>.mp3 (not committed). A
 * stitched part and its timeline are written to public/listening and
 * lib/ielts/content/vb-mock/listening-audio.json (committed).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { BOOKS } from '../lib/ielts/content';
import { listeningBody, listeningClipPath, listeningJobs, listeningTracks, LISTENING_CAST, type Cue, type Track } from '../lib/ielts/listening-audio';

const ROOT = process.cwd();
const WORK = join(ROOT, 'listening-work');
const META = join(ROOT, 'lib', 'ielts', 'content', 'vb-mock', 'listening-audio.json');
const SAMPLE_RATE = 24000;

interface Planned {
  id: string;
  testId: string;
  partId: string;
  tracks: Track[];
}

/** Every part that has voices cast for it. */
function planned(): Planned[] {
  const out: Planned[] = [];
  for (const test of BOOKS.flatMap((b) => b.tests)) {
    const parts = test.sections.listening?.parts ?? [];
    parts.forEach((part, index) => {
      const id = `${test.id}:${part.id}`;
      if (!LISTENING_CAST[id] || !part.audio?.script) return;
      out.push({ id, testId: test.id, partId: part.id, tracks: listeningTracks(part.audio, { testId: test.id, partId: part.id, number: part.number, index, count: parts.length }) });
    });
  }
  return out;
}

const ff = (args: string[]) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args]);
const duration = (file: string) => parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString());

function silence(dir: string, ms: number): string {
  const file = join(dir, `silence-${ms}.wav`);
  if (!existsSync(file)) ff(['-f', 'lavfi', '-i', `anullsrc=r=${SAMPLE_RATE}:cl=mono`, '-t', String(ms / 1000), '-c:a', 'pcm_s16le', file]);
  return file;
}

/** One recorded line as a loudness-matched WAV, so voices from different providers sit at the same volume. */
function normalised(dir: string, voice: string, text: string): string {
  const src = join(WORK, listeningClipPath(voice, text));
  if (!existsSync(src)) throw new Error(`Missing recording: ${listeningClipPath(voice, text)} ("${text.slice(0, 50)}…")`);
  const out = join(dir, `${voice}-${listeningClipPath(voice, text).split('/')[1].replace('.mp3', '')}.wav`);
  if (!existsSync(out)) ff(['-i', src, '-af', 'loudnorm=I=-20:LRA=11:TP=-2', '-ar', String(SAMPLE_RATE), '-ac', '1', '-c:a', 'pcm_s16le', out]);
  return out;
}

function build(part: Planned) {
  const dir = join(WORK, '_build', part.id.replace(':', '-'));
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const files: string[] = [];
  const cues: Cue[] = [];
  let at = 0;
  const push = (file: string) => {
    files.push(file);
    at += duration(file);
  };
  for (const t of part.tracks) {
    if (t.kind === 'mark') cues.push({ at: Math.round(at * 10) / 10, kind: t.cue });
    else if (t.kind === 'silence') {
      cues.push({ at: Math.round(at * 10) / 10, kind: t.cue });
      push(silence(dir, t.seconds * 1000));
    } else {
      push(normalised(dir, t.voice, t.text));
      push(silence(dir, t.gapAfterMs));
    }
  }

  const list = join(dir, 'list.txt');
  writeFileSync(list, files.map((f) => `file '${f}'`).join('\n'));
  const outDir = join(ROOT, 'public', 'listening', part.testId);
  mkdirSync(outDir, { recursive: true });
  const out = join(outDir, `${part.partId}.mp3`);
  ff(['-f', 'concat', '-safe', '0', '-i', list, '-ar', String(SAMPLE_RATE), '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '64k', out]);

  const meta = existsSync(META) ? JSON.parse(readFileSync(META, 'utf8')) : {};
  meta[part.partId] = { src: `/listening/${part.testId}/${part.partId}.mp3`, duration: Math.round(duration(out) * 10) / 10, cues };
  writeFileSync(META, `${JSON.stringify(meta, null, 2)}\n`);
  console.log(`${part.id}: ${meta[part.partId].duration}s, ${files.length} pieces, cues ${cues.map((c) => `${c.kind}@${c.at}`).join(' ')}`);
}

const arg = (flag: string) => {
  const i = process.argv.indexOf(flag);
  return i === -1 ? undefined : process.argv[i + 1];
};
const find = (id: string | undefined) => {
  const p = planned().find((x) => x.id === id);
  if (!p) throw new Error(`Unknown part. Use one of: ${planned().map((x) => x.id).join(', ')}`);
  return p;
};

if (process.argv.includes('--missing')) {
  const part = find(arg('--missing'));
  const jobs = listeningJobs(part.tracks).filter((j) => !existsSync(join(WORK, j.path)));
  console.log(JSON.stringify(jobs.map((j) => ({ ...j, body: listeningBody(j.voice, j.text) })), null, 2));
} else if (process.argv.includes('--build')) {
  build(find(arg('--build')));
} else {
  const meta = existsSync(META) ? JSON.parse(readFileSync(META, 'utf8')) : {};
  let incomplete = false;
  for (const p of planned()) {
    const jobs = listeningJobs(p.tracks);
    const missing = jobs.filter((j) => !existsSync(join(WORK, j.path))).length;
    const built = Boolean(meta[p.partId]);
    if (!built) incomplete = true;
    console.log(`${p.id.padEnd(16)} ${jobs.length - missing}/${jobs.length} lines recorded, ${built ? `stitched (${meta[p.partId].duration}s)` : 'not stitched'}`);
  }
  if (process.argv.includes('--check') && incomplete) process.exitCode = 1;
}
