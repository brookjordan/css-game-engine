self.importScripts('./pwa/cache-details.js');

self.addEventListener('install', event => {
  let preCache = async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
  };
  event.waitUntil(preCache());
});


let cacheFetchRequest = async (request, cache) => {
  let response;
  try {
    response = await fetch(request);
    cache.put(request, response.clone());
  } catch (error) {
    throw 'fetch failed';
  }
  return response;
}

let cacheFirst = async request => {
  let cache = await caches.open(cacheName);
  let fetchResponse = cacheFetchRequest(request, cache);
  let response;
  try {
    response = await cache.match(request);
    if (!response) { throw 'No cache'; }
  } catch (error) {
    response = await fetchResponse;
  }
  return response;
};

let networkFirst = async request => {
  let cache = await caches.open(cacheName);
  let response;
  try {
    response = await cacheFetchRequest(request, cache);
  } catch (e) {
    response = await cache.match(request);
  }
  return response;
}

self.addEventListener('fetch', async event => {
  if(!event.request.url.startsWith('http')) { return };

  if (/\.json(\?|$)/.test(event.request.url)) {
    event.respondWith(networkFirst(event.request));
  } else {
    event.respondWith(cacheFirst(event.request));
  }
});
