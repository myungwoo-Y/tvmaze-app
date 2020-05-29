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
    new RegExp('http://localhost:3000/static/(.*)'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-cache',
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


function getDB() {
    let db;
    if (!db) {
      db = new Promise((resolve, reject) => {
        const openreq = self.indexedDB.open("MySeries");
        openreq.onerror = () => {
          reject(openreq.error);
        };
  
        openreq.onsuccess = () => {
          resolve(openreq.result);
        };
      });
    }
    return db;
}

const getUsDate = (option) => {
const date = new Date();
date.setHours(date.getHours() - 14);

if(option === 'string'){
    return date.toISOString().split('T')[0];
}else{
    return date;
}
}

const getDayString = () => {
const date = getUsDate();
switch(date.getDay()){
    case 0:
        return "Sunday";
    case 1:
        return "Monday";
    case 2:
        return "Tuesday";
    case 3:
        return "Wednesday";
    case 4:
        return "Thursday";
    case 5:
        return "Friday";
    case 6:
        return "Saturday";
    default:
        return "none";
}
}
  
const triggerNotification = (series) => {
    console.log(series);
    const title = series.name ? series.name : "No title";
    const thumbnail = series.image.original.replace("http", "https");
    const schedules = series.schedule;
    self.registration.showNotification(title, {
        body: `It will be on air today at ${schedules.time}.`,
        icon: thumbnail,
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'TV Info'
    });
}
  
// setInterval(() => {
// const isActive = self.registration.active;
// if(isActive !== null){
//     if(self.indexedDB){
//     getDB()
//         .then(db => {
//             if(db.version === 2){
//                 const tx = db.transaction('series', "readwrite");
//                 const store = tx.objectStore('series');
//                 const allRecords = store.getAll();
//                 allRecords.onsuccess = function() {
//                     const allMySeries = allRecords.result; 
//                     allMySeries.forEach((series, i) => {
//                         if(series.status === 'Running'){
//                             const schedule = series.schedule;
//                             const dayString = getDayString();
//                             if(schedule.days.includes(dayString)){
//                                 setTimeout(triggerNotification(series), 1000 * 5 * i);
//                             }
//                         }
//                     });
//                 };
//             }
//         })
//     }
// }
// }, 10 * 1000)
  
workbox.core.clientsClaim();
  
self.addEventListener('install', event => {
    console.log('static-cache installing..');
    event.waitUntil(
        caches.open('static-cache')
        .then(cache =>  
            cache.addAll(['/static/js/bundle.js','/static/js/0.chunk.js','/static/js/main.chunk.js'])
        )
    )
    self.skipWaiting();
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const handler = workbox.precaching.createHandlerBoundToURL('/index.html');
const navigationRoute = new workbox.routing.NavigationRoute(handler, {
  allowlist: [
    new RegExp('/'),
    new RegExp('/video/:id'),
    new RegExp('/search/:id'),

  ],
  denylist: [
  ],
});
workbox.routing.registerRoute(navigationRoute);






