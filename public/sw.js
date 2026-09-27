// Mino service worker: makes the app installable. It does not cache or intercept
// requests (no fetch handler), so the app, Firebase and Mino always use the network.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
