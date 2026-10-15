// Service-Worker für „What's money?“ – wird von app-bauen.py erzeugt, nicht von Hand ändern.
const CACHE = 'whats-money-59bf3ec73a';
const DATEIEN = [
  "./",
  "fonts/076f8fd31e21.woff2",
  "fonts/0bc96cd0d5b0.woff2",
  "fonts/135b61110b9a.woff2",
  "fonts/18535fbd7db5.woff2",
  "fonts/1b581b151893.woff2",
  "fonts/2cb978b7740e.woff2",
  "fonts/386222c87c85.woff2",
  "fonts/40c2cb34afaa.woff2",
  "fonts/93cfae71a503.woff2",
  "fonts/a0b5f6f0af89.woff2",
  "fonts/a73533172c59.woff2",
  "fonts/fdb6b064da1e.woff2",
  "fonts/fonts.css",
  "icons/apple-touch-icon.png",
  "icons/favicon.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "index.html",
  "manifest.webmanifest"
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Erst aus dem Speicher (läuft offline), Links zu Quellen im Internet gehen normal ins Netz
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
