const CACHE_NAME = 'miniaventuras-v1'

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    self.importScripts('/precache-manifest.js')
    const cache = await caches.open(CACHE_NAME)
    await cache.addAll(self.__PRECACHE_URLS__ ?? ['/'])
    await self.skipWaiting()
  })())
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.filter((name) => name.startsWith('miniaventuras-') && name !== CACHE_NAME).map((name) => caches.delete(name)))
    await self.clients.claim()
  })())
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request)
        const cache = await caches.open(CACHE_NAME)
        cache.put('/', response.clone())
        return response
      } catch {
        return (await caches.match('/')) ?? Response.error()
      }
    })())
    return
  }

  event.respondWith((async () => {
    const cached = await caches.match(request)
    if (cached) return cached
    try {
      const response = await fetch(request)
      if (response.ok) {
        const cache = await caches.open(CACHE_NAME)
        cache.put(request, response.clone())
      }
      return response
    } catch {
      return Response.error()
    }
  })())
})
