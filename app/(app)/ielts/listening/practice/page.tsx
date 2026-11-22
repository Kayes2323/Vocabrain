'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Headphones } from 'lucide-react';
import { Callout, ListRow, PageHeader, RowGroup, ScreenSkeleton, Section, StatusChip } from '@/components/ds';
import { cn } from '@/lib/utils';
import { LISTENING_MODULES, STAGE_LABELS, isLessonComplete, type ModuleId, type StageKind } from '@/lib/listening';
import { useListening } from '@/components/listening/useListening';

type CompletionFilter = 'all' | 'completed' | 'not-completed';

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn('rounded-full px-3 py-1 text-xs font-medium transition-colors', active ? 'bg-brand text-brand-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80')}
    >
      {children}
    </button>
  );
}

/**
 * The Practice Library (brief §11): browse exercises independently of the
 * guided lesson order. Reads the exact same `LISTENING_MODULES` lessons and
 * `profile.listening` progress as the Personal Trainer — there is no second
 * content source to keep in sync.
 */
export default function ListeningPracticeLibrary() {
  const { progress } = useListening();
  const [moduleId, setModuleId] = useState<ModuleId | 'all'>('all');
  const [stageKind, setStageKind] = useState<StageKind | 'all'>('all');
  const [difficulty, setDifficulty] = useState<1 | 2 | 3 | 'all'>('all');
  const [completion, setCompletion] = useState<CompletionFilter>('all');

  const rows = useMemo(() => {
    if (!progress) return [];
    return LISTENING_MODULES.filter((m) => moduleId === 'all' || m.id === moduleId).flatMap((m) =>
      m.lessons
        .filter((l) => difficulty === 'all' || l.difficulty === difficulty)
        .flatMap((l) =>
          l.stages
            .filter((s) => stageKind === 'all' || s.kind === stageKind)
            .map((s) => ({ module: m, lesson: l, stage: s })),
        ),
    );
  }, [moduleId, stageKind, difficulty, progress]);

  const filtered = useMemo(() => {
    if (!progress) return [];
    if (completion === 'all') return rows;
    return rows.filter(({ lesson }) => {
      const done = isLessonComplete(lesson, progress.lessons[lesson.id]);
      return completion === 'completed' ? done : !done;
    });
  }, [rows, completion, progress]);

  if (!progress) return <ScreenSkeleton />;

  return (
    <div className="space-y-6">
      <PageHeader title="Practice Library" subtitle="Browse exercises freely, by module, skill, difficulty or type." backHref="/ielts/listening" backLabel="Mino Listening" />

      <Section title="Module" variant="label">
        <div className="flex flex-wrap gap-2">
          <Chip active={moduleId === 'all'} onClick={() => setModuleId('all')}>All modules</Chip>
          {LISTENING_MODULES.map((m) => (
            <Chip key={m.id} active={moduleId === m.id} onClick={() => setModuleId(m.id)}>{m.title.en}</Chip>
          ))}
        </div>
      </Section>

      <Section title="Exercise type" variant="label">
        <div className="flex flex-wrap gap-2">
          <Chip active={stageKind === 'all'} onClick={() => setStageKind('all')}>All types</Chip>
          {(Object.keys(STAGE_LABELS) as StageKind[]).map((k) => (
            <Chip key={k} active={stageKind === k} onClick={() => setStageKind(k)}>{STAGE_LABELS[k].en}</Chip>
          ))}
        </div>
      </Section>

      <Section title="Difficulty" variant="label">
        <div className="flex flex-wrap gap-2">
          <Chip active={difficulty === 'all'} onClick={() => setDifficulty('all')}>All</Chip>
          {[1, 2, 3].map((d) => (
            <Chip key={d} active={difficulty === d} onClick={() => setDifficulty(d as 1 | 2 | 3)}>{['Easy', 'Medium', 'Hard'][d - 1]}</Chip>
          ))}
        </div>
      </Section>

      <Section title="Completed" variant="label">
        <div className="flex flex-wrap gap-2">
          <Chip active={completion === 'all'} onClick={() => setCompletion('all')}>All</Chip>
          <Chip active={completion === 'completed'} onClick={() => setCompletion('completed')}>Completed</Chip>
          <Chip active={completion === 'not-completed'} onClick={() => setCompletion('not-completed')}>Not completed</Chip>
        </div>
      </Section>

      <Callout>Accent filtering will be available once Accent World and Sound Gym's delivery report name each clip's accent — nothing is guessed here.</Callout>

      <Section title={`${filtered.length} exercise${filtered.length === 1 ? '' : 's'}`} variant="label">
        {filtered.length > 0 ? (
          <RowGroup>
            {filtered.map(({ module, lesson, stage }) => (
              <ListRow
                key={stage.id}
                href={`/ielts/listening/lesson/${lesson.id}`}
                icon={Headphones}
                title={`${lesson.code} · ${STAGE_LABELS[stage.kind].en}`}
                description={`${module.title.en} · ${lesson.skill.en}`}
                trailing={<StatusChip>{['Easy', 'Medium', 'Hard'][lesson.difficulty - 1]}</StatusChip>}
              />
            ))}
          </RowGroup>
        ) : (
          <Callout>No exercises match these filters yet.</Callout>
        )}
      </Section>

      <Link href="/ielts/listening" className="text-sm underline">
        Back to Mino Listening
      </Link>
    </div>
  );
}
