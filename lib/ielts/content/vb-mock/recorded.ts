import type { ListeningAudio } from '../../model';
import recordings from './listening-audio.json';

/**
 * The recorded, narrated audio for a Listening part, once it has been made
 * (npm run listening-audio). Until then the part is read by the browser voice.
 * Recordings are filed under "<test id>:<part id>".
 */
export const recorded = (testId: string, partId: string): Pick<ListeningAudio, 'src' | 'narrated' | 'cues'> => {
  const r = (recordings as Record<string, { src: string; cues: NonNullable<ListeningAudio['cues']> }>)[`${testId}:${partId}`];
  return r ? { src: r.src, narrated: true, cues: r.cues } : {};
};
