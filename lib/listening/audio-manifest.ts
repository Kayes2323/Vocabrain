/**
 * Sound Gym audio manifest — the real, delivered 36 assets.
 *
 * Source: `MINO-SOUND-GYM-MASTER-BRIEF-v1-DELIVERY-REPORT.md` (uploaded by
 * the user, copied verbatim to `docs/sound-gym-production/`, alongside each
 * lesson's own `SG0X-REPORT.md`). Every `durationSeconds`, `speakers`,
 * `speed`, `productionQA` and `qaNote` value below is transcribed from that
 * report — none of it is invented. Durations were independently
 * cross-checked with `ffprobe` against the real files at the time of
 * import; the report's own figures are used here since the two agree to
 * within rounding.
 *
 * What this report does NOT give: a verbatim script/transcript, or any
 * question/answer key. It only describes each clip's structure (how many
 * sentences, what order, what pauses) for production QA purposes. So
 * `scriptRef` points at the production report (what the clip IS), not a
 * transcript — and no `Stage.content` (transcript/questions) is written
 * from it. See docs/LISTENING_ARCHITECTURE.md §5 and the delivery report's
 * own "Issues that need Kayes's decision / listening check" section: every
 * asset here is QA `'review'` (not aurally confirmed) except the two the
 * report marks `'passed'`, and even those still recommend a human listen.
 */
import { SOUND_GYM_STAGE_ORDER, type Accent, type AudioAsset, type AudioAssetSpeaker, type ModuleId, type ProductionQA } from './model';

const ISABELLA: AudioAssetSpeaker = { identity: 'Isabella', accent: 'en-GB' as Accent, voice: 'female' };
const MAGNUS: AudioAssetSpeaker = { identity: 'Magnus', accent: 'en-GB' as Accent, voice: 'male' };
const PALOMA: AudioAssetSpeaker = { identity: 'Paloma', accent: 'en-GB' as Accent, voice: 'female' };
const AUSSIE: AudioAssetSpeaker = { identity: 'vd2_sunny_paddle', accent: 'en-AU' as Accent, voice: 'male' };
const ARIA: AudioAssetSpeaker = { identity: 'Aria', accent: 'en-US' as Accent, voice: 'female' };
const role = (s: AudioAssetSpeaker, r: string): AudioAssetSpeaker => ({ ...s, role: r });

interface Delivered {
  durationSeconds: number;
  speed?: number;
  speakers: AudioAssetSpeaker[];
  productionQA: ProductionQA;
  qaNote: string;
}

