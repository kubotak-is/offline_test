/**
 * @fileoverview service worker
 */
const VERSION = 1;
const STATIC_CACHE_NAME = `cache_${VERSION}`;
const ORIGIN = `${location.protocol}//${location.hostname}` + (location.port ? ':' + location.port : '');
const STATIC_FILES = [
  'https://fonts.googleapis.com/css?family=Josefin+Sans',
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css',
  `${ORIGIN}/offline_test/public/`,
  `${ORIGIN}/offline_test/public/?utm_source=web_app_manifest`,
  `${ORIGIN}/offline_test/public/img/qr.png`,
];
let STATIC_FILE_URL_HASH = {};
STATIC_FILES.forEach(x => {
  STATIC_FILE_URL_HASH[x] = true;
});

// install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      return Promise.all(STATIC_FILES.map(url => {
        return fetch(new Request(url)).then(response => {
          if (response.ok)
            return cache.put(response.url, response);
          return Promise.reject(
            `Invalid response.  URL: ${response.url}
             Status: ${response.status}`);
        });
      }));
    }));
});

// Delete Cache
self.addEventListener('activate', e => {
  console.log('activate');
  e.waitUntil(
    caches.keys().then(keys => {
      let promises = [];
      keys.forEach(cacheName => {
        if (cacheName != STATIC_CACHE_NAME)
          promises.push(caches.delete(cacheName));
      });
      return Promise.all(promises);
    }));
});

self.addEventListener('fetch', e => {
  if (!STATIC_FILE_URL_HASH[e.request.url]) return;
  e.respondWith(caches.match(e.request, {cacheName: STATIC_CACHE_NAME}));
});