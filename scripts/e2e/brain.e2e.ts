// E2E: the vocabulary learning loop.
// Run with `bash scripts/e2e/run.sh brain`.
//
// English desktop, new student: Home tiles (My Brain, Reading Vocabulary) →
// empty My Brain and Reading Vocabulary → read a passage → tap a word → Save to
// Brain (once; a second tap cannot save it again) → Reading Vocabulary lists the
// passage's other words → save more there → My Brain stats, Today's Recall and
// the notebook → word detail keeps its source → Recall: choose the meaning,
// answer right and wrong, rate Good / Easy / Hard → the schedule in Firestore
// → My Brain says Today's Recall is done → the same student signs in again and
// sees everything. Bangla mobile, new student: the same loop in Bangla.
import type { Page } from 'playwright-core';
import { LEXICON, LIBRARY } from '../../lib/content/reading-library';
import { wordId } from '../../lib/engine';
import { BASE, check, getDoc, launch, noHorizontalScroll, report, shot, signIn, signUp, uidOf, watchErrors } from './helpers';

const FS = 'http://127.0.0.1:8080/v1/projects/demo-vocabbrain/databases/(default)/documents';
const errors: string[] = [];
const stamp = Date.now();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function vocabIds(uid: string): Promise<string[]> {
  const j = await (await fetch(`${FS}/users/${uid}/vocabulary?pageSize=100`, { headers: { Authorization: 'Bearer owner' } })).json();
  return (j.documents ?? []).map((d: { name: string }) => d.name.split('/').pop());
}
async function waitWord(uid: string, id: string, ok: (w: any) => boolean, ms = 15_000) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const end = Date.now() + ms;
  let w = null;
  while (Date.now() < end) {
    w = await getDoc(`users/${uid}/vocabulary/${id}`);
    if (w && ok(w)) return w;
    await sleep(400);
  }
  return w;
}
const daysFromNow = (iso: string) => (new Date(iso).getTime() - Date.now()) / 86_400_000;

/** Answers the recall card on screen correctly (or not), then rates it / moves on. Returns the word id and format. */
async function answerRecall(p: Page, uid: string, how: 'good' | 'easy' | 'hard' | 'dontknow', bn = false) {
  const card = p.locator('[data-recall-word]');
  // A new, unanswered card has its Check button; the previous card (already answered) does not.
  await p.getByTestId('recall-check').waitFor({ timeout: 20_000 });
  const id = (await card.getAttribute('data-recall-word'))!;
  const format = (await card.getAttribute('data-recall-format'))!;
  const w = await getDoc(`users/${uid}/vocabulary/${id}`);
  if (how === 'dontknow') {
    await p.getByRole('button', { name: /I don’t know|জানি না/ }).click();
    await p.getByTestId('recall-next').click();
    return { id, format };
  }
  if (format === 'choice') await card.getByRole('radio', { name: bn ? w.meaningBn || w.meaning : w.meaning || w.meaningBn, exact: true }).click();
  else if (format === 'meaning') await card.locator('#recall-answer').fill(bn ? w.meaningBn || w.meaning : w.meaning);
  else if (format === 'synonym') await card.locator('#recall-answer').fill(w.synonyms[0]);
  else if (format === 'sentence') await card.locator('#recall-answer').fill(`I think ${w.word} is a useful word for my essay.`);
  else await card.locator('#recall-answer').fill(w.word);
  await p.getByTestId('recall-check').click();
  if (!(await p.getByTestId('recall-ratings').waitFor({ timeout: 8000 }).then(() => true, () => false))) {
    await shot(p, `brain-recall-unexpected-${id}`, false);
    throw new Error(`recall ${id} (${format}) not accepted: ${(await card.innerText()).slice(0, 400)} | stored: ${JSON.stringify({ meaning: w.meaning, meaningBn: w.meaningBn, word: w.word })}`);
  }
  await p.getByTestId('recall-ratings').locator(`[data-rating="${how}"]`).click();
  return { id, format };
}

