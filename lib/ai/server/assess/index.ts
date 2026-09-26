// Mino's Writing and Speaking assessment. Practice feedback only: bands are
// estimates on the public IELTS criteria. Deterministic checks (word counts,
// quotes that must exist in the student's text) keep the AI honest.
import { z } from 'zod';
import type { AIProvider } from '../../types';
import {
  clampBand,
  countWords,
  criteriaBand,
  SPEAKING_CRITERIA,
  WRITING_CRITERIA,
  writingOverall,
  type CriterionFeedback,
  type PracticeTest,
  type ProductiveFeedback,
  type TaskFeedback,
  type TestSession,
} from '@/lib/ielts';
import { MinoError } from '../errors';

const aiSchema = z.object({
  criteria: z.array(z.object({ criterion: z.string(), band: z.number().nullable(), comment: z.string() })).min(1),
  strengths: z.array(z.string()).default([]),
  mistakes: z.array(z.object({ quote: z.string(), fix: z.string(), why: z.string() })).default([]),
  actions: z.array(z.string()).default([]),
  vocabulary: z.array(z.object({ word: z.string(), tip: z.string() })).default([]),
  betterSentences: z.array(z.object({ original: z.string(), improved: z.string() })).default([]),
});
type AIFeedback = z.infer<typeof aiSchema>;

const JSON_SHAPE = `Reply with ONLY a JSON object:
{"criteria":[{"criterion":"<name>","band":<0-9 in 0.5 steps or null>,"comment":"<1-2 sentences>"}],
 "strengths":["..."], "mistakes":[{"quote":"<exact words copied from the answer>","fix":"<corrected English>","why":"<short reason>"}],
 "actions":["<concrete next practice step>"], "vocabulary":[{"word":"<useful word/collocation>","tip":"<how to use it here>"}],
 "betterSentences":[{"original":"<exact sentence from the answer>","improved":"<better version>"}]}
Limits: max 3 strengths, 6 mistakes, 3 actions, 5 vocabulary items, 3 better sentences.`;

function languageRule(language: 'en' | 'bn') {
  return language === 'bn'
    ? 'Write comments, why, tips, strengths and actions in casual, friendly Bangla ("তুমি"), keeping IELTS terms (Task Response, Coherence & Cohesion, Lexical Resource, collocation...) in English. Quotes, fixes, words and improved sentences stay in English.'
    : 'Write everything in clear, simple English.';
}

const CALIBRATION = `Calibration (public IELTS band descriptors, simplified):
- Band 5: limited range, frequent errors that can cause difficulty; ideas not well developed; mechanical or faulty linking.
- Band 6: relevant but some ideas unclear or under-developed; adequate range with some errors that rarely impede meaning; linking works but may be mechanical.
- Band 7: clear position/overview, ideas extended and supported; some less common vocabulary with awareness of style/collocation; frequent error-free sentences; a range of cohesive devices.
- Band 8: fully developed, well organised; wide, precise vocabulary; wide range of structures, majority error-free.
Be strict and realistic, like an examiner: do not inflate. Judge only what is written. This is PRACTICE feedback, an estimate, never an official score.`;

async function runJson(provider: AIProvider, system: string, user: string): Promise<{ data: AIFeedback; model: string }> {
  // Assessments are long, structured replies: give each model up to 35 s and fall
  // back to the next model within 80 s in total (route maxDuration is 90 s).
  const result = await provider.run({
    system,
    messages: [{ role: 'user', content: user }],
    tier: 'smart',
    json: true,
    maxOutputTokens: 4096,
    timeoutMs: 35_000,
    budgetMs: 80_000,
  });
  const text = result.text.replace(/^```(?:json)?\s*|\s*```$/g, '');
  try {
    return { data: aiSchema.parse(JSON.parse(text)), model: result.model };
  } catch {
    throw new MinoError('unavailable', 'assessment was not valid JSON');
  }
}

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9']+/g, ' ').trim();

/** Keeps only quotes that really appear in the student's answer, and fixes criterion names/order. */
function clean(ai: AIFeedback, expected: readonly string[], source: string, taskId: string, title: string, wordCount?: number): TaskFeedback {
  const text = normalise(source);
  const inText = (q: string) => q.trim().length > 0 && text.includes(normalise(q));
  const criteria: CriterionFeedback[] = expected.map((name) => {
    const found = ai.criteria.find((c) => normalise(c.criterion) === normalise(name)) ?? ai.criteria.find((c) => normalise(name).includes(normalise(c.criterion).split(' ')[0]));
    return { criterion: name, band: found ? clampBand(found.band) : null, comment: found?.comment ?? '' };
  });
  return {
    taskId,
    title,
    ...(wordCount !== undefined ? { wordCount } : {}),
    band: criteriaBand(criteria),
    criteria,
    strengths: ai.strengths.slice(0, 3),
    mistakes: ai.mistakes.filter((m) => inText(m.quote)).slice(0, 6),
    actions: ai.actions.slice(0, 3),
    vocabulary: ai.vocabulary.slice(0, 5),
    betterSentences: ai.betterSentences.filter((b) => inText(b.original)).slice(0, 3),
  };
}

function emptyTask(taskId: string, title: string, names: readonly string[], comment: string, wordCount?: number): TaskFeedback {
  return {
    taskId,
    title,
    ...(wordCount !== undefined ? { wordCount } : {}),
    band: null,
    criteria: names.map((criterion) => ({ criterion, band: null, comment })),
    strengths: [],
    mistakes: [],
    actions: [],
    vocabulary: [],
    betterSentences: [],
  };
}

