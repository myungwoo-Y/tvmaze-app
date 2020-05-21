importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

workbox.routing.registerRoute(
    new RegExp('https://api.tvmaze.com/(.*)'),
    new workbox.strategies.CacheFirst({
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

workbox.routing.registerRoute(
    /\.(?:css|js)$/,
    new workbox.strategies.StaleWhileRevalidate({
        "cacheName": "scripts",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60
            })
        ]
    })
)

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
    new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/(.*)'),
    new workbox.strategies.CacheFirst({
      cacheName: 'font-awesome',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );

// self.addEventListener('fetch', (event) => {
//     if (event.request.mode === 'navigate') {
//       event.respondWith(caches.match('index.html'));
//     } else {
//       // Your other response logic goes here.
//     }
//   });



self.addEventListener('activate', event => {
    console.log("client.claim()");
    event.waitUntil(clients.claim());
  });

// self.addEventListener('install', (event) => {
//     const channel = new BroadcastChannel('service-worker-channel');
//     channel.postMessage({promptToReload: true});

//     channel.onmessage = (message) => {
//         if(message.data.skipWaiting){
//             console.log('Skipping waiting and installing service worker.');

//             self.skipWaiting();
//         }
//     }
// })

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);






