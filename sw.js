const CACHE_NAME = 'pastry-cache-v4';
const PRECACHE = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './core.js',
  './exam.js',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
  './icons/apple-touch-icon.png',
  './img/hero-vitrine.jpg',
  './img/hero-ustensiles.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

// Supprime les anciens caches (v1, v2...) à l'activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // On ne touche ni aux requêtes non-GET ni aux appels vers l'API Gemini
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  // Pages : réseau d'abord (pour recevoir les mises à jour), cache en secours hors ligne
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Fichiers statiques : cache d'abord, rafraîchi en arrière-plan
  event.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req)
        .then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
