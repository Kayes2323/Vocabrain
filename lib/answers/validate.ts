// One answer checker for every typed answer in Mino. Deterministic — no AI per
// answer. The content is the authority: an answer is right only when it matches
// the question's correctAnswer or one of its acceptedAnswers after harmless
// normalisation (case, spaces, quotes, edge punctuation). Synonyms are never
// guessed; alternatives must be written into the content.

/**
 * - exact: only the listed answers, compared character for character (spaces
 *   and curly quotes aside) — capitals and punctuation count.
 * - accepted_answers (default): the listed answers after normalisation.
 * - semantic: reserved for a future meaning-based checker. Today it grades like
 *   accepted_answers and marks a non-matching answer `needsSemantic`.
 */
export type ValidationMode = 'exact' | 'accepted_answers' | 'semantic';

/** Opt-in equivalences, for question sources where they never change the answer. */
export type Equivalence = 'numbers' | 'spelling' | 'contractions';

export interface AnswerSpec {
  /** The main (model) answer. */
  correctAnswer: string;
  /** Other answers the content accepts (correctAnswer need not be repeated). */
  acceptedAnswers?: string[];
  mode?: ValidationMode;
  /** Digits ↔ number words, UK ↔ US spelling, contractions ↔ full forms. Off unless listed. */
  equivalents?: Equivalence[];
  /** "(the) library" in an answer means "library" and "the library" are both right. */
  optionalWords?: boolean;
  /** A leading a/an/the is ignored ("car" = "the car", never "cars"). Not for article practice. */
  optionalArticles?: boolean;
  /**
   * strict (default): a misspelling is wrong (it may be flagged `nearMiss`).
   * tolerant: one slip in a word of 5+ letters is accepted — only where the exercise says so.
   */
  spelling?: 'strict' | 'tolerant';
  /** Words around a gap: an answer that repeats them ("main gate" for "the main ___") is checked without them. */
  context?: { before?: string; after?: string };
  /** Most words allowed (IELTS "NO MORE THAN TWO WORDS"); a longer answer is wrong. */
  withinLimit?: (answer: string) => boolean;
}

export type Feedback =
  | { kind: 'empty' }
  | { kind: 'correct'; answer: string }
  /** Right, with a different accepted wording than the main answer. */
  | { kind: 'accepted'; answer: string; mainAnswer: string }
  | { kind: 'wrong'; answer: string; accepted: string[]; nearMiss?: boolean; overLimit?: boolean };

export interface Validation {
  correct: boolean;
  empty: boolean;
  /** The accepted answer the student's answer matched (as written in the content). */
  matchedAnswer?: string;
  /** Matched the main answer (not an alternative). */
  primary: boolean;
  /** One or two letters away from an accepted answer: likely a spelling slip (not counted correct). */
  nearMiss: boolean;
  /** Longer than the word limit. */
  overLimit: boolean;
  /** semantic mode only: no listed answer matched, so a meaning check would be needed. */
  needsSemantic: boolean;
  /** Every accepted answer, main answer first. */
  accepted: string[];
  feedback: Feedback;
}

// ---------------------------------------------------------------- normalisation

