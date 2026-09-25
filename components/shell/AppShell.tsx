'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { ProfileProvider } from '@/components/providers/ProfileProvider';
import { UpgradeProvider } from '@/components/providers/UpgradeProvider';
import LoginView from '@/components/LoginView';
import { BottomNav } from './BottomNav';
import { SideNav } from './SideNav';
import { SplashScreen } from './SplashScreen';

/** Routes that take over the full screen (focused flows, no navigation). */
const FOCUS_ROUTES = ['/setup'];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) return <SplashScreen />;
  if (!user) return <LoginView />;

  const focused = FOCUS_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <ProfileProvider userId={user.uid}>
      <UpgradeProvider>
        {focused ? (
          <main className="min-h-dvh bg-background">{children}</main>
        ) : (
          <div className="flex min-h-dvh bg-background">
            <SideNav />
            <main className="min-w-0 flex-1">
              <div className="mx-auto w-full max-w-2xl px-4 pt-6 pb-nav md:px-8 md:pt-10 md:pb-16 lg:max-w-3xl">
                {children}
              </div>
            </main>
            <BottomNav />
          </div>
        )}
      </UpgradeProvider>
    </ProfileProvider>
  );
}
