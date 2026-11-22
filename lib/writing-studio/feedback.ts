// Mino Writing Studio — prototype feedback engine.
//
// This is a small, honest set of local text checks (word count, linking
// words, a clear position, basic article/agreement slips, repeated
// sentence openers, run-on sentences). It runs entirely in the browser on
// whatever the student typed — no network call, no AI model. It is a
// teaching aid for the prototype, not an IELTS examiner, and every screen
// that shows its output says so.

export type MistakeCategory =
  | 'Task response'
  | 'Coherence & cohesion'
  | 'Grammar'
  | 'Vocabulary'
  | 'Mechanics';

export interface FoundMistake {
  category: MistakeCategory;
  quote: string;
  why: string;
  fix: string;
}

export interface EssayFeedback {
  wordCount: number;
  minWords: number;
  meetsLength: boolean;
  strengths: string[];
  mistakes: FoundMistake[];
  suggestions: string[];
  /** 4.0–8.5, rounded to a half band. Indicative only — see callers' copy. */
  indicativeBand: number;
}

/**
 * What the Feedback Zone actually renders. Either real feedback from Mino
 * (AI, by criterion) or this prototype's local checks, when Mino's feedback
 * isn't available (not signed in, rate-limited, or no provider configured).
 * Both are honestly labelled in the UI — neither is a real IELTS score.
 */
export interface UnifiedFeedback {
  source: 'ai' | 'local';
  band: number | null;
  wordCount: number;
  minWords: number;
  meetsLength: boolean;
  criteria?: { criterion: string; band: number | null; comment: string }[];
  strengths: string[];
  mistakes: { category?: string; quote: string; fix: string; why: string }[];
  suggestions: string[];
  vocabulary?: { word: string; tip: string }[];
  betterSentences?: { original: string; improved: string }[];
  /** Set when Mino's real feedback was unavailable and this fell back to the local checks. */
  fallbackReason?: import('@/lib/ai/types').MinoErrorCode;
  /**
   * Set when this answer was a short skill drill, not a full Task 1/2
   * response (from the lesson's finalPrompt.skillFocus). The Feedback Zone
   * uses this to show a skill-check verdict instead of a number that looks
   * like a full-task IELTS band.
   */
  skillFocus?: string;
}

export function fromLocal(e: EssayFeedback, fallbackReason?: UnifiedFeedback['fallbackReason'], skillFocus?: string): UnifiedFeedback {
  return {
    source: 'local',
    band: e.indicativeBand,
    wordCount: e.wordCount,
    minWords: e.minWords,
    meetsLength: e.meetsLength,
    strengths: e.strengths,
    mistakes: e.mistakes,
    suggestions: e.suggestions,
    fallbackReason,
    skillFocus,
  };
}

export function fromAI(
  task: import('@/lib/ielts').TaskFeedback,
  wordCount: number,
  minWords: number,
  skillFocus?: string,
): UnifiedFeedback {
  return {
    source: 'ai',
    band: task.band,
    wordCount,
    minWords,
    meetsLength: wordCount >= minWords,
    criteria: task.criteria,
    strengths: task.strengths,
    mistakes: task.mistakes.map((m) => ({ quote: m.quote, fix: m.fix, why: m.why })),
    suggestions: task.actions,
    vocabulary: task.vocabulary,
    betterSentences: task.betterSentences,
    skillFocus,
  };
}

const LINKERS = [
  'however', 'moreover', 'furthermore', 'in addition', 'as a result', 'for example', 'for instance',
  'because', 'although', 'even though', 'therefore', 'firstly', 'secondly', 'finally', 'overall',
  'in conclusion', 'in contrast', 'on the other hand', 'similarly', 'consequently', 'in general',
];

const POSITION_PHRASES = [
  'i believe', 'i think', 'in my opinion', 'in my view', 'i would argue', 'i agree', 'i disagree',
  'this essay will argue', 'this essay argues',
];

const OVERVIEW_PHRASES = ['overall', 'in general', 'it is clear that', 'the main feature', 'the most striking', 'a general trend'];

const INFORMAL_CONTRACTIONS: Record<string, string> = {
  "don't": 'do not',
  "doesn't": 'does not',
  "can't": 'cannot',
  "won't": 'will not',
  "isn't": 'is not',
  "aren't": 'are not',
  "it's": 'it is',
  "they're": 'they are',
  "didn't": 'did not',
};

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function countWords(text: string): number {
  const m = text.trim().match(/\S+/g);
  return m ? m.length : 0;
}

function clampBand(n: number): number {
  const b = Math.max(4, Math.min(8.5, n));
  return Math.round(b * 2) / 2;
}

/**
 * A small set of local checks shared by Task 1 and Task 2. `kind` tunes which
 * task-specific checks run (overview phrase for Task 1, position phrase for
 * Task 2).
 */
