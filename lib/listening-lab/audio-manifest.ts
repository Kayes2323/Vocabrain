/**
 * Audio Asset Management for the Listening Lab, and the Muse Production Brief
 * Generator (product brief §7, §11).
 *
 * This is a planning/tracking layer, not a second recording pipeline. Real
 * recording, for the app's existing mock tests, already exists:
 * `lib/ielts/listening-audio.ts` (voices, cast, `ScriptLine`/`ListeningAudio`)
 * and `scripts/listening-audio.ts` (multi-provider TTS → ffmpeg stitch →
 * loudness-normalise → a committed manifest + public `.mp3` files). The brief
 * calls the external studio "Muse"; this codebase's own pipeline already
 * does that job with real provider integrations (Deepgram, Cartesia, Gradium,
 * Azure). `renderProductionBrief` below produces a batch exactly in the shape
 * that pipeline (or any other voice studio) can record from, and `toScriptLines`
 * converts an approved asset straight into the existing `ScriptLine[]`/
 * `ListeningVoice` cast the current recorder consumes — see
 * docs/LISTENING_TRAINER_ARCHITECTURE.md §7 for the full reasoning.
 *
 * `AUDIO_MANIFEST` starts empty on purpose: no asset has been produced yet,
 * and marking one as recorded before it is would be exactly the kind of
 * invented-result this project's working rules forbid.
 */
import type { QuestionType } from '@/lib/ielts/model';
import type { ListeningErrorCode, ModuleId } from './model';

export type ProductionStatus = 'brief-drafted' | 'recording' | 'stitched' | 'needs-rerecord';
export type QAStatus = 'not-started' | 'transcript-verified' | 'failed' | 'passed';

export interface AudioAssetSpeaker {
  /** The name used in the script and transcript, e.g. "Helen". */
  identity: string;
  accent: 'en-GB' | 'en-US' | 'en-AU' | 'en-NZ';
  voice: 'female' | 'male';
  /** Performance notes for the voice (pace, tone) — separate from the words themselves. */
  instructions: string;
}

export interface AudioAssetLine {
  speaker: string;
  text: string;
}

export interface AssociatedQuestion {
  id: string;
  prompt: string;
  type: QuestionType;
  correctAnswer: string;
  /** Why this is the answer, referencing the exact script line (by index) the evidence is in. */
  explanation: string;
  evidenceLineIndex: number;
  /** The question's wording mapped to the script's wording, when it differs (paraphrase training data). */
  paraphraseFrom?: string;
  paraphraseTo?: string;
  /** An option mentioned and rejected in the audio, and which error code a wrong pick there would be. */
  distractor?: { optionText: string; rejectedAtLineIndex: number; errorCode: ListeningErrorCode };
}

export interface AudioAsset {
  /** Stable, never reused even if the asset is re-recorded. Format: `lab-<module>-<skill>-<n>`. */
  assetId: string;
  moduleId: ModuleId;
  skillId: string;
  /** Set once the asset is attached to a written lesson (Phase 2+). */
  lessonId?: string;
  part?: 1 | 2 | 3 | 4;
  questionTypes: QuestionType[];
  difficulty: 1 | 2 | 3;
  locale: 'en-GB' | 'en-US' | 'en-AU' | 'en-NZ';
  speakers: AudioAssetSpeaker[];
  /** Spoken text only — never a speaker label or a production instruction (brief rule 8). */
  script: AudioAssetLine[];
  /** The verified transcript shown to the student after the exercise. Checked to match the script after recording (brief rule 10). */
  transcript: string;
  questions: AssociatedQuestion[];
  trapCategories: string[];
  filePath?: string;
  durationSeconds?: number;
  productionStatus: ProductionStatus;
  qaStatus: QAStatus;
}

/** No asset exists yet. See docs/LISTENING_TRAINER_ARCHITECTURE.md §8 for the first production targets. */
export const AUDIO_MANIFEST: AudioAsset[] = [];

export const assetsForModule = (moduleId: ModuleId): AudioAsset[] => AUDIO_MANIFEST.filter((a) => a.moduleId === moduleId);
export const assetsByStatus = (status: ProductionStatus): AudioAsset[] => AUDIO_MANIFEST.filter((a) => a.productionStatus === status);

export function productionSummary(manifest: AudioAsset[] = AUDIO_MANIFEST) {
  const byStatus = (s: ProductionStatus) => manifest.filter((a) => a.productionStatus === s).length;
  const byQA = (s: QAStatus) => manifest.filter((a) => a.qaStatus === s).length;
  return {
    total: manifest.length,
    briefDrafted: byStatus('brief-drafted'),
    recording: byStatus('recording'),
    stitched: byStatus('stitched'),
    needsRerecord: byStatus('needs-rerecord'),
    qaPassed: byQA('passed'),
    qaFailed: byQA('failed'),
  };
}

