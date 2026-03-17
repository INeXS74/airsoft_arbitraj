const CACHE_NAME = 'airsoft-arbitraj-v2'; // Am schimbat versiunea ca să forțăm actualizarea
const urlsToCache = [
  './',
  'index.html',
  'competitie_audio.mp3', // ATENȚIE: Verifică dacă ai .mp3 sau .wav pe GitHub!
  'logo_federatie.png',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

// Instalarea Service Worker-ului și caching-ul resurselor
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptarea cererilor și servirea din cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activarea și curățarea cache-urilor vechi
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
