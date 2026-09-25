export type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';

/** Soft background + readable foreground per semantic tone. */
export const TONE_SOFT: Record<Tone, string> = {
  neutral: 'bg-muted text-muted-foreground',
  brand: 'bg-brand-soft text-brand',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-destructive-soft text-destructive',
};

export const TONE_SOLID: Record<Tone, string> = {
  neutral: 'bg-muted-foreground',
  brand: 'bg-brand',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-destructive',
};
