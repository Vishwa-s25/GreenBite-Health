const CACHE_NAME = 'greenbite-cache-v1';
const OFFLINE_URL = 'offline.html';
const PRECACHE_URLS = [
  '/',
  'index.html',
  'recipes.html',
  'calculator.html',
  'workout.html',
  'mindfulness.html',
  'contact.html',
  'styles/main.css',
  'styles/recipes.css',
  'styles/calculator.css',
  'styles/workout.css',
  'styles/mindfulness.css',
  'styles/contact.css',
  'scripts/main.js',
  'scripts/recipes.js',
  'scripts/calculator.js',
  'scripts/workout.js',
  'scripts/mindfulness.js',
  'scripts/contact.js',
  OFFLINE_URL
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Network-first for navigation and HTML; cache-first for others
self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.mode === 'navigate' || (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => cached);
    })
  );
});


