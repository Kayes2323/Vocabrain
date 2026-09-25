'use client';

import { useRouter } from 'next/navigation';

/** Goes back when there is somewhere to go back to, otherwise to `fallback`. */
export function useLeave(fallback = '/') {
  const router = useRouter();
  return () => (window.history.length > 1 ? router.back() : router.push(fallback));
}