export function checkEssay(
  text: string,
  minWords: number,
  kind: 'task1' | 'task2',
  scope: 'full' | 'overview-only' | 'paragraph-only' | 'introduction-only' = 'full',
): EssayFeedback {
  const clean = text.trim();
  const wordCount = countWords(clean);
  const sentences = splitSentences(clean);
  const paragraphs = clean.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const lower = clean.toLowerCase();

  const strengths: string[] = [];
  const mistakes: FoundMistake[] = [];
  const suggestions: string[] = [];

  const meetsLength = wordCount >= minWords;
  if (meetsLength) strengths.push(`You wrote ${wordCount} words — at or above the ${minWords}-word minimum.`);
  else mistakes.push({
    category: 'Task response',
    quote: `${wordCount} words`,
    why: `Under ${minWords} words usually means an idea is underdeveloped, which costs marks for Task Achievement/Response.`,
    fix: `Add roughly ${minWords - wordCount} more words — develop one point with an example rather than starting a new idea.`,
  });

  const linkerHits = LINKERS.filter((l) => lower.includes(l));
  if (linkerHits.length >= 2) strengths.push(`You linked ideas with words like "${linkerHits.slice(0, 2).join('", "')}" — that helps Coherence & Cohesion.`);
  else mistakes.push({
    category: 'Coherence & cohesion',
    quote: sentences[0] ?? clean.slice(0, 60),
    why: 'Few or no linking words were found, so ideas can read as a list rather than a connected argument.',
    fix: 'Open at least two sentences with a linker such as "However,", "As a result," or "For example,".',
  });

  if (kind === 'task1') {
    // An introduction-only task (e.g. a paraphrase drill) should NOT contain an
    // overview sentence yet — that belongs to a later, separate part of a response.
    if (scope !== 'introduction-only') {
      const hasOverview = OVERVIEW_PHRASES.some((p) => lower.includes(p));
      if (hasOverview) strengths.push('You included an overview-style sentence — this is what examiners look for first in Task 1.');
      else mistakes.push({
        category: 'Task response',
        quote: paragraphs[1]?.slice(0, 60) ?? clean.slice(0, 60),
        why: 'No sentence clearly stands back and summarises the main trend(s) — Task 1 needs a dedicated overview, not just a list of numbers.',
        fix: 'Add a short paragraph that starts "Overall, ..." and names the one or two biggest patterns before the detail.',
      });
    }
    const hasNumber = /\d/.test(clean) || /per\s?cent|percent|%/.test(lower);
    if (scope === 'overview-only') {
      if (hasNumber) mistakes.push({
        category: 'Task response',
        quote: clean.match(/\b\d+(\.\d+)?\s?%?\b/)?.[0] ?? '',
        why: 'An overview should stay at the level of general trends and the single most striking feature — individual figures belong in the body paragraphs.',
        fix: 'Remove the specific figure here and keep this sentence about the overall pattern instead.',
      });
    } else if (scope === 'introduction-only') {
      if (hasNumber) mistakes.push({
        category: 'Task response',
        quote: clean.match(/\b\d+(\.\d+)?\s?%?\b/)?.[0] ?? '',
        why: 'An introduction should only paraphrase the question — specific figures belong in the body paragraphs, not here.',
        fix: 'Remove the specific figure here and keep this sentence focused on restating the task accurately.',
      });
    } else if (!hasNumber) {
      mistakes.push({
        category: 'Task response',
        quote: clean.slice(0, 60),
        why: 'Task 1 body paragraphs should support the overview with specific data from the chart.',
        fix: 'Quote at least two or three figures or percentages from the chart in your body paragraphs.',
      });
    }
  } else {
    const hasExample = /for example|for instance|such as/.test(lower);
    if (hasExample) strengths.push('You supported your point with a concrete example — this is exactly what examiners want to see developed.');
    else suggestions.push('Add at least one concrete example (for example, ...) to support your main argument.');

    if (scope === 'paragraph-only') {
      if (sentences.length < 4) mistakes.push({
        category: 'Task response',
        quote: `${sentences.length} sentence(s)`,
        why: 'A fully developed body paragraph usually needs at least an idea, an explanation, an example and a result — four moves, often four or more sentences.',
        fix: 'Check that your paragraph covers all four parts of IDEA → EXPLANATION → EXAMPLE → RESULT.',
      });
    } else {
      const hasPosition = POSITION_PHRASES.some((p) => lower.includes(p));
      if (hasPosition) strengths.push('Your position is stated clearly — good for Task Response.');
      else mistakes.push({
        category: 'Task response',
        quote: paragraphs[0]?.slice(0, 60) ?? clean.slice(0, 60),
        why: 'A clear personal position was not found in the introduction, so the examiner may mark this as a partial response.',
        fix: 'Add a sentence such as "In my opinion, ..." near the end of your introduction and keep it consistent in the conclusion.',
      });
      if (paragraphs.length < 3) mistakes.push({
        category: 'Coherence & cohesion',
        quote: `${paragraphs.length} paragraph(s)`,
        why: 'A Task 2 essay normally needs an introduction, at least two body paragraphs and a conclusion, each separated by a blank line.',
        fix: 'Press Enter twice between your introduction, each body paragraph and your conclusion.',
      });
    }
  }

  // Repeated sentence openers (cohesion / sentence variety)
  const openers = sentences.map((s) => s.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, ''));
  const openerCounts = new Map<string, number>();
  openers.forEach((o) => { if (o) openerCounts.set(o, (openerCounts.get(o) ?? 0) + 1); });
  const repeatedOpener = [...openerCounts.entries()].find(([w, c]) => c >= 3 && w.length > 2);
  if (repeatedOpener) mistakes.push({
    category: 'Coherence & cohesion',
    quote: `"${repeatedOpener[0]}" starts ${repeatedOpener[1]} sentences`,
    why: 'Starting many sentences the same way makes the writing feel repetitive.',
    fix: 'Rewrite one or two of those sentences to start with a different word or a linking phrase.',
  });

  // Run-on sentence: very long sentence with few commas
  const runOn = sentences.find((s) => countWords(s) > 35 && (s.match(/,/g)?.length ?? 0) < 2);
  if (runOn) mistakes.push({
    category: 'Grammar',
    quote: runOn.length > 90 ? `${runOn.slice(0, 90)}…` : runOn,
    why: `This sentence is ${countWords(runOn)} words long with little punctuation, which risks a run-on sentence.`,
    fix: 'Split it into two sentences, or add a comma before a linking word such as "and", "but" or "because".',
  });

  // a/an agreement
  const aAn = clean.match(/\b[Aa]\s+[aeiouAEIOU]\w*/g);
  if (aAn && aAn.length) mistakes.push({
    category: 'Grammar',
    quote: aAn[0],
    why: '"A" before a word that starts with a vowel sound usually needs to be "an".',
    fix: `Change "${aAn[0]}" to "${aAn[0].replace(/^A/, 'An').replace(/^a/, 'an')}".`,
  });

  // Informal contractions
  const foundContraction = Object.keys(INFORMAL_CONTRACTIONS).find((c) => new RegExp(`\\b${c}\\b`, 'i').test(clean));
  if (foundContraction) mistakes.push({
    category: 'Vocabulary',
    quote: foundContraction,
    why: 'Contractions read as informal; IELTS Writing is assessed as formal academic English.',
    fix: `Write "${INFORMAL_CONTRACTIONS[foundContraction]}" in full.`,
  });

  // Double spaces / missing terminal punctuation
  if (/ {2,}/.test(clean)) mistakes.push({
    category: 'Mechanics',
    quote: 'double space',
    why: 'Extra spaces between words are a small but avoidable mechanical slip.',
    fix: 'Remove the extra space.',
  });
  const lastChar = clean.trim().slice(-1);
  if (clean.length > 0 && !'.!?'.includes(lastChar)) mistakes.push({
    category: 'Mechanics',
    quote: clean.slice(-20),
    why: 'The response does not end with sentence punctuation.',
    fix: 'Finish the final sentence with a full stop.',
  });

  if (mistakes.length === 0) strengths.push('No issues were flagged by these checks — read it aloud once more before you submit in a real test.');

  // Indicative band: start mid, nudge for each signal. Deliberately coarse.
  let band = 6.0;
  band += meetsLength ? 0.5 : -1;
  band += linkerHits.length >= 2 ? 0.5 : -0.5;
  band -= mistakes.filter((m) => m.category === 'Grammar' || m.category === 'Mechanics').length * 0.25;
  band += strengths.length >= 3 ? 0.5 : 0;

  return {
    wordCount,
    minWords,
    meetsLength,
    strengths,
    mistakes,
    suggestions,
    indicativeBand: clampBand(band),
  };
}

