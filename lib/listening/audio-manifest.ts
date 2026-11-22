/**
 * Sound Gym audio manifest — the exact mapping given in the brief: 6
 * lessons × 6 assets = 36 files, one per stage per lesson, in stage order.
 *
 * `speakers`, `scriptRef` and `durationSeconds` are intentionally unset: the
 * brief's master delivery report (inside the supplied ZIP) names those
 * facts, and this session received no ZIP in this conversation — see
 * docs/LISTENING_ARCHITECTURE.md §6. Guessing them would be exactly the
 * kind of fabricated metadata the brief forbids. `fileExists` is never
 * stored here — it is computed from disk at test time
 * (`scripts/test-listening.ts`), so a missing file can never be reported as
 * delivered.
 */
import { SOUND_GYM_STAGE_ORDER, type AudioAsset, type ModuleId } from './model';

const LESSON_NUMBERS = [1, 2, 3, 4, 5, 6] as const;
const pad = (n: number) => String(n).padStart(2, '0');

function soundGymAssets(): AudioAsset[] {
  const assets: AudioAsset[] = [];
  for (const n of LESSON_NUMBERS) {
    const lessonCode = `SG${pad(n)}`; // SG01..SG06
    const lessonId = `sg-${pad(n)}`; // sg-01..sg-06
    SOUND_GYM_STAGE_ORDER.forEach((stageKind, i) => {
      const assetNumber = i + 1; // A01..A06, one per stage, in stage order
      const assetId = `${lessonCode}-A${pad(assetNumber)}`;
      assets.push({
        assetId,
        moduleId: 'sound-gym' as ModuleId,
        lessonId,
        stageId: `${lessonId}-${stageKind}`,
        path: `/audio/mino/listening/sound-gym/${lessonCode}/${assetId}.mp3`,
      });
    });
  }
  return assets;
}

export const SOUND_GYM_AUDIO_MANIFEST: AudioAsset[] = soundGymAssets();

export const findAudioAsset = (assetId: string): AudioAsset | undefined => SOUND_GYM_AUDIO_MANIFEST.find((a) => a.assetId === assetId);
export const audioAssetsForLesson = (lessonId: string): AudioAsset[] => SOUND_GYM_AUDIO_MANIFEST.filter((a) => a.lessonId === lessonId);
