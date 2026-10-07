// Learning paths (IELTS Academic / Academic): profile migration and the
// path-aware navigation.   npx -y tsx scripts/test-paths.ts
import { emptyProfile, type UserProfile } from '../lib/models';
import { LEARNING_NAV, PATH_HOME, PRIMARY_NAV, activePathOf, primaryNav } from '../lib/navigation';
import { withProfileDefaults } from '../lib/services/profile-repository';

let failed = 0;
function check(name: string, ok: boolean, detail: unknown = '') {
  if (!ok) failed++;
  console.log(ok ? '  PASS' : '  FAIL', name, ok ? '' : JSON.stringify(detail));
}

const at = '2026-05-01T10:00:00.000Z';
const load = (stored: Partial<UserProfile> | undefined) => withProfileDefaults('u1', stored);

// ---------------------------------------------------------------- migration
check('brand-new student: no path until onboarding', load(undefined).activePath === undefined);
check('not onboarded yet: no path', load({ updatedAt: at }).activePath === undefined);
check('onboarded before paths existed → IELTS Academic', load({ onboardedAt: at, goal: 'ielts' }).activePath === 'ielts');
check('onboarded with goal "abroad" → IELTS Academic', load({ onboardedAt: at, goal: 'abroad' }).activePath === 'ielts');
const legacy = load({ updatedAt: at, ielts: { currentBands: {}, targetBand: 7 } });
check('pre-onboarding profile with a target → onboarded and IELTS Academic', legacy.onboardedAt === at && legacy.activePath === 'ielts', legacy);
check('a chosen Academic path is kept', load({ onboardedAt: at, activePath: 'academic' }).activePath === 'academic');
check('a chosen IELTS path is kept', load({ onboardedAt: at, activePath: 'ielts' }).activePath === 'ielts');
check('an unknown stored path is ignored (falls back by onboarding)', load({ onboardedAt: at, activePath: 'physics' as never }).activePath === 'ielts');
const ieltsData = load({ onboardedAt: at, activePath: 'academic', ielts: { currentBands: { reading: 6 }, targetBand: 7 } });
check('switching to Academic keeps all IELTS data', ieltsData.ielts.targetBand === 7 && ieltsData.ielts.currentBands.reading === 6);
check('emptyProfile has no path', emptyProfile('x').activePath === undefined);

// ---------------------------------------------------------------- navigation
check('activePathOf: no profile → IELTS Academic', activePathOf(null) === 'ielts' && activePathOf(undefined) === 'ielts');
check('activePathOf: unset → IELTS Academic', activePathOf({}) === 'ielts');
check('activePathOf: academic', activePathOf({ activePath: 'academic' }) === 'academic');
const ielts = primaryNav('ielts');
check('IELTS navigation is exactly the existing navigation', ielts.length === PRIMARY_NAV.length && ielts.every((item, i) => item === PRIMARY_NAV[i]));
check('IELTS navigation is unchanged (hrefs)', ielts.map((i) => i.href).join(',') === '/,/ielts,/mino,/abroad,/profile', ielts.map((i) => i.href));
const academic = primaryNav('academic');
check('Academic navigation swaps only the learning tab', academic.map((i) => i.href).join(',') === '/,/academic,/mino,/abroad,/profile', academic.map((i) => i.href));
check('Academic tab uses its own label and accent', academic[1].labelKey === 'nav.academic' && academic[1].tint.includes('academic'));
check('Mino stays featured in the middle for both paths', ielts[2].featured === true && academic[2].featured === true);
check('every path has a home and a tab', PATH_HOME.ielts === LEARNING_NAV.ielts.href && PATH_HOME.academic === LEARNING_NAV.academic.href);

console.log(failed ? `\n${failed} check(s) failed` : '\nAll path checks passed');
process.exit(failed ? 1 : 0);
