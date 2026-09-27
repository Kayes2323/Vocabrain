// Mino service worker: makes the app installable. It does not cache or intercept
// requests (no fetch handler), so the app, Firebase and Mino always use the network.
// The app's name and icons come only from /manifest.webmanifest (never from here).
// Version: 2 (Mino rename): bump when this file changes so installed copies update.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
