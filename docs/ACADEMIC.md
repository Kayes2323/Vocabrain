# Mino Academic

Mino has two learning worlds in one app:

| Path | Who it is for | Lives at | Learning tab |
| --- | --- | --- | --- |
| **IELTS Academic** (`ielts`) | IELTS preparation and the study-abroad journey | `/ielts`, `/abroad`, `/today`, `/review`, `/practice` | IELTS |
| **Academic** (`academic`) | School, college and university subjects, mastered concept by concept | `/academic` | Academic |

They share the account, profile, design system, answer checking and Mino infrastructure,
but each has its own UX: IELTS is skill-, test- and band-oriented; Academic is
subject-, chapter-, concept- and mastery-oriented.

## Phase 1: path foundation (done)

- `UserProfile.activePath: 'ielts' | 'academic'` (`lib/models/profile.ts`), stored inside
  `users/{uid}.app`, so Firestore rules did not change.
- Migration (`withProfileDefaults`, `lib/services/profile-repository.ts`): a student who
  finished onboarding before paths existed is `ielts`; a student who has not onboarded has
  no path yet; an unknown stored value is ignored.
- Onboarding (`components/onboarding/OnboardingFlow.tsx`): language → **path** → (IELTS: the
  same IELTS questions as before) / (Academic: done, straight to `/academic`; nothing
  IELTS-specific is asked or stored).
- Home (`app/(app)/page.tsx`): greeting → `PathSwitch` (both worlds side by side) → the active
  world. IELTS Academic shows the unchanged IELTS Home; Academic shows `AcademicHome`.
- Navigation (`lib/navigation.ts`): five places as before; the second tab follows the active
  path (`primaryNav(activePathOf(profile))`). For IELTS students it is exactly the old list.
- `/academic` (`app/(app)/academic/page.tsx`, `components/academic/AcademicHome.tsx`): its own
  surface (teal "ink" accent `--academic*`, graph-paper header). No subject is open yet, so it
  says so: HSC Higher Mathematics is "being built", no lessons, no progress, no percentages.
- Copy: `lib/i18n/locales/ac.en.ts` / `ac.bn.ts` (Academic), `paths.*`, `onboarding.path.*`, `nav.academic`.
- Tests: `npm run test:paths` (migration + navigation), `npm run test:e2e:paths`.

## Next phases (not built)

2. Academic architecture: `lib/academic/{model,graph,mastery,diagnose,registry}.ts`,
   `lib/learning/{srs,evidence}.ts`, repository, rules. Detailed progress goes to
   `users/{uid}/academicProgress/{subjectId}` (evidence only; mastery status is computed),
   never into `users/{uid}.app`.
3. HSC Higher Mathematics curriculum research (NCTB syllabus, textbooks, board questions)
   → syllabus tree + prerequisite graph, verified before any lesson is written.
4. First foundation concepts → 5. Differentiation → 6. Integration → 7. Trigonometry
   (research first) → 8. Generalise to other subjects and levels.