export async function assessWriting(provider: AIProvider, test: PracticeTest, session: TestSession, language: 'en' | 'bn'): Promise<ProductiveFeedback> {
  const section = test.sections.writing;
  if (!section) throw new MinoError('invalid_request', 'no writing section');
  let model = '';
  const tasks = await Promise.all(
    section.tasks.map(async (task) => {
      const answer = (session.responses?.[task.id] ?? '').trim();
      const counted = countWords(answer);
      const words = counted.words + counted.numbers;
      const title = `Task ${task.task}`;
      const names = WRITING_CRITERIA[task.task];
      if (words < 30) return emptyTask(task.id, title, names, language === 'bn' ? 'Assess করার মতো যথেষ্ট লেখা নেই।' : 'Not enough writing to assess.', words);

      const data = task.data ? `\nTask data (${task.data.caption}):\n${[task.data.headers, ...task.data.rows].map((r) => r.join(' | ')).join('\n')}` : '';
      const system = `You are Mino, an experienced IELTS Writing coach who knows the examiner criteria. Assess ONE Academic Writing Task ${task.task} answer.
Criteria (use exactly these names): ${names.join(', ')}.
The answer has ${words} words; the minimum is ${task.minWords}. ${words < task.minWords ? `It is UNDER the minimum: this must lower ${names[0]}.` : ''}
${task.task === 1 ? 'Task 1: check for a clear overview, key features and accurate comparisons of the data; no opinions.' : 'Task 2: check the answer addresses every part of the question with a clear position, developed ideas and support.'}
${CALIBRATION}
${languageRule(language)}
Quotes in "mistakes" and "betterSentences.original" MUST be copied exactly from the answer.
${JSON_SHAPE}`;
      const { data: ai, model: m } = await runJson(provider, system, `Question:\n${task.prompt}${data}\n\nStudent's answer:\n${answer}`);
      model = m;
      return clean(ai, names, answer, task.id, title, words);
    }),
  );
  const t1 = tasks.find((t) => t.title === 'Task 1')?.band ?? null;
  const t2 = tasks.find((t) => t.title === 'Task 2')?.band ?? null;
  return {
    skill: 'writing',
    generatedAt: new Date().toISOString(),
    model: model || 'none',
    overall: writingOverall(t1, t2),
    tasks,
    notes: ['estimate', ...(tasks.some((t) => t.band === null) ? ['incomplete'] : [])],
  };
}

export async function assessSpeaking(provider: AIProvider, test: PracticeTest, session: TestSession, language: 'en' | 'bn'): Promise<ProductiveFeedback> {
  const section = test.sections.speaking;
  if (!section) throw new MinoError('invalid_request', 'no speaking section');
  const answers: string[] = [];
  let totalWords = 0;
  let totalSeconds = 0;
  let allText = '';
  for (const part of section.parts) {
    const questions = part.cueCard ? [part.cueCard.task] : part.questions;
    questions.forEach((q, i) => {
      const key = `${part.id}-${i}`;
      const said = (session.responses?.[key] ?? '').trim();
      const seconds = session.durations?.[key] ?? 0;
      const words = said ? said.split(/\s+/).length : 0;
      totalWords += words;
      totalSeconds += seconds;
      allText += ` ${said}`;
      answers.push(`Part ${part.part} Q: ${q}\nAnswer (${words} words${seconds ? `, ${seconds}s, ${Math.round((words / seconds) * 60)} words/min` : ''}): ${said || '(no answer)'}`);
    });
  }
  const names = SPEAKING_CRITERIA;
  const pronunciationNote = language === 'bn' ? 'শুধু transcript থেকে Pronunciation বিচার করা যায় না।' : 'Pronunciation cannot be judged from a transcript.';
  if (totalWords < 40) {
    const task = emptyTask('speaking', 'Speaking', names, language === 'bn' ? 'Assess করার মতো যথেষ্ট উত্তর নেই।' : 'Not enough speech to assess.');
    return { skill: 'speaking', generatedAt: new Date().toISOString(), model: 'none', overall: null, tasks: [task], notes: ['estimate', 'incomplete', 'transcript-only'] };
  }
  const system = `You are Mino, an experienced IELTS Speaking coach who knows the examiner criteria. You get a TRANSCRIPT (speech-to-text) of a practice Speaking test, with timing.
Criteria (use exactly these names): ${names.join(', ')}.
Pronunciation cannot be judged from text: give it band null and say so. Judge Fluency & Coherence from answer length, development, words per minute and linking (speech-to-text may drop fillers and punctuation; don't penalise missing punctuation). Short answers that aren't extended lower Fluency & Coherence. Notice memorised-sounding, unnatural phrases.
${CALIBRATION.replace('what is written', 'what was said')}
${languageRule(language)}
Quotes in "mistakes" and "betterSentences.original" MUST be copied exactly from the transcript.
${JSON_SHAPE}`;
  const { data: ai, model } = await runJson(provider, system, answers.join('\n\n'));
  const task = clean(ai, names, allText, 'speaking', 'Speaking');
  const pron = task.criteria.find((c) => c.criterion === 'Pronunciation');
  if (pron) {
    pron.band = null;
    pron.comment = pronunciationNote;
  }
  task.band = criteriaBand(task.criteria);
  return {
    skill: 'speaking',
    generatedAt: new Date().toISOString(),
    model,
    overall: task.band,
    tasks: [task],
    notes: ['estimate', 'transcript-only', ...(totalSeconds ? [] : ['no-timing'])],
  };
}
