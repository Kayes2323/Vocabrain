'use client';

import { AuthProvider } from '@/components/providers/AuthProvider';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import { AppShell } from '@/components/shell/AppShell';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <AuthProvider>
        <AppShell>{children}</AppShell>
      </AuthProvider>
    </LocaleProvider>
  );
}