/** Transcribed from the master delivery report's "Final delivery report" table, asset by asset. */
const DELIVERED: Record<string, Delivered> = {
  'SG01-A01': { durationSeconds: 67.61, speed: 82, speakers: [ISABELLA], productionQA: 'review', qaNote: 'Not aurally verified — needs a human listen.' },
  'SG01-A02': { durationSeconds: 80.52, speed: 82, speakers: [ISABELLA], productionQA: 'review', qaNote: 'Not aurally verified — needs a human listen.' },
  'SG01-A03': { durationSeconds: 116.14, speed: 85, speakers: [ISABELLA], productionQA: 'review', qaNote: 'Not aurally verified — needs a human listen.' },
  'SG01-A04': { durationSeconds: 78.02, speed: 85, speakers: [ISABELLA], productionQA: 'review', qaNote: "Not aurally verified — the 'an aim / a name' and 'ice cream / I scream' distinction must be checked by ear." },
  'SG01-A05': { durationSeconds: 70.52, speed: 92, speakers: [MAGNUS], productionQA: 'review', qaNote: 'Not aurally verified. Each sentence is played twice consecutively (not a full second pass) — confirm this matches the intended repeat structure.' },
  'SG01-A06': {
    durationSeconds: 45.94,
    speed: 92,
    speakers: [role(ISABELLA, 'Student'), role(MAGNUS, 'Administrator')],
    productionQA: 'review',
    qaNote: "Not aurally verified. 'Room 214' was sent to TTS as digits — its spoken form (two-one-four vs two hundred and fourteen) needs a listening check.",
  },
  'SG02-A01': { durationSeconds: 96.94, speed: 82, speakers: [ISABELLA], productionQA: 'review', qaNote: 'Linking audibility not aurally verified.' },
  'SG02-A02': { durationSeconds: 95.03, speed: 82, speakers: [ISABELLA], productionQA: 'review', qaNote: "IPA not vocalised: '/j/ or /w/' spoken as 'y or w'; glide-linking audibility needs a human listen." },
  'SG02-A03': { durationSeconds: 77.71, speed: 82, speakers: [ISABELLA], productionQA: 'review', qaNote: 'IPA symbols spoken as letter names, not sounds; assimilation/coalescence audibility needs a human listen.' },
  'SG02-A04': { durationSeconds: 70.06, speed: 82, speakers: [ISABELLA], productionQA: 'review', qaNote: "Each phrase spoken twice (careful 75 / connected 85); /t/-omission audibility not confirmed by ear." },
  'SG02-A05': { durationSeconds: 100.5, speed: 92, speakers: [MAGNUS], productionQA: 'review', qaNote: '/t/-elision audibility for items 5–6 cannot be confirmed without a human listen; re-record if inaudible.' },
  'SG02-A06': {
    durationSeconds: 45.37,
    speed: 92,
    speakers: [role(ISABELLA, 'Student'), role(MAGNUS, 'Administrator')],
    productionQA: 'review',
    qaNote: 'No script/format/pause defect found; conversational naturalness still needs a human listen.',
  },
  'SG03-A01': { durationSeconds: 60.11, speakers: [ISABELLA], productionQA: 'passed', qaNote: 'Script and repeat structure verified; an aural check by a listener is still recommended.' },
  'SG03-A02': { durationSeconds: 75.5, speakers: [ISABELLA], productionQA: 'review', qaNote: "IPA /ə/ spoken as the word 'schwa'; weak-vowel audibility not aurally verified." },
  'SG03-A03': { durationSeconds: 89.5, speakers: [ISABELLA], productionQA: 'review', qaNote: "IPA tokens replaced by the word itself; weak vs strong 'can' spoken as written — capitalisation may not add audible emphasis. Needs a human listen." },
  'SG03-A04': { durationSeconds: 73.32, speakers: [ISABELLA], productionQA: 'review', qaNote: 'Capitalised stress words (NEW / BLUE / GO) spoken as written; stress audibility not aurally verified.' },
  'SG03-A05': { durationSeconds: 58.67, speed: 92, speakers: [MAGNUS], productionQA: 'review', qaNote: 'Weak-form audibility in natural male delivery not aurally verified.' },
  'SG03-A06': { durationSeconds: 42.49, speakers: [role(ISABELLA, 'Student'), role(MAGNUS, 'Staff')], productionQA: 'passed', qaNote: '11 turns, voices distinct by construction, date preserved. An aural check by a listener is still recommended.' },
  'SG04-A01': { durationSeconds: 66.8, speakers: [ISABELLA], productionQA: 'review', qaNote: 'Vowel/final-consonant distinction audibility needs a human listen.' },
  'SG04-A02': { durationSeconds: 101.77, speakers: [ISABELLA], productionQA: 'review', qaNote: "The single word 'seat' failed TTS repeatedly (truncated audio); supplied via a 'sit, seat.' pair-split workaround, same voice/speed. Distinction audibility needs a human listen." },
  'SG04-A03': { durationSeconds: 124.82, speakers: [ISABELLA], productionQA: 'review', qaNote: 'Audibility needs a human listen.' },
  'SG04-A04': { durationSeconds: 61.98, speakers: [ISABELLA], productionQA: 'review', qaNote: "IPA slashes not vocalised; the three past-tense lines were merged into one chunk (single-letter fragments failed TTS). Distinction audibility needs a human listen." },
  'SG04-A05': { durationSeconds: 62.89, speakers: [ISABELLA], productionQA: 'review', qaNote: 'Answer options were NOT spoken (intro + 8 target words × 2 only). Target-word audibility needs a human listen.' },
  'SG04-A06': { durationSeconds: 39.9, speakers: [role(ISABELLA, 'Student'), role(MAGNUS, 'Staff')], productionQA: 'review', qaNote: 'Two-voice dialogue (6 female turns, 5 male turns); natural turn-taking needs a human listen.' },
  'SG05-A01': { durationSeconds: 75.44, speakers: [ISABELLA], productionQA: 'review', qaNote: 'Teen/ty stress distinction (thirteen/thirty etc.) not aurally verified.' },
  'SG05-A02': { durationSeconds: 136.89, speakers: [ISABELLA], productionQA: 'review', qaNote: 'Teen/ty stress distinction is the whole point of this asset — needs a human listen.' },
  'SG05-A03': { durationSeconds: 59.68, speakers: [ISABELLA], productionQA: 'review', qaNote: 'Dates/times/prices not aurally verified.' },
  'SG05-A04': { durationSeconds: 69.45, speakers: [ISABELLA], productionQA: 'review', qaNote: 'Spelling clarity (letters distinct) not aurally verified. Surnames were sent to TTS as spaced letters.' },
  'SG05-A05': { durationSeconds: 147.5, speed: 92, speakers: [MAGNUS], productionQA: 'review', qaNote: 'Corrections and spelling clarity not aurally verified.' },
  'SG05-A06': {
    durationSeconds: 60.11,
    speed: 92,
    speakers: [role(ISABELLA, 'Student'), role(MAGNUS, 'Administrator')],
    productionQA: 'review',
    qaNote: 'Dialogue naturalness and number accuracy not aurally verified.',
  },
  'SG06-A01': { durationSeconds: 42.85, speakers: [ISABELLA, MAGNUS], productionQA: 'review', qaNote: 'Voice/accent distinction needs a human listen.' },
  'SG06-A02': { durationSeconds: 46.86, speakers: [AUSSIE], productionQA: 'review', qaNote: 'Australian accent needs a human listen; no British voice used in this asset.' },
  'SG06-A03': { durationSeconds: 41.84, speed: 82, speakers: [ARIA], productionQA: 'review', qaNote: 'Re-rendered at speed 82 (was 168 wpm at speed 92, now 142.4 wpm, in line with the other SG-06 assets). American accent needs a human listen.' },
  'SG06-A04': { durationSeconds: 54.48, speakers: [ISABELLA, MAGNUS, role(PALOMA, 'Student C')], productionQA: 'review', qaNote: 'Student B (Isabella) vs Student C (Paloma) distinction needs a human listen.' },
  'SG06-A05': { durationSeconds: 60.54, speed: 92, speakers: [MAGNUS], productionQA: 'review', qaNote: 'Academic monologue pace/clarity needs a human listen.' },
  'SG06-A06': { durationSeconds: 52.23, speakers: [ISABELLA, MAGNUS], productionQA: 'review', qaNote: 'Voice/accent distinction needs a human listen.' },
};

