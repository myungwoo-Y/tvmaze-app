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


workbox.core.clientsClaim();


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

// workbox.routing.registerRoute(
//     /\.(?:css|js)$/,
//     new workbox.strategies.StaleWhileRevalidate({
//         "cacheName": "scripts",
//         plugins: [
//             new workbox.expiration.ExpirationPlugin({
//                 maxEntries: 100,
//                 maxAgeSeconds: 7 * 24 * 60 * 60
//             })
//         ]
//     })
// )

// Cache the underlying font files with a cache-first strategy for 1 year.
// workbox.routing.registerRoute(
//     new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/(.*)'),
//     new workbox.strategies.CacheFirst({
//       cacheName: 'font-awesome',
//       plugins: [
//         new workbox.expiration.ExpirationPlugin({
//           maxAgeSeconds: 60 * 60 * 24 * 365,
//           maxEntries: 30,
//         }),
//       ],
//     })
//   );

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


self.addEventListener('install', event => {
  self.skipWaiting();
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

workbox.precaching.precacheAndRoute([{"revision":"1f9e779d6e2042014529e72fecf5ed64","url":"asset-manifest.json"},{"revision":"510415c228bbe35faca57315a7ef99eb","url":"favicon.ico"},{"revision":"719a067d1152160662946cba8f68c61f","url":"index.html"},{"revision":"81fc98a6bc2c7ed6ccf45add4bfe960a","url":"logo192.png"},{"revision":"a9912c62d70e4c8918465dcf5c198a5c","url":"logo512.png"},{"revision":"4b8e3acadeb7a8442d992dab62aff3e7","url":"manifest.json"},{"revision":"6017675f6849b58f92c67f6dc498cbcf","url":"nav.css"},{"revision":"c2c715f54d663df182f3d29949856d43","url":"precache-manifest.c2c715f54d663df182f3d29949856d43.js"},{"revision":"61c27d2cd39a713f7829422c3d9edcc7","url":"robots.txt"},{"revision":"e7eadd3f720e5e677be6648a55129975","url":"service-worker.js"},{"revision":"cb0a7bf5abbdb29fe2663eb151ccba28","url":"static/css/2.7cf7ff0c.chunk.css"},{"revision":"c1709ec865981cedcb67bc51756497d1","url":"static/css/main.4f93927f.chunk.css"},{"revision":"382a0362348f2fd2875de26324f5ad4f","url":"static/js/2.8a87ef43.chunk.js"},{"revision":"117d65892edc8adcd29d4a0d57b5a80a","url":"static/js/2.8a87ef43.chunk.js.LICENSE.txt"},{"revision":"3a77aeb92873a7b6e89c29e618a6e0a3","url":"static/js/main.1de7a238.chunk.js"},{"revision":"48a9294f12845f2b97a4c09e41d623ed","url":"static/js/runtime-main.461e82d3.js"},{"revision":"66956f7697f595819605d70a7b729c4d","url":"sw-build.js"}]);

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






