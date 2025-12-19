const CACHE_NAME = 'pablo-morera-v2';
const urlsToCache = [
  './',
  './index.html',
  './admin.html',
  './style.css',
  './script.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // Estrategia: Network First (Mejor para apps con datos en vivo)
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});