/** Forgiven in every mode: curly quotes and spacing (dashes and capitals still count in exact mode). */
function tidy(s: string): string {
  return s
    .replace(/[‘’`´]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s*·\s*/g, ' · ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Case, spacing, quotes around the answer and punctuation at its ends; inner
 * punctuation still counts. An apostrophe that ends a word stays ("countries'"),
 * and an answer that is only punctuation (":" or ";") is kept as written.
 */
export function normalizeAnswer(s: string): string {
  const tidied = tidy(s.normalize('NFKC')).replace(/[‐‑‒–—]/g, '-').toLowerCase();
  let out = tidied.replace(/(\d),(?=\d{3}\b)/g, '$1');
  for (let prev = ''; prev !== out; ) {
    prev = out;
    out = out.replace(/^[\s.,;:!?]+|[\s.,;:!?]+$/g, '');
    const q = out.match(/^(["'])([\s\S]*)\1$/);
    if (q) out = q[2];
    out = out.replace(/^"|"$/g, '');
  }
  out = out.replace(/\s+/g, ' ').trim();
  return out || tidied;
}

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const NUMBERS: Record<string, string> = {};
for (let n = 0; n < 100; n++) NUMBERS[n < 21 ? NUMBER_WORDS[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? `-${NUMBER_WORDS[n % 10]}` : ''}`] = String(n);
NUMBERS.hundred = '100';
NUMBERS['one hundred'] = '100';
NUMBERS['a hundred'] = '100';

/** British spelling → the American spelling it is checked as (both are right). */
export const UK_US_SPELLING: Record<string, string> = {
  colour: 'color', colours: 'colors', favourite: 'favorite', favourites: 'favorites', behaviour: 'behavior', neighbour: 'neighbor', neighbours: 'neighbors',
  neighbourhood: 'neighborhood', honour: 'honor', labour: 'labor', harbour: 'harbor', humour: 'humor', flavour: 'flavor', rumour: 'rumor',
  centre: 'center', centres: 'centers', theatre: 'theater', theatres: 'theaters', metre: 'meter', metres: 'meters', litre: 'liter', litres: 'liters',
  kilometre: 'kilometer', kilometres: 'kilometers', centimetre: 'centimeter', centimetres: 'centimeters', fibre: 'fiber',
  organise: 'organize', organised: 'organized', organisation: 'organization', organisations: 'organizations', realise: 'realize', realised: 'realized',
  recognise: 'recognize', recognised: 'recognized', apologise: 'apologize', analyse: 'analyze', analysed: 'analyzed', specialise: 'specialize',
  travelling: 'traveling', travelled: 'traveled', traveller: 'traveler', travellers: 'travelers', cancelled: 'canceled', cancelling: 'canceling',
  programme: 'program', programmes: 'programs', catalogue: 'catalog', dialogue: 'dialog', defence: 'defense', licence: 'license', practise: 'practice',
  grey: 'gray', jewellery: 'jewelry', tyre: 'tire', tyres: 'tires', aluminium: 'aluminum', enrol: 'enroll', enrolment: 'enrollment',
  fulfil: 'fulfill', judgement: 'judgment', ageing: 'aging', mould: 'mold', plough: 'plow', pyjamas: 'pajamas', moustache: 'mustache',
  modelling: 'modeling', labelled: 'labeled', fuelled: 'fueled', paediatric: 'pediatric', anaemia: 'anemia', encyclopaedia: 'encyclopedia',
};

const CONTRACTIONS: [RegExp, string][] = [
  [/\bwon't\b/g, 'will not'], [/\bcan't\b/g, 'cannot'], [/\bcan not\b/g, 'cannot'], [/\bshan't\b/g, 'shall not'],
  [/\b(\w+)n't\b/g, '$1 not'], [/\bi'm\b/g, 'i am'], [/\b(\w+)'re\b/g, '$1 are'], [/\b(i|you|we|they)'ve\b/g, '$1 have'],
  [/\b(i|you|he|she|it|we|they|that|there)'ll\b/g, '$1 will'], [/\b(it|he|she|that|there|what|who|where)'s\b/g, '$1 is'],
];

/** The comparison form of an answer under a spec. */
function comparable(s: string, spec: AnswerSpec): string {
  if (spec.mode === 'exact') return tidy(s);
  let out = normalizeAnswer(s);
  const eq = spec.equivalents ?? [];
  if (eq.includes('contractions')) for (const [re, full] of CONTRACTIONS) out = out.replace(re, full);
  if (eq.includes('spelling')) out = out.replace(/[a-z]+/g, (w) => UK_US_SPELLING[w] ?? w);
  if (eq.includes('numbers')) {
    out = NUMBERS[out] ?? out;
    out = out.replace(/\b([a-z]+(?:-[a-z]+)?)\b/g, (w) => NUMBERS[w] ?? w);
  }
  if (spec.optionalArticles) out = out.replace(/^(a|an|the) (?=\S)/, '');
  return out;
}

/** "(the) library" → ["the library", "library"]. */
export function expandOptional(answer: string): string[] {
  const match = answer.match(/\(([^()]*)\)/);
  if (!match) return [answer];
  const before = answer.slice(0, match.index);
  const after = answer.slice((match.index ?? 0) + match[0].length);
  return [...expandOptional(before + match[1] + after), ...expandOptional((before + after).replace(/\s+/g, ' '))];
}

/** Edit distance, capped (anything above 2 reads as 3). */
export function editDistance(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
    }
  }
  return prev[b.length];
}

const isNearMiss = (a: string, b: string) => a.length >= 4 && b.length >= 4 && editDistance(a, b) <= (b.length > 7 ? 2 : 1);

/** The answer without words repeated from around the gap ("main gate" → "gate" for "the main ___"). */
function withoutContext(answer: string, context: AnswerSpec['context']): string[] {
  if (!context) return [];
  const words = (s?: string) => normalizeAnswer((s ?? '').replace(/\([^)]*\)/g, ' ')).split(' ').filter(Boolean);
  const before = words(context.before);
  const after = words(context.after);
  const given = normalizeAnswer(answer).split(' ').filter(Boolean);
  const out: string[] = [];
  // Longest repeated run first: drop the end of the text before the gap from the answer's start,
  // and the start of the text after the gap from its end.
  for (let b = Math.min(before.length, given.length - 1); b >= 0; b--) {
    if (b && before.slice(before.length - b).join(' ') !== given.slice(0, b).join(' ')) continue;
    const rest = given.slice(b);
    for (let a = Math.min(after.length, rest.length - 1); a >= 0; a--) {
      if (!b && !a) continue;
      if (a && after.slice(0, a).join(' ') !== rest.slice(rest.length - a).join(' ')) continue;
      out.push(rest.slice(0, rest.length - a).join(' '));
    }
  }
  return out;
}

