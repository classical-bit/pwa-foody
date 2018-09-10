var cacheName = 'cache-v1'; // Cache name

// Files to cache
var filesToCache = [
	'./index.html',
	'./css/style.css',
	'./js/index.js'
];

// Install listener
self.addEventListener('install', (event) => {
	console.log('Event: Install');

	// waitUntil() tells the browser that work is ongoing until the promise settles,
	// and it shouldn't terminate the service worker if it wants that work to complete.
	event.waitUntil(
		// Open the cache
		caches.open(cacheName)
			.then((cache) => {
				return cache.addAll(filesToCache)
					.then(() => {
						console.log('All files are cached');
					})
			})
			.catch((err) => {
				console.log('Error occured while catching', err);
			})
	);
});

// Activate Listener
self.addEventListener('activate', (event) => {
	console.log('Event: Activate!');

	// Delete unwanted and old caches here
	event.waitUntil(
		caches.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cache) => {
						if (cache !== cacheName)
							return caches.delete(cache); // Deleting the cache
					})
				);
			})
	);
});

// Fetch Listener
self.addEventListener('fetch', (event) => {
	console.log('Event: Fetch!');

	var request = event.request; // Request made by the app

	// The respondWith() method of FetchEvent prevents the browser's default fetch handling,
	// and allows you to provide a promise for a Response yourself.
	event.respondWith(
		// If request is already in cache then return the response
		caches.match(request)
			.then((response) => {
				if(response)
					return response;

				// else make a request, add to cache, return response
				return fetch(request).then((response) => {
					responseToCache = response.clone(); // Cloning respoinse stream in order to add to cache
					caches.open(cacheName)
						.then((cache) => {
							cache.put(request, responseToCache); // Adding to cache
						});
					return response;
				});
			})
	);
});