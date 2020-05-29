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

self.addEventListener('activate', event => {
    // const title = 'Push Codelab';
    // const options = {
    //     body: 'Yay it works.',
    //     icon: 'images/icon.png',
    //     badge: 'images/badge.png'
    // };
    // console.log("show notification ");
    // event.waitUntil(self.registration.showNotification(title, options));
  });


self.addEventListener('install', event => {
  self.skipWaiting();
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

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






