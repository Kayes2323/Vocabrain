'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import PremiumPaywall from '@/components/PremiumPaywall';
import { useAuth } from './AuthProvider';

interface UpgradeState {
  openUpgrade: () => void;
}

const UpgradeContext = createContext<UpgradeState | null>(null);

/** Lets any screen open the premium paywall without owning its state. */
export function UpgradeProvider({ children }: { children: React.ReactNode }) {
  const { user, subscription } = useAuth();
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ openUpgrade: () => setOpen(true) }), []);

  return (
    <UpgradeContext.Provider value={value}>
      {children}
      {open && (
        <PremiumPaywall
          user={user}
          subscription={subscription}
          onClose={() => setOpen(false)}
          onSuccess={() => setOpen(false)}
        />
      )}
    </UpgradeContext.Provider>
  );
}

export function useUpgrade(): UpgradeState {
  const ctx = useContext(UpgradeContext);
  if (!ctx) throw new Error('useUpgrade must be used inside <UpgradeProvider>');
  return ctx;
}
