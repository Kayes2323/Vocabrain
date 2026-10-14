// Writes scripts/fixtures/foundation-ids.json: every active Foundation module,
// lesson and exercise ID, in order. Saved progress (lessons, answers, concepts,
// mistakes) is keyed by these IDs, so the integrity test checks that none of
// them disappears or moves to another lesson. Re-run only when an ID change is
// a deliberate, migrated decision:   npx -y tsx scripts/foundation-ids-snapshot.ts
import fs from 'node:fs';
import { MODULES } from '../lib/foundation/content';
import { CHALLENGES } from '../lib/foundation/content/challenges';

const snapshot = {
  modules: MODULES.map((m) => ({
    id: m.id,
    lessons: m.lessons.map((l) => ({
      id: l.id,
      exercises: l.steps.flatMap((s) => (s.kind === 'practice' ? s.exercises.map((e) => e.id) : [])),
    })),
  })),
  challenges: CHALLENGES.map((c) => ({ id: c.id, items: c.parts.flatMap((p) => p.items.map((i) => i.id)) })),
};
fs.writeFileSync('scripts/fixtures/foundation-ids.json', JSON.stringify(snapshot, null, 1) + '\n');
console.log(`snapshot: ${snapshot.modules.length} modules, ${snapshot.modules.reduce((n, m) => n + m.lessons.length, 0)} lessons, ${snapshot.modules.reduce((n, m) => n + m.lessons.reduce((k, l) => k + l.exercises.length, 0), 0)} exercises`);
