'use client';

import { AuthProvider } from '@/components/providers/AuthProvider';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import { AppShell } from '@/components/shell/AppShell';
import { Toaster } from '@/components/ui/sonner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <AuthProvider>
        <AppShell>{children}</AppShell>
        <Toaster position="top-center" theme="light" duration={2200} />
      </AuthProvider>
    </LocaleProvider>
  );
}
