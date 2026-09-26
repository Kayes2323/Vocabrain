/** Country data and Country Match checks. Run: pnpm test:abroad */
import assert from 'node:assert/strict';
import { getCountryData } from '../lib/ai/server/tools/abroad';
import { COUNTRIES } from '../lib/content/countries';
import { matchCountries, prioritiesFrom } from '../lib/engine/country-match';

let passed = 0;
const test = async (name: string, fn: () => void | Promise<void>) => {
  try {
    await fn();
    passed++;
    console.log(`PASS ${name}`);
  } catch (e) {
    console.log(`FAIL ${name}\n  ${(e as Error).message}`);
    process.exitCode = 1;
  }
};

async function main() {
  await test('every country fact is official, linked and dated', () => {
    let facts = 0;
    for (const c of COUNTRIES) {
      const lists = [c.data.livingCost, c.data.workRules, c.data.postStudyOptions, c.data.tuition, c.data.visaInformation, c.data.scholarshipInformation];
      const metrics = [c.data.metrics?.postStudyWorkMonths, c.data.metrics?.termWorkHoursPerWeek];
      for (const f of [...lists.flat(), ...metrics].filter(Boolean) as { source: { url?: string; sourceType: string }; lastVerified: string }[]) {
        facts++;
        assert.ok(f.source.url?.startsWith('https://'), `${c.code} source link`);
        assert.equal(f.source.sourceType, 'official-government', c.code);
        assert.match(f.lastVerified, /^\d{4}-\d{2}-\d{2}$/);
      }
    }
    assert.ok(facts >= 12, `${facts} facts`);
  });

  await test('priorities: up to three, weights sum to 100', () => {
    const p = prioritiesFrom(['postStudyWork', 'affordability', 'safety', 'career']);
    assert.deepEqual(Object.keys(p), ['postStudyWork', 'affordability', 'safety']);
    assert.equal(Object.values(p).reduce((a, b) => a + (b ?? 0), 0), 100);
  });

  await test('post-study work priority ranks on verified months only', () => {
    const r = matchCountries(COUNTRIES, { priorities: prioritiesFrom(['postStudyWork']) });
    const byCode = Object.fromEntries(r.matches.map((m) => [m.code, m]));
    assert.equal(byCode.CA.fit, 100);
    assert.equal(byCode.AU.fit, 100);
    assert.equal(byCode.GB.fit, Math.round((24 / 36) * 100));
    assert.equal(byCode.GB.coverage, 100);
    assert.equal(byCode.DE, undefined, 'no verified post-study data for Germany → not scored');
    assert.ok(r.notEnoughData.some((c) => c.code === 'DE'));
    assert.ok(r.notEnoughData.some((c) => c.code === 'US'), 'countries without data are listed, not guessed');
  });

  await test('unverified priorities lower coverage, never the score', () => {
    const r = matchCountries(COUNTRIES, { priorities: prioritiesFrom(['affordability', 'safety']), preferredCountryCodes: ['DE'] });
    const de = r.matches.find((m) => m.code === 'DE')!;
    assert.equal(de.coverage, 50);
    assert.deepEqual(de.unknownPriorities, ['safety']);
    assert.equal(de.preferred, true);
    const gb = r.matches.find((m) => m.code === 'GB')!;
    assert.equal(gb.fit, undefined, 'UK has no verified weekly work number');
    assert.ok(gb.livingCost.length === 2, 'official money-to-show figures still shown');
  });

  await test('Mino country tool returns sources and says notVerified', async () => {
    const ca = (await getCountryData.run({ uid: 'x', idToken: 'x' }, { country: 'Canada' })) as Record<string, unknown>;
    assert.equal(ca.tuition, 'notVerified');
    assert.match(JSON.stringify(ca.livingCostToShow), /23448.*canada\.ca/);
    const uk = (await getCountryData.run({ uid: 'x', idToken: 'x' }, { country: 'uk' })) as Record<string, unknown>;
    assert.equal(uk.country, 'United Kingdom');
    const us = (await getCountryData.run({ uid: 'x', idToken: 'x' }, { country: 'USA' })) as Record<string, unknown>;
    assert.equal(us.livingCostToShow, 'notVerified');
  });

  console.log(`\n${passed} passed`);
}
void main();
