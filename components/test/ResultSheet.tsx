'use client';

import { BookOpen, Ear, MessageSquare, PenLine, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandMark } from '@/components/shell/BrandMark';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useProfile } from '@/components/providers/ProfileProvider';
import { bandLevel, cefrForBand, formatBand, overallBand } from '@/lib/engine';
import { describeBand, type IELTSSkillId } from '@/lib/ielts';
import type { SkillBands } from '@/lib/models';
import { cn } from '@/lib/utils';

const SKILL_ORDER: IELTSSkillId[] = ['listening', 'reading', 'writing', 'speaking'];
const SKILL_ICON = { listening: Ear, reading: BookOpen, writing: PenLine, speaking: MessageSquare } as const;

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
  const { t, locale } = useLocale();
  const { profile } = useProfile();
  const name = profile?.displayName?.trim() || t('sheet.studentFallback');
  const byModule = new Map(scores.map((s) => [s.skill, s]));
  const bands: SkillBands = Object.fromEntries(scores.filter((s) => s.taken && s.band !== undefined).map((s) => [s.skill, s.band])) as SkillBands;
  const overall = overallBand(bands);
  const modulesTaken = scores.filter((s) => s.taken).length;
  const shownDate = date ? new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : '—';
  const explained = SKILL_ORDER.filter((skill) => byModule.get(skill)?.taken && byModule.get(skill)?.band !== undefined);
  const lang = locale === 'bn' ? 'bn' : 'en';

  return (
    <section className={cn('space-y-3', className)}>
      <style>{`@media print { body * { visibility: hidden; } #result-sheet, #result-sheet * { visibility: visible; } #result-sheet { position: absolute; inset: 0 auto auto 0; width: 100%; box-shadow: none; } }`}</style>
      <article id="result-sheet" className="overflow-hidden rounded-2xl border bg-brand-soft shadow-sm" aria-label={t('sheet.title')}>
        <header className="flex items-center justify-between gap-3 bg-primary px-5 py-4 text-primary-foreground">
          <BrandMark />
          <p className="text-right text-xs font-semibold tracking-wide uppercase">{t('sheet.title')}</p>
        </header>
        <p className="bg-destructive/10 px-5 py-1.5 text-center text-[11px] font-semibold tracking-wide text-destructive uppercase">{t('sheet.badge')}</p>

        <div className="space-y-6 px-4 py-6 sm:px-6">
          <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground uppercase">{t('sheet.candidate')}</dt>
              <dd className="font-semibold">{name}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground uppercase">{t('sheet.test')}</dt>
              <dd className="font-semibold">{testTitle}</dd>
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

          <Divider />

          <h2 className="text-2xl leading-tight font-bold text-primary">{t('sheet.heading')}</h2>

          <div className="space-y-3">
            {SKILL_ORDER.map((skill) => {
              const score = byModule.get(skill);
              const band = score?.taken ? score.band : undefined;
              return <ScoreRow key={skill} skill={skill} label={t(`skills.${skill}`)} value={score?.taken ? formatBand(band) : '—'} note={!score?.taken ? t('sheet.notTaken') : band === undefined ? t('sheet.noEstimate') : `${t('sheet.cefr')} ${cefrForBand(band) ?? '—'}`} muted={!score?.taken} />;
            })}
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-card px-5 py-4 shadow-md" data-testid="sheet-overall">
              <div className="min-w-0">
                <p className="text-lg font-bold">{t('sheet.overall')}</p>
                <p className="text-xs text-muted-foreground">
                  {overall !== undefined ? `${t(`sheet.level.${bandLevel(overall)}`)} · ${t('sheet.cefr')} ${cefrForBand(overall) ?? '—'}` : t('sheet.overallNeeds')}
                </p>
              </div>
              <p className="shrink-0 text-3xl font-bold tabular-nums">{overall !== undefined ? formatBand(overall) : '—'}</p>
            </div>
          </div>

          {(explained.length > 0 || overall !== undefined) && (
            <>
              <Divider />
              <h2 className="text-xl font-bold text-muted-foreground">{t('sheet.explained')}</h2>
              <div className="space-y-5">
                {explained.map((skill) => {
                  const band = byModule.get(skill)!.band!;
                  return (
                    <div key={skill} className="space-y-2" data-testid={`sheet-explain-${skill}`}>
                      <ScoreRow skill={skill} label={t(`skills.${skill}`)} value={formatBand(band)} testId={`sheet-explain-row-${skill}`} />
                      <p className="px-1 text-sm leading-relaxed text-muted-foreground">{describeBand(skill, band, lang)}</p>
                    </div>
                  );
                })}
                {overall !== undefined && (
                  <div className="space-y-1 px-1" data-testid="sheet-explain-overall">
                    <p className="text-sm font-semibold">
                      {t('sheet.overall')} {formatBand(overall)} · {t(`sheet.level.${bandLevel(overall)}`)}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{t(`sheet.desc.${bandLevel(overall)}`)}</p>
                  </div>
                )}
              </div>
            </>
          )}

          <Divider />
          <p className="text-[11px] leading-relaxed text-muted-foreground">{t('sheet.footer')}</p>
        </div>
      </article>
      <Button variant="outline" size="sm" className="print:hidden" onClick={() => window.print()}>
        <Printer /> {t('sheet.print')}
      </Button>
    </section>
  );
}

const Divider = () => <div className="border-t-[3px] border-dotted border-muted-foreground/40" aria-hidden />;

function ScoreRow({ skill, label, value, note, muted, testId }: { skill: IELTSSkillId; label: string; value: string; note?: string; muted?: boolean; testId?: string }) {
  const Icon = SKILL_ICON[skill];
  return (
    <div className={cn('flex items-center gap-4 rounded-2xl bg-card px-5 py-4 shadow-md', muted && 'opacity-60')} data-testid={testId ?? `sheet-${skill}`}>
      <Icon className="size-6 shrink-0 text-brand" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="text-lg leading-tight">{label}</p>
        {note && <p className="text-xs text-muted-foreground">{note}</p>}
      </div>
      <p className="shrink-0 text-xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
