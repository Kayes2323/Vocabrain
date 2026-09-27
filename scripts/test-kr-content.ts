import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getCountry } from '../lib/content/countries';
import { KR_SECTIONS } from '../lib/content/kr-country';
import { KR_EMBASSY_BD_GKS_U_2027, KR_NIIED_GUIDEBOOK, KR_SIK_SCHOLARSHIPS } from '../lib/content/kr-sources';
import { KR_SCHOLARSHIPS } from '../lib/content/kr-scholarships';
import { DEADLINES } from '../lib/content/deadlines';
import { scholarshipStatus } from '../lib/abroad/status';
import { KR_UNIVERSITIES } from '../lib/content/kr-universities';
import { explainMatch, filterUniversities, programRows } from '../lib/abroad/programs';
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
    assert.ok([KR_NIIED_GUIDEBOOK.url, KR_SIK_SCHOLARSHIPS.url, KR_EMBASSY_BD_GKS_U_2027.url].includes(f.fact.source.url), f.label.en);
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

test('C2.4 GKS: coverage in the source’s words, never "fully funded"; 2027 GKS-U dates from the Embassy in Bangladesh', () => {
  for (const s of KR_SCHOLARSHIPS) {
    assert.equal(s.funding, undefined, `${s.id}: no source calls it fully / partly funded`);
    assert.ok(s.coverage && s.eligibility.source.url && s.officialUrl.startsWith('https://'));
  }
  const u = KR_SCHOLARSHIPS.find((s) => s.id === 'kr-gks-u-2027')!;
  assert.equal(u.opensAt!.value, '2026-09-15');
  assert.equal(u.deadline!.value, '2026-09-30');
  assert.equal(scholarshipStatus(u, NOW), 'open');
  assert.equal(scholarshipStatus(u, new Date('2026-10-01T00:00:00Z')), 'deadline-passed');
  assert.ok(DEADLINES.some((d) => d.owner?.id === 'kr-gks-u-2027' && d.date.value === '2026-09-30'));
  assert.ok(KR_SCHOLARSHIPS.find((s) => s.id === 'kr-gks-g')!.deadline === undefined, 'no guessed graduate date');
});

test('C2.4 costs: tuition range follows the degree; language course fee only on the language guide; living items vs average flagged', () => {
  assert.ok(values('degree-masters', 'costs').some((v) => /Master's: ₩6,000,000–8,000,000/.test(v)));
  assert.ok(!values('degree-masters', 'costs').some((v) => /10 weeks/.test(v)));
  assert.ok(values('language', 'costs').some((v) => /10 weeks/.test(v)));
  assert.ok(!values('language', 'costs').some((v) => /Master's: ₩/.test(v)));
  assert.ok(labels('degree-bachelors', 'costs').includes('GKS undergraduate (Bangladesh, 2027)'));
  assert.ok(!labels('degree-masters', 'costs').includes('GKS undergraduate (Bangladesh, 2027)'));
  const living = KR_SECTIONS.living!.facts!.find((f) => f.label.en === 'By item, per month')!;
  assert.match(living.fact.notes!, /add up to more than the average/);
});

test('C2.5 universities: alphabetical (never ranked); type from Study in Korea; city from the university’s own site', () => {
  const names = KR_UNIVERSITIES.map((u) => u.name);
  assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b)));
  assert.ok(KR_UNIVERSITIES.length >= 10);
  for (const u of KR_UNIVERSITIES) {
    assert.ok(!('rank' in u) && !('ranking' in u) && !('score' in u));
    assert.ok(u.ownership?.source.url?.includes('studyinkorea.go.kr') && u.city && u.officialSource?.sourceType === 'official-university', u.id);
    assert.ok(u.officialUrl.startsWith('https://') && u.applicationPortalUrl?.startsWith('https://'), u.id);
  }
  assert.deepEqual(filterUniversities('KR', { city: 'Busan' }).fits.map((u) => u.id), ['kr-donga', 'kr-pnu']);
  assert.equal(filterUniversities('KR', { ownership: 'public' }).fits.length, 5);
  assert.equal(filterUniversities('KR', { studyLanguage: 'local' }).unknown.length, 10, 'Korean-taught not stated per university → can’t check, never guessed');
});

test('C2.6 programs: only fields read on the official page; semester tuition is never compared with a yearly budget', () => {
  const rows = programRows('KR');
  const uic = rows.find((r) => r.program.id === 'kr-yonsei-uic')!;
  assert.equal(uic.program.tuitionPeriod, 'semester');
  assert.equal(uic.program.english, undefined, 'no minimum score is set → none stored');
  const rich = { student: { budget: { tuition: { amount: 999_000_000, currency: 'KRW' } } } } as never;
  assert.equal(explainMatch(uic, rich).find((m) => m.dimension === 'budget')!.verdict, 'check');
  const bba = rows.find((r) => r.program.id === 'kr-woosong-solbridge-bba')!;
  assert.deepEqual(bba.program.english!.value, { test: 'IELTS', overall: 5.5 });
  assert.equal(bba.program.tuition, undefined, 'tuition not read → not stored');
  for (const r of rows) assert.ok(r.program.officialSource?.url && r.program.studyLanguages?.source.url);
});

console.log(`\n${passed} passed`);