// ---------------------------------------------------------------- checking

/** Every accepted answer, main answer first, without duplicates. */
export function acceptedList(spec: AnswerSpec): string[] {
  return [...new Set([spec.correctAnswer, ...(spec.acceptedAnswers ?? [])].filter((a) => a != null && String(a).trim() !== ''))];
}

/**
 * Checks a typed answer against the question's own answers.
 * Backward compatible: a question with only correctAnswer accepts only that.
 */
export function validateAnswer({ question, userAnswer }: { question: AnswerSpec; userAnswer: string | null | undefined }): Validation {
  const accepted = acceptedList(question);
  const given = typeof userAnswer === 'string' ? userAnswer : '';
  const base = { primary: false, nearMiss: false, overLimit: false, needsSemantic: false, accepted };
  if (!given.trim()) {
    return { ...base, correct: false, empty: true, feedback: { kind: 'empty' } };
  }

  const forms = (a: string) => (question.optionalWords ? expandOptional(a) : [a]).map((f) => comparable(f, question));
  const targets = accepted.map((a) => ({ answer: a, forms: forms(a) }));
  const tries = [given, ...withoutContext(given, question.context)].map((g) => comparable(g, question));
  const tolerant = question.spelling === 'tolerant' && question.mode !== 'exact';

  let match = targets.find((t) => tries.some((g) => t.forms.includes(g)));
  if (!match && tolerant) match = targets.find((t) => tries.some((g) => t.forms.some((f) => g.length >= 5 && f.length >= 5 && editDistance(g, f) <= 1)));

  const overLimit = question.withinLimit ? !question.withinLimit(given) : false;
  if (match && !overLimit) {
    const primary = match.answer === accepted[0];
    return {
      ...base,
      correct: true,
      empty: false,
      matchedAnswer: match.answer,
      primary,
      feedback: primary ? { kind: 'correct', answer: given.trim() } : { kind: 'accepted', answer: given.trim(), mainAnswer: accepted[0] },
    };
  }

  const nearMiss = !match && question.mode !== 'exact' && targets.some((t) => t.forms.some((f) => tries.some((g) => isNearMiss(g, f))));
  return {
    ...base,
    correct: false,
    empty: false,
    ...(match ? { matchedAnswer: match.answer } : {}),
    nearMiss,
    overLimit,
    needsSemantic: !match && question.mode === 'semantic',
    feedback: { kind: 'wrong', answer: given.trim(), accepted, ...(nearMiss ? { nearMiss } : {}), ...(overLimit ? { overLimit } : {}) },
  };
}

/**
 * Multiple choice is graded by option id (a letter, or the option itself where
 * options have no ids) — exactly, so "a" and "A" stay different options.
 */
export function validateChoice(correctId: string | string[], selected: string | null | undefined): { correct: boolean; empty: boolean } {
  const ids = (Array.isArray(correctId) ? correctId : [correctId]).map((id) => id.trim());
  const pick = (selected ?? '').trim();
  return { correct: pick !== '' && ids.includes(pick), empty: pick === '' };
}

/** A content list where the first answer is the main one (the shape most Mino content uses). */
export function fromAcceptedList(list: string[], rest: Omit<AnswerSpec, 'correctAnswer' | 'acceptedAnswers'> = {}): AnswerSpec {
  return { correctAnswer: list[0] ?? '', acceptedAnswers: list.slice(1), ...rest };
}
