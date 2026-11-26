/**
 * Who may open the Mino review/preview routes (/dev/mino-*): local development, and Vercel *Preview* deployments
 * (so the animation can be reviewed on a phone). A Vercel *Production* deployment (VERCEL_ENV === 'production') and any
 * other build (`next start` without VERCEL_ENV) answer 404, so ordinary learners can never reach these routes.
 */
export function minoReviewEnabled(): boolean {
  return process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview';
}
