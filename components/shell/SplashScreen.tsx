import { MinoCoachMascot } from '@/components/mino/MinoCoachMascot';

/**
 * The start screen: the full-body Mino rolls in with its pencil salute (the shared opening), in a soft violet aura,
 * above the name. No spinner — Mino itself shows the app is starting. The static poster is already in the first HTML.
 */
export function SplashScreen() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-background px-6" role="status" aria-label="Mino">
      <span className="mino-aura mino-aura--pulse">
        <MinoCoachMascot pose="welcome" size="xl" />
      </span>
      <p className="text-[26px] font-semibold tracking-[0.3em] text-foreground">MINO</p>
    </div>
  );
}
