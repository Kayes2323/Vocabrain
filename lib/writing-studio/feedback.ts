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
  /** True when the final task is a targeted skill drill (finalPrompt.skillFocus set). */
  skillDrill = false,
  /** The learner's chosen language for this checker's own messages — only the
   * message text changes; every condition above decides whether a message
   * fires at all, and that logic never changes with locale. Defaults to 'en'
   * so every existing call site keeps its exact original behaviour. */
  locale: 'en' | 'bn' = 'en',
): EssayFeedback {
  // Picks the message for the active locale; `quote` (copied from the student's
  // own English answer) and `category` (a fixed classification key) are never
  // touched by this — only the human-readable why/fix/strength/suggestion text is.
  const msg = (en: string, bn: string) => (locale === 'bn' ? bn : en);
  const clean = text.trim();
  const wordCount = countWords(clean);
  const sentences = splitSentences(clean);
  const paragraphs = clean.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const lower = clean.toLowerCase();

  const strengths: string[] = [];
  const mistakes: FoundMistake[] = [];
  const suggestions: string[] = [];

  // A skill drill whose whole answer IS the overview (e.g. "write the main message of
  // the chart in two sentences") is too short to carry a developed-response word
  // minimum, linking-word quota, "Overall," opener or a ban on any single figure.
  // Those belong to a full response, so this drill only treats listing figures as a fault.
  const drillOverview = skillDrill && scope === 'overview-only';
  // Likewise a Task 1 skill drill that asks for ONE body paragraph: the answer has no
  // overview or introduction to carry, and a body paragraph connects ideas through
  // meaningful comparison ("whereas", "by comparison"), not a quota of listed linkers.
  const drillParagraph = skillDrill && kind === 'task1' && scope === 'paragraph-only';
  const softLength = scope === 'introduction-only' || drillOverview || drillParagraph;

  const meetsLength = wordCount >= minWords;
  if (meetsLength) {
    strengths.push(
      softLength
        ? msg(`You wrote ${wordCount} words — around the suggested length for this exercise.`, `তুমি লিখেছ ${wordCount} শব্দ — এই exercise-এর জন্য যে length suggest করা হয়েছে তার কাছাকাছি।`)
        : msg(`You wrote ${wordCount} words — at or above the ${minWords}-word minimum.`, `তুমি লিখেছ ${wordCount} শব্দ — ${minWords} শব্দের minimum-এর সমান বা তার বেশি।`),
    );
  } else if (softLength) {
    // A short introduction-only drill asks for one or two sentences, not a developed
    // paragraph — being under the suggested length is not a fault here, so this is a
    // neutral note, never a "Task response" mistake implying the answer is wrong.
    // The wording must match what the drill is about: "paraphrase" only makes sense for an
    // introduction drill. The checker cannot judge accuracy or comparison quality, so these
    // are neutral notes about length being flexible, never a verdict on the answer.
    suggestions.push(
      drillParagraph
        ? msg(
            `Suggested length for this exercise: around ${minWords} words. This is flexible, but the paragraph should still develop a clear comparison using accurate supporting data.`,
            `এই exercise-এর জন্য suggested length: প্রায় ${minWords} শব্দ। এটা flexible, তবে paragraph-টায় সঠিক তথ্য দিয়ে একটা স্পষ্ট comparison develop করা থাকতে হবে।`,
          )
        : drillOverview
          ? msg(
              `Suggested length for this exercise: around ${minWords} words. This is flexible — a shorter overview is fine as long as it communicates the main pattern accurately.`,
              `এই exercise-এর জন্য suggested length: প্রায় ${minWords} শব্দ। এটা flexible — মূল pattern-টা ঠিকভাবে বোঝাতে পারলে একটু ছোট overview-ও চলবে।`,
            )
          : msg(
              `Suggested length for this exercise: around ${minWords} words — not a strict requirement, as long as the paraphrase is accurate.`,
              `এই exercise-এর জন্য suggested length: প্রায় ${minWords} শব্দ — এটা কোনো কড়া নিয়ম না, paraphrase ঠিক হলেই হবে।`,
            ),
    );
  } else {
    mistakes.push({
      category: 'Task response',
      quote: `${wordCount} words`,
      why: msg(
        `Under ${minWords} words usually means an idea is underdeveloped, which costs marks for Task Achievement/Response.`,
        `${minWords} শব্দের কম মানে সাধারণত কোনো idea পুরোপুরি develop হয়নি, যেটা Task Achievement/Response-এ নম্বর কমায়।`,
      ),
      fix: msg(
        `Add roughly ${minWords - wordCount} more words — develop one point with an example rather than starting a new idea.`,
        `আরও প্রায় ${minWords - wordCount} শব্দ যোগ করো — নতুন একটা idea শুরু না করে, একটা point-কে উদাহরণ দিয়ে আরও develop করো।`,
      ),
    });
  }

  // A one-or-two-sentence introduction-only drill is too short to expect two
  // linking words from — that check belongs to a full response or paragraph.
  let linkerHits: string[] = [];
  if (scope !== 'introduction-only' && !drillOverview && !drillParagraph) {
    linkerHits = LINKERS.filter((l) => lower.includes(l));
    if (linkerHits.length >= 2) {
      strengths.push(
        msg(
          `You linked ideas with words like "${linkerHits.slice(0, 2).join('", "')}" — that helps Coherence & Cohesion.`,
          `তুমি "${linkerHits.slice(0, 2).join('", "')}" এর মতো শব্দ দিয়ে idea-গুলো connect করেছ — এটা Coherence & Cohesion-এর জন্য ভালো।`,
        ),
      );
    } else {
      mistakes.push({
        category: 'Coherence & cohesion',
        quote: sentences[0] ?? clean.slice(0, 60),
        why: msg(
          'Few or no linking words were found, so ideas can read as a list rather than a connected argument.',
          'খুব কম অথবা কোনো linking word পাওয়া যায়নি, তাই idea-গুলো একটা connected argument না হয়ে আলাদা আলাদা তালিকার মতো লাগছে।',
        ),
        fix: msg(
          'Open at least two sentences with a linker such as "However,", "As a result," or "For example,".',
          'অন্তত দুইটা বাক্য "However,", "As a result," বা "For example," এর মতো একটা linker দিয়ে শুরু করো।',
        ),
      });
    }
  }

  if (kind === 'task1') {
    // An introduction-only task (e.g. a paraphrase drill) should NOT contain an
    // overview sentence yet — that belongs to a later, separate part of a response.
    if (scope !== 'introduction-only' && !drillOverview && !drillParagraph) {
      if (scope === 'full') {
        // A full Task 1 response: whether an overview is present, and whether it is accurate, is a
        // semantic judgement. Searching for a phrase such as "Overall" proves neither (a valid overview
        // can be worded differently, and "Overall, …" can be wrong), so this checker neither reports a
        // missing overview nor credits one. It says so, and asks the writer to check it themselves.
        suggestions.push(
          msg(
            'This local checker cannot reliably tell whether your response has a clear overview, or whether it summarises the main features accurately — it only runs simple checks such as word count and figures. Please re-read it yourself: is there a short summary of the most important patterns (separate from the detailed figures), and is every claim true to the chart?',
            'এই local checker নিশ্চিতভাবে বলতে পারে না তোমার response-এ স্পষ্ট overview আছে কিনা, বা main feature-গুলো ঠিকভাবে summarise করা হয়েছে কিনা — এটা শুধু word count আর figure-এর মতো সাধারণ check চালায়। নিজে আরেকবার পড়ে দেখো: সবচেয়ে গুরুত্বপূর্ণ pattern-গুলোর একটা ছোট summary (বিস্তারিত figure থেকে আলাদা) আছে কি, আর প্রতিটা তথ্য chart-এর সাথে ঠিক মিলছে কি?',
          ),
        );
      } else {
        const hasOverview = OVERVIEW_PHRASES.some((p) => lower.includes(p));
        if (hasOverview) {
          strengths.push(msg('You included an overview-style sentence — this is what examiners look for first in Task 1.', 'তুমি একটা overview-ধরনের বাক্য দিয়েছ — Task 1-এ examiner-রা প্রথমেই এটাই খোঁজেন।'));
        } else {
          mistakes.push({
            category: 'Task response',
            quote: paragraphs[1]?.slice(0, 60) ?? clean.slice(0, 60),
            why: msg(
              'No sentence clearly stands back and summarises the main trend(s) — Task 1 needs a dedicated overview, not just a list of numbers.',
              'কোনো বাক্য স্পষ্টভাবে পিছিয়ে এসে মূল trend-টা summarise করছে না — Task 1-এ শুধু সংখ্যার তালিকা না, একটা আলাদা overview দরকার।',
            ),
            fix: msg(
              'Add a short paragraph that starts "Overall, ..." and names the one or two biggest patterns before the detail.',
              'বিস্তারিত তথ্যের আগে "Overall, ..." দিয়ে শুরু করা একটা ছোট paragraph যোগ করো, যেখানে সবচেয়ে বড় এক বা দুইটা pattern উল্লেখ থাকবে।',
            ),
          });
        }
      }
    }
    const hasNumber = /\d/.test(clean) || /per\s?cent|percent|%/.test(lower);
    if (drillOverview) {
      const figures = clean.match(/\d+(\.\d+)?/g) ?? [];
      if (figures.length >= 3) mistakes.push({
        category: 'Task response',
        quote: figures.slice(0, 3).join(', '),
        why: msg(
          'This overview lists several individual figures. An overview gives the main message; the detailed figures belong in the body paragraphs.',
          'এই overview-তে বেশ কয়েকটা আলাদা figure তালিকা করা হয়েছে। overview মূল message দেয়; বিস্তারিত figure-গুলো body paragraph-এ থাকা উচিত।',
        ),
        fix: msg(
          'Replace the list of figures with the overall pattern (which category stayed highest, and which changed most).',
          'figure-এর তালিকার বদলে overall pattern লেখো (কোন category সবচেয়ে বেশি ছিল, আর কোনটা সবচেয়ে বেশি বদলেছে)।',
        ),
      });
    } else if (scope === 'overview-only') {
      if (hasNumber) mistakes.push({
        category: 'Task response',
        quote: clean.match(/\b\d+(\.\d+)?\s?%?\b/)?.[0] ?? '',
        why: msg(
          'An overview should stay at the level of general trends and the single most striking feature — individual figures belong in the body paragraphs.',
          'overview শুধু general trend আর সবচেয়ে উল্লেখযোগ্য feature-এর স্তরে থাকা উচিত — আলাদা আলাদা figure body paragraph-এ থাকবে।',
        ),
        fix: msg('Remove the specific figure here and keep this sentence about the overall pattern instead.', 'এখান থেকে নির্দিষ্ট figure-টা সরিয়ে, বাক্যটাকে overall pattern নিয়ে রাখো।'),
      });
    } else if (scope === 'introduction-only') {
      // An introduction legitimately restates the question's own dates ("in 2010 and
      // 2023") and measurement word ("percentage"), so neither counts as a data figure:
      // only a non-year figure (a decimal or a number of two or more digits) or a "%" sign does.
      const withoutYears = clean.replace(/\b(?:1[5-9]|20)\d{2}\b/g, '');
      const figure = withoutYears.match(/\b\d+\.\d+\b|\b\d{2,}\b/)?.[0] ?? (withoutYears.includes('%') ? '%' : '');
      if (figure) mistakes.push({
        category: 'Task response',
        quote: figure,
        why: msg(
          'An introduction should only paraphrase the question — specific figures belong in the body paragraphs, not here.',
          'introduction-এ শুধু প্রশ্নটাকে paraphrase করা উচিত — নির্দিষ্ট figure body paragraph-এ থাকবে, এখানে না।',
        ),
        fix: msg('Remove the specific figure here and keep this sentence focused on restating the task accurately.', 'এখান থেকে নির্দিষ্ট figure-টা সরিয়ে, বাক্যটাকে প্রশ্নটা সঠিকভাবে restate করার দিকেই রাখো।'),
      });
    } else if (!hasNumber) {
      mistakes.push({
        category: 'Task response',
        quote: clean.slice(0, 60),
        why: msg('Task 1 body paragraphs should support the overview with specific data from the chart.', 'Task 1-এর body paragraph-গুলো chart-এর নির্দিষ্ট তথ্য দিয়ে overview-কে support করা উচিত।'),
        fix: msg('Quote at least two or three figures or percentages from the chart in your body paragraphs.', 'তোমার body paragraph-এ chart থেকে অন্তত দুই বা তিনটা figure বা percentage উল্লেখ করো।'),
      });
    }
  } else {
    const hasExample = /for example|for instance|such as/.test(lower);
    if (hasExample) {
      strengths.push(msg('You supported your point with a concrete example — this is exactly what examiners want to see developed.', 'তুমি একটা concrete example দিয়ে তোমার point-টা support করেছ — এটাই examiner-রা develop হতে দেখতে চান।'));
    } else {
      suggestions.push(msg('Add at least one concrete example (for example, ...) to support your main argument.', 'তোমার মূল argument-কে support করার জন্য অন্তত একটা concrete example (for example, ...) যোগ করো।'));
    }

    if (scope === 'paragraph-only') {
      if (sentences.length < 4) mistakes.push({
        category: 'Task response',
        quote: `${sentences.length} sentence(s)`,
        why: msg(
          'A fully developed body paragraph usually needs at least an idea, an explanation, an example and a result — four moves, often four or more sentences.',
          'একটা পুরোপুরি develop করা body paragraph-এ সাধারণত অন্তত একটা idea, একটা explanation, একটা example আর একটা result থাকে — চারটা অংশ, প্রায়ই চার বা তার বেশি বাক্য।',
        ),
        fix: msg('Check that your paragraph covers all four parts of IDEA → EXPLANATION → EXAMPLE → RESULT.', 'তোমার paragraph-এ IDEA → EXPLANATION → EXAMPLE → RESULT — এই চারটা অংশই আছে কিনা চেক করো।'),
      });
    } else {
      const hasPosition = POSITION_PHRASES.some((p) => lower.includes(p));
      if (hasPosition) {
        strengths.push(msg('Your position is stated clearly — good for Task Response.', 'তোমার position স্পষ্টভাবে বলা হয়েছে — Task Response-এর জন্য ভালো।'));
      } else {
        mistakes.push({
          category: 'Task response',
          quote: paragraphs[0]?.slice(0, 60) ?? clean.slice(0, 60),
          why: msg(
            'A clear personal position was not found in the introduction, so the examiner may mark this as a partial response.',
            'introduction-এ তোমার নিজের স্পষ্ট position পাওয়া যায়নি, তাই examiner এটাকে একটা partial response হিসেবে ধরতে পারেন।',
          ),
          fix: msg(
            'Add a sentence such as "In my opinion, ..." near the end of your introduction and keep it consistent in the conclusion.',
            'তোমার introduction-এর শেষে "In my opinion, ..." এর মতো একটা বাক্য যোগ করো, আর conclusion-এও সেটা একই রাখো।',
          ),
        });
      }
      if (paragraphs.length < 3) mistakes.push({
        category: 'Coherence & cohesion',
        quote: `${paragraphs.length} paragraph(s)`,
        why: msg(
          'A Task 2 essay normally needs an introduction, at least two body paragraphs and a conclusion, each separated by a blank line.',
          'একটা Task 2 essay-তে সাধারণত একটা introduction, অন্তত দুইটা body paragraph আর একটা conclusion থাকে, প্রতিটা একটা ফাঁকা লাইন দিয়ে আলাদা করা।',
        ),
        fix: msg('Press Enter twice between your introduction, each body paragraph and your conclusion.', 'তোমার introduction, প্রতিটা body paragraph আর conclusion-এর মাঝে দুইবার Enter চাপো।'),
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
    why: msg('Starting many sentences the same way makes the writing feel repetitive.', 'অনেক বাক্য একইভাবে শুরু করলে লেখাটা repetitive মনে হয়।'),
    fix: msg('Rewrite one or two of those sentences to start with a different word or a linking phrase.', 'ওই বাক্যগুলোর এক বা দুইটা অন্য একটা শব্দ বা linking phrase দিয়ে নতুন করে শুরু করো।'),
  });

  // Run-on sentence: very long sentence with few commas
  const runOn = sentences.find((s) => countWords(s) > 35 && (s.match(/,/g)?.length ?? 0) < 2);
  if (runOn) mistakes.push({
    category: 'Grammar',
    quote: runOn.length > 90 ? `${runOn.slice(0, 90)}…` : runOn,
    why: msg(`This sentence is ${countWords(runOn)} words long with little punctuation, which risks a run-on sentence.`, `এই বাক্যটা ${countWords(runOn)} শব্দের, খুব কম punctuation সহ — এটা run-on sentence হয়ে যাওয়ার ঝুঁকি আছে।`),
    fix: msg('Split it into two sentences, or add a comma before a linking word such as "and", "but" or "because".', 'এটাকে দুইটা বাক্যে ভাগ করো, অথবা "and", "but" বা "because"-এর মতো linking word-এর আগে একটা comma দাও।'),
  });

  // a/an agreement
  const aAn = clean.match(/\b[Aa]\s+[aeiouAEIOU]\w*/g);
  if (aAn && aAn.length) mistakes.push({
    category: 'Grammar',
    quote: aAn[0],
    why: msg('"A" before a word that starts with a vowel sound usually needs to be "an".', 'vowel sound দিয়ে শুরু হওয়া শব্দের আগে সাধারণত "A" না হয়ে "an" হওয়া উচিত।'),
    fix: msg(`Change "${aAn[0]}" to "${aAn[0].replace(/^A/, 'An').replace(/^a/, 'an')}".`, `"${aAn[0]}" কে "${aAn[0].replace(/^A/, 'An').replace(/^a/, 'an')}" করো।`),
  });

  // Informal contractions
  const foundContraction = Object.keys(INFORMAL_CONTRACTIONS).find((c) => new RegExp(`\\b${c}\\b`, 'i').test(clean));
  if (foundContraction) mistakes.push({
    category: 'Vocabulary',
    quote: foundContraction,
    why: msg('Contractions read as informal; IELTS Writing is assessed as formal academic English.', 'Contraction শুনতে informal লাগে; IELTS Writing formal academic English হিসেবে assess করা হয়।'),
    fix: msg(`Write "${INFORMAL_CONTRACTIONS[foundContraction]}" in full.`, `পুরো আকারে "${INFORMAL_CONTRACTIONS[foundContraction]}" লেখো।`),
  });

  // Double spaces / missing terminal punctuation
  if (/ {2,}/.test(clean)) mistakes.push({
    category: 'Mechanics',
    quote: 'double space',
    why: msg('Extra spaces between words are a small but avoidable mechanical slip.', 'শব্দের মাঝে extra space একটা ছোট কিন্তু এড়ানো যায় এমন mechanical ভুল।'),
    fix: msg('Remove the extra space.', 'extra space-টা মুছে ফেলো।'),
  });
  const lastChar = clean.trim().slice(-1);
  if (clean.length > 0 && !'.!?'.includes(lastChar)) mistakes.push({
    category: 'Mechanics',
    quote: clean.slice(-20),
    why: msg('The response does not end with sentence punctuation.', 'response-টা কোনো sentence punctuation দিয়ে শেষ হয়নি।'),
    fix: msg('Finish the final sentence with a full stop.', 'শেষ বাক্যটা একটা full stop দিয়ে শেষ করো।'),
  });

  if (mistakes.length === 0) {
    strengths.push(
      msg('No issues were flagged by these checks — read it aloud once more before you submit in a real test.', 'এই check-গুলোতে কোনো সমস্যা ধরা পড়েনি — আসল test-এ জমা দেওয়ার আগে একবার জোরে পড়ে দেখো।'),
    );
  }

  // Indicative band: start mid, nudge for each signal. Deliberately coarse.
  let band = 6.0;
  // Being under the suggested (non-strict) length is not a fault for an introduction-only
  // drill, so it must not drag the band down the way a real under-length response does.
  if (softLength) band += meetsLength ? 0.5 : 0;
  else band += meetsLength ? 0.5 : -1;
  if (!softLength) band += linkerHits.length >= 2 ? 0.5 : -0.5;
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
