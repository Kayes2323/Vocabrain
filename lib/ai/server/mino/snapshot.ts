// Layers 6, 7 (summary) and 9: the student snapshot, built on the server from
// the student's own Firestore data (read with their ID token, so rules apply).
// Browser-sent context is never trusted for facts.
import { IELTS_SKILLS } from '@/lib/constants';
import { brainSummary, buildDailyPlan, daysUntil, formatBand, ieltsJourney, overallBand } from '@/lib/engine';
import { getTranslator } from '@/lib/i18n';
import { analyseTests, type TestSession } from '@/lib/ielts';
import { getTest } from '@/lib/ielts/content';
import type { BrainWord } from '@/lib/models';
import { withProfileDefaults } from '@/lib/services/profile-repository';
import { listOwnCollection, readOwnDoc } from '../firestore-rest';
import { readMemory } from '../tools/memory';

export interface StudentRef {
  uid: string;
  idToken: string;
}

/** Bangladesh time by default; the client may send its UTC offset in minutes. */
export function studentNow(tzOffsetMinutes = 360, now = Date.now()): Date {
  // Engine date helpers read local fields; on the server local = UTC, so shift.
  return new Date(now + tzOffsetMinutes * 60_000);
}


export async function buildStudentSnapshot(student: StudentRef, tzOffsetMinutes?: number): Promise<string> {
  const now = studentNow(tzOffsetMinutes);
  const [doc, words, sessions, memory] = await Promise.all([
    readOwnDoc(student.uid, student.idToken),
    listOwnCollection(student.uid, student.idToken, 'vocabulary').catch(() => []),
    listOwnCollection(student.uid, student.idToken, 'testSessions').catch(() => []),
    readMemory(student.uid, student.idToken).catch(() => null),
  ]);

  const today = now.toISOString().slice(0, 10);
  const lines: string[] = [`TODAY: ${today} (${now.toLocaleDateString('en-GB', { weekday: 'long', timeZone: 'UTC' })}).`];
  if (!doc) {
    lines.push('STUDENT SNAPSHOT: no profile found yet (new account or onboarding not finished).');
    return lines.join('\n');
  }

  const profile = withProfileDefaults(student.uid, (doc.app ?? {}) as never);
  const t = getTranslator('en').t;
  const { ielts, abroad, study } = profile;
  const name = profile.displayName || (doc.name as string) || undefined;

  lines.push('STUDENT SNAPSHOT (from the app database; this is everything you know unless a tool returns more):');
  lines.push(`- Name: ${name ?? 'not given'}. Goal: ${profile.goal ?? 'not set'}. Language: ${profile.language ?? doc.preferredLanguage ?? 'not set'}.`);

  // IELTS
  const target = ielts.targetBand !== undefined ? formatBand(ielts.targetBand) : ielts.targetUnsure ? 'not sure yet' : 'not set';
  const source = ielts.diagnostic ? 'estimates from the self-assessment diagnostic' : 'self-reported estimates';
  const skills = IELTS_SKILLS.map((s) => `${s} ${ielts.currentBands[s] !== undefined ? formatBand(ielts.currentBands[s]) : 'no data'}`).join(', ');
  const overall = overallBand(ielts.currentBands);
  lines.push(`- IELTS target: ${target}. Current bands (${source}): ${skills}${overall !== undefined ? `; overall ≈ ${formatBand(overall)}` : ''}.`);
  if (ielts.takenBefore) lines.push(`- Took IELTS before${ielts.previousOverall !== undefined ? `, overall ${formatBand(ielts.previousOverall)} (reported by student)` : ''}.`);
  const testIn = ielts.testDate ? daysUntil(ielts.testDate, now) : undefined;
  lines.push(`- Test date: ${ielts.testDate ? `${ielts.testDate.slice(0, 10)} (${testIn} days left)` : ielts.testDateUnknown ? 'not booked yet' : 'not given'}. Study time: ${ielts.weeklyStudyHours !== undefined ? `${ielts.weeklyStudyHours} h/week` : 'not given'}.`);
  const journey = ieltsJourney(profile);
  lines.push(`- IELTS journey stage: ${t(`journey.stages.${journey.current}`)} (${journey.percent}% of the journey).`);

  // Practice tests (deterministic analysis of real answers)
  const analysis = analyseTests(sessions as unknown as TestSession[], getTest);
  for (const p of ['writing', 'speaking'] as const) {
    const last = analysis.productive.find((x) => x.skill === p);
    if (last) {
      lines.push(
        `- Latest ${p} practice (${last.submittedAt.slice(0, 10)}): AI-estimated band ${last.overall ?? 'n/a'} (estimate, not official); lowest criterion ${last.criteria[0] ? `${last.criteria[0].criterion} ${last.criteria[0].band}` : 'n/a'}.`,
      );
    }
  }
  if (analysis.attempts.length === 0) {
    lines.push('- Listening/Reading practice tests: none completed yet.');
  } else {
    const last = analysis.attempts[0];
    lines.push(
      `- Practice tests completed: ${analysis.attempts.length}. Latest: ${last.testTitle} ${last.skill} ${last.correct}/${last.total} (${last.accuracy}%) on ${last.submittedAt.slice(0, 10)}.`,
    );
    const weak = analysis.weakAreas[0];
    if (weak) lines.push(`- Weakest area so far: ${weak.label} (${weak.skill}) ${weak.correct}/${weak.total}, ${weak.confidence} confidence. Details: getWeakAreas.`);
    const skillsWithTests = new Set<string>([...analysis.attempts.map((a) => a.skill), ...analysis.productive.map((p) => p.skill)]);
    const missing = ['listening', 'reading', 'writing', 'speaking'].filter((sk) => !skillsWithTests.has(sk as never));
    if (missing.length) lines.push(`- No practice-test data for: ${missing.join(', ')}.`);
  }

  // Vocabulary (Brain)
  const brain = brainSummary(words as unknown as BrainWord[], now);
  lines.push(
    brain.total === 0
      ? '- Vocabulary (Brain): no saved words yet.'
      : `- Vocabulary (Brain): ${brain.total} saved, ${brain.due} due for review today, ${brain.failedLastTime} missed last time; by status ${Object.entries(brain.byStatus).filter(([, n]) => n).map(([k, n]) => `${k} ${n}`).join(', ')}.`,
  );

  // Today's plan (same engine as the Home screen)
  const plan = buildDailyPlan(profile, brain, now);
  const tasks = plan.tasks.map((task) => `${t(task.titleKey)}${task.done ? ' ✓' : ''} (${task.minutes} min, ${task.href})`).join('; ');
  lines.push(`- Today's plan (${plan.mode}): ${tasks}.`);
  lines.push(`- Study streak data: last active ${study.lastActiveDate ?? 'never'}; readings finished ${study.readPassages?.length ?? 0}.`);

  // Study abroad
  const abroadBits = [
    abroad.degreeLevel && `degree ${abroad.degreeLevel}`,
    abroad.subject && `subject ${abroad.subject}`,
    abroad.targetIntake && `intake ${abroad.targetIntake.month}/${abroad.targetIntake.year}`,
    abroad.annualBudget && `budget ${abroad.annualBudget.amount} ${abroad.annualBudget.currency}/year`,
    abroad.preferredCountryCodes?.length && `countries ${abroad.preferredCountryCodes.join(', ')}`,
  ].filter(Boolean);
  lines.push(`- Study abroad: ${abroadBits.length ? abroadBits.join('; ') : 'nothing set yet'}.`);

  // Long-term memory (notes the student shared earlier; they can delete them)
  const notes = memory?.notes ?? [];
  lines.push(notes.length ? `- Mino's notes from earlier chats: ${notes.map((n) => `[${n.category}] ${n.text}`).join(' | ')}` : "- Mino's notes: none yet.");

  return lines.join('\n');
}
