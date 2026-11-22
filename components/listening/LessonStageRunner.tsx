'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Callout, PageHeader, Panel, ProgressBar, StatusChip } from '@/components/ds';
import { AudioLessonPlayer } from './AudioLessonPlayer';
import { STAGE_LABELS, findAudioAsset, type Lesson } from '@/lib/listening';

/**
 * Walks a lesson's stages in order (brief §8's shared framework; Sound
 * Gym's own 6-stage mapping is preserved as-is). One stage at a time, its
 * audio (if any) through `AudioLessonPlayer`, and its teaching content when
 * delivered — otherwise an honest "content in development" notice, never
 * an invented script or question (brief §1, §13).
 */
export function LessonStageRunner({
  lesson,
  onStageVisited,
  onLessonComplete,
}: {
  lesson: Lesson;
  onStageVisited: (stageId: string) => void;
  onLessonComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const stage = lesson.stages[index];
  const asset = stage.audioAssetId ? findAudioAsset(stage.audioAssetId) : undefined;
  const isLastStage = index === lesson.stages.length - 1;

  const goNext = () => {
    onStageVisited(stage.id);
    if (isLastStage) onLessonComplete();
    else setIndex(index + 1);
  };

  return (
    <div className="space-y-6">
      <PageHeader title={`${lesson.code} · ${lesson.title.en}`} subtitle={STAGE_LABELS[stage.kind].en} backHref={`/ielts/listening/module/${lesson.moduleId}`} backLabel="Sound Gym" />

      <div className="flex items-center gap-2" aria-label="Lesson stages">
        {lesson.stages.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i === index ? 'bg-brand' : i < index ? 'bg-brand/40' : 'bg-muted'}`}
            aria-label={`${STAGE_LABELS[s.kind].en}${i === index ? ' (current)' : ''}`}
            aria-current={i === index}
          />
        ))}
      </div>

      <Panel className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{STAGE_LABELS[stage.kind].en}</h2>
          <StatusChip tone={stage.contentStatus === 'complete' ? 'success' : 'neutral'}>
            {stage.contentStatus === 'audio-pending' ? 'Content in development' : stage.contentStatus}
          </StatusChip>
        </div>

        {asset ? <AudioLessonPlayer asset={asset} /> : null}

        {stage.content?.instructions || stage.content?.questions?.length ? (
          <div className="space-y-3 text-sm">
            {stage.content.instructions && <p>{stage.content.instructions}</p>}
          </div>
        ) : (
          <Callout>
            <div className="flex items-start gap-2">
              <FileClock className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                The script, questions and answer key for this stage have not been delivered yet. Nothing is shown here that was not provided by the real content package — see
                docs/LISTENING_ARCHITECTURE.md for how to add it.
              </span>
            </div>
          </Callout>
        )}
      </Panel>

      <ProgressBar value={((index + 1) / lesson.stages.length) * 100} label={`Stage ${index + 1} of ${lesson.stages.length}`} />

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>
          <ChevronLeft className="size-4" aria-hidden /> Back
        </Button>
        <Button type="button" variant="brand" onClick={goNext}>
          {isLastStage ? 'Finish lesson' : 'Next stage'} <ChevronRight className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
