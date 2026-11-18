'use client';

import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandMark } from '@/components/shell/BrandMark';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { bandLevel, cefrForBand, formatBand, overallBand } from '@/lib/engine';
import type { IELTSSkillId } from '@/lib/ielts';
import type { SkillBands } from '@/lib/models';
import { cn } from '@/lib/utils';

const SKILL_ORDER: IELTSSkillId[] = ['listening', 'reading', 'writing', 'speaking'];

export interface SheetScore {
  skill: IELTSSkillId;
  /** The student sat this module. */
  taken: boolean;
  /** The estimated band, when there is one. */
  band?: number;
}

/**
 * Mino's practice result sheet. It follows the shape of an IELTS report (candidate
 * details, the four module bands with their CEFR levels, an overall band) so a
 * student sees their result the way they will on exam day, but it is branded as
 * Mino and marked everywhere as practice, with no test number or verification of
 * any kind. A student who sat one module sees only that module; the overall band
 * appears only when all four are done.
 */
export function ResultSheet({ testTitle, date, scores, className }: { testTitle: string; date?: string; scores: SheetScore[]; className?: string }) {
  const { t } = useLocale();
  const { profile } = useProfile();
  const name = profile?.displayName?.trim() || t('sheet.studentFallback');
  const byModule = new Map(scores.map((s) => [s.skill, s]));
  const bands: SkillBands = Object.fromEntries(scores.filter((s) => s.taken && s.band !== undefined).map((s) => [s.skill, s.band])) as SkillBands;
  const overall = overallBand(bands);
  const modulesTaken = scores.filter((s) => s.taken).length;
  const shownDate = date ? new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : '—';

  return (
    <section className={cn('space-y-3', className)}>
      <style>{`@media print { body * { visibility: hidden; } #result-sheet, #result-sheet * { visibility: visible; } #result-sheet { position: absolute; inset: 0 auto auto 0; width: 100%; box-shadow: none; } }`}</style>
      <article id="result-sheet" className="relative overflow-hidden rounded-2xl border-2 bg-card shadow-sm" aria-label={t('sheet.title')}>
        <header className="flex items-center justify-between gap-3 bg-primary px-5 py-4 text-primary-foreground">
          <BrandMark className="[&>span:first-child]:bg-primary-foreground [&>span:first-child]:text-primary" />
          <p className="text-right text-xs font-semibold tracking-wide uppercase">{t('sheet.title')}</p>
        </header>
        <p className="bg-destructive/10 px-5 py-1.5 text-center text-[11px] font-semibold tracking-wide text-destructive uppercase">{t('sheet.badge')}</p>

        <div className="space-y-6 p-5 sm:p-6">
          <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground uppercase">{t('sheet.candidate')}</dt>
              <dd className="text-base font-semibold">{name}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground uppercase">{t('sheet.test')}</dt>
              <dd className="text-base font-semibold">{testTitle}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground uppercase">{t('sheet.date')}</dt>
              <dd className="font-medium">{shownDate}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground uppercase">{t('sheet.modules')}</dt>
              <dd className="font-medium">{modulesTaken === 4 ? t('sheet.allModules') : t('sheet.someModules', { n: modulesTaken })}</dd>
            </div>
          </dl>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SKILL_ORDER.map((skill) => {
              const score = byModule.get(skill);
              const band = score?.taken ? score.band : undefined;
              const cefr = cefrForBand(band);
              return (
                <div key={skill} className={cn('rounded-xl border p-3 text-center', !score?.taken && 'border-dashed bg-muted/30 text-muted-foreground')} data-testid={`sheet-${skill}`}>
                  <p className="text-xs font-semibold tracking-wide uppercase">{t(`skills.${skill}`)}</p>
                  <p className="my-1 text-3xl font-bold tabular-nums">{score?.taken ? formatBand(band) : '—'}</p>
                  <p className="text-[11px] leading-tight text-muted-foreground">
                    {!score?.taken ? t('sheet.notTaken') : band === undefined ? t('sheet.noEstimate') : `${t('sheet.cefr')} ${cefr ?? '—'}`}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 text-center" data-testid="sheet-overall">
            <p className="text-xs font-semibold tracking-wide uppercase">{t('sheet.overall')}</p>
            <p className="my-1 text-5xl font-bold tabular-nums">{overall !== undefined ? formatBand(overall) : '—'}</p>
            {overall !== undefined ? (
              <>
                <p className="text-sm font-semibold">
                  {t(`sheet.level.${bandLevel(overall)}`)} · {t('sheet.cefr')} {cefrForBand(overall) ?? '—'}
                </p>
                <p className="mx-auto mt-1 max-w-md text-xs text-muted-foreground">{t(`sheet.desc.${bandLevel(overall)}`)}</p>
              </>
            ) : (
              <p className="mx-auto max-w-md text-xs text-muted-foreground">{t('sheet.overallNeeds')}</p>
            )}
          </div>

          <p className="border-t pt-4 text-[11px] leading-relaxed text-muted-foreground">{t('sheet.footer')}</p>
        </div>
      </article>
      <Button variant="outline" size="sm" className="print:hidden" onClick={() => window.print()}>
        <Printer /> {t('sheet.print')}
      </Button>
    </section>
  );
}
