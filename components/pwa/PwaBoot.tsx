'use client';

import { useEffect } from 'react';
// Importing starts listening for the browser's install event at once.
import '@/lib/pwa/native';

/** Starts install-event capture early and registers the (minimal) service worker in production. */
export function PwaBoot() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;
    // updateViaCache 'none': the browser always re-checks sw.js, so an update is picked up on the next visit.
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).catch(() => undefined);
  }, []);
  return null;
}
