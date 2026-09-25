'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { withTimeout } from '@/lib/async';
import type { UserProfile } from '@/lib/models';
import { localProfileRepository, type ProfileRepository } from '@/lib/services/profile-repository';
import { useAuth } from './AuthProvider';
import { useLocale } from './LocaleProvider';

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  /** Applies an immutable update and persists it. */
  updateProfile: (update: (current: UserProfile) => UserProfile) => void;
}

const ProfileContext = createContext<ProfileState | null>(null);

const LOAD_TIMEOUT_MS = 15_000;

export function ProfileProvider({
  userId,
  repository = localProfileRepository,
  children,
}: {
  userId: string;
  repository?: ProfileRepository;
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setProfile(null);
    setErrorCode(null);
    withTimeout(repository.load(userId), LOAD_TIMEOUT_MS).then(
      (p) => {
        if (!cancelled) setProfile(p);
      },
      (error: { code?: string }) => {
        // Never fall back to an empty profile here: a later save would overwrite the real one.
        console.error('[profile] Load failed', error);
        if (!cancelled) setErrorCode(error?.code ?? 'unknown');
      },
    );
    return () => {
      cancelled = true;
    };
  }, [userId, repository, attempt]);

  const updateProfile = useCallback(
    (update: (current: UserProfile) => UserProfile) => {
      setProfile((current) => {
        if (!current) return current;
        const next = { ...update(current), updatedAt: new Date().toISOString() };
        void repository.save(next);
        return next;
      });
    },
    [repository],
  );

  const value = useMemo(
    () => ({ profile, loading: profile === null, updateProfile }),
    [profile, updateProfile],
  );

  if (errorCode) return <ProfileLoadError code={errorCode} onRetry={() => setAttempt((n) => n + 1)} />;
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

function ProfileLoadError({ code, onRetry }: { code: string; onRetry: () => void }) {
  const { t } = useLocale();
  const { signOut } = useAuth();
  return (
    <div role="alert" className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-xl font-semibold">{t('loadError.title')}</h1>
      <p className="text-muted-foreground">{t('loadError.body')}</p>
      <div className="flex gap-2">
        <Button variant="brand" onClick={onRetry}>
          {t('loadError.retry')}
        </Button>
        <Button variant="outline" onClick={() => void signOut()}>
          {t('loadError.signOut')}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">{t('loadError.code', { code })}</p>
    </div>
  );
}

export function useProfile(): ProfileState {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside <ProfileProvider>');
  return ctx;
}
