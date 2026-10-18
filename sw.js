const CACHE_NAME = "obamify-advanced-v2";
const APP_SHELL = [
    "./",
    "./index.html",
    "./assets/android-chrome-192x192.png",
    "./assets/android-chrome-512x512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys
                    .filter((key) => key.startsWith("obamify") && key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const request = event.request;
    if (request.method !== "GET") return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    event.respondWith((async () => {
        const cached = await caches.match(request);
        try {
            // Prefer current deployed assets online and cache successful same-origin responses.
            const response = await fetch(request);
            if (response && response.ok && response.type !== "opaque") {
                const cache = await caches.open(CACHE_NAME);
                await cache.put(request, response.clone());
            }
            if (response && response.ok) return response;
            return cached || response;
        } catch (error) {
            if (cached) return cached;
            if (request.mode === "navigate") {
                const shell = await caches.match("./index.html");
                if (shell) return shell;
            }
            throw error;
        }
    })());
});
