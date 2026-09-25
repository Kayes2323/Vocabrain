'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { ProfileProvider, useProfile } from '@/components/providers/ProfileProvider';
import { UpgradeProvider } from '@/components/providers/UpgradeProvider';
import LoginView from '@/components/LoginView';
import { BottomNav } from './BottomNav';
import { SideNav } from './SideNav';
import { SplashScreen } from './SplashScreen';

/** Routes that take over the full screen (focused flows, no navigation). */
const FOCUS_ROUTES = ['/setup', '/onboarding', '/ielts/diagnostic'];

/**
 * Keeps the UI language in step with the profile and sends new students to
 * onboarding before anything else.
 */
function JourneyGate({ children }: { children: React.ReactNode }) {
  const { profile } = useProfile();
  const { locale, setLocale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (profile?.language && profile.language !== locale) setLocale(profile.language);
    // Only react to the stored preference changing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.language]);

  const needsOnboarding = profile !== null && !profile.onboardedAt && !pathname.startsWith('/onboarding');
  useEffect(() => {
    if (needsOnboarding) router.replace('/onboarding');
  }, [needsOnboarding, router]);

  if (needsOnboarding) return <SplashScreen />;
  return <>{children}</>;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) return <SplashScreen />;
  if (!user) return <LoginView />;

  const focused = FOCUS_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <ProfileProvider userId={user.uid}>
      <UpgradeProvider>
        <JourneyGate>
          {focused ? (
            <main className="min-h-dvh bg-background">{children}</main>
          ) : (
            <div className="flex min-h-dvh bg-background">
              <SideNav />
              <main className="min-w-0 flex-1">
                <div className="mx-auto w-full max-w-2xl px-4 pt-6 pb-nav md:px-8 md:pt-10 md:pb-16 lg:max-w-5xl">
                  {children}
                </div>
              </main>
              <BottomNav />
            </div>
          )}
        </JourneyGate>
      </UpgradeProvider>
    </ProfileProvider>
  );
}
