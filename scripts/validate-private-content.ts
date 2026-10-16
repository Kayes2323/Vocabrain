/**
 * Validates PracticeTest JSON files kept in the gitignored `private-content/` folder
 * (e.g. a student's own practice material). Nothing here is bundled into the app.
 * Run: pnpm validate:private [dir]
 *
 * Structure is checked with the same validator the app uses. Licence is reported
 * separately: a file is only "publishable" when it declares licenseStatus "licensed"
 * for a real, verified licence — this script never sets that for you.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { isPublishable, validateTest, type PracticeTest } from '../lib/ielts/index';

const root = resolve(process.argv[2] ?? 'private-content');
if (!existsSync(root)) {
  console.log(`No folder at ${root}. Create it and add test-N.json files (see docs/PRIVATE_CONTENT.md).`);
  process.exit(0);
}

const files: string[] = [];
const walk = (dir: string) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.json')) files.push(p);
  }
};
walk(root);

let failed = false;
for (const file of files) {
  const errors: string[] = [];
  let test: PracticeTest | undefined;
  try {
    test = JSON.parse(readFileSync(file, 'utf8')) as PracticeTest;
  } catch (e) {
    errors.push(`invalid JSON: ${(e as Error).message}`);
  }
  if (test) {
    // Structure only: pretend the licence is fine so licence doesn't mask structural errors.
    errors.push(...validateTest({ ...test, licenseStatus: 'licensed' }));
    const refs = [
      ...Object.values(test.sections).flatMap((s) => ('parts' in (s ?? {}) ? (s as any).parts : [])).flatMap((p: any) => [p.audio?.src, ...p.groups.map((g: any) => g.image?.src)]),
      ...(test.sections.writing?.tasks.map((t) => t.image?.src) ?? []),
    ].filter((s): s is string => !!s && !/^https?:/.test(s));
    for (const ref of refs) if (!existsSync(join(root, ref.replace(/^\//, '')))) errors.push(`missing asset: ${ref}`);
  }
  const licence = test ? (isPublishable(test) ? 'licence OK' : `NOT publishable (licenseStatus=${test.licenseStatus})`) : 'n/a';
  console.log(`${errors.length ? 'FAIL' : 'PASS'} ${file} — ${licence}`);
  for (const e of errors) console.log(`   - ${e}`);
  if (errors.length) failed = true;
}
console.log(`${files.length} file(s) checked`);
process.exit(failed ? 1 : 0);