function soundGymAssets(): AudioAsset[] {
  const assets: AudioAsset[] = [];
  for (let n = 1; n <= 6; n++) {
    const lessonCode = `SG${String(n).padStart(2, '0')}`;
    const lessonId = `sg-${String(n).padStart(2, '0')}`;
    SOUND_GYM_STAGE_ORDER.forEach((stageKind, i) => {
      const assetNumber = i + 1;
      const assetId = `${lessonCode}-A${String(assetNumber).padStart(2, '0')}`;
      const delivered = DELIVERED[assetId];
      if (!delivered) throw new Error(`No delivery data for ${assetId}`); // every one of the 36 must be accounted for
      assets.push({
        assetId,
        moduleId: 'sound-gym' as ModuleId,
        lessonId,
        stageId: `${lessonId}-${stageKind}`,
        path: `/audio/mino/listening/sound-gym/${lessonCode}/${assetId}.mp3`,
        scriptRef: `docs/sound-gym-production/${lessonCode}-REPORT.md`,
        durationSeconds: delivered.durationSeconds,
        speed: delivered.speed,
        speakers: delivered.speakers,
        productionQA: delivered.productionQA,
        qaNote: delivered.qaNote,
      });
    });
  }
  return assets;
}

export const SOUND_GYM_AUDIO_MANIFEST: AudioAsset[] = soundGymAssets();

export const findAudioAsset = (assetId: string): AudioAsset | undefined => SOUND_GYM_AUDIO_MANIFEST.find((a) => a.assetId === assetId);
export const audioAssetsForLesson = (lessonId: string): AudioAsset[] => SOUND_GYM_AUDIO_MANIFEST.filter((a) => a.lessonId === lessonId);