async function main() {
  const browser = await launch();
  try {
    // ============================================================ English, desktop
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    watchErrors(p, 'EN', errors);
    const email = `brain-en-${stamp}@test.dev`;
    await signUp(p, 'Rafi', email, 'en');
    const uid = (await uidOf(p))!;

    console.log('\n[1] Home: the new Quick Access');
    await p.getByTestId('quick-access').waitFor({ timeout: 60_000 });
    const quick = await p.locator('[data-quick]').evaluateAll((els) => els.map((e) => e.getAttribute('data-quick')));
    check('Quick Access: Today, IELTS Foundation, My Brain, Reading Vocabulary, Study Abroad', quick.join(',') === 'today,foundation,brain,readingVocab,abroad', quick.join(','));
    const brainTile = await p.locator('[data-quick="brain"]').innerText();
    const readingTile = await p.locator('[data-quick="readingVocab"]').innerText();
    check('My Brain tile: "Words you have learned"', /My Brain[\s\S]*Words you have learned/.test(brainTile), brainTile);
    check('Reading Vocabulary tile: "Words from your reading"', /Reading Vocabulary[\s\S]*Words from your reading/.test(readingTile), readingTile);
    check('new student: no counts on the tiles (nothing to count yet)', (await p.locator('[data-quick-count]').count()) === 0);
    check('Practice Test and Speaking Test are not on Home', (await p.locator('[data-quick="tests"], [data-quick="speaking"]').count()) === 0);
    await p.goto(`${BASE}/ielts`, { waitUntil: 'load' });
    await p.locator('main a[href="/ielts/tests"]').first().waitFor({ timeout: 30_000 });
    check('Practice Test and Speaking are still reachable from IELTS', (await p.locator('main a[href="/ielts/tests"]').count()) > 0 && (await p.locator('main a[href="/ielts/practice/speaking"]').count()) > 0);

    console.log('\n[2] Empty My Brain and Reading Vocabulary');
    await p.goto(`${BASE}/ielts/vocabulary/notebook`, { waitUntil: 'load' });
    await p.getByTestId('my-brain').waitFor({ timeout: 60_000 });
    const stat = async (id: string) => (await p.getByTestId(id).locator('dd').innerText()).trim();
    check('empty: 0 Words, 0 Review today', (await stat('stat-words')) === '0' && (await stat('stat-due')) === '0');
    check('empty: "My Brain is empty for now." with a way to Reading', (await p.getByText('My Brain is empty for now.').isVisible()) && (await p.getByRole('link', { name: /Explore Reading/ }).getAttribute('href')) === '/ielts/reading');
    await p.goto(`${BASE}/ielts/vocabulary/reading`, { waitUntil: 'load' });
    await p.getByTestId('reading-vocab').waitFor({ timeout: 60_000 });
    check('Reading Vocabulary empty: explains and links to Reading', (await p.getByText('No reading words yet.').isVisible()) && (await p.getByRole('link', { name: /Open Reading/ }).count()) === 1);
    await shot(p, 'brain-en-01-empty-reading-vocab', false);

    console.log('\n[3] Reading → tap a word → Save to Brain');
    const p1 = LIBRARY[0];
    const v1 = p1.vocab.find((v) => LEXICON[v.lemma])!;
    await p.goto(`${BASE}/ielts/reading/${p1.id}`, { waitUntil: 'load' });
    await p.getByTestId('library-passage').waitFor({ timeout: 60_000 });
    await p.locator(`[data-testid="vocab-word"][data-lemma="${v1.lemma}"]`).first().click();
    await p.getByTestId('vocab-card').waitFor();
    await p.getByTestId('vocab-card').getByRole('button', { name: 'Save to Brain' }).click();
    await p.getByTestId('vocab-card').getByRole('link', { name: /Saved/ }).waitFor({ timeout: 20_000 });
    const id1 = wordId(v1.lemma);
    const saved1 = await waitWord(uid, id1, (w) => Boolean(w.createdAt));
    check('saved: the word is in My Brain (Firestore) with its passage and sentence', saved1?.source?.passageId === p1.id && saved1?.source?.type === 'reading-passage' && Boolean(saved1?.originalSentence), JSON.stringify(saved1?.source));
    check('saved: status New, due now (first recall today), never mastered on save', saved1?.status === 'new' && daysFromNow(saved1.nextReviewAt) <= 0);
    await p.keyboard.press('Escape');
    await p.locator(`[data-testid="vocab-word"][data-lemma="${v1.lemma}"]`).first().click();
    await p.getByTestId('vocab-card').waitFor();
    check('tapping the same word again: already saved, no second Save button', (await p.getByTestId('vocab-card').getByRole('button', { name: 'Save to Brain' }).count()) === 0);
    await sleep(800);
    check('no duplicate: one Brain entry for the word', (await vocabIds(uid)).filter((x) => x === id1).length === 1 && (await vocabIds(uid)).length === 1, (await vocabIds(uid)).join(','));

    console.log('\n[4] Reading Vocabulary: new words from the passage, save more');
    await p.goto(`${BASE}/ielts/vocabulary/reading`, { waitUntil: 'load' });
    await p.getByTestId('reading-fresh').waitFor({ timeout: 60_000 });
    const freshIds = await p.locator('[data-fresh-word]').evaluateAll((els) => els.map((e) => e.getAttribute('data-fresh-word')!));
    const expected = new Set(p1.vocab.filter((v) => LEXICON[v.lemma]).map((v) => wordId(v.lemma)));
    expected.delete(id1);
    check('New words: every other key word of the passage, the saved one excluded', freshIds.length === expected.size && freshIds.every((x) => expected.has(x)) && !freshIds.includes(id1), `${freshIds.length}/${expected.size}`);
    check('Already in My Brain: the saved word, marked "In My Brain"', (await p.locator(`[data-saved-word="${id1}"]`).innerText()).includes('In My Brain'));
    const toSave = freshIds.slice(0, 3);
    for (const id of toSave) {
      await p.locator(`[data-save="${id}"]`).click();
      await p.locator(`[data-saved-word="${id}"]`).waitFor({ timeout: 20_000 });
    }
    check('saving from Reading Vocabulary moves the word to "Already in My Brain"', (await p.locator('[data-saved-word]').count()) === 4 && (await p.locator(toSave.map((id) => `[data-fresh-word="${id}"]`).join(',')).count()) === 0);
    let all = await vocabIds(uid);
    for (let i = 0; i < 20 && all.length < 4; i++) {
      await sleep(500);
      all = await vocabIds(uid);
    }
    check('Firestore: 4 words, one per id (Reading, My Brain and Recall share the id)', all.length === 4 && [id1, ...toSave].every((id) => all.includes(id)), all.join(','));
    const fromList = await getDoc(`users/${uid}/vocabulary/${toSave[0]}`);
    check('a word saved from the list keeps its passage and sentence', fromList?.source?.passageId === p1.id && Boolean(fromList?.originalSentence));
    check('Reading Vocabulary desktop: no sideways scroll', await noHorizontalScroll(p));
    await shot(p, 'brain-en-02-reading-vocab', false);

    console.log('\n[5] Home counts, My Brain stats, Today’s Recall, notebook');
    await p.goto(`${BASE}/`, { waitUntil: 'load' });
    await p.locator('[data-quick-count="brain"]').waitFor({ timeout: 30_000 });
    check('Home: My Brain tile says "4 to review"', (await p.locator('[data-quick-count="brain"]').innerText()).trim() === '4 to review');
    check('Home: Reading Vocabulary tile shows the real number of new words', (await p.locator('[data-quick-count="readingVocab"]').innerText()).trim() === `${expected.size - 3} new words`);
    await p.goto(`${BASE}/ielts/vocabulary/notebook`, { waitUntil: 'load' });
    await p.getByTestId('today-recall').waitFor({ timeout: 60_000 });
    check('stats: 4 Words · 4 Review today · 0 Learning · 0 Mastered', [await stat('stat-words'), await stat('stat-due'), await stat('stat-learning'), await stat('stat-mastered')].join(',') === '4,4,0,0');
    const recallY = (await p.getByTestId('today-recall').boundingBox())!.y;
    const notebookY = (await p.getByTestId('notebook').boundingBox())!.y;
    check('Today’s Recall comes before My Vocabulary', recallY < notebookY);
    check('Today’s Recall: "4 words ready" + Start Recall', (await p.getByTestId('recall-ready').innerText()).startsWith('4 words ready') && (await p.getByTestId('start-recall').getAttribute('href')) === '/review');
    const row = await p.locator(`[data-word="${id1}"]`).innerText();
    check('notebook row: word, part of speech, meaning, source passage', row.includes(v1.lemma) && row.includes(LEXICON[v1.lemma].pos) && row.includes(p1.title), row);
    check('notebook: 4 filters with counts', (await p.locator('[data-filter]').evaluateAll((els) => els.map((e) => e.textContent))).join('|') === 'All 4|Learning 4|Review 4|Mastered 0');
    await p.locator('[data-filter="mastered"]').click();
    check('Mastered filter: honest empty text', /No mastered words yet/.test(await p.getByTestId('filter-empty').innerText()));
    await p.locator('[data-filter="all"]').click();
    await shot(p, 'brain-en-03-my-brain', false);

    console.log('\n[6] Word detail keeps the source');
    await p.locator(`[data-word="${id1}"]`).click();
    await p.getByTestId('word-source').waitFor({ timeout: 30_000 });
    check('detail: "Found in" links back to the passage', (await p.getByTestId('word-source').getByRole('link').getAttribute('href')) === `/ielts/reading/${p1.id}`);
    check('detail: saved date shown', /Saved \d/.test(await p.getByTestId('word-saved').innerText()));

    console.log('\n[7] Today’s Recall');
    await p.goto(`${BASE}/review`, { waitUntil: 'load' });
    await p.getByTestId('recall-intro').waitFor({ timeout: 60_000 });
    check('recall intro: "Today’s Recall" + "4 words are ready."', /Today’s Recall/.test(await p.getByTestId('recall-intro').innerText()) && /4 words are ready\./.test(await p.getByTestId('recall-intro').innerText()));
    await p.getByTestId('recall-begin').click();
    const first = await answerRecall(p, uid, 'good');
    check('new word with 3 other saved words: "Choose the meaning" (recognition first)', first.format === 'choice', first.format);
    const w1 = await waitWord(uid, first.id, (w) => w.recallCount === 1);
    check('right + Good: step 1, next review tomorrow, rating stored', w1.stage === 1 && daysFromNow(w1.nextReviewAt) > 0 && daysFromNow(w1.nextReviewAt) <= 1.01 && w1.recallHistory.at(-1).rating === 'good', `${w1.stage} ${w1.nextReviewAt}`);
    const second = await answerRecall(p, uid, 'dontknow');
    const w2 = await waitWord(uid, second.id, (w) => w.recallCount === 1);
    check('"I don’t know": not recalled → step 0, due again tomorrow', w2.stage === 0 && w2.consecutiveFailures === 1 && daysFromNow(w2.nextReviewAt) > 0 && daysFromNow(w2.nextReviewAt) <= 1.01);
    const third = await answerRecall(p, uid, 'easy');
    const fourth = await answerRecall(p, uid, 'hard');
    const w3 = await waitWord(uid, third.id, (w) => w.recallCount === 1);
    const w4 = await waitWord(uid, fourth.id, (w) => w.recallCount === 1);
    check('right + Easy is scheduled later than right + Hard', new Date(w3.nextReviewAt).getTime() > new Date(w4.nextReviewAt).getTime() && w4.stage === 1, `${w3.nextReviewAt} vs ${w4.nextReviewAt}`);
    // The missed word comes back once in the same session.
    const retry = await answerRecall(p, uid, 'good');
    check('the missed word comes back once at the end of the session', retry.id === second.id, `${retry.id} vs ${second.id}`);
    await p.getByTestId('recall-done-screen').waitFor({ timeout: 20_000 });
    check('done: "Today’s Recall is done." with the score and the next review', /Today’s Recall is done\./.test(await p.getByTestId('recall-done-screen').innerText()) && /3 of 4/.test(await p.getByTestId('recall-done-screen').innerText()) && /Next review: tomorrow/.test(await p.getByTestId('recall-done-screen').innerText()));
    const all4 = await Promise.all([id1, ...toSave].map((id) => getDoc(`users/${uid}/vocabulary/${id}`)));
    check('no word is Mastered after one session', all4.every((w) => w.status !== 'mastered'));

    await p.goto(`${BASE}/ielts/vocabulary/notebook`, { waitUntil: 'load' });
    await p.getByTestId('recall-done').waitFor({ timeout: 60_000 });
    check('My Brain after Recall: "Today’s Recall is done." + next review tomorrow; 0 due, 4 learning', /Today’s Recall is done\.[\s\S]*Next review: tomorrow/.test(await p.getByTestId('recall-done').innerText()) && (await stat('stat-due')) === '0' && (await stat('stat-learning')) === '4');
    check('My Brain desktop: no sideways scroll', await noHorizontalScroll(p));
    await ctx.close();

    console.log('\n[8] Existing student signs in again');
    const again = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const a = await again.newPage();
    watchErrors(a, 'EN-again', errors);
    await signIn(a, email);
    await a.locator('[data-quick-count="brain"]').waitFor({ timeout: 60_000 });
    check('existing student: Home shows "4 words" (nothing due now)', (await a.locator('[data-quick-count="brain"]').innerText()).trim() === '4 words');
    await a.goto(`${BASE}/ielts/vocabulary/notebook`, { waitUntil: 'load' });
    await a.getByTestId('notebook').waitFor({ timeout: 60_000 });
    check('existing student: all 4 words kept in My Brain', (await a.locator('[data-word]').count()) === 4);
    await again.close();

    // ============================================================ Bangla, mobile
    const m = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const q = await m.newPage();
    watchErrors(q, 'BN', errors);
    await signUp(q, 'Rafi', `brain-bn-${stamp}@test.dev`, 'bn');
    const uidBn = (await uidOf(q))!;
    console.log('\n[9] Bangla mobile');
    await q.getByTestId('quick-access').waitFor({ timeout: 60_000 });
    check('bn Home: "আপনার শেখা শব্দ" and "Reading থেকে শেখা শব্দ"', /আপনার শেখা শব্দ/.test(await q.locator('[data-quick="brain"]').innerText()) && /Reading থেকে শেখা শব্দ/.test(await q.locator('[data-quick="readingVocab"]').innerText()));
    check('bn Home mobile: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'brain-bn-01-home', false);
    await q.goto(`${BASE}/ielts/vocabulary/notebook`, { waitUntil: 'load' });
    await q.getByTestId('my-brain').waitFor({ timeout: 60_000 });
    check('bn empty: "My Brain এখনও খালি।" + subtitle', (await q.getByText('My Brain এখনও খালি।').isVisible()) && (await q.getByText('আপনার শেখা শব্দগুলো এখানে জমা থাকবে।').isVisible()));
    const p2 = LIBRARY[1];
    await q.goto(`${BASE}/ielts/reading/${p2.id}`, { waitUntil: 'load' });
    await q.getByTestId('library-passage').waitFor({ timeout: 60_000 });
    await sleep(1500);
    await q.goto(`${BASE}/ielts/vocabulary/reading`, { waitUntil: 'load' });
    await q.getByTestId('reading-fresh').waitFor({ timeout: 60_000 });
    check('bn Reading Vocabulary: "নতুন শব্দ" from the opened passage', /নতুন শব্দ/.test(await q.getByTestId('reading-fresh').innerText()) && (await q.locator('[data-fresh-word]').count()) > 0);
    const bnId = (await q.locator('[data-fresh-word]').first().getAttribute('data-fresh-word'))!;
    await q.locator(`[data-save="${bnId}"]`).click();
    await q.locator(`[data-saved-word="${bnId}"]`).waitFor({ timeout: 20_000 });
    check('bn: saved word shows "My Brain-এ আছে"', /My Brain-এ আছে/.test(await q.locator(`[data-saved-word="${bnId}"]`).innerText()));
    check('bn Reading Vocabulary mobile: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'brain-bn-02-reading-vocab', false);
    await q.goto(`${BASE}/ielts/vocabulary/notebook`, { waitUntil: 'load' });
    await q.getByTestId('today-recall').waitFor({ timeout: 60_000 });
    check('bn My Brain: "আজকের Recall" + "১টা শব্দ তৈরি"', /আজকের Recall/.test(await q.getByTestId('today-recall').innerText()) && /১টা শব্দ তৈরি/.test(await q.getByTestId('recall-ready').innerText()));
    const bnRow = await q.locator(`[data-word="${bnId}"]`).innerText();
    const bnWord = await getDoc(`users/${uidBn}/vocabulary/${bnId}`);
    check('bn notebook row: Bangla meaning first', bnRow.includes(bnWord.meaningBn), bnRow);
    check('bn My Brain mobile: no sideways scroll; Start Recall is a big button', (await noHorizontalScroll(q)) && ((await q.getByTestId('start-recall').boundingBox())!.height >= 40));
    await shot(q, 'brain-bn-03-my-brain', false);
    await q.getByTestId('start-recall').click();
    await q.getByTestId('recall-intro').waitFor({ timeout: 60_000 });
    check('bn recall intro: "আজকের Recall"', /আজকের Recall/.test(await q.getByTestId('recall-intro').innerText()));
    await q.getByTestId('recall-begin').click();
    await q.locator('[data-recall-word]').waitFor();
    check('bn recall mobile: no sideways scroll', await noHorizontalScroll(q));
    await shot(q, 'brain-bn-04-recall-question', false);
    await answerRecall(q, uidBn, 'good', true);
    await q.getByTestId('recall-done-screen').waitFor({ timeout: 20_000 });
    check('bn done: "আজকের Recall শেষ।"', /আজকের Recall শেষ।/.test(await q.getByTestId('recall-done-screen').innerText()));
    check('bn: respectful আপনি throughout', !/তুমি|তোমার/.test(await q.locator('body').innerText()));
    await m.close();

    check('no console or page errors', errors.length === 0, errors.join('\n'));
  } finally {
    await browser.close();
  }
}

main()
  .then(() => process.exit(report()))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
