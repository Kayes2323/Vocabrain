'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { UserProfile } from '@/lib/models';
import { localProfileRepository, type ProfileRepository } from '@/lib/services/profile-repository';

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  /** Applies an immutable update and persists it. */
  updateProfile: (update: (current: UserProfile) => UserProfile) => void;
}

const ProfileContext = createContext<ProfileState | null>(null);

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

  useEffect(() => {
    let cancelled = false;
    setProfile(null);
    repository.load(userId).then((p) => {
      if (!cancelled) setProfile(p);
    });
    return () => {
      cancelled = true;
    };
  }, [userId, repository]);

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
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileState {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside <ProfileProvider>');
  return ctx;
}
