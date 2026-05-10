// Self-destruct: clears all caches and permanently unregisters.
// Fixes stale-cache bug where old code was served to returning users.
// After this runs once the browser fetches index.html fresh every time.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
  );
});