/**
 * Used by the Idea Development Trainer: does this new answer add meaningful
 * information, or mostly repeat the words of the previous answer? A crude
 * but real overlap check (shared significant words / shorter answer's
 * significant words), not an AI judgement.
 */
/**
 * Which local checks apply to a lesson's final task, derived from its
 * minimum word count rather than hardcoded by lesson id — so every new
 * lesson gets sensible local-fallback checks automatically. A short Task 1
 * final task (<=60 words) is overview-only practice; a short Task 2 final
 * task (<=120 words) is a single developed paragraph, not a full essay.
 */
export function deriveScope(lesson: {
  task: 'task1' | 'task2';
  finalPrompt: { minWords: number; checkScope?: 'full' | 'overview-only' | 'paragraph-only' | 'introduction-only' };
}): 'full' | 'overview-only' | 'paragraph-only' | 'introduction-only' {
  if (lesson.finalPrompt.checkScope) return lesson.finalPrompt.checkScope;
  if (lesson.task === 'task1') return lesson.finalPrompt.minWords <= 60 ? 'overview-only' : 'full';
  return lesson.finalPrompt.minWords <= 120 ? 'paragraph-only' : 'full';
}

export function overlapsHeavily(previous: string, current: string): boolean {
  const words = (s: string) => new Set(s.toLowerCase().match(/[a-z]{4,}/g) ?? []);
  const a = words(previous);
  const b = words(current);
  if (a.size === 0 || b.size === 0) return false;
  let shared = 0;
  b.forEach((w) => { if (a.has(w)) shared += 1; });
  const ratio = shared / Math.min(a.size, b.size);
  return ratio > 0.6;
}
