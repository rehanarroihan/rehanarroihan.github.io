importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox) {
  console.log(`Workbox berhasil dimuat`);
} else {
  console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
  { url: '/manifest.json', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/menu.html', revision: '1' },
  { url: '/club.html', revision: '1' },
  { url: '/assets/css/materialize.min.css', revision: '1' },
  { url: '/assets/css/style.css', revision: '1' },
  { url: '/assets/css/fa.css', revision: '1' },
  { url: '/assets/img/ico.png', revision: '1' },
  { url: '/assets/img/icon-72x72.png', revision: '1' },
  { url: '/assets/img/laliga.jpg', revision: '1' },
  { url: '/assets/js/api.js', revision: '1' },
  { url: '/assets/js/materialize.min.js', revision: '1' },
  { url: '/assets/js/fa.js', revision: '1' },
  { url: '/assets/js/nav.js', revision: '1' },
  { url: '/assets/webfonts/gs.ttf', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api',
  })
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'assets/img/laliga.jpg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});