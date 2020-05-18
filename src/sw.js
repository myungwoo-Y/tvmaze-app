importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.routing.registerRoute(
    new RegExp('https://api.tvmaze.com/(.*)'),
    new workbox.strategies.CacheFirst({
        cacheName: 'tvmaze-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 30,
                maxAgeSeconds: 15000
            }),
            new workbox.cacheableResponse.Plugin({
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
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 15000
            })
        ]
    })
)

workbox.routing.registerRoute(
    /\.(?:css|js)$/,
    new workbox.strategies.StaleWhileRevalidate({
        "cacheName": "scripts",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 15000
            })
        ]
    })
)


workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);