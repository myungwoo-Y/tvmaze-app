importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");
workbox.routing.registerRoute(
    new RegExp('https://api.tvmaze.com/(.*)'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'tvmaze-cache',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 30,
                maxAgeSeconds: 7 * 24 * 60 * 60
            }),
            new workbox.cacheableResponse.CacheableResponse({
                statuses: [0, 200]
            }),
        ]
    })
)

workbox.routing.registerRoute(
    new RegExp('https://firestore.googleapis.com/(.*)'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'firebase-cache',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 30,
                maxAgeSeconds: 7 * 24 * 60 * 60
            }),
        ]
    })
)


workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
        "cacheName": "images",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60
            })
        ]
    })
)


self.addEventListener('fetch', (event) => {
    const responsePromise = new workbox.routing.Router().handleRequest(event);
    const responseUrl = event.request.url; 
    // console.log(event)
    // console.log(responseUrl);
    // console.log(responseUrl.includes("firestore"))
    if (responsePromise && responseUrl.includes("firestore")) {
      // Router found a route to handle the request
      event.respondWith(responsePromise);
    } else {
      // No route found to handle the request
    }
});


function getDB() {
    if (!db) {
      db = new Promise((resolve, reject) => {
        const openreq = indexedDB.open("MySeries", 1);

        openreq.onerror = () => {
          reject(openreq.error);
        };

        openreq.onsuccess = () => {
          resolve(openreq.result);
        };
      });
    }
    console.log(db);
    return db;
  }

setInterval(() => {
    const isActive = self.registration.active;
    console.log("in service worker ", isActive);
    if(isActive !== null){
        console.log("Notification Start")
        self.registration.showNotification('Hello world', {
            body: 'Series Notification',
            icon: '/images/logo.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: 'vibration-sample'
        });
    }
}, 20000)


workbox.core.clientsClaim();

self.addEventListener('activate', event => {
    // event.waitUntil(self.registration.showNotification(title, options));
});
  
self.addEventListener('install', event => {
  self.skipWaiting();
});

workbox.precaching.precacheAndRoute([{"revision":"815ad91701218b0078f23feba6e0a61d","url":"asset-manifest.json"},{"revision":"510415c228bbe35faca57315a7ef99eb","url":"favicon.ico"},{"revision":"a9912c62d70e4c8918465dcf5c198a5c","url":"images/logo.png"},{"revision":"62a9ab0e7b4a0fde503d1324ed8f08c4","url":"index.html"},{"revision":"81fc98a6bc2c7ed6ccf45add4bfe960a","url":"logo192.png"},{"revision":"a9912c62d70e4c8918465dcf5c198a5c","url":"logo512.png"},{"revision":"4b8e3acadeb7a8442d992dab62aff3e7","url":"manifest.json"},{"revision":"6017675f6849b58f92c67f6dc498cbcf","url":"nav.css"},{"revision":"05cf8340695c460345181d82c997b3ed","url":"precache-manifest.05cf8340695c460345181d82c997b3ed.js"},{"revision":"61c27d2cd39a713f7829422c3d9edcc7","url":"robots.txt"},{"revision":"d79bd9760f1305fdf9ce532fae80c512","url":"service-worker.js"},{"revision":"cb0a7bf5abbdb29fe2663eb151ccba28","url":"static/css/2.7cf7ff0c.chunk.css"},{"revision":"c1709ec865981cedcb67bc51756497d1","url":"static/css/main.4f93927f.chunk.css"},{"revision":"fccbc8a2e6bae01407168b42b8e34a16","url":"static/js/2.abcb2de3.chunk.js"},{"revision":"2d9a83b9583ea6d57dbe53330c7e7b37","url":"static/js/2.abcb2de3.chunk.js.LICENSE.txt"},{"revision":"7a89ad81a04dba697d45ff29a6028938","url":"static/js/main.7ec0c5cf.chunk.js"},{"revision":"48a9294f12845f2b97a4c09e41d623ed","url":"static/js/runtime-main.461e82d3.js"}]);

const handler = workbox.precaching.createHandlerBoundToURL('/index.html');
const navigationRoute = new workbox.routing.NavigationRoute(handler, {
  allowlist: [
    new RegExp('/'),
    new RegExp('/video/'),
    new RegExp('/search/'),

  ],
  denylist: [
  ],
});
workbox.routing.registerRoute(navigationRoute);






