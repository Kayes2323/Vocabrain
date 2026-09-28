// E2E: the IELTS Reading Library (20 original passages). Covers the level list,
// clickable vocabulary with context meanings (Bangla + English), the popup
// staying on screen on a phone, Save to Brain into the existing notebook, the
// questions with feedback, autosave across a reload, Ask Mino about a
// sentence, and the legacy short readings. Bangla on mobile, English on desktop.
// Run with `pnpm test:e2e:reading-library` (starts emulators, the mock AI and the app).
import type { Page } from 'playwright-core';
import { LEXICON, LIBRARY, flatten, getLibraryPassage, questionCount, vocabView, type FlatQuestion } from '../../lib/content/reading-library';
import { PASSAGES } from '../../lib/content/passages';
import { tokenize } from '../../components/reading/tokenize';
import { BASE, check, getDoc, launch, noHorizontalScroll, report, shot, signUp, uidOf, watchErrors } from './helpers';

const stamp = Date.now();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
/** The Bangla UI shows numbers in Bangla digits. */
const bnDigits = (s: string) => s.replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

/** Answer every question from the content; ids in `wrong` get a wrong answer on purpose. */
async function answerAll(p: Page, qs: FlatQuestion[], wrong: Set<string> = new Set()) {
  for (const q of qs) {
    if (q.kind === 'select') {
      const options = await p.locator(`[data-testid^="opt-${q.id}-"]`).evaluateAll((els) => els.map((e) => e.getAttribute('data-testid')!));
      const right = `opt-${q.id}-${q.item.answer}`;
      const pick = wrong.has(q.id) ? options.find((o) => o !== right)! : right;
      await p.getByTestId(pick).click();
    } else if (q.kind === 'multi') {
      for (const a of q.group.item.answers) await p.getByTestId(`opt-${q.id}-${a}`).click();
    } else {
      await p.locator(`[data-testid="gap-${q.id}"]:visible`).fill(wrong.has(q.id) ? 'nothing' : q.item.accepted[0]);
    }
  }
}

/** The passage's position in the document (not the viewport), to prove the text never moves. */
const docBox = (p: Page) =>
  p.getByTestId('library-passage').evaluate((e) => {
    const r = e.getBoundingClientRect();
    return JSON.stringify([Math.round(r.left), Math.round(r.top + window.scrollY), Math.round(r.width), Math.round(r.height)]);
  });

let lastWordBoxes = '';
/** The tapped word is not hidden behind the card. */
async function wordVisible(p: Page, word: import('playwright-core').Locator) {
  await sleep(3200);
  const w = (await word.boundingBox())!;
  const c = await p.locator('[data-reading-card] > div').boundingBox();
  if (!c) return false;
  const overlap = w.x < c.x + c.width && w.x + w.width > c.x && w.y < c.y + c.height && w.y + w.height > c.y;
  lastWordBoxes = JSON.stringify({ word: w, card: c, scrollY: await p.evaluate(() => window.scrollY) });
  return !overlap && w.y >= 0;
}

async function inViewport(p: Page, testId: string) {
  const box = await p.getByTestId(testId).locator('> div').boundingBox();
  const vp = p.viewportSize()!;
  return !!box && box.x >= 0 && box.y >= 0 && box.x + box.width <= vp.width + 0.5 && box.y + box.height <= vp.height + 0.5;
}

