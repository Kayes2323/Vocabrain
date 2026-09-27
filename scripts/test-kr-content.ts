import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getCountry } from '../lib/content/countries';
import { KR_SECTIONS } from '../lib/content/kr-country';
import { KR_NIIED_GUIDEBOOK } from '../lib/content/kr-sources';
import { programGuide } from '../lib/abroad/study-options';
import { countrySections, factStatus } from '../lib/abroad/sections';
import type { SectionFact } from '../lib/models';

/** South Korea content completion (C2): what a student can read, and that it stays honest. */
let passed = 0;
function test(name: string, fn: () => void) {
  fn();
  passed++;
  console.log(`PASS ${name}`);
}
const KR = getCountry('KR')!;
const NOW = new Date('2026-09-27T10:00:00Z');
const guide = (id: string) => programGuide(KR, id, undefined, NOW)!;
const labels = (id: string, section: string) => (guide(id).sections as Record<string, { facts: SectionFact[] }[]>)[section].flatMap((b) => b.facts.map((f) => f.label.en));
const values = (id: string, section: string) => (guide(id).sections as Record<string, { facts: SectionFact[] }[]>)[section].flatMap((b) => b.facts.map((f) => String(f.fact.value)));
const allFacts = Object.values(KR_SECTIONS).flatMap((s) => [...(s!.facts ?? []), ...(s!.blocks ?? []).flatMap((b) => b.facts ?? [])]);

test('C2.1: education, admission, language and application are filled from the official guidebook', () => {
  const s = new Map(countrySections(KR, NOW).map((x) => [x.id, x]));
  for (const id of ['education', 'admission', 'english', 'application'] as const) assert.notEqual(s.get(id)!.status, 'not-yet', id);
  assert.ok(allFacts.length >= 20);
  for (const f of allFacts) {
    assert.equal(f.fact.source.url, KR_NIIED_GUIDEBOOK.url, f.label.en);
    assert.ok(f.fact.lastVerified && f.fact.reviewedAt && f.fact.reviewAt && f.fact.status === 'verified' && f.fact.confidence, f.label.en);
    assert.ok(f.label.en && f.label.bn, 'every label in both languages');
  }
  assert.match(KR_NIIED_GUIDEBOOK.name, /undated; cites rules to Nov 2023/, 'an undated document says how recent it is');
});

test("C2.1: admission rules follow the chosen degree (bachelor's never sees master's rules, and back)", () => {
  assert.ok(labels('degree-bachelors', 'admission').includes("Associate / Bachelor's"));
  assert.ok(!labels('degree-bachelors', 'admission').includes("Master's"));
  assert.ok(labels('degree-masters', 'admission').includes("Master's"));
  assert.ok(!labels('degree-masters', 'admission').some((l) => /Bachelor|12 years/.test(l)));
  assert.ok(labels('degree-phd', 'admission').includes('Doctoral'));
  assert.ok(labels('degree-masters', 'study').includes("Master's") && !labels('degree-masters', 'study').includes('Doctoral'));
  assert.ok(!labels('degree-bachelors', 'study').includes("Master's"), 'graduate block only for graduate options');
});

test('C2.1: the language-course guide carries no degree-only rules (TOPIK 3, university intake periods)', () => {
  const lang = [...values('language', 'language'), ...values('language', 'application'), ...values('language', 'admission')].join(' ');
  assert.doesNotMatch(lang, /TOPIK level 3 or above|Spring semester|Choose the university and department/);
  assert.ok(labels('language', 'admission').includes('Steps'), 'institute admission steps shown');
  assert.ok(labels('language', 'language').includes('Levels taught'), 'pathway language requirement shown first');
  assert.ok(!guide('language').sections.admission.some((b) => b.facts.length === 0 && !b.guidance), 'no "not verified" line in a filled section');
  assert.ok(!labels('degree-bachelors', 'admission').includes('Steps'), 'institute steps not in the degree guide');
});

test('C2.1: TOPIK vs English is explained per teaching language; the exam schedule is only linked, never guessed', () => {
  const text = values('degree-bachelors', 'language').join(' ');
  assert.match(text, /TOPIK level 3 or above/);
  assert.match(text, /TOPIK is not mandatory/);
  assert.doesNotMatch(text, /six times|January|April/);
  assert.ok(guide('degree-bachelors').sections.language.some((b) => b.links.some((l) => l.url === 'https://www.topik.go.kr')));
});

test('C2.1: no ranking words and respectful Bangla in the new content', () => {
  const src = readFileSync('lib/content/kr-country.ts', 'utf8');
  assert.doesNotMatch(src, /#1|\bbest\b|\btop\b|\branked?\b|score out of/i);
  assert.doesNotMatch(src, /তুমি|তোমার|তোমাকে|তোমাদের|তুই|তোকে/);
  assert.doesNotMatch(src, /fully funded/i);
});

test('C2.1: the guide lists the guidebook once in its sources, with the date it was checked', () => {
  const g = guide('degree-bachelors');
  const hits = g.sources.filter((s) => s.source.url === KR_NIIED_GUIDEBOOK.url);
  assert.equal(hits.length, 1);
  assert.equal(hits[0].lastVerified, '2026-09-27');
});

test('C2.2 D-4: the 10 million KRW figure is shown, but flagged for re-checking because only the older guidebook states it', () => {
  const blocks = guide('language').sections.finances;
  const amount = blocks.flatMap((b) => b.facts).find((f) => f.label.en === 'Amount')!;
  assert.match(String(amount.fact.value), /10 million KRW/);
  assert.equal(factStatus(amount.fact, 'visa', NOW), 'needs-review');
  assert.match(amount.fact.notes!, /undated; rules cited to Nov 2023/);
  assert.ok(blocks.flatMap((b) => b.facts).some((f) => /within 30 days/.test(String(f.fact.value))));
  assert.ok(!values('degree-bachelors', 'finances').some((v) => /10 million KRW/.test(v)), 'the D-4 amount never reaches the degree guide');
});

test('C2.2 D-4: health insurance starts six months after entry (current Easylaw); D-2 keeps its own rule; both get the 50% premium', () => {
  const lang = values('language', 'visa-application').join(' ');
  assert.match(lang, /six months after the date of entry/);
  assert.match(lang, /50% of the monthly premium/);
  const deg = values('degree-bachelors', 'visa-application').join(' ');
  assert.doesNotMatch(deg, /six months after the date of entry/);
  assert.match(deg, /date of alien registration/);
  assert.match(deg, /50% of the monthly premium/);
});

console.log(`\n${passed} passed`);
