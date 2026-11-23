// E2E: the Mino Answer Evaluation Engine, end to end.
//   bash scripts/e2e/run.sh mino-evaluation
//
// Proves that a learner who submits an answer is TOLD by Mino whether it is right, partly right or wrong, why,
// and what to do next — and never has to compare it with an answer key:
//   [A] Task 2 Lesson 01 opened through the Academy: a wrong multiple-choice pick gets that option's own
//       misconception, instantly; a guided-practice sentence pair is evaluated (failure -> Retry keeps the answer);
//       the final introduction is an introduction-only skill check: evaluated, revisable, no band, no contamination.
//   [B] The Idea Development Board: a rung that reuses words but adds a mechanism is accepted; a rung that only
//       restates the previous one is flagged by Mino (not by word overlap).
//   [C] Vocabulary recall (Today's Recall): an exact meaning is graded instantly; a meaning in the learner's own
//       words is evaluated by Mino (right and wrong), failure offers Retry or an explicit self-check.
//   [D] Bangla: feedback and labels appear in Bangla.
// The AI here is the mock Gemini server: it proves the flow and that the server sends the right rubric, NOT that a live
// model grades well.
import type { Page } from 'playwright-core';
import { LIBRARY } from '../../lib/content/reading-library';
import { wordId } from '../../lib/engine';
import { ideaDevelopmentLesson } from '../../lib/writing-studio/lessons/idea-development';
import { task2UnderstandingLesson as lesson } from '../../lib/writing-studio/lessons/task2-understanding';
import { BASE, check, getDoc, launch, report, shot, signUp, uidOf, watchErrors } from './helpers';

const errors: string[] = [];
const stamp = Date.now();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const next = (p: Page) => p.getByRole('button', { name: /^(Continue|Start writing)$/ });

/** Walks the lesson steps until `stopAt`, answering each check correctly. */
async function walkTo(p: Page, steps: { id: string; check?: { options: string[]; correctIndex: number; explain: string } }[], stopAt: string) {
  for (const step of steps) {
    if (step.id === stopAt) return;
    if (step.check) await p.getByRole('button', { name: step.check.options[step.check.correctIndex], exact: true }).click();
    await next(p).click();
    await sleep(120);
  }
}

async function ws(uid: string) {
  return (await getDoc(`users/${uid}`))?.app?.writingStudio;
}