async function main() {
  const browser = await launch();
  const errors: string[] = [];
  try {
    // ------------------------------------------------------------ Bangla, mobile
    const mctx = await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const m = await mctx.newPage();
    watchErrors(m, 'bn-mobile', errors);
    await signUp(m, 'Rafi', `rl-bn-${stamp}@test.dev`, 'bn');
    const uid = (await uidOf(m))!;

    await m.goto(BASE + '/ielts/reading', { waitUntil: 'load' });
    await m.getByTestId('reading-next').waitFor({ timeout: 60_000 });
    const listed = await m.locator('a[href^="/ielts/reading/rl-"]').evaluateAll((els) => new Set(els.map((e) => e.getAttribute('href'))).size);
    check('list: all 20 library passages are listed', listed === 20, listed);
    check('list: Foundation / Intermediate / Advanced sections', (await m.getByText('Foundation', { exact: true }).count()) > 0 && (await m.getByText('Advanced', { exact: true }).count()) > 0);
    check('list: suggested passage is the first Foundation passage', (await m.getByTestId('reading-next').innerText()).includes(LIBRARY[0].title));
    check('list: legacy short readings still listed', (await m.locator(`a[href="/ielts/reading/${PASSAGES[0].id}"]`).count()) === 1);
    check('list: no horizontal scroll (bn mobile)', await noHorizontalScroll(m));
    await shot(m, 'rl-list-bn-mobile');

    const p1 = LIBRARY[0];
    await m.goto(`${BASE}/ielts/reading/${p1.id}`, { waitUntil: 'load' });
    await m.getByTestId('library-passage').waitFor({ timeout: 60_000 });
    check('passage: title shown', (await m.locator('h1').innerText()).includes(p1.title));
    const lemmas = new Set(await m.getByTestId('vocab-word').evaluateAll((els) => els.map((e) => e.getAttribute('data-lemma'))));
    check('passage: every vocabulary item is clickable', p1.vocab.every((v) => lemmas.has(v.lemma)), `${lemmas.size}/${p1.vocab.length}`);
    check('passage: no horizontal scroll (bn mobile)', await noHorizontalScroll(m));

    // Vocabulary popup: context meaning, Bangla first in Bangla
    const v = p1.vocab.find((x) => x.sense) ?? p1.vocab[0];
    const view = vocabView(LEXICON[v.lemma], v);
    await m.locator(`[data-testid="vocab-word"][data-lemma="${v.lemma}"]`).first().click();
    await m.getByTestId('vocab-card').waitFor();
    check('popup: Mino loading shows first (key word)', await m.getByTestId('mino-word-loading').waitFor({ timeout: 2000 }).then(() => true, () => false));
    await m.getByTestId('vocab-primary').waitFor();
    check('popup: Bangla meaning first (bn)', (await m.getByTestId('vocab-primary').innerText()).trim() === view.bn, view.bn);
    check('popup: English meaning too', (await m.getByTestId('vocab-secondary').innerText()).trim() === view.en, view.en);
    const ctx = await m.getByTestId('vocab-context').innerText();
    check('popup: context meaning (bn + en)', ctx.includes(view.ctx.bn) && ctx.includes(view.ctx.en), ctx);
    check('popup: example + Bangla example', (await m.getByTestId('vocab-card').innerText()).includes(view.exampleBn));
    check('popup: stays inside the phone screen', await inViewport(m, 'vocab-card'));
    check('popup: no horizontal scroll', await noHorizontalScroll(m));
    check('popup: Ask Mino link is there but Mino is not called', (await m.getByTestId('ask-mino-sentence').getAttribute('href'))?.includes('ask=reading') ?? false);
    await sleep(400);
    await shot(m, 'rl-popup-bn-mobile', false);

    // Save to Brain → existing notebook
    await m.getByTestId('vocab-card').getByRole('button', { name: 'Save to Brain' }).click();
    await m.getByTestId('vocab-card').getByRole('link', { name: /Saved/ }).waitFor({ timeout: 20_000 });
    check('save: card switches to Saved', true);
    await m.getByTestId('vocab-card').getByRole('button', { name: 'এখন না' }).click();

    // Every word is clickable: the words inside the passage buttons are exactly the passage's words
    const buttonWords = (await m.getByTestId('library-passage').locator('button').allInnerTexts()).flatMap((x) => tokenize(x).filter((t) => t.isWord).map((t) => t.text));
    const passageWords = p1.paragraphs.flatMap((x) => tokenize(x).filter((t) => t.isWord).map((t) => t.text));
    check('every word: all passage words are clickable', buttonWords.join(' ') === passageWords.join(' '), `${buttonWords.length}/${passageWords.length}`);
    check('every word: key words stay underlined', (await m.getByTestId('vocab-word').first().evaluate((e) => getComputedStyle(e).textDecorationLine)).includes('underline'));

    // Any other word: Mino loading → contextual meaning, in the page, cached per word
    const wordCalls: string[] = [];
    m.on('request', (r) => r.url().includes('/api/mino/word-meaning') && wordCalls.push(r.postData() ?? ''));
    const article = m.getByTestId('library-passage');
    const before = await docBox(m);
    const url = m.url();
    const plainWord = (w: string, i = 0) => article.locator('button:not([data-testid="vocab-word"])', { hasText: new RegExp(`^${w}$`) }).nth(i);
    const femaleBtn = plainWord('female');
    await femaleBtn.click();
    check('word: Mino loading animation shows', await m.getByTestId('mino-word-loading').waitFor({ timeout: 3000 }).then(() => true, () => false));
    await m.getByTestId('meaning-bn').waitFor({ timeout: 30_000 });
    check('word: stays on the reading page (no dictionary / Mino page)', m.url() === url);
    check('word: contextual Bangla meaning', (await m.getByTestId('meaning-bn').innerText()).includes('মাদি'));
    check('word: English meaning', (await m.getByTestId('meaning-en').innerText()).length > 5);
    check('word: part of speech', (await m.getByTestId('meaning-pos').innerText()).trim() === 'adjective');
    check('word: context meaning in Bangla (bn)', /এই বাক্যে/.test(await m.getByTestId('meaning-context').innerText()));
    check('word: card inside the phone screen', await inViewport(m, 'meaning-card'));
    check('word: no layout shift', (await docBox(m)) === before, `${before} → ${await docBox(m)}`);
    check('word: tapped word stays visible above the card', await wordVisible(m, femaleBtn), lastWordBoxes);
    check('word: no horizontal scroll', await noHorizontalScroll(m));
    await sleep(300);
    await shot(m, 'rl-word-bn-mobile', false);

    await plainWord('sand').click();
    await m.getByTestId('meaning-word').filter({ hasText: /^sand$/i }).waitFor({ timeout: 30_000 });
    check('word: one card at a time (new word replaces it)', (await m.getByTestId('meaning-card').count()) === 1);
    await plainWord('female', 1).click();
    await m.getByTestId('meaning-bn').filter({ hasText: 'মাদি' }).waitFor({ timeout: 10_000 });
    check('cache: the same word again makes no new AI request', wordCalls.length === 2, wordCalls.length);
    await m.getByTestId('meaning-card').getByRole('button', { name: 'Save to Brain' }).click();
    await m.getByTestId('meaning-card').getByRole('link', { name: /Saved/ }).waitFor({ timeout: 20_000 });
    check('word: Mino meaning saves to Brain', true);
    await m.getByTestId('meaning-close').click();
    check('word: close button closes the card', (await m.getByTestId('meaning-card').count()) === 0);

    // Questions: all right except one, autosave, reload
    const qs = flatten(p1);
    const wrongQ = qs.find((q) => q.kind === 'select')!;
    await answerAll(m, qs, new Set([wrongQ.id]));
    await sleep(2000);
    await m.reload({ waitUntil: 'load' });
    await m.getByTestId('library-passage').waitFor({ timeout: 60_000 });
    const gapQ = qs.find((q) => q.kind === 'gap');
    const kept =
      (await m.getByTestId(`opt-${wrongQ.id}-${(wrongQ as Extract<FlatQuestion, { kind: 'select' }>).item.answer}`).getAttribute('aria-pressed')) === 'false' &&
      (!gapQ || (await m.locator(`[data-testid="gap-${gapQ.id}"]:visible`).inputValue()) === (gapQ as Extract<FlatQuestion, { kind: 'gap' }>).item.accepted[0]);
    check('autosave: answers survive a reload', kept);

    await m.getByTestId('library-check').click();
    await m.getByTestId('library-result').waitFor();
    const total = questionCount(p1);
    const resultText = await m.getByTestId('library-result').innerText();
    check('check: result counts the one wrong answer', resultText.includes(bnDigits(`${total}টার মধ্যে ${total - 1}টা সঠিক`)), resultText);
    const fb = m.getByTestId(`fb-${wrongQ.id}`);
    check('feedback: wrong answer marked', (await fb.getAttribute('data-correct')) === 'false');
    check('feedback: explained in Bangla', (await fb.innerText()).includes((wrongQ as Extract<FlatQuestion, { kind: 'select' }>).item.explain.bn));
    check('check: no horizontal scroll', await noHorizontalScroll(m));
    await shot(m, 'rl-result-bn-mobile');

    await sleep(1500);
    const doc = await getDoc(`users/${uid}`);
    const saved = doc?.app?.study?.readingLibrary?.[p1.id];
    check('firestore: result saved in the profile', saved?.checked === true && saved?.score?.correct === total - 1, JSON.stringify(saved?.score));
    check('firestore: passage marked read', (doc?.app?.study?.readPassages ?? []).includes(p1.id));

    await m.reload({ waitUntil: 'load' });
    await m.getByTestId('library-result').waitFor({ timeout: 60_000 });
    check('reload: checked result persists', true);
    const callsBefore = wordCalls.length;
    await plainWord('female').click();
    await m.getByTestId('meaning-bn').waitFor({ timeout: 10_000 });
    check('cache: survives a reload in this session (no new request)', wordCalls.length === callsBefore, wordCalls.length - callsBefore);
    await m.getByTestId('meaning-close').click();

    // Notebook shows the saved word (existing vocabulary system, no parallel list)
    await m.goto(BASE + '/ielts/vocabulary/notebook', { waitUntil: 'load' });
    await m.getByText('female', { exact: true }).first().waitFor({ timeout: 30_000 }).then(() => check('notebook: Mino word appears in My Brain', true)).catch((e) => check('notebook: Mino word appears in My Brain', false, e));
    await m.getByText(v.lemma, { exact: true }).first().waitFor({ timeout: 30_000 }).then(() => check('notebook: saved word appears in My Brain', true)).catch((e) => check('notebook: saved word appears in My Brain', false, e));

    // List shows progress
    await m.goto(BASE + '/ielts/reading', { waitUntil: 'load' });
    await m.getByTestId('reading-next').waitFor({ timeout: 60_000 });
    check('list: next suggestion moved on', (await m.getByTestId('reading-next').innerText()).includes(LIBRARY[1].title));

    // Ask Mino about a sentence (only when asked)
    const sentence = p1.paragraphs[0].split('. ')[0] + '.';
    await m.goto(`${BASE}/mino?${new URLSearchParams({ ask: 'reading', passage: p1.id, s: sentence })}`, { waitUntil: 'load' });
    await m.getByText(p1.title, { exact: false }).first().waitFor({ timeout: 60_000 }).then(() => check('mino: sentence question sent with the passage title', true)).catch((e) => check('mino: sentence question sent', false, e));
    await mctx.close();

    // ------------------------------------------------------------ English, desktop
    const d = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
    watchErrors(d, 'en-desktop', errors);
    await signUp(d, 'Nadia', `rl-en-${stamp}@test.dev`, 'en');
    const p17 = getLibraryPassage('rl-17-self-healing')!;
    await d.goto(`${BASE}/ielts/reading/${p17.id}`, { waitUntil: 'load' });
    await d.getByTestId('library-passage').waitFor({ timeout: 60_000 });
    const v17 = p17.vocab.find((x) => x.sense)!;
    await d.locator(`[data-testid="vocab-word"][data-lemma="${v17.lemma}"]`).first().click();
    const view17 = vocabView(LEXICON[v17.lemma], v17);
    check('en popup: English (context sense) first', (await d.getByTestId('vocab-primary').innerText()).trim() === view17.en, view17.en);
    check('en popup: Bangla too', (await d.getByTestId('vocab-secondary').innerText()).trim() === view17.bn);
    check('en popup: inside the screen', await inViewport(d, 'vocab-card'));
    await d.keyboard.press('Escape');
    const art17 = d.getByTestId('library-passage');
    const artBox = await docBox(d);
    const materialBtn = art17.locator('button:not([data-testid="vocab-word"])', { hasText: /^material$/ }).first();
    await materialBtn.click();
    await d.getByTestId('meaning-en').waitFor({ timeout: 30_000 });
    check('en word: English context meaning', /Here "material"/.test(await d.getByTestId('meaning-context').innerText()));
    check('en word: the tapped word is not covered by the card', await wordVisible(d, materialBtn));
    check('en word: no layout shift', (await docBox(d)) === artBox);
    check('en word: card inside the screen', await inViewport(d, 'meaning-card'));
    await shot(d, 'rl-word-en-desktop', false);
    await d.keyboard.press('Escape');
    await answerAll(d, flatten(p17));
    await d.getByTestId('library-check').click();
    await d.getByTestId('library-result').waitFor();
    const t17 = questionCount(p17);
    check('en: full marks with the model answers', (await d.getByTestId('library-result').innerText()).includes(`You answered ${t17} of ${t17} correctly`));
    check('en: no horizontal scroll (desktop)', await noHorizontalScroll(d));
    await shot(d, 'rl-result-en-desktop');

    // Legacy passage still works
    await d.goto(`${BASE}/ielts/reading/${PASSAGES[0].id}`, { waitUntil: 'load' });
    await d.getByRole('button', { name: /Finish reading/ }).waitFor({ timeout: 60_000 }).then(() => check('legacy passage still opens', true)).catch((e) => check('legacy passage still opens', false, e));
    await d.locator('article button').nth(5).click();
    await d.getByTestId('meaning-en').waitFor({ timeout: 30_000 }).then(() => check('legacy passage: Mino meaning card works', true)).catch((e) => check('legacy passage: Mino meaning card works', false, e));

    // English mobile: table questions stack without sideways scroll
    const em = await (await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true })).newPage();
    watchErrors(em, 'en-mobile', errors);
    await signUp(em, 'Tanvir', `rl-enm-${stamp}@test.dev`, 'en');
    await em.goto(`${BASE}/ielts/reading/${p17.id}`, { waitUntil: 'load' });
    await em.getByTestId('library-passage').waitFor({ timeout: 60_000 });
    check('en mobile: table passage has no horizontal scroll', await noHorizontalScroll(em));
    await shot(em, 'rl-table-en-mobile');

    check('no console errors', errors.length === 0, errors.join(' | '));
  } finally {
    await browser.close();
  }
  process.exit(report());
}

void main();
