// Network-only service worker. It exists only so the app is installable
// (Add to Home Screen). It never caches anything, so a deploy is always
// picked up — and on activate it wipes any cache left by older versions.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Pass-through: same-origin GETs go straight to the network. Cross-origin
// (price API, proxies) is left alone entirely.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(fetch(req));
});
