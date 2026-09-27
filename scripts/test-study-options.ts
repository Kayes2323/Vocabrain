import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { COUNTRIES, getCountry } from '../lib/content/countries';
import { GUIDE_SECTIONS, programGuide, studyOptionGroups, studyOptions } from '../lib/abroad/study-options';

let passed = 0;
function test(name: string, fn: () => void) {
  fn();
  passed++;
  console.log(`PASS ${name}`);
}
const KR = getCountry('KR')!;
const NOW = new Date('2026-09-27T10:00:00Z');
const keys = (g: NonNullable<ReturnType<typeof programGuide>>) => Object.values(g.sections).flat().map((b) => b.key);

test('options come from the country’s own pathways (degree levels + other pathways); no pathways → one general option', () => {
  assert.deepEqual(studyOptions(KR).map((o) => o.id), ['degree-bachelors', 'degree-masters', 'degree-phd', 'language']);
  assert.deepEqual(studyOptionGroups(KR).map((g) => [g.pathway?.id, g.options.length]), [['degree', 3], ['language', 1]]);
  for (const c of COUNTRIES.filter((x) => !x.pathways?.length)) assert.deepEqual(studyOptions(c).map((o) => o.id), ['general'], c.code);
  assert.equal(programGuide(KR, 'nonsense', undefined, NOW), undefined);
});

test('visa mapping follows the pathway: degree → D-2, language → D-4', () => {
  assert.deepEqual(programGuide(KR, 'degree-bachelors', undefined, NOW)!.visaCategories.map((c) => c.code), ['D-2']);
  assert.deepEqual(programGuide(KR, 'language', undefined, NOW)!.visaCategories.map((c) => c.code), ['D-4']);
  assert.deepEqual(programGuide(getCountry('DE')!, 'general', undefined, NOW)!.visaCategories, []);
});

test('no cross-route leakage: the degree guide has no D-4 blocks, the language guide no D-2 blocks', () => {
  const d2 = keys(programGuide(KR, 'degree-bachelors', undefined, NOW)!);
  const d4 = keys(programGuide(KR, 'language', undefined, NOW)!);
  assert.ok(d2.some((k) => k.includes('kr-d2')) && !d2.some((k) => k.includes('kr-d4')));
  assert.ok(d4.some((k) => k.includes('kr-d4')) && !d4.some((k) => k.includes('kr-d2')));
});

test('no cross-country leakage: other countries never show Korean content', () => {
  for (const c of COUNTRIES.filter((x) => x.code !== 'KR')) {
    for (const o of studyOptions(c)) {
      const g = programGuide(c, o.id, undefined, NOW)!;
      const json = JSON.stringify({ s: g.sections, v: g.visaCategories, src: g.sources });
      assert.ok(!/kr-|Korea|D-2|D-4/.test(json), `${c.code}/${o.id}`);
    }
  }
});

test('documents: each kind once; requirements only from verified facts; guidance kept apart', () => {
  const g = programGuide(KR, 'degree-bachelors', undefined, NOW)!;
  const kinds = g.documents.map((d) => d.kind);
  assert.equal(new Set(kinds).size, kinds.length);
  assert.ok(kinds.includes('passport') && kinds.includes('admission-letter'));
  for (const d of g.documents) for (const r of d.requirements) assert.notEqual(r.status, 'not-verified');
  assert.ok(g.documents.some((d) => d.generalOnly), 'general preparation marked as such');
});

test('money: official / estimate / budget kept apart; no invented amounts; nothing not-verified shown', () => {
  for (const c of COUNTRIES) for (const o of studyOptions(c)) {
    const g = programGuide(c, o.id, undefined, NOW)!;
    for (const x of [...g.fundsOfficial, ...g.costGroups.flatMap((cg) => cg.official)]) assert.notEqual(x.status, 'not-verified');
    for (const cg of g.costGroups) assert.equal(cg.mine, undefined, 'no budget without the student’s own numbers');
  }
});

test('every fact shown has a source and a verified date; every section is present', () => {
  const g = programGuide(KR, 'degree-masters', undefined, NOW)!;
  assert.deepEqual(Object.keys(g.sections), [...GUIDE_SECTIONS]);
  for (const b of Object.values(g.sections).flat()) for (const f of b.facts) {
    assert.ok(f.fact.source.name && f.fact.lastVerified, b.key);
    assert.notEqual(f.fact.status, 'not-verified');
  }
  assert.ok(g.sources.length >= 3 && g.sources.every((s) => s.source.name));
  assert.ok(g.sources.some((s) => s.lastVerified), 'verification dates are kept for the sources list');
});

test('guide page: no accordions, one optional Mino link, not-verified rule rendered', () => {
  const page = readFileSync('app/(app)/abroad/countries/[code]/study/[option]/page.tsx', 'utf8');
  const blocks = readFileSync('components/abroad/GuideBlocks.tsx', 'utf8');
  assert.ok(!/aria-expanded/.test(page + blocks));
  assert.equal(page.match(/ask: 'abroad-option'/g)?.length, 1);
  assert.match(blocks, /sa\.guide\.notVerified/);
  const bn = readFileSync('lib/i18n/locales/sa.bn.ts', 'utf8');
  assert.match(bn, /notVerified: 'এই তথ্য এখনো verified নয়'/);
  assert.match(bn, /fundsNotVerified: 'Official amount এখনো verified নয়'/);
});

test('respectful Bangla everywhere the student is addressed (আপনি, never তুমি/তোমার/তুই)', () => {
  const files = ['lib/i18n/locales/sa.bn.ts', 'lib/i18n/locales/bn.ts', 'lib/content/roadmap.ts', 'lib/content/documents.ts', 'lib/content/kr-d2.ts', 'lib/content/kr-d4.ts', 'lib/content/kr-shared.ts', 'lib/content/countries.ts', 'components/onboarding/OnboardingFlow.tsx'];
  for (const f of files) assert.ok(!/(^|[^\u0980-\u09FF])(তুমি|তোমার|তোমাকে|তোমাদের|তুই|তোকে)(?![\u0980-\u09FF])/.test(readFileSync(f, 'utf8')), f);
  const persona = readFileSync('lib/ai/server/mino/knowledge/persona.ts', 'utf8');
  assert.match(persona, /always addressing the student as "আপনি" \(never "তুমি"/);
});

test('sources stay in the data but not under every fact: one small link per section, full list at the end', () => {
  const blocks = readFileSync('components/abroad/GuideBlocks.tsx', 'utf8');
  assert.ok(!/<FactRow/.test(blocks), 'guide facts are rendered without a citation line each');
  assert.match(blocks, /export function SectionSources/);
  const page = readFileSync('app/(app)/abroad/countries/[code]/study/[option]/page.tsx', 'utf8');
  assert.match(page, /<SectionSources sources=\{sectionSources\(id\)\}/);
  assert.match(page, /data-testid="guide-sources"/);
  const g = programGuide(KR, 'degree-bachelors', undefined, NOW)!;
  for (const s of g.sources) assert.ok(s.source.url && s.source.name && s.source.sourceType, 'url, name and type kept');
});

console.log(`\n${passed} passed`);
