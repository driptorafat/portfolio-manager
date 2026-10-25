// Minimal service worker: no fetch handler at all, so every request goes
// straight to the network exactly as in a normal browser tab (a pass-through
// fetch handler broke cross-origin price requests in the iOS home-screen app).
// It only exists to wipe caches left by older cache-first versions.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