async function main() {
  const browser = await launch();
  try {
    // ================================================================ [A] Task 2 Lesson 01
    const p = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
    watchErrors(p, 'A', errors);
    await signUp(p, 'Nadia', `mino-eval-${stamp}@test.dev`, 'en');
    const uid = (await uidOf(p))!;

    console.log('\n[A1] Open Lesson 01 through the Task 2 Academy');
    await p.goto(`${BASE}/ielts/writing-studio/task2`, { waitUntil: 'load' });
    await p.getByText('Learning modules').first().waitFor({ timeout: 60_000 });
    await p.locator(`main a[href="/ielts/writing-studio/task2/lesson/task2-understanding"]:has(span.rounded-full)`).click();
    await p.waitForURL('**/task2/lesson/task2-understanding', { timeout: 30_000 });
    await p.getByText('Understanding IELTS Writing Task 2').first().waitFor({ timeout: 60_000 });
    check('Lesson 01 opens through its Academy card', true);
    check(`progress shows ${lesson.steps.length} steps`, (await p.getByRole('progressbar', { name: `Step 1 of ${lesson.steps.length}` }).count()) === 1);
    await next(p).click(); // welcome -> what-is-task2

    console.log('\n[A2] A wrong multiple-choice pick: instant verdict, THAT option\'s misconception, the right answer, no AI wait');
    const mcq = lesson.steps.find((s) => s.id === 'what-is-task2')!.check!;
    const t0 = Date.now();
    await p.getByRole('button', { name: mcq.options[0], exact: true }).click();
    await p.getByTestId('mino-verdict').waitFor({ timeout: 3000 });
    const instantMs = Date.now() - t0;
    const v = p.getByTestId('mino-verdict');
    check('verdict appears instantly (objective check, no AI request)', instantMs < 2500, `${instantMs}ms`);
    check('Mino says it is not right', (await v.getAttribute('data-verdict')) === 'incorrect' && (await v.getAttribute('data-source')) === 'objective' && /Not quite/.test(await p.getByTestId('mino-verdict-label').innerText()));
    const mcqText = await p.getByTestId('mino-evaluation').innerText();
    check('it shows the misconception for the option the learner picked', mcqText.includes(mcq.optionFeedback![0]!), mcqText);
    check('it names the correct answer and explains why — nothing to compare manually', mcqText.includes(mcq.options[1]) && mcqText.includes(mcq.explain.slice(0, 40)));
    check('it says what to do next', (await p.getByTestId('mino-next-action').count()) === 1);
    await shot(p, 'mino-eval-A-mcq-wrong');
    await next(p).click();

    console.log('\n[A3] A correct pick');
    const c2 = lesson.steps.find((s) => s.id === 'four-criteria')!.check!;
    await p.getByRole('button', { name: c2.options[c2.correctIndex], exact: true }).click();
    await p.getByTestId('mino-verdict').waitFor();
    check('correct pick: "Correct" with the explanation', (await p.getByTestId('mino-verdict').getAttribute('data-verdict')) === 'correct' && /^Correct$/.test(await p.getByTestId('mino-verdict-label').innerText()) && (await p.getByTestId('mino-evaluation').innerText()).includes(c2.explain.slice(0, 40)));
    await next(p).click();

    console.log('\n[A4] Walk the rest of the lesson up to the guided practice');
    const idx = lesson.steps.findIndex((s) => s.id === 'essay-structure');
    await walkTo(p, lesson.steps.slice(idx), 'guided-practice');
    await p.getByTestId('write-evaluate').waitFor({ timeout: 15_000 });
    check('guided practice is a write-it-and-Mino-checks-it step (Continue locked until Mino evaluates)', await next(p).isDisabled());

    console.log('\n[A5] Provider failure: no guessed verdict; the answer is kept; Retry works');
    const weak = 'FORCE_FAIL_ONCE Nowadays, transport is very important. This essay will discuss this topic.';
    await p.locator('#ws-evaluate-answer').fill(weak);
    await p.getByTestId('write-evaluate-submit').click();
    await p.getByTestId('mino-eval-error').waitFor({ timeout: 30_000 });
    check('failure: Mino says it could not finish — and there is no verdict', /could not finish checking this answer/.test(await p.getByTestId('mino-eval-error').innerText()) && (await p.getByTestId('mino-verdict').count()) === 0);
    check('failure: the learner\'s answer is still in the box', (await p.locator('#ws-evaluate-answer').inputValue()) === weak);
    check('failure: Continue stays locked (nothing was evaluated)', await next(p).isDisabled());
    await p.getByTestId('mino-eval-retry').click();
    await p.getByTestId('mino-verdict').waitFor({ timeout: 30_000 });
    check('retry: Mino now evaluates the same answer: incorrect, with the exact quote and why', (await p.getByTestId('mino-verdict').getAttribute('data-verdict')) === 'incorrect' && /Incorrect or irrelevant/.test(await p.getByTestId('mino-verdict-label').innerText()) && /This essay will discuss this topic/.test(await p.getByTestId('mino-issue').first().innerText()));
    check('retry: Continue is now unlocked (Mino has evaluated)', await next(p).isEnabled());
    await shot(p, 'mino-eval-A-guided-incorrect');

    console.log('\n[A6] Revise and check again');
    const good = 'Whether governments should spend more on public transport than on new roads is debated. I strongly agree that public transport should come first.';
    await p.locator('#ws-evaluate-answer').fill(good);
    await p.getByTestId('write-evaluate-submit').click();
    await p.locator('[data-testid="mino-verdict"][data-verdict="correct"]').waitFor({ timeout: 30_000 });
    check('revised answer: "Correct and effective", with strengths', /Correct and effective/.test(await p.getByTestId('mino-verdict-label').innerText()) && /paraphrased the question accurately/.test(await p.getByTestId('mino-evaluation').innerText()));
    await next(p).click(); // guided -> review
    await next(p).click(); // review -> write

    console.log('\n[A7] Final introduction: thinking state, then Mino\'s evaluation (a skill check, never a band)');
    const editor = p.locator('#ws-editor');
    await editor.waitFor({ timeout: 15_000 });
    const writeText = await p.locator('main').innerText();
    check('final task is the introduction-only exercise: 35-55 words, no 250-word minimum', /Write a two-sentence introduction/.test(writeText) && /35–55 words/.test(writeText) && !/Minimum 250/.test(writeText) && /Suggested length: around 35 words/.test(writeText));
    const first = 'Nowadays transport matters a lot. This essay will discuss this topic. SLOW_ANSWER';
    await editor.fill(first);
    await p.getByRole('button', { name: 'Get feedback from Mino' }).click();
    await p.getByTestId('mino-evaluating').waitFor({ timeout: 10_000 });
    check('waiting: Mino\'s thinking state with honest status text', /Mino is checking your meaning and accuracy/.test(await p.getByTestId('mino-evaluating').innerText()));
    check('waiting: no fake percentage progress', !/\d+\s?%/.test(await p.getByTestId('mino-evaluating').innerText()));
    await p.getByText(/Still checking/).waitFor({ timeout: 12_000 });
    check('waiting: after a real delay it says it is still checking', true);
    await p.getByTestId('mino-evaluation').waitFor({ timeout: 30_000 });
    const fb1 = await p.locator('main').innerText();
    check('final: Mino\'s verdict names the problem and the next action', (await p.getByTestId('mino-verdict').getAttribute('data-verdict')) === 'incorrect' && /Rewrite it: first paraphrase the question/.test(fb1));
    check('final: a skill check, not a band (no IELTS band number anywhere)', /Skill check: Task 2 introduction structure and position clarity/.test(fb1) && /no IELTS band/.test(fb1) && !/\b[4-9]\.[05]\b/.test(fb1));
    await shot(p, 'mino-eval-A-final-incorrect');
    let state = await ws(uid);
    for (let i = 0; i < 20 && !(state?.mistakes?.length); i++) { await sleep(400); state = await ws(uid); }
    check('progress: an incorrect attempt saves Mino\'s mistakes for personalisation but does NOT complete the lesson', (state?.mistakes?.length ?? 0) >= 1 && state.mistakes[0].source === 'ai' && !state.lessons?.['task2-understanding'], JSON.stringify(state?.lessons));
    check('gating: no Continue offered after an incorrect verdict', (await p.getByTestId('eval-continue').count()) === 0);
    const mistakesAfterFirst = state.mistakes.length;

    console.log('\n[A8] Revise: the answer is preserved, and a good introduction is evaluated as correct');
    await p.getByTestId('eval-revise').click();
    await editor.waitFor();
    check('revise: the learner\'s answer is still in the editor', (await editor.inputValue()) === first);
    const finalGood = 'Whether governments should invest more in public transport rather than expand road networks is widely debated. I strongly agree that public transport deserves greater investment because it reduces congestion.';
    await editor.fill(finalGood);
    await p.getByRole('button', { name: 'Get feedback from Mino' }).click();
    await p.locator('[data-testid="mino-verdict"][data-verdict="correct"]').waitFor({ timeout: 30_000 });
    check('final: "Correct and effective" with Mino\'s strengths', /Correct and effective/.test(await p.getByTestId('mino-verdict-label').innerText()) && /position is clear/.test(await p.getByTestId('mino-evaluation').innerText()));
    await p.getByTestId('eval-continue').click();
    await p.getByText('Lesson complete').waitFor({ timeout: 15_000 });
    check('lesson reaches "Lesson complete"', true);
    for (let i = 0; i < 20; i++) { state = await ws(uid); if (state?.lessons?.['task2-understanding']?.attempts === 1) break; await sleep(400); }
    const rec = state?.lessons?.['task2-understanding'];
    check('progress: completed once on the pass, still NO band, no exam or Task 1 records created', rec?.attempts === 1 && rec.lastBand == null && rec.bestBand == null && !(state.exams?.length) && !state.lessons['task1-complete-writing'], JSON.stringify(state?.lessons));

    // ================================================================ [B] Idea Development Board
    console.log('\n[B] Idea Development Board: Mino evaluates each rung');
    await p.goto(`${BASE}/ielts/writing-studio/task2/lesson/idea-development`, { waitUntil: 'load' });
    await p.getByText(ideaDevelopmentLesson.title).first().waitFor({ timeout: 60_000 });
    await walkTo(p, ideaDevelopmentLesson.steps, ideaDevelopmentLesson.steps.find((s) => s.material?.type === 'idea-board')!.id);
    await p.getByTestId('idea-board').waitFor({ timeout: 15_000 });
    const rung = p.locator('#idea-rung-answer');
    await rung.fill('I largely agree that saving money is essential for young people.');
    await p.getByTestId('idea-check').click();
    await p.locator('[data-testid="mino-verdict"][data-verdict="correct"]').waitFor({ timeout: 30_000 });
    check('rung 1: Mino evaluates the main argument as doing its job', await p.getByTestId('idea-next').isVisible());
    await p.getByTestId('idea-next').click();
    // Rung 2 reuses many of rung 1's words but adds a mechanism: the old word-overlap check would have rejected it.
    const r2 = 'Saving money is essential for young people because unexpected costs can force young people into debt when they have no savings.';
    await rung.fill(r2);
    await p.getByTestId('idea-check').click();
    await p.locator('[data-testid="mino-verdict"][data-verdict="correct"]').waitFor({ timeout: 30_000 });
    check('rung 2: shares vocabulary with rung 1 but ADDS a mechanism -> accepted (no word-overlap rejection)', (await p.getByTestId('idea-next').isVisible()) && /adds new information/.test(await p.getByTestId('mino-evaluation').innerText()));
    await p.getByTestId('idea-next').click();
    // Rung 3 only restates rung 2: Mino flags it, and says which step it repeats.
    await rung.fill('Unexpected costs can force young people into debt when they have no savings.');
    await p.getByTestId('idea-check').click();
    await p.locator('[data-testid="mino-verdict"][data-verdict="needs_revision"]').waitFor({ timeout: 30_000 });
    const rep = await p.getByTestId('mino-evaluation').innerText();
    check('rung 3: a pure restatement is flagged by Mino and names the step it repeats', /restates step 2|repeats step 2/.test(rep) && /Go one level deeper/.test(rep));
    check('rung 3: the learner cannot advance without revising (but can explicitly move on)', (await p.getByTestId('idea-next').count()) === 0 && (await p.getByTestId('idea-move-on').isVisible()));
    await rung.fill('Without savings a sudden bill is usually paid with a credit card, which charges interest every month.');
    await p.getByTestId('idea-check').click();
    await p.locator('[data-testid="mino-verdict"][data-verdict="correct"]').waitFor({ timeout: 30_000 });
    check('rung 3 revised: now evaluated as correct, Next is offered', await p.getByTestId('idea-next').isVisible());
    await shot(p, 'mino-eval-B-idea-board');

    // ================================================================ [C] Vocabulary recall
    console.log('\n[C] Today\'s Recall: Mino evaluates meaning answers');
    const p1 = LIBRARY[0];
    const v1 = p1.vocab[0];
    await p.goto(`${BASE}/ielts/reading/${p1.id}`, { waitUntil: 'load' });
    await p.getByTestId('library-passage').waitFor({ timeout: 60_000 });
    await p.locator(`[data-testid="vocab-word"][data-lemma="${v1.lemma}"]`).first().click();
    await p.getByTestId('vocab-card').waitFor();
    await p.getByTestId('vocab-card').getByRole('button', { name: 'Save to Brain' }).click();
    await p.getByTestId('vocab-card').getByRole('link', { name: /Saved/ }).waitFor({ timeout: 20_000 });
    const wid = wordId(v1.lemma);
    let word: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
    for (let i = 0; i < 25 && !word; i++) { word = await getDoc(`users/${uid}/vocabulary/${wid}`); if (!word) await sleep(400); }
    check('a word is saved to My Brain', Boolean(word), wid);
    const meaning: string = word.meaning;

    const openRecall = async () => {
      await p.goto(`${BASE}/review?word=${wid}&focus=meaning`, { waitUntil: 'load' });
      await p.getByTestId('recall-check').waitFor({ timeout: 30_000 });
    };
    await openRecall();
    await p.locator('#recall-answer').fill(meaning);
    await p.getByTestId('recall-check').click();
    await p.getByTestId('recall-ratings').waitFor({ timeout: 8000 });
    check('an EXACT meaning is graded instantly: no Mino evaluation, straight to the rating', (await p.getByTestId('recall-mino-evaluation').count()) === 0);

    await openRecall();
    await p.locator('#recall-answer').fill('something that is the opposite of this');
    await p.getByTestId('recall-check').click();
    await p.getByTestId('recall-mino-evaluation').waitFor({ timeout: 30_000 });
    const wrongText = await p.getByTestId('recall-mino-evaluation').innerText();
    check('a wrong meaning: Mino says it is incorrect and why (no model answer to compare)', /Incorrect or irrelevant/.test(wrongText) && /does not match the word/.test(wrongText));
    check('a wrong meaning: the learner moves on with Next, and the word is recorded as not recalled', await p.getByTestId('recall-next').isVisible());
    let after: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
    for (let i = 0; i < 20; i++) { after = await getDoc(`users/${uid}/vocabulary/${wid}`); if ((after?.consecutiveFailures ?? 0) >= 1) break; await sleep(400); }
    check('schedule: a failed recall was recorded', (after?.consecutiveFailures ?? 0) >= 1, JSON.stringify({ f: after?.consecutiveFailures }));

    await openRecall();
    await p.locator('#recall-answer').fill('FORCE_FAIL_ONCE a way of saying it in my own words');
    await p.getByTestId('recall-check').click();
    await p.getByTestId('mino-eval-error').waitFor({ timeout: 30_000 });
    check('failure: no verdict; the answer is kept; Retry and an explicit self-check are offered', (await p.locator('#recall-answer').inputValue()).startsWith('FORCE_FAIL_ONCE') && (await p.getByTestId('mino-eval-retry').isVisible()) && /not evaluated by Mino/.test(await p.getByTestId('recall-self-check').innerText()));
    await p.getByTestId('mino-eval-retry').click();
    await p.getByTestId('recall-mino-evaluation').waitFor({ timeout: 30_000 });
    check('retry: a meaning in the learner\'s own words is evaluated as correct, then they rate how easy it was', /Correct and effective/.test(await p.getByTestId('recall-mino-evaluation').innerText()) && (await p.getByTestId('recall-ratings').isVisible()));
    await p.getByTestId('recall-ratings').locator('[data-rating="good"]').click();
    let ok: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
    for (let i = 0; i < 20; i++) { ok = await getDoc(`users/${uid}/vocabulary/${wid}`); if ((ok?.successfulRecallCount ?? 0) >= 1) break; await sleep(400); }
    check('schedule: the successful recall was recorded', (ok?.successfulRecallCount ?? 0) >= 1);
    await shot(p, 'mino-eval-C-recall');

    // ================================================================ [D] Bangla
    console.log('\n[D] Bangla learner');
    const bn = await (await browser.newContext({ viewport: { width: 420, height: 900 } })).newPage();
    watchErrors(bn, 'D', errors);
    await signUp(bn, 'Rafi', `mino-eval-bn-${stamp}@test.dev`, 'bn');
    await bn.goto(`${BASE}/ielts/writing-studio/task2/lesson/task2-understanding`, { waitUntil: 'load' });
    await bn.getByText('Understanding IELTS Writing Task 2').first().waitFor({ timeout: 60_000 });
    await next(bn).click();
    await bn.getByRole('button', { name: mcq.options[2], exact: true }).click();
    await bn.getByTestId('mino-verdict').waitFor();
    const bnText = await bn.getByTestId('mino-evaluation').innerText();
    check('Bangla: the instant verdict and next step are in Bangla', /ভুল/.test(await bn.getByTestId('mino-verdict-label').innerText()) && /সঠিক উত্তর/.test(bnText) && /ধাপ/.test(bnText), bnText);
    check('Bangla: the lesson\'s own explanation and the option\'s misconception are still shown', bnText.includes(mcq.explain.slice(0, 30)) && bnText.includes(mcq.optionFeedback![2]!.slice(0, 30)));
    await next(bn).click();
    const idx2 = lesson.steps.findIndex((s) => s.id === 'four-criteria');
    await walkTo(bn, lesson.steps.slice(idx2), 'guided-practice');
    await bn.getByTestId('write-evaluate').waitFor({ timeout: 15_000 });
    await bn.locator('#ws-evaluate-answer').fill('Nowadays, transport is very important. This essay will discuss this topic.');
    await bn.getByTestId('write-evaluate-submit').click();
    await bn.getByTestId('mino-verdict').waitFor({ timeout: 30_000 });
    const bnEval = await bn.getByTestId('mino-evaluation').innerText();
    check('Bangla: Mino\'s semantic evaluation is written in Bangla, the quote stays in English', /ভুল বা অপ্রাসঙ্গিক/.test(bnEval) && /এটি প্রশ্নের উত্তর দেয়নি/.test(bnEval) && /This essay will discuss this topic/.test(bnEval), bnEval);
    await shot(bn, 'mino-eval-D-bangla', false);
  } catch (e) {
    check('EXCEPTION ' + (e as Error).message.split('\n')[0], false, (e as Error).stack);
  } finally {
    check('no page errors', errors.length === 0, errors.join(' | '));
    await browser.close();
  }
  process.exit(report());
}
void main();