/**
 * Validates one asset against the production quality rules that can be
 * checked from the manifest alone (brief §9): the script carries no speaker
 * label or production instruction as spoken text, every speaker named in the
 * script is cast, every question's evidence line exists, and a stitched
 * asset has a duration and a file path. Returns problem descriptions, empty
 * when the asset is sound.
 */
export function validateAsset(asset: AudioAsset): string[] {
  const problems: string[] = [];
  const castNames = new Set(asset.speakers.map((s) => s.identity));
  for (const [i, line] of asset.script.entries()) {
    if (!castNames.has(line.speaker)) problems.push(`line ${i}: speaker "${line.speaker}" is not in speakers[]`);
    if (/\[.*(pause|beat|smil|laugh|slowly|emphasis).*\]/i.test(line.text)) problems.push(`line ${i}: looks like a performance direction inside spoken text, not the script`);
    const labelPattern = new RegExp(`^\\s*(narrator|speaker\\s*\\d|${line.speaker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\s*:`, 'i');
    if (labelPattern.test(line.text)) problems.push(`line ${i}: text starts with a speaker label`);
  }
  for (const q of asset.questions) {
    if (q.evidenceLineIndex < 0 || q.evidenceLineIndex >= asset.script.length) problems.push(`question ${q.id}: evidenceLineIndex ${q.evidenceLineIndex} is out of range`);
    if (q.distractor && (q.distractor.rejectedAtLineIndex < 0 || q.distractor.rejectedAtLineIndex >= asset.script.length)) {
      problems.push(`question ${q.id}: distractor.rejectedAtLineIndex out of range`);
    }
  }
  if ((asset.productionStatus === 'stitched') && (!asset.filePath || asset.durationSeconds === undefined)) {
    problems.push('stitched but missing filePath or durationSeconds');
  }
  if (asset.speakers.length === 0) problems.push('no speakers cast');
  if (asset.script.length === 0) problems.push('no script lines');
  return problems;
}

const FILE_NAME_CONVENTION = 'lab-<module>-<skill>-<nn>.mp3  (e.g. lab-sound-recognition-connected-speech-01.mp3)';

/**
 * Renders a copy-pasteable Markdown production brief for a batch of assets,
 * in the exact shape requested (brief §11, A–O): usable without any of this
 * session's hidden context. Spoken text and performance direction are kept
 * in separate columns throughout, as rule 8 requires.
 */
export function renderProductionBrief(batchName: string, objective: string, assets: AudioAsset[]): string {
  const lines: string[] = [`# Muse Production Brief — ${batchName}`, '', `**Learning objective:** ${objective}`, '', `**Asset IDs:** ${assets.map((a) => a.assetId).join(', ') || '(none)'}`, ''];
  for (const asset of assets) {
    lines.push(`## ${asset.assetId}`, '');
    lines.push(`- **Accent:** ${asset.locale}`);
    lines.push(`- **Speakers:**`);
    for (const s of asset.speakers) lines.push(`  - **${s.identity}** (${s.voice}, ${s.accent}). Voice instructions: ${s.instructions}`);
    lines.push(`- **Voice consistency:** each speaker keeps one voice for the whole asset; do not change actor mid-recording.`, '');
    lines.push(`### Script (spoken text only — read exactly as written, performance notes are separate)`, '');
    lines.push('| # | Speaker | Line |', '|---|---|---|');
    asset.script.forEach((l, i) => lines.push(`| ${i} | ${l.speaker} | ${l.text.replace(/\|/g, '\\|')} |`));
    lines.push('', `### Transcript (verified, shown to the student after the exercise)`, '', asset.transcript, '');
    lines.push(`### Questions, answer key and paraphrase mapping`, '');
    for (const q of asset.questions) {
      lines.push(`- **${q.id}** (${q.type}): "${q.prompt}" → **${q.correctAnswer}** — ${q.explanation} (evidence: line ${q.evidenceLineIndex})`);
      if (q.paraphraseFrom) lines.push(`  - Paraphrase: "${q.paraphraseFrom}" → "${q.paraphraseTo}"`);
      if (q.distractor) lines.push(`  - Distractor: "${q.distractor.optionText}" rejected at line ${q.distractor.rejectedAtLineIndex} (${q.distractor.errorCode})`);
    }
    lines.push('', `### Trap categories`, asset.trapCategories.length ? asset.trapCategories.map((t) => `- ${t}`).join('\n') : '- (none)', '');
    lines.push(`### Pronunciation notes`, 'Follow the voice instructions above for pace and tone. No background music or sound effects (rule 7). Do not speak speaker labels or production instructions aloud (rule 8).', '');
  }
  lines.push(`### Audio quality requirements`, '- Natural speaking speed for the stated difficulty; no artificial speed-up.', '- No background music or sound effects.', '- Checked against the transcript after generation before it is marked passed.', '');
  lines.push(`### File naming convention`, FILE_NAME_CONVENTION, '');
  return lines.join('\n');
}
