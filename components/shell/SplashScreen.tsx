import { Mino } from '@/components/mino/Mino';

/**
 * The start screen: Mino's welcome (appear, small bounce, settle, blink,
 * sparkle, then the wordmark). No spinner — Mino itself shows the app is starting.
 */
export function SplashScreen() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background" role="status" aria-label="Mino">
      <Mino mode="welcome" size="xl" wordmark />
    </div>
  );
}
