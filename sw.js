var CACHE_NAME = 'ana-victoria-to-v01-01';
var urlsToCache = [
	'/ana-victoria/',
	'/ana-victoria/index.html',
	'/ana-victoria/offline.html',
	'/ana-victoria/404.html',
	'/ana-victoria/favicon/android-chrome-512x512.png',
	'/ana-victoria/favicon/android-icon-192x192.png',
	'/ana-victoria/favicon-foto/android-chrome-512x512.png',
	'/ana-victoria/favicon-foto/android-icon-192x192.png',
	'/ana-victoria/css/all.css',
	'/ana-victoria/webfonts/fa-brands-400.eot',
	'/ana-victoria/webfonts/fa-brands-400.svg',
	'/ana-victoria/webfonts/fa-brands-400.ttf',
	'/ana-victoria/webfonts/fa-brands-400.woff',
	'/ana-victoria/webfonts/fa-brands-400.woff2',
	'/ana-victoria/webfonts/fa-regular-400.eot',
	'/ana-victoria/webfonts/fa-regular-400.svg',
	'/ana-victoria/webfonts/fa-regular-400.ttf',
	'/ana-victoria/webfonts/fa-regular-400.woff',
	'/ana-victoria/webfonts/fa-regular-400.woff2',
	'/ana-victoria/webfonts/fa-solid-900.eot',
	'/ana-victoria/webfonts/fa-solid-900.svg',
	'/ana-victoria/webfonts/fa-solid-900.ttf',
	'/ana-victoria/webfonts/fa-solid-900.woff',
	'/ana-victoria/webfonts/fa-solid-900.woff2',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
	'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	'/ana-victoria/imgs/ana-victoria-sobre-picture-mobile.jpg',
	'/ana-victoria/imgs/ana-victoria-sobre-picture-mobile-02.jpg',
	'/ana-victoria/imgs/logo-cartao-digital-puro-v01-01.png',
	'/ana-victoria/imgs/portfolio-01.png',
	'/ana-victoria/imgs/portfolio-02.png',
	'/ana-victoria/imgs/portfolio-03.png',
	'/ana-victoria/imgs/logo-bkg-mobile-transparente-v01-01.png',
	'/ana-victoria/imgs/logo-ana-victoria-cartao-digital-horiz-v01-01.png',
	'/ana-victoria/imgs/dcard-cartao-digital-molde-cabecalho-v03-01.png',
	'/ana-victoria/imgs/picture-circle-bkg.png',
	'/ana-victoria/imgs/ana-victoria-dcard-slide-01.jpg',
	'/ana-victoria/imgs/ana-victoria-dcard-slide-02.jpg',
	'/ana-victoria/imgs/ana-victoria-dcard-slide-03.jpg'
];
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});
self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					// Return true if you want to remove this cache,
					// but remember that caches are shared across
					// the whole origin
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});
/* FETCH */
self.addEventListener('fetch', function(event) {
	event.respondWith(
	// Try the cache
		caches.match(event.request).then(function(response) {
			//console.log('response 01 = ' + response);
			if (response) {
				return response;
			}
			return fetch(event.request).then(function(response) {
				//console.log('response.status = ' + response.status);
				if (response.status === 404) {
					return caches.match('/ana-victoria/404.html');
				}
				//console.log('response 02 = ' + response);
				return response
			});
		}).catch(function() {
			// If both fail, show a generic fallback:
			//console.log('offline event = ' + event);
			return caches.match('/ana-victoria/offline.html');
		})
	);
});